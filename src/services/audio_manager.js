/**
 * Audio Manager Service
 * 
 * Handles all audio recording and playback operations using Web Audio API and MediaRecorder.
 * Provides browser compatibility checks, error handling, and resource cleanup.
 */

/**
 * Custom error class for audio manager operations
 */
export class AudioManagerError extends Error {
  constructor(message, code, userMessage) {
    super(message);
    this.name = 'AudioManagerError';
    this.code = code;
    this.userMessage = userMessage;
  }
}

// Internal state
let mediaRecorder = null;
let mediaStream = null;
let audioChunks = [];
let audioElement = null;
let audioContext = null;

/**
 * Check if browser supports audio recording
 * @returns {boolean} True if audio recording is supported
 */
export function isAudioSupported() {
  return !!(navigator.mediaDevices && 
            navigator.mediaDevices.getUserMedia && 
            window.MediaRecorder);
}

/**
 * Check current microphone permission state
 * @returns {Promise<string>} Permission state: 'granted', 'denied', or 'prompt'
 */
export async function checkMicrophonePermission() {
  try {
    if (navigator.permissions && navigator.permissions.query) {
      const result = await navigator.permissions.query({ name: 'microphone' });
      return result.state;
    }
    // Fallback: assume 'prompt' if Permissions API not available
    return 'prompt';
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Could not check microphone permission:', error);
    }
    return 'prompt';
  }
}

/**
 * Request microphone permission explicitly
 * @returns {Promise<boolean>} True if permission granted
 */
export async function requestPermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Stop the stream immediately, we just wanted to trigger permission
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Permission request failed:', error);
    }
    return false;
  }
}

/**
 * Start audio recording from microphone
 * @returns {Promise<void>} Resolves when recording starts successfully
 * @throws {AudioManagerError} If recording cannot be started
 */
export async function startRecording() {
  // Check browser support
  if (!isAudioSupported()) {
    throw new AudioManagerError(
      'Browser does not support audio recording',
      'NOT_SUPPORTED',
      "Your browser doesn't support audio recording. Please use Chrome, Firefox, or Safari."
    );
  }

  // Clean up any existing recording
  if (mediaRecorder || mediaStream) {
    await cleanup();
  }

  try {
    // Request microphone access with specific audio constraints
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 24000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    // Determine best supported MIME type
    let mimeType = 'audio/webm';
    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
      mimeType = 'audio/webm;codecs=opus';
    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
      mimeType = 'audio/mp4';
    } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
      mimeType = 'audio/ogg;codecs=opus';
    }

    // Create MediaRecorder instance
    mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType,
      audioBitsPerSecond: 128000
    });

    // Reset audio chunks
    audioChunks = [];

    // Set up event handlers
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onerror = (event) => {
      if (import.meta.env.DEV) {
        console.error('MediaRecorder error:', event.error);
      }
    };

    // Start recording with 100ms timeslice for chunked recording
    mediaRecorder.start(100);

    if (import.meta.env.DEV) {
      console.log('Recording started with MIME type:', mimeType);
    }

  } catch (error) {
    // Clean up on error
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }

    // Handle specific error types
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      throw new AudioManagerError(
        'Microphone permission denied',
        'PERMISSION_DENIED',
        "Microphone access denied. Please click the camera icon in your browser's address bar to allow microphone access."
      );
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      throw new AudioManagerError(
        'No microphone device found',
        'NO_DEVICE',
        'No microphone found. Please connect a microphone and try again.'
      );
    } else if (error.name === 'NotSupportedError') {
      throw new AudioManagerError(
        'Audio recording not supported',
        'NOT_SUPPORTED',
        "Your browser doesn't support audio recording. Please use Chrome, Firefox, or Safari."
      );
    } else if (error.name === 'AbortError') {
      throw new AudioManagerError(
        'Recording aborted',
        'ABORTED',
        'Recording was aborted. Please try again.'
      );
    } else {
      throw new AudioManagerError(
        `Failed to start recording: ${error.message}`,
        'UNKNOWN_ERROR',
        'Failed to start recording. Please try again.'
      );
    }
  }
}

/**
 * Convert audio blob to WAV format
 * @param {Blob} audioBlob - The audio blob to convert
 * @returns {Promise<Blob>} WAV format audio blob
 */
async function convertToWAV(audioBlob) {
  try {
    // Initialize AudioContext if needed
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Convert blob to array buffer
    const arrayBuffer = await audioBlob.arrayBuffer();

    // Decode audio data
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Get audio data
    const numberOfChannels = 1; // Mono
    const sampleRate = 24000; // Target sample rate
    const length = audioBuffer.length;
    
    // Resample if needed
    let samples;
    if (audioBuffer.sampleRate !== sampleRate) {
      const offlineContext = new OfflineAudioContext(
        numberOfChannels,
        Math.ceil(length * sampleRate / audioBuffer.sampleRate),
        sampleRate
      );
      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      source.start(0);
      const resampledBuffer = await offlineContext.startRendering();
      samples = resampledBuffer.getChannelData(0);
    } else {
      // Mix down to mono if stereo
      if (audioBuffer.numberOfChannels > 1) {
        const left = audioBuffer.getChannelData(0);
        const right = audioBuffer.getChannelData(1);
        samples = new Float32Array(length);
        for (let i = 0; i < length; i++) {
          samples[i] = (left[i] + right[i]) / 2;
        }
      } else {
        samples = audioBuffer.getChannelData(0);
      }
    }

    // Convert float samples to 16-bit PCM
    const pcmData = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }

    // Create WAV file
    const wavBuffer = createWAVFile(pcmData, sampleRate, numberOfChannels);
    
    if (import.meta.env.DEV) {
      console.log('Audio converted to WAV:', {
        sampleRate,
        channels: numberOfChannels,
        duration: samples.length / sampleRate,
        size: wavBuffer.byteLength
      });
    }

    return new Blob([wavBuffer], { type: 'audio/wav' });

  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('WAV conversion failed, returning original blob:', error);
    }
    // Fallback to original blob if conversion fails
    return audioBlob;
  }
}

/**
 * Create WAV file buffer from PCM data
 * @param {Int16Array} pcmData - PCM audio data
 * @param {number} sampleRate - Sample rate in Hz
 * @param {number} numChannels - Number of audio channels
 * @returns {ArrayBuffer} WAV file buffer
 */
function createWAVFile(pcmData, sampleRate, numChannels) {
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = pcmData.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // Write WAV header
  // "RIFF" chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');

  // "fmt " sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bytesPerSample * 8, true); // BitsPerSample

  // "data" sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM data
  let offset = 44;
  for (let i = 0; i < pcmData.length; i++) {
    view.setInt16(offset, pcmData[i], true);
    offset += 2;
  }

  return buffer;
}

/**
 * Write string to DataView
 * @param {DataView} view - DataView to write to
 * @param {number} offset - Byte offset
 * @param {string} string - String to write
 */
function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

/**
 * Stop audio recording and return the recorded audio blob
 * @returns {Promise<Blob>} The recorded audio as a WAV blob
 * @throws {AudioManagerError} If stopping recording fails
 */
export async function stopRecording() {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    throw new AudioManagerError(
      'No active recording to stop',
      'NO_ACTIVE_RECORDING',
      'No active recording found.'
    );
  }

  return new Promise((resolve, reject) => {
    try {
      // Set up stop handler
      mediaRecorder.onstop = async () => {
        try {
          // Stop all media stream tracks
          if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
          }

          // Create blob from chunks
          const mimeType = mediaRecorder.mimeType || 'audio/webm';
          const audioBlob = new Blob(audioChunks, { type: mimeType });

          if (import.meta.env.DEV) {
            console.log('Recording stopped, blob size:', audioBlob.size, 'bytes');
          }

          // Convert to WAV format
          const wavBlob = await convertToWAV(audioBlob);

          // Clean up
          mediaRecorder = null;
          mediaStream = null;
          audioChunks = [];

          resolve(wavBlob);
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error('Error processing recording:', error);
          }
          reject(new AudioManagerError(
            `Failed to process recording: ${error.message}`,
            'PROCESSING_ERROR',
            'Failed to process recording. Please try again.'
          ));
        }
      };

      // Stop recording
      mediaRecorder.stop();

    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error stopping recording:', error);
      }
      reject(new AudioManagerError(
        `Failed to stop recording: ${error.message}`,
        'STOP_ERROR',
        'Failed to stop recording. Please try again.'
      ));
    }
  });
}

/**
 * Play audio from a blob
 * @param {Blob} audioBlob - The audio blob to play
 * @returns {Promise<void>} Resolves when playback completes
 * @throws {AudioManagerError} If playback fails
 */
export async function playAudio(audioBlob) {
  // Clean up any existing playback
  if (audioElement) {
    audioElement.pause();
    if (audioElement.src) {
      URL.revokeObjectURL(audioElement.src);
    }
    audioElement = null;
  }

  return new Promise((resolve, reject) => {
    try {
      // Create blob URL
      const blobUrl = URL.createObjectURL(audioBlob);

      // Create audio element
      audioElement = new Audio(blobUrl);

      // Set up event handlers
      audioElement.onended = () => {
        URL.revokeObjectURL(blobUrl);
        audioElement = null;
        if (import.meta.env.DEV) {
          console.log('Playback completed');
        }
        resolve();
      };

      audioElement.onerror = (error) => {
        URL.revokeObjectURL(blobUrl);
        audioElement = null;
        if (import.meta.env.DEV) {
          console.error('Playback error:', error);
        }
        reject(new AudioManagerError(
          'Audio playback failed',
          'PLAYBACK_ERROR',
          'Failed to play audio. Please try again.'
        ));
      };

      // Start playback
      audioElement.play().catch(error => {
        URL.revokeObjectURL(blobUrl);
        audioElement = null;
        if (import.meta.env.DEV) {
          console.error('Play failed:', error);
        }
        reject(new AudioManagerError(
          `Failed to play audio: ${error.message}`,
          'PLAYBACK_ERROR',
          'Failed to play audio. Please try again.'
        ));
      });

    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error setting up playback:', error);
      }
      reject(new AudioManagerError(
        `Failed to set up playback: ${error.message}`,
        'PLAYBACK_ERROR',
        'Failed to play audio. Please try again.'
      ));
    }
  });
}

/**
 * Check if recording is currently active
 * @returns {boolean} True if recording is active
 */
export function isRecordingActive() {
  return mediaRecorder !== null && mediaRecorder.state === 'recording';
}

/**
 * Check if playback is currently active
 * @returns {boolean} True if playback is active
 */
export function isPlaybackActive() {
  return audioElement !== null && !audioElement.paused;
}

/**
 * Clean up all audio resources
 * Stops any active recording or playback and releases resources
 */
export function cleanup() {
  // Stop recording
  if (mediaRecorder) {
    if (mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    mediaRecorder = null;
  }

  // Stop media stream
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }

  // Clear audio chunks
  audioChunks = [];

  // Stop playback
  if (audioElement) {
    audioElement.pause();
    if (audioElement.src) {
      URL.revokeObjectURL(audioElement.src);
    }
    audioElement = null;
  }

  // Close audio context
  if (audioContext && audioContext.state !== 'closed') {
    audioContext.close().catch(err => {
      if (import.meta.env.DEV) {
        console.warn('Error closing AudioContext:', err);
      }
    });
    audioContext = null;
  }

  if (import.meta.env.DEV) {
    console.log('Audio manager cleaned up');
  }
}

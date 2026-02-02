import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for managing voice recording using the MediaRecorder API.
 * 
 * Handles microphone permissions, audio capture in webm/opus format,
 * and provides the recorded audio as a Blob for processing.
 * 
 * @returns {Object} Recording state and control functions
 * @returns {boolean} returns.isRecording - Whether recording is currently active
 * @returns {Function} returns.startRecording - Function to start recording
 * @returns {Function} returns.stopRecording - Function to stop recording
 * @returns {Blob|null} returns.audioBlob - The recorded audio blob (available after stopping)
 * @returns {string|null} returns.error - Error message if recording fails
 * @returns {boolean} returns.permissionGranted - Whether microphone permission is granted
 * @returns {Function} returns.clearAudioBlob - Function to clear the audio blob after processing
 * 
 * @example
 * const { isRecording, startRecording, stopRecording, audioBlob, error } = useRecording();
 * 
 * <button
 *   onMouseDown={startRecording}
 *   onMouseUp={stopRecording}
 * >
 *   {isRecording ? 'Recording...' : 'Hold to speak'}
 * </button>
 */
export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [error, setError] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Refs for MediaRecorder and audio data
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const mediaStreamRef = useRef(null);

  /**
   * Check browser compatibility on mount
   */
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Your browser doesn't support audio recording. Please use Chrome, Firefox, or Safari.");
      return;
    }

    if (!window.MediaRecorder) {
      setError("Your browser doesn't support audio recording. Please use Chrome, Firefox, or Safari.");
      return;
    }
  }, []);

  /**
   * Cleanup function to stop all MediaStream tracks on unmount
   */
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  /**
   * Determine the best supported MIME type for recording
   */
  const getSupportedMimeType = () => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4'
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        console.log('[useRecording] Using MIME type:', type);
        return type;
      }
    }

    console.warn('[useRecording] No preferred MIME type supported, using default');
    return '';
  };

  /**
   * Starts the recording session.
   * Requests microphone permission if not already granted.
   */
  const startRecording = async () => {
    try {
      setError(null);
      setAudioBlob(null);
      audioChunksRef.current = [];

      // Request microphone access if not already granted
      if (!permissionGranted || !mediaStreamRef.current) {
        console.log('[useRecording] Requesting microphone permission...');
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
          } 
        });
        mediaStreamRef.current = stream;
        setPermissionGranted(true);
        console.log('[useRecording] Microphone permission granted');
      }

      // Determine supported MIME type
      const mimeType = getSupportedMimeType();

      // Create MediaRecorder instance
      const mediaRecorder = new MediaRecorder(mediaStreamRef.current, {
        mimeType: mimeType || undefined
      });

      mediaRecorderRef.current = mediaRecorder;

      // Handle data available event
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log('[useRecording] Audio chunk received:', event.data.size, 'bytes');
        }
      };

      // Handle stop event - create blob from chunks
      mediaRecorder.onstop = () => {
        console.log('[useRecording] Recording stopped, creating blob from', audioChunksRef.current.length, 'chunks');
        
        if (audioChunksRef.current.length > 0) {
          const blob = new Blob(audioChunksRef.current, { 
            type: mimeType || 'audio/webm' 
          });
          console.log('[useRecording] Audio blob created:', blob.size, 'bytes, type:', blob.type);
          setAudioBlob(blob);
        } else {
          console.warn('[useRecording] No audio chunks recorded');
          setError('No audio was recorded. Please try again.');
        }

        audioChunksRef.current = [];
      };

      // Handle errors
      mediaRecorder.onerror = (event) => {
        console.error('[useRecording] MediaRecorder error:', event.error);
        setError('Recording error occurred. Please try again.');
        setIsRecording(false);
      };

      // Start recording with 100ms timeslice for smoother data collection
      mediaRecorder.start(100);
      setIsRecording(true);
      console.log('[useRecording] Recording started');

    } catch (err) {
      console.error('[useRecording] Error starting recording:', err);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone permission denied. Please allow microphone access to record audio.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('No microphone found. Please connect a microphone and try again.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('Microphone is already in use by another application.');
      } else {
        setError('Failed to start recording. Please try again.');
      }
      
      setIsRecording(false);
    }
  };

  /**
   * Stops the recording session.
   * Triggers the onstop event which creates the audio blob.
   */
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      console.log('[useRecording] Stopping recording...');
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  /**
   * Clears the audio blob after it has been processed.
   * Should be called after sending the audio to the API.
   */
  const clearAudioBlob = () => {
    setAudioBlob(null);
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    audioBlob,
    error,
    permissionGranted,
    clearAudioBlob
  };
};

export default useRecording;

import { useState, useEffect } from 'react';
import {
  startRecording as startAudioRecording,
  stopRecording as stopAudioRecording,
  isAudioSupported,
  AudioManagerError,
  cleanup as cleanupAudio
} from '../services/audio_manager.js';

/**
 * Custom hook for managing voice recording state with real audio functionality.
 *
 * Integrates with the audio_manager service to provide microphone recording,
 * browser compatibility checks, and comprehensive error handling.
 *
 * @returns {Object} Recording state and control functions
 * @returns {boolean} returns.isRecording - Whether recording is currently active
 * @returns {Blob|null} returns.audioBlob - The recorded audio blob (WAV format)
 * @returns {string|null} returns.error - Error message if recording failed
 * @returns {boolean} returns.isSupported - Whether browser supports audio recording
 * @returns {Function} returns.startRecording - Async function to start recording
 * @returns {Function} returns.stopRecording - Async function to stop recording and return audio blob
 * @returns {Function} returns.clearError - Function to clear error state
 *
 * @example
 * const { isRecording, audioBlob, error, startRecording, stopRecording } = useRecording();
 *
 * // Handle recording with error handling
 * const handleStart = async () => {
 *   try {
 *     await startRecording();
 *   } catch (err) {
 *     console.error('Failed to start recording:', err);
 *   }
 * };
 *
 * const handleStop = async () => {
 *   try {
 *     const blob = await stopRecording();
 *     // Use blob for API calls or playback
 *   } catch (err) {
 *     console.error('Failed to stop recording:', err);
 *   }
 * };
 *
 * <button
 *   onMouseDown={handleStart}
 *   onMouseUp={handleStop}
 *   disabled={!isSupported}
 * >
 *   {isRecording ? 'Recording...' : 'Hold to speak'}
 * </button>
 * {error && <div className="error">{error}</div>}
 */
export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  // Check browser support on mount
  useEffect(() => {
    const supported = isAudioSupported();
    setIsSupported(supported);
    
    if (!supported) {
      setError("Your browser doesn't support audio recording. Please use Chrome, Firefox, or Safari.");
    }

    // Cleanup on unmount
    return () => {
      cleanupAudio();
    };
  }, []);

  /**
   * Starts the recording session.
   * Requests microphone permission and begins capturing audio.
   *
   * @returns {Promise<void>}
   * @throws {AudioManagerError} If recording cannot be started
   */
  const startRecording = async () => {
    // Check browser support first
    if (!isSupported) {
      const errorMsg = "Your browser doesn't support audio recording. Please use Chrome, Firefox, or Safari.";
      setError(errorMsg);
      throw new AudioManagerError('Browser not supported', 'NOT_SUPPORTED', errorMsg);
    }

    try {
      // Clear previous error and audio blob
      setError(null);
      setAudioBlob(null);

      // Start recording via audio manager
      await startAudioRecording();
      
      // Update state on success
      setIsRecording(true);
      console.log('[useRecording] Recording started successfully');

    } catch (err) {
      // Handle AudioManagerError with user-friendly messages
      if (err instanceof AudioManagerError) {
        setError(err.userMessage);
        
        // Provide specific error messages based on error code
        if (err.code === 'PERMISSION_DENIED') {
          console.error('[useRecording] Microphone permission denied');
        } else if (err.code === 'NO_DEVICE') {
          console.error('[useRecording] No microphone device found');
        } else if (err.code === 'NOT_SUPPORTED') {
          console.error('[useRecording] Audio recording not supported');
        }
      } else {
        // Handle unexpected errors
        const errorMsg = 'Failed to start recording. Please try again.';
        setError(errorMsg);
        console.error('[useRecording] Unexpected error:', err);
      }
      
      setIsRecording(false);
      throw err;
    }
  };

  /**
   * Stops the recording session and returns the recorded audio blob.
   *
   * @returns {Promise<Blob|null>} The recorded audio blob in WAV format, or null if recording failed
   * @throws {AudioManagerError} If stopping recording fails
   */
  const stopRecording = async () => {
    try {
      // Stop recording via audio manager
      const blob = await stopAudioRecording();
      
      // Update state on success
      setIsRecording(false);
      setAudioBlob(blob);
      console.log('[useRecording] Recording stopped successfully, blob size:', blob.size);
      
      return blob;

    } catch (err) {
      // Handle errors
      if (err instanceof AudioManagerError) {
        setError(err.userMessage);
        console.error('[useRecording] Error stopping recording:', err.code);
      } else {
        const errorMsg = 'Failed to stop recording. Please try again.';
        setError(errorMsg);
        console.error('[useRecording] Unexpected error:', err);
      }
      
      setIsRecording(false);
      setAudioBlob(null);
      throw err;
    }
  };

  /**
   * Clears the current error state.
   */
  const clearError = () => {
    setError(null);
  };

  return {
    isRecording,
    audioBlob,
    error,
    isSupported,
    startRecording,
    stopRecording,
    clearError,
  };
};

export default useRecording;

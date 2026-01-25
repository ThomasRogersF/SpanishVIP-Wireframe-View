import { useState } from 'react';

/**
 * Custom hook for managing voice recording state.
 * 
 * This is a mock implementation for the wireframe. Actual audio recording
 * will be implemented in later phases.
 * 
 * @returns {Object} Recording state and control functions
 * @returns {boolean} returns.isRecording - Whether recording is currently active
 * @returns {Function} returns.startRecording - Function to start recording
 * @returns {Function} returns.stopRecording - Function to stop recording
 * 
 * @example
 * const { isRecording, startRecording, stopRecording } = useRecording();
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

  /**
   * Starts the recording session.
   * In this mock implementation, only updates state and logs to console.
   */
  const startRecording = () => {
    console.log('[useRecording] Recording started');
    setIsRecording(true);
  };

  /**
   * Stops the recording session.
   * In this mock implementation, only updates state and logs to console.
   */
  const stopRecording = () => {
    console.log('[useRecording] Recording stopped');
    setIsRecording(false);
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};

export default useRecording;

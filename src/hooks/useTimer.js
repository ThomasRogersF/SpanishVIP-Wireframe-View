import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for countdown timer functionality
 * @param {number} initialSeconds - Initial time in seconds (default: 119 for 1:59)
 * @returns {Object} Timer state and control functions
 */
const useTimer = (initialSeconds = 119) => {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Format time as MM:SS with zero-padding
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Start the timer
  const start = useCallback(() => {
    if (intervalRef.current) return; // Already running
    
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer reached zero, stop
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Stop the timer
  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  // Reset the timer
  const reset = useCallback((newTime = initialSeconds) => {
    stop();
    setTimeRemaining(newTime);
  }, [initialSeconds, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isRunning,
    start,
    stop,
    reset,
  };
};

export default useTimer;

import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for countdown timer with auto-start
 * Specifically designed for offer countdown (4:59)
 * @param {number} initialSeconds - Initial time in seconds (default: 299 for 4:59)
 * @returns {Object} Timer state with formattedTime, timeRemaining, and isExpired
 */
const useCountdown = (initialSeconds = 299) => {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef(null);

  // Format time as MM:SS with zero-padding
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Auto-start countdown on mount
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer reached zero, stop
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    formattedTime: formatTime(timeRemaining),
    timeRemaining,
    isExpired,
  };
};

export default useCountdown;

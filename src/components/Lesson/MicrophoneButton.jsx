import React, { useCallback, useRef } from 'react';
import { Box, Fab } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { touchOptimized } from '../shared/sharedStyles';
import { pulseRing } from '../shared/sharedAnimations';

/**
 * Interactive microphone button with hold-to-speak functionality.
 * Features animated pulse rings when recording is active.
 * 
 * Touch-optimized with:
 * - Minimum 48x48px touch target (80x80px actual)
 * - touchAction: 'none' to prevent scroll during hold
 * - Haptic feedback simulation (visual pulse)
 * - No tap highlight on iOS
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isRecording - Whether recording is currently active
 * @param {Function} props.onPressStart - Callback when user starts pressing the button
 * @param {Function} props.onPressEnd - Callback when user releases the button
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * 
 * @example
 * <MicrophoneButton
 *   isRecording={isRecording}
 *   onPressStart={startRecording}
 *   onPressEnd={stopRecording}
 * />
 */
const MicrophoneButton = ({ 
  isRecording, 
  onPressStart, 
  onPressEnd, 
  disabled = false 
}) => {
  // Staggered animation delays for pulse rings
  const pulseDelays = ['0s', '0.7s', '1.4s'];
  
  // Ref to track if touch is active (prevents duplicate events)
  const isTouchActive = useRef(false);

  /**
   * Common styles for pulse ring elements
   */
  const pulseRingStyle = {
    position: 'absolute',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '2px solid #0AA6A6',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  };

  /**
   * Handle touch start - prevents scroll during hold
   */
  const handleTouchStart = useCallback((e) => {
    e.preventDefault(); // Prevent scroll during hold
    isTouchActive.current = true;
    onPressStart?.(e);
  }, [onPressStart]);

  /**
   * Handle touch end
   */
  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    if (isTouchActive.current) {
      isTouchActive.current = false;
      onPressEnd?.(e);
    }
  }, [onPressEnd]);

  /**
   * Handle touch cancel (e.g., when user scrolls away)
   */
  const handleTouchCancel = useCallback((e) => {
    if (isTouchActive.current) {
      isTouchActive.current = false;
      onPressEnd?.(e);
    }
  }, [onPressEnd]);

  /**
   * Handle mouse down - only if not touch device
   */
  const handleMouseDown = useCallback((e) => {
    if (!isTouchActive.current) {
      onPressStart?.(e);
    }
  }, [onPressStart]);

  /**
   * Handle mouse up - only if not touch device
   */
  const handleMouseUp = useCallback((e) => {
    if (!isTouchActive.current) {
      onPressEnd?.(e);
    }
  }, [onPressEnd]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '120px',
        height: '120px',
        // Prevent any touch behavior on container
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
    >
      {/* Animated pulse rings - only visible when recording */}
      {isRecording && pulseDelays.map((delay, index) => (
        <Box
          key={index}
          sx={{
            ...pulseRingStyle,
            animation: `${pulseRing} 2s ease-out infinite`,
            animationDelay: delay,
          }}
        />
      ))}

      {/* Main microphone button */}
      <Fab
        size="large"
        disabled={disabled}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        sx={{
          ...touchOptimized,
          width: '80px',
          height: '80px',
          minWidth: '48px', // WCAG minimum touch target
          minHeight: '48px', // WCAG minimum touch target
          backgroundColor: isRecording ? '#EF4444' : '#0AA6A6',
          color: '#FFFFFF',
          transition: 'background-color 0.3s ease, transform 0.15s ease',
          // Prevent scroll during hold
          touchAction: 'none',
          // Remove iOS tap highlight
          WebkitTapHighlightColor: 'transparent',
          // Prevent text selection
          WebkitUserSelect: 'none',
          userSelect: 'none',
          // Disable ripple on touch for cleaner feedback
          '&:hover': {
            backgroundColor: isRecording ? '#DC2626' : '#099494',
          },
          '&:active': {
            transform: 'scale(0.92)',
          },
          '&.Mui-disabled': {
            backgroundColor: '#9CA3AF',
            color: '#FFFFFF',
          },
          // Focus visible for accessibility
          '&:focus-visible': {
            outline: '3px solid #0AA6A6',
            outlineOffset: '2px',
          },
        }}
        aria-label={isRecording ? 'Recording in progress' : 'Hold to speak'}
      >
        <MicIcon sx={{ fontSize: '36px' }} />
      </Fab>
    </Box>
  );
};

export default MicrophoneButton;

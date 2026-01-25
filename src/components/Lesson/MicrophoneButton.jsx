import React from 'react';
import { Box, Fab } from '@mui/material';
import { keyframes } from '@mui/system';
import MicIcon from '@mui/icons-material/Mic';
import { touchOptimized } from '../shared/sharedStyles';

/**
 * Pulse ring animation for the microphone button.
 * Migrated from src/style.css pulse-ring animation (lines 48-62).
 * Creates a ripple effect that expands outward and fades.
 */
const pulseRing = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.4);
    opacity: 0;
  }
`;

/**
 * Interactive microphone button with hold-to-speak functionality.
 * Features animated pulse rings when recording is active.
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

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '120px',
        height: '120px',
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
        onMouseDown={onPressStart}
        onMouseUp={onPressEnd}
        onMouseLeave={onPressEnd}
        onTouchStart={onPressStart}
        onTouchEnd={onPressEnd}
        sx={{
          ...touchOptimized,
          width: '80px',
          height: '80px',
          backgroundColor: isRecording ? '#EF4444' : '#0AA6A6',
          color: '#FFFFFF',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          '&:hover': {
            backgroundColor: isRecording ? '#DC2626' : '#099494',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
          '&.Mui-disabled': {
            backgroundColor: '#9CA3AF',
            color: '#FFFFFF',
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

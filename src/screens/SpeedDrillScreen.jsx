import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import MicrophoneButton from '../components/Lesson/MicrophoneButton';
import useRecording from '../hooks/useRecording';
import useTimer from '../hooks/useTimer';
import { iosButtonStyle } from '../components/shared/sharedStyles';

/**
 * SpeedDrillScreen Component
 * 
 * Timed vocabulary drill interface with countdown timer and flashcards.
 * 
 * @param {Object} props
 * @param {Function} props.onComplete - Handler to show DrillCompleteScreen
 * @param {Function} props.onClose - Handler to return to dashboard
 * @param {Object} props.flashcardData - Object with emoji, englishText, spanishText
 */
const SpeedDrillScreen = ({
  onComplete,
  onClose,
  flashcardData = {
    emoji: '🍎',
    englishText: 'The Apple',
    spanishText: 'La manzana',
  },
}) => {
  const { isRecording, startRecording, stopRecording } = useRecording();
  const { formattedTime, start, stop } = useTimer(119);
  const [showResponse, setShowResponse] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Start timer on mount
  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, [start, stop]);

  // Handle recording end - show response and auto-advance
  const handlePressEnd = () => {
    stopRecording();
    if (isRecording) {
      setIsProcessing(true);
      // Simulate processing delay
      setTimeout(() => {
        setIsProcessing(false);
        setShowResponse(true);
        // Auto-advance to DrillComplete after showing response
        setTimeout(() => {
          stop();
          onComplete();
        }, 1500);
      }, 500);
    }
  };

  // Get helper text based on current state
  const getHelperText = () => {
    if (isProcessing) return 'Processing...';
    if (isRecording) return 'Recording...';
    return 'Hold to speak';
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9FAFB',
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => {
            stop();
            onClose();
          }}
          sx={{
            ...iosButtonStyle,
            width: 40,
            height: 40,
            backgroundColor: '#F3F4F6',
            '&:hover': {
              backgroundColor: '#E5E7EB',
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 20, color: '#6B7280' }} />
        </IconButton>

        {/* Timer Display */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: '#FFF7ED',
            px: 2,
            py: 0.75,
            borderRadius: 20,
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 18, color: '#EA580C' }} />
          <Typography
            sx={{
              fontFamily: 'Lexend, sans-serif',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: '#EA580C',
            }}
          >
            {formattedTime}
          </Typography>
        </Box>

        {/* Spacer for symmetry */}
        <Box sx={{ width: 40 }} />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 3,
          py: 3,
          overflow: 'auto',
        }}
      >
        {/* Sofia Avatar with excited emoji */}
        <Box sx={{ mb: 3 }}>
          <SofiaAvatar size="medium" emoji="🤩" showGradientBorder={true} />
        </Box>

        {/* Flashcard Card */}
        <Card
          sx={{
            width: '100%',
            maxWidth: 300,
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            mb: 3,
          }}
        >
          {/* Image Area with Emoji */}
          <Box
            sx={{
              aspectRatio: '1/1',
              backgroundColor: '#F9FAFB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '5rem' }}>
              {flashcardData.emoji}
            </Typography>
          </Box>

          {/* Text Section */}
          <Box
            sx={{
              p: 2.5,
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Lexend, sans-serif',
                fontWeight: 700,
                color: '#1F2937',
                mb: 1,
              }}
            >
              {flashcardData.englishText}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Lexend, sans-serif',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#0D9488',
              }}
            >
              Say it in Spanish!
            </Typography>
          </Box>
        </Card>

        {/* User Response Area - Shows after recording */}
        {showResponse && (
          <Box
            sx={{
              width: '100%',
              maxWidth: 300,
              background: 'linear-gradient(135deg, #0D9488 0%, #0AA6A6 100%)',
              borderRadius: 3,
              py: 2,
              px: 3,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Lexend, sans-serif',
                fontWeight: 600,
                fontSize: '1.125rem',
                color: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              {flashcardData.spanishText}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Microphone Section - Fixed at bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 96,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: 3,
        }}
      >
        {/* Helper Text */}
        <Typography
          sx={{
            fontFamily: 'Lexend, sans-serif',
            fontSize: '0.875rem',
            color: isRecording ? '#EF4444' : '#6B7280',
            mb: 2,
            fontWeight: isRecording ? 600 : 400,
          }}
        >
          {getHelperText()}
        </Typography>

        {/* Microphone Button */}
        <MicrophoneButton
          isRecording={isRecording}
          onPressStart={startRecording}
          onPressEnd={handlePressEnd}
          disabled={isProcessing || showResponse}
        />
      </Box>
    </Box>
  );
};

export default SpeedDrillScreen;

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Card, CardContent, IconButton, LinearProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import MicrophoneButton from '../components/Lesson/MicrophoneButton';
import FeedbackCard from '../components/Lesson/FeedbackCard';
import useRecording from '../hooks/useRecording';
import { useNavigation } from '../hooks/useNavigation.js';

const practicePrompts = [
  {
    id: 1,
    instruction: 'Say: I am a student',
    targetPhrase: 'Soy estudiante',
    verb: 'SER',
    explanation: 'Great! "Soy" is correct because being a student is your identity.',
  },
  {
    id: 2,
    instruction: 'Say: I am happy',
    targetPhrase: 'Estoy feliz',
    verb: 'ESTAR',
    explanation: 'Perfect! "Estoy" is used because happiness is a temporary emotion.',
  },
  {
    id: 3,
    instruction: 'Say: You are in Spain',
    targetPhrase: 'Estás en España',
    verb: 'ESTAR',
    explanation: 'Excellent! "Estás" is correct because location always uses ESTAR.',
  },
];

/**
 * SerEstarSpeakingScreen - Speaking practice for Ser vs Estar
 * Uses useNavigation hook for navigation - no props required
 */
const SerEstarSpeakingScreen = () => {
  // Get navigation functions from context
  const { showSuccess, showSerEstarLogic } = useNavigation();

  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);

  // Ref to track timeout ID for cleanup
  const processingTimeoutRef = useRef(null);
  // Ref to track if component is mounted
  const isMountedRef = useRef(true);

  const { isRecording, startRecording, stopRecording } = useRecording();

  const currentPrompt = practicePrompts[currentPromptIndex];
  const progress = ((currentPromptIndex + 1) / practicePrompts.length) * 100;

  // Cleanup timeout on unmount
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
        processingTimeoutRef.current = null;
      }
    };
  }, []);

  /**
   * Handles the start of recording when user presses the microphone
   */
  const handlePressStart = () => {
    if (!isProcessing) {
      startRecording();
    }
  };

  /**
   * Handles the end of recording and simulates AI processing
   */
  const handlePressEnd = () => {
    if (isRecording) {
      stopRecording();
      simulateProcessing();
    }
  };

  /**
   * Simulates AI processing and generates feedback
   */
  const simulateProcessing = () => {
    // Clear any existing timeout before starting a new one
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
      processingTimeoutRef.current = null;
    }
    
    setIsProcessing(true);
    
    // Simulate AI processing delay
    processingTimeoutRef.current = setTimeout(() => {
      // Guard against state updates after unmount
      if (!isMountedRef.current) return;
      
      setIsProcessing(false);
      setFeedbackData({
        feedbackType: 'success',
        message: `You said: "${currentPrompt.targetPhrase}"`,
        suggestion: currentPrompt.explanation,
      });
      setShowFeedback(true);
      processingTimeoutRef.current = null;
    }, 1500);
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
    setFeedbackData(null);
  };

  const handleContinue = () => {
    if (currentPromptIndex < practicePrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setShowFeedback(false);
      setFeedbackData(null);
    } else {
      showSuccess();
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F8FAFC',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          bgcolor: 'white',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <IconButton onClick={showSerEstarLogic} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Lexend',
              fontWeight: 600,
              color: '#1E293B',
              fontSize: '16px',
            }}
          >
            Speaking Practice
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
            Prompt {currentPromptIndex + 1} of {practicePrompts.length}
          </Typography>
        </Box>
      </Box>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 4,
          bgcolor: '#E2E8F0',
          '& .MuiLinearProgress-bar': {
            bgcolor: '#0AA6A6',
          },
        }}
      />

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Sofia Instruction */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <SofiaAvatar size={40} />
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: '16px',
              p: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              flex: 1,
            }}
          >
            <Typography sx={{ fontSize: '14px', color: '#475569' }}>
              Now let's practice speaking! Hold the microphone and say the phrase in Spanish.
            </Typography>
          </Box>
        </Box>

        {/* Prompt Card */}
        <Card
          sx={{
            bgcolor: '#F0FDFA',
            borderLeft: '4px solid #0AA6A6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '16px',
          }}
        >
          <CardContent sx={{ py: 3 }}>
            <Typography
              sx={{
                fontSize: '14px',
                color: '#64748B',
                mb: 1,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {currentPrompt.instruction}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Lexend',
                fontWeight: 600,
                fontSize: '24px',
                color: '#0F766E',
              }}
            >
              {currentPrompt.targetPhrase}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: 'inline-block',
                bgcolor: currentPrompt.verb === 'SER' ? '#E0F2FE' : '#FEF3C7',
                px: 1.5,
                py: 0.5,
                borderRadius: '8px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: currentPrompt.verb === 'SER' ? '#0369A1' : '#B45309',
                }}
              >
                Uses {currentPrompt.verb}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Microphone Button */}
        {!showFeedback && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              mt: 2,
            }}
          >
            <MicrophoneButton
              isRecording={isRecording}
              onPressStart={handlePressStart}
              onPressEnd={handlePressEnd}
              disabled={isProcessing}
            />
            <Typography sx={{ fontSize: '14px', color: '#64748B' }}>
              {isProcessing
                ? 'Processing...'
                : isRecording
                ? 'Recording... Release to stop'
                : 'Hold to speak'}
            </Typography>
          </Box>
        )}

        {/* Feedback Card */}
        {showFeedback && feedbackData && (
          <FeedbackCard
            feedbackType={feedbackData.feedbackType}
            message={feedbackData.message}
            suggestion={feedbackData.suggestion}
            onTryAgain={handleTryAgain}
            onContinue={handleContinue}
            continueLabel={
              currentPromptIndex < practicePrompts.length - 1
                ? 'Next Prompt'
                : 'Complete Practice'
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default SerEstarSpeakingScreen;

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, LinearProgress, Card, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MicrophoneButton from '../components/Lesson/MicrophoneButton';
import FeedbackCard from '../components/Lesson/FeedbackCard';
import { useRecording } from '../hooks/useRecording';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import { iosButtonStyle } from '../components/shared/sharedStyles';

/**
 * Main lesson runner screen component.
 * Displays lesson content, handles voice recording interactions,
 * and provides feedback on user responses.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onComplete - Callback when lesson is completed
 * @param {Function} props.onBack - Callback to navigate back to dashboard
 * 
 * @example
 * <LessonScreen
 *   onComplete={() => console.log('Lesson completed')}
 *   onBack={() => setScreen('dashboard')}
 * />
 */
const LessonScreen = ({ onComplete, onBack }) => {
  // Lesson state management
  const [lessonProgress, setLessonProgress] = useState(25);
  const [currentStep, setCurrentStep] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    type: 'success',
    message: '',
    suggestion: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Ref to track timeout ID for cleanup
  const processingTimeoutRef = useRef(null);
  // Ref to track if component is mounted
  const isMountedRef = useRef(true);

  // Recording hook
  const { isRecording, startRecording, stopRecording } = useRecording();

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

  // Total steps in the lesson
  const totalSteps = 4;

  /**
   * Mock feedback responses for demonstration
   */
  const mockFeedbackResponses = [
    {
      type: 'success',
      message: 'Great pronunciation! You nailed the polite form.',
      suggestion: '',
    },
    {
      type: 'error',
      message: 'Almost there!',
      suggestion: 'Try emphasizing "por favor" more at the end.',
    },
    {
      type: 'success',
      message: 'Excellent! Your intonation was perfect.',
      suggestion: '',
    },
    {
      type: 'info',
      message: 'Good effort! Keep practicing.',
      suggestion: 'Remember to roll the "r" in "quisiera".',
    },
  ];

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
   * Simulates AI processing and generates mock feedback
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
      
      // Get random feedback or use step-based feedback
      const feedbackIndex = (currentStep - 1) % mockFeedbackResponses.length;
      const feedback = mockFeedbackResponses[feedbackIndex];
      
      setFeedbackData({
        type: feedback.type,
        message: feedback.message,
        suggestion: feedback.suggestion,
      });
      setShowFeedback(true);
      setIsProcessing(false);
      processingTimeoutRef.current = null;
    }, 1500);
  };

  /**
   * Handles "Try Again" action - resets feedback state
   */
  const handleTryAgain = () => {
    setShowFeedback(false);
    setFeedbackData({ type: 'success', message: '', suggestion: '' });
  };

  /**
   * Handles "Continue" action - advances to next step or completes lesson
   */
  const handleContinue = () => {
    if (currentStep >= totalSteps) {
      // Lesson complete
      if (onComplete) {
        onComplete();
      }
    } else {
      // Advance to next step
      setCurrentStep(prev => prev + 1);
      setLessonProgress(prev => Math.min(prev + 25, 100));
      setShowFeedback(false);
      setFeedbackData({ type: 'success', message: '', suggestion: '' });
    }
  };

  /**
   * Gets helper text based on current state
   */
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
        overflow: 'hidden',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          px: 2,
          pt: 1.5,
          pb: 2,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        {/* Back button and title row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1.5,
          }}
        >
          <IconButton
            onClick={onBack}
            sx={{
              mr: 1,
              color: '#0AA6A6',
              '&:hover': {
                backgroundColor: 'rgba(10, 166, 166, 0.08)',
              },
            }}
            aria-label="Go back to dashboard"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '16px',
              color: '#1F2937',
            }}
          >
            Lesson 4: Ordering with Politeness
          </Typography>
        </Box>

        {/* Progress bar */}
        <Box sx={{ px: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: '#6B7280', fontSize: '12px' }}
            >
              Step {currentStep} of {totalSteps}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#6B7280', fontSize: '12px' }}
            >
              {lessonProgress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={lessonProgress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: '#E5E7EB',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#0AA6A6',
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          px: 2.5,
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        {/* Instruction Card */}
        <Card
          sx={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            p: 2.5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              mb: 2,
            }}
          >
            <SofiaAvatar size="medium" />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#6B7280',
                  fontSize: '13px',
                  mb: 0.5,
                }}
              >
                Say this phrase in Spanish:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: '#1F2937',
                  fontSize: '15px',
                }}
              >
                "I would like a coffee, please"
              </Typography>
            </Box>
          </Box>

          {/* Target phrase highlight */}
          <Box
            sx={{
              backgroundColor: '#F0FDFA',
              borderRadius: '12px',
              p: 2,
              borderLeft: '4px solid #0AA6A6',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: '#0AA6A6',
                fontWeight: 600,
                fontSize: '16px',
                fontStyle: 'italic',
              }}
            >
              "Quisiera un café, por favor"
            </Typography>
          </Box>
        </Card>

        {/* Microphone Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 3,
          }}
        >
          <MicrophoneButton
            isRecording={isRecording}
            onPressStart={handlePressStart}
            onPressEnd={handlePressEnd}
            disabled={isProcessing}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: isRecording ? '#EF4444' : '#6B7280',
              fontSize: '14px',
              fontWeight: isRecording ? 500 : 400,
              transition: 'color 0.3s ease',
            }}
          >
            {getHelperText()}
          </Typography>
        </Box>

        {/* Feedback Section */}
        {showFeedback && (
          <FeedbackCard
            feedbackType={feedbackData.type}
            message={feedbackData.message}
            suggestion={feedbackData.suggestion}
            onTryAgain={handleTryAgain}
            onContinue={handleContinue}
          />
        )}
      </Box>
    </Box>
  );
};

export default LessonScreen;

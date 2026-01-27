import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigation } from '../hooks/useNavigation';
import travelLessonData from '../data/travelLessonData';
import FeedbackCard from '../components/Lesson/FeedbackCard';
import { iosButtonStyle } from '../components/shared/sharedStyles';
import { shake } from '../components/shared/sharedAnimations';

/**
 * Travel Translation Screen (Activity 3 of 12)
 * 
 * User selects the correct Spanish translation from multiple choice options.
 * This is the third activity in the Travel lesson sequence.
 * 
 * @component
 */
const TravelTranslationScreen = () => {
  const { showDashboard, showTravelTrueFalse } = useNavigation();
  const data = travelLessonData.translation;
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  /**
   * Handle option selection
   * @param {string} optionId - The ID of the selected option (A, B, or C)
   */
  const handleSelectOption = (optionId) => {
    if (showResult) return; // Prevent selection after answer is checked
    setSelectedAnswer(optionId);
  };

  /**
   * Check the selected answer
   */
  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    
    const correct = selectedAnswer === data.correctAnswer;
    setIsCorrect(correct);
    
    if (!correct) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
    
    setShowResult(true);
  };

  /**
   * Reset selection for another attempt
   */
  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  /**
   * Navigate to next activity (True/False)
   */
  const handleContinue = () => {
    showTravelTrueFalse();
  };

  /**
   * Get button styles based on selection and result state
   */
  const getOptionStyles = (optionId, isOptionCorrect) => {
    const isSelected = selectedAnswer === optionId;

    if (showResult) {
      if (isOptionCorrect) {
        // Correct answer - always show green
        return {
          backgroundColor: '#D1FAE5',
          borderColor: '#10B981',
          color: '#047857',
        };
      }
      if (isSelected && !isOptionCorrect) {
        // Wrong selection - show red
        return {
          backgroundColor: '#FEE2E2',
          borderColor: '#EF4444',
          color: '#B91C1C',
        };
      }
      // Other options when result shown
      return {
        backgroundColor: '#F3F4F6',
        borderColor: '#E5E7EB',
        color: '#9CA3AF',
      };
    }

    if (isSelected) {
      return {
        backgroundColor: 'rgba(10, 166, 166, 0.15)',
        borderColor: '#0AA6A6',
        color: '#0AA6A6',
      };
    }

    return {
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E7EB',
      color: '#374151',
    };
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#F9FAFB',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #E5E7EB',
          backgroundColor: '#FFFFFF',
        }}
      >
        <IconButton
          onClick={showDashboard}
          sx={{ ...iosButtonStyle, color: '#374151' }}
          aria-label="Back to dashboard"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#111827',
            fontSize: '16px',
          }}
        >
          Translation
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#6B7280',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          Activity {data.activityNumber} of {data.totalActivities}
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5, backgroundColor: '#FFFFFF' }}>
        <Box
          sx={{
            height: 6,
            backgroundColor: '#E5E7EB',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${(data.activityNumber / data.totalActivities) * 100}%`,
              backgroundColor: '#14B8A6',
              borderRadius: 3,
              transition: 'width 0.3s ease',
            }}
          />
        </Box>
      </Box>

      {/* Content Area */}
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
        {/* Question Card */}
        <Card
          sx={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: '#111827',
                fontSize: '20px',
                lineHeight: 1.4,
              }}
            >
              {data.question}
            </Typography>
          </CardContent>
        </Card>

        {/* Multiple Choice Options */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            animation: isShaking ? `${shake} 0.5s ease` : 'none',
          }}
        >
          {data.options.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={showResult}
              sx={{
                ...iosButtonStyle,
                ...getOptionStyles(option.id, option.isCorrect),
                py: 2,
                px: 2.5,
                borderRadius: '12px',
                border: '2px solid',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                justifyContent: 'flex-start',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: showResult
                    ? undefined
                    : selectedAnswer === option.id
                      ? 'rgba(10, 166, 166, 0.2)'
                      : 'rgba(10, 166, 166, 0.08)',
                },
                '&.Mui-disabled': {
                  ...getOptionStyles(option.id, option.isCorrect),
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: selectedAnswer === option.id
                    ? showResult
                      ? option.isCorrect
                        ? '#10B981'
                        : '#EF4444'
                      : '#0AA6A6'
                    : showResult && option.isCorrect
                      ? '#10B981'
                      : '#E5E7EB',
                  color: selectedAnswer === option.id || (showResult && option.isCorrect)
                    ? '#FFFFFF'
                    : '#6B7280',
                  fontWeight: 700,
                  fontSize: '13px',
                  mr: 1.5,
                  flexShrink: 0,
                }}
              >
                {option.id}
              </Box>
              {option.text}
            </Button>
          ))}
        </Box>

        {/* Check Answer Button */}
        {selectedAnswer && !showResult && (
          <Button
            variant="contained"
            onClick={handleCheckAnswer}
            sx={{
              ...iosButtonStyle,
              py: 1.5,
              borderRadius: '12px',
              backgroundColor: '#0AA6A6',
              color: '#FFFFFF',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#099494',
              },
            }}
          >
            Check Answer
          </Button>
        )}

        {/* Feedback Card */}
        {showResult && (
          <FeedbackCard
            feedbackType={isCorrect ? 'success' : 'error'}
            message={isCorrect ? data.feedback.correct : data.feedback.incorrect}
            onTryAgain={!isCorrect ? handleTryAgain : undefined}
            onContinue={isCorrect ? handleContinue : undefined}
          />
        )}
      </Box>
    </Box>
  );
};

export default TravelTranslationScreen;

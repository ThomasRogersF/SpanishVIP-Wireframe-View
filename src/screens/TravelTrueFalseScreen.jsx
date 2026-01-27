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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigation } from '../hooks/useNavigation';
import travelLessonData from '../data/travelLessonData';
import FeedbackCard from '../components/Lesson/FeedbackCard';
import { iosButtonStyle } from '../components/shared/sharedStyles';
import { shake } from '../components/shared/sharedAnimations';

/**
 * Travel True/False Screen (Activity 4 of 12)
 * 
 * User evaluates if the Spanish sentence is grammatically correct.
 * This is the fourth activity in the Travel lesson sequence, focusing on
 * grammar concept validation (specifically article usage with country names).
 * 
 * @component
 */
const TravelTrueFalseScreen = () => {
  const { showDashboard, showTravelSentenceBuilder } = useNavigation();
  const data = travelLessonData.trueFalse;
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  /**
   * Handle True/False selection
   * @param {boolean} answer - The selected answer (true or false)
   */
  const handleSelectAnswer = (answer) => {
    if (showResult) return; // Prevent selection after answer is checked
    setSelectedAnswer(answer);
  };

  /**
   * Check the selected answer
   */
  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
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
   * Navigate to next activity (Sentence Builder)
   */
  const handleContinue = () => {
    showTravelSentenceBuilder();
  };

  /**
   * Get button styles based on selection and result state
   * @param {boolean} buttonValue - The value of this button (true or false)
   */
  const getButtonStyles = (buttonValue) => {
    const isSelected = selectedAnswer === buttonValue;
    const isButtonCorrect = buttonValue === data.correctAnswer;

    if (showResult) {
      if (isButtonCorrect) {
        // Correct answer - always show green
        return {
          backgroundColor: '#D1FAE5',
          borderColor: '#10B981',
          color: '#047857',
        };
      }
      if (isSelected && !isButtonCorrect) {
        // Wrong selection - show red
        return {
          backgroundColor: '#FEE2E2',
          borderColor: '#EF4444',
          color: '#B91C1C',
        };
      }
      // Other option when result shown
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
          True or False
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
        {/* Statement Card */}
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
                mb: 1,
              }}
            >
              {data.statement}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                fontSize: '14px',
                fontStyle: 'italic',
              }}
            >
              {data.statementTranslation}
            </Typography>
          </CardContent>
        </Card>

        {/* True/False Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            animation: isShaking ? `${shake} 0.5s ease` : 'none',
          }}
        >
          <Button
            onClick={() => handleSelectAnswer(true)}
            disabled={showResult}
            sx={{
              ...iosButtonStyle,
              ...getButtonStyles(true),
              py: 2.5,
              borderRadius: '12px',
              border: '2px solid',
              textTransform: 'none',
              fontSize: '18px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: showResult
                  ? undefined
                  : selectedAnswer === true
                    ? 'rgba(10, 166, 166, 0.2)'
                    : 'rgba(10, 166, 166, 0.08)',
              },
              '&.Mui-disabled': {
                ...getButtonStyles(true),
              },
            }}
          >
            True
          </Button>

          <Button
            onClick={() => handleSelectAnswer(false)}
            disabled={showResult}
            sx={{
              ...iosButtonStyle,
              ...getButtonStyles(false),
              py: 2.5,
              borderRadius: '12px',
              border: '2px solid',
              textTransform: 'none',
              fontSize: '18px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: showResult
                  ? undefined
                  : selectedAnswer === false
                    ? 'rgba(10, 166, 166, 0.2)'
                    : 'rgba(10, 166, 166, 0.08)',
              },
              '&.Mui-disabled': {
                ...getButtonStyles(false),
              },
            }}
          >
            False
          </Button>
        </Box>

        {/* Check Answer Button */}
        {selectedAnswer !== null && !showResult && (
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

        {/* Explanation Card - shows after result */}
        {showResult && (
          <Card
            sx={{
              borderRadius: '12px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              boxShadow: 'none',
            }}
          >
            <CardContent sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <InfoOutlinedIcon sx={{ color: '#3B82F6', fontSize: 20, mt: 0.25 }} />
              <Typography
                variant="body2"
                sx={{
                  color: '#1E40AF',
                  fontSize: '14px',
                  lineHeight: 1.5,
                }}
              >
                {data.explanation}
              </Typography>
            </CardContent>
          </Card>
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

export default TravelTrueFalseScreen;

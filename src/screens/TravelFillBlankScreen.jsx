import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Collapse,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigation } from '../hooks/useNavigation';
import travelLessonData from '../data/travelLessonData';
import FeedbackCard from '../components/Lesson/FeedbackCard';
import { iosButtonStyle } from '../components/shared/sharedStyles';
import { shake } from '../components/shared/sharedAnimations';

/**
 * Travel Fill-in-the-Blank Screen (Activity 6 of 12)
 * 
 * User selects the correct verb form to complete the sentence.
 * This is a cloze test focusing on preterite vs imperfect verb tenses.
 * 
 * @component
 */
const TravelFillBlankScreen = () => {
  const { showDashboard, showTravelAudioTranscription } = useNavigation();
  const data = travelLessonData.fillBlank;
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showHint, setShowHint] = useState(false);

  /**
   * Handle option selection
   * @param {string} optionId - The ID of the selected option
   */
  const handleSelectOption = (optionId) => {
    if (showResult) return;
    setSelectedOption(optionId);
  };

  /**
   * Check the selected answer
   */
  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    
    const selectedOpt = data.options.find(opt => opt.id === selectedOption);
    const correct = selectedOpt?.text === data.correctAnswer;
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
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  /**
   * Navigate to next activity (Audio Transcription)
   */
  const handleContinue = () => {
    showTravelAudioTranscription();
  };

  /**
   * Toggle grammar hint visibility
   */
  const toggleHint = () => {
    setShowHint(prev => !prev);
  };

  /**
   * Get option button styles based on selection and result state
   * @param {Object} option - The option object
   */
  const getOptionStyles = (option) => {
    const isSelected = selectedOption === option.id;
    const isOptionCorrect = option.text === data.correctAnswer;

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

  /**
   * Render sentence with highlighted blank
   */
  const renderSentenceWithBlank = () => {
    // Split the sentence at the blank marker (______)
    const parts = data.sentence.split('______');
    
    return (
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: 500,
          color: '#111827',
          fontSize: '18px',
          lineHeight: 1.6,
          textAlign: 'center',
        }}
      >
        {parts[0]}
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            minWidth: 100,
            borderBottom: '3px solid',
            borderColor: showResult
              ? isCorrect ? '#10B981' : '#EF4444'
              : selectedOption ? '#0AA6A6' : '#9CA3AF',
            mx: 0.5,
            px: 1,
            pb: 0.5,
            fontWeight: 600,
            color: showResult
              ? isCorrect ? '#047857' : '#B91C1C'
              : selectedOption ? '#0AA6A6' : '#9CA3AF',
            backgroundColor: showResult
              ? isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
              : selectedOption ? 'rgba(10, 166, 166, 0.08)' : 'transparent',
            borderRadius: '4px 4px 0 0',
            transition: 'all 0.2s ease',
          }}
        >
          {selectedOption 
            ? data.options.find(opt => opt.id === selectedOption)?.text 
            : '______'
          }
        </Box>
        {parts[1]}
      </Typography>
    );
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
          Fill in the Blank
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
        {/* Sentence Card */}
        <Card
          sx={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            animation: isShaking ? `${shake} 0.5s ease` : 'none',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {renderSentenceWithBlank()}
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                fontSize: '14px',
                fontStyle: 'italic',
                mt: 2,
                textAlign: 'center',
              }}
            >
              {data.sentenceTranslation}
            </Typography>
          </CardContent>
        </Card>

        {/* Grammar Hint (Collapsible) */}
        <Card
          sx={{
            borderRadius: '12px',
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            boxShadow: 'none',
          }}
        >
          <Box
            onClick={toggleHint}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoOutlinedIcon sx={{ color: '#3B82F6', fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{
                  color: '#1E40AF',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Grammar Hint
              </Typography>
            </Box>
            <IconButton size="small" sx={{ color: '#3B82F6' }}>
              {showHint ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={showHint}>
            <Box sx={{ px: 2, pb: 2 }}>
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
            </Box>
          </Collapse>
        </Card>

        {/* Multiple Choice Options */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {data.options.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={showResult}
              sx={{
                ...iosButtonStyle,
                ...getOptionStyles(option),
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
                    : selectedOption === option.id
                      ? 'rgba(10, 166, 166, 0.2)'
                      : 'rgba(10, 166, 166, 0.08)',
                },
                '&.Mui-disabled': {
                  ...getOptionStyles(option),
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
                  backgroundColor: selectedOption === option.id
                    ? showResult
                      ? option.text === data.correctAnswer
                        ? '#10B981'
                        : '#EF4444'
                      : '#0AA6A6'
                    : showResult && option.text === data.correctAnswer
                      ? '#10B981'
                      : '#E5E7EB',
                  color: selectedOption === option.id || (showResult && option.text === data.correctAnswer)
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
        {selectedOption && !showResult && (
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

        {/* Feedback Card with Explanation */}
        {showResult && (
          <>
            {/* Show explanation in feedback context */}
            <Card
              sx={{
                borderRadius: '12px',
                backgroundColor: isCorrect ? '#ECFDF5' : '#FEF2F2',
                border: `1px solid ${isCorrect ? '#A7F3D0' : '#FECACA'}`,
                boxShadow: 'none',
              }}
            >
              <CardContent sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <InfoOutlinedIcon 
                  sx={{ 
                    color: isCorrect ? '#10B981' : '#EF4444', 
                    fontSize: 20, 
                    mt: 0.25 
                  }} 
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: isCorrect ? '#047857' : '#B91C1C',
                    fontSize: '14px',
                    lineHeight: 1.5,
                  }}
                >
                  {data.explanation}
                </Typography>
              </CardContent>
            </Card>

            <FeedbackCard
              feedbackType={isCorrect ? 'success' : 'error'}
              message={isCorrect ? data.feedback.correct : data.feedback.incorrect}
              onTryAgain={!isCorrect ? handleTryAgain : undefined}
              onContinue={isCorrect ? handleContinue : undefined}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default TravelFillBlankScreen;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigation } from '../hooks/useNavigation';
import travelLessonData from '../data/travelLessonData';
import FeedbackCard from '../components/Lesson/FeedbackCard';
import { iosButtonStyle } from '../components/shared/sharedStyles';
import { shake } from '../components/shared/sharedAnimations';

/**
 * Travel Image Select Screen (Activity 1 of 12)
 * 
 * User selects the correct image matching the Spanish vocabulary word "La Maleta".
 * This is the first activity in the Travel lesson sequence.
 * 
 * @component
 */
const TravelImageSelectScreen = () => {
  const { showDashboard, showTravelTapPair } = useNavigation();
  const data = travelLessonData.imageSelect;
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  /**
   * Handle image option selection
   * @param {string} optionId - The ID of the selected option (A, B, C, or D)
   */
  const handleSelect = (optionId) => {
    if (showFeedback) return; // Prevent selection after answer is submitted
    
    setSelectedOption(optionId);
    const correct = optionId === data.correctAnswer;
    setIsCorrect(correct);
    
    if (!correct) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
    
    setShowFeedback(true);
  };

  /**
   * Reset selection for another attempt
   */
  const handleTryAgain = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  /**
   * Navigate to next activity (Tap Pair)
   */
  const handleContinue = () => {
    showTravelTapPair();
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
          Image Select
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
        {/* Prompt Card */}
        <Card
          sx={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#111827',
                fontSize: '18px',
                mb: 1,
              }}
            >
              {data.prompt}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                fontSize: '14px',
              }}
            >
              {data.promptTranslation}
            </Typography>
          </CardContent>
        </Card>

        {/* Image Options Grid */}
        <Box
          sx={{
            animation: isShaking ? `${shake} 0.5s ease` : 'none',
          }}
        >
          <Grid container spacing={1.5}>
            {data.options.map((option) => (
              <Grid item xs={6} key={option.id}>
                <Card
                  onClick={() => handleSelect(option.id)}
                  sx={{
                    ...iosButtonStyle,
                    borderRadius: '12px',
                    cursor: showFeedback ? 'default' : 'pointer',
                    overflow: 'hidden',
                    position: 'relative',
                    border: selectedOption === option.id
                      ? isCorrect
                        ? '3px solid #10B981'
                        : '3px solid #EF4444'
                      : '3px solid transparent',
                    boxShadow: selectedOption === option.id
                      ? isCorrect
                        ? '0 0 12px rgba(16, 185, 129, 0.3)'
                        : '0 0 12px rgba(239, 68, 68, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.08)',
                    opacity: showFeedback && selectedOption !== option.id ? 0.6 : 1,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Option Label Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: selectedOption === option.id
                        ? isCorrect
                          ? '#10B981'
                          : '#EF4444'
                        : 'rgba(0, 0, 0, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '14px',
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Box>

                  {/* Image */}
                  <Box
                    component="img"
                    src={option.imageUrl}
                    alt={option.altText}
                    sx={{
                      width: '100%',
                      height: 120,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Feedback Card */}
        {showFeedback && (
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

export default TravelImageSelectScreen;

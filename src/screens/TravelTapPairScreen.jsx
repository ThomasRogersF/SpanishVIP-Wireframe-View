import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigation } from '../hooks/useNavigation';
import travelLessonData from '../data/travelLessonData';
import FeedbackCard from '../components/Lesson/FeedbackCard';
import { iosButtonStyle } from '../components/shared/sharedStyles';
import { shake } from '../components/shared/sharedAnimations';

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array copy
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Travel Tap Pair Screen (Activity 2 of 12)
 * 
 * User matches Spanish words with their English translations by tapping pairs.
 * Words are displayed in two columns (Spanish left, English right) in random order.
 * 
 * @component
 */
const TravelTapPairScreen = () => {
  const { showDashboard, showTravelTranslation } = useNavigation();
  const data = travelLessonData.tapPair;
  
  const [selectedSpanish, setSelectedSpanish] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [shakingColumn, setShakingColumn] = useState(null);

  // Shuffle words once on mount
  const shuffledSpanish = useMemo(() => shuffleArray(data.pairs), [data.pairs]);
  const shuffledEnglish = useMemo(() => shuffleArray(data.pairs), [data.pairs]);

  /**
   * Check if pair matches when both words are selected
   */
  useEffect(() => {
    if (selectedSpanish !== null && selectedEnglish !== null) {
      const isMatch = selectedSpanish === selectedEnglish;
      
      if (isMatch) {
        // Correct match - add to matched pairs
        setMatchedPairs((prev) => [...prev, selectedSpanish]);
        setSelectedSpanish(null);
        setSelectedEnglish(null);
      } else {
        // Incorrect match - shake and reset
        setIsShaking(true);
        setShakingColumn('both');
        setTimeout(() => {
          setIsShaking(false);
          setShakingColumn(null);
          setSelectedSpanish(null);
          setSelectedEnglish(null);
        }, 500);
      }
    }
  }, [selectedSpanish, selectedEnglish]);

  /**
   * Show completion feedback when all pairs matched
   */
  useEffect(() => {
    if (matchedPairs.length === data.pairs.length && data.pairs.length > 0) {
      setTimeout(() => setShowFeedback(true), 300);
    }
  }, [matchedPairs.length, data.pairs.length]);

  /**
   * Handle Spanish word selection
   * @param {number} pairId - ID of the selected pair
   */
  const handleSpanishSelect = (pairId) => {
    if (matchedPairs.includes(pairId)) return;
    setSelectedSpanish(pairId);
  };

  /**
   * Handle English word selection
   * @param {number} pairId - ID of the selected pair
   */
  const handleEnglishSelect = (pairId) => {
    if (matchedPairs.includes(pairId)) return;
    setSelectedEnglish(pairId);
  };

  /**
   * Navigate to next activity (Translation)
   */
  const handleContinue = () => {
    showTravelTranslation();
  };

  /**
   * Get button styles based on selection and match state
   */
  const getButtonStyles = (pairId, isSpanish) => {
    const isMatched = matchedPairs.includes(pairId);
    const isSelected = isSpanish
      ? selectedSpanish === pairId
      : selectedEnglish === pairId;

    if (isMatched) {
      return {
        backgroundColor: '#D1FAE5',
        borderColor: '#10B981',
        color: '#047857',
        cursor: 'default',
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
          Tap the Pair
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
        {/* Instruction Card */}
        <Card
          sx={{
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <CardContent sx={{ p: 2, textAlign: 'center' }}>
            <Typography
              variant="body1"
              sx={{
                color: '#374151',
                fontSize: '15px',
              }}
            >
              {data.instruction}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                fontSize: '13px',
                mt: 1,
              }}
            >
              Matched: {matchedPairs.length} / {data.pairs.length}
            </Typography>
          </CardContent>
        </Card>

        {/* Two Column Word Layout */}
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            flex: 1,
          }}
        >
          {/* Spanish Column */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              animation: isShaking && (shakingColumn === 'both' || shakingColumn === 'spanish')
                ? `${shake} 0.5s ease`
                : 'none',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#6B7280',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '11px',
                textAlign: 'center',
                mb: 0.5,
              }}
            >
              Español
            </Typography>
            {shuffledSpanish.map((pair) => (
              <Button
                key={`spanish-${pair.id}`}
                onClick={() => handleSpanishSelect(pair.id)}
                disabled={matchedPairs.includes(pair.id)}
                sx={{
                  ...iosButtonStyle,
                  ...getButtonStyles(pair.id, true),
                  py: 1.5,
                  px: 2,
                  borderRadius: '12px',
                  border: '2px solid',
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  justifyContent: 'center',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: matchedPairs.includes(pair.id)
                      ? '#D1FAE5'
                      : 'rgba(10, 166, 166, 0.08)',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#D1FAE5',
                    borderColor: '#10B981',
                    color: '#047857',
                  },
                }}
              >
                {pair.spanish}
                {matchedPairs.includes(pair.id) && (
                  <CheckCircleIcon
                    sx={{
                      position: 'absolute',
                      right: 8,
                      fontSize: 18,
                      color: '#10B981',
                    }}
                  />
                )}
              </Button>
            ))}
          </Box>

          {/* English Column */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              animation: isShaking && (shakingColumn === 'both' || shakingColumn === 'english')
                ? `${shake} 0.5s ease`
                : 'none',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#6B7280',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '11px',
                textAlign: 'center',
                mb: 0.5,
              }}
            >
              English
            </Typography>
            {shuffledEnglish.map((pair) => (
              <Button
                key={`english-${pair.id}`}
                onClick={() => handleEnglishSelect(pair.id)}
                disabled={matchedPairs.includes(pair.id)}
                sx={{
                  ...iosButtonStyle,
                  ...getButtonStyles(pair.id, false),
                  py: 1.5,
                  px: 2,
                  borderRadius: '12px',
                  border: '2px solid',
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  justifyContent: 'center',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: matchedPairs.includes(pair.id)
                      ? '#D1FAE5'
                      : 'rgba(10, 166, 166, 0.08)',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#D1FAE5',
                    borderColor: '#10B981',
                    color: '#047857',
                  },
                }}
              >
                {pair.english}
                {matchedPairs.includes(pair.id) && (
                  <CheckCircleIcon
                    sx={{
                      position: 'absolute',
                      right: 8,
                      fontSize: 18,
                      color: '#10B981',
                    }}
                  />
                )}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Feedback Card - shown when all pairs are matched */}
        {showFeedback && (
          <FeedbackCard
            feedbackType="success"
            message={data.feedback.allMatched}
            onContinue={handleContinue}
          />
        )}
      </Box>
    </Box>
  );
};

export default TravelTapPairScreen;

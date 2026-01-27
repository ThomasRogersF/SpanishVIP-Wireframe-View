import React, { useState, useCallback } from 'react';
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
 * Travel Sentence Builder Screen (Activity 5 of 12)
 * 
 * User arranges scrambled words to form a correct sentence using
 * drag-and-drop or tap-to-add interactions. Includes a distractor word
 * to test understanding of preterite vs imperfect tense.
 * 
 * @component
 */
const TravelSentenceBuilderScreen = () => {
  const { showDashboard, showTravelFillBlank } = useNavigation();
  const data = travelLessonData.sentenceBuilder;
  
  // State for word management
  const [placedWords, setPlacedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(data.scrambledWords);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  /**
   * Handle drag start - store word ID in dataTransfer
   * @param {DragEvent} e - The drag event
   * @param {Object} word - The word object being dragged
   */
  const handleDragStart = (e, word) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(word));
    e.dataTransfer.effectAllowed = 'move';
  };

  /**
   * Handle drag over the drop zone
   * @param {DragEvent} e - The drag event
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  /**
   * Handle drag leave from drop zone
   */
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  /**
   * Handle drop in the answer area
   * @param {DragEvent} e - The drop event
   */
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const wordData = JSON.parse(e.dataTransfer.getData('text/plain'));
      addWordToAnswer(wordData);
    } catch (error) {
      console.error('Error parsing dropped word:', error);
    }
  };

  /**
   * Add a word to the answer area (tap or drag)
   * @param {Object} word - The word object to add
   */
  const addWordToAnswer = useCallback((word) => {
    if (showResult) return;
    
    // Check if word is already placed
    if (placedWords.find(w => w.id === word.id)) return;
    
    setPlacedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter(w => w.id !== word.id));
  }, [placedWords, showResult]);

  /**
   * Remove a word from the answer area back to word bank
   * @param {Object} word - The word object to remove
   */
  const removeWordFromAnswer = useCallback((word) => {
    if (showResult) return;
    
    setPlacedWords(prev => prev.filter(w => w.id !== word.id));
    setAvailableWords(prev => [...prev, word]);
  }, [showResult]);

  /**
   * Check the answer by comparing placed word IDs to correct order
   */
  const handleCheckAnswer = () => {
    if (placedWords.length === 0) return;
    
    // Get the IDs of placed words in order
    const placedIds = placedWords.map(w => w.id);
    
    // Check if IDs match correct order
    const correct = 
      placedIds.length === data.correctOrder.length &&
      placedIds.every((id, index) => id === data.correctOrder[index]);
    
    setIsCorrect(correct);
    
    if (!correct) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
    
    setShowResult(true);
  };

  /**
   * Reset the activity for another attempt
   */
  const handleTryAgain = () => {
    setPlacedWords([]);
    setAvailableWords(data.scrambledWords);
    setShowResult(false);
    setIsCorrect(false);
  };

  /**
   * Navigate to next activity (Fill in the Blank)
   */
  const handleContinue = () => {
    showTravelFillBlank();
  };

  /**
   * Get chip styles based on state
   * @param {boolean} isDistractor - Whether the word is a distractor
   */
  const getChipStyles = (isDistractor = false) => ({
    ...iosButtonStyle,
    py: 1.25,
    px: 2,
    borderRadius: '12px',
    border: '2px solid',
    borderColor: isDistractor ? '#D1D5DB' : '#E5E7EB',
    backgroundColor: isDistractor ? '#F9FAFB' : '#FFFFFF',
    color: '#374151',
    textTransform: 'none',
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'grab',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(10, 166, 166, 0.08)',
      borderColor: '#0AA6A6',
    },
    '&:active': {
      cursor: 'grabbing',
    },
  });

  /**
   * Get placed word chip styles
   */
  const getPlacedChipStyles = () => ({
    ...iosButtonStyle,
    py: 1,
    px: 1.5,
    borderRadius: '10px',
    border: '2px solid',
    borderColor: showResult 
      ? isCorrect ? '#10B981' : '#EF4444'
      : '#0AA6A6',
    backgroundColor: showResult
      ? isCorrect ? '#D1FAE5' : '#FEE2E2'
      : 'rgba(10, 166, 166, 0.15)',
    color: showResult
      ? isCorrect ? '#047857' : '#B91C1C'
      : '#0AA6A6',
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: 500,
    cursor: showResult ? 'default' : 'pointer',
    transition: 'all 0.2s ease',
    minWidth: 'auto',
    '&:hover': showResult ? {} : {
      backgroundColor: 'rgba(10, 166, 166, 0.25)',
    },
  });

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
          Sentence Builder
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
          <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: '#374151',
                fontSize: '15px',
                mb: 0.5,
              }}
            >
              {data.instruction}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                fontSize: '14px',
                fontStyle: 'italic',
              }}
            >
              &ldquo;{data.targetTranslation}&rdquo;
            </Typography>
          </CardContent>
        </Card>

        {/* Drop Zone (Answer Area) */}
        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            minHeight: 80,
            p: 2,
            borderRadius: '16px',
            border: `2px ${placedWords.length > 0 ? 'solid' : 'dashed'}`,
            borderColor: isDragOver 
              ? '#0AA6A6' 
              : placedWords.length > 0 
                ? '#D1D5DB' 
                : '#E5E7EB',
            backgroundColor: isDragOver 
              ? 'rgba(10, 166, 166, 0.08)' 
              : '#FFFFFF',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            alignItems: 'center',
            justifyContent: placedWords.length === 0 ? 'center' : 'flex-start',
            animation: isShaking ? `${shake} 0.5s ease` : 'none',
          }}
        >
          {placedWords.length === 0 ? (
            <Typography
              sx={{
                color: '#9CA3AF',
                fontSize: '14px',
                fontStyle: 'italic',
              }}
            >
              Drag words here or tap to add
            </Typography>
          ) : (
            placedWords.map((word) => (
              <Button
                key={word.id}
                onClick={() => removeWordFromAnswer(word)}
                disabled={showResult}
                sx={getPlacedChipStyles()}
              >
                {word.word}
              </Button>
            ))
          )}
        </Box>

        {/* Word Bank */}
        <Box
          sx={{
            p: 2,
            borderRadius: '16px',
            backgroundColor: '#F3F4F6',
            border: '1px solid #E5E7EB',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              fontSize: '12px',
              fontWeight: 500,
              mb: 1.5,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Word Bank
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {availableWords.map((word) => (
              <Button
                key={word.id}
                draggable
                onDragStart={(e) => handleDragStart(e, word)}
                onClick={() => addWordToAnswer(word)}
                disabled={showResult}
                sx={getChipStyles(word.isDistractor)}
              >
                {word.word}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Check Answer Button */}
        {placedWords.length > 0 && !showResult && (
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

        {/* Distractor Note - shows when incorrect and distractor was used */}
        {showResult && !isCorrect && placedWords.some(w => w.isDistractor) && (
          <Card
            sx={{
              borderRadius: '12px',
              backgroundColor: '#FEF3C7',
              border: '1px solid #FCD34D',
              boxShadow: 'none',
            }}
          >
            <CardContent sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <InfoOutlinedIcon sx={{ color: '#D97706', fontSize: 20, mt: 0.25 }} />
              <Typography
                variant="body2"
                sx={{
                  color: '#92400E',
                  fontSize: '14px',
                  lineHeight: 1.5,
                }}
              >
                {data.distractorNote}
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

export default TravelSentenceBuilderScreen;

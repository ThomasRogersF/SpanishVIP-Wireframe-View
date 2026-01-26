import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, IconButton, Alert, LinearProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import { useNavigation } from '../hooks/useNavigation.js';
import { iosButtonStyle } from '../components/shared/sharedStyles';
import { shake } from '../components/shared/sharedAnimations';

const quizQuestions = [
  {
    id: 1,
    scenario: 'María is a doctor.',
    spanishHint: '(María ___ doctora)',
    correctAnswer: 'ser',
    explanation: 'Being a doctor is a profession/identity - use SER!',
  },
  {
    id: 2,
    scenario: 'Juan is tired today.',
    spanishHint: '(Juan ___ cansado hoy)',
    correctAnswer: 'estar',
    explanation: 'Being tired is a temporary state - use ESTAR!',
  },
  {
    id: 3,
    scenario: 'The restaurant is in the center.',
    spanishHint: '(El restaurante ___ en el centro)',
    correctAnswer: 'estar',
    explanation: 'Location always uses ESTAR!',
  },
];

/**
 * SerEstarLogicScreen - Quiz-style logic check for Ser vs Estar
 * Uses useNavigation hook for navigation - no props required
 */
const SerEstarLogicScreen = () => {
  // Get navigation functions from context
  const { showSerEstarSpeaking, showSerEstarConcept } = useNavigation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (!correct) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowFeedback(false);
    } else {
      showSerEstarSpeaking();
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
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
        <IconButton onClick={showSerEstarConcept} sx={{ mr: 1 }}>
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
            Logic Check
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
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
        {/* Sofia Prompt */}
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
              Which verb should we use here?
            </Typography>
          </Box>
        </Box>

        {/* Question Card */}
        <Card
          sx={{
            bgcolor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '16px',
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Typography
              sx={{
                fontFamily: 'Lexend',
                fontWeight: 600,
                fontSize: '18px',
                color: '#1E293B',
                mb: 1,
              }}
            >
              {currentQuestion.scenario}
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#64748B', fontStyle: 'italic' }}>
              {currentQuestion.spanishHint}
            </Typography>
          </CardContent>
        </Card>

        {/* Answer Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleAnswerSelect('ser')}
            disabled={showFeedback}
            sx={{
              py: 2.5,
              borderRadius: '16px',
              bgcolor: selectedAnswer === 'ser' && isCorrect ? '#22C55E' : '#0EA5E9',
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: 'Lexend',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
              animation: selectedAnswer === 'ser' && isShaking ? `${shake} 0.4s ease-in-out` : 'none',
              '&:hover': {
                bgcolor: '#0284C7',
              },
              '&:disabled': {
                bgcolor: selectedAnswer === 'ser' 
                  ? (isCorrect ? '#22C55E' : '#EF4444')
                  : '#CBD5E1',
                color: 'white',
              },
            }}
          >
            SER
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleAnswerSelect('estar')}
            disabled={showFeedback}
            sx={{
              py: 2.5,
              borderRadius: '16px',
              bgcolor: selectedAnswer === 'estar' && isCorrect ? '#22C55E' : '#F59E0B',
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: 'Lexend',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
              animation: selectedAnswer === 'estar' && isShaking ? `${shake} 0.4s ease-in-out` : 'none',
              '&:hover': {
                bgcolor: '#D97706',
              },
              '&:disabled': {
                bgcolor: selectedAnswer === 'estar' 
                  ? (isCorrect ? '#22C55E' : '#EF4444')
                  : '#CBD5E1',
                color: 'white',
              },
            }}
          >
            ESTAR
          </Button>
        </Box>

        {/* Feedback */}
        {showFeedback && (
          <Alert
            severity={isCorrect ? 'success' : 'error'}
            icon={isCorrect ? <CheckCircleIcon /> : undefined}
            sx={{
              borderRadius: '12px',
              '& .MuiAlert-message': {
                width: '100%',
              },
            }}
          >
            <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
              {isCorrect ? '¡Correcto!' : '¡Inténtalo de nuevo!'}
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              {currentQuestion.explanation}
            </Typography>
          </Alert>
        )}
      </Box>

      {/* Bottom Actions */}
      <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #E2E8F0' }}>
        {showFeedback && isCorrect ? (
          <Button
            fullWidth
            variant="contained"
            onClick={handleContinue}
            sx={{
              ...iosButtonStyle,
              bgcolor: '#0AA6A6',
              '&:hover': { bgcolor: '#099090' },
            }}
          >
            {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Continue to Speaking'}
          </Button>
        ) : showFeedback && !isCorrect ? (
          <Button
            fullWidth
            variant="outlined"
            onClick={handleRetry}
            sx={{
              ...iosButtonStyle,
              borderColor: '#0AA6A6',
              color: '#0AA6A6',
              bgcolor: 'transparent',
              '&:hover': { 
                bgcolor: 'rgba(10, 166, 166, 0.1)',
                borderColor: '#0AA6A6',
              },
            }}
          >
            Try Again
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default SerEstarLogicScreen;

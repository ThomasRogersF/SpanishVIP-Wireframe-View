import React, { useState } from 'react';
import { Box, Button, IconButton, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import { useNavigation } from '../hooks/useNavigation.js';
import { shake } from '../components/shared/sharedAnimations';

/**
 * VIPLogicCheckScreen - Quiz to test understanding of survival phrases
 * Uses useNavigation hook for navigation - no props required
 */
const VIPLogicCheckScreen = () => {
  // Get navigation functions from context
  const { showVIPSpeakingDrill, showVIPTeachTool } = useNavigation();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === 'brake';
    setIsCorrect(correct);
    setShowFeedback(true);

    if (!correct) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
    }
  };

  const handleContinue = () => {
    if (isCorrect) {
      showVIPSpeakingDrill();
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
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <IconButton
          onClick={showVIPTeachTool}
          sx={{
            color: '#666',
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#1F2937',
            fontFamily: 'Lexend, sans-serif',
          }}
        >
          Logic Check
        </Box>

        <Box sx={{ width: '40px' }} />
      </Box>

      {/* Sofia Avatar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <SofiaAvatar size={48} />
      </Box>

      {/* Fast Speaker Context Card */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(254, 226, 226, 0.8) 0%, rgba(254, 197, 197, 0.8) 100%)',
          border: '2px solid #FECACA',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ fontSize: '24px', flexShrink: 0 }}>🗣️</Box>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#DC2626',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Fast Speaker!
          </Box>
          <Box
            sx={{
              fontSize: '14px',
              color: '#7F1D1D',
              fontStyle: 'italic',
            }}
          >
            ¡Hola! ¿Qué te gustaría hacer hoy?
          </Box>
        </Box>
      </Box>

      {/* Sofia's Question */}
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          alignItems: 'flex-start',
        }}
      >
        <SofiaAvatar size={40} />
        <Box
          sx={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            borderRadius: '12px',
            padding: '16px',
            flex: 1,
          }}
        >
          <Box
            sx={{
              fontSize: '14px',
              color: '#0369A1',
              lineHeight: 1.6,
            }}
          >
            Which phrase acts as the "Brake"?
          </Box>
        </Box>
      </Box>

      {/* Answer Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '24px',
          flex: 1,
        }}
      >
        {/* Wrong Answer */}
        <Button
          onClick={() => handleAnswerSelect('shield')}
          disabled={showFeedback}
          sx={{
            padding: '16px',
            borderRadius: '12px',
            background: 'white',
            border: '2px solid #D1D5DB',
            color: '#1F2937',
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none',
            textAlign: 'left',
            justifyContent: 'flex-start',
            animation: selectedAnswer === 'shield' && isShaking ? `${shake} 0.4s ease-in-out` : 'none',
            '&:hover': {
              background: '#F9FAFB',
              borderColor: '#9CA3AF',
            },
            '&:disabled': {
              background: selectedAnswer === 'shield' ? '#FEE2E2' : 'white',
              borderColor: selectedAnswer === 'shield' ? '#FECACA' : '#D1D5DB',
              color: '#1F2937',
            },
          }}
        >
          No entiendo.
        </Button>

        {/* Correct Answer */}
        <Button
          onClick={() => handleAnswerSelect('brake')}
          disabled={showFeedback}
          sx={{
            padding: '16px',
            borderRadius: '12px',
            background: selectedAnswer === 'brake' && isCorrect ? 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' : 'white',
            border: selectedAnswer === 'brake' && isCorrect ? 'none' : '2px solid #D1D5DB',
            color: selectedAnswer === 'brake' && isCorrect ? 'white' : '#1F2937',
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none',
            textAlign: 'left',
            justifyContent: 'flex-start',
            '&:hover': {
              background: selectedAnswer !== 'brake' ? '#F9FAFB' : 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
              borderColor: '#9CA3AF',
            },
            '&:disabled': {
              background: selectedAnswer === 'brake' && isCorrect ? 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)' : 'white',
              borderColor: selectedAnswer === 'brake' && isCorrect ? 'none' : '#D1D5DB',
              color: selectedAnswer === 'brake' && isCorrect ? 'white' : '#1F2937',
            },
          }}
        >
          Más despacio, por favor.
        </Button>
      </Box>

      {/* Feedback */}
      {showFeedback && (
        <Alert
          severity={isCorrect ? 'success' : 'error'}
          icon={isCorrect ? <CheckCircleIcon /> : undefined}
          sx={{
            borderRadius: '12px',
            marginBottom: '16px',
            '& .MuiAlert-message': {
              width: '100%',
            },
          }}
        >
          <Box sx={{ fontWeight: 600, marginBottom: '4px' }}>
            {isCorrect ? '¡Correcto!' : '¡Inténtalo de nuevo!'}
          </Box>
          <Box sx={{ fontSize: '14px' }}>
            {isCorrect
              ? 'This phrase slows down the conversation so you can understand better.'
              : 'This phrase means "I don\'t understand" - that\'s the Shield, not the Brake!'}
          </Box>
        </Alert>
      )}

      {/* Bottom Actions */}
      {showFeedback && (
        <Box sx={{ display: 'flex', gap: '12px' }}>
          {isCorrect ? (
            <Button
              fullWidth
              onClick={handleContinue}
              sx={{
                background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                },
              }}
            >
              Continue to Speaking
            </Button>
          ) : (
            <Button
              fullWidth
              onClick={handleRetry}
              sx={{
                background: 'white',
                border: '2px solid #14B8A6',
                color: '#14B8A6',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(20, 184, 166, 0.1)',
                },
              }}
            >
              Try Again
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default VIPLogicCheckScreen;

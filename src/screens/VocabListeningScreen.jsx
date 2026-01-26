import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Fab from '@mui/material/Fab'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { useNavigation } from '../hooks/useNavigation.js'
import { iosButtonStyle } from '../components/shared/sharedStyles'
import { pulseRing } from '../components/shared/sharedAnimations'

/**
 * VocabListeningScreen - Multiple choice listening challenge
 * Users listen to audio and select the correct word from options
 * Uses useNavigation hook for navigation - no props required
 */
function VocabListeningScreen() {
  // Get navigation functions from context
  const { showVocabSuccess, showVocabSpeaking } = useNavigation()

  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const correctAnswer = 'Tinto'
  const options = ['Tinto', 'Vino', 'Tinta']

  const handlePlayAudio = () => {
    setIsPlaying(true)
    setTimeout(() => {
      setIsPlaying(false)
    }, 2000)
  }

  const handleSelectAnswer = (option) => {
    if (!showResult) {
      setSelectedAnswer(option)
    }
  }

  const handleCheckAnswer = () => {
    const correct = selectedAnswer === correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
  }

  const handleTryAgain = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
  }

  const handleContinue = () => {
    showVocabSuccess()
  }

  // Component-specific pulse ring positioning (uses shared animation)
  const pulseRingStyle = {
    position: 'absolute',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '2px solid #14B8A6',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#F8FAFC',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <IconButton
          onClick={showVocabSpeaking}
          sx={{
            mr: 2,
            color: '#64748B',
            '&:hover': { bgcolor: '#F1F5F9' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontWeight: '700',
            color: '#111827',
            fontFamily: 'Lexend',
          }}
        >
          Listening Challenge
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!showResult ? (
          <>
            {/* Instruction Card */}
            <Card
              sx={{
                width: '100%',
                maxWidth: '400px',
                bgcolor: '#F0FDFA',
                border: '1px solid #CCFBF1',
                borderRadius: '12px',
                mb: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#111827',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}
                >
                  Listen and select the correct word
                </Typography>
              </CardContent>
            </Card>

            {/* Audio Playback Button */}
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px',
                height: '120px',
                mb: 4,
              }}
            >
              {/* Animated pulse rings */}
              {isPlaying && ['0s', '0.7s', '1.4s'].map((delay, index) => (
                <Box
                  key={index}
                  sx={{
                    ...pulseRingStyle,
                    animation: `${pulseRing} 2s ease-out infinite`,
                    animationDelay: delay,
                  }}
                />
              ))}

              {/* Main audio button */}
              <Fab
                onClick={handlePlayAudio}
                sx={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#14B8A6',
                  color: '#FFFFFF',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#0D9488',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                <VolumeUpIcon sx={{ fontSize: '36px' }} />
              </Fab>
            </Box>

            {/* Question Text */}
            <Typography
              variant="body1"
              sx={{
                color: '#111827',
                fontWeight: '600',
                mb: 3,
                textAlign: 'center',
              }}
            >
              What did you hear?
            </Typography>

            {/* Multiple Choice Options */}
            <Box
              sx={{
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mb: 3,
              }}
            >
              {options.map((option) => (
                <Button
                  key={option}
                  fullWidth
                  variant={selectedAnswer === option ? 'contained' : 'outlined'}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={showResult}
                  sx={{
                    ...iosButtonStyle,
                    borderColor:
                      selectedAnswer === option ? '#14B8A6' : '#D1D5DB',
                    color:
                      selectedAnswer === option ? '#FFFFFF' : '#111827',
                    backgroundColor:
                      selectedAnswer === option ? '#14B8A6' : 'transparent',
                    '&:hover': {
                      backgroundColor:
                        selectedAnswer === option
                          ? '#0D9488'
                          : 'rgba(20, 184, 166, 0.08)',
                      borderColor: '#14B8A6',
                    },
                    '&.Mui-disabled': {
                      color: '#111827',
                      borderColor: '#D1D5DB',
                    },
                  }}
                >
                  {option}
                </Button>
              ))}
            </Box>

            {/* Check Answer Button */}
            {selectedAnswer && !showResult && (
              <Button
                fullWidth
                variant="contained"
                onClick={handleCheckAnswer}
                sx={{
                  ...iosButtonStyle,
                  maxWidth: '400px',
                  background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
                }}
              >
                Check Answer
              </Button>
            )}
          </>
        ) : (
          <>
            {/* Result Alert */}
            <Box sx={{ width: '100%', maxWidth: '400px', mb: 3 }}>
              <Alert
                severity={isCorrect ? 'success' : 'error'}
                sx={{
                  borderRadius: '12px',
                  '& .MuiAlert-message': {
                    fontSize: '14px',
                    fontWeight: 500,
                  },
                }}
              >
                {isCorrect
                  ? '✓ Correct! That\'s the right answer.'
                  : `✗ Not quite. The correct answer is "${correctAnswer}".`}
              </Alert>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                gap: 2,
                flexDirection: 'column',
              }}
            >
              {!isCorrect && (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleTryAgain}
                  sx={{
                    ...iosButtonStyle,
                    borderColor: '#14B8A6',
                    color: '#14B8A6',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(20, 184, 166, 0.08)',
                      borderColor: '#0D9488',
                    },
                  }}
                >
                  Try Again
                </Button>
              )}
              {isCorrect && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleContinue}
                  sx={{
                    ...iosButtonStyle,
                    background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
                  }}
                >
                  Continue
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default VocabListeningScreen

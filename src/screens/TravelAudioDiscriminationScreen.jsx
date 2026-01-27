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
import travelLessonData from '../data/travelLessonData.js'

/**
 * TravelAudioDiscriminationScreen - Activity 9 of 12
 * Minimal pairs listening exercise where users identify which word they heard
 * Uses useNavigation hook for navigation - no props required
 */
function TravelAudioDiscriminationScreen() {
  // Get navigation functions from context
  const { showTravelRoleplay, showTravelSpeakingDrill } = useNavigation()

  // Destructure activity data
  const { audioDiscrimination } = travelLessonData
  const {
    activityNumber,
    totalActivities,
    instruction,
    options,
    correctAnswer,
    explanation,
    feedback
  } = audioDiscrimination

  // State management
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Handle audio playback (mock implementation)
  const handlePlayAudio = () => {
    setIsPlaying(true)
    setTimeout(() => {
      setIsPlaying(false)
    }, 1500)
  }

  // Handle option selection
  const handleSelectAnswer = (optionWord) => {
    if (!showResult) {
      setSelectedAnswer(optionWord)
    }
  }

  // Validate answer
  const handleCheckAnswer = () => {
    const correct = selectedAnswer === correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
  }

  // Handle try again
  const handleTryAgain = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
  }

  // Handle continue to next activity
  const handleContinue = () => {
    showTravelRoleplay()
  }

  // Pulse ring style for audio button
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
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={showTravelSpeakingDrill}
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
            Audio Discrimination
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: '#64748B',
            fontWeight: '500',
          }}
        >
          Activity {activityNumber} of {totalActivities}
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
              width: `${(activityNumber / totalActivities) * 100}%`,
              backgroundColor: '#14B8A6',
              borderRadius: 3,
              transition: 'width 0.3s ease',
            }}
          />
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
              {instruction}
            </Typography>
          </CardContent>
        </Card>

        {/* Audio Playback Section */}
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

        {/* Helper text for audio */}
        <Typography
          variant="body2"
          sx={{
            color: isPlaying ? '#14B8A6' : '#64748B',
            fontWeight: '500',
            mb: 3,
            textAlign: 'center',
          }}
        >
          {isPlaying ? 'Playing audio...' : 'Tap to play audio'}
        </Typography>

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
          Which word did you hear?
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
              key={option.id}
              fullWidth
              variant={selectedAnswer === option.word ? 'contained' : 'outlined'}
              onClick={() => handleSelectAnswer(option.word)}
              disabled={showResult}
              sx={{
                ...iosButtonStyle,
                minHeight: '60px',
                borderColor:
                  selectedAnswer === option.word ? '#14B8A6' : '#D1D5DB',
                color:
                  selectedAnswer === option.word ? '#FFFFFF' : '#111827',
                backgroundColor:
                  selectedAnswer === option.word ? '#14B8A6' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 1.5,
                '&:hover': {
                  backgroundColor:
                    selectedAnswer === option.word
                      ? '#0D9488'
                      : 'rgba(20, 184, 166, 0.08)',
                  borderColor: '#14B8A6',
                },
                '&.Mui-disabled': {
                  color: '#111827',
                  borderColor: '#D1D5DB',
                  backgroundColor:
                    selectedAnswer === option.word ? '#14B8A6' : 'transparent',
                  opacity: selectedAnswer === option.word ? 1 : 0.7,
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: '700',
                  fontSize: '16px',
                  color: selectedAnswer === option.word ? '#FFFFFF' : '#111827',
                }}
              >
                {option.word}
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  color: selectedAnswer === option.word ? 'rgba(255,255,255,0.8)' : '#64748B',
                }}
              >
                ({option.meaning})
              </Typography>
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
              py: 1.5,
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Check Answer
          </Button>
        )}

        {/* Result Section */}
        {showResult && (
          <Box sx={{ width: '100%', maxWidth: '400px' }}>
            {/* Result Alert */}
            <Alert
              severity={isCorrect ? 'success' : 'error'}
              sx={{
                borderRadius: '12px',
                mb: 2,
                '& .MuiAlert-message': {
                  fontSize: '14px',
                  fontWeight: 500,
                },
              }}
            >
              {isCorrect ? feedback.correct : feedback.incorrect}
            </Alert>

            {/* Explanation */}
            <Card
              sx={{
                bgcolor: '#F8FAFC',
                borderRadius: '12px',
                mb: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#14B8A6',
                    fontWeight: '600',
                    mb: 1,
                  }}
                >
                  💡 Key Difference:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#111827',
                    fontSize: '14px',
                    lineHeight: 1.5,
                  }}
                >
                  {explanation}
                </Typography>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box
              sx={{
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
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default TravelAudioDiscriminationScreen

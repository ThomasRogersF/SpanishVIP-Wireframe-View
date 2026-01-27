import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { useNavigation } from '../hooks/useNavigation.js'
import { iosButtonStyle } from '../components/shared/sharedStyles'
import { pulseRing } from '../components/shared/sharedAnimations'
import FeedbackCard from '../components/Lesson/FeedbackCard.jsx'
import SofiaAvatar from '../components/shared/SofiaAvatar.jsx'
import travelLessonData from '../data/travelLessonData.js'

/**
 * TravelAudioTranscriptionScreen - Activity 7 of 12
 * Dictation activity where users listen to audio and type what they hear
 * Uses useNavigation hook for navigation - no props required
 */
function TravelAudioTranscriptionScreen() {
  // Get navigation functions from context
  const { showTravelSpeakingDrill, showTravelFillBlank } = useNavigation()

  // Destructure activity data
  const { audioTranscription } = travelLessonData
  const {
    activityNumber,
    totalActivities,
    instruction,
    acceptedAnswers,
    caseSensitive,
    feedback
  } = audioTranscription

  // State management
  const [userInput, setUserInput] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Handle audio playback (mock implementation)
  const handlePlayAudio = () => {
    setIsPlaying(true)
    setTimeout(() => {
      setIsPlaying(false)
    }, 2000)
  }

  // Handle input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  // Validate answer
  const handleCheckAnswer = () => {
    const normalizedInput = caseSensitive
      ? userInput.trim()
      : userInput.trim().toLowerCase()

    const isAnswerCorrect = acceptedAnswers.some((answer) => {
      const normalizedAnswer = caseSensitive
        ? answer.trim()
        : answer.trim().toLowerCase()
      return normalizedInput === normalizedAnswer
    })

    setIsCorrect(isAnswerCorrect)
    setShowFeedback(true)
  }

  // Handle try again
  const handleTryAgain = () => {
    setUserInput('')
    setShowFeedback(false)
    setIsCorrect(false)
  }

  // Handle continue to next activity
  const handleContinue = () => {
    showTravelSpeakingDrill()
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
            onClick={showTravelFillBlank}
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
            Audio Transcription
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
        {/* Instruction Card with Sofia Avatar */}
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
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SofiaAvatar size={40} />
            <Typography
              variant="body2"
              sx={{
                color: '#111827',
                fontWeight: '600',
                flex: 1,
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

        {!showFeedback ? (
          <>
            {/* Text Input Field */}
            <Box sx={{ width: '100%', maxWidth: '400px', mb: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Type what you hear..."
                value={userInput}
                onChange={handleInputChange}
                disabled={showFeedback}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#FFFFFF',
                    '& fieldset': {
                      borderColor: '#D1D5DB',
                    },
                    '&:hover fieldset': {
                      borderColor: '#14B8A6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#14B8A6',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '16px',
                    color: '#111827',
                  },
                }}
              />
            </Box>

            {/* Check Answer Button */}
            {userInput.trim() && (
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
          </>
        ) : (
          /* Feedback Section */
          <Box sx={{ width: '100%', maxWidth: '400px' }}>
            <FeedbackCard
              feedbackType={isCorrect ? 'success' : 'error'}
              message={isCorrect ? feedback.correct : feedback.incorrect}
              suggestion={!isCorrect ? `The correct transcription is: "${acceptedAnswers[0]}"` : undefined}
              onTryAgain={!isCorrect ? handleTryAgain : undefined}
              onContinue={isCorrect ? handleContinue : undefined}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default TravelAudioTranscriptionScreen

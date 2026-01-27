import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MicrophoneButton from '../components/Lesson/MicrophoneButton.jsx'
import FeedbackCard from '../components/Lesson/FeedbackCard.jsx'
import SofiaAvatar from '../components/shared/SofiaAvatar.jsx'
import { useRecording } from '../hooks/useRecording.js'
import { useNavigation } from '../hooks/useNavigation.js'
import travelLessonData from '../data/travelLessonData.js'

/**
 * TravelSpeakingDrillScreen - Activity 8 of 12
 * Pronunciation practice where users read a sentence aloud using the microphone
 * Uses useNavigation hook for navigation - no props required
 */
function TravelSpeakingDrillScreen() {
  // Get navigation functions from context
  const { showTravelAudioDiscrimination, showTravelAudioTranscription } = useNavigation()

  // Destructure activity data
  const { speakingDrill } = travelLessonData
  const {
    activityNumber,
    totalActivities,
    instruction,
    displayText,
    displayTranslation,
    pronunciationTips,
    feedback
  } = speakingDrill

  // State management
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState('success')
  const { isRecording, startRecording, stopRecording } = useRecording()

  // Handle stop recording and show feedback
  const handleStopRecording = () => {
    stopRecording()
    // Simulate processing delay
    setTimeout(() => {
      // Mock feedback - 70% success, 20% partial, 10% error for demo
      const random = Math.random()
      if (random > 0.3) {
        setFeedbackType('success')
      } else if (random > 0.1) {
        setFeedbackType('info') // using 'info' for partial feedback
      } else {
        setFeedbackType('error')
      }
      setShowFeedback(true)
    }, 1500)
  }

  // Get feedback message based on type
  const getFeedbackMessage = () => {
    switch (feedbackType) {
      case 'success':
        return feedback.correct
      case 'info':
        return feedback.partial
      case 'error':
      default:
        return feedback.incorrect
    }
  }

  // Handle try again
  const handleTryAgain = () => {
    setShowFeedback(false)
  }

  // Handle continue to next activity
  const handleContinue = () => {
    showTravelAudioDiscrimination()
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
            onClick={showTravelAudioTranscription}
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
            Speaking Practice
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
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!showFeedback ? (
          <>
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
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <SofiaAvatar
                    size="small"
                    emoji="🎤"
                    showGradientBorder={false}
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#111827',
                        fontWeight: '600',
                      }}
                    >
                      {instruction}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Sentence Display Card */}
            <Card
              sx={{
                width: '100%',
                maxWidth: '400px',
                bgcolor: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                p: 3,
                textAlign: 'center',
                mb: 3,
              }}
            >
              {/* Emoji */}
              <Typography
                sx={{
                  fontSize: '48px',
                  mb: 2,
                }}
              >
                ✈️
              </Typography>

              {/* Spanish Sentence */}
              <Box
                sx={{
                  bgcolor: '#F0FDFA',
                  border: '2px solid #14B8A6',
                  borderRadius: '12px',
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Lexend',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#111827',
                    lineHeight: 1.4,
                  }}
                >
                  {displayText}
                </Typography>
              </Box>

              {/* English Translation */}
              <Typography
                variant="body2"
                sx={{
                  color: '#64748B',
                  fontWeight: '500',
                  fontSize: '14px',
                  mb: 2,
                }}
              >
                {displayTranslation}
              </Typography>

              {/* Pronunciation Tips */}
              <Box
                sx={{
                  bgcolor: '#F8FAFC',
                  borderRadius: '8px',
                  p: 1.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#14B8A6',
                    fontWeight: '600',
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  Pronunciation Tips:
                </Typography>
                {pronunciationTips.map((tip, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: '#14B8A6',
                      fontSize: '13px',
                      fontStyle: 'italic',
                    }}
                  >
                    {tip}
                  </Typography>
                ))}
              </Box>
            </Card>

            {/* Microphone Button */}
            <Box sx={{ mb: 3 }}>
              <MicrophoneButton
                isRecording={isRecording}
                onPressStart={startRecording}
                onPressEnd={handleStopRecording}
              />
            </Box>

            {/* Helper Text */}
            <Typography
              variant="body2"
              sx={{
                color: isRecording ? '#14B8A6' : '#64748B',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {isRecording ? 'Recording...' : 'Hold to speak'}
            </Typography>
          </>
        ) : (
          <>
            {/* Feedback Card */}
            <Box sx={{ width: '100%', maxWidth: '400px' }}>
              <FeedbackCard
                feedbackType={feedbackType}
                message={getFeedbackMessage()}
                onTryAgain={feedbackType !== 'success' ? handleTryAgain : undefined}
                onContinue={feedbackType === 'success' ? handleContinue : undefined}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default TravelSpeakingDrillScreen

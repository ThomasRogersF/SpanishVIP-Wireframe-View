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
import { iosButtonStyle } from '../components/shared/sharedStyles'

/**
 * VocabSpeakingScreen - Pronunciation practice with microphone recording
 * Users practice speaking the vocabulary words and receive feedback
 * Uses useNavigation hook for navigation - no props required
 */
function VocabSpeakingScreen() {
  // Get navigation functions from context
  const { showVocabListening, showVocabTeachCard, showReviewScreen, activeVocabTopic } = useNavigation()

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState('success')
  const { isRecording, startRecording, stopRecording } = useRecording()

  // Use dynamic words from topic, or fallback
  const words = activeVocabTopic?.words || [
    {
      spanish: 'Tinto',
      english: 'Red wine',
      emoji: '🍷',
      phonetic: 'TEEN-toh',
    },
    {
      spanish: 'La Cuenta',
      english: 'The bill/check',
      emoji: '🧾',
      phonetic: 'lah KWEN-tah',
    },
  ]

  const currentWord = words[currentWordIndex]

  const handleStopRecording = () => {
    stopRecording()
    // Simulate processing delay
    setTimeout(() => {
      // Mock feedback - randomly success or error for demo
      const isSuccess = Math.random() > 0.3
      setFeedbackType(isSuccess ? 'success' : 'error')
      setShowFeedback(true)
    }, 1500)
  }

  const handleTryAgain = () => {
    setShowFeedback(false)
  }

  const handleContinue = () => {
    if (currentWordIndex === 0) {
      setCurrentWordIndex(1)
      setShowFeedback(false)
    } else {
      showVocabListening()
    }
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
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <IconButton
            onClick={showVocabTeachCard}
            sx={{
              mr: 2,
              color: '#64748B',
              '&:hover': { bgcolor: '#F1F5F9' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {activeVocabTopic?.emoji && (
                <Typography sx={{ fontSize: '20px' }}>
                  {activeVocabTopic.emoji}
                </Typography>
              )}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '700',
                  color: '#111827',
                  fontFamily: 'Lexend',
                }}
              >
                {activeVocabTopic?.title || 'Practice Speaking'}
              </Typography>
            </Box>
            {activeVocabTopic?.level_label && (
              <Typography
                variant="caption"
                sx={{
                  color: '#64748B',
                  fontSize: '12px',
                  fontWeight: '500',
                }}
              >
                {activeVocabTopic.level_label}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={showReviewScreen}
            sx={{
              color: '#64748B',
              fontWeight: '600',
              fontSize: '14px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#F1F5F9',
              },
            }}
          >
            Back to Shelves
          </Button>
          <Typography
            variant="body2"
            sx={{
              color: '#64748B',
              fontWeight: '600',
            }}
          >
            Word {currentWordIndex + 1} of {words.length}
          </Typography>
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
                      Say this word in Spanish:
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Target Word Display */}
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
              <Typography
                sx={{
                  fontSize: '48px',
                  mb: 2,
                }}
              >
                {currentWord.emoji}
              </Typography>

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
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#111827',
                  }}
                >
                  {currentWord.spanish}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: '#14B8A6',
                  fontWeight: '600',
                  fontSize: '14px',
                }}
              >
                {currentWord.phonetic}
              </Typography>
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
                color: '#64748B',
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
                message={
                  feedbackType === 'success'
                    ? 'Great pronunciation! You nailed it.'
                    : `Almost there! Try emphasizing the ${currentWord.phonetic.split('-')[0]}.`
                }
                onTryAgain={handleTryAgain}
                onContinue={handleContinue}
                continueLabel={
                  currentWordIndex === 0 ? 'Next Word' : 'Continue'
                }
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default VocabSpeakingScreen

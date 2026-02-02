import React, { useState, useEffect, useRef } from 'react'
import { Box, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Alert, Snackbar } from '@mui/material'
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigation } from '../hooks/useNavigation'
import { useRecording } from '../hooks/useRecording'
import JorgeAvatar from '../components/VoiceMode/JorgeAvatar'
import HintChip from '../components/VoiceMode/HintChip'
import MicrophoneButton from '../components/Lesson/MicrophoneButton'
import AudioVisualizer from '../components/VoiceMode/AudioVisualizer'
import LiveCaptions from '../components/VoiceMode/LiveCaptions'
import { iosButtonStyle } from '../components/shared/sharedStyles'
import { TaxiRideLessonHandler } from '../services/TaxiRideLessonHandler'

/**
 * LessonVoiceModeScreen Component
 *
 * Full-screen voice lesson interface for the Jorge taxi driver roleplay.
 * Implements a "phone call" interface with push-to-talk recording, AI processing,
 * TTS playback, and function call handling (hints, lesson completion).
 *
 * Conversation States:
 * - idle: Ready to record, microphone button is teal
 * - listening: User is speaking, microphone button is red with pulse
 * - thinking: AI is processing, Jorge avatar pulses, mic disabled
 * - speaking: AI is responding, Jorge avatar pulses, visualizer shows, mic disabled
 */
const LessonVoiceModeScreen = () => {
  const { goBack } = useNavigation()
  const { isRecording, startRecording, stopRecording, audioBlob, error: recordingError, clearAudioBlob } = useRecording()

  // Conversation state management
  const [conversationState, setConversationState] = useState('idle') // 'idle' | 'listening' | 'thinking' | 'speaking'
  const [currentHint, setCurrentHint] = useState(null)
  const [lastResponse, setLastResponse] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showEndCallDialog, setShowEndCallDialog] = useState(false)

  // Service and audio refs
  const lessonHandlerRef = useRef(null)
  const audioElementRef = useRef(null)

  /**
   * Initialize lesson on mount
   */
  useEffect(() => {
    const initializeLesson = async () => {
      try {
        console.log('[LessonVoiceModeScreen] Initializing lesson...')
        const handler = new TaxiRideLessonHandler()
        await handler.initializeLesson()
        lessonHandlerRef.current = handler
        setIsInitialized(true)
        console.log('[LessonVoiceModeScreen] Lesson initialized successfully')
      } catch (err) {
        console.error('[LessonVoiceModeScreen] Initialization error:', err)
        setError('Failed to initialize lesson. Please try again.')
      }
    }

    initializeLesson()

    // Cleanup on unmount
    return () => {
      if (lessonHandlerRef.current) {
        lessonHandlerRef.current.resetLesson()
      }
      // Revoke any object URLs
      if (audioElementRef.current?.src) {
        URL.revokeObjectURL(audioElementRef.current.src)
      }
    }
  }, [])

  /**
   * Handle audio playback end
   */
  useEffect(() => {
    const audioElement = audioElementRef.current
    if (!audioElement) return

    const handleAudioEnd = () => {
      console.log('[LessonVoiceModeScreen] Audio playback ended')
      setConversationState('idle')
    }

    audioElement.addEventListener('ended', handleAudioEnd)

    return () => {
      audioElement.removeEventListener('ended', handleAudioEnd)
    }
  }, [])

  /**
   * Process audio blob when available from recording hook
   */
  useEffect(() => {
    const processAudioBlob = async () => {
      if (!audioBlob || conversationState !== 'listening') return

      console.log('[LessonVoiceModeScreen] Audio blob available, processing turn...')
      setConversationState('thinking')

      try {
        console.log('[LessonVoiceModeScreen] Processing turn with AI...')
        const response = await lessonHandlerRef.current.processTurn(audioBlob)
        
        console.log('[LessonVoiceModeScreen] AI response received:', response)
        
        // Update last response text
        if (response.text) {
          setLastResponse(response.text)
        }

        // Handle function calls
        if (response.functionCalls && response.functionCalls.length > 0) {
          handleFunctionCalls(response.functionCalls)
        }

        // Play TTS audio if available
        if (response.audioBlob) {
          playAudioResponse(response.audioBlob)
        } else {
          // No audio, return to idle
          setConversationState('idle')
        }

        // Clear the audio blob after processing
        clearAudioBlob()
      } catch (err) {
        console.error('[LessonVoiceModeScreen] Error processing turn:', err)
        setError('Failed to process your message. Please try again.')
        setConversationState('idle')
        clearAudioBlob()
      }
    }

    processAudioBlob()
  }, [audioBlob, conversationState, clearAudioBlob])

  /**
   * Handle recording errors from the hook
   */
  useEffect(() => {
    if (recordingError) {
      console.error('[LessonVoiceModeScreen] Recording error:', recordingError)
      setError(recordingError)
      setConversationState('idle')
    }
  }, [recordingError])

  /**
   * Handle microphone press start
   */
  const handleMicStart = () => {
    if (conversationState !== 'idle') return

    console.log('[LessonVoiceModeScreen] Microphone pressed - starting recording')
    setConversationState('listening')
    setCurrentHint(null) // Clear any existing hints
    startRecording()
  }

  /**
   * Handle microphone press end
   */
  const handleMicEnd = () => {
    if (conversationState !== 'listening') return

    console.log('[LessonVoiceModeScreen] Microphone released - stopping recording')
    stopRecording()
    // Audio blob will be processed in the useEffect hook when available
  }

  /**
   * Handle function calls from AI
   */
  const handleFunctionCalls = (functionCalls) => {
    functionCalls.forEach((call) => {
      console.log('[LessonVoiceModeScreen] Processing function call:', call.name, call.args)

      if (call.name === 'show_hint') {
        setCurrentHint(call.args.hint_text)
      } else if (call.name === 'finish_lesson') {
        setShowSuccessModal(true)
      }
    })
  }

  /**
   * Play TTS audio response
   */
  const playAudioResponse = async (audioBlob) => {
    try {
      const audioUrl = URL.createObjectURL(audioBlob)
      const audioElement = audioElementRef.current

      if (audioElement) {
        // Revoke previous URL if exists
        if (audioElement.src) {
          URL.revokeObjectURL(audioElement.src)
        }

        // Set up one-time ended listener before playing
        const handleEnded = () => {
          console.log('[LessonVoiceModeScreen] Audio playback ended')
          setConversationState('idle')
          audioElement.removeEventListener('ended', handleEnded)
        }
        audioElement.addEventListener('ended', handleEnded)

        // Set up error listener
        const handleError = (e) => {
          console.error('[LessonVoiceModeScreen] Audio playback error:', e)
          setError('Failed to play audio response.')
          setConversationState('idle')
          audioElement.removeEventListener('error', handleError)
        }
        audioElement.addEventListener('error', handleError)

        audioElement.src = audioUrl
        setConversationState('speaking')
        await audioElement.play()
        console.log('[LessonVoiceModeScreen] Playing TTS audio')
      }
    } catch (err) {
      console.error('[LessonVoiceModeScreen] Error playing audio:', err)
      setError('Failed to play audio response.')
      setConversationState('idle')
    }
  }

  /**
   * Handle end call button
   */
  const handleEndCallClick = () => {
    setShowEndCallDialog(true)
  }

  /**
   * Confirm end call
   */
  const handleConfirmEndCall = () => {
    setShowEndCallDialog(false)
    goBack()
  }

  /**
   * Handle success modal continue
   */
  const handleSuccessContinue = () => {
    setShowSuccessModal(false)
    goBack() // Navigate back to dashboard or next lesson
  }

  /**
   * Get status text based on conversation state
   */
  const getStatusText = () => {
    switch (conversationState) {
      case 'idle':
        return 'Tap to speak'
      case 'listening':
        return 'Listening...'
      case 'thinking':
        return 'Jorge is thinking...'
      case 'speaking':
        return 'Jorge is speaking...'
      default:
        return 'Tap to speak'
    }
  }

  // Loading state
  if (!isInitialized) {
    return (
      <Box
        sx={{
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at center, #FFF7ED 0%, #FFFFFF 100%)',
          padding: 3
        }}
      >
        {recordingError ? (
          <>
            <Alert severity="error" sx={{ mb: 3, maxWidth: '320px' }}>
              {recordingError}
            </Alert>
            <Typography variant="body2" sx={{ color: '#78350F', textAlign: 'center', maxWidth: '320px' }}>
              Supported browsers: Chrome, Firefox, Safari (latest versions)
            </Typography>
          </>
        ) : (
          <>
            <CircularProgress size={60} sx={{ color: '#F59E0B', mb: 3 }} />
            <Typography variant="h6" sx={{ color: '#78350F', fontWeight: 600 }}>
              Connecting to Jorge...
            </Typography>
          </>
        )}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'radial-gradient(circle at center, #FFF7ED 0%, #FFFFFF 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* End Call Button - Top Right */}
      <IconButton
        onClick={handleEndCallClick}
        sx={{
          ...iosButtonStyle,
          position: 'absolute',
          top: 16,
          right: 16,
          width: 56,
          height: 56,
          backgroundColor: '#EF4444',
          color: '#FFFFFF',
          zIndex: 10,
          '&:hover': {
            backgroundColor: '#DC2626'
          }
        }}
        aria-label="End call"
      >
        <PhoneDisabledIcon />
      </IconButton>

      {/* Center Content - Avatar and Visualizer */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          gap: 3
        }}
      >
        {/* Jorge Avatar */}
        <JorgeAvatar
          size="xlarge"
          isPulsing={conversationState === 'thinking' || conversationState === 'speaking'}
        />

        {/* Audio Visualizer - Only during speaking */}
        {conversationState === 'speaking' && (
          <AudioVisualizer />
        )}

        {/* Live Captions - Only during speaking */}
        {conversationState === 'speaking' && lastResponse && (
          <LiveCaptions text={lastResponse} />
        )}
      </Box>

      {/* Bottom Section - Microphone Button and Status */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          paddingBottom: 6
        }}
      >
        {/* Status Text */}
        <Typography
          variant="body1"
          sx={{
            color: '#78350F',
            fontWeight: 500,
            fontSize: '16px'
          }}
        >
          {getStatusText()}
        </Typography>

        {/* Microphone Button */}
        <MicrophoneButton
          isRecording={isRecording}
          onPressStart={handleMicStart}
          onPressEnd={handleMicEnd}
          disabled={conversationState === 'thinking' || conversationState === 'speaking'}
        />
      </Box>

      {/* Floating Hint Chip */}
      {currentHint && (
        <HintChip
          hintText={currentHint}
          onDismiss={() => setCurrentHint(null)}
        />
      )}

      {/* Hidden Audio Element for TTS Playback */}
      <audio ref={audioElementRef} style={{ display: 'none' }} />

      {/* End Call Confirmation Dialog */}
      <Dialog
        open={showEndCallDialog}
        onClose={() => setShowEndCallDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: 2
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: '#1F2937' }}>
          End Lesson?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#6B7280' }}>
            Are you sure you want to end the lesson? Your progress will be saved.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ gap: 1, padding: 2 }}>
          <Button
            onClick={() => setShowEndCallDialog(false)}
            sx={{
              color: '#6B7280',
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmEndCall}
            variant="contained"
            sx={{
              backgroundColor: '#EF4444',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#DC2626'
              }
            }}
          >
            End Lesson
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Modal - Lesson Complete */}
      <Dialog
        open={showSuccessModal}
        onClose={() => {}}
        PaperProps={{
          sx: {
            borderRadius: '24px',
            padding: 3,
            textAlign: 'center',
            maxWidth: '320px'
          }
        }}
      >
        <DialogContent sx={{ padding: 3 }}>
          <CheckCircleIcon
            sx={{
              fontSize: 80,
              color: '#10B981',
              mb: 2
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#1F2937',
              mb: 1
            }}
          >
            Lesson Complete!
          </Typography>
          <Typography
            sx={{
              color: '#6B7280',
              fontSize: '16px',
              mb: 3
            }}
          >
            Great job! You've successfully completed the taxi ride conversation with Jorge.
          </Typography>
          <Button
            onClick={handleSuccessContinue}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#10B981',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '16px',
              padding: '12px',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: '#059669'
              }
            }}
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default LessonVoiceModeScreen

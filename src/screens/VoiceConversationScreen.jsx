import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigation } from '../hooks/useNavigation';
import { useRecording } from '../hooks/useRecording';
import {
  startConversation,
  handleUserSpeech,
  resetConversation,
  PIPELINE_STAGES
} from '../services/voice_orchestrator';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import MicrophoneButton from '../components/Lesson/MicrophoneButton';
import AudioVisualizer from '../components/VoiceMode/AudioVisualizer';
import LiveCaptions from '../components/VoiceMode/LiveCaptions';

const VoiceConversationScreen = () => {
  const { goBack } = useNavigation();
  const { isRecording, startRecording, stopRecording } = useRecording();

  // State management
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentStage, setCurrentStage] = useState(PIPELINE_STAGES.IDLE);
  const [currentTranscription, setCurrentTranscription] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize conversation on mount
  useEffect(() => {
    startConversation();
    setIsInitialized(true);

    return () => {
      resetConversation();
    };
  }, []);

  // Handle recording stop and process audio
  const handleRecordingStop = useCallback(async (audioBlob) => {
    if (!audioBlob) return;

    await handleUserSpeech(audioBlob, {
      onStageChange: (stage, data) => {
        setCurrentStage(stage);
        setError(null);

        if (stage === PIPELINE_STAGES.TRANSCRIBING) {
          setCurrentTranscription('Transcribing...');
          setCurrentResponse('');
        } else if (stage === PIPELINE_STAGES.THINKING) {
          setCurrentTranscription(data?.userText || '');
          setCurrentResponse('Thinking...');
        } else if (stage === PIPELINE_STAGES.SYNTHESIZING) {
          setCurrentResponse(data?.assistantText || '');
        } else if (stage === PIPELINE_STAGES.SPEAKING) {
          // Audio is playing
        }
      },
      onError: ({ stage, error: err, userMessage }) => {
        setError(userMessage);
        setCurrentStage(PIPELINE_STAGES.IDLE);
        setCurrentTranscription('');
        setCurrentResponse('');
      },
      onComplete: ({ userText, assistantText, messages }) => {
        setConversationHistory(messages || []);
        setCurrentStage(PIPELINE_STAGES.IDLE);
        setCurrentTranscription('');
        setCurrentResponse('');
      }
    });
  }, []);

  // Integrate with useRecording hook
  useEffect(() => {
    if (!isRecording) {
      // Recording stopped, get the audio blob
      // Note: useRecording hook should provide the audioBlob
      // This is a placeholder - actual implementation depends on useRecording hook API
    }
  }, [isRecording]);

  // Spacebar keyboard handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isRecording && currentStage === PIPELINE_STAGES.IDLE) {
        e.preventDefault();
        startRecording();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space' && isRecording) {
        e.preventDefault();
        stopRecording();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRecording, currentStage, startRecording, stopRecording]);

  // Handle microphone button click
  const handleMicClick = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else if (currentStage === PIPELINE_STAGES.IDLE) {
      startRecording();
    }
  }, [isRecording, currentStage, startRecording, stopRecording]);

  // Get stage display text
  const getStageText = () => {
    switch (currentStage) {
      case PIPELINE_STAGES.TRANSCRIBING:
        return 'Transcribing...';
      case PIPELINE_STAGES.THINKING:
        return 'Thinking...';
      case PIPELINE_STAGES.SYNTHESIZING:
        return 'Preparing response...';
      case PIPELINE_STAGES.SPEAKING:
        return 'Speaking...';
      case PIPELINE_STAGES.IDLE:
        return 'Ready to practice';
      default:
        return '';
    }
  };

  // Get error message based on stage
  const getErrorMessage = (errorMsg) => {
    if (errorMsg) return errorMsg;
    
    switch (currentStage) {
      case PIPELINE_STAGES.TRANSCRIBING:
        return "Couldn't transcribe audio. Please try speaking again.";
      case PIPELINE_STAGES.THINKING:
        return "Couldn't generate response. Please try again.";
      case PIPELINE_STAGES.SYNTHESIZING:
        return "Couldn't synthesize speech. Please try again.";
      case PIPELINE_STAGES.SPEAKING:
        return "Couldn't play audio. Please check your speakers.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'radial-gradient(circle at center, #E6FFFA 0%, #FFFFFF 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 2,
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <IconButton
          onClick={goBack}
          sx={{
            color: '#6B7280',
            '&:hover': { backgroundColor: '#F3F4F6' }
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <Typography
            sx={{
              fontFamily: 'Lexend',
              fontSize: 18,
              fontWeight: 600,
              color: '#1F2937'
            }}
          >
            L4: Voice Practice
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: '#6B7280',
              mt: 0.25
            }}
          >
            4/4
          </Typography>
        </Box>

        <Box sx={{ width: 40 }} />
      </Box>

      {/* Progress Bar */}
      <Box sx={{ px: 2.5, py: 1.5 }}>
        <Box
          sx={{
            height: 6,
            backgroundColor: '#E5E7EB',
            borderRadius: 3,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundColor: '#0AA6A6',
              transition: 'width 0.3s ease'
            }}
          />
        </Box>
      </Box>

      {/* Error Banner */}
      {error && (
        <Box
          sx={{
            mx: 2.5,
            mt: 1.5,
            px: 2,
            py: 1.5,
            backgroundColor: '#FEE2E2',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ fontSize: 13, color: '#DC2626', flex: 1 }}>
            {getErrorMessage(error)}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setError(null)}
            sx={{ color: '#DC2626', ml: 1 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Sofia Avatar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3, pb: 2 }}>
          <SofiaAvatar size={80} />
        </Box>

        {/* Status Indicator */}
        <Box sx={{ textAlign: 'center', px: 2.5, pb: 2 }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: currentStage === PIPELINE_STAGES.IDLE ? '#6B7280' : '#0AA6A6'
            }}
          >
            {getStageText()}
          </Typography>
        </Box>

        {/* Live Captions */}
        {(currentTranscription || currentResponse) && (
          <Box sx={{ px: 2.5, pb: 2 }}>
            <LiveCaptions
              text={currentResponse || currentTranscription}
              isVisible={true}
            />
          </Box>
        )}

        {/* Audio Visualizer (visible during speaking) */}
        {currentStage === PIPELINE_STAGES.SPEAKING && (
          <Box sx={{ px: 2.5, pb: 2 }}>
            <AudioVisualizer isActive={true} />
          </Box>
        )}

        {/* Conversation History */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            px: 2.5,
            py: 2
          }}
        >
          {conversationHistory.length === 0 && currentStage === PIPELINE_STAGES.IDLE && !error && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ fontSize: 14, color: '#6B7280' }}>
                Press and hold the microphone or spacebar to start speaking
              </Typography>
            </Box>
          )}

          {conversationHistory.slice(-5).map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                mb: 1.5,
                textAlign: msg.role === 'user' ? 'right' : 'left'
              }}
            >
              <Box
                sx={{
                  display: 'inline-block',
                  maxWidth: '80%',
                  px: 2,
                  py: 1.5,
                  borderRadius: '12px',
                  backgroundColor: msg.role === 'user' ? '#0AA6A6' : '#F3F4F6',
                  color: msg.role === 'user' ? '#FFFFFF' : '#1F2937'
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: 400 }}>
                  {msg.content}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          px: 2.5,
          py: 2.5,
          borderTop: '1px solid #E5E7EB',
          backgroundColor: '#FFFFFF'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
          {/* Microphone Button */}
          <MicrophoneButton
            isRecording={isRecording}
            onClick={handleMicClick}
            disabled={currentStage !== PIPELINE_STAGES.IDLE && !isRecording}
          />

          {/* Instruction Text */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: isRecording ? '#EF4444' : '#1F2937'
              }}
            >
              {isRecording ? 'Recording...' : 'Hold to speak'}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: '#6B7280',
                mt: 0.5
              }}
            >
              or press Spacebar
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VoiceConversationScreen;

import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import MicrophoneButton from '../components/Lesson/MicrophoneButton';
import { useRecording } from '../hooks/useRecording';
import { useNavigation } from '../hooks/useNavigation.js';

/**
 * VIPSpeakingDrillScreen - Pronunciation practice for survival phrases
 * Uses useNavigation hook for navigation - no props required
 */
const VIPSpeakingDrillScreen = () => {
  // Get navigation functions from context
  const { showVIPScenarioSetup, showDashboard } = useNavigation();

  const { isRecording, startRecording, stopRecording } = useRecording();
  const [practiceComplete, setPracticeComplete] = useState(false);

  const handleMicStart = () => {
    startRecording();
  };

  const handleMicEnd = () => {
    stopRecording();
    setTimeout(() => setPracticeComplete(true), 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        position: 'relative',
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
          onClick={showDashboard}
          sx={{
            color: '#666',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            background: '#A78BFA',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          👁️ Pronunciation
        </Box>

        <Box sx={{ width: '40px' }} />
      </Box>

      {/* Sofia Avatar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '32px',
        }}
      >
        <SofiaAvatar size={48} />
      </Box>

      {/* Target Text Card */}
      <Box
        sx={{
          background: 'white',
          border: '2px solid #5EEAD4',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#0D9488',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Say this phrase:
        </Box>
        <Box
          sx={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#1F2937',
            fontFamily: 'Lexend, sans-serif',
          }}
        >
          ¿Cómo se dice 'Water'?
        </Box>
      </Box>

      {/* Hint Card */}
      <Box
        sx={{
          background: '#EFF6FF',
          border: '1px solid #BAE6FD',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ fontSize: '20px', flexShrink: 0 }}>💡</Box>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#0369A1',
              marginBottom: '4px',
            }}
          >
            Phonetic Hint
          </Box>
          <Box
            sx={{
              fontSize: '14px',
              color: '#0284C7',
              fontFamily: 'monospace',
              fontWeight: 500,
            }}
          >
            /Koh-moh seh dee-seh/
          </Box>
        </Box>
      </Box>

      {/* Spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Microphone Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          paddingBottom: '20px',
        }}
      >
        <MicrophoneButton
          isRecording={isRecording}
          onPressStart={handleMicStart}
          onPressEnd={handleMicEnd}
        />

        <Box
          sx={{
            fontSize: '14px',
            color: '#6B7280',
            fontWeight: 500,
          }}
        >
          {isRecording ? 'Recording...' : practiceComplete ? 'Ready!' : 'Hold to speak'}
        </Box>

        {/* Success Feedback */}
        {practiceComplete && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
            }}
          >
            <Box
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#0D9488',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              ✅ Great pronunciation!
            </Box>

            {/* Continue Button */}
            <button
              onClick={showVIPScenarioSetup}
              style={{
                background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'Lexend, sans-serif',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '200px',
                boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(20, 184, 166, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(20, 184, 166, 0.3)';
              }}
            >
              Continue →
            </button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VIPSpeakingDrillScreen;

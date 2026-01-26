import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import MicrophoneButton from '../components/Lesson/MicrophoneButton';
import { useRecording } from '../hooks/useRecording';
import { useNavigation } from '../hooks/useNavigation.js';

/**
 * VIPRoleplayScreen - Interactive roleplay with customs officer
 * Uses useNavigation hook for navigation - no props required
 */
const VIPRoleplayScreen = () => {
  // Get navigation functions from context
  const { showVIPSuccess, showVIPScenarioSetup } = useNavigation();

  const { isRecording, startRecording, stopRecording } = useRecording();
  const [roleplayComplete, setRoleplayComplete] = useState(false);

  const handleMicStart = () => {
    startRecording();
  };

  const handleMicEnd = () => {
    stopRecording();
    setTimeout(() => setRoleplayComplete(true), 1500);
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
          onClick={showVIPScenarioSetup}
          sx={{
            color: '#666',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            background: '#3B82F6',
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
          👮‍♀️ Customs Officer
        </Box>

        <Box sx={{ width: '40px' }} />
      </Box>

      {/* Officer Avatar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <Box
          sx={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #BFDBFE 0%, #93C5FD 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
          }}
        >
          👮‍♀️
        </Box>
      </Box>

      {/* Officer's Speech Card */}
      <Box
        sx={{
          background: 'white',
          border: '2px solid #93C5FD',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#1E40AF',
              marginBottom: '8px',
            }}
          >
            Officer Sofia
          </Box>
          <Box
            sx={{
              fontSize: '14px',
              color: '#1F2937',
              fontWeight: 500,
              marginBottom: '8px',
            }}
          >
            Necesito ver tu pasaporte y la forma de ingreso, por favor.
          </Box>
          <Box
            sx={{
              fontSize: '12px',
              color: '#9CA3AF',
              fontStyle: 'italic',
            }}
          >
            (Said very quickly...)
          </Box>
        </Box>
      </Box>

      {/* User Prompt Card or Success Card */}
      {!roleplayComplete ? (
        <Box
          sx={{
            background: '#FEF3C7',
            border: '2px solid #FCD34D',
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
                color: '#92400E',
                marginBottom: '4px',
              }}
            >
              Your Move
            </Box>
            <Box
              sx={{
                fontSize: '14px',
                color: '#78350F',
              }}
            >
              Ask her to speak slower.
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            background: '#F0FDF4',
            border: '2px solid #10B981',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
          }}
        >
          <Box sx={{ fontSize: '32px' }}>✅</Box>
          <Box
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#059669',
            }}
          >
            Perfect! Officer understands.
          </Box>
          <Box
            sx={{
              fontSize: '13px',
              color: '#6B7280',
            }}
          >
            You've successfully completed the roleplay.
          </Box>
        </Box>
      )}

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
        {!roleplayComplete && (
          <>
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
              {isRecording ? 'Recording...' : 'Processing response...'}
            </Box>
          </>
        )}

        {/* Continue Button */}
        {roleplayComplete && (
          <button
            onClick={showVIPSuccess}
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Lexend, sans-serif',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '240px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }}
          >
            Continue to Summary
          </button>
        )}
      </Box>
    </Box>
  );
};

export default VIPRoleplayScreen;

import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigation } from '../hooks/useNavigation.js';

/**
 * VIPScenarioSetupScreen - Roleplay scenario introduction
 * Uses useNavigation hook for navigation - no props required
 */
const VIPScenarioSetupScreen = () => {
  // Get navigation functions from context
  const { showVIPRoleplay, showDashboard } = useNavigation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(59,130,246,0.1) 0%, rgba(255,255,255,1) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={showDashboard}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: '#666',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Customs Officer Avatar */}
      <Box
        sx={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #BFDBFE 0%, #93C5FD 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '128px',
          marginBottom: '32px',
          boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
        }}
      >
        👮‍♀️
      </Box>

      {/* Glass Morphism Scenario Card */}
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '32px 24px',
          maxWidth: '400px',
          textAlign: 'center',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Airplane Emoji */}
        <Box
          sx={{
            fontSize: '64px',
            marginBottom: '16px',
          }}
        >
          ✈️
        </Box>

        {/* Headline */}
        <Box
          sx={{
            fontSize: '20px',
            fontWeight: 700,
            fontFamily: 'Lexend, sans-serif',
            color: '#1F2937',
            marginBottom: '12px',
          }}
        >
          The customs officer asks you a fast, complicated question.
        </Box>

        {/* Teal Text */}
        <Box
          sx={{
            fontSize: '16px',
            color: '#14B8A6',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          Use your shield!
        </Box>

        {/* Description */}
        <Box
          sx={{
            fontSize: '14px',
            color: '#6B7280',
            lineHeight: 1.6,
          }}
        >
          You're at the airport customs desk. The officer is speaking quickly. What do you do?
        </Box>
      </Box>

      {/* Start Roleplay Button */}
      <Button
        onClick={showVIPRoleplay}
        sx={{
          background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
          color: 'white',
          padding: '12px 32px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 600,
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
          },
        }}
      >
        Start Roleplay
      </Button>
    </Box>
  );
};

export default VIPScenarioSetupScreen;

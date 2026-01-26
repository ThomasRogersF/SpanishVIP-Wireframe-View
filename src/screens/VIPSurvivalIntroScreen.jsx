import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigation } from '../hooks/useNavigation.js';

/**
 * VIPSurvivalIntroScreen - Entry point to the VIP survival phrases module
 * Uses useNavigation hook for navigation - no props required
 */
const VIPSurvivalIntroScreen = () => {
  // Get navigation functions from context
  const { showVIPTeachShield, showDashboard } = useNavigation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(255,147,51,0.15) 0%, rgba(255,255,255,1) 100%)',
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

      {/* Emoji Container */}
      <Box
        sx={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '128px',
          marginBottom: '32px',
          boxShadow: '0 10px 30px rgba(255, 147, 51, 0.2)',
        }}
      >
        😰
      </Box>

      {/* Glass Morphism Card */}
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
        {/* Headline */}
        <Box
          sx={{
            fontSize: '32px',
            fontWeight: 700,
            fontFamily: 'Lexend, sans-serif',
            color: '#1F2937',
            marginBottom: '16px',
          }}
        >
          Don't Panic.
        </Box>

        {/* Body Text */}
        <Box
          sx={{
            fontSize: '16px',
            color: '#6B7280',
            lineHeight: 1.6,
          }}
        >
          Native speakers talk fast. Really fast. But you have three survival phrases that will save you.
        </Box>
      </Box>

      {/* Get Your Shield Button */}
      <Button
        onClick={showVIPTeachShield}
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
        Get Your Shield
      </Button>
    </Box>
  );
};

export default VIPSurvivalIntroScreen;

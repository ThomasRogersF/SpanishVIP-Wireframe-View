import React from 'react';
import { Box, Button } from '@mui/material';
import StatCard from '../components/shared/StatCard';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import LightningBoltIcon from '@mui/icons-material/ElectricBolt';
import { useNavigation } from '../hooks/useNavigation.js';

/**
 * VIPSuccessScreen - VIP survival module completion summary
 * Uses useNavigation hook for navigation - no props required
 */
const VIPSuccessScreen = () => {
  // Get navigation functions from context
  const { showDashboard } = useNavigation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Lifebuoy Emoji */}
      <Box
        sx={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: '#22C55E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '128px',
          marginBottom: '32px',
          boxShadow: '0 10px 30px rgba(34, 197, 94, 0.2)',
        }}
      >
        🛟
      </Box>

      {/* Headline */}
      <Box
        sx={{
          fontSize: '32px',
          fontWeight: 700,
          fontFamily: 'Lexend, sans-serif',
          color: '#1F2937',
          textAlign: 'center',
          marginBottom: '12px',
        }}
      >
        Survival Skills Unlocked!
      </Box>

      {/* Subheadline */}
      <Box
        sx={{
          fontSize: '16px',
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: '32px',
          maxWidth: '300px',
        }}
      >
        You can handle real conversations now.
      </Box>

      {/* Stats Row */}
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <StatCard
          icon={<LightningBoltIcon />}
          value="+15 XP"
          label="Earned"
          backgroundColor="#FEF3C7"
          iconColor="#F59E0B"
        />
        <StatCard
          icon="⚙️"
          value="New Tool"
          label="Speed Control"
          backgroundColor="#E0E7FF"
        />
      </Box>

      {/* Sofia Feedback Card */}
      <Box
        sx={{
          background: '#F0F9FF',
          border: '1px solid #BAE6FD',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          maxWidth: '350px',
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <SofiaAvatar size={40} />
        </Box>
        <Box>
          <Box
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#0369A1',
              marginBottom: '4px',
            }}
          >
            Sofia's Message
          </Box>
          <Box
            sx={{
              fontSize: '14px',
              color: '#1E40AF',
              lineHeight: 1.5,
            }}
          >
            Now you can control the speed of any conversation. You've got this!
          </Box>
        </Box>
      </Box>

      {/* Back to Home Button */}
      <Button
        onClick={showDashboard}
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
        Back to Home
      </Button>
    </Box>
  );
};

export default VIPSuccessScreen;

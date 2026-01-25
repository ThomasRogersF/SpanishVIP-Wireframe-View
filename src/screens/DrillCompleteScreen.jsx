import React from 'react';
import { Box, Typography, Button, Card } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import StatCard from '../components/shared/StatCard';
import { iosButtonStyle } from '../components/shared/sharedStyles';

/**
 * DrillCompleteScreen Component
 * 
 * Quick drill completion summary with stats and feedback.
 * 
 * @param {Object} props
 * @param {Function} props.onBackToHome - Handler to return to dashboard
 * @param {Object} props.stats - Object with xp, wordsCount, timeSpent
 */
const DrillCompleteScreen = ({
  onBackToHome,
  stats = { xp: 5, wordsCount: 5, timeSpent: '1:45' },
}) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9FAFB',
        overflow: 'auto',
      }}
    >
      {/* Main Content - Centered */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          py: 4,
        }}
      >
        {/* Flame Icon */}
        <Box
          sx={{
            width: 128,
            height: 128,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)',
            mb: 3,
          }}
        >
          <Typography sx={{ fontSize: '4rem', lineHeight: 1 }}>🔥</Typography>
        </Box>

        {/* Headlines */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Lexend, sans-serif',
            fontWeight: 700,
            color: '#1F2937',
            mb: 1,
            textAlign: 'center',
          }}
        >
          Streak Saved!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Lexend, sans-serif',
            color: '#6B7280',
            mb: 4,
            textAlign: 'center',
          }}
        >
          You practiced {stats.wordsCount} words in 2 minutes.
        </Typography>

        {/* Stats Row - Two cards */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            width: '100%',
            maxWidth: 240,
            justifyContent: 'center',
            mb: 4,
          }}
        >
          {/* XP Card */}
          <StatCard
            icon={<BoltIcon />}
            value={`+${stats.xp} XP`}
            label="Earned"
            backgroundColor="#CCFBF1"
            iconColor="#0D9488"
          />

          {/* Time Card */}
          <StatCard
            icon={<AccessTimeIcon />}
            value={stats.timeSpent}
            label="Total Time"
            backgroundColor="#DBEAFE"
            iconColor="#3B82F6"
          />
        </Box>

        {/* Sofia Feedback Card */}
        <Card
          sx={{
            width: '100%',
            maxWidth: 320,
            p: 2,
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <SofiaAvatar size="small" showGradientBorder={false} />
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'Lexend, sans-serif',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  color: '#0D9488',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  mb: 0.5,
                }}
              >
                SOFIA
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Lexend, sans-serif',
                  fontSize: '0.875rem',
                  color: '#374151',
                  lineHeight: 1.4,
                }}
              >
                Good habit! See you tomorrow.
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Action Button */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 320,
          }}
        >
          {/* Primary Button - Back to Home */}
          <Button
            variant="contained"
            fullWidth
            onClick={onBackToHome}
            sx={{
              ...iosButtonStyle,
              background: 'linear-gradient(135deg, #0D9488 0%, #0AA6A6 100%)',
              color: '#FFFFFF',
              fontFamily: 'Lexend, sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0D9488 0%, #0AA6A6 100%)',
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DrillCompleteScreen;

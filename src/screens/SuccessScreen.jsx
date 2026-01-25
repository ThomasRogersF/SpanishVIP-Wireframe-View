import React from 'react';
import { Box, Typography, Button, Card } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import BoltIcon from '@mui/icons-material/Bolt';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import StatCard from '../components/shared/StatCard';
import { iosButtonStyle } from '../components/shared/sharedStyles';

/**
 * SuccessScreen Component
 * 
 * Displays lesson completion celebration with stats and feedback.
 * 
 * @param {Object} props
 * @param {Function} props.onContinue - Handler to return to dashboard
 * @param {Object} props.stats - Object with accuracy, xp, streakDays
 * @param {string} props.message - Sofia's feedback message
 */
const SuccessScreen = ({
  onContinue,
  stats = { accuracy: 100, xp: 10, streakDays: 1 },
  message = "¡Increíble! You sound like a local."
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
        {/* Success Icon */}
        <Box
          sx={{
            width: 128,
            height: 128,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)',
            mb: 3,
          }}
        >
          <CheckIcon sx={{ fontSize: 64, color: '#FFFFFF' }} />
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
          Lesson Complete!
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
          You mastered Cafe Culture.
        </Typography>

        {/* Stats Row */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
            maxWidth: 320,
            mb: 4,
          }}
        >
          {/* Accuracy Card */}
          <StatCard
            icon={<CheckIcon />}
            value={`${stats.accuracy}%`}
            label="Accuracy"
            backgroundColor="#E9D5FF"
            iconColor="#9333EA"
          />

          {/* XP Card */}
          <StatCard
            icon={<BoltIcon />}
            value={`+${stats.xp} XP`}
            label="Earned"
            backgroundColor="#CCFBF1"
            iconColor="#0D9488"
          />

          {/* Streak Card */}
          <StatCard
            icon="🔥"
            value={`${stats.streakDays} Day`}
            label="Streak"
            backgroundColor="#FED7AA"
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
                {message}
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Action Buttons */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* Primary Button - Continue Path */}
          <Button
            variant="contained"
            fullWidth
            onClick={onContinue}
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
            Continue Path
          </Button>

          {/* Secondary Button - Book Review Session */}
          <Button
            variant="text"
            fullWidth
            sx={{
              ...iosButtonStyle,
              color: '#3B82F6',
              fontFamily: 'Lexend, sans-serif',
              fontWeight: 500,
              fontSize: '0.875rem',
              py: 1,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            Book a live review session
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SuccessScreen;

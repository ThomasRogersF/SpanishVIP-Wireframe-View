import { Box, Typography, Chip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import { useNavigation } from '../hooks/useNavigation.js';
import { iosButtonStyle } from '../components/shared/sharedStyles';
import { pulseRing } from '../components/shared/sharedAnimations';

/**
 * VoiceModeScreen Component
 * 
 * Topic selection screen for voice practice mode.
 * Displays Sofia avatar, topic selection chips, and a pulsing microphone button.
 * Uses useNavigation hook for navigation - no props required
 * 
 * @returns {JSX.Element} The voice mode screen component
 */
const VoiceModeScreen = () => {
  // Get navigation functions from context
  const { startActiveCall, showDashboard } = useNavigation();

  const topics = [
    { emoji: '☕', label: 'Order Coffee' },
    { emoji: '✈️', label: 'Travel Plans' },
    { emoji: '💼', label: 'Job Interview' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100%',
        background: 'radial-gradient(circle at center, #E6FFFA 0%, #FFFFFF 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Back button */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={showDashboard}
          aria-label="Back to dashboard"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
        >
          <ArrowBackIcon sx={{ color: '#374151' }} />
        </IconButton>
      </Box>

      {/* Main content area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 6,
          pb: 16,
          px: 3,
        }}
      >
        {/* Sofia Avatar */}
        <Box sx={{ mb: 4 }}>
          <SofiaAvatar size="large" />
        </Box>

        {/* Headline */}
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            color: '#374151',
            mb: 3,
            textAlign: 'center',
          }}
        >
          What do you want to practice?
        </Typography>

        {/* Topic selection chips */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            maxWidth: 384,
            width: '100%',
          }}
        >
          {topics.map((topic, index) => (
            <Chip
              key={index}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 8 }}>{topic.emoji}</span>
                  {topic.label}
                </Box>
              }
              onClick={startActiveCall}
              sx={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #0AA6A6',
                borderRadius: '9999px',
                py: 3,
                px: 2,
                height: 'auto',
                color: '#374151',
                fontSize: 16,
                fontWeight: 500,
                '& .MuiChip-label': {
                  padding: '8px 4px',
                },
                '&:hover': {
                  backgroundColor: '#F0FDFA',
                },
                ...iosButtonStyle,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Fixed microphone button at bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 96,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Instruction text */}
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: '#0F766E',
            mb: 2,
          }}
        >
          Tap to start conversation
        </Typography>

        {/* Microphone button with pulse animation */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Pulse ring */}
          <Box
            sx={{
              position: 'absolute',
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
              animation: `${pulseRing} 1.5s ease-out infinite`,
            }}
          />
          
          {/* Main button */}
          <IconButton
            onClick={startActiveCall}
            aria-label="Start voice conversation"
            sx={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
              boxShadow: '0 10px 15px -3px rgba(20, 184, 166, 0.3), 0 4px 6px -2px rgba(20, 184, 166, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
              },
              ...iosButtonStyle,
            }}
          >
            {/* Microphone icon */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
                fill="white"
              />
              <path
                d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.92V22H13V18.92C16.39 18.43 19 15.53 19 12H17Z"
                fill="white"
              />
            </svg>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default VoiceModeScreen;

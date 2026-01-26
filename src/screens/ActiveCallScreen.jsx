import { Box, IconButton } from '@mui/material';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import SofiaAvatar from '../components/shared/SofiaAvatar';
import AudioVisualizer from '../components/VoiceMode/AudioVisualizer';
import LiveCaptions from '../components/VoiceMode/LiveCaptions';
import { useNavigation } from '../hooks/useNavigation.js';
import { iosButtonStyle } from '../components/shared/sharedStyles';

/**
 * ActiveCallScreen Component
 * 
 * Displays the active voice conversation screen with Sofia avatar,
 * audio visualizer, live captions, and end call button.
 * Uses useNavigation hook for navigation - no props required
 * 
 * @returns {JSX.Element} The active call screen component
 */
const ActiveCallScreen = () => {
  // Get navigation functions from context
  const { endCall } = useNavigation();

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
      {/* Main content area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 4,
          pb: 16,
          px: 3,
        }}
      >
        {/* Extra large Sofia Avatar */}
        <Box sx={{ mb: 6 }}>
          <SofiaAvatar size="xlarge" />
        </Box>

        {/* Audio Visualizer */}
        <Box sx={{ mb: 4 }}>
          <AudioVisualizer />
        </Box>

        {/* Live Captions */}
        <LiveCaptions text="Hola, ¿qué te gustaría tomar?" />
      </Box>

      {/* Fixed end call button at bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 128,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={endCall}
          aria-label="End call"
          sx={{
            width: 64,
            height: 64,
            backgroundColor: '#EF4444',
            boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3), 0 4px 6px -2px rgba(239, 68, 68, 0.2)',
            '&:hover': {
              backgroundColor: '#DC2626',
            },
            ...iosButtonStyle,
          }}
        >
          <PhoneDisabledIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ActiveCallScreen;

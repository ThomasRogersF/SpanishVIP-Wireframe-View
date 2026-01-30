import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { keyframes } from '@mui/system'
// Fade in animation with delay to avoid flash for fast loads
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

/**
 * LoadingScreen - Suspense fallback for lazy-loaded screens
 * 
 * Features:
 * - Centered loading spinner with MUI CircularProgress
 * - Sofia avatar above spinner
 * - Fade-in animation with delay to prevent flash on fast loads
 * - Matches MobileFrame background color
 * 
 * @param {string} message - Optional loading message (default: "Loading...")
 */
function LoadingScreen({ message = 'Loading...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: 300,
        gap: 2,
        animation: `${fadeIn} 0.3s ease-out 0.2s both`,
        bgcolor: 'background.default'
      }}
    >
      <img
        src="/brand/spanishvip_logo.png"
        alt="SpanishVIP"
        style={{
          width: '180px',
          height: 'auto',
          marginBottom: '16px'
        }}
      />
      <CircularProgress
        color="primary"
        size={40}
        thickness={4}
        sx={{ mt: 2 }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, fontWeight: 500 }}
      >
        {message}
      </Typography>
    </Box>
  )
}

export default LoadingScreen

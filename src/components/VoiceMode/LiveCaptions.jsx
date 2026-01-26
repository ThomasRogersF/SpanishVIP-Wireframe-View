import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * LiveCaptions Component
 * 
 * Displays live caption text in a backdrop-blurred pill container.
 * Used during active voice calls to show transcribed speech.
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - The caption text to display
 * @returns {JSX.Element} The live captions component
 */
const LiveCaptions = ({ text = 'Listening...' }) => {
  return (
    <Box
      sx={{
        maxWidth: 400,
        px: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: '9999px',
          px: 3,
          py: 1.5,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <Typography
          sx={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

LiveCaptions.propTypes = {
  /** The caption text to display */
  text: PropTypes.string,
};

export default LiveCaptions;

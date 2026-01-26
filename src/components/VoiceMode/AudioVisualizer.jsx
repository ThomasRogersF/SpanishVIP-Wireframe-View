import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

/**
 * Audio wave animation migrated from src/style.css (lines 64-79).
 * Original CSS used @keyframes audio-wave with scaleY transforms.
 * This MUI keyframes implementation provides the same visual effect
 * with staggered delays for each bar to create a wave-like motion.
 */
const audioWave = keyframes`
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.5);
  }
`;

/**
 * AudioVisualizer Component
 * 
 * Displays 10 animated vertical bars representing audio activity.
 * Each bar has a staggered animation delay to create a wave effect.
 * 
 * @returns {JSX.Element} The audio visualizer component
 */
const AudioVisualizer = () => {
  // Array of bar heights in pixels for visual variety
  const barHeights = [20, 35, 28, 42, 30, 38, 25, 40, 32, 36];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
      }}
    >
      {barHeights.map((height, index) => (
        <Box
          key={index}
          sx={{
            width: 4,
            height: height,
            borderRadius: 2,
            backgroundColor: '#0AA6A6',
            animation: `${audioWave} 0.8s ease-in-out infinite`,
            animationDelay: `${index * 0.1}s`,
            transformOrigin: 'center',
          }}
        />
      ))}
    </Box>
  );
};

export default AudioVisualizer;

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { touchOptimized } from '../shared/sharedStyles'

/**
 * RuleCard - Displays a grammar rule with explanation, example, and audio playback
 * 
 * @param {Object} props
 * @param {string} props.headline - Grammar rule title
 * @param {string} props.text - Rule explanation
 * @param {string} props.exampleSpanish - Spanish example sentence
 * @param {string} props.exampleEnglish - English translation
 * @param {string} props.audioUrl - Path to audio file
 * @param {Function} props.onPlayAudio - Callback to play audio
 */
const RuleCard = ({ 
  headline, 
  text, 
  exampleSpanish, 
  exampleEnglish, 
  audioUrl, 
  onPlayAudio 
}) => {
  return (
    <Box
      sx={{
        bgcolor: '#FEF3C7',
        borderRadius: '16px',
        p: 3,
        maxWidth: '400px',
        width: '100%',
        maxHeight: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Headline */}
      <Typography
        sx={{
          fontFamily: 'Lexend',
          fontSize: { xs: '22px', sm: '24px' },
          fontWeight: 700,
          color: '#1F2937',
          mb: 0.5,
        }}
      >
        {headline}
      </Typography>

      {/* Explanation text */}
      <Typography
        sx={{
          fontSize: { xs: '15px', sm: '16px' },
          lineHeight: 1.5,
          color: '#6B7280',
          mb: 1,
        }}
      >
        {text}
      </Typography>

      {/* Example box */}
      <Box
        sx={{
          bgcolor: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          p: 1.5,
          position: 'relative',
        }}
      >
        {/* Spanish text */}
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#1F2937',
            mb: 0.5,
          }}
        >
          {exampleSpanish}
        </Typography>

        {/* English translation */}
        <Typography
          sx={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#6B7280',
            mb: 1,
          }}
        >
          {exampleEnglish}
        </Typography>

        {/* Audio button */}
        <IconButton
          onClick={() => onPlayAudio(audioUrl)}
          aria-label="Play example pronunciation"
          sx={{
            ...touchOptimized,
            bgcolor: '#F0FDFA',
            color: '#14B8A6',
            '&:hover': {
              bgcolor: '#CCFBF1',
            },
          }}
        >
          <VolumeUpIcon sx={{ fontSize: '24px' }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default RuleCard

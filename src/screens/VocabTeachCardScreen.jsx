import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { useNavigation } from '../hooks/useNavigation.js'
import { iosButtonStyle } from '../components/shared/sharedStyles'

/**
 * VocabTeachCardScreen - Teaching new vocabulary with mock audio playback
 * Displays word cards with pronunciation, translation, and context usage
 * Uses useNavigation hook for navigation - no props required
 */
function VocabTeachCardScreen() {
  // Get navigation functions from context
  const { showVocabSpeaking, showVocabDrillIntro } = useNavigation()

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const words = [
    {
      spanish: 'Tinto',
      english: 'Red wine',
      emoji: '🍷',
      phonetic: 'TEEN-toh',
      context: 'Used for red wine in Spain. "Un tinto, por favor."',
    },
    {
      spanish: 'La Cuenta',
      english: 'The bill/check',
      emoji: '🧾',
      phonetic: 'lah KWEN-tah',
      context: 'Ask for the bill at restaurants. "La cuenta, por favor."',
    },
  ]

  const currentWord = words[currentWordIndex]

  const handlePlayAudio = () => {
    setIsPlaying(true)
    setTimeout(() => {
      setIsPlaying(false)
    }, 2000)
  }

  const handleNextWord = () => {
    setCurrentWordIndex(1)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#F8FAFC',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={showVocabDrillIntro}
            sx={{
              mr: 2,
              color: '#64748B',
              '&:hover': { bgcolor: '#F1F5F9' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: '700',
              color: '#111827',
              fontFamily: 'Lexend',
            }}
          >
            Learn New Words
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: '#64748B',
            fontWeight: '600',
          }}
        >
          Word {currentWordIndex + 1} of 2
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Word Card */}
        <Card
          sx={{
            width: '100%',
            maxWidth: '400px',
            bgcolor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            p: 3,
            textAlign: 'center',
          }}
        >
          {/* Emoji */}
          <Typography
            sx={{
              fontSize: '64px',
              mb: 2,
            }}
          >
            {currentWord.emoji}
          </Typography>

          {/* Spanish Word */}
          <Typography
            sx={{
              fontFamily: 'Lexend',
              fontSize: '32px',
              fontWeight: '700',
              color: '#111827',
              mb: 1,
            }}
          >
            {currentWord.spanish}
          </Typography>

          {/* Phonetic */}
          <Typography
            variant="body2"
            sx={{
              color: '#14B8A6',
              fontWeight: '600',
              mb: 2,
              fontSize: '14px',
            }}
          >
            {currentWord.phonetic}
          </Typography>

          {/* English Translation */}
          <Typography
            variant="body1"
            sx={{
              color: '#475569',
              mb: 3,
              fontSize: '16px',
            }}
          >
            {currentWord.english}
          </Typography>

          {/* Audio Playback Button */}
          <Box sx={{ mb: 3 }}>
            <IconButton
              onClick={handlePlayAudio}
              sx={{
                bgcolor: '#F0FDFA',
                color: '#14B8A6',
                width: '56px',
                height: '56px',
                '&:hover': {
                  bgcolor: '#CCFBF1',
                },
              }}
            >
              {isPlaying ? (
                <PauseIcon sx={{ fontSize: '28px' }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: '28px' }} />
              )}
            </IconButton>
          </Box>

          {/* Context Usage */}
          <Box
            sx={{
              bgcolor: '#F0FDFA',
              border: '1px solid #CCFBF1',
              borderRadius: '8px',
              p: 2,
              mt: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#0D9488',
                fontWeight: '600',
                mb: 0.5,
                fontSize: '12px',
              }}
            >
              CONTEXT
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#475569',
                fontSize: '14px',
                fontStyle: 'italic',
              }}
            >
              {currentWord.context}
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* Fixed Bottom Section */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          p: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={
            currentWordIndex === 0 ? handleNextWord : showVocabSpeaking
          }
          sx={{
            ...iosButtonStyle,
            background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
          }}
        >
          {currentWordIndex === 0 ? 'Next Word' : 'Continue to Practice'}
        </Button>
      </Box>
    </Box>
  )
}

export default VocabTeachCardScreen

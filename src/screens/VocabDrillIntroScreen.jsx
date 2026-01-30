import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import SofiaAvatar from '../components/shared/SofiaAvatar.jsx'
import { useNavigation } from '../hooks/useNavigation.js'
import { iosButtonStyle } from '../components/shared/sharedStyles'

/**
 * VocabDrillIntroScreen - Entry point to the vocabulary drill
 * Shows drill overview, word previews, and starts the learning flow
 * Uses useNavigation hook for navigation - no props required
 */
function VocabDrillIntroScreen() {
  // Get navigation functions from context
  const { showVocabTeachCard, showReviewScreen, activeVocabTopic } = useNavigation()

  // Fallback if no topic selected (e.g. direct load)
  const topicTitle = activeVocabTopic?.title || "Vocabulary Drill";
  const wordsToLearn = activeVocabTopic?.words || [];

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
          p: 2,
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <IconButton
          onClick={showReviewScreen}
          sx={{
            mr: 2,
            color: '#64748B',
            '&:hover': { bgcolor: '#F1F5F9' },
          }}
          aria-label="Return to Vocabulary Shelves"
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
          {topicTitle}
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
          gap: { xs: 1.5, sm: 2 },
          minHeight: 0,
        }}
      >
        {/* Sofia Welcome Card */}
        <Card
          sx={{
            bgcolor: '#F0FDFA',
            border: '1px solid #CCFBF1',
            borderRadius: '12px',
            minHeight: '100px',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SofiaAvatar size="small" emoji="👋" showGradientBorder={false} />
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#111827',
                    fontWeight: '600',
                    mb: 0.5,
                  }}
                >
                  Welcome to {topicTitle}!
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#475569',
                    fontSize: '14px',
                  }}
                >
                  Learn {wordsToLearn.length} new words through interactive cards, practice speaking, and test your listening skills.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Drill Structure Info Card */}
        <Card
          sx={{
            bgcolor: '#FEF3C7',
            border: '1px solid #FCD34D',
            borderRadius: '12px',
            minHeight: '100px',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <LightbulbIcon
                sx={{
                  color: '#D97706',
                  fontSize: '28px',
                  flexShrink: 0,
                  mt: 0.5,
                }}
              />
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#111827',
                    fontWeight: '600',
                    mb: 0.5,
                  }}
                >
                  Drill Structure
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#475569',
                    fontSize: '14px',
                  }}
                >
                  You'll learn {wordsToLearn.length} new words → Practice speaking → Test your listening
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Word Preview Cards */}
        <Typography
          variant="body2"
          sx={{
            color: '#64748B',
            fontWeight: '600',
            mt: 1,
            mb: 1,
          }}
        >
          Words You'll Learn
        </Typography>

        {wordsToLearn.map((word, index) => (
          <Card
            key={index}
            sx={{
              borderLeft: '4px solid #14B8A6',
              bgcolor: '#F0FDFA',
              borderRadius: '8px',
              mb: 1,
              minHeight: '80px',
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '700',
                  color: '#111827',
                  mb: 0.5,
                }}
              >
                {word.emoji} {word.spanish}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#64748B',
                }}
              >
                {word.english}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {wordsToLearn.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No words loaded for this topic.
          </Typography>
        )}

      </Box>

      {/* Fixed Bottom Section */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Button
          fullWidth
          variant="text"
          onClick={showVocabTeachCard}
          disabled={wordsToLearn.length === 0}
          sx={{
            ...iosButtonStyle,
            color: '#64748B',
            '&:hover': {
              backgroundColor: 'rgba(100, 116, 139, 0.08)',
            },
            '&:disabled': {
              color: '#D1D5DB',
            },
          }}
        >
          Skip to Flashcards
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={showVocabTeachCard}
          disabled={wordsToLearn.length === 0}
          sx={{
            ...iosButtonStyle,
            background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
          }}
        >
          Start Drill
        </Button>
      </Box>
    </Box>
  )
}

export default VocabDrillIntroScreen

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import { iosButtonStyle } from '../shared/sharedStyles.js'

/**
 * HeroCard - Main hero section of the dashboard
 * Displays current lesson progress, Sofia's nudge, and resume button
 */
function HeroCard({
  headline = "Continue Unit 1: Cafe Culture",
  subheadline = "Lesson 4: Ordering with Politeness",
  progress = 60,
  sofiaNudge = "You left off at the Roleplay. Let's finish ordering that coffee.",
  buttonText = "Resume Class",
  onResumeClick,
  backgroundColor = "#14B8A6",
  textColor = "#FFFFFF",
  buttonColor = "#FFFFFF"
}) {
  return (
    <Card
      sx={{
        borderRadius: '24px',
        padding: '24px',
        backgroundColor: backgroundColor,
        color: textColor,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Header with icon and text */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        {/* Coffee emoji icon */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            flexShrink: 0
          }}
        >
          ☕
        </Box>
        
        {/* Headline and subheadline */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: '1.125rem',
              lineHeight: 1.3,
              color: textColor
            }}
          >
            {headline}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.9,
              mt: 0.5,
              color: textColor
            }}
          >
            {subheadline}
          </Typography>
        </Box>
      </Box>

      {/* Progress bar */}
      <Box sx={{ mt: 3 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              backgroundColor: buttonColor
            }
          }}
        />
      </Box>

      {/* Sofia's nudge */}
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '12px'
        }}
      >
        <Box
          sx={{
            fontSize: '20px',
            flexShrink: 0
          }}
        >
          👩‍🏫
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: textColor
          }}
        >
          {sofiaNudge}
        </Typography>
      </Box>

      {/* Resume button */}
      <Button
        fullWidth
        onClick={onResumeClick}
        sx={{
          mt: 3,
          backgroundColor: buttonColor,
          color: backgroundColor,
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: '12px',
          py: 1.5,
          fontSize: '1rem',
          ...iosButtonStyle,
          '&:hover': {
            backgroundColor: buttonColor,
            opacity: 0.95
          }
        }}
      >
        {buttonText}
      </Button>
    </Card>
  )
}

export default HeroCard

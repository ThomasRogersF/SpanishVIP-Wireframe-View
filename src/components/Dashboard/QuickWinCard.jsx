import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { iosButtonStyle } from '../shared/sharedStyles.js'

/**
 * QuickWinCard - Quick action card for short activities
 * Displays a call-to-action for time-limited activities like vocab drills
 */
function QuickWinCard({
  headline = "Short on time?",
  actionText = "Do a 2-Min Vocab Drill ⚡",
  onStartClick
}) {
  return (
    <Card
      sx={{
        borderRadius: '16px',
        padding: '20px',
        backgroundColor: '#F9FAFB',
        border: '1px solid #E5E7EB',
        boxShadow: 'none'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              fontSize: '0.875rem',
              mb: 0.5
            }}
          >
            {headline}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: '#111827',
              fontSize: '1rem'
            }}
          >
            {actionText}
          </Typography>
        </Box>
        
        <Button
          onClick={onStartClick}
          sx={{
            backgroundColor: '#0AA6A6',
            color: '#FFFFFF',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '10px',
            px: 2.5,
            py: 1,
            fontSize: '0.875rem',
            minWidth: 'auto',
            ...iosButtonStyle,
            '&:hover': {
              backgroundColor: '#099090'
            }
          }}
        >
          Start →
        </Button>
      </Box>
    </Card>
  )
}

export default QuickWinCard

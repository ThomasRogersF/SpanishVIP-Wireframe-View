import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { iosButtonStyle } from '../shared/sharedStyles.js'

/**
 * UpsellBanner - Promotional banner for additional services
 * Displays a call-to-action for booking human tutors
 */
function UpsellBanner({
  upsellText = "Stuck on a concept?",
  actionText = "Book a Human Tutor ($15)",
  onBookClick
}) {
  return (
    <Card
      sx={{
        borderRadius: '16px',
        padding: '20px',
        background: 'linear-gradient(90deg, #FAF5FF 0%, #EFF6FF 100%)',
        border: '1px solid #E9D5FF',
        boxShadow: 'none',
        mt: 3
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        {/* Teacher emoji icon */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            flexShrink: 0,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
          }}
        >
          👨‍🏫
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              fontSize: '0.875rem',
              mb: 0.25
            }}
          >
            {upsellText}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: '#7C3AED',
              fontSize: '0.9375rem'
            }}
          >
            {actionText}
          </Typography>
        </Box>
        
        <Button
          onClick={onBookClick}
          sx={{
            backgroundColor: '#7C3AED',
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
              backgroundColor: '#6D28D9'
            }
          }}
        >
          Book
        </Button>
      </Box>
    </Card>
  )
}

export default UpsellBanner

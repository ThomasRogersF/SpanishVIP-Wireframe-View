import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { badgePulse, floatingShadow } from '../shared/sharedAnimations.js'

/**
 * UpsellBanner - Premium promotional banner for booking human tutors
 * 
 * Features:
 * - Warm emerald gradient background with glassmorphism effects
 * - Overlapping tutor avatar stack with online status indicator
 * - Social proof microcopy with pulsing animation
 * - Prominent pricing display with optional strikethrough comparison
 * - Hover and press animations for enhanced interactivity
 * - Full accessibility support with ARIA labels and touch optimization
 * 
 * @param {Object} props - Component props
 * @param {string} [props.upsellText="Stuck on a concept?"] - Headline text
 * @param {string} [props.actionText="Book a Human Tutor"] - Main action text
 * @param {Function} props.onBookClick - Callback when book button is clicked
 * @param {number} [props.availableTutors=3] - Number of tutors available (for social proof)
 * @param {string} [props.price="$15"] - Current price display
 * @param {string} [props.originalPrice] - Optional original price for strikethrough comparison
 * @param {boolean} [props.showTutorAvatars=true] - Toggle avatar stack visibility
 * @param {boolean} [props.showTutorIllustration=false] - Toggle tutor illustration instead of emojis
 * @param {string} [props.tutorIllustrationUrl] - URL for tutor illustration image
 * 
 * @example
 * // Basic usage
 * <UpsellBanner onBookClick={() => console.log('Book clicked')} />
 * 
 * @example
 * // With custom pricing and social proof
 * <UpsellBanner
 *   availableTutors={5}
 *   price="$15"
 *   originalPrice="$25"
 *   onBookClick={handleBooking}
 * />
 */
function UpsellBanner({
  upsellText = "Stuck on a concept?",
  actionText = "Book a Human Tutor",
  onBookClick,
  availableTutors = 3,
  price = "$15",
  originalPrice,
  showTutorAvatars = true,
  showTutorIllustration = false,
  tutorIllustrationUrl
}) {
  const theme = useTheme()
  
  // Tutor avatar data with gradient backgrounds
  const tutorAvatars = [
    { emoji: '👨‍🏫', gradient: theme.gradients?.primary || 'linear-gradient(135deg, #059669 0%, #0d9488 100%)' },
    { emoji: '👩‍🏫', gradient: theme.gradients?.secondary || 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
    { emoji: '🧑‍🏫', gradient: 'linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)' }
  ]

  return (
    <Card
      role="region"
      aria-label="Tutor booking promotion"
      sx={{
        borderRadius: '16px',
        padding: '24px',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)',
        border: '1px solid rgba(5, 150, 105, 0.15)',
        boxShadow: theme.customShadows?.card || '0 2px 8px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.02)',
        mt: 3,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        willChange: 'transform',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.customShadows?.elevated || '0 8px 24px rgba(5, 150, 105, 0.15)'
        },
        // Subtle background pattern overlay
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(13, 148, 136, 0.03) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Tutor Avatar Stack */}
        {showTutorAvatars && !showTutorIllustration && (
          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              width: 80,
              height: 48,
              flexShrink: 0
            }}
          >
            {tutorAvatars.map((tutor, index) => (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  left: index * 16,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: tutor.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  border: '2px solid white',
                  boxShadow: theme.customShadows?.elevated || '0 8px 24px rgba(5, 150, 105, 0.15)',
                  zIndex: tutorAvatars.length - index,
                  willChange: 'transform',
                  ...(index === 0 && {
                    animation: `${badgePulse} 3s ease-in-out infinite`,
                    animationDelay: '0.5s'
                  })
                }}
              >
                {tutor.emoji}
              </Box>
            ))}
            {/* Online status indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: -2,
                left: 28,
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: theme.palette?.success?.main || '#10B981',
                border: '2px solid white',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.4)'
              }}
            />
          </Box>
        )}

        {/* Tutor Illustration Option */}
        {showTutorIllustration && tutorIllustrationUrl && (
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '12px',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: theme.customShadows?.elevated || '0 8px 24px rgba(5, 150, 105, 0.15)',
              animation: `${floatingShadow} 3s ease-in-out infinite`,
              willChange: 'transform'
            }}
          >
            <Box
              component="img"
              src={tutorIllustrationUrl}
              alt="Tutor"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        )}

        {/* Text Content Section */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {/* Line 1 - Headline */}
          <Typography
            variant="body2"
            sx={{
              color: theme.palette?.text?.secondary || '#6B7280',
              fontSize: '0.8125rem',
              fontWeight: 500,
              lineHeight: 1.4
            }}
          >
            {upsellText}
          </Typography>
          
          {/* Line 2 - Action Text */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: theme.palette?.primary?.main || '#059669',
              fontSize: '0.9375rem',
              lineHeight: 1.3
            }}
          >
            {actionText}
          </Typography>
          
          {/* Line 3 - Social Proof */}
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: theme.palette?.success?.main || '#10B981',
              fontSize: '0.75rem',
              fontWeight: 500,
              lineHeight: 1.2,
              animation: `${badgePulse} 2s ease-in-out infinite`
            }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'success.main',
                mr: 0.5
              }}
            />
            {availableTutors} tutors available now
          </Typography>
        </Box>
        
        {/* CTA Button with Pricing */}
        <Button
          onClick={onBookClick}
          aria-label={`Book a human tutor session for ${price}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.gradients?.primary || 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
            color: '#FFFFFF',
            borderRadius: theme.shape?.borderRadiusButton || 12,
            px: 3,
            py: 1.5,
            minWidth: 80,
            minHeight: 48,
            textTransform: 'none',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            transition: 'all 0.2s ease',
            willChange: 'transform',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
            '&:hover': {
              background: 'linear-gradient(135deg, #047857 0%, #0d9488 100%)',
              transform: 'scale(1.02)',
              boxShadow: theme.customShadows?.elevated || '0 8px 24px rgba(5, 150, 105, 0.15)'
            },
            '&:active': {
              transform: 'scale(0.98)',
              opacity: 0.9
            }
          }}
        >
          {/* Original price strikethrough (if provided) */}
          {originalPrice && (
            <Typography
              component="span"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                textDecoration: 'line-through',
                opacity: 0.6,
                lineHeight: 1
              }}
            >
              {originalPrice}
            </Typography>
          )}
          
          {/* Button text */}
          <Typography
            component="span"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              lineHeight: 1.2
            }}
          >
            Book Now
          </Typography>
          
          {/* Pricing */}
          <Typography
            component="span"
            sx={{
              fontSize: '1.125rem',
              fontWeight: 700,
              lineHeight: 1
            }}
          >
            {price}
          </Typography>
        </Button>
      </Box>
    </Card>
  )
}

export default UpsellBanner

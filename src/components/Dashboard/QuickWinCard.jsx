import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { iosButtonStyle } from '../shared/sharedStyles.js'
import { magneticHover, rippleEffect, lightningFlash, floatingShadow } from '../shared/sharedAnimations.js'

/**
 * LightningBolt Component
 *
 * Decorative SVG lightning bolt with gradient fill and subtle flash animation.
 * Used as a background decoration for the QuickWinCard.
 *
 * @param {object} props
 * @param {number} props.size - Size of the lightning bolt (default: 48)
 */
const LightningBolt = ({ size = 48 }) => {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{
        width: size,
        height: size,
        position: 'absolute',
        top: -8,
        right: -8,
        transform: 'rotate(15deg)',
        opacity: 0.2,
        animation: `${lightningFlash} 2s ease-in-out infinite`,
        willChange: 'opacity',
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none'
        }
      }}
    >
      <defs>
        <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <path
        d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
        fill="url(#lightningGradient)"
      />
    </Box>
  )
}

/**
 * QuickWinCard - FAB-style quick action card for short activities
 *
 * A visually elevated, animated component featuring:
 * - Gradient background using theme secondary colors (coral/saffron)
 * - Decorative lightning bolt SVG with flash animation
 * - Floating shadow animation for visual prominence
 * - White button with emerald text for high contrast
 * - Magnetic hover and ripple effects on the CTA button
 * - Reduced motion support for accessibility
 *
 * Props:
 * @param {string} headline - Short descriptive text (default: "Short on time?")
 * @param {string} actionText - Main action text (default: "Do a 2-Min Vocab Drill")
 * @param {function} onStartClick - Click handler for the start button
 * @param {boolean} enableAnimations - Enable/disable animations (default: true)
 */
function QuickWinCard({
  headline = "Short on time?",
  actionText = "Do a 2-Min Vocab Drill",
  onStartClick,
  enableAnimations = true
}) {
  const theme = useTheme()

  const floatingStyles = enableAnimations
    ? {
        animation: `${floatingShadow} 3s ease-in-out infinite`,
        willChange: 'transform'
      }
    : {}

  return (
    <Box
      sx={{
        borderRadius: theme.shape.borderRadius,
        background: theme.gradients.secondary,
        boxShadow: theme.customShadows.elevated,
        padding: theme.spacing(3),
        position: 'relative',
        overflow: 'hidden',
        ...floatingStyles,
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none'
        }
      }}
    >
      {/* Decorative Lightning Bolt */}
      <LightningBolt size={48} />
      
      {/* Second lightning bolt for more visual interest */}
      <Box
        component="svg"
        viewBox="0 0 24 24"
        sx={{
          width: 32,
          height: 32,
          position: 'absolute',
          bottom: 8,
          left: 8,
          transform: 'rotate(-25deg)',
          opacity: 0.15,
          animation: enableAnimations ? `${lightningFlash} 2s ease-in-out infinite` : 'none',
          animationDelay: '1s',
          willChange: 'opacity',
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none'
          }
        }}
      >
        <path
          d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
          fill="rgba(255, 255, 255, 0.8)"
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.875rem',
              fontWeight: 500,
              mb: 0.5
            }}
          >
            {headline}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              fontSize: '1.125rem',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {actionText} ⚡
          </Typography>
        </Box>

        <Button
          onClick={onStartClick}
          sx={{
            backgroundColor: '#FFFFFF',
            color: theme.palette.primary.main,
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: theme.shape.borderRadiusButton,
            px: 3,
            py: 1.5,
            fontSize: '0.9rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            alignSelf: 'flex-start',
            ...iosButtonStyle,
            '&:hover': {
              backgroundColor: '#FFFFFF',
              animation: `${magneticHover} 0.3s ease forwards`,
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
            },
            '&:active': {
              transform: 'scale(0.97)'
            },
            '@media (prefers-reduced-motion: reduce)': {
              '&:hover': {
                animation: 'none'
              }
            }
          }}
        >
          Start →
        </Button>
      </Box>
    </Box>
  )
}

export default QuickWinCard

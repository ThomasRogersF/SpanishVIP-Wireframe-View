import { useState, useCallback, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { iosButtonStyle, spanishTilePattern } from '../shared/sharedStyles.js'
import { magneticHover, rippleEffect, steamRise } from '../shared/sharedAnimations.js'

/**
 * HeroCard - Premium glassmorphism hero section of the dashboard
 * 
 * Features a layered glassmorphism design with:
 * - Gradient base layer using theme.gradients.primary
 * - Spanish tile SVG pattern overlay at low opacity
 * - Semi-transparent glassmorphism overlay with backdrop blur
 * - Circular progress ring around lesson thumbnail
 * - Pill badge for lesson number with improved typography hierarchy
 * - Magnetic hover and ripple animations on the Resume button
 * - Animated coffee steam effect above the emoji
 * 
 * @param {Object} props
 * @param {string} props.headline - Main headline text (e.g., "Unit 1: Cafe Culture")
 * @param {string} props.subheadline - Subheadline text (e.g., "Ordering with Politeness")
 * @param {number} props.progress - Progress percentage (0-100) for circular progress ring
 * @param {string} props.sofiaNudge - Sofia's contextual nudge message
 * @param {string} props.buttonText - Text for the Resume button
 * @param {Function} props.onResumeClick - Click handler for Resume button
 * @param {string} props.backgroundColor - Base color for gradient (controls theme.gradients.primary)
 * @param {string} props.textColor - Text color for all content
 * @param {string} props.buttonColor - Button background color
 */
function HeroCard({
  headline = "Unit 1: Cafe Culture",
  subheadline = "Ordering with Politeness",
  progress = 60,
  sofiaNudge = "You left off at the Roleplay. Let's finish ordering that coffee.",
  buttonText = "Resume Class",
  onResumeClick,
  backgroundColor = "#14B8A6",
  textColor = "#FFFFFF",
  buttonColor = "#FFFFFF"
}) {
  const theme = useTheme()
  const [ripples, setRipples] = useState([])

  // Handle ripple effect on button click
  const handleButtonClick = useCallback((event) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
    
    // Call the original click handler
    if (onResumeClick) {
      onResumeClick(event)
    }
  }, [onResumeClick])

  // Generate Spanish tile pattern using shared utility
  const tilePattern = useMemo(() => spanishTilePattern({
    id: 'hero-spanish-tiles',
    color: 'white',
    opacity: 0.1,
    size: 40
  }), [])

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: `${theme.shape.borderRadius}px`,
        overflow: 'hidden',
        boxShadow: theme.customShadows?.elevated || '0 8px 24px rgba(5, 150, 105, 0.15)'
      }}
    >
      {/* Background gradient layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: theme.gradients?.primary || 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
          zIndex: 0
        }}
      />

      {/* Spanish tile pattern layer - using reusable pattern utility */}
      <Box
        sx={{
          ...tilePattern.style,
          zIndex: 1,
          transition: 'opacity 0.3s ease',
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none'
          }
        }}
      />

      {/* Glassmorphism overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 2,
          // Fallback for browsers without backdrop-filter support
          '@supports not (backdrop-filter: blur(12px))': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)'
          }
        }}
      />

      {/* Content layer */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          padding: 4, // 32px
          color: textColor
        }}
      >
        {/* Circular Progress with Thumbnail - Centered */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex'
            }}
          >
            {/* Background track */}
            <CircularProgress
              variant="determinate"
              value={100}
              size={96}
              thickness={3}
              sx={{
                color: 'rgba(255, 255, 255, 0.2)',
                position: 'absolute',
                left: 0
              }}
              aria-hidden="true"
            />
            
            {/* Progress ring */}
            <CircularProgress
              variant="determinate"
              value={progress}
              size={96}
              thickness={3}
              sx={{
                color: 'white',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round'
                }
              }}
              aria-label={`Lesson progress: ${progress}%`}
            />
            
            {/* Thumbnail with coffee emoji and steam */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Steam animation */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -16,
                  display: 'flex',
                  gap: 0.5,
                  '@media (prefers-reduced-motion: reduce)': {
                    display: 'none'
                  }
                }}
              >
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    component="span"
                    sx={{
                      width: 4,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      animation: `${steamRise} 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.6}s`
                    }}
                  />
                ))}
              </Box>
              
              {/* Coffee emoji thumbnail */}
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px'
                }}
              >
                ☕
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Typography Section - Improved Hierarchy */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          {/* Lesson pill badge */}
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderRadius: theme.shape.borderRadiusPill || 9999,
              padding: '4px 12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'white',
              boxShadow: '0 2px 8px rgba(255, 255, 255, 0.2)',
              mb: 1.5
            }}
          >
            Lesson 4
          </Box>
          
          {/* Subheadline - Prominent */}
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              lineHeight: 1.2,
              color: textColor,
              mb: 1
            }}
          >
            {subheadline}
          </Typography>
          
          {/* Unit text - Reduced prominence */}
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500,
              opacity: 0.85,
              color: textColor
            }}
          >
            {headline}
          </Typography>
        </Box>

        {/* Sofia's nudge */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '16px'
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

        {/* Resume button with magnetic hover and ripple */}
        <Button
          fullWidth
          onClick={handleButtonClick}
          sx={{
            mt: 4,
            backgroundColor: buttonColor,
            color: theme.palette.primary.main,
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '12px',
            py: 2, // 16px vertical padding
            fontSize: '1rem',
            position: 'relative',
            overflow: 'hidden',
            ...iosButtonStyle,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              backgroundColor: buttonColor,
              boxShadow: theme.customShadows?.elevated || '0 8px 24px rgba(5, 150, 105, 0.15)',
              animation: `${magneticHover} 0.3s ease forwards`,
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none',
                transform: 'none'
              }
            },
            '&:active': {
              transform: 'scale(0.98)'
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none'
            }
          }}
        >
          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <Box
              key={ripple.id}
              sx={{
                position: 'absolute',
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
                borderRadius: '50%',
                backgroundColor: 'rgba(5, 150, 105, 0.3)',
                animation: `${rippleEffect} 0.6s ease-out`,
                pointerEvents: 'none',
                '@media (prefers-reduced-motion: reduce)': {
                  animation: 'none',
                  display: 'none'
                }
              }}
            />
          ))}
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
}

export default HeroCard

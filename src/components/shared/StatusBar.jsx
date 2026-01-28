import React from 'react'
import { Box, Typography, Chip, useTheme } from '@mui/material'
import { iosButtonStyle, pulseRingStyle } from './sharedStyles'
import { pulseRing, waveformPulse, badgePulse } from './sharedAnimations'

/**
 * AnimatedFlame Component
 *
 * Premium SVG flame icon with gradient coloring and pulse ring animations.
 * Used to visually represent streak indicators with a vibrant, animated effect.
 *
 * Features:
 * - Two-layer flame design for depth effect
 * - Linear gradient using theme secondary colors
 * - Two staggered pulse rings for attention-drawing effect
 * - GPU-accelerated animations for smooth performance
 *
 * @param {object} props
 * @param {number} props.size - Size of the flame icon (default: 24)
 */
const AnimatedFlame = ({ size = 24 }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
        '@media (prefers-reduced-motion: reduce)': {
          '& > *': {
            animation: 'none !important'
          }
        }
      }}
    >
      {/* First pulse ring */}
      <Box
        sx={{
          ...pulseRingStyle({
            size: '140%',
            color: theme.palette.secondary.main,
            borderWidth: 2
          }),
          opacity: 0.4,
          animation: `${pulseRing} 2s ease-out infinite`
        }}
      />
      {/* Second pulse ring (staggered) */}
      <Box
        sx={{
          ...pulseRingStyle({
            size: '140%',
            color: theme.palette.secondary.light,
            borderWidth: 2
          }),
          opacity: 0.3,
          animation: `${pulseRing} 2s ease-out infinite`,
          animationDelay: '1s'
        }}
      />
      {/* Flame SVG */}
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <defs>
          <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={theme.palette.secondary.dark} />
            <stop offset="50%" stopColor={theme.palette.secondary.main} />
            <stop offset="100%" stopColor={theme.palette.secondary.light} />
          </linearGradient>
          <linearGradient id="flameInnerGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={theme.palette.secondary.main} />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
        </defs>
        {/* Outer flame */}
        <path
          d="M12 2C12 2 7 7 7 12C7 15.5 9 18 12 20C15 18 17 15.5 17 12C17 7 12 2 12 2Z"
          fill="url(#flameGradient)"
        />
        {/* Inner flame for depth */}
        <path
          d="M12 6C12 6 9.5 9 9.5 12C9.5 14 10.5 15.5 12 17C13.5 15.5 14.5 14 14.5 12C14.5 9 12 6 12 6Z"
          fill="url(#flameInnerGradient)"
        />
      </svg>
    </Box>
  )
}

/**
 * VoiceWaveform Component
 *
 * Circular voice energy indicator with animated waveform bars.
 * Displays 5 vertical bars in a circular pattern with staggered pulse animations.
 *
 * Features:
 * - Circular container with primary color stroke
 * - 5 animated bars with wave-like staggered timing
 * - GPU-accelerated scaleY animations
 *
 * @param {object} props
 * @param {number} props.size - Size of the indicator (default: 24)
 */
const VoiceWaveform = ({ size = 24 }) => {
  const theme = useTheme()
  const barHeights = [8, 12, 16, 12, 8]
  const delays = ['0ms', '150ms', '300ms', '150ms', '0ms']

  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
        '@media (prefers-reduced-motion: reduce)': {
          '& rect': {
            animation: 'none !important'
          }
        }
      }}
    >
      <svg viewBox="0 0 48 48" width={size} height={size}>
        {/* Outer circle */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke={theme.palette.primary.main}
          strokeWidth="3"
          fill="none"
          opacity="0.3"
        />
        {/* Waveform bars */}
        {barHeights.map((height, index) => (
          <rect
            key={index}
            x={12 + index * 6}
            y={24 - height / 2}
            width="3"
            height={height}
            rx="1.5"
            fill={theme.palette.primary.light}
            style={{
              transformOrigin: 'center',
              animation: `${waveformPulse} 1.2s ease-in-out infinite`,
              animationDelay: delays[index]
            }}
          />
        ))}
      </svg>
    </Box>
  )
}

/**
 * StatusBar Component
 *
 * Top status bar displaying user progress metrics: streak days and voice energy.
 * Features premium animated indicators with gradient backgrounds and pulse effects.
 *
 * Visual Features:
 * - AnimatedFlame SVG with gradient and pulse rings for streak
 * - VoiceWaveform with animated bars for voice energy
 * - Gradient chip backgrounds using theme tokens
 * - Pill badge styling for streak display
 * - Reduced motion support for accessibility
 *
 * @param {object} props
 * @param {number} props.streakDays - Number of consecutive days (default: 3)
 * @param {string} props.voiceEnergyMinutes - Voice energy time string (default: '12m')
 * @param {boolean} props.enableAnimations - Enable/disable animations (default: true)
 */
const StatusBar = ({ streakDays = 3, voiceEnergyMinutes = '12m', enableAnimations = true }) => {
  const theme = useTheme()

  const animationStyles = enableAnimations
    ? {
        animation: `${badgePulse} 2s ease-in-out infinite`,
        willChange: 'transform'
      }
    : {}

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2.5,
        py: 2,
        borderBottom: '1px solid #E5E7EB'
      }}
    >
      {/* Streak Chip */}
      <Chip
        icon={<AnimatedFlame size={20} />}
        label={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: theme.shape.borderRadiusPill,
              padding: '4px 10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              ...animationStyles,
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none'
              }
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: '#1F2937',
                lineHeight: 1.2,
                fontSize: '0.8rem'
              }}
            >
              🔥 {streakDays} day streak
            </Typography>
          </Box>
        }
        sx={{
          height: 'auto',
          background: theme.gradients.secondary,
          borderRadius: theme.shape.borderRadiusPill,
          px: 0.5,
          py: 0.5,
          cursor: 'pointer',
          boxShadow: theme.customShadows.card,
          '& .MuiChip-icon': {
            marginLeft: '4px',
            marginRight: '-4px'
          },
          '& .MuiChip-label': {
            paddingLeft: 1,
            paddingRight: 0.5
          },
          ...iosButtonStyle
        }}
      />

      {/* Voice Energy Chip */}
      <Chip
        icon={<VoiceWaveform size={20} />}
        label={
          <Box sx={{ display: 'flex', flexDirection: 'column', py: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.2,
                fontSize: '0.65rem'
              }}
            >
              Voice Energy
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.2
              }}
            >
              {voiceEnergyMinutes}
            </Typography>
          </Box>
        }
        sx={{
          height: 'auto',
          background: theme.gradients.primary,
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: theme.shape.borderRadiusPill,
          px: 0.5,
          py: 0.5,
          cursor: 'pointer',
          boxShadow: theme.customShadows.elevated,
          '& .MuiChip-icon': {
            marginLeft: '4px',
            marginRight: '-4px'
          },
          '& .MuiChip-label': {
            paddingLeft: 1,
            paddingRight: 1.5
          },
          ...iosButtonStyle
        }}
      />
    </Box>
  )
}

export default StatusBar

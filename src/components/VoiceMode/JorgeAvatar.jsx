import React from 'react'
import { Box } from '@mui/material'
import { pulseRingStyle } from '../shared/sharedStyles'
import { pulseRing } from '../shared/sharedAnimations'

/**
 * JorgeAvatar Component
 *
 * Reusable avatar component for Jorge (taxi driver) with optional gradient border
 * and pulse animation for AI thinking/speaking states.
 * Supports multiple sizes for different contexts (lesson screen, voice mode, etc.).
 *
 * @param {object} props
 * @param {'medium' | 'large' | 'xlarge'} props.size - Avatar size (default: 'medium')
 * @param {string} props.emoji - Emoji to display (default: '🚕')
 * @param {boolean} props.showGradientBorder - Whether to show gradient border (default: true)
 * @param {boolean} props.isPulsing - Whether to show pulse animation (default: false)
 */
const JorgeAvatar = ({ 
  size = 'medium', 
  emoji = '🚕', 
  showGradientBorder = true,
  isPulsing = false 
}) => {
  // Size mapping in pixels
  const sizeMap = {
    medium: 96,
    large: 128,
    xlarge: 256
  }

  // Font size mapping for emoji
  const fontSizeMap = {
    medium: '3rem',
    large: '4rem',
    xlarge: '8rem'
  }

  const avatarSize = sizeMap[size] || sizeMap.medium
  const emojiSize = fontSizeMap[size] || fontSizeMap.medium

  // Avatar content (inner circle with emoji)
  const avatarContent = (
    <Box
      sx={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        position: 'relative'
      }}
    >
      <Box
        component="span"
        sx={{
          fontSize: emojiSize,
          lineHeight: 1
        }}
      >
        {emoji}
      </Box>

      {/* Pulse rings when AI is thinking/speaking */}
      {isPulsing && (
        <>
          {[0, 0.5, 1].map((delay, index) => (
            <Box
              key={index}
              sx={{
                ...pulseRingStyle({ 
                  size: '120%', 
                  color: '#F59E0B', 
                  borderWidth: 3 
                }),
                animation: `${pulseRing} 1.5s ease-out infinite`,
                animationDelay: `${delay}s`
              }}
            />
          ))}
        </>
      )}
    </Box>
  )

  // If no gradient border, return just the avatar
  if (!showGradientBorder) {
    return avatarContent
  }

  // With gradient border wrapper (warm taxi colors)
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
        padding: 0.5,
        borderRadius: '50%',
        display: 'inline-flex'
      }}
    >
      {avatarContent}
    </Box>
  )
}

export default JorgeAvatar

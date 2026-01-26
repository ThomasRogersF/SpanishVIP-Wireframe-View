import React from 'react'
import { Box } from '@mui/material'

/**
 * SofiaAvatar Component
 *
 * Reusable avatar component for Sofia (AI tutor) with optional gradient border.
 * Supports multiple sizes for different contexts (hero card, lesson screen, voice mode, etc.).
 *
 * @param {object} props
 * @param {'small' | 'medium' | 'large' | 'xlarge'} props.size - Avatar size (default: 'medium')
 * @param {string} props.emoji - Emoji to display (default: '👩‍🏫')
 * @param {boolean} props.showGradientBorder - Whether to show gradient border (default: true)
 */
const SofiaAvatar = ({ size = 'medium', emoji = '👩‍🏫', showGradientBorder = true }) => {
  // Size mapping in pixels
  const sizeMap = {
    small: 48,
    medium: 96,
    large: 128,
    xlarge: 256
  }

  // Font size mapping for emoji
  const fontSizeMap = {
    small: '1.5rem',
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
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
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
    </Box>
  )

  // If no gradient border, return just the avatar
  if (!showGradientBorder) {
    return avatarContent
  }

  // With gradient border wrapper
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0AA6A6 0%, #3B82F6 100%)',
        padding: 0.5,
        borderRadius: '50%',
        display: 'inline-flex'
      }}
    >
      {avatarContent}
    </Box>
  )
}

export default SofiaAvatar

import React from 'react'
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material'
import useSDKConfig from '../../hooks/useSDKConfig.js'

/**
 * MobileFrame Component
 *
 * A wrapper component that simulates a mobile device viewport (iPhone X dimensions: 375x812px).
 * On desktop, it displays a centered frame with shadow. On mobile devices, it fills the screen.
 * Uses SDK surface color for the desktop background.
 * 
 * Responsive breakpoints:
 * - Mobile: < 600px (full screen with safe area insets)
 * - Tablet: 600-900px (90vw width, max 450px)
 * - Desktop: > 900px (375px fixed in centered frame)
 * - Large tablets: 900-1200px (centered with more padding)
 * 
 * Features:
 * - Landscape mode detection and adjusted heights
 * - Safe area insets for notched devices (iPhone X+)
 * - Dynamic viewport height (100dvh) for mobile browser chrome handling
 * - iOS Safari address bar collapse support
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Screen content to render inside the frame
 */
const MobileFrame = ({ children }) => {
  const theme = useTheme()
  const config = useSDKConfig()
  
  // Breakpoint detection
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')) // 600-900px
  const isLargeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')) // 900-1200px
  
  // Orientation detection
  const isLandscape = useMediaQuery('(orientation: landscape)')
  
  // Detect if device supports dynamic viewport units
  const supportsDvh = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('height', '100dvh')

  // On mobile devices, render full screen without frame
  if (isMobile) {
    return (
      <Box
        sx={{
          width: '100vw',
          // Use dynamic viewport height if supported, fallback to 100vh
          height: supportsDvh ? '100dvh' : '100vh',
          // Fallback for iOS Safari - use min-height with -webkit-fill-available
          minHeight: '-webkit-fill-available',
          overflow: 'auto',
          position: 'relative',
          backgroundColor: '#FFFFFF',
          // Safe area insets for notched devices
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
          // Adjust for landscape on mobile
          ...(isLandscape && {
            // Reduce padding in landscape to maximize content area
            paddingTop: 'max(env(safe-area-inset-top, 0px), 8px)',
            paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)',
          }),
          // Smooth scrolling
          WebkitOverflowScrolling: 'touch',
          // Prevent overscroll bounce
          overscrollBehavior: 'contain',
        }}
      >
        {children}
      </Box>
    )
  }

  // Calculate responsive width and height for different screen sizes
  let frameWidth = 375
  let frameMaxWidth = 375
  let frameHeight = 812
  let containerPadding = 2

  if (isTablet) {
    // Tablet: larger frame for better usability
    frameWidth = '90vw'
    frameMaxWidth = 450 // Increased from 375 for tablets
    frameHeight = '90vh'
  } else if (isLargeTablet) {
    // Large tablet: more padding, same max width
    frameWidth = 450
    frameMaxWidth = 450
    frameHeight = 812
    containerPadding = 4
  }

  // Adjust for landscape on tablets
  if (isLandscape && (isTablet || isLargeTablet)) {
    frameHeight = '85vh'
    frameMaxWidth = 600 // Wider in landscape
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: supportsDvh ? '100dvh' : '100vh',
        backgroundColor: config.surface_color || '#F3F4F6',
        padding: containerPadding,
        // Smooth transition for orientation changes
        transition: 'padding 0.3s ease',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: frameWidth,
          maxWidth: frameMaxWidth,
          height: frameHeight,
          maxHeight: '95vh',
          overflow: 'auto',
          position: 'relative',
          borderRadius: 4,
          backgroundColor: '#FFFFFF',
          // Smooth scrolling
          WebkitOverflowScrolling: 'touch',
          // Prevent overscroll bounce
          overscrollBehavior: 'contain',
          // Smooth transition for size changes
          transition: 'width 0.3s ease, height 0.3s ease, max-width 0.3s ease',
        }}
      >
        {children}
      </Paper>
    </Box>
  )
}

export default MobileFrame

import React from 'react'
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material'

/**
 * MobileFrame Component
 * 
 * A wrapper component that simulates a mobile device viewport (iPhone X dimensions: 375x812px).
 * On desktop, it displays a centered frame with shadow. On mobile devices, it fills the screen.
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Screen content to render inside the frame
 */
const MobileFrame = ({ children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')) // 600-900px

  // On mobile devices, render full screen without frame
  if (isMobile) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          overflow: 'auto',
          position: 'relative',
          backgroundColor: '#FFFFFF'
        }}
      >
        {children}
      </Box>
    )
  }

  // Calculate responsive width for tablets
  const frameWidth = isTablet ? '90vw' : 375
  const frameMaxWidth = 375

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#F3F4F6',
        padding: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: frameWidth,
          maxWidth: frameMaxWidth,
          height: 812,
          maxHeight: '95vh',
          overflow: 'auto',
          position: 'relative',
          borderRadius: 4,
          backgroundColor: '#FFFFFF'
        }}
      >
        {children}
      </Paper>
    </Box>
  )
}

export default MobileFrame

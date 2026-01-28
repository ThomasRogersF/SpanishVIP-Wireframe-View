import React from 'react'
import { BottomNavigation, BottomNavigationAction, Paper, useTheme } from '@mui/material'
import { Home, MenuBook, Mic, Person, Settings } from '@mui/icons-material'
import { navItemStyle } from './sharedStyles'
import { floatingShadow } from './sharedAnimations'

/**
 * BottomNav Component
 *
 * Premium floating dock navigation bar with 5 tabs: Home, Review, Voice, Profile, and Settings.
 * Fixed positioning at the bottom of the screen with elevated shadow and glassmorphism styling.
 * 
 * Touch-optimized with:
 * - Minimum 48x48px touch targets (WCAG AAA)
 * - touch-action: manipulation to prevent double-tap zoom
 * - Active state feedback with scale animation and background pills
 * - Safe area inset support for notched devices
 * - Special glow effect for Voice tab
 * - Floating shadow animation for premium appearance
 *
 * @param {object} props
 * @param {string} props.value - Currently active tab value ('home', 'review', 'voice', 'profile', 'settings')
 * @param {function} props.onChange - Handler called when tab changes (event, newValue) => void
 */
const BottomNav = ({ value = 'home', onChange }) => {
  const theme = useTheme()

  // Base navigation action styles with premium enhancements
  const navActionSx = {
    // Ensure minimum 48x48px touch target (WCAG AAA)
    minWidth: '48px',
    minHeight: '48px',
    py: 1,
    px: 2,
    mx: 0.5,
    // Prevent double-tap zoom on mobile
    touchAction: 'manipulation',
    // Remove iOS tap highlight
    WebkitTapHighlightColor: 'transparent',
    // Smooth transition for all states
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    // Label styling
    '& .MuiBottomNavigationAction-label': {
      fontSize: '0.75rem',
      marginTop: 0.5,
      // Prevent text selection
      WebkitUserSelect: 'none',
      userSelect: 'none',
      transition: 'font-weight 0.2s ease',
    },
    // Icon styling - increased size for better visibility
    '& .MuiSvgIcon-root': {
      fontSize: '1.75rem'
    },
    // Default inactive color using theme token
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadiusPill,
    // Active state with background pill effect
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      backgroundColor: 'rgba(5, 150, 105, 0.12)',
      transform: 'scale(1.05)',
      '& .MuiBottomNavigationAction-label': {
        fontWeight: 600,
      },
    },
    // Active state feedback - scale down slightly on press
    '&:active': {
      transform: 'scale(0.95)',
    },
    // Hover state for desktop/tablet
    '&:hover:not(.Mui-selected)': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    // Focus visible for keyboard accessibility
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '-2px',
      borderRadius: theme.shape.borderRadiusPill,
    },
    // Respect reduced motion preferences
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&.Mui-selected': {
        transform: 'none',
      },
      '&:active': {
        transform: 'none',
      },
    },
    ...navItemStyle
  }

  // Special Voice tab styling with glow effect
  const voiceTabSx = {
    ...navActionSx,
    // Override selected state with enhanced styling
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      backgroundColor: 'rgba(5, 150, 105, 0.12)',
      transform: 'scale(1.08)',
      boxShadow: '0 0 16px rgba(5, 150, 105, 0.4)',
      position: 'relative',
      zIndex: 1,
      '& .MuiBottomNavigationAction-label': {
        fontWeight: 600,
      },
    },
    // Respect reduced motion preferences
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&.Mui-selected': {
        transform: 'none',
        boxShadow: 'none',
      },
      '&:active': {
        transform: 'none',
      },
    },
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        // Floating dock margins
        mx: 2,
        mb: 2,
        // Theme-consistent border
        border: `1px solid ${theme.palette.divider}`,
        zIndex: 1000,
        // Rounded corners for floating dock appearance
        borderRadius: theme.shape.borderRadiusButton,
        // Theme-consistent background
        backgroundColor: theme.palette.background.paper,
        // Elevated shadow for floating effect
        boxShadow: theme.customShadows.elevated,
        // Safe area inset for notched devices (iPhone X+)
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        // Floating animation
        animation: `${floatingShadow} 3s ease-in-out infinite`,
        willChange: 'transform',
        // Respect reduced motion preferences
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
        },
      }}
      elevation={0}
    >
      <BottomNavigation
        value={value}
        onChange={onChange}
        showLabels
        sx={{
          height: 'auto',
          // Adjusted padding for floating dock
          py: 1.5,
          px: 1,
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadiusButton,
          // Ensure ripple effect uses new emerald color
          '& .MuiTouchRipple-root': {
            color: 'rgba(5, 150, 105, 0.25)',
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<Home />}
          sx={navActionSx}
          disableRipple={false}
        />
        <BottomNavigationAction
          label="Review"
          value="review"
          icon={<MenuBook />}
          sx={navActionSx}
          disableRipple={false}
        />
        <BottomNavigationAction
          label="Voice"
          value="voice"
          icon={<Mic />}
          sx={voiceTabSx}
          disableRipple={false}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<Person />}
          sx={navActionSx}
          disableRipple={false}
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<Settings />}
          sx={navActionSx}
          disableRipple={false}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNav

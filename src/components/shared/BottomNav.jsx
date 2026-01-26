import React from 'react'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Home, MenuBook, Mic, Person, Settings } from '@mui/icons-material'
import { navItemStyle } from './sharedStyles'

/**
 * BottomNav Component
 *
 * Bottom navigation bar with 5 tabs: Home, Review, Voice, Profile, and Settings.
 * Fixed positioning at the bottom of the screen with iOS-style active states.
 * 
 * Touch-optimized with:
 * - Minimum 48x48px touch targets (WCAG AAA)
 * - touch-action: manipulation to prevent double-tap zoom
 * - Active state feedback with scale animation
 * - Safe area inset support for notched devices
 *
 * @param {object} props
 * @param {string} props.value - Currently active tab value ('home', 'review', 'voice', 'profile', 'settings')
 * @param {function} props.onChange - Handler called when tab changes (event, newValue) => void
 */
const BottomNav = ({ value = 'home', onChange }) => {
  const navActionSx = {
    // Ensure minimum 48x48px touch target (WCAG AAA)
    minWidth: '48px',
    minHeight: '48px',
    py: 1,
    px: 2,
    // Prevent double-tap zoom on mobile
    touchAction: 'manipulation',
    // Remove iOS tap highlight
    WebkitTapHighlightColor: 'transparent',
    // Smooth transition for all states
    transition: 'transform 0.15s ease, color 0.2s ease',
    '& .MuiBottomNavigationAction-label': {
      fontSize: '0.75rem',
      marginTop: 0.5,
      // Prevent text selection
      WebkitUserSelect: 'none',
      userSelect: 'none',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.5rem'
    },
    color: '#9CA3AF',
    '&.Mui-selected': {
      color: '#0AA6A6'
    },
    // Active state feedback - scale down slightly on press
    '&:active': {
      transform: 'scale(0.95)',
    },
    // Focus visible for keyboard accessibility
    '&:focus-visible': {
      outline: '2px solid #0AA6A6',
      outlineOffset: '-2px',
      borderRadius: '8px',
    },
    ...navItemStyle
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #E5E7EB',
        zIndex: 1000,
        borderRadius: 0,
        // Safe area inset for notched devices (iPhone X+)
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      elevation={0}
    >
      <BottomNavigation
        value={value}
        onChange={onChange}
        showLabels
        sx={{
          height: 'auto',
          // Reduced padding since safe-area is handled by Paper
          pb: 2,
          pt: 1,
          backgroundColor: '#FFFFFF',
          // Ensure ripple effect is visible
          '& .MuiTouchRipple-root': {
            color: 'rgba(10, 166, 166, 0.2)',
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
          sx={navActionSx}
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

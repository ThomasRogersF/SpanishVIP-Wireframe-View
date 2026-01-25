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
 * @param {object} props
 * @param {string} props.value - Currently active tab value ('home', 'review', 'voice', 'profile', 'settings')
 * @param {function} props.onChange - Handler called when tab changes (event, newValue) => void
 */
const BottomNav = ({ value = 'home', onChange }) => {
  const navActionSx = {
    minWidth: 'auto',
    py: 1,
    px: 2,
    '& .MuiBottomNavigationAction-label': {
      fontSize: '0.75rem',
      marginTop: 0.5
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.5rem'
    },
    color: '#9CA3AF',
    '&.Mui-selected': {
      color: '#0AA6A6'
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
        borderRadius: 0
      }}
      elevation={0}
    >
      <BottomNavigation
        value={value}
        onChange={onChange}
        showLabels
        sx={{
          height: 'auto',
          pb: 3,
          pt: 1,
          backgroundColor: '#FFFFFF'
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<Home />}
          sx={navActionSx}
        />
        <BottomNavigationAction
          label="Review"
          value="review"
          icon={<MenuBook />}
          sx={navActionSx}
        />
        <BottomNavigationAction
          label="Voice"
          value="voice"
          icon={<Mic />}
          sx={navActionSx}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<Person />}
          sx={navActionSx}
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<Settings />}
          sx={navActionSx}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNav

import React from 'react'
import { Box, Typography, Chip } from '@mui/material'
import { iosButtonStyle } from './sharedStyles'

/**
 * StatusBar Component
 *
 * Top status bar displaying user progress metrics: streak days and voice energy.
 * Uses MUI Chip components with custom styling for iOS-style active feedback.
 *
 * @param {object} props
 * @param {number} props.streakDays - Number of consecutive days (default: 3)
 * @param {string} props.voiceEnergyMinutes - Voice energy time string (default: '12m')
 */
const StatusBar = ({ streakDays = 3, voiceEnergyMinutes = '12m' }) => {
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
        icon={
          <Box
            component="span"
            sx={{
              fontSize: '1.25rem',
              lineHeight: 1,
              ml: 0.5
            }}
          >
            🔥
          </Box>
        }
        label={
          <Box sx={{ display: 'flex', flexDirection: 'column', py: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                color: '#6B7280',
                lineHeight: 1.2
              }}
            >
              Streak
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: '#1F2937',
                lineHeight: 1.2
              }}
            >
              {streakDays} Days
            </Typography>
          </Box>
        }
        sx={{
          height: 'auto',
          backgroundColor: '#FFF7ED',
          borderRadius: 3,
          px: 0.5,
          py: 0.5,
          cursor: 'pointer',
          '& .MuiChip-icon': {
            marginLeft: 0,
            marginRight: -0.5
          },
          '& .MuiChip-label': {
            paddingLeft: 1,
            paddingRight: 1.5
          },
          ...iosButtonStyle
        }}
      />

      {/* Voice Energy Chip */}
      <Chip
        icon={
          <Box
            component="span"
            sx={{
              fontSize: '1.25rem',
              lineHeight: 1,
              ml: 0.5
            }}
          >
            ⚡
          </Box>
        }
        label={
          <Box sx={{ display: 'flex', flexDirection: 'column', py: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                color: '#6B7280',
                lineHeight: 1.2
              }}
            >
              Voice Energy
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: '#1F2937',
                lineHeight: 1.2
              }}
            >
              {voiceEnergyMinutes}
            </Typography>
          </Box>
        }
        sx={{
          height: 'auto',
          backgroundColor: '#F0FDFA',
          borderRadius: 3,
          px: 0.5,
          py: 0.5,
          cursor: 'pointer',
          '& .MuiChip-icon': {
            marginLeft: 0,
            marginRight: -0.5
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

import React from 'react'
import { Box, Chip, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { slideInUp } from '../shared/sharedAnimations'

/**
 * HintChip Component
 *
 * Floating hint display component that shows contextual hints during voice lessons.
 * Appears with slide-in animation and can be dismissed by the user.
 *
 * @param {object} props
 * @param {string} props.hintText - The hint text to display
 * @param {function} props.onDismiss - Callback function when hint is dismissed
 */
const HintChip = ({ hintText, onDismiss }) => {
  if (!hintText) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '180px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        maxWidth: '320px',
        width: 'calc(100% - 32px)',
        animation: `${slideInUp} 0.4s ease-out`
      }}
    >
      <Box
        sx={{
          backgroundColor: '#FEF3C7',
          border: '2px solid #FCD34D',
          borderRadius: '16px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Light bulb emoji icon */}
        <Box
          component="span"
          sx={{
            fontSize: '20px',
            lineHeight: 1,
            flexShrink: 0
          }}
        >
          💡
        </Box>

        {/* Hint text */}
        <Box
          sx={{
            flex: 1,
            fontSize: '14px',
            fontWeight: 500,
            color: '#78350F',
            lineHeight: 1.4
          }}
        >
          {hintText}
        </Box>

        {/* Close button */}
        <IconButton
          onClick={onDismiss}
          size="small"
          sx={{
            padding: '4px',
            color: '#78350F',
            flexShrink: 0,
            '&:hover': {
              backgroundColor: '#FCD34D'
            }
          }}
          aria-label="Dismiss hint"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default HintChip

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import SchoolIcon from '@mui/icons-material/School' // Replaced emoji with icon for cleaner look
import { keyframes } from '@mui/material/styles'

// Animations
const slideUp = keyframes`
  from { transform: translateY(100px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const slideDown = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100px); opacity: 0; }
`

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
`

/**
 * DraggableFloatingCTA
 * 
 * A completely decoupled floating banner that renders directly into document.body
 * via React Portals. This ensures it sits above ALL other content and
 * is unaffected by parent scroll containers or transforms.
 */
function DraggableFloatingCTA({
  upsellText = "Stuck on a concept?",
  actionText = "Book a Human Tutor ($15)",
  onBookClick
}) {
  // State
  const [isMinimized, setIsMinimized] = useState(() => {
    // Persist state
    try {
      const saved = localStorage.getItem('floatingCTAMinimized')
      return saved ? JSON.parse(saved) : false
    } catch (e) {
      return false
    }
  })
  const [isClosing, setIsClosing] = useState(false)
  const [offsetY, setOffsetY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Refs for drag calculation
  const startY = useRef(0)
  const currentY = useRef(0)
  const dragging = useRef(false)

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('floatingCTAMinimized', JSON.stringify(isMinimized))
  }, [isMinimized])

  // Drag Handlers
  const handleDragStart = (clientY) => {
    dragging.current = true
    setIsDragging(true)
    startY.current = clientY
    currentY.current = clientY
    setOffsetY(0)
  }

  const handleDragMove = (clientY) => {
    if (!dragging.current) return
    currentY.current = clientY
    const delta = Math.max(0, currentY.current - startY.current)
    setOffsetY(delta)
  }

  const handleDragEnd = () => {
    if (!dragging.current) return
    dragging.current = false
    setIsDragging(false)

    // Threshold to dismiss
    if (offsetY > 60) {
      minimize()
    } else {
      // Snap back
      setOffsetY(0)
    }
  }

  // Mouse/Touch Events
  const onTouchStart = (e) => handleDragStart(e.touches[0].clientY)
  const onTouchMove = (e) => handleDragMove(e.touches[0].clientY)
  const onTouchEnd = () => handleDragEnd()

  const onMouseDown = (e) => handleDragStart(e.clientY)

  // Window listeners for mouse drag (since mouse can leave element)
  useEffect(() => {
    const onMouseMove = (e) => handleDragMove(e.clientY)
    const onMouseUp = () => handleDragEnd()

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDragging])

  // Actions
  const minimize = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsMinimized(true)
      setIsClosing(false)
      setOffsetY(0)
    }, 300)
  }

  const restore = () => {
    setIsMinimized(false)
  }

  // Render logic
  if (typeof document === 'undefined') return null

  // 1. Minimized State (Floating Action Button)
  if (isMinimized) {
    return createPortal(
      <Box
        onClick={restore}
        sx={{
          position: 'fixed',
          bottom: 'calc(96px + env(safe-area-inset-bottom))', // Above nav
          right: 20,
          zIndex: 1400, // Very high z-index
          animation: `${slideUp} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
          cursor: 'pointer'
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: '#7C3AED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
            transition: 'transform 0.2s',
            animation: `${pulse} 3s infinite`,
            '&:hover': { transform: 'scale(1.1)' }
          }}
        >
          <SchoolIcon sx={{ color: 'white', fontSize: 28 }} />
        </Box>
      </Box>,
      document.body
    )
  }

  // 2. Expanded State (Banner)
  return createPortal(
    <Box
      sx={{
        position: 'fixed',
        bottom: 'calc(88px + env(safe-area-inset-bottom))', // Above nav + visual spacing
        left: 16,
        right: 16,
        zIndex: 1400,
        pointerEvents: 'none', // Allow clicks through the container area
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Card
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={(e) => e.stopPropagation()}
        sx={{
          pointerEvents: 'auto', // Re-enable clicks on the card
          width: '100%',
          maxWidth: '500px', // Max width for tablets/desktop
          borderRadius: '20px',
          p: 0,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          // Animations & Transitions
          animation: isClosing ? `${slideDown} 0.3s ease-in forwards` : `${slideUp} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
          transform: `translateY(${offsetY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
          touchAction: 'none' // Important for custom drag handling
        }}
      >
        {/* Drag Handle */}
        <Box sx={{ width: '100%', height: 20, display: 'flex', justifyContent: 'center', pt: 1.5 }}>
          <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: '#E5E7EB' }} />
        </Box>

        <Box sx={{ px: 2, pb: 2, pt: 0.5, display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Icon */}
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '14px',
            bgcolor: '#F3E8FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <SchoolIcon sx={{ color: '#7C3AED' }} />
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', mb: 0.5 }}>
              {upsellText}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
              {actionText}
            </Typography>
          </Box>

          {/* Action Button */}
          <Button
            variant="contained"
            onClick={onBookClick}
            sx={{
              bgcolor: '#7C3AED',
              color: 'white',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
              flexShrink: 0,
              '&:hover': { bgcolor: '#6D28D9' }
            }}
          >
            Book
          </Button>
        </Box>
      </Card>

      {/* "Dismiss" hint shows when dragging */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -24,
          opacity: Math.min(offsetY / 40, 1),
          transition: 'opacity 0.1s',
          pointerEvents: 'none'
        }}
      >
        <Typography variant="caption" sx={{ color: 'white', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
          Release to dismiss
        </Typography>
      </Box>
    </Box>,
    document.body
  )
}

export default DraggableFloatingCTA

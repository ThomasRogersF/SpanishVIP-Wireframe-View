/**
 * Shared styles for mobile-optimized components
 * These styles replicate iOS-style button interactions and touch feedback
 */

export const iosButtonStyle = {
  transition: 'all 0.2s ease',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  '&:active': {
    transform: 'scale(0.97)',
    opacity: 0.9
  }
}

export const navItemStyle = {
  transition: 'all 0.15s ease',
  WebkitTapHighlightColor: 'transparent',
  '&:active': {
    transform: 'scale(0.92)'
  }
}

export const touchOptimized = {
  minHeight: 44,
  minWidth: 44,
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent'
}

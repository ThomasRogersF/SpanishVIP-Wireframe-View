/**
 * Shared Styles Module
 * 
 * This module contains centralized style objects for mobile-optimized components.
 * These styles replicate iOS-style button interactions, touch feedback, and
 * common utility patterns used across multiple components.
 * 
 * @module sharedStyles
 */

/**
 * iOS-style Button Style
 * 
 * Provides native iOS-like touch feedback for buttons and interactive elements.
 * Includes scale-down effect on press and tap highlight removal.
 * 
 * @usage
 * ```jsx
 * import { iosButtonStyle } from '../shared/sharedStyles';
 * 
 * <Button sx={{ ...iosButtonStyle }}>
 *   Click Me
 * </Button>
 * ```
 */
export const iosButtonStyle = {
  transition: 'all 0.2s ease',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  '&:active': {
    transform: 'scale(0.97)',
    opacity: 0.9
  }
};

/**
 * Navigation Item Style
 * 
 * Optimized touch feedback for navigation items with smaller scale effect.
 * 
 * @usage
 * ```jsx
 * import { navItemStyle } from '../shared/sharedStyles';
 * 
 * <Box sx={{ ...navItemStyle }}>
 *   <NavIcon />
 * </Box>
 * ```
 */
export const navItemStyle = {
  transition: 'all 0.15s ease',
  WebkitTapHighlightColor: 'transparent',
  '&:active': {
    transform: 'scale(0.92)'
  }
};

/**
 * Touch Optimized Style
 * 
 * Ensures minimum touch target size (44x44) per iOS Human Interface Guidelines.
 * Apply to small interactive elements to improve accessibility.
 * 
 * @usage
 * ```jsx
 * import { touchOptimized } from '../shared/sharedStyles';
 * 
 * <IconButton sx={{ ...touchOptimized }}>
 *   <Icon />
 * </IconButton>
 * ```
 */
export const touchOptimized = {
  minHeight: 44,
  minWidth: 44,
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent'
};

/**
 * Scrollbar Hide Style
 * 
 * Cross-browser solution to hide scrollbars while maintaining scroll functionality.
 * Supports Firefox, Chrome, Safari, and provides iOS momentum scrolling.
 * 
 * @usage
 * ```jsx
 * import { scrollbarHide } from '../shared/sharedStyles';
 * 
 * <Box
 *   sx={{
 *     overflow: 'auto',
 *     ...scrollbarHide,
 *   }}
 * >
 *   {scrollableContent}
 * </Box>
 * ```
 * 
 * @example
 * // Horizontal scroll container
 * <Box
 *   sx={{
 *     display: 'flex',
 *     overflowX: 'auto',
 *     gap: 2,
 *     ...scrollbarHide,
 *   }}
 * >
 *   {items.map(item => <Card key={item.id} />)}
 * </Box>
 * ```
 */
export const scrollbarHide = {
  scrollbarWidth: 'none', // Firefox
  WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
  '&::-webkit-scrollbar': {
    display: 'none' // Chrome, Safari, newer Edge
  }
};

/**
 * Pulse Ring Base Style
 * 
 * Helper function that returns base positioning styles for pulse ring animations.
 * Use with the pulseRing animation from sharedAnimations.js.
 * 
 * @param {Object} options - Configuration options
 * @param {string} [options.size='100%'] - Size of the ring (width and height)
 * @param {string} [options.color='currentColor'] - Border color
 * @param {number} [options.borderWidth=2] - Border width in pixels
 * @returns {Object} Style object for pulse ring positioning
 * 
 * @usage
 * ```jsx
 * import { pulseRingStyle } from '../shared/sharedStyles';
 * import { pulseRing } from '../shared/sharedAnimations';
 * 
 * <Box
 *   sx={{
 *     ...pulseRingStyle({ color: 'primary.main', borderWidth: 3 }),
 *     animation: `${pulseRing} 1.5s ease-out infinite`,
 *   }}
 * />
 * ```
 */
export const pulseRingStyle = ({
  size = '100%',
  color = 'currentColor',
  borderWidth = 2,
  background
} = {}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: size,
  height: size,
  borderRadius: '50%',
  border: `${borderWidth}px solid`,
  borderColor: color,
  ...(background && { background }),
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none'
});

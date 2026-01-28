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
  borderWidth = 2
} = {}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: size,
  height: size,
  borderRadius: '50%',
  border: `${borderWidth}px solid`,
  borderColor: color,
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none'
});

// =============================================================================
// PATTERN & TEXTURE UTILITIES
// =============================================================================

/**
 * Spanish Tile Pattern Generator
 *
 * Creates an SVG-based Spanish tile pattern with grid lines and decorative elements.
 * The pattern includes Moorish-inspired geometric motifs at low opacity for subtle
 * visual interest without interfering with content readability.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.id='spanish-tiles'] - Unique ID for the SVG pattern
 * @param {string} [options.color='white'] - Color for pattern elements
 * @param {number} [options.opacity=0.1] - Overall pattern opacity (0.08-0.12 recommended)
 * @param {number} [options.size=40] - Pattern tile size in pixels
 * @returns {Object} Object containing svgDefs (JSX string) and style object
 *
 * @usage
 * ```jsx
 * import { spanishTilePattern } from '../shared/sharedStyles';
 *
 * const pattern = spanishTilePattern({ id: 'hero-tiles', opacity: 0.1 });
 *
 * // In component:
 * <svg width="0" height="0" style={{ position: 'absolute' }}>
 *   <defs dangerouslySetInnerHTML={{ __html: pattern.svgDefs }} />
 * </svg>
 * <Box sx={pattern.style} />
 * ```
 */
export const spanishTilePattern = ({
  id = 'spanish-tiles',
  color = 'white',
  opacity = 0.1,
  size = 40
} = {}) => {
  // Enhanced Moorish-inspired pattern with quatrefoils and geometric elements
  const svgDefs = `
    <pattern id="${id}" x="0" y="0" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
      <rect width="${size}" height="${size}" fill="none"/>
      <!-- Grid lines -->
      <path d="M${size/2},0 L${size/2},${size} M0,${size/2} L${size},${size/2}"
            stroke="${color}" stroke-width="0.5" opacity="0.3"/>
      <!-- Diagonal accent lines -->
      <path d="M0,0 L${size*0.15},${size*0.15} M${size},0 L${size*0.85},${size*0.15}
               M0,${size} L${size*0.15},${size*0.85} M${size},${size} L${size*0.85},${size*0.85}"
            stroke="${color}" stroke-width="0.5" opacity="0.25"/>
      <!-- Central decorative circle (quatrefoil center) -->
      <circle cx="${size/2}" cy="${size/2}" r="3" fill="${color}" opacity="0.4"/>
      <!-- Corner decorative dots -->
      <circle cx="0" cy="0" r="1.5" fill="${color}" opacity="0.3"/>
      <circle cx="${size}" cy="0" r="1.5" fill="${color}" opacity="0.3"/>
      <circle cx="0" cy="${size}" r="1.5" fill="${color}" opacity="0.3"/>
      <circle cx="${size}" cy="${size}" r="1.5" fill="${color}" opacity="0.3"/>
      <!-- Quatrefoil petals (Moorish motif) -->
      <circle cx="${size/2}" cy="${size*0.35}" r="2" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.35"/>
      <circle cx="${size/2}" cy="${size*0.65}" r="2" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.35"/>
      <circle cx="${size*0.35}" cy="${size/2}" r="2" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.35"/>
      <circle cx="${size*0.65}" cy="${size/2}" r="2" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.35"/>
    </pattern>
  `;
  
  const style = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><rect width='${size}' height='${size}' fill='none'/><path d='M${size/2},0 L${size/2},${size} M0,${size/2} L${size},${size/2}' stroke='${color}' stroke-width='0.5' opacity='0.3'/><path d='M0,0 L${size*0.15},${size*0.15} M${size},0 L${size*0.85},${size*0.15} M0,${size} L${size*0.15},${size*0.85} M${size},${size} L${size*0.85},${size*0.85}' stroke='${color}' stroke-width='0.5' opacity='0.25'/><circle cx='${size/2}' cy='${size/2}' r='3' fill='${color}' opacity='0.4'/><circle cx='0' cy='0' r='1.5' fill='${color}' opacity='0.3'/><circle cx='${size}' cy='0' r='1.5' fill='${color}' opacity='0.3'/><circle cx='0' cy='${size}' r='1.5' fill='${color}' opacity='0.3'/><circle cx='${size}' cy='${size}' r='1.5' fill='${color}' opacity='0.3'/><circle cx='${size/2}' cy='${size*0.35}' r='2' fill='none' stroke='${color}' stroke-width='0.5' opacity='0.35'/><circle cx='${size/2}' cy='${size*0.65}' r='2' fill='none' stroke='${color}' stroke-width='0.5' opacity='0.35'/><circle cx='${size*0.35}' cy='${size/2}' r='2' fill='none' stroke='${color}' stroke-width='0.5' opacity='0.35'/><circle cx='${size*0.65}' cy='${size/2}' r='2' fill='none' stroke='${color}' stroke-width='0.5' opacity='0.35'/></svg>`)}")`,
    opacity,
    pointerEvents: 'none',
    '@media (prefers-reduced-motion: reduce)': {
      // Pattern is static, no changes needed
    },
    '@media (prefers-contrast: more)': {
      opacity: 0 // Hide pattern for high contrast mode
    }
  };
  
  return { svgDefs, style };
};

/**
 * Noise Texture Generator
 *
 * Creates a subtle grain/noise texture using SVG feTurbulence filter.
 * Adds organic texture to flat backgrounds for a more tactile feel.
 *
 * @param {Object} options - Configuration options
 * @param {number} [options.opacity=0.02] - Texture opacity (0.015-0.025 recommended for backgrounds)
 * @param {number} [options.baseFrequency=0.65] - Noise frequency (higher = finer grain)
 * @param {number} [options.numOctaves=4] - Noise complexity
 * @returns {Object} Style object for applying noise texture
 *
 * @usage
 * ```jsx
 * import { noiseTexture } from '../shared/sharedStyles';
 *
 * <Box sx={{
 *   backgroundColor: '#fafaf9',
 *   ...noiseTexture({ opacity: 0.02 })
 * }} />
 * ```
 */
export const noiseTexture = ({
  opacity = 0.02,
  baseFrequency = 0.65,
  numOctaves = 4
} = {}) => {
  // SVG noise filter encoded as data URI
  const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23noise)'/></svg>`;
  
  return {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`,
      backgroundRepeat: 'repeat',
      opacity,
      pointerEvents: 'none',
      zIndex: 0,
      '@media (prefers-contrast: more)': {
        opacity: 0 // Hide texture for high contrast mode
      }
    }
  };
};

/**
 * Radial Gradient Overlay
 *
 * Creates soft ambient lighting effects with radial gradients.
 * Useful for corner vignettes, depth effects, and warm ambiance.
 *
 * @param {Object} options - Configuration options
 * @param {Array} [options.positions] - Array of gradient positions
 *   Each position: { x: '0%', y: '0%', color: 'rgba(0,0,0,0.1)', size: '50%' }
 * @returns {Object} Style object with background gradients
 *
 * @usage
 * ```jsx
 * import { radialGradientOverlay } from '../shared/sharedStyles';
 *
 * // Corner vignette effect
 * <Box sx={radialGradientOverlay({
 *   positions: [
 *     { x: '0%', y: '0%', color: 'rgba(0,0,0,0.03)', size: '60%' },
 *     { x: '100%', y: '100%', color: 'rgba(0,0,0,0.03)', size: '60%' }
 *   ]
 * })} />
 * ```
 */
export const radialGradientOverlay = ({
  positions = [
    { x: '0%', y: '0%', color: 'rgba(0,0,0,0.02)', size: '50%' },
    { x: '100%', y: '0%', color: 'rgba(0,0,0,0.02)', size: '50%' },
    { x: '100%', y: '100%', color: 'rgba(0,0,0,0.02)', size: '50%' },
    { x: '0%', y: '100%', color: 'rgba(0,0,0,0.02)', size: '50%' }
  ]
} = {}) => {
  const gradients = positions.map(pos =>
    `radial-gradient(circle at ${pos.x} ${pos.y}, ${pos.color} 0%, transparent ${pos.size})`
  ).join(', ');
  
  return {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: gradients,
      pointerEvents: 'none',
      zIndex: 1,
      '@media (prefers-contrast: more)': {
        backgroundImage: 'none' // Remove overlay for high contrast mode
      }
    }
  };
};

/**
 * Dot Grid Pattern
 *
 * Creates a minimal geometric dot pattern for subtle texture.
 * Lighter alternative to Spanish tiles, works well on card backgrounds.
 *
 * @param {Object} options - Configuration options
 * @param {number} [options.spacing=20] - Distance between dots in pixels
 * @param {number} [options.dotSize=1] - Radius of each dot in pixels
 * @param {string} [options.color='rgba(0,0,0,0.1)'] - Dot color
 * @param {number} [options.opacity=0.03] - Overall pattern opacity
 * @returns {Object} Style object for dot grid background
 *
 * @usage
 * ```jsx
 * import { dotGridPattern } from '../shared/sharedStyles';
 *
 * <Box sx={{
 *   backgroundColor: '#fff',
 *   ...dotGridPattern({ spacing: 16, opacity: 0.04 })
 * }} />
 * ```
 */
export const dotGridPattern = ({
  spacing = 20,
  dotSize = 1,
  color = 'rgba(0,0,0,0.3)',
  opacity = 0.03
} = {}) => {
  // Create dot pattern using CSS radial gradients for performance
  return {
    backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
    backgroundSize: `${spacing}px ${spacing}px`,
    backgroundPosition: '0 0',
    opacity,
    '@media (prefers-contrast: more)': {
      backgroundImage: 'none' // Remove pattern for high contrast mode
    }
  };
};

/**
 * Apply Pattern Helper
 *
 * Combines a pattern/texture with a base background color or gradient.
 * Handles layering, z-index, and accessibility considerations.
 *
 * @param {Object} options - Configuration options
 * @param {'noise'|'dots'|'radialOverlay'} options.patternType - Type of pattern to apply
 * @param {Object} [options.patternOptions] - Options passed to the pattern generator
 * @param {string} [options.baseBackground='#fafaf9'] - Base background color or gradient
 * @returns {Object} Complete style object combining base and pattern
 *
 * @usage
 * ```jsx
 * import { applyPattern } from '../shared/sharedStyles';
 *
 * <Box sx={applyPattern({
 *   patternType: 'noise',
 *   patternOptions: { opacity: 0.02 },
 *   baseBackground: '#fafaf9'
 * })} />
 * ```
 */
export const applyPattern = ({
  patternType,
  patternOptions = {},
  baseBackground = '#fafaf9'
} = {}) => {
  const baseStyle = {
    backgroundColor: baseBackground,
    position: 'relative'
  };
  
  switch (patternType) {
    case 'noise':
      return {
        ...baseStyle,
        ...noiseTexture(patternOptions)
      };
    
    case 'dots':
      return {
        ...baseStyle,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          ...dotGridPattern(patternOptions),
          pointerEvents: 'none',
          zIndex: 0
        }
      };
    
    case 'radialOverlay':
      return {
        ...baseStyle,
        ...radialGradientOverlay(patternOptions)
      };
    
    default:
      return baseStyle;
  }
};

/**
 * Combined Background with Noise and Vignette
 *
 * Creates a sophisticated textured background combining noise grain
 * with a subtle corner vignette effect. Ideal for main screen backgrounds.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.baseColor='#fafaf9'] - Base background color
 * @param {number} [options.noiseOpacity=0.02] - Noise texture opacity
 * @param {number} [options.vignetteOpacity=0.02] - Corner vignette opacity
 * @returns {Object} Complete style object for textured background
 *
 * @usage
 * ```jsx
 * import { texturedBackground } from '../shared/sharedStyles';
 *
 * <Box sx={texturedBackground({
 *   baseColor: '#fafaf9',
 *   noiseOpacity: 0.02,
 *   vignetteOpacity: 0.015
 * })} />
 * ```
 */
export const texturedBackground = ({
  baseColor = '#fafaf9',
  noiseOpacity = 0.02,
  vignetteOpacity = 0.02
} = {}) => {
  const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23noise)'/></svg>`;
  
  const vignetteGradients = [
    `radial-gradient(circle at 0% 0%, rgba(0,0,0,${vignetteOpacity}) 0%, transparent 50%)`,
    `radial-gradient(circle at 100% 0%, rgba(0,0,0,${vignetteOpacity}) 0%, transparent 50%)`,
    `radial-gradient(circle at 100% 100%, rgba(0,0,0,${vignetteOpacity}) 0%, transparent 50%)`,
    `radial-gradient(circle at 0% 100%, rgba(0,0,0,${vignetteOpacity}) 0%, transparent 50%)`
  ].join(', ');
  
  return {
    backgroundColor: baseColor,
    position: 'relative',
    // Noise texture layer
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`,
      backgroundRepeat: 'repeat',
      opacity: noiseOpacity,
      pointerEvents: 'none',
      zIndex: 0,
      '@media (prefers-contrast: more)': {
        opacity: 0
      }
    },
    // Vignette overlay layer
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: vignetteGradients,
      pointerEvents: 'none',
      zIndex: 1,
      '@media (prefers-contrast: more)': {
        backgroundImage: 'none'
      }
    }
  };
};

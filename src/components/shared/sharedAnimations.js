import { keyframes } from '@mui/system';

/**
 * Shared Keyframe Animations
 * 
 * This module contains centralized keyframe animations used across multiple components.
 * All animations use MUI's `keyframes` from @mui/system for consistency.
 * 
 * @module sharedAnimations
 */

/**
 * Pulse Ring Animation
 * 
 * Creates an expanding ring effect with fading opacity, commonly used for
 * microphone buttons and audio indicators to show active/recording states.
 * 
 * @description
 * - Scales from 1 to 1.4 while fading from 0.6 to 0 opacity
 * - Uses translate(-50%, -50%) for center positioning when used with
 *   position: absolute and top/left: 50%
 * 
 * @usage
 * ```jsx
 * import { pulseRing } from '../shared/sharedAnimations';
 * 
 * const PulseRingElement = styled(Box)({
 *   animation: `${pulseRing} 1.5s ease-out infinite`,
 *   // For staggered rings, add animationDelay
 * });
 * ```
 * 
 * @example
 * // Multiple staggered rings
 * {[0, 1, 2].map((i) => (
 *   <Box
 *     key={i}
 *     sx={{
 *       animation: `${pulseRing} 1.5s ease-out infinite`,
 *       animationDelay: `${i * 0.4}s`,
 *     }}
 *   />
 * ))}
 */
export const pulseRing = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.4);
    opacity: 0;
  }
`;

/**
 * Shake Animation
 * 
 * Creates a horizontal shake effect, commonly used to indicate
 * incorrect answers or validation errors.
 * 
 * @description
 * - Shakes horizontally with translateX values: 0 → -10px → 10px → 0
 * - Duration typically 0.5s for subtle feedback
 * 
 * @usage
 * ```jsx
 * import { shake } from '../shared/sharedAnimations';
 * 
 * // Apply conditionally when showing error state
 * <Box
 *   sx={{
 *     animation: isWrong ? `${shake} 0.5s ease` : 'none',
 *   }}
 * >
 *   {content}
 * </Box>
 * ```
 * 
 * @example
 * // With state management
 * const [isShaking, setIsShaking] = useState(false);
 * 
 * const handleWrongAnswer = () => {
 *   setIsShaking(true);
 *   setTimeout(() => setIsShaking(false), 500);
 * };
 */
export const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
`;

/**
 * Slide In Up Animation
 *
 * Creates a smooth upward slide-in effect with fade, commonly used for
 * content appearing during scroll or on page load.
 *
 * @description
 * - Slides up from 20px below while fading in
 * - Duration typically 0.4s for smooth entrance
 * - Works well with staggered delays for sequential animations
 *
 * @usage
 * ```jsx
 * import { slideInUp } from '../shared/sharedAnimations';
 *
 * <Box
 *   sx={{
 *     animation: `${slideInUp} 0.4s ease-out`,
 *   }}
 * >
 *   {content}
 * </Box>
 * ```
 *
 * @example
 * // With staggered delay for list items
 * {items.map((item, index) => (
 *   <Box
 *     key={item.id}
 *     sx={{
 *       animation: `${slideInUp} 0.4s ease-out ${index * 0.1}s both`,
 *     }}
 *   >
 *     {item.content}
 *   </Box>
 * ))}
 */
export const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * Shimmer Animation
 *
 * Creates a shimmering gradient effect for skeleton loading states.
 *
 * @description
 * - Moves background position from -200% to 200%
 * - Used with linear-gradient backgrounds for shimmer effect
 * - Duration typically 1.5s for smooth loading animation
 *
 * @usage
 * ```jsx
 * import { shimmer } from '../shared/sharedAnimations';
 *
 * <Box
 *   sx={{
 *     background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
 *     backgroundSize: '200% 100%',
 *     animation: `${shimmer} 1.5s infinite`,
 *   }}
 * >
 *   {skeletonContent}
 * </Box>
 * ```
 *
 * @example
 * // Combined with MUI Skeleton component
 * <Skeleton
 *   variant="rectangular"
 *   sx={{
 *     background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
 *     backgroundSize: '200% 100%',
 *     animation: `${shimmer} 1.5s infinite`,
 *   }}
 * />
 */
export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

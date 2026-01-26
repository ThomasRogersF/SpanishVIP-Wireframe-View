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

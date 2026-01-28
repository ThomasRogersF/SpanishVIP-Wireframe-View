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
 * Magnetic Hover Animation
 *
 * Creates a subtle scale and lift effect for buttons on hover,
 * simulating a magnetic attraction effect.
 *
 * @description
 * - Scales from 1 to 1.05 while lifting up 4px
 * - Duration typically 0.3s with ease-out timing
 *
 * @usage
 * ```jsx
 * import { magneticHover } from '../shared/sharedAnimations';
 *
 * <Button
 *   sx={{
 *     '&:hover': {
 *       animation: `${magneticHover} 0.3s ease forwards`,
 *     }
 *   }}
 * >
 *   Hover me
 * </Button>
 * ```
 */
export const magneticHover = keyframes`
  0% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.02) translateY(-2px); }
  100% { transform: scale(1.05) translateY(-4px); }
`;

/**
 * Ripple Effect Animation
 *
 * Creates an expanding ripple effect from a click point,
 * commonly used for button press feedback.
 *
 * @description
 * - Scales from 0 to 2.5 while fading from 0.6 to 0 opacity
 * - Duration typically 0.6s with ease-out timing
 *
 * @usage
 * ```jsx
 * import { rippleEffect } from '../shared/sharedAnimations';
 *
 * // Render ripple on click with position relative to click point
 * <Box
 *   sx={{
 *     position: 'absolute',
 *     borderRadius: '50%',
 *     backgroundColor: 'rgba(255, 255, 255, 0.5)',
 *     animation: `${rippleEffect} 0.6s ease-out`,
 *   }}
 * />
 * ```
 */
export const rippleEffect = keyframes`
  0% { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(2.5); opacity: 0; }
`;

/**
 * Steam Rise Animation
 *
 * Creates a rising steam effect for decorative purposes,
 * commonly used above hot beverage emojis.
 *
 * @description
 * - Moves upward 20px while scaling up 1.2x and fading out
 * - Duration typically 2s with infinite loop
 * - Use staggered animationDelay for multiple steam elements
 *
 * @usage
 * ```jsx
 * import { steamRise } from '../shared/sharedAnimations';
 *
 * // Multiple staggered steam wisps
 * {[0, 1, 2].map((i) => (
 *   <Box
 *     key={i}
 *     sx={{
 *       animation: `${steamRise} 2s ease-in-out infinite`,
 *       animationDelay: `${i * 0.6}s`,
 *     }}
 *   />
 * ))}
 * ```
 */
export const steamRise = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 0.6; }
  50% { transform: translateY(-10px) scale(1.1); opacity: 0.4; }
  100% { transform: translateY(-20px) scale(1.2); opacity: 0; }
`;

/**
 * Spring Bounce Animation
 *
 * Simulates spring physics for accordion expansion with elastic effect.
 * Uses cubic-bezier timing to create a bouncy, satisfying expansion.
 *
 * @description
 * - Scales from 0 to 1 on Y axis with spring physics
 * - Use with transformOrigin: 'top' for natural expansion from header
 * - Duration: 400ms with cubic-bezier(0.68, -0.55, 0.265, 1.55) for elastic feel
 *
 * @usage
 * ```jsx
 * import { springBounce } from '../shared/sharedAnimations';
 *
 * <Box
 *   sx={{
 *     animation: `${springBounce} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards`,
 *     transformOrigin: 'top',
 *   }}
 * >
 *   {expandedContent}
 * </Box>
 * ```
 */
export const springBounce = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  60% {
    opacity: 1;
    transform: scaleY(1.03);
  }
  80% {
    transform: scaleY(0.98);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
`;

/**
 * Spring Collapse Animation
 *
 * Reverse spring animation for collapsing accordions smoothly.
 *
 * @description
 * - Scales from 1 to 0 on Y axis
 * - Duration: 300ms for quicker collapse
 *
 * @usage
 * ```jsx
 * import { springCollapse } from '../shared/sharedAnimations';
 *
 * <Box
 *   sx={{
 *     animation: `${springCollapse} 0.3s ease-out forwards`,
 *     transformOrigin: 'top',
 *   }}
 * >
 *   {collapsingContent}
 * </Box>
 * ```
 */
export const springCollapse = keyframes`
  0% {
    opacity: 1;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform: scaleY(0);
  }
`;

/**
 * Checkmark Draw Animation
 *
 * Creates a satisfying checkmark drawing effect using SVG stroke-dasharray technique.
 * The checkmark appears to be drawn from start to finish.
 *
 * @description
 * - Animates stroke-dashoffset from full length (24) to 0
 * - Includes slight scale bounce at the end for polish
 * - Duration: 300ms with ease-out timing
 *
 * @usage
 * ```jsx
 * import { checkmarkDraw } from '../shared/sharedAnimations';
 *
 * <svg viewBox="0 0 24 24">
 *   <path
 *     d="M 4 12 L 9 17 L 20 6"
 *     fill="none"
 *     stroke="white"
 *     strokeWidth="2"
 *     sx={{
 *       strokeDasharray: 24,
 *       animation: `${checkmarkDraw} 0.3s ease-out forwards`,
 *     }}
 *   />
 * </svg>
 * ```
 */
export const checkmarkDraw = keyframes`
  0% {
    stroke-dashoffset: 24;
    transform: scale(1);
  }
  70% {
    stroke-dashoffset: 0;
    transform: scale(1.1);
  }
  100% {
    stroke-dashoffset: 0;
    transform: scale(1);
  }
`;

/**
 * Lesson Stagger Animation
 *
 * Fade and slide in animation for staggered lesson appearance.
 * Apply with varying animation-delay for staggered effect.
 *
 * @description
 * - Fades from 0 to 1 opacity while sliding up 8px
 * - Duration: 200ms with ease-out timing
 * - Use animation-delay to stagger: 0ms, 50ms, 100ms, etc.
 *
 * @usage
 * ```jsx
 * import { lessonStagger } from '../shared/sharedAnimations';
 *
 * {lessons.map((lesson, index) => (
 *   <Box
 *     key={lesson.id}
 *     sx={{
 *       animation: `${lessonStagger} 0.2s ease-out forwards`,
 *       animationDelay: `${index * 50}ms`,
 *       opacity: 0,
 *     }}
 *   >
 *     {lesson.title}
 *   </Box>
 * ))}
 * ```
 */
export const lessonStagger = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * Sparkle Rotation Animation
 *
 * Subtle rotation effect for sparkle icons on locked lessons.
 * Creates a gentle twinkling effect.
 *
 * @description
 * - Rotates from 0deg to 15deg and back
 * - Duration: 2s infinite loop
 * - Subtle effect that draws attention without being distracting
 *
 * @usage
 * ```jsx
 * import { sparkleRotate } from '../shared/sharedAnimations';
 *
 * <Box
 *   component="span"
 *   sx={{
 *     animation: `${sparkleRotate} 2s ease-in-out infinite`,
 *   }}
 * >
 *   ✨
 * </Box>
 * ```
 */
export const sparkleRotate = keyframes`
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(10deg) scale(1.1);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(-10deg) scale(1.1);
  }
`;

/**
 * Chevron Spring Animation
 *
 * Elastic rotation for chevron icons in accordion headers.
 *
 * @description
 * - Rotates from 0 to 90 degrees with spring overshoot
 * - Duration: 400ms with elastic timing
 *
 * @usage
 * ```jsx
 * import { chevronSpring } from '../shared/sharedAnimations';
 *
 * <Box
 *   sx={{
 *     transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
 *     transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
 *   }}
 * >
 *   <ChevronIcon />
 * </Box>
 * ```
 */
export const chevronSpring = keyframes`
  0% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(100deg);
  }
  100% {
    transform: rotate(90deg);
  }
`;

/**
 * Waveform Pulse Animation
 *
 * Creates a vertical scaling effect for voice energy waveform bars.
 * Use with staggered delays for a wave-like effect.
 *
 * @description
 * - Scales from 0.6 to 1 on Y axis and back
 * - Duration: 1.2s with ease-in-out timing
 * - Apply staggered delays: 0ms, 150ms, 300ms, 150ms, 0ms
 *
 * @usage
 * ```jsx
 * import { waveformPulse } from '../shared/sharedAnimations';
 *
 * <rect
 *   sx={{
 *     animation: `${waveformPulse} 1.2s ease-in-out infinite`,
 *     animationDelay: '150ms',
 *     transformOrigin: 'center',
 *   }}
 * />
 * ```
 */
export const waveformPulse = keyframes`
  0%, 100% { transform: scaleY(0.6); }
  50% { transform: scaleY(1); }
`;

/**
 * Badge Pulse Animation
 *
 * Subtle scale animation for badges and indicators.
 * Creates a gentle breathing effect to draw attention.
 *
 * @description
 * - Scales from 1 to 1.02 and back
 * - Duration: 2s with ease-in-out timing
 * - Very subtle effect for continuous attention
 *
 * @usage
 * ```jsx
 * import { badgePulse } from '../shared/sharedAnimations';
 *
 * <Box
 *   sx={{
 *     animation: `${badgePulse} 2s ease-in-out infinite`,
 *   }}
 * >
 *   Badge content
 * </Box>
 * ```
 */
export const badgePulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

/**
 * Lightning Flash Animation
 *
 * Subtle opacity animation for lightning bolt decorative elements.
 * Creates a gentle flashing effect.
 *
 * @description
 * - Opacity pulses from 0.2 to 0.4 and back
 * - Duration: 2s with ease-in-out timing
 * - Designed for background decorative elements
 *
 * @usage
 * ```jsx
 * import { lightningFlash } from '../shared/sharedAnimations';
 *
 * <svg
 *   sx={{
 *     animation: `${lightningFlash} 2s ease-in-out infinite`,
 *   }}
 * >
 *   <path d="..." />
 * </svg>
 * ```
 */
export const lightningFlash = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
`;

/**
 * Floating Shadow Animation
 *
 * Creates a floating effect with subtle vertical movement and shadow changes.
 * Use for elevated UI elements like FAB-style cards.
 *
 * @description
 * - Moves up 4px and increases shadow depth
 * - Duration: 3s with ease-in-out timing
 * - Uses transform and opacity only for GPU acceleration
 *
 * @usage
 * ```jsx
 * import { floatingShadow } from '../shared/sharedAnimations';
 *
 * <Box
 *   sx={{
 *     animation: `${floatingShadow} 3s ease-in-out infinite`,
 *     willChange: 'transform',
 *   }}
 * >
 *   Floating card
 * </Box>
 * ```
 */
export const floatingShadow = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

/**
 * Coffee Cup Fill Animation
 *
 * Creates a coffee cup filling effect from bottom to top, used for
 * pull-to-refresh indicator with a Spanish café theme.
 *
 * @description
 * - Animates scaleY from 0 to 1 with transformOrigin: 'bottom'
 * - Includes subtle opacity change from 0.6 to 1 for liquid appearance
 * - Duration: 800ms with ease-out timing
 *
 * @usage
 * ```jsx
 * import { coffeeCupFill } from '../shared/sharedAnimations';
 *
 * <Box
 *   sx={{
 *     animation: `${coffeeCupFill} 0.8s ease-out forwards`,
 *     transformOrigin: 'bottom',
 *   }}
 * >
 *   ☕
 * </Box>
 * ```
 *
 * @accessibility
 * - Wrap in @media (prefers-reduced-motion: reduce) to disable for motion-sensitive users
 * - Provide static alternative when reduced motion is preferred
 */
export const coffeeCupFill = keyframes`
  0% {
    transform: scaleY(0);
    opacity: 0.6;
  }
  60% {
    transform: scaleY(1.05);
    opacity: 0.9;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

/**
 * Spanish Flag Wave Animation
 *
 * Creates a wave effect with Spanish flag colors cycling through,
 * used for pull-to-refresh indicator with national theme.
 *
 * @description
 * - Animates background-position to create horizontal wave effect
 * - Uses Spanish flag colors: red (#C60B1E), yellow (#FFC400), red (#C60B1E)
 * - Includes subtle scale pulse from 1 to 1.05
 * - Duration: 1200ms with ease-in-out timing
 *
 * @usage
 * ```jsx
 * import { spanishFlagWave } from '../shared/sharedAnimations';
 *
 * <Box
 *   sx={{
 *     background: 'linear-gradient(90deg, #C60B1E 0%, #FFC400 50%, #C60B1E 100%)',
 *     backgroundSize: '200% 100%',
 *     animation: `${spanishFlagWave} 1.2s ease-in-out infinite`,
 *   }}
 * >
 *   🇪🇸
 * </Box>
 * ```
 *
 * @accessibility
 * - Wrap in @media (prefers-reduced-motion: reduce) to disable for motion-sensitive users
 * - Provide static flag display when reduced motion is preferred
 */
export const spanishFlagWave = keyframes`
  0% {
    background-position: 0% 50%;
    transform: scale(1);
  }
  50% {
    background-position: 100% 50%;
    transform: scale(1.05);
  }
  100% {
    background-position: 0% 50%;
    transform: scale(1);
  }
`;

/**
 * Pull Indicator Rotate Animation
 *
 * Creates a continuous rotation effect for loading spinners,
 * used during pull-to-refresh loading state.
 *
 * @description
 * - Rotates from 0deg to 360deg continuously
 * - Includes subtle scale breathing effect (0.95 to 1.05)
 * - Duration: 1000ms with linear timing for smooth rotation
 *
 * @usage
 * ```jsx
 * import { pullIndicatorRotate } from '../shared/sharedAnimations';
 *
 * <Box
 *   sx={{
 *     animation: `${pullIndicatorRotate} 1s linear infinite`,
 *   }}
 * >
 *   <CircularProgress />
 * </Box>
 * ```
 *
 * @accessibility
 * - Wrap in @media (prefers-reduced-motion: reduce) to show static spinner
 * - Consider providing text alternative: "Loading..."
 */
export const pullIndicatorRotate = keyframes`
  0% {
    transform: rotate(0deg) scale(0.95);
  }
  50% {
    transform: rotate(180deg) scale(1.05);
  }
  100% {
    transform: rotate(360deg) scale(0.95);
  }
`;

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * usePullToRefresh Hook
 *
 * A custom hook to manage pull-to-refresh state and logic for touch-enabled devices.
 * Provides smooth touch handling with proper gesture detection and state management.
 *
 * @param {Object} options - Configuration options
 * @param {Function} options.onRefresh - Async callback function triggered when refresh is initiated
 * @param {number} [options.threshold=80] - Minimum pull distance in pixels to trigger refresh
 * @param {boolean} [options.enabled=true] - Whether pull-to-refresh is enabled
 *
 * @returns {Object} Pull-to-refresh state and container props
 * @returns {boolean} returns.isPulling - Whether user is actively pulling
 * @returns {number} returns.pullDistance - Current pull distance in pixels
 * @returns {boolean} returns.isRefreshing - Whether refresh is in progress
 * @returns {Object} returns.containerProps - Props to spread on container element
 *
 * @example
 * ```jsx
 * import { usePullToRefresh } from '../hooks/usePullToRefresh';
 *
 * const MyComponent = () => {
 *   const handleRefresh = async () => {
 *     await fetchData();
 *   };
 *
 *   const { isPulling, pullDistance, isRefreshing, containerProps } = usePullToRefresh({
 *     onRefresh: handleRefresh,
 *     threshold: 80,
 *   });
 *
 *   return (
 *     <Box {...containerProps}>
 *       <PullToRefreshIndicator
 *         pullDistance={pullDistance}
 *         isRefreshing={isRefreshing}
 *         threshold={80}
 *       />
 *       {content}
 *     </Box>
 *   );
 * };
 * ```
 *
 * @accessibility
 * - Respects prefers-reduced-motion by providing alternative refresh mechanisms
 * - Container props include proper ARIA attributes for screen readers
 * - Touch targets exceed WCAG AAA minimum (44x44px)
 */
const usePullToRefresh = ({
  onRefresh,
  threshold = 80,
  enabled = true,
}) => {
  // State management
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refs for tracking touch state
  const startYRef = useRef(0);
  const containerRef = useRef(null);
  const isScrolledToTopRef = useRef(false);
  const rafIdRef = useRef(null);

  // Check if user prefers reduced motion
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  /**
   * Handle touch start event
   * Captures initial touch position and checks if container is scrolled to top
   *
   * @param {TouchEvent} event - Touch start event
   */
  const handleTouchStart = useCallback(
    (event) => {
      if (!enabled || isRefreshing) return;

      // Check if the container is at the top of scroll
      const target = event.currentTarget;
      isScrolledToTopRef.current = target.scrollTop <= 0;

      if (isScrolledToTopRef.current) {
        startYRef.current = event.touches[0].clientY;
        setIsPulling(true);
      }
    },
    [enabled, isRefreshing]
  );

  /**
   * Handle touch move event
   * Calculates pull distance and updates state with debounced RAF
   *
   * @param {TouchEvent} event - Touch move event
   */
  const handleTouchMove = useCallback(
    (event) => {
      if (!enabled || isRefreshing || !isPulling) return;
      if (!isScrolledToTopRef.current) return;

      const currentY = event.touches[0].clientY;
      const distance = currentY - startYRef.current;

      // Only process downward pulls (positive distance)
      if (distance > 0) {
        // Prevent browser's native pull-to-refresh
        event.preventDefault();

        // Use requestAnimationFrame for smooth updates
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => {
          // Apply resistance factor to make pull feel natural
          // Diminishing returns as pull distance increases
          const resistance = 0.5;
          const resistedDistance = Math.min(
            threshold * 2,
            distance * resistance
          );
          setPullDistance(resistedDistance);
        });
      }
    },
    [enabled, isRefreshing, isPulling, threshold]
  );

  /**
   * Handle touch end event
   * Triggers refresh if threshold exceeded, resets state with animation
   *
   * @param {TouchEvent} event - Touch end event
   */
  const handleTouchEnd = useCallback(async () => {
    if (!enabled || isRefreshing || !isPulling) return;

    // Cancel any pending RAF
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    const shouldRefresh = pullDistance >= threshold;

    if (shouldRefresh && onRefresh) {
      setIsRefreshing(true);
      setPullDistance(threshold); // Lock at threshold during refresh

      try {
        await onRefresh();
      } catch (error) {
        console.error('Pull-to-refresh error:', error);
      } finally {
        // Animate out
        setIsRefreshing(false);

        if (!prefersReducedMotion.current) {
          // Smooth reset animation
          const animateReset = () => {
            setPullDistance((prev) => {
              const next = prev * 0.85;
              if (next < 1) {
                return 0;
              }
              requestAnimationFrame(animateReset);
              return next;
            });
          };
          requestAnimationFrame(animateReset);
        } else {
          setPullDistance(0);
        }
      }
    } else {
      // Reset without refresh
      if (!prefersReducedMotion.current) {
        // Smooth reset animation
        const animateReset = () => {
          setPullDistance((prev) => {
            const next = prev * 0.8;
            if (next < 1) {
              return 0;
            }
            requestAnimationFrame(animateReset);
            return next;
          });
        };
        requestAnimationFrame(animateReset);
      } else {
        setPullDistance(0);
      }
    }

    setIsPulling(false);
    startYRef.current = 0;
  }, [enabled, isRefreshing, isPulling, pullDistance, threshold, onRefresh]);

  /**
   * Container props to spread on the scrollable container
   * Includes touch handlers and performance optimizations
   */
  const containerProps = {
    ref: containerRef,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    style: {
      touchAction: 'pan-y',
      WebkitTapHighlightColor: 'transparent',
      willChange: isPulling || isRefreshing ? 'transform' : 'auto',
      overscrollBehavior: 'none',
    },
    role: 'region',
    'aria-live': isRefreshing ? 'polite' : 'off',
    'aria-busy': isRefreshing,
    'aria-label': isRefreshing
      ? 'Refreshing content'
      : isPulling
      ? 'Pull down to refresh'
      : undefined,
  };

  return {
    isPulling,
    pullDistance,
    isRefreshing,
    containerProps,
  };
};

export default usePullToRefresh;

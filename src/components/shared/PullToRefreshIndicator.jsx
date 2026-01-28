import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, CircularProgress } from '@mui/material';
import {
  coffeeCupFill,
  spanishFlagWave,
  pullIndicatorRotate,
  steamRise,
} from './sharedAnimations';

/**
 * PullToRefreshIndicator Component
 *
 * A visual indicator component that displays during pull-to-refresh interactions.
 * Supports two themed variants: coffee cup (Spanish café theme) and Spanish flag.
 *
 * @param {Object} props - Component props
 * @param {number} props.pullDistance - Current pull distance in pixels
 * @param {boolean} props.isRefreshing - Whether refresh is in progress
 * @param {number} [props.threshold=80] - Pull distance threshold for refresh trigger
 * @param {'coffee' | 'flag'} [props.variant='coffee'] - Visual theme variant
 *
 * @example
 * ```jsx
 * <PullToRefreshIndicator
 *   pullDistance={pullDistance}
 *   isRefreshing={isRefreshing}
 *   threshold={80}
 *   variant="coffee"
 * />
 * ```
 *
 * @accessibility
 * - Uses role="status" and aria-live="polite" for screen reader announcements
 * - Respects prefers-reduced-motion by showing static indicators
 * - Announces refresh state changes to assistive technologies
 */
const PullToRefreshIndicator = ({
  pullDistance,
  isRefreshing,
  threshold = 80,
  variant = 'coffee',
}) => {
  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  // Calculate progress percentage (0-1)
  const progress = Math.min(pullDistance / threshold, 1);

  // Determine visibility - show when pulling or refreshing
  const isVisible = pullDistance > 0 || isRefreshing;

  // Announce to screen readers when refreshing starts/ends
  const announceRef = useRef(null);
  useEffect(() => {
    if (announceRef.current) {
      announceRef.current.textContent = isRefreshing
        ? 'Refreshing content, please wait'
        : pullDistance >= threshold
        ? 'Release to refresh'
        : pullDistance > 0
        ? 'Pull down to refresh'
        : '';
    }
  }, [isRefreshing, pullDistance, threshold]);

  if (!isVisible) {
    return (
      <Box
        ref={announceRef}
        role="status"
        aria-live="polite"
        sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }}
      />
    );
  }

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-busy={isRefreshing}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        transform: `translateY(${Math.min(pullDistance, threshold * 1.5) - threshold}px)`,
        opacity: Math.min(progress * 1.5, 1),
        transition: prefersReducedMotion.current
          ? 'none'
          : isRefreshing
          ? 'transform 0.3s ease-out'
          : 'none',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
        height: threshold,
        pt: 2,
      }}
    >
      {/* Screen reader announcement */}
      <Box
        ref={announceRef}
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
        }}
      />

      {variant === 'coffee' ? (
        <CoffeeVariant
          progress={progress}
          isRefreshing={isRefreshing}
          threshold={threshold}
          prefersReducedMotion={prefersReducedMotion.current}
        />
      ) : (
        <FlagVariant
          progress={progress}
          isRefreshing={isRefreshing}
          prefersReducedMotion={prefersReducedMotion.current}
        />
      )}

      {/* Loading text */}
      {isRefreshing && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            mt: 1,
            opacity: prefersReducedMotion.current ? 1 : 0,
            animation: prefersReducedMotion.current
              ? 'none'
              : 'fadeIn 0.3s ease-out forwards',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          Refreshing...
        </Typography>
      )}

      {/* Pull instruction text (when not refreshing) */}
      {!isRefreshing && progress > 0.3 && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            mt: 1,
            opacity: Math.min((progress - 0.3) * 2, 1),
          }}
        >
          {progress >= 1 ? 'Release to refresh' : 'Pull to refresh'}
        </Typography>
      )}
    </Box>
  );
};

/**
 * Coffee Cup Variant
 * Displays a coffee cup with filling animation and steam wisps
 */
const CoffeeVariant = ({ progress, isRefreshing, threshold, prefersReducedMotion }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Steam wisps */}
      {!prefersReducedMotion && (isRefreshing || progress >= 1) && (
        <Box
          sx={{
            position: 'absolute',
            top: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 0.5,
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 4,
                height: 12,
                borderRadius: 2,
                backgroundColor: 'grey.400',
                opacity: 0.6,
                animation: `${steamRise} 2s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </Box>
      )}

      {/* Coffee cup emoji with container */}
      <Box
        sx={{
          fontSize: 36,
          position: 'relative',
          transform: isRefreshing
            ? 'scale(1.1)'
            : `scale(${0.8 + progress * 0.2})`,
          transition: prefersReducedMotion ? 'none' : 'transform 0.2s ease-out',
        }}
      >
        ☕
      </Box>

      {/* Progress bar (coffee filling) */}
      <Box
        sx={{
          width: 48,
          height: 6,
          borderRadius: 3,
          backgroundColor: 'grey.200',
          overflow: 'hidden',
          mt: 1,
        }}
      >
        <Box
          sx={{
            width: `${progress * 100}%`,
            height: '100%',
            borderRadius: 3,
            background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
            transformOrigin: 'left',
            animation: isRefreshing && !prefersReducedMotion
              ? `${coffeeCupFill} 0.8s ease-out forwards`
              : 'none',
            transition: prefersReducedMotion ? 'none' : 'width 0.1s ease-out',
          }}
        />
      </Box>

      {/* Loading spinner overlay */}
      {isRefreshing && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: prefersReducedMotion
              ? 'none'
              : `${pullIndicatorRotate} 1s linear infinite`,
          }}
        >
          <CircularProgress
            size={24}
            thickness={4}
            sx={{
              color: 'primary.main',
            }}
          />
        </Box>
      )}
    </Box>
  );
};

CoffeeVariant.propTypes = {
  progress: PropTypes.number.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  threshold: PropTypes.number.isRequired,
  prefersReducedMotion: PropTypes.bool,
};

/**
 * Spanish Flag Variant
 * Displays Spanish flag colors with wave animation
 */
const FlagVariant = ({ progress, isRefreshing, prefersReducedMotion }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Spanish flag emoji with wave effect */}
      <Box
        sx={{
          fontSize: 36,
          position: 'relative',
          transform: isRefreshing
            ? 'scale(1.05)'
            : `scale(${0.8 + progress * 0.2})`,
          transition: prefersReducedMotion ? 'none' : 'transform 0.2s ease-out',
        }}
      >
        🇪🇸
      </Box>

      {/* Flag color stripe indicator */}
      <Box
        sx={{
          width: 64,
          height: 8,
          borderRadius: 4,
          overflow: 'hidden',
          mt: 1,
          display: 'flex',
        }}
      >
        {/* Red stripe */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#C60B1E',
            opacity: progress > 0.33 ? 1 : 0.3,
            transition: prefersReducedMotion ? 'none' : 'opacity 0.15s ease-out',
          }}
        />
        {/* Yellow stripe (wider) */}
        <Box
          sx={{
            flex: 2,
            backgroundColor: '#FFC400',
            opacity: progress > 0.66 ? 1 : 0.3,
            transition: prefersReducedMotion ? 'none' : 'opacity 0.15s ease-out',
          }}
        />
        {/* Red stripe */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#C60B1E',
            opacity: progress >= 1 ? 1 : 0.3,
            transition: prefersReducedMotion ? 'none' : 'opacity 0.15s ease-out',
          }}
        />
      </Box>

      {/* Wave animation background when refreshing */}
      {isRefreshing && !prefersReducedMotion && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 48,
            height: 48,
            borderRadius: '50%',
            background:
              'linear-gradient(90deg, #C60B1E 0%, #FFC400 50%, #C60B1E 100%)',
            backgroundSize: '200% 100%',
            animation: `${spanishFlagWave} 1.2s ease-in-out infinite`,
            opacity: 0.3,
            zIndex: -1,
          }}
        />
      )}

      {/* Loading spinner overlay */}
      {isRefreshing && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: prefersReducedMotion
              ? 'none'
              : `${pullIndicatorRotate} 1s linear infinite`,
          }}
        >
          <CircularProgress
            size={24}
            thickness={4}
            sx={{
              color: '#C60B1E', // Spanish red
            }}
          />
        </Box>
      )}
    </Box>
  );
};

FlagVariant.propTypes = {
  progress: PropTypes.number.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  prefersReducedMotion: PropTypes.bool,
};

PullToRefreshIndicator.propTypes = {
  /** Current pull distance in pixels */
  pullDistance: PropTypes.number.isRequired,
  /** Whether refresh is in progress */
  isRefreshing: PropTypes.bool.isRequired,
  /** Pull distance threshold for refresh trigger */
  threshold: PropTypes.number,
  /** Visual theme variant */
  variant: PropTypes.oneOf(['coffee', 'flag']),
};

export default PullToRefreshIndicator;

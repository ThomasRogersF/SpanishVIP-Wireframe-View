import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';
import { keyframes } from '@mui/system';

/**
 * @fileoverview OnboardingTooltip Component - First-Time User Onboarding
 *
 * This module provides a lightweight onboarding overlay for first-time users.
 * Uses localStorage to track whether the user has seen the onboarding.
 *
 * Features:
 * - Semi-transparent overlay with spotlight effect
 * - Animated hand gesture icon pointing to TopicCard
 * - "Got it" button to dismiss
 * - Auto-dismiss after 5 seconds if no interaction
 * - Keyboard accessible with proper ARIA labels
 *
 * @param {boolean} show - Whether to show the tooltip
 * @param {Function} onDismiss - Callback when tooltip is dismissed
 */

// Pulse animation for the hand gesture
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

// Fade in animation for the tooltip
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ONBOARDING_STORAGE_KEY = 'vocab_shelves_onboarding_seen';

/**
 * OnboardingTooltip Component
 * Displays a one-time onboarding tooltip for first-time users.
 */
const OnboardingTooltip = ({ show, onDismiss }) => {
    const autoDismissTimerRef = useRef(null);

    // Set up auto-dismiss timer when tooltip is shown
    useEffect(() => {
        if (show) {
            autoDismissTimerRef.current = setTimeout(() => {
                onDismiss();
            }, 5000); // Auto-dismiss after 5 seconds
        }

        // Clean up timer on unmount or when tooltip is hidden
        return () => {
            if (autoDismissTimerRef.current) {
                clearTimeout(autoDismissTimerRef.current);
            }
        };
    }, [show, onDismiss]);

    // Handle dismiss action
    const handleDismiss = () => {
        // Mark as seen in localStorage
        localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
        onDismiss();
    };

    // Handle keyboard dismiss (Escape key)
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleDismiss();
        }
    };

    if (!show) return null;

    return (
        <Fade in={show} timeout={300}>
            <Box
                role="dialog"
                aria-label="Onboarding tooltip"
                aria-modal="true"
                onKeyDown={handleKeyDown}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1000,
                    pointerEvents: 'none', // Allow clicks to pass through to content
                }}
            >
                {/* Semi-transparent overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        pointerEvents: 'auto',
                    }}
                />

                {/* Tooltip Content */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '180px', // Position near first CategoryShelf
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#FFFFFF',
                        borderRadius: 3,
                        p: 3,
                        boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
                        maxWidth: 280,
                        pointerEvents: 'auto',
                        animation: `${fadeIn} 0.4s ease-out`,
                    }}
                >
                    {/* Animated Hand Gesture */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 2,
                            animation: `${pulse} 1.5s ease-in-out infinite`,
                        }}
                    >
                        <Typography variant="h3" sx={{ fontSize: '3rem' }}>
                            👆
                        </Typography>
                    </Box>

                    {/* Tooltip Text */}
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 600,
                            textAlign: 'center',
                            mb: 2,
                            color: 'text.primary',
                            lineHeight: 1.4,
                        }}
                    >
                        Tap any topic to start learning vocabulary!
                    </Typography>

                    {/* Got It Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleDismiss}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1,
                        }}
                    >
                        Got it
                    </Button>
                </Box>
            </Box>
        </Fade>
    );
};

/**
 * Hook to check if onboarding has been seen
 * @returns {boolean} Whether the onboarding has been seen
 */
export const useOnboardingSeen = () => {
    const [seen, setSeen] = useState(true);

    useEffect(() => {
        const hasSeen = localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
        setSeen(hasSeen);
    }, []);

    return seen;
};

export default OnboardingTooltip;
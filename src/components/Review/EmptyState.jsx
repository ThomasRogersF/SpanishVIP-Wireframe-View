import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { keyframes } from '@mui/system';

/**
 * @fileoverview EmptyState Component - Reusable Empty State Display
 *
 * This module provides a reusable empty state component for displaying
 * when no content is available. Features centered layout, engaging visuals,
 * and optional action buttons.
 *
 * @param {string} icon - Emoji or icon to display (e.g., "📚")
 * @param {string} title - Bold title text
 * @param {string} description - Secondary description text
 * @param {ReactNode} actionButton - Optional action button component
 */

// Fade in animation for smooth appearance
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * EmptyState Component
 * Displays a centered empty state with icon, title, description, and optional action button.
 */
const EmptyState = ({ icon = '📚', title, description, actionButton }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 3,
                animation: `${fadeIn} 0.4s ease-out`,
            }}
        >
            {/* Large Icon/Emoji */}
            <Typography
                variant="h3"
                sx={{
                    fontSize: '4rem',
                    mb: 2,
                    lineHeight: 1,
                }}
            >
                {icon}
            </Typography>

            {/* Bold Title */}
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 700,
                    mb: 1,
                    textAlign: 'center',
                    color: 'text.primary',
                }}
            >
                {title}
            </Typography>

            {/* Secondary Description */}
            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{
                    maxWidth: 300,
                    lineHeight: 1.5,
                    mb: actionButton ? 3 : 0,
                }}
            >
                {description}
            </Typography>

            {/* Optional Action Button */}
            {actionButton && (
                <Box>
                    {actionButton}
                </Box>
            )}
        </Box>
    );
};

export default EmptyState;
import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { iosButtonStyle } from '../shared/sharedStyles';

/**
 * @fileoverview TopicCard Component - Vocabulary Shelves System
 *
 * MIGRATION NOTES (January 2026):
 * This component is part of the new topic-based vocabulary learning system that
 * replaced the legacy Review components. It works in conjunction with CategoryShelf.jsx
 * to create the Netflix-style swimlane UI.
 *
 * Key Changes:
 * - Old: VocabCard.jsx displayed individual vocabulary items in a table format
 * - Old: MistakeCard.jsx displayed user mistakes separately
 * - New: TopicCard displays clickable topic cards (120x120px) with emoji, title, and progress
 * - New: Integrated into CategoryShelf swimlanes for better UX
 *
 * The old VocabCard.jsx and MistakeCard.jsx components are no longer used anywhere
 * in the codebase. See MIGRATION.md for complete details on the refactoring.
 */

/**
 * TopicCard Component (formerly VocabularyCard)
 * Represents a drill topic (e.g. "Food 1").
 * Click navigates to the Drill Intro.
 */
const TopicCard = ({ title, icon, level, onClick, progress, totalWords, size = 120 }) => {
    // Keyboard event handler for accessibility
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick();
        }
    };

    // Calculate proportional sizing based on size prop
    const emojiSize = Math.round(size * 0.5);
    const titleFontSize = Math.max(0.7, size * 0.007);
    const titleBlockHeight = Math.round(size * 0.22); // Reserve space for title below card
    const cardBoxSize = size - titleBlockHeight; // Card height reduced to fit within total size

    return (
        <Box
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label={`Learn ${title} vocabulary. ${totalWords || 'multiple'} words. ${level ? `Level: ${level}` : ''}`}
            tabIndex={0}
            aria-pressed={progress !== undefined ? 'false' : undefined}
            sx={{
                width: size,
                height: size,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                flexShrink: 0,
                touchAction: 'manipulation',
                ...iosButtonStyle,
                transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
                '&:active': {
                    transform: 'scale(0.95)',
                },
                '&:focus-visible': {
                    outline: 'none',
                    boxShadow: '0 0 0 3px rgba(10, 166, 166, 0.3)',
                },
            }}
        >
            <Card
                sx={{
                    width: size,
                    height: cardBoxSize,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: 2,
                    position: 'relative',
                    overflow: 'visible',
                    backgroundColor: '#FFFFFF',
                    '&:hover': {
                        boxShadow: 4,
                    },
                }}
            >
                {/* Emoji/Icon */}
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: `${emojiSize}px`,
                        lineHeight: 1,
                    }}
                >
                    {icon}
                </Typography>

                {/* Progress Badge - Bottom Left (Optional) */}
                {progress !== undefined && totalWords !== undefined && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            left: 8,
                            backgroundColor: 'primary.main',
                            opacity: 0.9,
                            color: '#FFFFFF',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '12px',
                            boxShadow: 1,
                        }}
                    >
                        {progress}/{totalWords}
                    </Box>
                )}
            </Card>

            {/* Title */}
            <Typography
                variant="subtitle2"
                sx={{
                    height: titleBlockHeight,
                    fontWeight: 700,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    fontSize: `${titleFontSize}rem`,
                    color: 'text.primary',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};

export default TopicCard;

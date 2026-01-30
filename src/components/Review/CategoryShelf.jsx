import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Chip, useMediaQuery, useTheme } from '@mui/material';
import TopicCard from './TopicCard';
import { slideInUp } from '../shared/sharedAnimations';

/**
 * @fileoverview CategoryShelf Component - Vocabulary Shelves System
 *
 * MIGRATION NOTES (January 2026):
 * This component replaced the legacy VocabCard.jsx component as part of the
 * Vocabulary Shelves refactoring. The architectural shift moved from individual
 * vocabulary cards displayed in tables to category-based swimlanes (Netflix-style).
 *
 * Key Changes:
 * - Old: VocabCard displayed individual vocabulary items in a table format
 * - New: CategoryShelf displays categories with horizontal topic lists
 * - Old: MistakeCard displayed user mistakes separately
 * - New: Integrated progress tracking within TopicCard components
 *
 * This component works in conjunction with TopicCard.jsx to create the new
 * vocabulary learning flow. See MIGRATION.md for complete details.
 */

/**
 * Helper function to get level badge colors based on level label
 */
const getLevelBadgeColor = (levelLabel) => {
    const level = levelLabel?.toLowerCase() || '';
    if (level.includes('a1') || level.includes('beginner')) {
        return { bg: '#DCFCE7', text: '#16A34A' };
    }
    if (level.includes('a2') || level.includes('elementary')) {
        return { bg: '#DBEAFE', text: '#2563EB' };
    }
    if (level.includes('b2') || level.includes('upper-intermediate')) {
        return { bg: '#FCE7F3', text: '#BE185D' };
    }
    if (level.includes('b1') || level === 'intermediate') {
        return { bg: '#FFEDD5', text: '#EA580C' };
    }
    return { bg: '#F3F4F6', text: '#6B7280' };
};

/**
 * CategoryShelf Component
 * A "Swimlane" that displays a category title, level badge, description,
 * word count, and a horizontally scrollable list of Topics with fade-edge indicators.
 */
const CategoryShelf = ({ title, levelLabel, description, items, onTopicClick, index }) => {
    const [scrollPosition, setScrollPosition] = useState({ atStart: true, atEnd: false });
    const scrollContainerRef = useRef(null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down(360));

    // Calculate total word count across all topics
    const totalWords = (items ?? [])
        .map((item) => item.words?.length || 0)
        .reduce((a, b) => a + b, 0);

    // Check if items array is empty
    const hasItems = items && items.length > 0;

    // Determine card size based on screen size
    const cardSize = isSmallScreen ? 100 : 120;

    // Initialize scroll position on mount to hide fade overlay when not scrollable
    useEffect(() => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
            const atStart = scrollLeft === 0;
            const atEnd = scrollLeft + clientWidth >= scrollWidth - 5; // 5px threshold
            setScrollPosition({ atStart, atEnd });
        }
    }, [items]);

    // Get level badge colors
    const badgeColors = getLevelBadgeColor(levelLabel);

    // Handle scroll events to update fade edge visibility
    const handleScroll = (e) => {
        const { scrollLeft, clientWidth, scrollWidth } = e.target;
        const atStart = scrollLeft === 0;
        const atEnd = scrollLeft + clientWidth >= scrollWidth - 5; // 5px threshold
        setScrollPosition({ atStart, atEnd });
    };

    // Handle keyboard navigation for scroll container
    const handleKeyDown = (e) => {
        const container = e.currentTarget;
        const scrollAmount = 200;
        if (e.key === 'ArrowRight') {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    // Entrance animation delay based on index for staggered effect
    const animationDelay = index !== undefined ? `${index * 0.1}s` : '0s';

    return (
        <Box
            role="region"
            aria-labelledby={`category-title-${title.replace(/\s+/g, '-')}`}
            sx={{
                mb: 5,
                bgcolor: '#FFFFFF',
                borderRadius: 3,
                boxShadow: '0px 1px 3px rgba(0,0,0,0.05)',
                '&:hover': { boxShadow: 2 },
                transition: 'box-shadow 0.2s ease-in-out',
                animation: `${slideInUp} 0.4s ease-out ${animationDelay} both`,
            }}
        >
            {/* Header Section */}
            <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    {/* Left Column: Title, Description, Word Count */}
                    <Box sx={{ flex: 1, pr: 2 }}>
                        <Typography
                            id={`category-title-${title.replace(/\s+/g, '-')}`}
                            variant="h6"
                            sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 0.5 }}
                        >
                            {title}
                        </Typography>
                        {description && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: '0.875rem', lineHeight: 1.4, mb: 0.5 }}
                            >
                                {description}
                            </Typography>
                        )}
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                        >
                            {totalWords} words to learn
                        </Typography>
                    </Box>

                    {/* Right Column: Level Badge */}
                    <Box sx={{ flexShrink: 0 }}>
                        <Chip
                            label={levelLabel}
                            size="small"
                            sx={{
                                backgroundColor: badgeColors.bg,
                                color: badgeColors.text,
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                borderRadius: '12px',
                                px: 0.5,
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Horizontal ScrollView (Swimlane) with Fade Edges */}
            <Box sx={{ position: 'relative' }}>
                {/* Left Fade Gradient */}
                {!scrollPosition.atStart && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: 40,
                            background: 'linear-gradient(to right, #FFFFFF 0%, transparent 100%)',
                            zIndex: 1,
                            pointerEvents: 'none',
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                )}

                {/* Right Fade Gradient */}
                {!scrollPosition.atEnd && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            height: '100%',
                            width: 40,
                            background: 'linear-gradient(to left, #FFFFFF 0%, transparent 100%)',
                            zIndex: 1,
                            pointerEvents: 'none',
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                )}

                {/* Horizontal Scroll Container */}
                <Box
                    ref={scrollContainerRef}
                    role="region"
                    aria-label={`${title} vocabulary topics. Use arrow keys to scroll horizontally.`}
                    aria-live="polite"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    onScroll={handleScroll}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        px: 2.5,
                        gap: { xs: 1.5, sm: 2 },
                        pb: 2,
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch',
                        scrollSnapType: 'x mandatory',
                        '& > *': { scrollSnapAlign: 'start' },
                        // Hide scrollbar for cleaner look
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        msOverflowStyle: 'none', // IE and Edge
                        scrollbarWidth: 'none', // Firefox
                    }}
                >
                    {hasItems ? (
                        items.map((item) => (
                            <TopicCard
                                key={item.id}
                                title={item.title}
                                icon={item.icon}
                                level={item.level}
                                totalWords={item.words?.length || 0}
                                onClick={() => onTopicClick(item)}
                                size={cardSize}
                            />
                        ))
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                py: 4,
                                px: 2,
                                width: '100%',
                                minHeight: 120,
                            }}
                        >
                            <Typography variant="h4" sx={{ mb: 1 }}>
                                📚
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                align="center"
                            >
                                No topics available yet
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CategoryShelf;

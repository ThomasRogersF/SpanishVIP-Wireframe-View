import React from 'react';
import { Box, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';

/**
 * @fileoverview SkeletonComponents - Loading States for Vocabulary Shelves
 *
 * This module provides reusable skeleton components that mimic the appearance
 * of CategoryShelf and TopicCard components during loading states.
 *
 * Components:
 * - TopicCardSkeleton: Mimics TopicCard with circular emoji and rectangular title
 * - CategoryShelfSkeleton: Mimics CategoryShelf with header and horizontal topic cards
 */

/**
 * TopicCardSkeleton Component
 * Mimics the TopicCard appearance with animated shimmer effect.
 * Dimensions: 120x120px (matching TopicCard), or 100x100px on small screens.
 *
 * @param {number} size - Optional size prop for responsive card sizing (default: 120)
 */
const TopicCardSkeleton = ({ size = 120 }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down(360));
    const cardSize = isSmallScreen ? 100 : size;
    const emojiSize = Math.round(cardSize * 0.5);
    const titleWidth = Math.round(cardSize * 0.67);
    const titleWidth2 = Math.round(cardSize * 0.5);

    return (
        <Box
            sx={{
                width: cardSize,
                height: cardSize,
                flexShrink: 0,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 4,
                    boxShadow: 2,
                    backgroundColor: '#FFFFFF',
                }}
            >
                {/* Play Icon Placeholder - Top Right */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    }}
                />

                {/* Circular Skeleton for Emoji */}
                <Skeleton
                    variant="circular"
                    width={emojiSize}
                    height={emojiSize}
                    sx={{ mb: 1 }}
                    animation="wave"
                />

                {/* Rectangular Skeleton for Title (2 lines) */}
                <Skeleton
                    variant="rectangular"
                    width={titleWidth}
                    height={14}
                    sx={{ borderRadius: 1 }}
                    animation="wave"
                />
                <Skeleton
                    variant="rectangular"
                    width={titleWidth2}
                    height={14}
                    sx={{ borderRadius: 1, mt: 0.5 }}
                    animation="wave"
                />
            </Box>
        </Box>
    );
};

/**
 * CategoryShelfSkeleton Component
 * Mimics the CategoryShelf layout with animated shimmer effect.
 * Includes header section with skeleton title, description, and badge,
 * plus a horizontal row of 4-5 TopicCardSkeleton components.
 */
const CategoryShelfSkeleton = () => {
    return (
        <Box
            sx={{
                mb: 5,
                bgcolor: '#FFFFFF',
                borderRadius: 3,
                boxShadow: '0px 1px 3px rgba(0,0,0,0.05)',
            }}
        >
            {/* Header Section */}
            <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    {/* Left Column: Title, Description, Word Count */}
                    <Box sx={{ flex: 1, pr: 2 }}>
                        {/* Skeleton Title */}
                        <Skeleton
                            variant="rectangular"
                            width={180}
                            height={24}
                            sx={{ borderRadius: 1, mb: 1 }}
                            animation="wave"
                        />
                        {/* Skeleton Description */}
                        <Skeleton
                            variant="rectangular"
                            width={240}
                            height={16}
                            sx={{ borderRadius: 1, mb: 0.5 }}
                            animation="wave"
                        />
                        {/* Skeleton Word Count */}
                        <Skeleton
                            variant="rectangular"
                            width={100}
                            height={14}
                            sx={{ borderRadius: 1 }}
                            animation="wave"
                        />
                    </Box>

                    {/* Right Column: Level Badge */}
                    <Box sx={{ flexShrink: 0 }}>
                        <Skeleton
                            variant="rectangular"
                            width={60}
                            height={24}
                            sx={{ borderRadius: '12px' }}
                            animation="wave"
                        />
                    </Box>
                </Box>
            </Box>

            {/* Horizontal ScrollView with Skeleton Cards */}
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    px: 2.5,
                    gap: { xs: 1.5, sm: 2 },
                    pb: 2,
                    // Hide scrollbar for cleaner look
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {/* Render 4-5 TopicCardSkeleton components */}
                {[1, 2, 3, 4, 5].map((index) => (
                    <TopicCardSkeleton key={index} />
                ))}
            </Box>
        </Box>
    );
};

export { TopicCardSkeleton, CategoryShelfSkeleton };
export default CategoryShelfSkeleton;
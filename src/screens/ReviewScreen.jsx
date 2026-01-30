import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigation } from '../hooks/useNavigation.js';
import CategoryShelf from '../components/Review/CategoryShelf';
import { CategoryShelfSkeleton } from '../components/Review/SkeletonComponents';
import EmptyState from '../components/Review/EmptyState';
import OnboardingTooltip, { useOnboardingSeen } from '../components/Review/OnboardingTooltip';
import { fetchVocabularyShelves } from '../data/vocabularyShelves';
import { keyframes } from '@mui/system';

// Fade in animation for smooth content transitions
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

/**
 * ReviewScreen (Vocabulary Shelves)
 * A Netflix-style discovery screen for vocabulary.
 * Features nested lists: Vertical Categories -> Horizontal Items.
 * Includes scroll position preservation for seamless navigation.
 */
const ReviewScreen = () => {
  const { showDashboard, showVocabDrillIntro, reviewScrollPosition, setReviewScrollPosition } = useNavigation();

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if onboarding has been seen
  const onboardingSeen = useOnboardingSeen();

  // Show onboarding tooltip for first-time users
  useEffect(() => {
    if (!onboardingSeen && initialLoadComplete && categories.length > 0) {
      setShowOnboarding(true);
    }
  }, [onboardingSeen, initialLoadComplete, categories.length]);

  // Ref for the scrollable container
  const scrollContainerRef = useRef(null);

  // Find the parent scrollable container (AppLayout's Box)
  useEffect(() => {
    const findScrollContainer = (element) => {
      let parent = element?.parentElement;
      while (parent) {
        const overflow = window.getComputedStyle(parent).overflow;
        if (overflow === 'auto' || overflow === 'scroll') {
          return parent;
        }
        parent = parent.parentElement;
      }
      return null;
    };
    
    // Set the scroll container ref after component mounts
    if (scrollContainerRef.current) {
      const scrollContainer = findScrollContainer(scrollContainerRef.current);
      if (scrollContainer) {
        scrollContainerRef.current = scrollContainer;
      }
    }
  }, []);

  // Restore scroll position on mount
  useEffect(() => {
    if (scrollContainerRef.current && reviewScrollPosition > 0) {
      scrollContainerRef.current.scrollTop = reviewScrollPosition;
    }
  }, [reviewScrollPosition]);

  // Handle scroll events to save position
  const handleScroll = useCallback((e) => {
    setReviewScrollPosition(e.target.scrollTop);
  }, [setReviewScrollPosition]);

  // Attach scroll event listener to parent scroll container
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const handleTopicClick = (topic) => {
    console.log("Navigating to drill for topic:", topic.title);
    showVocabDrillIntro(topic);
  };

  // Ref for intersection observer
  const observer = useRef();

  // Last element ref callback for infinite scrolling
  const lastCategoryElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Data fetching
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchVocabularyShelves(page);
        setCategories(prev => {
          // Avoid duplicates if strict mode causes double render
          const newCats = data.categories.filter(alertCat =>
            !prev.find(p => p.id === alertCat.id)
          );
          return [...prev, ...newCats];
        });
        setHasMore(page < data.total_pages);
        
        // Announce new categories loaded for screen readers
        if (page > 1 && data.categories.length > 0) {
          const announcement = `Loaded ${data.categories.length} more vocabulary shelves`;
          // Use a live region for screen reader announcements
          const liveRegion = document.getElementById('sr-announcements');
          if (liveRegion) {
            liveRegion.textContent = announcement;
          }
        }
      } catch (error) {
        console.error("Failed to load vocabulary shelves", error);
      } finally {
        setLoading(false);
        if (page === 1) {
          setInitialLoadComplete(true);
        }
      }
    };

    loadData();
  }, [page]);

  const handleOnboardingDismiss = () => {
    setShowOnboarding(false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F8F9FA', position: 'relative' }}>
      {/* Header Section */}
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'background.paper',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
        }}
      >
        <IconButton
          onClick={showDashboard}
          sx={{
            color: 'text.primary',
            ml: -1,
          }}
          aria-label="Back to dashboard"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Vocabulary Shelves
        </Typography>
      </Box>

      {/* Main Content (Vertical Scroll) */}
      <Box
        ref={scrollContainerRef}
        role="main"
        aria-label="Vocabulary shelves, scroll to explore categories"
        sx={{
          flex: 1,
          pt: 3,
          pb: { xs: 12, sm: 10 }, // Padding for bottom nav/safe area
        }}
      >
        {/* Screen reader announcements region */}
        <Box
          id="sr-announcements"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        />
        {/* Show skeleton loaders during initial load */}
        {page === 1 && loading && !initialLoadComplete && (
          <Box sx={{ animation: `${fadeIn} 0.3s ease-out` }}>
            {[1, 2, 3].map((index) => (
              <CategoryShelfSkeleton key={index} />
            ))}
          </Box>
        )}

        {/* Show categories after initial load */}
        {categories.map((category, index) => {
          if (categories.length === index + 1) {
            return (
              <Box ref={lastCategoryElementRef} key={category.id}>
                <CategoryShelf
                  title={category.title}
                  levelLabel={category.level_label}
                  description={category.description}
                  items={category.items}
                  onTopicClick={handleTopicClick}
                  index={index}
                />
              </Box>
            );
          } else {
            return (
              <CategoryShelf
                key={category.id}
                title={category.title}
                levelLabel={category.level_label}
                description={category.description}
                items={category.items}
                onTopicClick={handleTopicClick}
                index={index}
              />
            );
          }
        })}

        {/* Show skeleton loaders for pagination loading (subsequent pages) */}
        {loading && initialLoadComplete && (
          <Box
            sx={{ p: 3 }}
            role="status"
            aria-live="polite"
            aria-label="Loading more vocabulary shelves"
          >
            {[1, 2].map((index) => (
              <CategoryShelfSkeleton key={index} />
            ))}
          </Box>
        )}

        {/* Empty state when no categories exist */}
        {initialLoadComplete && categories.length === 0 && !loading && !hasMore && (
          <EmptyState
            icon="📚"
            title="No vocabulary shelves yet"
            description="Check back soon for new content!"
          />
        )}

        {/* End of shelves message */}
        {!hasMore && !loading && categories.length > 0 && (
          <Box
            sx={{
              py: 4,
              px: 3,
              textAlign: 'center',
            }}
            role="status"
            aria-live="polite"
          >
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
              🎉
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              You've reached the end of the shelves!
            </Typography>
            <Typography
              variant="caption"
              color="text.disabled"
            >
              Check back soon for more vocabulary to learn
            </Typography>
          </Box>
        )}
      </Box>

      {/* Onboarding Tooltip */}
      <OnboardingTooltip
        show={showOnboarding}
        onDismiss={handleOnboardingDismiss}
      />
    </Box>
  );
};

export default ReviewScreen;


import { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import ConceptCard from './ConceptCard.jsx'
import RuleCard from './RuleCard.jsx'
import { iosButtonStyle, touchOptimized } from '../shared/sharedStyles'

/**
 * GrammarGuidebook - A swipeable carousel for grammar concepts and rules
 * 
 * @param {Object} props
 * @param {Object} props.data - Grammar guide configuration with `title` and `cards` array
 * @param {Function} props.onComplete - Callback when user completes viewing all cards
 * @param {Function} props.onClose - Callback when user clicks close button
 */
const GrammarGuidebook = ({ data, onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const cards = data?.cards || []
  const totalCards = cards.length

  /**
   * Audio placeholder function - logs to console for now
   */
  const playAudio = useCallback((url) => {
    console.log(`[Audio Placeholder] Playing: ${url}`)
    // TODO: Implement actual audio playback
    // Example: new Audio(url).play()
  }, [])

  /**
   * Handle touch start - store initial X coordinate
   */
  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.touches[0].clientX)
    setTouchEnd(e.touches[0].clientX)
    setIsDragging(true)
  }, [])

  /**
   * Handle touch move - update end coordinate for drag feedback
   */
  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.touches[0].clientX)
  }, [])

  /**
   * Handle touch end - determine swipe direction and update index
   */
  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchStart - touchEnd
    const swipeThreshold = 50

    // Swipe left - go to next card
    if (swipeDistance > swipeThreshold && currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
    // Swipe right - go to previous card
    else if (swipeDistance < -swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }

    setIsDragging(false)
    setTouchStart(0)
    setTouchEnd(0)
  }, [touchStart, touchEnd, currentIndex, totalCards])

  /**
   * Calculate drag offset for live feedback during swipe
   */
  const getDragOffset = () => {
    if (!isDragging) return 0
    return touchEnd - touchStart
  }

  const isLastCard = currentIndex === totalCards - 1

  // Handle empty cards array
  if (totalCards === 0) {
    return (
      <Box
        sx={{
          height: '100%',
          bgcolor: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Typography color="#6B7280">No content available</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header with close button and progress */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="Close grammar guide"
          sx={{
            ...touchOptimized,
            color: '#64748B',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="body2"
          aria-live="polite"
          sx={{
            color: '#64748B',
            fontWeight: '600',
          }}
        >
          {currentIndex + 1} of {totalCards}
        </Typography>
      </Box>

      {/* Card carousel container */}
      <Box
        role="region"
        aria-label="Grammar guide carousel"
        sx={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          touchAction: 'pan-y',
        }}
      >
        {/* Cards wrapper with transform */}
        <Box
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{
            display: 'flex',
            transform: `translateX(calc(-${currentIndex * 100}% + ${getDragOffset()}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            height: '100%',
            willChange: 'transform',
          }}
        >
          {cards.map((card, index) => (
            <Box
              key={index}
              sx={{
                minWidth: '100%',
                flexShrink: 0,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              {card.type === 'concept' ? (
                <ConceptCard
                  headline={card.headline}
                  text={card.text}
                  icon={card.icon}
                />
              ) : (
                <RuleCard
                  headline={card.headline}
                  text={card.text}
                  exampleSpanish={card.example_spanish}
                  exampleEnglish={card.example_english}
                  audioUrl={card.audio_url}
                  onPlayAudio={playAudio}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Pagination dots */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 0.75,
          p: 1.5,
        }}
      >
        {cards.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: index === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: index === currentIndex ? '4px' : '50%',
              bgcolor: index === currentIndex ? '#14B8A6' : '#D1D5DB',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>

      {/* Bottom section with Start Lesson button (only on final card) */}
      {isLastCard && (
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            p: 1.5,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={onComplete}
            sx={{
              ...iosButtonStyle,
              background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
              },
            }}
          >
            Start Lesson
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default GrammarGuidebook

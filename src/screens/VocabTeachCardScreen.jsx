import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useNavigation } from '../hooks/useNavigation.js'
import { iosButtonStyle, touchOptimized } from '../components/shared/sharedStyles'

/**
 * VocabTeachCardScreen - Teaching new vocabulary with swipeable carousel
 * Displays word cards with pronunciation, translation, and context usage
 * Uses useNavigation hook for navigation - no props required
 */
function VocabTeachCardScreen() {
  // Get navigation functions from context
  const { showVocabSpeaking, showVocabDrillIntro, showReviewScreen, showDashboard, activeVocabTopic, navigationSource } = useNavigation()

  // Swipe gesture state
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Card navigation state
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Use dynamic words from topic, or fallback
  const words = activeVocabTopic?.words || [
    {
      spanish: 'Tinto',
      english: 'Red wine',
      emoji: '🍷',
      phonetic: 'TEEN-toh',
      context: 'Used for red wine in Spain. "Un tinto, por favor."',
    },
    {
      spanish: 'La Cuenta',
      english: 'The bill/check',
      emoji: '🧾',
      phonetic: 'lah KWEN-tah',
      context: 'Ask for the bill at restaurants. "La cuenta, por favor."',
    },
  ]

  const currentWord = words[currentWordIndex]
  const isLastCard = currentWordIndex === words.length - 1

  // Edge case: No topic or no words
  if (!activeVocabTopic || !Array.isArray(words) || words.length === 0) {
    console.error('VocabTeachCardScreen: Invalid topic data', activeVocabTopic)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          bgcolor: '#F8FAFC',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <IconButton
            onClick={() => navigationSource === 'review' ? showReviewScreen() : showDashboard()}
            sx={{
              mr: 2,
              color: '#64748B',
              '&:hover': { bgcolor: '#F1F5F9' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: '700',
              color: '#111827',
              fontFamily: 'Lexend',
            }}
          >
            Vocabulary
          </Typography>
        </Box>

        {/* Error State */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: '64px', color: '#EF4444', mb: 2 }} />
          <Typography
            variant="h6"
            sx={{
              color: '#EF4444',
              fontWeight: '600',
              mb: 1,
              textAlign: 'center',
            }}
          >
            No vocabulary words available
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#64748B',
              mb: 3,
              textAlign: 'center',
            }}
          >
            Please select a different topic or try again later.
          </Typography>
          <Button
            variant="contained"
            onClick={showReviewScreen}
            sx={{
              ...iosButtonStyle,
              background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
            }}
          >
            Return to Shelves
          </Button>
        </Box>
      </Box>
    )
  }

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
    if (swipeDistance > swipeThreshold && currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prev) => prev + 1)
    }
    // Swipe right - go to previous card
    else if (swipeDistance < -swipeThreshold && currentWordIndex > 0) {
      setCurrentWordIndex((prev) => prev - 1)
    }

    setIsDragging(false)
    setTouchStart(0)
    setTouchEnd(0)
  }, [touchStart, touchEnd, currentWordIndex, words.length])

  /**
   * Calculate drag offset for live feedback during swipe
   */
  const getDragOffset = () => {
    if (!isDragging) return 0
    return touchEnd - touchStart
  }

  /**
   * Handle audio playback
   */
  const handlePlayAudio = useCallback(() => {
    setIsPlaying(true)
    setTimeout(() => {
      setIsPlaying(false)
    }, 2000)
  }, [])

  /**
   * Handle next word navigation
   */
  const handleNextWord = useCallback(() => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prev) => prev + 1)
    }
  }, [currentWordIndex, words.length])

  /**
   * Handle previous word navigation
   */
  const handlePreviousWord = useCallback(() => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex((prev) => prev - 1)
    }
  }, [currentWordIndex])

  /**
   * Handle skip - jump directly to speaking practice
   */
  const handleSkip = useCallback(() => {
    showVocabSpeaking()
  }, [showVocabSpeaking])

  /**
   * Keyboard navigation support
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlePreviousWord()
          break
        case 'ArrowRight':
          handleNextWord()
          break
        case 'Escape':
          showVocabDrillIntro(activeVocabTopic)
          break
        case ' ':
        case 'Enter':
          e.preventDefault()
          handlePlayAudio()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePreviousWord, handleNextWord, handlePlayAudio, showVocabDrillIntro, activeVocabTopic])

  /**
   * Auto-play audio when card changes
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handlePlayAudio()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [currentWordIndex, handlePlayAudio])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#F8FAFC',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <IconButton
            onClick={() => showVocabDrillIntro(activeVocabTopic)}
            sx={{
              mr: 2,
              color: '#64748B',
              '&:hover': { bgcolor: '#F1F5F9' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {activeVocabTopic?.emoji && (
                <Typography sx={{ fontSize: '20px' }}>
                  {activeVocabTopic.emoji}
                </Typography>
              )}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '700',
                  color: '#111827',
                  fontFamily: 'Lexend',
                }}
              >
                {activeVocabTopic?.title || 'Vocabulary Practice'}
              </Typography>
            </Box>
            {activeVocabTopic?.level_label && (
              <Typography
                variant="caption"
                sx={{
                  color: '#64748B',
                  fontSize: '12px',
                  fontWeight: '500',
                }}
              >
                {activeVocabTopic.level_label}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={handleSkip}
            sx={{
              color: '#64748B',
              fontWeight: '600',
              fontSize: '14px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#F1F5F9',
              },
            }}
          >
            Skip
          </Button>
          <Typography
            variant="body2"
            sx={{
              color: '#64748B',
              fontWeight: '600',
            }}
          >
            Word {currentWordIndex + 1} of {words.length}
          </Typography>
        </Box>
      </Box>

      {/* Main Content - Carousel */}
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          touchAction: 'pan-y',
        }}
      >
        {/* Left Arrow Button */}
        <IconButton
          onClick={handlePreviousWord}
          disabled={currentWordIndex === 0}
          sx={{
            ...touchOptimized,
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            color: currentWordIndex === 0 ? '#D1D5DB' : '#64748B',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)',
              color: '#14B8A6',
            },
            '&:disabled': {
              opacity: 0.5,
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Right Arrow Button */}
        <IconButton
          onClick={handleNextWord}
          disabled={currentWordIndex === words.length - 1}
          sx={{
            ...touchOptimized,
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            color: currentWordIndex === words.length - 1 ? '#D1D5DB' : '#64748B',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)',
              color: '#14B8A6',
            },
            '&:disabled': {
              opacity: 0.5,
            },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>

        {/* Cards Wrapper with Transform */}
        <Box
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{
            display: 'flex',
            transform: `translateX(calc(-${currentWordIndex * 100}% + ${getDragOffset()}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            height: '100%',
            willChange: 'transform',
          }}
        >
          {words.map((word, index) => (
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
              {/* Word Card */}
              <Card
                sx={{
                  width: '100%',
                  maxWidth: '400px',
                  bgcolor: '#FFFFFF',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  p: 3,
                  textAlign: 'center',
                }}
              >
                {/* Emoji */}
                <Typography
                  sx={{
                    fontSize: '64px',
                    mb: 2,
                  }}
                >
                  {word.emoji}
                </Typography>

                {/* Spanish Word */}
                <Typography
                  sx={{
                    fontFamily: 'Lexend',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#111827',
                    mb: 1,
                  }}
                >
                  {word.spanish}
                </Typography>

                {/* Phonetic */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#14B8A6',
                    fontWeight: '600',
                    mb: 2,
                    fontSize: '14px',
                  }}
                >
                  {word.phonetic}
                </Typography>

                {/* English Translation */}
                <Typography
                  variant="body1"
                  sx={{
                    color: '#475569',
                    mb: 3,
                    fontSize: '16px',
                  }}
                >
                  {word.english}
                </Typography>

                {/* Audio Playback Button */}
                <Box sx={{ mb: 3 }}>
                  <IconButton
                    onClick={handlePlayAudio}
                    sx={{
                      bgcolor: '#F0FDFA',
                      color: '#14B8A6',
                      width: '56px',
                      height: '56px',
                      '&:hover': {
                        bgcolor: '#CCFBF1',
                      },
                    }}
                  >
                    {isPlaying ? (
                      <PauseIcon sx={{ fontSize: '28px' }} />
                    ) : (
                      <PlayArrowIcon sx={{ fontSize: '28px' }} />
                    )}
                  </IconButton>
                </Box>

                {/* Context Usage */}
                <Box
                  sx={{
                    bgcolor: '#F0FDFA',
                    border: '1px solid #CCFBF1',
                    borderRadius: '8px',
                    p: 2,
                    mt: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#0D9488',
                      fontWeight: '600',
                      mb: 0.5,
                      fontSize: '12px',
                    }}
                  >
                    CONTEXT
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      fontSize: '14px',
                      fontStyle: 'italic',
                    }}
                  >
                    {word.context}
                  </Typography>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Pagination Dots */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 0.75,
          p: 1.5,
        }}
      >
        {words.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: index === currentWordIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: index === currentWordIndex ? '4px' : '50%',
              bgcolor: index === currentWordIndex ? '#14B8A6' : '#D1D5DB',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>

      {/* Fixed Bottom Section */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          p: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        {!isLastCard ? (
          <Button
            fullWidth
            variant="contained"
            onClick={handleNextWord}
            sx={{
              ...iosButtonStyle,
              background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
            }}
          >
            Next Word
          </Button>
        ) : (
          <>
            <Button
              fullWidth
              variant="contained"
              onClick={showVocabSpeaking}
              sx={{
                ...iosButtonStyle,
                background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
                flex: 2,
              }}
            >
              Practice Speaking
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigationSource === 'review' ? showReviewScreen() : showDashboard()}
              sx={{
                ...iosButtonStyle,
                borderColor: '#E2E8F0',
                color: '#64748B',
                flex: 1,
                '&:hover': {
                  borderColor: '#CBD5E1',
                  bgcolor: '#F8FAFC',
                },
              }}
            >
              Back to Shelves
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default VocabTeachCardScreen

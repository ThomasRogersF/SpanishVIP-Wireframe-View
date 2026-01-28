import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'
import { iosButtonStyle } from '../shared/sharedStyles.js'
import {
  pulseRing,
  springBounce,
  springCollapse,
  checkmarkDraw,
  lessonStagger,
  sparkleRotate
} from '../shared/sharedAnimations.js'

/**
 * ModuleList - Premium curriculum module list with expandable lessons
 * Features:
 * - Tactile card headers with spring animations
 * - Horizontal track pills for lessons with type icons
 * - Progressive vertical timeline showing completion
 * - Checkmark draw animation for completed lessons
 * - Sparkle icons for locked lessons
 * - 8px base grid spacing throughout
 *
 * Props:
 * - onVIPSurvivalClick: Handler for VIP Survival Phrases lesson (Module 1, L4)
 * - onVocabDrillClick: Handler for Vocabulary Drill lesson (Module 2, L2)
 * - onSerEstarClick: Handler for Ser vs Estar lesson (Module 2, L3)
 * - onTravelLessonClick: Handler for Travel Lesson - Vamos a Viajar (Module 3, L1)
 * - showLockedModule: Boolean to conditionally render locked Module 3 (default true)
 */

/**
 * Helper function to determine lesson type and return appropriate icon
 * @param {string} title - Lesson title
 * @returns {string} Emoji icon representing the lesson type
 */
const getLessonTypeIcon = (title) => {
  const lowerTitle = title.toLowerCase()
  
  if (lowerTitle.includes('roleplay') || lowerTitle.includes('speaking') || lowerTitle.includes('drill')) {
    return '🎙️'
  }
  if (lowerTitle.includes('video') || lowerTitle.includes('watch') || lowerTitle.includes('intro')) {
    return '🎥'
  }
  if (lowerTitle.includes('grammar') || lowerTitle.includes('ser') || lowerTitle.includes('estar') || lowerTitle.includes('conjugation')) {
    return '✍️'
  }
  if (lowerTitle.includes('exam') || lowerTitle.includes('test') || lowerTitle.includes('quiz')) {
    return '📝'
  }
  if (lowerTitle.includes('vocabulary') || lowerTitle.includes('vocab')) {
    return '🎙️'
  }
  if (lowerTitle.includes('alphabet') || lowerTitle.includes('vowel')) {
    return '🔤'
  }
  if (lowerTitle.includes('greeting') || lowerTitle.includes('phrases') || lowerTitle.includes('pronoun')) {
    return '👋'
  }
  if (lowerTitle.includes('travel') || lowerTitle.includes('hotel') || lowerTitle.includes('direction')) {
    return '✈️'
  }
  return '📚'
}

/**
 * SVG Checkmark Component with draw animation
 */
const AnimatedCheckmark = ({ animate = false }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  
  useEffect(() => {
    if (animate) {
      // Small delay to ensure mount is complete
      const timer = setTimeout(() => setShouldAnimate(true), 50)
      return () => clearTimeout(timer)
    }
  }, [animate])
  
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{
        width: 12,
        height: 12,
        '@media (prefers-reduced-motion: no-preference)': {
          '& path': {
            strokeDasharray: 24,
            strokeDashoffset: shouldAnimate ? 0 : 24,
            animation: shouldAnimate ? `${checkmarkDraw} 0.3s ease-out forwards` : 'none',
          }
        }
      }}
    >
      <path
        d="M 4 12 L 9 17 L 20 6"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  )
}

/**
 * Sparkle Icon Component for locked lessons
 */
const SparkleIcon = () => (
  <Box
    component="span"
    sx={{
      display: 'inline-block',
      fontSize: '10px',
      ml: 0.5,
      '@media (prefers-reduced-motion: no-preference)': {
        animation: `${sparkleRotate} 2s ease-in-out infinite`,
      }
    }}
  >
    ✨
  </Box>
)

/**
 * Progressive Timeline Component
 * Shows vertical line with progress fill and connection nodes
 */
const ProgressiveTimeline = ({ lessons, isExpanded }) => {
  const completedCount = lessons.filter(l => l.status === 'completed').length
  const progressPercent = (completedCount / lessons.length) * 100
  
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 12, // 1.5 × 8px
        top: 0,
        bottom: 0,
        width: 2, // Line width
        zIndex: 0,
      }}
    >
      {/* Base line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#E5E7EB',
          borderRadius: 1,
        }}
      />
      {/* Progress fill */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${progressPercent}%`,
          background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
          borderRadius: 1,
          transition: 'height 0.4s ease-out',
        }}
      />
    </Box>
  )
}

/**
 * Timeline Node Component
 * Displays connection point for each lesson on the timeline
 */
const TimelineNode = ({ status, index }) => {
  const theme = useTheme()
  
  const getNodeStyle = () => {
    switch (status) {
      case 'completed':
        return {
          backgroundColor: '#10b981',
          border: 'none',
        }
      case 'active':
      case 'next':
        return {
          backgroundColor: '#059669',
          border: 'none',
        }
      case 'ready':
        return {
          backgroundColor: '#8B5CF6',
          border: 'none',
        }
      case 'locked':
        return {
          backgroundColor: 'transparent',
          border: '2px solid rgba(156, 163, 175, 0.5)',
        }
      default:
        return {
          backgroundColor: '#E5E7EB',
          border: 'none',
        }
    }
  }
  
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 24, // 3 × 8px
        height: 24,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        ...getNodeStyle(),
      }}
      aria-label={`Lesson status: ${status}`}
    >
      {status === 'completed' && <AnimatedCheckmark animate />}
      {(status === 'active' || status === 'next') && (
        <>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
            }}
          />
          {/* Pulse ring for active lesson */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px solid #059669',
              '@media (prefers-reduced-motion: no-preference)': {
                animation: `${pulseRing} 1.5s ease-out infinite`,
              }
            }}
          />
        </>
      )}
      {status === 'ready' && (
        <Typography sx={{ fontSize: '8px', color: '#FFFFFF', fontWeight: 700 }}>▶</Typography>
      )}
    </Box>
  )
}

/**
 * Lesson Pill Component
 * Horizontal pill-shaped component for each lesson
 */
const LessonPill = ({
  lesson,
  index,
  isExpanded,
  onLessonClick,
}) => {
  const isLocked = lesson.status === 'locked'
  const hasClick = lesson.onClick && !isLocked
  const typeIcon = getLessonTypeIcon(lesson.title)
  
  const pillContent = (
    <Box
      component={hasClick ? 'button' : 'div'}
      onClick={hasClick ? lesson.onClick : undefined}
      role={hasClick ? 'button' : undefined}
      tabIndex={hasClick ? 0 : undefined}
      aria-disabled={isLocked}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1, // 8px
        width: '100%',
        py: 1.5, // 12px vertical padding
        px: 2, // 16px horizontal padding
        ml: 6, // 48px left margin for timeline
        borderRadius: 9999, // Pill shape
        border: 'none',
        backgroundColor: (lesson.status === 'next' || lesson.status === 'active')
          ? 'rgba(5, 150, 105, 0.08)'
          : 'transparent',
        cursor: hasClick ? 'pointer' : isLocked ? 'not-allowed' : 'default',
        textAlign: 'left',
        position: 'relative',
        opacity: 1,
        filter: isLocked ? 'grayscale(0.8)' : 'none',
        transition: 'all 0.2s ease',
        '@media (prefers-reduced-motion: no-preference)': {
          animation: isExpanded ? `${lessonStagger} 0.2s ease-out forwards` : 'none',
          animationDelay: `${index * 50}ms`,
          opacity: isExpanded ? undefined : 1,
        },
        ...(hasClick && {
          ...iosButtonStyle,
          '&:hover': {
            backgroundColor: 'rgba(5, 150, 105, 0.12)',
          },
          '&:focus-visible': {
            outline: '3px solid #059669',
            outlineOffset: '2px',
          },
        }),
        ...(isLocked && {
          opacity: 0.5,
          '&:hover': {
            filter: 'grayscale(0.4)',
          },
        }),
      }}
    >
      {/* Timeline Node */}
      <TimelineNode status={lesson.status} index={index} />
      
      {/* Lesson Type Icon */}
      <Box
        component="span"
        sx={{
          fontSize: '16px',
          width: 16,
          height: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {typeIcon}
      </Box>
      
      {/* Lesson Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontWeight: (lesson.status === 'active' || lesson.status === 'next') ? 600 : 500,
              fontSize: '0.875rem', // 14px
              color: lesson.status === 'locked' ? '#6B7280' : '#111827',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {lesson.title}
          </Typography>
          {lesson.status === 'next' && (
            <Chip
              label="NEXT"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.625rem',
                fontWeight: 700,
                backgroundColor: '#059669',
                color: '#FFFFFF',
                '& .MuiChip-label': {
                  px: 1
                }
              }}
            />
          )}
          {isLocked && <SparkleIcon />}
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.75rem', // 12px
            color: getTextColor(lesson.status),
            fontWeight: (lesson.status === 'next' || lesson.status === 'active') ? 500 : 400,
            mt: 0.25,
          }}
        >
          {lesson.subtitle}
        </Typography>
      </Box>
    </Box>
  )
  
  // Wrap locked lessons in tooltip
  if (isLocked) {
    return (
      <Tooltip title="Complete previous lessons to unlock" placement="top" arrow>
        <Box sx={{ position: 'relative', mb: 1 }}>{pillContent}</Box>
      </Tooltip>
    )
  }
  
  return <Box sx={{ position: 'relative', mb: 1 }}>{pillContent}</Box>
}

/**
 * Get text color based on lesson status
 */
const getTextColor = (status) => {
  switch (status) {
    case 'completed':
      return '#6B7280'
    case 'active':
      return '#059669'
    case 'next':
      return '#059669'
    case 'ready':
      return '#8B5CF6'
    case 'locked':
      return '#9ca3af'
    default:
      return '#111827'
  }
}

/**
 * Module Header Card Component
 * Tactile card with spring animations for accordion expansion
 */
const ModuleHeaderCard = ({
  title,
  subtitle,
  icon,
  iconBgColor,
  isExpanded,
  onClick,
  isExpandable = false,
  showChevron = true,
}) => {
  const theme = useTheme()
  
  return (
    <Card
      component={isExpandable ? 'button' : 'div'}
      onClick={isExpandable ? onClick : undefined}
      role={isExpandable ? 'button' : undefined}
      tabIndex={isExpandable ? 0 : undefined}
      aria-expanded={isExpandable ? isExpanded : undefined}
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5, // 12px
        width: '100%',
        p: 2, // 16px padding
        mb: 2, // 16px margin bottom
        borderRadius: '16px',
        border: 'none',
        backgroundColor: '#FFFFFF',
        boxShadow: theme.customShadows?.card || '0 2px 8px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.02)',
        cursor: isExpandable ? 'pointer' : 'default',
        textAlign: 'left',
        transition: 'all 0.2s ease, box-shadow 0.3s ease',
        willChange: 'transform, box-shadow',
        ...(isExpandable && {
          ...iosButtonStyle,
          '&:hover': {
            boxShadow: theme.customShadows?.elevated || '0 8px 24px rgba(5, 150, 105, 0.15)',
            transform: 'scale(1.01)',
          },
          '&:focus-visible': {
            outline: '3px solid #059669',
            outlineOffset: '2px',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        }),
      }}
    >
      {/* Module Icon */}
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '8px',
          backgroundColor: iconBgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {showChevron && isExpandable ? (
          <Box
            component="svg"
            sx={{
              width: 20,
              height: 20,
              color: '#FFFFFF',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'transform 0.1s ease',
              },
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </Box>
        ) : icon ? (
          icon
        ) : (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
            }}
          />
        )}
      </Box>
      
      {/* Module Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#111827' }}>
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: iconBgColor === '#FACC15' ? '#6B7280' : iconBgColor,
            fontWeight: 500,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Card>
  )
}

/**
 * Animated Accordion Content
 * Wraps lesson list with spring animation
 */
const AnimatedAccordionContent = ({ isExpanded, children, lessons }) => {
  const contentRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(isExpanded)
  
  useEffect(() => {
    if (isExpanded) {
      setShouldRender(true)
    } else {
      // Delay unmount for collapse animation
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isExpanded])
  
  if (!shouldRender) return null
  
  return (
    <Box
      ref={contentRef}
      sx={{
        overflow: 'hidden',
        transformOrigin: 'top',
        willChange: 'transform, opacity',
        '@media (prefers-reduced-motion: no-preference)': {
          animation: isExpanded
            ? `${springBounce} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards`
            : `${springCollapse} 0.3s ease-out forwards`,
        },
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded ? 'scaleY(1)' : 'scaleY(0)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          pl: 1.5, // 12px for timeline offset
        }}
      >
        {/* Progressive Timeline */}
        <ProgressiveTimeline lessons={lessons} isExpanded={isExpanded} />
        
        {/* Lessons */}
        {children}
      </Box>
    </Box>
  )
}

function ModuleList({
  onSerEstarClick,
  onVocabDrillClick,
  onVIPSurvivalClick,
  onTravelLessonClick,
  showLockedModule = true
}) {
  const [module1Expanded, setModule1Expanded] = useState(false)
  const theme = useTheme()

  // Module 1 lessons data - matches original HTML: "Module 1: Greetings & Basics" (7 Lessons)
  const module1Lessons = [
    { id: 1, title: 'L1: The Alphabet & Ñ', subtitle: 'Completed • 8 min', status: 'completed' },
    { id: 2, title: 'L2: The Secret Vowels', subtitle: 'Completed • 6 min', status: 'completed' },
    { id: 3, title: 'L3: Essential Greetings', subtitle: 'Ready • 12 min', status: 'next' },
    { id: 4, title: 'L4: The VIP Survival Phrases', subtitle: 'Ready • 10 min', status: 'ready', onClick: onVIPSurvivalClick },
    { id: 5, title: 'L5: Subject Pronouns', subtitle: 'Locked • 15 min', status: 'locked' },
    { id: 6, title: 'L6: I am... (Intro to Ser)', subtitle: 'Locked • 18 min', status: 'locked' },
    { id: 7, title: 'L7: Module 1 Exam', subtitle: 'Locked • 25 min', status: 'locked' }
  ]

  // Module 2 lessons data - matches original HTML: "Module 2: Cafe Culture" (Active)
  const module2Lessons = [
    { id: 1, title: 'L1: Intro to Politeness', subtitle: 'Completed', status: 'completed' },
    { id: 2, title: 'L2: Vocabulary Drill', subtitle: 'Completed', status: 'completed', onClick: onVocabDrillClick },
    { id: 3, title: 'L3: Grammar - Ser vs Estar', subtitle: 'Completed', status: 'completed', onClick: onSerEstarClick },
    { id: 4, title: 'L4: Roleplay - The Cafe', subtitle: 'In Progress - 60%', status: 'active' },
    { id: 5, title: 'L5: Unit Exam', subtitle: 'Locked', status: 'locked' }
  ]

  // Module 3 lessons data - Travel Essentials (Active)
  const module3Lessons = [
    {
      id: 1,
      title: 'L1: Vamos a Viajar',
      subtitle: 'Ready • 25 min',
      status: 'ready',
      onClick: onTravelLessonClick
    },
    { id: 2, title: 'L2: At the Hotel', subtitle: 'Locked • 20 min', status: 'locked' },
    { id: 3, title: 'L3: Asking for Directions', subtitle: 'Locked • 18 min', status: 'locked' },
  ]

  // Render locked Module 3 component
  const renderLockedModule3 = () => (
    <Card
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: '16px',
        opacity: 0.5,
        boxShadow: theme.customShadows?.card || '0 2px 8px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.02)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            backgroundColor: 'rgba(156, 163, 175, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px'
          }}
        >
          🔒<SparkleIcon />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#6B7280' }}>
            Module 3: Travel Essentials
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af' }}>
            Unlocks at Level A1
          </Typography>
        </Box>
      </Box>
    </Card>
  )

  // Render active Module 3 component
  const renderActiveModule3 = () => (
    <Box sx={{ mb: 3 }}>
      <ModuleHeaderCard
        title="Module 3: Travel Essentials"
        subtitle="Ready"
        iconBgColor="#8B5CF6"
        isExpandable={false}
        showChevron={false}
      />
      
      {/* Lessons with Timeline */}
      <Box sx={{ position: 'relative', pl: 1.5 }}>
        <ProgressiveTimeline lessons={module3Lessons} isExpanded />
        {module3Lessons.map((lesson, index) => (
          <LessonPill
            key={lesson.id}
            lesson={lesson}
            index={index}
            isExpanded
          />
        ))}
      </Box>
    </Box>
  )

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontFamily: "'Lexend', sans-serif",
          fontWeight: 700,
          fontSize: '1.125rem',
          color: '#111827',
          mb: 3, // 24px
        }}
      >
        Your Curriculum
      </Typography>

      {/* Module 1 - Greetings & Basics (Expandable) */}
      <Box sx={{ mb: 3 }}>
        <ModuleHeaderCard
          title="Module 1: Greetings & Basics"
          subtitle="7 Lessons"
          iconBgColor="#FACC15"
          isExpanded={module1Expanded}
          onClick={() => setModule1Expanded(!module1Expanded)}
          isExpandable
          showChevron
        />
        
        <AnimatedAccordionContent isExpanded={module1Expanded} lessons={module1Lessons}>
          {module1Lessons.map((lesson, index) => (
            <LessonPill
              key={lesson.id}
              lesson={lesson}
              index={index}
              isExpanded={module1Expanded}
            />
          ))}
        </AnimatedAccordionContent>
      </Box>

      {/* Module 2 - Cafe Culture (Active) */}
      <Box sx={{ mb: 3 }}>
        <ModuleHeaderCard
          title="Module 2: Cafe Culture"
          subtitle="Active"
          iconBgColor="#059669"
          isExpandable={false}
          showChevron={false}
        />
        
        {/* Always visible lessons with Timeline */}
        <Box sx={{ position: 'relative', pl: 1.5 }}>
          <ProgressiveTimeline lessons={module2Lessons} isExpanded />
          {module2Lessons.map((lesson, index) => (
            <LessonPill
              key={lesson.id}
              lesson={lesson}
              index={index}
              isExpanded
            />
          ))}
        </Box>
      </Box>

      {/* Module 3 - Travel Essentials - Conditionally rendered */}
      {showLockedModule ? renderLockedModule3() : renderActiveModule3()}
    </Box>
  )
}

// Export the locked module renderer separately for use in DashboardScreen
export function LockedModule3() {
  const theme = useTheme()
  
  return (
    <Card
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: '16px',
        opacity: 0.5,
        boxShadow: theme.customShadows?.card || '0 2px 8px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.02)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            backgroundColor: 'rgba(156, 163, 175, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px'
          }}
        >
          🔒
          <Box
            component="span"
            sx={{
              fontSize: '10px',
              ml: 0.5,
              '@media (prefers-reduced-motion: no-preference)': {
                animation: `${sparkleRotate} 2s ease-in-out infinite`,
              }
            }}
          >
            ✨
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#6B7280' }}>
            Module 3: Travel Essentials
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af' }}>
            Unlocks at Level A1
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default ModuleList

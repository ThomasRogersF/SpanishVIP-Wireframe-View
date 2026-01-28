import { useCallback } from 'react'
import Box from '@mui/material/Box'
import useSDKConfig from '../hooks/useSDKConfig.js'
import { useNavigation } from '../hooks/useNavigation.js'
import usePullToRefresh from '../hooks/usePullToRefresh.js'
import { texturedBackground } from '../components/shared/sharedStyles.js'

// Dashboard components
import HeroCard from '../components/Dashboard/HeroCard.jsx'
import QuickWinCard from '../components/Dashboard/QuickWinCard.jsx'
import ModuleList from '../components/Dashboard/ModuleList.jsx'
import UpsellBanner from '../components/Dashboard/UpsellBanner.jsx'
import PullToRefreshIndicator from '../components/shared/PullToRefreshIndicator.jsx'

/** Pull-to-refresh threshold in pixels */
const PULL_TO_REFRESH_THRESHOLD = 80

/**
 * DashboardScreen - Main hub of the SpanishVIP app
 * Contains hero card, quick win card, curriculum modules, and upsell banner
 *
 * Layout order matches original HTML:
 * 1. Hero Card
 * 2. Quick Win Card
 * 3. Module List (Module 1 + Module 2, without locked Module 3)
 * 4. Upsell Banner
 * 5. Locked Module 3
 *
 * Features:
 * - Pull-to-refresh with Spanish-themed animations (coffee cup or flag variants)
 * - Respects prefers-reduced-motion for accessibility
 * - Uses useNavigation hook for all navigation - no props required
 *
 * @see usePullToRefresh - Custom hook managing pull-to-refresh state
 * @see PullToRefreshIndicator - Visual indicator component
 */
function DashboardScreen() {
  // Get SDK configuration from context
  const config = useSDKConfig()
  
  // Get navigation functions from context
  const {
    showLessonRunner,
    showSpeedDrill,
    showVoiceMode,
    showSerEstarConcept,
    showVocabDrillIntro,
    showVIPSurvivalIntro,
    showVIPAccessOffer,
    showTravelImageSelect,
    setActiveTab
  } = useNavigation()

  /**
   * Handle pull-to-refresh action
   * Simulates data refresh with 1.5s delay (could be replaced with actual API calls)
   *
   * @returns {Promise<void>} Resolves when refresh is complete
   */
  const handleRefresh = useCallback(async () => {
    // Simulate refresh delay (1.5 seconds)
    // In production, this would trigger re-fetching of user progress, streak, etc.
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Future enhancement: trigger actual data refresh
    // await refetchUserProgress()
    // await refetchStreak()
    // await refetchModules()
  }, [])

  // Pull-to-refresh hook integration
  const { isPulling, pullDistance, isRefreshing, containerProps } = usePullToRefresh({
    onRefresh: handleRefresh,
    threshold: PULL_TO_REFRESH_THRESHOLD,
    enabled: true,
  })

  // Navigation Handlers - using navigation context

  /**
   * Resume lesson - navigates to LessonScreen
   */
  const handleResumeLesson = () => {
    showLessonRunner()
  }

  /**
   * Start speed drill - navigates to SpeedDrillScreen
   */
  const handleSpeedDrill = () => {
    showSpeedDrill()
  }

  /**
   * Navigate to review screen
   */
  const handleReviewScreen = () => {
    setActiveTab('review')
  }

  /**
   * Navigate to voice mode
   */
  const handleVoiceMode = () => {
    showVoiceMode()
  }

  /**
   * Navigate to Ser vs Estar concept lesson (Module 2, L3)
   */
  const handleSerEstarConcept = () => {
    showSerEstarConcept()
  }

  /**
   * Navigate to Vocab Drill intro (Module 2, L2)
   */
  const handleVocabDrill = () => {
    showVocabDrillIntro()
  }

  /**
   * Navigate to VIP Survival phrases intro (Module 1, L4)
   */
  const handleVIPSurvival = () => {
    showVIPSurvivalIntro()
  }

  /**
   * Navigate to VIP Access offer screen
   */
  const handleVIPAccessOffer = () => {
    showVIPAccessOffer()
  }

  /**
   * Navigate to Travel Lesson - Vamos a Viajar (Module 3, L1)
   */
  const handleTravelLesson = () => {
    showTravelImageSelect()
  }

  // Generate textured background styles with subtle noise and vignette
  const backgroundStyles = texturedBackground({
    baseColor: config.surface_color || '#fafaf9',
    noiseOpacity: 0.02,
    vignetteOpacity: 0.015
  })

  return (
    <Box
      {...containerProps}
      sx={{
        px: 2.5,
        pb: 12,
        pt: 2.5,
        minHeight: '100%',
        position: 'relative',
        overflow: 'hidden',
        ...backgroundStyles,
        // Ensure content stays above texture layers and pull indicator
        '& > *:not([role="status"])': {
          position: 'relative',
          zIndex: 2
        }
      }}
    >
      {/* Pull-to-refresh indicator - coffee cup theme matching hero card */}
      <PullToRefreshIndicator
        pullDistance={pullDistance}
        isRefreshing={isRefreshing}
        threshold={PULL_TO_REFRESH_THRESHOLD}
        variant="coffee"
      />

      {/* Hero Card - Main lesson progress */}
      <HeroCard
        headline={config.hero_headline}
        subheadline={config.hero_subheadline}
        progress={60}
        sofiaNudge={config.sofia_nudge}
        buttonText={config.hero_button}
        onResumeClick={handleResumeLesson}
        backgroundColor={config.hero_card_bg}
        textColor={config.hero_card_text}
        buttonColor={config.primary_action_color}
      />

      {/* Quick Win Card - Short activity CTA */}
      <Box sx={{ mt: 2.5 }}>
        <QuickWinCard
          headline={config.quick_win_headline}
          actionText={config.quick_win_action}
          onStartClick={handleVocabDrill}
        />
      </Box>

      {/* Module List - Curriculum with expandable lessons (all modules including unlocked Module 3) */}
      <ModuleList
        onSerEstarClick={handleSerEstarConcept}
        onVocabDrillClick={handleVocabDrill}
        onVIPSurvivalClick={handleVIPSurvival}
        onTravelLessonClick={handleTravelLesson}
        showLockedModule={false}
      />

      {/* Upsell Banner - Human tutor booking */}
      <Box sx={{ mb: 3 }}>
        <UpsellBanner
          upsellText={config.upsell_text}
          actionText={config.upsell_action}
          onBookClick={handleVIPAccessOffer}
        />
      </Box>
    </Box>
  )
}

export default DashboardScreen

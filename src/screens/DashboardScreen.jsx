import Box from '@mui/material/Box'
import useSDKConfig from '../hooks/useSDKConfig.js'
import { useNavigation } from '../hooks/useNavigation.js'

// Dashboard components
import HeroCard from '../components/Dashboard/HeroCard.jsx'
import QuickWinCard from '../components/Dashboard/QuickWinCard.jsx'
import ModuleList from '../components/Dashboard/ModuleList.jsx'
import UpsellBanner from '../components/Dashboard/UpsellBanner.jsx'

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
 * Uses useNavigation hook for all navigation - no props required
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
    showGrammarGuide,
    showModuleGuidebook,
    showVideoLessonM3L3,
    setActiveTab
  } = useNavigation()

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

  /**
   * Navigate to Grammar Guide before Module 3, Lesson 2
   */
  const handleGrammarGuide = () => {
    showGrammarGuide()
  }

  /**
   * Navigate to Module Guidebook
   */
  const handleModuleGuidebook = (guidebookId) => {
    showModuleGuidebook(guidebookId)
  }

  /**
   * Navigate to Video Lesson - El Participio (Module 3, L3)
   */
  const handleVideoLessonM3L3 = () => {
    showVideoLessonM3L3()
  }

  return (
    <Box
      sx={{
        px: 2.5,
        pb: 12,
        pt: 2.5,
        backgroundColor: config.surface_color,
        minHeight: '100%'
      }}
    >
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
        onGrammarGuideClick={handleGrammarGuide}
        onVideoLessonM3L3Click={handleVideoLessonM3L3}
        onModuleGuidebookClick={handleModuleGuidebook}
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

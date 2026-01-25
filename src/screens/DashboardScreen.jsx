import { useState } from 'react'
import Box from '@mui/material/Box'

// Dashboard components
import HeroCard from '../components/Dashboard/HeroCard.jsx'
import QuickWinCard from '../components/Dashboard/QuickWinCard.jsx'
import ModuleList, { LockedModule3 } from '../components/Dashboard/ModuleList.jsx'
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
 */
function DashboardScreen({ onTabChange, onStartLesson, onShowSpeedDrill }) {
  // SDK Configuration - will be integrated with actual SDK in later phase
  // TODO: Connect to SDK configuration system in future phase
  const defaultConfig = {
    hero_headline: "Continue Unit 1: Cafe Culture",
    hero_subheadline: "Lesson 4: Ordering with Politeness",
    hero_button: "Resume Class",
    sofia_nudge: "You left off at the Roleplay. Let's finish ordering that coffee.",
    quick_win_headline: "Short on time?",
    quick_win_action: "Do a 2-Min Vocab Drill ⚡",
    upsell_text: "Stuck on a concept?",
    upsell_action: "Book a Human Tutor ($15)",
    hero_card_bg: "#14B8A6",
    hero_card_text: "#FFFFFF",
    surface_color: "#FFFFFF",
    text_color: "#111827",
    primary_action_color: "#FFFFFF"
  }

  const [config] = useState(defaultConfig)

  // Navigation Handlers - placeholder implementations
  // These will connect to actual screens in future phases

  /**
   * Resume lesson - navigates to LessonScreen
   */
  const handleResumeLesson = () => {
    console.log('DashboardScreen: Resume lesson clicked - navigating to LessonScreen')
    if (onStartLesson) {
      onStartLesson()
    }
  }

  /**
   * Start speed drill - navigates to SpeedDrillScreen
   */
  const handleSpeedDrill = () => {
    console.log('DashboardScreen: Speed drill clicked - navigating to SpeedDrillScreen')
    if (onShowSpeedDrill) {
      onShowSpeedDrill()
    }
  }

  /**
   * Navigate to review screen
   */
  const handleReviewScreen = () => {
    console.log('DashboardScreen: Review screen clicked')
    if (onTabChange) {
      onTabChange(null, 'review')
    }
  }

  /**
   * Navigate to voice mode
   */
  const handleVoiceMode = () => {
    console.log('DashboardScreen: Voice mode clicked')
    if (onTabChange) {
      onTabChange(null, 'voice')
    }
  }

  /**
   * Navigate to Ser vs Estar concept lesson (Module 2, L3)
   * TODO: Connect to SerEstarScreen in later phase
   */
  const handleSerEstarConcept = () => {
    console.log('DashboardScreen: Ser vs Estar clicked - will connect to SerEstarScreen')
  }

  /**
   * Navigate to Vocab Drill intro (Module 2, L2)
   * TODO: Connect to VocabDrillScreen in later phase
   */
  const handleVocabDrill = () => {
    console.log('DashboardScreen: Vocab Drill clicked - will connect to VocabDrillScreen')
  }

  /**
   * Navigate to VIP Survival phrases intro (Module 1, L4)
   * TODO: Connect to VIPSurvivalScreen in later phase
   */
  const handleVIPSurvival = () => {
    console.log('DashboardScreen: VIP Survival clicked - will connect to VIPSurvivalScreen')
  }

  /**
   * Navigate to VIP Access offer screen
   * TODO: Connect to VIPAccessOfferScreen in later phase
   */
  const handleVIPAccessOffer = () => {
    console.log('DashboardScreen: VIP Access Offer clicked - will connect to VIPAccessOfferScreen')
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
          onStartClick={handleSpeedDrill}
        />
      </Box>

      {/* Module List - Curriculum with expandable lessons (Module 1 + Module 2 only) */}
      <ModuleList
        onSerEstarClick={handleSerEstarConcept}
        onVocabDrillClick={handleVocabDrill}
        onVIPSurvivalClick={handleVIPSurvival}
        showLockedModule={false}
      />

      {/* Upsell Banner - Human tutor booking (positioned between Module 2 and Module 3) */}
      <Box sx={{ mb: 3 }}>
        <UpsellBanner
          upsellText={config.upsell_text}
          actionText={config.upsell_action}
          onBookClick={handleVIPAccessOffer}
        />
      </Box>

      {/* Locked Module 3 - Travel Essentials (after Upsell Banner) */}
      <LockedModule3 />
    </Box>
  )
}

export default DashboardScreen

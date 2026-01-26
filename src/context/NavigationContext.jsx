import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';

// Screen name constants to avoid magic strings
export const SCREENS = {
  DASHBOARD: 'dashboard',
  LESSON: 'lesson',
  SUCCESS: 'success',
  SPEED_DRILL: 'speedDrill',
  DRILL_COMPLETE: 'drillComplete',
  VOICE_MODE: 'voiceMode',
  ACTIVE_CALL: 'activeCall',
  REVIEW: 'review',
  SER_ESTAR_CONCEPT: 'serEstarConcept',
  SER_ESTAR_LOGIC: 'serEstarLogic',
  SER_ESTAR_SPEAKING: 'serEstarSpeaking',
  VOCAB_DRILL_INTRO: 'vocabDrillIntro',
  VOCAB_TEACH_CARD: 'vocabTeachCard',
  VOCAB_SPEAKING: 'vocabSpeaking',
  VOCAB_LISTENING: 'vocabListening',
  VOCAB_SUCCESS: 'vocabSuccess',
  VIP_SURVIVAL_INTRO: 'vipSurvivalIntro',
  VIP_TEACH_SHIELD: 'vipTeachShield',
  VIP_TEACH_BRAKE: 'vipTeachBrake',
  VIP_TEACH_TOOL: 'vipTeachTool',
  VIP_LOGIC_CHECK: 'vipLogicCheck',
  VIP_SPEAKING_DRILL: 'vipSpeakingDrill',
  VIP_SCENARIO_SETUP: 'vipScenarioSetup',
  VIP_ROLEPLAY: 'vipRoleplay',
  VIP_SUCCESS: 'vipSuccess',
  VIP_ACCESS_OFFER: 'vipAccessOffer',
};

// Screens that should hide StatusBar and BottomNav
const FULL_SCREEN_SCREENS = [
  SCREENS.LESSON,
  SCREENS.SUCCESS,
  SCREENS.SPEED_DRILL,
  SCREENS.DRILL_COMPLETE,
  SCREENS.ACTIVE_CALL,
  SCREENS.SER_ESTAR_CONCEPT,
  SCREENS.SER_ESTAR_LOGIC,
  SCREENS.SER_ESTAR_SPEAKING,
  SCREENS.VOCAB_DRILL_INTRO,
  SCREENS.VOCAB_TEACH_CARD,
  SCREENS.VOCAB_SPEAKING,
  SCREENS.VOCAB_LISTENING,
  SCREENS.VOCAB_SUCCESS,
  SCREENS.VIP_SURVIVAL_INTRO,
  SCREENS.VIP_TEACH_SHIELD,
  SCREENS.VIP_TEACH_BRAKE,
  SCREENS.VIP_TEACH_TOOL,
  SCREENS.VIP_LOGIC_CHECK,
  SCREENS.VIP_SPEAKING_DRILL,
  SCREENS.VIP_SCENARIO_SETUP,
  SCREENS.VIP_ROLEPLAY,
  SCREENS.VIP_SUCCESS,
  SCREENS.VIP_ACCESS_OFFER,
];

// Maximum history size to prevent memory issues
const MAX_HISTORY_SIZE = 10;

// Minimum loading time to prevent flash (in ms)
const MIN_LOADING_TIME = 150;

// Create the context
export const NavigationContext = createContext(null);

/**
 * NavigationProvider component that manages all navigation state and transitions
 * 
 * Enhanced with:
 * - isLoading state for lazy-loaded screen transitions
 * - Minimum loading time to prevent flash
 * - Event listener for ErrorBoundary navigation reset
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function NavigationProvider({ children }) {
  // Core navigation state
  const [currentScreen, setCurrentScreen] = useState(SCREENS.DASHBOARD);
  const [activeTab, setActiveTabState] = useState('home');
  const [screenHistory, setScreenHistory] = useState([]);
  
  // Transition state for smooth animations
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Loading state for lazy-loaded screens
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState(null);

  /**
   * Listen for navigate-to-dashboard events from ErrorBoundary
   */
  useEffect(() => {
    const handleNavigateToDashboard = () => {
      // Reset to dashboard on error recovery
      setScreenHistory([]);
      setActiveTabState('home');
      setIsTransitioning(false);
      setIsLoading(false);
      setCurrentScreen(SCREENS.DASHBOARD);
    };

    window.addEventListener('navigate-to-dashboard', handleNavigateToDashboard);
    
    return () => {
      window.removeEventListener('navigate-to-dashboard', handleNavigateToDashboard);
    };
  }, []);

  /**
   * Start loading state with timestamp
   */
  const startLoading = useCallback(() => {
    setIsLoading(true);
    setLoadingStartTime(Date.now());
  }, []);

  /**
   * End loading state with minimum display time
   * Prevents flash for fast-loading screens
   */
  const endLoading = useCallback(() => {
    if (loadingStartTime) {
      const elapsed = Date.now() - loadingStartTime;
      const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
        setLoadingStartTime(null);
      }, remaining);
    } else {
      setIsLoading(false);
    }
  }, [loadingStartTime]);

  /**
   * Push current screen to history stack before navigating
   * @param {string} screen - Screen to add to history
   */
  const pushToHistory = useCallback((screen) => {
    setScreenHistory((prev) => {
      const newHistory = [...prev, screen];
      // Limit history size
      if (newHistory.length > MAX_HISTORY_SIZE) {
        return newHistory.slice(-MAX_HISTORY_SIZE);
      }
      return newHistory;
    });
  }, []);

  /**
   * Navigate to a new screen with optional history tracking
   * @param {string} screen - Target screen to navigate to
   * @param {boolean} addToHistory - Whether to add current screen to history
   */
  const navigateTo = useCallback((screen, addToHistory = true) => {
    if (addToHistory && currentScreen !== SCREENS.DASHBOARD) {
      pushToHistory(currentScreen);
    }
    
    // Start loading for lazy-loaded screens
    startLoading();
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsTransitioning(false);
      // Loading will be ended by Suspense when component loads
    }, 50);
  }, [currentScreen, pushToHistory, startLoading]);

  /**
   * Reset to dashboard, clear history, reset activeTab to 'home'
   */
  const showDashboard = useCallback(() => {
    setScreenHistory([]);
    setActiveTabState('home');
    startLoading();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(SCREENS.DASHBOARD);
      setIsTransitioning(false);
    }, 50);
  }, [startLoading]);

  /**
   * Navigate to lesson screen
   */
  const showLessonRunner = useCallback(() => {
    navigateTo(SCREENS.LESSON);
  }, [navigateTo]);

  /**
   * Navigate to success screen
   */
  const showSuccess = useCallback(() => {
    navigateTo(SCREENS.SUCCESS);
  }, [navigateTo]);

  /**
   * Navigate to speed drill screen
   */
  const showSpeedDrill = useCallback(() => {
    navigateTo(SCREENS.SPEED_DRILL);
  }, [navigateTo]);

  /**
   * Navigate to drill complete screen
   */
  const showDrillComplete = useCallback(() => {
    navigateTo(SCREENS.DRILL_COMPLETE);
  }, [navigateTo]);

  /**
   * Navigate to voice mode screen
   * Also sets activeTab to 'voice' to keep bottom nav in sync
   */
  const showVoiceMode = useCallback(() => {
    setActiveTabState('voice');
    navigateTo(SCREENS.VOICE_MODE, false);
  }, [navigateTo]);

  /**
   * Navigate to active call screen
   */
  const startActiveCall = useCallback(() => {
    navigateTo(SCREENS.ACTIVE_CALL);
  }, [navigateTo]);

  /**
   * Return to voice mode screen (end call)
   */
  const endCall = useCallback(() => {
    // Pop from history if available, otherwise go to voice mode
    setScreenHistory((prev) => {
      if (prev.length > 0) {
        return prev.slice(0, -1);
      }
      return prev;
    });
    startLoading();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(SCREENS.VOICE_MODE);
      setIsTransitioning(false);
    }, 50);
  }, [startLoading]);

  /**
   * Navigate to review screen and set activeTab to 'review'
   */
  const showReviewScreen = useCallback(() => {
    setActiveTabState('review');
    navigateTo(SCREENS.REVIEW, false);
  }, [navigateTo]);

  // Ser/Estar flow navigation
  const showSerEstarConcept = useCallback(() => {
    navigateTo(SCREENS.SER_ESTAR_CONCEPT);
  }, [navigateTo]);

  const showSerEstarLogic = useCallback(() => {
    navigateTo(SCREENS.SER_ESTAR_LOGIC);
  }, [navigateTo]);

  const showSerEstarSpeaking = useCallback(() => {
    navigateTo(SCREENS.SER_ESTAR_SPEAKING);
  }, [navigateTo]);

  // Vocab drill flow navigation
  const showVocabDrillIntro = useCallback(() => {
    navigateTo(SCREENS.VOCAB_DRILL_INTRO);
  }, [navigateTo]);

  const showVocabTeachCard = useCallback(() => {
    navigateTo(SCREENS.VOCAB_TEACH_CARD);
  }, [navigateTo]);

  const showVocabSpeaking = useCallback(() => {
    navigateTo(SCREENS.VOCAB_SPEAKING);
  }, [navigateTo]);

  const showVocabListening = useCallback(() => {
    navigateTo(SCREENS.VOCAB_LISTENING);
  }, [navigateTo]);

  const showVocabSuccess = useCallback(() => {
    navigateTo(SCREENS.VOCAB_SUCCESS);
  }, [navigateTo]);

  // VIP survival flow navigation
  const showVIPSurvivalIntro = useCallback(() => {
    navigateTo(SCREENS.VIP_SURVIVAL_INTRO);
  }, [navigateTo]);

  const showVIPTeachShield = useCallback(() => {
    navigateTo(SCREENS.VIP_TEACH_SHIELD);
  }, [navigateTo]);

  const showVIPTeachBrake = useCallback(() => {
    navigateTo(SCREENS.VIP_TEACH_BRAKE);
  }, [navigateTo]);

  const showVIPTeachTool = useCallback(() => {
    navigateTo(SCREENS.VIP_TEACH_TOOL);
  }, [navigateTo]);

  const showVIPLogicCheck = useCallback(() => {
    navigateTo(SCREENS.VIP_LOGIC_CHECK);
  }, [navigateTo]);

  const showVIPSpeakingDrill = useCallback(() => {
    navigateTo(SCREENS.VIP_SPEAKING_DRILL);
  }, [navigateTo]);

  const showVIPScenarioSetup = useCallback(() => {
    navigateTo(SCREENS.VIP_SCENARIO_SETUP);
  }, [navigateTo]);

  const showVIPRoleplay = useCallback(() => {
    navigateTo(SCREENS.VIP_ROLEPLAY);
  }, [navigateTo]);

  const showVIPSuccess = useCallback(() => {
    navigateTo(SCREENS.VIP_SUCCESS);
  }, [navigateTo]);

  /**
   * Navigate to VIP access offer (sales) screen
   */
  const showVIPAccessOffer = useCallback(() => {
    navigateTo(SCREENS.VIP_ACCESS_OFFER);
  }, [navigateTo]);

  /**
   * Handle bottom nav tab changes
   * @param {string} tabValue - Tab value to switch to
   */
  const setActiveTab = useCallback((tabValue) => {
    setActiveTabState(tabValue);
    // Navigate to appropriate screen based on tab
    if (tabValue === 'home') {
      showDashboard();
    } else if (tabValue === 'review') {
      showReviewScreen();
    } else if (tabValue === 'voice') {
      navigateTo(SCREENS.VOICE_MODE, false);
    } else if (tabValue === 'profile' || tabValue === 'settings') {
      // Navigate to dashboard screen for profile/settings tabs
      // This ensures tapping Profile/Settings from any screen renders correctly
      startLoading();
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScreen(SCREENS.DASHBOARD);
        setIsTransitioning(false);
      }, 50);
    }
  }, [showDashboard, showReviewScreen, navigateTo, startLoading]);

  /**
   * Navigate to previous screen using history stack
   * If history is empty, go to dashboard
   */
  const goBack = useCallback(() => {
    setScreenHistory((prev) => {
      if (prev.length > 0) {
        const newHistory = prev.slice(0, -1);
        const previousScreen = prev[prev.length - 1];
        startLoading();
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentScreen(previousScreen);
          setIsTransitioning(false);
        }, 50);
        return newHistory;
      } else {
        // If no history, go to dashboard
        showDashboard();
        return [];
      }
    });
  }, [showDashboard, startLoading]);

  /**
   * Check if current screen should hide StatusBar and BottomNav
   * @param {string} screen - Screen to check (defaults to currentScreen)
   * @returns {boolean} - True if screen is full screen
   */
  const isFullScreen = useCallback((screen = currentScreen) => {
    return FULL_SCREEN_SCREENS.includes(screen);
  }, [currentScreen]);

  /**
   * Clear navigation state (for logout scenarios)
   */
  const clearNavigationState = useCallback(() => {
    setCurrentScreen(SCREENS.DASHBOARD);
    setActiveTabState('home');
    setScreenHistory([]);
    setIsTransitioning(false);
    setIsLoading(false);
    setLoadingStartTime(null);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    // State
    currentScreen,
    activeTab,
    screenHistory,
    isTransitioning,
    isLoading,
    
    // Loading control
    startLoading,
    endLoading,
    
    // Navigation functions
    showDashboard,
    showLessonRunner,
    showSuccess,
    showSpeedDrill,
    showDrillComplete,
    showVoiceMode,
    startActiveCall,
    endCall,
    showReviewScreen,
    
    // Ser/Estar flow
    showSerEstarConcept,
    showSerEstarLogic,
    showSerEstarSpeaking,
    
    // Vocab drill flow
    showVocabDrillIntro,
    showVocabTeachCard,
    showVocabSpeaking,
    showVocabListening,
    showVocabSuccess,
    
    // VIP survival flow
    showVIPSurvivalIntro,
    showVIPTeachShield,
    showVIPTeachBrake,
    showVIPTeachTool,
    showVIPLogicCheck,
    showVIPSpeakingDrill,
    showVIPScenarioSetup,
    showVIPRoleplay,
    showVIPSuccess,
    showVIPAccessOffer,
    
    // Tab and history navigation
    setActiveTab,
    goBack,
    
    // Helpers
    isFullScreen,
    clearNavigationState,
    navigateTo,
    pushToHistory,
  }), [
    currentScreen,
    activeTab,
    screenHistory,
    isTransitioning,
    isLoading,
    startLoading,
    endLoading,
    showDashboard,
    showLessonRunner,
    showSuccess,
    showSpeedDrill,
    showDrillComplete,
    showVoiceMode,
    startActiveCall,
    endCall,
    showReviewScreen,
    showSerEstarConcept,
    showSerEstarLogic,
    showSerEstarSpeaking,
    showVocabDrillIntro,
    showVocabTeachCard,
    showVocabSpeaking,
    showVocabListening,
    showVocabSuccess,
    showVIPSurvivalIntro,
    showVIPTeachShield,
    showVIPTeachBrake,
    showVIPTeachTool,
    showVIPLogicCheck,
    showVIPSpeakingDrill,
    showVIPScenarioSetup,
    showVIPRoleplay,
    showVIPSuccess,
    showVIPAccessOffer,
    setActiveTab,
    goBack,
    isFullScreen,
    clearNavigationState,
    navigateTo,
    pushToHistory,
  ]);

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;

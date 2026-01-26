import { useContext } from 'react';
import { NavigationContext, SCREENS } from '../context/NavigationContext.jsx';

/**
 * Custom hook to access navigation state and functions
 * Must be used within a NavigationProvider
 * 
 * @returns {Object} Navigation state and functions
 * @throws {Error} If used outside of NavigationProvider
 * 
 * @example
 * const { currentScreen, showDashboard, showLessonRunner } = useNavigation();
 * 
 * // Navigate to lesson
 * showLessonRunner();
 * 
 * // Check current screen
 * if (currentScreen === SCREENS.DASHBOARD) {
 *   // Do something
 * }
 */
export function useNavigation() {
  const context = useContext(NavigationContext);
  
  if (!context) {
    throw new Error(
      'useNavigation must be used within a NavigationProvider. ' +
      'Wrap your component tree with <NavigationProvider>.'
    );
  }
  
  return context;
}

/**
 * Re-export SCREENS constant for convenience
 * Allows importing both hook and screens from the same location
 * 
 * @example
 * import { useNavigation, SCREENS } from '../hooks/useNavigation';
 * 
 * if (currentScreen === SCREENS.DASHBOARD) { ... }
 */
export { SCREENS };

export default useNavigation;

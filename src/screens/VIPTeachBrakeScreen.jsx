import React from 'react';
import VIPTeachScreen from '../components/VIP/VIPTeachScreen';
import { useNavigation } from '../hooks/useNavigation.js';

/**
 * VIPTeachBrakeScreen - Second survival phrase: "Más despacio, por favor"
 * Uses useNavigation hook for navigation - no props required
 */
const VIPTeachBrakeScreen = () => {
  // Get navigation functions from context
  const { showVIPTeachShield, showVIPTeachTool } = useNavigation();

  return (
    <VIPTeachScreen
      currentStep={2}
      icon="🐌"
      iconBgColor="#FED7AA"
      spanishPhrase="Más despacio, por favor."
      englishTranslation="Slower, please."
      sofiaTip="When someone is talking too fast, use this phrase to slow them down. It's polite and effective."
      onBack={showVIPTeachShield}
      onNext={showVIPTeachTool}
    />
  );
};

export default VIPTeachBrakeScreen;

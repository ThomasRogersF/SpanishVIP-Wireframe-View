import React from 'react';
import VIPTeachScreen from '../components/VIP/VIPTeachScreen';
import { useNavigation } from '../hooks/useNavigation.js';

/**
 * VIPTeachToolScreen - Third survival phrase: "¿Cómo se dice...?"
 * Uses useNavigation hook for navigation - no props required
 */
const VIPTeachToolScreen = () => {
  // Get navigation functions from context
  const { showVIPTeachBrake, showVIPLogicCheck } = useNavigation();

  return (
    <VIPTeachScreen
      currentStep={3}
      icon="🪄"
      iconBgColor="#E9D5FF"
      spanishPhrase="¿Cómo se dice...?"
      englishTranslation="How do you say...?"
      exampleText="¿Cómo se dice 'Water'?"
      sofiaTip="This is your magic wand. When you don't know a word, ask how to say it. It keeps the conversation flowing."
      onBack={showVIPTeachBrake}
      onNext={showVIPLogicCheck}
    />
  );
};

export default VIPTeachToolScreen;

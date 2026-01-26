import React from 'react';
import { SvgIcon } from '@mui/material';
import VIPTeachScreen from '../components/VIP/VIPTeachScreen';
import { useNavigation } from '../hooks/useNavigation.js';

const ShieldIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
      fill="currentColor"
    />
  </SvgIcon>
);

/**
 * VIPTeachShieldScreen - First survival phrase: "No entiendo"
 * Uses useNavigation hook for navigation - no props required
 */
const VIPTeachShieldScreen = () => {
  // Get navigation functions from context
  const { showVIPSurvivalIntro, showVIPTeachBrake } = useNavigation();

  return (
    <VIPTeachScreen
      currentStep={1}
      icon={<ShieldIcon sx={{ fontSize: '72px', color: '#3B82F6' }} />}
      iconBgColor="#DBEAFE"
      spanishPhrase="No entiendo."
      englishTranslation="I don't understand."
      sofiaTip="Use this immediately when you are lost. It stops the conversation politely."
      onBack={showVIPSurvivalIntro}
      onNext={showVIPTeachBrake}
    />
  );
};

export default VIPTeachShieldScreen;

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MistakeCard from '../components/Review/MistakeCard';
import VocabCard from '../components/Review/VocabCard';
import { useNavigation } from '../hooks/useNavigation.js';

/**
 * TabPanel component for conditional content rendering
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to render
 * @param {number} props.value - Current active tab index
 * @param {number} props.index - This panel's tab index
 */
const TabPanel = ({ children, value, index }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ mt: 2 }}
    >
      {value === index && children}
    </Box>
  );
};

// Sample data for Mistakes tab
const mistakesData = [
  {
    id: 1,
    type: 'grammar',
    icon: '⚠️',
    wrongText: 'Yo quiero',
    correctText: 'Me regala',
    explanation: 'Use "Me regala" for polite requests in Colombia',
  },
  {
    id: 2,
    type: 'spelling',
    icon: '✏️',
    word: 'Avión',
    explanation: 'Remember the accent mark!',
  },
  {
    id: 3,
    type: 'pronunciation',
    icon: '🔊',
    word: 'Gracias',
    phonetic: 'GRAH-see-ahs',
    correction: 'Not "GRAH-shee-ahs"',
    explanation: 'The "c" before "i" sounds like "s" in Latin American Spanish',
  },
];

// Sample data for Vocabulary tab
const vocabularyData = [
  {
    id: 1,
    emoji: '☕',
    category: 'Food & Drink',
    word: 'Tinto',
    translation: 'Black coffee (Colombia)',
  },
  {
    id: 2,
    emoji: '🍞',
    category: 'Food & Drink',
    word: 'Pan',
    translation: 'Bread',
  },
  {
    id: 3,
    emoji: '💬',
    category: 'Phrases',
    word: 'Por favor',
    translation: 'Please',
  },
];

/**
 * ReviewScreen component - Main container with Mistakes and Vocabulary tabs
 * Uses useNavigation hook for navigation - no props required
 */
const ReviewScreen = () => {
  // Get navigation functions from context
  const { showDashboard } = useNavigation();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFixClick = (mistakeId) => {
    console.log('Fix clicked for mistake:', mistakeId);
    // Placeholder for future implementation
  };

  const handlePracticeClick = (vocabId) => {
    console.log('Practice clicked for vocab:', vocabId);
    // Placeholder for future implementation
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <Box
        sx={{
          px: 2.5,
          py: 3,
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <IconButton
          onClick={showDashboard}
          sx={{
            color: 'text.primary',
            ml: -1,
          }}
          aria-label="Back to dashboard"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Smart Review
        </Typography>
      </Box>

      {/* Tab Container */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Box
          sx={{
            bgcolor: 'grey.100',
            borderRadius: 6,
            p: 0.5,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            <Tab
              label="Mistakes"
              sx={{
                borderRadius: 6,
                fontWeight: 600,
                fontSize: '0.875rem',
                textTransform: 'none',
                minHeight: 40,
                bgcolor: activeTab === 0 ? 'white' : 'transparent',
                color: activeTab === 0 ? 'secondary.main' : 'text.secondary',
                boxShadow: activeTab === 0 ? 1 : 0,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: activeTab === 0 ? 'white' : 'grey.200',
                },
              }}
            />
            <Tab
              label="Vocabulary"
              sx={{
                borderRadius: 6,
                fontWeight: 600,
                fontSize: '0.875rem',
                textTransform: 'none',
                minHeight: 40,
                bgcolor: activeTab === 1 ? 'white' : 'transparent',
                color: activeTab === 1 ? 'secondary.main' : 'text.secondary',
                boxShadow: activeTab === 1 ? 1 : 0,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: activeTab === 1 ? 'white' : 'grey.200',
                },
              }}
            />
          </Tabs>
        </Box>
      </Box>

      {/* Content Area */}
      <Box
        sx={{
          px: 2.5,
          pb: 12,
          overflow: 'auto',
          flex: 1,
        }}
      >
        {/* Mistakes Tab Panel */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {mistakesData.map((mistake) => (
              <MistakeCard
                key={mistake.id}
                type={mistake.type}
                icon={mistake.icon}
                wrongText={mistake.wrongText}
                correctText={mistake.correctText}
                word={mistake.word}
                phonetic={mistake.phonetic}
                correction={mistake.correction}
                explanation={mistake.explanation}
                onFixClick={() => handleFixClick(mistake.id)}
              />
            ))}
          </Box>
        </TabPanel>

        {/* Vocabulary Tab Panel */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {vocabularyData.map((vocab) => (
              <VocabCard
                key={vocab.id}
                emoji={vocab.emoji}
                category={vocab.category}
                word={vocab.word}
                translation={vocab.translation}
                onPracticeClick={() => handlePracticeClick(vocab.id)}
              />
            ))}
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default ReviewScreen;

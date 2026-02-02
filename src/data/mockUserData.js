/**
 * Mock user data for Profile and Settings screens
 * Centralized data file following separation of concerns principle
 */

const mockUserData = {
  // Curriculum data - modules and lessons
  curriculum: {
    modules: [
      {
        id: 1,
        title: 'Getting Started',
        titleSpanish: 'Empezando',
        level: 'A0',
        lessons: [
          { id: 1, title: 'Greetings', completed: true, locked: false },
          { id: 2, title: 'Introductions', completed: true, locked: false },
          { id: 3, title: 'Numbers', completed: false, locked: false }
        ]
      },
      {
        id: 2,
        title: 'Ser vs Estar',
        titleSpanish: 'Ser vs Estar',
        level: 'A1',
        lessons: [
          { id: 1, title: 'Concept', completed: true, locked: false },
          { id: 2, title: 'Logic Check', completed: false, locked: false },
          { id: 3, title: 'Speaking Practice', completed: false, locked: false }
        ]
      },
      {
        id: 3,
        title: 'Travel',
        titleSpanish: 'Viajar',
        level: 'A2',
        lessons: [
          { id: 1, title: 'Travel Vocabulary', completed: false, locked: false },
          { id: 2, title: 'At the Airport', completed: false, locked: true },
          { id: 3, title: 'Video Lesson', completed: false, locked: true }
        ]
      },
      {
        id: 4,
        title: 'Conversations',
        titleSpanish: 'Conversaciones',
        level: 'A2-B1',
        lessons: [
          { id: 1, title: 'The Taxi Ride', type: 'voice', completed: false, locked: false },
          { id: 2, title: 'At the Restaurant', type: 'voice', completed: false, locked: true },
          { id: 3, title: 'Shopping', type: 'voice', completed: false, locked: true }
        ]
      }
    ]
  },

  // User profile data for ProfileHeader component
  // User profile data for ProfileHeader component
  userProfile: {
    name: 'Sofia Learner',
    username: '@sofialearner',
    joinDate: 'January 2024',
    friendCount: 12,
    avatarEmoji: '👤'
  },

  // Statistics data for StatisticsSection component
  statistics: {
    streak: 7,
    totalXP: 2450,
    currentLeague: 'Gold',
    topFinishes: 3
  },

  // Achievements data for AchievementsSection component
  achievements: [
    {
      id: 1,
      icon: '🔥',
      title: 'Week Warrior',
      description: 'Complete lessons for 7 days in a row',
      progress: 100,
      isLocked: false
    },
    {
      id: 2,
      icon: '📚',
      title: 'Vocabulary Master',
      description: 'Learn 100 new words',
      progress: 65,
      isLocked: false
    },
    {
      id: 3,
      icon: '🎯',
      title: 'Perfect Score',
      description: 'Complete a lesson with 100% accuracy',
      progress: 80,
      isLocked: false
    },
    {
      id: 4,
      icon: '🗣️',
      title: 'Conversation Pro',
      description: 'Complete 50 speaking exercises',
      progress: 40,
      isLocked: false
    },
    {
      id: 5,
      icon: '🏆',
      title: 'League Champion',
      description: 'Finish first in a weekly league',
      progress: 0,
      isLocked: true
    },
    {
      id: 6,
      icon: '⭐',
      title: 'XP Legend',
      description: 'Earn 10,000 total XP',
      progress: 0,
      isLocked: true
    }
  ],

  // Account settings data for SettingsScreen state initialization
  accountSettings: {
    name: 'Sofia Learner',
    username: 'sofialearner',
    email: 'sofia@example.com'
  },

  // Preferences data for SettingsScreen state initialization
  preferences: {
    soundEffects: true,
    animations: true,
    motivationalMessages: true,
    darkMode: 'auto'
  },

  // Dark mode options for SettingsSelect component
  darkModeOptions: [
    { value: 'auto', label: 'Auto' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ]
}

export default mockUserData

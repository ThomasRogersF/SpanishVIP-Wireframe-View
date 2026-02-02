/**
 * Module 4 Lesson Data - "The Taxi Ride" (Module 4, Lesson 1)
 *
 * Voice-based conversational lesson with Jorge the taxi driver.
 * Uses Gemini multimodal API for speech-to-text, text-to-speech, and AI conversation.
 */

const module4LessonData = {
  /**
   * Lesson 1 - Voice Conversation: The Taxi Ride
   * Full voice-based roleplay with Jorge the taxi driver
   */
  voiceLesson: {
    id: 'voice-lesson-m4l1',
    moduleNumber: 4,
    lessonNumber: 1,
    type: 'voiceLesson',
    title: 'The Taxi Ride',
    titleSpanish: 'El Viaje en Taxi',
    description: 'Practice real conversation skills with Jorge, your friendly taxi driver in Madrid.',
    descriptionSpanish: 'Practica habilidades de conversación real con Jorge, tu amable taxista en Madrid.',
    
    // Lesson metadata
    metadata: {
      duration: '10-15 minutes',
      difficulty: 'Intermediate',
      level: 'A2-B1',
      skills: ['Speaking', 'Listening', 'Conversation'],
      grammarFocus: 'Preterite vs Imperfect, Travel vocabulary',
      xpReward: 50
    },

    // Character information
    character: {
      name: 'Jorge',
      role: 'Taxi Driver',
      roleSpanish: 'Taxista',
      personality: 'Friendly, helpful, patient with language learners',
      location: 'Madrid, Spain',
      avatar: 'jorge', // References JorgeAvatar component
      description: 'Jorge is a Madrid taxi driver who loves helping tourists practice their Spanish.'
    },

    // Scenario details
    scenario: {
      title: 'Taking a Taxi in Madrid',
      titleSpanish: 'Tomando un Taxi en Madrid',
      setting: 'You just arrived at Madrid-Barajas Airport and need to get to your hotel in the city center.',
      settingSpanish: 'Acabas de llegar al Aeropuerto Madrid-Barajas y necesitas llegar a tu hotel en el centro de la ciudad.',
      imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=300&fit=crop',
      objectives: [
        'Greet Jorge and tell him your destination',
        'Answer questions about your trip',
        'Practice using preterite tense for completed actions',
        'Ask about travel time and cost',
        'Thank Jorge at the end of the ride'
      ]
    },

    // Learning objectives
    learningObjectives: [
      {
        id: 1,
        objective: 'Use preterite tense correctly for completed past actions',
        example: '"Llegué ayer" (I arrived yesterday) vs "Llegaba todos los días" (I used to arrive every day)'
      },
      {
        id: 2,
        objective: 'Navigate a real-world conversation with a taxi driver',
        example: 'Greeting, stating destination, asking questions, thanking'
      },
      {
        id: 3,
        objective: 'Use travel-related vocabulary in context',
        example: 'aeropuerto (airport), hotel, centro (center), equipaje (luggage)'
      },
      {
        id: 4,
        objective: 'Understand and respond to natural Spanish speech',
        example: 'Listen to Jorge\'s questions and respond appropriately'
      }
    ],

    // Vocabulary for this lesson
    vocabulary: [
      { spanish: 'el taxi', english: 'taxi', pronunciation: 'tahk-see' },
      { spanish: 'el taxista', english: 'taxi driver', pronunciation: 'tahk-SEE-stah' },
      { spanish: 'el aeropuerto', english: 'airport', pronunciation: 'ah-eh-roh-PWEHR-toh' },
      { spanish: 'el hotel', english: 'hotel', pronunciation: 'oh-TEHL' },
      { spanish: 'el centro', english: 'center/downtown', pronunciation: 'SEHN-troh' },
      { spanish: 'el equipaje', english: 'luggage', pronunciation: 'eh-kee-PAH-heh' },
      { spanish: 'la maleta', english: 'suitcase', pronunciation: 'mah-LEH-tah' },
      { spanish: 'llegar', english: 'to arrive', pronunciation: 'yeh-GAHR' },
      { spanish: 'viajar', english: 'to travel', pronunciation: 'bee-ah-HAHR' },
      { spanish: '¿Cuánto cuesta?', english: 'How much does it cost?', pronunciation: 'KWAHN-toh KWEHS-tah' },
      { spanish: '¿Cuánto tiempo?', english: 'How much time?', pronunciation: 'KWAHN-toh tee-EHM-poh' }
    ],

    // Grammar tips
    grammarTips: [
      {
        id: 1,
        title: 'Preterite vs Imperfect',
        explanation: 'Use preterite for completed actions: "Llegué ayer" (I arrived yesterday). Use imperfect for ongoing past actions or descriptions: "Viajaba mucho" (I used to travel a lot).',
        examples: [
          { correct: 'Llegué a Madrid ayer.', incorrect: 'Llegaba a Madrid ayer.', note: 'Specific completed action' },
          { correct: 'Viajé en avión.', incorrect: 'Viajaba en avión.', note: 'One-time completed trip' }
        ]
      },
      {
        id: 2,
        title: 'Asking Questions',
        explanation: 'Use question words at the beginning: ¿Cuánto? (How much?), ¿Dónde? (Where?), ¿Cuándo? (When?)',
        examples: [
          { spanish: '¿Cuánto cuesta el taxi?', english: 'How much does the taxi cost?' },
          { spanish: '¿Cuánto tiempo tarda?', english: 'How long does it take?' },
          { spanish: '¿Dónde está mi hotel?', english: 'Where is my hotel?' }
        ]
      }
    ],

    // Suggested phrases for the conversation
    suggestedPhrases: [
      {
        category: 'Greetings',
        phrases: [
          { spanish: 'Hola, buenos días.', english: 'Hello, good morning.' },
          { spanish: 'Buenas tardes.', english: 'Good afternoon.' },
          { spanish: 'Mucho gusto.', english: 'Nice to meet you.' }
        ]
      },
      {
        category: 'Stating Destination',
        phrases: [
          { spanish: 'Necesito ir al Hotel Plaza.', english: 'I need to go to Hotel Plaza.' },
          { spanish: 'Voy al centro de la ciudad.', english: 'I\'m going to the city center.' },
          { spanish: 'Mi hotel está en la calle Mayor.', english: 'My hotel is on Mayor Street.' }
        ]
      },
      {
        category: 'Answering Questions',
        phrases: [
          { spanish: 'Llegué ayer.', english: 'I arrived yesterday.' },
          { spanish: 'Llegué esta mañana.', english: 'I arrived this morning.' },
          { spanish: 'Es mi primera vez en Madrid.', english: 'It\'s my first time in Madrid.' },
          { spanish: 'Vine de vacaciones.', english: 'I came on vacation.' }
        ]
      },
      {
        category: 'Asking Questions',
        phrases: [
          { spanish: '¿Cuánto cuesta?', english: 'How much does it cost?' },
          { spanish: '¿Cuánto tiempo tarda?', english: 'How long does it take?' },
          { spanish: '¿Está lejos?', english: 'Is it far?' }
        ]
      },
      {
        category: 'Thanking',
        phrases: [
          { spanish: 'Muchas gracias.', english: 'Thank you very much.' },
          { spanish: 'Gracias por todo.', english: 'Thanks for everything.' },
          { spanish: 'Hasta luego.', english: 'See you later.' }
        ]
      }
    ],

    // Success criteria
    successCriteria: {
      minimumTurns: 5,
      requiredTopics: [
        'greeting',
        'destination',
        'trip_details'
      ],
      completionMessage: '¡Excelente trabajo! You successfully completed the taxi ride conversation with Jorge.',
      completionMessageSpanish: '¡Excelente trabajo! Completaste exitosamente la conversación del viaje en taxi con Jorge.'
    },

    // Hints that Jorge can provide during the conversation
    hints: [
      {
        id: 'greeting',
        trigger: 'user_silent_start',
        text: 'Try greeting Jorge! Say "Hola" or "Buenos días"',
        textSpanish: '¡Intenta saludar a Jorge! Di "Hola" o "Buenos días"'
      },
      {
        id: 'destination',
        trigger: 'needs_destination',
        text: 'Tell Jorge where you want to go. Try: "Necesito ir al hotel..."',
        textSpanish: 'Dile a Jorge a dónde quieres ir. Intenta: "Necesito ir al hotel..."'
      },
      {
        id: 'preterite',
        trigger: 'grammar_error_imperfect',
        text: 'Remember: Use preterite for completed actions. "Llegué" (I arrived), not "Llegaba"',
        textSpanish: 'Recuerda: Usa pretérito para acciones completadas. "Llegué" (I arrived), no "Llegaba"'
      }
    ],

    // Feedback messages
    feedback: {
      excellent: {
        spanish: '¡Excelente! Tu español es muy bueno.',
        english: 'Excellent! Your Spanish is very good.'
      },
      good: {
        spanish: '¡Muy bien! Estás progresando.',
        english: 'Very good! You\'re making progress.'
      },
      needsWork: {
        spanish: 'Buen intento. Sigue practicando.',
        english: 'Good try. Keep practicing.'
      }
    }
  }
};

export default module4LessonData;

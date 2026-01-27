/**
 * Travel Lesson Data - "Vamos a Viajar" (Module 3, Lesson 1)
 *
 * Contains structured data for all 10 travel lesson activities.
 * Each activity type has its own data structure optimized for the component that will consume it.
 */

const travelLessonData = {
  /**
   * Activity 1 - Image Select
   * User selects the correct image matching the Spanish vocabulary word
   */
  imageSelect: {
    id: 'travel-image-select',
    activityNumber: 1,
    totalActivities: 10,
    type: 'imageSelect',
    prompt: '¿Cuál de estas imágenes representa "La Maleta"?',
    promptTranslation: 'Which of these images represents "The Suitcase"?',
    options: [
      {
        id: 'A',
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop',
        altText: 'Airplane flying in the sky',
        label: 'A'
      },
      {
        id: 'B',
        imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=300&h=200&fit=crop',
        altText: 'Travel suitcase/luggage',
        label: 'B'
      },
      {
        id: 'C',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
        altText: 'Hotel room with bed',
        label: 'C'
      },
      {
        id: 'D',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=200&fit=crop',
        altText: 'Road trip highway view',
        label: 'D'
      }
    ],
    correctAnswer: 'B',
    feedback: {
      correct: '¡Perfecto! "La Maleta" means "The Suitcase".',
      incorrect: 'Not quite. "La Maleta" means "The Suitcase" - the travel luggage.'
    }
  },

  /**
   * Activity 2 - Tap the Pair
   * User matches Spanish words with their English translations
   */
  tapPair: {
    id: 'travel-tap-pair',
    activityNumber: 2,
    totalActivities: 10,
    type: 'tapPair',
    instruction: 'Tap matching pairs to connect Spanish words with their English translations.',
    pairs: [
      { id: 1, spanish: 'Viaje', english: 'Trip' },
      { id: 2, spanish: 'Vuelo', english: 'Flight' },
      { id: 3, spanish: 'Alojamiento', english: 'Accommodation' },
      { id: 4, spanish: 'Aduana', english: 'Customs' },
      { id: 5, spanish: 'Boleto', english: 'Ticket' }
    ],
    feedback: {
      allMatched: '¡Excelente! You matched all the travel vocabulary correctly!',
      partialMatch: 'Keep going! Match the remaining pairs.'
    }
  },

  /**
   * Activity 3 - Translation (Multiple Choice)
   * User selects the correct Spanish translation
   */
  translation: {
    id: 'travel-translation',
    activityNumber: 3,
    totalActivities: 10,
    type: 'translation',
    question: 'How do you say "I need a reservation"?',
    options: [
      { id: 'A', text: 'Necesito una reserva.', isCorrect: true },
      { id: 'B', text: 'Necesito una maleta.', isCorrect: false },
      { id: 'C', text: 'Tengo un destino.', isCorrect: false }
    ],
    correctAnswer: 'A',
    feedback: {
      correct: '¡Muy bien! "Necesito una reserva" is the correct translation.',
      incorrect: 'The correct answer is "Necesito una reserva." - "reserva" means reservation.'
    }
  },

  /**
   * Activity 4 - True/False
   * User evaluates if the Spanish sentence is grammatically correct
   */
  trueFalse: {
    id: 'travel-true-false',
    activityNumber: 4,
    totalActivities: 10,
    type: 'trueFalse',
    statement: 'Me gusta visitar la Canadá',
    statementTranslation: '"I like to visit (the) Canada"',
    correctAnswer: false,
    explanation: 'Countries generally do not take definite articles (la/el) unless specified. It should be "Me gusta visitar Canadá" without the article.',
    feedback: {
      correct: '¡Correcto! Most country names in Spanish don\'t require articles.',
      incorrect: 'Actually, this sentence is incorrect. Most countries don\'t use articles - it should be "Me gusta visitar Canadá".'
    }
  },

  /**
   * Activity 5 - Sentence Builder
   * User arranges scrambled words to form a correct sentence
   */
  sentenceBuilder: {
    id: 'travel-sentence-builder',
    activityNumber: 5,
    totalActivities: 10,
    type: 'sentenceBuilder',
    instruction: 'Arrange the words to form a correct sentence:',
    targetSentence: 'Yo viajé a España el año pasado',
    targetTranslation: 'I traveled to Spain last year',
    scrambledWords: [
      { id: 0, word: 'viajé', isDistractor: false },
      { id: 1, word: 'el', isDistractor: false },
      { id: 2, word: 'Yo', isDistractor: false },
      { id: 3, word: 'España', isDistractor: false },
      { id: 4, word: 'año', isDistractor: false },
      { id: 5, word: 'a', isDistractor: false },
      { id: 6, word: 'pasado', isDistractor: false },
      { id: 7, word: 'viajaba', isDistractor: true }
    ],
    correctOrder: [2, 0, 5, 3, 1, 4, 6], // Yo viajé a España el año pasado
    distractorNote: '"viajaba" is the imperfect tense (used for ongoing past actions), but we need "viajé" (preterite) for a completed action.',
    feedback: {
      correct: '¡Perfecto! You used the preterite "viajé" correctly for a completed past action.',
      incorrect: 'Check the word order. Remember: "viajé" (not "viajaba") is correct for a specific completed trip.'
    }
  },

  /**
   * Activity 6 - Fill-in-the-Blank
   * User selects the correct verb form to complete the sentence
   */
  fillBlank: {
    id: 'travel-fill-blank',
    activityNumber: 6,
    totalActivities: 10,
    type: 'fillBlank',
    sentence: 'Ayer, nosotros ______ (buy) los boletos.',
    sentenceTranslation: 'Yesterday, we ______ (buy) the tickets.',
    blankPosition: 2, // Word index where blank appears
    options: [
      { id: 'A', text: 'compramos', isCorrect: true },
      { id: 'B', text: 'comprábamos', isCorrect: false },
      { id: 'C', text: 'compra', isCorrect: false }
    ],
    correctAnswer: 'compramos',
    explanation: 'Specific completed action → Preterite. "Ayer" (yesterday) signals a completed action, so we use the preterite tense "compramos".',
    feedback: {
      correct: '¡Excelente! "Compramos" (preterite) is correct because "ayer" indicates a completed action.',
      incorrect: 'The correct answer is "compramos". Since "ayer" indicates a specific, completed action, we use the preterite tense.'
    }
  },

  /**
   * Activity 7 - Audio Transcription
   * User listens to audio and types what they hear
   */
  audioTranscription: {
    id: 'travel-audio-transcription',
    activityNumber: 7,
    totalActivities: 10,
    type: 'audioTranscription',
    instruction: 'Listen to the audio and type exactly what you hear.',
    audioContent: 'El vuelo sale a las tres de la tarde.',
    audioTranslation: 'The flight leaves at three in the afternoon.',
    audioUrl: '/audio/travel-lesson/vuelo-sale.mp3', // Placeholder URL
    acceptedAnswers: [
      'El vuelo sale a las tres de la tarde.',
      'El vuelo sale a las tres de la tarde',
      'el vuelo sale a las tres de la tarde.',
      'el vuelo sale a las tres de la tarde'
    ],
    caseSensitive: false,
    feedback: {
      correct: '¡Muy bien! Your transcription is perfect.',
      incorrect: 'Listen again. The sentence is: "El vuelo sale a las tres de la tarde."'
    }
  },

  /**
   * Activity 8 - Speaking Drill
   * User reads and speaks a sentence aloud
   */
  speakingDrill: {
    id: 'travel-speaking-drill',
    activityNumber: 8,
    totalActivities: 10,
    type: 'speakingDrill',
    instruction: 'Read the sentence aloud clearly.',
    displayText: 'Necesito mi pasaporte para pasar la aduana.',
    displayTranslation: 'I need my passport to go through customs.',
    expectedOutput: 'Necesito mi pasaporte para pasar la aduana',
    matchTolerance: 0.85, // 85% match required
    pronunciationTips: [
      'pasaporte: pah-sah-POR-teh',
      'aduana: ah-DWAH-nah'
    ],
    feedback: {
      correct: '¡Fantástico! Your pronunciation is clear and accurate.',
      partial: 'Good attempt! Try speaking a bit more clearly.',
      incorrect: 'Let\'s try again. Focus on pronouncing each syllable clearly.'
    }
  },

  /**
   * Activity 9 - Audio Discrimination
   * User listens and identifies which word they heard
   */
  audioDiscrimination: {
    id: 'travel-audio-discrimination',
    activityNumber: 9,
    totalActivities: 10,
    type: 'audioDiscrimination',
    instruction: 'Listen carefully and select the word you hear.',
    audioContent: 'Destino',
    audioUrl: '/audio/travel-lesson/destino.mp3', // Placeholder URL
    options: [
      { 
        id: 'A', 
        word: 'Destino', 
        meaning: 'Destiny/Destination',
        isCorrect: true 
      },
      { 
        id: 'B', 
        word: 'Desatino', 
        meaning: 'Mistake/Blunder',
        isCorrect: false 
      }
    ],
    correctAnswer: 'Destino',
    explanation: 'Notice the difference: "Destino" (des-TEE-no) vs "Desatino" (des-ah-TEE-no). The extra syllable "a" changes the meaning completely!',
    feedback: {
      correct: '¡Perfecto! You correctly identified "Destino" (destination).',
      incorrect: 'The word was "Destino" (destination), not "Desatino" (mistake). Listen for the number of syllables!'
    }
  },

  /**
   * Activity 10 - Roleplay
   * User engages in a conversational scenario with AI
   */
  roleplay: {
    id: 'travel-roleplay',
    activityNumber: 10,
    totalActivities: 10,
    type: 'roleplay',
    scenario: {
      title: 'Airport Check-in Desk',
      description: 'Practice checking in for your flight at the airport.',
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=300&fit=crop',
      location: 'Madrid-Barajas Airport'
    },
    systemPrompt: `You are an airport check-in agent at Madrid-Barajas Airport. You are polite but efficient. 
Your tasks:
1. Greet the passenger warmly
2. Ask for their passport
3. Ask where they are flying today
4. If they make a grammar mistake with Preterite vs Imperfect, gently correct them in parentheses but continue the roleplay
5. Confirm their destination and wish them a good flight

Keep responses short and natural. Respond in Spanish with occasional helpful translations in parentheses for key vocabulary.`,
    userMission: 'You are at the airport check-in desk. Tell the agent you are flying to Madrid and give them your passport. Try to use complete sentences in Spanish!',
    starterMessage: {
      role: 'agent',
      spanish: '¡Buenos días! Bienvenido a Iberia Airlines. ¿En qué puedo ayudarle hoy?',
      english: 'Good morning! Welcome to Iberia Airlines. How can I help you today?'
    },
    suggestedResponses: [
      'Hola, quiero viajar a Madrid.',
      'Buenos días. Tengo un vuelo a Madrid.',
      'Aquí está mi pasaporte. Viajo a Madrid.'
    ],
    exampleConversation: [
      {
        role: 'agent',
        text: '¡Buenos días! Bienvenido a Iberia Airlines. ¿En qué puedo ayudarle hoy?'
      },
      {
        role: 'user',
        text: 'Hola, yo viajaba a Madrid. Aquí está mi pasaporte.',
        correction: '(pequeña corrección: "viajo" en presente, o "voy a viajar" - you\'re traveling now, not describing a past habit!)'
      },
      {
        role: 'agent',
        text: 'Perfecto, gracias por su pasaporte. Veo que su vuelo (flight) sale a las 14:30. ¿Tiene equipaje (luggage) para facturar?'
      }
    ],
    grammarFocus: 'Preterite vs Imperfect - Remember to use present tense for current actions!',
    feedback: {
      complete: '¡Excelente trabajo! You successfully completed the airport check-in roleplay.',
      encouragement: 'Great effort! Keep practicing to improve your conversational Spanish.'
    }
  }
};

export default travelLessonData;

/**
 * Module Guidebook Data
 *
 * This file contains the content for module-specific guidebooks.
 *
 * Schema:
 * - guidebook_id: String identifier
 * - title: String
 * - description: String
 * - sections: Array of content blocks
 *
 * Section Types:
 * 1. Text Block: { type: "text", heading: String, body: String }
 * 2. Vocab List: { type: "vocab_list", heading: String, items: Array<{ es, en, audio_url }> }
 * 3. Table: { type: "table", heading: String, headers: Array<String>, rows: Array<Array<String>> }
 * 4. Tip Box: { type: "tip_box", content: String }
 */

const moduleGuidebooks = {
  "guide_m1": {
    guidebook_id: "guide_m1",
    title: "Greetings & Spanish Basics",
    description: "Master essential greetings, introductions, and foundational Spanish phrases.",
    sections: [
      {
        type: "tip_box",
        content: "💡 Quick Tip: In Spanish, we have two ways to say 'you': 'Tú' (informal, for friends/family) and 'Usted' (formal, for strangers/elders)."
      },
      {
        type: "vocab_list",
        heading: "Common Greetings",
        items: [
          {
            es: "Hola",
            en: "Hello",
            audio_url: "/audio/guidebooks/hola.mp3"
          },
          {
            es: "Buenos días",
            en: "Good morning",
            audio_url: "/audio/guidebooks/buenos_dias.mp3"
          },
          {
            es: "Buenas tardes",
            en: "Good afternoon",
            audio_url: "/audio/guidebooks/buenas_tardes.mp3"
          },
          {
            es: "Buenas noches",
            en: "Good evening/night",
            audio_url: "/audio/guidebooks/buenas_noches.mp3"
          },
          {
            es: "¿Cómo estás?",
            en: "How are you?",
            audio_url: "/audio/guidebooks/como_estas.mp3"
          }
        ]
      },
      {
        type: "table",
        heading: "Subject Pronouns",
        headers: ["Pronoun (ES)", "Pronoun (EN)", "Example"],
        rows: [
          ["Yo", "I", "Yo soy..."],
          ["Tú", "You (informal)", "Tú eres..."],
          ["Él", "He", "Él es..."],
          ["Ella", "She", "Ella es..."],
          ["Nosotros", "We", "Nosotros somos..."],
          ["Ellos", "They", "Ellos son..."]
        ]
      },
      {
        type: "text",
        heading: "Making Introductions",
        body: "To introduce yourself, you can say 'Me llamo [Name]' (My name is...) or 'Soy [Name]' (I am...). To say where you are from, use 'Soy de [Country/City]'."
      }
    ]
  },
  "guide_m2": {
    guidebook_id: "guide_m2",
    title: "Cafe Culture & Ser vs Estar",
    description: "Navigate Spanish cafes and master the difference between Ser and Estar.",
    sections: [
      {
        type: "text",
        heading: "Understanding Ser vs Estar",
        body: "Both 'Ser' and 'Estar' mean 'to be', but they are used differently. 'Ser' is generally used for permanent characteristics (identity, origin, time), while 'Estar' is used for temporary states (emotions, location, conditions)."
      },
      {
        type: "table",
        heading: "Conjugation: Ser vs Estar",
        headers: ["Pronoun", "Ser (To Be)", "Estar (To Be)"],
        rows: [
          ["Yo", "Soy", "Estoy"],
          ["Tú", "Eres", "Estás"],
          ["Él/Ella", "Es", "Está"],
          ["Nosotros", "Somos", "Estamos"],
          ["Ellos", "Son", "Están"]
        ]
      },
      {
        type: "vocab_list",
        heading: "Cafe Vocabulary",
        items: [
          {
            es: "El Café",
            en: "Coffee",
            audio_url: "/audio/guidebooks/cafe.mp3"
          },
          {
            es: "El Té",
            en: "Tea",
            audio_url: "/audio/guidebooks/te.mp3"
          },
          {
            es: "La Cuenta",
            en: "The Bill",
            audio_url: "/audio/guidebooks/cuenta.mp3"
          },
          {
            es: "El Menú",
            en: "The Menu",
            audio_url: "/audio/guidebooks/menu.mp3"
          },
          {
            es: "El Camarero",
            en: "The Waiter",
            audio_url: "/audio/guidebooks/camarero.mp3"
          }
        ]
      },
      {
        type: "tip_box",
        content: "💡 Memory Trick: Use DOCTOR for Ser (Description, Occupation, Characteristic, Time, Origin, Relationship) and PLACE for Estar (Position, Location, Action, Condition, Emotion)."
      }
    ]
  },
  "guide_m3": {
    guidebook_id: "guide_m3",
    title: "Travel & The Past Tense",
    description: "Learn how to narrate your travel stories using the two past tenses.",
    sections: [
      {
        type: "tip_box",
        content: "💡 Quick Rule: Use Preterite for 'snapshots' (completed actions) and Imperfect for 'video recordings' (ongoing actions)."
      },
      {
        type: "text",
        heading: "The Preterite (Indefinido)",
        body: "Use this tense for actions that have a clear beginning and end."
      },
      {
        type: "text",
        heading: "The Imperfect (Imperfecto)",
        body: "Use this tense for ongoing or habitual past actions and background descriptions."
      },
      {
        type: "table",
        heading: "Conjugation: Hablar (To Speak)",
        headers: ["Pronoun", "Preterite", "Imperfect"],
        rows: [
          ["Yo", "Hablé", "Hablaba"],
          ["Tú", "Hablaste", "Hablabas"],
          ["Él/Ella", "Habló", "Hablaba"],
          ["Nosotros", "Hablamos", "Hablábamos"],
          ["Ellos", "Hablaron", "Hablaban"]
        ]
      },
      {
        type: "vocab_list",
        heading: "Airport Vocabulary",
        items: [
          {
            es: "El Vuelo",
            en: "The Flight",
            audio_url: "/audio/guidebooks/vuelo.mp3"
          },
          {
            es: "La Maleta",
            en: "The Suitcase",
            audio_url: "/audio/guidebooks/maleta.mp3"
          },
          {
            es: "Aduana",
            en: "Customs",
            audio_url: "/audio/guidebooks/aduana.mp3"
          }
        ]
      }
    ]
  }
};

export default moduleGuidebooks;

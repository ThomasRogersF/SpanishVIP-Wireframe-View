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
  "guide_b1_u01": {
    guidebook_id: "guide_b1_u01",
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

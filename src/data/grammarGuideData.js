/**
 * Grammar Guide Data
 * 
 * This file contains grammar guide configurations for the GrammarGuidebook component.
 * Each guide has a unit_id, title, and an array of cards.
 * 
 * Card types:
 * - "concept": Introductory card with headline, text, and icon
 * - "rule": Detailed rule card with headline, text, example_spanish, example_english, and audio_url
 */

const grammarGuides = {
  modal_03_L2_mod_03: {
    unit_id: "modal_03_L2_mod_03",
    title: "Grammar Guide: The Two Pasts",
    cards: [
      {
        type: "concept",
        headline: "The Two Pasts",
        text: "Spanish has two past tenses: the preterite (a snapshot of a completed action) and the imperfect (a video of ongoing or habitual actions). Understanding when to use each is key to expressing yourself naturally.",
        icon: "📷🎥"
      },
      {
        type: "rule",
        headline: "Preterite (The Snapshot)",
        text: "Use the preterite for completed actions with a clear beginning and end. Think of it as taking a photo of a single moment in time.",
        example_spanish: "Ayer compré pan.",
        example_english: "Yesterday I bought bread.",
        audio_url: "/audio/grammar-guides/audio_preterite_example.mp3"
      },
      {
        type: "rule",
        headline: "Imperfect (The Video)",
        text: "Use the imperfect for ongoing, habitual, or background actions in the past. Think of it as filming a continuous scene.",
        example_spanish: "Yo siempre compraba pan.",
        example_english: "I always used to buy bread.",
        audio_url: "/audio/grammar-guides/audio_imperfect_example.mp3"
      }
    ]
  }
}

export default grammarGuides

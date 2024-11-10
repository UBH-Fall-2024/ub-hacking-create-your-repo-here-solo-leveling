// Implementing the constants from project.md
export const CHARACTER_TYPES = {
  OVERPOWERED_MENTOR: {
    name: 'Overpowered Mentor',
    examples: 'Gojo Satoru, Kakashi',
    traits: ['overwhelming power', 'laid-back', 'teaching']
  },
  GENIUS_STRATEGIST: {
    name: 'Genius Strategist',
    examples: 'Lelouch, L, Light',
    traits: ['strategic', 'calculating', 'brilliant']
  },
  DETERMINED_UNDERDOG: {
    name: 'Determined Underdog',
    examples: 'Deku, Rock Lee',
    traits: ['hardworking', 'persistent', 'growth']
  },
  CHAOTIC_ANTIHERO: {
    name: 'Chaotic Antihero',
    examples: 'Gintoki, Vegeta',
    traits: ['unpredictable', 'complex morality', 'powerful']
  }
} as const;

export const UNIVERSE_SETTINGS = {
  BATTLE_ANIME: {
    name: 'Battle Anime World',
    variants: ['Dragon Ball Z', 'Naruto', 'Jujutsu Kaisen', 'Hero Academia'],
    elements: ['power scaling', 'training', 'epic battles']
  },
  CYBERPUNK: {
    name: 'Cyberpunk Future',
    variants: ['Neo Tokyo', 'Corporate Dystopia', 'Digital Wasteland'],
    elements: ['high tech', 'corporations', 'street life']
  },
  MAGICAL_ACADEMY: {
    name: 'Magical Academy',
    variants: ['Ancient School', 'Modern Magic University', 'Secret Training Grounds'],
    elements: ['spell learning', 'magical research', 'student life']
  },
  COSMIC_HORROR: {
    name: 'Cosmic Horror',
    variants: ['Eldritch Reality', 'Modern Occult', 'Ancient Mysteries'],
    elements: ['forbidden knowledge', 'cosmic entities', 'sanity']
  }
} as const;

export const NARRATIVE_STYLES = {
  EPIC_SHONEN: {
    name: 'Epic Shonen Style',
    tone: 'Energetic and dramatic with hype moments',
    elements: ['power-ups', 'dramatic reveals', 'epic speeches']
  },
  COMEDY_ACTION: {
    name: 'Comedy Action',
    tone: 'Light-hearted with badass moments',
    elements: ['witty banter', 'comedic timing', 'cool scenes']
  },
  DARK_TACTICAL: {
    name: 'Dark Tactical',
    tone: 'Serious and strategic',
    elements: ['detailed planning', 'psychological elements', 'clever solutions']
  },
  MYSTERIOUS_SUPERNATURAL: {
    name: 'Mysterious Supernatural',
    tone: 'Enigmatic and otherworldly',
    elements: ['hidden meanings', 'supernatural elements', 'revelations']
  }
} as const; 
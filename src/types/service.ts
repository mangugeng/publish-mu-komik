export interface ArtStyle {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  examples: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Background {
  id: string;
  name: string;
  type: string;
  isPro: boolean;
  thumbnail: string;
  parameters: {
    description: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Character {
  id: string;
  name: string;
  type: string;
  isPro: boolean;
  thumbnail: string;
  parameters: {
    description: string;
    physical: string;
    clothing?: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  name: string;
  type: string;
  isPro: boolean;
  thumbnail: string;
  parameters: {
    description: string;
    year: string;
    specialFeatures: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Dialog {
  id: string;
  characterId: string;
  text: string;
  bubbleType: "speech" | "thought" | "whisper" | "shout";
  emotion: string;
  createdAt: string;
  updatedAt: string;
}

export interface Effect {
  id: string;
  name: string;
  description: string;
  type: "sound" | "visual" | "transition";
  createdAt: string;
  updatedAt: string;
}

export interface ComicCharacter {
  id: string;
  name: string;
  physical: string;
  clothing?: string;
  isBackground: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ComicScene {
  id: string;
  title: string;
  description: string;
  characters: string[];
  background: string;
  style: string;
  effects: string[];
}

export interface ComicData {
  characters: Character[];
  scenes: ComicScene[];
}

export interface BackgroundType {
  id: string;
  name: string;
  type: string;
  isPro: boolean;
  thumbnail: string;
  parameters: {
    description: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyType {
  id: string;
  name: string;
  type: string;
  isPro: boolean;
  thumbnail: string;
  parameters: {
    description: string;
    year: string;
    specialFeatures: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ArtStyleType {
  id: string;
  name: string;
  type: string;
  isPro: boolean;
  thumbnail: string;
  parameters: {
    description: string;
    characteristics: string[];
    examples: string[];
    createdAt: string;
  };
} 
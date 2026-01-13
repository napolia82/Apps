
export type Language = 'en' | 'zh-TW' | 'zh-CN' | 'ja' | 'ko' | 'de' | 'fr' | 'es';

export interface SoundItem {
  id: string;
  name: { [key in Language]: string };
  category: 'coffee' | 'nature' | 'instruments' | 'cafe';
  url: string;
  icon: string;
}

export interface ActiveSound {
  id: string;
  volume: number;
}

export interface CoffeeSpecs {
  beanName: string;
  roast: string;
  temp: string;
  ratio: string;
}

export interface MeditationEntry {
  id: string;
  timestamp: number;
  duration: number;
  reflection: string;
  statusText?: string;
  imageUrl?: string;
  sounds: string[];
  coffeeSpecs?: CoffeeSpecs; // 新增沖煮參數
}

export type AppState = 'idle' | 'preparing' | 'meditating' | 'summary' | 'history';

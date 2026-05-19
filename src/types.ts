export type Language = 'zh' | 'en';

export type CelestialType = 'planet' | 'star' | 'galaxy-region';

export type LocalizedText = {
  zh: string;
  en: string;
};

export type CelestialObject = {
  id: string;
  type: CelestialType;
  name: LocalizedText;
  summary: LocalizedText;
  facts: Record<string, LocalizedText>;
  visual: {
    color: string;
    emissive?: string;
    size: number;
    position: [number, number, number];
    orbitRadius?: number;
    orbitSpeed?: number;
    orbitTilt?: number;
  };
};

export type SectionId = 'galaxy' | 'solar' | 'planets' | 'stars';

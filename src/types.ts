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
    texture?: string;
    ringTexture?: string;
    size: number;
    position: [number, number, number];
    orbitRadius?: number;
    orbitSpeed?: number;
    orbitTilt?: number;
    rotationSpeed?: number;
    roughness?: number;
    metalness?: number;
    moons?: Array<{
      name: LocalizedText;
      color: string;
      size: number;
      orbitRadius: number;
      orbitSpeed: number;
    }>;
  };
};

export type SectionId = 'galaxy' | 'solar' | 'planets' | 'stars';

import type { Language, SectionId } from '../types';

type Copy = Record<string, Record<Language, string>>;

export const ui: Copy = {
  subtitle: {
    zh: '互動式銀河系科普探索站',
    en: 'Interactive Milky Way Knowledge Base',
  },
  intro: {
    zh: '拖曳旋轉、滾輪縮放，點擊天體開啟資料面板。',
    en: 'Drag to orbit, scroll to zoom, and select an object to open its dossier.',
  },
  selected: { zh: '目標資料', en: 'Object Dossier' },
  noSelection: { zh: '選擇一個天體開始探索。', en: 'Select a celestial object to begin exploring.' },
  filters: { zh: '篩選', en: 'Filters' },
  all: { zh: '全部', en: 'All' },
  planet: { zh: '行星', en: 'Planets' },
  star: { zh: '恆星', en: 'Stars' },
  'galaxy-region': { zh: '銀河結構', en: 'Galaxy Regions' },
  speed: { zh: '軌道速度', en: 'Orbit Speed' },
  performance: { zh: '低效能模式', en: 'Low Power' },
  facts: { zh: '關鍵數據', en: 'Key Facts' },
  compare: { zh: '行星比較', en: 'Planet Compare' },
  lifecycle: { zh: '恆星生命週期', en: 'Stellar Life Cycle' },
  galaxyMap: { zh: '銀河定位', en: 'Galaxy Position' },
};

export const sections: Array<{
  id: SectionId;
  label: Record<Language, string>;
  description: Record<Language, string>;
}> = [
  {
    id: 'galaxy',
    label: { zh: 'Galaxy', en: 'Galaxy' },
    description: {
      zh: '從銀河核心到獵戶臂，理解太陽系在銀河中的位置。',
      en: 'Trace the core and Orion Arm to understand where the Solar System sits.',
    },
  },
  {
    id: 'solar',
    label: { zh: 'Solar System', en: 'Solar System' },
    description: {
      zh: '觀察太陽與八大行星的比例、軌道與互動資料。',
      en: 'Explore the Sun, eight planets, orbital motion, and object dossiers.',
    },
  },
  {
    id: 'planets',
    label: { zh: 'Planets', en: 'Planets' },
    description: {
      zh: '比較行星大小、距離、週期與環境特色。',
      en: 'Compare planetary sizes, distances, periods, and environments.',
    },
  },
  {
    id: 'stars',
    label: { zh: 'Stars', en: 'Stars' },
    description: {
      zh: '認識主序星、紅巨星與藍超巨星等恆星類型。',
      en: 'Meet main-sequence stars, red giants, blue supergiants, and stellar stages.',
    },
  },
];

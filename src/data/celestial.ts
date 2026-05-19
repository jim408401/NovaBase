import type { CelestialObject, SectionId } from '../types';

export const celestialObjects: CelestialObject[] = [
  {
    id: 'galactic-core',
    type: 'galaxy-region',
    name: { zh: '銀河核心', en: 'Galactic Core' },
    summary: {
      zh: '銀河系中心充滿密集恆星、氣體與強烈重力，是整座星系最明亮也最神祕的區域。',
      en: 'The Milky Way core is dense with stars, gas, and intense gravity, forming the brightest and most mysterious region of the galaxy.',
    },
    facts: {
      '中心距離': { zh: '距太陽約 26,000 光年', en: 'About 26,000 light-years from the Sun' },
      '主要特徵': { zh: '包含超大質量黑洞人馬座 A*', en: 'Hosts the supermassive black hole Sagittarius A*' },
      '觀測方式': { zh: '多以紅外線、電波與 X 射線觀測', en: 'Often studied through infrared, radio, and X-ray observations' },
    },
    visual: { color: '#ffd166', emissive: '#ff9f1c', size: 1.55, position: [0, 0, 0] },
  },
  {
    id: 'orion-arm',
    type: 'galaxy-region',
    name: { zh: '獵戶臂', en: 'Orion Arm' },
    summary: {
      zh: '太陽系所在的銀河旋臂支段，像是一條穿過深空的恆星河流。',
      en: 'The spiral-arm segment that contains our Solar System, like a river of stars through deep space.',
    },
    facts: {
      '所在位置': { zh: '位於英仙臂與人馬臂之間', en: 'Between the Perseus and Sagittarius arms' },
      '太陽位置': { zh: '太陽系位在獵戶臂內側附近', en: 'The Solar System sits near the inner side of the Orion Arm' },
      '尺度': { zh: '長度約數千光年', en: 'Several thousand light-years long' },
    },
    visual: { color: '#7bdff2', emissive: '#19c3ff', size: 0.62, position: [5.5, 0.18, -2.4] },
  },
  {
    id: 'sun',
    type: 'star',
    name: { zh: '太陽', en: 'Sun' },
    summary: {
      zh: '太陽是一顆 G 型主序星，提供地球生命所需的大部分能量，也是太陽系的重力中心。',
      en: 'The Sun is a G-type main-sequence star that powers life on Earth and anchors the Solar System gravitationally.',
    },
    facts: {
      '半徑': { zh: '約 696,340 公里', en: 'About 696,340 km' },
      '表面溫度': { zh: '約 5,500°C', en: 'About 5,500°C' },
      '年齡': { zh: '約 46 億年', en: 'About 4.6 billion years' },
    },
    visual: { color: '#ffe066', emissive: '#ffb703', size: 0.95, position: [0, 0, 0] },
  },
  {
    id: 'mercury',
    type: 'planet',
    name: { zh: '水星', en: 'Mercury' },
    summary: {
      zh: '水星是最靠近太陽的行星，表面布滿隕石坑，白天與夜晚溫差極端。',
      en: 'Mercury is the closest planet to the Sun, cratered and marked by extreme day-night temperature swings.',
    },
    facts: {
      '半徑': { zh: '2,440 公里', en: '2,440 km' },
      '公轉週期': { zh: '88 個地球日', en: '88 Earth days' },
      '特色': { zh: '沒有厚重大氣保溫', en: 'Lacks a thick heat-trapping atmosphere' },
    },
    visual: { color: '#a9a9a9', size: 0.17, position: [1.45, 0, 0], orbitRadius: 1.45, orbitSpeed: 0.82, orbitTilt: 0.05 },
  },
  {
    id: 'venus',
    type: 'planet',
    name: { zh: '金星', en: 'Venus' },
    summary: {
      zh: '金星大小接近地球，但濃厚二氧化碳大氣造成強烈溫室效應。',
      en: 'Venus is similar in size to Earth, but its dense carbon dioxide atmosphere creates a runaway greenhouse effect.',
    },
    facts: {
      '半徑': { zh: '6,052 公里', en: '6,052 km' },
      '公轉週期': { zh: '225 個地球日', en: '225 Earth days' },
      '特色': { zh: '太陽系表面最熱的行星', en: 'The hottest planetary surface in the Solar System' },
    },
    visual: { color: '#d9a441', size: 0.26, position: [2.05, 0, 0], orbitRadius: 2.05, orbitSpeed: 0.63, orbitTilt: 0.02 },
  },
  {
    id: 'earth',
    type: 'planet',
    name: { zh: '地球', en: 'Earth' },
    summary: {
      zh: '地球擁有液態水、穩定大氣與活躍地質，是目前已知唯一孕育生命的行星。',
      en: 'Earth has liquid water, a stable atmosphere, and active geology, making it the only known life-bearing planet.',
    },
    facts: {
      '半徑': { zh: '6,371 公里', en: '6,371 km' },
      '公轉週期': { zh: '365.25 天', en: '365.25 days' },
      '特色': { zh: '表面約 71% 被海洋覆蓋', en: 'About 71% of the surface is covered by oceans' },
    },
    visual: { color: '#3fa7d6', emissive: '#0a4d68', size: 0.28, position: [2.72, 0, 0], orbitRadius: 2.72, orbitSpeed: 0.52, orbitTilt: 0.03 },
  },
  {
    id: 'mars',
    type: 'planet',
    name: { zh: '火星', en: 'Mars' },
    summary: {
      zh: '火星因氧化鐵塵埃呈紅色，保存了河道、火山與可能曾有水的痕跡。',
      en: 'Mars is red from iron-rich dust and preserves channels, volcanoes, and signs that water once flowed there.',
    },
    facts: {
      '半徑': { zh: '3,390 公里', en: '3,390 km' },
      '公轉週期': { zh: '687 個地球日', en: '687 Earth days' },
      '特色': { zh: '擁有太陽系最高火山奧林帕斯山', en: 'Home to Olympus Mons, the tallest volcano in the Solar System' },
    },
    visual: { color: '#c65d3b', size: 0.22, position: [3.38, 0, 0], orbitRadius: 3.38, orbitSpeed: 0.43, orbitTilt: 0.06 },
  },
  {
    id: 'jupiter',
    type: 'planet',
    name: { zh: '木星', en: 'Jupiter' },
    summary: {
      zh: '木星是太陽系最大行星，厚重大氣中有持續數百年的大紅斑風暴。',
      en: 'Jupiter is the largest planet in the Solar System, with a massive atmosphere and the long-lived Great Red Spot.',
    },
    facts: {
      '半徑': { zh: '69,911 公里', en: '69,911 km' },
      '公轉週期': { zh: '11.86 個地球年', en: '11.86 Earth years' },
      '特色': { zh: '強大磁場與眾多衛星', en: 'Powerful magnetic field and many moons' },
    },
    visual: { color: '#d8b384', emissive: '#8a5a44', size: 0.58, position: [4.45, 0, 0], orbitRadius: 4.45, orbitSpeed: 0.28, orbitTilt: 0.02 },
  },
  {
    id: 'saturn',
    type: 'planet',
    name: { zh: '土星', en: 'Saturn' },
    summary: {
      zh: '土星以寬廣明亮的環系聞名，主要由冰粒與岩屑組成。',
      en: 'Saturn is famous for its broad, bright rings made mostly of ice particles and rocky debris.',
    },
    facts: {
      '半徑': { zh: '58,232 公里', en: '58,232 km' },
      '公轉週期': { zh: '29.45 個地球年', en: '29.45 Earth years' },
      '特色': { zh: '密度低於水', en: 'Less dense than water' },
    },
    visual: { color: '#e6cf9f', size: 0.52, position: [5.65, 0, 0], orbitRadius: 5.65, orbitSpeed: 0.22, orbitTilt: 0.04 },
  },
  {
    id: 'uranus',
    type: 'planet',
    name: { zh: '天王星', en: 'Uranus' },
    summary: {
      zh: '天王星是一顆冰巨行星，幾乎側躺著自轉，呈現柔和的藍綠色。',
      en: 'Uranus is an ice giant that rotates almost on its side, showing a muted blue-green color.',
    },
    facts: {
      '半徑': { zh: '25,362 公里', en: '25,362 km' },
      '公轉週期': { zh: '84 個地球年', en: '84 Earth years' },
      '特色': { zh: '自轉軸傾斜約 98 度', en: 'Axial tilt of about 98 degrees' },
    },
    visual: { color: '#76e4f7', size: 0.38, position: [6.8, 0, 0], orbitRadius: 6.8, orbitSpeed: 0.16, orbitTilt: 0.09 },
  },
  {
    id: 'neptune',
    type: 'planet',
    name: { zh: '海王星', en: 'Neptune' },
    summary: {
      zh: '海王星是最外側的主要行星，擁有高速風暴與深藍色甲烷大氣。',
      en: 'Neptune is the outermost major planet, with fast storms and a deep blue methane-rich atmosphere.',
    },
    facts: {
      '半徑': { zh: '24,622 公里', en: '24,622 km' },
      '公轉週期': { zh: '164.8 個地球年', en: '164.8 Earth years' },
      '特色': { zh: '風速可超過音速', en: 'Winds can exceed the speed of sound' },
    },
    visual: { color: '#3d5afe', emissive: '#1f2f98', size: 0.37, position: [7.85, 0, 0], orbitRadius: 7.85, orbitSpeed: 0.12, orbitTilt: 0.07 },
  },
  {
    id: 'red-giant',
    type: 'star',
    name: { zh: '紅巨星', en: 'Red Giant' },
    summary: {
      zh: '紅巨星是恆星晚年膨脹後的階段，外層變冷變紅，體積可遠大於原本大小。',
      en: 'A red giant is an expanded late-life star with cooler red outer layers and a size far larger than before.',
    },
    facts: {
      '階段': { zh: '中低質量恆星晚期', en: 'Late stage for low- to medium-mass stars' },
      '顏色': { zh: '紅橙色', en: 'Red-orange' },
      '命運': { zh: '可能形成行星狀星雲與白矮星', en: 'May form a planetary nebula and white dwarf' },
    },
    visual: { color: '#ff6b35', emissive: '#c1121f', size: 0.9, position: [-3.3, 0.15, -2.1] },
  },
  {
    id: 'blue-supergiant',
    type: 'star',
    name: { zh: '藍超巨星', en: 'Blue Supergiant' },
    summary: {
      zh: '藍超巨星質量極大、溫度極高，生命短暫但亮度驚人。',
      en: 'Blue supergiants are extremely massive and hot, living short lives with extraordinary brightness.',
    },
    facts: {
      '溫度': { zh: '可超過 20,000°C', en: 'Can exceed 20,000°C' },
      '亮度': { zh: '遠高於太陽', en: 'Far brighter than the Sun' },
      '命運': { zh: '常以超新星結束生命', en: 'Often ends as a supernova' },
    },
    visual: { color: '#9bf6ff', emissive: '#4cc9f0', size: 0.75, position: [-4.5, 0.35, 2.25] },
  },
];

export const sectionObjectIds: Record<SectionId, string[]> = {
  galaxy: ['galactic-core', 'orion-arm'],
  solar: ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
  planets: ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
  stars: ['sun', 'red-giant', 'blue-supergiant'],
};

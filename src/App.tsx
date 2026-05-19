import { useMemo, useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { InfoPanel } from './components/InfoPanel';
import { SpaceScene } from './components/SpaceScene';
import { celestialObjects, sectionObjectIds } from './data/celestial';
import type { CelestialType, Language, SectionId } from './types';

const defaultObjectBySection: Record<SectionId, string> = {
  galaxy: 'galactic-core',
  solar: 'earth',
  planets: 'earth',
  stars: 'sun',
};

export default function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [activeSection, setActiveSection] = useState<SectionId>('galaxy');
  const [selectedId, setSelectedId] = useState('galactic-core');
  const [filter, setFilter] = useState<CelestialType | 'all'>('all');
  const [speed, setSpeed] = useState(0.7);
  const [lowPower, setLowPower] = useState(false);

  const activeObjects = useMemo(() => {
    const ids = sectionObjectIds[activeSection];
    return celestialObjects.filter((object) => ids.includes(object.id));
  }, [activeSection]);

  const selectedObject = celestialObjects.find((object) => object.id === selectedId);
  const planetObjects = celestialObjects.filter((object) => object.type === 'planet');

  function changeSection(section: SectionId) {
    setActiveSection(section);
    setSelectedId(defaultObjectBySection[section]);
    setFilter(section === 'planets' ? 'planet' : section === 'stars' ? 'star' : 'all');
  }

  return (
    <main className="app-shell">
      <div className="scene-layer">
        <SpaceScene
          objects={activeObjects}
          activeId={defaultObjectBySection[activeSection]}
          selectedId={selectedId}
          language={language}
          filter={filter}
          speed={speed}
          lowPower={lowPower}
          onSelect={setSelectedId}
        />
      </div>

      <div className="ui-layer">
        <ControlPanel
          language={language}
          activeSection={activeSection}
          filter={filter}
          speed={speed}
          lowPower={lowPower}
          onLanguageChange={setLanguage}
          onSectionChange={changeSection}
          onFilterChange={setFilter}
          onSpeedChange={setSpeed}
          onLowPowerChange={setLowPower}
        />
        <InfoPanel object={selectedObject} language={language} activeSection={activeSection} planetObjects={planetObjects} onClear={() => setSelectedId('')} />
      </div>
    </main>
  );
}

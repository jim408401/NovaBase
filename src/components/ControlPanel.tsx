import { Gauge, Languages, Pause, Play, Rotate3D, SlidersHorizontal, Sparkles } from 'lucide-react';
import type { CelestialType, Language, SectionId } from '../types';
import { sections, ui } from '../data/ui';

type ControlPanelProps = {
  language: Language;
  activeSection: SectionId;
  filter: CelestialType | 'all';
  speed: number;
  lowPower: boolean;
  onLanguageChange: (language: Language) => void;
  onSectionChange: (section: SectionId) => void;
  onFilterChange: (filter: CelestialType | 'all') => void;
  onSpeedChange: (speed: number) => void;
  onLowPowerChange: (enabled: boolean) => void;
};

const filters: Array<CelestialType | 'all'> = ['all', 'planet', 'star', 'galaxy-region'];

export function ControlPanel({
  language,
  activeSection,
  filter,
  speed,
  lowPower,
  onLanguageChange,
  onSectionChange,
  onFilterChange,
  onSpeedChange,
  onLowPowerChange,
}: ControlPanelProps) {
  const activeDescription = sections.find((section) => section.id === activeSection)?.description[language];

  return (
    <header className="control-panel" aria-label="NovaBase controls">
      <div className="brand-row">
        <div className="brand-mark" aria-hidden="true">
          <Sparkles size={20} />
        </div>
        <div>
          <h1>NovaBase</h1>
          <p>{ui.subtitle[language]}</p>
        </div>
      </div>

      <p className="intro-copy">{ui.intro[language]}</p>

      <nav className="section-tabs" aria-label="Main sections">
        {sections.map((section) => (
          <button
            className={section.id === activeSection ? 'is-active' : ''}
            key={section.id}
            type="button"
            onClick={() => onSectionChange(section.id)}
          >
            {section.label[language]}
          </button>
        ))}
      </nav>
      <p className="section-description">{activeDescription}</p>

      <div className="tool-row" aria-label={ui.filters[language]}>
        <SlidersHorizontal size={17} />
        {filters.map((item) => (
          <button
            className={item === filter ? 'is-active compact' : 'compact'}
            key={item}
            type="button"
            onClick={() => onFilterChange(item)}
          >
            {ui[item][language]}
          </button>
        ))}
      </div>

      <label className="range-row">
        <span>
          <Rotate3D size={17} />
          {ui.speed[language]}
        </span>
        <input min="0" max="2" step="0.05" type="range" value={speed} onChange={(event) => onSpeedChange(Number(event.target.value))} />
        <strong>{speed === 0 ? <Pause size={15} /> : <Play size={15} />}</strong>
      </label>

      <div className="bottom-controls">
        <button className="icon-text" type="button" onClick={() => onLanguageChange(language === 'zh' ? 'en' : 'zh')}>
          <Languages size={17} />
          {language === 'zh' ? 'English' : '中文'}
        </button>
        <label className="toggle-row">
          <input type="checkbox" checked={lowPower} onChange={(event) => onLowPowerChange(event.target.checked)} />
          <span>
            <Gauge size={17} />
            {ui.performance[language]}
          </span>
        </label>
      </div>
    </header>
  );
}

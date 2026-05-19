import { Activity, Atom, CircleDot, Milestone, X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CelestialObject, Language, SectionId } from '../types';
import { ui } from '../data/ui';

type InfoPanelProps = {
  object?: CelestialObject;
  language: Language;
  activeSection: SectionId;
  planetObjects: CelestialObject[];
  onClear: () => void;
};

const sectionIcon = {
  galaxy: CircleDot,
  solar: Atom,
  planets: Activity,
  stars: Milestone,
};

export function InfoPanel({ object, language, activeSection, planetObjects, onClear }: InfoPanelProps) {
  const Icon = sectionIcon[activeSection];

  return (
    <motion.aside
      className="info-panel"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      aria-live="polite"
    >
      <div className="panel-kicker">
        <Icon size={18} />
        <span>{ui.selected[language]}</span>
        {object && (
          <button type="button" aria-label="Clear selection" onClick={onClear}>
            <X size={17} />
          </button>
        )}
      </div>

      {object ? (
        <>
          <h2>{object.name[language]}</h2>
          <p className="summary">{object.summary[language]}</p>
          <h3>{ui.facts[language]}</h3>
          <dl className="fact-grid">
            {Object.entries(object.facts).map(([label, value]) => (
              <div key={label}>
                <dt>{language === 'zh' ? label : labelMap[label] ?? label}</dt>
                <dd>{value[language]}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : (
        <p className="empty-state">{ui.noSelection[language]}</p>
      )}

      {activeSection === 'planets' && (
        <div className="compare-panel">
          <h3>{ui.compare[language]}</h3>
          {planetObjects.map((planet) => (
            <div className="compare-row" key={planet.id}>
              <span>{planet.name[language]}</span>
              <div>
                <i style={{ width: `${Math.max(14, planet.visual.size * 92)}%`, background: planet.visual.color }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'stars' && (
        <div className="timeline">
          <h3>{ui.lifecycle[language]}</h3>
          <span>{language === 'zh' ? '星雲' : 'Nebula'}</span>
          <span>{language === 'zh' ? '主序星' : 'Main Sequence'}</span>
          <span>{language === 'zh' ? '紅巨星 / 超巨星' : 'Red Giant / Supergiant'}</span>
          <span>{language === 'zh' ? '白矮星 / 超新星' : 'White Dwarf / Supernova'}</span>
        </div>
      )}
    </motion.aside>
  );
}

const labelMap: Record<string, string> = {
  中心距離: 'Core distance',
  主要特徵: 'Main feature',
  觀測方式: 'Observation',
  所在位置: 'Location',
  太陽位置: 'Sun position',
  尺度: 'Scale',
  半徑: 'Radius',
  表面溫度: 'Surface temperature',
  年齡: 'Age',
  公轉週期: 'Orbital period',
  特色: 'Feature',
  階段: 'Stage',
  顏色: 'Color',
  命運: 'Fate',
  溫度: 'Temperature',
  亮度: 'Luminosity',
};


import React from 'react';
import { SoundItem, ActiveSound, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface SoundMixerProps {
  collection: SoundItem[];
  activeSounds: ActiveSound[];
  lang: Language;
  onToggle: (id: string) => void;
  onVolumeChange: (id: string, volume: number) => void;
}

const SoundMixer: React.FC<SoundMixerProps> = ({ collection, activeSounds, lang, onToggle, onVolumeChange }) => {
  const categories = ['coffee', 'cafe', 'nature', 'instruments'] as const;
  const t = (TRANSLATIONS[lang] as any).categories;

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between px-2 mb-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-200/40">聲音庫 / SOUNDSCAPES</h3>
      </div>
      
      <div className="max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar space-y-5">
        {categories.map(category => (
          <div key={category} className="space-y-2">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-white/20 ml-2">{t[category]}</h4>
            <div className="grid grid-cols-2 gap-2">
              {collection.filter(s => s.category === category).map(sound => {
                const active = activeSounds.find(a => a.id === sound.id);
                return (
                  <div 
                    key={sound.id}
                    className={`group p-2.5 rounded-xl transition-all duration-300 border flex flex-col gap-1.5 cursor-pointer ${
                      active 
                        ? 'bg-amber-900/40 border-amber-500/40 shadow-lg scale-[1.02]' 
                        : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => onToggle(sound.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg transition-transform group-hover:scale-110 ${active ? 'scale-110' : 'opacity-60'}`}>{sound.icon}</span>
                        <span className={`text-[10px] font-bold tracking-tight leading-tight ${active ? 'text-amber-50' : 'text-white/40'}`}>
                          {sound.name[lang]}
                        </span>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full transition-all ${active ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-white/10'}`} />
                    </div>
                    
                    {active && (
                      <div className="flex items-center gap-2 px-1 animate-in fade-in slide-in-from-top-1 duration-300" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="range" min="0" max="1" step="0.01" value={active.volume}
                          onChange={(e) => onVolumeChange(sound.id, parseFloat(e.target.value))}
                          className="flex-1 h-1 bg-black/40 rounded-full appearance-none cursor-pointer accent-amber-500"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoundMixer;

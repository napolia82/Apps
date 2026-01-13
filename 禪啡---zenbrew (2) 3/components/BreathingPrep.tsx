
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface BreathingPrepProps { lang: Language; onComplete: () => void; onSkip: () => void; }

const BreathingPrep: React.FC<BreathingPrepProps> = ({ lang, onComplete, onSkip }) => {
  const t = TRANSLATIONS[lang];
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (cycle >= 3) {
      setTimeout(onComplete, 1000);
      return;
    }

    const timer = setTimeout(() => {
      if (phase === 'in') setPhase('hold');
      else if (phase === 'hold') setPhase('out');
      else {
        setPhase('in');
        setCycle(c => c + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [phase, cycle]);

  return (
    <div className="flex flex-col items-center space-y-12 animate-in fade-in zoom-in duration-700">
      <div className="text-center space-y-2">
        <h2 className="serif text-4xl text-amber-50">{t.prepTitle}</h2>
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-200/40">Cycle {cycle + 1} / 3</p>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Breathing Circle Animation */}
        <div className={`absolute inset-0 rounded-full border-2 border-white/20 transition-all duration-[4000ms] ease-in-out ${
          phase === 'in' ? 'scale-125 opacity-100 bg-white/5' : phase === 'out' ? 'scale-75 opacity-20' : 'scale-125 opacity-100 bg-white/10'
        }`} />
        <div className="text-2xl font-black uppercase tracking-widest text-amber-50 z-10 transition-opacity duration-500">
          {phase === 'in' ? t.breathIn : phase === 'hold' ? t.hold : t.breathOut}
        </div>
      </div>

      <button onClick={onSkip} className="text-white/20 hover:text-white/40 text-[10px] font-bold uppercase tracking-widest transition-colors">
        {t.skip}
      </button>
    </div>
  );
};

export default BreathingPrep;

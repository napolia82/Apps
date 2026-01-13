
import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps { lang: Language; setLang: (l: Language) => void; onOpenJournal: () => void; }

const Header: React.FC<HeaderProps> = ({ lang, setLang, onOpenJournal }) => {
  const t = TRANSLATIONS[lang];
  const [showInstallTip, setShowInstallTip] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const langList: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'zh-TW', label: '繁中' },
    { code: 'zh-CN', label: '简中' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'de', label: 'DE' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' }
  ];

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4 relative z-20 w-full">
      <div className="flex items-center gap-5 group cursor-pointer" onClick={() => setShowInstallTip(!showInstallTip)}>
        <div className="w-12 h-12 relative flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full transform group-hover:scale-110 transition-all duration-700 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <defs>
              <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#D97706', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#451A03', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path d="M50 10 C30 45 20 60 20 75 A30 30 0 0 0 80 75 C80 60 70 45 50 10 Z" fill="url(#coffeeGradient)" />
            <path d="M45 25 C35 45 30 55 30 65 A5 10 0 0 0 35 60 C35 50 40 40 45 25 Z" fill="white" fillOpacity="0.2" />
          </svg>
        </div>
        <div>
          <h1 className="serif text-3xl font-bold text-amber-50 tracking-tighter leading-none group-hover:text-amber-200 transition-colors">{t.title}</h1>
          <p className="text-[8px] tracking-[0.4em] uppercase text-amber-200/40 font-black mt-2">Nature & Mindful Brew</p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        <button onClick={onOpenJournal} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-amber-200 text-[10px] font-bold hover:bg-white/10 transition-all flex items-center gap-2">
          <span>📓</span> {t.myJournal}
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5 backdrop-blur-md text-[10px] font-black text-white/60 hover:text-white transition-all"
          >
            🌐 {langList.find(l => l.code === lang)?.label}
          </button>
          
          {showLangMenu && (
            <div className="absolute top-12 right-0 bg-stone-900/95 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-2xl grid grid-cols-2 gap-1 min-w-[180px] z-50 animate-in fade-in zoom-in duration-200">
              {langList.map(l => (
                <button 
                  key={l.code} 
                  onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                  className={`px-3 py-2 rounded-lg text-[9px] font-bold transition-all ${lang === l.code ? 'bg-amber-600 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;

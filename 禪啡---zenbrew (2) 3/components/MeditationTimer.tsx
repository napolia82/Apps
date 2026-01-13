
import React from 'react';
import { Language } from '../types';

interface MeditationTimerProps {
  timeLeft: number;
  totalTime: number;
  lang: Language;
}

const MeditationTimer: React.FC<MeditationTimerProps> = ({ timeLeft, totalTime, lang }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const radius = 160;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const labels: { [key in Language]: string } = {
    'en': 'Brewing Peace',
    'zh-TW': '禪味萃取中',
    'zh-CN': '禅味萃取中',
    'ja': '抽出中...',
    'ko': '브루잉 중...',
    'de': 'Frieden brühen...',
    'fr': 'Infusion en cours...',
    'es': 'Preparando paz...'
  };

  return (
    <div className="relative flex items-center justify-center w-[360px] h-[360px]">
      <svg className="absolute w-full h-full -rotate-90">
        <circle cx="50%" cy="50%" r={radius} className="stroke-white/5 fill-none" strokeWidth="2" />
        <circle
          cx="50%" cy="50%" r={radius}
          className="stroke-amber-500 fill-none transition-all duration-1000 ease-linear"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      <div className="text-center z-10 flex flex-col items-center">
        <div className="text-8xl font-mono font-thin text-amber-50 tracking-tighter tabular-nums drop-shadow-2xl">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-[10px] uppercase tracking-[0.5em] text-amber-200/40 mt-6 font-black bg-black/40 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
          {labels[lang]}
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;

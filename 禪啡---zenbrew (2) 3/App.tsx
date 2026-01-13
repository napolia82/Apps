
import React, { useState, useEffect, useRef } from 'react';
import { SOUND_COLLECTION, TRANSLATIONS, MEDITATION_VIDEOS, FALLBACK_BG } from './constants';
import { AppState, ActiveSound, Language, MeditationEntry } from './types';
import SoundMixer from './components/SoundMixer';
import MeditationTimer from './components/MeditationTimer';
import Header from './components/Header';
import BreathingPrep from './components/BreathingPrep';
import JournalView from './components/JournalView';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh-TW');
  const [appState, setAppState] = useState<AppState>('idle');
  const [activeSounds, setActiveSounds] = useState<ActiveSound[]>([]);
  const [duration, setDuration] = useState<number>(300);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [history, setHistory] = useState<MeditationEntry[]>([]);
  
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  useEffect(() => {
    // 預加載聲音
    SOUND_COLLECTION.forEach((sound) => {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audio.preload = "auto";
      audioRefs.current[sound.id] = audio;
    });

    // 讀取紀錄
    const saved = localStorage.getItem('zenbrew_history');
    if (saved) setHistory(JSON.parse(saved));
    
    return () => Object.values(audioRefs.current).forEach(a => a.pause());
  }, []);

  // 背景切換邏輯
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [appState]);

  const toggleSound = (soundId: string) => {
    setActiveSounds(prev => {
      const exists = prev.find(s => s.id === soundId);
      const audio = audioRefs.current[soundId];
      if (exists) {
        audio.pause();
        return prev.filter(s => s.id !== soundId);
      } else {
        audio.volume = 0.5;
        audio.play().catch(() => {});
        return [...prev, { id: soundId, volume: 0.5 }];
      }
    });
  };

  const saveSession = () => {
    const entry: MeditationEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      duration: duration - timeLeft,
      reflection: "靜謐咖啡冥想",
      statusText: "今天的心情很平靜。",
      sounds: activeSounds.map(s => s.id),
      coffeeSpecs: { beanName: "衣索比亞", roast: "淺焙", temp: "92", ratio: "1:15" }
    };
    const newHistory = [entry, ...history];
    setHistory(newHistory);
    localStorage.setItem('zenbrew_history', JSON.stringify(newHistory));
  };

  useEffect(() => {
    let timer: any;
    if (appState === 'meditating' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
    } else if (timeLeft === 0 && appState === 'meditating') {
      saveSession();
      setAppState('summary');
    }
    return () => clearInterval(timer);
  }, [appState, timeLeft]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#1a1614] text-white">
      {/* 背景層 */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${FALLBACK_BG})` }}>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-60" autoPlay loop muted playsInline>
          <source src={MEDITATION_VIDEOS[appState === 'meditating' ? 0 : 1]} type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 flex flex-col flex-1 px-6 py-8">
        <Header lang={lang} setLang={setLang} onOpenJournal={() => setAppState('history')} />

        <main className="flex-1 flex flex-col items-center justify-center">
          {appState === 'idle' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">
              <div className="text-center lg:text-left space-y-6">
                <h1 className="serif text-8xl font-bold">{t.title}</h1>
                <p className="text-amber-200/60 uppercase tracking-widest">{t.subtitle}</p>
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs uppercase text-white/40">{t.duration}</span>
                    <span className="text-4xl font-mono">{Math.floor(duration/60)}:00</span>
                  </div>
                  <input type="range" min="60" max="1200" step="60" value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full h-1 bg-white/20 rounded-full accent-amber-500 mb-8" />
                  <button onClick={() => setAppState('preparing')} className="w-full py-4 bg-amber-600 rounded-xl font-bold">開始</button>
                </div>
              </div>
              <SoundMixer collection={SOUND_COLLECTION} activeSounds={activeSounds} lang={lang} onToggle={toggleSound} onVolumeChange={(id, v) => {
                if(audioRefs.current[id]) audioRefs.current[id].volume = v;
                setActiveSounds(s => s.map(x => x.id === id ? {...x, volume: v} : x));
              }} />
            </div>
          )}

          {appState === 'preparing' && <BreathingPrep lang={lang} onComplete={() => setAppState('meditating')} onSkip={() => setAppState('meditating')} />}
          
          {appState === 'meditating' && (
            <div className="flex flex-col items-center space-y-12">
              <MeditationTimer timeLeft={timeLeft} totalTime={duration} lang={lang} />
              <button onClick={() => { saveSession(); setAppState('summary'); }} className="px-8 py-3 border border-white/20 rounded-full text-xs uppercase tracking-widest">結束</button>
            </div>
          )}

          {appState === 'summary' && (
            <div className="bg-white/10 backdrop-blur-2xl p-12 rounded-3xl border border-white/10 text-center space-y-6 max-w-sm">
              <div className="text-5xl">☕</div>
              <h2 className="serif text-3xl font-bold">{t.summaryTitle}</h2>
              <button onClick={() => setAppState('history')} className="w-full py-4 bg-amber-600 rounded-xl font-bold">查看咖啡日誌</button>
              <button onClick={() => setAppState('idle')} className="w-full text-white/40">返回主頁</button>
            </div>
          )}

          {appState === 'history' && <JournalView history={history} lang={lang} onClose={() => setAppState('idle')} onUpdateEntry={(e) => setHistory(h => h.map(x => x.id === e.id ? e : x))} />}
        </main>
      </div>
    </div>
  );
};

export default App;

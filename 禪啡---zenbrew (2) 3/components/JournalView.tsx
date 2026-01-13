
import React, { useState, useMemo } from 'react';
import { MeditationEntry, Language } from '../types';
import { TRANSLATIONS, COFFEE_QUOTES } from '../constants';

interface JournalViewProps {
  history: MeditationEntry[];
  lang: Language;
  onClose: () => void;
  onUpdateEntry: (entry: MeditationEntry) => void;
}

const JournalView: React.FC<JournalViewProps> = ({ history, lang, onClose, onUpdateEntry }) => {
  const t = TRANSLATIONS[lang];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    return { firstDay, days, year, month };
  }, [currentDate]);

  const monthEntries = useMemo(() => {
    return history.filter(entry => {
      const d = new Date(entry.timestamp);
      return d.getFullYear() === daysInMonth.year && d.getMonth() === daysInMonth.month;
    });
  }, [history, daysInMonth]);

  const getEntriesForDate = (day: number) => {
    return monthEntries.filter(entry => new Date(entry.timestamp).getDate() === day);
  };

  const selectedEntries = useMemo(() => {
    if (!selectedDate) return [];
    return history.filter(entry => {
      const d = new Date(entry.timestamp);
      return d.toDateString() === selectedDate.toDateString();
    });
  }, [history, selectedDate]);

  // Fix: Ensure we don't access out of bounds if the quotes list is shorter than 5
  const dailyQuote = useMemo(() => {
    if (!selectedDate) return "";
    const quotes = COFFEE_QUOTES[lang] || COFFEE_QUOTES['en'];
    const dayIndex = (selectedDate.getDate() - 1) % quotes.length;
    return quotes[dayIndex];
  }, [selectedDate, lang]);

  const handlePrevMonth = () => setCurrentDate(new Date(daysInMonth.year, daysInMonth.month - 1));
  const handleNextMonth = () => setCurrentDate(new Date(daysInMonth.year, daysInMonth.month + 1));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, entry: MeditationEntry) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateEntry({ ...entry, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="max-w-6xl w-full bg-[#1a1614] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col md:flex-row h-[90vh] shadow-2xl">
        
        {/* 左側：日曆 */}
        <div className="flex-1 p-6 md:p-8 border-r border-white/5 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="serif text-3xl text-amber-50 font-bold">{t.myJournal}</h2>
            <div className="flex items-center gap-4">
              <button onClick={handlePrevMonth} className="p-2 text-amber-200">←</button>
              <span className="serif text-lg text-amber-200/80">
                {currentDate.toLocaleString(lang, { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={handleNextMonth} className="p-2 text-amber-200">→</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 flex-1 content-start">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-center text-[10px] font-black text-white/20 pb-4">{d}</div>
            ))}
            {Array.from({ length: daysInMonth.firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth.days }).map((_, i) => {
              const day = i + 1;
              const entries = getEntriesForDate(day);
              const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === daysInMonth.month;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(daysInMonth.year, daysInMonth.month, day))}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all border ${
                    isSelected ? 'bg-amber-600 border-amber-400' : 'bg-white/5 border-transparent'
                  }`}
                >
                  <span className={`text-xs ${isSelected ? 'text-white font-bold' : 'text-white/60'}`}>{day}</span>
                  {entries.length > 0 && !isSelected && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </div>
          
          <button onClick={onClose} className="mt-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white/10">
            {t.return}
          </button>
        </div>

        {/* 右側：內容詳情 */}
        <div className="w-full md:w-[400px] bg-black/20 p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {selectedDate ? (
            <div className="space-y-6">
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{selectedDate.toLocaleDateString(lang)}</p>
              
              <div className="bg-amber-900/10 p-5 rounded-2xl border border-amber-500/10 italic text-amber-50/80 text-sm leading-relaxed">
                「 {dailyQuote} 」
              </div>

              {selectedEntries.length > 0 ? (
                selectedEntries.map(entry => (
                  <div key={entry.id} className="space-y-4 border-b border-white/5 pb-6 last:border-0">
                    <div className="aspect-video rounded-2xl bg-white/5 overflow-hidden relative group border border-white/10">
                      {entry.imageUrl ? (
                        <img src={entry.imageUrl} className="w-full h-full object-cover" alt="Zen Moment" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                          <span className="text-2xl mb-2">📸</span>
                          <span className="text-[8px] font-bold uppercase tracking-widest">點擊上傳照片</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, entry)} />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[8px] text-white/30 uppercase mb-1">豆種</p>
                        <p className="text-xs text-amber-100 font-bold">{entry.coffeeSpecs?.beanName || "未填寫"}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[8px] text-white/30 uppercase mb-1">時長</p>
                        <p className="text-xs text-amber-100 font-bold">{Math.floor(entry.duration / 60)} 分鐘</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">心得紀錄</p>
                      <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white/70 focus:outline-none focus:border-amber-500 min-h-[80px]" 
                        value={entry.statusText || ""} 
                        placeholder="寫下此刻的心情..."
                        onChange={(e) => onUpdateEntry({ ...entry, statusText: e.target.value })} 
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center opacity-20">
                  <p className="text-xs font-bold uppercase tracking-widest">這天還沒有紀錄</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-white/10">
              <p className="text-xs font-bold uppercase tracking-widest">請選擇日期</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalView;

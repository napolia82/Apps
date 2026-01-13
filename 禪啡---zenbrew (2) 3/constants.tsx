
import { SoundItem, Language } from './types';

// Fix: Added missing language properties to TRANSLATIONS
export const TRANSLATIONS: { [key in Language]: any } = {
  'en': {
    title: 'ZenBrew',
    subtitle: 'Brew Peace, Sip Silence.',
    start: 'Start Session',
    duration: 'Time',
    summaryTitle: 'Brew Complete',
    viewJournal: 'Go to Journal',
    categories: { coffee: 'Brewing', nature: 'Nature', instruments: 'Zen Instruments', cafe: 'Cafe' },
    myJournal: 'My Journal',
    return: 'Back',
    dailyQuote: 'Daily Quote',
    coffeeSpecs: { bean: 'Bean', roast: 'Roast' },
    prepTitle: 'Mindful Breathing',
    breathIn: 'Inhale',
    hold: 'Hold',
    breathOut: 'Exhale',
    skip: 'Skip'
  },
  'zh-TW': {
    title: '禪啡',
    subtitle: '慢沖煮，靜心靈。',
    start: '開始禪修',
    duration: '時長',
    summaryTitle: '禪味萃取完成',
    viewJournal: '進入咖啡日誌',
    categories: { coffee: '咖啡沖煮', nature: '自然環境', instruments: '冥想法器', cafe: '咖啡廳' },
    myJournal: '我的日誌',
    return: '返回',
    dailyQuote: '每日一語',
    coffeeSpecs: { bean: '豆子', roast: '烘焙' },
    prepTitle: '靜心呼吸',
    breathIn: '吸氣',
    hold: '憋氣',
    breathOut: '呼氣',
    skip: '跳過'
  },
  'zh-CN': {
    title: '禅啡',
    subtitle: '慢冲煮，静心灵。',
    start: '开始禅修',
    duration: '时长',
    summaryTitle: '禅味萃取完成',
    viewJournal: '进入咖啡日志',
    categories: { coffee: '咖啡冲煮', nature: '自然环境', instruments: '冥想法器', cafe: '咖啡厅' },
    myJournal: '我的日志',
    return: '返回',
    dailyQuote: '每日一语',
    coffeeSpecs: { bean: '豆子', roast: '烘焙' },
    prepTitle: '静心呼吸',
    breathIn: '吸气',
    hold: '憋气',
    breathOut: '呼气',
    skip: '跳过'
  },
  'ja': {
    title: '禅ブル',
    subtitle: '静かに淹れ、静寂を味わう。',
    start: 'セッション開始',
    duration: '時間',
    summaryTitle: '抽出完了',
    viewJournal: '日誌を見る',
    categories: { coffee: '抽出', nature: '自然', instruments: '禅の楽器', cafe: 'カフェ' },
    myJournal: 'マイジャーナル',
    return: '戻る',
    dailyQuote: '今日の名言',
    coffeeSpecs: { bean: '豆', roast: '焙煎' },
    prepTitle: 'マインドフルな呼吸',
    breathIn: '吸う',
    hold: '止める',
    breathOut: '吐く',
    skip: 'スキップ'
  },
  'ko': {
    title: '젠브루',
    subtitle: '평화를 내리고, 침묵을 마시다.',
    start: '세션 시작',
    duration: '시간',
    summaryTitle: '추출 완료',
    viewJournal: '일지로 이동',
    categories: { coffee: '브루잉', nature: '자연', instruments: '선 악기', cafe: '카페' },
    myJournal: '나의 일지',
    return: '뒤로',
    dailyQuote: '오늘의 명언',
    coffeeSpecs: { bean: '원두', roast: '로스팅' },
    prepTitle: '마음 챙김 호흡',
    breathIn: '숨 들이마시기',
    hold: '멈추기',
    breathOut: '숨 내쉬기',
    skip: '건너뛰기'
  },
  'de': {
    title: 'ZenBrew',
    subtitle: 'Frieden brühen, Stille schlürfen.',
    start: 'Sitzung starten',
    duration: 'Zeit',
    summaryTitle: 'Brühen abgeschlossen',
    viewJournal: 'Zum Journal gehen',
    categories: { coffee: 'Brühen', nature: 'Natur', instruments: 'Zen-Instrumente', cafe: 'Café' },
    myJournal: 'Mein Journal',
    return: 'Zurück',
    dailyQuote: 'Tageszitat',
    coffeeSpecs: { bean: 'Bohne', roast: 'Röstung' },
    prepTitle: 'Achtsames Atmen',
    breathIn: 'Einatmen',
    hold: 'Halten',
    breathOut: 'Ausatmen',
    skip: 'Überspringen'
  },
  'fr': {
    title: 'ZenBrew',
    subtitle: 'Infusez la paix, sirotez le silence.',
    start: 'Démarrer la session',
    duration: 'Temps',
    summaryTitle: 'Infusion terminée',
    viewJournal: 'Aller au journal',
    categories: { coffee: 'Infusion', nature: 'Nature', instruments: 'Instruments Zen', cafe: 'Café' },
    myJournal: 'Mon Journal',
    return: 'Retour',
    dailyQuote: 'Citation du jour',
    coffeeSpecs: { bean: 'Grain', roast: 'Torréfaction' },
    prepTitle: 'Respiration en pleine conscience',
    breathIn: 'Inspirer',
    hold: 'Maintenir',
    breathOut: 'Expirer',
    skip: 'Passer'
  },
  'es': {
    title: 'ZenBrew',
    subtitle: 'Prepara la paz, saborea el silencio.',
    start: 'Iniciar sesión',
    duration: 'Tiempo',
    summaryTitle: 'Preparación completa',
    viewJournal: 'Ir al diario',
    categories: { coffee: 'Preparación', nature: 'Naturaleza', instruments: 'Instrumentos Zen', cafe: 'Cafetería' },
    myJournal: 'Mi Diario',
    return: 'Volver',
    dailyQuote: 'Cita diaria',
    coffeeSpecs: { bean: 'Grano', roast: 'Tostado' },
    prepTitle: 'Respiración consciente',
    breathIn: 'Inhalar',
    hold: 'Mantener',
    breathOut: 'Exhalar',
    skip: 'Omitir'
  }
};

export const SOUND_COLLECTION: SoundItem[] = [
  { id: 'pour', name: { en: 'Hand Pour', 'zh-TW': '手沖水流', 'zh-CN': '手冲水流', ja: 'ハンドドリップ', ko: '핸드 드립', de: 'Handaufguss', fr: 'Versage manuel', es: 'Vertido manual' }, category: 'coffee', url: 'https://assets.mixkit.co/sfx/preview/mixkit-pouring-water-into-a-glass-3103.mp3', icon: '💧' },
  { id: 'bird', name: { en: 'Forest Birds', 'zh-TW': '森林小鳥', 'zh-CN': '森林小鸟', ja: '森の鳥', ko: '숲의 새', de: 'Waldvögel', fr: 'Oiseaux de forêt', es: 'Pájaros del bosque' }, category: 'nature', url: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-1210.mp3', icon: '🐦' },
  { id: 'rain', name: { en: 'Soft Rain', 'zh-TW': '細雨', 'zh-CN': '细雨', ja: '小雨', ko: '가랑비', de: 'Sanfter Regen', fr: 'Pluie douce', es: 'Lluvia suave' }, category: 'nature', url: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2393.mp3', icon: '🌧️' },
  { id: 'bowl', name: { en: 'Singing Bowl', 'zh-TW': '頌缽', 'zh-CN': '頌缽', ja: 'シンギングボウル', ko: '싱잉볼', de: 'Klangschale', fr: 'Bol chantant', es: 'Cuenco tibetano' }, category: 'instruments', url: 'https://assets.mixkit.co/sfx/preview/mixkit-tibetan-singing-bowl-hit-2128.mp3', icon: '🥣' },
  { id: 'gong', name: { en: 'Zen Gong', 'zh-TW': '禪鑼', 'zh-CN': '禅锣', ja: '禪のドラ', ko: '젠 징', de: 'Zen-Gong', fr: 'Gong Zen', es: 'Gong Zen' }, category: 'instruments', url: 'https://assets.mixkit.co/sfx/preview/mixkit-gong-hit-2123.mp3', icon: '🔔' }
];

// 高清穩定影片：手沖咖啡與森林
export const MEDITATION_VIDEOS = [
  'https://player.vimeo.com/external/494252666.hd.mp4?s=231ce867822a900995146c4f92d41b5a593e110c&profile_id=175',
  'https://player.vimeo.com/external/451559136.hd.mp4?s=7b94420f18821033486001a4e106c59292e946a0&profile_id=172'
];

export const FALLBACK_BG = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000';

// Fix: Exported COFFEE_QUOTES which was missing but referenced in JournalView.tsx
export const COFFEE_QUOTES: { [key in Language]: string[] } = {
  'en': [
    "Coffee is a way of stealing time that should by rights belong to your older self.",
    "Science can never come up with a better office communication system than the coffee break.",
    "I have measured out my life with coffee spoons.",
    "Coffee, the favorite drink of the civilized world.",
    "Way too much coffee. But if it weren't for the coffee, I'd have no identifiable personality whatsoever."
  ],
  'zh-TW': [
    "咖啡是一種偷走本應屬於未來時間的方式。",
    "科學永遠無法發明比咖啡時間更好的辦公室溝通系統。",
    "我用咖啡匙衡量了我的生命。",
    "咖啡，文明世界最喜愛的飲品。",
    "咖啡喝太多了。但如果沒有咖啡，我根本就沒有可以辨認的人格。"
  ],
  'zh-CN': [
    "咖啡是一种偷走本应属于未来时间的方式。",
    "科学永远无法发明比咖啡时间更好的办公室沟通系统。",
    "我用咖啡匙衡量了我的生命。",
    "咖啡，文明世界最喜爱的饮品。",
    "咖啡喝太多了。但如果没有咖啡，我根本就没有可以辨认的人格。"
  ],
  'ja': [
    "コーヒーは、本来なら後の自分に属するはずの時間を盗む方法である。",
    "コーヒーブレイク以上に優れたオフィス・コミュニケーション・システムは、科学でも作り出せない。",
    "私はコーヒー・スプーンで自分の人生を測ってきた。",
    "コーヒー、文明社会のお気に入りの飲み物。",
    "あまりにも多くのコーヒー。しかし、コーヒーがなければ、私にはアイデンティティなど全くなかっただろう。"
  ],
  'ko': [
    "커피는 원래 나중에 당신에게 속해야 할 시간을 훔치는 방법입니다.",
    "과학은 커피 브레이크보다 더 나은 사무실 커뮤니케이션 시스템을 결코 고안할 수 없습니다.",
    "나는 커피 스푼으로 내 인생을 측정해 왔습니다.",
    "커피, 문명 세계가 가장 좋아하는 음료.",
    "커피가 너무 많습니다. 하지만 커피가 없었다면 나는 정체성조차 없었을 것입니다."
  ],
  'de': [
    "Kaffee ist eine Art, Zeit zu stehlen, die eigentlich Ihrem älteren Ich gehören sollte.",
    "Die Wissenschaft kann kein besseres Büro-Kommunikationssystem erfinden als die Kaffeepause.",
    "Ich habe mein Leben mit Kaffeelöffeln ausgemessen.",
    "Kaffee, das Lieblingsgetränk der zivilisierten Welt.",
    "Viel zu viel Kaffee. Aber ohne den Kaffee hätte ich überhaupt keine erkennbare Persönlichkeit."
  ],
  'fr': [
    "Le café est une façon de voler du temps qui devrait de droit appartenir à votre futur moi.",
    "La science ne pourra jamais concevoir un meilleur système de communication au bureau que la pause café.",
    "J'ai mesuré ma vie avec des cuillères à café.",
    "Le café, la boisson préférée du monde civilisé.",
    "Beaucoup trop de café. Mais sans le café, je n'aurais aucune personnalité identifiable."
  ],
  'es': [
    "El café es una forma de robar tiempo que por derecho debería pertenecer a tu yo futuro.",
    "La ciencia nunca podrá inventar un sistema de comunicación en la oficina mejor que la pausa para el café.",
    "He medido mi vida con cucharaditas de café.",
    "El café, la bebida favorita del mundo civilizado.",
    "Demasiado café. Pero si no fuera por el café, no tendría ninguna personalidad identificable."
  ]
};

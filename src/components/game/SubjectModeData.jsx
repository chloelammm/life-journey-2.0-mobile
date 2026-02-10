// 學科興趣模式 - 事件卡、任務、路徑數據

// 學科事件卡
export const SUBJECT_EVENT_CARDS = [
  // === 學習方法事件 ===
  {
    id: "sub_learn_01",
    title: "溫書方法",
    description: "考試就快到，你會點溫書？",
    icon: "📖",
    options: [
      { text: "做Past Paper操練", effect: { math_skill: 10, stress: 10, happiness: 5 }, trait: "practical", stream: "stem" },
      { text: "用Mind Map整理", effect: { creative: 10, stress: -5, happiness: 10 }, trait: "creative", stream: "arts" },
      { text: "同朋友一齊溫", effect: { social: 15, stress: -10, happiness: 15 }, trait: "social", stream: "social" }
    ],
    voiceover: "搵啱自己嘅方法！"
  },
  {
    id: "sub_learn_02",
    title: "課外活動",
    description: "學校有好多課外活動，你揀邊個？",
    icon: "🎯",
    options: [
      { text: "數學奧林匹克", effect: { math_skill: 20, stress: 15, happiness: 5 }, trait: "academic", stream: "stem" },
      { text: "戲劇學會", effect: { creative: 20, social: 10, happiness: 15 }, trait: "artistic", stream: "arts" },
      { text: "辯論隊", effect: { social: 15, adaptability: 10, happiness: 10 }, trait: "leader", stream: "business" },
      { text: "電腦學會", effect: { digital: 20, math_skill: 10, happiness: 10 }, trait: "tech", stream: "stem" }
    ],
    voiceover: "課外活動好重要！"
  },
  {
    id: "sub_learn_03",
    title: "功課難題",
    description: "有條數學題唔識做...",
    icon: "🤔",
    options: [
      { text: "自己研究到識為止", effect: { math_skill: 15, stress: 15, happiness: 5, adaptability: 10 }, trait: "persistent", stream: "stem" },
      { text: "問老師或同學", effect: { social: 10, stress: -5, happiness: 10 }, trait: "social", stream: "social" },
      { text: "上網搵答案", effect: { digital: 10, math_skill: 5, stress: -5 }, trait: "tech", stream: "stem" }
    ],
    voiceover: "遇到困難點算？"
  },

  // === 學科選擇事件 ===
  {
    id: "sub_choice_01",
    title: "選修科抉擇",
    description: "中四要揀選修科...",
    icon: "📚",
    options: [
      { text: "物理+化學+生物", effect: { math_skill: 15, stress: 15, happiness: 5 }, trait: "science", stream: "stem" },
      { text: "經濟+企會財+地理", effect: { math_skill: 10, social: 10, happiness: 10 }, trait: "business", stream: "business" },
      { text: "視藝+音樂+中史", effect: { creative: 20, stress: -5, happiness: 15 }, trait: "arts", stream: "arts" },
      { text: "ICT+物理+數學延伸", effect: { digital: 15, math_skill: 15, stress: 10 }, trait: "tech", stream: "stem" }
    ],
    voiceover: "揀科要諗清楚！"
  },
  {
    id: "sub_choice_02",
    title: "補習班",
    description: "阿媽問你想補邊科...",
    icon: "✏️",
    options: [
      { text: "補數學", effect: { math_skill: 15, stress: 10, happiness: -5 }, trait: "practical", stream: "stem" },
      { text: "補英文", effect: { adaptability: 10, social: 5, happiness: 0 }, trait: "balanced", stream: "business" },
      { text: "補自己鍾意嘅科", effect: { happiness: 15, creative: 10, stress: -5 }, trait: "passionate", stream: "arts" },
      { text: "唔補，自己溫", effect: { adaptability: 15, stress: 5, happiness: 10 }, trait: "independent", stream: "stem" }
    ],
    voiceover: "補習有冇用？"
  },

  // === 興趣發展事件 ===
  {
    id: "sub_interest_01",
    title: "發現新興趣",
    description: "你發現自己對某樣嘢特別有興趣...",
    icon: "✨",
    options: [
      { text: "科學實驗", effect: { math_skill: 15, creative: 10, happiness: 15 }, trait: "curious", stream: "stem" },
      { text: "畫畫/音樂", effect: { creative: 20, happiness: 20, stress: -10 }, trait: "artistic", stream: "arts" },
      { text: "做生意/投資", effect: { social: 10, math_skill: 10, happiness: 10 }, trait: "business", stream: "business" },
      { text: "寫程式/砌電腦", effect: { digital: 20, math_skill: 10, happiness: 15 }, trait: "tech", stream: "stem" }
    ],
    voiceover: "興趣係最好嘅老師！"
  },
  {
    id: "sub_interest_02",
    title: "暑假計劃",
    description: "暑假想做啲咩？",
    icon: "☀️",
    options: [
      { text: "參加科學營", effect: { math_skill: 15, social: 10, happiness: 10 }, trait: "curious", stream: "stem" },
      { text: "學畫畫/音樂", effect: { creative: 20, happiness: 15, stress: -10 }, trait: "artistic", stream: "arts" },
      { text: "做暑期工", effect: { social: 15, adaptability: 15, happiness: 5 }, trait: "practical", stream: "business" },
      { text: "參加Coding Camp", effect: { digital: 20, math_skill: 10, happiness: 10 }, trait: "tech", stream: "stem" }
    ],
    voiceover: "暑假有好多嘢可以做！"
  },

  // === 考試/成績事件 ===
  {
    id: "sub_exam_01",
    title: "考試成績",
    description: "派成績表喇！",
    icon: "📝",
    options: [
      { text: "數理科特別好", effect: { math_skill: 15, happiness: 15, stress: -5 }, trait: "stem", stream: "stem" },
      { text: "文科/創意科好", effect: { creative: 15, happiness: 15, stress: -5 }, trait: "arts", stream: "arts" },
      { text: "平均發展", effect: { adaptability: 15, happiness: 10, stress: 0 }, trait: "balanced", stream: "business" },
      { text: "電腦科最叻", effect: { digital: 15, happiness: 15, stress: -5 }, trait: "tech", stream: "stem" }
    ],
    voiceover: "成績反映你嘅強項！"
  },
  {
    id: "sub_exam_02",
    title: "考試壓力",
    description: "DSE就快到，好大壓力...",
    icon: "😰",
    options: [
      { text: "制定溫習時間表", effect: { math_skill: 10, stress: 5, adaptability: 10 }, trait: "organized", stream: "stem" },
      { text: "做運動減壓", effect: { stress: -20, happiness: 15, adaptability: 10 }, trait: "healthy", stream: "social" },
      { text: "畫畫/聽歌放鬆", effect: { creative: 10, stress: -15, happiness: 15 }, trait: "artistic", stream: "arts" },
      { text: "同朋友傾訴", effect: { social: 15, stress: -10, happiness: 10 }, trait: "social", stream: "social" }
    ],
    voiceover: "壓力要識處理！"
  },

  // === 未來規劃事件 ===
  {
    id: "sub_future_01",
    title: "職業日",
    description: "學校職業日，你對邊個行業最有興趣？",
    icon: "💼",
    options: [
      { text: "醫生/工程師", effect: { math_skill: 10, happiness: 10, stress: 5 }, trait: "professional", stream: "stem" },
      { text: "設計師/藝術家", effect: { creative: 15, happiness: 15, stress: -5 }, trait: "creative", stream: "arts" },
      { text: "商人/銀行家", effect: { social: 10, math_skill: 10, happiness: 10 }, trait: "business", stream: "business" },
      { text: "社工/老師", effect: { social: 20, happiness: 15, stress: 0 }, trait: "caring", stream: "social" }
    ],
    voiceover: "諗下將來想做咩！"
  },
  {
    id: "sub_future_02",
    title: "JUPAS選科",
    description: "要填JUPAS喇！",
    icon: "🎓",
    options: [
      { text: "工程/理科", effect: { math_skill: 15, stress: 10, happiness: 10 }, trait: "stem", stream: "stem" },
      { text: "文學/設計", effect: { creative: 15, stress: 5, happiness: 15 }, trait: "arts", stream: "arts" },
      { text: "商科/法律", effect: { social: 10, math_skill: 10, happiness: 10 }, trait: "business", stream: "business" },
      { text: "教育/社科", effect: { social: 15, happiness: 15, stress: 5 }, trait: "social", stream: "social" }
    ],
    voiceover: "大學選科好緊要！"
  },

  // === 小學生專用事件（簡化版）===
  {
    id: "sub_primary_01",
    title: "最鍾意嘅堂",
    description: "你最鍾意上邊堂？",
    icon: "🏫",
    options: [
      { text: "數學堂", effect: { math_skill: 15, happiness: 10 }, trait: "logical", stream: "stem" },
      { text: "美術堂", effect: { creative: 15, happiness: 15 }, trait: "artistic", stream: "arts" },
      { text: "音樂堂", effect: { creative: 10, happiness: 15, social: 5 }, trait: "musical", stream: "arts" },
      { text: "體育堂", effect: { adaptability: 10, happiness: 15, stress: -10 }, trait: "active", stream: "social" }
    ],
    voiceover: "邊堂最好玩？"
  },
  {
    id: "sub_primary_02",
    title: "放學做咩",
    description: "放學後你會做咩？",
    icon: "🏠",
    options: [
      { text: "做功課溫書", effect: { math_skill: 10, stress: 5, adaptability: 5 }, trait: "diligent", stream: "stem" },
      { text: "畫畫砌積木", effect: { creative: 15, happiness: 10 }, trait: "creative", stream: "arts" },
      { text: "同朋友玩", effect: { social: 15, happiness: 15, stress: -10 }, trait: "social", stream: "social" },
      { text: "打機睇YouTube", effect: { digital: 10, happiness: 10, stress: -5 }, trait: "tech", stream: "stem" }
    ],
    voiceover: "放學時間點過？"
  }
];

// 學科路徑定義
export const SUBJECT_PATHS = {
  start: { name: "入學", icon: "🎒", position: 0 },
  paths: {
    stem: {
      name: "STEM理科",
      color: "#3b82f6",
      icon: "🔬",
      description: "數理邏輯、科學探究",
      subjects: ["數學", "物理", "化學", "生物", "電腦"],
      careers: ["工程師", "醫生", "科學家", "程式員"]
    },
    arts: {
      name: "人文藝術",
      color: "#8b5cf6",
      icon: "🎨",
      description: "創意表達、文化藝術",
      subjects: ["中文", "英文", "視藝", "音樂", "歷史"],
      careers: ["設計師", "作家", "藝術家", "記者"]
    },
    business: {
      name: "商業社科",
      color: "#f59e0b",
      icon: "💼",
      description: "商業思維、社會分析",
      subjects: ["經濟", "企會財", "地理", "通識"],
      careers: ["商人", "會計師", "律師", "銀行家"]
    },
    social: {
      name: "社會服務",
      color: "#22c55e",
      icon: "🤝",
      description: "助人為本、社會關懷",
      subjects: ["通識", "倫理", "心理"],
      careers: ["老師", "社工", "護士", "輔導員"]
    }
  }
};

// 學科任務（小學版）
export const SUBJECT_TASKS_PRIMARY = [
  {
    id: "stask_p_math",
    subject: "數學",
    path: "stem",
    title: "數學遊戲",
    description: "計算：25 + 37 = ?",
    type: "calculation",
    items: [{ name: "第一個數", amount: 25 }, { name: "加", amount: 37 }],
    correctAnswer: 62,
    timeLimit: 30,
    passScore: 100,
    emoji: "🧮"
  },
  {
    id: "stask_p_art",
    subject: "美術",
    path: "arts",
    title: "顏色配搭",
    description: "紅色+黃色會變成咩色？",
    type: "choice",
    options: [
      { text: "橙色", score: 100, emoji: "🟠" },
      { text: "綠色", score: 0, emoji: "🟢" },
      { text: "紫色", score: 0, emoji: "🟣" }
    ],
    timeLimit: 20,
    passScore: 70,
    emoji: "🎨"
  },
  {
    id: "stask_p_science",
    subject: "常識",
    path: "stem",
    title: "自然知識",
    description: "植物需要咩先可以生長？",
    type: "choice",
    options: [
      { text: "陽光、水、空氣", score: 100, emoji: "☀️" },
      { text: "只要水", score: 30, emoji: "💧" },
      { text: "只要泥土", score: 20, emoji: "🌱" }
    ],
    timeLimit: 25,
    passScore: 70,
    emoji: "🌿"
  },
  {
    id: "stask_p_music",
    subject: "音樂",
    path: "arts",
    title: "節拍感",
    description: "一個四分音符等於幾多個八分音符？",
    type: "choice",
    options: [
      { text: "2個", score: 100, emoji: "🎵" },
      { text: "4個", score: 0, emoji: "🎶" },
      { text: "1個", score: 0, emoji: "🎼" }
    ],
    timeLimit: 20,
    passScore: 70,
    emoji: "🎹"
  }
];

// 學科任務（中學版）
export const SUBJECT_TASKS_SECONDARY = [
  {
    id: "stask_s_math",
    subject: "數學",
    path: "stem",
    title: "代數方程",
    description: "解方程：2x + 5 = 13，x = ?",
    type: "calculation",
    items: [{ name: "13 - 5", amount: 8 }, { name: "除以2", amount: 2 }],
    correctAnswer: 4,
    timeLimit: 30,
    passScore: 100,
    emoji: "📐"
  },
  {
    id: "stask_s_physics",
    subject: "物理",
    path: "stem",
    title: "力學計算",
    description: "力 = 質量 x 加速度，10kg物體加速度2m/s²，力係幾多N？",
    type: "calculation",
    items: [{ name: "質量", amount: 10 }, { name: "乘以加速度", amount: 2 }],
    correctAnswer: 20,
    timeLimit: 30,
    passScore: 100,
    emoji: "⚛️"
  },
  {
    id: "stask_s_econ",
    subject: "經濟",
    path: "business",
    title: "供求分析",
    description: "當供應不變，需求增加，價格會點？",
    type: "choice",
    options: [
      { text: "價格上升", score: 100, emoji: "📈" },
      { text: "價格下跌", score: 0, emoji: "📉" },
      { text: "價格不變", score: 0, emoji: "➡️" }
    ],
    timeLimit: 25,
    passScore: 70,
    emoji: "💹"
  },
  {
    id: "stask_s_bio",
    subject: "生物",
    path: "stem",
    title: "細胞知識",
    description: "邊個唔係動物細胞嘅結構？",
    type: "choice",
    options: [
      { text: "細胞壁", score: 100, emoji: "🧱" },
      { text: "細胞核", score: 0, emoji: "🔴" },
      { text: "細胞膜", score: 0, emoji: "⭕" }
    ],
    timeLimit: 25,
    passScore: 70,
    emoji: "🔬"
  },
  {
    id: "stask_s_chinese",
    subject: "中文",
    path: "arts",
    title: "文言文",
    description: "「學而時習之」嘅「習」係咩意思？",
    type: "choice",
    options: [
      { text: "溫習、練習", score: 100, emoji: "📚" },
      { text: "習慣", score: 30, emoji: "🔄" },
      { text: "學習", score: 50, emoji: "📖" }
    ],
    timeLimit: 30,
    passScore: 70,
    emoji: "📜"
  },
  {
    id: "stask_s_ict",
    subject: "ICT",
    path: "stem",
    title: "程式邏輯",
    description: "for i in range(5) 會執行幾多次？",
    type: "calculation",
    items: [{ name: "0,1,2,3,4", amount: 5 }],
    correctAnswer: 5,
    timeLimit: 25,
    passScore: 100,
    emoji: "💻"
  },
  {
    id: "stask_s_bafs",
    subject: "企會財",
    path: "business",
    title: "會計概念",
    description: "資產 = 負債 + ?",
    type: "choice",
    options: [
      { text: "資本", score: 100, emoji: "💰" },
      { text: "收入", score: 20, emoji: "💵" },
      { text: "支出", score: 0, emoji: "💸" }
    ],
    timeLimit: 20,
    passScore: 70,
    emoji: "📊"
  }
];

// 學科里程碑
export const SUBJECT_MILESTONES = [
  { id: "sm1", name: "小一入學", position: 5, description: "開始學習之旅", reward: { happiness: 10 }, icon: "🎒" },
  { id: "sm2", name: "小學畢業", position: 15, description: "完成小學課程", reward: { math_skill: 10, happiness: 10 }, icon: "🎓" },
  { id: "sm3", name: "中一入學", position: 20, description: "升中適應", reward: { adaptability: 10 }, icon: "📚" },
  { id: "sm4", name: "中三選科", position: 35, description: "選擇DSE科目", reward: { happiness: 5, stress: 10 }, icon: "📋" },
  { id: "sm5", name: "DSE考試", position: 55, description: "人生大考", reward: { stress: 15 }, icon: "📝" },
  { id: "sm6", name: "放榜日", position: 60, description: "DSE成績出爐", reward: { happiness: 15 }, icon: "📊" },
  { id: "sm7", name: "JUPAS結果", position: 70, description: "大學取錄", reward: { happiness: 20, stress: -10 }, icon: "🎉" },
  { id: "sm8", name: "大學畢業", position: 90, description: "完成學業", reward: { happiness: 20, social: 10 }, icon: "🎓" }
];

// 學科模式廣東話語音
export const SUBJECT_VOICE = {
  welcome: "歡迎嚟到學科探索之旅！搵出你嘅興趣同強項！",
  stem_good: "數理思維好強！",
  arts_good: "好有創意呀！",
  business_good: "商業頭腦唔錯！",
  social_good: "好有愛心！",
  exam_coming: "考試就快到喇！",
  jupas_time: "JUPAS選科時間！",
  graduation: "恭喜畢業！"
};

// JUPAS課程數據
export const JUPAS_COURSES = {
  stem: [
    { code: "JS4601", name: "工程學", school: "HKU", score: 25, icon: "⚙️" },
    { code: "JS5200", name: "電腦科學", school: "CUHK", score: 27, icon: "💻" },
    { code: "JS3060", name: "醫學", school: "HKU", score: 35, icon: "🏥" },
    { code: "JS5101", name: "數學", school: "CUHK", score: 23, icon: "📐" },
    { code: "JS3240", name: "理學士", school: "HKUST", score: 24, icon: "🔬" }
  ],
  arts: [
    { code: "JS1041", name: "文學士", school: "HKU", score: 22, icon: "📚" },
    { code: "JS5331", name: "新聞傳播", school: "CUHK", score: 24, icon: "📰" },
    { code: "JS6717", name: "設計學", school: "PolyU", score: 21, icon: "🎨" },
    { code: "JS4802", name: "社會科學", school: "HKU", score: 23, icon: "🌐" },
    { code: "JS7200", name: "創意媒體", school: "CityU", score: 22, icon: "🎬" }
  ],
  business: [
    { code: "JS4725", name: "工商管理", school: "HKU", score: 28, icon: "💼" },
    { code: "JS5316", name: "環球商業", school: "CUHK", score: 30, icon: "🌍" },
    { code: "JS3240", name: "會計學", school: "HKUST", score: 26, icon: "📊" },
    { code: "JS6901", name: "金融學", school: "PolyU", score: 25, icon: "💰" },
    { code: "JS4066", name: "法學士", school: "HKU", score: 32, icon: "⚖️" }
  ],
  social: [
    { code: "JS4512", name: "教育學士", school: "HKU", score: 22, icon: "👨‍🏫" },
    { code: "JS5223", name: "社會工作", school: "CUHK", score: 23, icon: "🤝" },
    { code: "JS4068", name: "護理學", school: "HKU", score: 24, icon: "👩‍⚕️" },
    { code: "JS6456", name: "心理學", school: "CityU", score: 25, icon: "🧠" },
    { code: "JS8361", name: "幼兒教育", school: "EdUHK", score: 20, icon: "👶" }
  ]
};
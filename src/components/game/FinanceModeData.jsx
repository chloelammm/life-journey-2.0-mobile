// 理財模式 - 事件卡、任務、路徑數據

// 理財事件卡
export const FINANCE_EVENT_CARDS = [
  // === 儲蓄事件 ===
  {
    id: "fin_save_01",
    title: "第一份人工",
    description: "恭喜你出咗第一份糧！$8000點分配？",
    icon: "💵",
    options: [
      { text: "儲起50%", effect: { money: 20, stress: 5, happiness: 5, finance_skill: 15 }, trait: "saver" },
      { text: "儲起30%，其他使", effect: { money: 10, stress: -5, happiness: 10, finance_skill: 10 }, trait: "balanced" },
      { text: "全部使晒慶祝", effect: { money: -10, stress: -10, happiness: 20, finance_skill: -5 }, trait: "spender" }
    ],
    voiceover: "第一份糧嚟喇！"
  },
  {
    id: "fin_save_02",
    title: "利是錢處理",
    description: "新年收到$3000利是",
    icon: "🧧",
    options: [
      { text: "全部存銀行", effect: { money: 15, stress: 0, happiness: 5, finance_skill: 10 }, trait: "saver" },
      { text: "買禮物送家人", effect: { money: -5, stress: -5, happiness: 15, finance_skill: 5 }, trait: "balanced" },
      { text: "買自己想要嘅嘢", effect: { money: -10, stress: -5, happiness: 15, finance_skill: 0 }, trait: "spender" }
    ],
    voiceover: "利是錢點用好？"
  },
  {
    id: "fin_save_03",
    title: "儲蓄目標",
    description: "你想儲錢買咩？",
    icon: "🎯",
    options: [
      { text: "儲$10萬做緊急基金", effect: { money: 10, stress: 10, happiness: 5, finance_skill: 15 }, trait: "saver" },
      { text: "儲$5萬去旅行", effect: { money: 5, stress: -5, happiness: 15, finance_skill: 10 }, trait: "balanced" },
      { text: "唔儲住，有幾多使幾多", effect: { money: -5, stress: -10, happiness: 10, finance_skill: -5 }, trait: "spender" }
    ],
    voiceover: "定個儲蓄目標！"
  },

  // === 投資事件 ===
  {
    id: "fin_invest_01",
    title: "第一次投資",
    description: "你有$10000閒錢，想試下投資",
    icon: "📈",
    options: [
      { text: "買債券基金（穩定）", effect: { money: 5, stress: 0, happiness: 5, finance_skill: 10 }, trait: "conservative" },
      { text: "買股票基金（中風險）", effect: { money: 10, stress: 10, happiness: 10, finance_skill: 12 }, trait: "balanced" },
      { text: "買個股搏一鋪", effect: { money: 20, stress: 20, happiness: 15, finance_skill: 8 }, trait: "aggressive" }
    ],
    voiceover: "投資有風險！"
  },
  {
    id: "fin_invest_02",
    title: "股市大跌",
    description: "你嘅股票跌咗20%...",
    icon: "📉",
    options: [
      { text: "唔理佢，長線投資", effect: { money: 0, stress: 10, happiness: -5, finance_skill: 15 }, trait: "patient" },
      { text: "趁低吸納", effect: { money: -10, stress: 15, happiness: 5, finance_skill: 12 }, trait: "aggressive" },
      { text: "止蝕離場", effect: { money: -15, stress: -5, happiness: -10, finance_skill: 5 }, trait: "conservative" }
    ],
    voiceover: "股市有升有跌..."
  },
  {
    id: "fin_invest_03",
    title: "朋友介紹投資機會",
    description: "朋友話有個「穩賺」嘅投資...",
    icon: "🤝",
    options: [
      { text: "唔信，太好嘅嘢冇咁易", effect: { money: 0, stress: 0, happiness: 5, finance_skill: 15 }, trait: "wise" },
      { text: "投少少試下", effect: { money: -10, stress: 10, happiness: 5, finance_skill: 5 }, trait: "risky" },
      { text: "全副身家瞓落去", effect: { money: -30, stress: 25, happiness: -15, finance_skill: -10 }, trait: "foolish" }
    ],
    voiceover: "天下無免費午餐！"
  },

  // === 消費事件 ===
  {
    id: "fin_spend_01",
    title: "名牌誘惑",
    description: "朋友買咗個名牌袋，你都好想要...",
    icon: "👜",
    options: [
      { text: "忍住唔買", effect: { money: 5, stress: 10, happiness: -5, finance_skill: 10 }, trait: "saver" },
      { text: "買個平價替代品", effect: { money: -5, stress: 0, happiness: 10, finance_skill: 8 }, trait: "smart" },
      { text: "買！開心最緊要", effect: { money: -20, stress: -5, happiness: 15, finance_skill: -5 }, trait: "spender" }
    ],
    voiceover: "想要定需要？"
  },
  {
    id: "fin_spend_02",
    title: "雙11購物節",
    description: "網購平台大減價！",
    icon: "🛒",
    options: [
      { text: "只買需要嘅嘢", effect: { money: -5, stress: 0, happiness: 10, finance_skill: 12 }, trait: "smart" },
      { text: "趁平多買啲存貨", effect: { money: -15, stress: 5, happiness: 15, finance_skill: 5 }, trait: "moderate" },
      { text: "瘋狂掃貨", effect: { money: -25, stress: -5, happiness: 20, finance_skill: -10 }, trait: "spender" }
    ],
    voiceover: "減價要理智！"
  },
  {
    id: "fin_spend_03",
    title: "手機換新",
    description: "新iPhone出咗！你部機用咗2年...",
    icon: "📱",
    options: [
      { text: "繼續用，等壞先換", effect: { money: 10, stress: 5, happiness: -5, finance_skill: 12 }, trait: "frugal" },
      { text: "買上一代慳錢", effect: { money: -10, stress: 0, happiness: 10, finance_skill: 10 }, trait: "smart" },
      { text: "買最新款", effect: { money: -20, stress: -5, happiness: 15, finance_skill: 0 }, trait: "spender" }
    ],
    voiceover: "換唔換新機？"
  },

  // === 預算事件 ===
  {
    id: "fin_budget_01",
    title: "月結日",
    description: "今個月超支$2000...",
    icon: "📋",
    options: [
      { text: "下個月減少開支補返", effect: { money: 5, stress: 15, happiness: -10, finance_skill: 15 }, trait: "responsible" },
      { text: "用儲蓄填數", effect: { money: -10, stress: 5, happiness: 0, finance_skill: 5 }, trait: "moderate" },
      { text: "唔理佢，下個月再算", effect: { money: -15, stress: 0, happiness: 5, finance_skill: -10 }, trait: "careless" }
    ],
    voiceover: "預算管理好重要！"
  },
  {
    id: "fin_budget_02",
    title: "記帳習慣",
    description: "朋友建議你記帳...",
    icon: "📝",
    options: [
      { text: "每日記帳", effect: { money: 5, stress: 5, happiness: 5, finance_skill: 15 }, trait: "diligent" },
      { text: "每星期記一次", effect: { money: 3, stress: 0, happiness: 5, finance_skill: 10 }, trait: "moderate" },
      { text: "太麻煩，唔記", effect: { money: -5, stress: -5, happiness: 5, finance_skill: -5 }, trait: "lazy" }
    ],
    voiceover: "記帳係理財第一步！"
  },

  // === 突發事件 ===
  {
    id: "fin_emergency_01",
    title: "突發醫療",
    description: "要睇私家醫生，$800",
    icon: "🏥",
    options: [
      { text: "用緊急基金", effect: { money: -5, stress: 0, happiness: 5, finance_skill: 10 }, trait: "prepared" },
      { text: "用信用卡先", effect: { money: -10, stress: 10, happiness: 0, finance_skill: 0 }, trait: "unprepared" },
      { text: "等排街症", effect: { money: 0, stress: 15, happiness: -10, finance_skill: 5 }, trait: "frugal" }
    ],
    voiceover: "緊急基金好緊要！"
  },
  {
    id: "fin_emergency_02",
    title: "屋企要錢",
    description: "阿媽話家用唔夠...",
    icon: "👨‍👩‍👧",
    options: [
      { text: "即刻加家用", effect: { money: -15, stress: 5, happiness: 10, finance_skill: 5 }, trait: "filial" },
      { text: "幫手慳家計開支", effect: { money: -5, stress: 10, happiness: 5, finance_skill: 12 }, trait: "smart" },
      { text: "話自己都唔夠使", effect: { money: 0, stress: 15, happiness: -15, finance_skill: 0 }, trait: "selfish" }
    ],
    voiceover: "家庭責任..."
  }
];

// 理財路徑定義
export const FINANCE_PATHS = {
  start: { name: "起步", icon: "🏠", position: 0 },
  paths: {
    saver: {
      name: "儲蓄之路",
      color: "#22c55e",
      icon: "🏦",
      description: "穩健儲蓄，慢慢累積",
      careers: ["銀行職員", "公務員", "會計師"],
      netWorthBonus: 1.2
    },
    investor: {
      name: "投資之路",
      color: "#3b82f6",
      icon: "📈",
      description: "學習投資，錢搵錢",
      careers: ["基金經理", "投資顧問", "交易員"],
      netWorthBonus: 1.5
    },
    entrepreneur: {
      name: "創業之路",
      color: "#f59e0b",
      icon: "🚀",
      description: "創業致富，高風險高回報",
      careers: ["創業家", "老闆", "自由工作者"],
      netWorthBonus: 2.0
    },
    balanced: {
      name: "平衡之路",
      color: "#8b5cf6",
      icon: "⚖️",
      description: "儲蓄投資並重",
      careers: ["財務策劃師", "理財顧問"],
      netWorthBonus: 1.3
    }
  }
};

// 理財任務
export const FINANCE_TASKS = [
  // 儲蓄之路任務
  {
    id: "ftask_budget",
    career: "預算達人",
    path: "saver",
    title: "月度預算",
    description: "用$10000分配一個月開支",
    type: "allocation",
    budget: 10000,
    categories: [
      { name: "住屋", icon: "🏠", min: 30, max: 50 },
      { name: "食物", icon: "🍜", min: 15, max: 30 },
      { name: "交通", icon: "🚌", min: 5, max: 15 },
      { name: "儲蓄", icon: "🏦", min: 10, max: 30 },
      { name: "娛樂", icon: "🎮", min: 0, max: 20 }
    ],
    passCondition: "savings >= 20", // 儲蓄至少20%先合格
    timeLimit: 60,
    passScore: 70
  },
  {
    id: "ftask_savings_calc",
    career: "儲蓄計算",
    path: "saver",
    title: "複利計算",
    description: "計算5年後嘅儲蓄：本金$10000，年利率3%",
    type: "calculation",
    items: [
      { name: "本金", amount: 10000 },
      { name: "第1年利息", amount: 300 },
      { name: "第2年利息", amount: 309 },
      { name: "第3年利息", amount: 318 },
      { name: "第4年利息", amount: 328 },
      { name: "第5年利息", amount: 338 }
    ],
    correctAnswer: 11593,
    timeLimit: 45,
    passScore: 100
  },
  // 投資之路任務
  {
    id: "ftask_portfolio",
    career: "投資組合",
    path: "investor",
    title: "分散投資",
    description: "揀最佳投資組合",
    type: "choice",
    options: [
      { text: "100%股票", score: 30 },
      { text: "60%股票 + 40%債券", score: 90 },
      { text: "100%債券", score: 50 },
      { text: "50%股票 + 30%債券 + 20%現金", score: 80 }
    ],
    timeLimit: 30,
    passScore: 70
  },
  {
    id: "ftask_risk",
    career: "風險評估",
    path: "investor",
    title: "投資風險",
    description: "邊個投資最高風險？",
    type: "choice",
    options: [
      { text: "定期存款", score: 10 },
      { text: "政府債券", score: 20 },
      { text: "加密貨幣", score: 90 },
      { text: "藍籌股", score: 40 }
    ],
    timeLimit: 20,
    passScore: 70
  },
  {
    id: "ftask_pe_ratio",
    career: "股票分析",
    path: "investor",
    title: "市盈率計算",
    description: "股價$100，每股盈利$5，市盈率係幾多？",
    type: "calculation",
    items: [
      { name: "股價", amount: 100 },
      { name: "除以每股盈利", amount: 5 }
    ],
    correctAnswer: 20,
    timeLimit: 30,
    passScore: 100
  },
  // 創業之路任務
  {
    id: "ftask_startup_cost",
    career: "創業成本",
    path: "entrepreneur",
    title: "開業預算",
    description: "計算開茶餐廳嘅啟動資金",
    type: "calculation",
    items: [
      { name: "租金按金", amount: 60000 },
      { name: "裝修", amount: 150000 },
      { name: "設備", amount: 80000 },
      { name: "首批材料", amount: 30000 },
      { name: "牌照費", amount: 20000 }
    ],
    correctAnswer: 340000,
    timeLimit: 45,
    passScore: 100
  },
  {
    id: "ftask_pricing",
    career: "定價策略",
    path: "entrepreneur",
    title: "產品定價",
    description: "成本$30，想賺50%利潤，賣幾錢？",
    type: "calculation",
    items: [
      { name: "成本", amount: 30 },
      { name: "利潤率", amount: 50 }
    ],
    correctAnswer: 45,
    timeLimit: 25,
    passScore: 100
  },
  {
    id: "ftask_cashflow",
    career: "現金流管理",
    path: "entrepreneur",
    title: "現金流",
    description: "生意現金流點處理？",
    type: "choice",
    options: [
      { text: "有錢就使，冇就借", score: 20 },
      { text: "保持3個月營運資金", score: 90 },
      { text: "全部投資擴張", score: 30 }
    ],
    timeLimit: 25,
    passScore: 70
  },
  // 平衡之路任務
  {
    id: "ftask_networth",
    career: "淨資產計算",
    path: "balanced",
    title: "計算淨資產",
    description: "資產$500000，負債$150000",
    type: "calculation",
    items: [
      { name: "資產總值", amount: 500000 },
      { name: "減去負債", amount: -150000 }
    ],
    correctAnswer: 350000,
    timeLimit: 30,
    passScore: 100
  },
  {
    id: "ftask_retirement",
    career: "退休規劃",
    path: "balanced",
    title: "退休金計算",
    description: "想65歲退休有$500萬，30歲開始儲，每月要儲幾多？（假設5%回報）",
    type: "choice",
    options: [
      { text: "$3000", score: 30 },
      { text: "$5000", score: 90 },
      { text: "$10000", score: 50 },
      { text: "$15000", score: 20 }
    ],
    timeLimit: 30,
    passScore: 70
  }
];

// 理財里程碑
export const FINANCE_MILESTONES = [
  { id: "fm1", name: "第一桶金", position: 10, description: "儲到$10000", reward: { money: 10, finance_skill: 10 }, icon: "💰" },
  { id: "fm2", name: "記帳達人", position: 20, description: "連續記帳30日", reward: { finance_skill: 15, happiness: 5 }, icon: "📝" },
  { id: "fm3", name: "投資初哥", position: 30, description: "第一次投資", reward: { money: 5, finance_skill: 10 }, icon: "📊" },
  { id: "fm4", name: "零負債", position: 45, description: "還清所有債務", reward: { money: 15, stress: -10 }, icon: "✅" },
  { id: "fm5", name: "財務自由", position: 60, description: "被動收入超過支出", reward: { money: 20, happiness: 15 }, icon: "🏆" },
  { id: "fm6", name: "百萬富翁", position: 80, description: "淨資產達$100萬", reward: { money: 25, happiness: 20 }, icon: "💎" }
];

// 理財廣東話語音
export const FINANCE_VOICE = {
  welcome: "歡迎嚟到理財人生路！學識點樣管理你嘅錢！",
  save_good: "儲蓄係成功嘅第一步！",
  invest_wise: "投資要分散風險！",
  spend_smart: "識分想要同需要！",
  budget_check: "預算管理做得好！",
  debt_warning: "小心債務陷阱！",
  milestone: "理財里程碑達成！"
};
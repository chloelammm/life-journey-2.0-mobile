import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const GAME_MODES = [
  {
    id: 'career',
    name: '職業模式',
    icon: '💼',
    description: '探索4條職業路徑，體驗12種職業試工',
    color: 'from-blue-500 to-indigo-600',
    features: ['12種職業體驗', '性格分析', '退休結局']
  },
  {
    id: 'finance',
    name: '理財模式',
    icon: '💰',
    description: '學習預算分配、儲蓄投資，累積資產',
    color: 'from-emerald-500 to-teal-600',
    features: ['預算週期', '薪金分配', '淨資產目標']
  },
  {
    id: 'subject',
    name: '學科興趣模式',
    icon: '📚',
    description: '探索興趣同學科選擇，搵出適合自己嘅路',
    color: 'from-purple-500 to-pink-600',
    features: ['興趣問答', 'JUPAS模擬', '學科配對']
  }
];

const AGE_GROUPS = [
  { id: 'primary', name: '小學生', age: '6-12歲', icon: '🎒', grids: 50 },
  { id: 'secondary', name: '中學生', age: '12-18歲', icon: '📖', grids: 100 }
];

export default function GameModeSelector({ onSelect }) {
  const [selectedMode, setSelectedMode] = React.useState(null);
  const [selectedAge, setSelectedAge] = React.useState(null);

  const handleConfirm = () => {
    if (selectedMode && selectedAge) {
      onSelect({ mode: selectedMode, ageGroup: selectedAge });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <span className="text-6xl mb-4 block">🎮</span>
          <h1 className="text-3xl font-bold text-white mb-2">選擇遊戲模式</h1>
          <p className="text-purple-200">揀個適合你嘅冒險方式</p>
        </motion.div>

        {/* 年齡選擇 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3 text-center">你係邊個年齡組別？</h2>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {AGE_GROUPS.map((age, i) => (
              <motion.button
                key={age.id}
                onClick={() => setSelectedAge(age.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-center
                  ${selectedAge === age.id 
                    ? 'border-yellow-400 bg-yellow-400/20' 
                    : 'border-white/20 bg-white/5 hover:bg-white/10'}`}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-3xl block mb-2">{age.icon}</span>
                <span className="text-white font-bold block">{age.name}</span>
                <span className="text-white/60 text-sm">{age.age}</span>
                <span className="text-yellow-300 text-xs block mt-1">{age.grids}格棋盤</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 模式選擇 */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {GAME_MODES.map((mode, i) => (
            <motion.button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all text-left
                ${selectedMode === mode.id 
                  ? 'border-yellow-400 bg-gradient-to-br ' + mode.color 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {selectedMode === mode.id && (
                <motion.div
                  className="absolute top-3 right-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <span className="text-sm">✓</span>
                </motion.div>
              )}
              <span className="text-4xl block mb-3">{mode.icon}</span>
              <h3 className="text-xl font-bold text-white mb-2">{mode.name}</h3>
              <p className="text-white/70 text-sm mb-4">{mode.description}</p>
              <div className="space-y-1">
                {mode.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-white/60">
                    <span>•</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        {/* 確認按鈕 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleConfirm}
            disabled={!selectedMode || !selectedAge}
            className={`px-12 py-6 text-xl font-bold rounded-full transition-all
              ${selectedMode && selectedAge 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900' 
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
          >
            {selectedMode && selectedAge ? '開始冒險！' : '請選擇模式同年齡'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
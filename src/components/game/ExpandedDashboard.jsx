import React from 'react';
import { motion } from 'framer-motion';

const INDICATORS = {
  // 基本指標
  money: { label: '金錢', icon: '💰', color: 'emerald', max: 100 },
  stress: { label: '壓力', icon: '😤', color: 'red', max: 100, inverse: true },
  happiness: { label: '快樂', icon: '😊', color: 'blue', max: 100 },
  // 擴展指標
  finance_skill: { label: '理財能力', icon: '📊', color: 'cyan', max: 100 },
  math_skill: { label: '計算能力', icon: '🧮', color: 'violet', max: 100 },
  social_network: { label: '人際網絡', icon: '🤝', color: 'pink', max: 100 },
  adaptability: { label: '適應力', icon: '🌊', color: 'teal', max: 100 },
  digital_literacy: { label: '數碼素養', icon: '💻', color: 'indigo', max: 100 }
};

const COLOR_MAP = {
  emerald: { bg: 'bg-emerald-100', bar: 'bg-emerald-500', text: 'text-emerald-700' },
  red: { bg: 'bg-red-100', bar: 'bg-red-500', text: 'text-red-700' },
  blue: { bg: 'bg-blue-100', bar: 'bg-blue-500', text: 'text-blue-700' },
  cyan: { bg: 'bg-cyan-100', bar: 'bg-cyan-500', text: 'text-cyan-700' },
  violet: { bg: 'bg-violet-100', bar: 'bg-violet-500', text: 'text-violet-700' },
  pink: { bg: 'bg-pink-100', bar: 'bg-pink-500', text: 'text-pink-700' },
  teal: { bg: 'bg-teal-100', bar: 'bg-teal-500', text: 'text-teal-700' },
  indigo: { bg: 'bg-indigo-100', bar: 'bg-indigo-500', text: 'text-indigo-700' }
};

export default function ExpandedDashboard({ 
  stats, 
  gameMode = 'career',
  ageGroup = 'secondary',
  compact = false 
}) {
  // 根據模式顯示不同指標
  const getVisibleIndicators = () => {
    const base = ['money', 'stress', 'happiness'];
    
    if (gameMode === 'finance') {
      return [...base, 'finance_skill', 'math_skill'];
    } else if (gameMode === 'subject') {
      return [...base, 'math_skill', 'adaptability', 'digital_literacy'];
    } else {
      // career mode - 中學生顯示更多
      if (ageGroup === 'secondary') {
        return [...base, 'social_network', 'adaptability'];
      }
      return base;
    }
  };

  const visibleIndicators = getVisibleIndicators();

  if (compact) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
        <div className="grid grid-cols-3 gap-2">
          {visibleIndicators.slice(0, 3).map((key) => {
            const indicator = INDICATORS[key];
            const value = stats[key] || 50;
            const colors = COLOR_MAP[indicator.color];
            
            return (
              <div key={key} className={`${colors.bg} rounded-full px-2 py-1 flex items-center gap-1`}>
                <span className="text-xs">{indicator.icon}</span>
                <div className="flex-1 h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${colors.bar} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                  />
                </div>
                <span className={`text-xs font-bold ${colors.text}`}>{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
      <h3 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2">
        <span>📊</span> 能力指標
      </h3>
      
      <div className="space-y-2">
        {visibleIndicators.map((key, i) => {
          const indicator = INDICATORS[key];
          const value = stats[key] || 50;
          const colors = COLOR_MAP[indicator.color];
          
          return (
            <motion.div 
              key={key}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="text-lg w-6 text-center">{indicator.icon}</span>
              <span className="text-xs text-slate-500 w-16 truncate">{indicator.label}</span>
              <div className={`flex-1 h-2 ${colors.bg} rounded-full overflow-hidden`}>
                <motion.div 
                  className={`h-full ${colors.bar} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className={`text-xs font-bold w-8 text-right ${colors.text}`}>{value}</span>
            </motion.div>
          );
        })}
      </div>

      {/* 警告訊息 */}
      {stats.stress > 80 && (
        <motion.div 
          className="mt-3 p-2 bg-red-100 rounded-lg text-xs text-red-700"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          ⚠️ 壓力過高！記得休息下～
        </motion.div>
      )}
      
      {gameMode === 'finance' && stats.money < 20 && (
        <motion.div className="mt-3 p-2 bg-amber-100 rounded-lg text-xs text-amber-700">
          💡 錢唔夠？試下搵兼職或者減少開支！
        </motion.div>
      )}
    </div>
  );
}
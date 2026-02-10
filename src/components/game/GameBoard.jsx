import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dice({ onRoll, disabled }) {
  const [rolling, setRolling] = useState(false);
  const [currentValue, setCurrentValue] = useState(1);
  const [showResult, setShowResult] = useState(false);
  
  const diceEmojis = ['⚀', '⚁', '⚂', '⚃'];
  
  const handleRoll = () => {
    if (rolling || disabled) return;
    
    setRolling(true);
    setShowResult(false);
    
    // 播放搖骰動畫
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * 4) + 1);
      rollCount++;
      if (rollCount > 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 4) + 1;
        setCurrentValue(finalValue);
        setRolling(false);
        setShowResult(true);
        
        setTimeout(() => {
          onRoll?.(finalValue);
        }, 500);
      }
    }, 100);
  };
  
  return (
    <div className="absolute bottom-4 right-4">
      <motion.button
        onClick={handleRoll}
        disabled={rolling || disabled}
        className={`w-20 h-20 rounded-2xl bg-white shadow-lg border-4 
          flex items-center justify-center
          ${disabled ? 'opacity-50 cursor-not-allowed border-slate-200' : 'border-amber-300 hover:border-amber-400 cursor-pointer'}
          transition-all`}
        animate={rolling ? {
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1, 1.1, 1]
        } : {}}
        transition={{ duration: 0.5, repeat: rolling ? Infinity : 0 }}
        whileHover={!disabled && !rolling ? { scale: 1.05 } : {}}
        whileTap={!disabled && !rolling ? { scale: 0.95 } : {}}
      >
        <span className="text-5xl">
          {diceEmojis[currentValue - 1]}
        </span>
      </motion.button>
      
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-100 px-4 py-2 rounded-full"
        >
          <span className="text-amber-700 font-bold">
            行 {currentValue} 步！
          </span>
        </motion.div>
      )}
      
      {!showResult && !rolling && (
        <p className="text-sm text-slate-500">
          {disabled ? '等緊...' : '撳骰仔擲！'}
        </p>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

// 理財事件
const FINANCE_EVENTS = [
  {
    id: 'budget_1',
    type: 'budget',
    title: '月度預算',
    icon: '💵',
    description: '你今個月有$3000，點樣分配？',
    totalBudget: 3000,
    categories: [
      { name: '儲蓄', icon: '🏦', min: 0, recommended: 30 },
      { name: '交通', icon: '🚌', min: 10, recommended: 15 },
      { name: '食物', icon: '🍜', min: 20, recommended: 30 },
      { name: '娛樂', icon: '🎮', min: 0, recommended: 15 },
      { name: '學習', icon: '📚', min: 0, recommended: 10 }
    ]
  },
  {
    id: 'invest_1',
    type: 'investment',
    title: '投資選擇',
    icon: '📈',
    description: '你有$5000積蓄，點樣投資？',
    options: [
      { text: '全部存銀行', risk: 'low', return: 2, emoji: '🏦' },
      { text: '買債券基金', risk: 'medium', return: 5, emoji: '📊' },
      { text: '買股票', risk: 'high', return: 12, emoji: '📈' },
      { text: '學習課程', risk: 'none', return: 0, skill: 15, emoji: '🎓' }
    ]
  },
  {
    id: 'salary_1',
    type: 'salary',
    title: '第一份糧！',
    icon: '💰',
    description: '恭喜出糧！你有$15000，點處理？',
    salary: 15000,
    options: [
      { text: '50%儲蓄 30%生活 20%娛樂', effect: { money: 20, finance: 15, happiness: 5 }, emoji: '📊' },
      { text: '30%儲蓄 50%生活 20%娛樂', effect: { money: 10, finance: 10, happiness: 10 }, emoji: '⚖️' },
      { text: '10%儲蓄 40%生活 50%娛樂', effect: { money: -5, finance: -5, happiness: 20 }, emoji: '🎉' }
    ]
  },
  {
    id: 'expense_1',
    type: 'expense',
    title: '突發開支',
    icon: '😱',
    description: '部電話壞咗！要用$3000換新，但你只有$2000儲蓄...',
    options: [
      { text: '借錢買新機', effect: { money: -15, stress: 15, happiness: 5 }, emoji: '💳' },
      { text: '買平啲嘅型號', effect: { money: -5, stress: 5, happiness: 0 }, emoji: '📱' },
      { text: '整番舊機', effect: { money: -2, stress: 10, happiness: -5 }, emoji: '🔧' }
    ]
  }
];

export default function FinanceEvent({ 
  isOpen, 
  eventType = 'random', // random, budget, investment, salary, expense
  onComplete,
  onClose 
}) {
  const [event, setEvent] = useState(null);
  const [budgetAllocation, setBudgetAllocation] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  React.useEffect(() => {
    if (isOpen) {
      // 選擇事件
      let selectedEvent;
      if (eventType === 'random') {
        selectedEvent = FINANCE_EVENTS[Math.floor(Math.random() * FINANCE_EVENTS.length)];
      } else {
        selectedEvent = FINANCE_EVENTS.find(e => e.type === eventType) || FINANCE_EVENTS[0];
      }
      setEvent(selectedEvent);
      
      // 初始化預算分配
      if (selectedEvent.type === 'budget') {
        const initial = {};
        selectedEvent.categories.forEach(cat => {
          initial[cat.name] = cat.recommended;
        });
        setBudgetAllocation(initial);
      }
    }
  }, [isOpen, eventType]);

  if (!isOpen || !event) return null;

  const handleBudgetChange = (category, value) => {
    setBudgetAllocation(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const getTotalAllocation = () => {
    return Object.values(budgetAllocation).reduce((a, b) => a + b, 0);
  };

  const handleBudgetComplete = () => {
    const total = getTotalAllocation();
    const savingsPercent = budgetAllocation['儲蓄'] || 0;
    
    let effect = {
      money: savingsPercent > 25 ? 15 : savingsPercent > 15 ? 10 : 5,
      finance_skill: savingsPercent > 20 ? 10 : 5,
      happiness: budgetAllocation['娛樂'] > 20 ? 10 : budgetAllocation['娛樂'] > 10 ? 5 : 0,
      stress: total > 100 ? 10 : -5
    };
    
    onComplete({ 
      type: 'budget',
      allocation: budgetAllocation,
      effect
    });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;
    onComplete({
      type: event.type,
      option: selectedOption,
      effect: selectedOption.effect || {
        money: selectedOption.return || 0,
        finance_skill: 5,
        math_skill: selectedOption.skill || 0
      }
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
        >
          {/* 標題 */}
          <div className="text-center mb-6">
            <motion.span 
              className="text-5xl block mb-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {event.icon}
            </motion.span>
            <h2 className="text-xl font-bold text-slate-800">{event.title}</h2>
            <p className="text-slate-500 text-sm mt-1">{event.description}</p>
          </div>

          {/* 預算分配類型 */}
          {event.type === 'budget' && (
            <div className="space-y-4 mb-6">
              {event.categories.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="font-bold text-emerald-600">
                      {budgetAllocation[cat.name] || 0}%
                    </span>
                  </div>
                  <Slider
                    value={[budgetAllocation[cat.name] || 0]}
                    onValueChange={(v) => handleBudgetChange(cat.name, v[0])}
                    min={cat.min}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                </div>
              ))}
              
              <div className={`p-3 rounded-xl text-center ${
                getTotalAllocation() === 100 ? 'bg-green-100 text-green-700' :
                getTotalAllocation() > 100 ? 'bg-red-100 text-red-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                總計：{getTotalAllocation()}% 
                {getTotalAllocation() !== 100 && ` (需要100%)`}
              </div>
              
              <Button 
                onClick={handleBudgetComplete}
                disabled={getTotalAllocation() !== 100}
                className="w-full"
              >
                確認分配
              </Button>
            </div>
          )}

          {/* 選項類型 */}
          {(event.type === 'investment' || event.type === 'salary' || event.type === 'expense') && (
            <div className="space-y-3 mb-6">
              {event.options.map((option, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3
                    ${selectedOption === option 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-slate-200 hover:border-emerald-300'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <div className="flex-1 text-left">
                    <span className="font-medium text-slate-700 block">{option.text}</span>
                    {option.risk && (
                      <span className={`text-xs ${
                        option.risk === 'low' ? 'text-green-600' :
                        option.risk === 'medium' ? 'text-amber-600' :
                        option.risk === 'high' ? 'text-red-600' : 'text-slate-500'
                      }`}>
                        風險: {option.risk === 'low' ? '低' : option.risk === 'medium' ? '中' : option.risk === 'high' ? '高' : '無'}
                        {option.return > 0 && ` | 預期回報: ${option.return}%`}
                      </span>
                    )}
                  </div>
                  {selectedOption === option && (
                    <span className="text-emerald-500 text-xl">✓</span>
                  )}
                </motion.button>
              ))}
              
              {selectedOption && (
                <Button onClick={handleConfirm} className="w-full mt-4">
                  確認選擇
                </Button>
              )}
            </div>
          )}

          <button 
            onClick={onClose}
            className="w-full text-sm text-slate-400 hover:text-slate-600"
          >
            跳過
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
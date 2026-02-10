import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// 興趣問答題庫
const SUBJECT_QUESTIONS = {
  primary: [
    {
      id: 'p1',
      question: '你鍾意邊樣多啲？',
      icon: '🤔',
      options: [
        { text: '畫畫', emoji: '🎨', effect: { creative: 10, arts: 15 } },
        { text: '計數', emoji: '🧮', effect: { stable: 10, stem: 15 } },
        { text: '砌積木', emoji: '🧱', effect: { creative: 5, stem: 10, tech: 5 } }
      ]
    },
    {
      id: 'p2',
      question: '放假想做咩？',
      icon: '🏖️',
      options: [
        { text: '去博物館', emoji: '🏛️', effect: { stable: 5, arts: 10 } },
        { text: '打機', emoji: '🎮', effect: { tech: 15, risk: 5 } },
        { text: '踢波', emoji: '⚽', effect: { happiness: 10, social: 10 } }
      ]
    },
    {
      id: 'p3',
      question: '你覺得邊個職業最cool？',
      icon: '✨',
      options: [
        { text: '醫生', emoji: '👨‍⚕️', effect: { stable: 15, stem: 10 } },
        { text: 'YouTuber', emoji: '📹', effect: { creative: 15, risk: 10 } },
        { text: '科學家', emoji: '🔬', effect: { stem: 20, stable: 5 } }
      ]
    },
    {
      id: 'p4',
      question: '做功課時你會...',
      icon: '📝',
      options: [
        { text: '先做完再玩', emoji: '✅', effect: { stable: 15, finance: 5 } },
        { text: '邊做邊玩', emoji: '🎪', effect: { creative: 10, adaptability: 5 } },
        { text: '等最後先做', emoji: '⏰', effect: { risk: 10, stress: 5 } }
      ]
    }
  ],
  secondary: [
    {
      id: 's1',
      question: '你對邊個學科最有興趣？',
      icon: '📚',
      options: [
        { text: '數學/物理', emoji: '📐', effect: { stem: 20, math: 15, stable: 5 } },
        { text: '中文/歷史', emoji: '📖', effect: { arts: 20, creative: 10 } },
        { text: '經濟/商業', emoji: '📊', effect: { business: 20, finance: 15 } },
        { text: '電腦/IT', emoji: '💻', effect: { tech: 20, digital: 15 } }
      ]
    },
    {
      id: 's2',
      question: '你想將來讀邊類大學科目？',
      icon: '🎓',
      options: [
        { text: '工程/科學', emoji: '🔧', effect: { stem: 15, tech: 10, stable: 10 } },
        { text: '商科/金融', emoji: '💼', effect: { business: 20, finance: 15 } },
        { text: '設計/傳媒', emoji: '🎬', effect: { creative: 20, arts: 15 } },
        { text: '醫護/社工', emoji: '❤️', effect: { stable: 15, social: 15 } }
      ]
    },
    {
      id: 's3',
      question: 'DSE你會點部署？',
      icon: '📋',
      options: [
        { text: '揀最穩陣嘅科', emoji: '🛡️', effect: { stable: 20, stress: -5 } },
        { text: '揀自己最鍾意嘅', emoji: '❤️', effect: { creative: 15, happiness: 10 } },
        { text: '睇就業前景揀', emoji: '💰', effect: { business: 15, finance: 10 } }
      ]
    },
    {
      id: 's4',
      question: '你理想嘅工作環境係...',
      icon: '🏢',
      options: [
        { text: '穩定辦公室', emoji: '🖥️', effect: { stable: 20, stress: -10 } },
        { text: '自由創作空間', emoji: '🎨', effect: { creative: 20, happiness: 10 } },
        { text: '不斷出差見客', emoji: '✈️', effect: { risk: 15, social: 15, adaptability: 10 } }
      ]
    }
  ]
};

export default function SubjectQuiz({ 
  isOpen, 
  ageGroup = 'secondary',
  onComplete,
  onClose 
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [totalEffects, setTotalEffects] = useState({});

  if (!isOpen) return null;

  const questions = SUBJECT_QUESTIONS[ageGroup] || SUBJECT_QUESTIONS.secondary;
  const question = questions[currentQuestion];

  const handleSelect = (option) => {
    const newAnswers = [...answers, { question: question.id, option: option.text }];
    setAnswers(newAnswers);

    // 累計效果
    const newEffects = { ...totalEffects };
    Object.entries(option.effect).forEach(([key, value]) => {
      newEffects[key] = (newEffects[key] || 0) + value;
    });
    setTotalEffects(newEffects);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    onComplete({
      answers,
      effects: totalEffects,
      recommendedStream: getRecommendedStream(totalEffects)
    });
  };

  const getRecommendedStream = (effects) => {
    const streams = {
      stem: (effects.stem || 0) + (effects.math || 0) + (effects.tech || 0),
      arts: (effects.arts || 0) + (effects.creative || 0),
      business: (effects.business || 0) + (effects.finance || 0),
      social: (effects.social || 0) + (effects.stable || 0)
    };
    
    const max = Math.max(...Object.values(streams));
    const recommended = Object.entries(streams).find(([_, v]) => v === max)?.[0];
    
    const streamNames = {
      stem: { name: 'STEM理科', icon: '🔬', careers: ['工程師', '醫生', '科學家'] },
      arts: { name: '人文藝術', icon: '🎨', careers: ['設計師', '作家', '記者'] },
      business: { name: '商業金融', icon: '💼', careers: ['會計師', '銀行家', '企業家'] },
      social: { name: '社會服務', icon: '🤝', careers: ['老師', '社工', '護士'] }
    };
    
    return streamNames[recommended] || streamNames.stem;
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
          {!showResult ? (
            <>
              {/* 進度 */}
              <div className="flex gap-1 mb-6">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${
                      i <= currentQuestion ? 'bg-purple-500' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* 問題 */}
              <div className="text-center mb-6">
                <motion.span 
                  className="text-5xl block mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {question.icon}
                </motion.span>
                <h2 className="text-xl font-bold text-slate-800">{question.question}</h2>
              </div>

              {/* 選項 */}
              <div className="space-y-3">
                {question.options.map((option, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(option)}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 
                      hover:from-purple-50 hover:to-pink-50 border-2 border-transparent 
                      hover:border-purple-300 transition-all flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium text-slate-700">{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            /* 結果 */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <span className="text-6xl block mb-4">🎉</span>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">分析完成！</h2>
              
              {(() => {
                const stream = getRecommendedStream(totalEffects);
                return (
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
                    <span className="text-4xl block mb-2">{stream.icon}</span>
                    <h3 className="text-lg font-bold text-purple-700 mb-2">
                      推薦方向：{stream.name}
                    </h3>
                    <p className="text-sm text-purple-600 mb-3">適合職業：</p>
                    <div className="flex justify-center gap-2 flex-wrap">
                      {stream.careers.map((c, i) => (
                        <span key={i} className="px-3 py-1 bg-white rounded-full text-sm text-purple-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              <Button onClick={handleComplete} className="w-full">
                繼續遊戲
              </Button>
            </motion.div>
          )}

          {!showResult && (
            <button 
              onClick={onClose}
              className="mt-4 w-full text-sm text-slate-400 hover:text-slate-600"
            >
              跳過
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// JUPAS 課程數據
const JUPAS_COURSES = {
  stem: [
    { code: 'JS4601', name: '工程學', school: 'HKU', score: 25, icon: '⚙️' },
    { code: 'JS5200', name: '電腦科學', school: 'CUHK', score: 27, icon: '💻' },
    { code: 'JS3060', name: '醫學', school: 'HKU', score: 35, icon: '🏥' },
    { code: 'JS5101', name: '數學', school: 'CUHK', score: 23, icon: '📐' }
  ],
  arts: [
    { code: 'JS1041', name: '文學士', school: 'HKU', score: 22, icon: '📚' },
    { code: 'JS5331', name: '新聞傳播', school: 'CUHK', score: 24, icon: '📰' },
    { code: 'JS6717', name: '設計學', school: 'PolyU', score: 21, icon: '🎨' },
    { code: 'JS4802', name: '社會科學', school: 'HKU', score: 23, icon: '🌐' }
  ],
  business: [
    { code: 'JS4725', name: '工商管理', school: 'HKU', score: 28, icon: '💼' },
    { code: 'JS5316', name: '環球商業', school: 'CUHK', score: 30, icon: '🌍' },
    { code: 'JS3240', name: '會計學', school: 'HKUST', score: 26, icon: '📊' },
    { code: 'JS6901', name: '金融學', school: 'PolyU', score: 25, icon: '💰' }
  ],
  social: [
    { code: 'JS4512', name: '教育學士', school: 'HKU', score: 22, icon: '👨‍🏫' },
    { code: 'JS5223', name: '社會工作', school: 'CUHK', score: 23, icon: '🤝' },
    { code: 'JS4068', name: '護理學', school: 'HKU', score: 24, icon: '👩‍⚕️' },
    { code: 'JS6456', name: '心理學', school: 'CityU', score: 25, icon: '🧠' }
  ]
};

export default function JUPASSimulator({ 
  isOpen, 
  playerStats = {},
  recommendedStream = 'stem',
  onComplete,
  onClose 
}) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  // 計算模擬DSE分數 (基於玩家stats)
  const calculateDSEScore = () => {
    const base = 20;
    const bonus = (playerStats.math_skill || 50) / 10 + 
                  (playerStats.adaptability || 50) / 15 +
                  (100 - (playerStats.stress || 50)) / 20;
    return Math.round(base + bonus);
  };

  const dseScore = calculateDSEScore();

  const handleCourseSelect = (course) => {
    if (selectedCourses.find(c => c.code === course.code)) {
      setSelectedCourses(prev => prev.filter(c => c.code !== course.code));
    } else if (selectedCourses.length < 5) {
      setSelectedCourses(prev => [...prev, course]);
    }
  };

  const handleSubmit = () => {
    // 模擬結果
    const admittedCourse = selectedCourses.find(c => dseScore >= c.score);
    
    setResult({
      dseScore,
      admitted: admittedCourse || null,
      message: admittedCourse 
        ? `恭喜！你獲得 ${admittedCourse.school} ${admittedCourse.name} 取錄！`
        : '今次未能獲取錄，但唔好放棄！可以考慮其他出路。'
    });
    setShowResult(true);
  };

  const handleComplete = () => {
    onComplete({
      dseScore,
      admitted: result?.admitted,
      choices: selectedCourses
    });
  };

  const allCourses = Object.values(JUPAS_COURSES).flat();
  const recommendedCourses = JUPAS_COURSES[recommendedStream] || JUPAS_COURSES.stem;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
        >
          {!showResult ? (
            <>
              {/* 標題 */}
              <div className="text-center mb-6">
                <span className="text-5xl block mb-3">🎓</span>
                <h2 className="text-xl font-bold text-slate-800">JUPAS 模擬選科</h2>
                <p className="text-slate-500 text-sm mt-1">揀最多5個心儀課程（按優先次序）</p>
              </div>

              {/* DSE分數預測 */}
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 mb-6 text-center">
                <p className="text-sm text-slate-600 mb-1">你嘅預測DSE分數</p>
                <p className="text-4xl font-bold text-blue-600">{dseScore}</p>
                <p className="text-xs text-slate-500 mt-1">Best 5 科總分（滿分35分）</p>
              </div>

              {/* 推薦課程 */}
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-600 mb-2 flex items-center gap-2">
                  <span>⭐</span> 推薦課程
                </h3>
                <div className="space-y-2">
                  {recommendedCourses.map((course) => (
                    <CourseCard
                      key={course.code}
                      course={course}
                      dseScore={dseScore}
                      isSelected={selectedCourses.find(c => c.code === course.code)}
                      priority={selectedCourses.findIndex(c => c.code === course.code) + 1}
                      onSelect={() => handleCourseSelect(course)}
                    />
                  ))}
                </div>
              </div>

              {/* 其他課程 */}
              <details className="mb-6">
                <summary className="text-sm font-bold text-slate-600 cursor-pointer mb-2">
                  📋 其他課程
                </summary>
                <div className="space-y-2 mt-2">
                  {allCourses
                    .filter(c => !recommendedCourses.find(r => r.code === c.code))
                    .map((course) => (
                      <CourseCard
                        key={course.code}
                        course={course}
                        dseScore={dseScore}
                        isSelected={selectedCourses.find(c => c.code === course.code)}
                        priority={selectedCourses.findIndex(c => c.code === course.code) + 1}
                        onSelect={() => handleCourseSelect(course)}
                      />
                    ))}
                </div>
              </details>

              {/* 已選課程 */}
              {selectedCourses.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <h3 className="text-sm font-bold text-slate-600 mb-2">已選課程 ({selectedCourses.length}/5)</h3>
                  <div className="space-y-1">
                    {selectedCourses.map((c, i) => (
                      <div key={c.code} className="flex items-center gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span>{c.name}</span>
                        <span className="text-slate-400">({c.school})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={handleSubmit}
                disabled={selectedCourses.length === 0}
                className="w-full"
              >
                提交選擇
              </Button>
            </>
          ) : (
            /* 結果 */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <span className="text-6xl block mb-4">
                {result.admitted ? '🎉' : '💪'}
              </span>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">放榜結果</h2>
              
              <div className={`p-6 rounded-2xl mb-6 ${
                result.admitted 
                  ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
                  : 'bg-gradient-to-br from-amber-100 to-orange-100'
              }`}>
                {result.admitted && (
                  <div className="mb-3">
                    <span className="text-4xl block mb-2">{result.admitted.icon}</span>
                    <p className="text-lg font-bold text-green-700">{result.admitted.school}</p>
                    <p className="text-xl font-bold text-green-800">{result.admitted.name}</p>
                  </div>
                )}
                <p className={`text-sm ${result.admitted ? 'text-green-600' : 'text-amber-700'}`}>
                  {result.message}
                </p>
              </div>

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

function CourseCard({ course, dseScore, isSelected, priority, onSelect }) {
  const canAdmit = dseScore >= course.score;
  
  return (
    <motion.button
      onClick={onSelect}
      className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3
        ${isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : canAdmit 
            ? 'border-green-200 hover:border-green-400 bg-green-50/50'
            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'}`}
      whileTap={{ scale: 0.98 }}
    >
      {priority > 0 && (
        <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
          {priority}
        </span>
      )}
      <span className="text-2xl">{course.icon}</span>
      <div className="flex-1 text-left">
        <p className="font-medium text-slate-700 text-sm">{course.name}</p>
        <p className="text-xs text-slate-500">{course.school} • {course.code}</p>
      </div>
      <div className={`text-xs font-bold px-2 py-1 rounded-full ${
        canAdmit ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
      }`}>
        {course.score}分
      </div>
    </motion.button>
  );
}
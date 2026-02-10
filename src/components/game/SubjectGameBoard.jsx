import React from 'react';
import { motion } from 'framer-motion';

const PLAYER_AVATARS = {
  male: '👦',
  female: '👧',
  robot: '🤖'
};

export default function SubjectGameBoard({ 
  playerPosition = 0, 
  playerGender = 'male',
  currentPath = null,
  ageGroup = 'secondary'
}) {
  const TOTAL_TILES = ageGroup === 'primary' ? 50 : 100;
  const COLS = ageGroup === 'primary' ? 8 : 10;
  
  // 學科模式Zigzag棋盤
  const generateSubjectBoard = () => {
    const tiles = [];
    const gridSpacing = ageGroup === 'primary' ? 11.5 : 9.5;
    const leftMargin = ageGroup === 'primary' ? 5 : 3;
    const rowHeight = ageGroup === 'primary' ? 8 : 5;
    
    // 學科事件位置
    const mathEvents = [4, 12, 22, 32, 42, 52, 68, 82];
    const artEvents = [7, 17, 27, 37, 47, 57, 72, 88];
    const scienceEvents = [9, 19, 29, 39, 49, 62, 76, 92];
    const socialEvents = [14, 24, 34, 44, 54, 64, 78, 94];
    const examEvents = ageGroup === 'primary' ? [25, 45] : [35, 55, 70];
    const milestonePositions = ageGroup === 'primary' 
      ? [10, 25, 40] 
      : [15, 20, 35, 55, 60, 70, 90];
    
    const specialTiles = ageGroup === 'primary' ? {
      0: { name: '入學', icon: '🎒', type: 'start', size: 'large' },
      25: { name: '中學選科', icon: '📋', type: 'junction', size: 'large' },
      49: { name: '小學畢業', icon: '🎓', type: 'end', size: 'large' }
    } : {
      0: { name: '入學', icon: '🎒', type: 'start', size: 'large' },
      15: { name: '小學畢業', icon: '📚', type: 'milestone' },
      35: { name: 'DSE選科', icon: '📋', type: 'junction', size: 'large' },
      55: { name: 'DSE考試', icon: '📝', type: 'event', size: 'large' },
      70: { name: 'JUPAS放榜', icon: '🎉', type: 'milestone', size: 'large' },
      99: { name: '大學畢業', icon: '🎓', type: 'end', size: 'large' }
    };
    
    for (let pos = 0; pos < TOTAL_TILES; pos++) {
      const row = Math.floor(pos / COLS);
      const col = pos % COLS;
      const isReverse = row % 2 === 1;
      const actualCol = isReverse ? (COLS - 1 - col) : col;
      
      let tileData = {
        id: `tile_${pos}`,
        position: pos,
        type: 'blank',
        name: '',
        icon: '',
        x: leftMargin + actualCol * gridSpacing,
        y: 96 - row * rowHeight,
        size: 'normal',
        path: pos <= (ageGroup === 'primary' ? 25 : 35) ? null : undefined
      };
      
      if (specialTiles[pos]) {
        tileData = { ...tileData, ...specialTiles[pos] };
      } else if (mathEvents.includes(pos) && pos < TOTAL_TILES) {
        tileData.type = 'event';
        tileData.icon = '🧮';
        tileData.name = '數學';
        tileData.eventType = 'math';
        tileData.stream = 'stem';
      } else if (artEvents.includes(pos) && pos < TOTAL_TILES) {
        tileData.type = 'event';
        tileData.icon = '🎨';
        tileData.name = '藝術';
        tileData.eventType = 'art';
        tileData.stream = 'arts';
      } else if (scienceEvents.includes(pos) && pos < TOTAL_TILES) {
        tileData.type = 'event';
        tileData.icon = '🔬';
        tileData.name = '科學';
        tileData.eventType = 'science';
        tileData.stream = 'stem';
      } else if (socialEvents.includes(pos) && pos < TOTAL_TILES) {
        tileData.type = 'event';
        tileData.icon = '🤝';
        tileData.name = '社交';
        tileData.eventType = 'social';
        tileData.stream = 'social';
      } else if (examEvents.includes(pos)) {
        tileData.type = 'event';
        tileData.icon = '📝';
        tileData.name = '考試';
        tileData.eventType = 'exam';
      } else if (milestonePositions.includes(pos) && !specialTiles[pos]) {
        tileData.type = 'milestone';
        tileData.icon = '🏅';
        tileData.name = '里程碑';
      }
      
      tiles.push(tileData);
    }
    
    return tiles;
  };

  const tiles = generateSubjectBoard();
  const currentTile = tiles.find(t => t.position === playerPosition);
  const boardHeight = ageGroup === 'primary' ? '150vh' : '250vh';

  return (
    <div 
      className="relative w-full rounded-3xl overflow-visible shadow-2xl border-8 border-purple-300"
      style={{ 
        height: boardHeight,
        background: 'linear-gradient(to bottom, #f3e8ff, #e9d5ff, #d8b4fe, #c084fc)'
      }}
    >
      {/* 背景裝飾 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">📚</div>
        <div className="absolute top-40 right-20 text-6xl">🎓</div>
        <div className="absolute top-[30%] left-20 text-7xl">🔬</div>
        <div className="absolute top-[50%] right-10 text-6xl">🎨</div>
        <div className="absolute top-[70%] left-[40%] text-8xl">✏️</div>
      </div>

      {/* 標題 */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        <h2 className="text-2xl font-bold text-purple-800 bg-white/80 px-6 py-2 rounded-full shadow-lg">
          📚 學科探索之旅 📚
        </h2>
        <p className="text-center text-purple-600 text-sm mt-1">
          {ageGroup === 'primary' ? '小學版（50格）' : '中學版（100格）'}
        </p>
      </div>

      {/* 路徑連線 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        {tiles.slice(1).map((tile, i) => {
          const from = tiles[i];
          const to = tile;
          return (
            <line
              key={`line_${i}`}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="#7c3aed"
              strokeWidth="3"
              strokeOpacity="0.4"
            />
          );
        })}
      </svg>

      {/* 格子 */}
      {tiles.map((tile) => {
        const isCurrentTile = currentTile?.id === tile.id;
        const size = tile.size === 'large' ? 'w-14 h-14' : 'w-10 h-10';
        const isBlank = tile.type === 'blank';
        
        const bgColor = isBlank ? '#faf5ff' :
          tile.type === 'start' ? '#7c3aed' :
          tile.type === 'end' ? '#fbbf24' :
          tile.type === 'junction' ? '#ec4899' :
          tile.type === 'milestone' ? '#06b6d4' :
          tile.stream === 'stem' ? '#3b82f6' :
          tile.stream === 'arts' ? '#8b5cf6' :
          tile.stream === 'social' ? '#22c55e' :
          tile.eventType === 'exam' ? '#ef4444' :
          '#e9d5ff';
        
        return (
          <motion.div
            key={tile.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${tile.x}%`, 
              top: `${tile.y}%`,
              zIndex: isCurrentTile ? 25 : 10,
              opacity: isBlank ? 0.5 : 1
            }}
            whileHover={{ scale: isBlank ? 1.05 : 1.15 }}
          >
            <motion.div 
              className={`relative ${size} flex items-center justify-center`}
              animate={isCurrentTile ? { scale: [1, 1.08, 1] } : {}}
              transition={{ repeat: isCurrentTile ? Infinity : 0, duration: 1 }}
            >
              <div 
                className={`absolute inset-0 rounded-lg shadow-lg flex items-center justify-center
                  ${tile.type === 'event' || tile.eventType === 'exam' ? 'animate-pulse' : ''}
                  ${isBlank ? 'border-dashed border-2' : 'border-3'}`}
                style={{ 
                  backgroundColor: bgColor,
                  borderColor: isBlank ? '#d8b4fe' : '#5b21b6',
                  borderWidth: isBlank ? '2px' : '3px',
                  boxShadow: isCurrentTile ? `0 0 20px ${bgColor}` : 'none'
                }}
              >
                {!isBlank && (
                  <span className={tile.size === 'large' ? 'text-2xl' : 'text-base'}>
                    {tile.icon}
                  </span>
                )}
              </div>
              
              {!isBlank && (
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-purple-800 text-white rounded-full flex items-center justify-center text-[8px] font-bold shadow-md">
                  {tile.position}
                </div>
              )}
              
              {tile.name && !isBlank && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className={`text-[9px] font-bold px-1 py-0.5 rounded shadow-sm text-white
                    ${tile.type === 'start' ? 'bg-purple-700' : ''}
                    ${tile.type === 'end' ? 'bg-amber-600' : ''}
                    ${tile.type === 'junction' ? 'bg-pink-600' : ''}
                    ${tile.type === 'milestone' ? 'bg-cyan-600' : ''}
                    ${tile.stream === 'stem' ? 'bg-blue-600' : ''}
                    ${tile.stream === 'arts' ? 'bg-purple-600' : ''}
                    ${tile.stream === 'social' ? 'bg-green-600' : ''}
                    ${tile.eventType === 'exam' ? 'bg-red-600' : ''}
                  `}>
                    {tile.name}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })}

      {/* 玩家 */}
      {currentTile && (
        <motion.div
          className="absolute z-30"
          style={{ 
            left: `${currentTile.x}%`, 
            top: `${currentTile.y}%`
          }}
          animate={{ 
            y: [0, -8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-purple-500">
              <span className="text-2xl">{PLAYER_AVATARS[playerGender]}</span>
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-purple-900/30 rounded-full blur-sm" />
          </div>
        </motion.div>
      )}

      {/* 路徑標籤 */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-around z-20">
        {[
          { name: 'STEM理科', icon: '🔬', color: 'bg-blue-500' },
          { name: '人文藝術', icon: '🎨', color: 'bg-purple-500' },
          { name: '商業社科', icon: '💼', color: 'bg-amber-500' },
          { name: '社會服務', icon: '🤝', color: 'bg-green-500' }
        ].map((path) => (
          <div key={path.name} className={`${path.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1`}>
            <span>{path.icon}</span>
            <span>{path.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';

const PLAYER_AVATARS = {
  male: '👦',
  female: '👧',
  robot: '🤖'
};

export default function FinanceGameBoard({ 
  playerPosition = 0, 
  playerGender = 'male',
  currentPath = null,
  ageGroup = 'secondary'
}) {
  const TOTAL_TILES = ageGroup === 'primary' ? 50 : 100;
  const COLS = ageGroup === 'primary' ? 5 : 6;
  
  // 理財模式Zigzag棋盤
  const generateFinanceBoard = () => {
    const tiles = [];
    const gridSpacing = ageGroup === 'primary' ? 15 : 15;
    const leftMargin = ageGroup === 'primary' ? 15 : 15;
    const rowHeight = ageGroup === 'primary' ? 8 : 5.75;
    
    // 理財事件位置
    const savingEvents = [5, 15, 25, 40, 55, 70, 85];
    const investEvents = [10, 30, 50, 65, 80, 95];
    const budgetEvents = [8, 20, 35, 45, 60, 75, 90];
    const emergencyEvents = [18, 38, 58, 78];
    const milestonePositions = [10, 20, 30, 45, 60, 80];
    
    const specialTiles = {
      0: { name: '起步', icon: '🏠', type: 'start', size: 'large' },
      25: { name: '職業選擇', icon: '💼', type: 'junction', size: 'large' },
      [TOTAL_TILES - 1]: { name: '財務自由', icon: '🏆', type: 'end', size: 'large' }
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
        y: 4 + (row * rowHeight), // Starts at the top and goes DOWN
//      y: 96 - row * rowHeight,
        size: 'normal',
        path: pos <= 25 ? null : undefined
      };
      
      if (specialTiles[pos]) {
        tileData = { ...tileData, ...specialTiles[pos] };
      } else if (savingEvents.includes(pos)) {
        tileData.type = 'event';
        tileData.icon = '🏦';
        tileData.name = '儲蓄';
        tileData.eventType = 'saving';
      } else if (investEvents.includes(pos)) {
        tileData.type = 'event';
        tileData.icon = '📈';
        tileData.name = '投資';
        tileData.eventType = 'invest';
      } else if (budgetEvents.includes(pos)) {
        tileData.type = 'event';
        tileData.icon = '📋';
        tileData.name = '預算';
        tileData.eventType = 'budget';
      } else if (emergencyEvents.includes(pos)) {
        tileData.type = 'event';
        tileData.icon = '⚠️';
        tileData.name = '突發';
        tileData.eventType = 'emergency';
      } else if (milestonePositions.includes(pos)) {
        tileData.type = 'milestone';
        tileData.icon = '💰';
        tileData.name = '里程碑';
      }
      
      tiles.push(tileData);
    }
    
    return tiles;
  };

  const tiles = generateFinanceBoard();
  const currentTile = tiles.find(t => t.position === playerPosition);
  const boardHeight = ageGroup === 'primary' ? '1000px' : '2000px';

  return (
    <div 
      className="relative w-full rounded-3xl overflow-visible shadow-2xl border-8 border-emerald-300"
      style={{ 
        height: boardHeight,
        background: 'linear-gradient(to bottom, #d1fae5, #a7f3d0, #6ee7b7, #34d399)'
      }}
    >
      {/* 背景裝飾 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">💵</div>
        <div className="absolute top-40 right-20 text-6xl">📊</div>
        <div className="absolute top-[30%] left-20 text-7xl">🏦</div>
        <div className="absolute top-[50%] right-10 text-6xl">💳</div>
        <div className="absolute top-[70%] left-[40%] text-8xl">💰</div>
      </div>

      {/* 標題 */}
      {/* <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        <h2 className="text-2xl font-bold text-emerald-800 bg-white/80 px-6 py-2 rounded-full shadow-lg">
          💰 理財人生路 💰
        </h2>
      </div> */}

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
              stroke="#059669"
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
        
        const bgColor = isBlank ? '#ecfdf5' :
          tile.type === 'start' ? '#059669' :
          tile.type === 'end' ? '#fbbf24' :
          tile.type === 'junction' ? '#8b5cf6' :
          tile.type === 'milestone' ? '#06b6d4' :
          tile.eventType === 'saving' ? '#22c55e' :
          tile.eventType === 'invest' ? '#3b82f6' :
          tile.eventType === 'budget' ? '#f59e0b' :
          tile.eventType === 'emergency' ? '#ef4444' :
          '#d1fae5';
        
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
                  ${tile.type === 'event' ? 'animate-pulse' : ''}
                  ${isBlank ? 'border-dashed border-2' : 'border-3'}`}
                style={{ 
                  backgroundColor: bgColor,
                  borderColor: isBlank ? '#a7f3d0' : '#065f46',
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
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-800 text-white rounded-full flex items-center justify-center text-[8px] font-bold shadow-md">
                  {tile.position+ 1}
                </div>
              )}
              
              {tile.name && !isBlank && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className={`text-[9px] font-bold px-1 py-0.5 rounded shadow-sm text-white
                    ${tile.type === 'start' ? 'bg-emerald-700' : ''}
                    ${tile.type === 'end' ? 'bg-amber-600' : ''}
                    ${tile.type === 'junction' ? 'bg-purple-600' : ''}
                    ${tile.type === 'milestone' ? 'bg-cyan-600' : ''}
                    ${tile.type === 'event' ? 'bg-emerald-600' : ''}
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
            <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-emerald-500">
              <span className="text-2xl">{PLAYER_AVATARS[playerGender]}</span>
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-emerald-900/30 rounded-full blur-sm" />
          </div>
        </motion.div>
      )}

      {/* 路徑標籤
      <div className="absolute bottom-4 left-4 right-4 flex justify-around z-20">
        {[
          { name: '儲蓄之路', icon: '🏦', color: 'bg-green-500' },
          { name: '投資之路', icon: '📈', color: 'bg-blue-500' },
          { name: '創業之路', icon: '🚀', color: 'bg-amber-500' },
          { name: '平衡之路', icon: '⚖️', color: 'bg-purple-500' }
        ].map((path) => (
          <div key={path.name} className={`${path.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1`}>
            <span>{path.icon}</span>
            <span>{path.name}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
}
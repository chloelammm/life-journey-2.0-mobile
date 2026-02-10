import React from 'react';
import { motion } from 'framer-motion';
import { BOARD_PATHS } from './GameData';

const PLAYER_AVATARS = {
  male: '👦',
  female: '👧',
  robot: '🤖'
};

export default function LargeGameBoard({ 
  playerPosition, 
  playerGender, 
  currentPath
}) {
  // Jumanji風格Zigzag棋盤 - 100格
  const generateJumanjiBoard = () => {
    const tiles = [];
    const COLS = 10; // 每行10格
    const TOTAL_TILES = 100; // 總共100格
    const gridSpacing = 10; // 格子間距（%）
    const leftMargin = 3; // 左邊距
    const rowHeight = 9.5; // 行高（%）
    
    // 事件格子列表（特定位置觸發事件）
    const eventPositions = [4, 8, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85, 91, 96];
    const milestonePositions = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    
    // 特殊格子定義
    const specialTiles = {
      0: { name: '起點', icon: '🏛️', type: 'start', size: 'large' },
      6: { name: '小學', icon: '📚', type: 'milestone' },
      15: { name: '中學', icon: '🎒', type: 'milestone' },
      25: { name: '分岔路', icon: '🔀', type: 'junction', size: 'large' },
      99: { name: '退休', icon: '🏝️', type: 'end', size: 'large' }
    };
    
    for (let pos = 0; pos < TOTAL_TILES; pos++) {
      const row = Math.floor(pos / COLS);
      const col = pos % COLS;
      const isReverse = row % 2 === 1; // 偶數行從左到右，奇數行從右到左
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
        path: pos <= 25 ? null : undefined // 前25格共同路徑
      };
      
      // 特殊格子
      if (specialTiles[pos]) {
        tileData = { ...tileData, ...specialTiles[pos] };
      }
      // 事件格子
      else if (eventPositions.includes(pos)) {
        tileData.type = 'event';
        tileData.icon = ['🎲', '⚡', '💫', '🌟', '✨'][Math.floor(Math.random() * 5)];
        tileData.name = '事件';
      }
      // 里程碑
      else if (milestonePositions.includes(pos)) {
        tileData.type = 'milestone';
        tileData.icon = '🏅';
        tileData.name = '里程碑';
      }
      // 普通格子（每隔幾格有名稱）
      else if (pos % 5 === 0 && pos > 25 && pos < 99) {
        const names = ['學習', '工作', '社交', '健康', '財富', '成長', '挑戰', '機會'];
        tileData.name = names[Math.floor(Math.random() * names.length)];
        tileData.icon = ['📖', '💼', '🤝', '🏃', '💰', '🌱', '⚔️', '🎁'][Math.floor(Math.random() * 8)];
        tileData.type = 'normal';
      }
      
      tiles.push(tileData);
    }
    
    return tiles;
  };
  
  const tiles = generateJumanjiBoard();
  
  const getCurrentTile = () => {
    return tiles.find(t => t.position === playerPosition);
  };
  
  const currentTile = getCurrentTile();
  
  // 生成Zigzag連線
  const generatePathLines = () => {
    const lines = [];
    
    for (let i = 1; i < tiles.length; i++) {
      const from = tiles[i - 1];
      const to = tiles[i];
      lines.push({ 
        from, 
        to, 
        color: '#94a3b8',
        key: `line_${i}`
      });
    }
    
    return lines;
  };
  
  const pathLines = generatePathLines();
  
  return (
    <div className="relative w-full h-[250vh] bg-gradient-to-b from-amber-50 via-orange-50 via-rose-50 to-purple-50 rounded-3xl overflow-visible shadow-2xl border-8 border-amber-300">
      {/* Jumanji風格木紋 */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(139, 69, 19, 0.1) 50px, rgba(139, 69, 19, 0.1) 52px)`,
      }} />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(101, 67, 33, 0.1) 50px, rgba(101, 67, 33, 0.1) 52px)`,
      }} />
      
      {/* 裝飾 */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-[5%] right-[10%] text-4xl opacity-20">🏙️</span>
        <span className="absolute top-[25%] left-[5%] text-3xl opacity-20">🌸</span>
        <span className="absolute top-[45%] right-[8%] text-3xl opacity-20">⭐</span>
        <span className="absolute top-[65%] left-[12%] text-3xl opacity-20">🚇</span>
        <span className="absolute top-[85%] right-[15%] text-3xl opacity-20">🌆</span>
      </div>
      
      {/* 路徑標籤 */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {Object.entries(BOARD_PATHS.paths).map(([key, path]) => (
          <span 
            key={key}
            className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
            style={{ backgroundColor: path.color }}
          >
            {path.icon} {path.name}
          </span>
        ))}
      </div>
      
      {/* 路徑連線 */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {pathLines.map((line) => (
          <g key={line.key}>
            <line
              x1={`${line.from.x}%`}
              y1={`${line.from.y}%`}
              x2={`${line.to.x}%`}
              y2={`${line.to.y}%`}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <line
              x1={`${line.from.x}%`}
              y1={`${line.from.y}%`}
              x2={`${line.to.x}%`}
              y2={`${line.to.y}%`}
              stroke={line.color}
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.8"
            />
            <line
              x1={`${line.from.x}%`}
              y1={`${line.from.y}%`}
              x2={`${line.to.x}%`}
              y2={`${line.to.y}%`}
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.4"
            />
          </g>
        ))}
      </svg>
      
      {/* Zigzag格子（60格）*/}
      {tiles.map((tile) => {
        const isCurrentTile = currentTile?.id === tile.id;
        const size = tile.size === 'large' ? 'w-14 h-14' : 'w-10 h-10';
        const isBlank = tile.type === 'blank';
        
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
              {/* Jumanji風格格子 */}
              <div 
                className={`
                  absolute inset-0 rounded-lg shadow-lg
                  flex items-center justify-center
                  border-3
                  ${tile.type === 'event' ? 'animate-pulse' : ''}
                  ${isBlank ? 'border-dashed' : ''}
                `}
                style={{ 
                  backgroundColor: isBlank ? '#fafaf9' :
                    tile.type === 'start' ? '#d97706' :
                    tile.type === 'end' ? '#eab308' :
                    tile.type === 'junction' ? '#db2777' :
                    tile.type === 'milestone' ? '#06b6d4' :
                    tile.type === 'event' ? '#9333ea' :
                    '#f5f5f4',
                  borderColor: isBlank ? '#d6d3d1' :
                    tile.type === 'start' || tile.type === 'end' || tile.type === 'junction' ? '#78350f' : 
                    tile.type === 'milestone' ? '#0e7490' :
                    tile.type === 'event' ? '#7e22ce' : '#a8a29e',
                  borderWidth: isBlank ? '2px' : '3px',
                  boxShadow: isCurrentTile ? `0 0 20px ${tile.type === 'start' ? '#d97706' : tile.type === 'event' ? '#9333ea' : '#0ea5e9'}, inset 0 2px 4px rgba(255,255,255,0.3)` : 'inset 0 2px 4px rgba(255,255,255,0.2)'
                }}
              >
                {!isBlank && (
                  <span className={tile.size === 'large' ? 'text-2xl' : 'text-base'}>
                    {tile.icon}
                  </span>
                )}
              </div>
              
              {/* 格子編號 */}
              {!isBlank && (
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-slate-800 text-white rounded-full flex items-center justify-center text-[8px] font-bold shadow-md">
                  {tile.position}
                </div>
              )}
              
              {/* 名稱 */}
              {tile.name && !isBlank && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center">
                  <div className={`
                    text-[9px] font-bold px-1 py-0.5 rounded shadow-sm
                    ${tile.type === 'start' ? 'bg-amber-700 text-white' : ''}
                    ${tile.type === 'end' ? 'bg-yellow-600 text-white' : ''}
                    ${tile.type === 'junction' ? 'bg-pink-600 text-white' : ''}
                    ${tile.type === 'milestone' ? 'bg-cyan-600 text-white' : ''}
                    ${tile.type === 'event' ? 'bg-purple-600 text-white' : ''}
                    ${tile.type === 'normal' ? 'bg-slate-700 text-white' : ''}
                  `}>
                    {tile.name}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
      
      {/* 玩家棋子 */}
      {currentTile && (
        <motion.div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ zIndex: 50 }}
          initial={false}
          animate={{ 
            left: `${currentTile.x}%`, 
            top: `${currentTile.y -1}%` 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 120, 
            damping: 15
          }}
        >
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-10 h-4 bg-black/20 rounded-full blur-md" />
          
          <motion.div 
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-white to-blue-50 
              shadow-2xl flex items-center justify-center
              ring-4 ring-blue-400 border-4 border-white">
              <span className="text-4xl">{PLAYER_AVATARS[playerGender] || '👦'}</span>
            </div>
            
            <motion.div 
              className="absolute inset-0 rounded-full bg-blue-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ zIndex: -1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
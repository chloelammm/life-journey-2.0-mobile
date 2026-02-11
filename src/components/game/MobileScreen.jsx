import { useState } from 'react';
import LargeGameBoard from './LargeGameBoard';
import Dice from './Dice';

export default function MobileScreen() {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [playerGender, setPlayerGender] = useState('male');
  const [currentPath, setCurrentPath] = useState(null);

  const handleRoll = (steps) => {
    setPlayerPosition(prev => Math.min(prev + steps, 99));
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-50">
      {/* 1. TOP HEADER (Fixed or Scroll) */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md p-4 border-b shadow-sm">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <h1 className="text-lg font-bold text-slate-800">Life Journey</h1>
          <div className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">
            Step: {playerPosition}/99
          </div>
        </div>
      </header>

      {/* 2. DICE (Sticky so it stays visible while scrolling the board) */}
      <div className="sticky top-[61px] z-20 p-4 bg-gradient-to-b from-amber-50 to-transparent flex justify-center">
        <div className="scale-90 transform">
           <Dice onRoll={handleRoll} disabled={false} />
        </div>
      </div>

      <main className="flex-1 w-full max-w-md mx-auto px-4 pb-20 space-y-6">
        
        {/* 3. GAMEBOARD - Adjusted Scaling */}
        <section className="relative overflow-hidden rounded-3xl border-4 border-amber-200 shadow-2xl bg-white">
          <div className="w-full overflow-x-auto">
            {/* We use a min-width to prevent the zigzag from collapsing too thin */}
            <div className="min-w-[400px] h-[70vh]">
              <LargeGameBoard 
                playerPosition={playerPosition} 
                playerGender={playerGender} 
                currentPath={currentPath} 
              />
            </div>
          </div>
        </section>

        {/* 4. INDICATORS (Moved here as requested) */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Capability Indicators</h3>
          <div className="space-y-4">
            {/* Example Indicator */}
            <div className="flex items-center gap-3">
              <span className="text-xl">💰</span>
              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-1/2" />
              </div>
              <span className="text-xs font-bold text-slate-600">50</span>
            </div>
            {/* ... other indicators */}
          </div>
        </section>

        {/* 5. RADAR GRAPH */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-64 flex items-center justify-center">
          <p className="text-slate-400 italic text-sm">Radar Graph Component Here</p>
        </section>

      </main>
    </div>
  );
}
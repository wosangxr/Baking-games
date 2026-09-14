import React, { useState, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles } from 'lucide-react';
import { SilverWhisk } from '../ui/SilverWhisk';

export const WhiskMixStep: React.FC = () => {
  const { currentRecipe, mixProgress, stirBowl } = useGame();
  const bowlRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isInside, setIsInside] = useState(false);

  // Calculate swirling angle from center of the bowl
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bowlRef.current) return;
    const rect = bowlRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setCursorPos({
      x: mouseX - rect.left,
      y: mouseY - rect.top,
    });

    const angle = Math.atan2(mouseY - centerY, mouseX - centerX);

    if (lastAngleRef.current !== null) {
      let diff = Math.abs(angle - lastAngleRef.current);
      // Handle boundary wrap around pi / -pi
      if (diff > Math.PI) {
        diff = Math.abs(diff - 2 * Math.PI);
      }

      if (diff > 0.08) {
        // Increment stirring progress based on circular movement
        const delta = Math.min(4, diff * 3.5);
        stirBowl(delta);
        lastAngleRef.current = angle;
      }
    } else {
      lastAngleRef.current = angle;
    }
  };

  const handleMouseEnter = () => setIsInside(true);
  const handleMouseLeave = () => {
    setIsInside(false);
    lastAngleRef.current = null;
  };

  // Support click / spacebar as easy fallback
  const handleQuickStir = () => {
    stirBowl(6);
  };

  // Batter color based on recipe
  const getBatterColor = () => {
    if (!currentRecipe) return '#F9E4B7';
    if (currentRecipe.id === 'matcha_tart') return '#A4B482';
    if (currentRecipe.id === 'cookie') return '#D8B18A';
    return '#FDE8BE'; // warm creamy golden
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 select-none">
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-[#8C6B53] tracking-wider uppercase">
          ขั้นตอนที่ 2 จาก 5
        </span>
        <h2 className="text-2xl font-bold text-[#543310]">
          วนเคอร์เซอร์คนแป้งให้เข้ากัน 🥄
        </h2>
        <p className="text-sm text-[#8C6B53] mt-1">
          เลื่อนเคอร์เซอร์เมาส์วนเป็นวงกลมในชาม เพื่อตีเนื้อแป้งให้เนียนนุ่มฟู
        </p>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto mb-8 bg-[#FFFDF9] border-2 border-[#E5D2BE] p-4 rounded-3xl shadow-sm">
        <div className="flex justify-between items-center text-sm font-bold text-[#6F452A] mb-2">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#E08A56]" />
            ความเนียนของเนื้อแป้ง
          </span>
          <span className="text-base text-[#543310]">{Math.round(mixProgress)}%</span>
        </div>
        <div className="w-full h-4 bg-[#EFE3D5] rounded-full overflow-hidden p-0.5 border border-[#DECAB7]">
          <div
            className="h-full bg-gradient-to-r from-[#D4A373] to-[#C08552] rounded-full transition-all duration-150"
            style={{ width: `${mixProgress}%` }}
          />
        </div>
      </div>

      {/* Interactive Whisk Bowl Area */}
      <div className="flex flex-col items-center justify-center">
        <div
          ref={bowlRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleQuickStir}
          className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-b from-[#FFFDF9] to-[#EBD9C8] border-8 border-[#C5A880] shadow-2xl flex items-center justify-center cursor-none overflow-hidden"
        >
          {/* Batter depth inside bowl */}
          <div
            className="w-64 h-64 sm:w-76 sm:h-76 rounded-full transition-colors duration-500 flex items-center justify-center shadow-inner relative overflow-hidden"
            style={{ backgroundColor: getBatterColor() }}
          >
            {/* Swirl lines visual effect */}
            <div
              className="absolute inset-0 opacity-40 rounded-full border-4 border-dashed border-[#FFFDF9]"
              style={{
                transform: `rotate(${mixProgress * 3.6}deg)`,
                transition: 'transform 0.1s linear',
              }}
            />
            <div
              className="absolute inset-6 opacity-30 rounded-full border-4 border-dotted border-[#FFFDF9]"
              style={{
                transform: `rotate(${-mixProgress * 4.2}deg)`,
                transition: 'transform 0.1s linear',
              }}
            />

            {/* Status in the batter */}
            <div className="text-center font-bold text-[#6F452A] text-sm opacity-90 pointer-events-none flex items-center justify-center gap-2 bg-[#FAF5EE]/70 px-4 py-2 rounded-2xl border border-[#DEC8B2]/50 shadow-xs">
              <div style={{ transform: 'rotate(-135deg)' }} className="shrink-0 flex items-center justify-center">
                <SilverWhisk className="w-6 h-6" />
              </div>
              <span>
                {mixProgress < 30 && 'กำลังเริ่มผสม...'}
                {mixProgress >= 30 && mixProgress < 75 && 'เริ่มเข้ากันแล้ว หอมมาก~'}
                {mixProgress >= 75 && 'เนื้อแป้งเนียนนุ่มสมบูรณ์แบบ! ✨'}
              </span>
            </div>
          </div>

          {/* Custom Silver Whisk Cursor following mouse */}
          {isInside && cursorPos && (
            <div
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-75"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
              }}
            >
              <div 
                className="filter drop-shadow-lg select-none"
                style={{ transform: 'rotate(-135deg)' }}
              >
                <SilverWhisk className="w-16 h-16" />
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-xs text-[#8C6B53] bg-[#FAF4ED] px-4 py-2 rounded-full border border-[#E8D8C7]">
          💡 เคล็ดลับ: เลื่อนเมาส์วนเป็นวงกลมในชาม หรือคลิกย้ำๆ เพื่อคนแป้ง
        </p>
      </div>
    </div>
  );
};

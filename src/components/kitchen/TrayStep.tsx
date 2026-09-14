import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CozyButton } from '../ui/CozyButton';
import { ArrowRight } from 'lucide-react';
import { sound } from '../../audio/soundManager';

export const TrayStep: React.FC = () => {
  const { currentRecipe, placeOnTray } = useGame();
  const [placedCount, setPlacedCount] = useState<number>(0);
  const targetCount = 3;

  if (!currentRecipe) return null;

  const handleDropPortion = (index: number) => {
    if (placedCount <= index) {
      sound.playPlop();
      setPlacedCount(prev => prev + 1);
    }
  };

  const isReady = placedCount >= targetCount;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-[#8C6B53] tracking-wider uppercase">
          ขั้นตอนที่ 3 จาก 5
        </span>
        <h2 className="text-2xl font-bold text-[#543310]">
          ขึ้นรูปและวางลงบนถาดอบ 🥧
        </h2>
        <p className="text-sm text-[#8C6B53] mt-1">
          คลิกที่ช่องว่างบนกระดาษไขเพื่อหยอดแป้งลงบนถาดอบ ({placedCount}/{targetCount})
        </p>
      </div>

      {/* Baking Tray Graphic */}
      <div className="max-w-2xl mx-auto bg-[#D8C7B5] border-4 border-[#8C6B53] rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col items-center">
        {/* Parchment Paper */}
        <div className="w-full bg-[#FFFDF9] border-2 border-dashed border-[#DFC4AA] rounded-2xl p-8 shadow-inner">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 justify-items-center">
            {Array.from({ length: targetCount }).map((_, idx) => {
              const isFilled = idx < placedCount;

              return (
                <button
                  key={idx}
                  onClick={() => handleDropPortion(idx)}
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center cursor-pointer select-none ${
                    isFilled
                      ? 'bg-[#F9EFE4] border-[#D4A373] shadow-md scale-105'
                      : 'bg-[#FDF8F2] border-dashed border-[#DECAB7] hover:bg-[#FAF0E4] hover:border-[#C08552]'
                  }`}
                >
                  {isFilled ? (
                    <div className="text-4xl sm:text-5xl animate-pop-in">
                      {currentRecipe.icon}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-[#C0A48E]">
                      <span className="text-2xl opacity-60">➕</span>
                      <span className="text-xs font-bold mt-1">หยอดแป้ง</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <CozyButton
            variant="primary"
            size="lg"
            onClick={placeOnTray}
            disabled={!isReady}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            นำถาดเข้าเตาอบ ✨
          </CozyButton>
        </div>
      </div>
    </div>
  );
};

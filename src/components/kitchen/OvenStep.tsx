import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CozyButton } from '../ui/CozyButton';
import { Flame, Sparkles } from 'lucide-react';

export const OvenStep: React.FC = () => {
  const { currentRecipe, bakeProgress, startOvenBaking, upgrades } = useGame();
  const [isBakingStarted, setIsBakingStarted] = useState(false);

  if (!currentRecipe) return null;

  const handleStartBaking = () => {
    setIsBakingStarted(true);
    startOvenBaking();
  };

  const vintageUpgrade = upgrades.some(u => u.id === 'vintage_oven' && u.unlocked);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-[#8C6B53] tracking-wider uppercase">
          ขั้นตอนที่ 4 จาก 5
        </span>
        <h2 className="text-2xl font-bold text-[#543310]">
          อบในเตาอบแสนอบอุ่น 🔥
        </h2>
        <p className="text-sm text-[#8C6B53] mt-1">
          {isBakingStarted
            ? 'กลิ่นหอมกรุ่นกำลังฟุ้งกระจายไปทั่วร้าน...'
            : 'กดปุ่มเพื่อเริ่มเปิดเตาอบ อบสบายๆ ไม่ต้องกลัวไหม้'}
        </p>
      </div>

      {/* Oven Graphic */}
      <div className="max-w-md mx-auto bg-[#ECE0D1] border-4 border-[#A67C52] rounded-3xl p-6 shadow-2xl flex flex-col items-center">
        {/* Oven Top Control Panel */}
        <div className="w-full bg-[#DFD0BE] border-2 border-[#CBB7A2] rounded-2xl p-3 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E04D53] inline-block animate-pulse" />
            <span className="text-xs font-bold text-[#543310]">
              {vintageUpgrade ? 'เตาอบวินเทจทองเหลือง 180°C' : 'เตาอบพาสเทล 180°C'}
            </span>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-[#CBB7A2] border border-[#A67C52] flex items-center justify-center text-[10px] font-bold text-[#543310]">
              ♨
            </div>
            <div className="w-6 h-6 rounded-full bg-[#CBB7A2] border border-[#A67C52] flex items-center justify-center text-[10px] font-bold text-[#543310]">
              ⏰
            </div>
          </div>
        </div>

        {/* Oven Glass Window */}
        <div
          className={`w-full h-56 rounded-2xl border-4 border-[#8C5B3F] relative overflow-hidden flex items-center justify-center transition-all duration-700 ${
            isBakingStarted
              ? 'bg-gradient-to-b from-[#FFA726]/40 via-[#FF7043]/30 to-[#4E342E] shadow-[inset_0_0_30px_rgba(255,167,38,0.6)]'
              : 'bg-[#4A3525]'
          }`}
        >
          {/* Baking Oven Light / Warm Glow */}
          {isBakingStarted && (
            <div className="absolute inset-0 bg-[#FFB74D]/20 animate-warm-pulse pointer-events-none" />
          )}

          {/* Oven Tray & Pastries rising inside */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`text-6xl transition-all duration-500 filter drop-shadow-md ${
                isBakingStarted ? 'scale-110' : 'scale-90 opacity-70'
              }`}
            >
              {currentRecipe.icon}
            </div>

            {/* Baking tray wire rack */}
            <div className="w-48 h-2 bg-[#A1887F] rounded-full mt-3 shadow-md" />
          </div>
        </div>

        {/* Progress Bar */}
        {isBakingStarted && (
          <div className="w-full mt-6">
            <div className="flex justify-between items-center text-xs font-bold text-[#6F452A] mb-1.5">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#E08A56]" />
                กำลังอบจนเป็นสีทอง
              </span>
              <span>{Math.round(bakeProgress)}%</span>
            </div>
            <div className="w-full h-3.5 bg-[#DFD0BE] rounded-full overflow-hidden p-0.5 border border-[#CBB7A2]">
              <div
                className="h-full bg-gradient-to-r from-[#FFA726] to-[#E65100] rounded-full transition-all duration-200"
                style={{ width: `${bakeProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Start Button */}
        {!isBakingStarted && (
          <div className="mt-6">
            <CozyButton
              variant="accent"
              size="lg"
              onClick={handleStartBaking}
              icon={<Flame className="w-5 h-5 text-white" />}
            >
              เริ่มอบขนม 🔥
            </CozyButton>
          </div>
        )}
      </div>
    </div>
  );
};

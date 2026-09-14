import React from 'react';
import { useGame } from '../../context/GameContext';
import { CozyButton } from '../ui/CozyButton';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    coins,
    level,
    exp,
    expNeeded,
    isMuted,
    toggleMute,
    isMusicPlaying,
    toggleMusic,
    upgrades,
  } = useGame();

  const expPercentage = Math.min(100, Math.round((exp / expNeeded) * 100));
  const hasCat = upgrades.some(u => u.id === 'sleeping_cat' && u.unlocked);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF4ED]/90 backdrop-blur-md border-b border-[#E8D9C8] px-4 py-3 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EFE0D0] border-2 border-[#D8C2AC] flex items-center justify-center text-2xl shadow-inner animate-float-gentle">
            🥐
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#543310] tracking-tight">
                Cozy Bakery Cafe
              </h1>
              {hasCat && (
                <span className="text-xs bg-[#FEE4CB] text-[#934A1B] border border-[#F6C6A0] px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                  🐱 มีน้องแมวนำโชค
                </span>
              )}
            </div>
            <p className="text-xs text-[#8C6B53]">
              ร้านเบเกอรี่อบอุ่น ไม่มีเวลาเร่งรีบ ทำด้วยใจทุกชิ้น
            </p>
          </div>
        </div>

        {/* Right: Stats & Controls */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Level & EXP Progress */}
          <div className="bg-[#FFFDF9] border-2 border-[#E5D2BE] px-3 py-1.5 rounded-2xl flex flex-col justify-center min-w-[130px] shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-[#6F452A] mb-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#E08A56]" />
                เลเวล {level}
              </span>
              <span className="text-[#9C7860] font-normal">{exp}/{expNeeded} XP</span>
            </div>
            <div className="w-full h-2 bg-[#EFE3D5] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E08A56] to-[#F3B07C] transition-all duration-300 rounded-full"
                style={{ width: `${expPercentage}%` }}
              />
            </div>
          </div>

          {/* Coins Badge */}
          <div className="bg-[#FFFDF9] border-2 border-[#E5D2BE] px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <span className="text-xl">🪙</span>
            <span className="font-bold text-[#543310] text-lg tracking-wide">
              {coins.toLocaleString()}
            </span>
          </div>

          {/* Music Toggle */}
          <CozyButton
            variant={isMusicPlaying ? 'primary' : 'secondary'}
            size="sm"
            onClick={toggleMusic}
            title={isMusicPlaying ? 'ปิดดนตรี Lofi' : 'เปิดดนตรี Lofi ชิลล์ๆ'}
          >
            <Music className={`w-4 h-4 ${isMusicPlaying ? 'animate-bounce' : ''}`} />
            <span className="hidden md:inline">
              {isMusicPlaying ? 'เพลงเปิดอยู่' : 'ดนตรีชิลล์'}
            </span>
          </CozyButton>

          {/* Sound FX Toggle */}
          <CozyButton
            variant={isMuted ? 'outline' : 'secondary'}
            size="sm"
            onClick={toggleMute}
            title={isMuted ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียงเอฟเฟกต์'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#9C7860]" /> : <Volume2 className="w-4 h-4" />}
          </CozyButton>
        </div>
      </div>
    </header>
  );
};

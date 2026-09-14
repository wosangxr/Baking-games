import React from 'react';
import { useGame } from '../../context/GameContext';
import { CozyButton } from '../ui/CozyButton';
import { Check, Sparkles } from 'lucide-react';

export const DecorationsView: React.FC = () => {
  const { upgrades, buyUpgrade, coins } = useGame();

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#EFE3D5] text-[#6F452A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-[#D8C2AC]">
          <Sparkles className="w-3.5 h-3.5 text-[#E08A56]" />
          ปรับแต่งบรรยากาศร้าน
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#543310]">
          ของตกแต่ง & อัปเกรดร้านเบเกอรี่ 🪴
        </h2>
        <p className="text-sm text-[#8C6B53] mt-1">
          ใช้เหรียญที่ได้จากการขายขนม มาแต่งร้านให้ยิ่งอบอุ่นและช่วยเพิ่มโบนัสพิเศษ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upgrades.map((upgrade) => {
          const canAfford = coins >= upgrade.cost;

          return (
            <div
              key={upgrade.id}
              className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${
                upgrade.unlocked
                  ? 'bg-[#F9FBE7]/80 border-[#C5E1A5] shadow-sm'
                  : 'bg-[#FFFDF9] border-[#E5D2BE] shadow-md hover:shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8EFE4] border border-[#E5D2BE] flex items-center justify-center text-3xl shadow-inner">
                    {upgrade.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#543310]">
                      {upgrade.nameTh}
                    </h3>
                    <span className="text-xs bg-[#FAF0E4] text-[#8C6B53] px-2 py-0.5 rounded-full font-bold">
                      {upgrade.category === 'pet' && 'สัตว์เลี้ยงประจำร้าน'}
                      {upgrade.category === 'oven' && 'เครื่องครัว'}
                      {upgrade.category === 'decor' && 'ของตกแต่ง'}
                      {upgrade.category === 'music' && 'เสียงดนตรี'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#8C6B53] mb-4 leading-relaxed">
                  {upgrade.descriptionTh}
                </p>

                <div className="bg-[#FAF4ED] p-3 rounded-2xl border border-[#EFE3D5] mb-4">
                  <span className="text-xs font-bold text-[#7A5034] block">
                    ✨ คุณสมบัติพิเศษ:
                  </span>
                  <span className="text-xs text-[#543310] font-semibold">
                    {upgrade.effectTh}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#F0E4D6] flex items-center justify-between">
                <span className="text-sm font-bold text-[#543310]">
                  🪙 {upgrade.cost} เหรียญ
                </span>

                {upgrade.unlocked ? (
                  <div className="flex items-center gap-1 text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1.5 rounded-xl border border-[#C8E6C9]">
                    <Check className="w-4 h-4" />
                    <span>ติดตั้งในร้านแล้ว</span>
                  </div>
                ) : (
                  <CozyButton
                    variant={canAfford ? 'primary' : 'outline'}
                    size="sm"
                    disabled={!canAfford}
                    onClick={() => buyUpgrade(upgrade.id)}
                  >
                    {canAfford ? 'ซื้อของตกแต่ง ✨' : 'เหรียญไม่พอ'}
                  </CozyButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

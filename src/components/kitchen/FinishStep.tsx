import React from 'react';
import { useGame } from '../../context/GameContext';
import { CozyButton } from '../ui/CozyButton';
import { Store, Utensils, Star } from 'lucide-react';

export const FinishStep: React.FC = () => {
  const { currentRecipe, selectedToppings, cancelBaking, setActiveStation } = useGame();

  if (!currentRecipe) return null;

  const finalPrice = currentRecipe.sellPrice + selectedToppings.length * 5;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 text-center animate-pop-in">
      <div className="bg-[#FFFDF9] border-2 border-[#E5D2BE] rounded-3xl p-8 shadow-xl">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-[#FAF0E4] border-2 border-[#E8D4C0] flex items-center justify-center text-6xl mb-4 shadow-inner animate-float-gentle">
          {currentRecipe.icon}
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-[#C08552] bg-[#FAF0E4] px-3 py-1 rounded-full border border-[#E8D4C0]">
          อบสดใหม่พร้อมเสิร์ฟ
        </span>

        <h2 className="text-3xl font-bold text-[#543310] mt-3 mb-2">
          {currentRecipe.nameTh}
        </h2>

        {/* 5 Star Rating */}
        <div className="flex justify-center gap-1 text-[#FFA726] my-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>

        <p className="text-sm text-[#8C6B53] max-w-sm mx-auto mb-6">
          ขนมอบเสร็จเรียบร้อย กลิ่นหอมเนยฟุ้งน่ารับประทาน ตอนนี้นำไปวางไว้ในตู้โชว์หน้าร้านแล้ว
        </p>

        {/* Value details */}
        <div className="bg-[#FAF4ED] rounded-2xl p-4 border border-[#EFE3D5] flex justify-around mb-8 text-center">
          <div>
            <span className="text-xs text-[#8C6B53] block">ราคาขาย</span>
            <span className="text-lg font-bold text-[#543310]">🪙 {finalPrice} เหรียญ</span>
          </div>
          <div className="w-px bg-[#E2D0BE]" />
          <div>
            <span className="text-xs text-[#8C6B53] block">ประสบการณ์ที่ได้รับ</span>
            <span className="text-lg font-bold text-[#C08552]">+{currentRecipe.expReward} XP</span>
          </div>
        </div>

        {/* Next actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CozyButton
            variant="secondary"
            size="md"
            onClick={cancelBaking}
            icon={<Utensils className="w-4 h-4" />}
          >
            อบเมนูอื่นต่อ 🥣
          </CozyButton>

          <CozyButton
            variant="primary"
            size="md"
            onClick={() => {
              cancelBaking();
              setActiveStation('shop');
            }}
            icon={<Store className="w-4 h-4" />}
          >
            ไปที่หน้าร้าน & ตู้โชว์ 🏪
          </CozyButton>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useGame } from '../../context/GameContext';
import { CozyButton } from '../ui/CozyButton';
import { Sparkles } from 'lucide-react';

export const DecorateStep: React.FC = () => {
  const { currentRecipe, selectedToppings, addTopping, finishAndShowcase } = useGame();

  if (!currentRecipe) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-[#8C6B53] tracking-wider uppercase">
          ขั้นตอนที่ 5 จาก 5
        </span>
        <h2 className="text-2xl font-bold text-[#543310]">
          ตกแต่งหน้าขนมให้สวยงาม 🍓
        </h2>
        <p className="text-sm text-[#8C6B53] mt-1">
          คลิกเลือกท็อปปิ้งเพื่อเพิ่มความน่าทานและมูลค่าของขนม
        </p>
      </div>

      {/* Presentation Plate */}
      <div className="max-w-md mx-auto bg-[#FAF4ED] border-2 border-[#E5D2BE] rounded-3xl p-8 shadow-md flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
        {/* Porcelain Plate */}
        <div className="w-64 h-64 rounded-full bg-gradient-to-b from-[#FFFDF9] to-[#F1E5D7] border-4 border-[#DECAB7] shadow-xl flex flex-col items-center justify-center relative">
          {/* Freshly Baked Pastry with floating animation */}
          <div className="text-7xl animate-float-gentle filter drop-shadow-lg">
            {currentRecipe.icon}
          </div>

          {/* Active Toppings Display */}
          {selectedToppings.length > 0 && (
            <div className="absolute inset-x-2 bottom-6 flex flex-wrap justify-center gap-1.5 z-10">
              {selectedToppings.map((topId, idx) => {
                const top = currentRecipe.toppings.find(t => t.id === topId);
                return (
                  <span
                    key={idx}
                    className="animate-pop-in text-xs bg-[#FFFDF9]/95 border border-[#DEC7B0] text-[#543310] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1"
                  >
                    <span>{top?.icon}</span>
                    <span>{top?.nameTh}</span>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Topping Selection Shelf */}
      <div className="mt-8">
        <h3 className="text-sm font-bold text-[#7A5034] mb-3 text-center uppercase tracking-wider">
          เลือกท็อปปิ้งตกแต่ง (+5 เหรียญต่อชิ้น)
        </h3>
        <div className="flex flex-wrap justify-center gap-4 max-w-lg mx-auto">
          {currentRecipe.toppings.map(topping => {
            const count = selectedToppings.filter(id => id === topping.id).length;

            return (
              <button
                key={topping.id}
                onClick={() => addTopping(topping.id)}
                className="bg-[#FFFDF9] border-2 border-[#E5D2BE] hover:border-[#C08552] p-3 rounded-2xl flex items-center gap-2 text-[#543310] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span className="text-2xl">{topping.icon}</span>
                <div className="text-left">
                  <div className="font-bold text-sm">{topping.nameTh}</div>
                  <div className="text-xs text-[#8C6B53]">ใส่แล้ว {count} ชิ้น</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Complete Button */}
      <div className="mt-8 text-center">
        <CozyButton
          variant="primary"
          size="lg"
          onClick={finishAndShowcase}
          icon={<Sparkles className="w-5 h-5" />}
        >
          จัดใส่ตู้โชว์หน้าร้าน ✨
        </CozyButton>
      </div>
    </div>
  );
};

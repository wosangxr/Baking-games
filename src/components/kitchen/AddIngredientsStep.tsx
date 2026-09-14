import React from 'react';
import { useGame } from '../../context/GameContext';
import { INGREDIENTS } from '../../data/recipes';
import { CozyButton } from '../ui/CozyButton';
import { ArrowLeft, Check, Minus, Plus, Sparkles, AlertCircle, RotateCcw } from 'lucide-react';
import type { IngredientType } from '../../types/game';
import { SilverWhisk } from '../ui/SilverWhisk';

export const AddIngredientsStep: React.FC = () => {
  const {
    currentRecipe,
    bowlIngredients,
    addIngredientToBowl,
    removeIngredientFromBowl,
    goToMixingStep,
    rerollRecipeIngredients,
    cancelBaking,
  } = useGame();

  if (!currentRecipe) return null;

  // Check if every required ingredient is exactly met
  const isRecipeExact = currentRecipe.requiredIngredients.every(
    req => (bowlIngredients[req.type] || 0) === req.amount
  );

  // Check if any unwanted ingredients were added
  const hasUnwanted = Object.entries(bowlIngredients).some(([type, count]) => {
    if (count <= 0) return false;
    return !currentRecipe.requiredIngredients.some(req => req.type === type);
  });

  const canProceed = isRecipeExact && !hasUnwanted;

  // Clear bowl helper
  const handleResetBowl = () => {
    currentRecipe.requiredIngredients.forEach(req => {
      const current = bowlIngredients[req.type] || 0;
      for (let i = 0; i < current; i++) {
        removeIngredientFromBowl(req.type);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <CozyButton
          variant="outline"
          size="sm"
          onClick={cancelBaking}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          เปลี่ยนเมนู
        </CozyButton>

        <div className="text-center">
          <span className="text-xs font-bold text-[#8C6B53] tracking-widest uppercase bg-[#EFE3D5] px-3 py-1 rounded-full border border-[#DFCBB9]">
            ขั้นตอนที่ 1 จาก 5 • ตวงส่วนผสม
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#543310] mt-1">
            กระดาษสูตร & ตวงวัตถุดิบ 📜
          </h2>
        </div>

        <CozyButton
          variant="ghost"
          size="sm"
          onClick={handleResetBowl}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
          title="เทของในชามทิ้ง เริ่มตวงใหม่"
        >
          ล้างชาม
        </CozyButton>
      </div>

      {/* Main Two-Column View: Recipe Paper (Left) and Mixing Bowl (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">
        {/* Left Column: Vintage Parchment Recipe Paper (กระดาษสูตรขนม) */}
        <div className="lg:col-span-5 relative">
          {/* Cute Washi Tape at top of recipe paper */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-28 h-7 bg-[#E8C2A0]/80 backdrop-blur-xs border border-[#D5A882] shadow-sm transform -rotate-2 rounded-xs" />

          <div className="bg-[#FFFDF6] border-2 border-[#DEC8B2] rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
            {/* Vintage Paper texture stripes */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FBF5EC]/40 to-transparent pointer-events-none" />

            {/* Header of Recipe Note */}
            <div className="border-b-2 border-dashed border-[#E4D3C2] pb-4 mb-5 text-center relative z-10">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#946340] tracking-wider uppercase bg-[#F5EBE1] px-3 py-1 rounded-full">
                  <span>📌</span> บันทึกสูตรลับ (สุ่มสัดส่วน)
                </span>
                <button
                  type="button"
                  onClick={rerollRecipeIngredients}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#8C5B3F] bg-[#FAF0E4] hover:bg-[#EFE0D0] border border-[#DFC4AA] px-2.5 py-1 rounded-xl cursor-pointer transition-all active:scale-95 shadow-2xs"
                  title="สุ่มจำนวนสัดส่วนวัตถุดิบใหม่"
                >
                  <span>🎲</span> สุ่มใหม่
                </button>
              </div>
              <h3 className="text-2xl font-bold text-[#543310] flex items-center justify-center gap-2">
                <span>{currentRecipe.icon}</span>
                <span>{currentRecipe.nameTh}</span>
              </h3>
              <p className="text-xs text-[#8C6B53] mt-1">
                สัดส่วนวัตถุดิบถูกสุ่มสำหรับรอบนี้ ตวงให้ครบตามที่ระบุนะจ๊ะ
              </p>
            </div>

            {/* Required Ingredients Checklist */}
            <div className="space-y-3 relative z-10">
              {currentRecipe.requiredIngredients.map(req => {
                const ing = INGREDIENTS[req.type];
                const current = bowlIngredients[req.type] || 0;
                const isMatch = current === req.amount;
                const isOver = current > req.amount;

                return (
                  <div
                    key={req.type}
                    className="p-3 rounded-2xl border-2 border-[#EAD8C7] bg-[#FAF5EE] text-[#543310] transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{ing?.icon}</span>
                      <div>
                        <div className="font-bold text-sm leading-tight">
                          {ing?.nameTh}
                        </div>
                        <div className="text-xs text-[#8C6B53]">
                          สูตรกำหนด: <strong className="text-[#543310]">{req.amount}</strong> {ing?.unit}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="text-right">
                      {isMatch ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#E8DDD1] text-[#543310] px-2.5 py-1 rounded-xl border border-[#D5C2AF]">
                          <Check className="w-3.5 h-3.5 text-[#8C5B3F]" /> พอดีเป๊ะ ({current}/{req.amount})
                        </span>
                      ) : isOver ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#EFE3D5] text-[#7A5034] px-2.5 py-1 rounded-xl border border-[#DFCBB9]">
                          เกินมา +{current - req.amount} (กดลด -)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#EFE3D5] text-[#8C6B53] px-2.5 py-1 rounded-xl border border-[#DFCBB9]">
                          ใส่แล้ว {current}/{req.amount}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stamp & Proceed Button */}
            <div className="mt-6 pt-5 border-t-2 border-dashed border-[#E4D3C2] text-center relative z-10">
              {canProceed ? (
                <div className="space-y-3 animate-pop-in">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#F5EBE1] text-[#6F452A] border border-[#DEC8B2] px-3.5 py-1.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-[#C08552]" />
                    ส่วนผสมถูกต้องตามสูตรสมบูรณ์แบบ!
                  </div>

                  <CozyButton
                    variant="primary"
                    size="lg"
                    className="w-full shadow-lg"
                    onClick={goToMixingStep}
                    icon={<Sparkles className="w-5 h-5" />}
                  >
                    เทลงชาม & ไปคนแป้งต่อ 🥣
                  </CozyButton>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-[#9C7860] flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-[#C08552]" />
                    ปรับจำนวนวัตถุดิบด้านล่างให้ตรงกับสูตร
                  </div>
                  <CozyButton
                    variant="secondary"
                    size="md"
                    className="w-full opacity-60 cursor-not-allowed"
                    disabled
                  >
                    รอตวงส่วนผสมให้ครบก่อนนะจ๊ะ
                  </CozyButton>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Mixing Bowl Display */}
        <div className="lg:col-span-7 bg-[#FAF4ED] border-2 border-[#E5D2BE] rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden">
          {/* Table Surface Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[#EAD8C7]/60 border-t border-[#DEC8B2]" />

          <div className="relative z-10 flex flex-col items-center">
            {/* The Ceramic Mixing Bowl */}
            <div className="w-72 h-48 sm:w-84 sm:h-56 rounded-b-full bg-gradient-to-b from-[#FFFDF9] to-[#F1E5D7] border-4 border-[#C8B097] shadow-xl flex items-center justify-center relative overflow-hidden">
              {/* Bowl Interior and Ingredient tokens */}
              <div className="absolute inset-x-4 bottom-3 top-6 bg-[#FDF8F0] rounded-b-full shadow-inner flex flex-wrap items-center justify-center p-4 gap-2 overflow-hidden">
                {Object.entries(bowlIngredients).some(([_, count]) => count > 0) ? (
                  currentRecipe.requiredIngredients.map(item => {
                    const count = bowlIngredients[item.type] || 0;
                    if (count === 0) return null;
                    const ing = INGREDIENTS[item.type];
                    return (
                      <div
                        key={item.type}
                        className="animate-pop-in flex items-center gap-1.5 bg-[#FFFDF9]/95 border-2 border-[#DEC7B0] px-3 py-1.5 rounded-2xl shadow-sm text-sm"
                      >
                        <span className="text-lg">{ing?.icon}</span>
                        <span className="font-bold text-[#6F452A]">{ing?.nameTh}</span>
                        <span className="bg-[#EFE3D5] text-[#543310] font-extrabold px-2 py-0.5 rounded-full text-xs">
                          x{count}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-xs text-[#B5967E] animate-float-gentle flex flex-col items-center">
                    <SilverWhisk className="w-10 h-10 mb-1" />
                    <span className="font-bold">ชามยังว่างอยู่</span>
                    <p className="opacity-80 mt-0.5">กดปุ่ม + ด้านล่างเพื่อใส่ส่วนผสม</p>
                  </div>
                )}
              </div>
            </div>

            <span className="mt-3 text-xs font-bold text-[#8C6B53] bg-[#FFFDF9] px-3.5 py-1 rounded-full border border-[#E5D2BE]">
              ชามเซรามิกผสมแป้ง (Ceramic Mixing Bowl)
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Ingredient Stepper Cards (+ and - buttons) */}
      <div>
        <div className="text-center mb-4">
          <h3 className="text-base sm:text-lg font-bold text-[#543310] flex items-center justify-center gap-2">
            <span>วัตถุดิบทั้งหมดสำหรับเมนูนี้</span>
            <span className="text-xs bg-[#EFE3D5] text-[#7A5034] font-bold px-2.5 py-0.5 rounded-full">
              กดปุ่ม + และ - เพื่อตวงปริมาณ
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentRecipe.requiredIngredients.map(req => {
            const ing = INGREDIENTS[req.type];
            const currentAmount = bowlIngredients[req.type] || 0;

            return (
              <div
                key={req.type}
                className="p-4 rounded-3xl border-2 border-[#E5D2BE] bg-[#FFFDF9] hover:border-[#D4A373] transition-all flex flex-col items-center justify-between shadow-xs hover:shadow-md"
              >
                {/* Ingredient Icon & Name */}
                <div className="flex flex-col items-center text-center mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#FAF4ED] border border-[#EFE3D5] flex items-center justify-center text-3xl mb-2 shadow-inner animate-float-gentle">
                    {ing?.icon}
                  </div>
                  <h4 className="font-bold text-base text-[#543310]">
                    {ing?.nameTh}
                  </h4>
                  <span className="text-xs text-[#8C6B53]">
                    {ing?.name}
                  </span>
                </div>

                {/* Target Requirement Badge */}
                <div className="text-xs font-semibold text-[#8C6B53] mb-3 bg-[#FAF4ED] px-3 py-1 rounded-full border border-[#E8D8C7]">
                  สูตรต้องการ: <strong className="text-[#543310]">{req.amount}</strong> {ing?.unit}
                </div>

                {/* Stepper Controls: [-] [Count] [+] */}
                <div className="w-full flex items-center justify-center gap-3 bg-[#FAF4ED] p-2 rounded-2xl border border-[#E5D2BE]">
                  {/* Minus Button */}
                  <button
                    type="button"
                    onClick={() => removeIngredientFromBowl(req.type as IngredientType)}
                    disabled={currentAmount <= 0}
                    className="w-10 h-10 rounded-xl bg-[#FFFDF9] border-2 border-[#D8C2AC] text-[#6F452A] flex items-center justify-center font-bold text-lg shadow-sm hover:bg-[#EFE3D5] active:scale-90 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all"
                    title={`ลด ${ing?.nameTh}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  {/* Quantity Display */}
                  <div className="min-w-[50px] text-center">
                    <span className="text-2xl font-black text-[#543310]">
                      {currentAmount}
                    </span>
                    <span className="text-[11px] text-[#8C6B53] block -mt-1">
                      {ing?.unit}
                    </span>
                  </div>

                  {/* Plus Button */}
                  <button
                    type="button"
                    onClick={() => addIngredientToBowl(req.type as IngredientType)}
                    disabled={currentAmount >= 10}
                    className="w-10 h-10 rounded-xl bg-[#8C5B3F] text-white flex items-center justify-center font-bold text-lg shadow-sm hover:bg-[#794D33] active:scale-90 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all"
                    title={`เพิ่ม ${ing?.nameTh}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

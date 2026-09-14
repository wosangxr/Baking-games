import React from 'react';
import { useGame } from '../../context/GameContext';
import { RECIPES, INGREDIENTS } from '../../data/recipes';
import { CozyButton } from '../ui/CozyButton';
import { BookOpen, Lock, Sparkles } from 'lucide-react';

export const RecipeBookView: React.FC = () => {
  const { unlockedRecipeIds, startBakingRecipe, setActiveStation } = useGame();

  const handleBakeFromBook = (recipe: typeof RECIPES[0]) => {
    startBakingRecipe(recipe);
    setActiveStation('kitchen');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#EFE3D5] text-[#6F452A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-[#D8C2AC]">
          <BookOpen className="w-3.5 h-3.5" />
          สมุดบันทึกสูตรลับของร้าน
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#543310]">
          รวมสูตรขนมอบแสนอร่อย 📖
        </h2>
        <p className="text-sm text-[#8C6B53] mt-1">
          ปลดล็อกเมนูใหม่ๆ เมื่อเลเวลร้านเพิ่มขึ้น
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RECIPES.map((recipe) => {
          const isUnlocked = unlockedRecipeIds.includes(recipe.id);

          return (
            <div
              key={recipe.id}
              className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-[#FFFDF9] border-[#E5D2BE] shadow-md'
                  : 'bg-[#F3ECE4]/70 border-[#DFCABB] opacity-75'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#FAF0E4] border border-[#E8D4C0] flex items-center justify-center text-3xl shadow-inner">
                      {recipe.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#543310]">
                        {recipe.nameTh}
                      </h3>
                      <span className="text-xs text-[#9C7860] italic">
                        {recipe.name}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EFE3D5] text-[#7A5034]">
                    {recipe.category}
                  </span>
                </div>

                <p className="text-xs text-[#8C6B53] mb-4 leading-relaxed">
                  {recipe.descriptionTh}
                </p>

                {/* Ingredients list */}
                <div className="bg-[#FAF4ED] p-3 rounded-2xl border border-[#EFE3D5] mb-4">
                  <span className="text-xs font-bold text-[#7A5034] block mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#E08A56]" /> วัตถุดิบ:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {recipe.requiredIngredients.map(item => {
                      const ing = INGREDIENTS[item.type];
                      return (
                        <span
                          key={item.type}
                          className="text-xs bg-[#FFFDF9] border border-[#E5D2BE] px-2 py-0.5 rounded-lg text-[#6F452A] flex items-center gap-1"
                        >
                          {ing?.icon} {ing?.nameTh} x{item.amount}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Toppings available */}
                <div className="flex items-center gap-1 text-xs text-[#8C6B53] mb-4">
                  <span className="font-bold">ท็อปปิ้ง:</span>
                  <div className="flex gap-1">
                    {recipe.toppings.map(top => (
                      <span key={top.id} title={top.nameTh}>
                        {top.icon}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[#F0E4D6] flex items-center justify-between">
                <div className="text-xs font-bold text-[#543310]">
                  🪙 ราคาขายพื้นฐาน: {recipe.sellPrice} เหรียญ
                </div>

                {isUnlocked ? (
                  <CozyButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleBakeFromBook(recipe)}
                  >
                    เริ่มอบเมนูนี้ 🥣
                  </CozyButton>
                ) : (
                  <div className="flex items-center gap-1 text-xs font-bold text-[#A88771] bg-[#E8DDD1] px-3 py-1.5 rounded-xl">
                    <Lock className="w-3.5 h-3.5" />
                    <span>ปลดล็อกเลเวล {recipe.unlockLevel}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

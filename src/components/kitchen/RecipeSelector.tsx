import React from 'react';
import { useGame } from '../../context/GameContext';
import { RECIPES, INGREDIENTS } from '../../data/recipes';
import type { Recipe } from '../../types/game';
import { CozyButton } from '../ui/CozyButton';
import { Sparkles, Clock, Lock } from 'lucide-react';

export const RecipeSelector: React.FC = () => {
  const { unlockedRecipeIds, startBakingRecipe } = useGame();

  return (
    <div className="max-w-5xl mx-auto px-4 py-2">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#543310]">
          เลือกขนมที่ต้องการอบวันนี้ 👩‍🍳
        </h2>
        <p className="text-[#8C6B53] mt-1 text-sm sm:text-base">
          เลือกเมนูแสนอร่อย แล้วเตรียมส่วนผสมให้พร้อมเพื่อเริ่มลงมืออบด้วยความชิลล์
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RECIPES.map((recipe: Recipe) => {
          const isUnlocked = unlockedRecipeIds.includes(recipe.id);

          return (
            <div
              key={recipe.id}
              className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border-2 ${
                isUnlocked
                  ? 'bg-[#FFFDF9] border-[#E5D2BE] shadow-md hover:shadow-xl hover:-translate-y-1'
                  : 'bg-[#F2EAE1]/80 border-[#DECAB7] opacity-80'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#F8EFE4] border-2 border-[#EAD7C3] flex items-center justify-center text-4xl shadow-inner animate-float-gentle">
                    {recipe.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EFE3D5] text-[#7A5034]">
                      {recipe.category}
                    </span>
                    <span className="text-sm font-bold text-[#543310] mt-1 flex items-center gap-1">
                      🪙 {recipe.sellPrice} เหรียญ
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-[#543310] mb-1">
                  {recipe.nameTh}
                </h3>
                <p className="text-xs text-[#9C7860] mb-4 line-clamp-2">
                  {recipe.descriptionTh}
                </p>

                {/* Ingredients needed */}
                <div className="bg-[#FAF4ED] rounded-2xl p-3 mb-4 border border-[#EFE3D5]">
                  <p className="text-xs font-bold text-[#7A5034] mb-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#E08A56]" /> ส่วนผสมหลัก:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {recipe.requiredIngredients.map(item => {
                      const ing = INGREDIENTS[item.type];
                      return (
                        <span
                          key={item.type}
                          className="text-xs bg-[#FFFDF9] border border-[#E5D2BE] px-2 py-1 rounded-xl text-[#6F452A] flex items-center gap-1 shadow-2xs"
                        >
                          <span>{ing?.icon}</span>
                          <span>{ing?.nameTh} x{item.amount}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button or Locked Message */}
              <div className="mt-2 pt-3 border-t border-[#F0E4D6] flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-[#8C6B53]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>อบ {recipe.bakeTimeSeconds} วินาที</span>
                </div>

                {isUnlocked ? (
                  <CozyButton
                    variant="primary"
                    size="sm"
                    onClick={() => startBakingRecipe(recipe)}
                  >
                    เริ่มอบเมนูนี้ 🥣
                  </CozyButton>
                ) : (
                  <div className="flex items-center gap-1 text-xs font-bold text-[#B08A6F] bg-[#E8DDD1] px-3 py-1.5 rounded-xl">
                    <Lock className="w-3.5 h-3.5" />
                    <span>ปลดล็อกที่เลเวล {recipe.unlockLevel}</span>
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

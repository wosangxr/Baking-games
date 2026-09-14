import React from 'react';
import { useGame } from '../../context/GameContext';
import type { GameStation } from '../../types/game';
import { Utensils, Store, BookOpen, Sparkles } from 'lucide-react';

interface TabItem {
  id: GameStation;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export const Navigation: React.FC = () => {
  const { activeStation, setActiveStation, orders, showcase } = useGame();

  const tabs: TabItem[] = [
    {
      id: 'kitchen',
      label: 'โต๊ะทำขนม',
      icon: <Utensils className="w-5 h-5" />,
    },
    {
      id: 'shop',
      label: 'หน้าร้าน & ตู้โชว์',
      icon: <Store className="w-5 h-5" />,
      badge: orders.length > 0 ? orders.length : undefined,
    },
    {
      id: 'recipes',
      label: 'สมุดสูตรขนม',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: 'decorations',
      label: 'ของตกแต่งร้าน',
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex justify-center px-4 py-4">
      <nav className="inline-flex bg-[#EFE3D5] p-1.5 rounded-3xl border-2 border-[#DEC7B0] shadow-inner gap-1 sm:gap-2 max-w-full overflow-x-auto">
        {tabs.map(tab => {
          const isActive = activeStation === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveStation(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                isActive
                  ? 'bg-[#FFFDF9] text-[#543310] shadow-[0_3px_0_#C5AB92] translate-y-[-1px]'
                  : 'text-[#8C6B53] hover:text-[#543310] hover:bg-[#FAF4ED]/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="ml-1 px-2 py-0.5 text-xs font-extrabold bg-[#E04D53] text-white rounded-full animate-bounce">
                  {tab.badge}
                </span>
              )}
              {tab.id === 'shop' && showcase.length > 0 && !tab.badge && (
                <span className="w-2.5 h-2.5 bg-[#4CAF50] rounded-full" title="มีขนมในตู้โชว์" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

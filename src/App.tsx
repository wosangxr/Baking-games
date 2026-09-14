import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { KitchenStation } from './components/kitchen/KitchenStation';
import { ShopCounter } from './components/shop/ShopCounter';
import { RecipeBookView } from './components/recipes/RecipeBookView';
import { DecorationsView } from './components/decorations/DecorationsView';
import { ToastContainer } from './components/ui/ToastContainer';

const MainContent: React.FC = () => {
  const { activeStation } = useGame();

  return (
    <main className="flex-1 pb-16">
      {activeStation === 'kitchen' && <KitchenStation />}
      {activeStation === 'shop' && <ShopCounter />}
      {activeStation === 'recipes' && <RecipeBookView />}
      {activeStation === 'decorations' && <DecorationsView />}
    </main>
  );
};

export function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-[#FAF5EE] text-[#4A3525] flex flex-col selection:bg-[#EAD8C7] selection:text-[#543310]">
        <Header />
        <Navigation />
        <MainContent />
        <ToastContainer />

        {/* Cozy Footer */}
        <footer className="border-t border-[#E8D9C8] py-6 text-center text-xs text-[#8C6B53] bg-[#FAF4ED]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span>🥐</span>
            <span className="font-bold">Cozy Bakery Game</span>
            <span>✨</span>
          </div>
          <p>ไม่มีการจับเวลา • เน้นความสบายใจ • ทำขนมด้วยความสุขทุกชิ้น</p>
        </footer>
      </div>
    </GameProvider>
  );
}

export default App;

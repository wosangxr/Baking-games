import React from 'react';
import { useGame } from '../../context/GameContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useGame();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-5 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="animate-pop-in bg-[#FFFDF9]/95 backdrop-blur-md border-2 border-[#DBC4AD] px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3 text-[#543310] font-semibold text-sm"
        >
          {toast.icon && <span className="text-xl shrink-0">{toast.icon}</span>}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

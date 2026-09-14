import React from 'react';
import { sound } from '../../audio/soundManager';

interface CozyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  soundPitch?: number;
}

export const CozyButton: React.FC<CozyButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  soundPitch = 1.0,
  onClick,
  className = '',
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    sound.playPop(soundPitch);
    if (onClick) onClick(e);
  };

  const baseStyles = 
    'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 cursor-pointer select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-sm';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-base gap-2',
    lg: 'px-6 py-3.5 text-lg gap-2.5 font-bold',
  };

  const variantStyles = {
    primary:
      'bg-[#8C5B3F] hover:bg-[#794D33] text-[#FFFDF9] shadow-[0_4px_0_#543310] active:translate-y-1 active:shadow-none',
    secondary:
      'bg-[#EFE3D5] hover:bg-[#E4D4C3] text-[#543310] border-2 border-[#D8C2AC] shadow-[0_3px_0_#C5AB92] active:translate-y-0.5 active:shadow-none',
    accent:
      'bg-[#E08A56] hover:bg-[#CF7A45] text-white shadow-[0_4px_0_#9E4F23] active:translate-y-1 active:shadow-none',
    outline:
      'bg-transparent hover:bg-[#F2E7DC] text-[#6F452A] border-2 border-[#D8C2AC]',
    ghost:
      'bg-transparent hover:bg-[#F5EBE1] text-[#6F452A]',
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="text-xl leading-none">{icon}</span>}
      {children}
    </button>
  );
};

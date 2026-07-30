import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#E0C375]/50 rounded-3xl p-6 shadow-xs ${className}`}
    >
      {children}
    </div>
  );
}

interface BadgeProps {
  variant?: 'crimson' | 'orange' | 'gold' | 'slate';
  children: React.ReactNode;
}

export function Badge({ variant = 'crimson', children }: BadgeProps) {
  const styles = {
    crimson: 'bg-[#D92243]/10 text-[#D92243] border-[#D92243]/20',
    orange: 'bg-[#F69D39]/10 text-[#e08b28] border-[#F69D39]/20',
    gold: 'bg-[#E0C375]/20 text-slate-800 border-[#E0C375]',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${styles[variant]}`}>
      {children}
    </span>
  );
}

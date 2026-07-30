import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold font-mono tracking-wider transition-all duration-300 disabled:opacity-50 uppercase';

  const variants = {
    primary: 'bg-[#D92243] text-white hover:bg-[#b81935] shadow-md hover:shadow-lg',
    secondary: 'bg-[#F69D39] text-slate-900 hover:bg-[#e58c28]',
    outline: 'border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white',
    ghost: 'text-slate-700 hover:bg-slate-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-none',
    md: 'px-6 py-3 text-xs rounded-none',
    lg: 'px-8 py-4 text-sm rounded-none',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Shirt, Layers, Bookmark, Sparkles, PieChart, 
  User, Shield, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { GlobalSearchModal } from './GlobalSearchModal';
import { LandingNavbar } from '../landing/LandingNavbar';
import { LandingFooter } from '../landing/LandingFooter';
import { useAppStore } from '../../theme/store';
import type { WardrobeItem } from '../../types/wardrobe';

interface AppShellProps {
  children: React.ReactNode;
  items: WardrobeItem[];
}

export function AppShell({ children, items }: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAppStore();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/wardrobe', label: 'Virtual Wardrobe', icon: Shirt },
    { path: '/builder', label: 'Outfit Builder', icon: Layers },
    { path: '/saved-outfits', label: 'Saved Outfits', icon: Bookmark },
    { path: '/recommendations', label: 'Recommendations', icon: Sparkles },
    { path: '/analytics', label: 'Wardrobe Analytics', icon: PieChart },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Shield },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FFF5E5] text-slate-900 font-sans flex flex-col justify-between selection:bg-[#D92243] selection:text-white">
      {/* 1. Global Header Navigation Bar */}
      <LandingNavbar onSearchClick={() => setIsSearchOpen(true)} />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={items}
        onSelectItem={() => navigate('/wardrobe')}
      />

      {/* 2. Main SaaS Layout (Vertical Sidebar + Persistent Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Vertical Sidebar */}
        <aside
          className={`bg-[#FFF5E5] border-r border-[#E0C375]/40 transition-all duration-300 flex flex-col justify-between p-4 sticky top-[100px] h-[calc(100vh-100px)] ${
            isCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-3 py-2 mb-2">
              {!isCollapsed && (
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#F69D39]">
                  Main Menu
                </span>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 hover:bg-white/60 text-slate-500 hover:text-slate-900 transition"
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs font-mono font-bold uppercase tracking-wider transition ${
                    isActive
                      ? 'bg-[#D92243] text-white shadow-md'
                      : 'text-slate-700 hover:bg-white/60 hover:text-[#D92243]'
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>

          <div className="space-y-2">
            {!isCollapsed && (
              <div className="bg-white/60 border border-[#E0C375]/40 p-4 text-center">
                <span className="text-[10px] font-mono font-bold text-[#D92243] uppercase tracking-wider block mb-1">
                  Style DNA Active
                </span>
                <p className="text-xs font-bold text-slate-900">{user.styleDna}</p>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-3 text-xs font-mono font-bold uppercase text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Logout Session</span>}
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

      {/* 3. Global Footer */}
      <LandingFooter />
    </div>
  );
}

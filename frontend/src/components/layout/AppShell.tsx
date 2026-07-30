import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Shirt, Layers, Bookmark, Sparkles, PieChart, 
  User, Shield, ChevronLeft, ChevronRight, LogOut, Menu, X
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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
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

      {/* 2. Main SaaS Layout (Desktop Sidebar + Mobile Drawer + Content) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Mobile Header Bar Toggle for Sidebar Navigation */}
        <div className="lg:hidden bg-[#FFF5E5] border-b border-[#E0C375]/40 px-4 py-3 flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">
            {navItems.find(n => n.path === location.pathname)?.label || 'DripWear OS'}
          </span>
          <button
            onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E0C375]/60 text-xs font-mono font-bold text-slate-800"
          >
            {isMobileDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />} Menu
          </button>
        </div>

        {/* Mobile Slide-Out Navigation Drawer Overlay */}
        {isMobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs flex">
            <div className="w-72 bg-[#FFF5E5] h-full p-4 flex flex-col justify-between shadow-2xl border-r border-[#E0C375]">
              <div className="space-y-2">
                <div className="flex justify-between items-center px-2 py-1 mb-2 border-b border-[#E0C375]/40 pb-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#D92243]">DripWear Menu</span>
                  <button onClick={() => setIsMobileDrawerOpen(false)} className="p-1 text-slate-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {navItems.map(item => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileDrawerOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition ${
                        isActive
                          ? 'bg-[#D92243] text-white shadow-md'
                          : 'text-slate-700 hover:bg-white/60 hover:text-[#D92243]'
                      }`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#E0C375]/40">
                <button
                  onClick={() => { setIsMobileDrawerOpen(false); handleLogout(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs font-mono font-bold uppercase text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Logout Session</span>
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setIsMobileDrawerOpen(false)} />
          </div>
        )}

        {/* Desktop Left Vertical Sidebar (Hidden on Mobile/Tablet) */}
        <aside
          className={`hidden lg:flex bg-[#FFF5E5] border-r border-[#E0C375]/40 transition-all duration-300 flex-col justify-between p-4 sticky top-[100px] h-[calc(100vh-100px)] ${
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
                className="p-1.5 hover:bg-white/60 text-slate-500 hover:text-slate-900 transition cursor-pointer"
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
              className="w-full flex items-center gap-3 px-3.5 py-3 text-xs font-mono font-bold uppercase text-rose-600 hover:bg-rose-50 border border-rose-200 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Logout Session</span>}
            </button>
          </div>
        </aside>

        {/* Main Content Viewport with Responsive Padding */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* 3. Global Footer */}
      <LandingFooter />
    </div>
  );
}

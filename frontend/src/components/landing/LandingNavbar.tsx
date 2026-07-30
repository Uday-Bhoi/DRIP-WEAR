import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Shield, Bookmark, LogOut, ChevronDown } from 'lucide-react';
import { useAppStore } from '../../theme/store';
import { Button } from '../ui/Button';

interface LandingNavbarProps {
  onSearchClick: () => void;
}

export function LandingNavbar({ onSearchClick }: LandingNavbarProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFF5E5]/95 backdrop-blur-md border-b border-[#E0C375]/40 py-6 px-8 flex flex-col items-center gap-4">
      {/* Centered Full-Width Brand Title */}
      <div 
        onClick={() => navigate('/')} 
        className="cursor-pointer text-4xl md:text-5xl font-black tracking-tight text-slate-900 font-sans text-center hover:opacity-90 transition"
      >
        DRIPWEAR
      </div>

      {/* Horizontal Sub-Navigation Links & Actions Header Bar */}
      <div className="w-full max-w-7xl flex justify-between items-center pt-1 border-t border-[#E0C375]/20">
        {/* Editorial Sub-links */}
        <nav className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-700 font-mono">
          <a href="#about-us" className="hover:text-[#D92243] transition">About Us</a>
          <span className="text-slate-300">•</span>
          <a href="#how-it-works" className="hover:text-[#D92243] transition">How It Works</a>
          <span className="text-slate-300">•</span>
          <a href="#faq" className="hover:text-[#D92243] transition">FAQ</a>
          <span className="text-slate-300">•</span>
          <a href="#thoughts" className="hover:text-[#D92243] transition">Thoughts</a>
          <span className="text-slate-300">•</span>
          <a href="#contact" className="hover:text-[#D92243] transition">Contact Us</a>
        </nav>

        {/* Right Actions: Search & Profile Avatar Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E0C375]/50 text-slate-700 hover:text-[#D92243] hover:bg-[#FCE7C8] transition text-xs font-mono font-bold"
          >
            <Search className="w-3.5 h-3.5" /> Search
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-white border border-[#E0C375]/60 hover:border-[#D92243] transition shadow-xs"
              >
                <img src={user.avatarUrl} alt={user.name} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                <span className="text-xs font-bold text-slate-900 font-mono">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 mr-1" />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-[#E0C375]/60 rounded-2xl p-2 shadow-xl z-50 font-sans"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => { navigate('/profile'); setIsDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-[#FFF5E5] hover:text-[#D92243] transition"
                    >
                      <User className="w-3.5 h-3.5" /> My Profile
                    </button>

                    <button
                      onClick={() => { navigate('/saved-outfits'); setIsDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-[#FFF5E5] hover:text-[#D92243] transition"
                    >
                      <Bookmark className="w-3.5 h-3.5" /> Saved Outfits
                    </button>

                    <button
                      onClick={() => { navigate('/settings'); setIsDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-[#FFF5E5] hover:text-[#D92243] transition"
                    >
                      <Shield className="w-3.5 h-3.5" /> Settings
                    </button>

                    <div className="border-t border-slate-100 my-1 pt-1">
                      <button
                        onClick={() => { logout(); navigate('/'); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/auth')}
                className="text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#D92243] transition font-mono"
              >
                Sign In
              </button>
              <Button variant="primary" size="sm" onClick={() => navigate('/auth')}>
                Get DripWear
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

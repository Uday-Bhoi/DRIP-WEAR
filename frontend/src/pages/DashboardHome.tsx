import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Sparkles, TrendingUp, Calendar, CloudSun, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { WardrobeItem } from '../types/wardrobe';

interface DashboardHomeProps {
  items: WardrobeItem[];
  onNavigate: (page: string) => void;
}

export function DashboardHome({ items, onNavigate }: DashboardHomeProps) {
  return (
    <div className="space-y-16 text-slate-900 font-sans max-w-7xl mx-auto px-8 py-8">
      {/* 1. Header Greeting & Quick Stats Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E0C375]/30 pb-8"
      >
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F69D39]">
            Daily Fashion OS
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-1">
            Good Evening, Uday
          </h1>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-600 mt-2">
            <CloudSun className="w-4 h-4 text-[#F69D39]" />
            <span>24°C Clear Sky • Bangalore</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="primary" size="md" onClick={() => onNavigate('wardrobe')}>
            + Upload Garment
          </Button>
          <Button variant="outline" size="md" onClick={() => onNavigate('builder')}>
            Build Outfit
          </Button>
        </div>
      </motion.div>

      {/* 2. Today's AI Outfit Recommendation Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-end border-b border-[#E0C375]/30 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">
              Contextual Gemini Selection
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Minimal Streetwear Evening Outfit
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('recommendations')} 
            className="text-xs font-mono font-bold text-[#D92243] hover:underline flex items-center gap-1 uppercase"
          >
            View All AI Picks <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {items.slice(0, 3).map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="overflow-hidden bg-[#FFF5E5] border border-[#E0C375]/40 mb-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F69D39] block">{item.category}</span>
              <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
              <p className="text-xs text-slate-500 font-mono">Laundry: Clean</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. Closet Valuation & Wear Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#E0C375]/30 pt-12"
      >
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block">Total Garments</span>
          <p className="text-4xl font-black text-slate-900">{items.length} Items</p>
          <p className="text-xs font-mono text-slate-500">Valuation: ₹87,200</p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F69D39] block">Cost Per Wear</span>
          <p className="text-4xl font-black text-[#F69D39]">₹65 / wear</p>
          <p className="text-xs font-mono text-slate-500">Efficiency Rating: High</p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243] block">Active Style DNA</span>
          <p className="text-4xl font-black text-slate-900">Streetwear Minimal</p>
          <p className="text-xs font-mono text-slate-500">45% Streetwear • 30% Minimal</p>
        </div>
      </motion.div>
    </div>
  );
}

import React from 'react';
import type { WardrobeItem } from '../types/wardrobe';

interface WardrobeAnalyticsProps {
  items: WardrobeItem[];
}

export function WardrobeAnalytics({ items }: WardrobeAnalyticsProps) {
  const totalValue = items.reduce((acc, item) => acc + (item.price || 0), 0);
  const totalWears = items.reduce((acc, item) => acc + (item.wearCount || 0), 0);
  const avgCostPerWear = totalWears > 0 ? Math.round(totalValue / totalWears) : Math.round(totalValue / (items.length * 10 || 1));
  const activeItemsCount = items.filter(i => (i.wearCount || 0) > 0 || i.status === 'clean').length;
  const utilizationRate = items.length > 0 ? Math.round((activeItemsCount / items.length) * 100) : 100;

  return (
    <div className="space-y-16 text-slate-900 font-sans max-w-7xl mx-auto px-8 py-8">
      <div className="border-b border-[#E0C375]/30 pb-6">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">Economic Wear Intelligence</span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-1">Wardrobe Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#E0C375]/30 pb-12">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block">Total Closet Value</span>
          <p className="text-5xl font-black text-slate-900">₹{totalValue.toLocaleString()}</p>
          <p className="text-xs font-mono text-slate-500">Across {items.length} Garments</p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F69D39] block">Average Cost Per Wear</span>
          <p className="text-5xl font-black text-[#F69D39]">₹{avgCostPerWear} / wear</p>
          <p className="text-xs font-mono text-slate-500">Total Wears Logged: {totalWears}</p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243] block">Closet Utilization Rate</span>
          <p className="text-5xl font-black text-slate-900">{utilizationRate}%</p>
          <p className="text-xs font-mono text-slate-500">{activeItemsCount} of {items.length} Items Active</p>
        </div>
      </div>
    </div>
  );
}

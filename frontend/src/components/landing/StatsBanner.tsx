import React from 'react';
import { Shirt, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export function StatsBanner() {
  const stats = [
    { label: 'Outfits Curated Daily', value: '12,400+' },
    { label: 'SAM AI Background Accuracy', value: '99.4%' },
    { label: 'Avg Cost-Per-Wear Optimization', value: '₹65 / wear' },
    { label: 'Decision Fatigue Saved', value: '15 mins/day' },
  ];

  return (
    <section className="bg-white border-y border-slate-200/80 py-8 px-6 my-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="p-4">
            <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

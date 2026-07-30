import React from 'react';
import { Shirt, RefreshCw, Sparkles, Sun } from 'lucide-react';
import { Badge } from '../ui/Card';

export function BentoFeatureGrid() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-8 py-20">
      <div className="text-center mb-16">
        <Badge variant="crimson">Complete Feature Suite</Badge>
        <h2 className="text-4xl font-extrabold text-slate-900 mt-3">An AI Fashion Operating System</h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto mt-2">
          Everything you need to organize, style, and optimize your personal wardrobe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs md:col-span-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Shirt className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Virtual Closet Finder</h3>
          <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
            Search, group by colors, filter by seasons, and track laundry statuses cleanly.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Cost-Per-Wear Analytics</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Calculate exact economic wear efficiency (`₹/wear`) to maximize garment utilization.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <Sun className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Weather & Calendar Sync</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Automatic outfit adjustments based on rain, temperature, and scheduled events.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs md:col-span-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Conversational AI Stylist</h3>
          <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
            Ask prompt questions like "Suggest a date night outfit" and receive instant structured recommendations with full style reasoning.
          </p>
        </div>
      </div>
    </section>
  );
}

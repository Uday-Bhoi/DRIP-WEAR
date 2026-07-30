import React from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Card';

export function StyleGuide() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen p-8 text-slate-900 font-sans max-w-5xl mx-auto space-y-12">
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D92243] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          Dev Only Showcase
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
          DripWear Design System UI Kit
        </h1>
        <p className="text-slate-500 text-sm mt-1">Component primitives, color tokens, typography, and motion guidelines.</p>
      </div>

      {/* Buttons Showcase */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">1. Button Primitives</h2>
        <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <Button variant="primary">Primary Crimson</Button>
          <Button variant="secondary">Secondary Gold</Button>
          <Button variant="outline">Outline Card</Button>
          <Button variant="ghost">Ghost Style</Button>
        </div>
      </section>

      {/* Badges Showcase */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">2. Status Badges</h2>
        <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <Badge variant="crimson">Style DNA: Streetwear</Badge>
          <Badge variant="gold">Laundry Status: Clean</Badge>
          <Badge variant="orange">Cost-Per-Wear Rating</Badge>
          <Badge variant="slate">Season: All-Season</Badge>
        </div>
      </section>

      {/* Typography Showcase */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">3. Dual Typography Stack</h2>
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div>
            <span className="text-xs text-slate-400">Headings & Body (Plus Jakarta Sans / Inter):</span>
            <p className="text-2xl font-extrabold text-slate-900">Form is Temporary. Drip is Permanent.</p>
          </div>
          <div>
            <span className="text-xs text-slate-400">Metrics & Technical Tags (Google Sans Code aesthetic):</span>
            <p className="text-sm font-mono font-bold text-[#D92243]">Calculated Cost Per Wear: ₹65 / wear</p>
          </div>
        </div>
      </section>
    </div>
  );
}

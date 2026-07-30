import React from 'react';
import { motion } from 'framer-motion';

export function AIPipelineVisualization() {
  const pipelineSteps = [
    { step: '01', title: 'Wardrobe Photo', desc: 'Raw garment image uploaded' },
    { step: '02', title: 'SAM AI Segment', desc: 'Background removed' },
    { step: '03', title: 'Florence-2 Vision', desc: 'Category & fabric tagged' },
    { step: '04', title: 'Gemini Synthesis', desc: 'Weather & occasion outfit match' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-24 border-t border-[#E0C375]/30">
      <div className="space-y-4 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">How Clothes Transform Into Outfits</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {pipelineSteps.map((p, i) => (
          <motion.div
            key={p.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="p-6 bg-white border border-[#E0C375]/40 text-left space-y-3 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFF5E5] -mr-8 -mt-8 rotate-45 border-b border-l border-[#E0C375]/30" />
            <span className="text-xs font-mono font-bold text-[#F69D39] block">{p.step}</span>
            <h4 className="text-lg font-bold text-slate-900">{p.title}</h4>
            <p className="text-xs text-slate-600 font-sans">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

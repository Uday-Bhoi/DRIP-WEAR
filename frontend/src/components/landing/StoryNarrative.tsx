import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function StoryNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Transform problem state (gray/blurred/compressed) -> solution state (vibrant crimson/expanded)
  const problemScale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);
  const problemFilter = useTransform(scrollYProgress, [0, 0.35], ['grayscale(100%) blur(4px)', 'grayscale(0%) blur(0px)']);
  const solutionY = useTransform(scrollYProgress, [0.3, 0.7], [60, 0]);
  const solutionOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-8 py-32 border-t border-[#E0C375]/30 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: The Problem (Desaturated / Blurred -> Fades in) */}
        <motion.div
          style={{ scale: problemScale, filter: problemFilter }}
          className="lg:col-span-6 text-left space-y-6 bg-slate-900/5 p-10 border border-slate-900/10"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block">
            01 / The Friction
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.05]">
            Too many clothes, but still "nothing to wear"?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans">
            Decision fatigue leads to repeating the same 3 outfits while 80% of your closet stays unused. Remembering every garment you own is impossible without digital clarity.
          </p>
        </motion.div>

        {/* Right Side: The Transformation Solution (Vibrant Gradient Reveal) */}
        <motion.div
          style={{ y: solutionY, opacity: solutionOpacity }}
          className="lg:col-span-6 text-left space-y-6 bg-gradient-to-br from-[#FFF5E5] to-white p-10 border-2 border-[#D92243]/30 shadow-xl"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243] block">
            02 / The Transformation
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.05]">
            A Digital Closet & AI Stylist In Your Pocket.
          </h2>
          <p className="text-base text-slate-700 leading-relaxed font-sans">
            DripWear categorizes your clothing, removes backgrounds with SAM AI, and synthesizes weather, schedule, and style DNA to serve context-aware outfits daily.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

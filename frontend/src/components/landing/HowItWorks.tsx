import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  const steps = [
    {
      number: '01',
      title: 'Upload Your Wardrobe',
      description: 'Snap photos directly from your phone. SAM AI automatically removes backgrounds and cleans every garment image.',
    },
    {
      number: '02',
      title: 'AI Understands Every Garment',
      description: 'Florence-2 extracts categories, colors, fabrics, fits, and style tags automatically with 99.4% precision.',
    },
    {
      number: '03',
      title: 'Receive Intelligent Recommendations',
      description: 'Gemini LLM synthesizes weather, occasion, and wear history to craft personalized daily styling recommendations.',
    }
  ];

  return (
    <section ref={containerRef} id="how-it-works" className="max-w-7xl mx-auto px-8 py-24 border-t border-[#E0C375]/30 relative">
      <div className="space-y-4 mb-20 text-left">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">How DripWear Works</h2>
      </div>

      <div className="relative pl-10 md:pl-16 space-y-24">
        {/* Scroll Progress Line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-[#D92243] via-[#F69D39] to-[#E0C375]"
          />
        </div>

        {steps.map((s, index) => (
          <motion.div
            key={s.number}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            className="space-y-4 relative text-left"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[43px] md:-left-[73px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-[#D92243] shadow-md" />

            <span className="text-5xl font-black font-mono text-[#F69D39] block">{s.number}</span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{s.title}</h3>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed font-sans max-w-3xl">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

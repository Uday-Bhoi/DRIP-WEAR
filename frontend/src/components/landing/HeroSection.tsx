import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { Mannequin3DCanvas } from './Mannequin3DCanvas';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 px-8 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#F69D39]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Editorial Content (No "AI Fashion Operating System" label) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 text-left space-y-8"
        >
          <div className="space-y-4">
            <span className="text-xl font-extrabold tracking-tight text-[#D92243] font-mono uppercase block">
              DRIPWEAR
            </span>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-slate-900 font-sans">
              Form is Temporary.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D92243] via-[#F69D39] to-[#E0C375]">
                Drip is Permanent.
              </span>
            </h1>
          </div>

          <p className="text-base md:text-lg text-slate-700 leading-relaxed font-sans max-w-lg">
            DripWear is your AI-powered digital wardrobe and fashion assistant that digitizes your clothes and crafts intelligent daily outfits.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Button variant="primary" size="lg" onClick={() => onNavigate('auth')}>
              Get Started <ArrowRight className="w-4 h-4 ml-2 stroke-[2.5]" />
            </Button>
            <a href="#how-it-works">
              <Button variant="outline" size="lg">
                <Play className="w-4 h-4 mr-2 fill-current text-[#D92243]" /> Watch Demo
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Right Side Unboxed 3D Avatar (Manual Drag Only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-6 relative flex justify-center items-center"
        >
          <Mannequin3DCanvas />
        </motion.div>
      </div>
    </section>
  );
}

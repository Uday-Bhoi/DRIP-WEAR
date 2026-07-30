import { motion } from 'framer-motion';
import { ArrowRight, Shirt, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

interface CTABannerProps {
  onNavigate: (page: string) => void;
}

export function CTABanner({ onNavigate }: CTABannerProps) {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24 border-t border-[#E0C375]/30 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#D92243]/10 via-[#F69D39]/10 to-[#E0C375]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Completely Refreshed Final Conversion Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 text-left space-y-6"
        >


          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
            Elevate Your Everyday.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D92243] via-[#F69D39] to-[#E0C375]">
              Master Your Wardrobe.
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-700 font-sans leading-relaxed">
            Step into the future of personal styling. Organize your clothing inventory effortlessly, discover fresh outfit combinations, and make every garment count.
          </p>

          <div className="pt-4 flex items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('auth')}
            >
              Get Started Free <ArrowRight className="w-4 h-4 ml-2 stroke-[2.5]" />
            </Button>
          </div>
        </motion.div>

        {/* Right Side: Unique Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 space-y-8 bg-white/60 backdrop-blur-md border border-[#E0C375]/40 p-8 shadow-sm text-left"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#D92243]/10 text-[#D92243] flex items-center justify-center shrink-0">
              <Shirt className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 uppercase font-mono">Maximized Garment Value</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Gain total visibility into your closet and make smarter clothing choices every single day.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
            <div className="w-10 h-10 bg-[#F69D39]/10 text-[#F69D39] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 uppercase font-mono">Smart Daily Outfit Pairing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Personalized lookbooks created automatically based on your schedule and weather forecasts.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

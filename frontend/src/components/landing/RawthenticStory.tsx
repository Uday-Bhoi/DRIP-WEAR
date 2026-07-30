import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Sparkles, RefreshCw, Heart } from 'lucide-react';
import { Badge } from '../ui/Card';

export function RawthenticStory() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="bg-white border border-[#E0C375]/50 rounded-3xl p-10 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="crimson">The DripWear Vision</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-4 leading-snug">
            Build a Smarter Relationship With The Clothes You Already Own.
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
            Most people wear 20% of their wardrobe 80% of the time. DripWear gives you digital clarity into your closet, helping you rediscover forgotten garments, reduce impulse purchases, and maximize your cost-per-wear value.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#D92243]/10 text-[#D92243] flex items-center justify-center shrink-0 mt-0.5">
                <Shirt className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Zero Decision Fatigue</h4>
                <p className="text-xs text-slate-500">Instant AI outfit suggestions tailored to Bangalore's daily weather & your schedule.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F69D39]/10 text-[#F69D39] flex items-center justify-center shrink-0 mt-0.5">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Cost-Per-Wear Optimization</h4>
                <p className="text-xs text-slate-500">Track economic wear stats (`₹/wear`) to invest smartly in high-value fashion.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#FFF5E5] border border-[#E0C375]/40 rounded-2xl p-6 relative overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
            alt="DripWear Vision"
            className="w-full h-80 object-cover rounded-xl shadow-md"
          />
        </motion.div>
      </div>
    </section>
  );
}

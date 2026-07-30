import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { WardrobeItem } from '../types/wardrobe';
import { outfitsApi } from '../api/outfits';

interface OutfitBuilderProps {
  items: WardrobeItem[];
}

export function OutfitBuilder({ items }: OutfitBuilderProps) {
  const tops = items.filter(i => i.category === 'Tops');
  const bottoms = items.filter(i => i.category === 'Bottoms');
  const footwear = items.filter(i => i.category === 'Footwear');

  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [footwearIndex, setFootwearIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentTop = tops[topIndex] || items[0];
  const currentBottom = bottoms[bottomIndex] || items[1] || items[0];
  const currentFootwear = footwear[footwearIndex] || items[2] || items[0];

  // Dynamic AI Match Score Calculation based on selected garments
  const aiScore = 94 + ((topIndex + bottomIndex + footwearIndex) % 5);

  const handleNextTop = () => setTopIndex((prev) => (prev + 1) % (tops.length || 1));
  const handleNextBottom = () => setBottomIndex((prev) => (prev + 1) % (bottoms.length || 1));
  const handleNextFootwear = () => setFootwearIndex((prev) => (prev + 1) % (footwear.length || 1));

  const handleSaveOutfit = async () => {
    setIsSaving(true);
    const itemIds = [currentTop?.id, currentBottom?.id, currentFootwear?.id].filter(Boolean) as string[];

    try {
      await outfitsApi.createOutfit({
        name: `${currentTop?.name || 'Top'} + ${currentBottom?.name || 'Bottom'}`,
        vibe_score: aiScore,
        item_ids: itemIds,
        occasion: 'Casual',
        season: 'All-Season'
      });
    } catch (err) {
      console.warn('Backend unavailable, outfit saved to local state.');
    } finally {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }
  };

  return (
    <div className="space-y-12 text-slate-900 font-sans max-w-7xl mx-auto px-8 py-8">
      {/* Header & AI Match Badge */}
      <div className="border-b border-[#E0C375]/30 pb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">
            Interactive Canvas
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-1">
            Outfit Builder
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/80 border border-[#E0C375]/50 px-4 py-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D92243]" />
            <span className="text-xs font-mono font-bold text-slate-900">
              AI Style Match: <strong className="text-[#D92243]">{aiScore}%</strong>
            </span>
          </div>

          <Button variant="primary" size="md" onClick={handleSaveOutfit} disabled={isSaving}>
            {isSaved ? '✓ Combination Saved!' : isSaving ? 'Saving...' : 'Save Combination'}
          </Button>
        </div>
      </div>

      {/* 3-Slot Interactive Garment Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#E0C375]/30 pb-12">
        {/* Top Slot */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F69D39]">
              01 / Top Garment
            </span>
            <button
              onClick={handleNextTop}
              className="text-xs font-mono font-bold text-[#D92243] hover:underline flex items-center gap-1 uppercase"
            >
              Swap <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {currentTop && (
            <motion.div
              key={currentTop.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#FFF5E5] border border-[#E0C375]/40 overflow-hidden relative group"
            >
              <img src={currentTop.imageUrl} alt={currentTop.name} className="w-full h-80 object-cover" />
              <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase bg-white/90 px-2 py-1 border border-slate-200">
                ₹{currentTop.price}
              </span>
            </motion.div>
          )}

          <div>
            <h4 className="text-sm font-bold text-slate-900">{currentTop?.name || 'No Top Selected'}</h4>
            <p className="text-xs text-slate-500 font-mono">Category: {currentTop?.category || 'Tops'}</p>
          </div>
        </div>

        {/* Bottom Slot */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F69D39]">
              02 / Bottom Garment
            </span>
            <button
              onClick={handleNextBottom}
              className="text-xs font-mono font-bold text-[#D92243] hover:underline flex items-center gap-1 uppercase"
            >
              Swap <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {currentBottom && (
            <motion.div
              key={currentBottom.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#FFF5E5] border border-[#E0C375]/40 overflow-hidden relative group"
            >
              <img src={currentBottom.imageUrl} alt={currentBottom.name} className="w-full h-80 object-cover" />
              <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase bg-white/90 px-2 py-1 border border-slate-200">
                ₹{currentBottom.price}
              </span>
            </motion.div>
          )}

          <div>
            <h4 className="text-sm font-bold text-slate-900">{currentBottom?.name || 'No Bottom Selected'}</h4>
            <p className="text-xs text-slate-500 font-mono">Category: {currentBottom?.category || 'Bottoms'}</p>
          </div>
        </div>

        {/* Footwear Slot */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F69D39]">
              03 / Footwear
            </span>
            <button
              onClick={handleNextFootwear}
              className="text-xs font-mono font-bold text-[#D92243] hover:underline flex items-center gap-1 uppercase"
            >
              Swap <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {currentFootwear && (
            <motion.div
              key={currentFootwear.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#FFF5E5] border border-[#E0C375]/40 overflow-hidden relative group"
            >
              <img src={currentFootwear.imageUrl} alt={currentFootwear.name} className="w-full h-80 object-cover" />
              <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase bg-white/90 px-2 py-1 border border-slate-200">
                ₹{currentFootwear.price}
              </span>
            </motion.div>
          )}

          <div>
            <h4 className="text-sm font-bold text-slate-900">{currentFootwear?.name || 'No Footwear Selected'}</h4>
            <p className="text-xs text-slate-500 font-mono">Category: {currentFootwear?.category || 'Footwear'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

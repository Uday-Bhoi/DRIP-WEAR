import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { WardrobeItem } from '../types/wardrobe';
import { outfitsApi, OutfitDTO } from '../api/outfits';

interface SavedOutfitsProps {
  items: WardrobeItem[];
  onNavigate: (page: string) => void;
}

export function SavedOutfits({ items, onNavigate }: SavedOutfitsProps) {
  const [outfits, setOutfits] = useState<OutfitDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    outfitsApi.getOutfits()
      .then(res => setOutfits(res))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteOutfit = async (id: string) => {
    setOutfits(prev => prev.filter(o => o.id !== id));
    outfitsApi.deleteOutfit(id).catch(() => {});
  };

  const displayOutfits = outfits.length > 0 ? outfits : [
    {
      id: 'outfit-mock-1',
      name: 'Minimal Weekend Brunch Fit',
      description: 'Crimson Heavyweight Hoodie + Pleated Denim Trousers + Chunky Sneakers',
      vibe_score: 98,
      items: items.slice(0, 3),
      created_at: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-16 text-slate-900 font-sans max-w-7xl mx-auto px-8 py-8">
      {/* Header */}
      <div className="border-b border-[#E0C375]/30 pb-6 flex justify-between items-center">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">Curated Lookbooks</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-1">Saved Outfits</h1>
        </div>
        <Button variant="primary" size="md" onClick={() => onNavigate('builder')}>
          + Create Combination
        </Button>
      </div>

      {/* Outfits List */}
      <div className="space-y-16">
        {displayOutfits.map((outfit, index) => (
          <div key={outfit.id} className="space-y-6">
            <div className="border-b border-[#E0C375]/30 pb-6 flex justify-between items-start">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F69D39]">
                  Look 0{index + 1} • AI Match Score: {outfit.vibe_score}%
                </span>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{outfit.name}</h3>
                {outfit.description && (
                  <p className="text-sm text-slate-600 font-sans mt-1">{outfit.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDeleteOutfit(outfit.id)}
                className="text-slate-400 hover:text-[#D92243] transition p-2"
                title="Delete Outfit"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {(outfit.items || items.slice(0, 3)).map(item => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="overflow-hidden bg-[#FFF5E5] border border-[#E0C375]/40 mb-3">
                    <img src={item.imageUrl || (item as any).original_image_url} alt={item.name} className="w-full h-80 object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#F69D39] block">{item.category}</span>
                  <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

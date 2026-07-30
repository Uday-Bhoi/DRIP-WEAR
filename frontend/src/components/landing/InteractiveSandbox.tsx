import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shirt, Sun, Bookmark } from 'lucide-react';
import { Badge } from '../ui/Card';

export function InteractiveSandbox() {
  const [activeOccasion, setActiveOccasion] = useState<'casual' | 'office' | 'party'>('casual');

  const demoOutfits = {
    casual: {
      name: 'Summer Brunch Casual',
      weather: '26°C Clear Sky',
      matchScore: '98%',
      items: [
        { name: 'Oversized Boxy Tee', brand: 'Acne Studios', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80' },
        { name: 'Vintage Raw Denim', brand: "Levi's 501", img: 'https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80' },
        { name: 'Off-White Leather Lows', brand: 'Common Projects', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80' }
      ]
    },
    office: {
      name: 'Tailored Business Presentation',
      weather: '22°C Air Conditioned',
      matchScore: '95%',
      items: [
        { name: 'Linen Cuban Overshirt', brand: 'Jacquemus', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80' },
        { name: 'Tailored Wool Blazer', brand: 'Zara Man', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80' },
        { name: 'Vintage Raw Denim', brand: "Levi's 501", img: 'https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80' }
      ]
    },
    party: {
      name: 'Evening Streetwear Drip',
      weather: '19°C Mild Breeze',
      matchScore: '99%',
      items: [
        { name: 'Oversized Boxy Tee', brand: 'Acne Studios', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80' },
        { name: 'Retro Suede Sneakers', brand: 'New Balance 990v5', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80' },
        { name: 'Tailored Wool Blazer', brand: 'Zara Man', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80' }
      ]
    }
  };

  return (
    <section id="interactive-demo" className="max-w-5xl mx-auto px-6 py-16">
      <div className="bg-white border border-[#E0C375]/60 rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <Badge variant="crimson">Interactive Showcase</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3">Live Outfit Composition Sandbox</h2>
          <p className="text-slate-600 text-sm mt-1">Select an occasion to watch DripWear assemble outfits live from your virtual wardrobe.</p>

          <div className="flex justify-center gap-3 mt-6">
            {[
              { id: 'casual', label: 'Casual Brunch' },
              { id: 'office', label: 'Office Presentation' },
              { id: 'party', label: 'Evening Drip' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveOccasion(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
                  activeOccasion === tab.id
                    ? 'bg-[#D92243] text-white shadow-md shadow-[#D92243]/25'
                    : 'bg-[#FFF5E5] text-slate-700 hover:bg-[#FCE7C8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeOccasion}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FFF5E5]/60 border border-[#E0C375]/40 rounded-2xl p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{demoOutfits[activeOccasion].name}</h3>
              <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                <Sun className="w-3.5 h-3.5 text-[#F69D39]" /> {demoOutfits[activeOccasion].weather}
              </p>
            </div>
            <Badge variant="orange">{demoOutfits[activeOccasion].matchScore} AI Match Score</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {demoOutfits[activeOccasion].items.map((item, i) => (
              <div key={i} className="bg-white p-3 rounded-2xl border border-[#E0C375]/40 shadow-xs flex items-center gap-3">
                <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-slate-200" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 truncate max-w-[130px]">{item.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{item.brand}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shirt, Plus, Search, Filter, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { UploadGarmentModal } from '../components/wardrobe/UploadGarmentModal';
import { ItemDetailDrawer } from '../components/wardrobe/ItemDetailDrawer';
import type { WardrobeItem } from '../types/wardrobe';

interface VirtualWardrobeProps {
  items: WardrobeItem[];
  onAddItem: (item: WardrobeItem) => void;
}

export function VirtualWardrobe({ items, onAddItem }: VirtualWardrobeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);

  const categories = ['All', 'Tops', 'Bottoms', 'Footwear', 'Outerwear'];

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 text-slate-900 font-sans max-w-7xl mx-auto px-8 py-8">
      {/* Upload Garment Modal */}
      <UploadGarmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={onAddItem}
      />

      {/* Item Detail Inspector Drawer */}
      <ItemDetailDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* 1. Header Navigation & Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E0C375]/30 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">Digital Inventory</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-1">Virtual Wardrobe</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search garments..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#D92243]"
            />
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            + Add Garment
          </Button>
        </div>
      </div>

      {/* 2. Category Tab Strip */}
      <div className="flex gap-4 border-b border-[#E0C375]/30 pb-4 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 transition ${
              selectedCategory === cat ? 'bg-[#D92243] text-white' : 'text-slate-700 hover:text-[#D92243]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Unboxed Editorial Clothing Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {filteredItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden bg-[#FFF5E5] border border-[#E0C375]/40 mb-3 relative">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase bg-white/90 px-2 py-1 border border-slate-200">
                ₹{item.price}
              </span>
              <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition text-[9px] font-mono font-bold uppercase bg-[#D92243] text-white px-2 py-1 flex items-center gap-1">
                <Eye className="w-3 h-3" /> Inspect
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F69D39] block">{item.category}</span>
            <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
            <p className="text-xs text-slate-500 font-mono">Times Worn: {item.wearCount || 0}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

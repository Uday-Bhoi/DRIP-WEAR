import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X } from 'lucide-react';
import type { WardrobeItem } from '../../types/wardrobe';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items?: WardrobeItem[];
  onSelectItem: (item: WardrobeItem) => void;
}

export function GlobalSearchModal({ isOpen, onClose, items = [], onSelectItem }: GlobalSearchModalProps) {
  const [query, setQuery] = React.useState('');

  const itemList = items || [];
  const filtered = itemList.filter(item =>
    (item?.name || '').toLowerCase().includes(query.toLowerCase()) ||
    (item?.category || '').toLowerCase().includes(query.toLowerCase()) ||
    (item?.color || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-200"
          >
            <div className="relative mb-4 flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search garments, brands, colors, or outfits (⌘K)..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#D92243] font-sans"
              />
              <button onClick={onClose} className="absolute right-4 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2 pr-1 font-sans">
              {filtered.length > 0 ? (
                filtered.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 bg-slate-50 hover:bg-[#FFF5E5] rounded-2xl border border-slate-100 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-xl border border-slate-200" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                        <p className="text-[10px] text-slate-500">{item.category} • ₹{item.price}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#D92243] bg-[#D92243]/10 px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-center text-slate-400 py-6">No garments found matching query</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

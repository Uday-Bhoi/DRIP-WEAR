import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Trash2, Save, Upload, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import type { WardrobeItem } from '../../types/wardrobe';
import { useAppStore } from '../../theme/store';
import { mediaApi } from '../../api/media';

interface ItemDetailDrawerProps {
  item: WardrobeItem | null;
  onClose: () => void;
  onToggleStatus?: (itemId: string) => void;
}

export function ItemDetailDrawer({ item, onClose, onToggleStatus }: ItemDetailDrawerProps) {
  const { updateWardrobeItem, deleteWardrobeItem } = useAppStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Tops' | 'Bottoms' | 'Footwear' | 'Outerwear'>('Tops');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [season, setSeason] = useState('All-Season');
  const [occasion, setOccasion] = useState('Casual');
  const [imageUrl, setImageUrl] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<'clean' | 'laundry'>('clean');

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setCategory((item.category as any) || 'Tops');
      setPrice(item.price || 0);
      setBrand(item.brand || '');
      setSeason(item.season || 'All-Season');
      setOccasion(item.occasion || 'Casual');
      setImageUrl(item.imageUrl || '');
      setStatus(item.status === 'laundry' || item.laundryStatus === 'laundry' ? 'laundry' : 'clean');
      setIsEditing(false);
      setIsDeleting(false);
      setNewFile(null);
      setPreviewUrl(null);
    }
  }, [item]);

  if (!item) return null;

  const costPerWear = item.wearCount && item.wearCount > 0 ? Math.round(price / item.wearCount) : price;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setNewFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    let finalImageUrl = imageUrl;

    try {
      if (newFile) {
        const uploaded = await mediaApi.uploadFile(newFile);
        if (uploaded?.url) {
          finalImageUrl = uploaded.url;
        }
      }

      await updateWardrobeItem(item.id, {
        name,
        category,
        price,
        brand,
        season,
        occasion,
        imageUrl: finalImageUrl,
      });

      setIsEditing(false);
      onClose();
    } catch (err) {
      console.error('Failed to save garment edits:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsSaving(true);
    try {
      await deleteWardrobeItem(item.id);
      onClose();
    } catch (err) {
      console.error('Failed to delete garment:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = () => {
    const newStatus = status === 'clean' ? 'laundry' : 'clean';
    setStatus(newStatus);
    if (onToggleStatus) onToggleStatus(item.id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white border-l border-[#E0C375]/50 w-full max-w-md h-full p-8 shadow-2xl overflow-y-auto font-sans flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Header & Close Button */}
            <div className="flex justify-between items-center border-b border-[#E0C375]/30 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D92243]">
                  Garment Management
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                  {isEditing ? 'Edit Garment Details' : item.name}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {!isEditing && !isDeleting && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-slate-500 hover:text-[#D92243] transition flex items-center gap-1 text-xs font-mono font-bold"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                )}
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* DELETE CONFIRMATION BANNER */}
            {isDeleting && (
              <div className="bg-rose-50 border border-rose-200 p-4 text-left space-y-3">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs font-mono">
                  <AlertTriangle className="w-4 h-4" /> Delete Garment Permanently?
                </div>
                <p className="text-xs text-slate-600">
                  Are you sure you want to delete <strong>"{item.name}"</strong>? This action cannot be undone.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Button variant="outline" size="sm" onClick={() => setIsDeleting(false)} disabled={isSaving}>
                    Cancel
                  </Button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={isSaving}
                    className="px-4 py-2 bg-rose-600 text-white text-xs font-mono font-bold uppercase hover:bg-rose-700 transition"
                  >
                    {isSaving ? 'Deleting...' : 'Yes, Delete Item'}
                  </button>
                </div>
              </div>
            )}

            {/* EDIT FORM MODE */}
            {isEditing ? (
              <div className="space-y-4 text-left">
                {/* Photo Upload / Replace */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">
                    Garment Photo
                  </label>
                  <div className="relative border border-[#E0C375]/50 bg-[#FFF5E5]/50 p-4 flex flex-col items-center">
                    <img
                      src={previewUrl || imageUrl}
                      alt="Preview"
                      className="h-44 object-contain mb-3 border border-slate-200 bg-white"
                    />
                    <label className="cursor-pointer bg-white border border-slate-200 hover:border-[#D92243] px-3 py-1.5 text-xs font-mono font-bold text-slate-800 transition flex items-center gap-1.5 shadow-xs">
                      <Upload className="w-3.5 h-3.5 text-[#D92243]" /> Replace Photo
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">
                    Garment Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:border-[#D92243]"
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as any)}
                      className="w-full border border-slate-200 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#D92243]"
                    >
                      <option value="Tops">Tops</option>
                      <option value="Bottoms">Bottoms</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Outerwear">Outerwear</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={e => setPrice(parseFloat(e.target.value) || 0)}
                      className="w-full border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-[#D92243]"
                    />
                  </div>
                </div>

                {/* Brand & Season */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={brand}
                      onChange={e => setBrand(e.target.value)}
                      placeholder="e.g. Zara, Nike"
                      className="w-full border border-slate-200 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#D92243]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">
                      Season
                    </label>
                    <select
                      value={season}
                      onChange={e => setSeason(e.target.value)}
                      className="w-full border border-slate-200 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#D92243]"
                    >
                      <option value="All-Season">All-Season</option>
                      <option value="Summer">Summer</option>
                      <option value="Winter">Winter</option>
                      <option value="Spring">Spring</option>
                      <option value="Fall">Fall</option>
                    </select>
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={e => setOccasion(e.target.value)}
                    className="w-full border border-slate-200 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#D92243]"
                  >
                    <option value="Casual">Casual</option>
                    <option value="Formal">Formal</option>
                    <option value="Party">Party</option>
                    <option value="Gym">Gym</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>
            ) : (
              /* VIEW MODE */
              <div className="space-y-6">
                {/* Image Preview */}
                <div className="bg-[#FFF5E5] border border-[#E0C375]/40 overflow-hidden relative">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-80 object-cover" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase bg-white/90 px-2 py-1 border border-slate-200">
                    {item.category}
                  </span>
                  {item.brand && (
                    <span className="absolute top-3 right-3 text-[10px] font-mono font-bold uppercase bg-[#D92243] text-white px-2 py-1">
                      {item.brand}
                    </span>
                  )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 border-b border-[#E0C375]/30 pb-6">
                  <div className="bg-[#FFF5E5]/60 border border-[#E0C375]/30 p-4">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">Garment Value</span>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">₹{price}</p>
                  </div>

                  <div className="bg-[#FFF5E5]/60 border border-[#E0C375]/30 p-4">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#F69D39] block">Cost Per Wear</span>
                    <p className="text-xl font-extrabold text-[#F69D39] mt-1">₹{costPerWear} / wear</p>
                  </div>
                </div>

                {/* Laundry Status Toggle */}
                <div className="flex justify-between items-center bg-white border border-[#E0C375]/40 p-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">Laundry Status</h4>
                    <p className="text-[11px] text-slate-500 font-mono">Currently: <strong className="capitalize text-[#D92243]">{status}</strong></p>
                  </div>
                  <button
                    onClick={handleToggle}
                    className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition ${
                      status === 'clean' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    Mark as {status === 'clean' ? 'Dirty' : 'Clean'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" size="md" onClick={() => setIsEditing(false)} disabled={isSaving} className="w-1/2">
                  Cancel
                </Button>
                <Button variant="primary" size="md" onClick={handleSaveChanges} disabled={isSaving} className="w-1/2 flex items-center justify-center gap-1.5">
                  <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsDeleting(true)}
                  className="px-4 py-2.5 border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-mono font-bold uppercase transition flex items-center justify-center gap-1.5 w-1/3"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
                <Button variant="primary" size="md" onClick={onClose} className="w-2/3">
                  Done Inspecting
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

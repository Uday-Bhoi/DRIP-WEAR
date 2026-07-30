import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import type { WardrobeItem } from '../../types/wardrobe';
import { mediaApi } from '../../api/media';
import { wardrobeApi } from '../../api/wardrobe';

interface UploadGarmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newItem: WardrobeItem) => void;
}

export function UploadGarmentModal({ isOpen, onClose, onUploadSuccess }: UploadGarmentModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Tops' | 'Bottoms' | 'Footwear' | 'Outerwear'>('Tops');
  const [price, setPrice] = useState('4500');
  const [uploadStage, setUploadStage] = useState<'idle' | 'uploading' | 'processing' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setErrorMessage(null);
      if (!name) setName(selected.name.split('.')[0]);
    }
  };

  const handleStartUpload = async () => {
    if (!previewUrl) return;
    setErrorMessage(null);

    setUploadStage('uploading');
    setProgress(30);

    try {
      let persistentImageUrl = previewUrl;

      // 1. Upload photo to backend media endpoint
      if (file) {
        const uploaded = await mediaApi.uploadFile(file);
        if (uploaded?.url) {
          persistentImageUrl = uploaded.url;
        }
      }

      setUploadStage('processing');
      setProgress(70);

      // 2. Persist wardrobe item in PostgreSQL database via backend API
      const created = await wardrobeApi.createItem({
        name: name || 'Uploaded Garment',
        category: category,
        original_image_url: persistentImageUrl,
        purchase_price: parseFloat(price) || 2999,
        colors: ['#D92243'],
      });

      setUploadStage('done');
      setProgress(100);

      setTimeout(() => {
        onUploadSuccess(created);
        resetForm();
        onClose();
      }, 600);
    } catch (err: any) {
      console.error('Failed to persist wardrobe item:', err);
      setUploadStage('idle');
      setErrorMessage(err?.response?.data?.detail || err?.message || 'Failed to upload item. Please check backend connection.');
    }
  };

  const resetForm = () => {
    setUploadStage('idle');
    setFile(null);
    setPreviewUrl(null);
    setName('');
    setProgress(0);
    setErrorMessage(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white border border-[#E0C375]/60 max-w-lg w-full p-8 shadow-2xl relative font-sans"
        >
          {/* Close Button */}
          <button
            onClick={() => { resetForm(); onClose(); }}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6 text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">
              Garment Digitalization
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Add New Garment
            </h2>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-xs font-mono text-rose-600">
              {errorMessage}
            </div>
          )}

          {/* Upload Area */}
          {uploadStage === 'idle' && (
            <div className="space-y-6 text-left">
              <label className="border-2 border-dashed border-[#E0C375] hover:border-[#D92243] bg-[#FFF5E5]/50 p-8 flex flex-col items-center justify-center cursor-pointer transition text-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="h-40 object-contain mb-2" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-[#D92243] mb-2" />
                    <span className="text-xs font-mono font-bold uppercase text-slate-900">
                      Click to upload garment photo
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono mt-1">
                      SAM AI Background Removal & Garment Ingestion
                    </span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>

              <div>
                <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">
                  Garment Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Black Oversized T-Shirt"
                  className="w-full border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#D92243]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full border border-slate-200 px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-[#D92243]"
                  >
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Outerwear">Outerwear</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-slate-700 block mb-1">
                    Garment Value (₹)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#D92243]"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleStartUpload}
                disabled={!previewUrl}
                className="w-full"
              >
                Add Garment to Inventory
              </Button>
            </div>
          )}

          {/* Upload Progress Animation */}
          {uploadStage !== 'idle' && (
            <div className="py-8 text-center space-y-4 font-sans">
              <div className="w-16 h-16 rounded-full bg-[#D92243] text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {uploadStage === 'uploading' && 'Uploading Garment Photo to Server...'}
                  {uploadStage === 'processing' && 'Saving Garment to PostgreSQL...'}
                  {uploadStage === 'done' && 'Garment Successfully Persisted!'}
                </h3>
              </div>

              <div className="w-full bg-slate-100 h-2 overflow-hidden border border-slate-200">
                <div className="bg-[#D92243] h-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs font-mono text-slate-400">{progress}% Complete</span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

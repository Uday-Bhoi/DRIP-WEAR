import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, Sparkles, ArrowLeft, Shirt } from 'lucide-react';
import { Button } from '../components/ui/Button';
import confetti from 'canvas-confetti';

interface OnboardingFlowProps {
  onComplete: () => void;
  onNavigate: (page: string) => void;
}

export function OnboardingFlow({ onComplete, onNavigate }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Uday');
  const [height, setHeight] = useState('180 cm');
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Streetwear', 'Minimal']);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('Uploading photos...');

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleStartScan = () => {
    setStep(4);
    setScanProgress(0);
    setScanStage('Uploading photos to Cloudinary...');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);

      if (progress === 25) setScanStage('Removing backgrounds with SAM AI...');
      if (progress === 50) setScanStage('Categorizing tops, bottoms, & footwear...');
      if (progress === 75) setScanStage('Extracting HSL color palettes & fabric tags...');
      if (progress === 90) setScanStage('Synthesizing your Style DNA profile...');

      if (progress >= 100) {
        clearInterval(interval);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        setTimeout(() => onComplete(), 1000);
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#FFF5E5] flex items-center justify-center p-6 text-slate-900 font-sans relative">
      {/* Return Home Button */}
      <button
        onClick={() => onNavigate('landing')}
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#D92243] bg-white border border-[#E0C375]/50 px-4 py-2.5 rounded-full shadow-xs transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white border border-[#E0C375]/60 rounded-3xl p-8 shadow-xl relative overflow-hidden"
      >
        {/* Clickable Logo */}
        <div className="flex items-center gap-3 justify-center mb-6 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-9 h-9 rounded-2xl bg-[#D92243] flex items-center justify-center text-white shadow-md shadow-[#D92243]/20">
            <Shirt className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            DripWear
          </span>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  step >= s ? 'bg-[#D92243]' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* STEP 1: Profile Setup */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome to DripWear</h2>
            <p className="text-xs text-slate-500 mb-6">Let's set up your profile for personal recommendations.</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D92243]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block">Height / Body Proportions</label>
                <input
                  type="text"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D92243]"
                />
              </div>
            </div>

            <Button variant="primary" size="lg" onClick={() => setStep(2)} className="w-full">
              Continue to Style DNA
            </Button>
          </motion.div>
        )}

        {/* STEP 2: Style DNA Selection */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Select Your Style DNA</h2>
            <p className="text-xs text-slate-500 mb-6">Choose aesthetics that best describe your personal taste.</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {['Streetwear', 'Minimal', 'Formal', 'Casual', 'Athleisure', 'Vintage'].map(style => {
                const isSelected = selectedStyles.includes(style);
                return (
                  <button
                    key={style}
                    onClick={() => toggleStyle(style)}
                    className={`p-3.5 rounded-2xl text-xs font-bold text-left transition border ${
                      isSelected
                        ? 'bg-[#D92243]/10 border-[#D92243] text-[#D92243] shadow-xs'
                        : 'bg-[#FFF5E5]/50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-full text-xs"
              >
                Back
              </button>
              <Button variant="primary" size="md" onClick={() => setStep(3)} className="flex-1">
                Next Step
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Upload First Clothes */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Import Your Clothes</h2>
            <p className="text-xs text-slate-500 mb-6">Upload photos for automatic background removal and tagging.</p>

            <div
              onClick={handleStartScan}
              className="border-2 border-dashed border-[#F69D39] hover:border-[#D92243] bg-[#FFF5E5] rounded-3xl p-8 text-center cursor-pointer transition mb-6"
            >
              <Upload className="w-8 h-8 text-[#D92243] mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-900">Drag & drop clothing photos</p>
              <p className="text-xs text-slate-500 mt-1">SAM AI automatically removes backgrounds</p>
            </div>

            <Button variant="primary" size="lg" onClick={handleStartScan} className="w-full">
              Start AI Ingestion Scan <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* STEP 4: AI Scan Processing Animation */}
        {step === 4 && (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#D92243] text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#D92243]/30 animate-pulse">
              <Sparkles className="w-8 h-8 fill-current" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Building Your Digital Wardrobe</h3>
            <p className="text-xs font-bold text-[#F69D39] mb-6">{scanStage}</p>

            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 mb-3 border border-slate-200">
              <motion.div
                className="bg-[#D92243] h-full rounded-full"
                style={{ width: `${scanProgress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-mono text-slate-400">{scanProgress}% Complete</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

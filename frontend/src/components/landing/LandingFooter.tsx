import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

export function LandingFooter() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-12 px-8 font-sans">
      {/* Top Banner Marquee */}
      <div className="border-b border-slate-800 pb-12 mb-16 overflow-hidden">
        <p className="text-xs font-mono tracking-widest text-[#F69D39] uppercase text-center">
          WEAR. TRACK. PLAN. STYLE. CREATE. REWEAR. INVEST. RESELL. DONATE. REPAIR.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand & Newsletter Column */}
        <div className="space-y-6">
          <h3 className="text-3xl font-extrabold tracking-tight">DRIPWEAR</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Form is Temporary. Drip is Permanent. AI-powered Virtual Wardrobe and Personal Fashion Assistant.
          </p>

          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#F69D39] block">
              Get the memo
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D92243] flex-1"
              />
              <button className="bg-[#D92243] hover:bg-[#c01c39] text-white p-2.5 rounded-xl transition">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* What's DripWear? Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#F69D39] mb-4">What's DripWear?</h4>
          <ul className="space-y-3 text-xs font-mono uppercase text-slate-400">
            <li><a href="#about-us" className="hover:text-white transition">About Us</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
            <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* For You Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#F69D39] mb-4">For You</h4>
          <ul className="space-y-3 text-xs font-mono uppercase text-slate-400">
            <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
            <li><button onClick={() => navigate('/wardrobe')} className="hover:text-white transition">Virtual Wardrobe</button></li>
            <li><button onClick={() => navigate('/builder')} className="hover:text-white transition">Outfit Builder</button></li>
            <li><button onClick={() => navigate('/analytics')} className="hover:text-white transition">Style Analytics</button></li>
          </ul>
        </div>

        {/* Free Mobile / Web Access QR Placeholder */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#F69D39]">Instant Access</h4>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
            <div className="w-24 h-24 bg-white text-slate-950 rounded-xl mx-auto flex items-center justify-center font-extrabold text-xs">
              QR CODE
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-mono uppercase">Scan to Open DripWear</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-mono">
        <p>© 2026 DripWear Inc. Form is Temporary. Drip is Permanent.</p>
        <p>Built with React 19, Vite, and Tailwind CSS.</p>
      </div>
    </footer>
  );
}

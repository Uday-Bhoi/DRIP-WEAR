import React from 'react';
import { motion } from 'framer-motion';

export function AboutUsPage() {
  return (
    <div className="bg-[#FFF5E5] text-slate-900 min-h-screen py-20 px-8 font-sans max-w-5xl mx-auto space-y-16">
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 text-center">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">About DripWear</span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">Form is Temporary. Drip is Permanent.</h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          DripWear was born from a simple everyday dilemma: owning hundreds of clothes, but feeling like you have nothing to wear.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold">Our Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We are building the world's most intelligent fashion operating system. By marrying computer vision (SAM AI background removal & Florence-2 visual tagging) with Gemini LLM reasoning, we empower people to wear 100% of their wardrobe.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
          alt="DripWear Mission"
          className="w-full h-80 object-cover rounded-3xl border border-[#E0C375]/40 shadow-lg"
        />
      </div>
    </div>
  );
}

export function FAQPage() {
  const faqs = [
    { q: 'What is DripWear?', a: 'DripWear is an AI-powered virtual wardrobe assistant that digitizes your clothes and generates context-aware outfit recommendations.' },
    { q: 'Is my wardrobe data private?', a: 'Yes! Your clothing images are securely processed and never shared with third parties.' },
    { q: 'How does background removal work?', a: 'We utilize Segment Anything Model (SAM) AI to remove image backgrounds automatically upon upload.' },
    { q: 'Is DripWear free to use?', a: 'Yes! You can start digitizing your closet today for free.' }
  ];

  return (
    <div className="bg-[#FFF5E5] text-slate-900 min-h-screen py-20 px-8 font-sans max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F69D39]">Help Center</span>
        <h1 className="text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-[#E0C375]/40 pb-6">
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">{faq.q}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThoughtsPage() {
  const articles = [
    { title: 'The Economics of Cost-Per-Wear (₹/wear)', date: 'July 28, 2026', readTime: '5 min read', desc: 'How tracking garment wear frequency changes your purchasing habits.' },
    { title: 'SAM AI & Computer Vision in Digital Fashion', date: 'July 20, 2026', readTime: '4 min read', desc: 'Removing backgrounds and extracting HSL color palettes automatically.' }
  ];

  return (
    <div className="bg-[#FFF5E5] text-slate-900 min-h-screen py-20 px-8 font-sans max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">DripWear Thoughts & Journal</span>
        <h1 className="text-4xl font-extrabold tracking-tight">Fashion Tech & Closet Insights</h1>
      </div>

      <div className="space-y-8">
        {articles.map((art, i) => (
          <div key={i} className="border-b border-[#E0C375]/40 pb-8 space-y-2">
            <span className="text-xs font-mono text-[#F69D39]">{art.date} • {art.readTime}</span>
            <h3 className="text-2xl font-extrabold text-slate-900 hover:text-[#D92243] cursor-pointer transition">{art.title}</h3>
            <p className="text-sm text-slate-600">{art.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="bg-[#FFF5E5] text-slate-900 min-h-screen py-20 px-8 font-sans max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">Get in Touch</span>
        <h1 className="text-4xl font-extrabold tracking-tight">Contact DripWear Team</h1>
        <p className="text-sm text-slate-600">Have questions or feedback? Drop us a line below.</p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center font-bold">
          Message sent successfully! Our team will get back to you shortly.
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
            <input type="text" required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D92243]" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <input type="email" required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D92243]" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Message</label>
            <textarea rows={4} required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D92243]" />
          </div>
          <button type="submit" className="w-full bg-[#D92243] hover:bg-[#c01c39] text-white font-bold py-3.5 rounded-full text-sm transition">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

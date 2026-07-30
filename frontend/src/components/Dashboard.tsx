import React, { useState } from 'react';
import { Sparkles, Shirt, Calendar, CloudSun, User, Plus, Search, Filter } from 'lucide-react';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'wardrobe' | 'stylist' | 'analytics'>('wardrobe');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-xl text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              DripWear
            </h1>
            <p className="text-xs text-slate-400">Form is Temporary. Drip is Permanent.</p>
          </div>
        </div>

        <nav className="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('wardrobe')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'wardrobe' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shirt className="w-4 h-4" /> Digital Wardrobe
          </button>
          <button
            onClick={() => setActiveTab('stylist')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'stylist' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" /> AI Stylist
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'wardrobe' ? (
          <div>
            {/* Header Controls */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">My Digital Wardrobe</h2>
                <p className="text-slate-400 text-sm">Organize, filter, and track cost-per-wear of your clothing collection.</p>
              </div>

              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl transition">
                <Plus className="w-4 h-4" /> Upload Clothing Item
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search items by color, brand, or style (e.g. Black Hoodie)..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <select className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500">
                <option value="">All Categories</option>
                <option value="Shirts">Shirts</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>

            {/* Item Grid Mock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[220px] text-center border-dashed border-slate-700">
                <Shirt className="w-10 h-10 text-slate-600 mb-2" />
                <p className="text-slate-400 text-sm font-medium">No clothes uploaded yet</p>
                <p className="text-slate-500 text-xs mt-1">Upload your first item to enable AI categorisation</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">AI Personal Stylist</h2>
            <p className="text-slate-400 text-sm mb-6">Ask DripWear AI for occasion-specific outfit recommendations using your real wardrobe.</p>
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
              <div className="flex gap-3 mb-4">
                <div className="bg-indigo-600 p-2 rounded-xl text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-300 font-medium">DripWear AI Stylist</p>
                  <p className="text-xs text-slate-500">Ready to style your day.</p>
                </div>
              </div>
              <textarea
                rows={3}
                placeholder="E.g., 'Suggest a minimal casual outfit for a dinner date tonight in 24°C weather...'"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button className="mt-3 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl transition w-full">
                Generate Outfit Recommendations
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

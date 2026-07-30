import React from 'react';
import { User, Shield, Check, Mail } from 'lucide-react';
import { useAppStore } from '../theme/store';
import { Button } from '../components/ui/Button';

export function ProfilePage() {
  const { user, updateProfile } = useAppStore();

  return (
    <div className="bg-[#FFF5E5] text-slate-900 min-h-screen p-8 font-sans max-w-7xl mx-auto space-y-12">
      <div className="border-b border-[#E0C375]/30 pb-6">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D92243]">Personal Style DNA</span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-1">User Profile</h1>
      </div>

      <div className="flex items-center gap-6 border-b border-[#E0C375]/30 pb-8">
        <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full object-cover border-2 border-[#D92243]" />
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">{user.name}</h2>
          <p className="text-xs text-slate-500 font-mono">{user.email} • Member since 2026</p>
          <span className="text-xs font-mono font-bold text-[#D92243] uppercase tracking-wider block mt-1">Style DNA: {user.styleDna}</span>
        </div>
      </div>

      <div className="space-y-8 max-w-3xl">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-2">Full Name</label>
            <input 
              type="text" 
              value={user.name} 
              onChange={e => updateProfile({ name: e.target.value })}
              className="w-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#D92243]" 
            />
          </div>
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-2">Height / Body Proportions</label>
            <input 
              type="text" 
              value={user.height} 
              onChange={e => updateProfile({ height: e.target.value })}
              className="w-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#D92243]" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-2">Email Address</label>
            <input 
              type="email" 
              value={user.email} 
              onChange={e => updateProfile({ email: e.target.value })}
              className="w-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#D92243]" 
            />
          </div>
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block mb-2">Connected Google Account</label>
            <div className="flex items-center justify-between p-3 border border-slate-300 bg-white/50 text-xs">
              <span className="font-bold text-slate-800">Google OAuth Connected</span>
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        </div>

        <Button variant="primary" size="md">Save Profile Changes</Button>
      </div>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="bg-[#FFF5E5] text-slate-900 min-h-screen p-8 font-sans max-w-7xl mx-auto space-y-12">
      <div className="border-b border-[#E0C375]/30 pb-6">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F69D39]">System Preferences</span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-1">Account Settings</h1>
      </div>

      <div className="space-y-8 max-w-3xl">
        <div className="flex items-center justify-between border-b border-[#E0C375]/30 pb-6">
          <div>
            <h4 className="text-base font-bold text-slate-900">Laundry Status Reminders</h4>
            <p className="text-xs text-slate-600 mt-0.5">Receive notifications when clothes are dirty or unwashed for &gt; 7 days.</p>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#D92243]" />
        </div>

        <div className="flex items-center justify-between border-b border-[#E0C375]/30 pb-6">
          <div>
            <h4 className="text-base font-bold text-slate-900">Weather-based Outfit Alerts</h4>
            <p className="text-xs text-slate-600 mt-0.5">Daily 8:00 AM push notifications for rain/cold weather recommendations.</p>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#D92243]" />
        </div>
      </div>
    </div>
  );
}

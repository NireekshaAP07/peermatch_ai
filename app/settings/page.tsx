'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Settings, User, Bell, Shield, Palette, Eye } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function SettingsPage() {
  const { user } = useAuthStore();

  const sections = [
    { name: 'Profile', icon: User, desc: 'Update your neural identity and avatar' },
    { name: 'Notifications', icon: Bell, desc: 'Manage study group and match alerts' },
    { name: 'Privacy', icon: Shield, desc: 'Control who can see your neural graph' },
    { name: 'Appearance', icon: Palette, desc: 'Customize your dashboard interface' },
    { name: 'Accessibility', icon: Eye, desc: 'Visual and cognitive optimization' },
  ];

  return (
    <MainLayout>
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-3 text-indigo-400 mb-2">
            <Settings size={20} />
            <span className="text-[10px] uppercase tracking-widest font-bold">System Configuration</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Settings</h1>
          <p className="text-gray-400">Configure your PeerMatch AI experience and neural preferences.</p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          <div className="glass-card p-8 border-white/5 bg-white/[0.02]">
             <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-3xl font-bold text-indigo-400 border border-indigo-500/20">
                  {user?.name?.charAt(0) || 'G'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name || 'Guest User'}</h2>
                  <p className="text-gray-400 font-mono text-sm">{user?.email || 'guest@peermatch.ai'}</p>
                </div>
             </div>

             <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div key={section.name} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-white/5">
                      <div className="p-3 rounded-xl bg-white/5 text-gray-400 group-hover:text-indigo-400 transition-colors">
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm">{section.name}</h3>
                        <p className="text-xs text-gray-500">{section.desc}</p>
                      </div>
                      <div className="text-gray-600 group-hover:text-white transition-colors">
                        <Settings size={14} />
                      </div>
                    </div>
                  )
                })}
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

'use client';

import React from 'react';
import { Search, Bell, Grid, Moon } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/10 z-30">
      <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-[400px]">
        <Search size={18} className="text-gray-500 mr-3" />
        <input 
          type="text" 
          placeholder="Search students, subjects, or groups..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-600"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-gray-400">
          <Moon size={18} />
        </button>
        <button className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-gray-400 relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#050a14]" />
        </button>
        <div className="h-8 w-px bg-white/10 mx-2" />
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
          <Grid size={18} />
          <span className="text-sm font-bold">Quick Connect</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

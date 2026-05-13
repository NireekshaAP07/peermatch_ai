'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface XPBarProps {
  currentXP: number;
  level: number;
  maxXP?: number;
}

const XPBar: React.FC<XPBarProps> = ({ currentXP, level, maxXP = 200 }) => {
  const percentage = Math.min(100, (currentXP % maxXP) / maxXP * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black italic text-indigo-400">LVL {level}</span>
          <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Progress</span>
        </div>
        <span className="text-xs font-mono text-indigo-300">{currentXP % maxXP} / {maxXP} XP</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
        />
      </div>
    </div>
  );
};

export default XPBar;

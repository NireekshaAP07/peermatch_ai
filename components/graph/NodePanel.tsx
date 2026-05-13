'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Zap, TrendingUp, Users } from 'lucide-react';

interface NodePanelProps {
  node: any;
  onClose: () => void;
}

const NodePanel: React.FC<NodePanelProps> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-[400px] glass-card m-4 rounded-3xl z-50 p-6 flex flex-col gap-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: node.color + '33', border: `1px solid ${node.color}` }}
            >
              {node.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold">{node.name}</h2>
              <span className="text-xs text-gray-400 uppercase tracking-widest">{node.role}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 bg-white/5 border-white/5">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Zap size={14} />
              <span className="text-[10px] uppercase tracking-wider">Level</span>
            </div>
            <div className="text-2xl font-bold">{node.level}</div>
          </div>
          <div className="glass-card p-4 bg-white/5 border-white/5">
            <div className="flex items-center gap-2 text-gold-400 mb-1 text-orange-400">
              <Award size={14} />
              <span className="text-[10px] uppercase tracking-wider">XP</span>
            </div>
            <div className="text-2xl font-bold">{node.xp}</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-green-400" />
            AI INSIGHTS
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="text-xs text-gray-400 mb-1">STRENGTHS</div>
              <div className="flex flex-wrap gap-2">
                {['Mathematics', 'Physics'].map(s => (
                  <span key={s} className="px-2 py-1 bg-green-500/10 text-green-400 rounded-md text-[10px] border border-green-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="text-xs text-gray-400 mb-1">COMPATIBILITY MATCH</div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Strongly matched with **Arun Kumar** for peer mentoring in English. 
                94% similarity in learning pace detected.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Award size={16} className="text-purple-400" />
            BADGES
          </h3>
          <div className="flex gap-3">
            {node.badges?.map((b: any) => (
              <div key={b.id} title={b.name} className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                {b.icon || '🏆'}
              </div>
            ))}
          </div>
        </div>

        <button className="mt-auto w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/20">
          <Users size={18} />
          START COLLABORATION
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default NodePanel;

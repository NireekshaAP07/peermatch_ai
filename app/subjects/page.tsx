'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Book, Zap, TrendingUp, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const SUBJECT_STATS = [
  { name: 'Mathematics', score: 85, color: '#6366f1', trend: '+12%', xp: 1240, level: 4 },
  { name: 'Physics', score: 72, color: '#8b5cf6', trend: '+5%', xp: 850, level: 3 },
  { name: 'Computer Science', score: 94, color: '#10b981', trend: '+18%', xp: 2100, level: 6 },
  { name: 'Chemistry', score: 64, color: '#f59e0b', trend: '-2%', xp: 420, level: 2 },
  { name: 'Biology', score: 78, color: '#ef4444', trend: '+8%', xp: 980, level: 3 },
  { name: 'English', score: 88, color: '#3b82f6', trend: '+10%', xp: 1150, level: 4 },
];

export default function SubjectsPage() {
  return (
    <MainLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">Subject Mastery</h1>
          <p className="text-gray-400">Track your progress and AI-driven performance metrics across the curriculum.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECT_STATS.map((subj, i) => (
            <motion.div
              key={subj.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: subj.color }}
              />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 rounded-2xl bg-white/5 text-white">
                  <Book size={24} style={{ color: subj.color }} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Performance</p>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${subj.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {subj.trend}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1">{subj.name}</h3>
              <p className="text-sm text-gray-400 mb-6">Level {subj.level} Academic Neural Node</p>

              <div className="space-y-4 relative z-10">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Mastery Index</span>
                    <span className="font-bold text-white">{subj.score}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${subj.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: subj.color }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-indigo-400" />
                    <span className="text-xs font-mono">{subj.xp} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-indigo-400" />
                    <span className="text-xs font-mono">Lvl {subj.level}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

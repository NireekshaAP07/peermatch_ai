'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Trophy, Medal, Crown, TrendingUp, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { motion } from 'framer-motion';

export default function LeaderboardPage() {
  const { data: leaders, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const res = await api.get('/api/students/leaderboard');
      return res.data;
    }
  });

  return (
    <MainLayout>
      <div className="p-8 max-w-5xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto border border-indigo-500/20 text-indigo-400"
          >
            <Trophy size={40} />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-white">Global Neural Ranking</h1>
            <p className="text-gray-400">Top performers in the PeerMatch AI ecosystem based on total XP and contribution.</p>
          </div>
        </header>

        <div className="glass-card border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Neural Profile</th>
                  <th className="px-6 py-4">Level</th>
                  <th className="px-6 py-4">Experience (XP)</th>
                  <th className="px-6 py-4">Badges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-8">
                        <div className="h-8 bg-white/5 rounded-xl w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : (
                  leaders?.map((student: any, i: number) => (
                    <motion.tr 
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {i === 0 && <Crown className="text-yellow-400" size={16} />}
                          {i === 1 && <Medal className="text-gray-300" size={16} />}
                          {i === 2 && <Medal className="text-amber-600" size={16} />}
                          <span className={`font-mono font-bold ${i < 3 ? 'text-white' : 'text-gray-500'}`}>
                            #{student.rank.toString().padStart(2, '0')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-bold border border-white/5">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{student.name}</p>
                            <p className="text-[10px] text-indigo-400/70 font-mono">ID: {student.id.toString().padStart(6, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold border border-white/5">
                          LVL {student.level}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-indigo-400">
                          <Zap size={14} className="fill-current" />
                          <span className="font-mono font-bold">{student.xp.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2">
                          {student.badges?.map((badge: any) => (
                            <span key={badge.id} title={badge.name} className="cursor-help grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                              {badge.icon}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

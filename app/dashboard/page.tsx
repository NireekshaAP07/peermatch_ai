'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import XPBar from '@/components/dashboard/XPBar';
import { useAuthStore } from '@/store/authStore';
import { Sparkles, Users, Book, Flame, ArrowUpRight, Award, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', xp: 40 },
  { name: 'Tue', xp: 120 },
  { name: 'Wed', xp: 90 },
  { name: 'Thu', xp: 200 },
  { name: 'Fri', xp: 150 },
  { name: 'Sat', xp: 300 },
  { name: 'Sun', xp: 250 },
];

const StudentDashboard = () => {
  const { user } = useAuthStore();

  return (
    <MainLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Welcome back, <span className="text-indigo-400">{user?.name || 'Explorer'}</span>!</h1>
            <p className="text-gray-400 font-medium">Your AI-powered learning network is evolving.</p>
          </div>
          <div className="flex gap-4">
            <div className="glass-card px-6 py-4 flex items-center gap-4 bg-white/5 border-white/5">
              <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400">
                <Flame size={24} />
              </div>
              <div>
                <div className="text-2xl font-black">7 Days</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Current Streak</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <GlassCard className="h-[400px]">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="font-bold text-lg tracking-tight">Growth Analytics</h3>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-gray-400 outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#4b5563', fontSize: 12}} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#4b5563', fontSize: 12}} 
                    />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#0a1122', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                      itemStyle={{color: '#818cf8'}}
                    />
                    <Area type="monotone" dataKey="xp" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-6">
              <GlassCard>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-bold text-lg tracking-tight">Top Recommendations</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Nidhi Patel', score: 98, subject: 'Physics' },
                    { name: 'Arun Kumar', score: 94, subject: 'English' }
                  ].map((rec) => (
                    <div key={rec.name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group cursor-pointer hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400">
                          {rec.name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-bold">{rec.name}</div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{rec.subject}</div>
                        </div>
                      </div>
                      <div className="text-green-400 font-mono font-bold text-sm">{rec.score}%</div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <Users size={20} />
                  </div>
                  <h3 className="font-bold text-lg tracking-tight">Active Groups</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Quantum Physics Circle', members: 5 },
                    { name: 'Organic Chem Hub', members: 3 }
                  ].map((group) => (
                    <div key={group.name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                      <div>
                        <div className="text-sm font-bold">{group.name}</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{group.members} Members</div>
                      </div>
                      <button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <GlassCard>
              <XPBar currentXP={user?.xp || 350} level={user?.level || 2} />
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                  <Award size={20} />
                </div>
                <h3 className="font-bold text-lg tracking-tight">Your Badges</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: '⭐', name: 'Rising Star' },
                  { icon: '🤝', name: 'Connector' },
                  { icon: '🔥', name: 'Fast Learner' },
                ].map((badge) => (
                  <div key={badge.name} className="flex flex-col items-center gap-2 group cursor-help">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-3xl transition-transform group-hover:scale-110 shadow-lg shadow-black/50">
                      {badge.icon}
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">{badge.name}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Book size={20} />
                </div>
                <h3 className="font-bold text-lg tracking-tight">Recent Subjects</h3>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Mathematics', progress: 85, color: '#4f46e5' },
                  { name: 'Chemistry', progress: 62, color: '#10b981' },
                ].map((s) => (
                  <div key={s.name} className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">{s.name}</span>
                      <span className="text-gray-500">{s.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.progress}%`, backgroundColor: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;

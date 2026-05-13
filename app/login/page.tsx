'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';

const LoginPage = () => {
  const [email, setEmail] = useState('student@demo.com');
  const [password, setPassword] = useState('demo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/api/auth/login', { email, password });
      setAuth(res.data.user, res.data.access_token);
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMsg = (err as any).response?.data?.detail || 'Authentication failed. Please check your credentials.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050a14] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
            <Zap size={32} className="fill-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2 uppercase">Authenticate</h1>
          <p className="text-gray-500 font-medium tracking-wide">Enter the PeerMatch AI Neural Network</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-10 space-y-6 bg-white/5 border-white/10 shadow-2xl">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold flex items-center gap-3">
              <Shield size={16} />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all text-sm font-medium text-white placeholder:text-gray-700"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all text-sm font-medium text-white placeholder:text-gray-700"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-2xl font-black text-white transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 group"
          >
            {loading ? 'SYNCHRONIZING...' : 'INITIALIZE SESSION'}
            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>

          <div className="pt-4 text-center">
            <p className="text-xs text-gray-500 font-medium">
              Don&apos;t have access? <span className="text-indigo-400 cursor-pointer hover:underline">Contact Administrator</span>
            </p>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center gap-8">
           <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-help">
              <div className="text-[10px] font-black uppercase tracking-widest">Student Demo</div>
              <div className="text-[9px] font-mono text-gray-500">student@demo.com / demo</div>
           </div>
           <div className="w-px h-6 bg-white/10" />
           <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-help">
              <div className="text-[10px] font-black uppercase tracking-widest">Teacher Demo</div>
              <div className="text-[9px] font-mono text-gray-500">teacher@demo.com / demo</div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

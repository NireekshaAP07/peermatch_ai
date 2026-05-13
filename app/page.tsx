'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Users, Brain, Trophy, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#050a14] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold italic shadow-lg shadow-indigo-500/20">P</div>
            <span className="text-xl font-black tracking-tight">PeerMatch <span className="text-indigo-400">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#vision" className="hover:text-white transition-colors">Vision</a>
            <a href="#network" className="hover:text-white transition-colors">Network</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black tracking-[0.2em] uppercase mb-8 inline-block">
              AI-Powered Education Platform
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              THE FUTURE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">PEER LEARNING.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-12">
              Intelligently connecting students through neural network mapping, 
              predictive matching, and data-driven collaboration ecosystems.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="/login" className="w-full md:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-lg font-black transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95">
                Initialize Network
              </Link>
              <button className="w-full md:w-auto px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-lg font-black transition-all backdrop-blur-xl">
                Watch Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-24 relative"
          >
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full scale-75" />
            <div className="relative glass-card border-white/10 overflow-hidden shadow-2xl p-2 rounded-[2rem]">
              <div className="h-[400px] md:h-[600px] w-full bg-[#0a1122] rounded-[1.5rem] flex items-center justify-center border border-white/5">
                 <div className="text-indigo-400 animate-pulse text-center">
                    <Zap size={64} className="mx-auto mb-4 opacity-50" />
                    <p className="font-mono text-xs tracking-widest uppercase">Visualizing Neural Network...</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">ENGINEERED FOR GROWTH</h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto">Scalable AI infrastructure designed to detect learning gaps and foster elite collaboration.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Brain, 
                title: 'Predictive Matching', 
                desc: 'Our proprietary ML model analyzes quiz results and behavior to find your perfect study partner.',
                color: 'text-indigo-400',
                bg: 'bg-indigo-500/10'
              },
              { 
                icon: Users, 
                title: 'Social Graphing', 
                desc: 'Visualize your entire classroom as a dynamic, interactive neural network showing connections and expertise.',
                color: 'text-purple-400',
                bg: 'bg-purple-500/10'
              },
              { 
                icon: Trophy, 
                title: 'Gamified XP', 
                desc: 'Earn rewards, unlock badges, and climb leaderboards as you collaborate and help your peers grow.',
                color: 'text-amber-400',
                bg: 'bg-amber-500/10'
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card p-10 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold italic">P</div>
            <span className="text-lg font-black tracking-tight">PeerMatch <span className="text-indigo-400">AI</span></span>
          </div>
          <div className="flex gap-12 text-center md:text-left">
            <div>
              <div className="text-2xl font-black">50K+</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Students Linked</div>
            </div>
            <div>
              <div className="text-2xl font-black">1.2M</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">XP Awarded</div>
            </div>
            <div>
              <div className="text-2xl font-black">94%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Accuracy</div>
            </div>
          </div>
          <p className="text-gray-500 text-sm">© 2024 PeerMatch AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

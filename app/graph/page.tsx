'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NetworkGraph from '@/components/graph/NetworkGraph';
import NodePanel from '@/components/graph/NodePanel';
import { Filter, Layers, Zap, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const GraphPage = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  return (
    <MainLayout>
      <div className="flex-1 relative bg-[#050a14] overflow-hidden">
        {/* Header Overlay */}
        <div className="absolute top-8 left-8 z-20 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={24} className="fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">NEURAL <span className="text-indigo-400 text-3xl italic">SOCIAL</span> GRAPH</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">AI Real-time Learning Ecosystem</p>
            </div>
          </motion.div>
        </div>

        {/* Toolbar Overlay */}
        <div className="absolute top-8 right-8 z-20 flex gap-3">
          <button className="p-3 glass-card bg-white/5 border-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-2 group">
            <Filter size={18} />
            <span className="text-xs font-bold hidden group-hover:block">Filters</span>
          </button>
          <button className="p-3 glass-card bg-white/5 border-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-2 group">
            <Layers size={18} />
            <span className="text-xs font-bold hidden group-hover:block">Layers</span>
          </button>
          <button className="p-3 glass-card bg-indigo-600 border-none text-white transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <Zap size={18} />
            <span className="text-xs font-bold">Live Sync</span>
          </button>
        </div>

        {/* Graph Component */}
        <NetworkGraph onNodeClick={(node) => setSelectedNode(node)} />

        {/* Info Box Overlay */}
        <div className="absolute bottom-8 right-8 z-20 max-w-xs pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="glass-card p-4 bg-black/40 border-white/5 flex items-start gap-3"
          >
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 mt-1">
              <Info size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Click on any node to view student profiles, performance metrics, and AI-driven match recommendations.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Detail Panel Overlay */}
        <NodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>
    </MainLayout>
  );
};

export default GraphPage;

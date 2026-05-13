'use client';

import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

interface GraphNode {
  id: number;
  name: string;
  color: string;
  x?: number;
  y?: number;
}

interface NetworkGraphProps {
  onNodeClick?: (node: GraphNode) => void;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ onNodeClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const { data: graphData, isLoading } = useQuery({
    queryKey: ['graphData'],
    queryFn: async () => {
      const res = await api.get('/api/graph/data');
      return res.data;
    },
    refetchInterval: 10000,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        // Use clientWidth/clientHeight for more accurate layout measurements
        setDimensions({
          width: containerRef.current.clientWidth || window.innerWidth - 256,
          height: containerRef.current.clientHeight || window.innerHeight - 80,
        });
      }
    };

    // Delay measurement slightly to ensure parent flex layout has settled
    const timer = setTimeout(updateDimensions, 100);

    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-indigo-400 bg-[#050a14]">
        <div className="text-center space-y-4">
          <Zap size={48} className="mx-auto animate-pulse opacity-50" />
          <div className="animate-pulse text-sm font-mono tracking-[0.4em] uppercase">
            Initializing Neural Network
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 w-full h-full relative bg-[#050a14]">
      <ForceGraph2D
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#050a14"
        nodeLabel="name"
        nodeColor={(node: any) => node.color}
        nodeRelSize={8}
        linkColor={() => 'rgba(99, 102, 241, 0.15)'}
        linkWidth={1.5}
        linkDirectionalParticles={4}
        linkDirectionalParticleSpeed={0.005}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.1}
        cooldownTicks={200}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 14 / globalScale;
          ctx.font = `bold ${fontSize}px Inter, sans-serif`;
          
          // Draw outer glow
          ctx.beginPath();
          ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
          ctx.shadowBlur = 20;
          ctx.shadowColor = node.color;
          ctx.fillStyle = node.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Draw core node
          ctx.beginPath();
          ctx.arc(node.x, node.y, 7, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color;
          ctx.fill();
          
          // Draw subtle border
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 1 / globalScale;
          ctx.stroke();

          // Draw label with background for legibility
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);
          
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'rgba(5, 10, 20, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + 14 - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
          
          ctx.fillStyle = 'white';
          ctx.fillText(label, node.x, node.y + 14);
        }}
        onNodeClick={onNodeClick as any}
      />
      
      {/* Legend */}
      <div className="absolute bottom-6 left-6 p-4 glass-card flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <span className="text-xs text-gray-400">Teacher</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#A855F7]" />
          <span className="text-xs text-gray-400">High Performer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10B981]" />
          <span className="text-xs text-gray-400">Student</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;

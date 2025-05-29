
import React from 'react';

const FloatingShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating purple circle */}
      <div className="absolute top-[10%] left-[20%] w-56 h-56 rounded-full bg-story-purple/20 filter blur-3xl animate-float"></div>
      
      {/* Floating blue circle */}
      <div className="absolute top-[60%] left-[65%] w-72 h-72 rounded-full bg-blue-500/10 filter blur-3xl animate-float-slow"></div>
      
      {/* Floating peach shape */}
      <div className="absolute top-[30%] left-[70%] w-60 h-60 rounded-full bg-story-softpeach/30 filter blur-3xl animate-float"></div>

      {/* Small decorative elements */}
      <div className="absolute top-[15%] right-[20%] w-4 h-4 bg-story-purple/30 rounded-full animate-pulse-slow"></div>
      <div className="absolute top-[75%] left-[15%] w-3 h-3 bg-amber-400/40 rounded-full animate-pulse-slow"></div>
      <div className="absolute top-[45%] right-[10%] w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse-slow"></div>
    </div>
  );
};

export default FloatingShapes;

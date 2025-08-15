'use client'
import React from 'react';

export const BackgroundShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-blue-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-yellow-100 rounded-full opacity-20 animate-pulse delay-2000"></div>
      
      {/* Geometric shapes */}
      <div className="absolute top-60 left-1/4 w-16 h-16 bg-green-200 transform rotate-45 opacity-10"></div>
      <div className="absolute bottom-60 right-1/4 w-12 h-12 bg-blue-200 transform rotate-12 opacity-10"></div>
      
      {/* Lines */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-green-200 to-transparent opacity-20"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-200 to-transparent opacity-20"></div>
      
      {/* Curved lines */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M0,50 Q25,30 50,50 T100,50"
          stroke="url(#gradient1)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.1"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Bottom wave */}
      <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,120 C300,80 600,100 1200,120 L1200,120 L0,120 Z"
          fill="url(#gradient2)"
          opacity="0.05"
        />
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

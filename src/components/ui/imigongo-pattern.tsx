'use client'
import React, { useState } from 'react';

interface ImigongoPatternProps {
  variant?: 'left' | 'right' | 'center';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
}

export const ImigongoPattern: React.FC<ImigongoPatternProps> = ({ 
  variant = 'left', 
  size = 'md',
  className = '',
  message = "You are welcome, KWETU"
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const sizeValues = {
    sm: { central: 4, inner: 8, middle: 12, outer: 16, corner: 2, line: 0.5 },
    md: { central: 5, inner: 10, middle: 14, outer: 18, corner: 3, line: 1 },
    lg: { central: 6, inner: 12, middle: 18, outer: 24, corner: 4, line: 1 }
  };

  const { central, inner, middle, outer, corner, line } = sizeValues[size];

  return (
    <div 
      className={`relative ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Central Diamond */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rotate-45"
        style={{ width: `${central * 4}px`, height: `${central * 4}px` }}
      ></div>
      
      {/* Inner Diamond Outline */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rotate-45"
        style={{ width: `${inner * 4}px`, height: `${inner * 4}px` }}
      ></div>
      
      {/* Middle Diamond Outline */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-transparent border-r-white border-l-white rotate-45"
        style={{ width: `${middle * 4}px`, height: `${middle * 4}px` }}
      ></div>
      
      {/* Outer Diamond Outline */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white rotate-45"
        style={{ width: `${outer * 4}px`, height: `${outer * 4}px` }}
      ></div>
      
      {/* Corner Extensions */}
      <div 
        className="absolute top-1 left-1 bg-white rotate-45"
        style={{ width: `${corner * 4}px`, height: `${corner * 4}px` }}
      ></div>
      <div 
        className="absolute top-1 right-1 bg-white rotate-45"
        style={{ width: `${corner * 4}px`, height: `${corner * 4}px` }}
      ></div>
      <div 
        className="absolute bottom-1 left-1 bg-white rotate-45"
        style={{ width: `${corner * 4}px`, height: `${corner * 4}px` }}
      ></div>
      <div 
        className="absolute bottom-1 right-1 bg-white rotate-45"
        style={{ width: `${corner * 4}px`, height: `${corner * 4}px` }}
      ></div>
      
      {/* Connecting Lines */}
      <div 
        className="absolute top-1/2 left-0 bg-white"
        style={{ width: `${line * 4}px`, height: `${line * 4}px` }}
      ></div>
      <div 
        className="absolute top-1/2 right-0 bg-white"
        style={{ width: `${line * 4}px`, height: `${line * 4}px` }}
      ></div>
      <div 
        className="absolute left-1/2 top-0 bg-white"
        style={{ width: `${line * 4}px`, height: `${line * 4}px` }}
      ></div>
      <div 
        className="absolute left-1/2 bottom-0 bg-white"
        style={{ width: `${line * 4}px`, height: `${line * 4}px` }}
      ></div>
      
      {/* Hover Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-50">
          {message}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
        </div>
      )}
    </div>
  );
};

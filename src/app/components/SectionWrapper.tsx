'use client';

import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function SectionWrapper({ 
  children, 
  id,
  className = '',
}: SectionWrapperProps) {
  // Border width and radius
  const borderWidth = 2;
  const borderRadius = 20;
  const borderColor = 'var(--onyx)'; // Using CSS variable directly
  
  return (
    <div 
      id={id}
      className={`
        w-full 
        relative
        p-4 sm:p-6 md:p-10
        ${className}
      `}
    >
      <div className="w-full h-full relative">
        {/* Top-left corner */}
        <div 
          className="absolute top-0 left-0"
          style={{
            width: '40%',
            height: '20%',
            borderTopLeftRadius: borderRadius,
            borderTop: `${borderWidth}px solid ${borderColor}`,
            borderLeft: `${borderWidth}px solid ${borderColor}`,
            borderRight: 'none',
            borderBottom: 'none'
          }}
        ></div>
        
        {/* Top-right corner */}
        <div 
          className="absolute top-0 right-0"
          style={{
            width: '40%',
            height: '20%',
            borderTopRightRadius: borderRadius,
            borderTop: `${borderWidth}px solid ${borderColor}`,
            borderRight: `${borderWidth}px solid ${borderColor}`,
            borderLeft: 'none',
            borderBottom: 'none'
          }}
        ></div>
        
        {/* Bottom-left corner */}
        <div 
          className="absolute bottom-0 left-0"
          style={{
            width: '40%',
            height: '20%',
            borderBottomLeftRadius: borderRadius,
            borderBottom: `${borderWidth}px solid ${borderColor}`,
            borderLeft: `${borderWidth}px solid ${borderColor}`,
            borderRight: 'none',
            borderTop: 'none'
          }}
        ></div>
        
        {/* Bottom-right corner */}
        <div 
          className="absolute bottom-0 right-0"
          style={{
            width: '40%',
            height: '20%',
            borderBottomRightRadius: borderRadius,
            borderBottom: `${borderWidth}px solid ${borderColor}`,
            borderRight: `${borderWidth}px solid ${borderColor}`,
            borderLeft: 'none',
            borderTop: 'none'
          }}
        ></div>
        
        {/* Content with padding - reduced on mobile */}
        <div className="w-full h-full p-2 sm:p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 
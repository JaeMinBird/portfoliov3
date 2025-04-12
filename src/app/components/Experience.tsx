'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { experiences } from '../data/Experience';

interface ExperienceProps {
  id?: number; // Optional ID - if not provided, all experiences will be shown
}

// SVG Patterns for icons
const Experience: React.FC<ExperienceProps> = ({ id }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Filter experiences based on ID if provided
  const displayExperiences = useMemo(() => {
    if (id !== undefined) {
      return experiences.filter(exp => exp.id === id);
    }
    return experiences;
  }, [id]);
  
  // Border styling similar to SectionWrapper
  const borderWidth = 2;
  const borderRadius = 20;
  const borderColor = 'var(--onyx)';

  // Simple generic shape to replace all complex SVG patterns
  const genericShape = (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="60" y="60" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  // Custom box with SectionWrapper-like outline
  const OutlinedBox = ({ 
    children, 
    className = '', 
    visible = true 
  }: { 
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
  }) => (
    <div className={`relative ${className}`} style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
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
      
      {/* Content with padding */}
      <div className="w-full h-full p-4 sm:p-6 md:p-8">
        {children}
      </div>
    </div>
  );

  if (displayExperiences.length === 0) {
    return <div className="w-full p-4 text-center">Experience not found</div>;
  }

  return (
    <div className="w-full p-2 sm:p-4 md:p-6 lg:p-8">
      {displayExperiences.map((exp, index) => (
        <div 
          key={exp.id}
          className="mb-8 md:mb-12 relative"
          onMouseEnter={() => setHoveredId(exp.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            {/* Left side: Icon (only visible when hovered) - Desktop only */}
            <div className="hidden md:block" style={{ width: '35vh', height: '40vh' }}>
              <OutlinedBox className="w-full h-full" visible={hoveredId === exp.id}>
                <div className="h-full flex items-center justify-center">
                  <motion.div 
                    className="text-pink-300 w-full h-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredId === exp.id ? 1 : 0,
                      scale: hoveredId === exp.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {genericShape}
                  </motion.div>
                </div>
              </OutlinedBox>
            </div>
            
            {/* Right side: Content */}
            <div className="w-full md:w-auto" style={{ flex: '1', height: '40vh' }}>
              <OutlinedBox className="h-full">
                <div className="mb-3 px-2">
                  <h2 className="halftone-text mb-2 leading-tight">
                    {exp.name}
                  </h2>
                  <div className="w-full h-px bg-onyx"></div>
                </div>
                
                <div className="flex flex-col md:flex-row h-[calc(100%-160px)]">
                  {/* OVERVIEW column */}
                  <div className="md:w-1/3 px-2 md:pr-4 md:pl-0">
                    <div className="text-lg font-mono text-onyx mb-2 font-bold">OVERVIEW:</div>
                    <p className="text-lg font-mono text-jet mb-3">
                      {exp.description}
                    </p>
                  </div>
                  
                  {/* Middle column - Position and Location */}
                  <div className="md:w-1/3 px-2 md:px-4">
                    {/* On mobile: 2-column layout for Position and Location */}
                    <div className="grid grid-cols-2 gap-2 md:block">
                      <div>
                        <div className="text-lg font-mono text-onyx mb-2 font-bold">POSITION:</div>
                        <p className="text-lg font-mono text-jet mb-2 md:mb-3">
                          {exp.position}
                        </p>
                      </div>
                      
                      <div>
                        <div className="text-lg font-mono text-onyx mb-2 font-bold">LOCATION:</div>
                        <p className="text-lg font-mono text-jet mb-2 md:mb-0">
                          {exp.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* SKILLS column */}
                  <div className="md:w-1/3 px-2 md:pl-4 md:pr-0">
                    <div className="text-lg font-mono text-onyx mb-2 font-bold">KEY SKILLS:</div>
                    <div className="flex flex-wrap gap-1">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 border border-onyx/40 text-base font-mono text-jet"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto text-right px-2">
                  <Link href={`/case/${exp.id}`}>
                    <span className="inline-flex items-center font-mono text-lg text-jet group">
                      <span>VIEW CASE</span>
                      <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </Link>
                </div>
              </OutlinedBox>
            </div>
          </div>
        </div>
      ))}

      <style jsx global>{`
        .halftone-text {
          font-weight: 900;
          font-size: 4rem;
          background: url('/halftone-dots.svg');
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Experience;
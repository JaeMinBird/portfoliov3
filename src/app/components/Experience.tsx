'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { experiences } from '../data/Experience';

interface ExperienceProps {
  id?: number; // Optional ID - if not provided, all experiences will be shown
}

const Experience: React.FC<ExperienceProps> = ({ id }) => {
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

  // Custom box with SectionWrapper-like outline
  const OutlinedBox = ({ 
    children, 
    className = ''
  }: { 
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={`relative ${className}`}>
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
        >
          <div className="w-full">
            <OutlinedBox className="w-full h-auto min-h-[300px]">
              <div className="mb-3 px-2">
                <h2 className="halftone-text mb-2 leading-tight">
                  {exp.name}
                </h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                {/* OVERVIEW column - increased width */}
                <div className="w-full md:w-2/5 px-2 md:px-4">
                  <div className="text-lg font-mono text-onyx mb-2 font-bold">OVERVIEW:</div>
                  <p className="text-lg font-mono text-jet mb-4">
                    {exp.description}
                  </p>
                </div>
                
                {/* Middle column - Position and Location */}
                <div className="w-full md:w-1/5 px-2 md:px-4">
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 gap-2">
                    <div className="w-full sm:w-1/2">
                      <div className="text-lg font-mono text-onyx mb-2 font-bold">POSITION:</div>
                      <p className="text-lg font-mono text-jet mb-4">
                        {exp.position}
                      </p>
                    </div>
                    
                    <div className="w-full sm:w-1/2 text-right sm:text-right md:text-left">
                      <div className="text-lg font-mono text-onyx mb-2 font-bold">LOCATION:</div>
                      <p className="text-lg font-mono text-jet mb-4">
                        {exp.location}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* SKILLS column */}
                <div className="w-full md:w-2/5 px-2 md:px-4">
                  <div className="text-lg font-mono text-onyx mb-2 font-bold">KEY SKILLS:</div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 border border-onyx/40 text-base font-mono text-jet mb-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Learn More link with reduced vertical space */}
              <div className="flex justify-end">
                <div className="px-4 pt-1">
                  <Link href={`/case/${exp.id}`}>
                    <span className="inline-flex items-center font-mono text-lg text-jet group">
                      <span>LEARN MORE</span>
                      <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </Link>
                </div>
              </div>
            </OutlinedBox>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
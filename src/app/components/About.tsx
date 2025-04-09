'use client';

import React from 'react';
import SectionWrapper from './SectionWrapper';
import AsciiModelViewer from './AsciiModelViewer';

export default function About() {
  return (
    <SectionWrapper className="p-0">
      <div className="flex flex-col items-start h-full bg-mustard rounded-2xl p-8 md:p-12 relative overflow-hidden min-h-[500px] md:min-h-0">
        {/* ASCII Model Background - Full Size */}
        <div className="absolute inset-0 w-full h-full overflow-hidden md:inset-auto md:bottom-1/4 md:left-6/8 md:w-[400px] md:h-[400px]">
          <AsciiModelViewer 
            modelPath="/models/rotary.glb"
            className="w-full h-[100%]" 
          />
        </div>
        
        {/* Content Layer - Higher z-index */}
        <div className="relative z-10 flex flex-col w-full h-full">
          {/* Top Section - Section Number */}
          <div className="w-full">
            <h2 className="text-[10vw] md:text-[8vw] font-sans text-jet leading-none">
              <span className="font-light text-white">06</span> | 06
            </h2>
          </div>
          
          {/* Bottom Section - Contact Text with increased spacing */}
          <div className="w-full mt-auto -mb-2">
            <h2 className="text-[15vw] md:text-[14vw] lg:text-[14vw] font-sans text-white leading-tight">
              contact
            </h2>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
} 
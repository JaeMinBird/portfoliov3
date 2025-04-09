'use client';

import React from 'react';
import SectionWrapper from './SectionWrapper';
import AsciiModelViewer from './AsciiModelViewer';
import { sectionHeaders, SectionHeaderInfo } from '../data/SecHeadInfo';

interface SectionHeaderProps {
  sectionId: number;
}

export default function SectionHeader({ sectionId = 5 }: SectionHeaderProps) {
  const sectionInfo: SectionHeaderInfo = sectionHeaders[sectionId] || sectionHeaders[0];
  
  // Format the section number with leading zeros
  const formattedId = String(sectionInfo.id).padStart(2, '0');
  const totalSections = String(sectionHeaders.length - 1).padStart(2, '0');
  
  return (
    <SectionWrapper className="p-0">
      <div 
        className="flex flex-col items-start h-full rounded-2xl p-8 md:p-12 relative overflow-hidden min-h-[500px] md:min-h-0"
        style={{ backgroundColor: sectionInfo.color }}
      >
        {/* ASCII Model Background - Full Size */}
        <div className="absolute inset-0 w-full h-full overflow-hidden md:inset-auto md:bottom-1/4 md:left-6/8 md:w-[400px] md:h-[400px]">
          <AsciiModelViewer 
            modelPath={sectionInfo.modelPath}
            className="w-full h-[100%]"
            asciiCharacters={sectionInfo.ascii.characters}
            asciiColor={sectionInfo.ascii.color}
            asciiInverted={sectionInfo.ascii.inverted}
            asciiResolution={sectionInfo.ascii.resolution}
            initialRotation={sectionInfo.modelRotation}
          />
        </div>
        
        {/* Content Layer - Higher z-index */}
        <div className="relative z-10 flex flex-col w-full h-full">
          {/* Top Section - Section Number */}
          <div className="w-full">
            <h2 className="text-[10vw] md:text-[8vw] font-sans text-jet leading-none">
              <span className="font-light text-white">{formattedId}</span> | {totalSections}
            </h2>
          </div>
          
          {/* Bottom Section - Section Title with increased spacing */}
          <div className="w-full mt-auto -mb-2">
            <h2 className="text-[15vw] md:text-[14vw] lg:text-[14vw] font-sans text-white leading-tight">
              {sectionInfo.title}
            </h2>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
} 
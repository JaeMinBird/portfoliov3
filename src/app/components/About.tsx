'use client';

import React from 'react';
import Image from 'next/image';
import SectionWrapper from './SectionWrapper';

export default function About() {
  return (
    <SectionWrapper className="p-0">
      <div className="flex flex-col items-start justify-between h-full bg-mustard rounded-2xl p-8 md:p-12 relative overflow-hidden min-h-[500px] md:min-h-[600px]">
        {/* Top Section - Section Number */}
        <div className="w-full">
          <h2 className="text-[10vw] md:text-[8vw] font-sans text-jet leading-none">
            <span className="font-light text-white">06</span>/06
          </h2>
        </div>
        
        {/* Phone Icon - Moved higher and more to the left */}
        <div className="absolute right-16 top-5">
          <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px]">
            <Image 
              src="/section icons/phone.svg"
              alt="Rotary Telephone" 
              width={350} 
              height={350}
              className="w-[35vw] h-auto max-w-[350px] object-contain drop-shadow-md"
              style={{ 
                filter: 'contrast(1.2) brightness(0.9)',
                mixBlendMode: 'multiply'
              }}
            />
          </div>
        </div>
        
        {/* Bottom Section - Contact Text */}
        <div className="w-full mt-auto">
          <h2 className="text-[15vw] md:text-[14vw] lg:text-[14vw] font-sans text-white leading-none">
            contact
          </h2>
        </div>
      </div>
    </SectionWrapper>
  );
} 
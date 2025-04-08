// components/Hero.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative py-4 px-0 sm:px-2">
      {/* Mobile layout */}
      <div className="md:hidden">
        {/* Increased top padding for mobile */}
        <div className="mt-8"></div>
        
        {/* First line - centered on mobile allowing natural wrapping */}
        <div className="mb-0 text-center">
          <h1 className="text-[5.5rem] leading-none font-sans text-jet">build faster</h1>
        </div>
        
        {/* Second line - centered on mobile allowing natural wrapping */}
        <div className="mb-4 text-center">
          <h1 className="text-[5.5rem] leading-none font-sans text-jet">get better</h1>
        </div>
        
        {/* Motto text below big text on mobile */}
        <div className="mt-4 text-center">
          <p className="font-mono text-2xl text-jet">
            my motto on <br />
            <strong>development</strong><br />
            and <strong>design</strong>
          </p>

          {/* Learn more with block highlight animation */}
          <div className="mt-4 mb-8 text-center">
            <Link href="#learn-more">
              <div className="inline-block relative group">
                <span className="font-mono text-2xl text-jet relative z-10 px-2">
                  learn more ↓
                </span>
                <span className="absolute left-0 bottom-0 w-0 h-full bg-[#ffe042] group-hover:w-full transition-all duration-300 z-0"></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Desktop layout - with viewport responsive sizing */}
      <div className="hidden md:block">
        {/* First line - With better spacing for cat image */}
        <div className="mb-2 flex items-center">
          <div className="w-3/4">
            <h1 className="text-[9vw] leading-none font-sans text-jet whitespace-nowrap">build faster</h1>
          </div>
          
          {/* Cat image centered in its allocated space */}
          <div className="w-1/3 flex justify-center items-center">
            <Image src="/cat.png" alt="Cat" width={200} height={200} className="w-[22vw] h-auto max-w-[220px]" />
          </div>
        </div>
        
        {/* Second line with paragraph centered */}
        <div className="flex flex-row items-center justify-between mt-2">
          {/* Motto text centered */}
          <div className="w-1/3 mb-0 flex flex-col items-center">
            <p className="font-mono text-[2.2vw] max-text-3xl text-jet text-center">
              my motto on <br />
              <strong>development</strong><br />
              and <strong>design</strong>
            </p>

            {/* Learn more with block highlight animation */}
            <div className="mt-4">
              <Link href="#learn-more">
                <div className="inline-block relative group">
                  <span className="font-mono text-[2.2vw] max-text-3xl text-jet relative z-10 px-2">
                    learn more ↓
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-full bg-[#ffe042] group-hover:w-full transition-all duration-300 z-0"></span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Second line - Right aligned */}
          <div className="w-2/3 flex justify-end">
            <h1 className="text-[9vw] leading-none font-sans text-jet whitespace-nowrap">get better</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

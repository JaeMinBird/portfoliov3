// components/Hero.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative py-0 px-0 sm:px-2 pt-3">
      {/* Mobile layout */}
      <div className="md:hidden">
        {/* Top gap to match bottom spacing */}
        <div className="mt-10"></div>
        
        {/* First line - centered on mobile */}
        <div className="mb-2 text-center">
          <h1 className="text-[5rem] leading-none font-sans text-jet">build faster</h1>
        </div>
        
        {/* Second line - centered on mobile */}
        <div className="mb-4 text-center">
          <h1 className="text-[5rem] leading-none font-sans text-jet">get better</h1>
        </div>
        
        {/* Motto text below big text on mobile */}
        <div className="mt-4 text-center">
          <p className="font-mono text-xl text-jet">
            my motto on <br />
            <strong>development</strong><br />
            and <strong>design</strong>
          </p>

          {/* Learn more with block highlight animation */}
          <div className="mt-4 mb-10 text-center">
            <Link href="#learn-more">
              <div className="inline-block relative group">
                <span className="font-mono text-xl text-jet relative z-10 px-2">
                  learn more ↓
                </span>
                <span className="absolute left-0 bottom-0 w-0 h-full bg-[#ffe042] group-hover:w-full transition-all duration-300 z-0"></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Desktop layout - preserved from original */}
      <div className="hidden md:block">
        {/* First line - Left aligned with reduced space */}
        <div className="mb-0 flex items-center">
          <h1 className="text-[10rem] lg:text-[13rem] leading-none font-sans text-jet">build faster</h1>
          
          {/* Cat image aligned with text */}
          <div className="ml-20">
            <Image src="/cat.png" alt="Cat" width={200} height={200} />
          </div>
        </div>
        
        {/* Second line with paragraph centered */}
        <div className="flex flex-row items-center justify-between">
          {/* Motto text centered */}
          <div className="w-1/3 mb-1 md:mb-0 flex flex-col items-center">
            <p className="font-mono text-3xl lg:text-4xl text-jet text-center">
              my motto on <br />
              <strong>development</strong><br />
              and <strong>design</strong>
            </p>

            {/* Learn more with block highlight animation */}
            <div className="mt-4">
              <Link href="#learn-more">
                <div className="inline-block relative group">
                  <span className="font-mono text-3xl lg:text-4xl text-jet relative z-10 px-2">
                    learn more ↓
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-full bg-[#ffe042] group-hover:w-full transition-all duration-300 z-0"></span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Second line - Right aligned */}
          <div className="w-2/3 flex justify-end">
            <h1 className="text-[10rem] lg:text-[13rem] leading-none font-sans text-jet whitespace-nowrap">get better</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

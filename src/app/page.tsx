'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import HalftoneCursor from "./components/HalftoneCursor";
import EmoticonDemo from "./components/EmoticonDemo";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <HalftoneCursor />
      
      <div className="min-h-screen flex flex-col bg-lemon-chiffon">
        {/* Navigation */}
        <header className="px-6 py-6 md:px-16 md:py-8">
          <nav className="flex justify-between items-center">
            <div className="text-3xl font-bold font-[family-name:var(--font-black-han-sans)]" style={{ color: 'var(--jet)' }}>
              {/* Logo cat.png here */}
              <Image 
                src="/cat.png" 
                alt="Cat Logo" 
                width={60} 
                height={60} 
                priority
              />
            </div>
            <div className="hidden md:flex gap-8 text-base">
              {['What We Do', 'Work', 'Method', 'Learn', 'About', 'Clients'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="hover:underline" 
                  style={{ color: 'var(--onyx)' }}
                >
                  {item}
                </a>
              ))}
            </div>
            <a 
              href="#contact" 
              className="text-base px-4 py-2 border-b-2" 
              style={{ borderColor: 'var(--mustard)', color: 'var(--jet)' }}
            >
              Contact
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col px-6 md:px-16 mt-16 md:mt-24">
          <div className="flex flex-col md:flex-row">
            {/* Left column with description */}
            <div className="md:w-1/3 mb-16 md:mb-0">
              {/* Replace ASCII Cat with cat.png image */}
              <div className="mb-8">
                <Image 
                  src="/cat.png" 
                  alt="Cat Logo" 
                  width={120} 
                  height={120} 
                  priority
                  className="text-mustard"
                />
              </div>
              <p className="text-base md:text-lg font-[family-name:var(--font-ibm-plex-mono)]" style={{ color: 'var(--onyx)' }}>
                Welcome to my portfolio, showcasing expertise in design, 
                development, and creative problem-solving in the digital space.
              </p>
            </div>

            {/* Right column with headline */}
            <div className="md:w-2/3 md:pl-12">
              <h1 className="text-5xl md:text-8xl font-[family-name:var(--font-black-han-sans)] leading-tight" style={{ color: 'var(--jet)' }}>
                IDEAS WORTH
                <br />
                EXPLORING
              </h1>
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="flex justify-between mt-32 mb-16">
            <a 
              href="#learn" 
              className="text-base md:text-lg border-b-2 pb-1" 
              style={{ borderColor: 'var(--mustard)', color: 'var(--jet)' }}
            >
              Learn more about my work
            </a>
            <div className="text-base md:text-lg" style={{ color: 'var(--onyx)' }}>
              (SCROLL)
            </div>
          </div>
        </main>

        {/* Optional: Featured work section */}
        <section className="p-6 md:p-16" style={{ background: 'var(--lemon-chiffon)' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-black-han-sans)] mb-12" style={{ color: 'var(--jet)' }}>
              Featured Work
            </h2>
            <EmoticonDemo />
          </div>
        </section>
      </div>
    </>
  );
}

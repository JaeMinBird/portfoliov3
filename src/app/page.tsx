'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import HalftoneCursor from "./components/HalftoneCursor";
import EmoticonDemo from "./components/EmoticonDemo";
import Nav from "./components/Nav";
import NavAlt from "./components/NavAlt";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [navStyle, setNavStyle] = useState<'minimal' | 'sidebar'>('sidebar'); // 'minimal' or 'sidebar'
  
  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const marginClass = navStyle === 'minimal' ? 'ml-16' : 'ml-[125px]';

  return (
    <>
      {isLoading && <Loader />}
      <HalftoneCursor />
      
      {/* Navigation toggle button */}
      <button 
        onClick={() => setNavStyle(navStyle === 'minimal' ? 'sidebar' : 'minimal')}
        className="fixed right-6 top-6 z-50 bg-jet text-lemon-chiffon px-4 py-2 rounded-full text-sm font-[family-name:var(--font-ibm-plex-mono)]"
      >
        Toggle Nav
      </button>
      
      {navStyle === 'minimal' ? (
        <Nav sections={sections} />
      ) : (
        <NavAlt sections={sections} />
      )}
      
      <div className="min-h-screen flex flex-col bg-lemon-chiffon">
        {/* Header */}
        <header className={`px-6 py-6 md:px-16 md:py-8 ${marginClass}`}>
          <nav className="flex justify-between items-center">
            <div className="text-3xl font-bold font-[family-name:var(--font-black-han-sans)]" style={{ color: 'var(--jet)' }}>
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

        {/* Hero Section */}
        <section id="hero" className={`flex-1 flex flex-col px-6 md:px-16 mt-16 md:mt-24 min-h-screen ${marginClass}`}>
          <div className="flex flex-col md:flex-row">
            {/* Left column with description */}
            <div className="md:w-1/3 mb-16 md:mb-0">
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
              href="#about" 
              className="text-base md:text-lg border-b-2 pb-1" 
              style={{ borderColor: 'var(--mustard)', color: 'var(--jet)' }}
            >
              Learn more about my work
            </a>
            <div className="text-base md:text-lg" style={{ color: 'var(--onyx)' }}>
              (SCROLL)
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`p-6 md:p-16 min-h-screen flex items-center ${marginClass}`} style={{ background: 'var(--cosmic-latte)' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-black-han-sans)] mb-12" style={{ color: 'var(--jet)' }}>
              About
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg mb-6" style={{ color: 'var(--onyx)' }}>
                  I'm a digital designer and developer with a passion for creating beautiful, functional digital experiences. 
                  With over 5 years of experience in the industry, I've worked with clients from various sectors including 
                  technology, education, and e-commerce.
                </p>
                <p className="text-lg" style={{ color: 'var(--onyx)' }}>
                  My approach combines creative design thinking with technical expertise to create solutions that not only 
                  look good but also deliver results.
                </p>
              </div>
              <div className="bg-mustard rounded-lg p-8 flex items-center justify-center">
                <div className="text-4xl font-[family-name:var(--font-black-han-sans)]" style={{ color: 'var(--jet)' }}>
                  RN
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className={`p-6 md:p-16 min-h-screen flex items-center ${marginClass}`} style={{ background: 'var(--lemon-chiffon)' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-black-han-sans)] mb-12" style={{ color: 'var(--jet)' }}>
              Work
            </h2>
            <EmoticonDemo />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={`p-6 md:p-16 min-h-screen flex items-center ${marginClass}`} style={{ background: 'var(--cosmic-latte)' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-black-han-sans)] mb-12" style={{ color: 'var(--jet)' }}>
              Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Web Design", description: "Beautiful, responsive websites tailored to your brand." },
                { title: "Development", description: "Clean, efficient code that brings your designs to life." },
                { title: "UI/UX Design", description: "User-centered interfaces for the best digital experience." }
              ].map((service, index) => (
                <div key={index} className="p-6 rounded-lg bg-lemon-chiffon">
                  <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-black-han-sans)]" style={{ color: 'var(--jet)' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: 'var(--onyx)' }}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`p-6 md:p-16 min-h-screen flex items-center ${marginClass}`} style={{ background: 'var(--lemon-chiffon)' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-black-han-sans)] mb-12" style={{ color: 'var(--jet)' }}>
              Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg mb-6" style={{ color: 'var(--onyx)' }}>
                  Interested in working together? Let's talk about your project.
                </p>
                <div className="flex flex-col gap-4">
                  <a 
                    href="mailto:hello@example.com" 
                    className="text-lg border-b-2 pb-1 inline-block" 
                    style={{ borderColor: 'var(--mustard)', color: 'var(--jet)' }}
                  >
                    hello@example.com
                  </a>
                  <a 
                    href="tel:+1234567890" 
                    className="text-lg border-b-2 pb-1 inline-block" 
                    style={{ borderColor: 'var(--mustard)', color: 'var(--jet)' }}
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="bg-mustard rounded-lg p-8 flex items-center justify-center">
                <div className="text-4xl font-[family-name:var(--font-black-han-sans)]" style={{ color: 'var(--jet)' }}>
                  Let's Chat
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface NavProps {
  sections: {
    id: string;
    label: string;
  }[];
}

export default function Nav({ sections }: NavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <nav className="fixed left-0 top-0 w-16 h-full flex flex-col items-center justify-center z-50 bg-lemon-chiffon">
      {/* Animated scroll tracker line */}
      <div className="absolute left-[50%] top-4 bottom-4 w-[2px] bg-onyx bg-opacity-10">
        <motion.div 
          className="absolute top-0 w-full bg-mustard" 
          style={{ height: width }}
        />
      </div>
      
      {/* Navigation items */}
      <div className="flex flex-col gap-8 items-center z-10">
        {sections.map(({ id, label }) => (
          <Link 
            key={id}
            href={`#${id}`}
            className="relative group"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 
                ${activeSection === id ? 'bg-mustard' : 'bg-cosmic-latte hover:bg-mustard hover:bg-opacity-50'}`}
            >
              <span className="text-sm font-bold text-jet">{label.slice(0, 2)}</span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-jet text-lemon-chiffon py-1 px-3 rounded 
                          opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {label}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
} 
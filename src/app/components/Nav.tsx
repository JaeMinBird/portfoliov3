'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface NavProps {
  sections: {
    id: string;
    label: string;
  }[];
}

export default function Nav({ sections }: NavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const navRef = useRef<HTMLDivElement>(null);
  const progressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (progressTimeoutRef.current) return;
      
      progressTimeoutRef.current = setTimeout(() => {
        const sectionElements = sections.map(section => ({
          id: section.id,
          element: document.getElementById(section.id),
        }));
        
        // Find the active section based on viewport middle point
        const viewportMiddle = window.innerHeight / 2;
        
        // Check sections from bottom to top for better UX when scrolling up
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const { id, element } = sectionElements[i];
          if (!element) continue;
          
          const rect = element.getBoundingClientRect();
          if (rect.top <= viewportMiddle) {
            if (activeSection !== id) {
              setActiveSection(id);
            }
            break;
          }
        }
        
        progressTimeoutRef.current = null;
      }, 50);
    };
    
    // Call once on mount
    handleScroll();
    
    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
      }
    };
  }, [sections, activeSection]);

  return (
    <nav ref={navRef} className="fixed left-0 top-0 w-16 h-full flex flex-col items-center justify-center z-50 bg-lemon-chiffon">
      {/* Navigation items with horizontal accent lines */}
      <div className="w-full h-full flex flex-col justify-center">
        <div className="flex flex-col gap-10 items-start justify-center px-2">
          {sections.map((section) => (
            <div key={section.id} className="relative w-full">
              <Link 
                href={`#${section.id}`}
                className="flex items-center group"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {/* Active indicator dot */}
                <motion.div
                  className={`absolute left-0 w-2 h-2 rounded-full ${activeSection === section.id ? 'bg-mustard' : 'bg-transparent'}`}
                  initial={false}
                  animate={{ 
                    opacity: activeSection === section.id ? 1 : 0,
                    scale: activeSection === section.id ? 1 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Label */}
                <div className="ml-4 text-sm font-medium text-jet">
                  {section.label}
                </div>
                
                {/* Horizontal accent line */}
                <motion.div 
                  className={`absolute right-0 h-[2px] bg-mustard`}
                  style={{ 
                    left: activeSection === section.id ? '0.75rem' : '100%',
                    display: 'block',
                    top: 'calc(50% - 1px)'
                  }}
                  initial={false}
                  animate={{ 
                    left: activeSection === section.id ? '0.75rem' : '100%',
                    width: activeSection === section.id ? 'calc(100% - 0.75rem)' : '0%',
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
} 
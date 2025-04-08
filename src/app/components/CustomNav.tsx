'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface CustomNavProps {
  sections: {
    id: string;
    label: string;
  }[];
}

export default function CustomNav({ sections }: CustomNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const { scrollYProgress } = useScroll();
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});
  
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));
      
      // Calculate current active section
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        // Consider a section "active" if it takes up a significant portion of the viewport
        // This helps prevent multiple sections being detected as active
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.2) {
          setActiveSection(id);
          break;
        }
      }
      
      // Calculate progress for each section
      const viewportHeight = window.innerHeight;
      const progress: Record<string, number> = {};
      
      sectionElements.forEach(({ id, element }) => {
        if (!element) {
          progress[id] = 0;
          return;
        }
        
        const rect = element.getBoundingClientRect();
        
        // Calculate more precise progress
        if (rect.top >= viewportHeight) {
          // Section is below viewport
          progress[id] = 0;
        } else if (rect.bottom <= 0) {
          // Section is above viewport (completely scrolled past)
          progress[id] = 1; 
        } else {
          // Section is partially in viewport
          // Calculate what percentage of the section has moved past the top of the viewport
          const totalHeight = element.offsetHeight;
          const visibleAmount = Math.min(rect.bottom, viewportHeight);
          const hiddenAmount = Math.max(0, -rect.top);
          const percentScrolled = hiddenAmount / totalHeight;
          
          progress[id] = Math.min(Math.max(percentScrolled, 0), 1);
        }
      });
      
      setSectionProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <nav className="fixed left-6 top-0 h-screen flex flex-col justify-center items-start z-50">
      {/* Cat logo at the top */}
      <div className="absolute top-8 left-0">
        <Image 
          src="/cat.png" 
          alt="Cat Logo" 
          width={60} 
          height={60} 
          priority
        />
      </div>
      
      {/* Navigation items */}
      <div className="flex flex-col gap-8 relative">
        {/* Animated circle now positioned at the left of each item instead of above them */}
        <motion.div 
          className="absolute w-3 h-3 bg-mustard rounded-full left-0 top-[9px]"
          animate={{ 
            y: sections.findIndex(section => section.id === activeSection) * 56 // Matches the gap between links
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          layoutId="navDot"
        />
        
        {sections.map((section, index) => (
          <Link 
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative group flex items-center"
          >
            {/* Empty dot placeholder (since we have the animated one) */}
            <div className="w-3 h-3 rounded-full mr-4 border border-onyx border-opacity-30" />
            
            <div className="flex flex-col">
              {/* Section number and label */}
              <div className="flex items-center">
                <span className="text-sm font-mono mr-2 text-onyx">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-sm font-[family-name:var(--font-ibm-plex-mono)] text-jet">
                  {section.label}
                </span>
              </div>
              
              {/* Progress bar - reduced width to match the longest word */}
              <div className="w-24 h-1 bg-onyx bg-opacity-10 mt-1">
                <motion.div 
                  className="h-full bg-mustard origin-left"
                  style={{ 
                    scaleX: sectionProgress[section.id] || 0 
                  }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';

interface NavAltProps {
  sections: {
    id: string;
    label: string;
  }[];
}

export default function NavAlt({ sections }: NavAltProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const { scrollYProgress } = useScroll();
  
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
    <nav className="fixed left-0 top-0 h-screen w-[125px] bg-jet text-lemon-chiffon flex flex-col justify-center items-center z-50">
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="text-4xl font-[family-name:var(--font-black-han-sans)]">RN</div>
      </div>
      
      <div className="w-full">
        {sections.map((section, index) => (
          <Link 
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative block"
          >
            <div className={`
              py-4 px-6 flex items-center justify-center transition-all duration-300
              ${activeSection === section.id ? 'bg-mustard text-jet' : 'hover:bg-onyx'}
            `}>
              <div className="absolute left-0 flex items-center h-full">
                <div className="text-sm font-mono mr-2">{String(index + 1).padStart(2, '0')}</div>
              </div>
              
              <span className="text-sm font-[family-name:var(--font-ibm-plex-mono)]">
                {section.label}
              </span>

              {activeSection === section.id && (
                <motion.div 
                  className="absolute right-4 w-2 h-2 rounded-full"
                  layoutId="navIndicator"
                  style={{ background: 'var(--jet)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Scroll progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-1 bg-onyx">
        <motion.div 
          className="h-full bg-mustard origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </nav>
  );
} 
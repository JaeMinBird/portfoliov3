'use client';

import { useEffect, useState } from 'react';
import SectionWrapper from './components/SectionWrapper';
import Hero from './components/Hero';
import Loader from './components/Loader';
import SectionHeader from './components/SectionHeader';

export default function Home() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Increased dummy load time to 2.5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div>
        <SectionWrapper>
          <Hero />
        </SectionWrapper>
        
        <div className="mt-10 md:mt-16">
          <SectionHeader sectionId={2} />
        </div>
        
        <div className="mt-10 md:mt-16">
          <SectionHeader sectionId={3} />
        </div>

        <div className="mt-10 md:mt-16">
          <SectionHeader sectionId={5} />
        </div>

        <SectionWrapper>
          <Hero />
        </SectionWrapper>
      </div>
    </>
  );
}

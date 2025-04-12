'use client';

import { useEffect, useState } from 'react';
import SectionWrapper from './components/SectionWrapper';
import Hero from './components/Hero';
import Loader from './components/Loader';
import SectionHeader from './components/SectionHeader';
import Experience from './components/Experience';


export default function Home() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Increased dummy load time to 2.5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  // Experience section IDs to display
  const experienceIds = [1, 2];

  return (
    <>
      {loading && <Loader />}
      <div>
        <SectionWrapper>
          <Hero />
        </SectionWrapper>
        
        <div className="mt-10 md:mt-16">
          <SectionHeader sectionId={1} />
        </div>

        <div className="mt-10 md:mt-16">
          <SectionHeader sectionId={2} />
        </div>

        {/* Display individual experiences */}
        {experienceIds.map(expId => (
          <Experience key={expId} id={expId} />
        ))}
        
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

'use client';

import { useEffect, useState } from 'react';
import SectionWrapper from './components/SectionWrapper';
import Hero from './components/Hero';
import HalftoneCursor from './components/HalftoneCursor';
import Loader from './components/Loader';

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
      <HalftoneCursor />
      <div>
        <SectionWrapper>
          <Hero />
        </SectionWrapper>
      </div>
    </>
  );
}

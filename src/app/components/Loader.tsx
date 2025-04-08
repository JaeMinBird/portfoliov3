'use client';

import React, { useEffect, useState } from 'react';

const asciiLines = [
  '         ░                                         ',
  '         ░░▒▒                                      ',
  '         ░░▒▒░                                     ',
  '          ░▒▒░       ░░░             ░             ',
  '           ░░         ░░              ░            ',
  '           ▒▒░░░     ░░░▒           ░░░            ',
  '           ░▒▒░▒░   ░░▒▒▒░░  ░░░   ▒▒░▒            ',
  '         ░░░░░░░░   ░░░░░░░░░░░░░░░▒░░░            ',
  '            ░░░░░   ░░░ ░░░░░░░░░░░░░ ░            ',
  '            ░░░░░░░ ░░░░░░░░░░░░░░░░░░░            ',
  '             ▒░▒▒▒▒░▒░░▒▒░░▒░░▒▒░░▒▒▒░▒░           ',
  '            ░▒░▒▒▒▒░░░▒▒▒░▒▒  ▒▒▒▒▒ ░░▒▒░          ',
  '             ░░░░░░░░░░░░░░░░░░░░░░░░░░░░          ',
  '              ░░░░░░░░░░░░░░░░░░░░░░░░░░           ',
  '            ░░░▒▒▒▒▒▒░▒▒▒░▒▒▒▒▒▒░▒▒▒▒░▒░           ',
  '            ░▒░▒▒▒▒▒▒░▒▒▒░▒▒▒▒▒▒░▒▒▒▒░░            ',
  '           ░▒▒░▒▒▒▒▒▒░░▒▒░░▒▒▒▒▒░░▒▒▒░             ',
  '         ░░░░░░░░░░░░░░░░░░░░░░░░░░░░              ',
  '      ░░▒▒░▒▒▒░▒▒▒▒▒▒░░▒▒░▒▒▒▒▒▒░░▒▒▒░             ',
  '       ░▒▒░▒▒▒░▒▒▒▒▒▒░░▒▒░░▒▒▒▒▒░░▒▒▒░░            ',
  '      ▒▒▒▒░▒▒▒░▒▒▒▒▒▒░░▒▒░░▒▒▒▒▒░░▒▒▒░▒▒           ',
  '      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░          ',
  '     ▒▒░░░░▒▒░░░▒▒▒▒░░░▒▒░░▒▒▒▒▒░░▒▒▒░▒▒▒░         ',
  '     ▒▒▒▒▒░▒▒░ ░▒▒▒▒▒░▒▒▒░▒▒▒▒▒▒░░▒▒▒░▒▒▒▒░        ',
  '   ░▒▒▒▒▒▒░░   ░▒▒▒▒▒░░▒▒░░▒▒░░   ░▒▒░▒▒▒▒▒░       ',
  '   ░░░░░░░      ░░░░░░░░            ░░░░░░░░░      ',
  '   ░░░░░░       ░░▒░░░░░░             ░░░░░░░░░    ',
  ' ░░░▒▒▒▒░        ▒▒▒▒░░▒░              ▒▒▒▒░░▒░░░░ ',
  ' ░░░▒▒▒▒░        ▒▒▒▒░░▒▒               ░▒▒░░▒▒▒░░░',
  ' ░░░░░░░        ░░░░░░░░░░░               ░░░░░░░░░',
  '  ░░░░░         ░░░░░░░░░░                ░░░░░░░░░',
  ' ░              ░▒▒▒░░░                    ░  ░░░  ',
  '                                                   ',
];

const Loader: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  
  useEffect(() => {
    const totalLines = asciiLines.length;
    const loadTime = 1500; // 1.5 seconds
    const lineInterval = loadTime / totalLines;
    const percentageInterval = loadTime / 100;
    
    // Line animation
    const lineTimer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev < totalLines) {
          return prev + 1;
        }
        clearInterval(lineTimer);
        return prev;
      });
    }, lineInterval);
    
    // Percentage animation
    const percentTimer = setInterval(() => {
      setPercentage(prev => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(percentTimer);
        return 100;
      });
    }, percentageInterval);
    
    // Complete animation
    setTimeout(() => {
      setIsComplete(true);
    }, loadTime);
    
    return () => {
      clearInterval(lineTimer);
      clearInterval(percentTimer);
    };
  }, []);
  
  if (isComplete) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cornsilk z-50">
      <div className="flex flex-col items-center max-w-3xl w-full px-4 py-10">
        <div className="h-[300px] w-full flex items-start justify-center relative mb-8">
          <pre 
            className="text-brunswick-green select-none absolute"
            style={{
              fontFamily: 'monospace',
              fontSize: '10px', 
              lineHeight: '1.2',
              letterSpacing: '0.1em',
              whiteSpace: 'pre',
              display: 'block',
              height: 'auto',
              width: 'auto',
              transform: 'scale(1)',
              transformOrigin: 'center center'
            }}
          >
            {asciiLines.slice(0, visibleLines).join('\n')}
          </pre>
        </div>
        
        <div className="text-center text-3xl font-bold text-coffee font-mono mb-4">
          loading
        </div>
        
        <div className="text-center text-5xl font-bold text-coffee font-mono">
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default Loader;
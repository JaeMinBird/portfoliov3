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
  const [catComplete, setCatComplete] = useState<boolean>(false);
  
  useEffect(() => {
    const totalLines = asciiLines.length;
    const loadTime = 1500;
    const lineInterval = loadTime / totalLines;
    const percentageInterval = loadTime / 100;
    
    const lineTimer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev < totalLines) {
          return prev + 1;
        }
        clearInterval(lineTimer);
        setCatComplete(true);
        return prev;
      });
    }, lineInterval);
    
    const percentTimer = setInterval(() => {
      setPercentage(prev => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(percentTimer);
        return 100;
      });
    }, percentageInterval);
    
    return () => {
      clearInterval(lineTimer);
      clearInterval(percentTimer);
    };
  }, []);
  
  useEffect(() => {
    if (catComplete) {
      const pauseTimer = setTimeout(() => {
        setIsComplete(true);
      }, 200);
      
      return () => clearTimeout(pauseTimer);
    }
  }, [catComplete]);
  
  if (isComplete) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-lemon-chiffon z-50">
      <div className="flex flex-col items-center w-full px-4 py-10">
        <div className="h-[300px] flex items-center justify-center">
          <pre 
            className="text-jet select-none"
            style={{
              fontFamily: 'monospace',
              fontSize: '10px', 
              lineHeight: '1', 
              whiteSpace: 'pre',
              width: 'fit-content'
            }}
          >
            {asciiLines.slice(0, visibleLines).join('\n')}
          </pre>
        </div>
        
        <div className="mt-10">
          <div className="text-center text-3xl font-bold text-jet font-mono mb-4">
            loading
          </div>
          
          <div className="text-center text-5xl font-bold text-onyx font-mono">
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
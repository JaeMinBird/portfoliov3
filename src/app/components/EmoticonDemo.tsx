import React from 'react';
import Emoticon from './Emoticon';
import emoticons from '../utils/emoticons';

/**
 * Demo component that showcases available emoticons with JetBrains Mono font
 */
const EmoticonDemo: React.FC = () => {
  const categories = {
    'Cats': ['cat', 'kitty', 'nyanCat', 'happyCat', 'surprisedCat'],
    'Faces': ['smile', 'cool', 'shrug', 'tableFlip', 'happy', 'love'],
    'Tech': ['computer', 'robot', 'terminal', 'cmd'],
    'Symbols': ['skull', 'star', 'heart', 'note', 'lighting'],
    'Brand': ['logo', 'cursor']
  };
  
  return (
    <div className="bg-cosmic-latte p-6 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-[family-name:var(--font-black-han-sans)] mb-6 text-jet">
        Emoticon Library
      </h2>
      
      <div className="space-y-8">
        {Object.entries(categories).map(([category, emojiKeys]) => (
          <div key={category}>
            <h3 className="text-xl font-[family-name:var(--font-black-han-sans)] mb-4 text-onyx">
              {category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {emojiKeys.map(key => (
                <div key={key} className="p-3 bg-lemon-chiffon rounded border border-mustard">
                  <Emoticon size="lg" className="text-jet block mb-2">
                    {emoticons[key as keyof typeof emoticons]}
                  </Emoticon>
                  <code className="text-xs text-onyx font-[family-name:var(--font-ibm-plex-mono)]">
                    {key}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-mustard">
        <p className="text-sm text-onyx font-[family-name:var(--font-ibm-plex-mono)]">
          All emoticons are rendered using JetBrains Mono font for optimal character support.
        </p>
      </div>
    </div>
  );
};

export default EmoticonDemo; 
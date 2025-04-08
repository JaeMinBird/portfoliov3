import EmoticonDemo from '../components/EmoticonDemo';

export default function EmoticonPage() {
  return (
    <div className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-black-han-sans)] text-jet mb-8">
          EMOTICON LIBRARY
        </h1>
        
        <p className="text-onyx mb-12 max-w-3xl font-[family-name:var(--font-ibm-plex-mono)]">
          This page demonstrates the emoticon collection rendered with JetBrains Mono font, which provides better support for special characters and symbols used in ASCII art and emoticons.
        </p>
        
        <EmoticonDemo />
        
        <div className="mt-16 text-center">
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-mustard text-jet font-[family-name:var(--font-ibm-plex-mono)] hover:bg-onyx hover:text-lemon-chiffon transition-colors duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 
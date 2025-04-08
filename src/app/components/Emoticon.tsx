import React from 'react';

interface EmoticonProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

/**
 * Emoticon component for displaying ASCII emoticons with proper font support
 * Uses JetBrains Mono for better symbol/character support
 */
const Emoticon: React.FC<EmoticonProps> = ({ 
  children, 
  className = '', 
  size = 'md' 
}) => {
  return (
    <span 
      className={`font-[family-name:var(--font-jetbrains-mono)] ${sizeMap[size]} ${className}`}
      style={{ 
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap'
      }}
    >
      {children}
    </span>
  );
};

export default Emoticon; 
'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-2 group ${className}`}>
      {showText && (
        <span className={`${textSizes[size]} font-bold text-white group-hover:text-red-400 transition-colors`} style={{ fontFamily: 'var(--font-modnument)' }}>
          Oct4crypt
        </span>
      )}
    </div>
  );
}

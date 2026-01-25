"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { width: 100, height: 32 },
  md: { width: 150, height: 50 },
  lg: { width: 180, height: 60 },
  xl: { width: 240, height: 80 },
  xxl: { width: 400, height: 133 },
};

export function Logo({ size = 'md', animated = true, className }: LogoProps) {
  const dimensions = sizeMap[size];
  const isHeroSize = size === 'xxl';

  return (
    <div
      className={cn(
        'inline-flex items-center transition-transform',
        !isHeroSize && 'cursor-pointer hover:scale-105',
        animated && 'animate-fade-in',
        isHeroSize && 'relative',
        className
      )}
    >
      <Image
        src="/logo/logo.svg"
        alt="AutomatikAI"
        width={dimensions.width}
        height={dimensions.height}
        priority
        style={{ height: dimensions.height }}
        className="object-contain w-auto"
      />
      {isHeroSize && (
        <>
          {/* Sparkle animations - more visible */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-primary rounded-full animate-ping shadow-lg shadow-primary" style={{ animationDelay: '0s', animationDuration: '2s' }} />
            <div className="absolute top-[45%] right-[25%] w-3 h-3 bg-accent rounded-full animate-ping shadow-lg shadow-accent" style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
            <div className="absolute bottom-[35%] left-[35%] w-3 h-3 bg-primary rounded-full animate-ping shadow-lg shadow-primary" style={{ animationDelay: '1s', animationDuration: '2s' }} />
            <div className="absolute top-[55%] right-[40%] w-3 h-3 bg-accent rounded-full animate-ping shadow-lg shadow-accent" style={{ animationDelay: '1.5s', animationDuration: '2s' }} />
            <div className="absolute top-[40%] left-[50%] w-2 h-2 bg-primary rounded-full animate-ping shadow-lg shadow-primary" style={{ animationDelay: '0.75s', animationDuration: '2s' }} />
            <div className="absolute bottom-[45%] right-[35%] w-2 h-2 bg-primary rounded-full animate-ping shadow-lg shadow-primary" style={{ animationDelay: '1.25s', animationDuration: '2s' }} />
          </div>
        </>
      )}
    </div>
  );
}

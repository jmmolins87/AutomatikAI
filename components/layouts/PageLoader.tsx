"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loader } from '@/components/ui/loader';

interface PageLoaderProps {
  children: React.ReactNode;
}

export function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch by only showing loader until loaded
  if (!isMounted || isLoading) {
    return <Loader isLoading={true} />;
  }

  return children;
}

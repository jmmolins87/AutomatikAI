"use client";

import { motion } from 'framer-motion';
import { Logo } from '@/components/branding/Logo';

interface LoaderProps {
  isLoading: boolean;
}

export function Loader({ isLoading }: LoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Logo size="xxl" />
        </motion.div>

        <div className="flex gap-2">
          <motion.div
            className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-chart-2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0,
            }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-chart-2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-chart-2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

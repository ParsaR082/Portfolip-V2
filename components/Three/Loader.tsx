'use client';

import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface LoaderProps {
  message?: string;
}

// Simple 3D Loader component for use inside Canvas
export const Loader3D = ({ message = 'Loading 3D Scene...' }: LoaderProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

// HTML Loader component for use outside Canvas
export const HTMLLoader = ({ message = 'Loading 3D Scene...' }: LoaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-center z-10"
    >
      {/* Loading Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-border rounded-full animate-spin border-t-primary"></div>
      </div>

      {/* Loading Message */}
      <div className="space-y-2">
        <p className="text-foreground font-medium">{message}</p>
        <div className="w-48 h-2 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const ErrorFallback = ({ error, retry }: { error: Error; retry?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-center z-10"
    >
      <div className="max-w-md p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border">
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">3D Scene Error</h3>
          <p className="text-foreground/70 text-sm">
            Failed to load 3D content. This might be due to WebGL compatibility or network issues.
          </p>
          <details className="text-xs text-foreground/50 mt-2">
            <summary className="cursor-pointer hover:text-foreground/70">Error Details</summary>
            <p className="mt-1 font-mono bg-background/50 p-2 rounded border">
              {error.message}
            </p>
          </details>
        </div>

        {retry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={retry}
            className="btn-primary"
          >
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export const MinimalLoader = () => {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-border rounded-full animate-spin border-t-primary"></div>
      </div>
    </Html>
  );
};

// Fallback component for when WebGL is not supported
export const WebGLFallback = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-background to-background-secondary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 max-w-md p-8"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">3D Not Available</h3>
          <p className="text-foreground/70">
            Your browser doesn&apos;t support WebGL or 3D graphics. The portfolio will work without 3D features.
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="btn-primary"
        >
          Continue to Portfolio
        </motion.button>
      </motion.div>
    </div>
  );
};
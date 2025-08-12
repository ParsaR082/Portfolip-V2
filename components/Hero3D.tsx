'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { Scene } from './Three/Scene';
import { Loader3D, ErrorFallback, WebGLFallback, HTMLLoader } from './Three/Loader';
import { CONFIG } from '../lib/seo';

interface Hero3DProps {
  onScrollToProjects: () => void;
}

const Hero3D = ({ onScrollToProjects }: Hero3DProps) => {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [canvasError, setCanvasError] = useState<Error | null>(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  useEffect(() => {
    // Check WebGL support
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const gl2 = canvas.getContext('webgl2');
        
        if (gl2 || gl) {
          setWebglSupported(true);
        } else {
          setWebglSupported(false);
        }
      } catch (error) {
        console.warn('WebGL support check failed:', error);
        setWebglSupported(false);
      }
    };

    checkWebGLSupport();
  }, []);

  const handleCanvasError = (error: Error) => {
    console.error('Canvas error:', error);
    setCanvasError(error);
  };

  const retryCanvas = () => {
    setCanvasError(null);
  };

  if (webglSupported === null) {
    return (
      <section id="hero" className="relative h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-foreground/70">Initializing 3D...</span>
        </div>
      </section>
    );
  }

  if (!webglSupported) {
    return (
      <section id="hero" className="relative h-screen">
        <WebGLFallback />
        <HeroContent onScrollToProjects={onScrollToProjects} />
      </section>
    );
  }

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 canvas-container">
        <ErrorBoundary
          FallbackComponent={({ error }) => (
            <div className="h-full flex items-center justify-center">
              <ErrorFallback error={error} retry={retryCanvas} />
            </div>
          )}
          onError={handleCanvasError}
          resetKeys={[canvasError]}
        >
          <Canvas
            dpr={[1, 2]}
            camera={{
              position: [0, 0, 8],
              fov: 45,
              near: 0.1,
              far: 100,
            }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            shadows
            className="bg-transparent"
          >
            <Suspense fallback={null}>
              <Scene onLoad={() => setSceneLoaded(true)} />
            </Suspense>
          </Canvas>
          {/* HTML Loader overlay */}
          {!sceneLoaded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <HTMLLoader message="Loading 3D Scene..." />
            </div>
          )}
        </ErrorBoundary>
      </div>

      {/* Hero Content Overlay */}
      <HeroContent onScrollToProjects={onScrollToProjects} />

      {/* Scroll Indicator */}
      <ScrollIndicator onClick={onScrollToProjects} />
    </section>
  );
};

// Hero Content Component
const HeroContent = ({ onScrollToProjects }: { onScrollToProjects: () => void }) => {
  return (
    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="container-width section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="block text-foreground">Hi, I&apos;m</span>
            <span className="block gradient-text">{CONFIG.name}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto text-balance"
          >
            Full Stack Developer & Software Engineer specializing in{' '}
            <span className="text-primary font-semibold">Next.js</span>,{' '}
            <span className="text-accent font-semibold">React</span>, and{' '}
            <span className="text-primary font-semibold">Modern Web Technologies</span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-foreground/60 max-w-2xl mx-auto"
          >
            I create innovative digital solutions with expertise in both frontend and backend development, 
            passionate about exploring new technologies and building scalable applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onScrollToProjects}
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <Play size={20} />
              <span>View My Work</span>
            </motion.button>
            
            <motion.a
              href={`mailto:${CONFIG.email}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>Get In Touch</span>
            </motion.a>
          </motion.div>

          {/* Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pt-12"
          >
            <p className="text-sm text-foreground/50 mb-4">Built with</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  className="tech-tag"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Scroll Indicator Component
const ScrollIndicator = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      onClick={onClick}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-foreground/60 hover:text-foreground transition-colors duration-200 group"
      aria-label="Scroll to projects"
    >
      <div className="flex flex-col items-center space-y-2">
        <span className="text-sm font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="p-2 rounded-full border border-foreground/20 group-hover:border-primary/50 transition-colors duration-200"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default Hero3D;
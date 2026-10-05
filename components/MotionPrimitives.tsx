'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';

// ============================================================
// SCROLL DIRECTION CONTEXT & HOOK
// Enables direction-aware entrances and exits throughout the site
// ============================================================
export type ScrollDirection = 'down' | 'up';

interface ScrollContextValue {
  direction: ScrollDirection;
}

const ScrollContext = createContext<ScrollContextValue>({ direction: 'down' });

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = useState<ScrollDirection>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      if (Math.abs(delta) > 3) {
        setDirection(delta > 0 ? 'down' : 'up');
        lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{ direction }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollDir(): ScrollDirection {
  return useContext(ScrollContext).direction;
}

// ============================================================
// EASING PRESETS & MOTION TOKENS
// ============================================================
export const ease = {
  cinematic: [0.16, 1, 0.3, 1] as const,
  smooth: [0.22, 1, 0.36, 1] as const,
  gentle: [0.33, 1, 0.68, 1] as const,
  cardHover: [0.25, 1, 0.5, 1] as const,
};

// ============================================================
// FADE + LIFT (Direction-aware, fully reversible entrance & exit)
// ============================================================
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  exitDistance?: number;
  className?: string;
  margin?: string;
  once?: boolean;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.65,
  distance = 24,
  exitDistance = 18,
  className = '',
  margin = '-8% 0px -8% 0px',
  once = false,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });
  const shouldReduceMotion = useReducedMotion();
  const direction = useScrollDir();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // When scrolling DOWN:
  // - Enters from below (+distance)
  // - Exits toward top (-exitDistance)
  // When scrolling UP:
  // - Enters from above (-distance)
  // - Exits toward bottom (+exitDistance)
  const enterY = direction === 'down' ? distance : -distance;
  const exitY = direction === 'down' ? -exitDistance : exitDistance;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: enterY }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: exitY }
      }
      transition={{
        duration: inView ? duration : duration * 0.7,
        delay: inView ? delay : 0,
        ease: ease.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// STAGGER CONTAINER & ITEM (Fully reversible with reverse stagger on exit)
// ============================================================
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  margin?: string;
  once?: boolean;
}

const staggerContainerVariants: Variants = {
  hidden: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const staggerItemVariants: Variants = {
  hidden: (custom: { direction: ScrollDirection; distance: number; exitDistance: number }) => ({
    opacity: 0,
    y: custom.direction === 'down' ? -custom.exitDistance : custom.exitDistance,
    scale: 0.98,
    transition: { duration: 0.35, ease: ease.smooth },
  }),
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: ease.smooth },
  },
};

export function StaggerContainer({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  margin = '-6% 0px -6% 0px',
  once = false,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={{ stagger, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
  distance = 20,
  exitDistance = 14,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  exitDistance?: number;
}) {
  const direction = useScrollDir();

  return (
    <motion.div
      variants={staggerItemVariants}
      custom={{ direction, distance, exitDistance }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// CLIP REVEAL (Direction-aware editorial mask reveal & exit)
// ============================================================
interface ClipRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  margin?: string;
  once?: boolean;
}

export function ClipReveal({
  children,
  delay = 0,
  duration = 0.75,
  direction = 'up',
  className = '',
  margin = '-6% 0px -6% 0px',
  once = false,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });
  const shouldReduceMotion = useReducedMotion();
  const scrollDir = useScrollDir();

  const clips: Record<string, { hidden: string; visible: string; exit: string }> = {
    up: {
      hidden: 'inset(100% 0% 0% 0%)',
      visible: 'inset(0% 0% 0% 0%)',
      exit: scrollDir === 'down' ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)',
    },
    down: {
      hidden: 'inset(0% 0% 100% 0%)',
      visible: 'inset(0% 0% 0% 0%)',
      exit: 'inset(0% 0% 100% 0%)',
    },
    left: {
      hidden: 'inset(0% 100% 0% 0%)',
      visible: 'inset(0% 0% 0% 0%)',
      exit: 'inset(0% 100% 0% 0%)',
    },
    right: {
      hidden: 'inset(0% 0% 0% 100%)',
      visible: 'inset(0% 0% 0% 0%)',
      exit: 'inset(0% 0% 0% 100%)',
    },
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clips[direction].hidden, opacity: 0 }}
      animate={
        inView
          ? { clipPath: clips[direction].visible, opacity: 1 }
          : { clipPath: clips[direction].exit, opacity: 0 }
      }
      transition={{
        duration: inView ? duration : duration * 0.7,
        delay: inView ? delay : 0,
        ease: ease.cinematic,
      }}
      className={className}
      style={{ willChange: 'clip-path, opacity' }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// SCALE FADE (Fully reversible scale and fade for cards & badges)
// ============================================================
interface ScaleFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  fromScale?: number;
  className?: string;
  margin?: string;
  once?: boolean;
}

export function ScaleFade({
  children,
  delay = 0,
  duration = 0.6,
  fromScale = 0.94,
  className = '',
  margin = '-6% 0px -6% 0px',
  once = false,
}: ScaleFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: fromScale }}
      animate={
        inView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: fromScale }
      }
      transition={{
        duration: inView ? duration : duration * 0.7,
        delay: inView ? delay : 0,
        ease: ease.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// SLIDE IN (Fully reversible lateral slide for dates & accents)
// ============================================================
interface SlideInProps {
  children: React.ReactNode;
  from?: 'left' | 'right';
  delay?: number;
  distance?: number;
  className?: string;
  margin?: string;
  once?: boolean;
}

export function SlideIn({
  children,
  from = 'right',
  delay = 0,
  distance = 32,
  className = '',
  margin = '-6% 0px -6% 0px',
  once = false,
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const xInit = from === 'right' ? distance : -distance;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xInit }}
      animate={
        inView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: xInit }
      }
      transition={{
        duration: inView ? 0.65 : 0.45,
        delay: inView ? delay : 0,
        ease: ease.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// PROGRESSIVE LINE DRAW (Fully reversible line draw)
// ============================================================
interface LineDrawProps {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  delay?: number;
  duration?: number;
  margin?: string;
}

export function LineDraw({
  className = '',
  orientation = 'vertical',
  delay = 0,
  duration = 0.9,
  margin = '-8% 0px -8% 0px',
}: LineDrawProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: margin as any });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} style={{ transform: 'none' }} />;
  }

  const initial =
    orientation === 'vertical'
      ? { scaleY: 0, transformOrigin: 'top center' }
      : { scaleX: 0, transformOrigin: 'right center' };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={{
        scaleY: orientation === 'vertical' ? (inView ? 1 : 0) : undefined,
        scaleX: orientation === 'horizontal' ? (inView ? 1 : 0) : undefined,
      }}
      transition={{
        duration: inView ? duration : duration * 0.6,
        delay: inView ? delay : 0,
        ease: ease.cinematic,
      }}
      className={className}
    />
  );
}

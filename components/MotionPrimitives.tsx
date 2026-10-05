'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';

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
// FADE + LIFT (Standard directional reveal for cards and text)
// ============================================================
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.65,
  distance = 24,
  className = '',
  once = true,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-6% 0px' });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration, delay, ease: ease.smooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// STAGGER CONTAINER & ITEM (For lists, grids, stat cards)
// ============================================================
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: ease.smooth },
  },
};

export function StaggerContainer({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  once = true,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-5% 0px' });
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
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================
// CLIP REVEAL (Editorial mask-based reveal)
// ============================================================
interface ClipRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  once?: boolean;
}

export function ClipReveal({
  children,
  delay = 0,
  duration = 0.75,
  direction = 'up',
  className = '',
  once = true,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-6% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const clips: Record<string, { hidden: string; visible: string }> = {
    up:    { hidden: 'inset(100% 0% 0% 0%)', visible: 'inset(0% 0% 0% 0%)' },
    down:  { hidden: 'inset(0% 0% 100% 0%)', visible: 'inset(0% 0% 0% 0%)' },
    left:  { hidden: 'inset(0% 100% 0% 0%)', visible: 'inset(0% 0% 0% 0%)' },
    right: { hidden: 'inset(0% 0% 0% 100%)', visible: 'inset(0% 0% 0% 0%)' },
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
          : { clipPath: clips[direction].hidden, opacity: 0 }
      }
      transition={{ duration, delay, ease: ease.cinematic }}
      className={className}
      style={{ willChange: 'clip-path, opacity' }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// SCALE FADE (For icons, chips, and focal cards)
// ============================================================
interface ScaleFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  fromScale?: number;
  className?: string;
  once?: boolean;
}

export function ScaleFade({
  children,
  delay = 0,
  duration = 0.6,
  fromScale = 0.94,
  className = '',
  once = true,
}: ScaleFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-5% 0px' });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: fromScale }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: fromScale }}
      transition={{ duration, delay, ease: ease.smooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// SLIDE IN (For accents entering from side boundaries)
// ============================================================
interface SlideInProps {
  children: React.ReactNode;
  from?: 'left' | 'right';
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export function SlideIn({
  children,
  from = 'right',
  delay = 0,
  distance = 32,
  className = '',
  once = true,
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-6% 0px' });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const xInit = from === 'right' ? distance : -distance;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xInit }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: xInit }}
      transition={{ duration: 0.65, delay, ease: ease.smooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// PROGRESSIVE LINE DRAW (For timeline stems and section dividers)
// ============================================================
interface LineDrawProps {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  delay?: number;
  duration?: number;
}

export function LineDraw({
  className = '',
  orientation = 'vertical',
  delay = 0,
  duration = 0.9,
}: LineDrawProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} style={{ transform: 'none' }} />;
  }

  const initial =
    orientation === 'vertical'
      ? { scaleY: 0, transformOrigin: 'top center' }
      : { scaleX: 0, transformOrigin: 'right center' };

  const animate =
    orientation === 'vertical'
      ? { scaleY: inView ? 1 : 0 }
      : { scaleX: inView ? 1 : 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: ease.cinematic }}
      className={className}
    />
  );
}

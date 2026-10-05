'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

export interface CinematicIntroProps {
  phase: 'playing' | 'transforming' | 'settled';
  onStartTransform: () => void;
}

export default function CinematicIntro({ phase, onStartTransform }: CinematicIntroProps) {
  const onStartTransformRef = useRef(onStartTransform);
  onStartTransformRef.current = onStartTransform;

  useEffect(() => {
    // If prefers-reduced-motion is enabled, trigger immediate transformation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onStartTransformRef.current();
      return;
    }

    if (phase !== 'playing') {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    // Scroll lock strictly during initial intro playing phase
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Prevent scrolling keys & gestures during intro
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };
    const preventKeyScroll = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    // Target duration: ~2.8 seconds, then continuous expansion into Hero
    const timer = setTimeout(() => {
      onStartTransformRef.current();
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, [phase]);

  // Kinetic typography lines inspired directly by Codrops KineticTypePageTransition
  const kineticLines = [
    { text: 'PARSA RAHMANI · SOFTWARE ENGINEER · AI', highlight: 'AI' },
    { text: 'FULL STACK DEVELOPER · NEXT.JS · PYTHON', highlight: 'NEXT.JS' },
    { text: 'PHYSICS-INFORMED NEURAL NETWORKS · DEEP LEARNING', highlight: 'PINNs' },
    { text: 'CREATIVE PROBLEM SOLVER · ALGORITHMS & SYSTEMS', highlight: 'SOLVER' },
    { text: 'PARSA RAHMANI · PARSA RAHMANI · PARSA RAHMANI', highlight: 'PARSA' },
    { text: 'BUILDING MODERN DIGITAL EXPERIENCES', highlight: 'MODERN' },
    { text: 'RESEARCH · NEURAL ARCHITECTURE SEARCH · NAS', highlight: 'NAS' },
    { text: 'SOFTWARE ENGINEER · FULL STACK · 2026', highlight: '2026' },
  ];

  if (phase === 'settled') return null;

  return (
    <motion.div
      className="kinetic-intro-root"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'transforming' ? 0 : 1 }}
      transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        pointerEvents: phase === 'playing' ? 'auto' : 'none',
      }}
      onClick={onStartTransform}
      title="برای رد کردن کلیک کنید / Click anywhere to skip"
    >
      {/* Ambient lighting glows */}
      <div className="kinetic-ambient-glow kinetic-glow-top" />
      <div className="kinetic-ambient-glow kinetic-glow-bottom" />

      {/* Skip button for user control during playing phase */}
      {phase === 'playing' && (
        <button
          type="button"
          className="kinetic-intro-skip"
          onClick={(e) => {
            e.stopPropagation();
            onStartTransform();
          }}
          aria-label="رد کردن انیمیشن شروع"
        >
          <span>رد کردن / Skip</span>
          <ArrowLeft size={15} />
        </button>
      )}

      {/* 
        KINETIC TYPOGRAPHY GRID (Codrops TypeTransition)
        Interacting dynamically around and across the central photograph.
        When transforming, scales up and sweeps outward away from the center.
      */}
      <motion.div
        className="kinetic-type-container"
        initial={{ scale: 1.1, rotate: -5 }}
        animate={
          phase === 'transforming'
            ? { scale: 2.6, rotate: -35, opacity: 0 }
            : { scale: 1.7, rotate: -15, opacity: 1 }
        }
        transition={{
          duration: phase === 'transforming' ? 1.25 : 2.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {kineticLines.map((line, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={i}
              className="kinetic-type-line"
              initial={{
                x: isEven ? '15%' : '-15%',
                opacity: 0.35,
              }}
              animate={{
                x: isEven ? ['15%', '0%', '-30%'] : ['-15%', '0%', '30%'],
                opacity: [0.35, 0.75, 0.25],
              }}
              transition={{
                duration: 2.8,
                delay: i * 0.04,
                ease: 'easeInOut',
              }}
            >
              <span className="kinetic-line-text">{line.text}</span>
              <span className="kinetic-separator">✦</span>
              <span className="kinetic-line-text kinetic-accent-word">{line.text}</span>
              <span className="kinetic-separator">✦</span>
              <span className="kinetic-line-text">{line.text}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Opening center metadata badge framed over the photo */}
      {phase === 'playing' && (
        <div className="kinetic-intro-content" onClick={(e) => e.stopPropagation()}>
          <motion.div
            className="kinetic-intro-badge-pill"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="kinetic-card-kicker">
              <Sparkles size={13} className="kinetic-sparkle-icon" />
              <span>PORTFOLIO 2026</span>
            </span>
            <span className="kinetic-pill-divider">·</span>
            <strong className="kinetic-pill-name">پارسا رحمانی</strong>
            <span className="kinetic-pill-divider">·</span>
            <span className="kinetic-pill-title">مهندس نرم‌افزار و هوش مصنوعی</span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

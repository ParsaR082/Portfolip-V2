'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, Sparkles, Terminal } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const hasFinishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);

    setTimeout(() => {
      onCompleteRef.current();
    }, 600);
  };

  useEffect(() => {
    setIsMounted(true);

    // If prefers-reduced-motion is enabled, complete immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onCompleteRef.current();
      return;
    }

    // Scroll lock
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
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

    // Target duration: ~2.8 seconds, then smooth exit
    const timer = setTimeout(() => {
      handleFinish();
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, []);

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

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {!hasFinishedRef.current || isExiting ? (
        <motion.div
          className="kinetic-intro-root"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleFinish}
          title="برای رد کردن کلیک کنید / Click anywhere to skip"
        >
          {/* Ambient lighting glows */}
          <div className="kinetic-ambient-glow kinetic-glow-top" />
          <div className="kinetic-ambient-glow kinetic-glow-bottom" />

          {/* Skip button for user control */}
          <button
            type="button"
            className="kinetic-intro-skip"
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            aria-label="رد کردن انیمیشن شروع"
          >
            <span>رد کردن / Skip</span>
            <ArrowLeft size={15} />
          </button>

          {/* 
            KINETIC TYPOGRAPHY GRID (Codrops TypeTransition)
            Scale, rotate, and horizontal keyframe sweep across lines
          */}
          <motion.div
            className="kinetic-type-container"
            initial={{ scale: 1.1, rotate: -5 }}
            animate={
              isExiting
                ? { scale: 2.5, rotate: -35, opacity: 0 }
                : { scale: 1.7, rotate: -15, opacity: 1 }
            }
            transition={{
              duration: 2.8,
              ease: [0.25, 0.1, 0.25, 1],
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

          {/* 
            CODROPS COUNTER-SLIDING CURTAIN REVEAL CARD
            Outer curtain frame translates while inner image counter-translates (y: -100% -> 0%)
          */}
          <div className="kinetic-intro-content" onClick={(e) => e.stopPropagation()}>
            <motion.div
              className="kinetic-curtain-card"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={
                isExiting
                  ? { scale: 1.05, opacity: 0, y: -20 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Counter-slide curtain image wrap */}
              <div className="kinetic-curtain-img-wrap">
                <motion.div
                  className="kinetic-curtain-img-inner"
                  initial={{ y: '-100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                >
                  <img
                    src="/parsa.jpg"
                    alt="پارسا رحمانی - Parsa Rahmani"
                    className="kinetic-portrait-img"
                  />
                  <div className="kinetic-img-overlay" />
                </motion.div>
              </div>

              {/* Typography metadata stagger */}
              <div className="kinetic-card-meta">
                <motion.div
                  className="kinetic-card-kicker"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Sparkles size={14} className="kinetic-sparkle-icon" />
                  <span>PORTFOLIO 2026</span>
                </motion.div>

                <motion.h1
                  className="kinetic-card-title"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  پارسا رحمانی
                </motion.h1>

                <motion.p
                  className="kinetic-card-tagline"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  مهندس نرم‌افزار · هوش مصنوعی و فول‌استک
                </motion.p>

                <motion.div
                  className="kinetic-card-badges"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <span className="kinetic-badge"><Terminal size={12} /> TypeScript</span>
                  <span className="kinetic-badge">Python</span>
                  <span className="kinetic-badge">Next.js</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

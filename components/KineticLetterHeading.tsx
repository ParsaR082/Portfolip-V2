'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useScrollDir } from './MotionPrimitives';

interface KineticLetterHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  isActive?: boolean;
  delay?: number;
  highlightWords?: string[];
  kicker?: string;
}

/**
 * KineticLetterHeading implements the Codrops OnScrollLetterAnimations technique.
 * Formula from Codrops OnScrollLetterAnimations (Demo 3 & Demo 2):
 * factor = j < Math.ceil(total/2) ? j : Math.ceil(total/2) - Math.abs(Math.floor(total/2) - j) - 1
 * Applied to characters and words with parabolic vertical translation, rotation, and scale.
 * Fully reversible: animates in when entering viewport, recedes subtly when exiting viewport,
 * and replays smoothly whenever returning!
 */
export default function KineticLetterHeading({
  text,
  className = '',
  as = 'h2',
  isActive = true,
  delay = 0,
  highlightWords = [],
  kicker,
}: KineticLetterHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, margin: '-6% 0px -6% 0px' });
  const shouldReduceMotion = useReducedMotion();
  const scrollDir = useScrollDir();

  const isVisible = inView && isActive;
  const exitY = scrollDir === 'down' ? -14 : 14;

  const words = text.split(' ');
  const wordsTotal = words.length;

  const Tag = as;

  if (shouldReduceMotion) {
    return (
      <div className="kinetic-letter-heading-wrap">
        {kicker && <span className="section-kicker block mb-2">{kicker}</span>}
        <Tag className={`kinetic-letter-heading ${className}`}>{text}</Tag>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="kinetic-letter-heading-wrap">
      {kicker && (
        <motion.span
          className="section-kicker block mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: exitY * 0.7 }
          }
          transition={{ duration: 0.5, delay: delay * 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {kicker}
        </motion.span>
      )}

      <Tag className={`kinetic-letter-heading ${className}`}>
        {words.map((word, wordIndex) => {
          // Codrops parabolic factor across words
          const wordFactor =
            wordIndex < Math.ceil(wordsTotal / 2)
              ? wordIndex
              : Math.ceil(wordsTotal / 2) -
                Math.abs(Math.floor(wordsTotal / 2) - wordIndex) -
                1;

          const isHighlighted = highlightWords.includes(word);
          const chars = Array.from(word);
          const charsTotal = chars.length;

          // Check if word contains non-Latin (e.g. Persian) characters
          const hasPersian = /[\u0600-\u06FF]/.test(word);

          if (hasPersian) {
            // For Persian words, preserve cursive connection while waving each word
            const initialY = (wordFactor + 1) * 16;
            const initialRotate =
              wordIndex < wordsTotal / 2 ? wordFactor * 2.5 : -wordFactor * 2.5;

            return (
              <span key={wordIndex} className="kinetic-word-wrap">
                <motion.span
                  className={`kinetic-word ${isHighlighted ? 'kinetic-highlight' : ''}`}
                  initial={{ opacity: 0, y: initialY }}
                  animate={
                    isVisible
                      ? {
                          opacity: 1,
                          y: 0,
                          rotate: 0,
                          scale: 1,
                        }
                      : {
                          opacity: 0,
                          y: exitY,
                          rotate: 0,
                          scale: 0.97,
                        }
                  }
                  transition={{
                    duration: isVisible ? 0.65 : 0.4,
                    delay: isVisible ? delay + wordIndex * 0.04 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {isHighlighted ? <em>{word}</em> : word}
                </motion.span>
                <span className="kinetic-space">&nbsp;</span>
              </span>
            );
          }

          // For Latin/digits, character-by-character parabolic wave from Codrops
          return (
            <span key={wordIndex} className="kinetic-word-wrap">
              {chars.map((char, charIndex) => {
                const charFactor =
                  charIndex < Math.ceil(charsTotal / 2)
                    ? charIndex
                    : Math.ceil(charsTotal / 2) -
                      Math.abs(Math.floor(charsTotal / 2) - charIndex) -
                      1;

                const initialY = (charFactor + 1) * 12;

                return (
                  <motion.span
                    key={charIndex}
                    className="kinetic-char"
                    initial={{ opacity: 0, y: initialY }}
                    animate={
                      isVisible
                        ? {
                            opacity: 1,
                            y: 0,
                            rotate: 0,
                            scale: 1,
                          }
                        : {
                            opacity: 0,
                            y: exitY,
                            rotate: 0,
                            scale: 0.97,
                          }
                    }
                    transition={{
                      duration: isVisible ? 0.6 : 0.35,
                      delay: isVisible
                        ? delay + wordIndex * 0.04 + charIndex * 0.015
                        : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
              <span className="kinetic-space">&nbsp;</span>
            </span>
          );
        })}
      </Tag>
    </div>
  );
}

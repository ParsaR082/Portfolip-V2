'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
 * Designed so headings are always clearly readable, never blank or invisible!
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
  const words = text.split(' ');
  const wordsTotal = words.length;

  const Tag = as;

  return (
    <div className="kinetic-letter-heading-wrap">
      {kicker && (
        <span className="section-kicker block mb-2">
          {kicker}
        </span>
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
                  initial={{ opacity: 1, y: 0, rotate: 0 }}
                  animate={
                    isActive
                      ? {
                          opacity: 1,
                          y: [initialY, 0],
                          rotate: [initialRotate, 0],
                          scale: [0.94, 1],
                        }
                      : {
                          opacity: 1,
                          y: 0,
                          rotate: 0,
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 0.7,
                    delay: delay + wordIndex * 0.04,
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
                const initialRotate =
                  charIndex < charsTotal / 2
                    ? charFactor * 3.5
                    : -charFactor * 3.5;

                return (
                  <motion.span
                    key={charIndex}
                    className="kinetic-char"
                    initial={{ opacity: 1, y: 0, rotate: 0 }}
                    animate={
                      isActive
                        ? {
                            opacity: 1,
                            y: [initialY, 0],
                            rotate: [initialRotate, 0],
                            scale: [0.92, 1],
                          }
                        : {
                            opacity: 1,
                            y: 0,
                            rotate: 0,
                            scale: 1,
                          }
                    }
                    transition={{
                      duration: 0.65,
                      delay: delay + wordIndex * 0.04 + charIndex * 0.015,
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

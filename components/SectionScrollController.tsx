'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface SectionScrollControllerProps {
  sectionIds: string[];
  activeSection: number;
  onSectionChange: (index: number) => void;
  isIntroActive: boolean;
  children: React.ReactNode;
}

export default function SectionScrollController({
  sectionIds,
  activeSection,
  onSectionChange,
  isIntroActive,
  children,
}: SectionScrollControllerProps) {
  const isTransitioningRef = useRef(false);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const scrollToSectionIndex = useCallback(
    (targetIndex: number, behavior: ScrollBehavior = 'smooth') => {
      const clampedIndex = Math.max(0, Math.min(targetIndex, sectionIds.length - 1));
      const targetId = sectionIds[clampedIndex];
      const targetEl = document.getElementById(targetId);

      if (!targetEl) return;

      isTransitioningRef.current = true;
      activeSectionRef.current = clampedIndex;
      onSectionChange(clampedIndex);

      // Smooth scroll directly to target section
      const targetTop = targetEl.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: targetTop,
        behavior,
      });

      // Update URL hash without causing page jump
      if (window.location.hash !== `#${targetId}`) {
        window.history.replaceState(null, '', `#${targetId}`);
      }

      // Transition lock and cooldown to suppress trackpad momentum
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 850);
    },
    [sectionIds, onSectionChange]
  );

  // Expose global navigator so buttons and links throughout the site can call it cleanly
  useEffect(() => {
    (window as any).__portfolioNavigateTo = (idOrIndex: string | number) => {
      if (typeof idOrIndex === 'number') {
        scrollToSectionIndex(idOrIndex);
      } else {
        const idx = sectionIds.indexOf(idOrIndex.replace('#', ''));
        if (idx !== -1) {
          scrollToSectionIndex(idx);
        } else {
          document.getElementById(idOrIndex.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    return () => {
      delete (window as any).__portfolioNavigateTo;
    };
  }, [sectionIds, scrollToSectionIndex]);

  // Initial hash detection on mount
  useEffect(() => {
    if (isIntroActive) return;

    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const idx = sectionIds.indexOf(hash);
      if (idx !== -1) {
        // Immediate positioning for direct hash navigation
        setTimeout(() => {
          scrollToSectionIndex(idx, 'auto');
        }, 50);
      }
    }
  }, [isIntroActive, sectionIds, scrollToSectionIndex]);

  // Main scroll, touch, and keyboard gesture listeners
  useEffect(() => {
    if (isIntroActive) return;

    // Wheel handler with trackpad momentum suppression and overflow handling
    const onWheel = (e: WheelEvent) => {
      // If currently animating or locked, prevent default to avoid halfway stops
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      // Threshold check to avoid twitchy trackpad micro-scrolls
      if (Math.abs(e.deltaY) < 22) {
        return;
      }

      const currentIdx = activeSectionRef.current;
      const currentId = sectionIds[currentIdx];
      const currentEl = document.getElementById(currentId);

      const delta = e.deltaY;
      const isDown = delta > 0;

      // Check section internal overflow on small screens / mobile / zoomed viewports
      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // If the section is taller than viewport:
        if (rect.height > viewportHeight + 40) {
          // If scrolling down and hasn't reached the bottom of this section yet, let natural scroll proceed
          if (isDown && rect.bottom > viewportHeight + 15) {
            return;
          }
          // If scrolling up and hasn't reached the top of this section yet, let natural scroll proceed
          if (!isDown && rect.top < -15) {
            return;
          }
        }
      }

      // Perform one-section transition
      e.preventDefault();
      const targetIndex = isDown ? currentIdx + 1 : currentIdx - 1;

      if (targetIndex >= 0 && targetIndex < sectionIds.length && targetIndex !== currentIdx) {
        scrollToSectionIndex(targetIndex);
      }
    };

    // Touch event handlers for mobile / tablet
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isTransitioningRef.current) {
        // Suppress erratic scrolling while transition is running
        if (e.cancelable) e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isTransitioningRef.current || touchStartYRef.current === null) return;
      if (e.changedTouches.length !== 1) return;

      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const deltaY = touchStartYRef.current - endY;
      const deltaX = (touchStartXRef.current || 0) - endX;

      touchStartYRef.current = null;
      touchStartXRef.current = null;

      // Ignore predominantly horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY)) return;

      // Swipe threshold: 45px
      if (Math.abs(deltaY) < 45) return;

      const currentIdx = activeSectionRef.current;
      const currentId = sectionIds[currentIdx];
      const currentEl = document.getElementById(currentId);

      const isDown = deltaY > 0;

      // Check tall section overflow
      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (rect.height > viewportHeight + 40) {
          if (isDown && rect.bottom > viewportHeight + 20) return;
          if (!isDown && rect.top < -20) return;
        }
      }

      const targetIndex = isDown ? currentIdx + 1 : currentIdx - 1;
      if (targetIndex >= 0 && targetIndex < sectionIds.length && targetIndex !== currentIdx) {
        scrollToSectionIndex(targetIndex);
      }
    };

    // Keyboard navigation
    const onKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when focusing an input or textarea
      const target = e.target as HTMLElement;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      const currentIdx = activeSectionRef.current;

      if (['ArrowDown', 'PageDown'].includes(e.code) || (e.code === 'Space' && !e.shiftKey)) {
        e.preventDefault();
        if (!isTransitioningRef.current && currentIdx < sectionIds.length - 1) {
          scrollToSectionIndex(currentIdx + 1);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.code) || (e.code === 'Space' && e.shiftKey)) {
        e.preventDefault();
        if (!isTransitioningRef.current && currentIdx > 0) {
          scrollToSectionIndex(currentIdx - 1);
        }
      } else if (e.code === 'Home') {
        e.preventDefault();
        if (!isTransitioningRef.current) {
          scrollToSectionIndex(0);
        }
      } else if (e.code === 'End') {
        e.preventDefault();
        if (!isTransitioningRef.current) {
          scrollToSectionIndex(sectionIds.length - 1);
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, [isIntroActive, sectionIds, scrollToSectionIndex]);

  return <div className="controlled-scroll-container">{children}</div>;
}

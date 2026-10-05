'use client';

import React, { useEffect, useRef, useCallback } from 'react';

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
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const momentumDecayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeSectionRef = useRef(activeSection);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const scrollToSectionIndex = useCallback(
    (targetIndex: number, behavior: ScrollBehavior = 'smooth', align: 'top' | 'bottom' = 'top') => {
      const clampedIndex = Math.max(0, Math.min(targetIndex, sectionIds.length - 1));
      const targetId = sectionIds[clampedIndex];
      const targetEl = document.getElementById(targetId);

      if (!targetEl) return;

      isTransitioningRef.current = true;
      activeSectionRef.current = clampedIndex;
      onSectionChange(clampedIndex);

      let targetTop = targetEl.offsetTop;
      if (align === 'bottom') {
        targetTop = Math.max(0, targetEl.offsetTop + targetEl.offsetHeight - window.innerHeight);
      }

      window.scrollTo({
        top: targetTop,
        behavior,
      });

      // Update URL hash without causing page jump
      if (window.location.hash !== `#${targetId}`) {
        window.history.replaceState(null, '', `#${targetId}`);
      }

      // Transition lock: ensure at least 700ms cooldown so one gesture cannot skip multiple sections
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 700);
    },
    [sectionIds, onSectionChange]
  );

  // Expose global navigator so header nav links, buttons, and brand can call it directly
  useEffect(() => {
    (window as any).__portfolioNavigateTo = (idOrIndex: string | number) => {
      if (typeof idOrIndex === 'number') {
        scrollToSectionIndex(idOrIndex);
      } else {
        const cleanId = idOrIndex.replace('#', '');
        const idx = sectionIds.indexOf(cleanId);
        if (idx !== -1) {
          scrollToSectionIndex(idx);
        } else {
          document.getElementById(cleanId)?.scrollIntoView({ behavior: 'smooth' });
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
        setTimeout(() => {
          scrollToSectionIndex(idx, 'auto');
        }, 50);
      }
    }
  }, [isIntroActive, sectionIds, scrollToSectionIndex]);

  // Continuous passive scroll listener to keep activeSection updated during normal in-section scrolling
  useEffect(() => {
    if (isIntroActive) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          if (isTransitioningRef.current) return;

          const scrollY = window.scrollY;
          const viewportMid = scrollY + window.innerHeight * 0.45;
          let bestIndex = 0;

          for (let i = 0; i < sectionIds.length; i++) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
              const top = el.offsetTop;
              const bottom = top + el.offsetHeight;
              if (scrollY + 20 >= top && scrollY + 20 < bottom) {
                bestIndex = i;
                break;
              } else if (viewportMid >= top) {
                bestIndex = i;
              }
            }
          }

          if (activeSectionRef.current !== bestIndex) {
            activeSectionRef.current = bestIndex;
            onSectionChange(bestIndex);
          }
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isIntroActive, sectionIds, onSectionChange]);

  // Main wheel, touch, and keyboard gesture listeners
  useEffect(() => {
    if (isIntroActive) return;

    const onWheel = (e: WheelEvent) => {
      // 1. While a transition animation is actively in flight, suppress wheel to prevent skipping
      if (isTransitioningRef.current) {
        // Extend momentum decay timer while wheel events continue firing from trackpad flick
        if (momentumDecayTimerRef.current) clearTimeout(momentumDecayTimerRef.current);
        momentumDecayTimerRef.current = setTimeout(() => {
          isTransitioningRef.current = false;
        }, 150);
        return;
      }

      // 2. Ignore micro-jitters
      if (Math.abs(e.deltaY) < 22) {
        return;
      }

      const currentIdx = activeSectionRef.current;
      const currentId = sectionIds[currentIdx];
      const currentEl = document.getElementById(currentId);
      if (!currentEl) return;

      const rect = currentEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isDown = e.deltaY > 0;

      // 3. TALL SECTION SCROLLING (Natural scroll inside the section):
      // If the section is taller than the viewport:
      if (rect.height > viewportHeight + 40) {
        // If scrolling down, let natural scrolling proceed freely until reaching the bottom edge
        if (isDown && rect.bottom > viewportHeight + 15) {
          return;
        }
        // If scrolling up, let natural scrolling proceed freely until reaching the top edge
        if (!isDown && rect.top < -15) {
          return;
        }
      }

      // 4. BOUNDARY NAVIGATION:
      // User has reached the section boundary and is continuing to scroll in that direction!
      const targetIndex = isDown ? currentIdx + 1 : currentIdx - 1;

      if (targetIndex >= 0 && targetIndex < sectionIds.length && targetIndex !== currentIdx) {
        e.preventDefault();
        const targetEl = document.getElementById(sectionIds[targetIndex]);
        const isTargetTall = targetEl && targetEl.offsetHeight > viewportHeight + 40;
        // When moving upwards into a tall section, land at its bottom so user enters seamlessly
        const align = !isDown && isTargetTall ? 'bottom' : 'top';
        scrollToSectionIndex(targetIndex, 'smooth', align);
      }
    };

    // Touch event handlers for mobile / tablet
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
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

      // Swipe threshold: 50px
      if (Math.abs(deltaY) < 50) return;

      const currentIdx = activeSectionRef.current;
      const currentId = sectionIds[currentIdx];
      const currentEl = document.getElementById(currentId);
      if (!currentEl) return;

      const rect = currentEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isDown = deltaY > 0;

      // Allow natural touch scroll inside tall sections
      if (rect.height > viewportHeight + 40) {
        if (isDown && rect.bottom > viewportHeight + 20) return;
        if (!isDown && rect.top < -20) return;
      }

      const targetIndex = isDown ? currentIdx + 1 : currentIdx - 1;
      if (targetIndex >= 0 && targetIndex < sectionIds.length && targetIndex !== currentIdx) {
        const targetEl = document.getElementById(sectionIds[targetIndex]);
        const isTargetTall = targetEl && targetEl.offsetHeight > viewportHeight + 40;
        const align = !isDown && isTargetTall ? 'bottom' : 'top';
        scrollToSectionIndex(targetIndex, 'smooth', align);
      }
    };

    // Keyboard navigation
    const onKeyDown = (e: KeyboardEvent) => {
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
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      if (momentumDecayTimerRef.current) clearTimeout(momentumDecayTimerRef.current);
    };
  }, [isIntroActive, sectionIds, scrollToSectionIndex]);

  return <div className="controlled-scroll-container">{children}</div>;
}

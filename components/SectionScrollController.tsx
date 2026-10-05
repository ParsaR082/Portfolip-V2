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
  const transitionStartTimeRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const wheelAccumulatorRef = useRef(0);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resetAccumulatorTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeSectionRef = useRef(activeSection);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const scheduleUnlock = useCallback(() => {
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

    const checkUnlock = () => {
      const elapsed = Date.now() - transitionStartTimeRef.current;
      const silent = Date.now() - lastWheelTimeRef.current;
      if (elapsed >= 750 && silent >= 140) {
        isTransitioningRef.current = false;
        wheelAccumulatorRef.current = 0;
      } else {
        const wait = Math.max(750 - elapsed, 140 - silent, 50);
        transitionTimerRef.current = setTimeout(checkUnlock, wait);
      }
    };

    transitionTimerRef.current = setTimeout(checkUnlock, 750);
  }, []);

  const scrollToSectionIndex = useCallback(
    (targetIndex: number, behavior: ScrollBehavior = 'smooth', align: 'top' | 'bottom' = 'top') => {
      const clampedIndex = Math.max(0, Math.min(targetIndex, sectionIds.length - 1));
      const targetId = sectionIds[clampedIndex];
      const targetEl = document.getElementById(targetId);

      if (!targetEl) return;

      isTransitioningRef.current = true;
      transitionStartTimeRef.current = Date.now();
      wheelAccumulatorRef.current = 0;
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

      if (window.location.hash !== `#${targetId}`) {
        window.history.replaceState(null, '', `#${targetId}`);
      }

      scheduleUnlock();
    },
    [sectionIds, onSectionChange, scheduleUnlock]
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

  // Accurate passive scroll listener to keep activeSection updated during normal in-section scrolling
  useEffect(() => {
    if (isIntroActive) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          if (isTransitioningRef.current) return;

          const scrollY = window.scrollY;
          const vh = window.innerHeight;
          let bestIdx = 0;
          let maxVisible = -1;

          for (let i = 0; i < sectionIds.length; i++) {
            const el = document.getElementById(sectionIds[i]);
            if (!el) continue;
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;
            const visibleTop = Math.max(scrollY, top);
            const visibleBottom = Math.min(scrollY + vh, bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            if (visibleHeight > maxVisible) {
              maxVisible = visibleHeight;
              bestIdx = i;
            }
          }

          if (activeSectionRef.current !== bestIdx) {
            activeSectionRef.current = bestIdx;
            onSectionChange(bestIdx);
          }
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isIntroActive, sectionIds, onSectionChange]);

  // Wheel, touch, and keyboard gesture listeners
  useEffect(() => {
    if (isIntroActive) return;

    const onWheel = (e: WheelEvent) => {
      lastWheelTimeRef.current = Date.now();

      // 1. While transition animation is in flight, absorb all wheel events to prevent multi-skipping
      if (isTransitioningRef.current) {
        const elapsed = Date.now() - transitionStartTimeRef.current;
        // If minimum animation time has elapsed, we can check if wheel has subsided
        if (elapsed < 750) {
          e.preventDefault();
          return;
        } else {
          // If still wheeling within 140ms of last event, extend lock to prevent momentum leaks
          e.preventDefault();
          scheduleUnlock();
          return;
        }
      }

      // 2. Ignore micro-jitters
      if (Math.abs(e.deltaY) < 6) {
        return;
      }

      const currentIdx = activeSectionRef.current;
      const currentId = sectionIds[currentIdx];
      const currentEl = document.getElementById(currentId);
      if (!currentEl) return;

      const rect = currentEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const isDown = e.deltaY > 0;
      const TOLERANCE = 8; // accounts for fractional pixels and DPI scaling

      const isAtBottom = rect.bottom <= vh + TOLERANCE;
      const isAtTop = rect.top >= -TOLERANCE;

      // 3. INSIDE A SECTION:
      // If scrolling down and we haven't reached the bottom boundary yet, LET BROWSER SCROLL NATIVELY!
      if (isDown && !isAtBottom) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      // If scrolling up and we haven't reached the top boundary yet, LET BROWSER SCROLL NATIVELY!
      if (!isDown && !isAtTop) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      // 4. AT THE BOUNDARY:
      // User has reached the genuine section boundary and is continuing to scroll in that direction!
      const targetIndex = isDown ? currentIdx + 1 : currentIdx - 1;

      // If at very top of site (hero) scrolling up, or bottom of site (contact) scrolling down, let browser handle it
      if (targetIndex < 0 || targetIndex >= sectionIds.length || targetIndex === currentIdx) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      // Accumulate intent delta
      if ((isDown && wheelAccumulatorRef.current < 0) || (!isDown && wheelAccumulatorRef.current > 0)) {
        wheelAccumulatorRef.current = 0;
      }

      wheelAccumulatorRef.current += e.deltaY;

      // Prevent boundary bounce while building intent
      e.preventDefault();

      // Reset accumulator after pause in gestures
      if (resetAccumulatorTimerRef.current) clearTimeout(resetAccumulatorTimerRef.current);
      resetAccumulatorTimerRef.current = setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 200);

      // Trigger transition only after meaningful intent threshold (e.g. 40px)
      const INTENT_THRESHOLD = 40;
      if (Math.abs(wheelAccumulatorRef.current) >= INTENT_THRESHOLD) {
        wheelAccumulatorRef.current = 0;
        const targetEl = document.getElementById(sectionIds[targetIndex]);
        const isTargetTall = targetEl ? targetEl.offsetHeight > vh + 40 : false;
        // When moving upwards into a tall section, land at its bottom so user enters seamlessly
        const align = !isDown && isTargetTall ? 'bottom' : 'top';
        scrollToSectionIndex(targetIndex, 'smooth', align);
      }
    };

    // Touch event handlers for mobile devices
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
      const vh = window.innerHeight;
      const isDown = deltaY > 0;
      const TOLERANCE = 10;

      const isAtBottom = rect.bottom <= vh + TOLERANCE;
      const isAtTop = rect.top >= -TOLERANCE;

      // Allow natural touch scroll inside sections
      if (isDown && !isAtBottom) return;
      if (!isDown && !isAtTop) return;

      const targetIndex = isDown ? currentIdx + 1 : currentIdx - 1;
      if (targetIndex >= 0 && targetIndex < sectionIds.length && targetIndex !== currentIdx) {
        const targetEl = document.getElementById(sectionIds[targetIndex]);
        const isTargetTall = targetEl ? targetEl.offsetHeight > vh + 40 : false;
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
      if (resetAccumulatorTimerRef.current) clearTimeout(resetAccumulatorTimerRef.current);
    };
  }, [isIntroActive, sectionIds, scrollToSectionIndex, scheduleUnlock]);

  return <div className="controlled-scroll-container">{children}</div>;
}

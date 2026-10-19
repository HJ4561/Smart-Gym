// src/components/CustomCursor.jsx
// Site-wide red dot + trailing ring cursor. Rendered once in App.jsx so every
// route gets it (pages must not render their own .cur-dot / .cur-ring).
//
// The native cursor is only hidden once this component is actually running
// (html.has-custom-cursor), so a page can never end up with no cursor at all.
import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const HOVER_TARGETS = [
  'a', 'button', 'input', 'select', 'textarea', 'label', 'summary', '[role="button"]',
  // page-specific interactive cards
  '.row-item', '.svc-in', '.fc-card', '.svc-card', '.facility-card', '.bkm-slot',
  '.ins-card', '.ins-featured', '.ct-qa', '.ct-hub', '.ct-cat', '.ct-faq-item',
  '.en-chip', '.en-check',
].join(', ');

// Share of the remaining gap the ring closes per 60 Hz frame. Scaled by real
// frame time, so it feels the same on 60 Hz and 144 Hz screens.
const FOLLOW = 0.35;
const FRAME_MS = 1000 / 60;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const target = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let raf = 0;
    let lastTime = 0;
    let visible = false;

    const place = (el, x, y) => { el.style.transform = `translate3d(${x}px, ${y}px, 0)`; };

    // Only animates while the ring is catching up — idle mouse = no work per frame.
    const tick = (now) => {
      const dt = lastTime ? Math.min(now - lastTime, 64) : FRAME_MS;
      lastTime = now;
      const k = 1 - Math.pow(1 - FOLLOW, dt / FRAME_MS);
      ringPos.x += (target.x - ringPos.x) * k;
      ringPos.y += (target.y - ringPos.y) * k;
      if (Math.abs(target.x - ringPos.x) < 0.2 && Math.abs(target.y - ringPos.y) < 0.2) {
        ringPos.x = target.x;
        ringPos.y = target.y;
        place(ring, ringPos.x, ringPos.y);
        raf = 0;
        lastTime = 0;
        return;
      }
      place(ring, ringPos.x, ringPos.y);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      target.x = e.clientX;
      target.y = e.clientY;
      place(dot, target.x, target.y);   // the dot follows the pointer directly — no lag

      if (!visible) {
        // First move (or re-entering the window): jump the ring there instead of sweeping in.
        visible = true;
        ringPos.x = target.x;
        ringPos.y = target.y;
        place(ring, ringPos.x, ringPos.y);
        root.classList.add('cursor-visible');
        return;
      }
      if (reduced) {
        place(ring, target.x, target.y);
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const hit = e.target instanceof Element && e.target.closest(HOVER_TARGETS);
      ring.classList.toggle('big', !!hit);
      dot.classList.toggle('big', !!hit);
    };

    const onLeave = () => {
      visible = false;
      root.classList.remove('cursor-visible');
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    root.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
      root.removeEventListener('mouseleave', onLeave);
      root.classList.remove('has-custom-cursor', 'cursor-visible');
    };
  }, []);

  return (
    <>
      <span ref={dotRef} className="cur-dot" aria-hidden="true" />
      <span ref={ringRef} className="cur-ring" aria-hidden="true" />
    </>
  );
}

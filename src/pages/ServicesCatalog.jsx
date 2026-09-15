// pages/ServicesCatalog.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ServicesCatalog.css';
import { useLang } from '../i18n/LangContext';
import LangSwitch from '../i18n/LangSwitch';

/* ============================================================
   MOTION HELPERS
============================================================ */
const useDecode = (text, start) => {
  const [out, setOut] = useState(text);
  useEffect(() => {
    setOut(text);
    if (!start) return;
    const glyphs = '█▓▒░<>/' + String.fromCharCode(92) + '|—';
    let frame = 0;
    const total = 22;
    const id = setInterval(() => {
      frame++;
      const p = frame / total;
      setOut(text.split('').map((c, i) => {
        if (c === ' ') return ' ';
        return i < p * text.length ? c : glyphs[Math.floor(Math.random() * glyphs.length)];
      }).join(''));
      if (frame >= total) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [start, text]);
  return out;
};

const useCountUp = (target, { decimals = 0, duration = 1500, start = false } = {}) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, t0;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min(1, (ts - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val.toFixed(decimals);
};

const MetricVal = ({ m, start }) => {
  const val = useCountUp(m.v, { decimals: m.d, start });
  return <span className="svc-metric-val">{m.p}{val}{m.s}</span>;
};

/* ============================================================
   ICONS
============================================================ */
const I = {
  logo: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 6v14M9 3v20M17 3v20M22 6v14M9 13h8" /></svg>
  ),
  arrow: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
  ),
  close: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
  ),
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
  ),
  grid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
  ),
  bolt: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  flame: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4.4 0 7-2.8 7-6.5 0-4.5-4-6-4.5-10.5C12 6.5 9 8 9 11.5c0-1-.8-2.2-1.8-2.7C6.4 10 5 12 5 15.5 5 19.2 7.6 22 12 22z" /></svg>
  ),
  heart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2-6 4 12 2-6h6" /></svg>
  ),
  dumbbell: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 6.5v12M3 9v6M17.5 6.5v12M21 9v6M6.5 12h11" /></svg>
  ),
  mma: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M8 10h8M8 14h8" /></svg>
  ),
  cryo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M4 12h16M4 12l3-3M4 12l3 3M20 12l-3-3M20 12l-3 3" /></svg>
  ),
  speed: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M12 20a8 8 0 1 0-8-8" /><path d="M12 12l4-4" /></svg>
  ),
  timer: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 2h6" /></svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
  ),
  spark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" /></svg>
  ),
  hub: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="9" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg>
  ),
  check: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 10 18.5 20 6.5" /></svg>
  ),
};

/* ============================================================
   STATIC IMAGES
============================================================ */
const IMG = {
  heroBg:    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80',
  vo2:       'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80',
  coaching:  'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=80',
  nutrition: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80',
  combat:    'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1400&q=80',
  recovery:  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80',
};

/* ============================================================
   COMPONENT
============================================================ */
const ServicesCatalog = () => {
  const { t } = useLang();

  const [bootPct, setBootPct] = useState(0);
  const [boot, setBoot] = useState(false);
  const [bootGone, setBootGone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState({});
  const [wave, setWave] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [sent, setSent] = useState(false);
  const [mthStage, setMthStage] = useState(0);

  const sectionRefs = useRef([]);
  const kickText = useDecode(t('svc.kicker'), true);
  const sentText = useDecode(t('svc.conc.sentLog'), sent);

  /* ---------- Translated content arrays (inside component so `t` is in scope) ---------- */
  const BELT_ITEMS = [
    t('svc.belt.biometrics'),
    t('svc.belt.coaching'),
    t('svc.belt.nutrition'),
    t('svc.belt.combat'),
    t('svc.belt.recovery'),
    t('svc.belt.diagnostics'),
    t('svc.belt.open'),
  ];

  const filters = [
    { id: 'all',         label: t('svc.filter.all') },
    { id: 'diagnostics', label: t('svc.filter.diagnostics') },
    { id: 'coaching',    label: t('svc.filter.coaching') },
    { id: 'nutrition',   label: t('svc.filter.nutrition') },
    { id: 'combat',      label: t('svc.filter.combat') },
    { id: 'recovery',    label: t('svc.filter.recovery') },
  ];

  const DOTS = [
    { id: 'hero',    label: t('svc.dot.hero') },
    { id: 'filters', label: t('svc.dot.filters') },
    { id: 'catalog', label: t('svc.dot.catalog') },
    { id: 'method',  label: t('svc.dot.method') },
    { id: 'cta',     label: t('svc.dot.cta') },
  ];

  const metrics = [
    { v: 99.4, d: 1, p: '',      s: '%',  l: t('svc.metric.accuracy'), icon: I.heart },
    { v: 24,   d: 0, p: '< ',    s: ' HR', l: t('svc.metric.sync'),    icon: I.timer },
    { v: 110,  d: 0, p: '−',     s: '°C', l: t('svc.metric.cryo'),     icon: I.cryo },
    { v: 24,   d: 0, p: 'LIVE ', s: '/7', l: t('svc.metric.feedback'), icon: I.speed },
  ];

  const services = [
    {
      id: 1, category: 'diagnostics',
      labLabel: t('svc.card1.lab'), labName: 'KORTEX-V5', labMeta: t('svc.card1.meta'),
      tag: t('svc.card1.tag'), title: t('svc.card1.title'),
      price: '$120', per: t('svc.card1.per'),
      duration: t('svc.card1.duration'), durationIcon: I.timer, ctaIcon: I.calendar, cta: t('svc.card1.cta'),
      desc: t('svc.card1.desc'),
      tags: [t('svc.card1.tag1'), t('svc.card1.tag2'), t('svc.card1.tag3')],
      img: IMG.vo2,
    },
    {
      id: 2, category: 'coaching',
      labLabel: t('svc.card2.lab'), labName: 'RPE-9 MATRIX', labMeta: t('svc.card2.meta'),
      tag: t('svc.card2.tag'), title: t('svc.card2.title'),
      price: '$160', per: t('svc.card2.per'),
      duration: t('svc.card2.duration'), durationIcon: I.dumbbell, ctaIcon: I.arrow, cta: t('svc.card2.cta'),
      desc: t('svc.card2.desc'),
      tags: [t('svc.card2.tag1'), t('svc.card2.tag2'), t('svc.card2.tag3')],
      img: IMG.coaching,
    },
    {
      id: 3, category: 'nutrition',
      labLabel: t('svc.card3.lab'), labName: 'DEXA 360', labMeta: t('svc.card3.meta'),
      tag: t('svc.card3.tag'), title: t('svc.card3.title'),
      price: '$95', per: t('svc.card3.per'),
      duration: t('svc.card3.duration'), durationIcon: I.hub, ctaIcon: I.arrow, cta: t('svc.card3.cta'),
      desc: t('svc.card3.desc'),
      tags: [t('svc.card3.tag1'), t('svc.card3.tag2'), t('svc.card3.tag3')],
      img: IMG.nutrition,
    },
    {
      id: 4, category: 'combat',
      labLabel: t('svc.card4.lab'), labName: '650 PSI PEAK', labMeta: t('svc.card4.meta'),
      tag: t('svc.card4.tag'), title: t('svc.card4.title'),
      price: '$140', per: t('svc.card4.per'),
      duration: t('svc.card4.duration'), durationIcon: I.mma, ctaIcon: I.mma, cta: t('svc.card4.cta'),
      desc: t('svc.card4.desc'),
      tags: [t('svc.card4.tag1'), t('svc.card4.tag2'), t('svc.card4.tag3')],
      img: IMG.combat,
    },
    {
      id: 5, category: 'recovery',
      labLabel: t('svc.card5.lab'), labName: '4X WASHOUT', labMeta: t('svc.card5.meta'),
      tag: t('svc.card5.tag'), title: t('svc.card5.title'),
      price: '$85', per: t('svc.card5.per'),
      duration: t('svc.card5.duration'), durationIcon: I.cryo, ctaIcon: I.cryo, cta: t('svc.card5.cta'),
      desc: t('svc.card5.desc'),
      tags: [t('svc.card5.tag1'), t('svc.card5.tag2'), t('svc.card5.tag3')],
      img: IMG.recovery,
    },
  ];

  const sideTelemetry = [
    { l: t('svc.tel.lactate'), v: '3.8 mmol/L' },
    { l: t('svc.tel.maxO2'),   v: '58.4 ml/kg' },
    { l: t('svc.tel.chamber'), v: t('svc.tel.ready'), hl: true },
  ];

  const METHOD = [
    { n: '01', icon: I.heart,    title: t('svc.method.step1.t'), sub: t('svc.method.step1.s'), desc: t('svc.method.step1.d'), stat: t('svc.method.step1.stat') },
    { n: '02', icon: I.dumbbell, title: t('svc.method.step2.t'), sub: t('svc.method.step2.s'), desc: t('svc.method.step2.d'), stat: t('svc.method.step2.stat') },
    { n: '03', icon: I.hub,      title: t('svc.method.step3.t'), sub: t('svc.method.step3.s'), desc: t('svc.method.step3.d'), stat: t('svc.method.step3.stat') },
    { n: '04', icon: I.cryo,     title: t('svc.method.step4.t'), sub: t('svc.method.step4.s'), desc: t('svc.method.step4.d'), stat: t('svc.method.step4.stat') },
    { n: '05', icon: I.spark,    title: t('svc.method.step5.t'), sub: t('svc.method.step5.s'), desc: t('svc.method.step5.d'), stat: t('svc.method.step5.stat') },
  ];

  /* ---------- Refs ---------- */
  const hdrRef = useRef(null);
  const progRef = useRef(null);
  const heroBgRef = useRef(null);
  const beltRef = useRef(null);
  const topRingRef = useRef(null);
  const streamRef = useRef(null);
  const ghostRef = useRef(null);
  const mthSecRef = useRef(null);
  const mthRingRef = useRef(null);
  const mthLineRef = useRef(null);
  const mthPctRef = useRef(null);
  const mthPanelRef = useRef(null);
  const mthNodesRef = useRef(null);
  const mthIdx = useRef(0);
  const emberRef = useRef(null);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const bootRef = useRef(false);
  const visSeen = useRef({});
  const activeRef = useRef('hero');

  /* Preloader */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let raf, t0;
    const dur = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 10 : 1050;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min(1, (ts - t0) / dur);
      setBootPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => { bootRef.current = true; setBoot(true); }, 180);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!boot) return;
    const t2 = setTimeout(() => {
      setBootGone(true);
      document.body.style.overflow = '';
    }, 950);
    return () => clearTimeout(t2);
  }, [boot]);

  /* IntersectionObserver reveals */
  useEffect(() => {
    if (!boot) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const key = e.target.dataset.section;
          if (key) visSeen.current[key] = true;
          setIsVisible((p) => (p[key] ? p : { ...p, [key]: true }));
        }
      }),
      { threshold: 0.12 }
    );
    sectionRefs.current.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, [boot]);

  /* Re-stagger cards whenever filter/search changes */
  useEffect(() => {
    if (!boot) return;
    setWave(false);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setWave(true)));
    return () => cancelAnimationFrame(id);
  }, [activeFilter, searchQuery, boot]);

  /* MASTER rAF — scroll engine */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onMove = (e) => { cursorTarget.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    let lastY = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const dh = document.documentElement.scrollHeight - vh;
      const vel = y - lastY;
      lastY = y;

      hdrRef.current?.classList.toggle('is-scrolled', y > 10);
      if (progRef.current && dh > 0) progRef.current.style.transform = `scaleX(${Math.min(1, y / dh)})`;

      if (bootRef.current) {
        sectionRefs.current.forEach((el) => {
          if (!el) return;
          const key = el.dataset.section;
          if (!key || visSeen.current[key]) return;
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.92 && r.bottom > 0) {
            visSeen.current[key] = true;
            setIsVisible((p) => (p[key] ? p : { ...p, [key]: true }));
          }
        });
      }

      let cur = 'hero';
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.5) cur = el.dataset.section;
      });
      if (activeRef.current !== cur) { activeRef.current = cur; setActiveSection(cur); }

      if (!reduced) {
        if (heroBgRef.current) heroBgRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
        if (beltRef.current) {
          const sk = Math.max(-6, Math.min(6, vel * 0.25));
          beltRef.current.style.transform = `translate3d(${-y * 0.3}px, 0, 0) skewX(${sk}deg)`;
        }

        if (ghostRef.current && sectionRefs.current[2]) {
          const r = sectionRefs.current[2].getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
          ghostRef.current.style.transform = `translate3d(${(0.5 - p) * 300}px, ${p * -50}px, 0)`;
        }

        if (streamRef.current) {
          const reads = [];
          streamRef.current.querySelectorAll('.svc-media').forEach((host) => {
            const r = host.getBoundingClientRect();
            if (r.bottom > -80 && r.top < vh + 80) reads.push([host, r]);
          });
          reads.forEach(([host, r]) => {
            const p = (r.top + r.height / 2 - vh / 2) / vh;
            const img = host.querySelector('img');
            if (img) img.style.setProperty('--py', `${(-p * 6).toFixed(2)}%`);
          });
        }
      }

      if (mthSecRef.current) {
        const r = mthSecRef.current.getBoundingClientRect();
        if (r.bottom > -100 && r.top < vh + 100) {
          const total = r.height - vh;
          const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;

          if (mthRingRef.current) mthRingRef.current.style.strokeDashoffset = String(1 - p);
          if (mthLineRef.current) mthLineRef.current.style.transform = `scaleY(${p.toFixed(4)})`;
          if (mthPctRef.current) {
            const txt = String(Math.round(p * 100)).padStart(3, '0');
            if (mthPctRef.current.textContent !== txt) mthPctRef.current.textContent = txt;
          }

          const steps = mthSecRef.current.querySelectorAll('.mth-step');
          if (!reduced) {
            if (mthNodesRef.current) {
              mthNodesRef.current.setAttribute(
                'transform', `rotate(${(-p * 288).toFixed(2)} 160 160)`);
            }
            if (mthPanelRef.current) {
              mthPanelRef.current.style.transform =
                `translate3d(0, ${((0.5 - p) * 50).toFixed(1)}px, 0)`;
            }
          }
          let best = 0, bd = Infinity;
          steps.forEach((s, i) => {
            const sr = s.getBoundingClientRect();
            const d = Math.abs(sr.top + sr.height / 2 - vh * 0.5);
            if (d < bd) { bd = d; best = i; }
          });
          if (best !== mthIdx.current) { mthIdx.current = best; setMthStage(best); }
        }
      }

      if (topRingRef.current && dh > 0) {
        topRingRef.current.style.strokeDashoffset = String(138.23 * (1 - Math.min(1, y / dh)));
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  /* Card tilt + spotlight */
  useEffect(() => {
    const el = streamRef.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e) => {
      const card = e.target.closest('.svc-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      card.style.setProperty('--rx', `${(0.5 - py) * 3.4}deg`);
      card.style.setProperty('--ry', `${(px - 0.5) * 3.4}deg`);
    };
    const onLeave = (e) => {
      const card = e.target.closest('.svc-card');
      if (!card) return;
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* Magnetic buttons */
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll('.btn, .svc-cta, .svc-concierge-cta'));
    const cleanups = els.map((el) => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.translate = `${dx * 0.14}px ${dy * 0.24}px`;
      };
      const onLeave = () => { el.style.translate = ''; };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, [bootGone, activeFilter, searchQuery]);

  /* Ember canvas */
  useEffect(() => {
    const cvs = emberRef.current;
    if (!cvs) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = cvs.getContext('2d');
    let raf = 0, running = false, w = 0, h = 0;
    let lastY = window.scrollY, vel = 0;

    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 64;
    const s = sprite.getContext('2d');
    const sg = s.createRadialGradient(32, 32, 0, 32, 32, 32);
    sg.addColorStop(0, 'rgba(255,150,110,1)');
    sg.addColorStop(0.28, 'rgba(229,25,55,0.9)');
    sg.addColorStop(1, 'rgba(229,25,55,0)');
    s.fillStyle = sg;
    s.fillRect(0, 0, 64, 64);

    const parts = [];
    const target = () => Math.min(90, Math.round((w * h) / 16000));
    const spawn = (init) => ({
      x: Math.random() * w,
      y: init ? Math.random() * h : h + 12,
      r: 0.5 + Math.random() * 2.1,
      vy: 0.25 + Math.random() * 0.85,
      vx: (Math.random() - 0.5) * 0.28,
      a: 0.2 + Math.random() * 0.55,
      tw: Math.random() * Math.PI * 2,
      ts: 0.012 + Math.random() * 0.03,
    });

    const resize = () => {
      const r = cvs.parentElement.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      cvs.width = w * dpr; cvs.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      while (parts.length > target()) parts.pop();
      while (parts.length < target()) parts.push(spawn(true));
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      vel = Math.min(34, Math.abs(window.scrollY - lastY));
      lastY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      vel *= 0.94;
      const box = cvs.getBoundingClientRect();
      const mx = cursorTarget.current.x - box.left;
      const my = cursorTarget.current.y - box.top;

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.y -= p.vy + vel * 0.13;
        p.x += p.vx + Math.sin(p.tw) * 0.16;
        p.tw += p.ts;

        const dx = p.x - mx, dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 12300) {
          const d = Math.sqrt(d2) || 1;
          p.x += (dx / d) * 0.9;
          p.y += (dy / d) * 0.55;
        }

        if (p.y < -14 || p.x < -14 || p.x > w + 14) { parts[i] = spawn(false); continue; }

        const flick = 0.55 + Math.sin(p.tw * 3.1) * 0.45;
        ctx.globalAlpha = p.a * flick;
        const sz = p.r * 7;
        ctx.drawImage(sprite, p.x - sz / 2, p.y - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(draw); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    }, { rootMargin: '120px' });
    io.observe(cvs);

    return () => {
      io.disconnect();
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* Custom cursor */
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dot = document.querySelector('.cur-dot');
    const ring = document.querySelector('.cur-ring');
    if (!dot || !ring) return;
    const rp = { x: innerWidth / 2, y: innerHeight / 2 };
    let raf;
    const loop = () => {
      rp.x += (cursorTarget.current.x - rp.x) * 0.16;
      rp.y += (cursorTarget.current.y - rp.y) * 0.16;
      dot.style.transform = `translate(${cursorTarget.current.x}px, ${cursorTarget.current.y}px)`;
      ring.style.transform = `translate(${rp.x}px, ${rp.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const over = (e) => {
      const hit = e.target.closest('a, button, input, select, .svc-card');
      ring.classList.toggle('big', !!hit);
      dot.classList.toggle('big', !!hit);
    };
    window.addEventListener('mouseover', over, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mouseover', over); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  const filteredServices = services.filter((s) => {
    const cat = activeFilter === 'all' || s.category === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const search = q === '' ||
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.tags.some((tag) => tag.toLowerCase().includes(q));
    return cat && search;
  });

  const jumpTo = (id) => {
    document.querySelector(`[data-section="${id}"]`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`sg ${menuOpen ? 'menu-open' : ''}`}>
      <div className="rails" aria-hidden="true"><i /><i /></div>
      <span className="cur-dot" aria-hidden="true" />
      <span className="cur-ring" aria-hidden="true" />

      {!bootGone && (
        <div className={`boot ${boot ? 'is-done' : ''}`} aria-hidden="true">
          <div className="boot-in">
            <span className="boot-mark">SMART<em>GYM</em></span>
            <span className="boot-count">{bootPct}<i>%</i></span>
            <span className="boot-bar"><i style={{ transform: `scaleX(${bootPct / 100})` }} /></span>
            <span className="boot-label">{t('boot.label')}</span>
          </div>
        </div>
      )}

      {/* SECTION DOTS */}
      <nav className="svc-dots" aria-label="Page sections">
        {DOTS.map((d) => (
          <button
            key={d.id}
            className={`svc-dot ${activeSection === d.id ? 'on' : ''}`}
            onClick={() => jumpTo(d.id)}
            aria-label={d.label}
          ><i>{d.label}</i></button>
        ))}
      </nav>

      {/* HEADER */}
      <header className="hdr" ref={hdrRef}>
        <div className="hdr-in">
          <Link className="brand" to="/" aria-label="Smart Gym home">
            <span className="brand-mark">{I.logo(16)}</span>
            <span className="brand-txt">SMART<em>GYM</em></span>
          </Link>

          <nav className="hdr-nav">
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/facilities">{t('nav.facilities')}</Link>
            <Link to="/services" className="on">{t('nav.services')}</Link>
            <Link to="/join">{t('nav.membership')}</Link>
            <Link to="/insights">{t('nav.insights')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
          </nav>

          <div className="hdr-actions">
            <LangSwitch variant="header" />
            <Link to="/join" className="btn btn-red hdr-join">{t('nav.joinNow')}</Link>
            <button
              className={`burger ${menuOpen ? 'x' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu" aria-expanded={menuOpen}
            ><i /><i /><i /></button>
          </div>
        </div>
        <span className="hdr-prog" ref={progRef} aria-hidden="true" />
      </header>

      <div className={`mnav ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav>
          <Link to="/" style={{ '--d': '0.06s' }} onClick={() => setMenuOpen(false)}><span>01</span>{t('nav.home')}</Link>
          <Link to="/facilities" style={{ '--d': '0.11s' }} onClick={() => setMenuOpen(false)}><span>02</span>{t('nav.facilities')}</Link>
          <Link to="/services" style={{ '--d': '0.16s' }} onClick={() => setMenuOpen(false)}><span>03</span>{t('nav.services')}</Link>
          <Link to="/join" style={{ '--d': '0.21s' }} onClick={() => setMenuOpen(false)}><span>04</span>{t('nav.membership')}</Link>
          <Link to="/insights" style={{ '--d': '0.26s' }} onClick={() => setMenuOpen(false)}><span>05</span>{t('nav.insights')}</Link>
          <Link to="/contact" style={{ '--d': '0.31s' }} onClick={() => setMenuOpen(false)}><span>06</span>{t('nav.contact')}</Link>
        </nav>
        <LangSwitch variant="mobile" />
        <Link to="/join" className="btn btn-red mnav-join" onClick={() => setMenuOpen(false)}>
          {t('nav.joinNow')} {I.arrow(11)}
        </Link>
        <span className="mnav-foot">{t('nav.foot')}</span>
      </div>

      {/* HERO */}
      <section data-section="hero" ref={(el) => (sectionRefs.current[0] = el)}
        className={`svc-hero ${isVisible.hero ? 'is-in' : ''}`}>

        <div className="svc-hero-bg" ref={heroBgRef}>
          <img src={IMG.heroBg} alt="Performance lab" />
        </div>
        <div className="svc-hero-shade" />
        <div className="hero-cols" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="svc-radar" aria-hidden="true">
          <span className="svc-radar-sweep" />
          <i className="svc-radar-ring" /><i className="svc-radar-ring r2" />
          <span className="svc-radar-blip b1" />
          <span className="svc-radar-blip b2" />
          <span className="svc-radar-blip b3" />
        </div>

        <div className="svc-scrollcue" aria-hidden="true">
          <span className="svc-scrollcue-line" />
          <span className="svc-scrollcue-label">{t('svc.scroll')}</span>
        </div>

        <div className="svc-hero-body">
          <div className="svc-hero-left">
            <div className="kicker"><i /><span>{kickText}</span></div>

            <h1 className="svc-h1">
              <span className="row">
                <span className="w" style={{ transitionDelay: '.3s' }}>{t('svc.hero.line1')}</span>
              </span>
              <span className="row">
                <span className="w" style={{ transitionDelay: '.42s' }}>{t('svc.hero.line2')}</span>
              </span>
              <span className="row">
                <span className="w red" style={{ transitionDelay: '.55s' }}>{t('svc.hero.line3')}</span>
                <span className="w ghost" style={{ transitionDelay: '.65s' }}>{t('svc.hero.line4')}</span>
              </span>
            </h1>

            <p className="lede">{t('svc.hero.lede')}</p>
          </div>
        </div>

        <div className="svc-metrics">
          {metrics.map((m, i) => (
            <div className="svc-metric" key={m.l} style={{ '--i': i }}>
              <div className="svc-metric-head">
                <span className="svc-metric-ico">{m.icon}</span>
                <span className="svc-metric-lab">{m.l}</span>
              </div>
              <MetricVal m={m} start={isVisible.hero} />
            </div>
          ))}
        </div>

        <div className="belt" aria-hidden="true">
          <div className="belt-shift" ref={beltRef}>
            <div className="belt-track">
              {[0, 1].map((h) => (
                <div className="belt-half" key={h}>
                  {[...BELT_ITEMS, ...BELT_ITEMS].map((tag, i) => <span key={i}>{tag}<em>✦</em></span>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section data-section="filters" ref={(el) => (sectionRefs.current[1] = el)}
        className={`svc-filterbar ${isVisible.filters ? 'is-in' : ''}`}>
        <div className="svc-filterbar-inner">
          <div className="svc-chips">
            {filters.map((f, i) => (
              <button key={f.id} style={{ '--i': i }}
                className={`fchip ${activeFilter === f.id ? 'on' : ''}`}
                onClick={() => setActiveFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>

          <div className="svc-filterbar-right">
            <span className="svc-count" aria-live="polite">
              <b key={filteredServices.length}>{String(filteredServices.length).padStart(2, '0')}</b>
              {t('svc.count.online', { total: String(services.length).padStart(2, '0') })}
            </span>

            <label className="search svc-search">
              {I.search}
              <input
                placeholder={t('svc.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button type="button" className="svc-search-clear"
                  onClick={() => setSearchQuery('')} aria-label="Clear search"
                >{I.close}</button>
              )}
            </label>
          </div>
        </div>
      </section>

      {/* CATALOG + RIGHT RAIL */}
      <section data-section="catalog" ref={(el) => (sectionRefs.current[2] = el)}
        className={`svc-catalog ${isVisible.catalog ? 'is-in' : ''}`}>

        <div className="svc-ghostwrap" aria-hidden="true">
          <span className="svc-ghost" ref={ghostRef}>{t('svc.ghost')}</span>
        </div>

        <div className="svc-catalog-grid">

          <div ref={streamRef}
            className={`svc-stream ${isVisible.catalog && wave ? 'is-in' : ''}`}>
            {filteredServices.map((s, i) => (
              <article className="svc-card" key={s.id} style={{ '--i': i }}>
                <span className="svc-card-topline" />
                <div className="svc-card-in">

                  <div className="svc-media">
                    <img src={s.img} alt={s.title} loading="lazy" />
                    <div className="svc-media-shade" />
                    <span className="svc-lab-badge">{s.labLabel}</span>
                    <div className="svc-media-foot">
                      <span className="svc-media-meta">{s.labMeta}</span>
                      <span className="svc-media-name">{s.labName}</span>
                    </div>
                  </div>

                  <div className="svc-body">
                    <div className="svc-body-head">
                      <span className="svc-tag">{s.tag}</span>
                      <div className="svc-price">
                        <b>{s.price}</b>
                        <em>{s.per}</em>
                      </div>
                    </div>

                    <h3 className="svc-title">{s.title}</h3>
                    <p className="svc-desc">{s.desc}</p>

                    <div className="svc-tags">
                      {s.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>

                    <div className="svc-actions">
                      <span className="svc-duration">
                        <span className="svc-dur-ico">{s.durationIcon}</span>
                        {s.duration}
                      </span>
                      <button className="btn btn-red btn-sm svc-cta">
                        {s.ctaIcon} {s.cta}
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            ))}

            {filteredServices.length === 0 && (
              <div className="svc-empty">
                <div className="svc-empty-ico">{I.search}</div>
                <h3>{t('svc.empty.title')}</h3>
                <p>{t('svc.empty.desc')}</p>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                >{t('svc.empty.reset')}</button>
              </div>
            )}
          </div>

          <aside className="svc-rail">

            <div className="svc-side svc-side-emblem">
              <span className="svc-side-glow" aria-hidden="true" />
              <div className="svc-side-head">
                <span className="svc-side-mark">{I.logo(20)}</span>
                <div>
                  <div className="svc-side-label">{t('svc.rail.certified')}</div>
                  <div className="svc-side-title">{t('svc.rail.industrial')}</div>
                </div>
              </div>
              <p className="svc-side-desc">{t('svc.rail.desc')}</p>
              <div className="svc-queue">
                <div className="svc-queue-head">
                  <span>{t('svc.rail.queueLabel')}</span>
                  <b>{t('svc.rail.queueVal')}</b>
                </div>
                <div className="svc-queue-bar"><i style={{ '--qw': '85%' }} /></div>
                <div className="svc-queue-foot">
                  <span>{t('svc.rail.capacity')}</span>
                  <span>{t('svc.rail.campus')}</span>
                </div>
              </div>
            </div>

            <div className="svc-side svc-side-telemetry">
              <div className="svc-side-head-row">
                <span className="svc-side-title-sm">{t('svc.tel.title')}</span>
                <span className="svc-side-ico">{I.hub}</span>
              </div>

              <div className="svc-chart">
                <div className="svc-chart-head">
                  <span>{t('svc.tel.output')}</span>
                  <span className="svc-chart-hl">{t('svc.tel.peak')}</span>
                </div>
                <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="svc-chart-svg">
                  <defs>
                    <linearGradient id="svcArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#e51937" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#e51937" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path className="svc-chart-fill"
                    d="M0,60 L30,55 L60,65 L90,40 L120,50 L150,20 L180,35 L210,15 L240,45 L270,10 L300,30 L300,80 L0,80 Z"
                    fill="url(#svcArea)"
                  />
                  <path className="svc-chart-line" pathLength="1"
                    d="M0,60 L30,55 L60,65 L90,40 L120,50 L150,20 L180,35 L210,15 L240,45 L270,10 L300,30"
                    fill="none" stroke="#e51937" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
                <div className="svc-chart-foot">
                  <span>T-00:00</span><span>T-25:00</span><span>T-50:00</span>
                </div>
              </div>

              <div className="svc-ecg" aria-hidden="true">
                <svg viewBox="0 0 200 40" preserveAspectRatio="none">
                  <path className="svc-ecg-path" pathLength="350"
                    d="M0 20 H30 L38 20 44 6 50 34 56 20 H90 L98 20 104 6 110 34 116 20 H150 L158 20 164 8 170 32 176 20 H200" />
                </svg>
                <span className="svc-ecg-tag"><i className="svc-ecg-dot" />{t('svc.tel.live')}</span>
              </div>

              <div className="svc-tel-rows">
                {sideTelemetry.map((r) => (
                  <div className="svc-tel-row" key={r.l}>
                    <span>{r.l}</span>
                    <b className={r.hl ? 'hl' : ''}>{r.v}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="svc-side svc-side-concierge">
              <h4 className="svc-concierge-title">{t('svc.conc.title')}</h4>
              <p className="svc-concierge-desc">{t('svc.conc.desc')}</p>
              <form className="svc-concierge-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <label>
                  <span>{t('svc.conc.goal')}</span>
                  <div className="svc-select">
                    <select defaultValue="force" disabled={sent}>
                      <option value="force">{t('svc.conc.goal1')}</option>
                      <option value="cardio">{t('svc.conc.goal2')}</option>
                      <option value="combat">{t('svc.conc.goal3')}</option>
                      <option value="rehab">{t('svc.conc.goal4')}</option>
                    </select>
                    <span className="svc-select-arrow">▾</span>
                  </div>
                </label>
                <label>
                  <span>{t('svc.conc.email')}</span>
                  <input type="email" required placeholder={t('svc.conc.emailPh')} disabled={sent} />
                </label>
                <button type="submit" className="svc-concierge-cta" disabled={sent}>
                  {sent ? <>{I.check} {t('svc.conc.sent')}</> : t('svc.conc.submit')}
                </button>
                {sent && <div className="svc-sent">{sentText}</div>}
              </form>
            </div>

          </aside>
        </div>
      </section>

      {/* METHOD */}
      <section data-section="method"
        ref={(el) => { sectionRefs.current[3] = el; mthSecRef.current = el; }}
        className={`mth ${isVisible.method ? 'is-in' : ''}`}>
        <div className="mth-grid">

          <div className="mth-panel">
            <div className="mth-dialcol" ref={mthPanelRef}>
              <div className="kicker"><i /><span>{t('svc.method.kicker')}</span></div>

              <div className="mth-dial">
                <svg viewBox="0 0 320 320" className="mth-svg" aria-hidden="true">
                  <circle className="mth-dial-track" cx="160" cy="160" r="128" />
                  <circle className="mth-dial-spin" cx="160" cy="160" r="146" />
                  <circle className="mth-dial-prog" ref={mthRingRef}
                    cx="160" cy="160" r="128" pathLength="1"
                    strokeDasharray="1" strokeDashoffset="1" />
                  <g ref={mthNodesRef}>
                    {METHOD.map((m, i) => {
                      const a = ((-90 + i * 72) * Math.PI) / 180;
                      const cx = 160 + 128 * Math.cos(a);
                      const cy = 160 + 128 * Math.sin(a);
                      return (
                        <g key={m.n} className={`mth-node ${i === mthStage ? 'on' : ''}`}>
                          <circle className="mth-node-halo" cx={cx} cy={cy} r="14" />
                          <circle className="mth-node-dot" cx={cx} cy={cy} r="5" />
                        </g>
                      );
                    })}
                  </g>
                </svg>
                <div className="mth-dial-center" key={mthStage}>
                  <span className="mth-dial-num">{METHOD[mthStage].n}</span>
                  <span className="mth-dial-name">{METHOD[mthStage].title}</span>
                </div>
              </div>

              <div className="mth-readout">
                <span>{t('svc.method.readout')}</span>
                <b><i ref={mthPctRef}>000</i>%</b>
              </div>
            </div>
          </div>

          <div className="mth-steps">
            <span className="mth-line" aria-hidden="true"><i ref={mthLineRef} /></span>

            {METHOD.map((m, i) => (
              <article key={m.n}
                className={`mth-step ${i === mthStage ? 'on' : ''}`}
                style={{ '--i': i }}>
                <span className="mth-step-node">{m.n}</span>
                <div className="mth-card">
                  <span className="mth-card-ico">{m.icon}</span>
                  <span className="mth-card-sub">{m.sub}</span>
                  <h3 className="mth-card-title">{m.title}</h3>
                  <p className="mth-card-desc">{m.desc}</p>
                  <span className="mth-card-stat">{m.stat}</span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section id="join" data-section="cta" ref={(el) => (sectionRefs.current[4] = el)}
        className={`cta ${isVisible.cta ? 'is-in' : ''}`}>
        <span className="cta-ghost" aria-hidden="true">SMARTGYM</span>
        <canvas className="ember-canvas" ref={emberRef} aria-hidden="true" />
        <div className="cta-in">
          <span className="cta-eyebrow"><i />{t('svc.cta.eyebrow')}</span>
          <h2>{t('svc.cta.h2a')}<br /><em>{t('svc.cta.h2b')}</em></h2>
          <p>{t('svc.cta.desc')}</p>
          <button className="btn btn-red btn-lg cta-btn">{t('svc.cta.btn')} {I.arrow()}</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot" id="contact">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="brand" to="/">
              <span className="brand-mark">{I.logo(16)}</span>
              <span className="brand-txt">SMART<em>GYM</em></span>
            </Link>
            <p>{t('foot.desc')}</p>
            <span className="foot-live"><i className="ok-dot" />{t('foot.live')}</span>
          </div>
          <div>
            <h4>{t('foot.architecture')}</h4>
            <ul>
              <li>{t('foot.iron')}</li>
              <li>{t('foot.sprint')}</li>
              <li>{t('foot.cryo')}</li>
              <li>{t('foot.metabolic')}</li>
            </ul>
          </div>
          <div>
            <h4>{t('foot.platform')}</h4>
            <ul>
              <li>{t('foot.coaching')}</li>
              <li>{t('foot.bioapp')}</li>
              <li>{t('foot.corporate')}</li>
              <li>{t('foot.portal')}</li>
            </ul>
          </div>
          <div>
            <h4>{t('foot.operations')}</h4>
            <p className="foot-p">{t('foot.hours')}<br />{t('foot.access')}</p>
            <span className="foot-hq">{t('foot.hq')}</span>
            <p className="foot-p">{t('foot.address')}</p>
          </div>
        </div>

        <div className="foot-ghost" aria-hidden="true">SMARTGYM</div>

        <div className="foot-bottom">
          <p>{t('foot.rights')}</p>
          <div className="foot-legal">
            <span>{t('foot.privacy')}</span>
            <span>{t('foot.terms')}</span>
            <span>{t('foot.security')}</span>
          </div>
          <button className="totop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
            <svg width="46" height="46" viewBox="0 0 46 46">
              <circle className="rb" cx="23" cy="23" r="22" />
              <circle className="rf" ref={topRingRef} cx="23" cy="23" r="22" />
              <path d="M23 30V17M23 17l-5 5M23 17l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </div>
      </footer>

      <nav className="tabbar" aria-label="Quick navigation">
        <Link to="/">{I.home}<span>{t('nav.home')}</span></Link>
        <Link to="/facilities">{I.grid}<span>{t('nav.facilities')}</span></Link>
        <Link to="/services" className="on">{I.bolt}<span>{t('nav.services')}</span></Link>
        <Link to="/join" className="tab-join">{I.flame}<span>{t('nav.joinNow')}</span></Link>
      </nav>
    </div>
  );
};

export default ServicesCatalog;
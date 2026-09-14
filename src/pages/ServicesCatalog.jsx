// pages/ServicesCatalog.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ServicesCatalog.css';

/* ============================================================
   MOTION HELPERS
============================================================ */
const useDecode = (text, start) => {
  const [out, setOut] = useState(text);
  useEffect(() => {
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

/* Count-up on reveal */
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
   CONTENT
============================================================ */
const BELT_ITEMS = ['BIOMETRICS', 'COACHING', 'NUTRITION', 'COMBAT', 'RECOVERY', 'DIAGNOSTICS', 'OPEN 24/7'];

const DOTS = [
  { id: 'hero', label: 'APEX' },
  { id: 'filters', label: 'FILTER' },
  { id: 'catalog', label: 'PROTOCOLS' },
  { id: 'method', label: 'METHOD' },
  { id: 'cta', label: 'DEPLOY' },
];

const IMG = {
  heroBg: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80',
  vo2: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80',
  coaching: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=80',
  nutrition: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80',
  combat: 'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1400&q=80',
  recovery: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80',
};

/* Numeric values drive the count-up engine */
const metrics = [
  { v: 99.4, d: 1, p: '', s: '%', l: 'TELEMETRY ACCURACY', icon: I.heart },
  { v: 24, d: 0, p: '< ', s: ' HR', l: 'COACH SYNC WINDOW', icon: I.timer },
  { v: 110, d: 0, p: '−', s: '°C', l: 'CRYO POD FLOOR', icon: I.cryo },
  { v: 24, d: 0, p: 'LIVE ', s: '/7', l: 'BIOMETRIC FEEDBACK', icon: I.speed },
];

const filters = [
  { id: 'all', label: 'ALL SERVICES' },
  { id: 'diagnostics', label: 'BIOMETRIC DIAGNOSTICS' },
  { id: 'coaching', label: 'PERSONAL COACHING' },
  { id: 'nutrition', label: 'NUTRITION ARCHITECTURE' },
  { id: 'combat', label: 'COMBAT CONDITIONING' },
  { id: 'recovery', label: 'RECOVERY THERAPY' },
];

const services = [
  {
    id: 1, category: 'diagnostics', labLabel: 'LAB PROTOCOL 01', labName: 'KORTEX-V5', labMeta: 'TELEMETRY',
    tag: 'BIOMETRIC DIAGNOSTICS', title: 'VO2 Max & Metabolic Testing', price: '$120', per: '/ SESSION',
    duration: '60 MIN LAB PROFILE', durationIcon: I.timer, ctaIcon: I.calendar, cta: 'BOOK DIAGNOSTIC',
    desc: 'Determine exact respiratory exchange ratios, lactate turnaround zones, and maximum aerobic output with hospital-grade gas analysis. Includes targeted wattage calibrations and pulse-wave speed profiling.',
    tags: ['Biometrics', 'Anaerobic Threshold', 'Heart Rate Zones'], img: IMG.vo2,
  },
  {
    id: 2, category: 'coaching', labLabel: 'STRENGTH UNIT 02', labName: 'RPE-9 MATRIX', labMeta: 'FRAMEWORK',
    tag: 'PERSONAL COACHING', title: '1-on-1 Elite Strength Coaching', price: '$160', per: '/ SESSION',
    duration: 'CSCS CERTIFIED STAFF', durationIcon: I.dumbbell, ctaIcon: I.arrow, cta: 'MATCH WITH COACH',
    desc: 'Direct barbell mastery engineered around your anthropometry. Velocity-based training (VBT) with transducer telemetry, neural recovery checks, and periodized microcycles designed for maximal neuromuscular adaptation.',
    tags: ['Biomechanics', 'Hypertrophy', 'Periodization'], img: IMG.coaching,
  },
  {
    id: 3, category: 'nutrition', labLabel: 'NUTRITION SYNC 03', labName: 'DEXA 360', labMeta: 'ASSESSMENT',
    tag: 'NUTRITION ARCHITECTURE', title: 'Precision Nutrition & Macro Tracking', price: '$95', per: '/ BI-WEEKLY',
    duration: 'APP INTEGRATED', durationIcon: I.hub, ctaIcon: I.arrow, cta: 'START NUTRITION PLAN',
    desc: 'Hyper-calibrated nutrition planning synchronized with your training loads and DEXA lean mass benchmarks. Dynamic carb-cycling protocols, glycogen optimization, and continuous biofeedback audits.',
    tags: ['Macro Architecture', 'DEXA Sync', 'Weekly Plan'], img: IMG.nutrition,
  },
  {
    id: 4, category: 'combat', labLabel: 'COMBAT DOJO 04', labName: '650 PSI PEAK', labMeta: 'IMPACT RATE',
    tag: 'COMBAT CONDITIONING', title: 'High-Performance Combat & Striking', price: '$140', per: '/ SESSION',
    duration: 'ELEVATED OCTAGON ACCESS', durationIcon: I.mma, ctaIcon: I.mma, cta: 'RESERVE RING SESSION',
    desc: 'Authentic tactical standup striking, Muay Thai clinch control, and explosive anaerobic burst conditioning. Taught by professional titleholders with custom heart-rate threshold management inside full ring settings.',
    tags: ['Muay Thai', 'Boxing', 'Pro Sparring'], img: IMG.combat,
  },
  {
    id: 5, category: 'recovery', labLabel: 'THERMAL CELL 05', labName: '4X WASHOUT', labMeta: 'REGEN SPEED',
    tag: 'RECOVERY THERAPY', title: 'Contrast Hydrotherapy & Cryo', price: '$85', per: '/ SESSION',
    duration: 'INCLUDES HYDRATION LOUNGE', durationIcon: I.cryo, ctaIcon: I.cryo, cta: 'BOOK RECOVERY',
    desc: 'Accelerate central nervous system recovery through rapid vasodilation and vasoconstriction. Sub-zero whole-body liquid nitrogen chambers combined with full-spectrum infrared saunas and localized pneumatic compression sleeves.',
    tags: ['Cryotherapy', 'Infrared Sauna', 'Lymphatic Drainage'], img: IMG.recovery,
  },
];

const sideTelemetry = [
  { l: 'Lactate Clearance Baseline', v: '3.8 mmol/L' },
  { l: 'Max Oxygen Uptake', v: '58.4 ml/kg' },
  { l: 'Hydrotherapy Chamber', v: 'READY NOW', hl: true },
];

/* ============================================================
   METHOD — the five-stage loop
============================================================ */
const METHOD = [
  {
    n: '01', icon: I.heart, title: 'TEST', sub: 'BIOMETRIC BASELINE',
    desc: 'VO2, DEXA, lactate and force-velocity profiling. We map your engine before we touch a single plate.',
    stat: '12 METRICS CAPTURED',
  },
  {
    n: '02', icon: I.dumbbell, title: 'TRAIN', sub: 'PERIODIZED EXECUTION',
    desc: 'Velocity-based coaching inside microcycles engineered from your baseline. Every rep measured, every session logged.',
    stat: 'VBT + LIVE COACHING',
  },
  {
    n: '03', icon: I.hub, title: 'ANALYZE', sub: 'TELEMETRY AUDIT',
    desc: 'Your biometric feed is audited weekly. Load, recovery and nutrition shift against the data — never guesswork.',
    stat: '< 24 HR COACH SYNC',
  },
  {
    n: '04', icon: I.cryo, title: 'RECOVER', sub: 'REGEN PROTOCOL',
    desc: 'Cryo, contrast hydrotherapy and compression stack to compress CNS recovery so the next block hits harder.',
    stat: '−110°C CHAMBER FLOOR',
  },
  {
    n: '05', icon: I.spark, title: 'REPEAT', sub: 'SUPERCOMPENSATION',
    desc: 'Retest, compare, escalate. The loop compounds — every cycle raises your ceiling higher than the last.',
    stat: 'CEILING ↑ EVERY CYCLE',
  },
];

/* ============================================================
   COMPONENT
============================================================ */
const ServicesCatalog = () => {
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
  const kickText = useDecode('DIAGNOSTIC & CONDITIONING DIVISION // LIVE', true);
  const sentText = useDecode('REQUEST LOGGED — COACH SYNC WINDOW < 24H', sent);

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
    const t = setTimeout(() => {
      setBootGone(true);
      document.body.style.overflow = '';
    }, 950);
    return () => clearTimeout(t);
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

  /* ============================================================
     MASTER rAF — scroll engine
  ============================================================ */
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

      /* Active section for dots nav */
      let cur = 'hero';
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.5) cur = el.dataset.section;
      });
      if (activeRef.current !== cur) { activeRef.current = cur; setActiveSection(cur); }

      if (!reduced) {
        /* Hero parallax + velocity-skewed belt */
        if (heroBgRef.current) heroBgRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
        if (beltRef.current) {
          const sk = Math.max(-6, Math.min(6, vel * 0.25));
          beltRef.current.style.transform = `translate3d(${-y * 0.3}px, 0, 0) skewX(${sk}deg)`;
        }

        /* Ghost word drifting behind catalog */
        if (ghostRef.current && sectionRefs.current[2]) {
          const r = sectionRefs.current[2].getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
          ghostRef.current.style.transform = `translate3d(${(0.5 - p) * 300}px, ${p * -50}px, 0)`;
        }

        /* Parallax inside card media */
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

      /* Method section — ring fill, line fill, active stage */
      if (mthSecRef.current) {
        const r = mthSecRef.current.getBoundingClientRect();
        if (r.bottom > -100 && r.top < vh + 100) {
          const total = r.height - vh;
          const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;

          if (mthRingRef.current) mthRingRef.current.style.strokeDashoffset = String(1 - p);
          if (mthLineRef.current) mthLineRef.current.style.transform = `scaleY(${p.toFixed(4)})`;
          if (mthPctRef.current) {
            const t = String(Math.round(p * 100)).padStart(3, '0');
            if (mthPctRef.current.textContent !== t) mthPctRef.current.textContent = t;
          }

          const steps = mthSecRef.current.querySelectorAll('.mth-step');
          if (!reduced) {
            /* node carousel — active stage rotates to 12 o'clock */
            if (mthNodesRef.current) {
              mthNodesRef.current.setAttribute(
                'transform', `rotate(${(-p * 288).toFixed(2)} 160 160)`);
            }
            /* NOTE: no transform on the sticky dial — that would break the pin */
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

  /* Card tilt + spotlight (delegated, vars-driven) */
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

  /* Ember field behind CTA */
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
      s.tags.some((t) => t.toLowerCase().includes(q));
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
            <span className="boot-label">CALIBRATING TELEMETRY GRID</span>
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
            <Link to="/">Home</Link>
            <Link to="/facilities">Facilities</Link>
            <Link to="/services" className="on">Services</Link>
            <Link to="/#pricing">Membership</Link>
            <Link to="/#telemetry">Insights</Link>
            <Link to="/#contact">Contact</Link>
          </nav>

          <div className="hdr-actions">
            <a href="#join" className="btn btn-red hdr-join">JOIN NOW</a>
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
          <Link to="/" style={{ '--d': '0.06s' }} onClick={() => setMenuOpen(false)}><span>01</span>Home</Link>
          <Link to="/facilities" style={{ '--d': '0.11s' }} onClick={() => setMenuOpen(false)}><span>02</span>Facilities</Link>
          <Link to="/services" style={{ '--d': '0.16s' }} onClick={() => setMenuOpen(false)}><span>03</span>Services</Link>
          <Link to="/#pricing" style={{ '--d': '0.21s' }} onClick={() => setMenuOpen(false)}><span>04</span>Membership</Link>
          <Link to="/#telemetry" style={{ '--d': '0.26s' }} onClick={() => setMenuOpen(false)}><span>05</span>Insights</Link>
          <Link to="/#contact" style={{ '--d': '0.31s' }} onClick={() => setMenuOpen(false)}><span>06</span>Contact</Link>
        </nav>
        <a href="#join" className="btn btn-red mnav-join" onClick={() => setMenuOpen(false)}>
          JOIN NOW {I.arrow(11)}
        </a>
        <span className="mnav-foot">OPEN 24/7 // DISTRICT 01</span>
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
          <span className="svc-scrollcue-label">SCROLL</span>
        </div>

        <div className="svc-hero-body">
          <div className="svc-hero-left">
            <div className="kicker"><i /><span>{kickText}</span></div>

            <h1 className="h1 svc-h1">
              <span className="row">
                <span className="w" style={{ transitionDelay: '.3s' }}>PRECISION</span>
              </span>
              <span className="row">
                <span className="w" style={{ transitionDelay: '.42s' }}>PERFORMANCE</span>
              </span>
              <span className="row">
                <span className="w red" style={{ transitionDelay: '.55s' }}>PROTOCOLS</span>
                <span className="w ghost" style={{ transitionDelay: '.65s' }}>& SERVICES</span>
              </span>
            </h1>

            <p className="lede">
              Engineered for elite powerlifters, hybrid athletes, and uncompromising
              competitors. Deploy advanced metabolic telemetry, periodized force
              protocols, and cellular-grade recovery modules.
            </p>
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
                  {[...BELT_ITEMS, ...BELT_ITEMS].map((t, i) => <span key={i}>{t}<em>✦</em></span>)}
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
              / {String(services.length).padStart(2, '0')} PROTOCOLS ONLINE
            </span>

            <label className="search svc-search">
              {I.search}
              <input
                placeholder="Search protocols…"
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
          <span className="svc-ghost" ref={ghostRef}>PROTOCOLS</span>
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
                      {s.tags.map((t) => <span key={t}>{t}</span>)}
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
                <h3>NO PROTOCOLS FOUND</h3>
                <p>No diagnostics or training services match your search criteria. Try filtering by Biometrics or Coaching.</p>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                >RESET ALL FILTERS</button>
              </div>
            )}
          </div>

          <aside className="svc-rail">

            <div className="svc-side svc-side-emblem">
              <span className="svc-side-glow" aria-hidden="true" />
              <div className="svc-side-head">
                <span className="svc-side-mark">{I.logo(20)}</span>
                <div>
                  <div className="svc-side-label">FACILITY CERTIFIED</div>
                  <div className="svc-side-title">SMART INDUSTRIAL</div>
                </div>
              </div>
              <p className="svc-side-desc">
                All services operate under strictly supervised medical and sports
                science safety standards. Biometrics sync instantly to your Smart Gym
                Mobile ID key.
              </p>
              <div className="svc-queue">
                <div className="svc-queue-head">
                  <span>ACTIVE INTAKE QUEUE</span>
                  <b>4 SLOTS OPEN TODAY</b>
                </div>
                <div className="svc-queue-bar"><i style={{ '--qw': '85%' }} /></div>
                <div className="svc-queue-foot">
                  <span>STATION CAPACITY: 85%</span>
                  <span>DISTRICT 01 CAMPUS</span>
                </div>
              </div>
            </div>

            <div className="svc-side svc-side-telemetry">
              <div className="svc-side-head-row">
                <span className="svc-side-title-sm">LIVE SYSTEM TELEMETRY</span>
                <span className="svc-side-ico">{I.hub}</span>
              </div>

              <div className="svc-chart">
                <div className="svc-chart-head">
                  <span>METABOLIC OUTPUT</span>
                  <span className="svc-chart-hl">184 BPM PEAK</span>
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
                <span className="svc-ecg-tag"><i className="svc-ecg-dot" />LIVE</span>
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
              <h4 className="svc-concierge-title">NEED CUSTOM ARCHITECTURE?</h4>
              <p className="svc-concierge-desc">
                Our Head of Human Performance will build an integrated multi-service
                protocol tailored to your competition schedule.
              </p>
              <form className="svc-concierge-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <label>
                  <span>SELECT PRIMARY GOAL</span>
                  <div className="svc-select">
                    <select defaultValue="force" disabled={sent}>
                      <option value="force">Maximal Force &amp; Hypertrophy</option>
                      <option value="cardio">Cardiovascular Engine &amp; VO2</option>
                      <option value="combat">Combat Striking Velocity</option>
                      <option value="rehab">Injury Rehabilitation &amp; Cryo</option>
                    </select>
                    <span className="svc-select-arrow">▾</span>
                  </div>
                </label>
                <label>
                  <span>ATHLETE IDENTIFIER / EMAIL</span>
                  <input type="email" required placeholder="athlete@domain.com" disabled={sent} />
                </label>
                <button type="submit" className="svc-concierge-cta" disabled={sent}>
                  {sent ? <>{I.check} REQUEST TRANSMITTED</> : 'REQUEST PERFORMANCE AUDIT'}
                </button>
                {sent && <div className="svc-sent">{sentText}</div>}
              </form>
            </div>

          </aside>
        </div>
      </section>

      {/* METHOD — sticky dial left, scrolling stages right */}
      <section data-section="method"
        ref={(el) => { sectionRefs.current[3] = el; mthSecRef.current = el; }}
        className={`mth ${isVisible.method ? 'is-in' : ''}`}>
        <div className="mth-grid">

          {/* Sticky left panel with dial */}
          <div className="mth-panel">
            <div className="mth-dialcol">
              <div className="kicker"><i /><span>THE SMARTGYM METHOD</span></div>

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
                <span>LOOP COMPLETION</span>
                <b><i ref={mthPctRef}>000</i>%</b>
              </div>
            </div>
          </div>

          {/* Scrolling stages on right */}
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
          <span className="cta-eyebrow"><i />READY TO DEPLOY YOUR PROTOCOL?</span>
          <h2>START WITH A<br /><em>BIOMETRIC BASELINE.</em></h2>
          <p>Free 30-minute consultation and metabolic snapshot. If our protocols
            aren't right for you, you walk away owing nothing.</p>
          <button className="btn btn-red btn-lg cta-btn">BOOK FREE CONSULT {I.arrow()}</button>
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
            <p>Strength &amp; conditioning club with biometric telemetry and elite training infrastructure. Built for people who train.</p>
            <span className="foot-live"><i className="ok-dot" />TELEMETRY GRID LIVE</span>
          </div>
          <div>
            <h4>ARCHITECTURE</h4>
            <ul><li>Heavy Iron Arena</li><li>Sprint Velocity Track</li><li>Cryo &amp; Recovery Pods</li><li>Metabolic Testing Lab</li></ul>
          </div>
          <div>
            <h4>PLATFORM</h4>
            <ul><li>Coaching Protocol</li><li>Biometric App Sync</li><li>Corporate High Performance</li><li>Member Portal</li></ul>
          </div>
          <div>
            <h4>OPERATIONS</h4>
            <p className="foot-p">04:00 – 24:00 Daily Operations<br />Access via biometric passcode key.</p>
            <span className="foot-hq">HQ TERMINAL</span>
            <p className="foot-p">District 01, Performance Plaza</p>
          </div>
        </div>

        <div className="foot-ghost" aria-hidden="true">SMARTGYM</div>

        <div className="foot-bottom">
          <p>© 2025 SMART GYM INDUSTRIAL ATHLETICS. ALL RIGHTS RESERVED.</p>
          <div className="foot-legal"><span>Privacy Architecture</span><span>Terms of Conditioning</span><span>Security Protocols</span></div>
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
        <Link to="/">{I.home}<span>HOME</span></Link>
        <Link to="/facilities">{I.grid}<span>FACILITIES</span></Link>
        <Link to="/services" className="on">{I.bolt}<span>SERVICES</span></Link>
        <a href="#join" className="tab-join">{I.flame}<span>JOIN NOW</span></a>
      </nav>
    </div>
  );
};

export default ServicesCatalog;
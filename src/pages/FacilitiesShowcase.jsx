// pages/FacilitiesShowcase.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import LangSwitch from '../i18n/LangSwitch';
import './FacilitiesShowcase.css';

/* ============================================================
   MOTION HELPERS
============================================================ */
const MaskWords = ({ text, step = 70 }) => (
  <>
    {text.split(' ').map((w, i, arr) => (
      <span className="msk" key={i}>
        <span className="msk-w" style={{ transitionDelay: `${0.15 + i * (step / 1000)}s` }}>
          {w}{i < arr.length - 1 ? '\u00A0' : ''}
        </span>
      </span>
    ))}
  </>
);

const Counter = ({ to, active, decimals = 0, duration = 1500 }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return; }
    let raf, t0;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setV(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);
  return <>{decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US')}</>;
};

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
  pool: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M2 18h20M2 6h20M6 12V6M18 12V6" /></svg>
  ),
  mma: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M8 10h8M8 14h8" /></svg>
  ),
  basket: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3v18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></svg>
  ),
  cryo: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M4 12h16M4 12l3-3M4 12l3 3M20 12l-3-3M20 12l-3 3" /></svg>
  ),
  dumbbell: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 6.5v12M3 9v6M17.5 6.5v12M21 9v6M6.5 12h11" /></svg>
  ),
  volleyball: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18M5.6 5.6c4 4 8.8 4 12.8 0M5.6 18.4c4-4 8.8-4 12.8 0" /></svg>
  ),
  hub: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="9" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
  ),
  clock: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
  ),
};

/* ============================================================
   STATIC IMAGE PATHS
============================================================ */
const IMG = {
  heroBg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80',
  pool: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1400&q=80',
  basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=80',
  combat: 'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1400&q=80',
  recovery: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80',
  volleyball: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1400&q=80',
  strength: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80',
};

const SLOT_HOURS = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
const DURATION_KEYS = ['bkm.dur1', 'bkm.dur2', 'bkm.dur3'];

/* ============================================================
   BOOKING DRAWER
============================================================ */
const BookingDrawer = ({ facility, onClose, t }) => {
  const [slot, setSlot] = useState(null);
  const [durKey, setDurKey] = useState('bkm.dur2');
  const [phase, setPhase] = useState('form');
  const [ref] = useState(() => 'SG-' + Math.random().toString(36).slice(2, 7).toUpperCase());
  const panelRef = useRef(null);

  const isFull = (i) => (facility.id * 3 + i) % 4 === 0;

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    panelRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [onClose]);

  useEffect(() => {
    if (phase !== 'sending') return;
    const tid = setTimeout(() => setPhase('done'), 1200);
    return () => clearTimeout(tid);
  }, [phase]);

  return (
    <div className="bkm" role="dialog" aria-modal="true"
      aria-label={`${t('bkm.book')} ${facility.title}`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bkm-panel" ref={panelRef} tabIndex={-1}>
        <button className="bkm-x" onClick={onClose} aria-label={t('bkm.close')}>×</button>

        {phase === 'done' ? (
          <div className="bkm-done">
            <svg className="bkm-check" viewBox="0 0 52 52" aria-hidden="true">
              <circle cx="26" cy="26" r="24" fill="none" />
              <path fill="none" d="M14 27l8 8 16-16" />
            </svg>
            <h3>{t('bkm.confirmed')}</h3>
            <p className="bkm-done-sum">{facility.title} · {slot} · {t(durKey)}</p>
            <span className="bkm-ref">{t('bkm.ref')} {ref}</span>
            <p className="bkm-note">{t('bkm.note')}</p>
            <button className="btn btn-red" onClick={onClose}>{t('bkm.done')} {I.arrow(11)}</button>
          </div>
        ) : (
          <>
            <div className="bkm-head">
              <em className="fc-tag">{facility.tag}</em>
              <h3>{facility.title}</h3>
              <span className={`fc-status ${facility.statusCls}`}>
                <i />{t('bkm.status')} {facility.status}
              </span>
            </div>

            <div className="bkm-sec">
              <span className="bkm-lab">{t('bkm.pickSlot')}</span>
              <div className="bkm-slots">
                {SLOT_HOURS.map((s, i) => (
                  <button key={s}
                    className={`bkm-slot ${slot === s ? 'on' : ''} ${isFull(i) ? 'full' : ''}`}
                    disabled={isFull(i)}
                    onClick={() => setSlot(s)}>
                    {s}{isFull(i) && <em>{t('bkm.full')}</em>}
                  </button>
                ))}
              </div>
            </div>

            <div className="bkm-sec">
              <span className="bkm-lab">{t('bkm.duration')}</span>
              <div className="bkm-slots bkm-slots-3">
                {DURATION_KEYS.map((d) => (
                  <button key={d} className={`bkm-slot ${durKey === d ? 'on' : ''}`} onClick={() => setDurKey(d)}>
                    {t(d)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bkm-foot">
              <div className="bkm-price">
                <span>{t('bkm.rate')}</span>
                <b>$40</b>
              </div>
              <button className="btn btn-red bkm-confirm"
                disabled={!slot || phase !== 'form'}
                onClick={() => setPhase('sending')}>
                {phase === 'sending'
                  ? <><span className="bkm-spin" />{t('bkm.syncing')}</>
                  : <>{t('bkm.confirm')} {I.arrow(11)}</>}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   COMPONENT
============================================================ */
const FacilitiesShowcase = () => {
  const { t } = useLang();

  const [bootPct, setBootPct] = useState(0);
  const [boot, setBoot] = useState(false);
  const [bootGone, setBootGone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState({});
  const [booking, setBooking] = useState(null);

  /* ---------- Translated content ---------- */
  const BELT_ITEMS = [
    t('fac.belt.aquatics'),
    t('fac.belt.combat'),
    t('fac.belt.courts'),
    t('fac.belt.recovery'),
    t('fac.belt.strength'),
    t('fac.belt.volley'),
    t('fac.belt.open'),
  ];

  const filters = [
    { id: 'all',      label: t('fac.f.all') },
    { id: 'aquatics', label: t('fac.f.aquatics') },
    { id: 'combat',   label: t('fac.f.combat') },
    { id: 'courts',   label: t('fac.f.courts') },
    { id: 'recovery', label: t('fac.f.recovery') },
    { id: 'strength', label: t('fac.f.strength') },
  ];

  const facilities = [
    {
      id: 1, category: 'aquatics',
      sector: t('fac.c1.sector'), location: t('fac.c1.location'),
      title: t('fac.c1.title'), tag: t('fac.c1.tag'),
      status: t('fac.c1.status'), statusCls: 'ok', load: 75, nextSlot: '10:00',
      desc: t('fac.c1.desc'),
      meta: [
        [t('fac.c1.m1k'), t('fac.c1.m1v'), t('fac.c1.m1s')],
        [t('fac.c1.m2k'), t('fac.c1.m2v')],
        [t('fac.c1.m3k'), t('fac.c1.m3v')],
      ],
      cta: t('fac.c1.cta'), ctaIcon: I.pool, img: IMG.pool,
    },
    {
      id: 2, category: 'courts',
      sector: t('fac.c2.sector'), location: t('fac.c2.location'),
      title: t('fac.c2.title'), tag: t('fac.c2.tag'),
      status: t('fac.c2.status'), statusCls: 'busy', load: 70, nextSlot: '18:00',
      desc: t('fac.c2.desc'),
      meta: [
        [t('fac.c2.m1k'), t('fac.c2.m1v')],
        [t('fac.c2.m2k'), t('fac.c2.m2v')],
        [t('fac.c2.m3k'), t('fac.c2.m3v')],
      ],
      cta: t('fac.c2.cta'), ctaIcon: I.basket, img: IMG.basketball,
    },
    {
      id: 3, category: 'combat',
      sector: t('fac.c3.sector'), location: t('fac.c3.location'),
      title: t('fac.c3.title'), tag: t('fac.c3.tag'),
      status: t('fac.c3.status'), statusCls: 'busy', load: 88, nextSlot: '19:15',
      desc: t('fac.c3.desc'),
      meta: [
        [t('fac.c3.m1k'), t('fac.c3.m1v')],
        [t('fac.c3.m2k'), t('fac.c3.m2v')],
        [t('fac.c3.m3k'), t('fac.c3.m3v')],
      ],
      cta: t('fac.c3.cta'), ctaIcon: I.mma, img: IMG.combat,
    },
    {
      id: 4, category: 'recovery',
      sector: t('fac.c4.sector'), location: t('fac.c4.location'),
      title: t('fac.c4.title'), tag: t('fac.c4.tag'),
      status: t('fac.c4.status'), statusCls: 'ok', load: 45, nextSlot: 'NOW',
      desc: t('fac.c4.desc'),
      meta: [
        [t('fac.c4.m1k'), t('fac.c4.m1v')],
        [t('fac.c4.m2k'), t('fac.c4.m2v')],
        [t('fac.c4.m3k'), t('fac.c4.m3v')],
      ],
      cta: t('fac.c4.cta'), ctaIcon: I.cryo, img: IMG.recovery,
    },
    {
      id: 5, category: 'courts',
      sector: t('fac.c5.sector'), location: t('fac.c5.location'),
      title: t('fac.c5.title'), tag: t('fac.c5.tag'),
      status: t('fac.c5.status'), statusCls: 'info', load: 65, nextSlot: '19:30',
      desc: t('fac.c5.desc'),
      meta: [
        [t('fac.c5.m1k'), t('fac.c5.m1v')],
        [t('fac.c5.m2k'), t('fac.c5.m2v')],
        [t('fac.c5.m3k'), t('fac.c5.m3v')],
      ],
      cta: t('fac.c5.cta'), ctaIcon: I.calendar, img: IMG.volleyball, ghost: true,
    },
    {
      id: 6, category: 'strength',
      sector: t('fac.c6.sector'), location: t('fac.c6.location'),
      title: t('fac.c6.title'), tag: t('fac.c6.tag'),
      status: t('fac.c6.status'), statusCls: 'ok', load: 83, nextSlot: 'NOW',
      desc: t('fac.c6.desc'),
      meta: [
        [t('fac.c6.m1k'), t('fac.c6.m1v')],
        [t('fac.c6.m2k'), t('fac.c6.m2v')],
        [t('fac.c6.m3k'), t('fac.c6.m3v')],
      ],
      cta: t('fac.c6.cta'), ctaIcon: I.dumbbell, img: IMG.strength,
    },
  ];

  const telemetryStats = [
    { v: '0.04s',    l: t('fac.tel.stat1') },
    { v: 'HEPA 14',  l: t('fac.tel.stat2') },
  ];

  // live simulated telemetry
  const [loads, setLoads] = useState(() =>
    Object.fromEntries(facilities.map((f) => [f.id, f.load]))
  );
  useEffect(() => {
    const id = setInterval(() => {
      setLoads((prev) => {
        const next = { ...prev };
        facilities.forEach((f) => {
          const drift = (Math.random() - 0.5) * 6;
          next[f.id] = Math.min(97, Math.max(42, Math.round((prev[f.id] ?? f.load) + drift)));
        });
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // ticking clock for next-slot countdowns
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  const slotCountdown = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    const tt = new Date();
    tt.setHours(h, m, 0, 0);
    if (tt.getTime() < now) tt.setDate(tt.getDate() + 1);
    const diff = Math.max(0, tt - now);
    const hh = Math.floor(diff / 3600000);
    const mm = Math.floor((diff % 3600000) / 60000);
    return `${hh}H ${String(mm).padStart(2, '0')}M`;
  };

  const sectionRefs = useRef([]);
  const kickText = useDecode(t('fac.kicker'), isVisible.hero && boot);

  const hdrRef = useRef(null);
  const progRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroBodyRef = useRef(null);
  const beltRef = useRef(null);
  const topRingRef = useRef(null);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const bootRef = useRef(false);
  const visSeen = useRef({});

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
    const tid = setTimeout(() => {
      setBootGone(true);
      document.body.style.overflow = '';
    }, 950);
    return () => clearTimeout(tid);
  }, [boot]);

  /* IntersectionObserver */
  useEffect(() => {
    if (!boot) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const key = e.target.dataset.section;
          if (key) visSeen.current[key] = true;
          setIsVisible((p) => ({ ...p, [key]: true }));
        }
      }),
      { threshold: 0.12 }
    );
    sectionRefs.current.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, [boot]);

  /* Master rAF */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onMove = (e) => { cursorTarget.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const update = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const dh = document.documentElement.scrollHeight - vh;

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

      if (!reduced) {
        if (heroBgRef.current) heroBgRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
        if (heroBodyRef.current) {
          heroBodyRef.current.style.transform = `translate3d(0, ${y * 0.36}px, 0)`;
          heroBodyRef.current.style.opacity = String(Math.max(0, 1 - y / 650));
        }
        if (beltRef.current) beltRef.current.style.transform = `translate3d(${-y * 0.3}px, 0, 0)`;
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
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
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
      const hit = e.target.closest('a, button, input, .facility-card, .bkm-slot');
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

  const cardMove = (e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(px - 0.5) * 6}deg`);
    el.style.setProperty('--rx', `${(py - 0.5) * -6}deg`);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };
  const cardLeave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  const filteredFacilities =
    activeFilter === 'all' ? facilities : facilities.filter((f) => f.category === activeFilter);

  const countFor = (id) =>
    id === 'all' ? facilities.length : facilities.filter((f) => f.category === id).length;

  const tickerItems = facilities.map((f) => ({
    s: f.location.toUpperCase(),
    st: `${loads[f.id]}% LOAD`,
    cls: loads[f.id] >= 85 ? 'busy' : loads[f.id] >= 70 ? 'info' : 'ok',
  }));

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
            <span className="boot-label">{t('fac.boot')}</span>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="hdr" ref={hdrRef}>
        <div className="hdr-in">
          <Link className="brand" to="/" aria-label="Smart Gym home">
            <span className="brand-mark">{I.logo(16)}</span>
            <span className="brand-txt">SMART<em>GYM</em></span>
          </Link>

          <nav className="hdr-nav">
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/facilities" className="on">{t('nav.facilities')}</Link>
            <Link to="/services">{t('nav.services')}</Link>
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
      <section id="facilities" data-section="hero" ref={(el) => (sectionRefs.current[0] = el)}
        className={`fac-hero ${isVisible.hero ? 'is-in' : ''}`}>

        <div className="fac-hero-bg" ref={heroBgRef}>
          <img src={IMG.heroBg} alt="Elite gym environment" />
        </div>
        <div className="fac-hero-shade" />
        <div className="hero-cols" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="fac-hero-body" ref={heroBodyRef}>
          <div className="fac-hero-left">
            <div className="kicker"><i /><span>{kickText}</span></div>

            <h1 className="h1 fac-h1">
              <span className="row">
                <span className="w" style={{ transitionDelay: '.3s' }}>{t('fac.hero.l1')}</span>
              </span>
              <span className="row">
                <span className="w red" style={{ transitionDelay: '.45s' }}>{t('fac.hero.l2')}</span>
              </span>
            </h1>

            <p className="lede">{t('fac.hero.lede')}</p>

            <div className="fac-hero-cta">
              <a href="#facilities-grid" className="btn btn-red btn-lg">{t('fac.hero.cta1')} {I.arrow()}</a>
              <a href="#telemetry" className="btn btn-ghost btn-lg">{t('fac.hero.cta2')}</a>
            </div>
          </div>

          <div className="fac-capacity">
            <div className="fac-capacity-ring">
              <svg viewBox="0 0 36 36">
                <path className="ring-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" strokeWidth="3.5" />
                <path className="ring-progress"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" strokeDasharray={isVisible.hero ? '82, 100' : '0, 100'}
                  strokeLinecap="round" strokeWidth="3.5" />
              </svg>
              <div className="ring-label">
                <span className="ring-value">82%</span>
                <span className="ring-sub">{t('fac.cap.load')}</span>
              </div>
            </div>
            <div className="fac-capacity-info">
              <div className="fac-capacity-title">{t('fac.cap.title')}</div>
              <div className="fac-capacity-detail">
                <b><Counter to={412} active={isVisible.hero} /></b> / 500 {t('fac.cap.detail')}
              </div>
              <div className="fac-capacity-status"><span className="live-dot" />{t('fac.cap.status')}</div>
            </div>
          </div>
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

      {/* TICKER */}
      <div className="ticker fac-ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((h) => (
            <div className="ticker-half" key={h}>
              {tickerItems.map((item, i) => <span key={i}><i className={item.cls} />{item.s}<b>{item.st}</b></span>)}
            </div>
          ))}
        </div>
      </div>

      {/* FILTER + GRID */}
      <section id="facilities-grid" data-section="grid" ref={(el) => (sectionRefs.current[1] = el)}
        className={`fac-grid-sec ${isVisible.grid ? 'is-in' : ''}`}>

        <header className="shead">
          <div className="stag"><i />{t('fac.stag')}</div>
          <h2 className="stitle"><MaskWords text={t('fac.title')} /></h2>
          <p className="ssub">{t('fac.sub')}</p>
        </header>

        <div className="fac-filters-wrap">
          <div className="fac-filters">
            {filters.map((f) => (
              <button key={f.id}
                className={`fchip ${activeFilter === f.id ? 'on' : ''}`}
                onClick={() => setActiveFilter(f.id)}>
                {f.label}<span className="fchip-n">{countFor(f.id)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="fac-cards" key={activeFilter}>
          {filteredFacilities.map((f, i) => (
            <article className="facility-card" key={f.id} style={{ '--i': i }}
              onMouseMove={cardMove} onMouseLeave={cardLeave}>
              <div className="fc-in">
                <div className="fc-media">
                  <img src={f.img} alt={f.title} loading="lazy" />
                  <div className="fc-media-shade" />
                  <span className={`fc-status ${f.statusCls}`}>
                    <i />{t('bkm.status')} {f.status}
                  </span>
                  <span className="fc-num">S/{String(f.id).padStart(2, '0')}</span>
                  <div className="fc-labels">
                    <span className="fc-sector">{f.sector}</span>
                    <span className="fc-location">{f.location}</span>
                  </div>
                </div>

                <div className="fc-body">
                  <em className="fc-tag">{f.tag}</em>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>

                  <div className="fc-load">
                    <div className="fc-load-head">
                      <span>{t('fac.card.load')}</span>
                      <b className={loads[f.id] >= 85 ? 'hot' : ''}>{loads[f.id]}%</b>
                    </div>
                    <div className="fc-load-bar">
                      <i className={loads[f.id] >= 85 ? 'hot' : ''} style={{ width: `${loads[f.id]}%` }} />
                    </div>
                  </div>

                  <div className="fc-meta-grid">
                    {f.meta.map(([k, v, sub]) => (
                      <div className="fc-meta-item" key={k}>
                        <span>{k}</span>
                        <b>{v}{sub && <i> {sub}</i>}</b>
                      </div>
                    ))}
                  </div>

                  <div className="fc-next">
                    {I.clock}
                    {f.nextSlot === 'NOW'
                      ? <span>{t('fac.card.openNow')} <b>{t('fac.card.walkin')}</b></span>
                      : <span>{t('fac.card.nextPre')} {f.nextSlot} {t('fac.card.nextMid')} <b>{slotCountdown(f.nextSlot)}</b></span>}
                  </div>

                  <button
                    className={`btn ${f.ghost ? 'btn-ghost' : 'btn-red'} fc-cta`}
                    onClick={() => setBooking(f)}>
                    {f.ctaIcon} {f.cta}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TELEMETRY */}
      <section id="telemetry" data-section="telemetry" ref={(el) => (sectionRefs.current[2] = el)}
        className={`fac-telemetry ${isVisible.telemetry ? 'is-in' : ''}`}>
        <div className="tel-card">
          <div className="tel-left">
            <div className="tel-ico-lg">{I.hub}</div>
            <div>
              <div className="tel-label">{t('fac.tel.label')}</div>
              <h4 className="tel-title">{t('fac.tel.title')}</h4>
              <p className="tel-desc">{t('fac.tel.desc')}</p>
            </div>
          </div>
          <div className="tel-right">
            {telemetryStats.map((s) => (
              <div className="tel-stat" key={s.l}>
                <span className="tel-stat-val">{s.v}</span>
                <span className="tel-stat-lab">{s.l}</span>
              </div>
            ))}
            <Link to="/join" className="btn btn-red tel-cta">{t('fac.tel.cta')}</Link>
          </div>
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
        <Link to="/">{I.home}<span>{t('fac.tab.home')}</span></Link>
        <Link to="/facilities" className="on">{I.grid}<span>{t('fac.tab.facilities')}</span></Link>
        <Link to="/services">{I.bolt}<span>{t('fac.tab.services')}</span></Link>
        <Link to="/join" className="tab-join">{I.flame}<span>{t('fac.tab.join')}</span></Link>
      </nav>

      {/* BOOKING DRAWER */}
      {booking && <BookingDrawer facility={booking} onClose={() => setBooking(null)} t={t} />}
    </div>
  );
};

export default FacilitiesShowcase;
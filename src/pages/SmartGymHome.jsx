// SmartGymHome.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import LangSwitch from '../i18n/LangSwitch';
import './SmartGymHome.css';

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

const useVelocitySkew = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let last = window.scrollY, vel = 0, raf;
    const loop = () => {
      const y = window.scrollY;
      vel += (y - last - vel) * 0.1;
      last = y;
      ref.current?.style.setProperty('--skew', `${Math.max(-5, Math.min(5, vel * 0.18))}deg`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return ref;
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
  play: <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><path d="M2 1l7 4-7 4z" /></svg>,
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
  ),
  star: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" /></svg>
  ),
  dumbbell: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 6.5v12M3 9v6M17.5 6.5v12M21 9v6M6.5 12h11" /></svg>
  ),
  bolt: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  trophy: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M7 6H4a2 2 0 0 0 2 4h1M17 6h3a2 2 0 0 1-2 4h-1" /></svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
  ),
  pulse: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg>
  ),
  coach: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="7" r="4" /><path d="M5 21c0-4 3-6 7-6s7 2 7 6" /></svg>
  ),
  chip: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="10" y="10" width="4" height="4" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></svg>
  ),
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
  ),
  grid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
  ),
  flame: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4.4 0 7-2.8 7-6.5 0-4.5-4-6-4.5-10.5C12 6.5 9 8 9 11.5c0-1-.8-2.2-1.8-2.7C6.4 10 5 12 5 15.5 5 19.2 7.6 22 12 22z" /></svg>
  ),
};

/* ============================================================
   STATIC IMAGES
============================================================ */
const IMG_SECTORS = {
  s1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA23dg0PwZOBLQHFc5L3CR2koDzZ1qCtI2wt0JljLuzWtCzeGO68fwgDV7qXQgzKxDWKCiti668_e4ByD5btmEGMpGqu_U8lV5ijrvOn5eAuLUNyUUKLpZWINudKPQcwOTezUIpXEXcTuzGumCpH8Q6pWIRGC7Xj-gg95KfkINm3lxdWhmXlqlMDniXSXc_3ozdnLJ0EyKdjn8axgsuhCVcvwMjVDcpnDrNQS2y7b0wzuYrBuDdsAtqYQ',
  s2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOsUJYZow6PF3XJwRRZJamWbc9ddU024GZW5iYBS5YlX4EO3DDUAI3dHyFQDoMdJvbtf7R38ks3-k6qzgQCZI3O_fh8AlKbR2yz3z-vvjax-8pbzy1dL8MmpX_CBEVnFXLJMN1iYuyI040STPXWEzoFvokbtgqeVqQmgXzQm81YFcKwPRKKxmHZ1rsG5fWLzKw3zV5oN83c3X0ZyTSUA8_9j4e_FdcLtOesXhJpPxFWvFCBOXElsKRMg',
  s3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV3CcgN4obCgXaNL3RUNHyf7x2YtvrhJxgbTM4wNNCyA1usAhn_KDjDwELDf84TfRTpL1XkdyU8ZUtARAGnprs3EKZDEJ51h2jc-2m5hsMpfzYpk2AULO5c1yneYCggtcTjPWXCpT_ps8x8zbPxqZc8l6XR4DVu7nGp631CfhhqejxKIfo186fJTeZMjG5wgJeybWGckIhfiGt5e0LVdjMSYt-kqgWzqX9phNvE5WUmgXR32Thq9fFCA',
  s4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk5Oh9gpB5ucwXqc_fWi5ICkJK3Y4l6P_-ng0_hFqqNi3-XJgiH4Kq3JApvU80yRgokkd7VoIugJmYt1j_iBTZno_W5pcu-kFgsrfJ_6im9GXAwYcdyCHwWPSzAuMnBkiSnFqix318GepuMGsqTRVJQL3xIhRP-bD2EjxntBw8xaBjzmlbETZCo0JHIziPUuTM5ejE2NDZyBjeIWmt8AYVEypg5dWvCPAnQBvlkpjaRpsra11V68EPVg',
};
const IMG_WHY = {
  r1: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  r2: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
  r3: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
  r4: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
};
const IMG_SERVICES = {
  1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA90ADfv5q015Hdv9wJrN2PR94gE-LFkELeKTwdRgiQX8excZjoGepxEN01fxEOkcmxVAOJokVXvHi6HSkoMoTwipTWaG7D1R8Uqz9elu-sp7XiXEudLEW9IP328m3CWd3HpdZZOwTqjoT7yitwdqfx02m-Jj13qvdqhNxEKWBt1qvanvvDy2zZ2nvN-iDRV5m6X-iksFc08fT4FEPCr88r9WLaK0mfI1VL9atxsaGz4gYqdm_ihVrx4Q',
  2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlS-alKP7soJN2iWlTU8Xx_RWinLindW32FbUrPxCs9yAasAE6chTuxhM2gVTBY_qBhU8baKOt-zYpNTgoCca3ucS77oMHMwcjX9O_uQOb63hZgY5AEDY_KrEuh93vzQKMrd0WlmLMYyDw5w14YqedkF8-YBVCU5VZKcWhMWA1cv_JUyZqtOaoaaQZzEmlY33KIM3HKQyjMHpllP7KG_906MZNrJN0MWToCEnmJIf-rvvfP7F1KPNfDw',
  3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRHsZzWN12JER7VHxDXN-RPFk-D4rsmxLnxmnYbUnZLgB--rhdlx4hNHByEVsF4Vlw_PMROWl278isfWsLDgyaA3dlssuYkhdjCIVEZ1v82sYcCZvlTbGy9Z6nShFxsbg-T43tUFti9JLYLGCwIIqZMUdkR8eioWw5PZanlFnCknEK_He41RjJJbW603phHF_Gk_NKLpNUI1Yi07iSqVhKlEZw-hg3E0LD4GY_cZ1tdj6HOCkW-OBxeQ',
  4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDADlKHJWbigDsBsIozNsudgjATmwvY8ISSDYQqk40ut9PAkq5z8Vd_E5_Zcp4MPor8cMQTg5PYFciLJB9bcuGhoJWMWY3628cmNFn4SQvV7rOfXg90CiBNspx4iJJWgq1jYiU_bM85FE-1tvXWJE_L2kiQJZcv99l63sX1wbPkPQGkzMoUBRJxO_BFh6PillPtkjs3GKXhQWbPW0mGNqU8gqGXrxQz839Y4_0bZl4HFQUG91W5GmBrKw',
  5: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJDzC_mzHYHneGW09oV0OIN4YvpHHAyPYMG17Gud5lf6MHEY3Fcld65tSW7HLqX4WJZWV_cQnaI5V-ai521PCFf2cLnEfRHBXUCZxu75_UVNh7q06uxSAXNgx7ECK_DpMD1mHtdQwA8XGowrydf9NvxY16uXvAhySX8ovfo23GQ3GrcAdEYyKuDgfnRRHpl4iWywdd4F6ZXFKcXCLHGV0N4_mB1qezKH8c3rf4fBT_ud5pcOGD1tKDEA',
};

/* ============================================================
   COMPONENT
============================================================ */

const SmartGymHome = () => {
  const { t } = useLang();

  const [bootPct, setBootPct] = useState(0);
  const [boot, setBoot] = useState(false);
  const [bootGone, setBootGone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAnnual, setIsAnnual] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState({});
  const [hoverRow, setHoverRow] = useState(-1);

  const sectionRefs = useRef([]);
  const heroVideoRef = useRef(null);
  const skewRef = useVelocitySkew();
  const kickText = useDecode(t('home.kicker'), isVisible.hero && boot);

  /* ---------- Translated content ---------- */
  const heroStats = [
    { v: t('home.stat1.v'), l: t('home.stat1.l') },
    { v: t('home.stat2.v'), l: t('home.stat2.l') },
    { v: t('home.stat3.v'), l: t('home.stat3.l') },
    { v: t('home.stat4.v'), l: t('home.stat4.l') },
  ];

  const BELT_ITEMS = [
    t('home.belt.strength'),
    t('home.belt.cond'),
    t('home.belt.oly'),
    t('home.belt.combat'),
    t('home.belt.mobility'),
    t('home.belt.recovery'),
    t('home.belt.nutrition'),
    t('home.belt.open'),
  ];

  const capabilities = [
    { k: t('home.caps.1.k'), t: t('home.caps.1.t'), d: t('home.caps.1.d'), icon: I.clock },
    { k: t('home.caps.2.k'), t: t('home.caps.2.t'), d: t('home.caps.2.d'), icon: I.pulse },
    { k: t('home.caps.3.k'), t: t('home.caps.3.t'), d: t('home.caps.3.d'), icon: I.coach },
    { k: t('home.caps.4.k'), t: t('home.caps.4.t'), d: t('home.caps.4.d'), icon: I.chip },
  ];

  const floorStats = [
    { label: t('home.floor.tile1.lab'), value: 418,   unit: t('home.floor.tile1.unit'), badge: t('home.floor.tile1.badge'), live: true, pct: 72,  note: t('home.floor.tile1.note') },
    { label: t('home.floor.tile2.lab'), value: 41320, unit: t('home.floor.tile2.unit'), badge: t('home.floor.tile2.badge'),           pct: 64,  note: t('home.floor.tile2.note') },
    { label: t('home.floor.tile3.lab'), value: 386,   unit: t('home.floor.tile3.unit'), badge: t('home.floor.tile3.badge'),           pct: 81,  note: t('home.floor.tile3.note') },
    { label: t('home.floor.tile4.lab'), value: 0,     unit: t('home.floor.tile4.unit'), badge: t('home.floor.tile4.badge'),           pct: 100, note: t('home.floor.tile4.note') },
  ];

  const floorFeed = [
    { s: t('home.feed.p1'),     st: t('home.feed.use'),    cls: 'busy' },
    { s: t('home.feed.r4'),     st: t('home.feed.open'),   cls: 'ok' },
    { s: t('home.feed.oly'),    st: t('home.feed.use'),    cls: 'busy' },
    { s: t('home.feed.plunge'), st: '4°C',                 cls: 'info' },
    { s: t('home.feed.turf'),   st: t('home.feed.open'),   cls: 'ok' },
    { s: t('home.feed.sauna'),  st: '45°C',                cls: 'info' },
    { s: t('home.feed.pit'),    st: t('home.feed.spar'),   cls: 'ok' },
    { s: t('home.feed.court'),  st: t('home.feed.league'), cls: 'info' },
  ];

  const whyRows = [
    { n: '01', t: t('home.why.r1.t'), tag: t('home.why.r1.tag'), m: t('home.why.r1.m'), d: t('home.why.r1.d'), img: IMG_WHY.r1 },
    { n: '02', t: t('home.why.r2.t'), tag: t('home.why.r2.tag'), m: t('home.why.r2.m'), d: t('home.why.r2.d'), img: IMG_WHY.r2 },
    { n: '03', t: t('home.why.r3.t'), tag: t('home.why.r3.tag'), m: t('home.why.r3.m'), d: t('home.why.r3.d'), img: IMG_WHY.r3 },
    { n: '04', t: t('home.why.r4.t'), tag: t('home.why.r4.tag'), m: t('home.why.r4.m'), d: t('home.why.r4.d'), img: IMG_WHY.r4 },
  ];

  const whyChips = [
    [t('home.why.c1.v'), t('home.why.c1.l')],
    [t('home.why.c2.v'), t('home.why.c2.l')],
    [t('home.why.c3.v'), t('home.why.c3.l')],
  ];

  const sectors = [
    { title: t('home.fc.s1.t'), tag: t('home.fc.s1.tag'), badge: t('home.fc.s1.b'), desc: t('home.fc.s1.d'),
      meta: [[t('home.fc.s1.m1k'), '6/8'], [t('home.fc.s1.m2k'), '26°C'], [t('home.fc.s1.m3k'), '99.8%']],
      cta: t('home.fc.s1.cta'), img: IMG_SECTORS.s1 },
    { title: t('home.fc.s2.t'), tag: t('home.fc.s2.tag'), badge: t('home.fc.s2.b'), desc: t('home.fc.s2.d'),
      meta: [[t('home.fc.s2.m1k'), '11/16'], [t('home.fc.s2.m2k'), 'ACTIVE'], [t('home.fc.s2.m3k'), 'ON-SITE']],
      cta: t('home.fc.s2.cta'), img: IMG_SECTORS.s2 },
    { title: t('home.fc.s3.t'), tag: t('home.fc.s3.tag'), badge: t('home.fc.s3.b'), desc: t('home.fc.s3.d'),
      meta: [[t('home.fc.s3.m1k'), '45°C'], [t('home.fc.s3.m2k'), '-110°C'], [t('home.fc.s3.m3k'), '4°C']],
      cta: t('home.fc.s3.cta'), img: IMG_SECTORS.s3 },
    { title: t('home.fc.s4.t'), tag: t('home.fc.s4.tag'), badge: t('home.fc.s4.b'), desc: t('home.fc.s4.d'),
      meta: [[t('home.fc.s4.m1k'), '15/18'], [t('home.fc.s4.m2k'), 'CALIB'], [t('home.fc.s4.m3k'), 'SYNC']],
      cta: t('home.fc.s4.cta'), img: IMG_SECTORS.s4 },
  ];

  const services = [
    { id: 1, category: 'biometrics', title: t('svc.card1.title'), price: '$120', per: t('svc.card1.per'), duration: '60 MINS', badge: 'DIAGNOSTIC',
      tags: [t('svc.card1.tag1'), t('svc.card1.tag2'), t('svc.card1.tag3')], description: t('svc.card1.desc'), image: IMG_SERVICES[1] },
    { id: 2, category: 'coaching', title: t('svc.card2.title'), price: '$95', per: '/ HR', duration: '75 MINS', badge: 'TIER 1 ELITE',
      tags: [t('svc.card2.tag1'), t('svc.card2.tag2'), t('svc.card2.tag3')], description: t('svc.card2.desc'), image: IMG_SERVICES[2] },
    { id: 3, category: 'nutrition', title: t('svc.card3.title'), price: '$149', per: t('svc.card3.per'), duration: 'MONTHLY', badge: 'BIO-FUEL',
      tags: [t('svc.card3.tag1'), t('svc.card3.tag2'), t('svc.card3.tag3')], description: t('svc.card3.desc'), image: IMG_SERVICES[3] },
    { id: 4, category: 'combat', title: t('svc.card4.title'), price: '$40', per: '/ DROP-IN', duration: '50 MINS', badge: 'HIGH INTENSITY',
      tags: [t('svc.card4.tag1'), t('svc.card4.tag2'), t('svc.card4.tag3')], description: t('svc.card4.desc'), image: IMG_SERVICES[4] },
    { id: 5, category: 'recovery', title: t('svc.card5.title'), price: '$65', per: t('svc.card5.per'), duration: '45 MINS', badge: 'BIO-HACK',
      tags: [t('svc.card5.tag1'), t('svc.card5.tag2'), t('svc.card5.tag3')], description: t('svc.card5.desc'), image: IMG_SERVICES[5] },
  ];

  const serviceCats = [
    { id: 'all',        label: t('home.svc.all') },
    { id: 'biometrics', label: t('home.svc.bio') },
    { id: 'coaching',   label: t('home.svc.coach') },
    { id: 'nutrition',  label: t('home.svc.nut') },
    { id: 'combat',     label: t('home.svc.cmb') },
    { id: 'recovery',   label: t('home.svc.rec') },
  ];

  const tiers = [
    { label: t('home.pr.t1.label'), name: t('home.pr.t1.name'), short: t('home.pr.t1.short'),
      monthly: 39, annual: 31, icon: I.dumbbell, featured: false, desc: t('home.pr.t1.desc'),
      features: [
        { t: t('home.pr.t1.f1'), ok: true }, { t: t('home.pr.t1.f2'), ok: true },
        { t: t('home.pr.t1.f3'), ok: true }, { t: t('home.pr.t1.f4'), ok: false },
        { t: t('home.pr.t1.f5'), ok: false },
      ] },
    { label: t('home.pr.t2.label'), name: t('home.pr.t2.name'), short: t('home.pr.t2.short'),
      monthly: 79, annual: 63, icon: I.bolt, featured: true, desc: t('home.pr.t2.desc'),
      features: [
        { t: t('home.pr.t2.f1'), ok: true }, { t: t('home.pr.t2.f2'), ok: true },
        { t: t('home.pr.t2.f3'), ok: true }, { t: t('home.pr.t2.f4'), ok: true },
        { t: t('home.pr.t2.f5'), ok: false },
      ] },
    { label: t('home.pr.t3.label'), name: t('home.pr.t3.name'), short: t('home.pr.t3.short'),
      monthly: 159, annual: 127, icon: I.trophy, featured: false, desc: t('home.pr.t3.desc'),
      features: [
        { t: t('home.pr.t3.f1'), ok: true }, { t: t('home.pr.t3.f2'), ok: true },
        { t: t('home.pr.t3.f3'), ok: true }, { t: t('home.pr.t3.f4'), ok: true },
        { t: t('home.pr.t3.f5'), ok: true },
      ] },
  ];

  const planIncludes = [t('home.pr.inc1'), t('home.pr.inc2'), t('home.pr.inc3'), t('home.pr.inc4')];

  const proofStats = [
    { n: 99.4, d: 1, suffix: '%',  title: t('home.pf.s1.t'), desc: t('home.pf.s1.d') },
    { n: 1.4,  d: 1, suffix: 'M+', title: t('home.pf.s2.t'), desc: t('home.pf.s2.d'), red: true },
    { raw: '24/7',                 title: t('home.pf.s3.t'), desc: t('home.pf.s3.d') },
    { n: 0.02, d: 2, suffix: 's',  title: t('home.pf.s4.t'), desc: t('home.pf.s4.d'), red: true },
  ];

  const QUOTE = t('home.pf.quote');
  const quoteTokens = QUOTE.split(' ');

  /* ---------- Refs ---------- */
  const hdrRef = useRef(null);
  const progRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroBodyRef = useRef(null);
  const heroClusterRef = useRef(null);
  const beltRef = useRef(null);
  const floorRef = useRef(null);
  const floorWordRef = useRef(null);
  const whyRef = useRef(null);
  const rowsWrapRef = useRef(null);
  const rowRefs = useRef([]);
  const railFillRef = useRef(null);
  const activeRow = useRef(0);
  const fcPinRef = useRef(null);
  const fcStickyRef = useRef(null);
  const fcTrackRef = useRef(null);
  const fcProgRef = useRef(null);
  const fcMax = useRef(0);
  const fcOn = useRef(true);
  const quoteRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const topRingRef = useRef(null);
  const floatRef = useRef(null);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
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
    const t2 = setTimeout(() => {
      setBootGone(true);
      document.body.style.overflow = '';
    }, 950);
    return () => clearTimeout(t2);
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
    heroVideoRef.current?.play().catch(() => {});
    rowRefs.current[0]?.classList.add('is-active');
    return () => obs.disconnect();
  }, [boot]);

  /* Master rAF scroll rig */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const mql = window.matchMedia('(min-width: 901px)');
    const syncFc = () => {
      fcOn.current = mql.matches && !reduced;
      if (!fcOn.current && fcTrackRef.current) fcTrackRef.current.style.transform = '';
    };
    syncFc();

    const measure = () => {
      if (fcTrackRef.current && fcStickyRef.current) {
        fcMax.current = Math.max(0, fcTrackRef.current.scrollWidth - fcStickyRef.current.clientWidth);
      }
    };
    measure();
    const tMeasure = setTimeout(measure, 1000);

    const onMove = (e) => {
      mouse.current.tx = e.clientX / window.innerWidth - 0.5;
      mouse.current.ty = e.clientY / window.innerHeight - 0.5;
      cursorTarget.current = { x: e.clientX, y: e.clientY };
    };
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

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;
      if (fine && heroClusterRef.current) {
        heroClusterRef.current.style.transform = `translate(${mouse.current.x * -18}px, ${mouse.current.y * -12}px)`;
      }

      if (!reduced) {
        if (heroBgRef.current) heroBgRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
        if (heroBodyRef.current) {
          heroBodyRef.current.style.transform = `translate3d(0, ${y * 0.36}px, 0)`;
          heroBodyRef.current.style.opacity = String(Math.max(0, 1 - y / 650));
        }
        if (beltRef.current) beltRef.current.style.transform = `translate3d(${-y * 0.3}px, 0, 0)`;
        if (floorRef.current && floorWordRef.current) {
          const r = floorRef.current.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
          floorWordRef.current.style.transform = `translate3d(${10 - p * 48}vw, 0, 0)`;
        }
      }

      /* Facilities pin — direction-aware shift (RTL slides right) */
      if (fcOn.current && fcPinRef.current && fcTrackRef.current && fcStickyRef.current) {
        const r = fcPinRef.current.getBoundingClientRect();
        const total = fcPinRef.current.offsetHeight - fcStickyRef.current.offsetHeight;
        if (total > 0) {
          const p = Math.min(1, Math.max(0, (64 - r.top) / total));
          const dir = document.documentElement.dir === 'rtl' ? 1 : -1;
          const shift = dir * p * fcMax.current;
          fcTrackRef.current.style.transform = `translate3d(${shift}px, 0, 0)`;
          fcTrackRef.current.style.setProperty('--shift', `${shift}px`);
          if (fcProgRef.current) fcProgRef.current.style.transform = `scaleX(${p})`;
        }
      }

      if (whyRef.current && rowsWrapRef.current) {
        const wr = rowsWrapRef.current.getBoundingClientRect();
        const mid = vh * 0.5;
        if (wr.top < mid && wr.bottom > mid) {
          let best = 0, bd = Infinity;
          rowRefs.current.forEach((el, i) => {
            if (!el) return;
            const rr = el.getBoundingClientRect();
            const d = Math.abs(rr.top + rr.height / 2 - mid);
            if (d < bd) { bd = d; best = i; }
          });
          if (best !== activeRow.current) {
            rowRefs.current[activeRow.current]?.classList.remove('is-active');
            rowRefs.current[best]?.classList.add('is-active');
            activeRow.current = best;
          }
          const p = Math.min(1, Math.max(0, (mid - wr.top) / wr.height));
          if (railFillRef.current) railFillRef.current.style.transform = `scaleY(${p})`;
        }
      }

      if (quoteRef.current) {
        const r = quoteRef.current.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.35)));
        quoteRef.current.style.setProperty('--p', p.toFixed(4));
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
    const onResize = () => { syncFc(); measure(); onScroll(); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(tMeasure);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
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
      const hit = e.target.closest('a, button, input, .row-item, .svc-in, .fc-card');
      ring.classList.toggle('big', !!hit);
      dot.classList.toggle('big', !!hit);
    };
    window.addEventListener('mouseover', over, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mouseover', over); };
  }, []);

  /* Cursor-follow lerp for why-float */
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cur = { x: innerWidth / 2, y: innerHeight / 2 };
    let raf;
    const loop = () => {
      cur.x += (cursorTarget.current.x - cur.x) * 0.12;
      cur.y += (cursorTarget.current.y - cur.y) * 0.12;
      if (floatRef.current) floatRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Menu scroll lock */
  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  /* Interactions */
  const tiltMove = (e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`);
    el.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -7}deg`);
  };
  const tiltReset = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };
  const magMove = (e) => {
    const b = ctaBtnRef.current; if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.transition = 'transform .12s ease-out';
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.24}px)`;
  };
  const magLeave = () => {
    const b = ctaBtnRef.current; if (!b) return;
    b.style.transition = 'transform .55s cubic-bezier(0.19,1,0.22,1)';
    b.style.transform = '';
  };

  const filteredServices = services.filter((s) => {
    const cat = activeFilter === 'all' || s.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const search = searchQuery === '' ||
      s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) ||
      s.tags.some((tag) => tag.toLowerCase().includes(q));
    return cat && search;
  });

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
            <span className="boot-label">{t('home.boot')}</span>
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
            <Link to="/" className="on">{t('nav.home')}</Link>
            <Link to="/facilities">{t('nav.facilities')}</Link>
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
      <section id="hero" data-section="hero" ref={(el) => (sectionRefs.current[0] = el)}
        className={`hero ${isVisible.hero ? 'is-in' : ''}`}>

        <div className="hero-bg" ref={heroBgRef}>
          <video ref={heroVideoRef} autoPlay muted loop playsInline preload="auto"
            poster="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1920&q=80">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-with-weightlifting-4682-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-shade" />
        <div className="hero-cols" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="hero-body" ref={heroBodyRef}>
          <div className="hero-left">
            <div className="kicker"><i /><span>{kickText}</span></div>

            <div className="skew" ref={skewRef}>
              <h1 className="h1">
                <span className="row">
                  <span className="w" style={{ transitionDelay: '.3s' }}>{t('home.hero.l1')}</span>
                </span>
                <span className="row">
                  <span className="w ghost" style={{ transitionDelay: '.45s' }}>{t('home.hero.l2')}</span>
                  <span className="w" style={{ transitionDelay: '.52s' }}>{t('home.hero.l3')}</span>
                </span>
                <span className="row">
                  <span className="w" style={{ transitionDelay: '.6s' }}>{t('home.hero.l4')}</span>
                  <span className="w red" style={{ transitionDelay: '.68s' }}>{t('home.hero.l5')}</span>
                </span>
              </h1>
            </div>

            <p className="lede">{t('home.hero.lede')}</p>

            <div className="cta">
              <Link to="/join" className="btn btn-red btn-lg">{t('home.hero.cta1')} {I.arrow()}</Link>
              <Link to="/facilities" className="btn btn-ghost btn-lg"><span className="pl">{I.play}</span>{t('home.hero.cta2')}</Link>
            </div>
          </div>

          <div className="cluster" ref={heroClusterRef} aria-hidden="true">
            <div className="cl-card">
              <div className="cl-top"><span>{t('home.cl.hr')}</span><b className="live-dot" />{t('home.cl.live')}</div>
              <div className="cl-num">142<em>{t('home.cl.hrUnit')}</em></div>
              <div className="cl-pulse"><span /><span /><span /><span /><span /></div>
            </div>
            <div className="cl-card cl-2">
              <div className="cl-top"><span>{t('home.cl.pwr')}</span><b>{t('home.cl.pwrZone')}</b></div>
              <div className="cl-num">940<em>{t('home.cl.pwrUnit')}</em></div>
              <div className="cl-bar"><i /></div>
            </div>
            <div className="cl-card cl-3">
              <div className="cl-top"><span>{t('home.cl.cap')}</span></div>
              <div className="cl-row"><span className="cl-pct">82%</span><span className="cl-sub">{t('home.cl.capSub')}</span></div>
              <div className="cl-bar"><i style={{ '--w': '82%' }} /></div>
            </div>
          </div>
        </div>

        <div className="hero-stats">
          {heroStats.map((s, i) => (
            <React.Fragment key={s.l}>
              {i > 0 && <i className="hs-div" />}
              <div className="hs"><b>{s.v}</b><span>{s.l}</span></div>
            </React.Fragment>
          ))}
        </div>

        <div className="hero-rail" aria-hidden="true">{t('home.hero.rail')}</div>
        <div className="hero-cue" aria-hidden="true"><span>{t('home.hero.cue')}</span><span className="cue-track"><i /></span></div>

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

      {/* CAPABILITIES */}
      <section data-section="caps" ref={(el) => (sectionRefs.current[1] = el)}
        className={`caps ${isVisible.caps ? 'is-in' : ''}`}>
        {capabilities.map((c, i) => (
          <div className="cap" key={c.t} style={{ '--i': i }}>
            <span className="cap-ico">{c.icon}</span>
            <div className="cap-txt">
              <strong>{c.k} <em>{c.t}</em></strong>
              <p>{c.d}</p>
            </div>
          </div>
        ))}
      </section>

      {/* LIVE FLOOR */}
      <section data-section="stats" ref={(el) => { sectionRefs.current[2] = el; floorRef.current = el; }}
        className={`floor ${isVisible.stats ? 'is-in' : ''}`}>
        <div className="floor-word" ref={floorWordRef} aria-hidden="true">{t('home.floor.word')}</div>

        <header className="shead">
          <div className="stag"><i />{t('home.floor.stag')}</div>
          <h2 className="stitle"><MaskWords text={t('home.floor.title')} /></h2>
          <p className="ssub">{t('home.floor.sub')}</p>
        </header>

        <div className="floor-grid">
          {floorStats.map((s, i) => (
            <article className="tile" key={s.label} style={{ '--i': i }}>
              <div className="tile-in" onMouseMove={tiltMove} onMouseLeave={tiltReset}>
                <div className="tile-top">
                  <span className="tile-lab">{s.label}</span>
                  <span className={`pill ${s.live ? 'live' : ''}`}>{s.badge}</span>
                </div>
                <div className="tile-num"><Counter to={s.value} active={isVisible.stats} /><em>{s.unit}</em></div>
                <div className="tile-bar"><span style={{ '--w': `${s.pct}%` }} /></div>
                <p className="tile-note">{s.note}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((h) => (
              <div className="ticker-half" key={h}>
                {floorFeed.map((f, i) => <span key={i}><i className={f.cls} />{f.s}<b>{f.st}</b></span>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section data-section="why" ref={(el) => { sectionRefs.current[3] = el; whyRef.current = el; }}
        className={`why ${isVisible.why ? 'is-in' : ''}`}
        onMouseMove={(e) => { cursorTarget.current = { x: e.clientX, y: e.clientY }; }}
        onMouseLeave={() => setHoverRow(-1)}>
        <div className="why-wrap">
          <aside className="why-side">
            <div className="stag"><i />{t('home.why.stag')}</div>
            <h2 className="stitle why-t">
              {t('home.why.t1')}<br />{t('home.why.t2')}<br />
              <span className="ghost">{t('home.why.t3')}</span>
            </h2>
            <p className="why-lede">{t('home.why.lede')}</p>
            <div className="why-chips">
              {whyChips.map(([v, l]) => (
                <div className="wchip" key={l}><strong>{v}</strong><span>{l}</span></div>
              ))}
            </div>
          </aside>

          <div className="why-rows-col">
            <span className="why-rail" aria-hidden="true"><i ref={railFillRef} /></span>
            <div className="rows" ref={rowsWrapRef}>
              {whyRows.map((f, i) => (
                <div className="row-item" key={f.t} style={{ '--i': i }}
                  ref={(el) => (rowRefs.current[i] = el)}
                  onMouseEnter={() => setHoverRow(i)}>
                  <span className="ri-idx">{f.n}</span>
                  <div className="ri-main">
                    <h3>{f.t}</h3>
                    <p>{f.d}</p>
                    <span className="ri-meta">{f.m}</span>
                  </div>
                  <img className="ri-thumb" src={f.img} alt="" loading="lazy" />
                  <span className="ri-arrow">{I.arrow(14)}</span>
                </div>
              ))}
            </div>
            <p className="why-note">{t('home.why.note')}</p>
          </div>
        </div>

        <div ref={floatRef} className={`why-float ${hoverRow > -1 ? 'show' : ''}`} aria-hidden="true">
          <div className="wf-frame">
            {whyRows.map((f, i) => (
              <img key={i} src={f.img} alt="" loading="lazy" className={hoverRow === i ? 'on' : ''} />
            ))}
            <span className="wf-tag">{hoverRow > -1 ? whyRows[hoverRow].tag : ''}</span>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section
        className={`fc-pin ${isVisible.facilities ? 'is-in' : ''}`}
        data-section="facilities"
        ref={(el) => { sectionRefs.current[4] = el; fcPinRef.current = el; }}
      >
        <div className="fc-sticky" ref={fcStickyRef}>
          <header className="shead fc-head">
            <div className="stag"><i />{t('home.fc.stag')}</div>
            <h2 className="stitle"><MaskWords text={t('home.fc.title')} /></h2>
          </header>

          <div className="fc-track" ref={fcTrackRef}>
            <article className="fc-card fc-intro">
              <span className="fc-kicker">{t('home.fc.kicker')}</span>
              <p className="fc-lede">{t('home.fc.lede')}</p>
              <span className="fc-hint">{t('home.fc.hint')} {I.arrow(11)}</span>
            </article>

            {sectors.map((f, i) => (
              <article className="fc-card" key={f.title}>
                <div className="fc-img"><img src={f.img} alt={f.title} loading="lazy" /></div>
                <span className="fc-badge">{f.badge}</span>
                <span className="fc-idx">S/{String(i + 1).padStart(2, '0')}</span>
                <div className="fc-meta">
                  <em>{f.tag}</em>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <div className="fc-meta-row">
                    <div className="fc-stats">
                      {f.meta.map(([k, v]) => (
                        <span className="fc-stat" key={k}><b>{v}</b><small>{k}</small></span>
                      ))}
                    </div>
                    <button className="btn btn-red btn-sm">{f.cta}</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="fc-progress" aria-hidden="true"><i ref={fcProgRef} /></div>
        </div>
      </section>

      {/* TELEMETRY */}
      <section id="telemetry" data-section="telemetry" ref={(el) => (sectionRefs.current[5] = el)}
        className={`telemetry ${isVisible.telemetry ? 'is-in' : ''}`}>
        <div className="tel-panel">
          <div className="tel-grid-bg" />
          <div className="tel-grid">
            <div className="tel-copy">
              <div className="tel-eyebrow"><span className="tel-ico">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 15l4-6 4 3 5-8" /></svg>
              </span>{t('home.tel.eyebrow')}</div>
              <h2>{t('home.tel.title')}</h2>
              <p>{t('home.tel.desc')}</p>
              <div className="tel-metrics">
                <div className="metric">
                  <div className="m-head"><span>{t('home.tel.m1.lab')}</span><b>{t('home.tel.m1.val')}</b></div>
                  <div className="m-bar"><i style={{ '--w': '82%' }} /></div>
                  <span className="m-status">{t('home.tel.m1.s')}</span>
                </div>
                <div className="metric">
                  <div className="m-head"><span>{t('home.tel.m2.lab')}</span><b>{t('home.tel.m2.val')}</b></div>
                  <div className="m-bar"><i style={{ '--w': '96%' }} /></div>
                  <span className="m-status">{t('home.tel.m2.s')}</span>
                </div>
              </div>
            </div>

            <div className="tel-chart">
              <div className="tc-head">
                <div className="tc-live"><span className="live-dot" />{t('home.tel.live')}</div>
                <span className="tc-load">{t('home.tel.load')}</span>
              </div>
              <div className="tc-box">
                <span className="tc-scan" aria-hidden="true" />
                <svg viewBox="0 0 500 160" className="tc-svg">
                  <defs>
                    <linearGradient id="gArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#e51937" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#e51937" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gLine" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#e51937" /><stop offset="100%" stopColor="#ff2a42" />
                    </linearGradient>
                  </defs>
                  <text x="6" y="30" className="tc-lab">3000 N</text>
                  <text x="6" y="70" className="tc-lab">2000 N</text>
                  <text x="6" y="110" className="tc-lab">1000 N</text>
                  <text x="452" y="152" className="tc-lab">REP 5</text>
                  <rect x="0" y="56" width="500" height="48" fill="rgba(229,25,55,0.05)" />
                  <line x1="0" x2="500" y1="40" y2="40" stroke="#282830" strokeDasharray="4 4" />
                  <line x1="0" x2="500" y1="80" y2="80" stroke="#282830" strokeDasharray="4 4" />
                  <line x1="0" x2="500" y1="120" y2="120" stroke="#282830" strokeDasharray="4 4" />
                  <polygon fill="url(#gArea)"
                    points="0,160 0,140 60,135 120,90 180,45 240,25 300,50 360,75 420,110 500,130 500,160"
                    className="tc-area" />
                  <path id="forcePath" d="M0,140 Q60,135 120,90 T240,25 T360,75 T500,130"
                    fill="none" stroke="url(#gLine)" strokeWidth="3" strokeLinecap="round"
                    pathLength="1" className="tc-line" />
                  <circle r="4.5" fill="#fff" className="tc-dot">
                    <animateMotion dur="7s" repeatCount="indefinite"><mpath href="#forcePath" /></animateMotion>
                  </circle>
                  <circle r="9" fill="rgba(229,25,55,0.18)" className="tc-halo">
                    <animateMotion dur="7s" repeatCount="indefinite"><mpath href="#forcePath" /></animateMotion>
                  </circle>
                </svg>
              </div>
              <div className="tc-stats">
                {[
                  [t('home.tel.peak'),  t('home.tel.peakV'),  '↑ 12%'],
                  [t('home.tel.tpeak'), t('home.tel.tpeakV'), '↑ 5%'],
                  [t('home.tel.rep'),   t('home.tel.repV'),   '●'],
                ].map(([l, v, tg]) => (
                  <div className="tc-stat" key={l}>
                    <div><span>{l}</span><b>{v}</b></div>
                    <em>{tg}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" data-section="services" ref={(el) => (sectionRefs.current[6] = el)}
        className={`services ${isVisible.services ? 'is-in' : ''}`}>
        <header className="shead">
          <div className="stag"><i />{t('home.svc.stag')}</div>
          <h2 className="stitle"><MaskWords text={t('home.svc.title')} /></h2>
          <p className="ssub">{t('home.svc.sub')}</p>
        </header>

        <div className="svc-controls">
          <div className="chips">
            {serviceCats.map((c) => (
              <button key={c.id} className={`fchip ${activeFilter === c.id ? 'on' : ''}`} onClick={() => setActiveFilter(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <label className="search">{I.search}
            <input placeholder={t('home.svc.searchPh')} value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
          </label>
        </div>

        <div className="svc-grid">
          {filteredServices.map((s, i) => (
            <article className="svc" key={s.id} style={{ '--i': i }}>
              <div className="svc-in">
                <div className="svc-media">
                  <img src={s.image} alt={s.title} loading="lazy" />
                  <span className="svc-badge">{s.badge}</span>
                  <span className="svc-dur">{s.duration}</span>
                  <span className="svc-price">{s.price}<em>{s.per}</em></span>
                </div>
                <div className="svc-body">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <div className="svc-tags">{s.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <button className="btn btn-red btn-sm svc-book">{t('home.svc.book')} {I.arrow(10)}</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="svc-empty">
            {t('home.svc.empty1')} “{searchQuery.toUpperCase()}”
            <button onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}>{t('home.svc.reset')}</button>
          </div>
        )}
      </section>

      {/* PRICING */}
      <section id="pricing" data-section="pricing" ref={(el) => (sectionRefs.current[7] = el)}
        className={`pricing ${isVisible.pricing ? 'is-in' : ''}`}>
        <header className="shead center">
          <div className="stag"><i />{t('home.pr.stag')}</div>
          <h2 className="stitle"><MaskWords text={t('home.pr.title')} /></h2>
          <p className="ssub">{t('home.pr.sub')}</p>
          <div className="toggle">
            <button className={`t-btn ${!isAnnual ? 'on' : ''}`} onClick={() => setIsAnnual(false)}>{t('home.pr.monthly')}</button>
            <button className={`t-btn ${isAnnual ? 'on' : ''}`} onClick={() => setIsAnnual(true)}>
              {t('home.pr.annual')} <span className="save">{t('home.pr.save')}</span>
            </button>
          </div>
          <div className="inc-row">
            {planIncludes.map((p) => <span className="inc" key={p}>{p}</span>)}
          </div>
        </header>

        <div className="tier-grid">
          {tiers.map((tr, i) => (
            <div className={`tier ${tr.featured ? 'featured' : ''}`} key={tr.name} style={{ '--i': i }}>
              <div className="tier-in">
                {tr.featured && <span className="tier-flag">{t('home.pr.popular')}</span>}
                <div className="tier-top"><span>{tr.label}</span><i>{tr.icon}</i></div>
                <h3>{tr.name}</h3>
                <p className="tier-desc">{tr.desc}</p>
                <div className="tier-price">
                  <b key={`${tr.short}-${isAnnual}`}>${isAnnual ? tr.annual : tr.monthly}</b>
                  <span>{t('home.pr.and')}<br />{isAnnual ? t('home.pr.billedA') : t('home.pr.billedM')}</span>
                </div>
                <ul>
                  {tr.features.map((f) => (
                    <li key={f.t} className={f.ok ? '' : 'off'}>
                      <em>{f.ok ? '✓' : '✗'}</em>{f.t}
                    </li>
                  ))}
                </ul>
                <button className={`btn ${tr.featured ? 'btn-red' : 'btn-ghost'} tier-btn`}>
                  {tr.featured ? t('home.pr.claim') : `${t('home.pr.select')} ${tr.short.toUpperCase()}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <section data-section="proof" ref={(el) => (sectionRefs.current[8] = el)}
        className={`proof ${isVisible.proof ? 'is-in' : ''}`}>
        <header className="shead">
          <div className="stag"><i />{t('home.pf.stag')}</div>
          <h2 className="stitle"><MaskWords text={t('home.pf.title')} /></h2>
        </header>

        <div className="proof-grid">
          <div className="quote-card">
            <div className="stars">{[...Array(5)].map((_, i) => <span key={i}>{I.star}</span>)}</div>
            <p className="q-scrub" ref={quoteRef} style={{ '--n': quoteTokens.length }} aria-label={QUOTE}>
              {quoteTokens.map((raw, i) => (
                <span key={i} className={`qw ${raw.includes('*') ? 'hl' : ''}`} style={{ '--i': i }}>
                  {raw.replaceAll('*', '')}{' '}
                </span>
              ))}
            </p>
            <div className="q-author">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQQP16lPUzghRqa7_k9646XT_M_wPLA0sTTYPNu3pLBT9QC6YSZ49I_8i4avB-a58JnUv6intdGxdCOAGlazijnJAG3Q2-RQVhW_f189J2PkdlPpYo-27GWTxyjvH3A9x8wsqVXR0U54Qn1qz0NCvFP2ozjD-60CJWZA6myDIJjqkrxR9wJf7xeNhQKYMeGstYKP-KwXFnvTEqmSr3968D_ooxdoRLhofRiqsPU1vaewDyETD7pZ5qpg" alt={t('home.pf.author')} />
              <div><h3>{t('home.pf.author')}</h3><p>{t('home.pf.authorMeta')}</p></div>
            </div>
          </div>

          <div className="proof-stats">
            {proofStats.map((s, i) => (
              <div className="pstat" key={s.title} style={{ '--i': i }}>
                <div className="pstat-in">
                  <b style={s.red ? { color: 'var(--red)' } : null}>
                    {s.raw ?? <><Counter to={s.n} active={isVisible.proof} decimals={s.d} />{s.suffix}</>}
                  </b>
                  <span>{s.title}</span>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" data-section="cta" ref={(el) => (sectionRefs.current[9] = el)}
        className={`cta ${isVisible.cta ? 'is-in' : ''}`}>
        <span className="cta-ghost" aria-hidden="true">SMARTGYM</span>
        <div className="cta-in">
          <span className="cta-eyebrow"><i />{t('home.cta.eyebrow')}</span>
          <h2>{t('home.cta.h2a')}<br /><em>{t('home.cta.h2b')}</em></h2>
          <p>{t('home.cta.desc')}</p>
          <button className="btn btn-red btn-lg cta-btn" ref={ctaBtnRef}
            onMouseMove={magMove} onMouseLeave={magLeave}>
            {t('home.cta.btn')} {I.arrow()}
          </button>
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
        <Link to="/" className="on">{I.home}<span>{t('tab.home')}</span></Link>
        <Link to="/facilities">{I.grid}<span>{t('tab.facilities')}</span></Link>
        <Link to="/services">{I.bolt}<span>{t('tab.services')}</span></Link>
        <Link to="/join" className="tab-join">{I.flame}<span>{t('tab.join')}</span></Link>
      </nav>
    </div>
  );
};

export default SmartGymHome;
// pages/MembershipSignup.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './MembershipSignup.css';

/* ============================================================
   HELPERS
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

const useTween = (target, duration = 650) => {
  const [val, setVal] = useState(target);
  const cur = useRef(target);
  useEffect(() => {
    const from = cur.current;
    if (from === target) return;
    let raf, t0;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min(1, (ts - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * e;
      cur.current = v;
      setVal(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
};

/* ============================================================
   ICONS — all functions; ALWAYS call with a size: I.x(14)
============================================================ */
const I = {
  logo: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 6v14M9 3v20M17 3v20M22 6v14M9 13h8" /></svg>
  ),
  arrow: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chev: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
  ),
  user: (s = 15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></svg>
  ),
  mail: (s = 15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
  ),
  phone: (s = 15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
  ),
  node: (s = 15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" /></svg>
  ),
  shield: (s = 13) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4z" /></svg>
  ),
  lock: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
  ),
  key: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="7.5" cy="15.5" r="4" /><path d="m11 12 9-9M17 4l3 3M14 7l2.5 2.5" /></svg>
  ),
  card: (s = 15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
  ),
  apple: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M16.7 12.9c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.7-3.9zM14.4 5.6c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" /></svg>
  ),
  google: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.37-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  ),
  check: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 10 18.5 20 6.5" /></svg>
  ),
  bolt: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
  ),
  flame: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4.4 0 7-2.8 7-6.5 0-4.5-4-6-4.5-10.5C12 6.5 9 8 9 11.5c0-1-.8-2.2-1.8-2.7C6.4 10 5 12 5 15.5 5 19.2 7.6 22 12 22z" /></svg>
  ),
  dumbbell: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 6.5v12M3 9v6M17.5 6.5v12M21 9v6M6.5 12h11" /></svg>
  ),
  speed: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M12 20a8 8 0 1 0-8-8" /><path d="M12 12l4-4" /></svg>
  ),
  mma: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M8 10h8M8 14h8" /></svg>
  ),
  timer: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 2h6" /></svg>
  ),
  cryo: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M4 12h16M4 12l3-3M4 12l3 3M20 12l-3-3M20 12l-3 3" /></svg>
  ),
  cloud: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 .4-9A7 7 0 0 0 4.3 12.1 3.5 3.5 0 0 0 5 19h12.5z" /></svg>
  ),
  nfc: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 8.5a5 5 0 0 1 0 7" /><path d="M9.5 6a9 9 0 0 1 0 12" /><path d="M13 3.5a13 13 0 0 1 0 17" /><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" /></svg>
  ),
  calx: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M10 14.5l4 4M14 14.5l-4 4" /></svg>
  ),
  coach: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="7" r="3.2" /><path d="M5 21c0-3.5 3-5.5 7-5.5s7 2 7 5.5" /></svg>
  ),
  target: (s = 15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" /></svg>
  ),
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
  ),
  grid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
  ),
};

/* ============================================================
   CONTENT — icon fields hold FUNCTIONS; call at render: t.icon(16)
============================================================ */
const NODES = [
  'Tokyo Monolith HQ — District 01',
  'Neo-Kyoto Velocity Annex — District 02',
  'Osaka Iron Yard — District 04',
  'Shibuya Cryo Lab — District 07',
];

const VECTORS = [
  { id: 'hyp', label: 'HYPERTROPHY', sub: 'Heavy Iron Vol.', icon: I.dumbbell },
  { id: 'shred', label: 'FAT SHRED', sub: 'Metabolic Cut', icon: I.flame },
  { id: 'endu', label: 'ENDURANCE', sub: 'Engine Building', icon: I.speed },
  { id: 'combat', label: 'COMBAT / MMA', sub: 'Striking & Power', icon: I.mma },
  { id: 'biomech', label: 'BIOMECHANICS', sub: 'VBT Velocity', icon: I.timer },
  { id: 'recovery', label: 'RECOVERY', sub: 'Cryo & Sauna', icon: I.cryo },
];

const PLANS = [
  {
    id: 'base', short: 'BASE', name: 'SMART BASE TIER', price: 49,
    desc: 'Core Industrial Access · Standard Machine Telemetry',
    perks: [
      '24/7 Keyless Turnstile Entry (Apple / Google Pass)',
      'QR Machine Telemetry Sync & Progress Ledger',
      'Strength Floor, Cardio Deck & Velocity Track',
      'Infrared Sauna — 2 Sessions / Week',
      'Member App, Class Booking & Biometric ID',
    ],
  },
  {
    id: 'pro', short: 'PRO', name: 'SMART PRO TIER', price: 79, rec: true,
    desc: 'Full Industrial Access · Unlimited Biometric Telemetry',
    perks: [
      '24/7 Biometric Turnstile & Keyless Apple/Google Pass Entry',
      'Smart QR Machine Telemetry Sync & Barbell Velocity Sensors',
      'Full Olympic Pool, Velocity Track & Combat Pit Access',
      'Unlimited Hydro-Massage, Infrared Sauna & Cryo Pod Access',
      '2 Guest Biometric Access Day Passes / Month',
    ],
  },
  {
    id: 'elite', short: 'ELITE', name: 'ELITE APEX TIER', price: 119,
    desc: 'Apex Access · Coaching Credits & Priority Recovery',
    perks: [
      'Everything in Smart Pro Tier',
      '2× 45-min Elite Coaching Screens / Month',
      'Priority Cryo Pod & Hydro-Massage Reservations',
      'Combat Pit Open Mat + 4 Guest Passes / Month',
      'Quarterly DEXA Scan & Movement Audit',
    ],
  },
];

const SUM_TRUST = [
  { icon: I.shield, t: '256-BIT BIOMETRIC ENCLAVE', d: 'Hardware security level data storage' },
  { icon: I.target, t: '14-DAY PEAK GUARANTEE', d: "100% full refund if training expectations aren't exceeded" },
  { icon: I.bolt, t: 'INSTANT WALLET PASS', d: 'One-tap pass save to Apple Wallet or Google Wallet' },
];

const TRUST_STRIP = [
  { icon: I.nfc, t: 'ZERO KEY CARDS', d: 'Enter seamlessly with encrypted facial scan or phone NFC turnstile access.' },
  { icon: I.cloud, t: 'CLOUD METRIC BACKUP', d: 'All barbell load, power output, and velocity data stored automatically.' },
  { icon: I.calx, t: 'FLEXIBLE CANCELLATION', d: 'No 12-month commitments. Pause or terminate your contract directly in-app.' },
  { icon: I.coach, t: 'ELITE COACHING ON CALL', d: 'Complimentary monthly 45-minute biomechanical movement screen included.' },
];

const IMG = {
  facility: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
  avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=120&q=80',
};

/* Field formatting */
const fmtCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
const fmtExp = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
};
const brandOf = (v) => {
  const d = v.replace(/\D/g, '');
  if (!d) return '';
  if (d[0] === '4') return 'VISA';
  if (d[0] === '5') return 'MC';
  if (d[0] === '3') return 'AMEX';
  return '';
};

/* ============================================================
   CARD PREVIEW — live 3D card, flips on CVC focus
============================================================ */
const CardPreview = ({ digits, name, exp, brand, flipped }) => {
  const groups = useMemo(() => {
    const out = [];
    for (let i = 0; i < 16; i++) {
      out.push(digits[i] || '•');
    }
    return [out.slice(0, 4), out.slice(4, 8), out.slice(8, 12), out.slice(12, 16)];
  }, [digits]);

  return (
    <div className="en-cardprev">
      <div className={`en-cp-inner ${flipped ? 'flip' : ''} ${brand ? 'b-' + brand.toLowerCase() : ''}`}>
        {/* FRONT */}
        <div className="en-cp-face en-cp-front">
          <span className="en-cp-shine" aria-hidden="true" />
          <div className="en-cp-top">
            <span className="en-cp-chip" aria-hidden="true" />
            <span className="en-cp-brand">{brand || 'SMART PAY'}</span>
          </div>
          <div className="en-cp-num">
            {groups.map((g, gi) => (
              <span key={gi} className={g.includes('•') ? 'ph' : ''}>{g.join('')}</span>
            ))}
          </div>
          <div className="en-cp-bottom">
            <div><span>CARD HOLDER</span><b>{(name || 'ATHLETE NAME').toUpperCase()}</b></div>
            <div><span>EXPIRES</span><b>{exp || 'MM/YY'}</b></div>
            <span className="en-cp-nfc">{I.nfc(14)}</span>
          </div>
        </div>
        {/* BACK */}
        <div className="en-cp-face en-cp-back">
          <span className="en-cp-stripe" aria-hidden="true" />
          <div className="en-cp-cvcrow">
            <span className="en-cp-sig" />
            <span className="en-cp-cvc">•••</span>
          </div>
          <span className="en-cp-backnote">CVC — 3-DIGIT ENCRYPTION TOKEN</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   COMPONENT
============================================================ */
const MembershipSignup = () => {
  const [bootPct, setBootPct] = useState(0);
  const [boot, setBoot] = useState(false);
  const [bootGone, setBootGone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [step, setStep] = useState(1);
  const [planId, setPlanId] = useState('pro');
  const [vectors, setVectors] = useState([]);
  const [payMethod, setPayMethod] = useState('card');
  const [form, setForm] = useState({ name: '', email: '', phone: '', node: NODES[0] });
  const [card, setCard] = useState({ num: '', exp: '', cvc: '', zip: '' });
  const [autoRenew, setAutoRenew] = useState(true);
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState({});
  const [flash, setFlash] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [sumOpen, setSumOpen] = useState(true);
  const [occ, setOcc] = useState(42);
  const [scan, setScan] = useState(false);
  const [cvcFocus, setCvcFocus] = useState(false);

  const plan = PLANS.find((p) => p.id === planId);
  const price = plan.price;
  const tweenPrice = useTween(price, 700);

  const passText = useDecode('PASS #8841-TK', boot);
  const doneText = useDecode('SMART KEY ACTIVATED — SHOW PASS AT ANY TURNSTILE', done);

  const hdrRef = useRef(null);
  const progRef = useRef(null);
  const topRingRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const formsRef = useRef(null);
  const ghostRef = useRef(null);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const bootRef = useRef(false);

  /* field refs — focus-first-invalid */
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const vecRef = useRef(null);
  const numRef = useRef(null);
  const expRef = useRef(null);
  const cvcRef = useRef(null);
  const zipRef = useRef(null);
  const agreeRef = useRef(null);

  /* ---- validation ---- */
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const nameOk = form.name.trim().length >= 2;
  const phoneOk = form.phone.replace(/\D/g, '').length >= 7;
  const vectorsOk = vectors.length > 0;
  const step1Ok = nameOk && emailOk && phoneOk && vectorsOk;

  const cardOk = payMethod !== 'card' || card.num.replace(/\D/g, '').length === 16;
  const expOk = payMethod !== 'card' || /^(0[1-9]|1[0-2])\/\d{2}$/.test(card.exp);
  const cvcOk = payMethod !== 'card' || /^\d{3,4}$/.test(card.cvc);
  const zipOk = payMethod !== 'card' || card.zip.trim().length >= 3;
  const step2Ok = step1Ok && cardOk && expOk && cvcOk && zipOk && agree;

  const brand = brandOf(card.num);
  const cardDigits = card.num.replace(/\s/g, '');

  /* missing step-1 items — drives the requirements banner */
  const missing = useMemo(() => {
    const m = [];
    if (!nameOk) m.push({ label: 'FULL NAME', ref: nameRef });
    if (!emailOk) m.push({ label: 'EMAIL', ref: emailRef });
    if (!phoneOk) m.push({ label: 'PHONE', ref: phoneRef });
    if (!vectorsOk) m.push({ label: 'VECTOR', ref: vecRef });
    return m;
  }, [nameOk, emailOk, phoneOk, vectorsOk]);

  /* ---- draft persistence (never stores card data) ---- */
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem('sg-enroll-draft') || 'null');
      if (d) {
        if (d.form) setForm((f) => ({ ...f, ...d.form }));
        if (Array.isArray(d.vectors)) setVectors(d.vectors);
        if (d.planId) setPlanId(d.planId);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (done) { localStorage.removeItem('sg-enroll-draft'); return; }
    try {
      localStorage.setItem('sg-enroll-draft', JSON.stringify({ form, vectors, planId }));
    } catch { /* ignore */ }
  }, [form, vectors, planId, done]);

  /* ---- boot ---- */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let raf, t0;
    const dur = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 10 : 950;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min(1, (ts - t0) / dur);
      setBootPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => { bootRef.current = true; setBoot(true); }, 160);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!boot) return;
    const t = setTimeout(() => {
      setBootGone(true);
      document.body.style.overflow = '';
    }, 900);
    return () => clearTimeout(t);
  }, [boot]);

  /* ---- reveal on scroll ---- */
  useEffect(() => {
    if (!boot) return;
    const els = document.querySelectorAll('[data-rv]');
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [boot]);

  /* ---- live occupancy ticker ---- */
  useEffect(() => {
    const id = setInterval(() => {
      setOcc((o) => Math.max(28, Math.min(64, o + (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 3)))));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  /* ---- master rAF: header, progress, ghost parallax ---- */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onMove = (e) => { cursorTarget.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const update = () => {
      const y = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      hdrRef.current?.classList.toggle('is-scrolled', y > 10);
      if (progRef.current && dh > 0) progRef.current.style.transform = `scaleX(${Math.min(1, y / dh)})`;
      if (topRingRef.current && dh > 0) {
        topRingRef.current.style.strokeDashoffset = String(138.23 * (1 - Math.min(1, y / dh)));
      }
      if (!reduced && ghostRef.current) {
        const r = ghostRef.current.parentElement.getBoundingClientRect();
        if (r.bottom > -100 && r.top < window.innerHeight + 100) {
          const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
          ghostRef.current.style.transform = `translate3d(0, ${(p * 90).toFixed(1)}px, 0)`;
        }
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

  /* ---- custom cursor ---- */
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
      const hit = e.target.closest('a, button, input, select, .en-chip, .en-check, .en-cardprev');
      ring.classList.toggle('big', !!hit);
      dot.classList.toggle('big', !!hit);
    };
    window.addEventListener('mouseover', over, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mouseover', over); };
  }, []);

  /* ---- magnetic buttons ---- */
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll('.btn, .en-cta, .en-express-btn'));
    const cleanups = els.map((el) => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.translate = `${dx * 0.12}px ${dy * 0.2}px`;
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
  }, [bootGone, step, done]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  /* ---- actions ---- */
  const flashErr = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  /* focus a field ref: scroll + focus the inner input */
  const focusField = (ref, delay = 0) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const inp = ref.current?.querySelector?.('input, select');
      if (inp) inp.focus({ preventScroll: true });
      else ref.current?.focus?.({ preventScroll: true });
    }, delay);
  };

  /* freely navigable steps — always works */
  const goStep = (n) => {
    setStep(n);
    requestAnimationFrame(() => {
      (n === 2 ? panel2Ref : panel1Ref).current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const proceed = () => goStep(2);

  const submit = () => {
    if (processing || done) return;
    if (!step2Ok) {
      setTouched((t) => ({ ...t, name: 1, email: 1, phone: 1, vectors: 1, num: 1, exp: 1, cvc: 1, zip: 1, agree: 1 }));
      flashErr();
      /* jump to whichever step holds the first problem */
      if (!step1Ok) {
        goStep(1);
        const first = missing[0];
        if (first) focusField(first.ref, 420);
      } else {
        const target = !cardOk ? numRef : !expOk ? expRef : !cvcOk ? cvcRef : !zipOk ? zipRef : agreeRef;
        focusField(target, 60);
      }
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
      setSumOpen(true);
      requestAnimationFrame(() => formsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }, 1700);
  };

  const primary = () => (done ? null : step === 1 ? proceed() : submit());
  const paybarOff = done || processing;

  const hudPct = done ? 100 : step2Ok ? 92 : step1Ok ? 58 : step === 2 ? 40 : 12;

  const err = (k, bad, msg) => (touched[k] && bad ? msg : null);

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
            <span className="boot-label">OPENING BIOMETRIC ENCLAVE</span>
          </div>
        </div>
      )}

      {/* ENROLLMENT HUD — fixed left rail (desktop) */}
      {!done && (
        <aside className="en-hud" aria-label="Enrollment progress">
          <button type="button" className={`en-hud-node ${step === 1 ? 'on' : 'done'}`}
            onClick={() => step !== 1 && goStep(1)} aria-label="Go to step 1">01</button>
          <span className="en-hud-line"><i style={{ height: `${hudPct}%` }} /></span>
          <button type="button"
            className={`en-hud-node ${step === 2 ? 'on' : ''}`}
            onClick={() => step !== 2 && goStep(2)} aria-label="Go to step 2">02</button>
          <span className="en-hud-pct"><b>{hudPct}</b>%<i>ENROLLED</i></span>
        </aside>
      )}

      {/* HEADER */}
      <header className="hdr" ref={hdrRef}>
        <div className="hdr-in">
          <Link className="brand" to="/" aria-label="Smart Gym home">
            <span className="brand-mark">{I.logo(16)}</span>
            <span className="brand-txt">SMART<em>GYM</em></span>
          </Link>
          <nav className="hdr-nav">
            <Link to="/facilities">Facilities</Link>
            <Link to="/services">Services</Link>
            <Link to="/join" className="on">Membership</Link>
            <Link to="/#telemetry">Insights</Link>
            <Link to="/#contact">Contact</Link>
          </nav>
          <div className="hdr-actions">
            <span className="hdr-avatar" aria-hidden="true"><img src={IMG.avatar} alt="" /></span>
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
          <Link to="/join" style={{ '--d': '0.21s' }} onClick={() => setMenuOpen(false)}><span>04</span>Membership</Link>
          <Link to="/#telemetry" style={{ '--d': '0.26s' }} onClick={() => setMenuOpen(false)}><span>05</span>Insights</Link>
          <Link to="/#contact" style={{ '--d': '0.31s' }} onClick={() => setMenuOpen(false)}><span>06</span>Contact</Link>
        </nav>
        <span className="mnav-foot">OPEN 24/7 // DISTRICT 01</span>
      </div>

      <main className="en-main">

        {/* HERO STRIP */}
        <section className="en-hero">
          <div className="grain" aria-hidden="true" />
          <span className="en-ghost" ref={ghostRef} aria-hidden="true">ENROLL</span>

          <div className="en-hero-in">
            <div className="en-hero-left" data-rv>
              <div className="kicker"><i /><span>BIOMETRIC ENCLAVE REGISTRATION — DISTRICT 01 GATEWAY</span></div>
              <h1 className="en-title">ATHLETE <em>ENROLLMENT</em> PROTOCOL</h1>
              <p className="en-lede">
                Secure digital provisioning for uninterrupted 24/7 terminal access,
                biometric barbell telemetry, and recovery infrastructure.
              </p>
            </div>

            <div className="en-secbadges" data-rv style={{ '--d': '120ms' }}>
              <div className="en-sec">
                <span className="en-sec-ico">{I.shield(15)}</span>
                <div><span>SESSION SECURITY</span><b>TLS 1.3 / EAL6+</b></div>
                <span className="en-sec-scan" aria-hidden="true" />
              </div>
              <div className="en-sec">
                <span className="en-sec-ico">{I.key(15)}</span>
                <div><span>ALLOCATION</span><b>{passText}</b></div>
              </div>
            </div>
          </div>

          {/* STEP RAIL (desktop) — both always clickable */}
          <div className="en-steps" data-rv style={{ '--d': '180ms' }}>
            <span className="en-steps-line" aria-hidden="true">
              <i style={{ width: `${done ? 100 : step === 2 ? 100 : step1Ok ? 50 : 0}%` }} />
              <u style={{ left: `${done ? 100 : step === 2 ? 100 : step1Ok ? 50 : 0}%` }} />
            </span>

            <button type="button"
              className={`en-step ${step === 1 ? 'on' : ''}`}
              onClick={() => step !== 1 && goStep(1)}>
              <span className="en-step-n">01</span>
              <span className="en-step-txt">
                <b>STEP 01 — ATHLETE PROFILE &amp; PROTOCOL</b>
                <span>Identity, home terminal location, and training vector</span>
              </span>
              <span className="en-step-st">
                {step1Ok ? I.check(14) : I.target(14)}
              </span>
            </button>

            <button type="button"
              className={`en-step ${step === 2 ? 'on' : ''}`}
              onClick={() => step !== 2 && goStep(2)}>
              <span className="en-step-n">02</span>
              <span className="en-step-txt">
                <b>STEP 02 — BIOMETRICS &amp; INSTANT CHECKOUT</b>
                <span>{step1Ok ? 'Express mobile wallet, biometric encryption token' : 'Open to review — complete step 01 fields to pay'}</span>
              </span>
              <span className="en-step-st">
                {step === 2 ? I.target(14) : step1Ok ? I.check(14) : I.lock(14)}
              </span>
            </button>
          </div>

          {/* PROGRESS (mobile) */}
          <div className="en-progress">
            <div className="en-progress-head">
              <i />{step === 1 ? 'STEP 1 OF 2: ATHLETE DOSSIER' : 'STEP 2 OF 2: SECURE CHECKOUT'}
              <b>{step === 1 ? '50' : '100'}% COMPLETE</b>
            </div>
            <div className="en-progress-bar"><i style={{ width: step === 1 ? '50%' : '100%' }} /></div>
          </div>
        </section>

        {/* CHECKOUT GRID */}
        <section className="en-grid" ref={formsRef}>

          {/* ======== LEFT: FORMS (free accordion) ======== */}
          <div className={`en-forms ${flash ? 'en-shake' : ''}`}>

            {!done ? (
              <>
                {/* ---- PANEL 1: CREDENTIALS ---- */}
                <section ref={panel1Ref}
                  className={`en-panel ${step === 1 ? 'open' : ''}`} data-rv>
                  <button type="button" className="en-panel-head"
                    onClick={() => setStep(1)} aria-expanded={step === 1}>
                    <span className="en-panel-bar" />
                    <span className="en-panel-title">ATHLETE CREDENTIALS &amp; VECTOR</span>
                    <span className="en-panel-proto">FIELD PROTOCOL · 01/02</span>
                    <span className={`en-panel-state ${step1Ok ? 'ok' : ''}`}>
                      {step1Ok ? I.check(11) : I.target(12)}
                    </span>
                    <span className={`en-panel-chev ${step === 1 ? 'up' : ''}`}>{I.chev(13)}</span>
                  </button>

                  {step !== 1 && step1Ok && (
                    <div className="en-recap">
                      <b>{form.name}</b><i /><span>{form.email}</span><i />
                      <span>{vectors.length} VECTOR{vectors.length > 1 ? 'S' : ''}</span>
                      <button type="button" className="en-recap-edit" onClick={() => goStep(1)}>EDIT</button>
                    </div>
                  )}

                  <div className="en-panel-body">
                    <div className="en-panel-in">

                      <div className="en-fieldgrid">
                        <label ref={nameRef} className={`en-field ${err('name', !nameOk, 'MIN 2 CHARACTERS') ? 'bad' : ''}`}>
                          <span className="en-flabel">FULL LEGAL NAME</span>
                          <div className="en-input">
                            <input type="text" placeholder="e.g. MARCUS VANCE" value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              onBlur={() => setTouched((t) => ({ ...t, name: 1 }))} />
                            <span className="en-in-ico">{I.user(14)}</span>
                          </div>
                        </label>

                        <label ref={emailRef} className={`en-field ${err('email', !emailOk, 'INVALID EMAIL') ? 'bad' : ''}`}>
                          <span className="en-flabel">ENCRYPTED EMAIL ADDRESS</span>
                          <div className="en-input">
                            <input type="email" placeholder="vance.athletics@domain.io" value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              onBlur={() => setTouched((t) => ({ ...t, email: 1 }))} />
                            <span className="en-in-ico">{I.mail(14)}</span>
                          </div>
                        </label>

                        <label ref={phoneRef} className={`en-field ${err('phone', !phoneOk, 'ENTER VALID NUMBER') ? 'bad' : ''}`}>
                          <span className="en-flabel">MOBILE SECURITY LINE</span>
                          <div className="en-input">
                            <input type="tel" placeholder="+1 (555) 890-4412" value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              onBlur={() => setTouched((t) => ({ ...t, phone: 1 }))} />
                            <span className="en-in-ico">{I.phone(14)}</span>
                          </div>
                        </label>

                        <label className="en-field">
                          <span className="en-flabel">HOME PERFORMANCE TERMINAL</span>
                          <div className="en-input en-select">
                            <select value={form.node}
                              onChange={(e) => setForm({ ...form, node: e.target.value })}>
                              {NODES.map((n) => <option key={n} value={n}>{n}</option>)}
                            </select>
                            <span className="en-in-ico">{I.node(14)}</span>
                            <span className="en-sel-arrow">{I.chev(11)}</span>
                          </div>
                        </label>
                      </div>

                      <div ref={vecRef} className={`en-vecwrap ${err('vectors', !vectorsOk, 'SELECT AT LEAST ONE VECTOR') ? 'bad' : ''}`}>
                        <div className="en-vec-head">
                          <span className="en-flabel">PRIMARY ATHLETIC VECTOR (TELEMETRY CALIBRATION)</span>
                          <span className="en-vec-multi">SELECT MULTIPLE</span>
                        </div>
                        <div className="en-chips">
                          {VECTORS.map((v, vi) => {
                            const on = vectors.includes(v.id);
                            return (
                              <button type="button" key={v.id}
                                className={`en-chip ${on ? 'on' : ''}`}
                                style={{ '--i': vi }}
                                onClick={() => { setVectors((s) => s.includes(v.id) ? s.filter((x) => x !== v.id) : [...s, v.id]); setTouched((t) => ({ ...t, vectors: 1 })); }}
                                aria-pressed={on}>
                                <span className="en-chip-ico">{v.icon(15)}</span>
                                <span className="en-chip-txt"><b>{v.label}</b><i>{v.sub}</i></span>
                                <span className="en-chip-check">{I.check(10)}</span>
                                {on && <span className="en-chip-pulse" aria-hidden="true" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button type="button" className="btn btn-red btn-lg en-cta" onClick={proceed}>
                        PROCEED TO CHECKOUT {I.arrow()}
                      </button>
                    </div>
                  </div>
                </section>

                {/* ---- PANEL 2: PAYMENT (always openable) ---- */}
                <section ref={panel2Ref}
                  className={`en-panel ${step === 2 ? 'open' : ''}`} data-rv>
                  <button type="button" className="en-panel-head"
                    onClick={() => setStep(2)} aria-expanded={step === 2}>
                    <span className="en-panel-bar red" />
                    <span className="en-panel-title">PAYMENT &amp; BIOMETRIC ENCRYPTION</span>
                    <span className="en-panel-proto">FIELD PROTOCOL · 02/02</span>
                    <span className={`en-panel-state ${step2Ok ? 'ok' : step === 2 ? 'live' : ''}`}>
                      {step2Ok ? I.check(11) : step === 2 ? I.target(12) : I.lock(11)}
                    </span>
                    <span className={`en-panel-chev ${step === 2 ? 'up' : ''}`}>{I.chev(13)}</span>
                  </button>

                  {/* requirements banner — replaces hard lock */}
                  {!step1Ok && (
                    <div className="en-req">
                      <span className="en-req-label">{I.shield(12)} STEP 01 REQUIRED FIRST</span>
                      <div className="en-req-chips">
                        {missing.map((m) => (
                          <button key={m.label} type="button"
                            onClick={() => { goStep(1); focusField(m.ref, 420); }}>
                            {m.label} {I.arrow(9)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="en-panel-body">
                    <div className="en-panel-in">

                      {/* Live 3D card preview */}
                      <CardPreview
                        digits={cardDigits}
                        name={form.name}
                        exp={card.exp}
                        brand={brand}
                        flipped={cvcFocus}
                      />

                      <span className="en-flabel">INSTANT EXPRESS CHECKOUT</span>
                      <div className="en-express">
                        <button type="button"
                          className={`en-express-btn ${payMethod === 'apple' ? 'on' : ''}`}
                          onClick={() => setPayMethod('apple')}>
                          {I.apple(18)} PAY WITH APPLE
                        </button>
                        <button type="button"
                          className={`en-express-btn ${payMethod === 'google' ? 'on' : ''}`}
                          onClick={() => setPayMethod('google')}>
                          {I.google(16)} GOOGLE PAY
                        </button>
                      </div>

                      <div className="en-divider"><i />OR VAULT ENCRYPTED CREDIT CARD<i /></div>

                      <div className={`en-cardfields ${payMethod === 'card' ? 'open' : ''}`}>
                        <div className="en-cardfields-in">
                          <label ref={numRef} className={`en-field ${err('num', !cardOk, '16 DIGITS REQUIRED') ? 'bad' : ''}`}>
                            <span className="en-flabel">CARD NUMBER</span>
                            <div className="en-input">
                              <input className="mono" inputMode="numeric" placeholder="4242 4242 4242 4242"
                                value={card.num}
                                onChange={(e) => setCard({ ...card, num: fmtCard(e.target.value) })}
                                onBlur={() => setTouched((t) => ({ ...t, num: 1 }))} />
                              <span className="en-brands">
                                {['VISA', 'MC', 'AMEX'].map((b) => (
                                  <span key={b} className={brand === b ? 'on' : ''}>{b}</span>
                                ))}
                              </span>
                            </div>
                          </label>

                          <div className="en-fieldrow">
                            <label ref={expRef} className={`en-field ${err('exp', !expOk, 'MM/YY') ? 'bad' : ''}`}>
                              <span className="en-flabel">EXPIRY</span>
                              <div className="en-input">
                                <input className="mono" inputMode="numeric" placeholder="MM / YY"
                                  value={card.exp}
                                  onChange={(e) => setCard({ ...card, exp: fmtExp(e.target.value) })}
                                  onBlur={() => setTouched((t) => ({ ...t, exp: 1 }))} />
                              </div>
                            </label>
                            <label ref={cvcRef} className={`en-field ${err('cvc', !cvcOk, '3–4 DIGITS') ? 'bad' : ''}`}>
                              <span className="en-flabel">CVC / CVV</span>
                              <div className="en-input">
                                <input className="mono" inputMode="numeric" placeholder="•••" type="password"
                                  value={card.cvc}
                                  onFocus={() => setCvcFocus(true)}
                                  onBlur={() => { setCvcFocus(false); setTouched((t) => ({ ...t, cvc: 1 })); }}
                                  onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} />
                              </div>
                            </label>
                            <label ref={zipRef} className={`en-field ${err('zip', !zipOk, 'REQUIRED') ? 'bad' : ''}`}>
                              <span className="en-flabel">POSTAL / ZIP</span>
                              <div className="en-input">
                                <input className="mono" inputMode="numeric" placeholder="10001"
                                  value={card.zip}
                                  onChange={(e) => setCard({ ...card, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
                                  onBlur={() => setTouched((t) => ({ ...t, zip: 1 }))} />
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="en-checks">
                        <label className="en-check">
                          <input type="checkbox" checked={autoRenew}
                            onChange={(e) => setAutoRenew(e.target.checked)} />
                          <span className="en-box">{I.check(11)}</span>
                          <span className="en-check-txt">
                            <b>Auto-Renew Protocol Enabled</b>
                            <i>Maintain seamless terminal access without interruption. Billed {`$${price}.00`} on the 1st of each calendar month. Cancel anytime with tap.</i>
                          </span>
                        </label>

                        <label ref={agreeRef} className={`en-check ${err('agree', !agree, 'REQUIRED TO ACTIVATE PASS') ? 'bad' : ''}`}>
                          <input type="checkbox" checked={agree}
                            onChange={(e) => { setAgree(e.target.checked); setTouched((t) => ({ ...t, agree: 1 })); }} />
                          <span className="en-box">{I.check(11)}</span>
                          <span className="en-check-txt">
                            <b>Conditioning Protocol Agreement &amp; Biometric Enclave Waiver</b>
                            <i>I agree to the Terms of Conditioning, biometric data sync, encrypted bar speed sensor calibration, and privacy-first on-device encrypted telemetry sync.</i>
                          </span>
                        </label>
                      </div>

                      {/* encrypted payload flow line */}
                      <div className="en-flowl" aria-hidden="true">
                        <span>{I.lock(10)} AES-256 TOKENIZATION</span>
                        <svg viewBox="0 0 220 8" preserveAspectRatio="none">
                          <line className="en-flowl-track" x1="0" y1="4" x2="220" y2="4" />
                          <line className="en-flowl-run" x1="0" y1="4" x2="220" y2="4" />
                        </svg>
                        <span>SECURE VAULT</span>
                      </div>

                      <button type="button"
                        className={`btn btn-red btn-lg en-cta ${processing ? 'busy' : ''}`}
                        onClick={submit} disabled={processing}>
                        {processing ? (
                          <>PROVISIONING PASS<span className="en-dots"><i /><i /><i /></span></>
                        ) : payMethod === 'apple' ? (
                          <>{I.apple(15)} ACTIVATE VIA APPLE PAY {I.arrow()}</>
                        ) : payMethod === 'google' ? (
                          <>{I.google(14)} ACTIVATE VIA GOOGLE PAY {I.arrow()}</>
                        ) : (
                          <>{I.bolt(14)} COMPLETE ENROLLMENT &amp; ACTIVATE PASS {I.arrow()}</>
                        )}
                      </button>

                      <p className="en-secure-note">
                        {I.lock(11)} ENCRYPTED VIA 256-BIT AES TOKENIZATION · INSTANT PASS DELIVERY TO PHONE
                      </p>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              /* ---- SUCCESS ---- */
              <section className="en-success">
                <span className="en-success-halo" aria-hidden="true" />
                <div className="en-success-head">
                  <svg className="en-cdraw" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                    <circle cx="32" cy="32" r="28" pathLength="1" />
                    <path d="M20 33.5 28.5 42 45 24" pathLength="1" />
                  </svg>
                  <h2>ENROLLMENT COMPLETE</h2>
                  <p className="en-success-sub">{doneText}</p>
                </div>

                <div className={`en-pass ${scan ? 'scan' : ''}`}>
                  <div className="en-pass-top">
                    <span className="en-pass-brand">{I.logo(13)} SMART<em>GYM</em></span>
                    <span className="en-pass-tier">{plan.short} TIER</span>
                  </div>
                  <div className="en-pass-name">{form.name || 'ATHLETE'}</div>
                  <div className="en-pass-row">
                    <div><span>MEMBER ID</span><b>SG-8841-TK</b></div>
                    <div><span>HOME NODE</span><b>{form.node.split('—')[0].trim()}</b></div>
                    <div><span>STATUS</span><b className="ok">ACTIVE</b></div>
                  </div>
                  <div className="en-pass-barcode" aria-hidden="true" />
                  <span className="en-pass-shine" aria-hidden="true" />
                  <span className="en-nfc-rings" aria-hidden="true"><i /><i /><i /></span>
                  <span className="en-pass-nfc">{I.nfc(13)} HOLD NEAR TURNSTILE</span>
                </div>

                <div className="en-success-actions">
                  <button className="btn btn-red" onClick={() => { setScan(true); setTimeout(() => setScan(false), 1200); }}>
                    {I.apple(14)} ADD TO APPLE WALLET
                  </button>
                  <button className="btn en-ghostbtn" onClick={() => { setScan(true); setTimeout(() => setScan(false), 1200); }}>
                    {I.nfc(14)} SIMULATE TURNSTILE
                  </button>
                </div>

                <p className="en-success-note">
                  Confirmation payload sent to <b>{form.email}</b>. Your pass activates instantly at any terminal — no key cards, no check-in desks.
                </p>
              </section>
            )}
          </div>

          {/* ======== RIGHT: LIVE ORDER SUMMARY ======== */}
          <aside className={`en-summary ${sumOpen ? 'open' : ''}`} data-rv>
            <span className="en-sum-topline" aria-hidden="true" />

            <button type="button" className="en-sum-toggle" onClick={() => setSumOpen(!sumOpen)} aria-expanded={sumOpen}>
              <span>{I.card(15)} ORDER SUMMARY</span>
              <b>${price.toFixed(2)} {I.chev(12)}</b>
            </button>

            <div className="en-sum-body">
              <div className="en-sum-body-in">

                <span className="en-sum-eyebrow">{I.bolt(11)} RECOMMENDED PERFORMANCE STANDARD</span>

                <div className="en-sum-title">
                  <h2 key={planId}>{plan.name}</h2>
                  <div className="en-sum-price" key={`p${planId}`}>
                    <b>${Math.round(tweenPrice)}</b><span>/ MONTH</span>
                  </div>
                </div>
                <p className="en-sum-desc">{plan.desc}</p>

                <div className="en-plan-switch">
                  <span>SWITCH PLAN</span>
                  <div>
                    {PLANS.map((p) => (
                      <button type="button" key={p.id}
                        className={p.id === planId ? 'on' : ''}
                        onClick={() => setPlanId(p.id)}>
                        {p.short}{p.rec && <i />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="en-sum-terms">
                  <span>MONTH-TO-MONTH</span><i />
                  <span>NO LOCK-IN DURATION</span><i />
                  <span>CANCEL ANYTIME</span>
                </div>

                <figure className="en-sum-media">
                  <img src={IMG.facility} alt="Smart Gym facility floor" loading="lazy" />
                  <figcaption>
                    <span className="en-occ"><i />TERMINAL 01 LIVE OCCUPANCY: {occ}%</span>
                  </figcaption>
                </figure>
                <div className="en-sum-media-cap">{I.shield(12)} DIRECT HIGH-VELOCITY FACILITY ACCESS</div>

                <div className="en-perks">
                  <span className="en-perks-head">INCLUDED PERFORMANCE EQUIPMENT &amp; INFRASTRUCTURE</span>
                  <ul>
                    {plan.perks.map((p, i) => (
                      <li key={p} style={{ '--i': i }}>
                        <span className="en-perk-ico">{I.shield(12)}</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="en-lines">
                  <div className="en-line"><span>{plan.short} Membership (First Month)</span><b>${price.toFixed(2)}</b></div>
                  <div className="en-line">
                    <span>Biometric Smart Key Setup <em className="en-promo">PROMO</em></span>
                    <b><s>$45.99</s> $0.00</b>
                  </div>
                  <div className="en-line"><span>Digital Telemetry Integration</span><b>$0.00 <em>WAIVED</em></b></div>
                  <div className="en-line"><span>Facility State Surcharge &amp; Tax</span><b>$0.00</b></div>
                </div>

                <div className="en-total" key={`t${planId}`}>
                  <div>
                    <span>TOTAL DUE TODAY</span>
                    <em>IMMEDIATE PASS PROVISIONING</em>
                  </div>
                  <b>${tweenPrice.toFixed(2)} <i>USD</i></b>
                </div>

                <div className="en-sum-trust">
                  {SUM_TRUST.map((t) => (
                    <div className="en-strust" key={t.t}>
                      <span>{t.icon(14)}</span>
                      <div><b>{t.t}</b><i>{t.d}</i></div>
                    </div>
                  ))}
                </div>

                <div className="en-corporate">
                  <span>{I.node(15)}</span>
                  <div>
                    <b>Team or Corporate Account?</b>
                    <i>Group billing &amp; exclusive telemetry slots</i>
                  </div>
                  <a href="#contact" className="en-corp-link">INQUIRE {I.arrow(10)}</a>
                </div>

              </div>
            </div>
          </aside>
        </section>

        {/* TRUST STRIP */}
        <section className="en-trust">
          {TRUST_STRIP.map((t, i) => (
            <div className="en-trust-item" key={t.t} data-rv style={{ '--d': `${i * 90}ms` }}>
              <span className="en-trust-ico">{t.icon(16)}</span>
              <h3>{t.t}</h3>
              <p>{t.d}</p>
            </div>
          ))}
        </section>
      </main>

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
        <Link to="/services">{I.bolt(18)}<span>SERVICES</span></Link>
        <Link to="/join" className="on tab-join">{I.flame(18)}<span>JOIN NOW</span></Link>
      </nav>

      {/* MOBILE FIXED PAYBAR */}
      {!done && (
        <div className="en-paybar">
          <button className="en-paybar-btn" disabled={paybarOff} onClick={primary}>
            {I.bolt(14)} {step === 1 ? 'PROCEED TO CHECKOUT' : 'COMPLETE ENROLLMENT'}
            <b>${price.toFixed(2)}</b>
          </button>
          <span className="en-paybar-sec">{I.lock(10)} 256-BIT SSL MILITARY GRADE ENCRYPTION</span>
        </div>
      )}
    </div>
  );
};

export default MembershipSignup;
// pages/MembershipSignup.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import LangSwitch from '../i18n/LangSwitch';
import './MembershipSignup.css';

/* ============================================================
   HELPERS
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
   STATIC IMAGE PATHS
============================================================ */
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
   CARD PREVIEW
============================================================ */
const CardPreview = ({ digits, name, exp, brand, flipped, t }) => {
  const groups = useMemo(() => {
    const out = [];
    for (let i = 0; i < 16; i++) out.push(digits[i] || '•');
    return [out.slice(0, 4), out.slice(4, 8), out.slice(8, 12), out.slice(12, 16)];
  }, [digits]);

  return (
    <div className="en-cardprev">
      <div className={`en-cp-inner ${flipped ? 'flip' : ''} ${brand ? 'b-' + brand.toLowerCase() : ''}`}>
        <div className="en-cp-face en-cp-front">
          <span className="en-cp-shine" aria-hidden="true" />
          <div className="en-cp-top">
            <span className="en-cp-chip" aria-hidden="true" />
            <span className="en-cp-brand">{brand || t('en.cp.brand')}</span>
          </div>
          <div className="en-cp-num">
            {groups.map((g, gi) => (
              <span key={gi} className={g.includes('•') ? 'ph' : ''}>{g.join('')}</span>
            ))}
          </div>
          <div className="en-cp-bottom">
            <div><span>{t('en.cp.holder')}</span><b>{(name || t('en.cp.namePh')).toUpperCase()}</b></div>
            <div><span>{t('en.cp.expires')}</span><b>{exp || t('en.cp.expPh')}</b></div>
            <span className="en-cp-nfc">{I.nfc(14)}</span>
          </div>
        </div>
        <div className="en-cp-face en-cp-back">
          <span className="en-cp-stripe" aria-hidden="true" />
          <div className="en-cp-cvcrow">
            <span className="en-cp-sig" />
            <span className="en-cp-cvc">•••</span>
          </div>
          <span className="en-cp-backnote">{t('en.cp.cvcNote')}</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   COMPONENT
============================================================ */
const MembershipSignup = () => {
  const { t } = useLang();

  const [bootPct, setBootPct] = useState(0);
  const [boot, setBoot] = useState(false);
  const [bootGone, setBootGone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [step, setStep] = useState(1);
  const [planId, setPlanId] = useState('pro');
  const [vectors, setVectors] = useState([]);
  const [payMethod, setPayMethod] = useState('card');
  const [form, setForm] = useState({ name: '', email: '', phone: '', node: 'n1' });
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

  /* ---------- Translated content arrays ---------- */
  const NODES = [
    { id: 'n1', label: t('en.node.1') },
    { id: 'n2', label: t('en.node.2') },
    { id: 'n3', label: t('en.node.3') },
    { id: 'n4', label: t('en.node.4') },
  ];

  const VECTORS = [
    { id: 'hyp',      label: t('en.vec.hyp.t'),      sub: t('en.vec.hyp.s'),      icon: I.dumbbell },
    { id: 'shred',    label: t('en.vec.shred.t'),    sub: t('en.vec.shred.s'),    icon: I.flame },
    { id: 'endu',     label: t('en.vec.endu.t'),     sub: t('en.vec.endu.s'),     icon: I.speed },
    { id: 'combat',   label: t('en.vec.combat.t'),   sub: t('en.vec.combat.s'),   icon: I.mma },
    { id: 'biomech',  label: t('en.vec.biomech.t'),  sub: t('en.vec.biomech.s'),  icon: I.timer },
    { id: 'recovery', label: t('en.vec.recovery.t'), sub: t('en.vec.recovery.s'), icon: I.cryo },
  ];

  const PLANS = [
    {
      id: 'base', short: t('en.plan.base.short'), name: t('en.plan.base.name'), price: 49,
      desc: t('en.plan.base.desc'),
      perks: [t('en.plan.base.p1'), t('en.plan.base.p2'), t('en.plan.base.p3'), t('en.plan.base.p4'), t('en.plan.base.p5')],
    },
    {
      id: 'pro', short: t('en.plan.pro.short'), name: t('en.plan.pro.name'), price: 79, rec: true,
      desc: t('en.plan.pro.desc'),
      perks: [t('en.plan.pro.p1'), t('en.plan.pro.p2'), t('en.plan.pro.p3'), t('en.plan.pro.p4'), t('en.plan.pro.p5')],
    },
    {
      id: 'elite', short: t('en.plan.elite.short'), name: t('en.plan.elite.name'), price: 119,
      desc: t('en.plan.elite.desc'),
      perks: [t('en.plan.elite.p1'), t('en.plan.elite.p2'), t('en.plan.elite.p3'), t('en.plan.elite.p4'), t('en.plan.elite.p5')],
    },
  ];

  const SUM_TRUST = [
    { icon: I.shield, t: t('en.sum.trust1t'), d: t('en.sum.trust1d') },
    { icon: I.target, t: t('en.sum.trust2t'), d: t('en.sum.trust2d') },
    { icon: I.bolt,   t: t('en.sum.trust3t'), d: t('en.sum.trust3d') },
  ];

  const TRUST_STRIP = [
    { icon: I.nfc,   t: t('en.trust.1.t'), d: t('en.trust.1.d') },
    { icon: I.cloud, t: t('en.trust.2.t'), d: t('en.trust.2.d') },
    { icon: I.calx,  t: t('en.trust.3.t'), d: t('en.trust.3.d') },
    { icon: I.coach, t: t('en.trust.4.t'), d: t('en.trust.4.d') },
  ];

  const plan = PLANS.find((p) => p.id === planId) || PLANS[1];
  const price = plan.price;
  const tweenPrice = useTween(price, 700);

  const passText = useDecode('PASS #8841-TK', boot);
  const doneText = useDecode(t('en.ok.pass'), done);

  const hdrRef = useRef(null);
  const progRef = useRef(null);
  const topRingRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const formsRef = useRef(null);
  const ghostRef = useRef(null);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const bootRef = useRef(false);

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

  const missing = useMemo(() => {
    const m = [];
    if (!nameOk) m.push({ label: t('en.err.chipName'), ref: nameRef });
    if (!emailOk) m.push({ label: t('en.err.chipEmail'), ref: emailRef });
    if (!phoneOk) m.push({ label: t('en.err.chipPhone'), ref: phoneRef });
    if (!vectorsOk) m.push({ label: t('en.err.chipVector'), ref: vecRef });
    return m;
  }, [nameOk, emailOk, phoneOk, vectorsOk, t]);

  /* Draft persistence */
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

  /* Boot */
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
    const tid = setTimeout(() => {
      setBootGone(true);
      document.body.style.overflow = '';
    }, 900);
    return () => clearTimeout(tid);
  }, [boot]);

  /* Reveal on scroll */
  useEffect(() => {
    if (!boot) return;
    const els = document.querySelectorAll('[data-rv]');
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [boot]);

  /* Live occupancy ticker */
  useEffect(() => {
    const id = setInterval(() => {
      setOcc((o) => Math.max(28, Math.min(64, o + (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 3)))));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  /* Master rAF */
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
      const hit = e.target.closest('a, button, input, select, .en-chip, .en-check, .en-cardprev');
      ring.classList.toggle('big', !!hit);
      dot.classList.toggle('big', !!hit);
    };
    window.addEventListener('mouseover', over, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mouseover', over); };
  }, []);

  /* Magnetic buttons */
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

  const flashErr = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  const focusField = (ref, delay = 0) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const inp = ref.current?.querySelector?.('input, select');
      if (inp) inp.focus({ preventScroll: true });
      else ref.current?.focus?.({ preventScroll: true });
    }, delay);
  };

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
      setTouched((x) => ({ ...x, name: 1, email: 1, phone: 1, vectors: 1, num: 1, exp: 1, cvc: 1, zip: 1, agree: 1 }));
      flashErr();
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
            <span className="boot-label">{t('en.boot')}</span>
          </div>
        </div>
      )}

      {/* HUD */}
      {!done && (
        <aside className="en-hud" aria-label="Enrollment progress">
          <button type="button" className={`en-hud-node ${step === 1 ? 'on' : 'done'}`}
            onClick={() => step !== 1 && goStep(1)} aria-label="Go to step 1">01</button>
          <span className="en-hud-line"><i style={{ height: `${hudPct}%` }} /></span>
          <button type="button"
            className={`en-hud-node ${step === 2 ? 'on' : ''}`}
            onClick={() => step !== 2 && goStep(2)} aria-label="Go to step 2">02</button>
          <span className="en-hud-pct"><b>{hudPct}</b>%<i>{t('en.hud.pct')}</i></span>
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
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/facilities">{t('nav.facilities')}</Link>
            <Link to="/services">{t('nav.services')}</Link>
            <Link to="/join" className="on">{t('nav.membership')}</Link>
            <Link to="/insights">{t('nav.insights')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
          </nav>
          <div className="hdr-actions">
            <LangSwitch variant="header" />
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

      <main className="en-main">

        {/* HERO */}
        <section className="en-hero">
          <div className="grain" aria-hidden="true" />
          <span className="en-ghost" ref={ghostRef} aria-hidden="true">{t('en.ghost')}</span>

          <div className="en-hero-in">
            <div className="en-hero-left" data-rv>
              <div className="kicker"><i /><span>{t('en.kicker')}</span></div>
              <h1 className="en-title">
                {t('en.title')} <em>{t('en.title.em')}</em> {t('en.title.tail')}
              </h1>
              <p className="en-lede">{t('en.lede')}</p>
            </div>

            <div className="en-secbadges" data-rv style={{ '--d': '120ms' }}>
              <div className="en-sec">
                <span className="en-sec-ico">{I.shield(15)}</span>
                <div><span>{t('en.sec1.label')}</span><b>{t('en.sec1.value')}</b></div>
                <span className="en-sec-scan" aria-hidden="true" />
              </div>
              <div className="en-sec">
                <span className="en-sec-ico">{I.key(15)}</span>
                <div><span>{t('en.sec2.label')}</span><b>{passText}</b></div>
              </div>
            </div>
          </div>

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
                <b>{t('en.step1.b')}</b>
                <span>{t('en.step1.s')}</span>
              </span>
              <span className="en-step-st">{step1Ok ? I.check(14) : I.target(14)}</span>
            </button>

            <button type="button"
              className={`en-step ${step === 2 ? 'on' : ''}`}
              onClick={() => step !== 2 && goStep(2)}>
              <span className="en-step-n">02</span>
              <span className="en-step-txt">
                <b>{t('en.step2.b')}</b>
                <span>{step1Ok ? t('en.step2.s.ready') : t('en.step2.s.locked')}</span>
              </span>
              <span className="en-step-st">
                {step === 2 ? I.target(14) : step1Ok ? I.check(14) : I.lock(14)}
              </span>
            </button>
          </div>

          <div className="en-progress">
            <div className="en-progress-head">
              <i />{step === 1 ? t('en.progress.step1') : t('en.progress.step2')}
              <b>{step === 1 ? '50' : '100'}{t('en.progress.pct')}</b>
            </div>
            <div className="en-progress-bar"><i style={{ width: step === 1 ? '50%' : '100%' }} /></div>
          </div>
        </section>

        {/* GRID */}
        <section className="en-grid" ref={formsRef}>

          <div className={`en-forms ${flash ? 'en-shake' : ''}`}>

            {!done ? (
              <>
                {/* PANEL 1 */}
                <section ref={panel1Ref}
                  className={`en-panel ${step === 1 ? 'open' : ''}`} data-rv>
                  <button type="button" className="en-panel-head"
                    onClick={() => setStep(1)} aria-expanded={step === 1}>
                    <span className="en-panel-bar" />
                    <span className="en-panel-title">{t('en.p1.title')}</span>
                    <span className="en-panel-proto">{t('en.p1.proto')}</span>
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
                        <label ref={nameRef} className={`en-field ${err('name', !nameOk, t('en.err.name')) ? 'bad' : ''}`}>
                          <span className="en-flabel">{t('en.p1.name')}</span>
                          <div className="en-input">
                            <input type="text" placeholder={t('en.p1.namePh')} value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              onBlur={() => setTouched((x) => ({ ...x, name: 1 }))} />
                            <span className="en-in-ico">{I.user(14)}</span>
                          </div>
                        </label>

                        <label ref={emailRef} className={`en-field ${err('email', !emailOk, t('en.err.email')) ? 'bad' : ''}`}>
                          <span className="en-flabel">{t('en.p1.email')}</span>
                          <div className="en-input">
                            <input type="email" placeholder={t('en.p1.emailPh')} value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              onBlur={() => setTouched((x) => ({ ...x, email: 1 }))} />
                            <span className="en-in-ico">{I.mail(14)}</span>
                          </div>
                        </label>

                        <label ref={phoneRef} className={`en-field ${err('phone', !phoneOk, t('en.err.phone')) ? 'bad' : ''}`}>
                          <span className="en-flabel">{t('en.p1.phone')}</span>
                          <div className="en-input">
                            <input type="tel" placeholder={t('en.p1.phonePh')} value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              onBlur={() => setTouched((x) => ({ ...x, phone: 1 }))} />
                            <span className="en-in-ico">{I.phone(14)}</span>
                          </div>
                        </label>

                        <label className="en-field">
                          <span className="en-flabel">{t('en.p1.node')}</span>
                          <div className="en-input en-select">
                            <select value={form.node}
                              onChange={(e) => setForm({ ...form, node: e.target.value })}>
                              {NODES.map((n) => <option key={n.id} value={n.id}>{n.label}</option>)}
                            </select>
                            <span className="en-in-ico">{I.node(14)}</span>
                            <span className="en-sel-arrow">{I.chev(11)}</span>
                          </div>
                        </label>
                      </div>

                      <div ref={vecRef} className={`en-vecwrap ${err('vectors', !vectorsOk, t('en.err.vec')) ? 'bad' : ''}`}>
                        <div className="en-vec-head">
                          <span className="en-flabel">{t('en.p1.vecHead')}</span>
                          <span className="en-vec-multi">{t('en.p1.vecMulti')}</span>
                        </div>
                        <div className="en-chips">
                          {VECTORS.map((v, vi) => {
                            const on = vectors.includes(v.id);
                            return (
                              <button type="button" key={v.id}
                                className={`en-chip ${on ? 'on' : ''}`}
                                style={{ '--i': vi }}
                                onClick={() => { setVectors((s) => s.includes(v.id) ? s.filter((x) => x !== v.id) : [...s, v.id]); setTouched((x) => ({ ...x, vectors: 1 })); }}
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
                        {t('en.p1.cta')} {I.arrow()}
                      </button>
                    </div>
                  </div>
                </section>

                {/* PANEL 2 */}
                <section ref={panel2Ref}
                  className={`en-panel ${step === 2 ? 'open' : ''}`} data-rv>
                  <button type="button" className="en-panel-head"
                    onClick={() => setStep(2)} aria-expanded={step === 2}>
                    <span className="en-panel-bar red" />
                    <span className="en-panel-title">{t('en.p2.title')}</span>
                    <span className="en-panel-proto">{t('en.p2.proto')}</span>
                    <span className={`en-panel-state ${step2Ok ? 'ok' : step === 2 ? 'live' : ''}`}>
                      {step2Ok ? I.check(11) : step === 2 ? I.target(12) : I.lock(11)}
                    </span>
                    <span className={`en-panel-chev ${step === 2 ? 'up' : ''}`}>{I.chev(13)}</span>
                  </button>

                  {!step1Ok && (
                    <div className="en-req">
                      <span className="en-req-label">{I.shield(12)} {t('en.p2.reqLabel')}</span>
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

                      <CardPreview
                        digits={cardDigits}
                        name={form.name}
                        exp={card.exp}
                        brand={brand}
                        flipped={cvcFocus}
                        t={t}
                      />

                      <span className="en-flabel">{t('en.p2.expressLabel')}</span>
                      <div className="en-express">
                        <button type="button"
                          className={`en-express-btn ${payMethod === 'apple' ? 'on' : ''}`}
                          onClick={() => setPayMethod('apple')}>
                          {I.apple(18)} {t('en.p2.apple')}
                        </button>
                        <button type="button"
                          className={`en-express-btn ${payMethod === 'google' ? 'on' : ''}`}
                          onClick={() => setPayMethod('google')}>
                          {I.google(16)} {t('en.p2.google')}
                        </button>
                      </div>

                      <div className="en-divider"><i />{t('en.p2.divider')}<i /></div>

                      <div className={`en-cardfields ${payMethod === 'card' ? 'open' : ''}`}>
                        <div className="en-cardfields-in">
                          <label ref={numRef} className={`en-field ${err('num', !cardOk, t('en.err.num')) ? 'bad' : ''}`}>
                            <span className="en-flabel">{t('en.p2.num')}</span>
                            <div className="en-input">
                              <input className="mono" inputMode="numeric" placeholder="4242 4242 4242 4242"
                                value={card.num}
                                onChange={(e) => setCard({ ...card, num: fmtCard(e.target.value) })}
                                onBlur={() => setTouched((x) => ({ ...x, num: 1 }))} />
                              <span className="en-brands">
                                {['VISA', 'MC', 'AMEX'].map((b) => (
                                  <span key={b} className={brand === b ? 'on' : ''}>{b}</span>
                                ))}
                              </span>
                            </div>
                          </label>

                          <div className="en-fieldrow">
                            <label ref={expRef} className={`en-field ${err('exp', !expOk, t('en.err.exp')) ? 'bad' : ''}`}>
                              <span className="en-flabel">{t('en.p2.exp')}</span>
                              <div className="en-input">
                                <input className="mono" inputMode="numeric" placeholder="MM / YY"
                                  value={card.exp}
                                  onChange={(e) => setCard({ ...card, exp: fmtExp(e.target.value) })}
                                  onBlur={() => setTouched((x) => ({ ...x, exp: 1 }))} />
                              </div>
                            </label>
                            <label ref={cvcRef} className={`en-field ${err('cvc', !cvcOk, t('en.err.cvc')) ? 'bad' : ''}`}>
                              <span className="en-flabel">{t('en.p2.cvc')}</span>
                              <div className="en-input">
                                <input className="mono" inputMode="numeric" placeholder="•••" type="password"
                                  value={card.cvc}
                                  onFocus={() => setCvcFocus(true)}
                                  onBlur={() => { setCvcFocus(false); setTouched((x) => ({ ...x, cvc: 1 })); }}
                                  onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} />
                              </div>
                            </label>
                            <label ref={zipRef} className={`en-field ${err('zip', !zipOk, t('en.err.zip')) ? 'bad' : ''}`}>
                              <span className="en-flabel">{t('en.p2.zip')}</span>
                              <div className="en-input">
                                <input className="mono" inputMode="numeric" placeholder="10001"
                                  value={card.zip}
                                  onChange={(e) => setCard({ ...card, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
                                  onBlur={() => setTouched((x) => ({ ...x, zip: 1 }))} />
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
                            <b>{t('en.p2.autoB')}</b>
                            <i>{t('en.p2.autoI.pre')}{`$${price}.00`}{t('en.p2.autoI.post')}</i>
                          </span>
                        </label>

                        <label ref={agreeRef} className={`en-check ${err('agree', !agree, t('en.err.agree')) ? 'bad' : ''}`}>
                          <input type="checkbox" checked={agree}
                            onChange={(e) => { setAgree(e.target.checked); setTouched((x) => ({ ...x, agree: 1 })); }} />
                          <span className="en-box">{I.check(11)}</span>
                          <span className="en-check-txt">
                            <b>{t('en.p2.agreeB')}</b>
                            <i>{t('en.p2.agreeI')}</i>
                          </span>
                        </label>
                      </div>

                      <div className="en-flowl" aria-hidden="true">
                        <span>{I.lock(10)} {t('en.p2.tokenAes')}</span>
                        <svg viewBox="0 0 220 8" preserveAspectRatio="none">
                          <line className="en-flowl-track" x1="0" y1="4" x2="220" y2="4" />
                          <line className="en-flowl-run" x1="0" y1="4" x2="220" y2="4" />
                        </svg>
                        <span>{t('en.p2.tokenVault')}</span>
                      </div>

                      <button type="button"
                        className={`btn btn-red btn-lg en-cta ${processing ? 'busy' : ''}`}
                        onClick={submit} disabled={processing}>
                        {processing ? (
                          <>{t('en.p2.processing')}<span className="en-dots"><i /><i /><i /></span></>
                        ) : payMethod === 'apple' ? (
                          <>{I.apple(15)} {t('en.p2.submitApple')} {I.arrow()}</>
                        ) : payMethod === 'google' ? (
                          <>{I.google(14)} {t('en.p2.submitGoogle')} {I.arrow()}</>
                        ) : (
                          <>{I.bolt(14)} {t('en.p2.submit')} {I.arrow()}</>
                        )}
                      </button>

                      <p className="en-secure-note">
                        {I.lock(11)} {t('en.p2.secure')}
                      </p>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              /* SUCCESS */
              <section className="en-success">
                <span className="en-success-halo" aria-hidden="true" />
                <div className="en-success-head">
                  <svg className="en-cdraw" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                    <circle cx="32" cy="32" r="28" pathLength="1" />
                    <path d="M20 33.5 28.5 42 45 24" pathLength="1" />
                  </svg>
                  <h2>{t('en.ok.title')}</h2>
                  <p className="en-success-sub">{doneText}</p>
                </div>

                <div className={`en-pass ${scan ? 'scan' : ''}`}>
                  <div className="en-pass-top">
                    <span className="en-pass-brand">{I.logo(13)} SMART<em>GYM</em></span>
                    <span className="en-pass-tier">{plan.short} {t('en.ok.tier')}</span>
                  </div>
                  <div className="en-pass-name">{form.name || t('en.ok.athlete')}</div>
                  <div className="en-pass-row">
                    <div><span>{t('en.ok.memberId')}</span><b>SG-8841-TK</b></div>
                    <div><span>{t('en.ok.homeNode')}</span><b>{NODES.find(n => n.id === form.node)?.label.split('—')[0].trim() || 'HQ'}</b></div>
                    <div><span>{t('en.ok.status')}</span><b className="ok">{t('en.ok.active')}</b></div>
                  </div>
                  <div className="en-pass-barcode" aria-hidden="true" />
                  <span className="en-pass-shine" aria-hidden="true" />
                  <span className="en-nfc-rings" aria-hidden="true"><i /><i /><i /></span>
                  <span className="en-pass-nfc">{I.nfc(13)} {t('en.ok.nfc')}</span>
                </div>

                <div className="en-success-actions">
                  <button className="btn btn-red" onClick={() => { setScan(true); setTimeout(() => setScan(false), 1200); }}>
                    {I.apple(14)} {t('en.ok.appleWallet')}
                  </button>
                  <button className="btn en-ghostbtn" onClick={() => { setScan(true); setTimeout(() => setScan(false), 1200); }}>
                    {I.nfc(14)} {t('en.ok.simTurn')}
                  </button>
                </div>

                <p className="en-success-note">
                  {t('en.ok.notePre')}<b>{form.email}</b>{t('en.ok.notePost')}
                </p>
              </section>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <aside className={`en-summary ${sumOpen ? 'open' : ''}`} data-rv>
            <span className="en-sum-topline" aria-hidden="true" />

            <button type="button" className="en-sum-toggle" onClick={() => setSumOpen(!sumOpen)} aria-expanded={sumOpen}>
              <span>{I.card(15)} {t('en.sum.order')}</span>
              <b>${price.toFixed(2)} {I.chev(12)}</b>
            </button>

            <div className="en-sum-body">
              <div className="en-sum-body-in">

                <span className="en-sum-eyebrow">{I.bolt(11)} {t('en.sum.eyebrow')}</span>

                <div className="en-sum-title">
                  <h2 key={planId}>{plan.name}</h2>
                  <div className="en-sum-price" key={`p${planId}`}>
                    <b>${Math.round(tweenPrice)}</b><span>{t('en.sum.perMonth')}</span>
                  </div>
                </div>
                <p className="en-sum-desc">{plan.desc}</p>

                <div className="en-plan-switch">
                  <span>{t('en.sum.switch')}</span>
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
                  <span>{t('en.sum.terms1')}</span><i />
                  <span>{t('en.sum.terms2')}</span><i />
                  <span>{t('en.sum.terms3')}</span>
                </div>

                <figure className="en-sum-media">
                  <img src={IMG.facility} alt="Smart Gym facility floor" loading="lazy" />
                  <figcaption>
                    <span className="en-occ"><i />{t('en.sum.occ')}{occ}%</span>
                  </figcaption>
                </figure>
                <div className="en-sum-media-cap">{I.shield(12)} {t('en.sum.mediaCap')}</div>

                <div className="en-perks">
                  <span className="en-perks-head">{t('en.sum.perksHead')}</span>
                  <ul>
                    {plan.perks.map((p, i) => (
                      <li key={p} style={{ '--i': i }}>
                        <span className="en-perk-ico">{I.shield(12)}</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="en-lines">
                  <div className="en-line"><span>{plan.short}{t('en.sum.line1')}</span><b>${price.toFixed(2)}</b></div>
                  <div className="en-line">
                    <span>{t('en.sum.line2')} <em className="en-promo">{t('en.sum.promo')}</em></span>
                    <b><s>$45.99</s> $0.00</b>
                  </div>
                  <div className="en-line"><span>{t('en.sum.line3')}</span><b>$0.00 <em>{t('en.sum.waived')}</em></b></div>
                  <div className="en-line"><span>{t('en.sum.line4')}</span><b>$0.00</b></div>
                </div>

                <div className="en-total" key={`t${planId}`}>
                  <div>
                    <span>{t('en.sum.total')}</span>
                    <em>{t('en.sum.totalSub')}</em>
                  </div>
                  <b>${tweenPrice.toFixed(2)} <i>{t('en.sum.usd')}</i></b>
                </div>

                <div className="en-sum-trust">
                  {SUM_TRUST.map((tr) => (
                    <div className="en-strust" key={tr.t}>
                      <span>{tr.icon(14)}</span>
                      <div><b>{tr.t}</b><i>{tr.d}</i></div>
                    </div>
                  ))}
                </div>

                <div className="en-corporate">
                  <span>{I.node(15)}</span>
                  <div>
                    <b>{t('en.sum.corpB')}</b>
                    <i>{t('en.sum.corpI')}</i>
                  </div>
                  <Link to="/contact" className="en-corp-link">{t('en.sum.corpLink')} {I.arrow(10)}</Link>
                </div>

              </div>
            </div>
          </aside>
        </section>

        {/* TRUST STRIP */}
        <section className="en-trust">
          {TRUST_STRIP.map((tr, i) => (
            <div className="en-trust-item" key={tr.t} data-rv style={{ '--d': `${i * 90}ms` }}>
              <span className="en-trust-ico">{tr.icon(16)}</span>
              <h3>{tr.t}</h3>
              <p>{tr.d}</p>
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
        <Link to="/">{I.home}<span>{t('en.tab.home')}</span></Link>
        <Link to="/facilities">{I.grid}<span>{t('en.tab.facilities')}</span></Link>
        <Link to="/services">{I.bolt(18)}<span>{t('en.tab.services')}</span></Link>
        <Link to="/join" className="on tab-join">{I.flame(18)}<span>{t('en.tab.join')}</span></Link>
      </nav>

      {/* MOBILE PAYBAR */}
      {!done && (
        <div className="en-paybar">
          <button className="en-paybar-btn" disabled={paybarOff} onClick={primary}>
            {I.bolt(14)} {step === 1 ? t('en.paybar.step1') : t('en.paybar.step2')}
            <b>${price.toFixed(2)}</b>
          </button>
          <span className="en-paybar-sec">{I.lock(10)} {t('en.paybar.sec')}</span>
        </div>
      )}
    </div>
  );
};

export default MembershipSignup;
// src/pages/MembershipSignup.jsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { imageSet } from '../i18n/images';
import usePageTitle from '../hooks/usePageTitle';
import LangSwitch from '../i18n/LangSwitch';
import publicService from '../services/publicService';
import LiveCamera from '../components/LiveCamera';
import MoyasarForm from '../components/MoyasarForm';
import useCollection from '../hooks/useCollection';
import AddressAutocomplete from '../components/AddressAutocomplete';
import SaudiPhoneInput from '../components/SaudiPhoneInput';
import './MembershipSignup.css';

/** Saudi mobile → +9665XXXXXXXX, or null (accepts 05…, 5…, +9665…, 009665…). */
const saudiMobile = (v) => {
  let d = String(v || '').replace(/\D/g, '');
  if (d.startsWith('00966')) d = d.slice(5);
  else if (d.startsWith('966')) d = d.slice(3);
  if (d.startsWith('0')) d = d.slice(1);
  return d.length === 9 && d.startsWith('5') ? `+966${d}` : null;
};

// Read by the payment callback page after Moyasar redirects back.
export const PENDING_KEY = 'sg-enroll-pending';
const IQAMA_RE = /^2\d{9}$/;

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
   ICONS
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
  camera: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" /><circle cx="12" cy="12.5" r="3.5" /></svg>
  ),
  upload: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4M12 4 7 9M12 4l5 5M4 20h16" /></svg>
  ),
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
  ),
  grid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
  ),
};

/* ============================================================
   STATIC IMAGES
============================================================ */
const IMG_DEFAULT = {
  facility: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
  avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=120&q=80',
};

/* Plan → UI accent mapping (Basic/Pro/Elite) */
const planVisual = (plan, index = 0) => {
  const map = [
    { icon: I.dumbbell, rec: false },
    { icon: I.bolt,     rec: true  },
    { icon: I.flame,    rec: false },
  ];
  return map[(index || 0) % 3];
};

/* ============================================================
   COMPONENT
============================================================ */
const MembershipSignup = () => {
  const { t, img, lang, pick } = useLang();
  usePageTitle(t('nav.membership'));
  // Admin-managed images (Public Website → Site Content), built-in ones as fallback.
  const IMG = imageSet(img, 'en', IMG_DEFAULT);

  const [bootPct, setBootPct] = useState(0);
  const [boot, setBoot] = useState(false);
  const [bootGone, setBootGone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [step, setStep] = useState(1);

  // ---- live plans from backend ----
  const [plansData, setPlansData] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState('');
  const [planId, setPlanId] = useState(null);

  // ---- form fields ----
  const [form, setForm] = useState({
    iqama_number: '',
    full_name: '',
    email: '',
    phone: '',
    address: '',
    address_lat: null,
    address_lng: null,
    age: '',
    gender: 'male',
    password: '',
    password2: '',
  });
  const [vectors, setVectors] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);   // live camera capture

  const [duration, setDuration] = useState(1);
  const [agree, setAgree] = useState(false);

  // ---- facility add-ons (Admin → Facility Pricing); /join?facility=<id> preselects one ----
  const [params] = useSearchParams();
  const { items: facilityItems } = useCollection('facilities');
  const [facilityIds, setFacilityIds] = useState(() => {
    const id = Number(params.get('facility'));
    return id ? [id] : [];
  });
  // Months per chosen facility (1 … plan months); missing = the whole plan.
  const [facilityMonths, setFacilityMonths] = useState({});

  const [touched, setTouched] = useState({});
  const [flash, setFlash] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [submitError, setSubmitError] = useState('');
  // Set once the registration exists: { regId, params (Moyasar form), inputs it was created from }
  const [checkout, setCheckout] = useState(null);
  const [sumOpen, setSumOpen] = useState(true);

  /* ---------- Load plans ---------- */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await publicService.plans();
        if (!alive) return;
        setPlansData(Array.isArray(data) ? data : []);
        if (Array.isArray(data) && data.length) setPlanId(data[0].id);
        setPlansError('');
      } catch (e) {
        if (!alive) return;
        setPlansError(e.message || true);   // true → generic translated message
      } finally {
        if (alive) setPlansLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  /* ---------- Derived plan object ---------- */
  // Plans are managed in the admin portal (Public Website → Plans), with Arabic texts.
  const localPlans = useMemo(() => plansData.map((p) => (lang === 'ar' ? {
    ...p,
    display_name: p.display_name_ar || p.display_name,
    description: p.description_ar || p.description,
    features: p.features_ar?.length ? p.features_ar : p.features,
  } : p)), [plansData, lang]);

  const plan = useMemo(() => {
    return localPlans.find((p) => p.id === planId) || localPlans[0] || {
      id: 0, display_name: '—', name: '—',
      price_monthly: 0, price_annual: 0, features: [],
    };
  }, [localPlans, planId]);

  const monthly = Number(plan.price_monthly || 0);
  const annual = Number(plan.price_annual || 0);

  const price = useMemo(() => {
    if (duration >= 12) {
      const years = duration / 12;
      return annual * years;
    }
    return monthly * duration;
  }, [duration, monthly, annual]);

  const bookableFacilities = useMemo(
    () => (facilityItems || []).filter((f) => f.bookable && f.monthly_price),
    [facilityItems],
  );
  const chosenFacilities = bookableFacilities.filter((f) => facilityIds.includes(f.id));
  const monthsFor = (id) => Math.min(facilityMonths[id] || duration, duration);
  const facilitiesTotal = chosenFacilities.reduce((sum, f) => sum + Number(f.monthly_price) * monthsFor(f.id), 0);
  const facilitySelection = chosenFacilities.map((f) => `${f.id}:${monthsFor(f.id)}`).join(',');
  const total = price + facilitiesTotal;
  const toggleFacility = (id) => setFacilityIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  const tweenPrice = useTween(total, 700);
  const passText = useDecode(t('en.pass.pending'), boot);

  /* ---------- i18n-driven static arrays ---------- */
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

  /* ---------- Refs ---------- */
  const hdrRef = useRef(null);
  const progRef = useRef(null);
  const topRingRef = useRef(null);
  const formsRef = useRef(null);
  const ghostRef = useRef(null);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const bootRef = useRef(false);

  const iqamaRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const ageRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);
  const photoRef = useRef(null);
  const agreeRef = useRef(null);
  const payRef = useRef(null);

  /* ---------- Validation ---------- */
  const nameOk = form.full_name.trim().length >= 2;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const phoneOk = !!saudiMobile(form.phone);
  const iqamaOk = IQAMA_RE.test(form.iqama_number);
  const ageOk = Number(form.age) >= 12 && Number(form.age) <= 100;
  const passwordOk = form.password.length >= 8;
  const passwordMatch = form.password === form.password2;
  const photoOk = !!photoFile;
  const step1Ok = nameOk && emailOk && phoneOk && iqamaOk && ageOk && passwordOk && passwordMatch && photoOk && planId;
  const step2Ok = step1Ok && agree;

  /* ---------- Any change after registering invalidates the checkout ---------- */
  const activeCheckout = checkout
    && checkout.inputs.form === form
    && checkout.inputs.planId === planId
    && checkout.inputs.duration === duration
    && checkout.inputs.facilities === facilitySelection
    && checkout.inputs.photoFile === photoFile
    ? checkout : null;

  /* ---------- Draft persistence (exclude password) ---------- */
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem('sg-enroll-draft') || 'null');
      if (d) {
        if (d.form) setForm((f) => ({ ...f, ...d.form, password: '', password2: '' }));
        if (Array.isArray(d.vectors)) setVectors(d.vectors);
        if (d.planId) setPlanId(d.planId);
        if (d.duration) setDuration(d.duration);
        // A facility picked from the Facilities page wins over an older draft.
        if (Array.isArray(d.facilityIds) && !new URLSearchParams(window.location.search).get('facility')) {
          setFacilityIds(d.facilityIds);
          if (d.facilityMonths) setFacilityMonths(d.facilityMonths);
        }
      }
    } catch { /* ignore */ }
  }, []);

  // Cleared by the payment callback page once payment is confirmed.
  useEffect(() => {
    try {
      const { password, password2, ...safeForm } = form;
      localStorage.setItem('sg-enroll-draft', JSON.stringify({
        form: safeForm, vectors, planId, duration, facilityIds, facilityMonths,
      }));
    } catch { /* ignore */ }
  }, [form, vectors, planId, duration, facilityIds, facilityMonths]);

  /* ---------- Boot ---------- */
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

  /* ---------- Reveal on scroll ---------- */
  useEffect(() => {
    if (!boot) return;
    const els = document.querySelectorAll('[data-rv]');
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [boot]);

  /* ---------- Master rAF ---------- */
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


  /* ---------- Menu scroll lock ---------- */
  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  /* ---------- Helpers ---------- */
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
      (n === 2 ? document.getElementById('panel2') : document.getElementById('panel1'))
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const proceed = () => {
    if (!step1Ok) {
      setTouched((x) => ({ ...x, iqama: 1, name: 1, email: 1, phone: 1, age: 1, password: 1, password2: 1, photo: 1 }));
      flashErr();
      const firstRef =
        (!iqamaOk && iqamaRef) ||
        (!nameOk && nameRef) ||
        (!emailOk && emailRef) ||
        (!phoneOk && phoneRef) ||
        (!ageOk && ageRef) ||
        (!passwordOk && passwordRef) ||
        (!passwordMatch && password2Ref) ||
        (!photoOk && photoRef) ||
        null;
      if (firstRef) focusField(firstRef, 60);
      return;
    }
    goStep(2);
  };

  /* ---------- Submit: create (or refresh) the registration, then show Moyasar ---------- */
  const submit = async () => {
    if (processing) return;
    if (activeCheckout) { focusField(payRef, 0); return; }

    if (!step1Ok) { goStep(1); proceed(); return; }
    if (!step2Ok) {
      setTouched((x) => ({ ...x, agree: 1 }));
      flashErr();
      focusField(agreeRef, 60);
      return;
    }

    setSubmitError('');
    setProcessing(true);

    try {
      const payload = {
        iqama_number: form.iqama_number.trim(),
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: saudiMobile(form.phone),
        address: form.address.trim(),
        ...(form.address_lat != null ? { address_lat: form.address_lat, address_lng: form.address_lng } : {}),
        age: Number(form.age),
        gender: form.gender,
        plan: planId,
        duration_months: Number(duration),
        password: form.password,
        facilities: facilitySelection,
      };

      const data = await publicService.register(payload, photoFile);
      try {
        sessionStorage.setItem(PENDING_KEY, JSON.stringify({
          regId: data.id,
          full_name: payload.full_name,
          email: payload.email,
          iqama_number: payload.iqama_number,
          plan_name: plan.display_name,
          duration_months: payload.duration_months,
        }));
      } catch { /* ignore — callback page falls back to a generic message */ }
      setCheckout({
        regId: data.id,
        params: data.payment,
        inputs: { form, planId, duration, photoFile, facilities: facilitySelection },
      });
      focusField(payRef, 80);
    } catch (e) {
      setSubmitError(e.message || 'Submission failed. Please try again.');
      flashErr();
    } finally {
      setProcessing(false);
    }
  };

  const attachPayment = useCallback(
    (paymentId) => publicService.attachPayment(activeCheckout?.regId, paymentId),
    [activeCheckout?.regId],
  );

  const primary = () => (step === 1 ? proceed() : submit());
  const paybarOff = processing;
  const hudPct = activeCheckout ? 92 : step2Ok ? 80 : step1Ok ? 58 : step === 2 ? 40 : 12;
  const err = (k, bad, msg) => (touched[k] && bad ? msg : null);

  const PLANS_FOR_SWITCH = localPlans;

  return (
    <div className={`sg ${menuOpen ? 'menu-open' : ''}`}>
      <div className="rails" aria-hidden="true"><i /><i /></div>

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
      <aside className="en-hud" aria-label="Enrollment progress">
        <button type="button" className={`en-hud-node ${step === 1 ? 'on' : 'done'}`}
          onClick={() => step !== 1 && goStep(1)} aria-label="Go to step 1">01</button>
        <span className="en-hud-line"><i style={{ height: `${hudPct}%` }} /></span>
        <button type="button"
          className={`en-hud-node ${step === 2 ? 'on' : ''}`}
          onClick={() => step !== 2 && goStep(2)} aria-label="Go to step 2">02</button>
        <span className="en-hud-pct"><b>{hudPct}</b>%<i>{t('en.hud.pct')}</i></span>
      </aside>

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
              <i style={{ width: `${step === 2 ? 100 : step1Ok ? 50 : 0}%` }} />
              <u style={{ left: `${step === 2 ? 100 : step1Ok ? 50 : 0}%` }} />
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
        </section>

        {/* GRID */}
        <section className="en-grid" ref={formsRef}>

          <div className={`en-forms ${flash ? 'en-shake' : ''}`}>
              <>
                {/* PANEL 1 — always open */}
                <section
                  id="panel1"
                  ref={iqamaRef ? undefined : undefined}
                  className="en-panel open"
                  data-rv
                  style={{ maxHeight: 'none', overflow: 'visible' }}
                >
                  <button type="button" className="en-panel-head"
                    onClick={() => setStep(1)} aria-expanded="true">
                    <span className="en-panel-bar" />
                    <span className="en-panel-title">{t('en.p1.title')}</span>
                    <span className="en-panel-proto">{t('en.p1.proto')}</span>
                    <span className={`en-panel-state ${step1Ok ? 'ok' : ''}`}>
                      {step1Ok ? I.check(11) : I.target(12)}
                    </span>
                    <span className="en-panel-chev up">{I.chev(13)}</span>
                  </button>

                  <div className="en-panel-body" style={{ maxHeight: 'none', opacity: 1 }}>
                    <div className="en-panel-in" style={{ visibility: 'visible', opacity: 1 }}>

                      <div className="en-fieldgrid">
                        <label ref={iqamaRef} className={`en-field ${err('iqama', !iqamaOk, t('en.err.iqama')) ? 'bad' : ''}`}>
                          <span className="en-flabel">{t('en.field.iqama')}</span>
                          <div className="en-input">
                            <input type="text" inputMode="numeric" placeholder="2XXXXXXXXX" value={form.iqama_number}
                              onChange={(e) => setForm({ ...form, iqama_number: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                              onBlur={() => setTouched((x) => ({ ...x, iqama: 1 }))} />
                            <span className="en-in-ico">{I.key(14)}</span>
                          </div>
                        </label>

                        <label ref={nameRef} className={`en-field ${err('name', !nameOk, t('en.err.name')) ? 'bad' : ''}`}>
                          <span className="en-flabel">{t('en.p1.name')}</span>
                          <div className="en-input">
                            <input type="text" placeholder={t('en.p1.namePh')} value={form.full_name}
                              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
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
                            <SaudiPhoneInput className="en-phone" placeholder={t('en.p1.phonePh')} value={form.phone}
                              onChange={(phone) => setForm({ ...form, phone })}
                              onBlur={() => setTouched((x) => ({ ...x, phone: 1 }))} />
                            <span className="en-in-ico">{I.phone(14)}</span>
                          </div>
                        </label>

                        <label ref={ageRef} className={`en-field ${err('age', !ageOk, t('en.err.age')) ? 'bad' : ''}`}>
                          <span className="en-flabel">{t('en.field.age')}</span>
                          <div className="en-input">
                            <input type="number" min="12" max="100" placeholder="25" value={form.age}
                              onChange={(e) => setForm({ ...form, age: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                              onBlur={() => setTouched((x) => ({ ...x, age: 1 }))} />
                            <span className="en-in-ico">{I.target(14)}</span>
                          </div>
                        </label>

                        <label className="en-field">
                          <span className="en-flabel">{t('en.field.gender')}</span>
                          <div className="en-input en-select">
                            <select value={form.gender}
                              onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                              <option value="male">{t('en.gender.male')}</option>
                              <option value="female">{t('en.gender.female')}</option>
                              <option value="other">{t('en.gender.other')}</option>
                            </select>
                            <span className="en-in-ico">{I.user(14)}</span>
                            <span className="en-sel-arrow">{I.chev(11)}</span>
                          </div>
                        </label>

                        <label ref={passwordRef} className={`en-field ${err('password', !passwordOk, t('en.err.password')) ? 'bad' : ''}`}>
                          <span className="en-flabel">{t('en.field.password')}</span>
                          <div className="en-input">
                            <input type="password" placeholder="••••••••" value={form.password}
                              onChange={(e) => setForm({ ...form, password: e.target.value })}
                              onBlur={() => setTouched((x) => ({ ...x, password: 1 }))} />
                            <span className="en-in-ico">{I.lock(14)}</span>
                          </div>
                        </label>

                        <label ref={password2Ref} className={`en-field ${err('password2', !passwordMatch, t('en.err.password2')) ? 'bad' : ''}`}>
                          <span className="en-flabel">{t('en.field.password2')}</span>
                          <div className="en-input">
                            <input type="password" placeholder="••••••••" value={form.password2}
                              onChange={(e) => setForm({ ...form, password2: e.target.value })}
                              onBlur={() => setTouched((x) => ({ ...x, password2: 1 }))} />
                            <span className="en-in-ico">{I.lock(14)}</span>
                          </div>
                        </label>

                        <div className="en-field" style={{ gridColumn: '1 / -1' }}>
                          <span className="en-flabel">{t('en.field.address')}</span>
                          <AddressAutocomplete t={t} lang={lang} placeholder={t('en.field.addressPh')} icon={I.node(14)}
                            value={{ address: form.address, lat: form.address_lat, lng: form.address_lng }}
                            onChange={(v) => setForm((f) => ({ ...f, address: v.address ?? f.address, address_lat: v.lat ?? null, address_lng: v.lng ?? null }))} />
                        </div>
                      </div>

                      {/* LIVE PHOTO */}
                      <div className="en-vecwrap" style={{ marginTop: 18 }} ref={photoRef}>
                        <div className="en-vec-head">
                          <span className="en-flabel">{t('en.photo.live')}</span>
                          {touched.photo && !photoOk && <span className="en-vec-multi" style={{ color: '#ff8a9a' }}>{t('en.photo.take')}</span>}
                        </div>
                        <LiveCamera
                          onCapture={(file) => { setPhotoFile(file); setTouched((x) => ({ ...x, photo: 1 })); }}
                          invalid={!!touched.photo && !photoOk}
                        />
                      </div>

                      {/* VECTOR */}
                      <div className="en-vecwrap">
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
                                onClick={() => setVectors((s) => s.includes(v.id) ? s.filter((x) => x !== v.id) : [...s, v.id])}
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

                {/* PANEL 2 — always open */}
                <section
                  id="panel2"
                  className="en-panel open"
                  data-rv
                  style={{ maxHeight: 'none', overflow: 'visible' }}
                >
                  <button type="button" className="en-panel-head"
                    onClick={() => setStep(2)} aria-expanded="true">
                    <span className="en-panel-bar red" />
                    <span className="en-panel-title">{t('en.p2.title')}</span>
                    <span className="en-panel-proto">{t('en.p2.proto')}</span>
                    <span className={`en-panel-state ${step2Ok ? 'ok' : 'live'}`}>
                      {step2Ok ? I.check(11) : I.target(12)}
                    </span>
                    <span className="en-panel-chev up">{I.chev(13)}</span>
                  </button>

                  <div className="en-panel-body" style={{ maxHeight: 'none', opacity: 1 }}>
                    <div className="en-panel-in" style={{ visibility: 'visible', opacity: 1 }}>

                      <div className="en-checks">
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

                      {submitError && (
                        <div style={{
                          marginTop: 12, padding: '10px 14px', borderRadius: 8,
                          background: 'rgba(229,25,55,0.12)',
                          border: '1px solid rgba(229,25,55,0.4)',
                          color: '#ff8a9a', fontSize: 13,
                        }}>
                          {submitError}
                        </div>
                      )}

                      {!activeCheckout ? (
                        <button type="button"
                          className={`btn btn-red btn-lg en-cta ${processing ? 'busy' : ''}`}
                          onClick={submit} disabled={processing}>
                          {processing ? (
                            <>{t('en.p2.processing')}<span className="en-dots"><i /><i /><i /></span></>
                          ) : (
                            <>{I.lock(14)} {t('en.p2.continuePay')} {I.arrow()}</>
                          )}
                        </button>
                      ) : (
                        <div className="en-pay" ref={payRef}>
                          <div className="en-pay-head">
                            <span>{I.lock(12)} {t('en.p2.payAmount', { amount: (activeCheckout.params.amount / 100).toFixed(2) })}</span>
                            <span>{t('en.p2.ref')}{activeCheckout.regId}</span>
                          </div>
                          <MoyasarForm checkout={activeCheckout.params} onPaymentCreated={attachPayment} lang={lang} />
                        </div>
                      )}

                      <p className="en-secure-note">
                        {I.lock(11)} {t('en.p2.secureNote')}
                      </p>
                    </div>
                  </div>
                </section>
              </>
          </div>

          {/* ORDER SUMMARY — unchanged */}
          <aside className={`en-summary ${sumOpen ? 'open' : ''}`} data-rv>
            <span className="en-sum-topline" aria-hidden="true" />

            <button type="button" className="en-sum-toggle" onClick={() => setSumOpen(!sumOpen)} aria-expanded={sumOpen}>
              <span>{I.card(15)} {t('en.sum.order')}</span>
              <b>SAR {price.toFixed(2)} {I.chev(12)}</b>
            </button>

            <div className="en-sum-body">
              <div className="en-sum-body-in">

                <span className="en-sum-eyebrow">{I.bolt(11)} {t('en.sum.eyebrow')}</span>

                <div className="en-sum-title">
                  <h2 key={planId}>{plan.display_name}</h2>
                  <div className="en-sum-price" key={`p${planId}`}>
                    <b>SAR {Math.round(tweenPrice / duration)}</b><span>{t('en.sum.perMonth')}</span>
                  </div>
                </div>
                <p className="en-sum-desc">{plan.description || '—'}</p>

                <div className="en-plan-switch">
                  <span>{t('en.sum.switch')}</span>
                  <div>
                    {plansLoading && <span style={{ opacity: 0.6, fontSize: 12 }}>{t('en.plan.loading')}</span>}
                    {plansError && <span style={{ color: '#ff8a9a', fontSize: 12 }}>{plansError === true ? t('en.plan.loadError') : plansError}</span>}
                    {!plansLoading && !plansError && PLANS_FOR_SWITCH.map((p, i) => (
                      <button type="button" key={p.id}
                        className={p.id === planId ? 'on' : ''}
                        onClick={() => setPlanId(p.id)}>
                        {p.display_name}{planVisual(p, i).rec && <i />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="en-plan-switch" style={{ marginTop: 10 }}>
                  <span>{t('en.field.duration')}</span>
                  <div>
                    {[1, 3, 6, 12].map((m) => (
                      <button type="button" key={m}
                        className={m === duration ? 'on' : ''}
                        onClick={() => setDuration(m)}>
                        {m} {t('en.field.months')}{m >= 12 && <i />}
                      </button>
                    ))}
                  </div>
                </div>

                {bookableFacilities.length > 0 && (
                  <div className="en-plan-switch en-fac-switch" style={{ marginTop: 10 }}>
                    <span>{t('en.fac.title')}</span>
                    <ul className="en-fac-list">
                      {bookableFacilities.map((f) => {
                        const on = facilityIds.includes(f.id);
                        return (
                          <li key={f.id} className={on ? 'on' : ''}>
                            <div className="en-fac-name">
                              <b>{pick(f.data?.title)}</b>
                              <em>SAR {Number(f.monthly_price).toFixed(0)}{t('en.fac.perMonth')}</em>
                            </div>
                            {on && (
                              <label className="en-fac-months">
                                <span>{t('en.fac.for')}</span>
                                <select value={monthsFor(f.id)}
                                  onChange={(e) => setFacilityMonths((m) => ({ ...m, [f.id]: Number(e.target.value) }))}>
                                  {Array.from({ length: duration }, (_, i) => i + 1).map((m) => (
                                    <option key={m} value={m}>{m} {t('en.field.months')}{m === duration ? ` · ${t('en.fac.whole')}` : ''}</option>
                                  ))}
                                </select>
                              </label>
                            )}
                            <button type="button" className={on ? 'en-fac-btn remove' : 'en-fac-btn'}
                              aria-pressed={on} onClick={() => toggleFacility(f.id)}>
                              {on ? t('en.fac.remove') : t('en.fac.add')}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <em className="en-fac-note">{t('en.fac.note')}</em>
                  </div>
                )}

                <div className="en-sum-terms">
                  <span>{t('en.sum.terms1')}</span><i />
                  <span>{t('en.sum.terms2')}</span><i />
                  <span>{t('en.sum.terms3')}</span>
                </div>

                <figure className="en-sum-media">
                  <img src={IMG.facility} alt="Smart Gym facility floor" loading="lazy" />
                </figure>
                <div className="en-sum-media-cap">{I.shield(12)} {t('en.sum.mediaCap')}</div>

                <div className="en-perks">
                  <span className="en-perks-head">{t('en.sum.perksHead')}</span>
                  <ul>
                    {(plan.features || []).map((p, i) => (
                      <li key={p} style={{ '--i': i }}>
                        <span className="en-perk-ico">{I.shield(12)}</span>{p}
                      </li>
                    ))}
                    {(!plan.features || plan.features.length === 0) && (
                      <li style={{ opacity: 0.5 }}>{t('en.plan.noFeatures')}</li>
                    )}
                  </ul>
                </div>

                <div className="en-lines">
                  <div className="en-line"><span>{plan.display_name} × {duration} {t('en.field.months')}</span><b>SAR {price.toFixed(2)}</b></div>
                  {chosenFacilities.map((f) => (
                    <div className="en-line" key={f.id}>
                      <span>{pick(f.data?.title)} × {monthsFor(f.id)} {t('en.field.months')}</span>
                      <b>SAR {(Number(f.monthly_price) * monthsFor(f.id)).toFixed(2)}</b>
                    </div>
                  ))}
                  <div className="en-line"><span>{t('en.sum.tax')}</span><b>SAR 0.00</b></div>
                </div>

                <div className="en-total" key={`t${planId}-${duration}-${facilitySelection}`}>
                  <div>
                    <span>{t('en.sum.total')}</span>
                    <em>{t('en.sum.totalSub')}</em>
                  </div>
                  <b>{tweenPrice.toFixed(2)} <i>{t('en.sum.usd')}</i></b>
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

      {/* FOOTER — unchanged */}
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

      <div className="en-paybar">
        <button className="en-paybar-btn" disabled={paybarOff} onClick={primary}>
          {I.bolt(14)} {step === 1 ? t('en.paybar.step1') : t('en.paybar.step2')}
          <b>SAR {price.toFixed(2)}</b>
        </button>
        <span className="en-paybar-sec">{I.lock(10)} {t('en.paybar.sec')}</span>
      </div>
    </div>
  );
};

export default MembershipSignup;
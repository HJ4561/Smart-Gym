// pages/ContactSupport.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import LangSwitch from '../i18n/LangSwitch';
import './ContactSupport.css';

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
  bolt: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
  ),
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A20 20 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z" /></svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  ),
  pin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
  ),
  timer: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 2h6" /></svg>
  ),
  nav: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 10 18.5 20 6.5" /></svg>
  ),
  plus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
  ),
  badge: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="5" /><path d="M8 14 6 22l6-3 6 3-2-8" /></svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.4 9.3 8 10 4.6-.7 8-5 8-10V6l-8-4z" /></svg>
  ),
  x: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
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
const IMG = {
  heroBg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80',
  map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80',
  hub1: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
  hub2: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
  hub3: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80',
};

/* ============================================================
   COMPONENT
============================================================ */
const ContactSupport = () => {
  const { t } = useLang();

  const [bootPct, setBootPct] = useState(0);
  const [boot, setBoot] = useState(false);
  const [bootGone, setBootGone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [category, setCategory] = useState('membership');
  const [subTopicKey, setSubTopicKey] = useState('ct.sub.m1');
  const [urgent, setUrgent] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState(null);
  const [occ, setOcc] = useState(74);
  const [activeSection, setActiveSection] = useState('hero');

  const sectionRefs = useRef([]);
  const kickText = useDecode(t('ct.kicker'), true);
  const sentText = useDecode(t('ct.f.sentLog'), sent);

  const hdrRef = useRef(null);
  const progRef = useRef(null);
  const heroBgRef = useRef(null);
  const beltRef = useRef(null);
  const topRingRef = useRef(null);
  const ghostRef = useRef(null);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const bootRef = useRef(false);
  const visSeen = useRef({});
  const activeRef = useRef('hero');

  /* ---------- Translated content ---------- */
  const DOTS = [
    { id: 'hero',  label: t('ct.dot.hero') },
    { id: 'grid',  label: t('ct.dot.grid') },
    { id: 'quick', label: t('ct.dot.quick') },
    { id: 'hubs',  label: t('ct.dot.hubs') },
    { id: 'faq',   label: t('ct.dot.faq') },
    { id: 'cta',   label: t('ct.dot.cta') },
  ];

  const BELT_ITEMS = [
    t('ct.belt.1'),
    t('ct.belt.2'),
    t('ct.belt.3'),
    t('ct.belt.4'),
    t('ct.belt.5'),
    t('ct.belt.6'),
  ];

  const categories = [
    { id: 'membership', label: t('ct.cat.membership') },
    { id: 'biometrics', label: t('ct.cat.biometrics') },
    { id: 'coach',      label: t('ct.cat.coach') },
    { id: 'billing',    label: t('ct.cat.billing') },
  ];

  const SUBTOPICS = {
    membership: ['ct.sub.m1', 'ct.sub.m2', 'ct.sub.m3', 'ct.sub.m4'],
    biometrics: ['ct.sub.b1', 'ct.sub.b2', 'ct.sub.b3', 'ct.sub.b4'],
    coach:      ['ct.sub.c1', 'ct.sub.c2', 'ct.sub.c3'],
    billing:    ['ct.sub.o1', 'ct.sub.o2', 'ct.sub.o3', 'ct.sub.o4'],
  };

  const quickActions = [
    { label: t('ct.qa.call'),    sub: t('ct.qa.callSub'),  meta: t('ct.qa.callMeta'), icon: I.phone, href: 'tel:+18005559090' },
    { label: t('ct.qa.wa'),      sub: t('ct.qa.waSub'),    meta: t('ct.qa.waMeta'), metaCls: 'live', icon: I.chat, href: 'https://wa.me/18005559090' },
    { label: t('ct.qa.gps'),     sub: t('ct.qa.gpsSub'),   meta: t('ct.qa.gpsMeta'), icon: I.pin, href: '#map' },
    { label: t('ct.qa.mail'),    sub: t('ct.qa.mailSub'),  meta: t('ct.qa.mailMeta'), icon: I.mail, href: '#enquiry' },
  ];

  const faqs = [
    { q: t('ct.faq.1.q'), a: t('ct.faq.1.a') },
    { q: t('ct.faq.2.q'), a: t('ct.faq.2.a') },
    { q: t('ct.faq.3.q'), a: t('ct.faq.3.a') },
    { q: t('ct.faq.4.q'), a: t('ct.faq.4.a') },
  ];

  const hubs = [
    { n: t('ct.hub.1.n'), title: t('ct.hub.1.t'), desc: t('ct.hub.1.d'), img: IMG.hub1 },
    { n: t('ct.hub.2.n'), title: t('ct.hub.2.t'), desc: t('ct.hub.2.d'), img: IMG.hub2 },
    { n: t('ct.hub.3.n'), title: t('ct.hub.3.t'), desc: t('ct.hub.3.d'), img: IMG.hub3 },
  ];

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
          setIsVisible((p) => (p[key] ? p : { ...p, [key]: true }));
        }
      }),
      { threshold: 0.12 }
    );
    sectionRefs.current.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, [boot]);

  /* Live occupancy */
  useEffect(() => {
    const id = setInterval(() => {
      setOcc((o) => Math.max(40, Math.min(92, o + (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 3)))));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  /* Master rAF */
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
        if (ghostRef.current && sectionRefs.current[6]) {
          const r = sectionRefs.current[6].getBoundingClientRect();
          if (r.bottom > -200 && r.top < vh + 200) {
            const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
            ghostRef.current.style.transform = `translate3d(${(0.5 - p) * 260}px, 0, 0)`;
          }
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

  /* Magnetic buttons */
  useEffect(() => {
    if (!bootGone) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll('.btn'));
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
  }, [bootGone]);

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
      const hit = e.target.closest('a, button, input, textarea, select, .ct-qa, .ct-hub, .ct-cat, .ct-faq-item');
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

  const jumpTo = (id) => {
    document.querySelector(`[data-section="${id}"]`)?.scrollIntoView({ behavior: 'smooth' });
  };

  const pickCategory = (id) => {
    setCategory(id);
    setSubTopicKey(SUBTOPICS[id][0]);
  };

  const faqKey = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpenFaq(openFaq === i ? -1 : i);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
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
            <span className="boot-label">{t('ct.boot')}</span>
          </div>
        </div>
      )}

      {/* SECTION DOTS */}
      <nav className="ct-dots" aria-label="Page sections">
        {DOTS.map((d) => (
          <button key={d.id}
            className={`ct-dot ${activeSection === d.id ? 'on' : ''}`}
            onClick={() => jumpTo(d.id)} aria-label={d.label}
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
            <Link to="/services">{t('nav.services')}</Link>
            <Link to="/join">{t('nav.membership')}</Link>
            <Link to="/insights">{t('nav.insights')}</Link>
            <Link to="/contact" className="on">{t('nav.contact')}</Link>
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
        className={`ct-hero ${isVisible.hero ? 'is-in' : ''}`}>

        <div className="ct-hero-bg" ref={heroBgRef}>
          <img src={IMG.heroBg} alt="Command facility" />
        </div>
        <div className="ct-hero-shade" />
        <div className="hero-cols" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="ct-cue" aria-hidden="true">
          <span className="ct-cue-line" />
          <span className="ct-cue-label">{t('ct.hero.scroll')}</span>
        </div>

        <div className="ct-hero-body">
          <div className="ct-hero-left">
            <div className="kicker"><i /><span>{kickText}</span></div>

            <h1 className="h1 ct-h1">
              <span className="row">
                <span className="w" style={{ transitionDelay: '.3s' }}>{t('ct.hero.l1')}</span>
              </span>
              <span className="row">
                <span className="w" style={{ transitionDelay: '.42s' }}>{t('ct.hero.l2')}</span>
              </span>
              <span className="row">
                <span className="w red" style={{ transitionDelay: '.55s' }}>{t('ct.hero.l3')}</span>
              </span>
            </h1>

            <p className="lede">{t('ct.hero.lede')}</p>
          </div>

          <div className="ct-hero-pill">
            <div className="ct-hero-pill-cell">
              <div className="ct-hero-pill-ico">{I.bolt}</div>
              <div>
                <div className="ct-hero-pill-lab">{t('ct.hero.pill1.lab')}</div>
                <div className="ct-hero-pill-val">{t('ct.hero.pill1.val')}</div>
              </div>
            </div>
            <i className="ct-hero-pill-div" />
            <div className="ct-hero-pill-cell">
              <div className="ct-hero-pill-ico">{I.timer}</div>
              <div>
                <div className="ct-hero-pill-lab">{t('ct.hero.pill2.lab')}</div>
                <div className="ct-hero-pill-val">{urgent ? t('ct.hero.pill2.v2') : t('ct.hero.pill2.v1')}</div>
              </div>
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

      {/* MAIN GRID */}
      <section data-section="grid" ref={(el) => (sectionRefs.current[1] = el)}
        className={`ct-grid-sec ${isVisible.grid ? 'is-in' : ''}`}>
        <div className="ct-grid">

          {/* LEFT — FORM */}
          <div className="ct-form-wrap" id="enquiry">
            <div className="ct-form-head">
              <div>
                <span className="ct-form-eyebrow">{t('ct.form.eyebrow')}</span>
                <h2 className="ct-form-title">{t('ct.form.title')}</h2>
              </div>
              <span className="ct-form-tag">{t('ct.form.tag')}</span>
            </div>

            <form className="ct-form" onSubmit={handleSubmit}>
              <div className="ct-field">
                <label>{t('ct.f.domain')} <em>*</em></label>
                <div className="ct-cats" role="radiogroup" aria-label={t('ct.f.domain')}>
                  {categories.map((c) => (
                    <button type="button" key={c.id}
                      className={`ct-cat ${category === c.id ? 'on' : ''}`}
                      onClick={() => pickCategory(c.id)}
                      role="radio" aria-checked={category === c.id}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ct-field">
                <label>{t('ct.f.subtopic')}</label>
                <div className="ct-select">
                  <select value={subTopicKey}
                    onChange={(e) => setSubTopicKey(e.target.value)}>
                    {SUBTOPICS[category].map((s) => <option key={s} value={s}>{t(s)}</option>)}
                  </select>
                  <span className="ct-select-arrow">▾</span>
                </div>
              </div>

              <div className="ct-row-2">
                <div className="ct-field">
                  <label>{t('ct.f.name')} <em>*</em></label>
                  <input type="text" required placeholder={t('ct.f.namePh')} />
                </div>
                <div className="ct-field">
                  <label>{t('ct.f.phone')} <span>{t('ct.f.optional')}</span></label>
                  <input type="tel" placeholder={t('ct.f.phonePh')} />
                </div>
              </div>

              <div className="ct-field">
                <label>{t('ct.f.email')} <em>*</em></label>
                <input type="email" required placeholder={t('ct.f.emailPh')} />
              </div>

              <div className="ct-field">
                <div className="ct-field-top">
                  <label>{t('ct.f.msg')} <em>*</em></label>
                  <span className={`ct-field-count ${msg.length >= 950 ? 'warn' : ''}`}>
                    {msg.length} / 1000
                  </span>
                </div>
                <textarea
                  rows="4"
                  required
                  maxLength={1000}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder={t('ct.f.msgPh')}
                />
              </div>

              <div className="ct-attach">
                <div className="ct-attach-info">
                  <span className="ct-attach-ico">{file ? I.check : I.plus}</span>
                  <div>
                    <div className="ct-attach-title">{file || t('ct.f.attachTitle')}</div>
                    <div className="ct-attach-sub">{t('ct.f.attachSub')}</div>
                  </div>
                </div>
                {file ? (
                  <button type="button" className="ct-attach-btn ct-attach-clear"
                    onClick={() => setFile(null)}>
                    {I.x} {t('ct.f.remove')}
                  </button>
                ) : (
                  <label className="ct-attach-btn">
                    {t('ct.f.browse')}
                    <input type="file" hidden accept=".pdf,.png,.log,.csv"
                      onChange={(e) => setFile(e.target.files?.[0]?.name || null)} />
                  </label>
                )}
              </div>

              <div className="ct-cta-row">
                <span className="ct-sla">
                  <i /> {urgent ? t('ct.f.slaUrgent') : t('ct.f.slaDefault')}
                </span>
                <button type="button"
                  className={`ct-urgent ${urgent ? 'on' : ''}`}
                  role="switch" aria-checked={urgent}
                  onClick={() => setUrgent(!urgent)}>
                  <span className="ct-urgent-track"><i /></span>
                  {t('ct.f.priority')}
                </button>
                <button type="submit" className={`btn btn-red btn-lg ct-submit ${urgent ? 'priority' : ''}`} disabled={sent}>
                  {sent ? <>{I.check} {t('ct.f.sent')}</> : <>{t('ct.f.submit')} {I.arrow()}</>}
                </button>
              </div>

              {sent && <div className="ct-success">{sentText}</div>}
            </form>
          </div>

          {/* RIGHT — RAIL */}
          <aside className="ct-rail">

            <div className="ct-side ct-side-hq">
              <div className="ct-side-glow" aria-hidden="true" />
              <div className="ct-side-head">
                <span className="ct-side-label">{t('ct.rail.node')}</span>
                <span className="ct-side-live"><i />{t('ct.rail.open')}</span>
              </div>
              <h3 className="ct-side-title">{t('ct.rail.title')}</h3>
              <p className="ct-side-desc">{t('ct.rail.addr')}</p>

              <div className="ct-quick">
                <a className="ct-qa" href="tel:+18005557627">
                  <span className="ct-qa-ico">{I.phone}</span>
                  <span className="ct-qa-label">{t('ct.rail.desk')}</span>
                </a>
                <a className="ct-qa" href="https://wa.me/18005557627" target="_blank" rel="noopener noreferrer">
                  <span className="ct-qa-ico emerald">{I.chat}</span>
                  <span className="ct-qa-label">{t('ct.rail.wa')}</span>
                </a>
                <a className="ct-qa" href="#map">
                  <span className="ct-qa-ico">{I.nav}</span>
                  <span className="ct-qa-label">{t('ct.rail.gps')}</span>
                </a>
              </div>

              <div className="ct-telemetry">
                <div className="ct-tel-row">
                  <span>{t('ct.rail.cap')}</span>
                  <b>{occ}%</b>
                </div>
                <div className="ct-tel-bar"><i style={{ '--w': `${occ}%` }} /></div>
                <div className="ct-tel-grid">
                  <div>
                    <span>{t('ct.rail.queue')}</span>
                    <b>{occ > 85 ? t('ct.rail.queue6') : t('ct.rail.queue0')}</b>
                  </div>
                  <div>
                    <span>{t('ct.rail.avg')}</span>
                    <b className="hot">{t('ct.rail.avgV')}</b>
                  </div>
                </div>
              </div>
            </div>

            <div className="ct-side ct-side-map" id="map">
              <div className="ct-map-head">
                <span className="ct-map-label">
                  <i className="ct-map-pin">{I.pin}</i>
                  {t('ct.map.label')}
                </span>
                <span className="ct-map-coords">35.6762° N, 139.6503° E</span>
              </div>

              <div className="ct-map">
                <img src={IMG.map} alt="Campus map" />
                <div className="ct-map-overlay" />
                <span className="ct-map-tag top-left">{t('ct.map.tag1')}</span>
                <span className="ct-map-tag top-right">{t('ct.map.tag2')}</span>
                <span className="ct-map-portal">
                  <i />
                  <b>{t('ct.map.portal')}</b>
                </span>
              </div>

              <div className="ct-map-foot">
                <span>{t('ct.map.foot')}</span>
                <a href="#map">{t('ct.map.expand')} {I.arrow(10)}</a>
              </div>
            </div>

          </aside>
        </div>
      </section>

      {/* QUICK ACTIONS STRIP */}
      <section data-section="quick" ref={(el) => (sectionRefs.current[2] = el)}
        className={`ct-quick-sec ${isVisible.quick ? 'is-in' : ''}`}>
        <div className="ct-quick-grid">
          {quickActions.map((q, i) => (
            <a className="ct-quick-card" key={q.label} href={q.href} style={{ '--i': i }}>
              <div className="ct-quick-card-head">
                <span className="ct-quick-card-ico">{q.icon}</span>
                <span className={`ct-quick-card-meta ${q.metaCls || ''}`}>{q.meta}</span>
              </div>
              <div className="ct-quick-card-foot">
                <span className="ct-quick-card-label">{q.label}</span>
                <span className="ct-quick-card-sub">{q.sub}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CAMPUS HUBS */}
      <section data-section="hubs" ref={(el) => (sectionRefs.current[3] = el)}
        className={`ct-hubs ${isVisible.hubs ? 'is-in' : ''}`}>
        <div className="ct-hubs-head">
          <div>
            <span className="ct-hubs-eyebrow">{t('ct.hubs.eyebrow')}</span>
            <h2 className="ct-hubs-title">{t('ct.hubs.title')}</h2>
          </div>
          <p className="ct-hubs-desc">{t('ct.hubs.desc')}</p>
        </div>

        <div className="ct-hubs-grid">
          {hubs.map((h, i) => (
            <article className="ct-hub" key={h.title} style={{ '--i': i }}>
              <div className="ct-hub-media">
                <img src={h.img} alt={h.title} loading="lazy" />
                <span className="ct-hub-badge">{h.n}</span>
              </div>
              <div className="ct-hub-body">
                <h3 className="ct-hub-title">{h.title}</h3>
                <p className="ct-hub-desc">{h.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section data-section="faq" ref={(el) => (sectionRefs.current[4] = el)}
        className={`ct-faq ${isVisible.faq ? 'is-in' : ''}`}>
        <div className="ct-faq-head">
          <span className="ct-faq-eyebrow">{I.shield} {t('ct.faq.eyebrow')}</span>
          <h2 className="ct-faq-title">{t('ct.faq.title')}</h2>
          <p className="ct-faq-desc">{t('ct.faq.desc')}</p>
        </div>

        <div className="ct-faq-grid">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className={`ct-faq-item ${openFaq === i ? 'on' : ''}`}
              onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              onKeyDown={(e) => faqKey(e, i)}
              role="button"
              tabIndex={0}
              aria-expanded={openFaq === i}
            >
              <div className="ct-faq-q">
                <h4>{f.q}</h4>
                <span className="ct-faq-toggle">{I.plus}</span>
              </div>
              <div className="ct-faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* SAFETY */}
      <section data-section="safety" ref={(el) => (sectionRefs.current[5] = el)}
        className={`ct-safety ${isVisible.safety ? 'is-in' : ''}`}>
        <div className="ct-safety-card">
          <div className="ct-safety-left">
            <span className="ct-safety-ico">{I.badge}</span>
            <div>
              <div className="ct-safety-title">{t('ct.safety.title')}</div>
              <div className="ct-safety-sub">{t('ct.safety.sub')}</div>
            </div>
          </div>
          <a href="tel:911" className="ct-safety-btn">{t('ct.safety.cta')}</a>
        </div>
      </section>

      {/* CTA */}
      <section id="join" data-section="cta" ref={(el) => (sectionRefs.current[6] = el)}
        className={`cta ${isVisible.cta ? 'is-in' : ''}`}>
        <span className="cta-ghost" ref={ghostRef} aria-hidden="true">{t('ct.cta.ghost')}</span>
        <div className="cta-in">
          <span className="cta-eyebrow"><i />{t('ct.cta.eyebrow')}</span>
          <h2>{t('ct.cta.h2a')}<br /><em>{t('ct.cta.h2b')}</em></h2>
          <p>{t('ct.cta.desc')}</p>
          <Link to="/join" className="btn btn-red btn-lg cta-btn">{t('ct.cta.btn')} {I.arrow()}</Link>
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
        <Link to="/">{I.home}<span>{t('ct.tab.home')}</span></Link>
        <Link to="/facilities">{I.grid}<span>{t('ct.tab.facilities')}</span></Link>
        <Link to="/services">{I.bolt}<span>{t('ct.tab.services')}</span></Link>
        <Link to="/join" className="tab-join">{I.flame}<span>{t('ct.tab.join')}</span></Link>
      </nav>
    </div>
  );
};

export default ContactSupport;
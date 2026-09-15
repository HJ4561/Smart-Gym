// pages/InsightsBlog.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import LangSwitch from '../i18n/LangSwitch';
import './InsightsBlog.css';

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
  chevron: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
  ),
  close: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
  ),
  bookmark: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h12v17l-6-4-6 4V4z" /></svg>
  ),
  bookmarkFill: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h12v17l-6-4-6 4V4z" /></svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
  ),
  bolt: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
  ),
  clock: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
  ),
  equalizer: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 20v-6M12 20V4M19 20v-9" /></svg>
  ),
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
  ),
  grid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
  ),
  spark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" /></svg>
  ),
  flame: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4.4 0 7-2.8 7-6.5 0-4.5-4-6-4.5-10.5C12 6.5 9 8 9 11.5c0-1-.8-2.2-1.8-2.7C6.4 10 5 12 5 15.5 5 19.2 7.6 22 12 22z" /></svg>
  ),
  sensor: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="2" /><path d="M12 4a8 8 0 0 1 8 8M4 12a8 8 0 0 1 8-8M12 20a8 8 0 0 0 8-8M20 12a8 8 0 0 0-8-8" /></svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 10 18.5 20 6.5" /></svg>
  ),
  sync: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-15.5 6.2M3 12a9 9 0 0 1 15.5-6.2M3 12v6M21 12v-6" /></svg>
  ),
  shield: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.4 9.3 8 10 4.6-.7 8-5 8-10V6l-8-4z" /></svg>
  ),
};

/* ============================================================
   STATIC IMAGES
============================================================ */
const IMG = {
  heroBg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80',
  featured: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
  vo2: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
  nutrition: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
  cryo: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80',
  grip: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
  squat: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
};

/* ============================================================
   COMPONENT
============================================================ */
const InsightsBlog = () => {
  const { t } = useLang();

  const [bootPct, setBootPct] = useState(0);
  const [boot, setBoot] = useState(false);
  const [bootGone, setBootGone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState(new Set());
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState({});

  const sectionRefs = useRef([]);
  const kickText = useDecode(t('ins.kicker'), true);
  const successText = useDecode(t('ins.news.success'), subscribed);

  const hdrRef = useRef(null);
  const progRef = useRef(null);
  const heroBgRef = useRef(null);
  const beltRef = useRef(null);
  const topRingRef = useRef(null);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const bootRef = useRef(false);
  const visSeen = useRef({});

  /* ---------- Translated content ---------- */
  const BELT_ITEMS = [
    t('ins.belt.training'),
    t('ins.belt.nutrition'),
    t('ins.belt.recovery'),
    t('ins.belt.biometrics'),
    t('ins.belt.cases'),
    t('ins.belt.protocols'),
  ];

  const filterCats = [
    { id: 'all',         label: t('ins.f.all'),       count: 48 },
    { id: 'training',    label: t('ins.f.training') },
    { id: 'nutrition',   label: t('ins.f.nutrition') },
    { id: 'recovery',    label: t('ins.f.recovery') },
    { id: 'biometrics',  label: t('ins.f.biometrics') },
    { id: 'case-studies',label: t('ins.f.cases') },
  ];

  const trendingMetrics = [
    { l: t('ins.m1.l'), v: '1,420',  sub: t('ins.m1.s'), icon: I.sensor },
    { l: t('ins.m2.l'), v: '94.2',   sub: t('ins.m2.s'), icon: I.equalizer },
    { l: t('ins.m3.l'), v: '3.8L',   sub: t('ins.m3.s'), icon: I.flame },
    { l: t('ins.m4.l'), v: '+18.4%', sub: t('ins.m4.s'), icon: I.bolt },
  ];

  const articles = [
    {
      id: 1, category: 'biometrics',
      tag: t('ins.art1.tag'), date: t('ins.art1.date'),
      title: t('ins.art1.title'), desc: t('ins.art1.desc'), read: t('ins.art1.read'),
      img: IMG.vo2, authorInitials: 'MK', author: t('ins.art1.author'), line: t('ins.art1.line'),
    },
    {
      id: 2, category: 'nutrition',
      tag: t('ins.art2.tag'), date: t('ins.art2.date'),
      title: t('ins.art2.title'), desc: t('ins.art2.desc'), read: t('ins.art2.read'),
      img: IMG.nutrition, authorInitials: 'SL', author: t('ins.art2.author'), line: t('ins.art2.line'),
    },
    {
      id: 3, category: 'recovery',
      tag: t('ins.art3.tag'), date: t('ins.art3.date'),
      title: t('ins.art3.title'), desc: t('ins.art3.desc'), read: t('ins.art3.read'),
      img: IMG.cryo, authorInitials: 'JT', author: t('ins.art3.author'), line: t('ins.art3.line'),
    },
    {
      id: 4, category: 'training',
      tag: t('ins.art4.tag'), date: t('ins.art4.date'),
      title: t('ins.art4.title'), desc: t('ins.art4.desc'), read: t('ins.art4.read'),
      img: IMG.grip, authorInitials: 'DR', author: t('ins.art4.author'), line: t('ins.art4.line'),
    },
    {
      id: 5, category: 'training',
      tag: t('ins.art5.tag'), date: t('ins.art5.date'),
      title: t('ins.art5.title'), desc: t('ins.art5.desc'), read: t('ins.art5.read'),
      img: IMG.squat, authorInitials: 'EV', author: t('ins.art5.author'), line: t('ins.art5.line'),
    },
  ];

  const taxonomyTags = [
    t('ins.tax.t1'), t('ins.tax.t2'), t('ins.tax.t3'),
    t('ins.tax.t4'), t('ins.tax.t5'), t('ins.tax.t6'),
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

      if (!reduced) {
        if (heroBgRef.current) heroBgRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
        if (beltRef.current) {
          const sk = Math.max(-6, Math.min(6, vel * 0.25));
          beltRef.current.style.transform = `translate3d(${-y * 0.3}px, 0, 0) skewX(${sk}deg)`;
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
      const hit = e.target.closest('a, button, input, .ins-card, .ins-featured');
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

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = articles.filter((a) => {
    const cat = activeFilter === 'all' || a.category === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const s = q === '' ||
      a.title.toLowerCase().includes(q) ||
      a.desc.toLowerCase().includes(q) ||
      a.tag.toLowerCase().includes(q);
    return cat && s;
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
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
            <span className="boot-label">{t('ins.boot')}</span>
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
            <Link to="/facilities">{t('nav.facilities')}</Link>
            <Link to="/services">{t('nav.services')}</Link>
            <Link to="/join">{t('nav.membership')}</Link>
            <Link to="/insights" className="on">{t('nav.insights')}</Link>
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
        className={`ins-hero ${isVisible.hero ? 'is-in' : ''}`}>

        <div className="ins-hero-bg" ref={heroBgRef}>
          <img src={IMG.heroBg} alt="Kinetic lab" />
        </div>
        <div className="ins-hero-shade" />
        <div className="hero-cols" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="ins-hero-body">
          <div className="kicker"><i /><span>{kickText}</span></div>

          <div className="ins-hero-title-row">
            <h1 className="h1 ins-h1">
              <span className="row">
                <span className="w" style={{ transitionDelay: '.3s' }}>{t('ins.hero.l1')}</span>
                <span className="w red" style={{ transitionDelay: '.42s' }}>{t('ins.hero.l2')}</span>
              </span>
            </h1>
            <div className="ins-issue">
              <span>{t('ins.issue.left')}</span>
              <i />
              <span>{t('ins.issue.right')}</span>
            </div>
          </div>

          <p className="lede">{t('ins.hero.lede')}</p>
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
        className={`ins-filterbar ${isVisible.filters ? 'is-in' : ''}`}>
        <div className="ins-filterbar-inner">
          <div className="ins-chips">
            {filterCats.map((f, i) => (
              <button key={f.id} style={{ '--i': i }}
                className={`fchip ${activeFilter === f.id ? 'on' : ''}`}
                onClick={() => setActiveFilter(f.id)}>
                {f.label}
                {f.count && <em>{f.count}</em>}
              </button>
            ))}
          </div>

          <label className="search ins-search">
            {I.search}
            <input
              placeholder={t('ins.search.ph')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button type="button" className="ins-search-clear"
                onClick={() => setSearchQuery('')} aria-label="Clear search"
              >{I.close}</button>
            )}
          </label>
        </div>
      </section>

      {/* FEATURED */}
      <section data-section="featured" ref={(el) => (sectionRefs.current[2] = el)}
        className={`ins-featured-wrap ${isVisible.featured ? 'is-in' : ''}`}>
        <div className="ins-featured">
          <div className="ins-featured-media">
            <img src={IMG.featured} alt="Featured article" />
            <div className="ins-featured-media-shade" />
            <div className="ins-featured-badge">
              <span className="ins-featured-badge-dot" />
              {t('ins.feat.badge')}
            </div>
            <div className="ins-featured-spark">
              <span className="ins-featured-spark-lab">{t('ins.feat.sparkLab')}</span>
              <span className="ins-featured-spark-val">1.18 m/s</span>
              <svg className="ins-featured-spark-svg" viewBox="0 0 64 16" fill="none" preserveAspectRatio="none">
                <path d="M1 12L12 8L22 14L34 3L45 9L63 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="ins-featured-body">
            <div className="ins-featured-tags">
              <span className="ins-featured-tag">{t('ins.feat.tag')}</span>
              <span className="ins-featured-lab">{t('ins.feat.certified')}</span>
            </div>

            <h2 className="ins-featured-title">{t('ins.feat.title')}</h2>

            <p className="ins-featured-desc">{t('ins.feat.desc')}</p>

            <div className="ins-featured-foot">
              <div className="ins-featured-author">
                <div className="ins-featured-avatar">EV</div>
                <div>
                  <div className="ins-featured-author-name">{t('ins.feat.author')}</div>
                  <div className="ins-featured-author-meta">{t('ins.feat.authorMeta')}</div>
                </div>
              </div>
              <span className="ins-featured-date">{t('ins.feat.date')}</span>
            </div>

            <a href="#read-protocol" className="ins-featured-cta">
              <span>{t('ins.feat.cta')}</span>
              {I.arrow()}
            </a>
          </div>
        </div>
      </section>

      {/* TRENDING METRICS */}
      <section data-section="metrics" ref={(el) => (sectionRefs.current[3] = el)}
        className={`ins-metrics ${isVisible.metrics ? 'is-in' : ''}`}>
        {trendingMetrics.map((m, i) => (
          <div className="ins-metric" key={m.l} style={{ '--i': i }}>
            <div className="ins-metric-head">
              <span className="ins-metric-lab">{m.l}</span>
              <span className="ins-metric-ico">{m.icon}</span>
            </div>
            <div className="ins-metric-val">
              <b>{m.v}</b>
              <em>{m.sub}</em>
            </div>
          </div>
        ))}
      </section>

      {/* ARTICLE GRID */}
      <section data-section="archive" ref={(el) => (sectionRefs.current[4] = el)}
        className={`ins-archive ${isVisible.archive ? 'is-in' : ''}`}>
        <div className="ins-archive-head">
          <div>
            <span className="ins-archive-eyebrow">{t('ins.arch.eyebrow')}</span>
            <h3 className="ins-archive-title"><MaskWords text={t('ins.arch.title')} /></h3>
          </div>
          <div className="ins-archive-tools">
            <button className="ins-tool on" aria-label={t('ins.arch.toolGrid')}>{I.grid}</button>
            <button className="ins-tool" aria-label={t('ins.arch.toolList')}>{I.spark}</button>
          </div>
        </div>

        <div className="ins-grid">
          {filtered.map((a, i) => (
            <article className="ins-card" key={a.id} style={{ '--i': i }}>
              <div className="ins-card-media">
                <img src={a.img} alt={a.title} loading="lazy" />
                <span className="ins-card-tag">{a.tag}</span>
                <span className="ins-card-read">{a.read}</span>
              </div>
              <div className="ins-card-body">
                <div className="ins-card-meta">
                  <span>{a.line}</span>
                  <i />
                  <span>{a.date}</span>
                </div>
                <h4 className="ins-card-title">{a.title}</h4>
                <p className="ins-card-desc">{a.desc}</p>
              </div>
              <div className="ins-card-foot">
                <div className="ins-card-author">
                  <div className="ins-card-avatar">{a.authorInitials}</div>
                  <span>{a.author}</span>
                </div>
                <a href={`#read-${a.id}`} className="ins-card-readmore">
                  {t('ins.card.read')} {I.chevron}
                </a>
              </div>
            </article>
          ))}

          <article className="ins-card ins-card-newsletter" style={{ '--i': filtered.length }}>
            <span className="ins-news-topline" />
            <div className="ins-news-head">
              <span className="ins-news-ico">{I.mail}</span>
              <span className="ins-news-label">{t('ins.news.label')}</span>
            </div>
            <h4 className="ins-news-title">{t('ins.news.title')}</h4>
            <p className="ins-news-desc">{t('ins.news.desc')}</p>

            {subscribed ? (
              <div className="ins-news-success">
                {I.check}
                <span>{successText}</span>
              </div>
            ) : (
              <form className="ins-news-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder={t('ins.news.ph')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="ins-news-check">
                  <input type="checkbox" defaultChecked />
                  <span>{t('ins.news.checkbox')}</span>
                </label>
                <button type="submit" className="ins-news-cta">
                  {t('ins.news.cta')} {I.bolt}
                </button>
              </form>
            )}

            <div className="ins-news-foot">
              <span>{t('ins.news.footLeft')}</span>
              <span>{t('ins.news.footRight')}</span>
            </div>
          </article>
        </div>

        {filtered.length === 0 && (
          <div className="ins-empty">
            <div className="ins-empty-ico">{I.search}</div>
            <h3>{t('ins.empty.title')}</h3>
            <p>{t('ins.empty.desc')}</p>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
            >{t('ins.empty.reset')}</button>
          </div>
        )}
      </section>

      {/* PAGINATION */}
      <section data-section="pagination" ref={(el) => (sectionRefs.current[5] = el)}
        className={`ins-pagination ${isVisible.pagination ? 'is-in' : ''}`}>
        <div className="ins-pag-inner">
          <div className="ins-pag-left">
            <span className="ins-pag-label">
              {t('ins.pag.showing')} {String(Math.min(filtered.length, 6)).padStart(2, '0')} {t('ins.pag.of')} 48 {t('ins.pag.total')}
            </span>
            <div className="ins-pag-bar"><i style={{ width: '12.5%' }} /></div>
          </div>
          <div className="ins-pag-right">
            <button className="ins-pag-btn">{t('ins.pag.prev')}</button>
            <div className="ins-pag-nums">
              <span className="on">1</span>
              <span>2</span>
              <span>3</span>
              <span className="dots">…</span>
              <span>8</span>
            </div>
            <button className="ins-pag-btn primary">{t('ins.pag.next')}</button>
          </div>
        </div>
      </section>

      {/* TAXONOMY */}
      <section data-section="tags" ref={(el) => (sectionRefs.current[6] = el)}
        className={`ins-taxonomy ${isVisible.tags ? 'is-in' : ''}`}>
        <div className="ins-tax-left">
          <span className="ins-tax-label">{t('ins.tax.label')}</span>
          <h5 className="ins-tax-title">{t('ins.tax.title')}</h5>
        </div>
        <div className="ins-tax-tags">
          {taxonomyTags.map((tag, i) => (
            <button key={tag} className="ins-tax-tag" style={{ '--i': i }}>{tag}</button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="join" data-section="cta" ref={(el) => (sectionRefs.current[7] = el)}
        className={`cta ${isVisible.cta ? 'is-in' : ''}`}>
        <span className="cta-ghost" aria-hidden="true">INSIGHTS</span>
        <div className="cta-in">
          <span className="cta-eyebrow"><i />{t('ins.cta.eyebrow')}</span>
          <h2>{t('ins.cta.h2a')}<br /><em>{t('ins.cta.h2b')}</em></h2>
          <p>{t('ins.cta.desc')}</p>
          <button className="btn btn-red btn-lg cta-btn">{t('ins.cta.btn')} {I.arrow()}</button>
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
        <Link to="/">{I.home}<span>{t('ins.tab.home')}</span></Link>
        <Link to="/facilities">{I.grid}<span>{t('ins.tab.facilities')}</span></Link>
        <Link to="/services">{I.bolt}<span>{t('ins.tab.services')}</span></Link>
        <a href="#join" className="tab-join">{I.flame}<span>{t('ins.tab.join')}</span></a>
      </nav>
    </div>
  );
};

export default InsightsBlog;
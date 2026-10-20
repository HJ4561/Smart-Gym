// src/components/SitePage.jsx
// Header + footer shell for the simpler pages (article, 404). Uses the same
// classes as the main pages (hdr / mnav / foot), so it looks like the rest of the site.
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import LangSwitch from '../i18n/LangSwitch';

const Logo = () => (
  <svg width="16" height="16" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 6v14M9 3v20M17 3v20M22 6v14M9 13h8" /></svg>
);

const NAV = [
  ['/', 'nav.home'],
  ['/facilities', 'nav.facilities'],
  ['/services', 'nav.services'],
  ['/join', 'nav.membership'],
  ['/insights', 'nav.insights'],
  ['/contact', 'nav.contact'],
];

export default function SitePage({ active, children }) {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  return (
    <div className={`sg sg-simple ${menuOpen ? 'menu-open' : ''}`}>
      <header className="hdr is-scrolled">
        <div className="hdr-in">
          <Link className="brand" to="/" aria-label="Smart Gym home">
            <span className="brand-mark"><Logo /></span>
            <span className="brand-txt">SMART<em>GYM</em></span>
          </Link>
          <nav className="hdr-nav">
            {NAV.map(([to, key]) => (
              <Link key={to} to={to} className={active === to ? 'on' : ''}>{t(key)}</Link>
            ))}
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
      </header>

      <div className={`mnav ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav>
          {NAV.map(([to, key], i) => (
            <Link key={to} to={to} style={{ '--d': `${0.06 + i * 0.05}s` }} onClick={() => setMenuOpen(false)}>
              <span>{String(i + 1).padStart(2, '0')}</span>{t(key)}
            </Link>
          ))}
        </nav>
        <LangSwitch variant="mobile" />
        <span className="mnav-foot">{t('nav.foot')}</span>
      </div>

      <main className="simple-main">{children}</main>

      <footer className="foot">
        <div className="foot-bottom">
          <p>{t('foot.rights')}</p>
          <div className="foot-legal">
            <Link to="/contact">{t('nav.contact')}</Link>
            <Link to="/join">{t('nav.membership')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

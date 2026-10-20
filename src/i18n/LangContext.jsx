// src/i18n/LangContext.jsx
// Language + site content. Texts and images are managed in the admin portal
// (Public Website → Site Content) and loaded from /api/public/site-content/.
// The texts bundled in ./strings are the fallback: the site renders with them
// immediately and if the API is unreachable. The last fetched content is cached
// in localStorage, so repeat visits show admin edits without a flash.
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { strings, LANGS, DEFAULT_LANG } from './strings';
import publicService from '../services/publicService';

const LangContext = createContext(null);
const CONTENT_CACHE_KEY = 'sg.content.v1';

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
};

const safeLang = (raw) => (LANGS.includes(raw) ? raw : DEFAULT_LANG);

const readCachedContent = () => {
  try {
    const cached = JSON.parse(window.localStorage.getItem(CONTENT_CACHE_KEY) || 'null');
    return cached && cached.texts && cached.images ? cached : null;
  } catch {
    return null;
  }
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG;
    return safeLang(window.localStorage.getItem('sg.lang'));
  });
  const [content, setContent] = useState(() => (typeof window === 'undefined' ? null : readCachedContent()));

  /* Runs BEFORE paint — no flash of wrong direction */
  useLayoutEffect(() => {
    const html = document.documentElement;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    html.setAttribute('lang', lang);
    html.setAttribute('dir', dir);
    html.style.direction = dir;
    document.body.style.direction = dir;

    try { window.localStorage.setItem('sg.lang', lang); } catch { /* storage blocked */ }
  }, [lang]);

  /* Fetch the admin-managed content once per visit (cached copy shows meanwhile). */
  useEffect(() => {
    let alive = true;
    publicService.siteContent()
      .then((data) => {
        if (!alive || !data?.texts) return;
        setContent(data);
        try { window.localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(data)); } catch { /* quota/blocked */ }
      })
      .catch(() => { /* keep cached or bundled content */ });
    return () => { alive = false; };
  }, []);

  const t = (key, vars) => {
    const remote = content?.texts?.[key];
    const entry = strings[key];
    let out = remote?.[lang] || remote?.[DEFAULT_LANG] || entry?.[lang] || entry?.[DEFAULT_LANG];
    if (out === undefined) {
      if (import.meta.env.DEV) console.warn('[i18n] missing key:', key);
      return key;
    }
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        out = out.replace(new RegExp(`{{${k}}}`, 'g'), v);
      });
    }
    return out;
  };

  /** Admin-managed image for a slot, e.g. img('fac.heroBg', builtInUrl). */
  const img = (key, fallback = '') => content?.images?.[key]?.url || fallback;

  /** Screen-reader description for an image slot in the current language. */
  const imgAlt = (key, fallback = '') => {
    const image = content?.images?.[key];
    return (lang === 'ar' ? image?.alt_ar : image?.alt_en) || image?.alt_en || fallback;
  };

  /** Pick the current language from a bilingual {en, ar} value (lists, plans). */
  const pick = (value) => {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[lang] || value[DEFAULT_LANG] || '';
  };

  const isRTL = lang === 'ar';

  return (
    <LangContext.Provider value={{ lang, setLang, t, img, imgAlt, pick, isRTL }}>
      {children}
    </LangContext.Provider>
  );
};

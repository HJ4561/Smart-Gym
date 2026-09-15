// src/i18n/LangContext.jsx
import React, { createContext, useContext, useLayoutEffect, useState } from 'react';
import { strings, LANGS, DEFAULT_LANG } from './strings';

const LangContext = createContext(null);

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
};

const safeLang = (raw) => (LANGS.includes(raw) ? raw : DEFAULT_LANG);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG;
    return safeLang(window.localStorage.getItem('sg.lang'));
  });

  /* Runs BEFORE paint — no flash of wrong direction */
  useLayoutEffect(() => {
    const html = document.documentElement;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    html.setAttribute('lang', lang);
    html.setAttribute('dir', dir);
    html.style.direction = dir;
    document.body.style.direction = dir;

    try { window.localStorage.setItem('sg.lang', lang); } catch {}
  }, [lang]);

  const t = (key, vars) => {
    const entry = strings[key];
    if (!entry) {
      if (import.meta.env.DEV) console.warn('[i18n] missing key:', key);
      return key;
    }
    let out = entry[lang] ?? entry[DEFAULT_LANG] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        out = out.replace(new RegExp(`{{${k}}}`, 'g'), v);
      });
    }
    return out;
  };

  const isRTL = lang === 'ar';

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LangContext.Provider>
  );
};
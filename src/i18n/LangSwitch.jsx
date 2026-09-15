// src/i18n/LangSwitch.jsx
import React from 'react';
import { useLang } from './LangContext';
import './LangSwitch.css';

export default function LangSwitch({ variant = 'header' }) {
  const { lang, setLang } = useLang();

  return (
    <div className={`langswitch ${variant}`} role="group" aria-label="Language">
      <button
        type="button"
        className={`langswitch-btn ${lang === 'en' ? 'on' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <span className="langswitch-div" aria-hidden="true" />
      <button
        type="button"
        className={`langswitch-btn ${lang === 'ar' ? 'on' : ''}`}
        onClick={() => setLang('ar')}
        aria-pressed={lang === 'ar'}
      >
        ع
      </button>
    </div>
  );
}
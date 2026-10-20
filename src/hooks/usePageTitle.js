// src/hooks/usePageTitle.js
// Browser-tab title + meta description for the current page (texts are admin-editable).
import { useEffect } from 'react';
import { useLang } from '../i18n/LangContext';

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el && value) el.setAttribute(attr, value);
};

/** usePageTitle() → site title; usePageTitle('Facilities') → "Facilities · Smart Gym". */
export default function usePageTitle(title, description) {
  const { t } = useLang();
  const siteTitle = t('meta.title');
  const fullTitle = title ? `${title} · Smart Gym` : siteTitle;
  const desc = description || t('meta.description');

  useEffect(() => {
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', desc);
  }, [fullTitle, desc]);
}

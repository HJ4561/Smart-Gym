// src/pages/NotFound.jsx — any unknown URL.
import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import SitePage from '../components/SitePage';
import usePageTitle from '../hooks/usePageTitle';
import './ArticlePage.css';

export default function NotFound() {
  const { t } = useLang();
  usePageTitle(t('nf.title'));
  return (
    <SitePage>
      <section className="nf">
        <span className="nf-code" aria-hidden="true">404</span>
        <h1 className="art-title">{t('nf.title')}</h1>
        <p>{t('nf.desc')}</p>
        <div className="nf-actions">
          <Link to="/" className="btn btn-red">{t('nf.home')}</Link>
          <Link to="/contact" className="btn btn-ghost">{t('nav.contact')}</Link>
        </div>
      </section>
    </SitePage>
  );
}

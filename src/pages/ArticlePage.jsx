// src/pages/ArticlePage.jsx
// /insights/:slug — one article from the admin portal (Public Website → Lists → Articles).
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import publicService from '../services/publicService';
import SitePage from '../components/SitePage';
import usePageTitle from '../hooks/usePageTitle';
import { articleView } from './articleView';
import './ArticlePage.css';

export default function ArticlePage() {
  const { slug } = useParams();
  const { t, pick, lang } = useLang();
  const [state, setState] = useState({ slug: null, item: null, error: null });

  useEffect(() => {
    let alive = true;
    publicService.collectionItem('articles', slug)
      .then((item) => { if (alive) setState({ slug, item, error: null }); })
      .catch((error) => { if (alive) setState({ slug, item: null, error }); });
    return () => { alive = false; };
  }, [slug]);

  const loading = state.slug !== slug;
  const article = !loading && state.item ? articleView(state.item, { pick, lang, t }) : null;
  usePageTitle(article?.title || t('nav.insights'), article?.desc);

  // The body is plain text written in the admin portal; blank lines separate paragraphs.
  const paragraphs = (article?.body || article?.desc || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <SitePage active="/insights">
      <article className="art">
        <Link to="/insights" className="art-back">← {t('art.back')}</Link>

        {loading && <p className="art-status" role="status">{t('art.loading')}</p>}

        {!loading && !article && (
          <div className="art-status">
            <h1 className="art-title">{t('art.missing.title')}</h1>
            <p>{t('art.missing.desc')}</p>
          </div>
        )}

        {article && (
          <>
            <header className="art-head">
              {article.tag && <span className="art-tag">{article.tag}</span>}
              <h1 className="art-title">{article.title}</h1>
              <div className="art-meta">
                {article.author && <span className="art-avatar" aria-hidden="true">{article.authorInitials}</span>}
                <span>
                  {article.author && <b>{article.author}</b>}
                  {[article.line, article.date, article.read].filter(Boolean).join(' · ')}
                </span>
              </div>
            </header>
            {article.img && <img className="art-img" src={article.img} alt={article.title} />}
            <div className="art-body">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="art-foot">
              <Link to="/insights" className="btn btn-ghost">{t('art.more')}</Link>
              <Link to="/join" className="btn btn-red">{t('nav.joinNow')}</Link>
            </div>
          </>
        )}
      </article>
    </SitePage>
  );
}

// src/pages/PaymentCallback.jsx
// Moyasar redirects here after 3-D Secure / STC Pay: /join/payment-callback?id=...&status=...
// The `status` query param is user-editable and deliberately ignored — only the
// backend's verification (which re-fetches the payment from Moyasar) counts.
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import publicService from '../services/publicService';
import { useLang } from '../i18n/LangContext';
import usePageTitle from '../hooks/usePageTitle';
import { PENDING_KEY } from './MembershipSignup';
import './MembershipSignup.css';

const MAX_POLLS = 6;        // payment may still be settling when the browser lands here
const POLL_MS = 3000;

const readPending = () => {
  try { return JSON.parse(sessionStorage.getItem(PENDING_KEY) || 'null'); } catch { return null; }
};

const PaymentCallback = () => {
  const { t } = useLang();
  usePageTitle(t('pay.title'));
  const [params] = useSearchParams();
  const paymentId = params.get('id');
  const [state, setState] = useState(paymentId ? 'verifying' : 'error'); // verifying | paid | pending | failed | error
  const [info, setInfo] = useState(null);
  const [message, setMessage] = useState(paymentId ? null : { key: 'pay.msg.noRef' });
  const [summary] = useState(readPending);

  useEffect(() => {
    if (!paymentId) return undefined;
    let alive = true;
    let timer;

    const attempt = async (n) => {
      try {
        const data = await publicService.verifyPayment(paymentId);
        if (!alive) return;
        setInfo(data);
        if (data.payment_status === 'paid') {
          setState('paid');
          try {
            localStorage.removeItem('sg-enroll-draft');
            sessionStorage.removeItem(PENDING_KEY);
          } catch { /* ignore */ }
          return;
        }
        if (data.payment_status === 'failed') {
          setState('failed');
          setMessage(data.payment_failure_reason ? { text: data.payment_failure_reason } : { key: 'pay.msg.declined' });
          return;
        }
        if (data.payment_failure_reason) {
          // Paid but flagged for manual review (e.g. amount mismatch) — don't keep polling.
          setState('pending');
          setMessage({ key: 'pay.msg.review' });
          return;
        }
      } catch (e) {
        if (!alive) return;
        setMessage({ text: e.message });
      }
      if (n + 1 < MAX_POLLS) {
        timer = setTimeout(() => attempt(n + 1), POLL_MS);
      } else {
        setState('pending');
        setMessage((m) => m || { key: 'pay.msg.stillConfirming' });
      }
    };

    attempt(0);
    return () => { alive = false; clearTimeout(timer); };
  }, [paymentId]);

  const messageText = message?.key ? t(message.key) : message?.text;

  return (
    <div className="sg">
      <main className="en-main en-callback">
        <section className="en-success">
          <span className="en-success-halo" aria-hidden="true" />

          {state === 'verifying' && (
            <div className="en-success-head">
              <h2>{t('pay.verifying.title')}<span className="en-dots"><i /><i /><i /></span></h2>
              <p className="en-success-sub">{t('pay.verifying.sub')}</p>
            </div>
          )}

          {state === 'paid' && (
            <>
              <div className="en-success-head">
                <svg className="en-cdraw" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <circle cx="32" cy="32" r="28" pathLength="1" />
                  <path d="M20 33.5 28.5 42 45 24" pathLength="1" />
                </svg>
                <h2>{t('pay.paid.title')}</h2>
                <p className="en-success-sub">
                  {t('pay.paid.sub')}
                </p>
              </div>

              {summary && (
                <div className="en-pass">
                  <div className="en-pass-top">
                    <span className="en-pass-brand">SMART<em>GYM</em></span>
                    <span className="en-pass-tier">{summary.plan_name}</span>
                  </div>
                  <div className="en-pass-name">{summary.full_name}</div>
                  <div className="en-pass-row">
                    <div><span>{t('pay.pass.iqama')}</span><b>{summary.iqama_number}</b></div>
                    <div><span>{t('pay.pass.duration')}</span><b>{summary.duration_months} {t('en.field.months')}</b></div>
                    <div><span>{t('pay.pass.status')}</span><b className="ok">{t('pay.pass.pending')}</b></div>
                  </div>
                  <div className="en-pass-barcode" aria-hidden="true" />
                  <span className="en-pass-shine" aria-hidden="true" />
                </div>
              )}

              {summary && (
                <p className="en-success-note">
                  {t('pay.note.pre')} <b>{summary.email}</b>. {t('pay.note.iqama')}{' '}
                  <b>{summary.iqama_number}</b> {t('pay.note.post')}
                </p>
              )}
            </>
          )}

          {state === 'pending' && (
            <div className="en-success-head">
              <h2>{t('pay.pending.title')}</h2>
              <p className="en-success-sub">{messageText}</p>
            </div>
          )}

          {state === 'failed' && (
            <div className="en-success-head">
              <h2>{t('pay.failed.title')}</h2>
              <p className="en-success-sub">{messageText}</p>
              <p className="en-success-note">
                {t('pay.failed.note')}
              </p>
            </div>
          )}

          {state === 'error' && (
            <div className="en-success-head">
              <h2>{t('pay.error.title')}</h2>
              <p className="en-success-sub">{messageText}</p>
            </div>
          )}

          <div className="en-success-actions">
            {state === 'failed' || state === 'error' ? (
              <Link to="/join" className="btn btn-red">{t('pay.retry')}</Link>
            ) : (
              <Link to="/" className="btn btn-red">{t('en.ok.backHome')}</Link>
            )}
          </div>

          {info?.id && (
            <p className="en-success-note" style={{ opacity: 0.6 }}>{t('en.ok.reference')} #{info.id}</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default PaymentCallback;

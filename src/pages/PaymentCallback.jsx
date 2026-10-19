// src/pages/PaymentCallback.jsx
// Moyasar redirects here after 3-D Secure / STC Pay: /join/payment-callback?id=...&status=...
// The `status` query param is user-editable and deliberately ignored — only the
// backend's verification (which re-fetches the payment from Moyasar) counts.
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import publicService from '../services/publicService';
import { PENDING_KEY } from './MembershipSignup';
import './MembershipSignup.css';

const MAX_POLLS = 6;        // payment may still be settling when the browser lands here
const POLL_MS = 3000;

const readPending = () => {
  try { return JSON.parse(sessionStorage.getItem(PENDING_KEY) || 'null'); } catch { return null; }
};

const PaymentCallback = () => {
  const [params] = useSearchParams();
  const paymentId = params.get('id');
  const [state, setState] = useState(paymentId ? 'verifying' : 'error'); // verifying | paid | pending | failed | error
  const [info, setInfo] = useState(null);
  const [message, setMessage] = useState(paymentId ? '' : 'No payment reference was returned.');
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
          setMessage(data.payment_failure_reason || 'The payment was declined.');
          return;
        }
        if (data.payment_failure_reason) {
          // Paid but flagged for manual review (e.g. amount mismatch) — don't keep polling.
          setState('pending');
          setMessage('Your payment needs a manual check by our team. We will contact you by email.');
          return;
        }
      } catch (e) {
        if (!alive) return;
        setMessage(e.message);
      }
      if (n + 1 < MAX_POLLS) {
        timer = setTimeout(() => attempt(n + 1), POLL_MS);
      } else {
        setState('pending');
        setMessage((m) => m || 'We are still confirming your payment. You will receive an email once it is confirmed — no need to pay again.');
      }
    };

    attempt(0);
    return () => { alive = false; clearTimeout(timer); };
  }, [paymentId]);

  return (
    <div className="sg">
      <main className="en-main en-callback">
        <section className="en-success">
          <span className="en-success-halo" aria-hidden="true" />

          {state === 'verifying' && (
            <div className="en-success-head">
              <h2>CONFIRMING PAYMENT<span className="en-dots"><i /><i /><i /></span></h2>
              <p className="en-success-sub">Verifying your payment with Moyasar. Please don't close this page.</p>
            </div>
          )}

          {state === 'paid' && (
            <>
              <div className="en-success-head">
                <svg className="en-cdraw" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <circle cx="32" cy="32" r="28" pathLength="1" />
                  <path d="M20 33.5 28.5 42 45 24" pathLength="1" />
                </svg>
                <h2>PAYMENT CONFIRMED</h2>
                <p className="en-success-sub">
                  Your registration is now pending admin approval. Once it's approved we'll email your login details, including a temporary password to change on first login.
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
                    <div><span>IQAMA #</span><b>{summary.iqama_number}</b></div>
                    <div><span>DURATION</span><b>{summary.duration_months} MO</b></div>
                    <div><span>STATUS</span><b className="ok">PENDING APPROVAL</b></div>
                  </div>
                  <div className="en-pass-barcode" aria-hidden="true" />
                  <span className="en-pass-shine" aria-hidden="true" />
                </div>
              )}

              {summary && (
                <p className="en-success-note">
                  Confirmation goes to <b>{summary.email}</b>. Keep your Iqama number —{' '}
                  <b>{summary.iqama_number}</b> — you'll use it at gym entry.
                </p>
              )}
            </>
          )}

          {state === 'pending' && (
            <div className="en-success-head">
              <h2>PAYMENT PROCESSING</h2>
              <p className="en-success-sub">{message}</p>
            </div>
          )}

          {state === 'failed' && (
            <div className="en-success-head">
              <h2>PAYMENT NOT COMPLETED</h2>
              <p className="en-success-sub">{message}</p>
              <p className="en-success-note">
                You haven't been charged for this attempt. Your details are saved — go back, retake your photo and try again.
              </p>
            </div>
          )}

          {state === 'error' && (
            <div className="en-success-head">
              <h2>SOMETHING WENT WRONG</h2>
              <p className="en-success-sub">{message}</p>
            </div>
          )}

          <div className="en-success-actions">
            {state === 'failed' || state === 'error' ? (
              <Link to="/join" className="btn btn-red">TRY AGAIN</Link>
            ) : (
              <Link to="/" className="btn btn-red">BACK TO HOME</Link>
            )}
          </div>

          {info?.id && (
            <p className="en-success-note" style={{ opacity: 0.6 }}>Reference #{info.id}</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default PaymentCallback;

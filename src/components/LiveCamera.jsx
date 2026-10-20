// src/components/LiveCamera.jsx
// Live photo capture via getUserMedia — deliberately no file-picker fallback,
// since this photo is what the gym entry gate compares faces against.
import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LangContext';

const MAX_WIDTH = 960;      // plenty for face matching, keeps uploads ~150–300 KB
const JPEG_QUALITY = 0.9;

const PREFERRED = { video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false };
const BASIC = { video: true, audio: false };

// Errors are text keys (translated at render); `detail` is the browser's own message.
const cameraError = (e) => {
  if (!window.isSecureContext) return { key: 'cam.err.insecure' };
  if (!navigator.mediaDevices?.getUserMedia) return { key: 'cam.err.unsupported' };
  switch (e?.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return { key: 'cam.err.denied' };
    case 'NotFoundError':
    case 'OverconstrainedError':
      return { key: 'cam.err.notFound' };
    case 'NotReadableError':
    case 'AbortError':
      return { key: 'cam.err.busy' };
    default:
      return { key: 'cam.err.generic', detail: e?.message };
  }
};

/**
 * @param {function} onCapture  (File | null) => void — null when the photo is discarded
 * @param {boolean} invalid     show the error outline (e.g. submitted without a photo)
 */
const LiveCamera = ({ onCapture, invalid = false }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mountedRef = useRef(false);
  const [mode, setMode] = useState('idle'); // idle | starting | live | captured
  const [preview, setPreview] = useState('');
  const { t } = useLang();
  const [error, setError] = useState(null);

  const stop = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  // StrictMode mounts → unmounts → mounts in dev. Track liveness so a stream
  // that resolves after unmount is stopped instead of leaking (camera light stays on).
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stop();
    };
  }, []);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  // Attach the stream once the <video> element is actually rendered.
  useEffect(() => {
    const video = videoRef.current;
    if (mode !== 'live' || !video || !streamRef.current) return;
    video.srcObject = streamRef.current;
    video.play().catch(() => { /* autoplay is muted+inline; ignore benign aborts */ });
  }, [mode]);

  const start = async () => {
    setError(null);
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setError(cameraError());
      return;
    }
    setMode('starting');

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(PREFERRED);
    } catch (e) {
      // Some webcams reject the preferred constraints — retry with the plainest request.
      if (e?.name === 'OverconstrainedError' || e?.name === 'NotFoundError') {
        try {
          stream = await navigator.mediaDevices.getUserMedia(BASIC);
        } catch (e2) {
          if (mountedRef.current) { setMode('idle'); setError(cameraError(e2)); }
          return;
        }
      } else {
        if (mountedRef.current) { setMode('idle'); setError(cameraError(e)); }
        return;
      }
    }

    if (!mountedRef.current) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }
    streamRef.current = stream;
    setMode('live');
  };

  const capture = () => {
    const video = videoRef.current;
    if (!video?.videoWidth) {
      setError({ key: 'cam.err.starting' });
      return;
    }
    const scale = Math.min(1, MAX_WIDTH / video.videoWidth);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    // Stored un-mirrored (true orientation); only the live preview is mirrored.
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) { setError({ key: 'cam.err.capture' }); return; }
      stop();
      setError(null);
      setPreview(URL.createObjectURL(blob));
      setMode('captured');
      onCapture(new File([blob], 'live-photo.jpg', { type: 'image/jpeg' }));
    }, 'image/jpeg', JPEG_QUALITY);
  };

  const retake = () => {
    onCapture(null);
    setPreview('');
    start();
  };

  return (
    <div className={`en-cam ${invalid ? 'bad' : ''}`}>
      <div className="en-cam-stage">
        {mode === 'captured' && <img src={preview} alt={t('cam.alt')} />}
        {(mode === 'live' || mode === 'starting') && (
          <>
            <video ref={videoRef} className="mirror" playsInline muted autoPlay />
            <span className="en-cam-guide" aria-hidden="true" />
          </>
        )}
        {mode === 'idle' && (
          <span className="en-cam-empty">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" /><circle cx="12" cy="12.5" r="3.5" /></svg>
          </span>
        )}
      </div>

      <div className="en-cam-side">
        <p className="en-cam-hint">
          {mode === 'captured'
            ? t('cam.hint.captured')
            : t('cam.hint.live')}
        </p>
        {mode === 'idle' && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={start}>
            {error ? t('cam.retry') : t('cam.open')}
          </button>
        )}
        {mode === 'starting' && (
          <button type="button" className="btn btn-ghost btn-sm" disabled>{t('cam.waiting')}</button>
        )}
        {mode === 'live' && (
          <button type="button" className="btn btn-red btn-sm" onClick={capture}>{t('cam.capture')}</button>
        )}
        {mode === 'captured' && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={retake}>{t('cam.retake')}</button>
        )}
        {error && (
          <p className="en-cam-err" role="alert">
            {t(error.key)}{error.detail ? ` (${error.detail})` : ''}
          </p>
        )}
      </div>
    </div>
  );
};

export default LiveCamera;

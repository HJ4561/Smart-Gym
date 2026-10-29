// src/hooks/useLive.js
// Live gym numbers from the backend (/api/public/live/), refreshed every minute while the page
// is open. `null` until the first answer — pages then fall back to their editable texts.
import { useEffect, useState } from 'react';
import publicService from '../services/publicService';

const REFRESH_MS = 60_000;

export default function useLive() {
  const [live, setLive] = useState(null);
  useEffect(() => {
    let alive = true;
    const load = () => publicService.live().then((d) => { if (alive) setLive(d); }).catch(() => {});
    load();
    const id = setInterval(() => { if (document.visibilityState === 'visible') load(); }, REFRESH_MS);
    return () => { alive = false; clearInterval(id); };
  }, []);
  return live;
}

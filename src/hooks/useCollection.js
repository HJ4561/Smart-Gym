// src/hooks/useCollection.js
// Admin-managed list (Public Website → Lists in the admin portal), e.g. 'facilities'.
// The last fetched copy is cached in localStorage so repeat visits render instantly.
import { useEffect, useState } from 'react';
import publicService from '../services/publicService';

const cacheKey = (name) => `sg.list.${name}.v1`;

const readCache = (name) => {
  try {
    const cached = JSON.parse(window.localStorage.getItem(cacheKey(name)) || 'null');
    return Array.isArray(cached) ? cached : null;
  } catch {
    return null;
  }
};

/** → { items, loading, error }. `items` is null until the first copy (cached or fetched) arrives. */
export default function useCollection(name) {
  const [items, setItems] = useState(() => readCache(name));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    publicService.collection(name)
      .then((data) => {
        if (!alive) return;
        const list = Array.isArray(data) ? data : data?.results || [];
        setItems(list);
        setError(null);
        try { window.localStorage.setItem(cacheKey(name), JSON.stringify(list)); } catch { /* quota/blocked */ }
      })
      .catch((err) => { if (alive) setError(err); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [name]);

  return { items, loading, error };
}

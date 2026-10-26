// src/components/AddressMap.jsx
// Address with Google Maps: search box (Places), a map, and a pin the visitor can drag or click
// to set. Needs VITE_GOOGLE_MAPS_API_KEY (Maps JavaScript API + Places API (New) + Geocoding API).
// Without a key it falls back to a plain address and a map preview of what was typed.
import { useEffect, useRef, useState } from 'react';

const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const RIYADH = { lat: 24.7136, lng: 46.6753 };
let loader = null;

function loadMaps(lang) {
  if (window.google?.maps?.importLibrary) return Promise.resolve(window.google.maps);
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const cb = `__gmapsReady${Date.now()}`;
    window[cb] = () => resolve(window.google.maps);
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(KEY)}&v=weekly&loading=async`
      + `&language=${lang === 'ar' ? 'ar' : 'en'}&region=SA&callback=${cb}`;
    s.async = true;
    s.onerror = () => { loader = null; reject(new Error('Google Maps failed to load')); };
    document.head.appendChild(s);
  });
  return loader;
}

/**
 * value: { address, lat, lng } · onChange(next) · t: translator · lang: 'en' | 'ar'
 */
export default function AddressMap({ value, onChange, t, lang, placeholder, icon }) {
  const mapEl = useRef(null);
  const searchEl = useRef(null);
  const state = useRef({});
  const valueRef = useRef(value);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(!KEY);
  const [locating, setLocating] = useState(false);

  useEffect(() => { valueRef.current = value; }, [value]);

  useEffect(() => {
    if (!KEY) return undefined;
    let alive = true;
    (async () => {
      try {
        const maps = await loadMaps(lang);
        const { Map } = await maps.importLibrary('maps');
        const { Marker } = await maps.importLibrary('marker');
        const places = await maps.importLibrary('places');
        const { Geocoder } = await maps.importLibrary('geocoding');
        if (!alive || !mapEl.current) return;
        const start = valueRef.current?.lat ? { lat: valueRef.current.lat, lng: valueRef.current.lng } : RIYADH;
        const map = new Map(mapEl.current, {
          center: start, zoom: valueRef.current?.lat ? 15 : 11,
          mapTypeControl: false, streetViewControl: false, fullscreenControl: false,
        });
        const marker = new Marker({ map, position: valueRef.current?.lat ? start : null, draggable: true });
        const geocoder = new Geocoder();
        state.current = { map, marker, geocoder };

        const setPoint = (pos, address) => {
          marker.setPosition(pos);
          const lat = typeof pos.lat === 'function' ? pos.lat() : pos.lat;
          const lng = typeof pos.lng === 'function' ? pos.lng() : pos.lng;
          if (address) {
            onChange({ address, lat, lng });
            return;
          }
          onChange({ ...valueRef.current, lat, lng });
          geocoder.geocode({ location: { lat, lng } })
            .then(({ results }) => {
              if (results?.[0]) onChange({ address: results[0].formatted_address, lat, lng });
            })
            .catch(() => { /* keep the typed address */ });
        };
        state.current.setPoint = setPoint;
        map.addListener('click', (e) => setPoint(e.latLng));
        marker.addListener('dragend', (e) => setPoint(e.latLng));

        // Places (New) search box
        if (places.PlaceAutocompleteElement && searchEl.current) {
          const box = new places.PlaceAutocompleteElement({ includedRegionCodes: ['sa'] });
          box.style.width = '100%';
          box.setAttribute('placeholder', t('en.map.search'));
          searchEl.current.replaceChildren(box);
          box.addEventListener('gmp-select', async ({ placePrediction }) => {
            const place = placePrediction.toPlace();
            await place.fetchFields({ fields: ['formattedAddress', 'location', 'displayName'] });
            if (!place.location) return;
            map.setCenter(place.location);
            map.setZoom(16);
            setPoint(place.location, place.formattedAddress || place.displayName);
          });
        }
        setReady(true);
      } catch {
        if (alive) setFailed(true);
      }
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useMyLocation = () => {
    if (!navigator.geolocation || !state.current.setPoint) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos = { lat: coords.latitude, lng: coords.longitude };
        state.current.map.setCenter(pos);
        state.current.map.setZoom(16);
        state.current.setPoint(pos);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const typed = (value?.address || '').trim();
  return (
    <div className="en-map">
      <div className="en-input">
        <input type="text" placeholder={placeholder} value={value?.address || ''}
          onChange={(e) => onChange({ address: e.target.value, lat: null, lng: null })} />
        <span className="en-in-ico">{icon}</span>
      </div>
      {!failed && (
        <>
          <div className="en-map-tools">
            <div ref={searchEl} className="en-map-search" />
            <button type="button" className="btn btn-ghost btn-sm" onClick={useMyLocation} disabled={!ready || locating}>
              {locating ? t('en.map.locating') : t('en.map.mine')}
            </button>
          </div>
          <div ref={mapEl} className="en-map-canvas" role="application" aria-label={t('en.map.label')} />
          <p className="en-map-hint">{value?.lat ? t('en.map.pinned') : t('en.map.hint')}</p>
        </>
      )}
      {failed && typed.length > 5 && (
        <iframe className="en-map-canvas" title={t('en.map.label')} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(typed)}&z=15&hl=${lang === 'ar' ? 'ar' : 'en'}&output=embed`} />
      )}
    </div>
  );
}

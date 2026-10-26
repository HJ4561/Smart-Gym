// src/components/AddressAutocomplete.jsx
// Address with Geoapify autocomplete (VITE_GEOAPIFY_API_KEY): the visitor types, picks a
// suggestion, and the formatted address plus its latitude/longitude are kept. Searches are
// limited to Saudi Arabia. Without a key it's a plain address field.
import { GeoapifyContext, GeoapifyGeocoderAutocomplete } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal-dark.css';

const KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

/**
 * value: { address, lat, lng } · onChange(next) · t: translator · lang: 'en' | 'ar'
 */
export default function AddressAutocomplete({ value, onChange, t, lang, placeholder, icon }) {
  if (!KEY) {
    return (
      <div className="en-input">
        <input type="text" placeholder={placeholder} value={value?.address || ''}
          onChange={(e) => onChange({ address: e.target.value, lat: null, lng: null })} />
        <span className="en-in-ico">{icon}</span>
      </div>
    );
  }
  return (
    <div className="en-geo">
      <GeoapifyContext apiKey={KEY}>
        <GeoapifyGeocoderAutocomplete
          placeholder={placeholder}
          value={value?.address || ''}
          lang={lang === 'ar' ? 'ar' : 'en'}
          filterByCountryCode={['sa']}
          limit={5}
          debounceDelay={300}
          placeSelect={(place) => {
            const p = place?.properties;
            onChange(p ? { address: p.formatted, lat: p.lat, lng: p.lon } : { address: '', lat: null, lng: null });
          }}
          onUserInput={(text) => onChange({ address: text, lat: null, lng: null })}
          onClear={() => onChange({ address: '', lat: null, lng: null })}
        />
      </GeoapifyContext>
      <p className="en-geo-hint">{value?.lat != null ? t('en.map.pinned') : t('en.map.hint')}</p>
    </div>
  );
}

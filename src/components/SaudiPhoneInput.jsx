// src/components/SaudiPhoneInput.jsx
// Phone field with a fixed "+966" in front: the visitor types the rest (5XXXXXXXX). A leading 0
// or a pasted +966 / 00966 is dropped. onChange gets the full number ("+966551234567"), or ''
// when the field is empty.
const local = (v) => {
  let d = String(v || '').replace(/\D/g, '');
  if (d.startsWith('00966')) d = d.slice(5);
  else if (d.startsWith('966')) d = d.slice(3);
  return d.replace(/^0+/, '').slice(0, 9);
};

export default function SaudiPhoneInput({ value, onChange, onBlur, placeholder = '5X XXX XXXX', className = '', inputClassName = '', ...rest }) {
  return (
    <div className={`saudi-phone ${className}`} dir="ltr">
      <span className="saudi-phone-cc" aria-hidden="true">+966</span>
      <input type="tel" inputMode="numeric" autoComplete="tel-national" className={inputClassName}
        placeholder={placeholder} value={local(value)} onBlur={onBlur}
        onChange={(e) => { const d = local(e.target.value); onChange(d ? `+966${d}` : ''); }} {...rest} />
    </div>
  );
}

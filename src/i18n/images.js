// src/i18n/images.js
/**
 * Resolve a page's image map through the admin-managed image slots:
 * imageSet(img, 'fac', { heroBg: builtInUrl }) → { heroBg: uploadedUrl || builtInUrl }.
 * Slot keys are "<prefix>.<name>" (e.g. "fac.heroBg", "home.sectors.s1").
 */
export const imageSet = (img, prefix, defaults) =>
  Object.fromEntries(Object.entries(defaults).map(([name, url]) => [name, img(`${prefix}.${name}`, url)]));

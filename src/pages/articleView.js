// src/pages/articleView.js
// Turn an admin-managed article (Public Website → Lists → Articles) into what the
// Insights cards and the article page render, in the current language.

const initials = (name) =>
  (name || '').split(/\s+/).filter((w) => /^[A-Za-z؀-ۿ]/.test(w) && !/^(dr|mr|mrs|ms)\.?$/i.test(w))
    .slice(0, 2).map((w) => w[0].toUpperCase()).join('');

export const formatDate = (iso, lang) => {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(lang === 'ar' ? 'ar' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const articleView = (item, { pick, lang, t }) => {
  const d = item.data || {};
  const author = pick(d.author);
  return {
    id: item.id,
    slug: item.slug,
    href: `/insights/${encodeURIComponent(item.slug)}`,
    category: d.category,
    tag: pick(d.tag),
    title: pick(d.title),
    desc: pick(d.excerpt),
    body: pick(d.body),
    date: formatDate(d.published, lang),
    read: d.read_minutes ? t('ins.card.readMin', { n: d.read_minutes }) : '',
    img: item.image_url,
    author,
    authorInitials: initials(author),
    line: pick(d.author_line),
  };
};

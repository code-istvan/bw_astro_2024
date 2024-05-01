export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('hu-HU', {
    timeZone: 'UTC',
  });
}

export function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length; // Számold meg a szavakat a szövegben
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

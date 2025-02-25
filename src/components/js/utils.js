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
  const d = new Date(date);

  const year = d.getFullYear().toString();

  // Az év utolsó két számjegye
  // const year = d.getFullYear().toString().slice(-2);

  // Hónap két számjeggyel
  const month = (d.getMonth() + 1).toString().padStart(2, '0');

  // Nap két számjeggyel
  const day = d.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
}

export function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

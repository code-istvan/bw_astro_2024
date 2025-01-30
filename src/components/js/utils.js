// const months = [
//   'január',
//   'február',
//   'március',
//   'április',
//   'május',
//   'június',
//   'július',
//   'augusztus',
//   'szeptember',
//   'október',
//   'november',
//   'december',
// ];

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

// export function formatDate(date) {
//   const d = new Date(date);
//   const year = d.getFullYear();
//   const month = months[d.getMonth()];
//   const day = d.getDate();

//   return `${year} ${month} ${day}.`;
// }

export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear().toString(); // YYYY formátum
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // MM formátum
  const day = d.getDate().toString().padStart(2, '0'); // DD formátum

  return `${year}-${month}-${day}`;
}

export function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

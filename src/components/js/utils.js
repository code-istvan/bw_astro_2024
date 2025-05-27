// export function slugify(text) {
//   return text
//     .toString()
//     .toLowerCase()
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/[^\w-]+/g, '')
//     .replace(/--+/g, '-')
//     .replace(/^-+/, '')
//     .replace(/-+$/, '');
// }

// export function formatDate(date, lang = 'hu') {
//   const d = new Date(date);

//   // Ellenőrizzük, hogy a dátum érvényes-e
//   if (isNaN(d.getTime())) {
//     return '';
//   }

//   if (lang === 'en') {
//     // Angol formátum: "Month DD, YYYY" vagy "MM/DD/YYYY"
//     const options = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     };
//     return d.toLocaleDateString('en-US', options);
//   } else {
//     // Magyar formátum: YYYY.MM.DD
//     const year = d.getFullYear().toString();
//     const month = (d.getMonth() + 1).toString().padStart(2, '0');
//     const day = d.getDate().toString().padStart(2, '0');
//     return `${year}.${month}.${day}`;
//   }
// }

// export function calculateReadingTime(text) {
//   const wordsPerMinute = 200;
//   const words = text.split(/\s+/).length;
//   const minutes = Math.ceil(words / wordsPerMinute);
//   return minutes;
// }

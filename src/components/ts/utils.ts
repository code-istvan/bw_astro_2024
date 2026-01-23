export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date: string | Date, lang: 'hu' | 'en' = 'hu'): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return '';
  }

  if (lang === 'en') {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return d.toLocaleDateString('en-US', options);
  } else {
    const year = d.getFullYear().toString();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  }
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

// formatPhoneNumber függvény hozzáadása a utils.ts-hez

export function formatPhoneNumber(phone: string): string {
  // Eltávolítjuk a whitespace-t és speciális karaktereket
  const cleaned = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');

  // Magyar telefonszám formátum: +36 XX XXX XXXX
  if (cleaned.startsWith('+36') && cleaned.length === 12) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }

  // Nemzetközi formátum: +XX XX XXX XXXX (általános)
  if (cleaned.startsWith('+') && cleaned.length >= 11) {
    const countryCode = cleaned.slice(0, 3);
    const rest = cleaned.slice(3);

    // Csoportosítás: 2-3-4 számjegyekre
    if (rest.length >= 9) {
      return `${countryCode} ${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5)}`;
    }
  }

  // Ha nem illeszkedik egyik formátumra sem, visszaadjuk az eredetit
  return phone;
}

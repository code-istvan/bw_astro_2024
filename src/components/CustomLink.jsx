import React from 'react';

export const CustomLink = ({ link, children, classs }) => {
  if (!link) return null; // Ha nincs megadva link, nem renderelünk semmit
  const isExternal = link.startsWith('https'); // Külső link ellenőrzése

  return (
    <a href={link} class={classs} {...(isExternal ? { rel: 'noopener noreferrer', target: '_blank' } : {})}>
      {children}
    </a>
  );
};

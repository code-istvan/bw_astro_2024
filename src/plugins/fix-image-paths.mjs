import { visit } from 'unist-util-visit';

export function fixImagePaths() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      // Abszolút /src/images/ útvonalak kezelése
      if (node.url && node.url.startsWith('/src/images/')) {
        node.url = node.url.replace('/src/images/', '/images/');
      }
      // Relatív útvonalak kezelése
      else if (node.url && node.url.startsWith('../../images/')) {
        node.url = node.url.replace('../../images/', '/images/');
      }
    });
  };
}

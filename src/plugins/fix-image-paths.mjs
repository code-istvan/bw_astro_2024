import { visit } from 'unist-util-visit';

export function fixImagePaths() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      // Ha a kép src attribútuma /src/ -el kezdődik, akkor jó
      // Ha nem, akkor hozzáadjuk a perjelet az elejéhez, ha még nincs ott
      if (node.url && !node.url.startsWith('/src/') && node.url.includes('src/')) {
        node.url = node.url.replace('src/', '/src/');
      }
    });
  };
}

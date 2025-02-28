export function fixImagePaths() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      // Konvertáljuk az összes képet /images/... formátumra (public mappából)
      if (node.url && node.url.includes('/src/images/')) {
        node.url = node.url.replace('/src/images/', '/images/');
      }
    });
  };
}

// src/components/LightGalleryComplete.jsx
import React, { useEffect, useRef } from 'react';
// Vanilla JavaScript lightGallery importálása (ez már jó volt az eredeti kódban)
import lightGallery from 'lightgallery';

// CSS importok
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// Segédfüggvény a képek letöltéséhez egy mappából
export const downloadServerImages = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch directory: ${response.status} ${response.statusText}`);
    }
    const html = await response.text();
    const imageRegex = /<a href="([^"]+\.(jpg|jpeg|png|gif|webp|avif))"[^>]*>/gi;
    let match;
    const imageUrls = [];
    while ((match = imageRegex.exec(html)) !== null) {
      const imageUrl = new URL(match[1], url).href;
      imageUrls.push(imageUrl);
    }
    return imageUrls;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

// Masonry stílusú galéria komponens
const LightGalleryMasonry = ({ images, title }) => {
  const galleryRef = useRef(null);
  const lgInstance = useRef(null);

  useEffect(() => {
    if (galleryRef.current) {
      // Ha már létezik egy példány, megsemmisítjük
      if (lgInstance.current) {
        lgInstance.current.destroy();
      }

      // Dinamikus importálás a pluginekhez - ez a rész fontos!
      Promise.all([import('lightgallery/plugins/zoom'), import('lightgallery/plugins/thumbnail')])
        .then(([lgZoomModule, lgThumbnailModule]) => {
          // Új lightGallery példány inicializálása
          lgInstance.current = lightGallery(galleryRef.current, {
            plugins: [lgZoomModule.default, lgThumbnailModule.default],
            speed: 500,
            selector: '.masonry-item',
            download: false,
            counter: false,
            showCloseIcon: true,
            hideBarsDelay: 1500,
            addClass: 'minimal-gallery',
            mode: 'lg-fade',
          });

          // Masonry layout inicializálása és kezelő függvények
          const resizeAllGridItems = () => {
            const allItems = document.getElementsByClassName('masonry-item');
            for (let x = 0; x < allItems.length; x++) {
              resizeGridItem(allItems[x]);
            }
          };

          const resizeGridItem = (item) => {
            if (!item) return;
            const grid = document.getElementsByClassName('masonry-grid')[0];
            const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
            const rowGap =
              parseInt(
                window.getComputedStyle(grid).getPropertyValue('grid-row-gap') ||
                  window.getComputedStyle(grid).getPropertyValue('grid-gap')
              ) || 0;

            const contentHeight = item.querySelector('.masonry-content').getBoundingClientRect().height;
            const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));

            // Minimum 10 sornyi magasságot adunk, hogy elkerüljük a túl alacsony elemeket
            const minSpan = 10;
            item.style.gridRowEnd = 'span ' + Math.max(rowSpan, minSpan);
          };

          // Masonry layout frissítése képek betöltődése után
          const allImages = document.querySelectorAll('.masonry-item img');
          let imagesLoaded = 0;

          const imageLoaded = () => {
            imagesLoaded++;
            if (imagesLoaded === allImages.length) {
              resizeAllGridItems();
            }
          };

          allImages.forEach((img) => {
            if (img.complete) {
              imageLoaded();
            } else {
              img.addEventListener('load', imageLoaded);
            }
          });

          // Masonry layout frissítése ablak átméretezéskor
          window.addEventListener('resize', resizeAllGridItems);

          // Kezdeti layout beállítása
          setTimeout(resizeAllGridItems, 100);
        })
        .catch((error) => {
          console.error('Failed to load lightgallery plugins:', error);
        });

      // Cleanup function
      return () => {
        if (lgInstance.current) {
          lgInstance.current.destroy();
        }
        window.removeEventListener('resize', () => resizeAllGridItems);
      };
    }
  }, [images]);

  return (
    <div className="gallery-container-masonry">
      {title && <h2 className="gallery-title-masonry">{title}</h2>}

      <div className="masonry-grid" ref={galleryRef}>
        {images.map((image, index) => (
          <div key={index} className="masonry-item" data-src={image}>
            <div className="masonry-content">
              <img src={image} alt="" loading="lazy" />
              <div className="hover-overlay"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LightGalleryMasonry;

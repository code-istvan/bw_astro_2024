// src/components/ThumbnailGallery.jsx
import React, { useEffect } from 'react';
import LightGallery from 'lightgallery/react';

// Pluginek dinamikus importálása
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

const ThumbnailGallery = ({ images, galleryId, title = null }) => {
  useEffect(() => {
    // Dinamikusan importáljuk a plugineket
    Promise.all([import('lightgallery/plugins/zoom'), import('lightgallery/plugins/thumbnail')]).then(
      ([lgZoomModule, lgThumbnailModule]) => {
        // A pluginek elérhetők itt, de LightGallery React komponens
        // automatikusan kezeli a betöltésüket
      }
    );
  }, []);

  // LightGallery beállítások
  const gallerySettings = {
    speed: 500,
    plugins: [], // Ezeket később állítjuk be dinamikusan
    thumbnail: true,
    showCloseIcon: true,
    download: false,
    counter: false,
    addClass: 'minimal-gallery',
    mode: 'lg-fade',
  };

  // Inicializáló események
  const onInit = () => {
    console.log('lightGallery initialized for', galleryId);
  };

  return (
    <div className="gallery-container">
      {title && <h3 className="gallery-title">{title}</h3>}

      <LightGallery onInit={onInit} elementClassNames="gallery" galleryId={galleryId} {...gallerySettings}>
        {images.map((image, index) => (
          <a key={index} href={image} className="gallery-item" data-src={image}>
            <img src={image} alt="" className="img-responsive" loading="lazy" />
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default ThumbnailGallery;

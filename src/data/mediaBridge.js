// Bridge de comunicación para carga dinámica de imágenes gestionadas desde /fotos
// Si media.json existe, aplica las fotos actualizadas y nuevas con cache-busting (?v=timestamp).
// Si media.json no existe o falla la red, degrada de forma 100% transparente a los contenidos estáticos aprobados.

import { useState, useEffect } from 'react';

let cachedMedia = null;
let listeners = [];
let fetchPromise = null;

export function getBaseUrl() {
  return import.meta.env.BASE_URL || '/';
}

export function fetchMediaManifest() {
  if (fetchPromise) return fetchPromise;
  const baseUrl = getBaseUrl().replace(/\/$/, '');
  const url = `${baseUrl}/data/media.json?t=${Date.now()}`;

  fetchPromise = fetch(url, { cache: 'no-cache' })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      cachedMedia = data;
      listeners.forEach((cb) => cb(cachedMedia));
      return data;
    })
    .catch((err) => {
      // Degradar silenciosamente: devuelve null para usar estáticos
      return null;
    })
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

// Hook reactivo para componentes que consumen imágenes dinámicas
export function useDynamicMedia() {
  const [media, setMedia] = useState(cachedMedia);

  useEffect(() => {
    if (!cachedMedia) {
      fetchMediaManifest().then((data) => {
        if (data) setMedia(data);
      });
    }
    const handler = (data) => setMedia(data);
    listeners.push(handler);
    return () => {
      listeners = listeners.filter((cb) => cb !== handler);
    };
  }, []);

  return media;
}

// Resuelve una imagen individual por su clave única ('hero_fachada', 'pub_barra_noche', etc.)
export function resolveSingleImage(media, key, fallbackSrc) {
  if (!media || !media.singleImages || !media.singleImages[key]) {
    return fallbackSrc;
  }
  const item = media.singleImages[key];
  if (!item.current) return fallbackSrc;
  const versionParam = media.version ? `?v=${media.version}` : '';
  return `${item.current}${versionParam}`;
}

// Resuelve la galería completa ('Dentro de Covent')
export function resolveGaleria(media, defaultContent) {
  if (!media || !media.galeria || !Array.isArray(media.galeria) || media.galeria.length === 0) {
    return defaultContent;
  }
  const v = media.version ? `?v=${media.version}` : '';
  const mainObj = media.galeria.find((item) => item.isMain) || media.galeria[0];
  const subItems = media.galeria.filter((item) => item !== mainObj);

  return {
    ...defaultContent,
    mainItem: {
      ...defaultContent.mainItem,
      ...mainObj,
      src: `${mainObj.src}${v}`,
    },
    items: subItems.map((item, idx) => ({
      ...(defaultContent.items[idx] || {}),
      ...item,
      src: `${item.src}${v}`,
    })),
  };
}

// Resuelve las referencias visuales de la carta por categoría
export function resolveCartaCategories(media, defaultCategories) {
  if (!media || !media.cartaReferencias) {
    return defaultCategories;
  }
  const v = media.version ? `?v=${media.version}` : '';
  return defaultCategories.map((cat) => {
    const dynRefs = media.cartaReferencias[cat.id];
    if (!dynRefs || !Array.isArray(dynRefs) || dynRefs.length === 0) {
      return cat;
    }
    return {
      ...cat,
      visualReferences: dynRefs.map((r, idx) => ({
        ...(cat.visualReferences?.[idx] || {}),
        ...r,
        src: `${r.src}${v}`,
      })),
    };
  });
}

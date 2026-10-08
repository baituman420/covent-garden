import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryContent } from '../data/siteContent.js';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Galeria() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      // Direct static mosaic presentation
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP TRANSFORMATION (≥1024px)
      // Concept: One central photo expands and reveals 4 peripheral photos around it
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Initial consolidated setup
        gsap.set('.galeria-stage-desktop .item-main', {
          position: 'absolute',
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          width: '56%',
          height: '420px',
          scale: 1,
          zIndex: 10,
          opacity: 1,
        });

        gsap.set('.galeria-stage-desktop .item-sub', {
          position: 'absolute',
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          scale: 0.7,
          opacity: 0,
          zIndex: 5,
        });

        gsap.set('.galeria-stage-desktop .galeria-item-overlay', { opacity: 0 });

        // Phase 1 (0 to 0.45): Main photo shifts to center-left anchor, Photo 2 emerges to top-right
        tl.to(
          '.galeria-stage-desktop .item-main',
          {
            left: '46%',
            top: '50%',
            width: '40%',
            height: '390px',
            scale: 0.98,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          0
        );

        tl.to(
          '.galeria-stage-desktop .item-2',
          {
            opacity: 1,
            left: '83%',
            top: '26%',
            width: '31%',
            height: '220px',
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
          },
          0.1
        );

        // Phase 2 (0.3 to 0.75): Photo 3 emerges to bottom-right; Photo 4 emerges to top-left flank
        tl.to(
          '.galeria-stage-desktop .item-3',
          {
            opacity: 1,
            left: '83%',
            top: '74%',
            width: '31%',
            height: '220px',
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
          },
          0.3
        );

        tl.to(
          '.galeria-stage-desktop .item-4',
          {
            opacity: 1,
            left: '13%',
            top: '26%',
            width: '23%',
            height: '180px',
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
          },
          0.45
        );

        // Phase 3 (0.55 to 1.0): Photo 5 emerges to bottom-left flank, completing mosaic
        tl.to(
          '.galeria-stage-desktop .item-5',
          {
            opacity: 1,
            left: '13%',
            top: '74%',
            width: '23%',
            height: '180px',
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
          },
          0.58
        );

        // Final reveal of corner caption overlays
        tl.to(
          '.galeria-stage-desktop .galeria-item-overlay',
          {
            opacity: 1,
            duration: 0.35,
            ease: 'power1.out',
          },
          0.7
        );
      });

      // MOBILE & TABLET TRANSFORMATION (<1024px)
      // Responsive staggered discovery: Main photo settles, sub-items reveal gracefully
      mm.add('(max-width: 1023px)', () => {
        const mobileItems = gsap.utils.toArray('.galeria-stage-mobile .galeria-item');

        mobileItems.forEach((item, index) => {
          if (index === 0) {
            // Main item gentle focus settle
            gsap.fromTo(
              item,
              { scale: 0.96, opacity: 0.85 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom-=40',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          } else {
            // Sub items emerge sequentially from underneath
            gsap.fromTo(
              item,
              { y: 35, opacity: 0, scale: 0.94 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom-=60',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="galeria" ref={sectionRef} className="galeria-section">
      <div className="container galeria-container">
        {/* Section Header */}
        <div className="galeria-header">
          <span className="section-tag section-tag-gold">{galleryContent.tag}</span>
          <h2 className="section-heading galeria-title">{galleryContent.title}</h2>
          <p className="galeria-subtitle">{galleryContent.subtitle}</p>
          {galleryContent.description && (
            <p className="galeria-desc">{galleryContent.description}</p>
          )}
        </div>

        {/* Desktop Photographic Stage (pinned scroll transformation) */}
        <div ref={stageRef} className="galeria-stage galeria-stage-desktop">
          {/* Main Photo (Atmósfera Central - starts centered, settles left) */}
          <div className="galeria-item item-main">
            <div className="galeria-img-wrap">
              <img
                src={`${baseUrl}${galleryContent.mainItem.src}`}
                alt={galleryContent.mainItem.alt}
                className="galeria-img"
              />
              <div className="galeria-item-overlay">
                <span className="galeria-item-tag">{galleryContent.mainItem.tag}</span>
                <h3 className="galeria-item-title">{galleryContent.mainItem.title}</h3>
              </div>
            </div>
          </div>

          {/* Emerging Items 2 to 5 */}
          {galleryContent.items.map((item, idx) => (
            <div key={idx} className={`galeria-item item-sub item-${idx + 2}`}>
              <div className="galeria-img-wrap">
                <img
                  src={`${baseUrl}${item.src}`}
                  alt={item.alt}
                  className="galeria-img"
                />
                <div className="galeria-item-overlay">
                  <span className="galeria-item-tag">{item.tag}</span>
                  <h3 className="galeria-item-title">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Staggered Mosaic Stage (<1024px) */}
        <div className="galeria-stage galeria-stage-mobile">
          {/* Main Photo Hero */}
          <div className="galeria-item item-main-mobile">
            <div className="galeria-img-wrap">
              <img
                src={`${baseUrl}${galleryContent.mainItem.src}`}
                alt={galleryContent.mainItem.alt}
                className="galeria-img"
              />
              <div className="galeria-item-overlay">
                <span className="galeria-item-tag">{galleryContent.mainItem.tag}</span>
                <h3 className="galeria-item-title">{galleryContent.mainItem.title}</h3>
              </div>
            </div>
          </div>

          {/* Sub Items 2-Column Grid */}
          <div className="galeria-mobile-grid">
            {galleryContent.items.map((item, idx) => (
              <div key={idx} className={`galeria-item item-sub-mobile item-sub-mobile-${idx + 1}`}>
                <div className="galeria-img-wrap">
                  <img
                    src={`${baseUrl}${item.src}`}
                    alt={item.alt}
                    className="galeria-img"
                  />
                  <div className="galeria-item-overlay">
                    <span className="galeria-item-tag">{item.tag}</span>
                    <h3 className="galeria-item-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Footer Cue */}
        <div className="galeria-footer-cue">
          <span className="galeria-cue-dot" />
          <span>Cinco rincones, un solo Covent Garden</span>
        </div>
      </div>
    </section>
  );
}

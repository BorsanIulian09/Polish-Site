// java.js
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('#mobile-menu');
  const menu = document.querySelector('.navbar__menu');

  if (!menuBtn || !menu) {
    console.warn('Nu găsesc #mobile-menu sau .navbar__menu');
    return;
  }

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('is-active');
    menu.classList.toggle('active');
  });
});
// java.jsdocument.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const groups = document.querySelectorAll('.images');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const idx = Number(el.dataset.stagger || 0);

      if (!reduceMotion) {
        el.style.transitionDelay = `${idx * 150}ms`;
      } else {
        el.style.transition = 'none';
        el.style.transitionDelay = '0ms';
      }

      // declanșează apariția
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)'; // ajunge în poziția finală
      });

      obs.unobserve(el);
    });
  }, { threshold: 0.2 });

  groups.forEach(group => {
    const imgs = group.querySelectorAll('img');

    imgs.forEach((img, i) => {
      // === STABILEȘTE DIRECȚIA ===
      // 1) clasa explicită
      let fromRight = img.classList.contains('img-dreapta');
      // 2) atribut data-dir
      if (img.dataset.dir === 'right') fromRight = true;
      if (img.dataset.dir === 'left') fromRight = false;
      // 3) ID conține „dreapta”
      if (/dreapta/i.test(img.id)) fromRight = true;
      if (/stanga/i.test(img.id)) fromRight = false;
      // 4) fallback pe poziție: 0 stânga, 1 dreapta, 2 stânga, 3 dreapta...
      if (fromRight === undefined) fromRight = (i % 2 === 1);

      const startX = fromRight ? 100 : -100; // px

      // === STILURI INIȚIALE (invizibil + deplasat) ===
      img.style.opacity = '0';
      img.style.transform = `translateX(${startX}px)`;
      img.style.willChange = 'transform, opacity';
      img.style.transition = reduceMotion
        ? 'none'
        : 'transform 800ms ease, opacity 800ms ease';

      // păstrează indexul pentru stagger
      img.dataset.stagger = i;

      observer.observe(img);
    });
  });


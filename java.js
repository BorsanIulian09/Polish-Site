// ==========================
// NAVBAR MOBILE TOGGLE + AUTO CLOSE
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('#mobile-menu'); // butonul hamburger
  const menu = document.querySelector('.navbar__menu');   // meniul
  const links = document.querySelectorAll('.navbar__links'); // toate linkurile din meniu

  if (!menuBtn || !menu) {
    console.warn('⚠️ Nu găsesc #mobile-menu sau .navbar__menu');
  } else {
    // Deschide / închide meniul la click pe hamburger
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('is-active');
      menu.classList.toggle('active');
    });

    // 🔹 Închide meniul când se apasă pe un link
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
          menuBtn.classList.remove('is-active');
        }
      });
    });
  }
});


// ==========================
// GALERIE ANIMAȚII PE SCROLL
// ==========================
document.addEventListener('DOMContentLoaded', () => {
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
      let fromRight = img.classList.contains('img-dreapta');
      if (img.dataset.dir === 'right') fromRight = true;
      if (img.dataset.dir === 'left') fromRight = false;
      if (/dreapta/i.test(img.id)) fromRight = true;
      if (/stanga/i.test(img.id)) fromRight = false;
      if (fromRight === undefined) fromRight = (i % 2 === 1);

      const startX = fromRight ? 100 : -100; // px

      // === STILURI INIȚIALE (invizibil + deplasat) ===
      img.style.opacity = '0';
      img.style.transform = `translateX(${startX}px)`;
      img.style.willChange = 'transform, opacity';
      img.style.transition = reduceMotion
        ? 'none'
        : 'transform 800ms ease, opacity 800ms ease';

      img.dataset.stagger = i;
      observer.observe(img);
    });
  });
});

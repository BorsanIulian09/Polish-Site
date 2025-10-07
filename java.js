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

    // Închide meniul când se apasă pe un link
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
// GALERIE: ANIMAȚII PE SCROLL (se repetă la fiecare intrare/ieșire)
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const groups = document.querySelectorAll('.images');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const img = entry.target;

      if (entry.isIntersecting) {
        // intră în viewport → apare
        if (!reduceMotion) {
          const idx = Number(img.dataset.stagger || 0);
          img.style.setProperty('--staggerDelay', `${idx * 150}ms`);
        } else {
          img.style.setProperty('--staggerDelay', `0ms`);
        }
        img.classList.add('is-visible');
      } else {
        // iese din viewport → ascunde (ca să se repete la revenire)
        img.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.2 });

  groups.forEach(group => {
    const imgs = group.querySelectorAll('img');

    imgs.forEach((img, i) => {
      // === STABILEȘTE DIRECȚIA ===
      let fromRight;
      if (img.classList.contains('img-dreapta')) fromRight = true;
      if (img.classList.contains('img-stanga')) fromRight = false;
      if (img.dataset.dir === 'right') fromRight = true;
      if (img.dataset.dir === 'left') fromRight = false;
      if (/dreapta/i.test(img.id)) fromRight = true;
      if (/stanga/i.test(img.id)) fromRight = false;
      if (fromRight === undefined) fromRight = (i % 2 === 1);

      // memorăm direcția în variabilă CSS (cu unitate)
      img.style.setProperty('--startX', fromRight ? '100px' : '-100px');

      // index pentru stagger
      img.dataset.stagger = i;

      // starea inițială (opacity 0 + translateX) e în CSS
      observer.observe(img);
    });
  });
});
/* =============================================================================
   BRAD BITT, MAIS LE JEU — page de présentation
   Trois choses seulement :
     · la barre de progression et l'ombre de l'en-tête ;
     · les apparitions au défilement (IntersectionObserver) ;
     · le fondu entre les deux zones, piloté par la position de défilement.
   Tout est désactivé proprement si l'utilisateur préfère moins d'animations.
   ========================================================================== */
(() => {
  'use strict';

  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const moinsDAnimation = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------------
     Apparitions
     ------------------------------------------------------------------- */
  (function apparitions() {
    const cibles = $$('.up');
    if (!cibles.length) return;

    if (moinsDAnimation || !('IntersectionObserver' in window)) {
      cibles.forEach(el => el.classList.add('seen'));
      return;
    }

    // Décalage progressif entre éléments voisins d'un même conteneur.
    const compteurs = new Map();
    cibles.forEach(el => {
      const parent = el.parentElement;
      const n = compteurs.get(parent) || 0;
      el.style.setProperty('--i', String(Math.min(n, 5)));
      compteurs.set(parent, n + 1);
    });

    const obs = new IntersectionObserver(entrees => {
      entrees.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('seen');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    cibles.forEach(el => obs.observe(el));

    // Le hero est visible d'emblée : on ne le fait pas attendre le premier tick.
    requestAnimationFrame(() => {
      $$('#hero .up').forEach(el => el.classList.add('seen'));
    });
  })();

  /* ----------------------------------------------------------------------
     Progression, en-tête, fondu de zone — un seul rAF pour tout le monde
     ------------------------------------------------------------------- */
  const barreProgres = $('#progress-bar');
  const enTete       = $('.bar');
  const zone         = $('#zone');
  const zoneB        = $('#zone-b');
  const zoneNom      = $('#zone-name');

  const NOM_A = 'Zone de largage';
  const NOM_B = 'Complexe — niveau −2';
  let nomAffiche = NOM_A;

  const borne = (v, min, max) => Math.min(max, Math.max(min, v));

  function majProgres() {
    if (!barreProgres) return;
    const total = document.documentElement.scrollHeight - innerHeight;
    const p = total > 0 ? borne(scrollY / total, 0, 1) : 0;
    barreProgres.style.width = (p * 100).toFixed(2) + '%';
  }

  function majEnTete() {
    if (!enTete) return;
    enTete.classList.toggle('is-stuck', scrollY > 8);
  }

  function majZone() {
    if (!zone || !zoneB || moinsDAnimation) return;
    const r = zone.getBoundingClientRect();
    const course = r.height - innerHeight;           // distance réellement parcourue
    if (course <= 0) return;

    const p = borne(-r.top / course, 0, 1);

    // Le fondu occupe le tiers central du parcours : on a le temps de regarder
    // chaque décor avant et après la bascule.
    const fondu = borne((p - 0.33) / 0.34, 0, 1);
    zoneB.style.opacity = fondu.toFixed(3);

    const nom = fondu > 0.5 ? NOM_B : NOM_A;
    if (nom !== nomAffiche && zoneNom) {
      zoneNom.textContent = nom;
      nomAffiche = nom;
    }
  }

  let enAttente = false;
  function auDefilement() {
    if (enAttente) return;
    enAttente = true;
    requestAnimationFrame(() => {
      majProgres();
      majEnTete();
      majZone();
      enAttente = false;
    });
  }

  addEventListener('scroll', auDefilement, { passive: true });
  addEventListener('resize', auDefilement, { passive: true });
  auDefilement();
})();

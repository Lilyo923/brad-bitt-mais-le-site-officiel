// script.js
// Hub site logic: overlays, news badge persistence, theme toggle, ep-card interactions.

document.addEventListener('DOMContentLoaded', () => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const main = document.getElementById('app-main');
  const homeHTML = main ? main.innerHTML : '';

  const overlay = document.getElementById('overlay');
  const overlayInner = document.getElementById('overlay-inner');
  const overlayContent = document.getElementById('overlay-content');
  const overlayClose = document.getElementById('overlay-close');

  const newsBadge = document.getElementById('news-badge');
  const btnNews = document.getElementById('btn-news');

  const THEME_KEY = 'brad_theme_pref'; // 'auto' | 'light' | 'dark'
  const NEWS_KEY = 'brad_news_seen';   // stores ISO date when read

  /* ---------------------------
     Panels content map (editable)
     --------------------------- */
  const PANELS = {
    welcome: `
      <h2>Bienvenue</h2>
      <p>Ce site centralise tout l'univers Brad Bitt : jeu, Épisodes, musiques et lore.</p>
    `,
    game: `
      <h2>Brad Bitt, mais le jeu</h2>
      <p>Aperçu du jeu, mécaniques et teasing. (Screens, sprites &amp; notes de dev.)</p>
    `,
    lore: `
      <h2>L'histoire de Bitt</h2>
      <p>Le lore complet : origines, chronologie et influences.</p>
    `,
    ep1: `
      <h2>Épisode 1 — La soirée</h2>
      <p>Brad se rend à une soirée — début du mystère.</p>
    `,
    ep2: `
      <h2>Épisode 2 — Changement de programme</h2>
      <p>Brad entre dans une forêt étrange et disparaît.</p>
    `,
    ep3: `
      <h2>Épisode 3 — Retard</h2>
      <p>Brad découvre une salle mystérieuse... (à suivre)</p>
    `,
    news: `
      <h2>Nouveautés</h2>
      <p>C’est ici que vous trouverez les dernières mises à jour du site.</p>
      <p><button data-news-dismiss>J'ai lu</button></p>
    `
  };

  /* ---------------------------
     Overlay open/close + accessibility
     --------------------------- */
  let lastFocused = null;

  function getFocusable(el) {
    if (!el) return [];
    return Array.from(el.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
      .filter(node => node.offsetParent !== null && !node.hasAttribute('disabled'));
  }

  function setMainInert(inert) {
    if (!main) return;
    // prefer the inert API when available
    try {
      if ('inert' in HTMLElement.prototype) {
        main.inert = inert;
      } else {
        main.setAttribute('aria-hidden', inert ? 'true' : 'false');
      }
    } catch (e) {
      // fallback
      main.setAttribute('aria-hidden', inert ? 'true' : 'false');
    }
  }

  function openPanel(key) {
    if (!overlay || !overlayContent || !overlayInner) return;
    const html = PANELS[key] || `<p>Contenu à venir</p>`;
    overlayContent.innerHTML = html;

    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    setMainInert(true);

    lastFocused = document.activeElement;
    document.body.style.overflow = 'hidden';

    // ensure overlayInner is focusable
    if (!overlayInner.hasAttribute('tabindex')) overlayInner.setAttribute('tabindex', '-1');

    // ensure focus lands inside: try to focus first interactive element
    setTimeout(() => {
      overlayInner.focus();
      const foc = getFocusable(overlayInner);
      if (foc.length) foc[0].focus();
    }, 50);

    // If we opened the news panel, mark it as seen and hide badge
    if (key === 'news') {
      try { localStorage.setItem(NEWS_KEY, new Date().toISOString()); } catch (e) {}
      if (newsBadge) newsBadge.hidden = true;
    }
  }

  function closePanel() {
    if (!overlay || !overlayInner) return;
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.removeAttribute('role');
    overlay.removeAttribute('aria-modal');

    setMainInert(false);

    document.body.style.overflow = '';
    // restore focus
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  if (overlayClose) overlayClose.addEventListener('click', closePanel);
  if (overlay) {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePanel(); });
  }

  // Escape closes overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (overlay && !overlay.classList.contains('hidden')) closePanel();
    }
  });

  // Focus trap inside overlay
  if (overlayInner) {
    overlayInner.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const foc = getFocusable(overlayInner);
      if (!foc.length) {
        // no focusable elements: keep focus on overlayInner
        e.preventDefault();
        overlayInner.focus();
        return;
      }
      const first = foc[0];
      const last = foc[foc.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // Handle clicks inside overlay (for dismissing news badge via button in panel)
  if (overlayContent) {
    overlayContent.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-news-dismiss]');
      if (btn) {
        try { localStorage.setItem(NEWS_KEY, new Date().toISOString()); } catch (err) {}
        if (newsBadge) newsBadge.hidden = true;
      }
    });
  }

  /* Map buttons -> panels */
  $$('[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.getAttribute('data-panel');
      // open panel (openPanel handles news marking)
      openPanel(k);
    });
  });

  // news badge initial state
  try {
    const seen = localStorage.getItem(NEWS_KEY);
    if (newsBadge) newsBadge.hidden = !!seen;
  } catch (err) { /* ignore */ }

  // Ep-card click to open panels when .btn small inside ep-card is clicked
  $$('.ep-card [data-panel]').forEach(b => b.addEventListener('click', (e) => {
    const k = b.getAttribute('data-panel');
    openPanel(k);
  }));

  /* ---------------------------
     Theme handling
     --------------------------- */
  const themeToggle = document.getElementById('theme-toggle');

  function applyTheme(mode) {
    // mode: 'auto' | 'light' | 'dark'
    try { localStorage.setItem(THEME_KEY, mode); } catch (e) {}

    // If 'auto', use system preference but still record pref as 'auto'
    if (mode === 'auto') {
      const isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme-pref', 'auto');
    } else if (mode === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.setAttribute('data-theme-pref', 'light');
    } else if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.setAttribute('data-theme-pref', 'dark');
    }

    updateThemeToggleTitle(mode);
  }

  function updateThemeToggleTitle(mode) {
    if (!themeToggle) return;
    const label = mode === 'auto' ? 'Auto' : (mode === 'light' ? 'Clair' : 'Sombre');
    themeToggle.title = `Mode : ${label}`;
    // update aria-pressed for assistive tech (not strictly a toggle button, but helpful)
    themeToggle.setAttribute('aria-pressed', (mode !== 'auto').toString());
  }

  function cycleTheme() {
    const current = localStorage.getItem(THEME_KEY) || 'auto';
    const order = ['auto', 'light', 'dark'];
    const idx = Math.max(0, order.indexOf(current));
    const next = order[(idx + 1) % order.length];
    applyTheme(next);
  }

  if (themeToggle) themeToggle.addEventListener('click', cycleTheme);

  // react to system changes only when in auto
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const mqHandler = () => {
      const mode = localStorage.getItem(THEME_KEY) || 'auto';
      if (mode === 'auto') applyTheme('auto');
    };
    if (mq.addEventListener) mq.addEventListener('change', mqHandler);
    else if (mq.addListener) mq.addListener(mqHandler);
  }

  // init theme from storage
  const initialTheme = localStorage.getItem(THEME_KEY) || 'auto';
  applyTheme(initialTheme);

  /* ---------------------------
     Restore reveal animations & ep-card interactions
     --------------------------- */
  try {
    const revealEls = $$('.reveal');
    revealEls.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 60));
  } catch (e) { /* ignore */ }

  // simple flip handler for ep-cards (click/tap)
  $$('.ep-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // avoid toggling when clicking actionable controls inside
      if (e.target.closest('[data-panel]') || e.target.closest('button') || e.target.closest('a')) return;
      card.classList.toggle('flipped');
    });
  });

});

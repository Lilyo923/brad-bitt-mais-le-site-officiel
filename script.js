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
    `
  };

  /* ---------------------------
     Overlay open/close + accessibility
     --------------------------- */
  let lastFocused = null;

  function getFocusable(el) {
    if (!el) return [];
    return Array.from(el.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
      .filter(node => node.offsetParent !== null);
  }

  function openPanel(key) {
    if (!overlay || !overlayContent || !overlayInner) return;
    const html = PANELS[key] || `<p>Contenu à venir</p>`;
    overlayContent.innerHTML = html;
    overlay.classList.remove('hidden');
    lastFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    // ensure focus lands inside
    setTimeout(() => {
      overlayInner.focus();
      const foc = getFocusable(overlayInner);
      if (foc.length) foc[0].focus();
    }, 50);
  }

  function closePanel() {
    if (!overlay || !overlayInner) return;
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    // restore focus
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  if (overlayClose) overlayClose.addEventListener('click', closePanel);
  if (overlay) {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePanel(); });
  }

  // Escape closes overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (overlay && !overlay.classList.contains('hidden')) closePanel();
    }
  });

  // Focus trap inside overlay
  if (overlayInner) {
    overlayInner.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const foc = getFocusable(overlayInner);
      if (!foc.length) return;
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

  /* Map buttons -> panels */
  $$('[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.getAttribute('data-panel');
      // if news opened, mark seen
      if (k === 'news') {
        try { localStorage.setItem(NEWS_KEY, new Date().toISOString()); } catch (e) {}
        if (newsBadge) newsBadge.hidden = true;
      }
      openPanel(k);
    });
  });

  // news badge initial state
  try {
    const seen = localStorage.getItem(NEWS_KEY);
    if (newsBadge) newsBadge.hidden = !!seen;
  } catch (err) { /* ignore */ }

  // support opening panels from ep-cards (buttons inside ep-back)
  $$('.ep-card [data-panel]').forEach(b => {
    b.addEventListener('click', (e) => {
      const k = b.getAttribute('data-panel');
      openPanel(k);
    });
  });

  // allow keyboard "Enter" on ep-card to open first child button
  $$('.ep-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const btn = card.querySelector('[data-panel]');
        if (btn) {
          btn.click();
          e.preventDefault();
        }
      }
    });
  });

  /* ---------------------------
     Theme handling
     --------------------------- */
  const themeToggle = document.getElementById('theme-toggle');

  function applyTheme(mode) {
    // mode: 'auto' | 'light' | 'dark'
    if (mode === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else if (mode === 'dark') {
      // dark: remove data-theme so CSS falls back to dark vars
      document.documentElement.removeAttribute('data-theme');
    } else {
      // auto: follow prefers-color-scheme
      const isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      if (isLight) document.documentElement.setAttribute('data-theme', 'light');
      else document.documentElement.removeAttribute('data-theme');
    }
    try { localStorage.setItem(THEME_KEY, mode); } catch (e) {}
    updateThemeToggleTitle(mode);
  }

  function updateThemeToggleTitle(mode) {
    if (!themeToggle) return;
    themeToggle.title = `Mode : ${mode}`;
  }

  function cycleTheme() {
    const current = localStorage.getItem(THEME_KEY) || 'auto';
    const order = ['auto', 'light', 'dark'];
    const idx = order.indexOf(current);
    const next = order[(idx + 1) % order.length];
    applyTheme(next);
  }

  if (themeToggle) themeToggle.addEventListener('click', cycleTheme);

  // react to system changes only when in auto
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    if (mq.addEventListener) {
      mq.addEventListener('change', () => {
        const mode = localStorage.getItem(THEME_KEY) || 'auto';
        if (mode === 'auto') applyTheme('auto');
      });
    } else if (mq.addListener) {
      mq.addListener(() => {
        const mode = localStorage.getItem(THEME_KEY) || 'auto';
        if (mode === 'auto') applyTheme('auto');
      });
    }
  }

  // init theme from storage
  const initialTheme = localStorage.getItem(THEME_KEY) || 'auto';
  applyTheme(initialTheme);
});

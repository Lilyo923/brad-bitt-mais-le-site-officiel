document.addEventListener('DOMContentLoaded', () => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  const overlay = $('#overlay');
  const overlayInner = $('#overlay-inner');
  const overlayContent = $('#overlay-content');
  const overlayClose = $('#overlay-close');

  const warn = $('#external-warn');
  const warnMsg = $('#warn-msg');
  const warnClose = $('#warn-close');
  const warnCont = $('#warn-cont');
  const warnCancel = $('#warn-cancel');
  let warnTarget = null;

  const newsBadge = $('#news-badge');
  const btnNews = $('#btn-news');

  const THEME_KEY = 'brad_theme_pref';
  const NEWS_KEY = 'brad_news_seen';

  const PANELS = {
    welcome: `<h2>Bienvenue</h2><p>Ce site centralise tout l'univers de Brad Bitt.</p>`,
    game: `<h2>Brad Bitt — Le jeu</h2><p>Présentation du projet, inspirations et mécaniques.</p>`,
    lore: `<h2>L'histoire de Bitt</h2><p>Chronologie et lore de l’univers.</p>`,
    ep1: `<h2>Épisode 1 — La soirée</h2>`,
    ep2: `<h2>Épisode 2 — Changement de programme</h2>`,
    ep3: `<h2>Épisode 3 — Retard</h2>`,
    contact: `<h2>Contact</h2><p>contact (at) bradbitt.example</p>`,
    news: `<h2>Nouveautés</h2><p>Optimisations et corrections récentes.</p>`
  };

  function openPanel(key) {
    overlayContent.innerHTML = PANELS[key] || '<p>Contenu à venir</p>';
    overlay.classList.remove('hidden');
    setTimeout(() => overlayInner.focus(), 40);
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  overlayClose.addEventListener('click', closePanel);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePanel();
  });

  $$('[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.panel;
      if (key === 'news') {
        localStorage.setItem(NEWS_KEY, new Date().toISOString());
        newsBadge.style.display = 'none';
      }
      openPanel(key);
    });
  });

  $('#oval-learn').addEventListener('click', () => openPanel('welcome'));

  $$('.ep-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

  $$('.mini-nav .external').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      warnTarget = btn.dataset.external;
      warnMsg.textContent = `Vous allez quitter le site pour : ${warnTarget}`;
      warn.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeWarn() {
    warn.classList.add('hidden');
    document.body.style.overflow = '';
    warnTarget = null;
  }

  warnClose.addEventListener('click', closeWarn);
  warnCancel.addEventListener('click', closeWarn);
  warnCont.addEventListener('click', () => {
    if (warnTarget) window.open(warnTarget, '_blank', 'noopener');
    closeWarn();
  });

  const themeToggle = $('#theme-toggle');
  let themePref = localStorage.getItem(THEME_KEY) || 'auto';

  function applyTheme(pref) {
    const root = document.documentElement;
    if (pref === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
  }

  applyTheme(themePref);

  themeToggle.addEventListener('click', () => {
    themePref = themePref === 'auto' ? 'light' : themePref === 'light' ? 'dark' : 'auto';
    localStorage.setItem(THEME_KEY, themePref);
    applyTheme(themePref);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!overlay.classList.contains('hidden')) closePanel();
      if (!warn.classList.contains('hidden')) closeWarn();
    }
  });

  if (localStorage.getItem(NEWS_KEY)) {
    newsBadge.style.display = 'none';
  }
});

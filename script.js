document.addEventListener('DOMContentLoaded', () => {

  const main = document.getElementById('app-main');
  const homeHTML = main.innerHTML;

  const overlay = document.getElementById('overlay');
  const overlayContent = document.getElementById('overlay-content');
  const overlayClose = document.getElementById('overlay-close');
  const newsBadge = document.getElementById('news-badge');

  const NEWS_KEY = 'news_seen';

  const PANELS = {
    welcome: `<h2>Bienvenue</h2><p>Découvrez l’univers Brad Bitt.</p>`,

    contact: `
      <h2>Contact</h2>
      <p>📧 <a href="mailto:contact@bradbitt.fr">contact@bradbitt.fr</a></p>
    `,

    ep1: `<h2>Épisode 1</h2><p>La soirée.</p>`,
    ep2: `<h2>Épisode 2</h2><p>La forêt.</p>`,
    ep3: `<h2>Épisode 3</h2><p>À suivre.</p>`,

    news: `
      <h2>Nouveautés</h2>
      <p id="news-text">
        Ici, vous découvrirez les nouveautés en ce qui concerne des ajouts ou correctifs du site.
      </p>
    `
  };

  function openPanel(key) {
    overlayContent.innerHTML = PANELS[key];
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  overlayClose.addEventListener('click', closePanel);
  overlay.addEventListener('click', e => e.target === overlay && closePanel());

  document.querySelectorAll('[data-panel]').forEach(el => {
    el.addEventListener('click', () => {
      const panel = el.dataset.panel;

      if (panel === 'news') {
        localStorage.setItem(NEWS_KEY, 'seen');
        newsBadge.style.display = 'none';
        PANELS.news = `
          <h2>Nouveautés</h2>
          <p>Aucune nouveauté pour le moment.</p>
        `;
      }

      openPanel(panel);
    });
  });

  document.getElementById('oval-learn')
    .addEventListener('click', () => openPanel('welcome'));

  document.getElementById('btn-discover')
    .addEventListener('click', () => {
      main.innerHTML = `
        <section class="hero container">
          <h1>Brad Bitt — Le jeu</h1>
          <p>Présentation du jeu.</p>
        </section>
      `;
      window.scrollTo(0, 0);
    });

  document.querySelector('.brand').addEventListener('click', () => {
    main.innerHTML = homeHTML;
    window.scrollTo(0, 0);
  });

});

/* =============================================================================
   BRAD BITT, MAIS LE SITE — script v2
   Thèmes · badge nouveautés · modale (nouveautés, lettre, lecteur) ·
   cartes épisodes · apparitions au défilement.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const overlay        = $('#overlay');
  const overlayInner   = $('#overlay-inner');
  const overlayContent = $('#overlay-content');
  const overlayClose   = $('#overlay-close');

  const newsBtn   = $('#btn-news');
  const newsBadge = $('#news-badge');

  const ovalLearn   = $('#oval-learn');
  const themeToggle = $('#theme-toggle');

  const THEME_KEY = 'brad_theme_pref';

  // ← Incrémente cette valeur à chaque nouvelle MàJ pour réafficher le badge
  const NEWS_VERSION  = '1.5.1';
  const NEWS_SEEN_KEY = 'brad_news_seen_v';

  const moinsDAnimation = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------------
     Badge « nouveautés »
     ------------------------------------------------------------------- */
  function refreshNewsBadge() {
    if (!newsBadge) return;
    let seen = null;
    try { seen = localStorage.getItem(NEWS_SEEN_KEY); } catch (e) {}
    newsBadge.hidden = (seen === NEWS_VERSION);
  }

  function markNewsRead() {
    if (!newsBadge) return;
    newsBadge.hidden = true;
    try { localStorage.setItem(NEWS_SEEN_KEY, NEWS_VERSION); } catch (e) {}
  }

  refreshNewsBadge();

  /* ----------------------------------------------------------------------
     Historique des versions
     ------------------------------------------------------------------- */
  const NEWS_HISTORY = [
    {
      version: '1.5.1',
      date: '13-09-2026',
      teaser: 'Le jeu a ses dates — bêta du 27 au 29 novembre 2026, sortie le 9 janvier 2027 — et le site se dote d\'une politique d\'utilisation et de confidentialité.',
      detailHtml: `<p>« Brad Bitt, mais le jeu » quitte le « courant 2027 » pour deux dates fermes :
        une <strong>bêta ouverte du 27 au 29 novembre 2026</strong>, puis la
        <strong>sortie officielle le 9 janvier 2027</strong>. Le site a été mis à jour partout
        où la date apparaissait, page de présentation comprise.</p>
        <p>Cette mise à jour apporte également une politique d'utilisation et de confidentialité,
        disponible en <a href="#confidentialite">cliquant ici</a> : qui édite le site, ce qu'il
        enregistre, ce qu'il envoie ailleurs, et comment il a été écrit. Le tout pour une meilleure
        transparence du site en lui-même.</p>`
    },
    {
      version: '1.4',
      date: '24-08-2026',
      teaser: 'Refonte visuelle complète du site, nouvelle présentation du jeu à faire défiler, et une date : courant 2027.',
      detailHtml: `<p>Le développement du jeu n'est plus suspendu : la sortie est désormais visée pour courant 2027.
        La lettre a été réécrite en conséquence.</p>
        <p>Le site a été entièrement redessiné — nouvelle page d'accueil, nouvelle typographie, nouveaux thèmes clair et sombre,
        cartes d'épisodes avec vignettes. Le lien Canva a été remplacé par une véritable page de présentation du jeu,
        qui se découvre en faisant défiler : histoire, déplacements, combat, ennemis, niveaux, Brad Coins,
        uniformes, bande-son et feuille de route.</p>`
    },
    {
      version: '1.3',
      date: '25-06-2026',
      teaser: 'Refonte visuelle importante du site et ajout d\'une lettre ouverte de Brad Bitt concernant le jeu.',
      detailHtml: `<p>Corrections de bugs mineurs et amélioration de l'interface.</p>`
    },
    {
      version: '1.2',
      date: '21-03-2026',
      teaser: 'Cette mise à jour améliore l\'expérience générale du site avec des ajustements visuels et interactifs pensés pour une navigation plus naturelle et plus lisible.',
      detailHtml: `<p>Le mode de thème affiche désormais l'indication « auto » lors de la première visite ou lorsqu'il est actif. L'interface mobile a été optimisée avec un logo mieux adapté aux téléphones, et une animation met en évidence l'interactivité des cartes. Le comportement du badge de "nouveautés" a également été corrigé pour une utilisation plus intuitive. Enfin, le site dispose maintenant d'une icône dédiée lors de l'ajout en favori ou sur l'écran d'accueil.</p>`
    },
    {
      version: '1.1',
      date: '14-02-2026',
      teaser: 'Cette mise à jour apporte plusieurs améliorations importantes pour rendre l\'expérience plus claire, plus moderne et plus agréable à utiliser.',
      detailHtml: `<p>Amélioration de la rubrique "Nouveautés", avec un affichage plus clair des versions. Correction du badge « 1 », qui disparaît désormais lorsqu'il est consulté. Ajout d'un bouton "Suivi du jeu" dans la section "Brad Bitt, mais le jeu" pour accéder directement au développement du projet. Optimisation générale de l'interface sur ordinateur.</p>`
    },
    {
      version: '1.0',
      date: '14-01-2026',
      teaser: 'Lancement initial du site.',
      detailHtml: `<p>Première version publique contenant la page principale, les cartes Episodes/Musiques/Lore et le lecteur intégré pour les épisodes.</p>`
    }
  ];

  /* ----------------------------------------------------------------------
     Contenu des panneaux
     ------------------------------------------------------------------- */
  const PANELS = {
    welcome: `
      <h2>En savoir plus</h2>
      <p>Ce site rassemble tout ce qui gravite autour de Brad Bitt : le jeu en préparation,
        les épisodes de la mini-série, les ambiances sonores et les éléments de récit qui donnent vie à ce monde.</p>
      <p>La page <strong>« Le jeu »</strong> raconte en détail ce qui est prévu : l'histoire, les déplacements,
        le système de combat, les Serra, les niveaux, les Brad Coins, les uniformes et la feuille de route.
        Elle se découvre simplement en faisant défiler.</p>
      <p>Certains contenus sont déjà accessibles, d'autres arriveront progressivement.
        L'idée est simple : offrir un point d'entrée clair pour explorer, comprendre et suivre l'évolution du projet.</p>
    `,
    letter: `
      <div class="letter-panel">
        <div class="letter-panel-from">Un message de Brad Bitt</div>
        <div class="letter-body">
          <p class="letter-salutation">Cher Bradbittien, chère Brad Bittienne,</p>

          <p>Il y a quelques mois, je vous annonçais que le développement du jeu Brad Bitt était
            suspendu pour une durée indéterminée. Cette phrase n'a plus lieu d'être.</p>

          <p class="letter-strong">Le jeu n'est pas suspendu, et il n'est plus attendu « courant 2027 » :
            la bêta ouvre du 27 au 29 novembre 2026, et la sortie officielle est fixée
            au 9 janvier 2027.</p>

          <p>Ce n'est pas un renoncement, c'est un calendrier. Entre les études, les projets personnels
            et les idées qui occupent mon quotidien, je ne peux pas avancer au rythme d'un studio.
            Alors plutôt que de promettre une date que je ne tiendrai pas, j'ai pris le temps qu'il fallait —
            et maintenant que le travail a suffisamment avancé, je peux enfin écrire ces deux dates
            noir sur blanc.</p>

          <p>Et pendant ce temps, ça avance. La bande-son est écrite. L'univers est dessiné :
            Brad, les Serra, les uniformes. L'histoire et le concept général sont posés.
            Un prototype se joue déjà — un vrai niveau d'introduction, avec son menu, sa musique,
            sa sauvegarde et ses ennemis.</p>

          <p>Ce qui prend du temps, c'est le reste : la programmation, la construction des dix niveaux,
            le hub, la boutique, les mini-jeux. C'est le travail invisible qui se cache derrière un jeu vidéo,
            et c'est celui qui demande le plus de patience — la vôtre comme la mienne.</p>

          <p>J'en profite pour vous dire un immense merci. Vous n'êtes peut-être pas des milliers,
            mais chacun d'entre vous compte énormément. Chaque visite sur le site, chaque message,
            chaque encouragement me donne la motivation de continuer.</p>

          <p>Sans votre soutien, Brad Bitt ne serait probablement qu'une simple idée griffonnée
            dans un coin de carnet. Aujourd'hui, grâce à vous, cet univers continue d'exister et de grandir.</p>

          <p>Alors, au nom de toute l'équipe d'IMAGINe Studio… et de Brad Bitt
            (qui représente à peu près la même personne, let's be honest), merci pour votre patience,
            votre fidélité et votre soutien.</p>

          <p class="letter-closing">The adventure isn't over.<br>See you on January 9th.</p>
          <p class="letter-sig">— BB</p>
        </div>
      </div>
    `
  };

  function buildNewsHtml() {
    const items = NEWS_HISTORY.map((n, idx) => `
      <article class="news-card" tabindex="0" role="button" data-index="${idx}" aria-expanded="false">
        <div class="meta">
          <div class="version">v${n.version}</div>
          <div class="date">${n.date}</div>
        </div>
        <div class="teaser">${n.teaser}</div>
        <div class="detail">${n.detailHtml}</div>
      </article>
    `).join('');
    return `<h2>Nouveautés</h2><div class="news-list">${items}</div>`;
  }

  function attachNewsHandlers() {
    overlayContent.querySelectorAll('.news-card').forEach(card => {
      const basculer = () => {
        const ouvert = card.classList.toggle('expanded');
        card.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      };
      card.addEventListener('click', e => {
        // Un lien dans le texte ne doit pas replier la carte au passage.
        if (e.target.closest('a')) return;
        basculer();
      });
      card.addEventListener('keydown', e => {
        if (e.target !== card) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); basculer(); }
      });
    });
    attacherAncres();
  }

  /* Un lien « #quelque-chose » écrit dans la modale doit d'abord la fermer,
     sinon on défile vers une section cachée derrière le voile. */
  function attacherAncres() {
    overlayContent.querySelectorAll('a[href^="#"]').forEach(lien => {
      lien.addEventListener('click', e => {
        e.preventDefault();
        const cible = document.querySelector(lien.getAttribute('href'));
        closePanel();
        if (!cible) return;
        // Un bloc replié s'ouvre pour que l'on arrive sur du contenu lisible.
        if (cible.tagName === 'DETAILS') cible.open = true;
        requestAnimationFrame(() => {
          cible.scrollIntoView({ behavior: moinsDAnimation ? 'auto' : 'smooth', block: 'start' });
          const titre = cible.querySelector('h2, h3') || cible;
          titre.setAttribute('tabindex', '-1');
          titre.focus({ preventScroll: true });
        });
      });
    });
  }

  /* ----------------------------------------------------------------------
     Modale
     ------------------------------------------------------------------- */
  let lastFocused = null;

  function openPanel(key, options = {}) {
    if (!overlay || !overlayContent || !overlayInner) return;
    const html = key === 'news'
      ? buildNewsHtml()
      : (PANELS[key] || options.html || '<p>Contenu à venir</p>');

    overlayContent.innerHTML = html;
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    lastFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    overlayInner.focus();

    if (key === 'news') {
      markNewsRead();
      requestAnimationFrame(attachNewsHandlers);
    } else {
      requestAnimationFrame(attacherAncres);
    }
  }

  function closePanel() {
    if (!overlay) return;
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (overlayContent) overlayContent.innerHTML = '';   // coupe la vidéo en cours
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  if (overlayClose) overlayClose.addEventListener('click', closePanel);
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closePanel(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) closePanel();
  });

  if (ovalLearn) ovalLearn.addEventListener('click', () => openPanel('welcome'));

  const readLetterBtn = $('#btn-read-letter');
  if (readLetterBtn) readLetterBtn.addEventListener('click', () => openPanel('letter'));

  if (newsBtn) newsBtn.addEventListener('click', () => { markNewsRead(); openPanel('news'); });
  if (newsBadge) newsBadge.addEventListener('click', e => {
    e.stopPropagation(); e.preventDefault();
    markNewsRead(); openPanel('news');
  });

  /* ----------------------------------------------------------------------
     Cartes épisodes

     Le bouton « Voir l'épisode » est écouté directement, pas par délégation :
     il peut ainsi arrêter la propagation du clic, et la carte ne se retourne
     plus dans son dos. La carte, elle, ne réagit qu'aux touches qui lui sont
     réellement adressées — sinon Entrée sur le bouton déclenchait les deux.
     ------------------------------------------------------------------- */
  function ouvrirVideo(videoId) {
    if (!videoId) { openPanel(null, { html: '<p>Vidéo indisponible.</p>' }); return; }
    openPanel(null, { html: `
      <h2>Lecture</h2>
      <div class="video-wrap">
        <iframe src="https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1"
                title="Épisode des aventures de Bitt"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
      </div>
      <p style="margin-top:14px">Fermez la fenêtre pour revenir au site.</p>
    ` });
  }

  $$('.ep-card').forEach(card => {
    const retourner = () => {
      const ouvert = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', ouvert ? 'true' : 'false');
    };

    card.addEventListener('click', e => {
      if (e.target.closest('.btn-visionner') || e.target.closest('a')) return;
      retourner();
    });

    card.addEventListener('keydown', e => {
      if (e.target !== card) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); retourner(); }
    });

    card.querySelectorAll('.btn-visionner').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        ouvrirVideo(btn.getAttribute('data-video') || card.getAttribute('data-video'));
      });
      // Entrée et Espace déclenchent déjà le clic du bouton : on empêche
      // seulement la touche de remonter jusqu'à la carte.
      btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
      });
    });
  });

  /* ----------------------------------------------------------------------
     Thème
     ------------------------------------------------------------------- */
  const logoImg = document.getElementById('site-logo');

  function updateLogoForTheme(pref) {
    if (!logoImg) return;
    let clair;
    if (pref === 'light') clair = true;
    else if (pref === 'dark') clair = false;
    else {
      const mm = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
      clair = mm ? mm.matches : true;
    }
    logoImg.src = clair ? 'images/logo bb site clair.png' : 'images/logo bb site sombre.png';
  }

  function applyTheme(pref = 'auto', save = false) {
    try {
      const root = document.documentElement;
      let clair;
      if (pref === 'light') clair = true;
      else if (pref === 'dark') clair = false;
      else {
        const mm = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
        clair = mm ? mm.matches : true;
      }
      if (clair) root.setAttribute('data-theme', 'light');
      else root.removeAttribute('data-theme');

      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', clair ? '#f5f6fa' : '#08090d');

      if (themeToggle) {
        themeToggle.classList.remove('is-light', 'is-dark');
        if (pref === 'light') themeToggle.classList.add('is-light');
        else if (pref === 'dark') themeToggle.classList.add('is-dark');

        const title = pref === 'auto' ? 'Mode : automatique'
                    : pref === 'light' ? 'Mode : clair' : 'Mode : sombre';
        themeToggle.setAttribute('title', title);
        themeToggle.setAttribute('aria-label', title);

        const modeLabel = document.getElementById('theme-mode-label');
        if (modeLabel) {
          if (pref === 'auto') {
            modeLabel.textContent = 'auto';
            void modeLabel.offsetHeight;
            modeLabel.classList.add('visible');
          } else {
            modeLabel.classList.remove('visible');
          }
        }
      }

      updateLogoForTheme(pref);
      if (save) { try { localStorage.setItem(THEME_KEY, pref); } catch (e) {} }
    } catch (e) {}
  }

  let prefCourante = 'auto';
  try { prefCourante = localStorage.getItem(THEME_KEY) || 'auto'; } catch (e) {}
  applyTheme(prefCourante, false);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const ordre = ['auto', 'light', 'dark'];
      prefCourante = ordre[(ordre.indexOf(prefCourante) + 1) % ordre.length];
      applyTheme(prefCourante, true);
    });
  }

  // Si l'utilisateur est en « auto », suivre les changements du système.
  const mmSysteme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
  if (mmSysteme && mmSysteme.addEventListener) {
    mmSysteme.addEventListener('change', () => { if (prefCourante === 'auto') applyTheme('auto', false); });
  }

  /* ----------------------------------------------------------------------
     Apparitions au défilement
     ------------------------------------------------------------------- */
  (function reveals() {
    const cibles = $$('.reveal');
    if (!cibles.length) return;

    if (moinsDAnimation || !('IntersectionObserver' in window)) {
      cibles.forEach(el => el.classList.add('visible'));
      return;
    }

    // Décalage progressif entre voisins d'un même conteneur.
    const compteurs = new Map();
    cibles.forEach(el => {
      const parent = el.parentElement;
      const n = compteurs.get(parent) || 0;
      el.style.setProperty('--i', String(Math.min(n, 5)));
      compteurs.set(parent, n + 1);
    });

    const obs = new IntersectionObserver((entrees) => {
      entrees.forEach(entree => {
        if (!entree.isIntersecting) return;
        entree.target.classList.add('visible');
        obs.unobserve(entree.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    cibles.forEach(el => obs.observe(el));
  })();

  /* ----------------------------------------------------------------------
     En-tête : trait de séparation dès que la page défile
     ------------------------------------------------------------------- */
  (function headerStuck() {
    const header = $('.site-header');
    if (!header) return;
    const maj = () => header.classList.toggle('is-stuck', window.scrollY > 8);
    maj();
    addEventListener('scroll', maj, { passive: true });
  })();
});

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
  const NEWS_VERSION  = '1.6';
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
      version: '1.6',
      date: '23-11-2026',
      teaser: 'La bande-son de la b\u00eata est en ligne : sept titres \u00e0 \u00e9couter directement depuis le site, quatre jours avant l\'ouverture.',
      detailHtml: `<p>La rubrique <strong>Musiques</strong> ne dit plus &laquo;&nbsp;prochainement&nbsp;&raquo;.
        Elle accueille <strong>&laquo;&nbsp;Brad Bitt, mais le jeu &mdash; B&Ecirc;TA OST&nbsp;&raquo;</strong>, sept titres et
        dix-huit minutes : le menu, l'intro, la base, les trois niveaux de la b&ecirc;ta et le mini-boss.</p>
        <p>Un clic sur la pochette ouvre l'album et lance la lecture sans quitter la page.
        Le lecteur n'est charg&eacute; qu'&agrave; ce moment-l&agrave; : tant que vous ne cliquez pas,
        rien n'est demand&eacute; &agrave; SoundCloud.</p>`
    },
    {
      version: '1.5',
      date: '16-11-2026',
      teaser: 'La bêta arrive : une rubrique dédiée sur l\'accueil, avec un décompte en direct et le skin exclusif à décrocher.',
      detailHtml: `<p>Cette mise à jour comprend une refonte exclusive du site, spécialement déployée pour accompagner la phase bêta du jeu Brad Bitt.</p>`
    },
    {
      version: '1.4.1',
      date: '13-09-2026',
      teaser: 'Le jeu a enfin ses dates — une bêta fin novembre, la sortie début janvier — et le site s\'explique sur ce qu\'il fait de vos données.',
      detailHtml: `<p>« Brad Bitt, mais le jeu » ne sortira plus « courant 2027 ».
        La bêta ouvre du <strong>27 au 29 novembre 2026</strong>, avec les trois premiers niveaux,
        et la sortie officielle est fixée au <strong>9 janvier 2027</strong>.
        Les deux dates ont été reportées partout sur le site.</p>
        <p>Le site se dote également d'une politique d'utilisation et de confidentialité,
        à lire en <a href="/confidentialite">cliquant ici</a>. Elle explique qui l'édite,
        ce qu'il enregistre, ce qu'il va chercher ailleurs et comment il a été écrit —
        histoire que rien ne se passe dans votre dos.</p>`
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
  /* L'adresse du lecteur SoundCloud. Elle n'est demandee qu'au moment ou le
     panneau s'ouvre : tant qu'on ne clique pas sur la pochette, le navigateur
     ne contacte pas SoundCloud. */
  const LECTEUR_OST =
    'https://w.soundcloud.com/player/?url=' +
    encodeURIComponent('https://api.soundcloud.com/playlists/2333967765') +
    '&color=%23f53098&auto_play=true&hide_related=true&show_comments=false' +
    '&show_user=true&show_reposts=false&show_teaser=false&visual=false';

  const PISTES_OST = [
    ['Menu principal', '3:52'], ['level_intro_theme', '2:23'], ['base', '2:15'],
    ['level1', '2:31'], ['level2', '2:11'], ['level3', '2:39'], ['Mini-boss_3', '2:52'],
  ];

  const PANELS = {
    album: `
      <div class="disque">
        <div class="disque-haut">
          <div class="disque-pochette">
            <img src="images/ost/pochette-beta.png" alt="Pochette de l'album" width="800" height="800">
          </div>
          <div class="disque-texte">
            <p class="disque-etiquette">Album &middot; 7 titres &middot; 18 min</p>
            <h2>Brad Bitt, mais le jeu<br>B&Ecirc;TA &mdash; OST</h2>
            <p class="disque-slogan">Laissez-vous emporter par les musiques de
              <em>Brad Bitt, mais le jeu</em>&hellip; avant la b&ecirc;ta.</p>
          </div>
        </div>

        <div class="disque-lecteur">
          <iframe src="${LECTEUR_OST}" title="Lecteur SoundCloud &mdash; Brad Bitt, mais le jeu, b&ecirc;ta OST"
                  allow="autoplay" loading="lazy"></iframe>
        </div>


        <p class="disque-pied">Album de <strong>l&#305;lY&ordm;</strong> pour IMAGINe Studio.
          <a href="https://soundcloud.com/l-ly-39181851/sets/brad-bitt-mais-le-jeu-beta-ost"
             target="_blank" rel="noopener noreferrer">Ouvrir dans SoundCloud &#8599;</a></p>
      </div>
    `,
    welcome: `
      <h2>En savoir plus</h2>
      <p>Ce site rassemble tout ce qui gravite autour de Brad Bitt : le jeu en préparation,
        les épisodes de la mini-série, les ambiances sonores et les éléments de récit qui donnent vie à ce monde.</p>
      <p>La page <strong>« Le jeu »</strong> raconte en détail ce qui est prévu : l'histoire, les déplacements,
        le système de combat, les Serra, les niveaux, les Brad Coins, les uniformes et la feuille de route.
        Elle se découvre simplement en faisant défiler.</p>
      <p>Certains contenus sont déjà accessibles, d'autres arriveront progressivement.
        L'idée est simple : offrir un point d'entrée clair pour explorer, comprendre et suivre l'évolution du projet.</p>
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

    // innerHTML est synchrone : les noeuds existent deja, inutile d'attendre
    // une image pour brancher les ecouteurs.
    if (key === 'news') {
      markNewsRead();
      attachNewsHandlers();
    } else {
      attacherAncres();
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

  // La pochette et le bouton menent au meme endroit.
  $$('#ost-ouvrir, #ost-ouvrir-2').forEach(b =>
    b.addEventListener('click', () => openPanel('album')));

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
  /* ----------------------------------------------------------------------
     LA BÊTA : décompte et bascule automatique des trois états

     La rubrique est publiée une fois et se débrouille seule : elle compte
     jusqu'au 27 novembre, puis affiche le temps restant jusqu'au 29, puis
     bascule sur la sortie du 9 janvier. Aucun redéploiement en cours de route.

     L'HEURE N'EST PAS CELLE DE L'APPAREIL. Avancer l'horloge de son
     ordinateur est la première chose qu'on essaie : la page demande donc
     l'heure au serveur qui l'héberge — l'en-tête `Date` de sa propre réponse,
     aucun service extérieur — puis compte localement à partir de là. C'est le
     procédé qu'utilise déjà le jeu (js/compte.js).
     ------------------------------------------------------------------- */
  (function beta() {
    const section = $('#beta');
    if (!section) return;

    const ouverture = Date.parse(section.dataset.ouverture);
    const fermeture = Date.parse(section.dataset.fermeture);
    const sortie    = Date.parse(section.dataset.sortie);
    if (!isFinite(ouverture) || !isFinite(fermeture) || !isFinite(sortie)) return;

    const compte = $('#beta-compte');
    const mot    = $('#beta-mot');

    /* --- l'horloge ----------------------------------------------------- */
    let decalage = 0;                    // serveur − appareil, en millisecondes
    const maintenant = () => Date.now() + decalage;

    function synchroniser() {
      const p0 = performance.now();
      // Le paramètre casse le cache sans changer la page demandée.
      fetch(location.pathname + '?h=' + Date.now(), { method: 'HEAD', cache: 'no-store' })
        .then(r => {
          const d = Date.parse(r.headers.get('Date') || '');
          if (!isFinite(d)) return;
          // L'en-tête est arrondi à la seconde : on vise le milieu, et on
          // rattrape la moitié de l'aller-retour.
          decalage = (d + 500 + (performance.now() - p0) / 2) - Date.now();
          rendre();
        })
        .catch(() => { /* hors ligne : on garde l'horloge de l'appareil */ });
    }

    /* --- les trois états ------------------------------------------------ */
    function etatA(t) {
      if (t < ouverture) return 'avant';
      if (t < fermeture) return 'ouverte';
      return 'terminee';
    }

    const UNITES = [
      ['j', 86400, 'JOURS',    'JOUR'],
      ['h',  3600, 'HEURES',   'HEURE'],
      ['m',    60, 'MINUTES',  'MINUTE'],
      ['s',     1, 'SECONDES', 'SECONDE'],
    ];

    /* Ce que dit le BRADDY3000 en attendant — les répliques du jeu, pour que
       ce soit la même voix des deux côtés. Elles tournent toutes les 9 s. */
    const REPLIQUES = [
      [14 * 86400, ['Je compte les secondes. Toutes. Je n\'ai que ça à faire.',
                    'Brad dort. Moi je surveille le compteur. Chacun son talent.',
                    'La base est presque montée. Il manque une vis. Je sais laquelle.']],
      [2 * 86400,  ['Plus que quelques jours. J\'ai dépoussiéré la borne d\'arcade.',
                    'Les Serra répètent. Je les entends d\'ici. C\'est inquiétant.',
                    'J\'ai compté les Brad Coins. Deux fois. Il en manque toujours un.']],
      [86400,      ['Demain. J\'ai vérifié trois fois : c\'est demain.',
                    'Dors. Moi je ne dors pas, je suis un robot. C\'est pratique.']],
      [3600,       ['Quelques heures. Ne reste pas debout, tu vas rayer le sol.',
                    'Je chauffe les enceintes. Elles n\'aiment pas démarrer à froid.']],
      [60,         ['Moins d\'une heure. Ne touche à rien.',
                    'Ça y est presque. J\'ai dit : ne touche à rien.']],
      [0,          ['Zéro. Vas-y.']],
    ];
    const PENDANT = [
      'C\'est ouvert. Qu\'est-ce que tu attends ?',
      'Trois niveaux. Un skin. Un dimanche soir. Fais le calcul.',
      'Je note tout ce que tu fais. Pour les statistiques. Uniquement.',
    ];
    const APRES = [
      'C\'est fini. J\'ai éteint les enceintes.',
      'Rendez-vous le 9 janvier. J\'aurai retrouvé la vis.',
    ];

    function replique(etat, reste) {
      const tour = Math.floor(maintenant() / 9000);
      if (etat === 'ouverte') return PENDANT[tour % PENDANT.length];
      if (etat === 'terminee') return APRES[tour % APRES.length];
      for (const [seuil, phrases] of REPLIQUES) {
        if (reste > seuil) return phrases[tour % phrases.length];
      }
      return '';
    }

    /* --- l'affichage ---------------------------------------------------- */
    let dernierEtat = null;

    function rendre() {
      const t = maintenant();
      const etat = etatA(t);
      const cible = etat === 'avant' ? ouverture : etat === 'ouverte' ? fermeture : sortie;
      let reste = Math.max(0, Math.floor((cible - t) / 1000));

      if (etat !== dernierEtat) {
        section.dataset.etat = etat;
        dernierEtat = etat;
      }

      let r = reste;
      for (const [cle, pas, pluriel, singulier] of UNITES) {
        const v = Math.floor(r / pas);
        r -= v * pas;
        const nombre = compte.querySelector('[data-unite="' + cle + '"]');
        const nom    = compte.querySelector('[data-nom="' + cle + '"]');
        if (nombre) nombre.textContent = cle === 'j' ? String(v) : String(v).padStart(2, '0');
        if (nom)    nom.textContent = v === 1 ? singulier : pluriel;
      }
      // Une phrase complète pour qui n'a que la synthèse vocale.
      compte.setAttribute('aria-label', etat === 'ouverte'
        ? 'Temps restant avant la fermeture de la bêta'
        : etat === 'avant' ? 'Temps restant avant l\'ouverture de la bêta'
        : 'Temps restant avant la sortie du jeu');

      if (mot) {
        const phrase = replique(etat, reste);
        if (phrase && mot.textContent !== phrase) mot.textContent = phrase;
      }
    }

    rendre();
    synchroniser();
    setInterval(rendre, 1000);
    // De retour sur l'onglet après une longue pause, on revérifie l'heure :
    // les minuteurs d'arrière-plan dérivent, et la bascule peut avoir eu lieu.
    addEventListener('visibilitychange', () => { if (!document.hidden) synchroniser(); });

    /* --- « Ajouter à mon agenda » --------------------------------------- */
    const agenda = $('#beta-agenda');
    if (agenda) {
      /* iCalendar veut des lignes de 75 octets au plus, les suivantes
         commençant par une espace. On compte en octets, pas en caractères :
         « à » en pèse deux. */
      const plier = ligne => {
        const octets = new TextEncoder().encode(ligne);
        if (octets.length <= 74) return ligne;
        const morceaux = [];
        let courant = '';
        for (const c of ligne) {
          const essai = courant + c;
          const max = morceaux.length ? 73 : 74;      // la suite perd une place pour l'espace
          if (new TextEncoder().encode(essai).length > max) { morceaux.push(courant); courant = c; }
          else courant = essai;
        }
        morceaux.push(courant);
        return morceaux.join('\r\n ');
      };

      agenda.addEventListener('click', () => {
        const horo = ms => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        const ics = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//IMAGINe Studio//Brad Bitt//FR',
          'BEGIN:VEVENT',
          'UID:beta-brad-bitt-2026@bbittmaislesite.netlify.app',
          'DTSTAMP:' + horo(Date.now()),
          'DTSTART:' + horo(ouverture),
          'DTEND:' + horo(fermeture),
          'SUMMARY:Bêta de Brad Bitt, mais le jeu',
          'DESCRIPTION:Trois jours, les trois premiers niveaux, et un skin exclusif'
            + ' à décrocher en les terminant.\\nhttps://bbittmaislejeu.netlify.app',
          'URL:https://bbittmaislejeu.netlify.app',
          'END:VEVENT',
          'END:VCALENDAR',
        ].map(plier).join('\r\n');

        const lien = document.createElement('a');
        lien.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
        lien.download = 'beta-brad-bitt.ics';
        document.body.appendChild(lien);
        lien.click();
        document.body.removeChild(lien);
        setTimeout(() => URL.revokeObjectURL(lien.href), 1000);

        const avant = agenda.textContent;
        agenda.textContent = 'Fichier téléchargé';
        setTimeout(() => { agenda.textContent = avant; }, 2600);
      });
    }
  })();
});

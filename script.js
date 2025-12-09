// Basic interactions + scroll reveal + panels + ep-card flip + external warning
document.addEventListener('DOMContentLoaded',()=>{

  /* helpers */
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

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

  /* Panels content map (simple placeholders you will expand) */
  const PANELS = {
    welcome: `<h2>Bienvenue</h2><p>Ce site centralise tout l'univers Brad Bitt : jeu, épisodes, musiques et lore.</p>`,
    game: `<h2>Brad Bitt — Le jeu</h2><p>Aperçu du jeu, mécaniques et teasing. (Screens, sprites & dev notes ici.)</p>`,
    lore: `<h2>L'histoire de Bitt</h2><p>Le lore complet : origines, chronologie et influences.</p>`,
    ep1: `<h2>Épisode 1 — Prologue</h2><p>Résumé, lien vers la vidéo (ou lecteur intégré) et notes.</p>`,
    ep2: `<h2>Épisode 2</h2><p>Résumé court et teasers.</p>`,
    news: `<h2>Nouveautés</h2><ul><li>Optimisation mobile</li><li>Correction transitions menu → jeu</li></ul>`
  };

  /* open overlay with panel */
  function openPanel(key){
    overlayContent.innerHTML = PANELS[key] || `<p>Contenu à venir</p>`;
    overlay.classList.remove('hidden');
    overlayInner.focus();
    document.body.style.overflow = 'hidden';
  }
  function closePanel(){
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
  overlayClose.addEventListener('click', closePanel);
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closePanel(); });

  /* map buttons -> panels */
  $$('[data-panel]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const k = btn.getAttribute('data-panel');
      openPanel(k);
    });
  });

  /* OVAL (hero) */
  const oval = $('#oval-learn');
  oval.addEventListener('click', ()=> openPanel('welcome'));

  /* IntersectionObserver for reveal */
  const reveals = $$('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('visible'); }
      else { en.target.classList.remove('visible'); }
    });
  }, {threshold: 0.12});
  reveals.forEach(r=>io.observe(r));

  /* ep-card flip: hover desktop, tap mobile */
  const epCards = $$('.ep-card');
  epCards.forEach(card=>{
    // desktop hover handled by CSS transform if we want; here we attach click/tap
    card.addEventListener('click', ()=>{
      // toggle flip on click
      card.classList.toggle('flipped');
    });
    // keyboard accessibility: Enter or Space flips
    card.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
    });
  });

  /* mini-nav external handling (warn before leaving) */
  $$('.mini-nav .external').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      warn.classList.remove('hidden');
      warnTarget = btn.getAttribute('data-external');
      warnMsg.textContent = `En cliquant sur continuer, vous quitterez bradbitt.example pour aller vers : ${warnTarget}`;
      document.body.style.overflow = 'hidden';
    });
  });
  // warn handlers
  warnClose.addEventListener('click', ()=>{ warn.classList.add('hidden'); document.body.style.overflow=''; warnTarget=null; });
  warnCancel.addEventListener('click', ()=>{ warn.classList.add('hidden'); document.body.style.overflow=''; warnTarget=null; });
  warnCont.addEventListener('click', ()=>{
    if(warnTarget) window.open(warnTarget, '_blank', 'noopener');
    warn.classList.add('hidden'); document.body.style.overflow=''; warnTarget=null;
  });

  /* small: allow nav panel buttons (news/contact) to open overlay */
  $$('.nav-item').forEach(nb=>{
    nb.addEventListener('click', (e)=>{
      const panel = nb.getAttribute('data-panel');
      if(panel && PANELS[panel]) openPanel(panel);
    });
  });

  /* keyboard: esc closes overlays */
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      if(!overlay.classList.contains('hidden')) closePanel();
      if(!warn.classList.contains('hidden')) { warn.classList.add('hidden'); document.body.style.overflow=''; }
    }
  });

  /* small accessibility: focus trap basic (overlay) */
  overlay.addEventListener('keydown', (e)=>{
    if(e.key === 'Tab'){ /* naive trap: keep focus inside overlay-inner */ }
  });

  // final: mark reveals that are already in view
  setTimeout(()=> reveals.forEach(r=> io.observe(r)),200);
});

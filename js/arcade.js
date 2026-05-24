/* Mrs. Rogers’ Arcade — shared offline helpers.
   This file intentionally has no external dependencies. */
(function(){
  'use strict';
  const root = document.documentElement;
  root.classList.add('mrs-arcade-ready');

  function removeDuplicateAnswerText(){
    // Defensive accessibility helper only: it does not change game answers.
    // It marks exact duplicate visible answer text for easy debugging in DevTools.
    document.querySelectorAll('.ans-grid,.ans-grid-4,.ans-grid-3,.ans-grid-2,.fix-opts').forEach(grid=>{
      const seen = new Set();
      grid.querySelectorAll('button').forEach(btn=>{
        const key = (btn.textContent || '').trim().replace(/\s+/g,' ').toLowerCase();
        if(!key) return;
        if(seen.has(key)) btn.dataset.duplicateChoice = 'true';
        seen.add(key);
      });
    });
  }

  function improveTapTargets(){
    document.querySelectorAll('button,a,.tap-word,.sort-chip,.m-card').forEach(el=>{
      el.setAttribute('data-arcade-target','ready');
    });
  }

  window.MrsRogersArcade = Object.freeze({
    version:'2026-05-24-repair-2',
    refresh(){ removeDuplicateAnswerText(); improveTapTargets(); }
  });


  console.info('🎮 Mrs. Rogers’ Arcade Loaded', window.MrsRogersArcade.version);

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', window.MrsRogersArcade.refresh, {once:true});
  }else{
    window.MrsRogersArcade.refresh();
  }
})();

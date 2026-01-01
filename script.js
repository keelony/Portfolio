// --- OUVERTURE DES POPUPS PROJETS ---

const projets = document.querySelectorAll('.projet');

projets.forEach(projet => {
  projet.addEventListener('click', () => {

    const id = projet.getAttribute('data-projet');
    const contenu = document.querySelector(`#projet-${id}`).innerHTML;

    // création de l’overlay
    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');

    // création de la popup
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // bouton de fermeture
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('popup-close');
    closeBtn.innerHTML = 'X';

    // injecter le contenu + bouton
    popup.innerHTML = contenu;
    popup.appendChild(closeBtn);

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // fermer la popup
    closeBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.remove();
    });

    // activer les contrôles vidéo pour cette popup
    initPopupVideoControls();
  });
});

// --- CONTROLES VIDEO PLAY / PAUSE ---

function initPopupVideoControls() {
  // on prend le DERNIER overlay ajouté (celui qu'on vient d'ouvrir)
  const overlays = document.querySelectorAll('.popup-overlay');
  const popup = overlays[overlays.length - 1];
  if (!popup) return;

  const video = popup.querySelector('video');
  const btn = popup.querySelector('.video-btn');
  if (!video || !btn) return;

  // lancer la vidéo (autoplay) quand la popup s’ouvre
  video.play().catch(() => {
    // certains navigateurs peuvent bloquer l'autoplay si pas muted
  });

  // on démarre avec le bouton "pause"
  btn.textContent = '⏸';

  // clic sur le bouton : toggle play / pause
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (video.paused) {
      video.play();
      btn.textContent = '⏸';
    } else {
      video.pause();
      btn.textContent = '⏵';
    }
  });
}

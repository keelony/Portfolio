// --- OUVERTURE DES POPUPS PROJETS + NAVIGATION ---

const projets = document.querySelectorAll('.projet');
const projetsContents = document.querySelectorAll('#contenus-projets > section');

function openProjectByIndex(index) {

  const contenu = projetsContents[index].innerHTML;

  // suppression ancienne popup si existe
  const oldOverlay = document.querySelector('.popup-overlay');
  if (oldOverlay) oldOverlay.remove();

  // overlay
  const overlay = document.createElement('div');
  overlay.classList.add('popup-overlay');

  // popup
  const popup = document.createElement('div');
  popup.classList.add('popup');

  popup.innerHTML = contenu;

  const navTop = createNavigationBar(index);
  const navBottom = createNavigationBar(index);

  popup.prepend(navTop);   // en haut
  popup.appendChild(navBottom); // en bas
  // bouton fermeture
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('popup-close');
  closeBtn.innerHTML = 'X';

  popup.appendChild(closeBtn);

  // --- BOUTONS NAVIGATION ---
  function createNavigationBar(index) {
    const nav = document.createElement('div');
    nav.className = 'popup-navigation';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Projet précédent';
    prevBtn.disabled = index === 0;

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Projet suivant →';
    nextBtn.disabled = index === projetsContents.length - 1;

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProjectByIndex(index - 1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProjectByIndex(index + 1);
    });

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);

    return nav;
  }

  // -------------------------

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // fermer popup
  closeBtn.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });

  // vidéos
  initPopupVideoControls();
}


// clic sur cartes projets
projets.forEach((projet, index) => {
  projet.addEventListener('click', () => {
    openProjectByIndex(index);
  });
});




///Detection visible de la barre de nav (chaque texte de la barre est souligné selon sa section respective/////

const sections = document.querySelectorAll("section, footer");
const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});





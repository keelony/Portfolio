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
  // Gestion du bouton Play/Pause
  const video = popup.querySelector('#videoTicket');
  const videoBtn = popup.querySelector('#videoBtn');

  if (video && videoBtn) {
    // Par défaut, la vidéo est en autoplay, donc le bouton est en mode "pause"
    videoBtn.classList.remove('paused');

    videoBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        videoBtn.classList.remove('paused'); // Montrera l'icône pause
      } else {
        video.pause();
        videoBtn.classList.add('paused');    // Montrera l'icône play
      }
    });
  }





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










////////////Animation du texte "portfolio" dand l'écran d'accueil//////////////////////////////////////////////////////

// Découpe le texte en lettres
const textWrapper = document.querySelector('.anime-text');
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime.timeline({ loop: false })
  // PHASE 1 : les lettres sautent + rotation
  .add({
    targets: '.anime-text .letter',
    translateY: [
      { value: -120, duration: 600, easing: 'easeOutQuad' }
    ],
    rotate: {
      value: '1turn',
      duration: 600,
      easing: 'easeOutQuad'
    },
    opacity: [0, 1],
    delay: (el, i) => i * 80
  })

  // PHASE 2 : les lettres redescendent avec rebond
  .add({
    targets: '.anime-text .letter',
    translateY: [
      { value: 0, duration: 800 }
    ],
    easing: 'easeOutBounce',
    delay: (el, i) => i * 80
  });










////////////////////MENU BURGER AVEC ANIME.JS//////////////////

//////////////////// MENU BURGER //////////////////
const hamburger = document.getElementById('hamburger');
const menuList = document.getElementById('menu-list');
const menuItems = document.querySelectorAll('#menu-list li');

hamburger.addEventListener('click', () => {
    const isOpen = menuList.classList.contains('active');
    
    hamburger.classList.toggle('active');
    menuList.classList.toggle('active');

    // Petit effet d'apparition des liens un par un
    if (!isOpen) {
        anime({
            targets: menuItems,
            translateX: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'easeOutExpo',
            duration: 600
        });
    }
});

// Ferme le menu quand on clique sur un lien
document.querySelectorAll('#menu-list a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menuList.classList.remove('active');
    });
});







// --- FILTRES PROJETS ---
const filtresBtns = document.querySelectorAll('.filtre-btn');

filtresBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Mettre à jour le bouton actif
    filtresBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtre = btn.getAttribute('data-filtre');

    projets.forEach(projet => {
      if (filtre === 'tous') {
        projet.classList.remove('cache');
      } else {
        // data-categorie peut contenir plusieurs valeurs séparées par un espace
        const categories = projet.getAttribute('data-categorie').split(' ');
        if (categories.includes(filtre)) {
          projet.classList.remove('cache');
        } else {
          projet.classList.add('cache');
        }
      }
    });
  });
});
const projets = document.querySelectorAll('.projet');

projets.forEach(projet => {
    projet.addEventListener('click', () => {

        const id = projet.getAttribute('data-projet');
        const contenu = document.querySelector(`#projet-${id}`).innerHTML;

        const overlay = document.createElement('div');
        overlay.classList.add('popup-overlay');

        const popup = document.createElement('div');
        popup.classList.add('popup');

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('popup-close');
        closeBtn.innerHTML = 'X';

        popup.innerHTML = contenu;
        popup.appendChild(closeBtn);

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        closeBtn.addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', e => {
            if (e.target === overlay) overlay.remove();
        });
    });
});

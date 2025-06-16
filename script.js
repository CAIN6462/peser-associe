// Sélection des éléments du DOM
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');
const header = document.querySelector('header');
const menuItems = document.querySelectorAll('nav ul li a');

// Fonction pour gérer l'ouverture/fermeture du menu
function toggleMenu() {
    // Toggle de la classe active sur le menu
    nav.classList.toggle('active');
    
    // Mise à jour de l'attribut aria-expanded pour l'accessibilité
    const isExpanded = nav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
}

// Gestionnaire d'événement pour le bouton menu
menuToggle.addEventListener('click', toggleMenu);

// Fermer le menu quand on clique sur un lien
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Fermer le menu si on clique en dehors
document.addEventListener('click', (event) => {
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnMenuToggle && nav.classList.contains('active')) {
        toggleMenu();
    }
});

// Gestion du scroll pour le header
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajoute une classe 'scrolled' au header quand on scroll vers le bas
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Ajout d'une classe 'loaded' au body pour les animations initiales
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
}); 
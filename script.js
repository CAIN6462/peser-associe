// Sélection des éléments du DOM
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');
const header = document.querySelector('header');
const menuItems = document.querySelectorAll('nav ul li a');

// Fonction pour mettre à jour l'année dans le footer
function updateCopyrightYear() {
    const yearElement = document.querySelector('.legal p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} Peser & Associés. Tous droits réservés.`;
    }
}

// Fonction pour gérer l'ouverture/fermeture du menu
function toggleMenu() {
    // Toggle de la classe active sur le menu et le bouton
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Mise à jour de l'attribut aria-expanded pour l'accessibilité
    const isExpanded = nav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Empêcher le défilement du body quand le menu est ouvert
    document.body.style.overflow = isExpanded ? 'hidden' : '';
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
    updateCopyrightYear();
    
    // Enregistrement du temps pour l'anti-spam
    const forms = ['quote-form', 'contact-form'];
    const currentTime = Date.now();
    
    forms.forEach(formId => {
        SPAM_PROTECTION.formLoadTimes.set(formId, currentTime);
    });
});

// Gestion des touches du clavier pour l'accessibilité
menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

// Fermer le menu avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        toggleMenu();
    }
});

// Fonction pour afficher le message de succès
function showSuccessMessage(formId) {
    // Création du message de succès
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Merci pour votre message !';
    
    // Insertion du message avant le formulaire
    const form = document.getElementById(formId);
    form.parentNode.insertBefore(successMessage, form);
    
    // Animation du message
    setTimeout(() => {
        successMessage.classList.add('show');
    }, 100);
    
    // Suppression du message après 3 secondes
    setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 3000);
}

// Fonction de validation du fichier PDF
function validatePdfFile(file) {
    if (!file) return true; // Si pas de fichier, c'est valide car facultatif
    
    const maxSize = 5 * 1024 * 1024; // 5 Mo en octets
    const validTypes = ['application/pdf'];
    
    if (file.size > maxSize) {
        alert('Le fichier est trop volumineux. Taille maximum : 5 Mo');
        return false;
    }
    
    if (!validTypes.includes(file.type)) {
        alert('Seuls les fichiers PDF sont acceptés');
        return false;
    }
    
    return true;
}

// Configuration anti-spam
const SPAM_PROTECTION = {
    minSubmitTime: 3000, // Temps minimum en millisecondes (3 secondes)
    formLoadTimes: new Map() // Stockage des temps de chargement des formulaires
};

// Fonction pour vérifier si la soumission est légitime
function isLegitimateSubmission(formId) {
    // Vérification du honeypot
    const honeypot = document.querySelector(`#${formId} .honeypot`);
    if (honeypot && honeypot.value) {
        console.log('Tentative de spam détectée : honeypot rempli');
        return false;
    }

    // Vérification du temps minimum
    const loadTime = SPAM_PROTECTION.formLoadTimes.get(formId);
    const currentTime = Date.now();
    if (loadTime && (currentTime - loadTime) < SPAM_PROTECTION.minSubmitTime) {
        console.log('Tentative de spam détectée : soumission trop rapide');
        return false;
    }

    return true;
}

// Gestion du formulaire de devis
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Vérification anti-spam
        if (!isLegitimateSubmission('quote-form')) {
            return;
        }
        
        const fileInput = document.getElementById('quote-file');
        if (!validatePdfFile(fileInput.files[0])) {
            return;
        }
        
        // Simulation d'envoi (à remplacer par l'envoi réel)
        showSuccessMessage('quote-form');
        quoteForm.reset();
    });
}

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Vérification anti-spam
        if (!isLegitimateSubmission('contact-form')) {
            return;
        }
        
        // Simulation d'envoi (à remplacer par l'envoi réel)
        showSuccessMessage('contact-form');
        contactForm.reset();
    });
} 
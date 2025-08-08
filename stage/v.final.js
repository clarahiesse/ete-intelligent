function showSection(id) {
    // Masquer toutes les sections
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    
    // Afficher la section sélectionnée
    document.getElementById(id).classList.add('active');
    
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // Trouver le lien correspondant et l'activer
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('onclick').includes(id)) {
            item.classList.add('active');
        }
    });

    // Scroll vers le haut
    scrollToTop();

    // Animer les barres de compétences si on est sur cette section
    if (id === 'competences') {
        // Délai plus long pour laisser le temps à la section de s'afficher
        setTimeout(animateSkillBars, 800);
    }
}

// Animation des barres de compétences - Version corrigée
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width') + '%'; // <- Correction ici

        bar.style.width = '0%';
        bar.style.transition = 'none';

        bar.offsetHeight; // force reflow

        bar.style.transition = 'width 1.5s ease-out';

        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Déclencher l'animation quand on arrive sur la section compétences
document.addEventListener('DOMContentLoaded', function() {
    // S'assurer que les barres sont initialement à 0%
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    skillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.setAttribute('data-target', targetWidth);
        bar.style.width = '0%';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'competences') {
                setTimeout(animateSkillBars, 300);
            }
        });
    }, {
        threshold: 0.3
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

// Smooth scroll vers le haut quand on change de section
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
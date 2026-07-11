document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. Menu Mobile (Hambúrguer)
       ========================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Transforma o hambúrguer num 'X'
        menuToggle.classList.toggle('is-active'); 
    });

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('is-active');
        });
    });

    /* ==========================================================
       2. Header Glassmorphism ao rolar a página
       ========================================================== */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================
       3. Animações Espetaculares de Scroll (Intersection Observer)
       ========================================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15, // Ativa a animação quando 15% do elemento estiver na tela
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima apenas uma vez para não ficar repetitivo
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        scrollObserver.observe(element);
    });

    /* ==========================================================
       4. Botão "Voltar ao Topo"
       ========================================================== */
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
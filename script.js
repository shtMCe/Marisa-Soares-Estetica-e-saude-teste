document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. Menu Mobile (Hambúrguer)
       ========================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');

    function closeMenu() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    }

    function toggleMenu() {
        const isOpen = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar num link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fecha o menu com a tecla Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    /* ==========================================================
       2. Efeito de vidro (glassmorphism) no header ao rolar
       ========================================================== */
    function updateHeaderState() {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    updateHeaderState();

    /* ==========================================================
       3. Animações de Scroll com efeito cascata (stagger)
       ========================================================== */
    // Para cada grid marcado como "stagger-grid", aplica um atraso
    // crescente aos filhos para que surjam em cascata.
    document.querySelectorAll('.stagger-grid').forEach(grid => {
        const children = grid.querySelectorAll('.fade-in');
        children.forEach((child, index) => {
            child.style.transitionDelay = `${Math.min(index * 0.12, 0.6)}s`;
        });
    });

    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(element => appearOnScroll.observe(element));

    /* ==========================================================
       4. Botão "Voltar ao Topo"
       ========================================================== */
    const backToTopButton = document.getElementById('backToTop');

    function updateBackToTop() {
        if (window.scrollY > 400) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});

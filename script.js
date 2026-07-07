document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. Menu Mobile (Hambúrguer)
       ========================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animação do ícone hambúrguer (transformando em X - opcional visualmente)
        menuToggle.classList.toggle('is-active'); 
    });

    // Fechar menu ao clicar num link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    /* ==========================================================
       2. Efeito de Sombra no Header ao rolar a página
       ========================================================== */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================
       3. Animações de Scroll (Intersection Observer API)
       ========================================================== */
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15, // Aciona quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para a animação ocorrer apenas uma vez
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    /* ==========================================================
       4. Botão "Voltar ao Topo"
       ========================================================== */
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
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
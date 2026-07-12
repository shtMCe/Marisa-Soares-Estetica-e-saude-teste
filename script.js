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


 /* ==========================================================
    5. Formulário de Avaliações com Firebase Firestore
    ========================================================== */

// Importações necessárias
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

// Sua configuração (já está correta)
const firebaseConfig = {
  apiKey: "AIzaSyAdtCsbQBPuWl18dah-7Jyhaffu5EWKUL0",
  authDomain: "site-marisa-soares.firebaseapp.com",
  projectId: "site-marisa-soares",
  storageBucket: "site-marisa-soares.firebasestorage.app",
  messagingSenderId: "72895220809",
  appId: "1:72895220809:web:26d97afd2cf37aa7c48398",
  measurementId: "G-FEFVN44Y52"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Aqui estamos inicializando o Banco de Dados

// Referência à coleção de comentários
const comentariosRef = collection(db, "avaliacoes");

// --- FUNÇÕES DE ENVIO E LEITURA ---

// 1. Função para carregar comentários quando o site abrir
async function carregarComentarios() {
  const listaHtml = document.getElementById('lista-comentarios');
  if(!listaHtml) return;
  
  listaHtml.innerHTML = "Carregando...";
  
  const q = query(comentariosRef, orderBy("data", "desc"));
  const querySnapshot = await getDocs(q);
  
  listaHtml.innerHTML = ""; // Limpa o "Carregando..."
  
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    const div = document.createElement('div');
    div.className = 'comentario-item';
    div.innerHTML = `<strong>${d.nome}</strong> (${d.estrelas}⭐)<p>${d.texto}</p>`;
    listaHtml.appendChild(div);
  });
}

// 2. Evento para salvar o comentário
const form = document.getElementById('form-avaliacao');
if(form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    await addDoc(comentariosRef, {
      nome: document.getElementById('nome-cliente').value,
      estrelas: document.getElementById('qtd-estrelas').value,
      texto: document.getElementById('texto-comentario').value,
      data: new Date()
    });
    
    form.reset();
    carregarComentarios(); // Atualiza a lista na tela
  });
}

// Inicia ao carregar a página
carregarComentarios();
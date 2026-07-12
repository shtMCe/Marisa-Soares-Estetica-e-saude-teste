// 1. AS IMPORTAÇÕES PRECISAM FICAR NO TOPO DO ARQUIVO
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAdtCsbQBPuWl18dah-7Jyhaffu5EWKUL0",
  authDomain: "site-marisa-soares.firebaseapp.com",
  projectId: "site-marisa-soares",
  storageBucket: "site-marisa-soares.firebasestorage.app",
  messagingSenderId: "72895220809",
  appId: "1:72895220809:web:26d97afd2cf37aa7c48398",
  measurementId: "G-FEFVN44Y52"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const comentariosRef = collection(db, "avaliacoes");

// 3. FUNÇÃO DE CARREGAR AVALIAÇÕES DO BANCO
async function carregarComentarios() {
  const listaHtml = document.getElementById('lista-comentarios');
  if (!listaHtml) return;

  try {
    const q = query(comentariosRef, orderBy("data", "desc"));
    const querySnapshot = await getDocs(q);
    
    listaHtml.innerHTML = ""; // Limpa apenas quando for desenhar
    
    querySnapshot.forEach((doc) => {
      const d = doc.data();
      const div = document.createElement('div');
      div.className = 'comentario-item';
      div.innerHTML = `<strong>${d.nome}</strong> (${d.estrelas}⭐)<p>${d.texto}</p>`;
      listaHtml.appendChild(div);
    });
  } catch (erro) {
    console.error("Erro ao carregar:", erro);
  }
}

// 4. LÓGICA DA INTERFACE E FORMULÁRIO (Tudo que depende da página carregar)
document.addEventListener('DOMContentLoaded', () => {
  
  // Carrega comentários iniciais do Firebase
  carregarComentarios();

  // Enviar Formulário de Avaliação
  const form = document.getElementById('form-avaliacao');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        await addDoc(comentariosRef, {
          nome: document.getElementById('nome-cliente').value,
          estrelas: document.getElementById('qtd-estrelas').value,
          texto: document.getElementById('texto-comentario').value,
          data: new Date()
        });
        form.reset();
        carregarComentarios(); // Atualiza a lista após enviar
      } catch (err) {
        alert("Erro ao enviar avaliação.");
      }
    });
  }

  // --- FAZER A PÁGINA APARECER (fade-in) ---
  const fadeElements = document.querySelectorAll('.fade-in');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  fadeElements.forEach(el => observer.observe(el));

  // --- MENU MOBILE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('is-active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('is-active');
      });
    });
  }

  // --- HEADER SCROLL E BOTÃO VOLTAR AO TOPO ---
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    
    if (backToTop) {
      if (window.scrollY > 300) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
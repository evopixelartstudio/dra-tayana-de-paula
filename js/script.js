/**
 * ============================================================================
 * DRA. TAYANA DE PAULA — CIRURGIA DA MÃO E MICROCIRURGIA
 * Script Vanilla JS (ES6+) — Redesign Editorial
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 01. COMPORTAMENTO DO HEADER NO SCROLL
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const scrollThreshold = 35;

  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --------------------------------------------------------------------------
  // 02. MENU MOBILE DRAWER COM ACESSIBILIDADE TOTAL
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    if (!mobileDrawer || !menuToggle) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileDrawer || !menuToggle) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      isOpen ? closeDrawer() : openDrawer();
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
      if (menuToggle) menuToggle.focus();
    }
  });

  // --------------------------------------------------------------------------
  // 03. ACCORDION EDITORIAL LIMPO (FAQ: APENAS UMA PERGUNTA ABERTA POR VEZ)
  // --------------------------------------------------------------------------
  const faqTriggers = document.querySelectorAll('.faq-pill-trigger, .faq-clean-trigger');

  faqTriggers.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answerId = button.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      // Fecha todos os outros itens
      faqTriggers.forEach(otherBtn => {
        if (otherBtn !== button) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherAnsId = otherBtn.getAttribute('aria-controls');
          const otherAns = document.getElementById(otherAnsId);
          if (otherAns) {
            otherAns.hidden = true;
          }
        }
      });

      // Alterna o item clicado
      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        if (answer) answer.hidden = true;
      } else {
        button.setAttribute('aria-expanded', 'true');
        if (answer) answer.hidden = false;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 04. REVEAL SUAVE COM INTERSECTION OBSERVER
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));
  } else {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 05. NAVEGAÇÃO SUAVE COM COMPENSAÇÃO DE HEADER
  // --------------------------------------------------------------------------
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 06. NAVEGAÇÃO ATIVA CONFORME O SCROLL
  // --------------------------------------------------------------------------
  const trackedSections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveSection = () => {
    const scrollPos = window.pageYOffset;

    trackedSections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollPos > sectionTop && scrollPos <= sectionTop + sectionHeight) {
        navLinks.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveSection, { passive: true });

  // --------------------------------------------------------------------------
  // 07. EFEITO DE ENTRADA DE DESENHO NOS ÍCONES DA CONSULTA (DRAWING ANIMATION)
  // --------------------------------------------------------------------------
  const consultationCards = document.querySelectorAll('.consultation-card');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const drawObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -30px 0px'
    });

    consultationCards.forEach(card => drawObserver.observe(card));
  } else {
    consultationCards.forEach(card => card.classList.add('in-view'));
  }

  // --------------------------------------------------------------------------
  // 08. TILT-STACK-SCROLL GSAP (SEÇÃO 05 - PROCEDIMENTOS E CIRURGIAS)
  // --------------------------------------------------------------------------
  const initTiltStackScroll = () => {
    const track = document.querySelector('.tss-track');
    const cards = Array.from(document.querySelectorAll('.tss-card'));
    const currEl = document.querySelector('.tss-count-curr');
    const railBar = document.querySelector('.tss-rail-bar');

    if (!track || !cards.length) return;

    const n = cards.length;
    // Distância confortável e ágil de scroll por card (65vh por transição ao invés de 100vh)
    track.style.height = `calc(100vh + ${(n - 1) * 65}vh)`;

    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const pad2 = (num) => (num < 10 ? '0' : '') + num;

    const pose = (p, i, reduced) => {
      const enter = i === 0 ? 1 : clamp(p - (i - 1), 0, 1);
      const depth = clamp(p - i, 0, 3);
      if (reduced) {
        return { y: 0, scale: 1, rx: 0, rz: 0, shade: Math.min(depth, 1) * 0.5, opacity: enter >= 1 ? 1 : enter };
      }
      const e = easeOut(enter);
      return {
        y: (1 - e) * 130 - depth * 3.2,
        scale: (1 - depth * 0.07) * (0.9 + 0.1 * e),
        rx: (1 - e) * 22 - depth * 9,
        rz: (1 - e) * (i % 2 ? 5 : -5) + 0,
        shade: Math.min(depth, 2) * 0.34,
        opacity: depth > 2.6 ? clamp((3 - depth) / 0.4, 0, 1) : 1,
      };
    };

    const toTransform = (q) =>
      `translate3d(0,${q.y.toFixed(3)}%,0) perspective(1400px) rotateX(${q.rx.toFixed(3)}deg) rotateZ(${q.rz.toFixed(3)}deg) scale(${q.scale.toFixed(4)})`;

    const shades = cards.map((c) => c.querySelector('.tss-shade'));

    cards.forEach((c, i) => {
      c.style.zIndex = String(i + 1);
    });

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paint = (p) => {
      for (let i = 0; i < n; i++) {
        const q = pose(p, i, isReduced);
        cards[i].style.transform = toTransform(q);
        cards[i].style.opacity = String(q.opacity);
        if (shades[i]) {
          shades[i].style.opacity = String(q.shade);
        }
      }
      if (currEl) {
        const activeIdx = clamp(Math.round(p), 0, n - 1);
        currEl.textContent = pad2(activeIdx + 1);
      }
      if (railBar && n > 1) {
        railBar.style.transform = `scaleX(${p / (n - 1)})`;
      }
    };

    // Inicializa a posição do primeiro frame
    paint(0);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Suavização contínua a 60fps sem trancos no scroll
        snap: {
          snapTo: (value) => Math.round(value * (n - 1)) / (n - 1),
          duration: { min: 0.2, max: 0.38 },
          delay: 0.2, // Só atraca suavemente 200ms após o usuário parar de rolar
          ease: 'power2.out',
        },
        onUpdate: (self) => paint(self.progress * (n - 1)),
      });
    }
  };

  initTiltStackScroll();
});

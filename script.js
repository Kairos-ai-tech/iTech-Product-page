document.addEventListener('DOMContentLoaded', function () {
  // ===== Sticky navbar =====
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  // ===== Mobile nav toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== Scroll-triggered fade-in =====
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // ===== Animated number counters =====
  const counterElements = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterElements.forEach(function (el) {
    counterObserver.observe(el);
  });

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1600;
    const start = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(easeOutExpo(progress) * target);
      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(tick);
  }

  // ===== Parallax on hero image =====
  const heroImg = document.querySelector('.hero-img');

  if (heroImg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = 'scale(1.05) translateY(' + (scrolled * 0.15) + 'px)';
      }
    }, { passive: true });
  }

  // ===== Initialize language =====
  initLanguage();

  // ===== Contact form =====
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent('iTech 營造執行平台 — 聯絡表單 from ' + name);
    const body = encodeURIComponent(
      '姓名 Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      '身份 Role: ' + role + '\n\n' +
      '訊息 Message:\n' + message
    );

    window.location.href = 'mailto:contact@itech.com?subject=' + subject + '&body=' + body;
  });
});

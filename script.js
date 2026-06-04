// ===========================================================
// iTech — AI + AR Construction Execution Platform
// Engineering Blueprint interactions: scroll rail + rebar spine
// draw, pointer-reactive glow, reveal-on-scroll, counters, nav.
// ===========================================================
document.addEventListener('DOMContentLoaded', function () {
  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  // ===== Mobile nav toggle =====
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  function setNav(open) {
    if (!navToggle || !navMenu) return;
    navToggle.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      setNav(!navMenu.classList.contains('active'));
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setNav(false); });
    });
  }

  // ===== Smooth scroll for in-page anchors (offset for fixed navbar) =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  // ===== Reveal on scroll =====
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ===== Animated number counters =====
  var counterElements = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (prefersReduced) { el.textContent = target.toLocaleString(); return; }
    var duration = 1600;
    var start = performance.now();

    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var value = Math.floor(easeOutExpo(progress) * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) { requestAnimationFrame(tick); }
      else { el.textContent = target.toLocaleString(); }
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counterElements.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counterElements.forEach(animateCounter);
  }

  // ===== Active nav highlight =====
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  // ===== Scroll engine: progress rail + spine draw + grid parallax + navbar =====
  var navbar = document.getElementById('navbar');
  var rail = document.querySelector('.scroll-rail');
  var ticking = false;

  function onScroll() {
    var scrollTop = window.pageYOffset;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var p = docH > 0 ? Math.min(scrollTop / docH, 1) : 0;
    if (rail) rail.style.setProperty('--p', p);
    root.style.setProperty('--spine-fill', (p * 100).toFixed(2) + '%');
    root.style.setProperty('--grid-shift', (-scrollTop * 0.04).toFixed(1) + 'px');
    if (navbar) navbar.classList.toggle('scrolled', scrollTop > 60);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  // ===== Pointer-reactive blueprint glow (desktop only) =====
  if (!prefersReduced && window.matchMedia('(pointer:fine)').matches) {
    var glowTimer;
    window.addEventListener('mousemove', function (e) {
      if (glowTimer) return;
      glowTimer = setTimeout(function () { glowTimer = null; }, 12);
      root.style.setProperty('--mx', (e.clientX / window.innerWidth * 100).toFixed(1) + '%');
      root.style.setProperty('--my', (e.clientY / window.innerHeight * 100).toFixed(1) + '%');
    }, { passive: true });
  }

  // ===== Initialize language (from i18n.js) =====
  if (typeof initLanguage === 'function') { initLanguage(); }

  // ===== Contact form (mailto, no backend) =====
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var role = document.getElementById('role').value;
      var message = document.getElementById('message').value;

      var subject = encodeURIComponent('iTech 營造執行平台 — 聯絡表單 from ' + name);
      var body = encodeURIComponent(
        '姓名 Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        '身份 Role: ' + role + '\n\n' +
        '訊息 Message:\n' + message
      );
      window.location.href = 'mailto:kairos.ai.tech@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
});

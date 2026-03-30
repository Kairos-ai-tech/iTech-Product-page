document.addEventListener('DOMContentLoaded', function () {
  // ===== Sticky navbar background on scroll =====
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar);

  // ===== Mobile nav toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== Scroll-triggered fade-in animations =====
  constfadeElements = document.querySelectorAll('.fade-in');

  constobserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // ===== Contact form — mailto fallback =====
  constcontactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    constname = document.getElementById('name').value;
    constemail = document.getElementById('email').value;
    constrole = document.getElementById('role').value;
    constmessage = document.getElementById('message').value;

    constsubject = encodeURIComponent('AI學徒 iTech — 聯絡表單 from ' + name);
    constbody = encodeURIComponent(
      '姓名 Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      '身份 Role: ' + role + '\n\n' +
      '訊息 Message:\n' + message
    );

    window.location.href = 'mailto:contact@itech.com?subject=' + subject + '&body=' + body;
  });
});

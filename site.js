/* ============================================================
   Qahwa Bar — shared site interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- nav scroll state ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  function closeMenu() { if (menu) { menu.classList.remove('open'); document.body.style.overflow = ''; } }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { menu.classList.add('open'); document.body.style.overflow = 'hidden'; });
    menu.querySelectorAll('[data-close-menu], .mm-links a').forEach(function (el) {
      el.addEventListener('click', closeMenu);
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      // close siblings in same list
      var parent = item.parentElement;
      parent.querySelectorAll('.faq-item.open').forEach(function (o) {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; }
      });
      if (open) { item.classList.remove('open'); a.style.maxHeight = null; }
      else { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ============================================================
     Brand Lab — auto-cycle logos on the cart
     ============================================================ */
  var cartLogo = document.getElementById('cartLogo');
  var cartYourLogo = document.getElementById('cartYourLogo');
  if (cartLogo) {
    var logos = [
      'assets/logos/Cisco_logo_blue_2016.svg.png',
      'assets/logos/455-4553684_d15-desjardins-logo-caisse-desjardins-hd-png-download.png',
      'assets/logos/H&M-Logo.wine.png',
      'assets/logos/KraftHeinz.svg.png',
      null
    ];
    var logoIdx = 0;
    function showSlide(idx) {
      var src = logos[idx];
      if (src === null) {
        cartLogo.classList.remove('visible');
        if (cartYourLogo) cartYourLogo.classList.add('visible');
      } else {
        if (cartYourLogo) cartYourLogo.classList.remove('visible');
        cartLogo.src = src;
        cartLogo.classList.add('visible');
      }
    }
    showSlide(0);
    setInterval(function () {
      cartLogo.classList.remove('visible');
      if (cartYourLogo) cartYourLogo.classList.remove('visible');
      setTimeout(function () {
        logoIdx = (logoIdx + 1) % logos.length;
        showSlide(logoIdx);
      }, 500);
    }, 3000);
  }

  /* ---------- flashquotes modal ---------- */
  var fqModal = document.getElementById('fqModal');
  if (fqModal) {
    var fqScriptLoaded = false;
    function loadFQScript() {
      if (fqScriptLoaded) return;
      fqScriptLoaded = true;
      var s = document.createElement('script');
      s.setAttribute('form-id', 'cmmkwnfau0001jm04ndaodmbi');
      s.src = 'https://app.flashquotes.com/embed.js';
      s.defer = true;
      fqModal.querySelector('.fq-panel').appendChild(s);
    }
    function openFQ() { loadFQScript(); fqModal.setAttribute('aria-hidden', 'false'); fqModal.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeFQ() { fqModal.setAttribute('aria-hidden', 'true'); fqModal.classList.remove('open'); document.body.style.overflow = ''; }
    document.querySelectorAll('[data-quote]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); openFQ(); });
    });
    fqModal.querySelector('.fq-close').addEventListener('click', closeFQ);
    fqModal.querySelector('.fq-scrim').addEventListener('click', closeFQ);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && fqModal.classList.contains('open')) closeFQ(); });
  }

})();

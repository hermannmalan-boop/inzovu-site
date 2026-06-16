/* INZOVU AFRICA — interactions */
(function () {
  "use strict";

  /* Header shadow on scroll */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (menu.classList.contains("open") && !a.parentElement.classList.contains("dropdown")) {
          menu.classList.remove("open");
          toggle.classList.remove("open");
          document.body.style.overflow = "";
        }
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Animated counters — valeur finale garantie même si l'animation saccade */
  function animate(el) {
    if (el.dataset.done) return;
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1600, start = null, done = false;
    function finish() { if (done) return; done = true; el.dataset.done = "1"; el.textContent = target + suffix; }
    function step(ts) {
      if (done) return;
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step); else finish();
    }
    requestAnimationFrame(step);
    // Filet de sécurité : impose la valeur finale même si rAF est gelé/throttlé
    setTimeout(finish, dur + 600);
  }
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.25 });
    counters.forEach(function (el) { co.observe(el); });
    // Si déjà visibles au chargement (ou observer capricieux), garantir l'animation
    setTimeout(function () {
      counters.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 0) && r.bottom > 0) animate(el);
      });
    }, 1200);
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || ""); });
  }

  /* Current year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* Contact form — envoi via FormSubmit (AJAX) */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-status");
      var btn = form.querySelector('button[type="submit"]');
      var setNote = function (msg, color) {
        if (note) { note.textContent = msg; note.style.color = color; }
      };
      setNote("Envoi en cours…", "var(--grey-700)");
      if (btn) { btn.disabled = true; btn.style.opacity = "0.7"; }

      fetch("https://formsubmit.co/ajax/hermann.malan@inzovuafrica.com", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (res.ok) {
            setNote("Merci ! Votre message a bien été envoyé. Notre équipe vous répondra sous 24h ouvrées.", "var(--accent-dark)");
            form.reset();
          } else {
            setNote("Une erreur est survenue. Réessayez ou écrivez-nous à info@inzovu.africa.", "#b00020");
          }
        })
        .catch(function () {
          setNote("Connexion impossible. Réessayez ou écrivez-nous à info@inzovu.africa.", "#b00020");
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.style.opacity = "1"; }
        });
    });
  }
})();

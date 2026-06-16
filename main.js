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
            setNote("Une erreur est survenue. Réessayez ou écrivez-nous à info@inzovuafrica.com.", "#b00020");
          }
        })
        .catch(function () {
          setNote("Connexion impossible. Réessayez ou écrivez-nous à info@inzovuafrica.com.", "#b00020");
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.style.opacity = "1"; }
        });
    });
  }

  /* ===== Assistant IA INZOVU (widget de chat) ===== */
  (function () {
    var history = [];
    var open = false;
    var busy = false;

    var launcher = document.createElement("button");
    launcher.className = "ai-launcher";
    launcher.setAttribute("aria-label", "Ouvrir l'assistant INZOVU");
    launcher.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>';

    var panel = document.createElement("div");
    panel.className = "ai-panel";
    panel.innerHTML =
      '<div class="ai-head">' +
        '<div class="ai-head-id"><span class="ai-dot"></span><div><b>Assistant INZOVU</b><span>Réponses sur nos produits</span></div></div>' +
        '<button class="ai-close" aria-label="Fermer">&times;</button>' +
      '</div>' +
      '<div class="ai-msgs" id="ai-msgs"></div>' +
      '<form class="ai-input"><textarea rows="1" placeholder="Posez votre question…" aria-label="Votre message"></textarea>' +
      '<button type="submit" aria-label="Envoyer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button></form>';

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    var msgs = panel.querySelector(".ai-msgs");
    var ta = panel.querySelector("textarea");
    var form = panel.querySelector(".ai-input");

    function addMsg(role, text) {
      var d = document.createElement("div");
      d.className = "ai-msg ai-" + role;
      d.textContent = text;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    function toggle(state) {
      open = (typeof state === "boolean") ? state : !open;
      panel.classList.toggle("open", open);
      launcher.classList.toggle("hidden", open);
      if (open && !msgs.childElementCount) {
        addMsg("assistant", "Bonjour 👋 Je suis l'assistant INZOVU. Posez-moi vos questions sur SIGEFIP, IMIRIMO, IMARIPRO ou nos services.");
      }
      if (open) setTimeout(function () { ta.focus(); }, 100);
    }

    launcher.addEventListener("click", function () { toggle(true); });
    panel.querySelector(".ai-close").addEventListener("click", function () { toggle(false); });

    ta.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = ta.value.trim();
      if (!text || busy) return;
      busy = true;
      ta.value = "";
      addMsg("user", text);
      history.push({ role: "user", content: text });
      var typing = addMsg("assistant", "…");
      typing.classList.add("ai-typing");

      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var reply = (data && data.reply) || "Désolé, une erreur est survenue.";
          typing.classList.remove("ai-typing");
          typing.textContent = reply;
          history.push({ role: "assistant", content: reply });
          msgs.scrollTop = msgs.scrollHeight;
        })
        .catch(function () {
          typing.classList.remove("ai-typing");
          typing.textContent = "Connexion impossible. Réessayez, ou écrivez-nous à info@inzovuafrica.com.";
        })
        .then(function () { busy = false; });
    });
  })();
})();

/* INZOVU AFRICA — bascule FR / EN (i18n léger, sans dépendance) */
(function () {
  "use strict";

  // Dictionnaire FR -> EN (textes visibles, placeholders, options)
  var M = {
    // Navigation
    "Accueil": "Home",
    "À propos": "About",
    "Mission & Vision": "Mission & Vision",
    "Notre raison d'être": "Our purpose",
    "Pourquoi nous choisir": "Why choose us",
    "Nos engagements": "Our commitments",
    "Notre équipe": "Our team",
    "Des experts africains": "African experts",
    "Nos produits": "Our products",
    "Gestion financière des projets": "Project financial management",
    "Paie & ressources humaines": "Payroll & HR",
    "Gestion financière & comptable": "Financial & accounting management",
    "Nos services": "Our services",
    "Contact": "Contact",
    "Demander une démo": "Request a demo",

    // Hero
    "IT Solution · Business Development": "IT Solution · Business Development",
    "Votre réussite est": "Your success is",
    "codée": "coded",
    "dans notre ADN.": "into our DNA.",
    "Inzovu conçoit des solutions logicielles sur mesure — applications web & mobile, systèmes de gestion, plateformes cloud — et modernise vos processus métiers grâce à l'IA, l'IoT et l'analyse de données.": "Inzovu designs custom software solutions — web & mobile apps, management systems, cloud platforms — and modernizes your business processes with AI, IoT and data analytics.",
    "Rencontrez-nous": "Meet us",
    "Expertise locale africaine": "Local African expertise",
    "Solutions sur mesure": "Tailored solutions",
    "Conformité & sécurité": "Compliance & security",

    // Partenaires
    "Ils nous font confiance": "They trust us",

    // Services (accueil)
    "L'excellence logicielle au service de votre transformation": "Software excellence to power your transformation",
    "Innovateurs de solutions digitales, nous conjuguons développement de pointe et stratégie métier pour des organisations performantes et durables.": "As digital solution innovators, we blend cutting-edge development with business strategy for high-performing, sustainable organizations.",
    "Développement sur mesure": "Custom development",
    "Applications web et mobiles conçues exactement selon vos besoins, robustes, évolutives et maintenables dans le temps.": "Web and mobile applications built exactly to your needs — robust, scalable and maintainable over time.",
    "En savoir plus": "Learn more",
    "Intégration de systèmes": "Systems integration",
    "Connexion fluide de vos outils : ERP, CRM, APIs et Mobile Money (MTN, Orange Money, Wave) pour un système d'information unifié.": "Seamless connection of your tools: ERP, CRM, APIs and Mobile Money (MTN, Orange Money, Wave) for a unified information system.",
    "Conseil & transformation": "Consulting & transformation",
    "Audit, feuille de route et stratégie digitale pour franchir une étape décisive dans la modernisation de votre entreprise.": "Audit, roadmap and digital strategy to take a decisive step in modernizing your business.",
    "Expérience utilisateur (UX)": "User experience (UX)",
    "Design digital centré sur l'utilisateur : interfaces claires, esthétiques et efficaces qui maximisent l'adoption.": "User-centered digital design: clear, elegant and effective interfaces that maximize adoption.",
    "Sécurité & conformité": "Security & compliance",
    "Protection des données, sécurité applicative et conformité aux normes locales et internationales (RGPD).": "Data protection, application security and compliance with local and international standards (GDPR).",
    "Fournitures informatiques": "IT supplies",
    "Votre partenaire B2B : ordinateurs, serveurs, équipements réseaux et accessoires des marques leaders, avec un SAV réactif.": "Your B2B partner: computers, servers, network equipment and accessories from leading brands, with responsive after-sales support.",

    // Split "Gagnez en performance"
    "Transformation digitale": "Digital transformation",
    "Gagnez en performance et en productivité": "Gain in performance and productivity",
    "Re-saisies, données obsolètes, processus contraints… La traçabilité de vos opérations devient un enjeu majeur vis-à-vis de l'État, de vos clients et de vos prestataires.": "Re-keying, outdated data, constrained processes… The traceability of your operations becomes a major stake with the State, your clients and your providers.",
    "Vous avez besoin de faire évoluer vos logiciels d'entreprise, mais ni le temps ni l'expérience pour mener ces projets. C'est là qu'Inzovu intervient.": "You need to evolve your enterprise software, but have neither the time nor the experience to run these projects. That is where Inzovu steps in.",
    "Élimination des doubles saisies": "Elimination of double data entry",
    "et des erreurs de données.": "and data errors.",
    "Traçabilité complète": "Full traceability",
    "de toutes vos opérations.": "of all your operations.",
    "Accompagnement de bout en bout": "End-to-end support",
    ", du cadrage à la maintenance.": ", from scoping to maintenance.",
    "Plus à propos de nous": "More about us",

    // Produits (accueil)
    "Des solutions métiers prêtes à déployer": "Business solutions ready to deploy",
    "Trois systèmes intégrés conçus pour les organisations africaines, des projets de développement aux entreprises privées.": "Three integrated systems designed for African organizations, from development projects to private companies.",

    // Méthode
    "Solutions personnalisées": "Custom solutions",
    "Notre méthode pour des applications sur mesure": "Our method for custom applications",
    "Une démarche structurée qui correspond exactement à vos besoins, de l'idée à la mise en production.": "A structured approach that fits your needs exactly, from idea to production.",
    "Analyse des besoins & conception": "Needs analysis & design",
    "Rencontres avec les parties prenantes, analyse des processus existants, définition du cahier des charges et conception de l'architecture (wireframes, prototypes).": "Stakeholder meetings, analysis of existing processes, requirements definition and architecture design (wireframes, prototypes).",
    "Développement & implémentation": "Development & implementation",
    "Choix des technologies, développement des modules, intégration d'API tierces et mise en place des environnements, dans le respect des bonnes pratiques de code et de sécurité.": "Technology choices, module development, third-party API integration and environment setup, following code and security best practices.",
    "Tests & validation": "Testing & validation",
    "Tests unitaires, d'intégration, de performance et de sécurité, recette utilisateur, correction des bugs et optimisation.": "Unit, integration, performance and security testing, user acceptance, bug fixing and optimization.",
    "Déploiement & maintenance": "Deployment & maintenance",
    "Mise en production cloud, formation des utilisateurs, documentation, monitoring et évolutions continues (sécurité, compatibilité, nouvelles fonctionnalités).": "Cloud production release, user training, documentation, monitoring and continuous improvements (security, compatibility, new features).",

    // Stats
    "Statistiques": "Key figures",
    "Votre partenaire de confiance": "Your trusted partner",
    "Que vous soyez PME, startup ou grand groupe, nous accompagnons votre croissance technologique avec des produits fiables et une logistique maîtrisée.": "Whether you are an SME, startup or large group, we support your technological growth with reliable products and mastered logistics.",
    "Années d'expérience": "Years of experience",
    "Clients satisfaits": "Satisfied clients",
    "Projets réalisés": "Projects delivered",
    "Fournitures effectuées": "Supplies delivered",

    // Témoignages
    "Témoignages": "Testimonials",
    "Ce que disent nos clients": "What our clients say",
    "Directeur Général": "Managing Director",
    "Spécialiste en Gestion financière": "Financial Management Specialist",
    "Chef Comptable": "Chief Accountant",
    "Coordination": "Coordination",
    "Une équipe à l'écoute, réactive et qui maîtrise les réalités du terrain africain. L'accompagnement a fait toute la différence.": "An attentive, responsive team that understands the realities of the African field. The support made all the difference.",
    "La traçabilité de nos opérations s'est nettement améliorée. Un partenaire fiable que nous recommandons sans réserve.": "The traceability of our operations has clearly improved. A reliable partner we recommend without reservation.",

    // CTA
    "Travaillez avec nous": "Work with us",
    "Commençons à parler de votre projet": "Let's start talking about your project",
    "Un appel de 30 minutes suffit pour explorer ensemble ce que nous pouvons construire pour vous.": "A 30-minute call is all it takes to explore together what we can build for you.",
    "Contactez-nous": "Contact us",
    "Logiciels sur mesure": "Custom software",
    "Cloud & DevOps": "Cloud & DevOps",
    "Data & BI": "Data & BI",

    // Footer
    "Inzovu (« éléphant » en kinyarwanda) — symbole de force, de mémoire et de sagesse. Nous accélérons la transformation digitale des organisations africaines.": "Inzovu ('elephant' in Kinyarwanda) — a symbol of strength, memory and wisdom. We accelerate the digital transformation of African organizations.",
    "Entreprise": "Company",
    "Prestations": "Services",
    "Produits": "Products",
    "Tous droits réservés.": "All rights reserved.",
    "Digitaliser vos processus.": "Digitize your processes.",

    // Page Produits
    "Solutions métiers": "Business solutions",
    "Des systèmes intégrés pensés pour l'Afrique": "Integrated systems designed for Africa",
    "Trois plateformes éprouvées pour digitaliser la finance, la paie et la comptabilité de vos projets et organisations.": "Three proven platforms to digitize the finance, payroll and accounting of your projects and organizations.",
    "Produit 01": "Product 01",
    "Produit 02": "Product 02",
    "Produit 03": "Product 03",
    "Système Intégré de Gestion Financière des Projets de Développement": "Integrated Financial Management System for Development Projects",
    "SIGEFIP pilote l'ensemble du cycle financier des projets de développement : programmation budgétaire, engagements, décaissements, suivi des bailleurs et reporting. Une réponse aux exigences de traçabilité des ONG, agences publiques et programmes financés.": "SIGEFIP manages the entire financial cycle of development projects: budget planning, commitments, disbursements, donor tracking and reporting. An answer to the traceability requirements of NGOs, public agencies and funded programs.",
    "Budgétisation pluriannuelle et suivi des engagements": "Multi-year budgeting and commitment tracking",
    "Gestion des décaissements et des bailleurs de fonds": "Management of disbursements and donors",
    "Reporting financier conforme aux exigences des bailleurs": "Financial reporting compliant with donor requirements",
    "Missions & ateliers : calendrier, budget, équipe, per diem (transport & restauration), bénéficiaires, notes de frais, TDR et rapports": "Missions & workshops: schedule, budget, team, per diem (transport & catering), beneficiaries, expense reports, ToR and reports",
    "Système Intégré de Gestion de la Paie et des Ressources Humaines": "Integrated Payroll and Human Resources Management System",
    "IMIRIMO automatise la gestion du capital humain : paie, déclarations sociales, gestion des carrières, congés et administration du personnel. Une plateforme unique, fiable et conforme aux obligations légales locales.": "IMIRIMO automates human capital management: payroll, social declarations, career management, leave and personnel administration. A single, reliable platform compliant with local legal obligations.",
    "Calcul automatisé de la paie et bulletins de salaire": "Automated payroll calculation and payslips",
    "Déclarations sociales et fiscales conformes": "Compliant social and tax declarations",
    "Gestion des congés, carrières et dossiers du personnel": "Management of leave, careers and personnel files",
    "Système Intégré de Gestion Financière et Comptable des Entreprises et Organisations": "Integrated Financial and Accounting Management System for Companies and Organizations",
    "Tous vos modules réunis": "All your modules in one place",
    "Budget, ordres de paiement, marchés, bordereaux, DRF, paie, missions & ateliers… Un point d'entrée unique vers chaque processus métier, avec des indicateurs clés en temps réel.": "Budget, payment orders, procurement, transmittals, fund requests, payroll, missions & workshops… A single entry point to every business process, with key indicators in real time.",
    "Gestion des marchés & conventions": "Procurement & agreements management",
    "Marchés, bons de commande et conventions suivis du lancement à l'exécution, avec montants engagés et statuts visibles d'un coup d'œil.": "Procurement, purchase orders and agreements tracked from launch to execution, with committed amounts and statuses visible at a glance.",

    // Page Contact
    "Parlons de votre projet": "Let's talk about your project",
    "Un appel de 30 minutes suffit pour explorer ensemble ce que nous pouvons construire pour vous. Notre équipe vous répond sous 24h ouvrées.": "A 30-minute call is all it takes to explore together what we can build for you. Our team replies within 24 business hours.",
    "Coordonnées": "Contact details",
    "Écrivez-nous, appelez-nous ou passez nous voir. Nous serons ravis d'échanger.": "Write to us, call us or drop by. We'll be glad to talk.",
    "Adresse": "Address",
    "Téléphone": "Phone",
    "Email": "Email",
    "Horaires": "Hours",
    "Du lundi au vendredi · 8h – 20h": "Monday to Friday · 8am – 8pm",
    "Envoyez-nous un message": "Send us a message",
    "Tous les champs marqués d'un * sont requis.": "All fields marked with * are required.",
    "Nom complet *": "Full name *",
    "Organisation": "Organization",
    "Email *": "Email *",
    "Sujet *": "Subject *",
    "Votre message *": "Your message *",
    "Envoyer le message": "Send message",
    "Vos informations restent confidentielles et ne servent qu'à traiter votre demande.": "Your information stays confidential and is only used to process your request.",
    // Options du formulaire
    "Sélectionnez…": "Select…",
    "Demande de démo": "Demo request",
    "Produit SIGEFIP / IMIRIMO / IMARIPRO": "SIGEFIP / IMIRIMO / IMARIPRO product",
    "Autre": "Other",
    // Placeholders
    "Votre nom": "Your name",
    "Votre entreprise": "Your company",
    "vous@exemple.com": "you@example.com",
    "+225 ...": "+225 ...",
    "Décrivez votre besoin ou votre projet…": "Describe your need or project…",

    // Widgets injectés (WhatsApp / Assistant IA)
    "Écrivez-nous sur WhatsApp": "Message us on WhatsApp",
    "Envoyer sur WhatsApp": "Send via WhatsApp",
    "— ou —": "— or —",
    "Assistant INZOVU": "INZOVU Assistant",
    "Réponses sur nos produits": "Answers about our products",
    "Bonjour 👋 Je suis l'assistant INZOVU. Posez-moi vos questions sur SIGEFIP, IMIRIMO, IMARIPRO ou nos services.": "Hello 👋 I'm the INZOVU assistant. Ask me about SIGEFIP, IMIRIMO, IMARIPRO or our services.",
    "Posez votre question…": "Ask your question…"
  };

  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };
  var current = "fr";

  function ws(raw, side) { var m = raw.match(side === 0 ? /^\s*/ : /\s*$/); return m ? m[0] : ""; }

  function translateTextNodes(on) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var p = node.parentNode;
      if (!p || SKIP[p.nodeName]) return;
      var raw = node.nodeValue;
      var t = raw.replace(/\s+/g, " ").trim();
      if (!t) return;
      if (on) {
        if (node.__fr == null) node.__fr = raw;
        var en = M[t];
        if (en != null) node.nodeValue = ws(raw, 0) + en + ws(raw, 1);
      } else if (node.__fr != null) {
        node.nodeValue = node.__fr;
      }
    });
  }

  function translateAttrs(on) {
    // placeholders
    document.querySelectorAll("[placeholder]").forEach(function (el) {
      if (on) {
        if (el.dataset.frPh == null) el.dataset.frPh = el.getAttribute("placeholder");
        var en = M[(el.dataset.frPh || "").trim()];
        if (en != null) el.setAttribute("placeholder", en);
      } else if (el.dataset.frPh != null) {
        el.setAttribute("placeholder", el.dataset.frPh);
      }
    });
  }

  function apply(lang) {
    current = lang === "en" ? "en" : "fr";
    var on = current === "en";
    translateTextNodes(on);
    translateAttrs(on);
    document.documentElement.lang = current;
    try { localStorage.setItem("inzovu_lang", current); } catch (e) {}
    var btn = document.querySelector(".lang-toggle");
    if (btn) btn.textContent = on ? "FR" : "EN";
  }

  function buildToggle() {
    var cta = document.querySelector(".nav-cta");
    if (!cta || document.querySelector(".lang-toggle")) return;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "lang-toggle";
    b.setAttribute("aria-label", "Changer de langue / Switch language");
    b.textContent = current === "en" ? "FR" : "EN";
    b.style.cssText = "font:600 0.82rem/1 var(--font-display,Inter),sans-serif;letter-spacing:.06em;padding:9px 13px;border-radius:100px;border:1.5px solid var(--grey-300,#bfbfbf);background:transparent;color:var(--black,#0d0d0d);cursor:pointer;transition:.3s;";
    b.addEventListener("mouseenter", function () { b.style.borderColor = "var(--black,#0d0d0d)"; b.style.background = "var(--black,#0d0d0d)"; b.style.color = "#fff"; });
    b.addEventListener("mouseleave", function () { b.style.borderColor = "var(--grey-300,#bfbfbf)"; b.style.background = "transparent"; b.style.color = "var(--black,#0d0d0d)"; });
    b.addEventListener("click", function () { apply(current === "en" ? "fr" : "en"); });
    cta.insertBefore(b, cta.firstChild);
  }

  // Traduire les nœuds injectés dynamiquement (WhatsApp, assistant IA) quand EN actif
  var mo = new MutationObserver(function (muts) {
    if (current !== "en") return;
    var todo = false;
    muts.forEach(function (m) { if (m.addedNodes && m.addedNodes.length) todo = true; });
    if (todo) { translateTextNodes(true); translateAttrs(true); }
  });

  // Exposé pour le contrôle de couverture (repérer les textes non traduits)
  window.__i18nMissing = function () {
    var out = {}, walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = walker.nextNode())) {
      var p = n.parentNode; if (!p || SKIP[p.nodeName]) continue;
      var t = n.nodeValue.replace(/\s+/g, " ").trim();
      if (t.length >= 2 && /[A-Za-zÀ-ÿ]/.test(t) && M[t] == null) out[t] = 1;
    }
    document.querySelectorAll("[placeholder]").forEach(function (el) { var v = (el.getAttribute("placeholder") || "").trim(); if (v && M[v] == null) out[v] = 1; });
    return Object.keys(out);
  };

  function init() {
    buildToggle();
    var saved = "fr";
    try { saved = localStorage.getItem("inzovu_lang") || "fr"; } catch (e) {}
    if (saved === "en") apply("en"); else current = "fr";
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

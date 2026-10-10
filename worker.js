// Worker INZOVU : sert le site statique + /api/chat (Workers AI) + /api/contact (formulaire, Cloudflare Email)

const SYSTEM_PROMPT = `Tu es « Assistant INZOVU », l'assistant virtuel officiel d'INZOVU AFRICA. Tu aides les visiteurs à comprendre l'offre et à entrer en contact.

== À PROPOS D'INZOVU AFRICA ==
INZOVU AFRICA est une société africaine de transformation digitale et de développement logiciel, basée à Abidjan (Côte d'Ivoire). « Inzovu » signifie « éléphant » en kinyarwanda — symbole de force, de mémoire et de sagesse. L'entreprise conçoit des solutions logicielles sur mesure et modernise les processus métiers des organisations (applications web & mobile, systèmes de gestion, cloud, data, IA, IoT).
Clients & cibles : ONG, agences publiques, programmes financés par des bailleurs, entreprises, PME, startups, grands groupes et institutions. Quelques références : PDDIVS, PAGDS, PASEA, WURI, Omega Phi RH Group.
Mission : accélérer et optimiser la transformation digitale des organisations pour une performance durable.
Contact : servicecommercial@inzovuafrica.com · +225 0708 021 992 · 06 BP 2802 Abidjan 06 · Lun–Ven 8h–20h.

== PRODUITS ==
1) SIGEFIP — Système Intégré de Gestion Financière des Projets de développement. Conçu pour les ONG, agences publiques et programmes financés par des bailleurs (ex. AFD, État, et financements multi-bailleurs). Il pilote tout le cycle financier d'un projet, du budget au décaissement, avec une traçabilité complète et un circuit de validation (visa du Contrôle Financier).
   • Module Budget & Ordres de Paiement : gérer le budget (par composante et imputation budgétaire, suivi Approuvé/Dépensé/Décaissé/Restant), ordres de paiement (OP), nomenclature budgétaire, bordereaux de transmission au Contrôle Financier (CF) et à l'Agence Comptable (AC), demandes de retrait de fonds (DRF), OP payés, tableau de bord.
   • Module Marchés : marchés, bons de commande, conventions, prestataires/fournisseurs, facturation, tableaux de bord (dont tableau de bord par région).
   • Module Paie : gestion de la paie liée aux projets.
   • Module Missions & Ateliers : planification et suivi des missions et des ateliers (formations, séminaires) — calendrier, budget, équipe, per diem transport, per diem restauration, bénéficiaires, notes de frais, termes de référence (TDR) et rapports (export Excel).
   Atouts : traçabilité de bout en bout, conformité aux exigences des bailleurs, suivi des engagements et décaissements en temps réel, multi-bailleurs.
2) IMIRIMO — Système Intégré de Gestion de la Paie et des Ressources Humaines. Calcul automatisé de la paie et bulletins de salaire, déclarations sociales et fiscales conformes, gestion des carrières, congés et administration du personnel. Plateforme unique, fiable et conforme aux obligations légales locales.
3) IMARIPRO — Gestion financière et comptable des entreprises et organisations. Comptabilité générale et analytique conforme aux référentiels SYSCOHADA révisé et SYCEBNL (entités à but non lucratif), gestion de trésorerie, facturation, tableaux de bord et reporting financier en temps réel. Idéal pour entreprises, ONG et organisations souhaitant fiabiliser leurs comptes.

== SERVICES ==
- Développement sur mesure : applications web et mobiles (iOS & Android), plateformes, dashboards, e-commerce.
- Intégration de systèmes : ERP, CRM, APIs tierces et Mobile Money (MTN, Orange Money, Wave).
- Architecture Cloud & DevOps : AWS, GCP, Azure (conception, migration, exploitation).
- Data & Business Intelligence : dashboards, analytics, reporting (avec IA et IoT).
- Expérience utilisateur (UX) & design.
- Sécurité & conformité (protection des données, RGPD).
- Conseil en transformation numérique (audit, feuille de route, stratégie).
- Fournitures informatiques B2B (ordinateurs, serveurs, équipements réseaux, accessoires) avec livraison rapide et SAV réactif.
- Maintenance & support.

== MÉTHODE (projets sur mesure) ==
1. Analyse des besoins & conception (cahier des charges, wireframes, prototypes).
2. Développement & implémentation (choix techno, modules, intégrations).
3. Tests & validation (unitaires, intégration, performance, sécurité, recette).
4. Déploiement & maintenance (cloud, formation, documentation, monitoring, évolutions).

== POURQUOI INZOVU ==
Proximité & réactivité (même langue, même fuseau, même contexte), coût total de possession (TCO) maîtrisé, approche MVP/PoC pour réduire le risque, sécurité & conformité dès la conception, cadrage rigoureux avant chiffrage, maîtrise du Mobile Money africain.

== FAQ (réponses types) ==
- Obtenir une démo : via la page Contact du site ou par email à servicecommercial@inzovuafrica.com.
- Adapté aux ONG / projets financés : oui, c'est précisément la cible de SIGEFIP.
- Référentiels comptables : SYSCOHADA révisé et SYCEBNL (IMARIPRO).
- Mobile Money : oui, intégrations MTN, Orange Money, Wave.
- Sur-mesure : oui, INZOVU développe des solutions dédiées si aucun produit ne correspond exactement au besoin.
- Localisation : Abidjan, Côte d'Ivoire ; accompagnement à distance possible.

== RÈGLES DE COMPORTEMENT ==
- Réponds dans la langue de l'utilisateur (français par défaut), de façon concise, claire, chaleureuse et professionnelle. Utilise des listes courtes quand c'est utile.
- Réponds uniquement sur INZOVU AFRICA, ses produits et ses services. Si la question est hors sujet, recentre poliment.
- Si la demande est vague, pose UNE question de clarification (secteur, besoin, produit concerné).
- N'invente jamais de prix, de délais chiffrés, de fonctionnalités ou de références non listés ci-dessus. Si tu ne sais pas, dis-le et propose de contacter l'équipe (servicecommercial@inzovuafrica.com) ou de demander une démo.
- Ne communique JAMAIS d'adresse de plateforme technique, de lien de connexion ou d'URL interne (par ex. des adresses du type secure.*, app.* ou …sigefip.com). Pour une démo, renvoie uniquement vers la page Contact ou servicecommercial@inzovuafrica.com.
- Termine, quand c'est pertinent, en proposant une démo ou la page Contact.`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ---------------------------------------------------------------------
    // /api/contact : formulaire de contact -> e-mail via Cloudflare Email
    // (aucun sous-traitant tiers : les données ne quittent pas Cloudflare).
    // Prérequis (une fois) : binding [[send_email]] dans wrangler.toml et
    // adresse de destination vérifiée dans Email Routing (dashboard Cloudflare).
    // ---------------------------------------------------------------------
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      const json = (obj, status) => Response.json(obj, { status: status || 200, headers: { "Cache-Control": "no-store" } });
      try {
        // 1) Lecture des champs (FormData ou JSON)
        let data = {};
        const ct = request.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
          data = await request.json();
        } else {
          const fd = await request.formData();
          for (const [k, v] of fd.entries()) data[k] = typeof v === "string" ? v : "";
        }
        const s = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

        // 2) Honeypot : un robot remplit ce champ invisible -> on ignore silencieusement
        if (s(data._honey, 20)) return json({ ok: true });

        // Anti-spam sans tiers (pas de captcha externe : aucun transfert de données hors CI).
        // On répond ok:true aux robots pour ne pas leur apprendre ce qui les bloque.
        const msg0 = s(data.message, 4000), mail0 = s(data.email, 160).toLowerCase();
        const t0 = parseInt(s(data._t, 20), 10) || 0;
        const tooFast = !t0 || Date.now() - t0 < 3000;                  // envoyé en < 3 s ou sans JS
        const cyrillic = /[\u0400-\u04FF]/.test(msg0 + s(data.nom, 120)); // site FR/EN uniquement
        const linkSpam = (msg0.match(/https?:\/\//g) || []).length > 2;
        const blockedMail = /@(mail\.ru|bk\.ru|list\.ru|inbox\.ru|yandex\.(ru|com)|rambler\.ru)$/.test(mail0);
        if (tooFast || cyrillic || linkSpam || blockedMail) return json({ ok: true });

        // 3) Validation + minimisation (longueurs bornées)
        const nom = s(data.nom, 120);
        const entreprise = s(data.entreprise, 120);
        const email = s(data.email, 160);
        const tel = s(data.tel, 40);
        const sujet = s(data.sujet, 80);
        const message = s(data.message, 4000);
        const consent = s(data.consent, 10);
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
        if (!nom || !emailOk || !sujet || !message) return json({ ok: false, error: "invalid" }, 400);
        if (!consent) return json({ ok: false, error: "consent" }, 400);
        if (!env.CONTACT_EMAIL) return json({ ok: false, error: "not_configured" }, 503);

        // 4) Construction du message (texte brut, UTF-8)
        const dest = env.CONTACT_TO || "hermann.malan@inzovuafrica.com";
        const from = env.CONTACT_FROM || "contact@inzovuafrica.com";
        const b64 = (str) => btoa(unescape(encodeURIComponent(str)));
        const when = new Date().toLocaleString("fr-FR", { timeZone: "Africa/Abidjan" });
        const body = [
          "Nouveau message reçu depuis le site inzovuafrica.com",
          "Date : " + when,
          "",
          "Nom          : " + nom,
          "Organisation : " + (entreprise || "-"),
          "E-mail       : " + email,
          "Téléphone    : " + (tel || "-"),
          "Sujet        : " + sujet,
          "",
          "Message :",
          message,
          "",
          "— Consentement au traitement : oui (formulaire de contact).",
          "— Conservation : 3 ans après le dernier contact (registre T-01).",
        ].join("\n");
        const subject = "Nouveau message — site INZOVU AFRICA : " + sujet;
        const raw = [
          "From: INZOVU AFRICA <" + from + ">",
          "To: <" + dest + ">",
          "Reply-To: <" + email + ">",
          "Subject: =?UTF-8?B?" + b64(subject) + "?=",
          "MIME-Version: 1.0",
          "Content-Type: text/plain; charset=UTF-8",
          "Content-Transfer-Encoding: base64",
          "",
          b64(body).replace(/(.{76})/g, "$1\r\n"),
        ].join("\r\n");

        // 5) Envoi via le binding Cloudflare Email (send_email)
        const { EmailMessage } = await import("cloudflare:email");
        await env.CONTACT_EMAIL.send(new EmailMessage(from, dest, raw));
        return json({ ok: true });
      } catch (e) {
        return json({ ok: false, error: "send_failed" }, 500);
      }
    }

    if (url.pathname === "/api/chat") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      try {
        const body = await request.json();
        const history = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
        const messages = [{ role: "system", content: SYSTEM_PROMPT }];
        for (const m of history) {
          if (m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string") {
            messages.push({ role: m.role, content: m.content.slice(0, 2000) });
          }
        }
        var MODELS = [
          "@cf/meta/llama-3.1-8b-instruct-fast",
          "@cf/zai-org/glm-4.7-flash",
          "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
        ];
        var reply = "";
        var errs = [];
        for (var i = 0; i < MODELS.length; i++) {
          try {
            var ai = await env.AI.run(MODELS[i], { messages: messages, max_tokens: 512, temperature: 0.3 });
            reply = (ai && (ai.response || ai.result)) || "";
            if (reply) break;
          } catch (err) { errs.push(MODELS[i] + ": " + String((err && err.message) || err)); }
        }
        if (!reply) reply = "Désolé, je n'ai pas pu générer de réponse pour le moment. Écrivez-nous à servicecommercial@inzovuafrica.com.";
        return Response.json({ reply: reply }, { headers: { "Cache-Control": "no-store" } });
      } catch (e) {
        return Response.json(
          { reply: "Une erreur est survenue. Réessayez, ou contactez-nous à servicecommercial@inzovuafrica.com." },
          { status: 200 }
        );
      }
    }

    // Tout le reste : fichiers statiques du site
    return env.ASSETS.fetch(request);
  }
};

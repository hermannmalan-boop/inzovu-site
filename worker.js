// Worker INZOVU : sert le site statique + endpoint /api/chat (Cloudflare Workers AI)

const SYSTEM_PROMPT = `Tu es « Assistant INZOVU », l'assistant virtuel d'INZOVU AFRICA.

À PROPOS D'INZOVU AFRICA
INZOVU AFRICA est une société africaine de transformation digitale et de développement logiciel, basée à Abidjan (Côte d'Ivoire). Elle conçoit des solutions logicielles sur mesure et modernise les processus métiers des organisations (applications web/mobile, systèmes de gestion, cloud, data, IA, IoT).
Contact : info@inzovu.africa · +225 0708 021 992 · 06 BP 2802 Abidjan 06 · Lun–Ven 8h–20h.

PRODUITS
1) SIGEFIP — Système Intégré de Gestion Financière des Projets de développement. Pour ONG, agences publiques et programmes financés. Modules : Budget & Ordres de Paiement (gestion du budget, ordres de paiement, nomenclature budgétaire, bordereaux CF/AC, demandes de retrait de fonds (DRF), OP payés, tableau de bord), Marchés (marchés, bons de commande, conventions, prestataires, facturation, tableaux de bord), et Paie. Atouts : traçabilité complète, conformité aux exigences des bailleurs, circuit de validation (visa du Contrôle Financier).
2) IMIRIMO — Système Intégré de Gestion de la Paie et des Ressources Humaines. Paie automatisée et bulletins, déclarations sociales et fiscales, gestion des carrières, congés et administration du personnel.
3) IMARIPRO — Gestion financière et comptable des entreprises et organisations. Comptabilité générale et analytique conforme aux référentiels SYSCOHADA révisé et SYCEBNL (entités à but non lucratif), trésorerie, facturation, reporting financier en temps réel.

SERVICES
Développement sur mesure (web & mobile), intégration de systèmes (ERP, CRM, APIs, Mobile Money : MTN, Orange Money, Wave), architecture Cloud & DevOps (AWS, GCP, Azure), Data & Business Intelligence, expérience utilisateur (UX) & design, sécurité & conformité (RGPD), conseil en transformation numérique, fournitures informatiques B2B, maintenance & support.

DÉMO
Une démonstration est disponible sur demande (plateforme : secure.app.sigefip.com). Invite l'utilisateur à demander une démo ou à contacter l'équipe.

RÈGLES
- Réponds dans la langue de l'utilisateur (français par défaut), de façon concise, claire et professionnelle.
- Réponds uniquement sur INZOVU AFRICA, ses produits et services. Si la question est hors sujet, recentre poliment.
- N'invente jamais de prix, de chiffres ou de fonctionnalités non listés ci-dessus ; si tu ne sais pas, propose de contacter l'équipe (info@inzovu.africa) ou de demander une démo.
- Termine, quand c'est pertinent, en proposant une démo ou la page Contact.`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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
        for (var i = 0; i < MODELS.length; i++) {
          try {
            var ai = await env.AI.run(MODELS[i], { messages: messages, max_tokens: 512, temperature: 0.3 });
            reply = (ai && (ai.response || ai.result)) || "";
            if (reply) break;
          } catch (err) { /* essaie le modèle suivant */ }
        }
        if (!reply) reply = "Désolé, je n'ai pas pu générer de réponse pour le moment. Écrivez-nous à info@inzovu.africa.";
        return Response.json({ reply: reply }, { headers: { "Cache-Control": "no-store" } });
      } catch (e) {
        return Response.json(
          { reply: "Une erreur est survenue. Réessayez, ou contactez-nous à info@inzovu.africa." },
          { status: 200 }
        );
      }
    }

    // Tout le reste : fichiers statiques du site
    return env.ASSETS.fetch(request);
  }
};

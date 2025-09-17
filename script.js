// AlPiOmega - Simple EN/ES toggle for any page elements with [data-i18n]
(function () {
  const STORAGE_KEY = 'ao_lang';

  // Central dictionary; extend per page as needed
  const I18N = {
    en: {
      title: "Programs",
      subtitle: "Train smarter. Look athletic. Perform like a pro.",
      badge_best: "Best Seller",

      tile_plans_title: "Personalized Nutrition Plans",
      tile_plans_desc: "3-month plan tailored to your goals, foods you enjoy, and schedule.",
      tile_plans_b1: "Macro targets + weekly adjustments",
      tile_plans_b2: "Simple grocery lists & swaps",
      tile_plans_b3: "Messaging check-ins for accountability",
      tile_plans_price: "$300",
      tile_plans_terms: "/ 3 months",
      tile_plans_cta: "Get My Plan",
      tile_plans_more: "What’s included?",

      tile_group_title: "Group Workouts",
      tile_group_desc: "High-energy sessions for strength, agility, and conditioning.",
      tile_group_b1: "Progressive weekly blocks",
      tile_group_b2: "Athletic movement & plyometrics",
      tile_group_b3: "Community & accountability",
      tile_group_cta: "Join Waitlist",
      tile_group_more: "Schedule & details",

      tile_1on1_title: "1-on-1 Coaching",
      tile_1on1_desc: "Customized training for your body, goals, and schedule.",
      tile_1on1_b1: "Movement screen & plan design",
      tile_1on1_b2: "Strength + speed + mobility",
      tile_1on1_b3: "Performance tracking",
      tile_1on1_cta: "Book Consult",
      tile_1on1_more: "Packages & pricing",

      step1: "Assess: goals, schedule, preferences.",
      step2: "Plan: nutrition + training mapped to your life.",
      step3: "Execute: coaching, accountability, adjustments.",
      step4: "Track: metrics & weekly wins.",
    },
    es: {
      title: "Programas",
      subtitle: "Entrena con inteligencia. Luce atlético. Rinde como profesional.",
      badge_best: "Más vendido",

      tile_plans_title: "Planes de Nutrición Personalizados",
      tile_plans_desc: "Plan de 3 meses adaptado a tus metas, gustos y horario.",
      tile_plans_b1: "Macros + ajustes semanales",
      tile_plans_b2: "Listas de compras y sustituciones simples",
      tile_plans_b3: "Seguimiento por mensajes para rendición de cuentas",
      tile_plans_price: "US$300",
      tile_plans_terms: "/ 3 meses",
      tile_plans_cta: "Quiero mi plan",
      tile_plans_more: "¿Qué incluye?",

      tile_group_title: "Entrenamientos en Grupo",
      tile_group_desc: "Sesiones de alta energía para fuerza, agilidad y resistencia.",
      tile_group_b1: "Bloques semanales progresivos",
      tile_group_b2: "Movimiento atlético y pliometría",
      tile_group_b3: "Comunidad y responsabilidad",
      tile_group_cta: "Unirme a la lista",
      tile_group_more: "Horarios y detalles",

      tile_1on1_title: "Entrenamiento 1-a-1",
      tile_1on1_desc: "Trabajo personalizado para tu cuerpo, metas y agenda.",
      tile_1on1_b1: "Evaluación de movimiento y diseño del plan",
      tile_1on1_b2: "Fuerza + velocidad + movilidad",
      tile_1on1_b3: "Seguimiento de rendimiento",
      tile_1on1_cta: "Agendar consulta",
      tile_1on1_more: "Paquetes y precios",

      step1: "Evaluar: metas, horario y preferencias.",
      step2: "Planificar: nutrición + entrenamiento según tu vida.",
      step3: "Ejecutar: coaching, apoyo y ajustes.",
      step4: "Medir: métricas y logros semanales.",
    }
  };

  function getLangDefault() {
    const root = document.getElementById('programs-mosaic');
    const attr = root && root.getAttribute('data-lang-default');
    if (attr) return attr;
    return 'en';
  }

  function currentLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || getLangDefault();
    } catch {
      return getLangDefault();
    }
  }

  function applyLang(lang) {
    const strings = I18N[lang] || I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (strings[key] != null) el.textContent = strings[key];
    });
    document.querySelectorAll('.pm-lang-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(currentLang());

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.pm-lang-btn');
      if (!btn) return;
      e.preventDefault();
      applyLang(btn.dataset.lang);
    });
  });

  // Expose a tiny API for other pages if needed
  window.AO_I18N = {
    set: (lang) => applyLang(lang),
    get: () => currentLang(),
    dict: I18N
  };
})();


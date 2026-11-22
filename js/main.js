(() => {
  "use strict";
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- Language ---------------- */
  const UI = {
    en: {
      title: "Pierre Baud, AI portfolio",
      skip: "Skip to content",
      "nav.research": "About", "nav.projects": "Projects", "nav.experience": "Experience", "nav.skills": "Skills", "nav.contact": "Contact",
      "hero.kicker": "AI engineer & researcher in training",
      "hero.school": "AI Lead at PoC Innovation",
      "hero.pitch": "I build models that learn how the world moves and agents that act within it: latent world models for a robot arm, LLM agents that check their own code and budget, and generative pipelines that turn text into animated 3D. What draws me in first is the mathematics that makes them work.",
      "hero.status": "Open to AI research internships and collaborations",
      "hero.cta1": "See the projects", "hero.cta2": "Contact me",
      "hero.hint": "latent space · click to add a point",
      "research.eyebrow": "about",
      "research.title": "Learn fast, then innovate.",
      "research.lead": "Five years of business school taught me why things get built. Five years of engineering at Epitech are teaching me how. I bring both to AI research: start from a question worth answering, measure before claiming, and write down the hypotheses that turned out wrong.",
      "poc.eyebrow": "PoC Innovation · AI Lead", "poc.title": "Leading research teams, not just projects.", "poc.lead": "PoC Innovation is France's first student innovation centre. As head of its AI pole I start research projects, staff and steer the teams, review the methods and make sure every result ends up documented and public.", "poc.teams": "Projects from the pole on this site", "poc.org": "Event I co-organised",
      "projects.title": "Projects",
      "projects.lead": "Every project here is documented, reproducible and evaluated. Open a card for the method, the numbers and the code.",
      "projects.found": "Mathematical foundations",
      "projects.foundLead": "Earlier Epitech projects where the maths behind ML was written by hand.",
      "experience.title": "Experience", "experience.hack": "Hackathons",
      "skills.title": "Skills", "skills.lead": "Pick a skill to see the projects where I used it.",
      "skills.langs": "Languages: French (native), English C1 (Duolingo English Test 115).",
      "contact.t1": "Let's build", "contact.t2": "something that learns.",
      "contact.lead": "A research topic, an internship, a collaboration? Based in Lyon, open to remote work and to moving.",
      footer: "designed and coded in Lyon",
      "panel.close": "Close", "panel.flow": "How it works", "panel.points": "What I did and found", "panel.prev": "Previous", "panel.next": "Next",
      kw: { projects: "Projects", experience: "Experience", skills: "Skills", contact: "Contact" },
      facts: [["10", "public AI & ML projects"], ["4", "student research teams led at PoC Innovation"], ["2", "five-year Grande École programmes: business and computer science"]],
      stats: [["6", "flagship projects"], ["10", "AI projects"], ["6", "maths foundations"]],
      open: "Read the project", led: "Led", projects: "projects", project: "project", all: "All projects",
      showing: (n, c) => `${n} project${n > 1 ? "s" : ""} shown: ${c}`,
      copy: "Copy", copied: "Copied", langLabel: "Passer le site en français",
      role: "Role", of: "of", unused: "outside these projects"
    },
    fr: {
      title: "Pierre Baud, portfolio IA",
      skip: "Aller au contenu",
      "nav.research": "À propos", "nav.projects": "Projets", "nav.experience": "Parcours", "nav.skills": "Compétences", "nav.contact": "Contact",
      "hero.kicker": "Ingénieur et chercheur en IA en formation",
      "hero.school": "Responsable du pôle IA de PoC Innovation",
      "hero.pitch": "Je construis des modèles qui apprennent comment le monde bouge, et des agents qui y agissent : des world models latents pour un bras robotique, des agents LLM qui vérifient leur propre code et leur budget, et des pipelines génératives qui transforment un texte en 3D animée. Ce qui m'y attire avant tout, ce sont les mathématiques qui les font fonctionner.",
      "hero.status": "Ouvert aux stages de recherche en IA et aux collaborations",
      "hero.cta1": "Voir les projets", "hero.cta2": "Me contacter",
      "hero.hint": "espace latent · cliquez pour ajouter un point",
      "research.eyebrow": "à propos",
      "research.title": "Apprendre vite, puis innover.",
      "research.lead": "Cinq ans d'école de commerce m'ont appris pourquoi on construit. Cinq ans d'ingénierie à Epitech m'apprennent comment. J'apporte les deux à la recherche en IA : partir d'une question qui mérite une réponse, mesurer avant d'affirmer, et noter les hypothèses qui se sont révélées fausses.",
      "poc.eyebrow": "PoC Innovation · responsable IA", "poc.title": "Mener des équipes de recherche, pas seulement des projets.", "poc.lead": "PoC Innovation est le premier centre d'innovation étudiant de France. À la tête de son pôle IA, je lance les projets de recherche, compose et pilote les équipes, relis les méthodes et veille à ce que chaque résultat soit documenté et publié.", "poc.teams": "Projets du pôle présentés ici", "poc.org": "Événement co-organisé",
      "projects.title": "Projets",
      "projects.lead": "Chaque projet est documenté, reproductible et évalué. Ouvrez une carte pour la méthode, les chiffres et le code.",
      "projects.found": "Fondations mathématiques",
      "projects.foundLead": "Des projets Epitech plus anciens où les maths derrière le ML sont écrites à la main.",
      "experience.title": "Parcours", "experience.hack": "Hackathons",
      "skills.title": "Compétences", "skills.lead": "Choisissez une compétence pour voir les projets où je l'ai utilisée.",
      "skills.langs": "Langues : français (natif), anglais C1 (Duolingo English Test 115).",
      "contact.t1": "Construisons", "contact.t2": "quelque chose qui apprend.",
      "contact.lead": "Un sujet de recherche, un stage, une collaboration ? Basé à Lyon, ouvert au télétravail et à la mobilité.",
      footer: "conçu et codé à Lyon",
      "panel.close": "Fermer", "panel.flow": "Fonctionnement", "panel.points": "Ce que j'ai fait et trouvé", "panel.prev": "Précédent", "panel.next": "Suivant",
      kw: { projects: "Projets", experience: "Parcours", skills: "Compétences", contact: "Contact" },
      facts: [["10", "projets IA et ML publics"], ["4", "équipes de recherche étudiantes menées chez PoC Innovation"], ["2", "PGE de 5 ans : commerce et informatique"]],
      stats: [["6", "projets phares"], ["10", "projets IA"], ["6", "fondations maths"]],
      open: "Lire le projet", led: "Dirigé", projects: "projets", project: "projet", all: "Tous les projets",
      showing: (n, c) => `${n} projet${n > 1 ? "s" : ""} affiché${n > 1 ? "s" : ""} : ${c}`,
      copy: "Copier", copied: "Copié", langLabel: "Switch the site to English",
      role: "Rôle", of: "sur", unused: "hors de ces projets"
    }
  };
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } } };
  let lang = store.get("lang") || ((navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en");
  if (!UI[lang]) lang = "en";
  const u = (k) => UI[lang][k];
  const t = (x) => (x && typeof x === "object" && !Array.isArray(x) ? (x[lang] ?? x.en) : x);

  /* ---------------- Seeded random ---------------- */
  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let r = Math.imul(seed ^ (seed >>> 15), 1 | seed); r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r; return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };

  /* ---------------- Static rendering ---------------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = u("title");
    $$("[data-i18n]").forEach((n) => { const v = u(n.dataset.i18n); if (typeof v === "string") n.textContent = v; });
    $$(".lang-opt").forEach((n) => n.classList.toggle("is-on", n.dataset.l === lang));
    $("#lang-toggle").setAttribute("aria-label", u("langLabel"));
    $$(".kband-inner").forEach((k) => {
      const w = esc(u("kw")[k.dataset.kword]);
      k.innerHTML = [0, 1, 2, 3].map((i) => `<span class="kword${i % 2 ? " kword-fill" : ""}">${w}</span>`).join("");
    });
  }

  function renderMarquee() {
    const set = () => `<ul class="marquee-set">${S.marquee.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>`;
    $("#marquee-track").innerHTML = set() + set().replace("<ul", '<ul aria-hidden="true"');
  }

  function renderFacts() {
    $("#facts").innerHTML = u("facts").map(([v, l]) => `<li class="fact card"><p class="fact-v">${esc(v)}</p><p class="fact-l">${esc(l)}</p></li>`).join("");
    $("#stats").innerHTML = u("stats").map(([v, l]) => `<li class="stat"><b>${esc(v)}</b><span>${esc(l)}</span></li>`).join("");
  }

  function renderPoc() {
    const e = S.poc.event;
    $("#poc-teams").innerHTML = S.poc.teams.map((id) => {
      const p = S.projects.find((x) => x.id === id);
      return `<li><button type="button" class="poc-team" data-open="${id}"><b>${esc(p.title)}</b><span>${esc(t(p.role))}</span></button></li>`;
    }).join("");
    $("#poc-event").innerHTML = `<p class="poc-ev-date mono">${esc(t(e.date))}</p><h4 class="poc-ev-name">${esc(e.name)}</h4>
      <p class="poc-ev-role">${esc(t(e.role))}</p><p class="poc-ev-d">${esc(t(e.d))}</p>
      <ul class="poc-nums">${e.nums.map((n) => `<li><b>${esc(t(n.v))}</b><span>${esc(t(n.l))}</span></li>`).join("")}</ul>`;
  }

  const catLabel = (id) => t(S.categories.find((c) => c.id === id).label);

  function renderProjects() {
    const grid = $("#project-grid");
    grid.innerHTML = "";
    S.projects.forEach((p, i) => {
      const card = el("article", `project card reveal${p.featured ? " is-featured" : ""}`);
      card.dataset.id = p.id;
      card.dataset.cats = p.cats.join(" ");
      card.style.setProperty("--i", i % 3);
      const kpis = p.featured && p.metrics ? `<span class="project-kpis">${p.metrics.slice(0, 3).map((m) => `<span class="kpi"><b>${esc(m.v)}</b><span>${esc(t(m.l))}</span></span>`).join("")}</span>` : "";
      const visual = p.visual === "img"
        ? `<span class="pv pv-img"><img src="${p.img}" alt="" loading="lazy"></span>`
        : `<span class="pv"><canvas data-visual="${p.visual}" data-seed="${i + 3}"></canvas></span>`;
      card.innerHTML = `<button class="project-open" type="button" data-open="${p.id}" aria-label="${esc(p.title)}: ${esc(u("open"))}">
          ${visual}
          <span class="project-body">
            <span class="project-meta"><span class="dom">${esc(catLabel(p.cats[0]))}</span><span class="dot">${esc(t(p.context))}</span><span class="dot">${esc(p.date)}</span>${p.led ? `<span class="badge-led">${esc(u("led"))}</span>` : ""}</span>
            <span class="project-title">${esc(p.title)}</span>
            <span class="project-summary">${esc(t(p.tagline))}</span>
            ${p.featured ? `<span class="project-role">${esc(u("role"))}${lang === "fr" ? " :" : ":"} ${esc(t(p.role))}</span>` : ""}
            ${kpis}
            <span class="project-stack">${p.stack.slice(0, p.featured ? 6 : 4).map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</span>
            <span class="project-more">${esc(u("open"))}</span>
          </span>
        </button>`;
      grid.append(card);
    });
    drawAllVisuals(grid);
  }

  function renderFilters() {
    const box = $("#filters");
    $$(".filter", box).forEach((b) => b.remove());
    S.categories.forEach((c) => {
      const n = c.id === "all" ? S.projects.length : S.projects.filter((p) => p.cats.includes(c.id)).length;
      if (!n) return;
      const b = el("button", "filter", `${esc(t(c.label))}<span class="filter-count">${n}</span>`);
      b.type = "button";
      b.dataset.cat = c.id;
      b.setAttribute("aria-pressed", String(c.id === currentCat));
      box.append(b);
    });
    requestAnimationFrame(moveFilterInd);
  }

  function renderFoundations() {
    $("#found-list").innerHTML = S.foundations.map((f) => `<li class="found card"><a href="https://github.com/divisio74/${f.name}" target="_blank" rel="noopener"><p class="found-n">${esc(f.name)}</p><p class="found-d">${esc(t(f.d))}</p></a></li>`).join("");
  }

  function renderTimeline() {
    $("#timeline").innerHTML = S.experience.map((x) => `<li class="tl-item reveal"><div class="tl-card card">
      <p class="tl-period">${esc(t(x.period))}</p><h3 class="tl-title">${esc(t(x.title))}</h3><p class="tl-place">${esc(x.place)}</p>
      <p class="tl-text">${esc(t(x.text))}</p><ul class="tl-tags">${x.tags.map((g) => `<li>${esc(g)}</li>`).join("")}</ul></div></li>`).join("");
    $("#hacks").innerHTML = S.hackathons.map((h, i) => `<article class="hack card reveal${h.award ? " is-award" : ""}" style="--i:${i}"><p class="hack-e">${esc(t(h.e))}</p><h4 class="hack-t">${esc(t(h.t))}</h4><p class="hack-d">${esc(t(h.d))}</p></article>`).join("");
  }

  /* Skills: which projects use each skill */
  const EXTRA = {
    "ablation study": ["lewm"], "confidence intervals": ["startrek"], "bayesian prediction": ["sensia"], benchmarks: ["sensia", "lewm"],
    docker: ["mlblock"], "qwen3-vl": ["pipeline3d"], "multi-seed": ["startrek"], python: ["lewm", "fastquantum", "cvrie"], typescript: ["mlblock"], gat: ["fastquantum"]
  };
  const projectsFor = (skill) => {
    const k = skill.toLowerCase();
    const ids = new Set(S.projects.filter((p) => p.stack.some((s) => s.toLowerCase() === k)).map((p) => p.id));
    (EXTRA[k] || []).forEach((id) => ids.add(id));
    return S.projects.filter((p) => ids.has(p.id)).map((p) => p.id);
  };
  let pinnedSkill = null;

  function renderSkills() {
    $("#skills-groups").innerHTML = S.skills.map((g, gi) => `<div class="skill-group card reveal" style="--i:${gi % 2}"><h3 class="skill-group-title">${esc(t(g.g))}</h3><div class="pills">${g.items.map((s) => {
      const n = projectsFor(s).length;
      return `<button class="skill-pill" type="button" data-skill="${esc(s)}" aria-pressed="false"${n ? "" : ' aria-disabled="true"'}>${esc(s)}${n ? `<span class="pill-n">${n}</span>` : ""}</button>`;
    }).join("")}</div></div>`).join("");
    $("#proj-index").innerHTML = S.projects.map((p) => `<li><button class="proj-btn" type="button" data-open="${p.id}" data-pid="${p.id}">${esc(p.title)}</button></li>`).join("");
    showSkill(pinnedSkill);
  }

  function showSkill(skill) {
    const ids = skill ? projectsFor(skill) : null;
    $("#ro-name").textContent = skill || u("all");
    const n = ids ? ids.length : S.projects.length;
    $("#ro-num").textContent = n;
    $("#ro-unit").textContent = n > 1 ? u("projects") : u("project");
    let k = 0;
    $$(".proj-btn").forEach((b) => {
      const on = ids ? ids.includes(b.dataset.pid) : false;
      b.classList.toggle("is-lit", on);
      b.classList.toggle("is-dim", !!ids && !on);
      if (on) b.style.setProperty("--k", k++);
    });
  }

  function renderContact() {
    $("#contact-list").innerHTML = S.contact.map((c) => `<li class="contact-item card"><a class="contact-link" href="${c.url}"${c.url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}><span class="contact-label">${esc(c.label)}</span><span class="contact-value">${esc(t(c.value))}</span></a>${c.copy ? `<button class="btn btn-glass btn-small" type="button" data-copy="${esc(c.value)}">${esc(u("copy"))}</button>` : ""}</li>`).join("");
  }

  function renderAll() {
    applyStatic();
    renderMarquee();
    renderFacts();
    renderPoc();
    renderFilters();
    renderProjects();
    applyFilter(false);
    renderFoundations();
    renderTimeline();
    renderSkills();
    renderContact();
    observeReveals();
    bindCards();
    requestAnimationFrame(() => { moveNavInd(); onScroll(); });
  }

  /* ---------------- Filters ---------------- */
  let currentCat = "all";
  function applyFilter(announce = true) {
    let n = 0;
    $$(".project").forEach((c) => {
      const show = currentCat === "all" || c.dataset.cats.split(" ").includes(currentCat);
      c.hidden = !show;
      if (show) n++;
    });
    $$(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === currentCat)));
    moveFilterInd();
    drawAllVisuals($("#project-grid"));
    if (announce) $("#filters-live").textContent = u("showing")(n, catLabel(currentCat));
  }
  function moveFilterInd() {
    const ind = $("#filter-ind");
    const b = $(`.filter[data-cat="${currentCat}"]`);
    if (!b || !ind) return;
    ind.style.width = b.offsetWidth + "px";
    ind.style.height = b.offsetHeight + "px";
    ind.style.transform = `translate(${b.offsetLeft}px, ${b.offsetTop}px)`;
    ind.style.opacity = 1;
  }

  /* ---------------- Panel ---------------- */
  const panel = $("#project-panel");
  let panelIdx = 0;
  function openPanel(id) {
    const i = S.projects.findIndex((p) => p.id === id);
    if (i < 0) return;
    fillPanel(i);
    if (!panel.open) { panel.classList.remove("is-closing"); panel.showModal(); }
    $(".panel-body", panel).scrollTop = 0;
    setHash();
  }
  const setHash = () => { try { history.replaceState(null, "", "#p/" + S.projects[panelIdx].id); } catch { /* ignore */ } };
  function fillPanel(i) {
    panelIdx = (i + S.projects.length) % S.projects.length;
    const p = S.projects[panelIdx];
    $("#pp-domain").textContent = p.cats.map(catLabel).join(" · ");
    $("#pp-title").textContent = p.title;
    $("#pp-tagline").textContent = t(p.tagline);
    $("#pp-context").innerHTML = `<b>${esc(t(p.role))}</b> · ${esc(t(p.context))} · ${esc(p.date)}${p.status ? " · " + esc(t(p.status)) : ""}`;
    $("#pp-summary").textContent = t(p.summary);
    $("#pp-metrics").innerHTML = (p.metrics || []).map((m) => `<div class="metric"><b>${esc(m.v)}</b><span>${esc(t(m.l))}</span></div>`).join("");
    const flow = p.flow ? t(p.flow) : null;
    $("#pp-flow-wrap").hidden = !flow;
    $("#pp-flow").innerHTML = flow ? flow.map((f) => `<li><span>${esc(f)}</span></li>`).join("") : "";
    $("#pp-points").innerHTML = t(p.points).map((x) => `<li>${esc(x)}</li>`).join("");
    $("#pp-figs").innerHTML = (p.figures || []).map((f) => `<figure><img src="${f.src}" alt="${esc(t(f.alt))}" loading="lazy"><figcaption>${esc(t(f.cap))}</figcaption></figure>`).join("");
    $("#pp-stack").innerHTML = p.stack.map((s) => `<li>${esc(s)}</li>`).join("");
    $("#pp-links").innerHTML = p.links.map((l, k) => `<a class="btn ${k ? "btn-glass" : "btn-primary"} btn-small" href="${l.url}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("");
    $("#pp-count").textContent = `${panelIdx + 1} ${u("of")} ${S.projects.length}`;
    const vis = $("#pp-visual");
    vis.className = "panel-visual pv" + (p.visual === "img" ? " pv-img" : "");
    vis.innerHTML = p.visual === "img" ? `<img src="${p.img}" alt="">` : `<canvas data-visual="${p.visual}" data-seed="${panelIdx + 3}"></canvas>`;
    requestAnimationFrame(() => drawAllVisuals(vis));
  }
  function closePanel() {
    if (!panel.open) return;
    try { history.replaceState(null, "", "#projects"); } catch { /* ignore */ }
    if (reduced) { panel.close(); return; }
    panel.classList.add("is-closing");
    panel.addEventListener("animationend", () => { panel.classList.remove("is-closing"); panel.close(); }, { once: true });
  }
  panel.addEventListener("cancel", (e) => { e.preventDefault(); closePanel(); });
  panel.addEventListener("click", (e) => { if (e.target === panel) closePanel(); });
  $("#pp-close").addEventListener("click", closePanel);
  $("#pp-prev").addEventListener("click", () => { fillPanel(panelIdx - 1); $(".panel-body", panel).scrollTop = 0; setHash(); });
  $("#pp-next").addEventListener("click", () => { fillPanel(panelIdx + 1); $(".panel-body", panel).scrollTop = 0; setHash(); });

  /* ---------------- Delegated events ---------------- */
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) { openPanel(open.dataset.open); return; }
    const f = e.target.closest(".filter");
    if (f) { currentCat = f.dataset.cat; applyFilter(); return; }
    const pill = e.target.closest(".skill-pill");
    if (pill && pill.getAttribute("aria-disabled") !== "true") {
      const s = pill.dataset.skill;
      pinnedSkill = pinnedSkill === s ? null : s;
      $$(".skill-pill").forEach((p) => p.setAttribute("aria-pressed", String(p.dataset.skill === pinnedSkill)));
      showSkill(pinnedSkill);
      return;
    }
    const cp = e.target.closest("[data-copy]");
    if (cp) {
      const done = () => { cp.textContent = u("copied"); cp.classList.add("is-done"); setTimeout(() => { cp.textContent = u("copy"); cp.classList.remove("is-done"); }, 1800); };
      try { navigator.clipboard.writeText(cp.dataset.copy).then(done, () => {}); } catch { /* ignore */ }
    }
  });
  const skillHover = (e) => {
    const pill = e.target.closest(".skill-pill");
    if (!pill || pill.getAttribute("aria-disabled") === "true") return;
    showSkill(e.type === "pointerover" || e.type === "focusin" ? pill.dataset.skill : pinnedSkill);
  };
  ["pointerover", "pointerout", "focusin", "focusout"].forEach((ev) => $("#skills-groups").addEventListener(ev, skillHover));
  $("#lang-toggle").addEventListener("click", () => {
    lang = lang === "en" ? "fr" : "en";
    store.set("lang", lang);
    renderAll();
    if (panel.open) fillPanel(panelIdx);
  });

  /* Card light that follows the pointer */
  function bindCards() {
    $$(".card").forEach((c) => {
      if (c.dataset.bound) return;
      c.dataset.bound = "1";
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", e.clientX - r.left + "px");
        c.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ---------------- Scroll effects ---------------- */
  let revealObs;
  function observeReveals() {
    if (reduced || !("IntersectionObserver" in window)) { $$(".reveal").forEach((n) => n.classList.add("is-in")); return; }
    revealObs = revealObs || new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); revealObs.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal:not(.is-in)").forEach((n) => revealObs.observe(n));
  }

  let activeSection = null;
  function moveNavInd() {
    const ind = $("#nav-ind");
    const a = activeSection && $(`.nav-links a[data-section="${activeSection}"]`);
    $$(".nav-links a").forEach((l) => l.setAttribute("aria-current", String(l === a)));
    if (!a) { ind.style.opacity = 0; return; }
    ind.style.width = a.offsetWidth + "px";
    ind.style.transform = `translateX(${a.offsetLeft}px)`;
    ind.style.opacity = 1;
  }

  const sections = ["research", "projects", "experience", "skills", "contact"].map((id) => document.getElementById(id));
  let ticking = false;
  function onScroll() {
    ticking = false;
    const h = innerHeight;
    const max = document.documentElement.scrollHeight - h;
    $("#progress").style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;

    let cur = null;
    sections.forEach((s) => { if (s.getBoundingClientRect().top < h * .4) cur = s.id; });
    if (cur !== activeSection) { activeSection = cur; moveNavInd(); }

    if (!reduced) {
      $$(".kband").forEach((k) => {
        const r = k.getBoundingClientRect();
        if (r.bottom < 0 || r.top > h) return;
        const p = 1 - (r.top + r.height) / (h + r.height);
        k.firstElementChild.style.setProperty("--kx", (-4 - p * 26).toFixed(2) + "%");
      });
    }
    const tw = $(".timeline-wrap");
    if (tw) {
      const r = tw.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (h * .65 - r.top) / r.height));
      $("#tl-line").style.transform = `scaleY(${p})`;
      $$(".tl-item").forEach((it) => it.classList.toggle("is-lit", it.getBoundingClientRect().top + 24 < h * .65));
    }
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  let rz;
  addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { moveNavInd(); moveFilterInd(); drawAllVisuals(document); onScroll(); }, 120); });

  /* ---------------- Card visuals (canvas) ----------------
     Each drawer gets (g, R, ph, A): R = seeded random (same layout every frame),
     ph = animation phase (advances only while hovered), A = hover amount 0..1 (eases in and out). */
  const C = { sky: "92,198,255", aqua: "60,224,207", ice: "168,230,255", blue: "79,141,255", ink: "233,242,252" };
  const col = (c, a) => `rgba(${C[c]},${Math.max(0, Math.min(1, a)).toFixed(3)})`;

  function setup(cv) {
    const r = cv.parentElement.getBoundingClientRect();
    if (!r.width) return null;
    const d = Math.min(devicePixelRatio || 1, 2);
    const W = Math.round(r.width * d), H = Math.round(r.height * d);
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    const x = cv.getContext("2d");
    x.setTransform(d, 0, 0, d, 0, 0);
    x.clearRect(0, 0, r.width, r.height);
    x.shadowBlur = 0; x.lineWidth = 1; x.setLineDash([]); x.textAlign = "left";
    return { x, w: r.width, h: r.height };
  }
  const visState = new WeakMap();
  const vstate = (cv) => { let s = visState.get(cv); if (!s) visState.set(cv, (s = { ph: 0, A: 0, target: 0, raf: 0, last: 0 })); return s; };
  function drawOne(cv) {
    const g = setup(cv);
    if (!g) return;
    const s = vstate(cv);
    (VIS[cv.dataset.visual] || (() => {}))(g, rng(+cv.dataset.seed * 9973), s.ph, s.A);
  }
  function drawAllVisuals(root) { $$("canvas[data-visual]", root).forEach(drawOne); }
  function animateVisual(host, target) {
    const cv = host && host.querySelector("canvas[data-visual]");
    if (!cv || reduced) return;
    const s = vstate(cv);
    s.target = target;
    if (s.raf) return;
    s.last = performance.now();
    const step = (now) => {
      const dt = Math.min(.05, Math.max(0, (now - s.last) / 1000));
      s.last = now;
      s.A += (s.target - s.A) * Math.min(1, dt * 5);
      s.ph += dt * s.A;
      if (s.target === 0 && s.A < .01) { s.A = 0; s.raf = 0; drawOne(cv); return; }
      drawOne(cv);
      s.raf = requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);
  }
  const HOVER = ".project, #pp-visual";
  document.addEventListener("pointerover", (e) => animateVisual(e.target.closest && e.target.closest(HOVER), 1));
  document.addEventListener("pointerout", (e) => { const h = e.target.closest && e.target.closest(HOVER); if (h && !h.contains(e.relatedTarget)) animateVisual(h, 0); });
  document.addEventListener("focusin", (e) => animateVisual(e.target.closest && e.target.closest(".project"), 1));
  document.addEventListener("focusout", (e) => { const h = e.target.closest && e.target.closest(".project"); if (h && !h.contains(e.relatedTarget)) animateVisual(h, 0); });

  const mono = (x, s) => { x.font = `500 ${s}px "JetBrains Mono", ui-monospace, monospace`; };
  const rr = (x, a, b, w, h, r) => { x.beginPath(); x.roundRect ? x.roundRect(a, b, w, h, r) : x.rect(a, b, w, h); };
  const bez = (t, a, b, c, d) => { const u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d; };
  const glowDot = (x, px, py, r, c, a) => { x.fillStyle = col(c, a); x.shadowColor = col(c, a); x.shadowBlur = 12; x.beginPath(); x.arc(px, py, r, 0, 7); x.fill(); x.shadowBlur = 0; };

  const VIS = {
    // camera frames -> latent z_t -> CEM rollouts that sway while the planner searches; a probe travels the best plan
    wm({ x, w, h }, R, ph, A) {
      const fw = w * .14, fh = fw * .75;
      [[w * .06, h * .2], [w * .06, h * .2 + fh + 14]].forEach(([a, b], k) => {
        rr(x, a, b, fw, fh, 6); x.fillStyle = col("blue", .12); x.fill(); x.strokeStyle = col("sky", .5); x.stroke();
        for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) { x.fillStyle = col(k ? "aqua" : "sky", .15 + R() * .45 + A * .25 * Math.sin(ph * 5 + i * 1.3 + j * 2.1 + k)); x.fillRect(a + 5 + i * (fw - 10) / 5, b + 5 + j * (fh - 10) / 4, (fw - 10) / 5 - 2, (fh - 10) / 4 - 2); }
      });
      const gx = w * .3, gy = h * .2, gs = Math.min(w * .14, h * .6);
      for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) { x.fillStyle = col("ice", .15 + R() * .6 + A * .35 * Math.sin(ph * 4 + i * .9 + j * 1.7)); x.beginPath(); x.arc(gx + i * gs / 6, gy + j * gs / 6, 1.6, 0, 7); x.fill(); }
      mono(x, 10); x.fillStyle = col("ink", .55); x.fillText("z_t", gx, gy + gs + 16);
      x.strokeStyle = col("sky", .5); x.beginPath(); x.moveTo(w * .06 + fw + 6, h * .5); x.lineTo(gx - 8, h * .5); x.stroke();
      const ox = gx + gs + 16, oy = gy + gs / 2, gxe = w * .92, gye = h * .3;
      for (let k = 0; k < 46; k++) {
        const ex = ox + (gxe - ox) * (.75 + R() * .3), ey = h * (.12 + R() * .78) + A * h * .07 * Math.sin(ph * 1.7 + k * .7);
        const c1 = (R() - .5) * h * .5, c2 = (R() - .5) * h * .3;
        x.strokeStyle = col(R() > .5 ? "sky" : "blue", .12 + R() * .12);
        x.beginPath(); x.moveTo(ox, oy); x.bezierCurveTo(ox + (ex - ox) * .4, oy + c1, ox + (ex - ox) * .7, ey + c2, ex, ey); x.stroke();
      }
      const p1x = ox + (gxe - ox) * .4, p1y = oy - h * .05, p2x = ox + (gxe - ox) * .7, p2y = gye + h * .08;
      const g = x.createLinearGradient(ox, 0, gxe, 0); g.addColorStop(0, col("sky", 1)); g.addColorStop(1, col("aqua", 1));
      x.strokeStyle = g; x.lineWidth = 2.5; x.shadowColor = col("sky", .9); x.shadowBlur = 12;
      x.beginPath(); x.moveTo(ox, oy); x.bezierCurveTo(p1x, p1y, p2x, p2y, gxe, gye); x.stroke();
      x.shadowBlur = 0; x.lineWidth = 1;
      if (A > .01) { const t = (ph * .5) % 1; glowDot(x, bez(t, ox, p1x, p2x, gxe), bez(t, oy, p1y, p2y, gye), 3.5, "ice", A); }
      x.fillStyle = col("aqua", 1); x.beginPath(); x.arc(gxe, gye, 5, 0, 7); x.fill();
      x.strokeStyle = col("aqua", .5); x.beginPath(); x.arc(gxe, gye, 11 + A * 5 * (1 + Math.sin(ph * 4)) / 2, 0, 7); x.stroke();
      mono(x, 10); x.fillStyle = col("ink", .6); x.fillText("goal", gxe - 34, gye - 14); x.fillText("CEM × 300", ox + 8, h * .93);
    },
    // the generated mesh turns on itself; the view being "filmed" lights up in turn
    mesh({ x, w, h }, R, ph, A) {
      const cx = w * .5, cy = h * .52, rad = Math.min(w, h) * .34, rot = .6 + ph * .9;
      const N = 14, M = 22, P = [];
      const bump = (u, v) => 1 + .18 * Math.sin(3 * u + 1) * Math.cos(2 * v) + .1 * Math.sin(5 * v);
      for (let i = 0; i <= N; i++) {
        P.push([]);
        for (let j = 0; j <= M; j++) {
          const u = (i / N) * Math.PI, v = (j / M) * Math.PI * 2, b = bump(u, v);
          const X = Math.sin(u) * Math.cos(v) * b, Y = Math.cos(u) * b * 1.05, Z = Math.sin(u) * Math.sin(v) * b;
          const X2 = X * Math.cos(rot) + Z * Math.sin(rot), Z2 = -X * Math.sin(rot) + Z * Math.cos(rot);
          P[i].push([cx + X2 * rad, cy - Y * rad * .95, Z2]);
        }
      }
      const seg = (a, b) => { const z = (a[2] + b[2]) / 2; x.strokeStyle = col(z > 0 ? "sky" : "blue", z > 0 ? .55 : .14); x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); };
      for (let i = 0; i <= N; i++) for (let j = 0; j < M; j++) seg(P[i][j], P[i][j + 1]);
      for (let i = 0; i < N; i++) for (let j = 0; j <= M; j++) seg(P[i][j], P[i + 1][j]);
      for (let i = 1; i < N; i += 2) for (let j = 0; j < M; j += 2) { const p = P[i][j]; if (p[2] > .2) { x.fillStyle = col("aqua", .8); x.beginPath(); x.arc(p[0], p[1], 1.6, 0, 7); x.fill(); } }
      const s = Math.min(w * .09, h * .2), on = Math.floor(ph * 1.5) % 4;
      ["0°", "90°", "180°", "270°"].forEach((lab, k) => {
        const a = w * .05, b = h * .1 + k * (s + 8);
        rr(x, a, b, s, s * .8, 5);
        if (k === on && A > .01) { x.fillStyle = col("sky", .18 * A); x.fill(); x.strokeStyle = col("sky", .35 + .5 * A); } else x.strokeStyle = col("ice", .35);
        x.stroke();
        mono(x, 9); x.fillStyle = col("ink", .55); x.fillText(lab, a + 5, b + 13);
      });
      mono(x, 10); x.fillStyle = col("ink", .55); x.fillText("~16k tris · GLB", w * .76, h * .92);
    },
    // the code -> run -> stderr -> fix loop actually cycles; the terminal cursor blinks
    agent({ x, w, h }, R, ph, A) {
      const cx = w * .3, cy = h * .5, r = Math.min(w * .18, h * .32);
      const nodes = ["code", "run", "stderr", "fix"];
      const ang = -Math.PI / 2 + ph * 2.2, on = Math.round((((ang + Math.PI / 2) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) / (Math.PI / 2)) % 4;
      x.strokeStyle = col("sky", .35); x.lineWidth = 1.5; x.setLineDash([4, 5]); x.lineDashOffset = -ph * 30;
      x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke(); x.setLineDash([]); x.lineDashOffset = 0;
      if (A > .01) glowDot(x, cx + Math.cos(ang) * r, cy + Math.sin(ang) * r, 4, "ice", A);
      nodes.forEach((n, i) => {
        const a = -Math.PI / 2 + i * Math.PI / 2, px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
        x.fillStyle = "rgba(7,21,40,1)"; x.beginPath(); x.arc(px, py, 22, 0, 7); x.fill();
        if (i === on && A > .01) { x.fillStyle = col(i === 2 ? "aqua" : "sky", .22 * A); x.fill(); }
        x.strokeStyle = col(i === 2 ? "aqua" : "sky", .8); x.stroke();
        mono(x, 10); x.fillStyle = col("ink", .85); x.textAlign = "center"; x.fillText(n, px, py + 3.5); x.textAlign = "left";
      });
      const tx = w * .56, ty = h * .16, tw = w * .38, th = h * .68;
      rr(x, tx, ty, tw, th, 10); x.fillStyle = "rgba(3,10,22,.85)"; x.fill(); x.strokeStyle = col("ice", .2); x.stroke();
      const lines = [["$ /code sort without sorted()", "ink", .8], ["attempt 1 · exit 1", "sky", .7], ["NameError: name 'lst'", "aqua", .8], ["attempt 2 · exit 0  ✓", "sky", .9], ["[1, 2, 3]", "ink", .7], ["docker · 0.3 s · no net", "ice", .5]];
      const fs = Math.max(9, Math.min(11, tw / 26));
      mono(x, fs);
      lines.forEach(([s, c, a], i) => { x.fillStyle = col(c, a); x.fillText(s, tx + 12, ty + 24 + i * (th - 30) / 6); });
      if (A > .01 && Math.sin(ph * 9) > 0) { x.fillStyle = col("sky", .8 * A); x.fillRect(tx + 12, ty + 24 + 6 * (th - 30) / 6 - fs + 2, fs * .6, fs); }
    },
    // message passing: nodes breathe and messages flow along the edges
    graph({ x, w, h }, R, ph, A) {
      const n = 18, P = [];
      for (let i = 0; i < n; i++) P.push([w * (.1 + R() * .8), h * (.12 + R() * .76), Math.floor(R() * 3)]);
      const E = [];
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]); if (d < Math.min(w, h) * .42 && R() > .35) E.push([i, j]); }
      const Q = P.map(([a, b, c], i) => [a + A * 4 * Math.sin(ph * 2 + i), b + A * 4 * Math.cos(ph * 1.7 + i * 2), c]);
      E.forEach(([i, j]) => { const cut = Q[i][2] !== Q[j][2]; x.strokeStyle = cut ? col("sky", .45) : col("ink", .1); x.lineWidth = cut ? 1.4 : 1; x.beginPath(); x.moveTo(Q[i][0], Q[i][1]); x.lineTo(Q[j][0], Q[j][1]); x.stroke(); });
      x.lineWidth = 1;
      if (A > .01) E.forEach(([i, j], k) => { let f = (ph * .8 + k * .37) % 1; const [a, b] = k % 2 ? [Q[j], Q[i]] : [Q[i], Q[j]]; x.fillStyle = col("ice", .9 * A * Math.sin(f * Math.PI)); x.beginPath(); x.arc(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, 2, 0, 7); x.fill(); });
      const cols = ["sky", "aqua", "ice"];
      Q.forEach(([a, b, c]) => { x.fillStyle = col(cols[c], 1); x.shadowColor = col(cols[c], .8); x.shadowBlur = 10; x.beginPath(); x.arc(a, b, 5, 0, 7); x.fill(); });
      x.shadowBlur = 0;
      mono(x, 11); x.fillStyle = col("ink", .65); x.fillText("GNN → (γ, β)", w * .05, h * .92);
    },
    // a batch flows through the blocks while the loss point runs down the curve
    blocks({ x, w, h }, R, ph, A) {
      const items = [["Dataset · MNIST", "sky"], ["Linear 784 → 128", "blue"], ["ReLU", "aqua"], ["Linear 128 → 10", "blue"], ["Train · Adam · 5 ep", "sky"]];
      const bw = Math.min(w * .42, 260), bh = Math.min(h * .13, 32), bx = w * .1, on = Math.floor(ph * 2.5) % items.length;
      items.forEach(([lab, c], i) => {
        const by = h * .12 + i * (bh + 6), ix = bx + (i === 2 ? 18 : 0);
        const hot = i === on && A > .01;
        x.fillStyle = col(c, .22 + (hot ? .25 * A : 0)); x.strokeStyle = col(c, .75 + (hot ? .25 * A : 0));
        if (hot) { x.shadowColor = col(c, .8 * A); x.shadowBlur = 14; }
        rr(x, ix, by, bw, bh, 7); x.fill(); x.stroke(); x.shadowBlur = 0;
        x.fillStyle = col(c, .75); x.fillRect(ix + 16, by + bh - 1, 18, 4);
        mono(x, 11); x.fillStyle = col("ink", .9); x.fillText(lab, ix + 12, by + bh / 2 + 4);
      });
      const ax = w * .62, ay = h * .18, aw = w * .32, ah = h * .62;
      x.strokeStyle = col("ink", .15); x.beginPath(); x.moveTo(ax, ay); x.lineTo(ax, ay + ah); x.lineTo(ax + aw, ay + ah); x.stroke();
      const g = x.createLinearGradient(ax, 0, ax + aw, 0); g.addColorStop(0, col("sky", 1)); g.addColorStop(1, col("aqua", 1));
      const pt = (i) => { const py = ay + ah * (1 - Math.exp(-i / 9)) * .85 + Math.sin(i * 1.7) * 2; return [ax + aw * i / 40, ay + ah - (py - ay)]; };
      x.strokeStyle = g; x.lineWidth = 2; x.beginPath();
      for (let i = 0; i <= 40; i++) { const [px, py] = pt(i); i ? x.lineTo(px, py) : x.moveTo(px, py); }
      x.stroke(); x.lineWidth = 1;
      if (A > .01) { const [px, py] = pt((ph * 14) % 40); glowDot(x, px, py, 4, "ice", A); }
      mono(x, 10); x.fillStyle = col("ink", .55); x.fillText("loss · live", ax, ay - 8);
    },
    // a forward pass: a wave of activations crosses the network layer by layer
    nn({ x, w, h }, R, ph, A) {
      const layers = [6, 8, 8, 3], L = [], s = (ph * 1.3) % (layers.length + .4) - .2;
      layers.forEach((n, i) => { L.push([]); for (let j = 0; j < n; j++) L[i].push([w * (.14 + i * .24), h * (.5 + (j - (n - 1) / 2) * Math.min(.1, .8 / n))]); });
      for (let i = 0; i < L.length - 1; i++) L[i].forEach((a) => L[i + 1].forEach((b) => {
        const v = R(), f = s - i;
        x.strokeStyle = col(v > .5 ? "sky" : "aqua", v * .35 + (f > 0 && f < 1 ? A * .25 * v : 0)); x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        if (A > .01 && v > .55 && f > 0 && f < 1) { x.fillStyle = col("ice", A * .9); x.beginPath(); x.arc(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, 1.8, 0, 7); x.fill(); }
      }));
      L.forEach((layer, i) => { const hot = A * Math.max(0, 1 - Math.abs(s - i) * 1.5); layer.forEach(([a, b]) => { x.fillStyle = "rgba(7,21,40,1)"; x.beginPath(); x.arc(a, b, 5, 0, 7); x.fill(); if (hot > .01) { x.fillStyle = col("sky", .7 * hot); x.fill(); } x.strokeStyle = col("ice", .8); x.stroke(); }); });
      mono(x, 10); x.fillStyle = col("ink", .55); x.fillText("∂L/∂W · NumPy", w * .05, h * .93);
    },
    // two teams of players move around the map, resources flicker
    swarm({ x, w, h }, R, ph, A) {
      const s = 22;
      x.strokeStyle = col("ink", .06);
      for (let a = 0; a < w; a += s) { x.beginPath(); x.moveTo(a, 0); x.lineTo(a, h); x.stroke(); }
      for (let b = 0; b < h; b += s) { x.beginPath(); x.moveTo(0, b); x.lineTo(w, b); x.stroke(); }
      for (let k = 0; k < 30; k++) { x.fillStyle = col("ice", .25 + A * .2 * Math.sin(ph * 3 + k)); x.fillRect(Math.floor(R() * w / s) * s + 8, Math.floor(R() * h / s) * s + 8, 6, 6); }
      [[w * .3, h * .45, "sky"], [w * .68, h * .55, "aqua"]].forEach(([gx, gy, c], gi) => {
        const pts = [];
        for (let k = 0; k < 6; k++) pts.push([gx + (R() - .5) * w * .2 + A * w * .03 * Math.sin(ph * 1.5 + k + gi * 2), gy + (R() - .5) * h * .45 + A * h * .05 * Math.cos(ph * 1.3 + k * 1.7)]);
        pts.forEach((p, i) => pts.slice(i + 1).forEach((q) => { x.strokeStyle = col(c, .22); x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(q[0], q[1]); x.stroke(); }));
        pts.forEach(([a, b]) => { x.fillStyle = col(c, 1); x.shadowColor = col(c, .9); x.shadowBlur = 8; x.beginPath(); x.arc(a, b, 4, 0, 7); x.fill(); });
        x.shadowBlur = 0;
      });
      mono(x, 10); x.fillStyle = col("ink", .55); x.fillText("broadcast · incantation", w * .05, h * .93);
    },
    // the bodies orbit for real
    orbits({ x, w, h }, R, ph, A) {
      const cx = w * .5, cy = h * .52, cr = 26 + A * 3 * Math.sin(ph * 3);
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, cr); g.addColorStop(0, col("ice", 1)); g.addColorStop(1, col("sky", 0));
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, cr, 0, 7); x.fill();
      [[.18, .1, .3], [.3, .18, -.4], [.42, .26, .15]].forEach(([rx, ry, rot], i) => {
        x.save(); x.translate(cx, cy); x.rotate(rot);
        x.strokeStyle = col("sky", .22); x.beginPath(); x.ellipse(0, 0, w * rx, h * ry * 1.6, 0, 0, 7); x.stroke();
        const a0 = R() * 6 + ph * (1.6 - i * .4);
        for (let k = 0; k < 26; k++) { const a = a0 - k * .05; x.fillStyle = col(i % 2 ? "aqua" : "sky", (1 - k / 26) * .8); x.beginPath(); x.arc(Math.cos(a) * w * rx, Math.sin(a) * h * ry * 1.6, 3 - k * .09, 0, 7); x.fill(); }
        x.restore();
      });
      mono(x, 10); x.fillStyle = col("ink", .55); x.fillText("F = G·m₁m₂/r² · Euler", w * .05, h * .93);
    }
  };

  /* ---------------- Hero: latent space ---------------- */
  function latent() {
    const cv = $("#latent");
    const x = cv.getContext("2d");
    let w = 0, h = 0, d = 1, P = [], centers = [], running = false, visible = true, t0 = performance.now();
    const mouse = { x: -1e4, y: -1e4 };
    const palette = ["sky", "aqua", "ice", "blue"];
    function size() {
      const r = cv.getBoundingClientRect();
      d = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * d); cv.height = Math.round(h * d);
      x.setTransform(d, 0, 0, d, 0, 0);
      const k = w < 700 ? 3 : 4;
      centers = Array.from({ length: k }, (_, i) => ({ i, ph: i * 1.7, sx: .45 + i * .13, sy: .3 + i * .21 }));
      const n = Math.min(170, Math.round((w * h) / 7500));
      P = Array.from({ length: n }, () => spawn());
    }
    function centerPos(c, t) {
      const bx = w * (w < 700 ? .5 : .66), by = h * .45;
      return [bx + Math.cos(t * .00009 * (1 + c.i * .3) + c.ph) * w * (w < 700 ? .32 : .22), by + Math.sin(t * .00012 * (1 + c.i * .2) + c.ph * 1.3) * h * .3];
    }
    function spawn(px, py, ci) {
      const c = ci ?? Math.floor(Math.random() * centers.length);
      const ang = Math.random() * 7, rad = Math.abs(gauss()) * Math.min(w, h) * .11;
      const [cx, cy] = centerPos(centers[c], performance.now() - t0);
      return { c, ox: Math.cos(ang) * rad, oy: Math.sin(ang) * rad, x: px ?? cx + Math.cos(ang) * rad, y: py ?? cy + Math.sin(ang) * rad, vx: 0, vy: 0, r: 1 + Math.random() * 1.6, born: performance.now() };
    }
    function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function frame(now) {
      if (!running) return;
      const t = now - t0;
      x.clearRect(0, 0, w, h);
      const cpos = centers.map((c) => centerPos(c, t));
      for (const p of P) {
        const [cx, cy] = cpos[p.c];
        p.vx += (cx + p.ox - p.x) * .0016; p.vy += (cy + p.oy - p.y) * .0016;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, dd = dx * dx + dy * dy;
        if (dd < 22000) { const f = (1 - dd / 22000) * .9; const m = Math.sqrt(dd) || 1; p.vx += dx / m * f; p.vy += dy / m * f; }
        p.vx *= .9; p.vy *= .9; p.x += p.vx; p.y += p.vy;
      }
      const R2 = Math.min(95, w * .09) ** 2;
      x.lineWidth = 1;
      for (let i = 0; i < P.length; i++) {
        const a = P[i];
        for (let j = i + 1; j < P.length; j++) {
          const b = P[j], dx = a.x - b.x, dy = a.y - b.y, dd = dx * dx + dy * dy;
          if (dd < R2) { x.strokeStyle = col(a.c === b.c ? palette[a.c] : "blue", (1 - dd / R2) * (a.c === b.c ? .3 : .12)); x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); }
        }
      }
      for (const p of P) {
        const fresh = Math.min(1, Math.max(0, 1 - (now - p.born) / 1400));
        x.fillStyle = col(palette[p.c], .75 + fresh * .25);
        x.beginPath(); x.arc(p.x, p.y, p.r + fresh * 2.5, 0, 7); x.fill();
      }
      mono(x, 11);
      cpos.forEach(([cx, cy], i) => {
        x.strokeStyle = col("ink", .35); x.beginPath(); x.moveTo(cx - 5, cy); x.lineTo(cx + 5, cy); x.moveTo(cx, cy - 5); x.lineTo(cx, cy + 5); x.stroke();
        x.fillStyle = col("ink", .4); x.fillText(`z${i}`, cx + 8, cy - 8);
      });
      if (!reduced) requestAnimationFrame(frame); else running = false;
    }
    function start() { if (!running && visible && !document.hidden) { running = true; requestAnimationFrame(frame); } }
    function stop() { running = false; }
    size();
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(cv);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    addEventListener("resize", () => { size(); if (reduced) { running = true; requestAnimationFrame(frame); } });
    const hero = $(".hero");
    hero.addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -1e4; });
    cv.addEventListener("click", (e) => {
      const r = cv.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
      const t = performance.now() - t0;
      let best = 0, bd = Infinity;
      centers.forEach((c, i) => { const [cx, cy] = centerPos(c, t); const dd = (cx - px) ** 2 + (cy - py) ** 2; if (dd < bd) { bd = dd; best = i; } });
      for (let k = 0; k < 10; k++) P.push(spawn(px + (Math.random() - .5) * 20, py + (Math.random() - .5) * 20, best));
      if (P.length > 260) P.splice(0, P.length - 260);
      if (reduced) { running = true; requestAnimationFrame(frame); }
    });
    start();
  }

  /* ---------------- Boot ---------------- */
  renderAll();
  latent();
  const deep = location.hash.match(/^#p\/([\w-]+)$/);
  if (deep) { $("#projects").scrollIntoView(); openPanel(deep[1]); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { drawAllVisuals(document); moveNavInd(); moveFilterInd(); });
})();

/* Info Tech Fly - Roadmaps page
   Search + category filter + pagination (6 per page), all on the same page.

   HOW TO ADD A ROADMAP
   1. Create the page, e.g. roadmaps/webdev.html (copy roadmap-page-template.html)
   2. Add one object to ROADMAPS below
   3. Add the page to sitemap.xml
   Everything else (cards, search, pages 1 2 3 ..., categories) updates by itself. */
(() => {
  "use strict";

  const SITE = "https://www.infotechfly.com/";
  const PER_PAGE = 6;

  /* ---------------------------------------------------------------
     YOUR ROADMAPS (empty for now). Example:

     {
       title: "Web Development Roadmap",
       url: "roadmaps/webdev.html",          // path from the site root
       icon: "fa-solid fa-code",             // any Font Awesome icon
       tag: "Development",                   // category chip
       level: "Beginner",                    // optional
       duration: "6 months",                 // optional
       summary: "HTML, CSS, JavaScript, backend and deployment in clear steps.",
       keywords: ["webdev", "web development", "html", "css", "javascript", "frontend", "backend"]
     },
     {
       title: "Cybersecurity Roadmap",
       url: "roadmaps/cybersec.html",
       icon: "fa-solid fa-shield-halved",
       tag: "Security",
       level: "Beginner",
       duration: "8 months",
       summary: "Networking, Linux, ethical hacking and defence from zero.",
       keywords: ["cybersec", "cyber security", "hacking", "pentest", "infosec"]
     },
  --------------------------------------------------------------- */
  const ROADMAPS = [];

  /* Short words people type -> full words (search also understands these) */
  const ALIASES = {
    webdev: ["web development", "website", "frontend", "backend", "fullstack"],
    web: ["website", "web development"],
    dev: ["development", "developer"],
    cybersec: ["cybersecurity", "cyber security", "security", "hacking"],
    infosec: ["cybersecurity", "security"],
    sec: ["security"],
    hacking: ["ethical hacking", "pentest", "penetration testing"],
    pentest: ["penetration testing", "ethical hacking"],
    js: ["javascript"],
    py: ["python"],
    ml: ["machine learning"],
    ai: ["artificial intelligence", "machine learning"],
    devops: ["docker", "ci cd", "aws", "cloud"],
    cloud: ["aws", "hosting", "deployment"],
    wp: ["wordpress"],
    app: ["application", "software"],
    apps: ["application", "software"]
  };

  document.addEventListener("DOMContentLoaded", () => {
    const $ = (s) => document.querySelector(s);
    const grid = $("#rmGrid");
    if (!grid) return;
    const form = $("#rmForm"), input = $("#rmQ"), clear = $("#rmClear"),
      chipsEl = $("#rmChips"), count = $("#rmCount"), empty = $("#rmEmpty"),
      pager = $("#rmPager"), bar = $("#rmBar");
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

    /* ---------- helpers ---------- */
    const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const norm = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
    const compact = (s) => norm(s).replace(/[^a-z0-9+#]/g, "");
    const words = (s) => norm(s).split(/[^a-z0-9+#]+/).filter(Boolean);

    /* tiny typo tolerance: true when edit distance is 0 or 1 */
    const near = (a, b) => {
      if (a === b) return true;
      if (Math.abs(a.length - b.length) > 1) return false;
      let i = 0, j = 0, miss = 0;
      while (i < a.length && j < b.length) {
        if (a[i] === b[j]) { i++; j++; continue; }
        if (++miss > 1) return false;
        if (a.length > b.length) i++;
        else if (a.length < b.length) j++;
        else { i++; j++; }
      }
      return miss + (a.length - i) + (b.length - j) <= 1;
    };

    /* ---------- search index ---------- */
    const DATA = ROADMAPS.map((r, i) => {
      const kw = (r.keywords || []).join(" ");
      return Object.assign({}, r, {
        _i: i,
        _title: compact(r.title),
        _tag: compact(r.tag),
        _key: compact(kw),
        _all: compact([r.title, r.tag, r.summary, kw, r.level].join(" ")),
        _words: [...new Set(words([r.title, r.tag, kw].join(" ")))]
      });
    });

    const fieldScore = (r, c) => {
      if (r._title.includes(c)) return r._title.startsWith(c) ? 12 : 9;
      if (r._key.includes(c)) return 7;
      if (r._tag.includes(c)) return 6;
      if (r._all.includes(c)) return 3;
      return 0;
    };
    const tokScore = (r, t) => {
      const c = compact(t);
      if (!c) return 1;
      let s = fieldScore(r, c);
      if (!s && ALIASES[c]) for (const a of ALIASES[c]) s = Math.max(s, fieldScore(r, compact(a)) * 0.8);
      if (!s && c.length >= 4) for (const w of r._words) if (near(c, w)) { s = 1.5; break; }
      return s;
    };
    const search = (list, q) => {
      const toks = words(q);
      if (!toks.length) return list;
      const out = [];
      for (const r of list) {
        let total = 0, ok = true;
        for (const t of toks) { const s = tokScore(r, t); if (!s) { ok = false; break; } total += s; }
        if (ok) out.push({ r, s: total });
      }
      return out.sort((a, b) => b.s - a.s || a.r._i - b.r._i).map((x) => x.r);
    };

    /* ---------- state (kept in the URL so links can be shared) ---------- */
    const cats = [...new Set(DATA.map((r) => r.tag).filter(Boolean))].sort();
    const qs = new URLSearchParams(location.search);
    const state = {
      q: (qs.get("q") || "").slice(0, 60),
      cat: cats.includes(qs.get("cat")) ? qs.get("cat") : "",
      page: parseInt(qs.get("page"), 10) || 1
    };
    const sync = () => {
      const p = new URLSearchParams();
      if (state.q) p.set("q", state.q);
      if (state.cat) p.set("cat", state.cat);
      if (state.page > 1) p.set("page", state.page);
      const s = p.toString();
      try { history.replaceState(null, "", location.pathname + (s ? "?" + s : "")); } catch (e) {}
    };

    /* ---------- pieces of UI ---------- */
    const card = (r) => {
      const meta = [
        r.level && `<span><i class="fa-solid fa-signal"></i>${esc(r.level)}</span>`,
        r.duration && `<span><i class="fa-regular fa-clock"></i>${esc(r.duration)}</span>`
      ].filter(Boolean).join("");
      return `<a class="card rm-card" href="${esc(r.url)}">
        <div class="ic"><i class="${esc(r.icon || "fa-solid fa-route")}"></i></div>
        ${r.tag ? `<span class="tag">${esc(r.tag)}</span>` : ""}
        <h3>${esc(r.title)}</h3><p>${esc(r.summary)}</p>
        ${meta ? `<div class="rm-meta">${meta}</div>` : ""}
        <span class="more">View roadmap <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span></a>`;
    };

    const pagerHTML = (cur, n) => {
      const b = (p, label, cls, dis, extra) =>
        `<button type="button" class="rm-pg ${cls || ""}" data-p="${p}"${dis ? " disabled" : ""} ${extra || ""}>${label}</button>`;
      let h = b(cur - 1, '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i><span>Prev</span>', "nav", cur === 1, 'aria-label="Previous page"');
      let prev = 0;
      [...new Set([1, n, cur - 1, cur, cur + 1])].filter((p) => p >= 1 && p <= n).sort((a, b2) => a - b2).forEach((p) => {
        if (p - prev > 1) h += '<span class="rm-dots" aria-hidden="true">&hellip;</span>';
        h += b(p, p, p === cur ? "on" : "", false, `aria-label="Page ${p}"${p === cur ? ' aria-current="page"' : ""}`);
        prev = p;
      });
      h += b(cur + 1, '<span>Next</span><i class="fa-solid fa-chevron-right" aria-hidden="true"></i>', "nav", cur === n, 'aria-label="Next page"');
      return h;
    };

    const chipsHTML = () => {
      if (cats.length < 2) { chipsEl.hidden = true; return; }
      chipsEl.hidden = false;
      const c = (label, val) =>
        `<button type="button" class="rm-chip${state.cat === val ? " on" : ""}" data-cat="${esc(val)}" aria-pressed="${state.cat === val}">${esc(label)}</button>`;
      chipsEl.innerHTML = c("All", "") + cats.map((t) => c(t, t)).join("");
    };

    const showEmpty = (type) => {
      if (type === "none") {
        empty.innerHTML = `<div class="rm-eic"><i class="fa-solid fa-route"></i></div>
          <h3>Roadmaps are coming soon</h3>
          <p>We are preparing clear, step-by-step roadmaps. Tell us what you want to learn and we will prioritise it.</p>
          <div class="row"><a class="btn" href="contact.html"><i class="fa-solid fa-paper-plane"></i> Request a roadmap</a></div>`;
      } else {
        empty.innerHTML = `<div class="rm-eic"><i class="fa-solid fa-magnifying-glass"></i></div>
          <h3>No roadmaps found</h3>
          <p>Nothing matched ${state.q ? "&ldquo;" + esc(state.q) + "&rdquo;" : "this filter"}. Try a shorter keyword like <b>web</b>, <b>security</b> or <b>cloud</b>.</p>
          <div class="row"><button type="button" class="btn out" data-reset>Clear search</button>
          <a class="btn" href="contact.html">Request this roadmap</a></div>`;
      }
      empty.hidden = false;
    };

    /* ---------- render ---------- */
    const render = (scroll) => {
      let list = state.cat ? DATA.filter((r) => r.tag === state.cat) : DATA;
      list = search(list, state.q);
      const total = list.length, pages = Math.max(1, Math.ceil(total / PER_PAGE));
      state.page = Math.min(Math.max(1, state.page), pages);
      const start = (state.page - 1) * PER_PAGE, items = list.slice(start, start + PER_PAGE);

      grid.innerHTML = items.map(card).join("");
      empty.hidden = true;
      if (!DATA.length) { showEmpty("none"); count.textContent = ""; }
      else if (!total) { showEmpty("search"); count.textContent = "0 roadmaps found"; }
      else {
        count.textContent = `Showing ${start + 1}-${start + items.length} of ${total} roadmap${total > 1 ? "s" : ""}` +
          (state.q ? ` for "${state.q}"` : "") + (state.cat ? ` in ${state.cat}` : "");
      }

      pager.hidden = pages <= 1;
      pager.innerHTML = pages > 1 ? pagerHTML(state.page, pages) : "";
      chipsHTML();
      sync();
      if (window.flyCards) window.flyCards(grid);   /* same fly-in animation as the rest of the site */
      if (scroll) bar.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };

    /* ---------- events ---------- */
    let dt;
    const onType = () => {
      clear.hidden = !input.value;
      form.classList.toggle("has-q", !!input.value);
      clearTimeout(dt);
      dt = setTimeout(() => { state.q = input.value.trim().slice(0, 60); state.page = 1; render(false); }, 130);
    };
    input.addEventListener("input", onType);
    form.addEventListener("submit", (e) => { e.preventDefault(); clearTimeout(dt); state.q = input.value.trim(); state.page = 1; render(false); input.blur(); });

    const reset = () => {
      input.value = ""; state.q = ""; state.cat = ""; state.page = 1;
      clear.hidden = true; form.classList.remove("has-q");
      render(false); input.focus();
    };
    clear.addEventListener("click", reset);
    empty.addEventListener("click", (e) => { if (e.target.closest("[data-reset]")) reset(); });

    input.addEventListener("keydown", (e) => { if (e.key === "Escape" && input.value) { e.preventDefault(); reset(); } });
    document.addEventListener("keydown", (e) => {
      const t = e.target, typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); input.focus(); }
    });

    chipsEl.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      state.cat = b.dataset.cat; state.page = 1; render(false);
    });
    pager.addEventListener("click", (e) => {
      const b = e.target.closest("[data-p]");
      if (!b || b.disabled) return;
      state.page = +b.dataset.p; render(true);
    });

    /* ---------- SEO: list every roadmap for search engines (all pages, not just page 1) ---------- */
    if (DATA.length) {
      const ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Info Tech Fly roadmaps",
        itemListElement: DATA.map((r, i) => ({
          "@type": "ListItem", position: i + 1, name: r.title, url: new URL(r.url, SITE).href
        }))
      });
      document.head.appendChild(ld);
    }

    /* ---------- start ---------- */
    input.value = state.q;
    clear.hidden = !state.q;
    form.classList.toggle("has-q", !!state.q);
    render(false);
  });
})();
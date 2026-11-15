/* Info Tech Fly - Python Full Stack roadmap page

   WHAT THIS FILE DOES
   - Shows the 9 steps as a left / right slider (swipe, arrow keys, small arrows above the step, Next / Previous).
   - Topic bar at the top: click a title and jump straight to that step.
   - Hindi / English switch above the videos of every topic (plus one global switch at the top).
     Hindi is written in English letters ("Hindi"), and the Fly developer talks Hinglish in Hindi mode.
   - Fly developer widget on the right side, with a tip for every step and a "Next step" button.
   - Ticked steps and the chosen language are saved in the visitor's browser.
   - Welcome loader (same as the home page) plays once per browser tab, then sections slide in while scrolling.
   - Start / Continue Learning button opens the right step and scrolls down to it.

   HOW TO EDIT
   - Every step is in STEPS below. Each topic group has:
       t  = topic chips,  v = videos {hi:[...], en:[...]},  n = notes [["Label","url"], ...]
   - A video is either a YouTube video ID  ("qQEigNVHlX8")  -> shown as a thumbnail, click to play
     or a search text starting with "?"    ("?flask full course hindi") -> shows a "Find on YouTube" button.
     When you find the real video, replace the "?..." text with its video ID. Nothing else to change.
   - Developer tips are in TIPS (English and Hinglish). */
(() => {
  "use strict";

  const KEY = "itf-pfs-done", LKEY = "itf-pfs-lang";
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

  const STEPS = [
    { title: "Python Basics",
      goal: "Learn a little, then build a small project. Mini projects: Calculator, To-Do CLI app, Number guessing game.",
      groups: [
        { h: "Core Python", t: ["Variables, data types, operators", "if/else, loops", "Functions, lambda, *args, **kwargs", "List, tuple, set, dict, comprehensions", "String methods, file handling", "try/except", "Modules, pip, venv", "OOP: classes, inheritance, polymorphism", "JSON, datetime, os, requests"],
          v: { hi: ["qQEigNVHlX8", "6l2amPHwoUI"], en: ["j_JuhAWlEaI"] },
          n: [["Official tutorial", "https://docs.python.org/3/tutorial/"], ["W3Schools Python", "https://www.w3schools.com/python/"], ["GeeksforGeeks Python", "https://www.geeksforgeeks.org/python/python-programming-language-tutorial/"], ["Real Python", "https://realpython.com/"]] }
      ] },
    { title: "Git & Tools",
      goal: "Save your code with Git, share it on GitHub and get comfortable with your editor and API testing.",
      groups: [
        { h: "Git & GitHub", t: ["init, add, commit", "branch, merge, pull request", "Push code, README, open source basics"],
          v: { hi: ["WMWv-WpSXF8"], en: ["mAFoROnOfHs"] },
          n: [["Pro Git book (free)", "https://git-scm.com/book/en/v2"], ["GitHub Docs", "https://docs.github.com/en/get-started"], ["W3Schools Git", "https://www.w3schools.com/git/"]] },
        { h: "VS Code & terminal", t: ["VS Code setup", "Command line basics"],
          v: { hi: ["fSQMBZ089HY"], en: ["lWEKiak0WVU"] },
          n: [["VS Code docs", "https://code.visualstudio.com/docs"]] },
        { h: "Postman (API testing)", t: ["Send requests", "Collections", "Auth headers"],
          v: { hi: ["lId_LdQ8wXU"], en: ["VywxIQ2ZXw4"] },
          n: [["Postman docs", "https://learning.postman.com/docs/getting-started/introduction/"]] }
      ] },
    { title: "Frontend Basics",
      goal: "Build pages that look good on every screen. Mini projects: Portfolio website, Login/Register UI, Weather app, Responsive landing page.",
      groups: [
        { h: "HTML", t: ["Tags, forms, tables", "Semantic HTML"],
          v: { hi: ["zysUIv0-xak"], en: ["kUMe1FH4CHE"] },
          n: [["MDN HTML", "https://developer.mozilla.org/en-US/docs/Learn/HTML"], ["W3Schools HTML", "https://www.w3schools.com/html/"]] },
        { h: "CSS", t: ["Selectors, box model", "Flexbox, Grid", "Responsive design, media queries", "Bootstrap or Tailwind CSS"],
          v: { hi: ["ksD9g8cT8lI"], en: ["-G-zic_LS0A"] },
          n: [["MDN CSS", "https://developer.mozilla.org/en-US/docs/Learn/CSS"], ["W3Schools CSS", "https://www.w3schools.com/css/"], ["Flexbox guide", "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"], ["Grid guide", "https://css-tricks.com/snippets/css/complete-guide-grid/"], ["Bootstrap", "https://getbootstrap.com/docs/5.3/getting-started/introduction/"], ["Tailwind", "https://tailwindcss.com/docs"]] },
        { h: "JavaScript", t: ["Variables, functions, arrays, objects", "DOM, events", "ES6+: arrow functions, destructuring, spread, modules", "Promises, async/await, fetch API", "LocalStorage"],
          v: { hi: ["6_NrgoEkjnE"], en: ["C3weqS-QDRY"] },
          n: [["JavaScript.info (best)", "https://javascript.info/"], ["MDN JavaScript", "https://developer.mozilla.org/en-US/docs/Learn/JavaScript"], ["W3Schools JS", "https://www.w3schools.com/js/"]] },
        { h: "React JS (optional, recommended)", t: ["Components, props, state, hooks", "React Router", "API calls with axios/fetch"],
          v: { hi: ["lzF9GxGn7Bs"], en: ["zWA10joj0JU"] },
          n: [["React docs", "https://react.dev/learn"], ["React Router", "https://reactrouter.com/"], ["W3Schools React", "https://www.w3schools.com/react/"]] }
      ] },
    { title: "Backend with Python",
      goal: "Start with Flask (simple), then learn Django (full featured). Mini projects: Blog app, Notes app with login, REST API for products, Dashboard with roles and OTP login.",
      groups: [
        { h: "Flask", t: ["Routes, Jinja2 templates, forms", "Request/response, sessions, cookies", "Blueprints, file uploads", "Flask-SQLAlchemy, Flask-Login, Flask-Mail", "REST API creation"],
          v: { hi: ["QZfaRHzWM0k"], en: ["oQ5UfJqW5Jo"] },
          n: [["Flask docs", "https://flask.palletsprojects.com/"], ["Official tutorial", "https://flask.palletsprojects.com/en/stable/tutorial/"], ["Flask-SQLAlchemy", "https://flask-sqlalchemy.palletsprojects.com/"], ["Flask-Login", "https://flask-login.readthedocs.io/"], ["Flask-Mail", "https://flask-mail.readthedocs.io/"]] },
        { h: "Django", t: ["Project and app structure, MVT", "Models, migrations, ORM", "Views, URLs, templates", "Forms, authentication, user roles", "Admin panel", "Django REST Framework", "JWT authentication"],
          v: { hi: ["iflSRpcyzdI"], en: ["u1GnZfDw5LU"] },
          n: [["Official tutorial", "https://docs.djangoproject.com/en/stable/intro/tutorial01/"], ["Django docs", "https://docs.djangoproject.com/"], ["DRF quickstart", "https://www.django-rest-framework.org/tutorial/quickstart/"], ["Simple JWT", "https://django-rest-framework-simplejwt.readthedocs.io/"], ["W3Schools Django", "https://www.w3schools.com/django/"]] },
        { h: "FastAPI (optional, modern and fast)", t: ["Path/query params, Pydantic models", "Async APIs", "Automatic Swagger docs"],
          v: { hi: ["fxRCoEUmq8s"], en: ["Lu8lXXlstvM"] },
          n: [["FastAPI tutorial", "https://fastapi.tiangolo.com/tutorial/"], ["Pydantic", "https://docs.pydantic.dev/"]] }
      ] },
    { title: "Databases",
      goal: "Store and query data with SQL, then learn NoSQL, caching and ORMs.",
      groups: [
        { h: "SQL (MySQL or PostgreSQL)", t: ["Tables, CRUD, primary/foreign keys", "Joins, group by, indexes", "Normalization, transactions"],
          v: { hi: ["1egh1UTNTdE"], en: ["Jc_VG0DM6rI"] },
          n: [["Practice SQL online", "https://sqlbolt.com/"], ["W3Schools SQL", "https://www.w3schools.com/sql/"], ["PostgreSQL tutorial", "https://www.postgresqltutorial.com/"], ["MySQL docs", "https://dev.mysql.com/doc/refman/8.0/en/tutorial.html"]] },
        { h: "NoSQL: MongoDB", t: ["Collections, documents, queries"],
          v: { hi: ["M1dKYQ7GsTg"], en: ["p1NEtNmO33s"] },
          n: [["MongoDB University (free)", "https://learn.mongodb.com/"], ["Manual", "https://www.mongodb.com/docs/manual/"], ["W3Schools MongoDB", "https://www.w3schools.com/mongodb/"]] },
        { h: "SQLite", t: ["Small projects", "Python sqlite3"],
          v: { hi: ["V6SaJAs4_lo"], en: ["cOzkDYN6cEo"] },
          n: [["sqlite3 docs", "https://docs.python.org/3/library/sqlite3.html"]] },
        { h: "Redis (caching)", t: ["Keys, strings, expiry", "Cache basics"],
          v: { hi: ["Vx2zPMPvmug"], en: ["Xw1Lv66noEY"] },
          n: [["Redis docs", "https://redis.io/docs/latest/develop/get-started/"]] },
        { h: "ORM (Django ORM / SQLAlchemy)", t: ["Models and queries", "Relationships"],
          v: { hi: ["1H8MQkn90SA"], en: ["fue6An_UnV0"] },
          n: [["Django ORM", "https://docs.djangoproject.com/en/stable/topics/db/queries/"], ["SQLAlchemy", "https://docs.sqlalchemy.org/en/20/tutorial/"]] }
      ] },
    { title: "APIs & Security",
      goal: "Build safe APIs. Learn how login, tokens and the most common attacks work.",
      groups: [
        { h: "REST, auth and web security", t: ["REST principles, HTTP methods, status codes", "Sessions, JWT, OAuth basics", "Password hashing (bcrypt), OTP verification", "CORS, CSRF, XSS, SQL injection basics", "Input validation, .env files", "Rate limiting, Swagger docs"],
          v: { hi: ["T2hYvBShkh8", "xrj3zzaqODw", "HFLLiZV9csc"], en: ["ukBCjzC_C6w", "wUaeKEl1RCw"] },
          n: [["HTTP basics (MDN)", "https://developer.mozilla.org/en-US/docs/Web/HTTP"], ["HTTP status codes", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"], ["JWT intro", "https://jwt.io/introduction"], ["OWASP Top 10", "https://owasp.org/www-project-top-ten/"], ["CORS", "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"], ["Swagger / OpenAPI", "https://swagger.io/docs/"], ["python-dotenv", "https://pypi.org/project/python-dotenv/"]] }
      ] },
    { title: "Testing & Deployment",
      goal: "Test your code and put your project live on the internet.",
      groups: [
        { h: "Testing", t: ["unittest, pytest", "Django test client"],
          v: { hi: ["leQOmxftqF8"], en: ["yA5jqNCCOLE", "R3TF2EBtF2w","FDGYhuCOgEY", "VAKPLodocPs", "6_ngzfZygGg", "PIwyrzCLTCI", "OH4A-D5nAI4", "ykU876RAZCk"] },
          n: [["pytest", "https://docs.pytest.org/en/stable/getting-started.html"], ["unittest", "https://docs.python.org/3/library/unittest.html"], ["Django testing", "https://docs.djangoproject.com/en/stable/topics/testing/"]] },
        { h: "Docker", t: ["Dockerfile", "docker-compose"],
          v: { hi: ["exmSJpJvIPs"], en: ["_YEUMen_khg"] },
          n: [["Docker get started", "https://docs.docker.com/get-started/"]] },
        { h: "Linux, Nginx, Gunicorn", t: ["Linux commands", "Nginx", "Gunicorn"],
          v: { hi: ["uzUUZGYruqU"], en: ["eIxdZlvZGik"] },
          n: [["Nginx beginners guide", "https://nginx.org/en/docs/beginners_guide.html"], ["Gunicorn", "https://docs.gunicorn.org/en/stable/"]] },
        { h: "Deploy: Render, Railway, PythonAnywhere, VPS", t: ["Free hosting", "VPS on AWS / DigitalOcean"],
          v: { hi: ["MObF4MKaY0E"], en: ["k-OmuKuBSVY"] },
          n: [["Render", "https://render.com/docs"], ["Railway", "https://docs.railway.com/"], ["PythonAnywhere", "https://help.pythonanywhere.com/"], ["DigitalOcean", "https://docs.digitalocean.com/"]] },
        { h: "CI/CD with GitHub Actions", t: ["Workflows", "Auto test and deploy"],
          v: { hi: ["y7S2oSjJ8PA"], en: ["0PbxpIao_EU"] },
          n: [["GitHub Actions quickstart", "https://docs.github.com/en/actions/quickstart"]] },
        { h: "Domain and SSL", t: ["Domain setup", "HTTPS", "Environment configuration"],
          v: {}, n: [["Let's Encrypt", "https://letsencrypt.org/getting-started/"]] }
      ] },
    { title: "DSA & Core Concepts",
      goal: "Think like an engineer and get ready for interviews.",
      groups: [
        { h: "Data structures and algorithms", t: ["Arrays, strings, hashmaps, stacks, queues", "Sorting, searching, recursion", "LeetCode easy / medium"],
          v: { hi: ["mj4kU-XDI3I"], en: ["tHUNg8GdRQs", "11KwUOPj6Mw", "fEaLAs3lzo0", "iSdv0IMef1E", "9yeVEqaXoNg", "hpq9FzSfB7k"] },
          n: [["NeetCode roadmap", "https://neetcode.io/roadmap"], ["GeeksforGeeks DSA", "https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/"], ["LeetCode", "https://leetcode.com/problemset/"]] },
        { h: "System design and clean code", t: ["System design basics", "Clean code", "Design patterns"],
          v: { hi: ["lFeYU31TnQ8"],en: ["Vnm-ycSfJx4"] },
          n: [["Design patterns", "https://refactoring.guru/design-patterns"], ["System design primer", "https://github.com/donnemartin/system-design-primer"]] }
      ] },
    { title: "Advanced (Optional)",
      goal: "Add these when you are comfortable with the steps above.",
      groups: [
        { h: "Celery + Redis", t: ["Background tasks"], v: { hi: ["BGiQJgWukRA"], en: ["jr088_AQMZ8"] }, n: [["Celery docs", "https://docs.celeryq.dev/en/stable/getting-started/introduction.html"]] },
        { h: "WebSockets", t: ["Real-time chat and notifications"], v: { hi: ["WS352jTTkPU"],en: ["4jMuHO8Dv1o"] }, n: [["Channels tutorial", "https://channels.readthedocs.io/en/stable/tutorial/index.html"]] },
        { h: "Payment gateway", t: ["Razorpay", "Stripe"], v: { hi: ["76wFPk4JxKo"], en: ["722A27IoQnk"] },
          n: [["Razorpay", "https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/"], ["Stripe", "https://docs.stripe.com/payments/quickstart"]] },
        { h: "Email / SMS, caching, pagination", t: ["Email and SMS", "Caching", "Pagination, search"], v: {hi: ["xpD7U96rQWs"], en: ["f2vHJHp_OgU"]},
          n: [["Django email", "https://docs.djangoproject.com/en/stable/topics/email/"], ["Twilio SMS", "https://www.twilio.com/docs/messaging/quickstart"], ["Django cache", "https://docs.djangoproject.com/en/stable/topics/cache/"], ["DRF pagination", "https://www.django-rest-framework.org/api-guide/pagination/"]] },
        { h: "Cloud basics", t: ["AWS S3", "AWS EC2"], v: { hi: ["9vK7fwAhVtA", "Ens8asZLomk"], en: ["lKPnz27rCPQ", "r_Xasz7hJSU"] }, n: [["AWS docs", "https://docs.aws.amazon.com/"]] },
        { h: "TypeScript & Next.js", t: ["TypeScript", "Next.js"],
          v: { hi: ["luxJgUVwAIM", "yKuBE7TJm7M"], en: ["BeGRq7BPsd8", "ETV17M4SauU"] },
          n: [["TypeScript handbook", "https://www.typescriptlang.org/docs/handbook/intro.html"], ["Next.js learn", "https://nextjs.org/learn"]] }
      ] }
  ];

  const SKILLS = [
    ["fa-brands fa-python", "Python", "OOP, venv, pip"],
    ["fa-brands fa-js", "Frontend", "HTML, CSS, JS, React"],
    ["fa-solid fa-server", "Backend", "Flask, Django, FastAPI"],
    ["fa-solid fa-database", "Databases", "SQL, MongoDB, Redis"],
    ["fa-solid fa-lock", "Security", "JWT, OTP, OWASP"],
    ["fa-brands fa-docker", "Deployment", "Docker, Nginx, CI/CD"],
    ["fa-solid fa-diagram-project", "DSA", "Problem solving"],
    ["fa-brands fa-github", "Portfolio", "5 live projects"]
  ];

  const LNAME = { hi: "Hindi", en: "English" };

  /* ---------- Fly developer tips (hi = Hindi written in English letters) ---------- */
  const TIPS = {
    en: {
      hello: "Hi! I am your Fly developer. Pick a topic from the top bar, or swipe left and right to change steps.",
      steps: [
        "Start here. Learn a little, then build a small project like a calculator.",
        "Git saves your code. Push it to GitHub every day.",
        "HTML, CSS and JavaScript make the pages. Build a portfolio website.",
        "Learn Flask first, then Django. Build a blog with login.",
        "Learn SQL first. Practise joins, they come up in every interview.",
        "Learn how login and tokens work. Never save plain passwords.",
        "Time to go live! Deploy one project on Render or Railway.",
        "Practise a little every day. Start with easy LeetCode questions.",
        "This part is optional. Come back after the other steps."
      ],
      done: (n) => n ? `Step done, great work! Next up: ${n}.` : "All 9 steps done! Now build projects and apply for jobs.",
      lang: { hi: "Videos are now in Hindi. If a topic has none yet, I show the English one.", en: "Videos are now in English." },
      projects: "Build these projects and host them live. Recruiters love that.",
      faq: "Quick answers to common questions are here.",
      next: "Next step",
      back: "I am back! "
    },
    hi: {
      hello: "Namaste! Main aapka Fly developer hoon. Upar se topic chuno, ya left-right swipe karke agle step par jao.",
      steps: [
        "Yahan se shuru karo. Thoda seekho, phir calculator jaisa chhota project banao.",
        "Git aapka code save karta hai. Roz GitHub par push karo.",
        "HTML, CSS aur JavaScript se pages bante hain. Ek portfolio website banao.",
        "Pehle Flask seekho, phir Django. Login wala blog banao.",
        "Pehle SQL seekho. Joins ki practice karo, interview mein zaroor aate hain.",
        "Login aur token kaise kaam karte hain seekho. Password kabhi plain text mein save mat karo.",
        "Ab live karne ka time hai! Ek project Render ya Railway par deploy karo.",
        "Roz thoda practice karo. Pehle easy LeetCode questions karo.",
        "Yeh part optional hai. Baaki steps ke baad yahan aana."
      ],
      done: (n) => n ? `Step complete, badhiya! Ab agla: ${n}.` : "Saare 9 steps ho gaye! Ab projects banao aur jobs ke liye apply karo.",
      lang: { hi: "Ab videos Hindi mein dikhenge. Jis topic mein Hindi video nahi hai wahan English wala dikhega.", en: "Ab videos English mein dikhenge." },
      projects: "Yeh projects banao aur live host karo. Recruiters ko achha lagta hai.",
      faq: "Common sawaalon ke jawab yahan hain.",
      next: "Agla step",
      back: "Main wapas aa gaya! "
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    const track = $("#amList"), slider = $("#pfSlider"), tabsEl = $("#pfTabs");
    if (!track || !slider || !tabsEl) return;
    const N = STEPS.length;
    const clamp = (i) => Math.max(0, Math.min(N - 1, i));

    /* ---------- saved language + progress ---------- */
    let lang = new URLSearchParams(location.search).get("lang");
    try { if (!/^(hi|en)$/.test(lang)) lang = localStorage.getItem(LKEY); } catch (e) {}
    if (!/^(hi|en)$/.test(lang)) lang = "en";
    let done = [];
    try { done = JSON.parse(localStorage.getItem(KEY) || "[]").filter((n) => n >= 0 && n < N); } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} };

    let glang = {};            /* per-topic language chosen above a video block: { "stepIndex-groupIndex": "hi" | "en" } */
    let cur = 0, slides = [], ready = false, inView = false;
    const hm = /^#stage-(\d+)$/.exec(location.hash);
    if (hm) cur = clamp(+hm[1] - 1);
    const T = () => TIPS[lang];

    /* ---------- videos + notes ---------- */
    const video = (v, i, n, title) => {
      const label = n > 1 ? `<small>Part ${i + 1}</small>` : "";
      if (v.charAt(0) === "?") {
        const q = v.slice(1);
        return `<div class="pf-v">${label}<a class="pf-find" href="https://www.youtube.com/results?search_query=${encodeURIComponent(q)}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube" aria-hidden="true"></i><span>Find video on YouTube: ${esc(q)}</span><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div>`;
      }
      return `<div class="pf-v">${label}<button type="button" class="pf-frame" data-vid="${esc(v)}" data-title="${esc(title)}" aria-label="Play video: ${esc(title)}">
        <img src="https://i.ytimg.com/vi_webp/${esc(v)}/mqdefault.webp" alt="" width="320" height="180" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${esc(v)}/hqdefault.jpg'"><span class="pf-play"><i class="fa-solid fa-play" aria-hidden="true"></i></span></button></div>`;
    };

    /* video block with its own Hindi / English choice on top (every topic that has videos) */
    const vblock = (g, k) => {
      const v = g.v || {};
      if (!(v.hi || []).length && !(v.en || []).length) return "";
      const L = glang[k] || lang, other = L === "hi" ? "en" : "hi";
      let arr = v[L] || [], shown = L, note = "";
      if (!arr.length) {
        arr = v[other] || []; shown = other;
        note = `<p class="pf-note">No ${LNAME[L]} video for this topic yet, so the ${LNAME[other]} video is shown.</p>`;
      }
      const title = `${g.h} (${LNAME[shown]})`;
      const btn = (l) => `<button type="button" data-glang="${l}" aria-pressed="${l === L}">${LNAME[l]}</button>`;
      return `<div class="pf-vblock" data-k="${k}">
        <div class="pf-vhead"><h5 class="pf-sub"><i class="fa-brands fa-youtube" aria-hidden="true"></i>Videos</h5>
          <div class="pf-lang pf-lang-s" role="group" aria-label="Video language for ${esc(g.h)}">${btn("hi")}${btn("en")}</div></div>
        ${note}<div class="pf-vids">${arr.map((x, i) => video(x, i, arr.length, title)).join("")}</div></div>`;
    };
    const notes = (g) => !(g.n || []).length ? "" :
      `<h5 class="pf-sub"><i class="fa-regular fa-file-lines" aria-hidden="true"></i>Notes</h5><ul class="pf-notes">${g.n.map(([l, u]) =>
        `<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>${esc(l)}</a></li>`).join("")}</ul>`;

    /* ---------- topic bar (click a title, go straight to that step) ---------- */
    tabsEl.innerHTML = STEPS.map((s, i) =>
      `<a class="pf-tab" role="tab" id="tab-${i + 1}" href="#stage-${i + 1}" data-i="${i}" aria-controls="stage-${i + 1}" aria-selected="false" tabindex="-1"><b><span>${i + 1}</span><i class="fa-solid fa-check" aria-hidden="true"></i></b>${esc(s.title)}</a>`).join("");
    const tabs = [...tabsEl.children];

    /* ---------- slider ---------- */
    const ro = "ResizeObserver" in window ? new ResizeObserver(() => fit()) : null;
    const fit = () => { const a = slides[cur]; if (a) track.style.height = a.offsetHeight + 12 + "px"; };
    const stepPx = () => slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
    let lock = 0;
    const place = (i, instant) => {
      if (!slides[i]) return;
      const quick = instant || reduce;
      lock = performance.now() + (quick ? 80 : 700);
      track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: quick ? "auto" : "smooth" });
    };
    const toPage = (force) => {   /* bring the top of the slider just under the sticky bar (force = scroll even when the slider is below the screen) */
      const p = $("#amProg");
      const off = (p ? (parseFloat(getComputedStyle(p).top) || 0) + p.offsetHeight : 0) + 10;
      const r = slider.getBoundingClientRect();
      if (force ? Math.abs(r.top - off) > 2 : r.top < off - 2) scrollTo({ top: scrollY + r.top - off, behavior: reduce ? "auto" : "smooth" });
    };

    const mark = () => {
      slides.forEach((el, i) => {
        const on = i === cur;
        el.toggleAttribute("inert", !on);
        el.setAttribute("aria-hidden", on ? "false" : "true");
      });
      tabs.forEach((t, i) => {
        const on = i === cur;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        const box = tabsEl.getBoundingClientRect(), r = t.getBoundingClientRect();
        if (on) tabsEl.scrollTo({ left: tabsEl.scrollLeft + (r.left - box.left) - (box.width - r.width) / 2, behavior: reduce ? "auto" : "smooth" });
      });
      const pt = cur > 0 ? STEPS[cur - 1].title : "", nt = cur < N - 1 ? STEPS[cur + 1].title : "";
      $$('[data-go="-1"]').forEach((b) => { b.disabled = cur === 0; const s = $(".pf-t", b); if (s) s.textContent = pt; });
      $$('[data-go="1"]').forEach((b) => { b.disabled = cur === N - 1; const s = $(".pf-t", b); if (s) s.textContent = nt; });
      $("#pfCount").innerHTML = `Step <b>${cur + 1}</b> of ${N} <span>&middot; ${esc(STEPS[cur].title)}</span>`;
    };

    let tipT = 0;
    const tip = () => { clearTimeout(tipT); tipT = setTimeout(() => say(T().steps[cur], true), 250); };

    const go = (i, o = {}) => {
      i = clamp(i);
      const changed = i !== cur;
      cur = i; mark(); fit(); place(i, o.instant);
      if (o.page !== false) toPage();
      if (ready && o.url !== false) { try { history.replaceState(null, "", "#stage-" + (i + 1)); } catch (e) {} }
      if (changed) tip();
    };

    /* swiping / scrolling sideways: follow the slide that is in view */
    let raf = 0;
    track.addEventListener("scroll", () => {
      if (raf || performance.now() < lock) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const i = clamp(Math.round(track.scrollLeft / (stepPx() || 1)));
        if (i === cur) return;
        cur = i; mark(); fit();
        try { history.replaceState(null, "", "#stage-" + (i + 1)); } catch (e) {}
        tip();
      });
    }, { passive: true });

    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { place(cur, true); fit(); }, 120); });

    tabsEl.addEventListener("click", (e) => {
      const a = e.target.closest(".pf-tab");
      if (!a) return;
      e.preventDefault(); go(+a.dataset.i);
    });
    tabsEl.addEventListener("keydown", (e) => {
      const k = e.key, a = e.target.closest(".pf-tab");
      if (k === " " && a) { e.preventDefault(); go(+a.dataset.i); return; }
      if (!/^(ArrowLeft|ArrowRight|Home|End)$/.test(k)) return;
      e.preventDefault();
      const i = clamp(k === "Home" ? 0 : k === "End" ? N - 1 : cur + (k === "ArrowRight" ? 1 : -1));
      go(i); tabs[i].focus();
    });
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-go]");
      if (b && !b.disabled) go(cur + +b.dataset.go);
    });
    document.addEventListener("keydown", (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const t = e.target;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
      if (!inView) return;
      go(cur + (e.key === "ArrowRight" ? 1 : -1), { page: false });
    });

    /* remember when the slider is on screen (used by the arrow keys) */
    new IntersectionObserver((es) => es.forEach((e) => { inView = e.isIntersecting; }), { threshold: 0 }).observe(slider);

    /* ---------- steps ---------- */
    const drawSteps = () => {
      if (ro) ro.disconnect();
      track.innerHTML = STEPS.map((s, i) => `
        <article class="card am-step" id="stage-${i + 1}" data-i="${i}" role="tabpanel" aria-labelledby="tab-${i + 1}" aria-roledescription="slide">
          <div class="am-num" aria-hidden="true">${i + 1}</div>
          <div class="am-main">
            <header><h3>${esc(s.title)}</h3></header>
            <p class="am-goal">${esc(s.goal)}</p>
            ${s.groups.map((g, j) => `<div class="pf-grp"><h4>${esc(g.h)}</h4>
              <ul class="pf-chips">${g.t.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
              ${vblock(g, i + "-" + j)}${notes(g)}</div>`).join("")}
            <button type="button" class="btn out am-done" data-i="${i}" aria-pressed="false"></button>
          </div>
        </article>`).join("");
      slides = [...track.children];
      if (ro) slides.forEach((el) => ro.observe(el));
      paint(); mark(); fit(); place(cur, true);
    };

    /* ---------- skills ---------- */
    $("#amSkills").innerHTML = SKILLS.map(([ic, t, d]) =>
      `<div class="card am-skill"><div class="ic"><i class="${ic}"></i></div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("");

    /* ---------- progress ---------- */
    const bar = $("#amBar"), txt = $("#amProgTxt"), rst = $("#amReset"), startBtn = $("#amStart"), meter = $(".am-bar");
    function paint() {
      const n = done.length, pct = Math.round((n / N) * 100);
      bar.style.width = pct + "%";
      meter.setAttribute("aria-valuenow", pct);
      txt.textContent = n === N ? "All steps done. Great work!" : `${n} of ${N} steps done`;
      rst.hidden = !n;
      slides.forEach((el) => {
        const i = +el.dataset.i, d = done.includes(i), b = $(".am-done", el);
        el.classList.toggle("is-done", d);
        b.setAttribute("aria-pressed", d);
        b.innerHTML = d ? '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> Done' : '<i class="fa-regular fa-circle" aria-hidden="true"></i> Mark as done';
      });
      tabs.forEach((t, i) => t.classList.toggle("is-done", done.includes(i)));
      const next = STEPS.findIndex((_, i) => !done.includes(i));
      $("span", startBtn).textContent = !n ? "Start Learning" : next === -1 ? "Review Roadmap" : "Continue Learning";
      startBtn.setAttribute("href", "#stage-" + (next === -1 ? 1 : next + 1));
      startBtn.dataset.to = next === -1 ? 0 : next;
    }
    /* Start / Continue Learning: open the right step AND scroll down to it */
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      go(+startBtn.dataset.to || 0, { page: false });
      toPage(true);
    });

    /* ---------- clicks inside the steps ---------- */
    track.addEventListener("click", (e) => {
      const f = e.target.closest(".pf-frame");
      if (f && f.dataset.vid) {   /* thumbnail -> iframe (nothing from YouTube loads before this click) */
        const box = document.createElement("div");
        box.className = "pf-frame";
        box.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${esc(f.dataset.vid)}?autoplay=1&rel=0" title="${esc(f.dataset.title)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        f.replaceWith(box);
        return;
      }
      const gl = e.target.closest("[data-glang]");
      if (gl) {   /* Hindi / English above one topic's videos */
        const blk = gl.closest(".pf-vblock"), k = blk.dataset.k, [si, gi] = k.split("-").map(Number);
        glang[k] = gl.dataset.glang;
        blk.insertAdjacentHTML("afterend", vblock(STEPS[si].groups[gi], k));
        const nb = blk.nextElementSibling;
        blk.remove();
        const again = $(`[data-glang="${glang[k]}"]`, nb);
        if (again) again.focus({ preventScroll: true });
        fit();
        return;
      }
      const b = e.target.closest(".am-done");
      if (!b) return;
      const i = +b.dataset.i, was = done.includes(i);
      done = was ? done.filter((x) => x !== i) : [...done, i];
      save(); paint();
      if (!was) {
        const nxt = STEPS.findIndex((_, j) => !done.includes(j));
        say(T().done(nxt === -1 ? "" : STEPS[nxt].title), nxt !== -1 && cur < N - 1);
      }
    });
    rst.addEventListener("click", () => { done = []; save(); paint(); });

    /* ---------- global language switch (top bar) ---------- */
    const sw = $$("#amProg .pf-lang button");
    const setLang = (l, redraw) => {
      lang = l; glang = {};
      try { localStorage.setItem(LKEY, l); } catch (e) {}
      document.documentElement.setAttribute("data-vlang", l);
      sw.forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === l));
      if (redraw) { drawSteps(); say(T().lang[l]); }
    };
    sw.forEach((b) => b.addEventListener("click", () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang, true); }));

    /* banner fallback */
    const ban = $(".am-banner img");
    if (ban) { const fail = () => ban.parentElement.classList.add("no-img"); ban.addEventListener("error", fail); if (ban.complete && !ban.naturalWidth) fail(); }

    /* ---------- Fly developer (same look as the rest of the site, styled by theme.css) ---------- */
    const DEV = `<g class="dv">
      <path d="M40 140c0-30 18-44 40-44s40 14 40 44z" fill="#1e3a5f"/>
      <rect x="70" y="72" width="20" height="14" rx="6" fill="#e8b98f"/>
      <circle cx="80" cy="54" r="24" fill="#f1c9a5"/>
      <path d="M56 52a24 24 0 0 1 48 0c-6-10-14-14-24-14s-18 4-24 14z" fill="#152840"/>
      <path d="M55 56a25 25 0 0 1 50 0" fill="none" stroke="#5bb5d6" stroke-width="4"/>
      <rect x="50" y="52" width="8" height="15" rx="4" fill="#5bb5d6"/><rect x="102" y="52" width="8" height="15" rx="4" fill="#5bb5d6"/>
      <path d="M54 65q0 12 14 13" fill="none" stroke="#5bb5d6" stroke-width="2.5"/>
      <g class="ey"><circle cx="71" cy="56" r="2.6" fill="#152840"/><circle cx="89" cy="56" r="2.6" fill="#152840"/></g>
      <ellipse class="mo" cx="80" cy="68" rx="5.5" ry="3" fill="#9b4d3a"/>
      <path d="M44 84h72l6 30H38z" fill="#152840" stroke="#5bb5d6" stroke-width="3" stroke-linejoin="round"/>
      <rect class="cl" x="52" y="91" width="34" height="3.5" rx="1.7" fill="#87ceeb"/>
      <rect class="cl" x="58" y="98" width="46" height="3.5" rx="1.7" fill="#10b981" style="animation-delay:-.5s"/>
      <rect class="cl" x="52" y="105" width="28" height="3.5" rx="1.7" fill="#87ceeb" style="animation-delay:-.9s"/>
      <rect x="30" y="114" width="100" height="8" rx="4" fill="#cbd9e8"/>
      <circle class="hd" cx="66" cy="113" r="5" fill="#f1c9a5"/><circle class="hd" cx="94" cy="113" r="5" fill="#f1c9a5"/>
    </g>`;
    document.body.insertAdjacentHTML("beforeend",
      `<div id="guide"><div id="bub" class="hide"><span class="pf-em" aria-hidden="true">👨‍💻</span> <span id="bubTxt"></span><button type="button" class="pf-bn" id="bubNext" hidden></button></div>` +
      `<svg viewBox="0 0 160 140" id="dev" role="button" tabindex="0" aria-label="Fly developer: click to hide or show tips">${DEV}</svg></div>` +
      `<span class="sr-only" id="pfLive" role="status" aria-live="polite"></span>`);
    const guide = $("#guide"), bub = $("#bub"), bt = $("#bubTxt"), bn = $("#bubNext"), live = $("#pfLive");
    let tk = 0, muted = false, hideT = 0;

    function say(text, withNext) {
      if (muted || !text || document.documentElement.classList.contains("menu-open")) return;
      clearTimeout(hideT);
      const id = ++tk;
      bub.classList.remove("hide"); bn.hidden = true; live.textContent = text;
      const finish = () => {
        guide.classList.remove("talk");
        if (withNext && cur < N - 1) { bn.textContent = T().next + " →"; bn.hidden = false; }
        hideT = setTimeout(() => bub.classList.add("hide"), 16000);
      };
      if (reduce) { bt.textContent = text; finish(); return; }
      bt.textContent = ""; guide.classList.add("talk");
      let i = 0;
      (function s() {
        if (id !== tk) return;
        bt.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(s, 20); else finish();
      })();
    }
    const toggleGuide = () => {
      const hidden = bub.classList.contains("hide");
      if (muted || hidden) { muted = false; say(T().back + T().steps[cur], true); }
      else { muted = true; tk++; clearTimeout(hideT); bub.classList.add("hide"); guide.classList.remove("talk"); }
    };
    $("#dev").addEventListener("click", toggleGuide);
    $("#dev").addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleGuide(); } });
    bn.addEventListener("click", () => go(cur + 1));

    /* the developer also comments on the sections below the slider */
    const SEC = { projects: "projects", faq: "faq" };
    const sio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && ready && SEC[e.target.id]) say(T()[SEC[e.target.id]]);
    }), { rootMargin: "-40% 0px -40% 0px" });
    Object.keys(SEC).forEach((id) => { const el = document.getElementById(id); if (el) sio.observe(el); });
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && ready) tip();
    }), { rootMargin: "-35% 0px -35% 0px" }).observe(slider);

    /* ---------- start ---------- */
    setLang(lang, false);
    drawSteps();
    addEventListener("hashchange", () => {
      const m = /^#stage-(\d+)$/.exec(location.hash);
      if (m) go(+m[1] - 1, { url: false });
    });
    addEventListener("load", () => { place(cur, true); fit(); if (hm) setTimeout(toPage, 120); });
    /* ---------- welcome loader (same effect as the home page) ----------
       Logo, the developer working with glowing servers, a "Welcome" bubble, then the doors open.
       Shows ONE time per browser tab (sessionStorage). Click it to skip.
       Sections then slide in from the left / right while you scroll. */
    const WKEY = "itf_welcomed_pfs", ROOT = document.documentElement.dataset.root || "";
    const scene = () => {
      let o = `<defs>
        <linearGradient id="svg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f3d63"/><stop offset="1" stop-color="#0f2239"/></linearGradient>
        <filter id="gl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>`;
      for (let i = 0; i < 3; i++) for (let sd = 0; sd < 2; sd++) {
        const y = 70 + i * 38, wy = y + 17, x = sd ? 342 : 14, sx = sd ? 342 : 78, ex = sd ? 262 : 158, c = sd ? 305 : 115;
        const p = `M${sx} ${wy}C${c} ${wy},${c} 205,${ex} 205`;
        const dur = (1.7 + i * .3).toFixed(1), dl = (i * .4 + sd * .2).toFixed(1);
        o += `<path d="${p}" fill="none" stroke="#24405f" stroke-width="4" stroke-linecap="round"/>
          <path class="wire" d="${p}" fill="none" stroke="#5bb5d6" stroke-width="1.8" stroke-linecap="round"/>
          <circle r="3.2" fill="#87ceeb" filter="url(#gl)"><animateMotion dur="${dur}s" repeatCount="indefinite" path="${p}"/></circle>
          <circle r="2.4" fill="#10b981" filter="url(#gl)"><animateMotion dur="${dur}s" begin="-${(dur / 2).toFixed(2)}s" repeatCount="indefinite" path="${p}"/></circle>
          <circle cx="${sx}" cy="${wy}" r="3.2" fill="#5bb5d6"/><circle cx="${ex}" cy="205" r="3.6" fill="#5bb5d6" filter="url(#gl)"/>
          <rect x="${x}" y="${y}" width="64" height="34" rx="6" fill="url(#svg1)" stroke="#5bb5d6" stroke-width="1.6"/>
          <rect x="${x + 8}" y="${y + 8}" width="34" height="4" rx="2" fill="#24405f"/>
          <rect class="sv-bar" x="${x + 8}" y="${y + 8}" width="34" height="4" rx="2" fill="#87ceeb" style="animation-delay:-${dl}s"/>
          <rect x="${x + 8}" y="${y + 21}" width="34" height="4" rx="2" fill="#24405f"/>
          <rect class="sv-bar" x="${x + 8}" y="${y + 21}" width="34" height="4" rx="2" fill="#10b981" style="animation-delay:-${(+dl + .6).toFixed(1)}s"/>
          <circle class="led" cx="${x + 52}" cy="${y + 10}" r="2.6" fill="#10b981" style="animation-delay:-${dl}s"/>
          <circle class="led" cx="${x + 52}" cy="${y + 24}" r="2.6" fill="#87ceeb" style="animation-delay:-${(+dl + .5).toFixed(1)}s"/>`;
      }
      return `<svg viewBox="0 0 420 240" aria-hidden="true">${o}<rect x="100" y="228" width="220" height="6" rx="3" fill="#24405f"/><g transform="translate(130 90)">${DEV}</g></svg>`;
    };
    const LOADER = `<div id="loader" aria-hidden="true"><div class="door"></div><div class="door"></div>
      <div class="mid"><div class="lg"><i class="fa-solid fa-paper-plane"></i><img src="${ROOT}img/Logo.png" alt="" onerror="this.remove()"></div>
      <div class="nm">INFO TECH FLY</div>
      <div class="sc" id="lsc"><div class="say" id="lsay"></div>${scene()}</div>
      <div class="pb"><s></s></div></div></div>`;

    const secs = () => $$("main > section, .ftr").filter((el) => !el.querySelector(".grid, .tl"));
    const welcome = (onReady) => {
      let seen = false;
      try { seen = sessionStorage.getItem(WKEY) === "1"; } catch (e) {}
      if (!reduce) secs().forEach((el) => el.classList.add("sx", "fl"));

      /* scroll down = sections enter from the left, scroll up = from the right */
      const initScroll = () => {
        if (reduce) return;
        const io = new IntersectionObserver((es) => es.forEach((e) => {
          const t = e.target;
          if (e.isIntersecting) { t.classList.remove("fl", "fr"); t.classList.add("in"); }
          else { t.classList.remove("in"); t.classList.add(e.boundingClientRect.top > 0 ? "fl" : "fr"); }
        }), { threshold: .08, rootMargin: "0px 0px -6% 0px" });
        secs().forEach((el) => io.observe(el));
      };

      if (reduce || seen) { initScroll(); setTimeout(onReady, 900); return; }
      try { sessionStorage.setItem(WKEY, "1"); } catch (e) {}
      const body = document.body;
      body.insertAdjacentHTML("afterbegin", LOADER);
      body.style.overflow = "hidden";
      const L = $("#loader"), sy = $("#lsay"), sc = $("#lsc");
      let opened = false;
      const open = () => {
        if (opened) return; opened = true;
        L.classList.add("open"); body.style.overflow = "";
        setTimeout(() => { L.remove(); initScroll(); onReady(); }, 1000);
      };
      setTimeout(() => { sy.textContent = "Welcome! Let's learn Python."; sy.classList.add("on"); sc.classList.add("talk"); }, 2300);
      setTimeout(() => sc.classList.remove("talk"), 4000);
      setTimeout(open, 4600);
      L.onclick = open;   /* click to skip */
    };
    welcome(() => { ready = true; say(T().hello); });
  });
})();

/* ---------- Hero motivation line (typing animation) ----------
   The full sentence is already in the HTML (good for SEO, screen readers and no-JavaScript visitors).
   This script types it letter by letter AFTER the welcome loader is gone, then keeps a blinking cursor.
   To change the line, edit data-text and the text inside #pfTypeTxt in the HTML. */
(() => {
  "use strict";
  const el = document.getElementById("pfTypeTxt");
  if (!el) return;
  const text = el.dataset.text || el.textContent.trim();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;                       /* keep the full line, no animation */

  const SPEED = 42;                         /* ms per letter */
  let i = 0;
  el.textContent = "";

  const type = () => {
    i += 1;
    el.textContent = text.slice(0, i);
    if (i < text.length) {
      const ch = text[i - 1];
      setTimeout(type, /[.,]/.test(ch) ? SPEED * 7 : SPEED);   /* small pause after . and , */
    }
  };

  /* wait until the loader (if shown) has finished, and until the tab is visible */
  const start = () => {
    if (document.getElementById("loader") || document.hidden) { setTimeout(start, 200); return; }
    setTimeout(type, 350);
  };
  start();
})();
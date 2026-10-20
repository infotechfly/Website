/**
 * ═══════════════════════ INFO TECH FLY ═══════════════════════
 * Services page — data, cards and popup.
 *
 * Reuses script.js (navbar, scroll reveal, WhatsApp form, toast),
 * so load script.js BEFORE this file. To change any service text,
 * edit the SERVICES list below. Nothing else needs touching.
 * ══════════════════════════════════════════════════════════════
 */

(() => {
    const IMG_PATH = 'img/';
    const HOVER_DELAY = 350; // ms the pointer must rest on a card before the popup opens

    // ──────────────────────── TECHNOLOGY (icon, name, what we use it for) ────────────────────────
    const TECH = {
        html:   ['fa-brands fa-html5',        'HTML5',            'Clean page structure'],
        css:    ['fa-brands fa-css3-alt',     'CSS3',             'Design and animations'],
        js:     ['fa-brands fa-js',           'JavaScript',       'Interactive features'],
        node:   ['fa-brands fa-node-js',      'Node.js',          'Fast backends and APIs'],
        python: ['fa-brands fa-python',       'Python',           'Software and automation'],
        flask:  ['fa-solid fa-flask',         'Flask',            'Python web apps'],
        php:    ['fa-brands fa-php',          'PHP',              'Dynamic websites'],
        wp:     ['fa-brands fa-wordpress',    'WordPress',        'Easy-to-edit sites'],
        react:  ['fa-brands fa-react',        'React',            'Modern web apps'],
        db:     ['fa-solid fa-database',      'MySQL / MongoDB',  'Data storage'],
        aws:    ['fa-brands fa-aws',          'AWS',              'Cloud servers and storage'],
        docker: ['fa-brands fa-docker',       'Docker',           'Reliable deployments'],
        git:    ['fa-brands fa-git-alt',      'Git & GitHub',     'Version control, CI/CD'],
        linux:  ['fa-brands fa-linux',        'Linux',            'Server setup'],
        cloud:  ['fa-solid fa-cloud',         'Vercel / Netlify', 'Quick static hosting'],
        shield: ['fa-solid fa-shield-halved', 'SSL & Security',   'HTTPS, backups, scans']
    };

    // ──────────────────────── SERVICES ────────────────────────
    // pages: [icon, title, description]   tech: keys of TECH   addons: checkboxes in the form
    const SERVICES = [
        {
            id: 'static', title: 'Static Websites', tag: 'Fast and affordable',
            icon: 'fa-solid fa-file-code', img: '../img/Static Website.avif',
            summary: 'Quick-loading, secure websites for portfolios, landing pages and small businesses.',
            pagesTitle: 'Pages you get',
            pages: [
                ['house',       'Home page',     'Hero banner, your key offers and a clear call to action'],
                ['circle-info', 'About page',    'Your story, team and what makes you different'],
                ['briefcase',   'Services page', 'What you offer, with images and details'],
                ['globe',       'Domain name',   'Registration and setup so people can find you'],
                ['envelope',    'Contact Us page', 'A form that sends enquiries straight to your WhatsApp']
            ],
            perks: ['Mobile responsive', 'SEO-friendly', 'Fast loading', 'SSL (https) included'],
            tech: ['html', 'css', 'js', 'git'],
            addons: ['Extra pages', 'Photo gallery', 'Google Maps', 'Logo design', 'Blog section']
        },
        {
            id: 'dynamic', title: 'Dynamic Websites', tag: 'Full-stack',
            icon: 'fa-solid fa-database', img: '../img/Dynamic Website.avif',
            summary: 'Database-driven websites where users can sign in and you manage everything yourself.',
            pagesTitle: 'Pages and modules you get',
            pages: [
                ['house',         'Home page',        'Dynamic content that updates from your admin panel'],
                ['right-to-bracket', 'Login and sign-up', 'Simple, secure accounts with password protection'],
                ['gauge',         'User dashboard',   'A personal area for each registered user'],
                ['user-gear',     'Admin panel',      'Add, edit and delete content, users and orders'],
                ['envelope',      'Contact Us page',  'A form that sends enquiries straight to your WhatsApp']
            ],
            perks: ['Database-driven', 'Role-based access', 'API ready', 'Domain and hosting help'],
            tech: ['html', 'css', 'js', 'node', 'python', 'flask', 'php', 'db'],
            addons: ['Admin panel', 'User login', 'Payment gateway', 'Blog / CMS', 'Email alerts', 'Search and filters']
        },
        {
            id: 'wordpress', title: 'WordPress Websites', tag: 'Edit it yourself',
            icon: 'fa-brands fa-wordpress', img: '../img/WordPress Website.avif',
            summary: 'A website you can update without coding, with themes and plugins set up for you.',
            pagesTitle: 'Pages you get',
            pages: [
                ['house',       'Home page',     'Built with a modern theme or page builder'],
                ['circle-info', 'About page',    'Your story, team and values'],
                ['newspaper',   'Blog',          'Publish news and articles in minutes'],
                ['cart-shopping', 'Shop or Services', 'Online store (WooCommerce) or a services listing'],
                ['envelope',    'Contact Us page', 'A form that sends enquiries straight to your WhatsApp']
            ],
            perks: ['Edit content yourself', 'SEO plugin setup', 'Speed optimization', 'Domain and hosting setup'],
            tech: ['wp', 'php', 'db', 'css', 'js'],
            addons: ['Online store', 'Blog setup', 'Booking form', 'Custom theme', 'Multi-language']
        },
        {
            id: 'apps', title: 'Apps & Software', tag: 'Custom-built',
            icon: 'fa-solid fa-laptop-code', img: '../img/Apps & Software.avif',
            summary: 'Web apps and desktop software built around the way your business works.',
            pagesTitle: 'Modules you get',
            pages: [
                ['right-to-bracket', 'Login screen',   'Simple, secure sign-in for your users'],
                ['gauge',        'Dashboard',          'Your key numbers at a glance'],
                ['user-gear',    'Admin panel',        'Manage users, data and settings'],
                ['file-export',  'Reports and export', 'Download your data as CSV or PDF'],
                ['plug',         'API and integrations', 'Connect payments, WhatsApp and other tools']
            ],
            perks: ['Web or desktop software', 'Clean, simple interface', 'Built to grow', 'Tested before launch'],
            tech: ['python', 'flask', 'node', 'react', 'js', 'db', 'git'],
            addons: ['Admin panel', 'User login', 'Reports and export', 'Notifications', 'API integration', 'Automation scripts']
        },
        {
            id: 'deploy', title: 'Deployment & Hosting', tag: 'Cloud ready',
            icon: 'fa-solid fa-cloud-arrow-up', img: '../img/Deployment & Hosting.avif',
            summary: 'Complete server setup, domain configuration and cloud deployment with ongoing support.',
            pagesTitle: 'What we set up',
            pages: [
                ['globe',       'Domain name',      'Buy, connect and configure DNS for your domain'],
                ['cloud',       'Cloud server',     'AWS (EC2, S3), VPS or Vercel and Netlify'],
                ['lock',        'SSL certificate',  'HTTPS for security and trust'],
                ['box',         'Docker setup',     'Consistent builds that run the same everywhere'],
                ['code-branch', 'CI/CD pipeline',   'Push to GitHub and your site updates automatically']
            ],
            perks: ['AWS, Vercel, Netlify and more', 'Server security setup', 'Easy updates', 'Ongoing support'],
            tech: ['aws', 'docker', 'linux', 'git', 'cloud', 'shield'],
            addons: ['Domain registration', 'Business email', 'Database setup', 'Auto backups', 'Uptime monitoring']
        },
        {
            id: 'security', title: 'Security & Maintenance', tag: 'Stay safe and updated',
            icon: 'fa-solid fa-shield-halved', img: '../img/Security & Maintenance.avif',
            summary: 'Keep your website safe, fast and up to date so you can focus on your business.',
            pagesTitle: 'What we handle',
            pages: [
                ['lock',            'SSL and HTTPS',        'Certificates installed and renewed'],
                ['floppy-disk',     'Regular backups',      'Restore quickly if anything goes wrong'],
                ['bug-slash',       'Malware scan and cleanup', 'Find and remove threats'],
                ['arrows-rotate',   'Updates and bug fixes', 'Plugins, frameworks and server software'],
                ['pen-to-square',   'Content changes',      'Text, images and new pages when you need them']
            ],
            perks: ['Hacked site recovery', 'Speed checks', 'Uptime monitoring', 'Quick WhatsApp support'],
            tech: ['shield', 'linux', 'wp', 'php', 'git'],
            addons: ['Monthly backups', 'Malware cleanup', 'Speed optimization', 'Security audit', 'Plugin updates']
        },
        {
            id: 'notsure', title: 'Not Sure What You Need?', tag: 'Let’s talk', wide: true,
            icon: 'fa-solid fa-circle-question', img: '../img/Not Sure.avif',
            summary: 'Describe your idea in plain words. We will suggest the right option and share a clear quote.',
            pagesTitle: 'How we help',
            pages: [
                ['comments',    'Share your idea',     'Send a short message on WhatsApp'],
                ['lightbulb',   'We suggest a plan',   'A website, an app, hosting, or a mix'],
                ['file-invoice', 'You get a clear quote', 'Scope, timeline and cost before we start']
            ],
            perks: [],
            tech: ['html', 'python', 'wp', 'aws'],
            addons: ['New website', 'Redesign', 'App or software', 'Hosting', 'Fix an issue']
        }
    ];

    // ──────────────────────── PROCESS STEPS (a real sequence, so numbered) ────────────────────────
    const STEPS = [
        ['Tell us your idea',  'Send a short message on WhatsApp or use the form.'],
        ['Get a plan and quote', 'We suggest the right option with clear scope and cost.'],
        ['We build it',        'Design, code and testing, with updates along the way.'],
        ['Launch and support', 'We deploy it, connect your domain and stay on call.']
    ];

    // ──────────────────────── HELPERS ────────────────────────
    const $ = (sel, root = document) => root.querySelector(sel);
    const rand = (min, max) => (min + Math.random() * (max - min)).toFixed(1);
    const chip = key => `<span class="tech-chip"><i class="${TECH[key][0]}"></i>${TECH[key][1]}</span>`;

    // ──────────────────────── RENDER PAGE SECTIONS ────────────────────────
    function renderHeroParticles() {
        const box = $('#heroParticles');
        for (let i = 0; i < 10; i++) {
            const p = document.createElement('span');
            p.className = 'particle';
            p.style.cssText = `--x:${rand(5, 95)}%;--y:${rand(10, 90)}%;--s:${rand(4, 11)}px;--d:${rand(5, 10)}s;`;
            box.append(p);
        }
    }

    function renderCards() {
        $('#svcGrid').innerHTML = SERVICES.map(s => `
            <article class="svc-card ${s.wide ? 'svc-card-wide' : ''}" data-reveal data-id="${s.id}"
                     tabindex="0" role="button" aria-haspopup="dialog" aria-label="${s.title}: view full details">
                <div class="svc-media">
                    <img src="${IMG_PATH}${s.img}" alt="${s.title}" width="900" height="600" loading="lazy">
                    <span class="svc-peek"><i class="fa-solid fa-expand"></i></span>
                </div>
                <div class="svc-body">
                    <span class="svc-badge"><i class="${s.icon}"></i></span>
                    <span class="svc-tag">${s.tag}</span>
                    <h3>${s.title}</h3>
                    <p>${s.summary}</p>
                    <div class="chip-row">${s.tech.slice(0, 4).map(chip).join('')}</div>
                    <span class="svc-more">View full details <i class="fa-solid fa-arrow-right"></i></span>
                </div>
            </article>`).join('');
    }

    function renderTech() {
        $('#techGrid').innerHTML = Object.values(TECH).map(([icon, name, use]) => `
            <div class="tech-card" data-reveal>
                <div class="tech-icon"><i class="${icon}"></i></div>
                <h4>${name}</h4>
                <p>${use}</p>
            </div>`).join('');
    }

    function renderSteps() {
        $('#stepGrid').innerHTML = STEPS.map(([title, text], i) => `
            <div class="step" data-reveal>
                <div class="step-no">${i + 1}</div>
                <h4>${title}</h4>
                <p>${text}</p>
            </div>`).join('');
    }

    function renderServiceSelect() {
        $('#cService').innerHTML = '<option value="" disabled selected>Select a service</option>' +
            SERVICES.map(s => `<option value="${s.title}">${s.title}</option>`).join('');
    }

    // ──────────────────────── POPUP ────────────────────────
    const modal = $('#svcModal');
    const form = $('.modal-form', modal);

    function openModal(id) {
        const s = SERVICES.find(item => item.id === id);
        if (!s || modal.open) return;

        $('#mImg').src = IMG_PATH + s.img;
        $('#mImg').alt = s.title;
        $('#mTag').textContent = s.tag;
        $('#mTitle').textContent = s.title;
        $('#mSummary').textContent = s.summary;
        $('#mPagesTitle').textContent = s.pagesTitle;
        $('#mPages').innerHTML = s.pages.map(([icon, title, text]) => `
            <li><i class="fa-solid fa-${icon}"></i><div><strong>${title}</strong><span>${text}</span></div></li>`).join('');
        $('#mPerks').innerHTML = s.perks.map(p => `<li><i class="fa-solid fa-check"></i>${p}</li>`).join('');
        $('#mPerksWrap').hidden = !s.perks.length;
        $('#mTech').innerHTML = s.tech.map(chip).join('');
        $('#mAddons').innerHTML = s.addons.map(a => `
            <label class="check"><input type="checkbox" name="features" value="${a}"><span>${a}</span></label>`).join('');

        form.reset();
        $('#mService').value = s.title;
        $('.modal-info', modal).scrollTop = 0;
        modal.showModal();
    }

    function initModal() {
        // Close: X button, click on the dark backdrop, or after the form is sent (Esc works natively)
        modal.addEventListener('click', e => {
            if (e.target === modal || e.target.closest('[data-close]')) modal.close();
        });
        modal.addEventListener('whatsapp-sent', () => modal.close());
    }

    // ──────────────────────── HOVER / CLICK / KEYBOARD ON CARDS ────────────────────────
    function initCardTriggers() {
        const grid = $('#svcGrid');
        const canHover = matchMedia('(hover: hover) and (pointer: fine)');
        const cardOf = el => el.closest('.svc-card');
        let hoverTimer;
        let hoverCard = null;       // card the pointer is currently "armed" on
        let pointer = { x: 0, y: 0 };

        document.addEventListener('mousemove', e => { pointer = { x: e.clientX, y: e.clientY }; }, { passive: true });

        // Desktop: the popup opens after the mouse is moved over a card and rests there briefly.
        // Using real mouse movement (not mouseover) means scrolling or closing the popup never triggers it by accident.
        grid.addEventListener('mousemove', e => {
            const card = cardOf(e.target);
            if (!card || card === hoverCard || !canHover.matches) return;
            hoverCard = card;
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => openModal(card.dataset.id), HOVER_DELAY);
        });
        grid.addEventListener('mouseout', e => {
            const card = cardOf(e.target);
            if (!card || card.contains(e.relatedTarget)) return;
            clearTimeout(hoverTimer);
            if (card === hoverCard) hoverCard = null;
        });

        // After closing, treat the card under the pointer as already "used" until the mouse leaves it
        modal.addEventListener('close', () => {
            const under = document.elementFromPoint(pointer.x, pointer.y);
            hoverCard = under ? cardOf(under) : null;
        });

        // Touch and mouse click
        grid.addEventListener('click', e => {
            const card = cardOf(e.target);
            if (card) openModal(card.dataset.id);
        });

        // Keyboard (Enter / Space)
        grid.addEventListener('keydown', e => {
            if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.svc-card')) {
                e.preventDefault();
                openModal(e.target.dataset.id);
            }
        });
    }

    // ──────────────────────── INIT ────────────────────────
    // Runs immediately (script sits at the end of <body>) so script.js's reveal
    // observer, which runs on DOMContentLoaded, can already see the [data-reveal] items.
    renderHeroParticles();
    renderCards();
    renderTech();
    renderSteps();
    renderServiceSelect();
    initModal();
    initCardTriggers();
})();
/**
 * ═══════════════ INFO TECH FLY - COMMUNITY ═══════════════
 * Loads projects / ideas / comments from Google Sheets (Apps Script)
 * Needs script.js loaded first (uses its showFormToast).
 */
(() => {
    'use strict';

    // Paste your community Apps Script Web App URL here
    const API_URL = 'https://script.google.com/macros/s/AKfycbwA8Ls0mCSG-FUddScy6JUNtfGCd6YQOpp3X_X7dlV3tGuY-9tmXtl9jlTQnc37Dpfc-Q/exec';
    const PAGE = 9;
    const MAX_CATS = 4;
    const CATS = ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'Cybersecurity', 'Ethical Hacking',
        'Web Development', 'AI & ML', 'Cloud', 'Mobile App', 'Other'];

    const $ = id => document.getElementById(id);
    const st = { projects: [], ideas: [], comments: [], type: 'all', cat: 'all', q: '', shown: PAGE, open: new Set(), ready: false };

    // ───── helpers ─────
    function el(tag, props = {}, ...kids) {
        const n = document.createElement(tag);
        for (const [k, v] of Object.entries(props)) {
            if (v == null || v === false) continue;
            if (k === 'class') n.className = v;
            else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
            else n.setAttribute(k, v === true ? '' : v);
        }
        kids.flat().forEach(c => { if (c != null && c !== false) n.append(c.nodeType ? c : document.createTextNode(c)); });
        return n;
    }
    const icon = c => el('i', { class: c, 'aria-hidden': 'true' });
    const initial = n => (n || '?').trim().charAt(0).toUpperCase();
    const toast = (m, t) => (window.showFormToast ? showFormToast(m, t) : alert(m));

    function ago(iso) {
        const s = (Date.now() - new Date(iso)) / 1000;
        if (isNaN(s)) return '';
        if (s < 60) return 'just now';
        for (const [n, u] of [[60, 'min'], [3600, 'hour'], [86400, 'day'], [2592000, 'month']]) {
            const next = { min: 3600, hour: 86400, day: 2592000, month: 31536000 }[u];
            if (s < next) return `${Math.floor(s / n)} ${u}${Math.floor(s / n) > 1 ? 's' : ''} ago`;
        }
        return `${Math.floor(s / 31536000)} yr ago`;
    }

    const identity = {
        get() { try { return JSON.parse(localStorage.getItem('itf_community_id')) || {}; } catch (e) { return {}; } },
        set(v) { try { localStorage.setItem('itf_community_id', JSON.stringify(v)); } catch (e) { /* ignore */ } }
    };

    async function api(action, data) {
        if (/PASTE_/.test(API_URL)) throw new Error('Community server is not connected yet.');
        let res;
        if (data) {
            const fd = new FormData();
            fd.append('action', action);
            Object.entries(data).forEach(([k, v]) => fd.append(k, v));
            res = await fetch(API_URL, { method: 'POST', body: fd });
        } else {
            res = await fetch(`${API_URL}?action=${action}`);
        }
        const d = await res.json();
        if (d.status !== 'success') throw new Error(d.message || 'Something went wrong.');
        return d;
    }

    // ───── data ─────
    const items = () => [
        ...st.projects.map(p => ({ ...p, type: 'project', title: p.projectName })),
        ...st.ideas.map(i => ({ ...i, type: 'idea' }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const commentsOf = id => st.comments.filter(c => c.targetId === id)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // ───── search: free words + key:value ─────
    const KEYS = {
        category: ['categories'], cat: ['categories'], tag: ['categories'],
        author: ['fullName'], by: ['fullName'],
        title: ['title'], name: ['title'], type: ['type'], repo: ['githubUrl']
    };
    function parse(q) {
        const pairs = [];
        const rest = q.replace(/(\w+):("[^"]+"|\S+)/g, (m, k, v) => {
            k = k.toLowerCase();
            if (!KEYS[k]) return m;
            v = v.replace(/"/g, '').toLowerCase();
            pairs.push([k, k === 'type' ? v.replace(/s$/, '') : v.replace(/^@/, '')]);
            return ' ';
        });
        return { pairs, words: rest.toLowerCase().split(/\s+/).filter(Boolean) };
    }
    function matches(it, p) {
        for (const [k, v] of p.pairs) {
            if (!KEYS[k].some(f => String(it[f] || '').toLowerCase().includes(v))) return false;
        }
        if (!p.words.length) return true;
        const hay = [it.title, it.description, it.problem, it.solution, it.categories, it.fullName,
            ...commentsOf(it.id).map(c => c.comment)].join(' ').toLowerCase();
        return p.words.every(w => hay.includes(w));
    }
    function filtered() {
        const p = parse(st.q);
        return items().filter(it =>
            (st.type === 'all' || it.type === st.type) &&
            (st.cat === 'all' || it.categories.split(',').includes(st.cat)) &&
            matches(it, p));
    }

    // ───── render ─────
    function renderBars() {
        const all = items();
        $('statProjects').textContent = st.projects.length;
        $('statIdeas').textContent = st.ideas.length;
        $('statComments').textContent = st.comments.length;
        const tabs = [['all', 'All', all.length], ['project', 'Projects', st.projects.length], ['idea', 'Ideas', st.ideas.length]];
        $('tabs').replaceChildren(...tabs.map(([k, l, n]) => el('button', {
            class: 'cm-tab' + (st.type === k ? ' on' : ''), type: 'button', role: 'tab', 'aria-selected': st.type === k,
            onclick: () => { st.type = k; st.shown = PAGE; render(); }
        }, l, el('small', {}, n))));
        $('chips').replaceChildren(...['all', ...CATS].map(c => el('button', {
            class: 'cm-chip' + (st.cat === c ? ' on' : ''), type: 'button', 'aria-pressed': st.cat === c,
            onclick: () => { st.cat = c; st.shown = PAGE; render(); }
        }, c === 'all' ? 'All topics' : c)));
    }

    function card(it) {
        const open = st.open.has(it.id);
        const cm = commentsOf(it.id);
        const long = (it.description || it.problem || '').length > 200;
        const txt = el('p', { class: 'cm-text' }, it.type === 'project' ? it.description : '');
        const body = it.type === 'project' ? [txt] : [
            el('div', { class: 'cm-block' }, el('span', { class: 'cm-label' }, 'Real-world problem'), el('p', { class: 'cm-text' }, it.problem)),
            el('div', { class: 'cm-block' }, el('span', { class: 'cm-label' }, 'Project idea'), el('p', { class: 'cm-text' }, it.solution))
        ];
        const c = el('article', { class: 'cm-card', 'data-id': it.id },
            el('div', { class: 'cm-top' },
                el('span', { class: 'cm-type ' + it.type }, icon(it.type === 'project' ? 'fa-solid fa-code-branch' : 'fa-solid fa-lightbulb'), ' ' + (it.type === 'project' ? 'Project' : 'Idea')),
                el('span', {}, ago(it.timestamp))),
            el('h3', {}, it.title),
            ...body,
            long && el('button', {
                class: 'cm-toggle', type: 'button',
                onclick: e => { const on = c.querySelectorAll('.cm-text'); const o = !on[0].classList.contains('open'); on.forEach(t => t.classList.toggle('open', o)); e.target.textContent = o ? 'Show less' : 'Read more'; }
            }, 'Read more'),
            el('div', { class: 'cm-tags' }, it.categories.split(',').filter(Boolean).map(t => el('span', {}, t))),
            it.type === 'project' && /^https:\/\/github\.com\//i.test(it.githubUrl) &&
                el('a', { class: 'cm-link', href: it.githubUrl, target: '_blank', rel: 'noopener noreferrer nofollow' }, icon('fa-brands fa-github'), ' View on GitHub'),
            el('div', { class: 'cm-foot' },
                el('div', { class: 'cm-user' }, el('span', { class: 'cm-av' }, initial(it.fullName)),
                    el('div', {}, el('b', {}, it.fullName), el('small', {}, 'Community member'))),
                el('button', {
                    class: 'cm-toggle', type: 'button', 'aria-expanded': open,
                    onclick: () => { open ? st.open.delete(it.id) : st.open.add(it.id); swap(it.id); }
                }, icon('fa-regular fa-comment'), ` Comments (${cm.length})`)),
            open && comments(it, cm));
        if (txt && it.type === 'project') txt.textContent = it.description;
        return c;
    }

    function comments(it, cm) {
        const me = identity.get();
        const f = el('form', { class: 'cm-cform', novalidate: true },
            el('input', { name: 'fullName', placeholder: 'Your full name', maxlength: 60, value: me.fullName || '', 'aria-label': 'Full name' }),
            el('textarea', { name: 'comment', rows: 2, maxlength: 500, placeholder: 'Write a comment…', 'aria-label': 'Comment' }),
            el('input', { class: 'cm-trap', name: 'website', tabindex: -1, autocomplete: 'off', 'aria-hidden': 'true' }),
            el('button', { class: 'btn btn-primary btn-sm', type: 'submit' }, 'Post comment'));
        f.addEventListener('submit', async e => {
            e.preventDefault();
            const d = Object.fromEntries(new FormData(f));
            d.fullName = (d.fullName || '').trim();
            d.comment = (d.comment || '').trim();
            if (d.fullName.length < 2) return toast('Enter your full name.', 'error');
            if (d.comment.length < 2) return toast('Write a comment first.', 'error');
            const b = f.querySelector('button'); b.disabled = true;
            try {
                if (!d.website) {
                    const r = await api('add_comment', { ...d, targetId: it.id, targetType: it.type });
                    st.comments.push(r.item); identity.set({ fullName: d.fullName });
                }
                toast('Comment posted ✅', 'success'); renderBars(); swap(it.id);
            } catch (err) { toast(err.message, 'error'); b.disabled = false; }
        });
        return el('div', { class: 'cm-comments' },
            cm.length ? cm.map(c => el('div', { class: 'cm-cmt' }, el('span', { class: 'cm-av sm' }, initial(c.fullName)),
                el('div', {}, el('b', {}, c.fullName), ' ', el('small', {}, ago(c.timestamp)), el('p', {}, c.comment))))
                : el('p', { class: 'cm-none' }, 'No comments yet. Start the discussion.'),
            f);
    }
    function swap(id) {
        const old = document.querySelector(`.cm-card[data-id="${id}"]`);
        const it = items().find(x => x.id === id);
        if (old && it) old.replaceWith(card(it));
    }

    function render() {
        renderBars();
        const list = filtered();
        $('clearSearch').hidden = !st.q;
        $('count').textContent = st.ready ? `Showing ${Math.min(st.shown, list.length)} of ${list.length} post${list.length === 1 ? '' : 's'}` : '';
        $('more').hidden = list.length <= st.shown;
        const feed = $('feed');
        if (!st.ready) return;
        if (!list.length) {
            feed.replaceChildren(el('div', { class: 'cm-empty' }, icon('fa-solid fa-seedling'),
                el('h3', {}, st.q || st.cat !== 'all' ? 'Nothing matches your search' : 'Be the first to post'),
                el('p', {}, st.q || st.cat !== 'all' ? 'Try another keyword or clear the filters.' : 'Share a project or a real-world problem to get the community started.'),
                el('button', { class: 'btn btn-primary', type: 'button', 'data-open': 'projectDialog', onclick: () => $('projectDialog').showModal() }, 'Share a project')));
            return;
        }
        feed.replaceChildren(...list.slice(0, st.shown).map(card));
    }

    async function load() {
        $('feed').replaceChildren(...Array.from({ length: 6 }, () => el('div', { class: 'cm-skel' })));
        try {
            const d = await api('list');
            Object.assign(st, { projects: d.projects || [], ideas: d.ideas || [], comments: d.comments || [], ready: true });
            render();
        } catch (e) {
            $('feed').replaceChildren(el('div', { class: 'cm-empty' }, icon('fa-solid fa-triangle-exclamation'),
                el('h3', {}, 'Could not load the community'), el('p', {}, e.message === 'Failed to fetch' ? 'Check your connection and try again.' : e.message),
                el('button', { class: 'btn btn-primary', type: 'button', onclick: load }, 'Try again')));
        }
    }

    // ───── dialogs & forms ─────
    function setupForm(formId, action, check) {
        const form = $(formId), dlg = form.closest('dialog'), msg = form.querySelector('.cm-msg');
        form.querySelector('[data-picker]').replaceChildren(...CATS.map(c => el('label', { class: 'cm-pick' },
            el('input', { type: 'checkbox', name: 'cat', value: c, onchange: e => {
                if (form.querySelectorAll('[name=cat]:checked').length > MAX_CATS) { e.target.checked = false; toast(`Pick up to ${MAX_CATS} categories.`, 'error'); }
            } }), el('span', {}, c))));
        const err = t => { msg.textContent = t; msg.classList.toggle('show', !!t); return !t; };

        form.addEventListener('submit', async e => {
            e.preventDefault();
            const d = Object.fromEntries(new FormData(form));
            Object.keys(d).forEach(k => { if (typeof d[k] === 'string') d[k] = d[k].trim(); });
            d.categories = [...form.querySelectorAll('[name=cat]:checked')].map(x => x.value).join(',');
            delete d.cat;
            if (d.fullName.length < 2) return err('Enter your full name.');
            const problem = check(d); if (problem) return err(problem);
            if (!d.categories) return err('Pick at least one category.');
            err('');
            const b = form.querySelector('[type=submit]'), label = b.textContent;
            b.disabled = true; b.textContent = 'Posting…';
            try {
                if (!d.website) {
                    const r = await api(action, d);
                    (action === 'add_project' ? st.projects : st.ideas).push(r.item);
                    identity.set({ fullName: d.fullName });
                }
                toast('Posted successfully ✅', 'success');
                form.reset(); dlg.close(); st.type = 'all'; st.cat = 'all'; st.q = ''; $('search').value = ''; render();
            } catch (x) { err(x.message); }
            b.disabled = false; b.textContent = label;
        });
    }

    setupForm('projectForm', 'add_project', d =>
        d.projectName.length < 3 ? 'Project name needs at least 3 characters.' :
        d.description.length < 10 ? 'Describe your project in at least 10 characters.' :
        !/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/i.test(d.githubUrl) ? 'Enter a valid link like https://github.com/username/repo' : '');
    setupForm('ideaForm', 'add_idea', d =>
        d.title.length < 3 ? 'Idea title needs at least 3 characters.' :
        d.problem.length < 10 ? 'Describe the real-world problem (10+ characters).' :
        d.solution.length < 10 ? 'Describe your idea (10+ characters).' : '');

    document.addEventListener('click', e => {
        const o = e.target.closest('[data-open]');
        if (o) {
            const dlg = $(o.dataset.open), me = identity.get();
            const f = dlg.querySelector('form');
            if (!f.fullName.value) f.fullName.value = me.fullName || '';
            dlg.showModal();
        }
        if (e.target.closest('[data-close]')) e.target.closest('dialog').close();
        if (e.target.tagName === 'DIALOG') e.target.close();
    });

    // ───── search ─────
    let t;
    $('search').addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => { st.q = e.target.value.trim(); st.shown = PAGE; render(); }, 150); });
    $('clearSearch').addEventListener('click', () => { $('search').value = ''; st.q = ''; render(); $('search').focus(); });
    $('more').addEventListener('click', () => { st.shown += PAGE; render(); });

    renderBars();
    load();
})();
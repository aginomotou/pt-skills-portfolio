/* Loading... — renders every member page from its content file.
   Members never need to edit this file: their work goes in content/<name>.js (see GUIDE.md). */

(() => {
  const P = window.LoadingParts;
  const { esc } = P;

  const MEMBERS = [
    { id: 'aguilar', name: 'Aguilar' },
    { id: 'cortez', name: 'Cortez' },
    { id: 'cruz', name: 'Cruz' },
    { id: 'dival', name: 'Dival' },
  ];
  const TERMS = [
    { id: 'prelim', name: 'Prelim' },
    { id: 'midterm', name: 'Midterm' },
    { id: 'finals', name: 'Finals' },
  ];
  const COURSE = { section: 'BSIT - 301I', code: 'ITC C309-301I', subject: 'Presentation Skills for IT' };

  const data = {};
  for (const entry of window.PORTFOLIO || []) if (entry && entry.id) data[entry.id] = entry;

  const clean = (s) => String(s ?? '').trim();
  const list = (v) => (Array.isArray(v) ? v : v ? [v] : []);
  const member = (info) => ({ ...(data[info.id] || {}), name: info.name, fullName: clean(data[info.id]?.fullName), photo: clean(data[info.id]?.photo), intro: clean(data[info.id]?.intro) });

  function youtubeId(url) {
    const u = clean(url);
    const m = u.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/))([\w-]{11})/);
    if (m) return m[1];
    return /^[\w-]{11}$/.test(u) ? u : '';
  }

  /* ---------- one file (a performance task or a product) ---------- */
  function chip(item) {
    if (youtubeId(item.youtube)) return '<span class="chip red">YouTube</span>';
    if (clean(item.pdf)) return '<span class="chip">PDF</span>';
    if (clean(item.link)) return '<span class="chip blue">Link</span>';
    return '<span class="chip grey">Coming soon</span>';
  }

  function viewer(item, memberId, termId, fallbackTitle) {
    const title = esc(clean(item.title) || fallbackTitle);
    const yt = youtubeId(item.youtube);
    if (yt) {
      return `<div class="frame"><iframe src="https://www.youtube-nocookie.com/embed/${yt}?rel=0" title="${title} (YouTube video)" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
    }
    const pdf = clean(item.pdf);
    if (pdf) {
      return `<div class="frame frame-pdf"><object data="${esc(pdf)}#view=FitH" type="application/pdf" aria-label="${title} (PDF)">
        <div class="frame-fallback"><p class="hand">${title}</p><p>This browser can't show the PDF here. Use “Open the PDF” below.</p></div>
      </object></div>`;
    }
    if (clean(item.link)) return '';
    return `<div class="empty">${P.SVG.clip}<div><p class="hand">PDF or video goes here</p>
      <p>Put the file in <code>files/${memberId}/${termId}/</code> and write its name in <code>content/${memberId}.js</code>.</p></div></div>`;
  }

  function actions(item) {
    const out = [];
    const yt = youtubeId(item.youtube);
    const pdf = clean(item.pdf);
    const link = clean(item.link);
    if (pdf) {
      out.push(`<a class="btn" href="${esc(pdf)}" target="_blank" rel="noopener">Open the PDF</a>`);
      out.push(`<a class="btn btn-quiet" href="${esc(pdf)}" download>Download</a>`);
    }
    if (yt) out.push(`<a class="btn${pdf ? ' btn-quiet' : ''}" href="https://www.youtube.com/watch?v=${yt}" target="_blank" rel="noopener">Watch on YouTube</a>`);
    if (link) out.push(`<a class="btn${pdf || yt ? ' btn-quiet' : ''}" href="${esc(link)}" target="_blank" rel="noopener">Open the link</a>`);
    return out.length ? `<div class="file-actions">${out.join('')}</div>` : '';
  }

  function fileHTML(item, memberId, termId, fallbackTitle, i) {
    const note = clean(item.note);
    return `<article class="file" data-reveal style="--d:${i}">
      <div class="file-head"><h4>${esc(clean(item.title) || fallbackTitle)}</h4>${chip(item)}</div>
      ${note ? `<p class="file-note">${esc(note)}</p>` : ''}
      <div class="file-view">${viewer(item, memberId, termId, fallbackTitle)}</div>
      ${actions(item)}
    </article>`;
  }

  function reflectionHTML(text, memberId) {
    const t = clean(text);
    if (!t) {
      return `<div class="reflection-empty"><p class="hand">Reflection coming soon…</p>
        <p>Write it between the backticks of <code>reflection</code> in <code>content/${memberId}.js</code>.</p></div>`;
    }
    return `<div class="reflection">${t.split(/\n\s*\n/).map((p) => `<p>${esc(p.replace(/\s*\n\s*/g, ' '))}</p>`).join('')}</div>`;
  }

  /* ---------- member page ---------- */
  function renderMember(root, id) {
    const n = MEMBERS.findIndex((m) => m.id === id);
    const info = MEMBERS[n];
    const me = member(info);
    const next = MEMBERS[(n + 1) % MEMBERS.length];
    const termTabs = () => TERMS.map((t, i) => `<a href="#${t.id}" data-term-link="${t.id}" data-reveal style="--d:${i}">${t.name}</a>`).join('');
    const intro = me.intro
      ? me.intro.split(/\n\s*\n/).map((p) => `<p>${esc(p)}</p>`).join('')
      : `<p>This is <b>${esc(info.name)}</b>’s portfolio for <b>${COURSE.code} ${COURSE.subject}</b>, as a member of the group Loading... in ${COURSE.section}.</p>
         <p>It is split into three terms, <b>Prelim, Midterm and Finals</b>. Each one holds the term’s performance tasks, its product and a written reflection.</p>`;

    const rows = [
      ...(me.fullName ? [['id', 'Name', me.fullName]] : []),
      ['users', 'Section', COURSE.section],
      ['hash', 'Subject code', COURSE.code],
      ['book', 'Subject', COURSE.subject],
      ['calendar', 'Group', 'Loading...'],
    ];

    const boards = TERMS.map((t, ti) => {
      const term = data[id]?.[t.id] || {};
      const tasks = list(term.performanceTasks);
      const products = list(term.product);
      const prev = TERMS[ti - 1];
      const after = TERMS[ti + 1];
      const pager = `
        ${prev ? `<a data-reveal href="#${prev.id}">← ${prev.name}</a>` : '<a data-reveal href="index.html">← All portfolios</a>'}
        ${after ? `<a class="next" data-reveal style="--d:1" href="#${after.id}">${after.name} →</a>` : `<a class="next" data-reveal style="--d:1" href="${next.id}.html">Next: ${next.name}’s portfolio →</a>`}`;
      return `<section class="board-wrap desk" id="${t.id}" data-term="${t.id}" aria-labelledby="${t.id}-title">
        <h2 class="label board-title" id="${t.id}-title" data-reveal>${t.name}</h2>
        <div class="board">
          <div class="board-clip" aria-hidden="true"></div>
          <div class="board-paper">
            <nav class="board-tabs" aria-label="Terms">${termTabs()}</nav>
            <div class="board-grid">
              <section class="part" aria-labelledby="${t.id}-tasks">
                <h3 class="hl hl-lime" id="${t.id}-tasks" data-reveal>Performance Tasks</h3>
                <div class="files">${(tasks.length ? tasks : [{}]).map((it, i) => fileHTML(it, id, t.id, `Performance Task ${i + 1}`, i)).join('')}</div>
              </section>
              <section class="sheet" aria-labelledby="${t.id}-product" data-reveal>
                ${P.SVG.paperclip}<span class="flag" aria-hidden="true"></span>
                <h3 class="big-blue" id="${t.id}-product">Product</h3>
                <div class="files" style="margin-top:1.5rem">${(products.length ? products : [{}]).map((it, i) => fileHTML(it, id, t.id, `${t.name} Product`, i)).join('')}</div>
              </section>
            </div>
            <section class="lined" aria-labelledby="${t.id}-reflection" data-reveal>
              <h3 class="hl hl-yellow" id="${t.id}-reflection">Reflection</h3>
              ${reflectionHTML(term.reflection, id)}
            </section>
            <nav class="pager" aria-label="More terms">${pager}</nav>
          </div>
        </div>
      </section>`;
    }).join('');

    root.innerHTML = `
      <section class="hero desk" aria-labelledby="who">
        <div class="folder" aria-hidden="true"></div>
        <div class="hero-right">
          <p class="label hero-label" aria-hidden="true" data-drop>my portfolio</p>
          <div class="sheet-stack" data-drop style="--d:1">
            <nav class="side-tabs" aria-label="Terms">${termTabs()}</nav>
            <article class="notebook">
              ${P.rings()}
              <div class="hello">${P.SVG.nametag}<span class="hand">Hello, I’m</span></div>
              <h1 id="who">${esc(info.name)}</h1>
              <div class="intro">${intro}</div>
              <div class="notebook-foot">
                <p class="sticky-line">Pick a term from the tabs!</p>
                <div class="seal"><span class="seal-disc" aria-hidden="true">301I</span><p class="hand">Presentation Skills for IT</p></div>
              </div>
            </article>
          </div>
        </div>
        <div class="hero-left" data-drop style="--d:2">
          ${P.badge({ head: 'Loading...', photo: P.face(me, n + 1), name: info.name, sub: me.fullName || COURSE.section })}
          ${P.details('Details', rows)}
        </div>
      </section>
      ${P.ribbon([info.name, 'Prelim · Midterm · Finals', COURSE.subject, COURSE.section])}
      ${boards}`;

    document.title = `${info.name} · Loading...`;

    // Sub-pages: one term at a time, chosen by #prelim / #midterm / #finals.
    // Other anchors (#main from "Skip to content" and "Back to top") leave the open term alone.
    const sections = [...root.querySelectorAll('[data-term]')];
    const links = [...root.querySelectorAll('[data-term-link]')];
    const isTerm = (h) => TERMS.some((t) => t.id === h);
    let current = 'prelim';
    function paint() {
      sections.forEach((s) => { s.hidden = s.dataset.term !== current; });
      links.forEach((a) => a.setAttribute('aria-current', String(a.dataset.termLink === current)));
      reveal(root);
    }
    function onHash(scroll) {
      const want = location.hash.slice(1);
      if (!isTerm(want)) return;
      current = want;
      paint();
      if (scroll) document.getElementById(current)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
    addEventListener('hashchange', () => onHash(true));
    if (isTerm(location.hash.slice(1))) { onHash(false); requestAnimationFrame(() => document.getElementById(current)?.scrollIntoView()); } else paint();
  }

  /* ---------- landing page: fill names, photos and intros from the content files ---------- */
  function renderLanding() {
    const grid = document.querySelector('[data-badge-grid]');
    if (grid) grid.innerHTML = MEMBERS.map((m, i) => `<div>${P.face(member(m), i + 1, false, true)}</div>`).join('');
    document.querySelectorAll('[data-member-note]').forEach((el) => {
      const me = member(MEMBERS.find((m) => m.id === el.dataset.memberNote));
      if (me.fullName) el.querySelector('[data-full]').textContent = me.fullName;
      if (me.intro) el.querySelector('[data-intro]').textContent = me.intro.split(/\n\s*\n/)[0];
    });
  }

  /* ---------- reveal once on entering the view ---------- */
  let io;
  function reveal(scope) {
    const targets = scope.querySelectorAll('[data-reveal]:not(.is-in)');
    if (!('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
    io ||= new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    targets.forEach((el) => io.observe(el));
  }

  const root = document.querySelector('[data-member-root]');
  if (root) renderMember(root, root.dataset.memberRoot);
  else renderLanding();
  reveal(document);
  addEventListener('load', () => setTimeout(() => document.querySelectorAll('[data-reveal]').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
  }), 2500));
})();

/* Loading... — the drawn pieces of the desk (lanyard, badge, notebook, ribbon, icons).
   Shared by every page. Members never need to edit this file. */

(function (root) {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  const icon = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONS = {
    users: icon('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18.5 14.8c1.6.8 2.7 2.5 3 5.2"/>'),
    hash: icon('<path d="M5 9h15M4 15h15M10 3 8 21M16 3l-2 18"/>'),
    book: icon('<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20v-3"/>'),
    calendar: icon('<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
    id: icon('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14.5 10h4M14.5 13.5h3"/>'),
    link: icon('<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>'),
  };

  const SVG = {
    clasp: `<svg class="clasp" viewBox="0 0 44 92" aria-hidden="true"><circle cx="22" cy="12" r="9" fill="none" stroke="#9aa1ab" stroke-width="5"/><rect x="17" y="19" width="10" height="11" rx="3" fill="#b3b9c2"/><path d="M10 30h24v30a12 12 0 0 1-24 0z" fill="#cdd2d9" stroke="#8f96a0" stroke-width="2"/><path d="M17 36v22a5 5 0 0 0 10 0V36" fill="#eef0f3" stroke="#a3a9b2" stroke-width="1.5"/><rect x="14" y="70" width="16" height="20" rx="8" fill="none" stroke="#9aa1ab" stroke-width="4"/></svg>`,
    nametag: `<svg viewBox="0 0 70 46" aria-hidden="true"><rect x="2" y="7" width="60" height="35" rx="4" fill="#fff" stroke="#1f48b4" stroke-width="2.5"/><path d="M2 11a4 4 0 0 1 4-4h52a4 4 0 0 1 4 4v5H2z" fill="#1f48b4"/><text x="9" y="34" font-family="League Spartan, sans-serif" font-weight="700" font-size="13" fill="#1f48b4">NAME</text><path d="M52 42l10-10v6a4 4 0 0 1-4 4z" fill="#cfdffd"/></svg>`,
    paperclip: `<svg class="paperclip" viewBox="0 0 40 80" aria-hidden="true"><path d="M14 22v34a7 7 0 0 0 14 0V16a11 11 0 0 0-22 0v42a15 15 0 0 0 30 0V24" fill="none" stroke="#2fb352" stroke-width="4" stroke-linecap="round"/></svg>`,
    clip: `<svg viewBox="0 0 40 80" aria-hidden="true"><path d="M14 22v34a7 7 0 0 0 14 0V16a11 11 0 0 0-22 0v42a15 15 0 0 0 30 0V24" fill="none" stroke="#1f48b4" stroke-width="4" stroke-linecap="round"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>`,
    youtube: `<svg viewBox="0 0 36 36" aria-hidden="true"><rect x="2" y="7" width="32" height="22" rx="7" fill="#d6332e"/><path d="M15 12.5v11l9-5.5z" fill="#fff"/></svg>`,
  };

  // Lanyard + ID badge. `photo` is markup for the photo window.
  function badge({ head, photo, name, sub }) {
    return `<div class="badge-sway">
      <div class="lanyard" aria-hidden="true"><span class="strap"></span>${SVG.clasp}</div>
      <div class="badge">
        <div class="badge-card">
          <p class="badge-head">${esc(head)}</p>
          <div class="badge-photo">${photo}</div>
          <p class="badge-name">${esc(name)}${sub ? `<small>${esc(sub)}</small>` : ''}</p>
        </div>
      </div>
    </div>`;
  }

  // A photo, or the member's initial on their colour until they add one.
  // On the member's own badge: their initial; in the group badge (small = true): their name.
  function face(member, n, label = true, small = false) {
    if (member && member.photo) return `<img src="${esc(member.photo)}" alt="Photo of ${esc(member.fullName || member.name)}" width="400" height="500">`;
    const mark = small ? esc(member.name || '') : esc((member.name || '?').charAt(0));
    return `<div class="badge-initial" style="--c:var(--tab-${n});--ci:var(--tab-${n}-ink)"><span aria-hidden="${small ? 'false' : 'true'}">${mark}</span>${label ? '<p class="hand">photo coming soon</p>' : ''}</div>`;
  }

  function details(title, rows) {
    return `<div class="details-wrap"><span class="details-back" aria-hidden="true"></span><div class="details">
      <span class="tape" aria-hidden="true"></span>
      <h2>${esc(title)}</h2>
      <ul class="detail-list">${rows.map(([ic, label, value], i) => `<li data-reveal style="--d:${i}">${ICONS[ic]}<span>${esc(label)}</span><b>${esc(value)}</b></li>`).join('')}</ul>
    </div></div>`;
  }

  function rings() { return `<div class="rings" aria-hidden="true">${'<span></span>'.repeat(18)}</div>`; }

  function ribbon(words) {
    const once = words.map((w) => `<span>${esc(w)}</span>${SVG.star}`).join('');
    return `<div class="ribbon" aria-hidden="true"><div class="ribbon-track"><span>${once}</span><span>${once}</span></div></div>`;
  }

  root.LoadingParts = { esc, ICONS, SVG, badge, face, details, rings, ribbon };
})(typeof window !== 'undefined' ? window : globalThis);

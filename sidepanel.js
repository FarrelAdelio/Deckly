// Deckly — side panel logic
const KEY = 'deckly';
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const $ = (s, r = document) => r.querySelector(s);

const P = {
  panel: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
  pin: '<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  expand: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
  more: '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  flag: '<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',
  clip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  sub: '<path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  broom: '<path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11z"/><path d="m5 2 5 5"/>'
};
const svg = (n, s = 16, sw = 1.8) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;

const uid = () => Math.random().toString(36).slice(2, 10);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const parseD = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const todayISO = () => iso(new Date());
function fmtDue(s) {
  const d = parseD(s), y = d.getFullYear();
  return `${MONTHS[d.getMonth()]} ${d.getDate()}` + (y !== new Date().getFullYear() ? `, ${y}` : '');
}
function localDT(d) { return `${iso(d)}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; }
function fmtRemind(s) { const d = new Date(s); return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; }

const REPEAT = { none: 'Does not repeat', daily: 'Every day', weekly: 'Every week', monthly: 'Every month', yearly: 'Every year' };
const PRIO = [['No priority', ''], ['Low', 'p1'], ['Medium', 'p2'], ['High', 'p3']];

let state = null, sel = null, addingSub = null, pop = null;
const animIn = new Set(), busy = new Set();
let selAnim = null;
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ---------- Animations ---------- */
function expand(el) {
  if (REDUCE || !el) return;
  const cs = getComputedStyle(el), h = el.offsetHeight;
  const to = { height: h + 'px', opacity: 1, transform: 'none', paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, marginTop: cs.marginTop, marginBottom: cs.marginBottom };
  const from = { height: '0px', opacity: 0, transform: 'translateY(-6px)', paddingTop: '0px', paddingBottom: '0px', marginTop: '0px', marginBottom: '0px' };
  el.style.overflow = 'hidden';
  el.animate([from, to], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' }).finished
    .then(() => { el.style.overflow = ''; }).catch(() => { el.style.overflow = ''; });
}
function collapse(el) {
  if (REDUCE || !el) return Promise.resolve();
  const cs = getComputedStyle(el), h = el.offsetHeight;
  const p = { paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, marginTop: cs.marginTop, marginBottom: cs.marginBottom };
  el.style.overflow = 'hidden';
  return el.animate([
    { height: h + 'px', opacity: 1, transform: 'none', ...p },
    { height: h + 'px', opacity: 0, transform: 'translateX(16px)', ...p, offset: .45 },
    { height: '0px', opacity: 0, transform: 'translateX(16px)', paddingTop: '0px', paddingBottom: '0px', marginTop: '0px', marginBottom: '0px', borderWidth: '0px' }
  ], { duration: 340, easing: 'ease', fill: 'forwards' }).finished.catch(() => {});
}
function fly(fromEl) {
  if (REDUCE) return;
  const a = fromEl.getBoundingClientRect(), f = $('#done-toggle').getBoundingClientRect();
  const d = document.createElement('div'); d.className = 'flydot';
  d.style.left = (a.left + a.width / 2 - 6) + 'px'; d.style.top = (a.top + a.height / 2 - 6) + 'px';
  document.body.appendChild(d);
  const dx = (f.left + 26) - (a.left + a.width / 2), dy = (f.top + f.height / 2) - (a.top + a.height / 2);
  d.animate([
    { transform: 'translate(0,0) scale(1)', opacity: 1 },
    { transform: `translate(${dx * .5}px, ${dy * .35 - 16}px) scale(1.1)`, opacity: 1, offset: .45 },
    { transform: `translate(${dx}px, ${dy}px) scale(.35)`, opacity: .15 }
  ], { duration: 560, easing: 'cubic-bezier(.45,0,.3,1)' }).finished.then(() => d.remove()).catch(() => d.remove());
}
function bump() {
  const el = $('#done-toggle'); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
}
function completeAnimated(id) {
  if (busy.has(id)) return;
  const t = get(id); if (!t) return;
  const row = document.querySelector(`#list .task[data-id="${id}"]`);
  if (!row) return toggle(id);
  busy.add(id);
  const repeating = t.repeat && t.repeat !== 'none';
  row.classList.add('completing');
  wait(REDUCE ? 0 : 520).then(async () => {
    if (repeating) { busy.delete(id); toggle(id); return; }
    const els = [row];
    if (!t.parent) kids(id).filter(k => !k.done).forEach(k => { const e = document.querySelector(`#list .task[data-id="${k.id}"]`); if (e) els.push(e); });
    await Promise.all(els.map(collapse));
    busy.delete(id); toggle(id); bump();
  });
}
async function undoAnimated(id) {
  if (busy.has(id)) return;
  const row = document.querySelector(`#done-list .done-row[data-id="${id}"]`);
  if (!row) return toggle(id);
  busy.add(id);
  const chk = row.querySelector('.check'); chk.classList.remove('filled'); chk.innerHTML = '';
  await wait(REDUCE ? 0 : 200);
  await collapse(row);
  busy.delete(id); toggle(id);
}
async function removeAnimated(id) {
  const q = i => [...document.querySelectorAll(`.task[data-id="${i}"], .done-row[data-id="${i}"]`)];
  const els = [...q(id), ...kids(id).flatMap(k => q(k.id))];
  await Promise.all(els.map(collapse));
  remove(id);
}

/* ---------- Data ---------- */
function seed() {
  return {
    tasks: [{ id: 'a', title: 'Enjoy your day!', desc: '', parent: null }],
    settings: { theme: 'auto', pinned: true, showDone: false }
  };
}
async function load() {
  const d = await chrome.storage.local.get(KEY);
  state = d[KEY] || seed();
  const oldDummy = state.tasks.some(t => t.id === 'a' && t.title === 'Desain taskboard Chrome') ||
    (state.tasks.length === 2 && state.tasks[0].id === 'a' && state.tasks[0].title === 'Task 1' && state.tasks[1].id === 'b' && state.tasks[1].title === 'Sub task 1');
  if (oldDummy) { state.tasks = seed().tasks; }
  state.settings = Object.assign({ theme: 'auto', pinned: true, showDone: false }, state.settings);
  state.tasks = state.tasks.filter(t => t.title && t.title.trim()).map(t => { delete t.fresh; return t; });
  if (!d[KEY]) save();
}
function save() { return chrome.storage.local.set({ [KEY]: state }); }
const get = id => state.tasks.find(t => t.id === id);
const kids = id => state.tasks.filter(t => t.parent === id);
function commit(rerender = true) { save(); if (rerender) render(); }

function advance(t) {
  const base = t.due ? parseD(t.due) : new Date();
  if (t.repeat === 'daily') base.setDate(base.getDate() + 1);
  if (t.repeat === 'weekly') base.setDate(base.getDate() + 7);
  if (t.repeat === 'monthly') base.setMonth(base.getMonth() + 1);
  if (t.repeat === 'yearly') base.setFullYear(base.getFullYear() + 1);
  t.due = iso(base);
  if (t.remind) {
    const r = new Date(t.remind), n = new Date(base);
    n.setHours(r.getHours(), r.getMinutes());
    t.remind = localDT(n);
  }
}
function toggle(id) {
  const t = get(id); if (!t) return;
  if (!t.done) {
    if (t.repeat && t.repeat !== 'none') { advance(t); }
    else {
      t.done = true; t.doneAt = Date.now();
      if (!t.parent) kids(id).forEach(k => { if (!k.done) { k.done = true; k.doneAt = Date.now(); } });
    }
  } else {
    t.done = false; delete t.doneAt;
    if (t.parent) { const p = get(t.parent); if (p) p.done = false; }
  }
  animIn.add(id);
  if (t.done && !t.parent) kids(id).forEach(k => animIn.add(k.id));
  commit();
}
function remove(id) {
  const ids = new Set([id, ...kids(id).map(k => k.id)]);
  state.tasks = state.tasks.filter(t => !ids.has(t.id));
  if (sel && ids.has(sel)) sel = null;
  commit();
}
function newTask(parent = null) {
  const t = { id: uid(), title: '', desc: '', parent, fresh: true };
  if (parent) {
    let idx = state.tasks.indexOf(get(parent));
    while (state.tasks[idx + 1]?.parent === parent) idx++;
    state.tasks.splice(idx + 1, 0, t);
  } else state.tasks.unshift(t);
  animIn.add(t.id);
  sel = t.id; closePop(); render();
  focusField(t.id, 'title');
  $('#list').scrollTop = 0;
}
function duplicate(id) {
  const t = get(id), c = { ...t, id: uid(), title: t.title + ' (copy)', done: false, attach: t.attach ? [...t.attach] : undefined };
  state.tasks.splice(state.tasks.indexOf(t) + 1, 0, c);
  animIn.add(c.id);
  commit();
}

/* ---------- Render ---------- */
function metaHTML(t) {
  const parts = [];
  if (t.due) {
    const td = todayISO(), cls = t.done ? '' : t.due < td ? 'over' : t.due === td ? 'today' : '';
    parts.push(`<span class="due ${cls}">${fmtDue(t.due)}</span>`);
  }
  (t.tags || []).forEach(g => parts.push(`<span class="chip">${esc(g)}</span>`));
  if (t.repeat && t.repeat !== 'none') parts.push(`<span class="mi" title="${REPEAT[t.repeat]}">${svg('repeat', 11)}</span>`);
  if (t.remind) parts.push(`<span class="mi" title="${fmtRemind(t.remind)}">${svg('bell', 11)}${fmtRemind(t.remind)}</span>`);
  if (t.link) parts.push(`<a href="${esc(t.link)}" target="_blank" rel="noopener" title="${esc(t.link)}">${svg('link', 11)}</a>`);
  if (t.attach?.length) parts.push(`<span class="mi">${svg('clip', 11)}${t.attach.length}</span>`);
  return parts.length ? `<div class="meta">${parts.join('')}</div>` : '';
}
function actionsHTML(t) {
  const b = (k, icon, on, extra = '', title = '') =>
    `<button data-act="pop" data-k="${k}" class="${on ? 'on' : ''} ${extra}" title="${title}">${svg(icon, 15)}</button>`;
  return `<div class="actions${selAnim === t.id ? ' in' : ''}">
    ${b('due', 'calendar', !!t.due, '', 'Date')}
    ${b('tag', 'tag', t.tags?.length, '', 'Label')}
    ${b('repeat', 'repeat', t.repeat && t.repeat !== 'none', '', 'Repeat')}
    ${b('remind', 'bell', !!t.remind, '', 'Reminder')}
    ${b('prio', 'flag', t.prio > 0, PRIO[t.prio || 0][1], 'Priority')}
    ${b('attach', 'clip', t.attach?.length, '', 'Attachments')}
    ${b('link', 'link', !!t.link, '', 'Link')}
    ${t.parent ? '' : `<button data-act="sub" title="Add subtask">${svg('sub', 15)}</button>`}
  </div>`;
}
function rowHTML(t, isSub) {
  const s = sel === t.id;
  const showDesc = t.desc || s;
  return `<div class="task ${isSub ? 'sub' : ''} ${s ? 'sel' : ''} ${t.done ? 'done' : ''}" data-id="${t.id}">
    <button class="check" data-act="toggle" aria-label="Mark as completed">${t.done ? svg('check', 10, 3) : ''}</button>
    <div class="body">
      <div class="title" data-f="title" data-ph="Task title" ${s ? 'contenteditable="plaintext-only"' : ''} spellcheck="false">${esc(t.title)}</div>
      ${showDesc ? `<div class="desc" data-f="desc" data-ph="Add notes" ${s ? 'contenteditable="plaintext-only"' : ''} spellcheck="false">${esc(t.desc)}</div>` : ''}
      ${metaHTML(t)}
      ${s ? actionsHTML(t) : ''}
    </div>
    ${s ? `<button class="kebab" data-act="menu" title="Options">${svg('more', 15)}</button>` : ''}
  </div>`;
}
function render() {
  const list = $('#list');
  const active = state.tasks.filter(t => !t.done && !t.parent);
  let h = '';
  for (const t of active) {
    h += rowHTML(t, false);
    kids(t.id).filter(k => !k.done).forEach(k => h += rowHTML(k, true));
  }
  list.innerHTML = h || `<div class="empty">No tasks yet.<br>Add your first one above.</div>`;

  const done = state.tasks.filter(t => t.done).sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));
  $('#done-label').textContent = `Completed (${done.length})`;
  $('#done-list').innerHTML = done.map(t => `<div class="done-row" data-id="${t.id}">
      <button class="check filled" data-act="toggle" title="Mark as not completed">${svg('check', 10, 3)}</button>
      <span class="t">${esc(t.title)}</span>
      <button class="icon-btn del" data-act="del" title="Delete">${svg('trash', 14)}</button></div>`).join('');
  $('#footer').classList.toggle('open', !!state.settings.showDone);
  for (const id of animIn) expand(document.querySelector(`#list .task[data-id="${id}"], #done-list .done-row[data-id="${id}"]`));
  animIn.clear(); selAnim = null;
}
function focusField(id, f) {
  const el = document.querySelector(`.task[data-id="${id}"] [data-f="${f}"]`);
  if (!el) return;
  el.focus();
  const r = document.createRange(); r.selectNodeContents(el); r.collapse(false);
  const s = getSelection(); s.removeAllRanges(); s.addRange(r);
}
function applyTheme() {
  const t = state.settings.theme;
  document.documentElement.dataset.theme = t === 'auto' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : t;
}

/* ---------- Popover ---------- */
function closePop() { pop?.el.remove(); pop = null; }
function placePop(el, anchor) {
  const r = anchor.getBoundingClientRect(), w = el.offsetWidth, h = el.offsetHeight;
  let left = Math.min(Math.max(8, r.left - 20), innerWidth - w - 8);
  let top = r.bottom + 6;
  if (top + h > innerHeight - 8) top = Math.max(8, r.top - h - 6);
  el.style.left = left + 'px'; el.style.top = top + 'px';
}
function showPop(anchor, build) {
  closePop();
  const el = document.createElement('div'); el.className = 'pop';
  document.body.appendChild(el);
  pop = { el, anchor, build };
  fillPop();
}
function fillPop() {
  const { el, anchor, build } = pop;
  const { html, bind } = build();
  el.innerHTML = html; bind?.(el);
  placePop(el, anchor);
}
const opt = (label, attrs, active, icon = '', cls = '') =>
  `<button class="opt ${active ? 'active' : ''} ${cls}" ${attrs}>${icon ? svg(icon, 14) : ''}<span>${label}</span></button>`;

function popBuilder(kind, id) {
  const t = () => get(id);
  const done = (closeIt = true) => { commit(); if (closeIt) closePop(); else fillPop(); };
  switch (kind) {
    case 'due': return () => ({
      html: `<h4>Date</h4><input type="date" id="p-date" value="${t().due || ''}">
        <div class="row">
          <button class="pill" data-q="0">Today</button><button class="pill" data-q="1">Tomorrow</button>
          <button class="pill" data-q="7">Next week</button><button class="pill" data-q="x">Clear</button></div>`,
      bind(el) {
        $('#p-date', el).onchange = e => { t().due = e.target.value || undefined; done(); };
        el.querySelectorAll('[data-q]').forEach(b => b.onclick = () => {
          if (b.dataset.q === 'x') delete t().due;
          else { const d = new Date(); d.setDate(d.getDate() + +b.dataset.q); t().due = iso(d); }
          done();
        });
      }
    });
    case 'remind': return () => ({
      html: `<h4>Reminder</h4><input type="datetime-local" id="p-rem" value="${t().remind || ''}">
        <div class="row">
          <button class="pill" data-m="15">15 min</button><button class="pill" data-m="60">1 hour</button>
          <button class="pill" data-m="tom">Tomorrow 9:00</button><button class="pill" data-m="x">Clear</button></div>`,
      bind(el) {
        $('#p-rem', el).onchange = e => { t().remind = e.target.value || undefined; done(); };
        el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
          const m = b.dataset.m, d = new Date();
          if (m === 'x') delete t().remind;
          else {
            if (m === 'tom') { d.setDate(d.getDate() + 1); d.setHours(9, 0, 0, 0); } else d.setMinutes(d.getMinutes() + +m);
            t().remind = localDT(d);
          }
          done();
        });
      }
    });
    case 'repeat': return () => ({
      html: `<h4>Repeat</h4>` + Object.entries(REPEAT).map(([k, v]) => opt(v, `data-r="${k}"`, (t().repeat || 'none') === k)).join(''),
      bind(el) {
        el.querySelectorAll('[data-r]').forEach(b => b.onclick = () => {
          t().repeat = b.dataset.r === 'none' ? undefined : b.dataset.r;
          if (t().repeat && !t().due) t().due = todayISO();
          done();
        });
      }
    });
    case 'prio': return () => ({
      html: `<h4>Priority</h4>` + PRIO.map(([n, c], i) => opt(n, `data-p="${i}"`, (t().prio || 0) === i, 'flag', '')).join(''),
      bind(el) { el.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { t().prio = +b.dataset.p || undefined; done(); }); }
    });
    case 'tag': return () => {
      const all = [...new Set(state.tasks.flatMap(x => x.tags || []))].filter(g => !(t().tags || []).includes(g));
      return {
        html: `<h4>Label</h4><input type="text" id="p-tag" placeholder="Type a label and press Enter" maxlength="20">
          <div class="row">${(t().tags || []).map(g => `<button class="pill sel" data-rm="${esc(g)}">${esc(g)} ✕</button>`).join('')}
          ${all.map(g => `<button class="pill" data-add="${esc(g)}">${esc(g)}</button>`).join('')}</div>`,
        bind(el) {
          const inp = $('#p-tag', el); inp.focus();
          inp.onkeydown = e => {
            if (e.key !== 'Enter') return;
            const v = inp.value.trim(); if (!v) return;
            t().tags = [...new Set([...(t().tags || []), v])]; done(false); $('#p-tag').focus();
          };
          el.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { t().tags = t().tags.filter(g => g !== b.dataset.rm); if (!t().tags.length) delete t().tags; done(false); });
          el.querySelectorAll('[data-add]').forEach(b => b.onclick = () => { t().tags = [...(t().tags || []), b.dataset.add]; done(false); });
        }
      };
    };
    case 'link': return () => ({
      html: `<h4>Link</h4><input type="url" id="p-link" placeholder="https://..." value="${esc(t().link || '')}">
        <button class="save" id="p-save">Save</button>
        ${t().link ? `<button class="opt danger" id="p-del">${svg('trash', 14)}<span>Remove link</span></button>` : ''}
        <button class="opt" id="p-cur">${svg('link', 14)}<span>Use current tab URL</span></button>`,
      bind(el) {
        const inp = $('#p-link', el);
        const val = () => { let v = inp.value.trim(); if (v && !/^https?:\/\//i.test(v)) v = 'https://' + v; return v; };
        $('#p-save', el).onclick = () => { t().link = val() || undefined; done(); };
        inp.onkeydown = e => { if (e.key === 'Enter') $('#p-save').click(); };
        $('#p-del', el)?.addEventListener('click', () => { delete t().link; done(); });
        $('#p-cur', el).onclick = async () => {
          const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
          if (tab?.url) { inp.value = tab.url; }
        };
      }
    });
    case 'attach': return () => ({
      html: `<h4>Attachments</h4>
        ${(t().attach || []).map((a, i) => `<div class="att"><a href="${a.data}" download="${esc(a.name)}" title="Download">${esc(a.name)}</a>
          <button class="icon-btn" data-ra="${i}">${svg('x', 13)}</button></div>`).join('')}
        <label class="file-btn">+ Add file (max 1 MB)<input type="file" id="p-file" hidden></label>`,
      bind(el) {
        el.querySelectorAll('[data-ra]').forEach(b => b.onclick = () => { t().attach.splice(+b.dataset.ra, 1); if (!t().attach.length) delete t().attach; done(false); });
        $('#p-file', el).onchange = e => {
          const f = e.target.files[0]; if (!f) return;
          if (f.size > 1024 * 1024) { alert('Maximum file size is 1 MB.'); return; }
          const r = new FileReader();
          r.onload = () => { (t().attach ||= []).push({ name: f.name, data: r.result }); done(false); };
          r.readAsDataURL(f);
        };
      }
    });
    case 'menu': return () => ({
      html: (t().parent ? '' : opt('Add subtask', 'data-m="sub"', false, 'sub')) +
        opt('Duplicate', 'data-m="dup"', false, 'copy') +
        opt('Delete', 'data-m="del"', false, 'trash', 'danger'),
      bind(el) {
        el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
          const m = b.dataset.m; closePop();
          if (m === 'sub') newTask(id);
          if (m === 'dup') duplicate(id);
          if (m === 'del') removeAnimated(id);
        });
      }
    });
  }
}
function headerMenu() {
  const th = state.settings.theme;
  return () => ({
    html: `<h4>Theme</h4>` +
      [['auto', 'Auto (follow system)'], ['dark', 'Dark'], ['light', 'Light']].map(([k, v]) => opt(v, `data-th="${k}"`, th === k, 'sun')).join('') +
      `<h4 style="margin-top:10px">Data</h4>` +
      opt('Clear completed tasks', 'data-x="clean"', false, 'broom') +
      opt('Export to JSON', 'data-x="export"', false, 'download'),
    bind(el) {
      el.querySelectorAll('[data-th]').forEach(b => b.onclick = () => { state.settings.theme = b.dataset.th; applyTheme(); commit(false); fillPop(); });
      el.querySelectorAll('[data-x]').forEach(b => b.onclick = () => {
        if (b.dataset.x === 'clean') {
          Promise.all([...document.querySelectorAll('#done-list .done-row')].map(collapse)).then(() => { state.tasks = state.tasks.filter(t => !t.done); commit(); });
        }
        else {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(new Blob([JSON.stringify(state.tasks, null, 2)], { type: 'application/json' }));
          a.download = 'deckly-tasks.json'; a.click();
        }
        closePop();
      });
    }
  });
}

/* ---------- Events ---------- */
function bindEvents() {
  $('#logo').innerHTML = svg('panel', 15);
  $('#plus').innerHTML = svg('plus', 14);
  $('#btn-more').innerHTML = svg('more', 15);
  $('#chev').innerHTML = svg('chev', 15);

  $('#btn-more').onclick = e => { if (pop?.anchor === e.currentTarget) return closePop(); showPop(e.currentTarget, headerMenu()); };
  $('#done-toggle').onclick = () => { state.settings.showDone = !state.settings.showDone; commit(); };

  $('#btn-add').onclick = () => newTask(null);

  $('#list').addEventListener('click', e => {
    const row = e.target.closest('.task'); if (!row) return;
    const id = row.dataset.id, a = e.target.closest('[data-act]');
    if (e.target.closest('.meta a')) return;
    if (a) {
      const act = a.dataset.act;
      if (act === 'toggle') return completeAnimated(id);
      if (act === 'sub') return newTask(id);
      if (act === 'menu' || act === 'pop') {
        if (pop?.anchor === a) return closePop();
        return showPop(a, popBuilder(act === 'menu' ? 'menu' : a.dataset.k, id));
      }
    }
    if (sel !== id) {
      const f = e.target.closest('[data-f]')?.dataset.f;
      sel = id; selAnim = id; closePop(); render();
      if (f) focusField(id, f);
    }
  });
  $('#done-list').addEventListener('click', e => {
    const a = e.target.closest('[data-act]'); if (!a) return;
    const id = a.closest('.done-row').dataset.id;
    if (a.dataset.act === 'toggle') undoAnimated(id);
    if (a.dataset.act === 'del') removeAnimated(id);
  });

  $('#list').addEventListener('focusout', e => {
    const f = e.target.dataset?.f; if (!f) return;
    const row = e.target.closest('.task'); const t = row && get(row.dataset.id); if (!t) return;
    const v = e.target.textContent.trim();
    if (f === 'title') { if (v) t.title = v; else if (!t.fresh) e.target.textContent = t.title; }
    else t.desc = v;
    const stay = e.relatedTarget && row.contains(e.relatedTarget);
    if (!stay && t.fresh) {
      delete t.fresh;
      if (!t.title.trim()) { state.tasks = state.tasks.filter(x => x.id !== t.id); if (sel === t.id) sel = null; commit(); return; }
    }
    save();
  });
  $('#list').addEventListener('keydown', e => {
    const f = e.target.dataset?.f; if (!f) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      const t = get(e.target.closest('.task').dataset.id);
      if (f === 'title' && t?.fresh && e.target.textContent.trim()) focusField(t.id, 'desc');
      else e.target.blur();
    }
    if (e.key === 'Escape') e.target.blur();
  });

  document.addEventListener('click', e => {
    if (pop && !e.target.closest('.pop,[data-act="pop"],[data-act="menu"],#btn-more')) closePop();
    if (!e.target.closest('.task,.pop,.subinput,button,input,.footer,.addrow')) { sel = null; render(); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closePop(); } });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  chrome.storage.onChanged.addListener((c, area) => {
    if (area !== 'local' || !c[KEY]) return;
    const next = c[KEY].newValue;
    if (next && JSON.stringify(next) !== JSON.stringify(state)) {
      state = next; applyTheme();
      if (!document.activeElement?.closest?.('.task,.addrow,.pop,.subinput')) render();
    }
  });
}

(async function init() {
  await load();
  applyTheme();
  bindEvents();
  render();
})();

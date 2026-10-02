'use strict';
const $ = id => document.getElementById(id);
const enrollment = [44, 104, 162, 238, 300, 359, 408, 475];
const metrics = [
  ['475', 'BSCM students enrolled', 'Fall 2026', ''],
  ['69', 'Graduates', 'Last academic year', ''],
  ['$73K', 'Average starting salary', 'Senior exit survey', '*'],
  ['95%', 'Placement within 6 months', 'Employment or graduate school', '**'],
  ['84', 'For-credit CM internships', 'Last academic year', ''],
  ['60', 'Industry guest lectures', 'Last academic year', '']
];
for (const [value, label, period, footnote] of metrics) {
  const card = document.createElement('article'); card.className = 'metric';
  const number = document.createElement('div'); number.className = 'metric-value'; number.textContent = value;
  if (footnote) { const sup = document.createElement('sup'); sup.textContent = footnote; number.append(sup); }
  const title = document.createElement('div'); title.className = 'metric-label'; title.textContent = label;
  const when = document.createElement('div'); when.className = 'metric-period'; when.textContent = period;
  card.append(number, title, when); $('metrics').append(card);
}
enrollment.forEach((value, index) => {
  const column = document.createElement('div'); column.className = 'bar-column';
  const bar = document.createElement('div'); bar.className = 'bar'; bar.style.setProperty('--height', `${value / 500 * 100}%`); bar.title = `${2019 + index}: ${value} students`;
  const number = document.createElement('span'); number.className = 'bar-value'; number.textContent = value;
  const year = document.createElement('span'); year.className = 'bar-year'; year.textContent = 2019 + index;
  bar.append(number); column.append(bar, year); $('chart').append(column);
  const row = document.createElement('tr'); for (const text of [2019 + index, value]) { const cell = document.createElement('td'); cell.textContent = text; row.append(cell); } $('chart-data').append(row);
});
const industry = [
  ['Build your talent pipeline', 'Host for-credit CM internships and connect with students as they prepare for full-time employment.'],
  ['Bring your expertise into learning', 'Offer a guest lecture, trade demonstration, equipment showcase, practitioner panel, or site tour.'],
  ['Support career readiness', 'Join resume reviews, mock interviews, employer panels, or recruiting conversations.'],
  ['Engage student organizations', 'Connect with the ABC Student Chapter, Women in Construction Club, and competition teams.'],
  ['Partner with faculty', 'Host a Faculty Summer Industry Residency or collaborate on applied research tied to industry needs.'],
  ['Invest in student success', 'Support scholarships or sponsored student competition teams. $21,000 in department scholarships was awarded in AY 2025–26.']
];
const priorities = [
  ['Build the talent pipeline', ['Strengthen internship placement coordination and tracking.', 'Connect employers with students through resume reviews, mock interviews, and employer panels.', 'Expand student participation in ASC, ABC, and other industry competitions.', 'Increase faculty-mentored undergraduate research and applied learning opportunities.']],
  ['Bring industry into student learning', ['Offer structured guest lectures and practitioner panels.', 'Host jobsite tours, trade demonstrations, and equipment showcases.', 'Engage with student organizations and competition teams.', 'Participate in advisory activities that keep curriculum aligned with practice.']],
  ['Collaborate with faculty and the program', ['Host a Faculty Summer Industry Residency.', 'Collaborate on applied research aligned with industry needs.', 'Support faculty exposure to emerging technology and current practice.', 'Help inform continuous curriculum improvement.']]
];
const students = [
  ['Learn by doing', ['Complete a for-credit construction management internship.', 'Visit jobsites and learn through trade demonstrations and equipment showcases.', 'Earn the 30-hour OSHA card as part of the program.']],
  ['Learn with industry', ['Meet professionals through guest lectures, practitioner panels, and employer events.', 'Work on senior capstone experiences supported and mentored by industry partners.', 'Learn in a program informed by construction industry advisors.']],
  ['Get involved and build your network', ['Join the ABC Student Chapter or Women in Construction Club.', 'Participate in construction competitions and career-readiness activities.', 'Explore undergraduate research, including BIM and AI in construction.']]
];
const learning = [
  ['Safety & quality', 'Plan for safe work and understand quality assurance and control.'],
  ['Cost & accounting', 'Create estimates and understand construction accounting and cost control.'],
  ['Scheduling & project control', 'Create schedules and understand project control processes.'],
  ['Methods, materials & equipment', 'Analyze how projects are built and what resources are used.'],
  ['Technology', 'Apply electronic-based technology to manage the construction process.'],
  ['Contracts & delivery', 'Understand project delivery, roles, responsibilities, and legal implications.']
];
function cards(target, items) {
  items.forEach(([title, body], index) => {
    const article = document.createElement('article'); article.className = 'opportunity-card';
    const number = document.createElement('span'); number.className = 'number'; number.textContent = String(index + 1).padStart(2, '0');
    const heading = document.createElement('h3'); heading.textContent = title; article.append(number, heading);
    if (Array.isArray(body)) { const list = document.createElement('ul'); for (const text of body) { const item = document.createElement('li'); item.textContent = text; list.append(item); } article.append(list); }
    else { const paragraph = document.createElement('p'); paragraph.textContent = body; article.append(paragraph); }
    $(target).append(article);
  });
}
cards('industry-cards', industry); cards('priority-cards', priorities); cards('student-cards', students); cards('learning-cards', learning);
// Destinations decoded from the QR codes in the supplied social media handout.
const socialLinks = [
  'https://www.linkedin.com/company/fgcu-cm/',
  'https://www.instagram.com/fgcuconstructionmgt?stkn=MXJ6NGw4ZDljOG1sMg%3D%3D&utm_source=qr',
  'https://www.facebook.com/profile.php?id=61568686572836'
];
document.querySelectorAll('.social figure').forEach((figure, index) => {
  const caption = figure.querySelector('figcaption');
  const link = document.createElement('a'); link.href = socialLinks[index]; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = caption.textContent;
  caption.replaceChildren(link);
});
document.querySelector('.social .muted').textContent = 'Open a social link below, or scan a QR code with your phone.';
const tabs = [$('industry-tab'), $('student-tab')];
function selectTab(selected, focus = false) {
  for (const tab of tabs) { const active = tab === selected; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; $(tab.getAttribute('aria-controls')).hidden = !active; }
  if (focus) selected.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; selectTab(tabs[next], true); } });
});
$('print').addEventListener('click', () => window.print());
// Include partnership details in printouts and restore the screen state afterward.
let printDetailsState = null;
window.addEventListener('beforeprint', () => {
  if (printDetailsState) return;
  printDetailsState = Array.from(document.querySelectorAll('.priorities'), details => ({ details, open: details.open }));
  for (const { details } of printDetailsState) details.open = true;
});
window.addEventListener('afterprint', () => {
  for (const { details, open } of printDetailsState || []) details.open = open;
  printDetailsState = null;
});
const labels = { industry: 'Industry Partner Brief', student: 'Prospective Student & Family Guide', social: 'Student Guide · Social Media Edition' };
let currentDocument = null;
function highlight(element, text, query) {
  if (!query) { element.textContent = text; return; }
  const lower = text.toLocaleLowerCase(), match = query.toLocaleLowerCase(); let start = 0, position;
  while ((position = lower.indexOf(match, start)) !== -1) { element.append(document.createTextNode(text.slice(start, position))); const mark = document.createElement('mark'); mark.textContent = text.slice(position, position + query.length); element.append(mark); start = position + query.length; }
  element.append(document.createTextNode(text.slice(start)));
}
function renderDocument() {
  const query = $('source-search').value.trim().toLocaleLowerCase(); $('document-content').replaceChildren(); let count = 0;
  for (const block of currentDocument.blocks) {
    const text = block.type === 'table' ? block.rows.flat().join(' ') : block.text;
    if (query && !text.toLocaleLowerCase().includes(query)) continue;
    count++;
    if (block.type === 'paragraph') { const p = document.createElement('p'); p.className = 'document-block'; highlight(p, block.text, query); $('document-content').append(p); }
    else { const wrapper = document.createElement('div'); wrapper.className = 'document-table'; const table = document.createElement('table'); table.setAttribute('aria-label', 'Original handout table'); const body = document.createElement('tbody'); for (const row of block.rows) { const tr = document.createElement('tr'); for (const text of row) { const cell = document.createElement('td'); highlight(cell, text, query); tr.append(cell); } body.append(tr); } table.append(body); wrapper.append(table); $('document-content').append(wrapper); }
  }
  $('source-status').textContent = query ? `${count} matching text blocks or tables` : 'Original handout text, tables, and embedded images';
  if (!query) { const images = document.createElement('div'); images.className = 'document-images'; currentDocument.images.forEach((src, index) => { const img = document.createElement('img'); img.src = src; img.alt = index === 0 ? 'FGCU Construction Management department logo' : index === 1 ? 'Original enrollment chart, 2019–2026' : `${labels[currentDocument.id]} QR code ${index - 1}`; if (index > 1) img.className = 'qr'; images.append(img); }); $('document-content').append(images); }
}
for (const document of window.HANDOUTS) {
  const row = window.document.createElement('div'); row.className = 'source-row'; const name = window.document.createElement('span'); name.textContent = labels[document.id];
  const actions = window.document.createElement('div'); actions.className = 'source-actions'; const view = window.document.createElement('button'); view.textContent = 'Read'; view.setAttribute('aria-label', `Read ${labels[document.id]}`);
  view.addEventListener('click', () => { currentDocument = document; $('dialog-title').textContent = labels[document.id]; $('source-search').value = ''; renderDocument(); $('source-dialog').showModal(); });
  const download = window.document.createElement('a'); download.textContent = 'Download ↓'; download.href = encodeURIComponent(document.name); download.download = document.name; download.setAttribute('aria-label', `Download ${labels[document.id]}`);
  actions.append(view, download); row.append(name, actions); $('source-list').append(row);
}
$('source-search').addEventListener('input', renderDocument);
$('close-dialog').addEventListener('click', () => $('source-dialog').close());
$('source-dialog').addEventListener('click', event => { if (event.target === $('source-dialog')) { const rect = event.target.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close(); } });

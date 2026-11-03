// Рендер карусели Миры: node render.js spec.json out_dir
// spec: { card, cover_title, cover_sub, reveal, slides:[{title, paras:[...]}], final_top, final_gold }
// абзац, начинающийся с «*», выделяется золотом
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const A = require('./arcana.js');
const K = __dirname;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function face(key) {
  const c = A[key];
  if (!c) throw new Error('Нет такой карты: ' + key + '. Есть: ' + Object.keys(A).join(', '));
  const long = c.name.length > 9;
  return `<symbol id="face" viewBox="0 0 600 1000">
      <rect x="6" y="6" width="588" height="988" rx="34" fill="#170c22" stroke="url(#goldg)" stroke-width="10"/>
      <rect x="34" y="34" width="532" height="932" rx="20" fill="url(#sky)" stroke="#e8c77a" stroke-opacity=".55" stroke-width="3"/>
      <g fill="#fff" opacity=".6"><circle cx="90" cy="150" r="3"/><circle cx="520" cy="140" r="2.5"/><circle cx="70" cy="560" r="2"/><circle cx="530" cy="610" r="3"/><circle cx="200" cy="700" r="2"/><circle cx="420" cy="720" r="2.5"/></g>
      <text x="300" y="112" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="64" fill="#e8c77a">${c.n}</text>
      ${c.art}
      <rect x="34" y="860" width="532" height="106" fill="#2c1846"/>
      <path d="M34 860 H566" stroke="#e8c77a" stroke-opacity=".55" stroke-width="3"/>
      <text x="300" y="${long ? 928 : 934}" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="${long ? 44 : 58}" letter-spacing="${long ? 2 : 6}" fill="#e8c77a">${esc(c.name.toUpperCase())}</text>
    </symbol>`;
}

const corners = [1, 2, 3, 4].map(i => `<svg class="corner c${i}"><use href="#star8" width="34" height="34"/></svg>`).join('');
const dots = (n, t) => '<div class="dots">' + Array.from({ length: t }, (_, i) => `<i${i + 1 === n ? ' class="on"' : ''}></i>`).join('') + '</div>';
const card = (kind, w) => `<svg class="card" viewBox="0 0 600 1000" style="width:${w}px"><use href="#${kind}"/></svg>`;
const paras = ps => ps.map(t => t.startsWith('*') ? `<p class="gold">${esc(t.slice(1))}</p>` : `<p>${esc(t)}</p>`).join('');

function build(spec) {
  const c = A[spec.card];
  const total = 3 + spec.slides.length;
  const S = [];
  S.push(`<section class="slide" id="s1">${corners}<div class="stack"><h1>${esc(spec.cover_title || 'Карта дня')}</h1><p class="sub" style="margin:26px 0 44px">${esc(spec.cover_sub || 'Остановись на секунду. Эта карта вытянута для тебя.')}</p>${card('back', 330)}<p class="cta" style="margin-top:40px">Листай, чтобы открыть</p></div>${dots(1, total)}</section>`);
  const L = c.name.length, nm = L > 13 ? ' style="font-size:64px"' : L > 9 ? ' style="font-size:82px"' : L > 6 ? ' style="font-size:108px"' : '';
  S.push(`<section class="slide" id="s2">${corners}<div class="split" style="gap:56px;padding:0 110px">${card('face', 370)}<div class="col"><p class="cardname"${nm}>${esc(c.name)}</p><p class="arc">Старший аркан ${c.n}</p><p class="sub" style="font-size:32px">${esc(spec.reveal)}</p></div></div>${dots(2, total)}</section>`);
  spec.slides.forEach((sl, i) => S.push(`<section class="slide" id="s${i + 3}">${corners}<div class="split">${card('face', 300)}<div class="col"><h2>${esc(sl.title)}</h2><div class="body">${paras(sl.paras)}</div></div></div>${dots(i + 3, total)}</section>`));
  S.push(`<section class="slide" id="s${total}">${corners}<div class="stack"><svg viewBox="-50 -50 100 100" style="width:96px;margin-bottom:46px"><use href="#star8" x="-50" y="-50" width="100" height="100" fill="url(#goldg)"/></svg><div class="quote">${esc(spec.final_top)}<span>${esc(spec.final_gold)}</span></div></div>${dots(total, total)}</section>`);
  const css = fs.readFileSync(path.join(K, 'base.css'), 'utf8').split('__FONTS__').join('file://' + path.join(K, 'fonts'));
  const defs = fs.readFileSync(path.join(K, 'defs.svg'), 'utf8').replace('__FACE__', face(spec.card));
  return { html: `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${css}</style></head><body>${defs}${S.join('\n')}</body></html>`, total };
}

(async () => {
  const [specFile, outDir] = process.argv.slice(2);
  const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
  const bad = JSON.stringify(spec).match(/[—–]/);
  if (bad) throw new Error('В текстах есть длинное тире, замени на «-»');
  const { html, total } = build(spec);
  fs.mkdirSync(outDir, { recursive: true });
  const tmp = path.join(K, '_page.html'); fs.writeFileSync(tmp, html);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  // автоподгонка: длинные имена карт и заголовки уменьшаются, пока не влезут в колонку
  await p.evaluate(() => document.querySelectorAll('.cardname,h2').forEach(e => { const col = e.parentElement; let f = parseFloat(getComputedStyle(e).fontSize); while ((e.scrollWidth > col.clientWidth + 1 || col.scrollWidth > col.clientWidth + 1) && f > 40) { f -= 2; e.style.fontSize = f + 'px'; } }));
  // проверка: текст не вылезает за рамку
  const over = await p.evaluate(() => [...document.querySelectorAll('.slide')].filter(s => { const r = s.getBoundingClientRect(); return [...s.querySelectorAll('.col,.stack')].some(e => { const q = e.getBoundingClientRect(); return q.top < r.top + 60 || q.bottom > r.bottom - 100 || e.scrollWidth > e.clientWidth + 2 || q.right > r.right - 70; }) || [...s.querySelectorAll('.cardname,h1,h2')].some(e => e.getBoundingClientRect().right > r.right - 70); }).map(s => s.id));
  for (let i = 1; i <= total; i++) await (await p.$('#s' + i)).screenshot({ path: path.join(outDir, i + '.jpg'), type: 'jpeg', quality: 92 });
  await b.close();
  console.log(JSON.stringify({ ok: true, slides: total, overflow: over, out: outDir }));
})().catch(e => { console.error(e.message); process.exit(1); });

// 22 старших аркана: оригинальные эмблемы в стиле Миры (поле 600x1000, центр эмблемы ~ 300,400)
const G = 'url(#goldg)', L = '#e8c77a', F = '#d9cbef', N = '#170c22';
const st = (w = 9) => `fill="none" stroke="${L}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const star = (x, y, s, fill = L) => `<use href="#star8" x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" fill="${fill}"/>`;
const rays = (cx, cy, r1, r2, n, w = 6) => Array.from({ length: n }, (_, i) => { const a = i * 2 * Math.PI / n; return `<path d="M${(cx + r1 * Math.cos(a)).toFixed(1)} ${(cy + r1 * Math.sin(a)).toFixed(1)} L${(cx + r2 * Math.cos(a)).toFixed(1)} ${(cy + r2 * Math.sin(a)).toFixed(1)}" ${st(w)}/>`; }).join('');

const A = {
  fool: { n: '0', name: 'Шут', ru: 'Шут', art: `${rays(430, 230, 46, 74, 12, 6)}<circle cx="430" cy="230" r="34" fill="${G}"/>
    <path d="M160 600 L300 330" ${st(10)}/><path d="M282 300 q40 -30 70 10 q10 40 -30 52 q-40 6 -52 -26z" fill="${G}"/>
    <path d="M120 640 Q300 560 480 650" ${st(7)}/><circle cx="200" cy="470" r="16" fill="${F}"/><circle cx="182" cy="456" r="10" fill="${F}"/><circle cx="218" cy="456" r="10" fill="${F}"/>` },
  magician: { n: 'I', name: 'Маг', art: `<path d="M210 230 c0-50 90-50 90 0 c0 50 90 50 90 0 c0-50 -90-50 -90 0 c0 50 -90 50 -90 0z" ${st(9)}/>
    <path d="M300 300 V600" ${st(12)}/>${star(300, 300, 46)}<rect x="270" y="590" width="60" height="22" rx="8" fill="${G}"/>
    <circle cx="150" cy="420" r="26" ${st(7)}/><path d="M450 390 v60 M420 420 h60" ${st(7)}/><path d="M150 520 l26 40 h-52z" ${st(6)}/><path d="M450 520 v60" ${st(7)}/><circle cx="450" cy="510" r="12" fill="${L}"/>` },
  priestess: { n: 'II', name: 'Верховная Жрица', art: `<rect x="130" y="220" width="56" height="420" rx="6" fill="#2c1846" stroke="${L}" stroke-width="6"/><rect x="414" y="220" width="56" height="420" rx="6" fill="${F}" opacity=".85"/>
    <text x="158" y="330" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="48" fill="${L}">B</text><text x="442" y="330" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="48" fill="#2c1846">J</text>
    <path d="M350 300 a100 100 0 1 0 0 160 a85 85 0 1 1 0 -160z" fill="${G}"/><path d="M250 600 h100" ${st(8)}/><rect x="262" y="540" width="76" height="44" rx="6" ${st(6)}/>` },
  empress: { n: 'III', name: 'Императрица', art: `${Array.from({ length: 12 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 6; return star(300 + 170 * Math.cos(a), 380 + 170 * Math.sin(a), 30); }).join('')}
    <circle cx="300" cy="350" r="70" ${st(12)}/><path d="M300 420 V540 M245 485 H355" ${st(12)}/>` },
  emperor: { n: 'IV', name: 'Император', art: `<rect x="180" y="300" width="240" height="280" rx="10" fill="#2c1846" stroke="${L}" stroke-width="8"/>
    <path d="M180 300 q-50 -70 0 -110 M420 300 q50 -70 0 -110" ${st(9)}/><circle cx="300" cy="400" r="34" ${st(9)}/><path d="M300 434 V520 M262 470 H338" ${st(9)}/>
    <path d="M220 250 l30 -50 l50 40 l50 -40 l30 50 z" fill="${G}"/>` },
  hierophant: { n: 'V', name: 'Иерофант', art: `<path d="M300 200 V620 M240 260 H360 M220 320 H380 M200 380 H400" ${st(11)}/>
    <g transform="translate(300 560)"><path d="M-130 -10 L-20 80 M130 -10 L20 80" ${st(10)}/><circle cx="-140" cy="-20" r="22" ${st(8)}/><circle cx="140" cy="-20" r="22" ${st(8)}/></g>` },
  lovers: { n: 'VI', name: 'Влюблённые', art: `${rays(300, 220, 62, 100, 16, 5)}<circle cx="300" cy="220" r="48" fill="${G}"/>
    <circle cx="250" cy="460" r="90" ${st(10)}/><circle cx="350" cy="460" r="90" ${st(10)}/><path d="M300 600 l-26 -26 a18 18 0 0 1 26 -26 a18 18 0 0 1 26 26z" fill="${F}"/>` },
  chariot: { n: 'VII', name: 'Колесница', art: `<path d="M170 300 Q300 230 430 300" ${st(9)}/>${star(220, 300, 26)}${star(300, 270, 26)}${star(380, 300, 26)}
    <rect x="190" y="330" width="220" height="200" rx="12" fill="#2c1846" stroke="${L}" stroke-width="8"/><path d="M300 360 v140 M240 430 h120" ${st(7)}/>
    <circle cx="210" cy="590" r="44" fill="${F}"/><circle cx="390" cy="590" r="44" fill="${N}" stroke="${L}" stroke-width="6"/>` },
  strength: { n: 'VIII', name: 'Сила', art: `<path d="M210 230 c0-44 90-44 90 0 c0 44 90 44 90 0 c0-44 -90-44 -90 0 c0 44 -90 44 -90 0z" ${st(8)}/>
    <circle cx="300" cy="450" r="120" ${st(9)}/>${rays(300, 450, 128, 170, 20, 6)}<path d="M260 430 q10 -16 20 0 M320 430 q10 -16 20 0 M270 500 q30 26 60 0" ${st(8)}/>` },
  hermit: { n: 'IX', name: 'Отшельник', art: `<path d="M250 240 h100 l20 40 v170 q-70 40 -140 0 v-170z" fill="#2c1846" stroke="${L}" stroke-width="8"/>
    <circle cx="300" cy="370" r="80" fill="url(#glow)"/><path d="M300 320 l18 32 h-36z M300 410 l18 -32 h-36z" fill="${G}"/><path d="M300 240 V180" ${st(8)}/><circle cx="300" cy="170" r="14" ${st(6)}/>
    <path d="M410 200 L440 640" ${st(10)}/>` },
  wheel: { n: 'X', name: 'Колесо Фортуны', art: `<circle cx="300" cy="420" r="190" ${st(9)}/><circle cx="300" cy="420" r="130" ${st(6)}/><circle cx="300" cy="420" r="36" fill="${G}"/>
    ${rays(300, 420, 40, 128, 8, 7)}${['Т', 'А', 'Р', 'О'].map((c, i) => { const a = -Math.PI / 2 + i * Math.PI / 2; return `<text x="${(300 + 160 * Math.cos(a)).toFixed(0)}" y="${(420 + 160 * Math.sin(a) + 16).toFixed(0)}" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="44" fill="${F}">${c}</text>`; }).join('')}` },
  justice: { n: 'XI', name: 'Справедливость', art: `<path d="M300 190 V640" ${st(10)}/><path d="M140 300 H460" ${st(9)}/>
    <path d="M140 300 L100 420 h80z M460 300 L420 420 h80z" ${st(7)}/><path d="M95 420 q45 40 90 0 M415 420 q45 40 90 0" fill="${G}"/><path d="M270 640 h60" ${st(10)}/>${star(300, 190, 40)}` },
  hanged: { n: 'XII', name: 'Повешенный', art: `<path d="M140 220 H460 M180 220 V200 M420 220 V200" ${st(10)}/><path d="M300 220 V300" ${st(7)}/>
    <path d="M300 520 L200 330 H400 Z" ${st(10)}/>${rays(300, 560, 62, 98, 16, 5)}<circle cx="300" cy="560" r="50" fill="${G}"/>` },
  death: { n: 'XIII', name: 'Смерть', ru: 'Перемены', art: `<rect x="120" y="300" width="70" height="300" fill="#2c1846" stroke="${L}" stroke-width="6"/><rect x="410" y="300" width="70" height="300" fill="#2c1846" stroke="${L}" stroke-width="6"/>
    <path d="M200 560 a100 100 0 0 1 200 0z" fill="${G}"/>${rays(300, 560, 112, 150, 14, 5).replace(/<path d="M[\d.]+ (5[6-9]\d|6\d\d)[^>]*\/>/g, '')}
    <g transform="translate(300 330)"><circle r="22" fill="${F}"/>${[0, 72, 144, 216, 288].map(a => `<circle cx="${(36 * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(36 * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="26" fill="${F}" opacity=".9"/>`).join('')}<circle r="16" fill="${L}"/></g>
    <path d="M90 600 H510" ${st(7)}/>` },
  temperance: { n: 'XIV', name: 'Умеренность', art: `<path d="M150 260 h110 l-14 120 h-82z" ${st(8)}/><path d="M340 460 h110 l-14 120 h-82z" ${st(8)}/>
    <path d="M250 300 C330 330 330 420 380 470" fill="none" stroke="${F}" stroke-width="12" stroke-linecap="round"/>${star(300, 210, 40)}<path d="M150 640 q150 -40 300 0" ${st(6)}/>` },
  devil: { n: 'XV', name: 'Дьявол', ru: 'Искушение', art: `<path d="M200 300 q-20 -110 60 -120 M400 300 q20 -110 -60 -120" ${st(10)}/><circle cx="300" cy="360" r="90" fill="#2c1846" stroke="${L}" stroke-width="8"/>
    <path d="M300 300 l0 120 M250 360 h100" ${st(6)}/>${[0, 1, 2, 3].map(i => `<ellipse cx="${210 + i * 60}" cy="${540 + (i % 2) * 20}" rx="34" ry="22" ${st(7)}/>`).join('')}` },
  tower: { n: 'XVI', name: 'Башня', art: `<path d="M240 640 L260 300 H340 L360 640Z" fill="#2c1846" stroke="${L}" stroke-width="8"/><path d="M240 300 l20 -60 h80 l20 60" fill="${G}"/>
    <rect x="285" y="380" width="30" height="50" rx="14" fill="${L}"/><rect x="285" y="490" width="30" height="50" rx="14" fill="${L}"/>
    <path d="M430 160 L350 300 H400 L330 420" fill="none" stroke="${F}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>${star(160, 260, 26)}${star(470, 470, 22)}` },
  star: { n: 'XVII', name: 'Звезда', art: `<circle cx="300" cy="400" r="230" fill="url(#glow)"/>${star(300, 400, 260, G)}
    ${star(119, 217, 54)}${star(483, 207, 62)}${star(92, 452, 44)}${star(509, 475, 46)}${star(148, 630, 40)}${star(455, 625, 50)}${star(300, 168, 36, F)}
    <path d="M240 680 H360 M256 706 H344 M270 730 H330" ${st(6)}/>` },
  moon: { n: 'XVIII', name: 'Луна', art: `<circle cx="300" cy="320" r="150" fill="url(#glow)"/><path d="M350 200 a130 130 0 1 0 0 240 a100 100 0 1 1 0 -240z" fill="${G}"/>
    ${[0, 1, 2, 3, 4].map(i => `<path d="M${200 + i * 50} 500 q-10 18 0 30 q10 -12 0 -30z" fill="${F}"/>`).join('')}
    <rect x="110" y="470" width="50" height="170" fill="#2c1846" stroke="${L}" stroke-width="6"/><rect x="440" y="470" width="50" height="170" fill="#2c1846" stroke="${L}" stroke-width="6"/>
    <path d="M300 640 C260 600 340 580 300 540" ${st(7)}/>` },
  sun: { n: 'XIX', name: 'Солнце', art: `${rays(300, 380, 150, 230, 24, 8)}<circle cx="300" cy="380" r="130" fill="${G}"/>
    <path d="M250 360 q14 -18 28 0 M322 360 q14 -18 28 0 M255 425 q45 34 90 0" fill="none" stroke="${N}" stroke-width="8" stroke-linecap="round"/>
    ${[0, 1, 2].map(i => `<circle cx="${210 + i * 90}" cy="640" r="22" fill="${F}"/>`).join('')}` },
  judgement: { n: 'XX', name: 'Суд', ru: 'Пробуждение', art: `${rays(380, 230, 50, 120, 12, 6)}<path d="M160 520 L380 230" ${st(12)}/><path d="M380 230 l40 -60 l40 30z" fill="${G}"/>
    <path d="M200 470 h80 v70 h-80z" fill="${F}"/><path d="M240 470 v70 M200 505 h80" stroke="${N}" stroke-width="8"/>
    <path d="M110 640 q60 -60 120 0 q60 -60 120 0 q60 -60 120 0" ${st(7)}/>` },
  world: { n: 'XXI', name: 'Мир', art: `<ellipse cx="300" cy="420" rx="150" ry="220" ${st(12)}/><ellipse cx="300" cy="420" rx="130" ry="200" fill="none" stroke="${F}" stroke-width="4" stroke-dasharray="6 18" stroke-linecap="round"/>
    ${star(300, 420, 120, G)}${star(120, 210, 44)}${star(480, 210, 44)}${star(120, 630, 44)}${star(480, 630, 44)}
    <path d="M285 200 l15 -24 l15 24 M285 640 l15 24 l15 -24" ${st(7)}/>` },
};
module.exports = A;

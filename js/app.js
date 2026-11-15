// María Site 2 · Aplicación principal: escena 3D, rastreador Luna/Marte, línea de tiempo, TV, videos y anexos
// Código escrito con asistencia de Claude (Anthropic) y revisado por el Equipo María 2.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildModel } from './modelos3d.js';

const O = window.OBJECTS, P = window.PROJECT, TC = window.TYPE_COLORS;
const MOON = window.MOON_OBJECTS, MARS = window.MARS_OBJECTS, MORB = window.MARS_ORBITERS, MEV = window.MARS_EVENTS;
const ST = { activo:['Activo','#3ddc97'], pasivo:['Pasivo','#4cc9f0'], inactivo:['Inactivo','#f4a259'], impacto:['Impacto','#ef476f'], perdido:['Perdido','#9b8cff'], exito:['Misión cumplida','#3ddc97'] };
const ST_DESC = { activo:'funciona hoy', pasivo:'sin energía pero aún útil (retrorreflectores)', inactivo:'intacto, sin funcionar', impacto:'estrellado o destruido', perdido:'contacto perdido / en revisión' };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
const fmtDate = d => { if (!d) return '—'; const [y, m, dd] = d.split('-'); const M = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']; return dd ? `${+dd} ${M[+m - 1]} ${y}` : y; };
const coord = (la, lo) => la == null ? 'Desconocida' : `${Math.abs(la).toFixed(2)}° ${la >= 0 ? 'N' : 'S'}, ${Math.abs(lo).toFixed(2)}° ${lo >= 0 ? 'E' : 'O'}`;
const byId = {}; [...MOON, ...MARS, ...MORB].forEach(o => byId[o.id] = o);

// ---------- estado de objetos del sistema solar (data.js)
const SOLAR_ST = { apollo11:'pasivo', voyager1:'activo', voyager2:'activo', hubble:'activo', cassini:'impacto', iss:'activo', newhorizons:'activo', curiosity:'activo', juno:'activo', parker:'activo', perseverance:'activo', jwst:'activo', clipper:'activo' };
const SOLAR_IMG = { curiosity:'r-curiosity', perseverance:'r-perseverance', apollo11:'m-apolo-11-modulo-lunar-eagle-descenso' };
function norm(o) {
  if (o.body === 'moon' || o.body === 'mars') return { ...o, who: o.body === 'moon' ? 'sury' : 'oppy',
    where: o.body === 'moon' ? 'Luna' : (o.orbit ? 'Órbita de Marte' : 'Marte'), coords: o.orbit ? 'En órbita' : coord(o.lat, o.lon) };
  const st = SOLAR_ST[o.id] || 'activo';
  return { id:o.id, name:o.name, type:o.type, agency:o.agency, date:String(o.year), where:o.where, dist:o.dist, status:st, statusNote:o.status,
    story:o.what + ' ' + o.why, quote:o.fact, images:(byId[SOLAR_IMG[o.id]] || {}).images || [], who:'sury', sources:[['Ver “Fuente de datos”', '#fuentes']] };
}

// ---------- tarjeta carrusel (drawer)
const drawer = document.getElementById('drawer'), dcar = document.getElementById('dcar'), dbody = document.getElementById('dbody');
drawer.querySelector('.x').onclick = () => drawer.classList.remove('open');
addEventListener('keydown', e => { if (e.key === 'Escape') { drawer.classList.remove('open'); closeTV(); } });
function carousel(el, imgs, o) {
  if (!imgs.length) { el.innerHTML = `<div class="noimg">${charSVG(o.who)}<div><b>Sin foto verificada todavía.</b><br>Estamos buscando una imagen real en las fuentes de la NASA para este objeto. Si el equipo la encuentra, se agrega aquí.</div></div>`; return; }
  el.innerHTML = `<div class="slides">${imgs.map(i => `<figure><img loading="lazy" src="${esc(i.src)}" alt="${esc(i.cap)}" onerror="this.parentNode.innerHTML='<div class=bad>No se pudo cargar esta imagen (revisa tu conexión).</div>'"><figcaption>${esc(i.cap)}</figcaption></figure>`).join('')}</div>
    ${imgs.length > 1 ? `<div class="dots">${imgs.map((_, k) => `<i class="${k ? '' : 'on'}"></i>`).join('')}</div><button class="prev" aria-label="Anterior">‹</button><button class="next" aria-label="Siguiente">›</button>` : ''}`;
  let k = 0; const sl = el.querySelector('.slides'), dots = el.querySelectorAll('.dots i');
  const go = n => { k = (n + imgs.length) % imgs.length; sl.style.transform = `translateX(${-100 * k}%)`; dots.forEach((d, j) => d.classList.toggle('on', j === k)); };
  el.querySelector('.prev')?.addEventListener('click', () => go(k - 1)); el.querySelector('.next')?.addEventListener('click', () => go(k + 1));
  let sx = null; el.ontouchstart = e => sx = e.touches[0].clientX; el.ontouchend = e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(k + (dx < 0 ? 1 : -1)); sx = null; };
}
function openCard(raw) {
  const o = norm(raw), [sl, sc] = ST[o.status] || ST.inactivo, ch = CHARS[o.who];
  carousel(dcar, o.images || [], o);
  dbody.innerHTML = `<span class="pill" style="--c:${sc}"><i></i>${sl}</span> <span class="mono" style="margin-left:6px">${esc(o.type)}</span>
    <h2>${esc(o.name)}</h2>
    <dl class="facts"><dt>Agencia / país</dt><dd>${esc(o.agency)}</dd><dt>${o.status === 'impacto' ? 'Impacto' : 'Fecha clave'}</dt><dd>${fmtDate(o.date)}</dd>
    <dt>Dónde</dt><dd>${esc(o.where)}</dd>${o.coords ? `<dt>Coordenadas</dt><dd>${o.coords}</dd>` : ''}${o.dist ? `<dt>Distancia</dt><dd>${esc(o.dist)}</dd>` : ''}<dt>Estado</dt><dd>${esc(o.statusNote || '')}</dd></dl>
    <p class="story">${esc(o.story)}</p>
    ${o.quote ? `<div class="bubble">${charSVG(o.who)}<div><b>${ch.name} dice:</b>${esc(o.quote)}</div></div>` : ''}
    <div class="srcs">Fuente: ${(o.sources || []).map(s => `<a href="${esc(s[1])}" ${s[1].startsWith('#') ? '' : 'target="_blank" rel="noopener"'}>${esc(s[0])}</a>`).join(' · ')}</div>`;
  drawer.classList.add('open'); dbody.scrollTop = 0;
}

const navEl = document.querySelector('nav'); addEventListener('scroll', () => navEl.classList.toggle('solid', scrollY > innerHeight * .6), { passive: true });
// ---------- textos del proyecto
const CFG = window.CONFIG || {}; if (CFG.repo) { P.repo = CFG.repo; P.repoLabel = CFG.repo.replace(/^https?:\/\//, ''); }
document.querySelectorAll('.repo-link').forEach(a => { a.href = P.repo; if (a.classList.contains('repo')) a.textContent = P.repoLabel; });
document.getElementById('foot').textContent = `Equipo ${P.team} · ${P.semillero} · ${new Date().getFullYear()}`;
const span = { equipo:'w', resumen:'w', problema:'w', arquitectura:'w', procesamiento:'w', demo:'t', tecnica:'t', fuentes:'t' };
const order = ['reto','solucion','problema','resumen','equipo','beneficiarios','escalabilidad','arquitectura','investigacion','pitch','procesamiento','demo','tecnica','fuentes'];
document.getElementById('grid').innerHTML = order.map((id, i) => { const s = P.sections.find(x => x.id === id); return `<article class="card ${span[id] || ''}" id="${s.id}"><div class="n">${String(i + 1).padStart(2, '0')} · ${s.kicker}</div><h3>${s.title}</h3>${s.html}</article>`; }).join('');
const legendHTML = ks => ks.map(k => `<span style="--c:${ST[k][1]}"><i></i><b style="color:var(--ink);font-weight:500">${ST[k][0]}</b> — ${ST_DESC[k]}</span>`).join('');
document.getElementById('legend').innerHTML = legendHTML(['activo','pasivo','inactivo','impacto','perdido']);

// ---------- utilidades 3D
function glowTex(inner = 'rgba(255,255,255,1)') {
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, inner); g.addColorStop(.25, inner.replace(/[\d.]+\)$/, '.5)')); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c);
}
const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${n >> 8 & 255},${n & 255},${a})`; };
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ================= HERO: sistema solar =================
const canvas = document.getElementById('space'), hero = document.getElementById('hero');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, 1, 0.01, 3000);
const controls = new OrbitControls(camera, canvas); controls.enableDamping = true; controls.minDistance = .4; controls.maxDistance = 600;
scene.add(new THREE.AmbientLight(0xffffff, .22)); scene.add(new THREE.PointLight(0xfff1d6, 2.6, 0, 0));
{ const n = 4000, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const r = 900 + Math.random() * 600, t = Math.random() * Math.PI * 2, f = Math.acos(2 * Math.random() - 1); p.set([r * Math.sin(f) * Math.cos(t), r * Math.cos(f), r * Math.sin(f) * Math.sin(t)], i * 3); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3)); scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false }))); }
const dist = au => au === 0 ? 0 : 14 * Math.sqrt(au);
const PLANETS = [{ id:'sun', name:'Sol', au:0, r:2.6, c:0xffc35a, a:0 }, { id:'mercury', name:'Mercurio', au:.39, r:.28, c:0x9a8f87, a:2.2 }, { id:'venus', name:'Venus', au:.72, r:.5, c:0xe0c48f, a:4.1 }, { id:'earth', name:'Tierra', au:1, r:.6, c:0x3a7bd5, a:.9 }, { id:'mars', name:'Marte', au:1.52, r:.42, c:0xc1532f, a:5.6 }, { id:'jupiter', name:'Júpiter', au:5.2, r:1.6, c:0xd2a77a, a:2.9 }, { id:'saturn', name:'Saturno', au:9.5, r:1.35, c:0xe3cf9c, a:1.6, ring:true }, { id:'uranus', name:'Urano', au:19.2, r:.9, c:0x9fd8e0, a:4.6 }, { id:'neptune', name:'Neptuno', au:30, r:.88, c:0x4b6fd6, a:.2 }, { id:'pluto', name:'Plutón', au:39.5, r:.2, c:0xc9b8a6, a:3.7 }];
const PP = {}, labels = [], labelsEl = document.getElementById('labels'), spinners = [];
function addLabel(text, pos, cls, color, onClick) { const el = document.createElement(onClick ? 'button' : 'div'); el.className = 'lbl ' + cls; el.textContent = text; if (color) el.style.setProperty('--c', color); if (onClick) el.onclick = onClick; labelsEl.appendChild(el); labels.push({ el, pos }); return el; }
for (const p of PLANETS) {
  const pos = new THREE.Vector3(Math.cos(p.a) * dist(p.au), 0, Math.sin(p.a) * dist(p.au)); PP[p.id] = pos;
  const mat = p.id === 'sun' ? new THREE.MeshBasicMaterial({ color: p.c }) : new THREE.MeshStandardMaterial({ color: p.c, roughness: .9, metalness: 0 });
  const m = new THREE.Mesh(new THREE.SphereGeometry(p.r, 48, 32), mat); m.position.copy(pos); scene.add(m); spinners.push(m);
  if (p.id === 'sun') { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex('rgba(255,190,90,1)'), blending: THREE.AdditiveBlending, depthWrite: false })); s.scale.set(16, 16, 1); scene.add(s); }
  else scene.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, dist(p.au), dist(p.au)).getPoints(256).map(v => new THREE.Vector3(v.x, 0, v.y))), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .09 })));
  if (p.ring) { const r = new THREE.Mesh(new THREE.RingGeometry(p.r * 1.35, p.r * 2.3, 64), new THREE.MeshBasicMaterial({ color: 0xd9c595, side: THREE.DoubleSide, transparent: true, opacity: .55 })); r.rotation.x = -Math.PI / 2 + .45; r.position.copy(pos); scene.add(r); }
  if (p.id === 'mars') addLabel('Marte · ver equipos →', pos, 'go', '#ff8a5c', () => goTracker('mars'));
  else addLabel(p.name, pos, 'pl');
}
PP.moon = PP.earth.clone().add(new THREE.Vector3(1.6, .15, .7));
{ const m = new THREE.Mesh(new THREE.SphereGeometry(.16, 32, 16), new THREE.MeshStandardMaterial({ color: 0xb8b8b8, roughness: 1 })); m.position.copy(PP.moon); scene.add(m); addLabel('Luna · ver equipos →', PP.moon.clone().add(new THREE.Vector3(0, -.25, 0)), 'go', '#dfe6f5', () => goTracker('moon')); }
PP.earthL2 = PP.earth.clone().add(PP.earth.clone().normalize().multiplyScalar(2.6)).add(new THREE.Vector3(0, .3, 0));
{ const h = new THREE.Mesh(new THREE.SphereGeometry(dist(120), 64, 32), new THREE.MeshBasicMaterial({ color: 0x4f7cff, wireframe: true, transparent: true, opacity: .035 })); scene.add(h); addLabel('Heliopausa ≈120 UA', new THREE.Vector3(0, dist(120) * .72, dist(120) * .69), 'pl'); }
const items = O.map(o => {
  const s = o.scene; let pos, fly = 4, scale = .28;
  if (s.body === 'moon') { pos = PP.moon.clone().add(new THREE.Vector3(0, .17, 0)); fly = .9; scale = .06; }
  else if (s.body === 'earthL2') { pos = PP.earthL2.clone(); fly = 2.2; scale = .14; }
  else if (s.body) { pos = PP[s.body].clone().add(new THREE.Vector3(...s.off)); if (s.body === 'mars') { fly = 1.1; scale = .045; } else if (s.body === 'earth') { fly = 2; scale = .1; } }
  else { pos = new THREE.Vector3(Math.cos(s.ang) * dist(s.au), s.y, Math.sin(s.ang) * dist(s.au)); fly = s.au > 20 ? 7 : 3.5; scale = s.au > 20 ? .9 : .3; }
  const model = buildModel(o.icon); model.scale.setScalar(scale); model.position.copy(pos); scene.add(model);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex(hexA(TC[o.type], 1)), blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: false })); glow.scale.set(.035, .035, 1); glow.position.copy(pos); scene.add(glow);
  const el = addLabel(o.short, pos, '', TC[o.type], () => selectHero(o.id));
  return { o, pos, fly, model, el };
});
const rail = document.getElementById('rail'), drawerEl = document.getElementById('objdrawer');
const groups = [['Luna y Marte', o => ['moon','mars'].includes(o.scene.body)], ['Órbita terrestre y L2', o => ['earth','earthL2'].includes(o.scene.body)], ['Resto del sistema solar', o => !['moon','mars','earth','earthL2'].includes(o.scene.body)]];
rail.innerHTML = groups.map(([t, f]) => `<h6>${t}</h6>` + O.filter(f).map(o => `<button data-id="${o.id}" style="--c:${TC[o.type]}"><i></i>${o.short}</button>`).join('')).join('');
document.getElementById('railn').textContent = `(${O.length})`;
document.getElementById('railbtn').onclick = () => drawerEl.classList.toggle('open');
rail.onclick = e => { const b = e.target.closest('button'); if (b) { selectHero(b.dataset.id); drawerEl.classList.remove('open'); } };
let tween = null;
function flyTo(target, d, dirOverride) {
  const dir = dirOverride || camera.position.clone().sub(controls.target).normalize().lerp(new THREE.Vector3(.4, .55, .7).normalize(), .5).normalize();
  tween = { fp: camera.position.clone(), ft: controls.target.clone(), tp: target.clone().add(dir.multiplyScalar(d)), tt: target.clone(), t0: performance.now(), dur: 1600 };
}
function selectHero(id) {
  const it = items.find(i => i.o.id === id);
  document.querySelectorAll('#labels .lbl.on, #rail .on').forEach(e => e.classList.remove('on')); it.el.classList.add('on'); rail.querySelector(`[data-id="${id}"]`).classList.add('on');
  flyTo(it.pos, it.fly); openCard(it.o);
}
function setView(v) { if (v === 'inner') flyTo(new THREE.Vector3(0, 0, 0), 48, new THREE.Vector3(0, .8, .6).normalize()); else flyTo(new THREE.Vector3(0, 0, 0), 330, new THREE.Vector3(.15, .62, .77).normalize()); }
document.querySelectorAll('.views button').forEach(b => b.onclick = () => { if (b.dataset.go) return goTracker(b.dataset.go); drawer.classList.remove('open'); setView(b.dataset.v); });
camera.position.set(0, 210, 260); setTimeout(() => setView('inner'), 300);
function resize() { const w = hero.clientWidth, h = hero.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
addEventListener('resize', resize); resize();
const v3 = new THREE.Vector3();
let heroVisible = true; new IntersectionObserver(e => heroVisible = e[0].isIntersecting).observe(hero);

// ================= RASTREADOR LUNA / MARTE =================
const gc = document.getElementById('globe'), gwrap = gc.parentElement;
const gr = new THREE.WebGLRenderer({ canvas: gc, antialias: true, alpha: true }); gr.setPixelRatio(Math.min(devicePixelRatio, 2));
const gs = new THREE.Scene(), gcam = new THREE.PerspectiveCamera(40, 1, .01, 100); gcam.position.set(0, .6, 3.6);
const gctl = new OrbitControls(gcam, gc); gctl.enableDamping = true; gctl.minDistance = 1.25; gctl.maxDistance = 7; gctl.enablePan = false; gctl.rotateSpeed = .6;
gs.add(new THREE.AmbientLight(0xffffff, 1.1)); const gsun = new THREE.DirectionalLight(0xffffff, 1.4); gsun.position.set(4, 2, 3); gs.add(gsun);
{ const n = 1500, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const r = 40 + Math.random() * 10, t = Math.random() * 6.283, f = Math.acos(2 * Math.random() - 1); p.set([r * Math.sin(f) * Math.cos(t), r * Math.cos(f), r * Math.sin(f) * Math.sin(t)], i * 3); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3)); gs.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, sizeAttenuation: false }))); }
function noise2(seed) { const p = new Uint8Array(512); let s = seed; for (let i = 0; i < 256; i++) p[i] = i; for (let i = 255; i > 0; i--) { s = (s * 16807) % 2147483647; const j = s % (i + 1); [p[i], p[j]] = [p[j], p[i]]; } for (let i = 0; i < 256; i++) p[i + 256] = p[i];
  const f = t => t * t * t * (t * (t * 6 - 15) + 10), l = (a, b, t) => a + t * (b - a), gr2 = (h, x, y) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y);
  return (x, y) => { const X = Math.floor(x) & 255, Y = Math.floor(y) & 255; x -= Math.floor(x); y -= Math.floor(y); const u = f(x), v = f(y), A = p[X] + Y, B = p[X + 1] + Y; return l(l(gr2(p[A], x, y), gr2(p[B], x - 1, y), u), l(gr2(p[A + 1], x, y - 1), gr2(p[B + 1], x - 1, y - 1), u), v); }; }
function procTex(kind) {
  const W = 1024, H = 512, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'), img = x.createImageData(W, H), n = noise2(kind === 'moon' ? 7 : 11);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    let v = 0, a = 1, fr = 4; for (let o = 0; o < 5; o++) { v += a * n(i / W * fr, j / H * fr / 2); a *= .5; fr *= 2; }
    const lat = 90 - j / H * 180; let r, g, b;
    if (kind === 'moon') { const mv = n(i / W * 6 + 10, j / H * 3 + 3), mare = mv > .18 ? .72 : mv > .1 ? .86 : 1; const k = (150 + v * 70) * mare; r = g = b = k; }
    else { const dark = n(i / W * 2.5 + 5, j / H * 1.25) > .15 ? .62 : 1; r = (178 + v * 60) * dark; g = (92 + v * 34) * dark; b = (58 + v * 20) * dark; if (Math.abs(lat) > 78) { r = g = b = 235 + v * 20; } }
    const k4 = (j * W + i) * 4; img.data[k4] = r; img.data[k4 + 1] = g; img.data[k4 + 2] = b; img.data[k4 + 3] = 255; }
  x.putImageData(img, 0, 0);
  if (kind === 'moon') for (let k = 0; k < 260; k++) { const cx = Math.random() * W, cy = Math.random() * H, rr = Math.random() ** 3 * 22 + 2; x.strokeStyle = 'rgba(0,0,0,.18)'; x.lineWidth = 1.5; x.beginPath(); x.arc(cx, cy, rr, 0, 6.283); x.stroke(); x.strokeStyle = 'rgba(255,255,255,.12)'; x.beginPath(); x.arc(cx - 1, cy - 1, rr, 0, 6.283); x.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const TEX_URLS = { moon:['https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/moon_1024.jpg', 'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/moonmap1k.jpg'],
  mars:['https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/marsmap1k.jpg'] };
const texLoader = new THREE.TextureLoader(); texLoader.setCrossOrigin('anonymous');
const texState = {};
function loadTex(kind, mat) {
  mat.map = procTex(kind); mat.needsUpdate = true; texState[kind] = 'ilustrativa';
  const tryN = k => { const u = TEX_URLS[kind][k]; if (!u) return; texLoader.load(u, t => { t.colorSpace = THREE.SRGBColorSpace; mat.map = t; mat.needsUpdate = true; texState[kind] = 'mapa real'; updateNote(); }, undefined, () => tryN(k + 1)); };
  tryN(0);
}
const globes = {};
for (const k of ['moon', 'mars']) {
  const mat = new THREE.MeshStandardMaterial({ roughness: 1, metalness: 0 }); loadTex(k, mat);
  const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), mat));
  if (k === 'mars') { const atm = new THREE.Mesh(new THREE.SphereGeometry(1.025, 64, 48), new THREE.MeshBasicMaterial({ color: 0xff8a5c, transparent: true, opacity: .08, side: THREE.BackSide })); g.add(atm); }
  g.visible = false; gs.add(g); globes[k] = { g, markers: [] };
}
const llPos = (lat, lon, r = 1.006) => { const phi = (lon + 180) / 360 * Math.PI * 2, th = (90 - lat) * Math.PI / 180; return new THREE.Vector3(-r * Math.cos(phi) * Math.sin(th), r * Math.cos(th), r * Math.sin(phi) * Math.sin(th)); };
const texCache = {}; const markerTex = c => texCache[c] || (texCache[c] = glowTex(hexA(c, 1)));
function addMarkers(k, list) {
  for (const o of list) {
    if (o.lat == null && !o.orbit) continue;
    const c = ST[o.status][1], sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: markerTex(c), depthTest: true, depthWrite: false, sizeAttenuation: false }));
    const big = o.images && o.images.length; sp.scale.set(big ? .05 : .034, big ? .05 : .034, 1);
    if (o.orbit) { sp.userData.orbit = { r: o.r, inc: o.inc, ph: Math.random() * 6.283, sp: .25 / o.r }; sp.scale.set(.04, .04, 1);
      const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, o.r, o.r).getPoints(128).map(v => new THREE.Vector3(v.x, 0, v.y))), new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: .18 }));
      ring.rotation.x = o.inc * .35; ring.rotation.z = o.inc * .2; sp.userData.ring = ring; globes[k].g.add(ring); }
    else sp.position.copy(llPos(o.lat, o.lon));
    sp.userData.o = o; globes[k].g.add(sp); globes[k].markers.push(sp);
  }
}
addMarkers('moon', MOON); addMarkers('mars', [...MARS, ...MORB]);
let body = 'moon', filt = new Set(), query = '', gsel = null, gtween = null, ghover = null;
const glbls = document.getElementById('glabels'), gstats = document.getElementById('gstats'), glist = document.getElementById('glist'), gchips = document.getElementById('gchips');
function listFor(b) { return b === 'moon' ? MOON : [...MARS, ...MORB]; }
function updateNote() {
  const L = listFor(body), unk = L.filter(o => o.lat == null && !o.orbit).length;
  document.getElementById('gnote').textContent = `${L.length} objetos · ${unk ? unk + ' con ubicación desconocida (solo en la lista) · ' : ''}textura ${texState[body] || ''} · fuente: ${body === 'moon' ? 'NSSDCA/NASA' : 'NASA · NSSDCA · PDS'}`;
}
function renderTracker() {
  const L = listFor(body);
  globes.moon.g.visible = body === 'moon'; globes.mars.g.visible = body === 'mars';
  const cnt = {}; L.forEach(o => cnt[o.status] = (cnt[o.status] || 0) + 1);
  gstats.innerHTML = Object.keys(ST).filter(k => cnt[k]).map(k => `<span class="pill" style="--c:${ST[k][1]};background:rgba(4,6,12,.7)"><i></i>${cnt[k]} ${ST[k][0]}</span>`).join('');
  gchips.innerHTML = Object.keys(ST).filter(k => cnt[k]).map(k => `<button data-s="${k}" class="${filt.has(k) ? 'off' : ''}" style="--c:${ST[k][1]}">${ST[k][0]} ${cnt[k]}</button>`).join('');
  const q = query.toLowerCase();
  const shown = L.filter(o => !filt.has(o.status) && (!q || (o.name + ' ' + o.agency + ' ' + o.type).toLowerCase().includes(q))).sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  glist.innerHTML = shown.map(o => `<button data-id="${o.id}" style="--c:${ST[o.status][1]}" class="${gsel === o.id ? 'on' : ''}"><i></i><span>${esc(o.name)}<br><em>${esc(o.type)} · ${esc(o.agency)}${o.lat == null && !o.orbit ? ' · ubicación desconocida' : ''}${o.images && o.images.length ? ' · 📷' : ''}</em></span><small>${o.year || '—'}</small></button>`).join('') || '<p class="muted" style="padding:14px">Sin resultados.</p>';
  for (const m of globes[body].markers) { const o = m.userData.o; const vis = !filt.has(o.status) && (!q || (o.name + ' ' + o.agency + ' ' + o.type).toLowerCase().includes(q)); m.visible = vis; if (m.userData.ring) m.userData.ring.visible = vis; }
  document.querySelectorAll('#btabs button').forEach(b => b.classList.toggle('on', b.dataset.b === body));
  updateNote();
}
document.getElementById('btabs').onclick = e => { const b = e.target.closest('button'); if (b) { body = b.dataset.b; gsel = null; filt.clear(); resetGlobe(); renderTracker(); } };
gchips.onclick = e => { const b = e.target.closest('button'); if (!b) return; const s = b.dataset.s; filt.has(s) ? filt.delete(s) : filt.add(s); renderTracker(); };
document.getElementById('gsearch').oninput = e => { query = e.target.value; renderTracker(); };
glist.onclick = e => { const b = e.target.closest('button'); if (b) selectG(b.dataset.id); };
function selectG(id) {
  const o = byId[id]; gsel = id; openCard(o);
  if (!o.orbit && o.lat != null) { const dir = llPos(o.lat, o.lon).normalize(); gtween = { fp: gcam.position.clone(), tp: dir.multiplyScalar(2.35), t0: performance.now(), dur: 1200 }; }
  glist.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.id === id));
}
function resetGlobe() { gtween = { fp: gcam.position.clone(), tp: new THREE.Vector3(0, .6, 3.6), t0: performance.now(), dur: 900 }; }
document.getElementById('greset').onclick = resetGlobe;
document.getElementById('gin').onclick = () => { gtween = { fp: gcam.position.clone(), tp: gcam.position.clone().multiplyScalar(.75), t0: performance.now(), dur: 400 }; };
document.getElementById('gout').onclick = () => { gtween = { fp: gcam.position.clone(), tp: gcam.position.clone().multiplyScalar(1.3), t0: performance.now(), dur: 400 }; };
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2(); let downXY = null;
function pick(e) { const r = gc.getBoundingClientRect(); mouse.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1); ray.setFromCamera(mouse, gcam); ray.params.Sprite = { threshold: 0 };
  const hits = ray.intersectObjects(globes[body].markers.filter(m => m.visible)); if (!hits.length) return null;
  const sphereHit = ray.intersectObject(globes[body].g.children[0])[0]; const h = hits.find(h => !sphereHit || h.distance <= sphereHit.distance + .02); return h ? h.object : null; }
gc.addEventListener('pointerdown', e => downXY = [e.clientX, e.clientY]);
gc.addEventListener('pointerup', e => { if (!downXY || Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1]) > 5) return; const m = pick(e); if (m) selectG(m.userData.o.id); });
gc.addEventListener('pointermove', e => { const m = pick(e); ghover = m ? m.userData.o.id : null; gc.style.cursor = m ? 'pointer' : 'grab'; });
function goTracker(b) { body = b; gsel = null; filt.clear(); renderTracker(); resetGlobe(); document.getElementById('rastreador').scrollIntoView({ behavior: 'smooth' }); }
function gresize() { const w = gwrap.clientWidth, h = gwrap.clientHeight; gr.setSize(w, h, false); gcam.aspect = w / h; gcam.updateProjectionMatrix(); }
addEventListener('resize', gresize); gresize(); renderTracker();
const FEAT = new Set(['m-apolo-11-modulo-lunar-eagle-descenso','m-apolo-12-modulo-lunar-intrepid-descenso','m-apolo-17-modulo-lunar-challenger-descenso','m-surveyor-3','m-lunokhod-1','m-luna-2','m-yutu-2','m-chandrayaan-3-vikram-y-pragyan','r-curiosity','r-perseverance','r-opportunity','r-spirit','r-pathfinder','r-viking1','r-zhurong','r-mars2']);
const glblPool = [];
function drawGLabels() {
  const w = gwrap.clientWidth, h = gwrap.clientHeight, camDir = gcam.position.clone().normalize(); let n = 0;
  for (const m of globes[body].markers) {
    const o = m.userData.o; if (!m.visible) continue;
    if (!(o.id === gsel || o.id === ghover || (FEAT.has(o.id) && gcam.position.length() < 3.2) || (o.orbit && o.id === ghover))) continue;
    const wp = m.getWorldPosition(v3.clone()); if (!o.orbit && wp.clone().normalize().dot(camDir) < .25) continue;
    const p = wp.project(gcam); if (p.z > 1) continue;
    let el = glblPool[n]; if (!el) { el = document.createElement('div'); el.className = 'glbl'; glbls.appendChild(el); glblPool[n] = el; }
    el.style.display = ''; el.textContent = o.name; el.style.setProperty('--c', ST[o.status][1]); el.style.left = ((p.x + 1) / 2 * w) + 'px'; el.style.top = ((1 - p.y) / 2 * h) + 'px'; n++;
  }
  for (let i = n; i < glblPool.length; i++) glblPool[i].style.display = 'none';
}
let gVisible = false; new IntersectionObserver(e => gVisible = e[0].isIntersecting).observe(gwrap);

// ================= LÍNEA DE TIEMPO =================
const Y0 = 1957, Y1 = 2027, PX = 46, tl = document.getElementById('tl'), TW = (Y1 - Y0) * PX + 160, X = y => 120 + (y - Y0) * PX;
tl.style.width = TW + 'px';
const lanes = [['Luna', MOON.filter(o => o.year), 40, 190], ['Marte', [...MARS, ...MORB, ...MEV.map((e, i) => ({ ...e, id: 'e' + i, date: String(e.year) }))], 240, 130], ['Resto del sistema solar', O.filter(o => !['moon','mars'].includes(o.scene.body)).map(o => ({ ...norm(o), year: o.year, id: o.id, solar: o })), 390, 90]];
MEV.forEach((e, i) => byId['e' + i] = { ...e, id: 'e' + i, date: String(e.year), statusNote: e.status === 'exito' ? 'Misión completada.' : 'Misión perdida o fallida.' });
let th = '';
[['Carrera espacial', 1957], ['Viking y el gran silencio', 1977], ['Regreso robótico', 1994], ['Nueva era internacional', 2013]].forEach(([t, y]) => th += `<div class="era" style="left:${X(y)}px">${t}</div>`);
for (let y = 1960; y <= 2025; y += 5) th += `<div class="yr" style="left:${X(y)}px">${y}</div>`;
lanes.forEach(([name, list, top, hgt]) => {
  th += `<div class="lane" style="top:${top - 30}px;height:${hgt + 30}px"><b>${name} · ${list.length}</b></div>`;
  const used = {};
  list.sort((a, b) => a.year - b.year).forEach(o => { const k = o.year; const n = used[k] = (used[k] ?? -1) + 1; const yy = top + 14 + (n % Math.floor(hgt / 16)) * 16, xx = X(o.year) + Math.floor(n / Math.floor(hgt / 16)) * 14;
    const st = o.status || 'activo'; th += `<button class="dot ${o.images && o.images.length ? 'img' : ''}" data-id="${o.id}" style="left:${xx}px;top:${yy}px;--c:${(ST[st] || ST.activo)[1]}" aria-label="${esc(o.name)}"></button>`; });
});
tl.innerHTML = th;
const tip = document.getElementById('tip');
const tlObj = id => byId[id] || (O.find(o => o.id === id));
tl.addEventListener('mousemove', e => { const d = e.target.closest('.dot'); if (!d) { tip.style.display = 'none'; return; } const o = tlObj(d.dataset.id); tip.innerHTML = `<b>${esc(o.name)}</b>${esc(o.year || '')} · ${esc(o.agency)}`; tip.style.display = 'block'; tip.style.left = e.clientX + 14 + 'px'; tip.style.top = e.clientY + 14 + 'px'; });
tl.addEventListener('mouseleave', () => tip.style.display = 'none');
tl.addEventListener('click', e => { const d = e.target.closest('.dot'); if (d) openCard(tlObj(d.dataset.id)); });
document.getElementById('legend2').innerHTML = legendHTML(['activo','pasivo','inactivo','impacto','perdido']);
setTimeout(() => { document.querySelector('.tltrack').scrollLeft = X(1965) - 100; }, 50);

// ================= NARRADORES =================
document.getElementById('chars').innerHTML = ['sury', 'oppy'].map(k => { const c = CHARS[k]; return `<div class="ccard" style="--c:${c.color}">${charSVG(k)}<div><h4>${c.name}</h4><div class="role">${c.role}</div><p>${c.bio}</p><button class="btn" data-tv="${k === 'sury' ? 'luna' : 'marte'}">📺 Ver su historia en TV</button> <button class="btn ghost" data-go="${c.body}">Ver sus vecinos →</button></div></div>`; }).join('');
document.getElementById('chars').onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.tv) openTV(b.dataset.tv); if (b.dataset.go) goTracker(b.dataset.go); };

// ================= VISOR 3D =================
const VLIST = [...O.map(o => ({ id:o.id, short:o.short, icon:o.icon, src:o })), { id:'m-surveyor-3', short:'Surveyor 3', icon:'lander' }, { id:'m-apolo-11-modulo-lunar-eagle-descenso', short:'Apolo 11 · Eagle', icon:'lm' }, { id:'m-lunokhod-1', short:'Lunokhod 1', icon:'rover' }, { id:'r-viking1', short:'Viking 1', icon:'lander' }, { id:'r-sojourner', short:'Sojourner', icon:'rover' }, { id:'r-opportunity', short:'Opportunity', icon:'rover' }];
const vc = document.getElementById('viewer');
const vr = new THREE.WebGLRenderer({ canvas: vc, antialias: true, alpha: true }); vr.setPixelRatio(Math.min(devicePixelRatio, 2));
const vs = new THREE.Scene(), vcam = new THREE.PerspectiveCamera(40, 1, .1, 100); vcam.position.set(4, 2.6, 5.5);
const vctl = new OrbitControls(vcam, vc); vctl.enableDamping = true; vctl.autoRotate = true; vctl.autoRotateSpeed = 1.2; vctl.minDistance = 2; vctl.maxDistance = 14;
vs.add(new THREE.AmbientLight(0xffffff, .5)); const kl = new THREE.DirectionalLight(0xffffff, 2.2); kl.position.set(5, 6, 4); vs.add(kl); const rl = new THREE.DirectionalLight(0x6f8cff, 1.1); rl.position.set(-5, -2, -4); vs.add(rl);
const vgrid = new THREE.GridHelper(10, 20, 0x334, 0x1a2133); vgrid.position.y = -1.8; vs.add(vgrid);
let vcur = null; const vtabs = document.getElementById('vtabs');
vtabs.innerHTML = VLIST.map(o => `<button data-id="${o.id}">${o.short}</button>`).join('');
vtabs.onclick = e => { const b = e.target.closest('button'); if (b) showModel(b.dataset.id); };
function showModel(id) {
  const it = VLIST.find(x => x.id === id), o = norm(it.src || byId[id]);
  if (vcur) vs.remove(vcur); vcur = buildModel(it.icon); vs.add(vcur);
  vtabs.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.id === id));
  const [sl, sc] = ST[o.status];
  document.getElementById('spec').innerHTML = `<span class="pill" style="--c:${sc}"><i></i>${sl}</span><h4>${esc(o.name)}</h4>
   <div class="row"><span>Fecha clave</span><span>${fmtDate(o.date)}</span></div><div class="row"><span>Agencia</span><span>${esc(o.agency)}</span></div><div class="row"><span>Dónde</span><span>${esc(o.where)}</span></div>
   <p>${esc(o.story)}</p>${o.images.length ? `<div class="mono">Fotos reales</div><div class="thumbs">${o.images.slice(0, 6).map((im, k) => `<button data-k="${k}"><img loading="lazy" src="${esc(im.src)}" alt="${esc(im.cap)}" onerror="this.parentNode.style.display='none'"></button>`).join('')}</div>` : '<p class="muted">Aún sin foto verificada.</p>'}
   <button class="btn ghost" id="vcard">Abrir ficha completa</button><p class="mono" style="text-transform:none;letter-spacing:0">Modelo 3D ilustrativo · arrastra para rotar · rueda/pellizca para zoom</p>`;
  document.getElementById('vcard').onclick = () => openCard(it.src || byId[id]);
  document.querySelectorAll('#spec .thumbs button').forEach(b => b.onclick = () => openCard(it.src || byId[id]));
}
function vresize() { const w = vc.clientWidth, h = vc.clientHeight; vr.setSize(w, h, false); vcam.aspect = w / h; vcam.updateProjectionMatrix(); }
addEventListener('resize', vresize); vresize(); showModel('m-surveyor-3');
let vVisible = false; new IntersectionObserver(e => vVisible = e[0].isIntersecting).observe(vc);

// ================= LOOP =================
function loop(now) {
  if (heroVisible) {
    if (tween) { const k = ease(Math.min(1, (now - tween.t0) / tween.dur)); camera.position.lerpVectors(tween.fp, tween.tp, k); controls.target.lerpVectors(tween.ft, tween.tt, k); if (k >= 1) tween = null; }
    controls.update(); spinners.forEach(s => s.rotation.y += .002); items.forEach(i => i.model.rotation.y += .004);
    const w = hero.clientWidth, h = hero.clientHeight;
    for (const l of labels) { v3.copy(l.pos).project(camera); const vis = v3.z < 1 && Math.abs(v3.x) < 1.1 && Math.abs(v3.y) < 1.1; l.el.style.display = vis ? '' : 'none'; if (vis) { l.el.style.left = ((v3.x + 1) / 2 * w) + 'px'; l.el.style.top = ((1 - v3.y) / 2 * h) + 'px'; } }
    for (const i of items) { const near = camera.position.distanceTo(i.pos); if (!i.el.classList.contains('on')) i.el.style.opacity = near > 60 && ['earth','moon','earthL2','mars'].includes(i.o.scene.body) && !['iss','perseverance'].includes(i.o.id) ? 0 : 1; }
    renderer.render(scene, camera);
  }
  if (gVisible) {
    if (gtween) { const k = ease(Math.min(1, (now - gtween.t0) / gtween.dur)); gcam.position.lerpVectors(gtween.fp, gtween.tp, k); gcam.lookAt(0, 0, 0); if (k >= 1) gtween = null; }
    globes[body].g.rotation.y += gsel || ghover || gtween ? 0 : .0006;
    for (const m of globes[body].markers) { const ob = m.userData.orbit; if (ob) { ob.ph += ob.sp * .01; const p = new THREE.Vector3(Math.cos(ob.ph) * ob.r, 0, Math.sin(ob.ph) * ob.r); p.applyEuler(m.userData.ring.rotation); m.position.copy(p); } }
    gsun.position.copy(gcam.position).add(new THREE.Vector3(1.5, 1, 0));
    gctl.update(); gr.render(gs, gcam); drawGLabels();
  }
  if (vVisible) { vctl.update(); vr.render(vs, vcam); }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// ================= TV =================
const tvEl = document.getElementById('tv'), STORY = window.STORY;
let ch = 'todo', idx = 0, playing = true, voice = false, timer = null, slides = STORY, yearShown = 1959;
const $ = id => document.getElementById(id);
function chList(c) { return c === 'todo' ? STORY : STORY.filter(s => s.ch === c || s.ch === 'todo'); }
function staticBurst() {
  const c = $('static'), x = c.getContext('2d'), img = x.createImageData(c.width, c.height); let t = 0;
  c.style.opacity = 1; const f = () => { for (let i = 0; i < img.data.length; i += 4) { const v = Math.random() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; } x.putImageData(img, 0, 0); if (++t < 8) requestAnimationFrame(f); else c.style.opacity = 0; }; f();
}
function slideImg(s) { if (s.img) return { src: s.img, cap: '' }; const o = byId[s.ref]; return o && o.images && o.images[0] ? o.images[0] : null; }
function animYear(to) { const from = yearShown, t0 = performance.now(); const step = n => { const k = Math.min(1, (n - t0) / 700); $('tvyear').textContent = Math.round(from + (to - from) * ease(k)); if (k < 1) requestAnimationFrame(step); else yearShown = to; }; requestAnimationFrame(step); }
function show(i) {
  clearTimeout(timer); speechSynthesis?.cancel?.();
  idx = (i + slides.length) % slides.length; const s = slides[idx], im = slideImg(s), o = s.ref ? byId[s.ref] : null;
  staticBurst();
  setTimeout(() => {
    const bg = $('tvbg'); bg.classList.remove('kb'); void bg.offsetWidth;
    if (im) { bg.style.display = ''; bg.style.backgroundImage = `url("${im.src}")`; bg.classList.add('kb'); $('tvcard').style.display = 'none'; $('tvcredit').textContent = im.cap ? im.cap.replace(/^.*Crédito: ?/, 'Crédito: ') : 'Crédito: NASA'; }
    else { bg.style.display = 'none'; $('tvcard').style.display = 'flex'; $('tvcard').innerHTML = s.who === 'both' ? charSVG('sury') + charSVG('oppy') : charSVG(s.who); $('tvcredit').textContent = o ? 'Sin foto verificada · ilustración' : ''; }
    animYear(s.y); $('tvttl').textContent = s.t;
    const who = s.who === 'both' ? 'sury' : s.who, nm = s.who === 'both' ? 'Sury y Oppy' : CHARS[who].name;
    $('tvsub').innerHTML = `${charSVG(who)}<div><b>${nm}:</b>${esc(s.s)}</div>`;
    $('tvprog').innerHTML = slides.map((_, k) => `<i class="${k === idx ? 'on' : k < idx ? 'done' : ''}" data-k="${k}"></i>`).join('');
    const next = () => { if (playing) show(idx + 1); };
    if (voice && 'speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(s.s); u.lang = 'es-ES'; const vv = speechSynthesis.getVoices().find(v => /^es/i.test(v.lang)); if (vv) u.voice = vv; u.rate = 1.02; u.pitch = who === 'oppy' ? .9 : 1.15; u.onend = () => { timer = setTimeout(next, 900); }; speechSynthesis.speak(u); }
    else timer = setTimeout(next, Math.max(7000, s.s.length * 55));
  }, 160);
}
function openTV(c) { ch = c || ch; slides = chList(ch); document.querySelectorAll('.chs .tvb').forEach(b => b.classList.toggle('on', b.dataset.ch === ch)); $('tvchn').textContent = 'CH ' + ({ todo:1, luna:2, marte:3 })[ch]; tvEl.classList.add('open'); playing = true; $('tvplay').textContent = '⏸'; show(0); }
function closeTV() { tvEl.classList.remove('open'); clearTimeout(timer); try { speechSynthesis.cancel(); } catch (e) {} }
$('opentv').onclick = () => openTV('todo'); $('tvclose').onclick = closeTV;
tvEl.addEventListener('click', e => { if (e.target === tvEl) closeTV(); });
$('tvnext').onclick = () => show(idx + 1); $('tvprev').onclick = () => show(idx - 1);
$('tvplay').onclick = () => { playing = !playing; $('tvplay').textContent = playing ? '⏸' : '▶'; if (playing) show(idx); else { clearTimeout(timer); try { speechSynthesis.cancel(); } catch (e) {} } };
$('tvvoice').onclick = () => { voice = !voice; $('tvvoice').textContent = voice ? '🔊 Voz: sí' : '🔈 Voz: no'; show(idx); };
document.querySelectorAll('.chs .tvb').forEach(b => b.onclick = () => openTV(b.dataset.ch));
let kn = 0; $('knob').onclick = () => { kn = (kn + 1) % 3; $('knob').style.transform = `rotate(${kn * 60}deg)`; openTV(['todo', 'luna', 'marte'][kn]); };
$('tvprog').onclick = e => { const i = e.target.closest('i'); if (i) show(+i.dataset.k); };

// ================= VIDEOS Y ANEXOS =================
function videoHTML(url, label) {
  const u = (url || '').trim();
  if (!u) return `<div class="soon"><span class="play" style="width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:var(--acc);color:#000">▶</span><b style="color:var(--ink)">Próximamente</b><span>${esc(label)}</span></div>`;
  let m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  if (m) return `<iframe src="https://www.youtube-nocookie.com/embed/${m[1]}?rel=0" title="${esc(label)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>`;
  m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (m) return `<iframe src="https://drive.google.com/file/d/${m[1]}/preview" title="${esc(label)}" allow="autoplay" allowfullscreen loading="lazy"></iframe>`;
  m = u.match(/vimeo\.com\/(\d+)/);
  if (m) return `<iframe src="https://player.vimeo.com/video/${m[1]}" title="${esc(label)}" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  if (/\.(mp4|webm|mov)(\?|$)/i.test(u)) return `<video src="${esc(u)}" controls preload="metadata" playsinline></video>`;
  return `<div class="soon"><a class="btn" href="${esc(u)}" target="_blank" rel="noopener">Ver video ↗</a></div>`;
}
document.getElementById('vids').innerHTML = [
  ['Simulación educativa', 'Simulación creada por los integrantes del equipo María 2 para explicar, paso a paso, qué pasó con los equipos que dejamos en la Luna y en Marte.', CFG.videoSimulacion],
  ['Video pitch', 'Presentación del proyecto María Site 2 para NASA Space Apps.', CFG.videoPitch]
].map(([t, d, u]) => `<article class="vcard"><div class="vframe">${videoHTML(u, t)}</div><div class="vb"><h4>${t}</h4><p>${d}</p></div></article>`).join('');
const ps = document.getElementById('pitchslot'); if (ps) ps.innerHTML = `<div class="vframe" style="border-radius:14px;overflow:hidden">${videoHTML(CFG.videoPitch, 'Video pitch')}</div>`;
const demoUrl = CFG.demo || (location.protocol.startsWith('http') ? location.origin + location.pathname : '');
const dl = document.getElementById('demolink'); if (dl) { dl.href = demoUrl || '#'; document.getElementById('demotxt').textContent = demoUrl || 'Publicado en Vercel'; }
document.getElementById('anx').innerHTML = (CFG.anexos || []).map((a, i) => `<article class="acard">
  <img class="cover" src="${a.portada || ''}" alt="Portada: ${esc(a.titulo)}">
  <div><span class="pill" style="--c:#4cc9f0"><i></i>Anexo ${i + 1} · PDF · ${a.paginas} ${a.paginas === 1 ? 'página' : 'páginas'}</span><h4>${esc(a.titulo)}</h4><p>${esc(a.desc)}</p>
  <div class="acts"><button class="btn" data-pdf="${i}">📖 Leer aquí</button><a class="btn ghost" href="${esc(a.archivo)}" target="_blank" rel="noopener">Abrir en pestaña ↗</a><a class="btn ghost" href="${esc(a.archivo)}" download>⬇ Descargar</a></div></div>
  <div class="pdfview" id="pdfv${i}"></div></article>`).join('');
document.getElementById('anx').addEventListener('click', e => { const b = e.target.closest('[data-pdf]'); if (!b) return; const i = +b.dataset.pdf, box = document.getElementById('pdfv' + i), a = CFG.anexos[i];
  if (!box.innerHTML) box.innerHTML = `<iframe src="${esc(a.archivo)}#view=FitH" title="${esc(a.titulo)}"></iframe><p class="muted" style="margin-top:6px">¿No ves el documento? En algunos celulares el visor no funciona: usa “Abrir en pestaña”.</p>`;
  box.classList.toggle('open'); box.closest('.acard').classList.toggle('reading', box.classList.contains('open')); b.textContent = box.classList.contains('open') ? '✕ Cerrar lector' : '📖 Leer aquí'; });

// ================= USO DE IA =================
document.getElementById('ialist').innerHTML = (CFG.ia || []).map(t => `<article class="iacard"><span class="pill" style="--c:#b388ff"><i></i>IA</span><h4>${esc(t.nombre)}</h4><p><b>${esc(t.uso)}</b></p><ul>${(t.detalle || []).map(d => `<li>${esc(d)}</li>`).join('')}</ul></article>`).join('');

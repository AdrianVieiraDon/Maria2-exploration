// María Site 2 · Modelos 3D procedurales (low-poly) de cada tipo de nave
// Código escrito con asistencia de Claude (Anthropic) y revisado por el Equipo María 2.
import * as THREE from 'three';

const M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, metalness: o.m ?? 0.5, roughness: o.r ?? 0.45, emissive: o.e ?? 0x000000, side: o.side ?? THREE.FrontSide });
const gold = () => M(0xd9a83a, { m: 0.95, r: 0.28 });
const panel = () => M(0x1f3f99, { m: 0.7, r: 0.3, e: 0x050b22 });
const white = () => M(0xe4e4e4, { m: 0.15, r: 0.6 });
const grey = () => M(0x8a8f98, { m: 0.85, r: 0.35 });
const dark = () => M(0x2a2d33, { m: 0.6, r: 0.5 });
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
const cyl = (a, b, h, m, s = 24) => new THREE.Mesh(new THREE.CylinderGeometry(a, b, h, s), m);
const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };

export function buildModel(kind) {
  const g = new THREE.Group();
  if (kind === 'probe') { // Parker
    const shield = at(cyl(1.25, 1.25, 0.14, white()), 0, 1.1, 0); g.add(shield);
    g.add(at(cyl(0.5, 0.5, 1.3, gold(), 6), 0, 0.25, 0));
    g.add(at(cyl(0.05, 0.05, 1.6, grey()), 0, -0.7, 0));
    for (const s of [-1, 1]) g.add(at(box(0.05, 0.7, 0.35, panel()), s * 0.75, 0.1, 0));
    g.add(at(cyl(0.3, 0.05, 0.2, white()), 0, -1.5, 0));
  } else if (kind === 'telescope') { // Hubble
    const tube = cyl(0.6, 0.6, 2.8, grey(), 32); tube.rotation.z = Math.PI / 2; g.add(tube);
    const aft = cyl(0.62, 0.62, 0.6, dark(), 32); aft.rotation.z = Math.PI / 2; at(aft, -1.6, 0, 0); g.add(aft);
    const door = box(0.05, 1.1, 1.1, grey()); door.rotation.z = -0.6; at(door, 1.65, 0.45, 0); g.add(door);
    for (const s of [-1, 1]) { g.add(at(box(0.7, 0.02, 2.2, panel()), -0.3, 0, s * 1.85)); g.add(at(box(0.04, 0.04, 0.7, grey()), -0.3, 0, s * 0.85)); }
  } else if (kind === 'station') { // ISS
    g.add(box(6.2, 0.16, 0.16, grey()));
    const mod = cyl(0.26, 0.26, 2.6, white()); mod.rotation.x = Math.PI / 2; g.add(mod);
    const mod2 = cyl(0.22, 0.22, 1.4, white()); mod2.rotation.z = Math.PI / 2; at(mod2, 0, 0, 1.0); g.add(mod2);
    for (const x of [-2.6, -1.9, 1.9, 2.6]) for (const z of [-1.25, 1.25]) g.add(at(box(0.55, 0.02, 2.0, panel()), x, 0, z));
    for (const x of [-1.0, 1.0]) g.add(at(box(0.5, 0.9, 0.02, white()), x, -0.55, 0));
  } else if (kind === 'mirror') { // JWST
    const foil = M(0xcfb7d6, { m: 0.9, r: 0.25, side: THREE.DoubleSide });
    for (let i = 0; i < 5; i++) { const l = new THREE.Mesh(new THREE.CylinderGeometry(2.2 - i * 0.08, 2.2 - i * 0.08, 0.02, 4), foil); l.scale.z = 0.55; at(l, 0, -0.6 + i * 0.07, 0); g.add(l); }
    const mir = new THREE.Group(); const s = 0.24, hex = new THREE.CylinderGeometry(s * 0.93, s * 0.93, 0.05, 6), gm = gold();
    for (let q = -2; q <= 2; q++) for (let r = -2; r <= 2; r++) { const t = -q - r, d = Math.max(Math.abs(q), Math.abs(r), Math.abs(t)); if (d < 1 || d > 2) continue; const h = new THREE.Mesh(hex, gm); h.rotation.x = Math.PI / 2; h.rotation.y = Math.PI / 6; h.position.set(s * Math.sqrt(3) * (q + r / 2), s * 1.5 * r, 0); mir.add(h); }
    for (const a of [0, 2.1, 4.2]) { const st = cyl(0.015, 0.015, 1.3, grey()); st.position.set(Math.cos(a) * 0.45, Math.sin(a) * 0.45, 0.6); st.rotation.x = Math.PI / 2; mir.add(st); }
    const sec = at(cyl(0.12, 0.12, 0.04, gold(), 6), 0, 0, 1.25); sec.rotation.x = Math.PI / 2; mir.add(sec);
    mir.position.set(0, 0.9, 0); mir.rotation.x = -0.25; g.add(mir);
    g.add(at(box(0.5, 0.35, 0.5, dark()), 0, -0.85, 0));
  } else if (kind === 'rover') {
    g.add(box(1.5, 0.38, 1.0, white()));
    const wg = new THREE.CylinderGeometry(0.2, 0.2, 0.16, 20), wm = dark();
    for (const x of [-0.6, 0, 0.6]) for (const z of [-0.62, 0.62]) { const w = new THREE.Mesh(wg, wm); w.rotation.x = Math.PI / 2; at(w, x, -0.38, z); g.add(w); }
    g.add(at(cyl(0.04, 0.04, 0.95, grey()), 0.5, 0.65, 0.3));
    g.add(at(box(0.3, 0.14, 0.16, grey()), 0.5, 1.15, 0.3));
    const rtg = cyl(0.15, 0.15, 0.55, dark()); rtg.rotation.z = 1.0; at(rtg, -0.95, 0.15, 0); g.add(rtg);
    const arm = box(0.7, 0.05, 0.05, grey()); arm.rotation.z = -0.4; at(arm, 1.0, 0.0, -0.35); g.add(arm);
    g.add(at(cyl(0.18, 0.02, 0.06, white()), -0.3, 0.25, -0.3));
  } else if (kind === 'juno') {
    g.add(cyl(0.55, 0.55, 0.65, grey(), 6));
    g.add(at(cyl(0.5, 0.12, 0.18, white()), 0, 0.42, 0));
    for (let i = 0; i < 3; i++) { const arm = new THREE.Group(); arm.add(at(box(2.9, 0.03, 0.62, panel()), 2.0, 0, 0)); arm.rotation.y = i * Math.PI * 2 / 3; g.add(arm); }
  } else if (kind === 'dish') { // Voyager / Cassini / New Horizons
    const dish = new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 12, 0, Math.PI * 2, 0, 0.62), M(0xeeeeee, { m: 0.2, r: 0.5, side: THREE.DoubleSide }));
    dish.rotation.x = Math.PI; at(dish, 0, 1.55, 0); g.add(dish);
    g.add(at(cyl(0.03, 0.03, 0.6, grey()), 0, 0.55, 0));
    g.add(at(cyl(0.55, 0.55, 0.32, gold(), 10), 0, -0.2, 0));
    const boom = cyl(0.025, 0.025, 4.2, grey()); boom.rotation.z = Math.PI / 2; at(boom, 2.2, -0.2, 0); g.add(boom);
    const rb = cyl(0.03, 0.03, 1.6, grey()); rb.rotation.z = Math.PI / 2; at(rb, -1.3, -0.25, 0); g.add(rb);
    for (let i = 0; i < 3; i++) g.add(at(cyl(0.12, 0.12, 0.22, dark(), 12), -1.6 - i * 0.25, -0.25, 0)).children;
  } else if (kind === 'lander') { // Surveyor / Viking: tripode
    g.add(at(cyl(0.55, 0.75, 0.5, white(), 3), 0, 0.2, 0));
    for (let i = 0; i < 3; i++) { const a = i * Math.PI * 2 / 3; const leg = cyl(0.04, 0.04, 1.5, grey()); leg.position.set(Math.cos(a) * 0.75, -0.35, Math.sin(a) * 0.75); leg.rotation.z = Math.cos(a) * 0.6; leg.rotation.x = -Math.sin(a) * 0.6; g.add(leg); g.add(at(cyl(0.22, 0.22, 0.06, white()), Math.cos(a) * 1.15, -1.05, Math.sin(a) * 1.15)); }
    g.add(at(cyl(0.05, 0.05, 1.6, grey()), 0, 1.1, 0));
    const pnl = box(1.0, 0.03, 0.7, panel()); pnl.rotation.z = 0.5; at(pnl, 0.2, 1.9, 0); g.add(pnl);
    const dish = cyl(0.45, 0.1, 0.12, white()); dish.rotation.z = -0.8; at(dish, -0.4, 1.7, 0); g.add(dish);
    g.add(at(box(0.3, 0.25, 0.25, gold()), 0.55, 0.55, 0.2));
    const arm = box(0.9, 0.05, 0.05, grey()); arm.rotation.z = -0.5; at(arm, -0.8, 0.0, 0.4); g.add(arm);
  } else if (kind === 'lm') { // modulo lunar Apolo (etapa de descenso)
    g.add(at(cyl(0.9, 0.9, 0.8, gold(), 8), 0, 0, 0));
    for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + Math.PI / 4; const leg = cyl(0.05, 0.05, 1.5, grey()); leg.position.set(Math.cos(a) * 1.1, -0.5, Math.sin(a) * 1.1); leg.rotation.z = Math.cos(a) * 0.5; leg.rotation.x = -Math.sin(a) * 0.5; g.add(leg); g.add(at(cyl(0.25, 0.25, 0.06, grey()), Math.cos(a) * 1.45, -1.2, Math.sin(a) * 1.45)); }
    const flag = box(0.5, 0.32, 0.02, white()); at(flag, 1.9, 0.4, 0.6); g.add(flag); g.add(at(cyl(0.02, 0.02, 1.6, grey()), 1.65, -0.3, 0.6));
    g.add(at(box(0.7, 0.04, 0.5, M(0x99c6ff, { m: 1, r: .05 })), -1.7, -1.1, 0.4));
  } else if (kind === 'reflector') { // Apolo 11 LRRR
    const base = new THREE.Group();
    base.add(box(1.4, 0.08, 1.0, grey()));
    const pg = new THREE.CylinderGeometry(0.045, 0.045, 0.06, 12), pm = M(0x99c6ff, { m: 1, r: 0.05 });
    for (let i = 0; i < 10; i++) for (let j = 0; j < 7; j++) base.add(at(new THREE.Mesh(pg, pm), -0.6 + i * 0.133, 0.07, -0.4 + j * 0.133));
    base.rotation.x = -0.35; base.position.y = 0.35; g.add(base);
    for (const x of [-0.6, 0.6]) g.add(at(box(0.05, 0.5, 0.05, grey()), x, 0.05, 0.35));
    g.add(at(box(1.8, 0.02, 1.4, M(0x8c8780, { m: 0, r: 1 })), 0, -0.22, 0));
  }
  g.traverse(o => { if (o.isMesh) { o.castShadow = false; } });
  return g;
}

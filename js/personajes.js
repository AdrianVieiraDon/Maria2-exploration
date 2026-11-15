// María Site 2 · Personajes narradores Sury y Oppy (SVG)
// Código escrito con asistencia de Claude (Anthropic) y revisado por el Equipo María 2.
// Personajes narradores (SVG original). Sury = Surveyor 3 (Luna). Oppy = Opportunity (Marte).
window.CHARS = {
  sury: { name: 'Sury', role: 'Surveyor 3 · la guardiana del Océano de las Tormentas', color: '#7bdff2', body: 'moon',
    bio: 'Llegó a la Luna en 1967, rebotó dos veces y se quedó dormida en un pequeño cráter. Dos años y medio después la visitaron los astronautas del Apolo 12: es el único robot que ha recibido visita humana en otro mundo. Desde entonces cuida a todos los equipos que dejamos en la Luna y conoce sus historias.' },
  oppy: { name: 'Oppy', role: 'Opportunity · el explorador incansable de Marte', color: '#ff8a3d', body: 'mars',
    bio: 'Debía durar 90 días y trabajó más de 14 años. Recorrió 45 km y demostró que Marte tuvo agua. En 2018 una tormenta de polvo cubrió sus paneles y se quedó en silencio. Ahora, desde Meridiani Planum, cuenta la historia de cada nave que llegó (o intentó llegar) al planeta rojo.' }
};
window.charSVG = function (who, cls = '') {
  if (who === 'oppy') return `<svg class="char ${cls}" viewBox="0 0 200 200" aria-label="Oppy">
  <defs><linearGradient id="opdeck" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2f4fa8"/><stop offset="1" stop-color="#1b2f6b"/></linearGradient></defs>
  <ellipse cx="100" cy="182" rx="78" ry="8" fill="#000" opacity=".25"/>
  <g class="bob">
    <path d="M18 112 L60 96 L140 96 L182 112 L176 120 L24 120 Z" fill="url(#opdeck)" stroke="#0e1838" stroke-width="3"/>
    <path d="M40 108h120M60 100l-8 18M80 98l-2 20M100 98v20M120 98l2 20M140 100l8 18" stroke="#6d8cff" stroke-width="1.5" opacity=".7"/>
    <rect x="62" y="118" width="76" height="26" rx="6" fill="#e8dcc6" stroke="#5b4a36" stroke-width="3"/>
    <rect x="94" y="56" width="10" height="44" rx="3" fill="#d8ccb6" stroke="#5b4a36" stroke-width="3"/>
    <g class="head"><rect x="70" y="30" width="58" height="30" rx="10" fill="#efe4d0" stroke="#5b4a36" stroke-width="3"/>
      <circle cx="87" cy="45" r="10" fill="#fff" stroke="#5b4a36" stroke-width="2.5"/><circle cx="111" cy="45" r="10" fill="#fff" stroke="#5b4a36" stroke-width="2.5"/>
      <g class="eyes"><circle cx="89" cy="46" r="5" fill="#1a1a1a"/><circle cx="113" cy="46" r="5" fill="#1a1a1a"/><circle cx="91" cy="44" r="1.6" fill="#fff"/><circle cx="115" cy="44" r="1.6" fill="#fff"/></g></g>
    <path d="M138 126 q22 -6 26 10" fill="none" stroke="#5b4a36" stroke-width="4" stroke-linecap="round"/><circle cx="165" cy="138" r="5" fill="#c9b99c" stroke="#5b4a36" stroke-width="2"/>
    <path d="M150 96 v-22" stroke="#5b4a36" stroke-width="3"/><circle cx="150" cy="72" r="5" fill="#ff8a3d"/>
    <g fill="#3a3a3a" stroke="#141414" stroke-width="3">
      <circle cx="56" cy="160" r="14"/><circle cx="100" cy="162" r="14"/><circle cx="144" cy="160" r="14"/></g>
    <g fill="#9a9a9a"><circle cx="56" cy="160" r="5"/><circle cx="100" cy="162" r="5"/><circle cx="144" cy="160" r="5"/></g>
    <path d="M56 146 L72 140 M144 146 L128 140 M100 148 V144" stroke="#5b4a36" stroke-width="4"/>
    <g fill="#c96b3a" opacity=".55"><circle cx="70" cy="104" r="3"/><circle cx="130" cy="110" r="2.5"/><circle cx="110" cy="102" r="2"/><circle cx="160" cy="112" r="2.5"/></g>
  </g></svg>`;
  return `<svg class="char ${cls}" viewBox="0 0 200 200" aria-label="Sury">
  <ellipse cx="100" cy="184" rx="74" ry="8" fill="#000" opacity=".25"/>
  <g class="bob">
    <path d="M100 70 L40 172 M100 70 L160 172 M100 70 L100 176" stroke="#c7ccd6" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="40" cy="174" rx="14" ry="5" fill="#e9edf3" stroke="#59606e" stroke-width="2.5"/><ellipse cx="160" cy="174" rx="14" ry="5" fill="#e9edf3" stroke="#59606e" stroke-width="2.5"/><ellipse cx="100" cy="178" rx="14" ry="5" fill="#e9edf3" stroke="#59606e" stroke-width="2.5"/>
    <polygon points="66,104 134,104 118,132 82,132" fill="#f2f4f8" stroke="#59606e" stroke-width="3"/>
    <rect x="94" y="22" width="12" height="70" rx="4" fill="#d9dee7" stroke="#59606e" stroke-width="3"/>
    <rect x="58" y="10" width="50" height="30" rx="3" fill="#2b4c9b" stroke="#1a2c5c" stroke-width="3" transform="rotate(-14 83 25)"/>
    <path d="M66 18 l40 -10 M68 26 l40 -10" stroke="#7ea0ff" stroke-width="1.4" opacity=".8"/>
    <g class="head"><rect x="104" y="52" width="46" height="34" rx="12" fill="#f2f4f8" stroke="#59606e" stroke-width="3"/>
      <circle cx="127" cy="69" r="12" fill="#fff" stroke="#59606e" stroke-width="2.5"/>
      <g class="eyes"><circle cx="129" cy="70" r="6.5" fill="#15202f"/><circle cx="131.5" cy="67.5" r="2" fill="#fff"/></g>
      <path d="M150 62 l10 -4" stroke="#59606e" stroke-width="3" stroke-linecap="round"/></g>
    <path d="M70 130 q-26 6 -30 26" fill="none" stroke="#59606e" stroke-width="4" stroke-linecap="round"/>
    <path d="M34 152 l12 4 l-4 10 l-12 -4 z" fill="#c7ccd6" stroke="#59606e" stroke-width="2.5"/>
    <circle cx="100" cy="118" r="5" fill="#7bdff2"/>
  </g></svg>`;
};

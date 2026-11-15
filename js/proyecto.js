// María Site 2 · Contenido de los apartados del reto
// Código escrito con asistencia de Claude (Anthropic) y revisado por el Equipo María 2.
// Contenido de los apartados pedidos por el supervisor del reto. Reemplaza los [corchetes].
window.PROJECT = {
  team: 'María 2',
  name: 'María Site 2',
  tagline: 'La historia de los objetos que la humanidad ha dejado en el sistema solar',
  semillero: 'Institución Educativa de María',
  repo: 'https://github.com/AdrianVieiraDon',
  repoLabel: 'github.com/AdrianVieiraDon/[repositorio]',
  demo: '#',
  pitch: '#',
  sections: [
    { id:'reto', title:'Reto', kicker:'NASA Space Apps · equipos abandonados',
      html:`<p class="lead">Rastrear de manera íntegra los equipos que la humanidad ha dejado en la Luna, en Marte y en el resto del sistema solar, tanto los activos como los perdidos, y contar su historia.</p><p>El mayor reto es mostrar la mayoría o todos esos objetos en la simulación y en la página, y apoyarse en personajes para narrar la historia de los equipos abandonados.</p>` },
    { id:'solucion', title:'Solución', kicker:'Lo que construimos',
      html:`<p class="lead">Una web interactiva con un sistema solar en 3D, un rastreador de la Luna y Marte con más de 120 objetos reales ubicados por coordenadas, una línea de tiempo desde 1959, fichas con fotos reales y un televisor donde dos narradores, Sury y Oppy, cuentan la historia como un cortometraje.</p>` },
    { id:'problema', title:'Problem statement', kicker:'El problema',
      html:`<p>Desde 1959 hemos dejado decenas de naves, rovers, módulos y restos de impacto en la Luna y en Marte. La información sobre dónde están, en qué estado quedaron y qué hicieron está dispersa en catálogos técnicos, casi siempre en inglés.</p><p><strong>¿Cómo podemos rastrear y mostrar, de forma clara y emocionante, todos los equipos activos, pasivos e inactivos que la humanidad ha dejado en otros mundos?</strong></p>` },
    { id:'resumen', title:'Resumen ejecutivo', kicker:'En pocas palabras',
      html:`<p>María Site 2 reúne datos públicos de la NASA (catálogo NSSDCA, LRO, Mars Exploration Program) y los convierte en una experiencia narrativa: cada objeto aparece en su ubicación real, con su estado, fotos y una historia corta contada por personajes. Empezamos con la Luna (95 registros) y Marte (más de 25 registros entre superficie y órbita), y el sistema solar como contexto.</p>` },
    { id:'equipo', title:'Team · María 2', kicker:'Quiénes somos',
      html:`<div class="team">
        <div class="member"><div class="avatar">EG</div><b>Emanuel González Mazo</b><span>@emanuelnasa · Propietario del equipo</span></div>
        <div class="member"><div class="avatar">LM</div><b>Luciana Madrigal Cuartas</b><span>@luciana_51</span></div>
        <div class="member"><div class="avatar">KR</div><b>Koraima Restrepo</b><span>@luisanita_1596</span></div>
        <div class="member"><div class="avatar">JM</div><b>Josué Marín Hernández</b><span>@josuejost</span></div>
        <div class="member"><div class="avatar">JV</div><b>Junior Alejandro Valencia Ramírez</b><span>@junior_16</span></div>
        <div class="member"><div class="avatar">JD</div><b>Julio Vieira Donado</b><span>@ingjvd1217</span></div>
      </div><p class="muted" style="margin-top:14px">Colombia · Institución Educativa de María</p>` },
    { id:'beneficiarios', title:'¿A quién beneficia?', kicker:'Impacto',
      html:`<p>Beneficia sobre todo a quienes investigan la Luna y Marte: científicos, astrónomos y agencias espaciales, que necesitan saber qué hay en cada sitio para planear futuras misiones y aterrizajes seguros. También a estudiantes, docentes, niños y cualquier persona interesada en el espacio.</p><ul class="chipsl"><li>Científicos y astrónomos</li><li>Agencias espaciales</li><li>Estudiantes y docentes</li><li>Niños y público general</li></ul><p class="muted" style="margin-top:12px">¿Quién no se imaginaría un viaje por un momento a la Luna?</p>` },
    { id:'escalabilidad', title:'Escalabilidad', kicker:'Hacia dónde crece',
      html:`<ul class="list"><li><b>Más objetos:</b> el catálogo es un archivo JSON; agregar una misión no requiere tocar el código.</li><li><b>Posiciones en tiempo real</b> con la API JPL Horizons.</li><li><b>Varios idiomas</b> y modo aula para docentes.</li><li><b>Realidad aumentada</b> en el celular para ver los objetos a escala.</li></ul>` },
    { id:'arquitectura', title:'Arquitectura o diseño', kicker:'Cómo está hecho',
      html:`<div class="arch">
        <div class="node"><small>Fuentes</small>NASA · ESA · JPL Horizons</div><div class="arrow">→</div>
        <div class="node"><small>Procesamiento</small>Scripts Python (ETL)</div><div class="arrow">→</div>
        <div class="node"><small>Datos</small>objetos.json</div><div class="arrow">→</div>
        <div class="node"><small>Front-end</small>Three.js · SVG · JS</div><div class="arrow">→</div>
        <div class="node"><small>Hosting</small>GitHub Pages</div>
      </div>` },
    { id:'investigacion', title:'Investigación', kicker:'Qué indagamos',
      html:`<p>Revisamos las fichas oficiales de cada misión (objetivo, fecha de lanzamiento, ubicación y estado), comparamos herramientas existentes como NASA Eyes on the Solar System y entrevistamos a [N] estudiantes para saber qué les resultaba confuso. Hallazgo clave: la gente entiende mejor la distancia cuando puede hacer zoom y comparar.</p>` },
    { id:'pitch', title:'Video pitch', kicker:'Míralo en 2 minutos',
      html:`<div id="pitchslot"></div>` },
    { id:'demo', title:'Enlace al demo', kicker:'Pruébalo',
      html:`<a class="btn" id="demolink" href="#" target="_blank" rel="noopener">Abrir demo en vivo ↗</a><p class="muted" id="demotxt"></p>` },
    { id:'tecnica', title:'Descripción técnica', kicker:'Stack',
      html:`<ul class="list"><li><b>Visualización 3D:</b> Three.js (WebGL) con controles de órbita y zoom.</li><li><b>Mapa 2D:</b> SVG con escala logarítmica de distancias, zoom y arrastre.</li><li><b>Datos:</b> Python para extraer, limpiar y exportar a JSON; coordenadas lat/lon convertidas a posiciones sobre el globo.</li><li><b>Front-end:</b> HTML, CSS y JavaScript sin frameworks; responsive.</li><li><b>Despliegue:</b> GitHub Pages con GitHub Actions.</li></ul>` },
    { id:'procesamiento', title:'Procesamiento de datos', kicker:'Del dato a la historia',
      html:`<ol class="steps"><li><b>Extracción</b>Catálogo NSSDCA de objetos en la Luna, misiones de Marte y fichas NASA.</li><li><b>Limpieza</b>Coordenadas a decimal (N/E positivo), fechas ISO y nombres en español.</li><li><b>Clasificación</b>Estado: activo, pasivo, inactivo, impacto o perdido.</li><li><b>Enriquecimiento</b>Fotos reales con crédito e historias cortas por personaje.</li><li><b>Visualización</b>Coordenadas a posición 3D en el globo y años en la línea de tiempo.</li></ol>` },
    { id:'fuentes', title:'Fuente de datos', kicker:'De dónde sale todo',
      html:`<ul class="src">
        <li><a href="https://science.nasa.gov/" target="_blank" rel="noopener">NASA Science — fichas de misiones</a></li>
        <li><a href="https://ssd.jpl.nasa.gov/horizons/" target="_blank" rel="noopener">JPL Horizons — posiciones y efemérides</a></li>
        <li><a href="https://nssdc.gsfc.nasa.gov/" target="_blank" rel="noopener">NASA NSSDCA — catálogo de naves</a></li>
        <li><a href="https://www.esa.int/" target="_blank" rel="noopener">ESA — Agencia Espacial Europea</a></li>
        <li><a href="https://eyes.nasa.gov/" target="_blank" rel="noopener">NASA Eyes on the Solar System</a></li>
      </ul>` }
  ]
};

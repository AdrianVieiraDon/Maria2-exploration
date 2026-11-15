// =====================================================================
//  CONFIGURACIÓN DEL EQUIPO · edita SOLO este bloque
// =====================================================================
window.CONFIG = {
  // Enlace a tu repositorio de GitHub
  repo: 'https://github.com/AdrianVieiraDon/Maria2-exploration',
  // URL pública en Vercel (si la dejas vacía se usa la dirección actual de la página)
  demo: 'https://maria2-explorer.vercel.app/',
  // Video de la simulación educativa: enlace de YouTube (no listado) o ruta a un .mp4 dentro del repo, ej. 'videos/simulacion.mp4'
  videoSimulacion: 'https://youtu.be/_ozBoXkrDXg',
  // Video pitch: pega aquí el enlace de YouTube cuando esté listo
  videoPitch: '',
  // Anexos en PDF: rutas dentro del repo (relativas a index.html)
  anexos: [
    { titulo: 'Exploración de Marte y la Luna: equipos activos, inactivos y lecciones de diseño', archivo: 'anexos/Investigacion_astronomia_2.pdf', paginas: 64,
      desc: 'Investigación completa del equipo: el airbag y el rover de Mars Pathfinder, la clasificación de los equipos en Marte, cómo mejorar su diseño y la exploración lunar hasta el Apolo 11. Referencias en APA 7.',
      portada: 'assets/img/portada-investigacion.jpg' },
    { titulo: 'El misterio de los objetos perdidos en Marte y la Luna', archivo: 'anexos/Historia_breve.pdf', paginas: 1,
      desc: 'Historia breve con Fredy, el astronauta, y Gary, el gato explorador, que recorren Marte y la Luna para descubrir para qué servían los objetos abandonados.',
      portada: 'assets/img/portada-historia.jpg' }
  ],
  // Herramientas de IA usadas (sección "Uso de inteligencia artificial"). Agreguen o quiten según lo que realmente usaron.
  ia: [
    { nombre: 'Claude (Anthropic)', uso: 'Programación y diseño de la página', detalle: ['Escribir el código HTML, CSS y JavaScript, la simulación 3D con Three.js, el rastreador y la TV', 'Redactar las historias cortas y el guion de los narradores, revisados por el equipo', 'Dibujar como código SVG a los personajes Sury y Oppy'] },
    { nombre: 'Gemini (Google)', uso: 'Imagen del logo', detalle: ['Generar el logo de María 2 (la imagen lleva una marca visible de IA)'] },
    { nombre: 'ChatGPT (OpenAI)', uso: 'Redaccion y bùsqueda', detalle: ['[Ej.: apoyo en la redacción de los documentos de investigación]'] }
  ]
};

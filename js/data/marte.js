// María Site 2 · Objetos en Marte y su órbita · fuentes NASA / NSSDCA / PDS
// Código escrito con asistencia de Claude (Anthropic) y revisado por el Equipo María 2.
// Objetos humanos en Marte (superficie y órbita). Fuentes: NASA "25 Years of Continuous Robotic Mars Exploration",
// NSSDCA (Mars mileage guide), PDS ODE landing sites, documentos del equipo (DATOS_UTILES_NASA, PARTE_3, hackaton.txt).
(function () {
  const U = 'https://www.nasa.gov/wp-content/uploads/2022/09/';
  const H25 = ['NASA · 25 años de exploración robótica de Marte', 'https://www.nasa.gov/history/25-years-of-continuous-robotic-mars-exploration-from-pathfinder-to-perseverance'];
  const MPF = ['NASA Science · Mars Pathfinder', 'https://science.nasa.gov/mission/mars-pathfinder/'];
  const MER = ['NASA Science · Spirit y Opportunity', 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/'];
  const ODE = ['PDS ODE · Sitios de aterrizaje en Marte', 'https://ode.rsl.wustl.edu/mars/pagehelp/Content/Missions_Instruments/Landing_Sites.htm'];
  const MIL = ['NSSDCA · Ubicaciones en Marte', 'https://nssdc.gsfc.nasa.gov/planetary/mars_mileage_guide.html'];
  const img = (f, cap) => ({ src: U + f, cap });
  const D = window.DOCIMG || {};
  window.MARS_OBJECTS = [
    { id:'r-mars2', name:'Mars 2 (módulo de descenso)', type:'Módulo de aterrizaje', agency:'URSS', date:'1971-11-27', lat:-45, lon:58, status:'impacto',
      story:'Lanzada el 19 de mayo de 1971 en un cohete Protón-K desde Baikonur. Su módulo de descenso se estrelló: fue el primer objeto humano en llegar a la superficie de Marte. El primer equipo olvidado en el planeta rojo.',
      quote:'Nadie lo vio caer, pero desde ese día Marte guarda un pedazo de la Tierra.', images: D.mars2 ? [{ src: D.mars2, cap:'Sonda soviética del programa Mars (imagen aportada por el equipo, documento PARTE 3).' }] : [], sources:[MIL] },
    { id:'r-mars3', name:'Mars 3 (módulo de descenso)', type:'Módulo de aterrizaje', agency:'URSS', date:'1971-12-02', lat:-45, lon:-158, status:'inactivo',
      story:'Primer aterrizaje suave en Marte. Transmitió apenas unos segundos desde la superficie y luego guardó silencio para siempre, probablemente en medio de una tormenta de polvo global.',
      images:[], sources:[MIL] },
    { id:'r-mars6', name:'Mars 6 (módulo de descenso)', type:'Módulo de aterrizaje', agency:'URSS', date:'1974-03-12', lat:-24, lon:-25, status:'impacto',
      story:'Envió datos de la atmósfera durante el descenso, pero el contacto se perdió justo antes de tocar el suelo.', images:[], sources:[MIL] },
    { id:'r-viking1', name:'Viking 1 Lander', type:'Módulo de aterrizaje', agency:'NASA (EE. UU.)', date:'1976-07-20', lat:22.269, lon:-47.951, status:'inactivo',
      story:'Primer módulo de EE. UU. en Marte y autor de la primera imagen a color tomada desde la superficie. Superó con creces su vida de diseño: su misión en superficie terminó el 11 de noviembre de 1982. Hoy se llama Estación Conmemorativa Thomas Mutch.',
      images:[ img('mars_exploration_7_viking_1first_color_image_from_surface_jul_21_1976.jpg','Primera imagen a color desde la superficie de Marte, Viking 1, julio de 1976. Crédito: NASA/JPL') ], sources:[H25, ODE] },
    { id:'r-viking2', name:'Viking 2 Lander', type:'Módulo de aterrizaje', agency:'NASA (EE. UU.)', date:'1976-09-03', lat:47.668, lon:134.28, status:'inactivo',
      story:'Gemelo del Viking 1, aterrizó en Utopia Planitia. Buscó señales de vida en el suelo; los resultados fueron no concluyentes.', images:[], sources:[H25, ODE] },
    { id:'r-pathfinder', name:'Mars Pathfinder (Estación Carl Sagan)', type:'Módulo de aterrizaje', agency:'NASA (EE. UU.)', date:'1997-07-04', lat:19.095, lon:-33.253, status:'inactivo',
      story:'Lanzado el 4 de diciembre de 1996 en un Delta II. Entró directo a la atmósfera, frenó con paracaídas y rebotó unas 15 veces dentro de bolsas de aire de 5,8 m, hasta 15 m de altura, antes de detenerse en Ares Vallis, una antigua llanura de inundación. Envió más de 16.500 imágenes y su última transmisión fue el 27 de septiembre de 1997.',
      quote:'Llegué rebotando como una pelota de playa gigante.',
      images:[ { src:'https://science.nasa.gov/wp-content/uploads/2024/03/mars-pathfinder-presidential-panorama-lg.jpg', cap:'Panorama "presidencial" del sitio de aterrizaje de Mars Pathfinder. Crédito: NASA/JPL' },
               { src:'https://science.nasa.gov/wp-content/uploads/2017/12/pia00621-pathfinder-and-sojourner-with-airbags-deflated.jpg', cap:'Pathfinder y Sojourner con las bolsas de aire desinfladas (PIA00621). Crédito: NASA/JPL' },
               { src:'https://science.nasa.gov/wp-content/uploads/2024/03/pia00609-1e7c7c.jpg', cap:'Ares Vallis, el sitio de aterrizaje (PIA00609). Crédito: NASA/JPL' },
               { src:'https://science.nasa.gov/wp-content/uploads/2024/08/5277460495-c6d046d5a9-o.jpg', cap:'Sistema de bolsas de aire de Mars Pathfinder. Crédito: NASA/JPL' } ], sources:[MPF, ODE] },
    { id:'r-sojourner', name:'Sojourner', type:'Rover', agency:'NASA (EE. UU.)', date:'1997-07-05', lat:19.1, lon:-33.24, status:'inactivo',
      story:'El primer rover con ruedas en Marte: 10,6 kg, del tamaño de un horno microondas. Debía durar 7 días y operó 83 soles. Recorrió unos 104 m sin alejarse más de 12 m del módulo. Con su espectrómetro APXS descubrió basalto, señal de actividad volcánica, y envió unas 550 imágenes. Su nombre honra a Sojourner Truth.',
      quote:'Yo era pequeño, pero fui el primero en rodar por otro planeta.',
      images:[ { src:'https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/p/i/a/0/PIA01551-1.jpg', cap:'Sojourner en la superficie marciana (PIA01551). Crédito: NASA/JPL' },
               img('mars_exploration_11_pathfinder_and_sojourner_on_mars.jpg','Sojourner preparándose para bajar del Pathfinder, 1997. Crédito: NASA/JPL'),
               { src:'https://nssdc.gsfc.nasa.gov/planetary/image/marspath_so185.jpg', cap:'Sojourner junto a una roca marciana. Crédito: NASA/JPL (NSSDCA)' } ], sources:[MPF] },
    { id:'r-mpl', name:'Mars Polar Lander', type:'Módulo de aterrizaje', agency:'NASA (EE. UU.)', date:'1999-12-03', lat:-76.57, lon:165.2, status:'impacto', approx:true,
      story:'Se perdió el contacto durante el aterrizaje cerca del polo sur, alrededor del 3 de diciembre de 1999; se cree que se estrelló. Sus dos sondas penetradoras Deep Space 2 también se perdieron.',
      images:[ img('mars_exploration_15_mars_polar_lander.jpg','Ilustración del Mars Polar Lander en el polo sur (no es una foto). Crédito: NASA/JPL') ], sources:[H25] },
    { id:'r-beagle2', name:'Beagle 2', type:'Módulo de aterrizaje', agency:'ESA / Reino Unido', date:'2003-12-25', lat:11.5265, lon:90.4295, status:'inactivo',
      story:'Viajó con Mars Express. Llegó a la superficie, pero no desplegó por completo sus paneles solares y eso bloqueó sus comunicaciones. Fue encontrado años después en imágenes desde órbita.', images:[], sources:[H25] },
    { id:'r-spirit', name:'Spirit (MER-A)', type:'Rover', agency:'NASA (EE. UU.)', date:'2004-01-04', lat:-14.5719, lon:175.478, status:'inactivo',
      story:'Lanzado el 10 de junio de 2003, aterrizó en el cráter Gusev. Diseñado para 90 soles, recorrió 7,73 km. En 2009 quedó atrapado en arena; su última comunicación fue el 22 de marzo de 2010, después de 2.208 soles.',
      images:[ img('mars_exploration_18_mer.jpg','Ilustración de un rover MER como Spirit u Opportunity (no es una foto). Crédito: NASA/JPL') ], sources:[MER, H25, ODE] },
    { id:'r-opportunity', name:'Opportunity (MER-B)', type:'Rover', agency:'NASA (EE. UU.)', date:'2004-01-25', lat:-1.9462, lon:-5.5266, status:'inactivo',
      story:'Lanzado el 7 de julio de 2003, aterrizó en Meridiani Planum. Diseñado para 90 soles, trabajó más de 14 años y recorrió 45,16 km. Confirmó que Marte tuvo agua líquida. Quedó en silencio el 10 de junio de 2018, cuando una tormenta de polvo global cubrió sus paneles. La misión se cerró el 13 de febrero de 2019.',
      quote:'Debía durar 90 días. Trabajé 14 años, hasta que el polvo apagó mi luz.',
      images:[ img('mars_exploration_18_mer.jpg','Ilustración de un rover MER (no es una foto). Crédito: NASA/JPL') ], sources:[MER, H25, ODE] },
    { id:'r-phoenix', name:'Phoenix', type:'Módulo de aterrizaje', agency:'NASA (EE. UU.)', date:'2008-05-25', lat:68.2188, lon:-125.749, status:'inactivo',
      story:'Aterrizó cerca del polo norte y confirmó la presencia de hielo de agua. Sus operaciones terminaron el 2 de noviembre de 2008, cuando llegó el invierno marciano.',
      images:[ img('mars_exploration_20_phoenix_pano_360.jpg','Panorama de 360° del sitio de Phoenix, 2008. Crédito: NASA/JPL-Caltech/Univ. of Arizona') ], sources:[H25, ODE] },
    { id:'r-curiosity', name:'Curiosity', type:'Rover', agency:'NASA (EE. UU.)', date:'2012-08-06', lat:-4.5895, lon:137.4417, status:'activo',
      story:'Un laboratorio rodante del tamaño de un SUV pequeño. Lanzado el 26 de noviembre de 2011, aterrizó en el cráter Gale y sigue activo, subiendo las capas del Monte Sharp para leer la historia del clima marciano.',
      images:[ img('mars_exploration_22_curiosity_selfie-mahli-scaled_nov_20_2021.jpg','Autorretrato de Curiosity en el Monte Sharp, 2021. Crédito: NASA/JPL-Caltech/MSSS'),
               img('mars_exploration_21_curiosity_mount_sharp_hills_sol_1100_sep_9_2015.jpg','Colinas camino al Monte Sharp, 2015. Crédito: NASA/JPL-Caltech/MSSS'),
               ...(D.curiosity ? [{ src: D.curiosity, cap:'Curiosity en Marte (imagen aportada por el equipo, documento PARTE 3).' }] : []) ], sources:[H25, ODE] },
    { id:'r-schiaparelli', name:'Schiaparelli (ExoMars 2016)', type:'Módulo de aterrizaje', agency:'ESA / Roscosmos', date:'2016-10-19', lat:-2.05, lon:-6.21, status:'impacto', approx:true,
      story:'Módulo de prueba europeo. Su paracaídas se soltó antes de tiempo y se estrelló cerca del sitio de Opportunity. Su nave nodriza, el Trace Gas Orbiter, sigue en órbita.', images:[ img('mars_exploration_25_exomars_2016.jpg','El Trace Gas Orbiter tras liberar a Schiaparelli (ilustración). Crédito: ESA') ], sources:[H25] },
    { id:'r-insight', name:'InSight', type:'Módulo de aterrizaje', agency:'NASA (EE. UU.)', date:'2018-11-26', lat:4.502, lon:135.623, status:'inactivo',
      story:'Un sismógrafo en Marte para estudiar su interior. El polvo cubrió poco a poco sus paneles solares hasta que la misión terminó en diciembre de 2022.',
      images:[ img('mars_exploration_26_insight_selfie_dec_6_2018_and_apr_24_2022.jpg','Autorretratos de InSight en 2018 y 2022: se nota el polvo acumulado. Crédito: NASA/JPL-Caltech') ], sources:[H25] },
    { id:'r-perseverance', name:'Perseverance', type:'Rover', agency:'NASA (EE. UU.)', date:'2021-02-18', lat:18.4447, lon:77.4508, status:'activo',
      story:'Aterrizó en el cráter Jezero, un antiguo lago. Busca señales de vida antigua y guarda muestras de roca para traerlas algún día a la Tierra. Su experimento MOXIE produjo oxígeno a partir del CO₂ marciano.',
      images:[ img('mars_exploration_30_perseverance_sol_46_apr_2021.jpg','Autorretrato de Perseverance con Ingenuity, 2021. Crédito: NASA/JPL-Caltech/MSSS (procesado por Ken Kremer)'),
               img('mars_exploration_32_perseverance_from_ingenuity.png','Perseverance fotografiado por Ingenuity desde el aire. Crédito: NASA/JPL-Caltech') ], sources:[H25] },
    { id:'r-ingenuity', name:'Ingenuity', type:'Helicóptero', agency:'NASA (EE. UU.)', date:'2021-04-19', lat:18.45, lon:77.40, status:'inactivo', approx:true,
      story:'El primer vuelo controlado en otro planeta (19 de abril de 2021). Pensado para 5 vuelos, hizo 72. Terminó su misión tras dañar sus aspas en 2024.',
      images:[ img('mars_exploration_31_ingenuitys_first_black-and-white_image_from_the_air_apr_19_2021_from_1_2_m_height.jpg','La sombra de Ingenuity en su primer vuelo. Crédito: NASA/JPL-Caltech') ], sources:[H25] },
    { id:'r-zhurong', name:'Zhurong (Tianwen-1)', type:'Rover', agency:'China (CNSA)', date:'2021-05-14', lat:25.1, lon:109.7, status:'inactivo',
      story:'Primer rover chino en Marte, en Utopia Planitia. Salió de su módulo ocho días después del aterrizaje. Entró en hibernación en mayo de 2022 y no ha vuelto a comunicarse.',
      images:[ img('mars_exploration_29_tianwen-1_lander_and_zhurong_rover_from_deployed_camera_cnsa.jpg','Zhurong y su módulo, fotografiados por una cámara desplegada. Crédito: CNSA') ], sources:[H25] }
  ];
  window.MARS_ORBITERS = [
    { id:'o-odyssey', name:'2001 Mars Odyssey', agency:'NASA', date:'2001-10-21', status:'activo', story:'En órbita desde 2001; detectó regiones ricas en hidrógeno (hielo de agua). La misión más longeva en órbita de otro planeta.', images:[ img('mars_exploration_16_mars_odyssey_illustration.jpg','Ilustración de Mars Odyssey. Crédito: NASA/JPL') ], r:1.35, inc:0.9 },
    { id:'o-mex', name:'Mars Express', agency:'ESA', date:'2003-12-25', status:'activo', story:'Orbitador europeo desde 2003. Llevó al módulo Beagle 2.', images:[ img('mars_exploration_17_mars_express_esa.jpg','Ilustración de Mars Express. Crédito: ESA') ], r:1.55, inc:1.4 },
    { id:'o-mro', name:'Mars Reconnaissance Orbiter', agency:'NASA', date:'2006-03-10', status:'activo', story:'Cámara HiRISE de alta resolución. Ha fotografiado a los módulos abandonados desde órbita y sirve de relevo de comunicaciones.', images:[ img('mars_exploration_19_mro_illustration.jpg','Ilustración del MRO. Crédito: NASA/JPL') ], r:1.3, inc:1.6 },
    { id:'o-maven', name:'MAVEN', agency:'NASA', date:'2014-09-22', status:'perdido', story:'Estudia cómo Marte perdió su atmósfera. Perdió la señal en diciembre de 2025 y su estado está en revisión.', images:[ img('mars_exploration_23_maven.jpg','Ilustración de MAVEN. Crédito: NASA/GSFC') ], r:1.75, inc:0.5 },
    { id:'o-tgo', name:'ExoMars Trace Gas Orbiter', agency:'ESA / Roscosmos', date:'2016-10-19', status:'activo', story:'Analiza gases traza de la atmósfera como el metano.', images:[ img('mars_exploration_25_exomars_2016.jpg','Ilustración del TGO. Crédito: ESA') ], r:1.45, inc:1.1 },
    { id:'o-hope', name:'Hope (Al-Amal)', agency:'EAU (MBRSC)', date:'2021-02-09', status:'activo', story:'Primera misión interplanetaria del mundo árabe; estudia el clima marciano.', images:[ img('mars_exploration_27_hope.jpg','Ilustración de Hope. Crédito: MBRSC') ], r:1.95, inc:0.3 },
    { id:'o-tianwen', name:'Tianwen-1 (orbitador)', agency:'China (CNSA)', date:'2021-02-10', status:'activo', story:'Orbitador que llevó a Zhurong y sirve de relevo.', images:[ img('mars_exploration_28_tianwen-1_from_deployed_camera_cnsa.jpg','Tianwen-1 en ruta a Marte. Crédito: CNSA') ], r:1.65, inc:0.8 },
    { id:'o-mgs', name:'Mars Global Surveyor', agency:'NASA', date:'1997-09-12', status:'inactivo', story:'Operó más de nueve años y envió más de 240.000 imágenes. Sigue orbitando sin funcionar.', images:[ img('mars_exploration_12_mars_global_surveyor_spacecraft.jpg','Ilustración de Mars Global Surveyor. Crédito: NASA/JPL') ], r:1.4, inc:1.9 },
    { id:'o-mariner9', name:'Mariner 9', agency:'NASA', date:'1971-11-13', status:'inactivo', story:'La primera nave en orbitar otro planeta; cartografió el 85% de Marte. Su operación terminó en octubre de 1972 y sigue en órbita.', images:[ img('mars_exploration_6_mariner_9_mars_global_map.jpg','Mapa global de Marte hecho con imágenes de Mariner 9. Crédito: NASA/JPL') ], r:1.85, inc:1.2 },
    { id:'o-mom', name:'Mangalyaan (MOM)', agency:'India (ISRO)', date:'2014-09-24', status:'inactivo', story:'Primera misión de India a Marte; llegó dos días después de MAVEN.', images:[ img('mars_exploration_24_mars_orbiter_mission_india_artistsconcept.jpg','Concepto artístico de Mangalyaan. Crédito: ISRO') ], r:1.6, inc:2.2 }
  ].map(o => ({ ...o, body:'mars', type:'Orbitador', orbit:true, sources:[H25] }));
  window.MARS_OBJECTS.forEach(o => { o.body = 'mars'; o.year = +o.date.slice(0, 4);
    o.statusNote = { activo:'En operación.', inactivo:'Intacto pero sin funcionar.', impacto:'Destruido o estrellado.', pasivo:'Sin energía, aún útil.', perdido:'Contacto perdido.' }[o.status] + (o.approx ? ' Ubicación aproximada.' : ''); });
  window.MARS_ORBITERS.forEach(o => { o.year = +o.date.slice(0, 4); o.statusNote = { activo:'En operación.', inactivo:'Sigue en órbita sin funcionar.', perdido:'Señal perdida (en revisión).' }[o.status]; });

  // Misiones a Marte que no dejaron hardware en superficie/órbita (para la línea de tiempo). Fuente: NASA 25 años.
  window.MARS_EVENTS = [
    { year:1962, name:'Mars 1', agency:'URSS', status:'perdido', story:'Perdió el contacto en ruta a Marte.', images:[ img('mars_exploration_3_mars_1_nasa.jpg','Nave soviética Mars 1. Crédito: NASA') ] },
    { year:1964, name:'Mariner 3', agency:'NASA', status:'perdido', story:'Un fallo de la cubierta impidió desplegar sus paneles solares.' },
    { year:1965, name:'Mariner 4', agency:'NASA', status:'exito', story:'Sobrevuelo del 14 de julio de 1965: primera misión exitosa a Marte, 22 imágenes.', images:[ img('mars_exploration_2_mariner_4_mars_highest_resoluton_image.jpg','La imagen de mayor resolución de Mariner 4, julio de 1965. Crédito: NASA/JPL') ] },
    { year:1969, name:'Mariner 7', agency:'NASA', status:'exito', story:'Sobrevuelo; perdió contacto por un momento y luego completó su misión.', images:[ img('mars_exploration_5_mariner_6-7.png','Mariner 7. Crédito: NASA/JPL') ] },
    { year:1988, name:'Phobos 1 y 2', agency:'URSS', status:'perdido', story:'Phobos 1 perdió contacto en ruta; Phobos 2 llegó a órbita en 1989 y falló poco después.', images:[ img('mars_exploration_9_phobos_from_phobos_2_mar_25_1989_250_km_iki.png','Última imagen de Fobos tomada por Phobos 2, 1989. Crédito: IKI') ] },
    { year:1993, name:'Mars Observer', agency:'NASA', status:'perdido', story:'Perdió el contacto tres días antes de entrar en órbita, probablemente por una explosión de combustible.', images:[ img('mars_exploration_10_mars_observer_1992.jpg','Ilustración de Mars Observer. Crédito: NASA/JPL') ] },
    { year:1996, name:'Mars 96', agency:'Rusia', status:'perdido', story:'Falló su etapa superior y reingresó a la atmósfera terrestre.' },
    { year:1999, name:'Mars Climate Orbiter', agency:'NASA', status:'perdido', story:'Se perdió el 23 de septiembre de 1999 por confundir unidades métricas e inglesas.', images:[ img('mars_exploration_14_mars_climate_orbiter.jpg','Ilustración del Mars Climate Orbiter. Crédito: NASA/JPL') ] },
    { year:2003, name:'Nozomi', agency:'Japón (ISAS)', status:'perdido', story:'Sin combustible suficiente para entrar en órbita; pasó junto a Marte el 14 de diciembre de 2003.', images:[ img('mars_exploration_13_nozomi.jpg','Ilustración de Nozomi. Crédito: JAXA') ] },
    { year:2011, name:'Fobos-Grunt', agency:'Rusia / China', status:'perdido', story:'Su motor no la impulsó hacia Marte y reingresó a la Tierra en enero de 2012.' }
  ].map(e => ({ ...e, body:'mars', type:'Misión', sources:[H25] }));
})();

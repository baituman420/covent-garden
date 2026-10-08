// Site Information & Central Content Configuration
// Para cambiar cualquier texto, enlace o imagen de la web, edita este archivo.

export const site = {
  name: "Covent Garden Bilbao",
  shortName: "Covent Garden",
  city: "Bilbao",
  address: "Calle Doctor Areilza 28",
  fullAddress: "Doctor Areilza 28 · Indautxu, Bilbao",
  neighborhood: "Indautxu",
  googleMapsUrl: "https://maps.google.com/?q=Doctor+Areilza+28+Bilbao",
  metroStation: "Metro Indautxu (Salida Doctor Areilza) a 3 minutos a pie.",
  logo: "images/c-de-covent-logo.jpg",
};

export const instagram = {
  profile: "https://instagram.com/coventgarden_bilbao",
  handle: "@coventgarden_bilbao",
  hashtag: "#CoventGardenBilbao",
  featuredPost: "https://www.instagram.com/p/DTTF9mwiDq6/", 
};

export const navigation = [
  { label: "EL PUB", href: "#el-pub" },
  { label: "ESPECIALIDADES", href: "#especialidades" },
  { label: "ATHLETIC", href: "#athletic" },
  { label: "GRUPOS", href: "#grupos" },
  { label: "LA BARRA", href: "#barra" },
  { label: "GALERÍA", href: "#galeria" },
  { label: "RESERVADOS", href: "grupos-reservados/", page: true },
];

export const heroContent = {
  eyebrow: "Doctor Areilza 28 · Indautxu, Bilbao",
  title: "Covent Garden",
  subtitle: "Bilbao",
  description: "Un clásico de Bilbao con alma de pub británico.",
  pills: ["PUB", "PINTXOS", "LIVE SPORT"],
  backgroundImage: "images/fachada-hero.png",
  primaryCta: { label: "CONOCE EL PUB", href: "#el-pub" },
  secondaryCta: { label: instagram.handle, href: instagram.profile, external: true },
  tertiaryCta: { label: "Cómo Llegar", href: "#como-llegar" },
};

export const elPubContent = {
  tag: "La Pizarra & El Pub",
  title: "Un clásico de Bilbao con alma de pub británico.",
  description: "Madera noble, lámparas cálidas, conversaciones de barra y el recuerdo imborrable del tren en miniatura en el techo.",
  mainImage: {
    src: "images/covent-interior.jpg",
    alt: "Interior de Covent Garden Bilbao",
    captionTitle: "Atmósfera Central",
    captionDesc: "Vigas centenarias, banquetas de caoba y grifos de bronce pulido.",
  },
  secondaryImage: {
    src: "images/covent-pared.jpg",
    alt: "Memorabilia en las paredes de Covent Garden",
    tag: "Memorabilia Tabernera",
    title: "Paredes que han vivido mil previas del Athletic",
    desc: "Cartelería victoriana original, placas esmaltadas, latón histórico y botellería de colección.",
  },
  specialFeature: {
    title: "El Tren del Techo",
    desc: "El trazado de ferrocarril en miniatura suspendido sobre los tiradores: un elemento identitario clásico de Covent Garden en Indautxu.",
  },
};

export const comerBeberContent = {
  tag: "Comer en Covent",
  title: "Pintxos, tortilla y algo más.",
  description: "Barra viva y raciones variadas para acompañar cada ronda entre amigos.",
  mainImage: {
    src: "images/covent-tortilla.jpg",
    alt: "Tortilla de patata recién hecha",
    badge: "Especialidad de la casa",
  },
  overlayImage: {
    src: "images/covent-pincho.jpg",
    alt: "Pincho de tortilla",
    title: "El Pincho de Tortilla",
    desc: "Jugosa y recién cuajada",
  },
  categories: [
    {
      number: "01",
      title: "Pintxos de Barra",
      desc: "Gildas clásicas, montaditos calientes y bocados crujientes al momento.",
    },
    {
      number: "02",
      title: "Tortilla Rellena",
      desc: "Horneada a diario con el punto justo de cuajado.",
    },
    {
      number: "03",
      title: "Raciones & Bocadillos",
      desc: "Bocadillos, hamburguesas, cazuelas y picoteo tabernero para compartir.",
    },
  ],
};

export const barraContent = {
  tag: "Los Tiradores & La Botillería",
  title: "Una pinta. Otra historia.",
  description: "De la frescura del trago largo de cerveza rubia a la pausa de un buen whisky o ginebra destilada.",
  categories: ["CERVEZAS", "PINTAS", "COPAS"],
  mainImage: {
    src: "images/covent-barra.jpg",
    alt: "Barra principal de Covent Garden Bilbao",
    title: "Cristalería enfriada y tiro tradicional",
  },
  featureImage: {
    src: "images/covent-grifo-oro.jpg",
    alt: "Grifo de cerveza de bronce en Covent Garden",
    badge: "Grifo Oro Bilbao",
    title: "Cerveza Servida Como Debe Ser",
    desc: "Espuma consistente, temperatura exacta y presión controlada. En copa, caña o pinta británica.",
  },
};

export const especialidadesContent = {
  tag: "La Cocina & El Picoteo",
  title: "Especialidades de la Casa",
  subtitle: "Sabor tabernero, producto fresco y raciones para compartir",
  description: "Desde la tortilla recién cuajada hasta nuestros cachopos y hamburguesas, cada propuesta está pensada para acompañar la buena cerveza y la conversación de barra.",
  disclaimer: "Selección orientativa sujeta a disponibilidad diaria en el local.",
  items: [
    {
      id: "tortilla",
      title: "Tortilla de Patata",
      subtitle: "Recién cuajada",
      badge: "Insignia Covent",
      image: "images/covent-tortilla.jpg",
      description: "Jugosa, con cebolla confitada al punto y patata tierna. Horneada a diario para el desayuno y la ronda del mediodía.",
      tag: "01 · TRADICIÓN",
    },
    {
      id: "pincho",
      title: "Pintxos de Barra",
      subtitle: "Variedad viva diaria",
      badge: "Barra Indautxu",
      image: "images/covent-pincho.jpg",
      description: "Gildas clásicas, montaditos crujientes, cazuelitas calientes y bocados selectos sobre nuestra madera noble.",
      tag: "02 · PICOTEO",
    },
    {
      id: "burguer",
      title: "Hamburguesas Artesanas",
      subtitle: "Carne selecta & pan brioche",
      badge: "Especial Cuadrilla",
      image: "images/covent-burguer.webp",
      description: "Carne picada de vacuno, queso fundido, vegetales frescos y salsas caseras. Sabor rotundo para compartir.",
      tag: "03 · ARTESANA",
    },
    {
      id: "cachopo",
      title: "Cachopo Tabernero",
      subtitle: "Crujiente y generoso",
      badge: "Ración Caliente",
      image: "images/covent-cachopo.jpg",
      description: "Ternera tierna rellena de jamón ibérico y queso fundente, con empanado dorado recién frito.",
      tag: "04 · GENEROSO",
    },
    {
      id: "bocadillos",
      title: "Bocadillos Tradicionales",
      subtitle: "Pan rústico al momento",
      badge: "Clásico de Pub",
      image: "images/covent-bocata.jpeg",
      description: "Rellenos nobles sobre pan crujiente y caliente. La pareja perfecta para una buena pinta británica o rubia local.",
      tag: "05 · CRUJIENTE",
    },
    {
      id: "sandwich",
      title: "Sándwiches Especiales",
      subtitle: "Tostados y equilibrados",
      badge: "Pausa Tabernera",
      image: "images/covent-sandwich.jpg",
      description: "Combinaciones templadas con jamón, queso y aderezos especiales, preparados al instante para un tentempié ligero.",
      tag: "06 · TOSTADO",
    },
  ],
};

export const athleticContent = {
  tag: "SENTIMIENTO ZURIGORRI · INDAUTXU",
  title: "Aquí se vive el Athletic",
  subtitle: "75% Athletic · 25% Covent Garden",
  description: "El rugido de San Mamés a un paso de Doctor Areilza. Pantallas gigantes, previas de barra, cuadrillas y ambiente de partido en cada jornada.",
  crestImage: "images/athletic-escudo.png",
  stadiumImage: "images/athletic/san-mames-night.jpg",
  posterImage: "images/athletic/athletic-poster.jpg",
  videoUrl: "video/athletic-promo.mp4",
  features: [
    {
      number: "01",
      title: "Pantalla & Sonido Envolvente",
      desc: "Retransmisión de todos los partidos oficiales de LaLiga, Copa del Rey y competición europea.",
      highlight: "Ambiente de Grada",
    },
    {
      number: "02",
      title: "La Previa de Doctor Areilza",
      desc: "Cañas tiradas con esmero, pintxos recién salidos y cánticos rojiblancos antes del pitido inicial.",
      highlight: "Tradición Zurigorri",
    },
    {
      number: "03",
      title: "Tercer Tiempo en el Pub",
      desc: "El análisis de cada jugada entre amigos y la mejor selección de cervezas de barril para celebrar.",
      highlight: "Pintas & Cuadrilla",
    },
  ],
  callout: {
    badge: "CALENDARIO & PREVIAS",
    title: "¿Juega el Athletic hoy?",
    desc: "En Covent Garden las puertas se abren con tiempo para coger sitio, pedir tu ronda y cantar el himno juntos.",
    cta: "Consulta Próximos Partidos en Instagram",
    link: instagram.profile,
  },
  disclaimer: "Covent Garden es un establecimiento hostelero independiente. Actividad no patrocinada ni vinculada contractualmente a la entidad oficial del club.",
};

export const gruposContent = {
  tag: "ENCUENTROS & CELEBRACIONES",
  title: "Grupos y Reservados",
  subtitle: "Un pub auténtico para tus momentos especiales",
  description: "Celebra cumpleaños, reuniones de cuadrilla, encuentros de empresa o previas de partido en Covent Garden. Disfruta de un ambiente tabernero único con el servicio cercano de Josu y su equipo.",
  image: "images/covent-interior.jpg",
  secondaryImage: "images/covent-pared.jpg",
  cta: {
    label: "SOLICITAR INFORMACIÓN",
    href: "grupos-reservados/",
  },
  highlights: [
    {
      title: "Espacio Tabernero",
      desc: "Madera oscura, bancadas corridas y la atmósfera inconfundible de un pub clásico en Doctor Areilza.",
    },
    {
      title: "Picoteo & Bebidas a Medida",
      desc: "Organiza bandejas de pintxos, tortillas recién hechas y rondas de cerveza según el tamaño de tu grupo.",
    },
    {
      title: "Atención Directa",
      desc: "Sin intermediarios ni plataformas automáticas: Josu revisa cada petición y responde personalmente.",
    },
  ],
  clarification: "El envío de la solicitud no constituye reserva confirmada. Toda reserva queda sujeta a disponibilidad y confirmación personal por parte del responsable.",
};

export const deporteContent = athleticContent;

export const galleryContent = {
  tag: "La Casa Por Dentro",
  title: "Dentro de Covent.",
  subtitle: "Un pub que se reconoce antes de sentarse.",
  description: "Una taberna viva donde cada rincón guarda una historia, un partido o una conversación de barra.",
  mainItem: {
    src: "images/covent-interior.jpg",
    alt: "Atmósfera central de Covent Garden Bilbao",
    tag: "Atmósfera Central",
    title: "Vigas centenarias y barra de caoba",
  },
  items: [
    {
      src: "images/covent-pared.jpg",
      alt: "Cuadros y memorabilia en las paredes de Covent Garden",
      tag: "Memorabilia Tabernera",
      title: "Paredes con historia británica & bilbaína",
    },
    {
      src: "images/covent-barra-pintxos-interior.jpg",
      alt: "Barra repleta de pintxos y ambiente interior",
      tag: "El Pulso de Indautxu",
      title: "Conversación de tarde y cuadrillas",
    },
    {
      src: "images/covent-grifo-oro.jpg",
      alt: "Tirador de bronce Grifo Oro Bilbao",
      tag: "Tiradores de Bronce",
      title: "Grifo Oro y el tiro de cerveza perfecto",
    },
    {
      src: "images/covent-barra.jpg",
      alt: "Botillería tradicional y barra principal",
      tag: "La Botillería",
      title: "El templo de Indautxu bajo luz cálida",
    },
  ],
};

export const locationContent = {
  instagramBlock: {
    tag: "Comunidad Covent",
    title: "Síguenos en el día a día.",
    description: "Publicamos las previas del Athletic, momentos en la barra, pintxos recién hechos y la vida del pub en el corazón de Indautxu.",
    buttonText: "Seguir en Instagram",
  },
  locationBlock: {
    tag: "Nos Vemos en la Barra",
    title: "Covent Garden Bilbao",
    address: "Calle Doctor Areilza 28",
    cityInfo: "48010 Indautxu · Bilbao, Bizkaia",
    buttonText: "Abrir en Google Maps",
  },
};

export const instagramFeed = {
  account: "@coventgarden_bilbao",
  url: "https://instagram.com/coventgarden_bilbao",
  apiEndpoint: "api/instagram.php",
  fallbackPost: {
    id: "post_fallback_1",
    caption: "¡Hoy juega el Athletic! Ambiente inmejorable en Covent Garden Bilbao. Pintas frías, raciones calientes y sentimiento zurigorri en el corazón de Indautxu. ¡Aúpa Athletic!",
    imageUrl: "images/covent-barra-pintxos.jpg",
    permalink: "https://www.instagram.com/p/DTTF9mwiDq6/",
    timestamp: "2026-10-04T18:30:00Z",
    likes: 142,
  },
};


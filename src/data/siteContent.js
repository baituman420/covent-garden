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
  { label: "COMER & BEBER", href: "#comer-beber" },
  { label: "DEPORTE", href: "#deporte" },
  { label: "GALERÍA", href: "#galeria" },
  { label: "INSTAGRAM", href: instagram.profile, external: true },
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

export const deporteContent = {
  tag: "LIVE SPORT · BILBAO",
  title: "El partido se ve aquí.",
  description: "En pantalla, con ambiente de barra y en pleno corazón de Indautxu. Especialmente cuando juega el Athletic Club.",
  featuredMatch: {
    tag: "PANTALLA GIGANTE",
    badge: "SAN MAMÉS DIRECTO",
    title: "Athletic Club en Pantalla Gigante",
    desc: "Con ambiente de grada, previa de barra y espíritu rojiblanco.",
  },
  events: [
    {
      number: "01",
      category: "FÚTBOL · LA LIGA & COPA",
      title: "Athletic Club — Partidos Oficiales",
      location: "Pantallas del Pub",
    },
    {
      number: "02",
      category: "PREMIER LEAGUE",
      title: "Fútbol Internacional & Pintas",
      location: "Ambiente de Pub",
    },
    {
      number: "03",
      category: "RUGBY & SEIS NACIONES",
      title: "Jornadas Internacionales de Rugby",
      location: "Tercer Tiempo",
    },
    {
      number: "04",
      category: "GRANDES CITAS DEPORTIVAS",
      title: "Eventos & Ligas Europeas",
      location: "Retransmisión en Directo",
    },
  ],
};

export const galleryContent = {
  tag: "La Casa Por Dentro",
  title: "Dentro de Covent.",
  subtitle: "Un pub que se reconoce antes de sentarse.",
  items: [
    {
      src: "images/covent-barra-pintxos-interior.jpg",
      alt: "Ambiente interior y barra de Covent Garden",
      tag: "El Pulso de Indautxu",
      title: "Conversación de tarde y rondas compartidas",
    },
    {
      src: "images/covent-barra-pintxos.jpg",
      alt: "Barra repleta de pintxos",
      tag: "Barra Viva",
      title: "Pintxos frescos y cuadrillas",
    },
    {
      src: "images/covent-hero.jpg",
      alt: "Detalle de tiradores de cerveza",
      tag: "La Casa",
      title: "Orgullo de taberna de siempre",
    },
    {
      src: "images/covent-pared.jpg",
      alt: "Cuadros y placas en la pared del pub",
      tag: "Carácter Británico & Bilbaíno",
      title: "El encanto de los rincones con solera",
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

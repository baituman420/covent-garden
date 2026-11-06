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
  phone: "944 667 549",
  phoneFormatted: "+34 944 667 549",
  email: "admin@coventgardenbilbao.es",
  schedule: [
    { days: "Lunes a Miércoles", hours: "08:30 – 23:30" },
    { days: "Jueves", hours: "08:30 – 01:00" },
    { days: "Viernes", hours: "08:30 – 03:00" },
    { days: "Sábado", hours: "10:00 – 03:00" },
    { days: "Domingo", hours: "11:00 – 23:30" },
  ],
  logo: "images/c-de-covent-logo.jpg",
};

export const instagram = {
  profile: "https://instagram.com/coventgarden_bilbao",
  handle: "@coventgarden_bilbao",
  tartasHandle: "@lastartasdelcovent",
  hashtag: "#CoventGardenBilbao",
  featuredPost: "https://www.instagram.com/p/DTTF9mwiDq6/", 
};

export const navigation = [
  { label: "EL PUB", href: "#el-pub" },
  { label: "CARTA", href: "#carta" },
  { label: "MENÚS NAVIDAD", href: "#menus-navidad", isNavidad: true },
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
  description: "Un clásico de Bilbao con alma de pub británico. Gastronomía tabernera, pintxos vivos, buena cerveza y pasión por el Athletic.",
  pills: ["PUB BRITÁNICO", "CARTA CASERA", "PINTXOS & RABAS", "LIVE SPORT"],
  backgroundImage: "images/fachada-hero.png",
  primaryCta: { label: "VER CARTA", href: "#carta" },
  secondaryCta: { label: instagram.handle, href: instagram.profile, external: true },
  tertiaryCta: { label: "Cómo Llegar", href: "#como-llegar" },
};

export const elPubContent = {
  tag: "La Pizarra & El Pub",
  title: "Un clásico de Bilbao con alma de pub británico.",
  description: "Madera noble, lámparas cálidas, conversaciones de barra, buena cerveza bien tirada y el pulso vivo de una taberna con historia en Doctor Areilza.",
  mainImage: {
    src: "images/pub/barra-noche-calida.jpg",
    alt: "Barra principal y ambiente nocturno en Covent Garden Bilbao",
    captionTitle: "Atmósfera Central",
    captionDesc: "Madera noble, taburetes clásicos y grifos de cerveza de bronce pulido.",
  },
  secondaryImage: {
    src: "images/pub/ambiente-barra-dia.webp",
    alt: "Ambiente diurno en la barra de Covent Garden",
    tag: "Vida de Barrio en Indautxu",
    title: "Paredes que han vivido mil previas del Athletic",
    desc: "Cartelería histórica, placas esmaltadas, botellería de colección y el trato cercano del equipo.",
  },
  specialFeature: {
    icon: "local_bar",
    title: "El Alma de Indautxu",
    desc: "El punto de encuentro imprescindible de cuadrillas en Doctor Areilza para el aperitivo, el partido y la cena sin prisas.",
  },
};

export const cartelesContent = {
  rabasMarianitos: {
    src: "images/posters/cartel-rabas-marianitos.jpg",
    alt: "Cartel tradicional: Tenemos Rabas y Marianitos Preparados",
    title: "Tenemos Rabas y Marianitos Preparados",
    desc: "El aperitivo estrella de Bilbao servido al estilo Covent: vermut preparado con mimo y rabas crujientes doradas al momento.",
  },
  marianitosPreparados: {
    src: "images/posters/cartel-marianitos-preparados.jpg",
    alt: "Cartel vintage: Marianito's Preparados - Buen Vermut, Mejores Momentos",
    title: "Marianito's Preparados",
    subtitle: "Buen vermut · Mejores momentos",
    desc: "Sencillo, auténtico e irresistible. El placer de lo nuestro compartido en la barra.",
  },
  navidadKatxopo: {
    src: "images/posters/cartel-navidad-katxopo.jpg",
    alt: "Cartel especial: Menús de Navidad y Katxopo en Covent Garden",
    title: "Esta Navidad Disfruta de Nuestros Menús Especiales",
  },
};

// Menús de Navidad y Katxopo (con precios por directriz explícita del usuario, activos hasta enero)
export const navidadContent = {
  activeUntilDate: "2027-02-01T00:00:00", // Visible hasta finalizar enero
  tag: "TEMPORADA & CELEBRACIONES",
  badge: "🎄 ESPECIAL FIESTAS Y EVENTOS",
  title: "Menús de Navidad & Katxopo",
  subtitle: "Comidas de empresa, cenas de cuadrilla y reuniones en Indautxu",
  posterImage: "images/posters/cartel-navidad-katxopo.jpg",
  reservasPhone: "944 667 549",
  reservasNote: "Reserva con antelación llamando directamente al pub. Plazas limitadas para grupos.",
  menus: [
    {
      id: "katxopo",
      title: "MENÚ KATXOPO",
      badge: "MÍNIMO 2 PERSONAS",
      prices: [
        { name: "Katxopo de Jamón", price: "22 €", unit: "por persona" },
        { name: "Katxopo de Cecina", price: "24 €", unit: "por persona" },
      ],
      includes: [
        "Ración de croquetas caseras de jamón (6 unidades)",
        "Ensalada de bonito con cebolla caramelizada y salsa de piquillos",
        "Katxopo gigante con jamón o cecina de León y queso cremoso, acompañado de patatas y pimientos",
        "A elegir entre postre casero o cortado / café con leche",
      ],
      extra: "Por 5 € más: Jarra de cerveza o kalimotxo de 1 litro",
    },
    {
      id: "navidad",
      title: "MENÚ NAVIDAD",
      badge: "MENÚ COMPLETO",
      prices: [
        { name: "Menú Especial Navidad", price: "36 €", unit: "por persona" },
      ],
      entrantes: [
        "Plato de jamón, lomo y chorizo ibérico de bellota (al centro)",
        "Gambones a la plancha (3 unidades por persona)",
        "Ensalada templada de ventresca",
      ],
      platoPrincipalTitle: "Plato individual a elegir:",
      platos: [
        "TXULETA de ganado mayor con pimientos y patatas deluxe (300 g aprox.)",
        "Taco de BAKALAO a la plancha con cebolla caramelizada sobre cama panadera",
      ],
      postres: "Postres caseros a elegir",
      bodega: "Vino crianza, Rueda, refrescos o cañas de cerveza",
    },
  ],
  footerNote: "Este año reserva con nosotros: Catering de grupos, catering de empresa o eventos de empresa.",
};

// Carta General Completa (Estrictamente SIN PRECIOS)
export const cartaContent = {
  tag: "La Carta de Covent",
  title: "Nuestra Carta Tabernera",
  subtitle: "Cocina casera, raciones generosas y producto fresco preparado al momento",
  description: "Desde nuestras hamburguesas smash artesanas y pizzas sobre tabla Covent hasta las clásicas rabas de Bilbao, bocadillos rústicos y platos combinados.",
  menuIncludesNotice: "Todas nuestras hamburguesas, bocatas, sándwiches y pizzas incluyen bebida (caña, refresco, agua o copa de vino) y guarnición de patatas fritas o ensalada. Opciones de pan y masa sin gluten disponibles.",
  glutenNotice: "Disponemos de opciones con pan o masa sin gluten. Consúltanos para alérgenos y adaptaciones.",
  dessertNotice: "Elaboramos postres y tartas caseras a diario. Síguenos en Instagram en @lastartasdelcovent.",

  categories: [
    {
      id: "raciones",
      name: "Raciones & Para Empezar",
      shortDesc: "Aperitivos, fritura crujiente y tablas para compartir en la barra o en la mesa",
      badge: "Para Compartir",
      visualReferences: [
        {
          title: "Rabas Crujientes al Limón",
          desc: "Tiras doradas y tiernas con limón recién cortado y salsa artesanal",
          badge: "Especialidad Vermut",
          src: "images/gastronomia/rabas-crujientes.jpg",
        },
        {
          title: "Patatas 6 Salsas en Tabla",
          desc: "Doble ración de patatas rústicas crujientes con 6 salsas caseras",
          badge: "Para Compartir",
          src: "images/gastronomia/patatas-6-salsas.jpg",
        },
      ],
      items: [
        {
          name: "Rabas Crujientes de la Casa",
          desc: "Tiras de calamar fritas con su toque dorado y tierno, servidas con limón recién cortado y salsa casera.",
          tags: ["Clásico de Bilbao", "Especialidad Vermut"],
        },
        {
          name: "Patatas 6 Salsas",
          desc: "Doble ración de patatas rústicas crujientes en tabla de madera, acompañadas de 6 salsas artesanales para dipear.",
          tags: ["Imprescindible Cuadrilla"],
        },
        {
          name: "Patatas Covent",
          desc: "Patatas fritas doradas gratinadas al horno con dados de bacon crujiente y abundante queso mozzarella fundente.",
          tags: ["Gratinadas al Horno"],
        },
        {
          name: "Croquetas de la Amama",
          desc: "8 croquetas caseras de bechamel sedosa y rebozado fino. A elegir: Jamón Ibérico, Hongos o Queso Azul.",
          tags: ["Caseras · 8 uds"],
        },
        {
          name: "Natxos Gratinados",
          desc: "Totopos crujientes horneados con doble capa de queso fundido, o versión con queso y bacon crujiente.",
          tags: ["Para Picar"],
        },
        {
          name: "Nuggets Caseros de Pollo",
          desc: "8 unidades elaboradas en nuestra cocina con pechuga de pollo 100% natural, crujientes por fuera y jugosos por dentro.",
          tags: ["100% Caseros · 8 uds"],
        },
        {
          name: "Quesadillas al Punto",
          desc: "4 unidades de tortitas de trigo doradas a la plancha rellenas de queso fundente, con guacamole o salsa mexicana suave.",
          tags: ["4 unidades"],
        },
        {
          name: "Tabla de Paletilla Ibérica",
          desc: "Corte selecto de paleta ibérica con aceite de oliva virgen extra y picos rústicos artesanos. Disponible en formato mediano o grande.",
          tags: ["Ibérico Selecto"],
        },
        {
          name: "Tabla de Queso Viejo Manchego",
          desc: "Cuñas curadas de queso viejo con carácter, servidas con frutos secos y pan crujiente.",
          tags: ["Queso Noble"],
        },
        {
          name: "Aros de Cebolla Rebozados",
          desc: "Aros de cebolla dulce con empanado crujiente y salsa a elegir.",
          tags: ["Picoteo"],
        },
      ],
    },
    {
      id: "burguers",
      name: "Burguers & Smash",
      shortDesc: "Carne selecta picada a diario, pan brioche tierno y versiones smash churruscaditas",
      badge: "Menú Completo Incluido",
      note: "Todas nuestras hamburguesas incluyen bebida (caña, refresco, agua o vino) y patatas fritas o ensalada. Opción de pan sin gluten disponible.",
      visualReferences: [
        {
          title: "Smash Covent con Panceta",
          desc: "Doble carne smash churruscada, cheddar fundente, cebolla morada y salsa de la casa",
          badge: "Smash Moments",
          src: "images/gastronomia/burger-smash-bacon.webp",
        },
        {
          title: "Smash Pollo Crujiente",
          desc: "Carne de pollo casero especiado, lechuga tierna, tomate y mayonesa suave",
          badge: "100% Casera",
          src: "images/gastronomia/burger-pollo-crujiente.webp",
        },
        {
          title: "Burguer Covent Clásica",
          desc: "Vacuno noble a la parrilla con cebolla potxada, pimiento asado y queso",
          badge: "Receta Covent",
          src: "images/gastronomia/burger-clasica-queso.webp",
        },
        {
          title: "Super Tocha XXL",
          desc: "Doble medallón de vacuno, huevo frito con puntilla y aros crujientes",
          badge: "Doble Vacuno",
          src: "images/gastronomia/burger-buey-gourmet.jpg",
        },
      ],
      items: [
        {
          name: "Smash Covent",
          desc: "2 carnes churruscaditas en plancha smash, panceta ibérica adobada, cebolla morada, doble de queso cheddar y salsa especial de la casa.",
          tags: ["Smash Moments", "Insignia"],
        },
        {
          name: "Smash Pollo",
          desc: "2 carnes caseras de pollo especiado a la plancha smash, doble queso, lechuga tierna, tomate, cebolla y mayonesa suave.",
          tags: ["Smash Moments"],
        },
        {
          name: "Smash Especial",
          desc: "2 carnes smash doraditas, cebolla potxada dulce, bacon ahumado, queso Idiazabal, lascas de jamón crujiente y mayonesa.",
          tags: ["Smash Moments", "Queso Idiazabal"],
        },
        {
          name: "Burguer Covent",
          desc: "Carne de vacuno a la parrilla, lechuga, bacon, cebolla potxada, queso fundido, pimiento rojo asado y mayonesa.",
          tags: ["Receta Covent"],
        },
        {
          name: "Super Tocha",
          desc: "Doble medallón de carne de vacuno, huevo frito con puntilla, aros de cebolla crujientes, queso, lechuga, tomate y mayonesa.",
          tags: ["Doble Carne · XXL"],
        },
        {
          name: "Carnívora",
          desc: "Carne de vacuno jugosa combinada con carne desmigada de pulled pork casero, bacon crujiente, queso fundido y salsa barbacoa ahumada.",
          tags: ["Vacuno & Pulled Pork"],
        },
        {
          name: "A Caballo",
          desc: "Hamburguesa clásica de vacuno coronada con huevo frito, lechuga, tomate fresco, cebolla, queso y mayonesa.",
          tags: ["Con Huevo Frito"],
        },
        {
          name: "Holandesa",
          desc: "Medallón de vacuno sobre cama de lechuga y tomate en rodaja, cebolla, abundante queso y mayonesa.",
          tags: ["Clásica"],
        },
        {
          name: "Vegana",
          desc: "Hamburguesa 100% vegetal con lechuga fresca, tomate de huerta, cebolla pochada y fondo de tomate frito casero.",
          tags: ["100% Vegetal"],
        },
        {
          name: "Sola o con Queso / Bacon",
          desc: "La base perfecta para los puristas de la carne: simple, jugosa, o con queso fundido y loncha de bacon crujiente.",
          tags: ["Esencia Clásica"],
        },
      ],
    },
    {
      id: "pizzas",
      name: "Pizzas Artesanas",
      shortDesc: "Masa estirada al momento y horneada sobre bandeja rústica de madera noble",
      badge: "Servidas en Tabla Covent",
      note: "Todas las pizzas incluyen bebida y guarnición de patatas fritas o ensalada. Opción de masa sin gluten.",
      visualReferences: [
        {
          title: "Pizza Mediterránea en Tabla",
          desc: "Mozzarella fundente, verduras frescas salteadas de la huerta y aceitunas negras",
          badge: "Tabla Covent",
          src: "images/gastronomia/pizza-mediterranea-tabla.webp",
        },
        {
          title: "Pizza Serrana con Paleta Ibérica",
          desc: "Virutas finas de jamón ibérico, pimiento verde confitado y bacon ahumado",
          badge: "Ibérico Selecto",
          src: "images/gastronomia/pizza-serrana-iberica.jpg",
        },
      ],
      items: [
        {
          name: "Pizza Mediterránea",
          desc: "Mozzarella fundente, orégano, pimientos rojos y verdes salteados, cebolla roja, calabacín y aceitunas negras sobre base crujiente.",
          tags: ["Huerta Mediterránea"],
        },
        {
          name: "Pizza Serrana",
          desc: "Mozzarella hilada, orégano, virutas de paleta ibérica curada, pimiento verde confitado y bacon ahumado.",
          tags: ["Ibérico"],
        },
        {
          name: "Pizza Covent",
          desc: "Mozzarella, pimientos rojos y verdes, champiñones laminados frescos, jamón york braseado y bacon.",
          tags: ["Especial Covent"],
        },
        {
          name: "Pizza Barbacoa",
          desc: "Mozzarella, carne de vacuno picada, pulled pork jugoso desmigado, bacon y cordón de salsa barbacoa americana.",
          tags: ["Sabor Barbacoa"],
        },
        {
          name: "Pizza Cuatro Quesos",
          desc: "Mezcla cremosa de queso mozzarella, cheddar fundente, queso azul de carácter y queso de cabra templado.",
          tags: ["4 Quesos"],
        },
        {
          name: "Pizza Ali Oli Chicken",
          desc: "Base de mozzarella y orégano cubierta de tiras de pollo a la plancha, champiñones, paleta ibérica y toque de ali-oli casero.",
          tags: ["Pollo & Ali-Oli"],
        },
        {
          name: "Pizza Txistorra",
          desc: "Mozzarella, orégano aromático, tacos de txistorra tradicional de carnicería y dados de bacon dorados.",
          tags: ["Txistorra Tradicional"],
        },
        {
          name: "Pizza Especial",
          desc: "Mozzarella, orégano, rodajas de tomate natural, boloñesa casera de carne y rematada con huevo frito al centro.",
          tags: ["Boloñesa & Huevo"],
        },
        {
          name: "Pizza Hawaiana",
          desc: "Mozzarella suave, orégano, dados de piña natural jugosa y dados de jamón de york.",
          tags: ["Clásico Hawaiano"],
        },
        {
          name: "Pizza Mexicana",
          desc: "Mozzarella, pimientos rojos y verdes, pechuga de pollo, maíz dulce y salsa mexicana con punto picante.",
          tags: ["Toque Picante"],
        },
      ],
    },
    {
      id: "platos",
      name: "Platos Combinados",
      shortDesc: "Platos completos y abundantes con guarnición de patatas caseras y ensalada fresca",
      badge: "Comida Tabernera",
      visualReferences: [
        {
          title: "Nº 2 · Lomo Plancha, Huevo & Croquetas",
          desc: "Lomo tierno, huevo de corral, croquetas artesanas, ensalada y patatas",
          badge: "Clásico Nº 2",
          src: "images/gastronomia/plato-lomo-croquetas-huevo.webp",
        },
        {
          title: "Nº 5 · Pechugas de Pollo & Croquetas",
          desc: "Pechugas jugosas con bechamel casera crujiente y guarnición de la huerta",
          badge: "Favorito Nº 5",
          src: "images/gastronomia/plato-pechugas-croquetas.webp",
        },
        {
          title: "Nº 3 · Filete de Ternera con Piquillos",
          desc: "Ternera lechal sellada con pimientos rojos asados y ensalada fresca",
          badge: "Ternera Tierna",
          src: "images/gastronomia/plato-filete-piquillos.jpg",
        },
        {
          title: "Nº 7 · Doble Hamburguesa & Huevos",
          desc: "2 carnes a la plancha, huevo frito con puntilla, bacon y croquetas",
          badge: "Completo Nº 7",
          src: "images/gastronomia/plato-hamburguesas-huevos.webp",
        },
      ],
      items: [
        {
          name: "Nº 1 · Entrecot a la Plancha",
          desc: "Corte noble de entrecot de vacuno sellado al punto, pimientos rojos del piquillo asados, ensalada de la huerta y patatas fritas.",
          tags: ["Entrecot Vacuno"],
        },
        {
          name: "Nº 2 · Lomo a la Plancha & Croquetas",
          desc: "Filetes de lomo tierno a la plancha, 2 croquetas caseras de la casa, huevo frito con puntilla, ensalada y patatas fritas.",
          tags: ["Clásico de Barra"],
        },
        {
          name: "Nº 3 · Filete de Ternera con Piquillos",
          desc: "Filete de ternera lechal empanado o a la plancha con pimientos rojos confitados, ensalada fresca y patatas fritas.",
          tags: ["Ternera Tierna"],
        },
        {
          name: "Nº 4 · Fitness Pollo Plancha & Pasta",
          desc: "Pechugas de pollo marinadas a la plancha, plato de pasta con hierbas aromáticas y abundante ensalada verde.",
          tags: ["Línea Saludable"],
        },
        {
          name: "Nº 5 · Pechugas de Pollo & Croquetas",
          desc: "Pechugas de pollo jugosas a la plancha, 2 croquetas cremosas caseras, ensalada fresca con aliño balsámico y patatas fritas.",
          tags: ["Favorito Clásico"],
        },
        {
          name: "Nº 6 · Plato de Pasta Artesana",
          desc: "Pasta al dente con lascas de queso madurado, a elegir entre salsa boloñesa tradicional, al ajillo suave o tomate casero.",
          tags: ["Pasta al Gusto"],
        },
        {
          name: "Nº 7 · Doble Hamburguesa con Huevo",
          desc: "2 medallones de hamburguesa a la plancha, huevo frito, tiras de bacon crujiente, 2 croquetas, ensalada y patatas fritas.",
          tags: ["Doble Carne"],
        },
        {
          name: "Nº 8 · Sarteneko de Huevos Rotos",
          desc: "Huevos de corral rotos sobre cama de patatas fritas calientes, a elegir entre: Txistorra, Jamón Ibérico, Morcilla o Bacon.",
          tags: ["Sarteneko"],
        },
        {
          name: "Nº 9 · Fajitas con Pollo y Verduras",
          desc: "Tiras de pechuga salteadas con pimiento verde, pimiento rojo y cebolla, con toque de guacamole o salsa mexicana y patatas fritas.",
          tags: ["Fajitas"],
        },
        {
          name: "Especial Peques",
          desc: "Arroz blanco o pasta con tomate casero acompañado de filete de ternera, lomo o pechuga de pollo, 2 croquetas y patatas fritas.",
          tags: ["Menú Infantil"],
        },
      ],
    },
    {
      id: "bocatas-sandwiches",
      name: "Bocadillos & Sándwiches",
      shortDesc: "Pan rústico de masa madre y pan tostado con rellenos generosos de primera calidad",
      badge: "Con Bebida y Patatas",
      note: "Todos los bocadillos y sándwiches incluyen bebida (caña, refresco, agua o vino) y patatas fritas o ensalada.",
      visualReferences: [
        {
          title: "Sándwich Indautxu con Tortilla",
          desc: "Pan tostado, tortilla francesa, bacon crujiente, queso fundido y cebolla potxada",
          badge: "Especial Indautxu",
          src: "images/gastronomia/sandwich-indautxu-tortilla.jpg",
        },
        {
          title: "Sándwich Athletic Zurigorri",
          desc: "Pollo a la plancha, paletilla ibérica curada, queso y mayonesa suave",
          badge: "Zurigorri",
          src: "images/gastronomia/sandwich-especial-doble.webp",
        },
        {
          title: "Bocadillos Rústicos en Barra",
          desc: "Pan crujiente recién horneado con rellenos generosos de calidad",
          badge: "Barra Covent",
          src: "images/gastronomia/barra-bocadillos-perspectiva.jpg",
        },
      ],
      items: [
        {
          name: "Sándwich Indautxu",
          desc: "Pan blanco tostado con mantequilla, lechuga tierna, tomate fresco, cebolla potxada, lonchas de bacon, queso fundido, tortilla francesa y mayonesa.",
          tags: ["Especial Covent", "Tostado"],
        },
        {
          name: "Sándwich Athletic",
          desc: "Lechuga, tomate, queso fundente, pechugas de pollo doradas a la plancha, paletilla ibérica curada y mayonesa suave.",
          tags: ["Zurigorri"],
        },
        {
          name: "Sándwich Tost de Huevo",
          desc: "Jamón de york, queso tierno, huevo frito con yema melosa y paletilla ibérica sobre doble piso tostado.",
          tags: ["Con Huevo Frito"],
        },
        {
          name: "Sándwich Covent",
          desc: "Lechuga, tomate fresco, panceta ibérica curada, queso, huevo frito y mayonesa.",
          tags: ["Panceta Ibérica"],
        },
        {
          name: "Sándwiches Mixto & Mixto Ibérico",
          desc: "El sándwich plancha de siempre con jamón de york o jamón ibérico con abundante queso fundido.",
          tags: ["Clásico"],
        },
        {
          name: "Bocata Covent",
          desc: "Pechugas de pollo empanadas recién fritas, paletilla ibérica, crema untuosa de queso con setas salteadas y bacon crujiente.",
          tags: ["Bocata Estrella"],
        },
        {
          name: "Bocata Pozas",
          desc: "Paletilla ibérica de bellota, rulo de cabra sellado a la plancha, setas de temporada y pimiento verde frito.",
          tags: ["Paleta & Cabra"],
        },
        {
          name: "Bocata Gordo",
          desc: "Lomo tierno a la plancha, bacon ahumado, queso fundido, huevo frito con puntilla, pimientos del piquillo confitados y mayonesa.",
          tags: ["Completo"],
        },
        {
          name: "Bocata Ranchero",
          desc: "Pulled pork casero jugoso, pechuga de pollo, aros de cebolla crujientes y salsa mexicana con punto picante.",
          tags: ["Pulled Pork"],
        },
        {
          name: "Bocata Pollito",
          desc: "Pechugas de pollo a la plancha, tiras de bacon crujiente, cebolla potxada dulce y salsa suave de miel y mostaza.",
          tags: ["Miel & Mostaza"],
        },
        {
          name: "Bocata Adobado & Panceta Ibérica",
          desc: "Lomo adobado a la plancha con paletilla ibérica, pimientos rojos y queso viejo o panceta adobada a la plancha.",
          tags: ["Tradición"],
        },
        {
          name: "Bocata Tortilla Francesa al Gusto",
          desc: "Tortilla francesa jugosa a elegir con chorizo de caserío, bonito del norte, jamón york, espárragos o queso cremoso.",
          tags: ["Tortilla Francesa"],
        },
      ],
    },
    {
      id: "ensaladas",
      name: "Ensaladas Variadas",
      shortDesc: "Bases frescas con ingredientes templados, salteados del mar y la huerta",
      badge: "Incluye 1 Pan y Bebida",
      visualReferences: [
        {
          title: "Ensalada Rulo de Cabra Caramelizado",
          desc: "Medallones a la plancha, piña, nueces y vinagreta casera de miel y mostaza",
          badge: "Queso de Cabra",
          src: "images/gastronomia/ensalada-rulo-cabra.webp",
        },
        {
          title: "Ensalada Templada de Setas e Ibérico",
          desc: "Salteado con ajitos, lonchas finas de paleta ibérica y hojas verdes",
          badge: "Setas & Paletilla",
          src: "images/gastronomia/ensalada-setas-iberico.webp",
        },
        {
          title: "Ensalada Templada Gourmet",
          desc: "Láminas de carne sellada, nueces tostadas y reducción balsámica de Módena",
          badge: "Gourmet",
          src: "images/gastronomia/ensalada-templada-gourmet.jpg",
        },
      ],
      items: [
        {
          name: "Ensalada Rulo de Cabra",
          desc: "Mix selecto de lechugas crujientes, medallones de rulo de cabra caramelizados a la plancha, piña, nueces y vinagreta dulce casera de miel y mostaza.",
          tags: ["Queso de Cabra & Miel"],
        },
        {
          name: "Ensalada de Setas e Ibérico",
          desc: "Mix de hojas verdes de huerta, salteado templado de setas silvestres con ajitos, lonchas finas de paletilla ibérica y pimientos verdes.",
          tags: ["Setas & Paletilla"],
        },
        {
          name: "Ensalada Templada Gourmet",
          desc: "Mezcla de lechugas nobles, láminas de carne sellada, nueces tostadas y reducción balsámica de Módena.",
          tags: ["Gourmet"],
        },
        {
          name: "Ensalada Ventresca",
          desc: "Láminas carnosas de ventresca de bonito del norte, pimientos del piquillo asados, gulas salteadas y cebolla dulce potxada sobre hojas verdes.",
          tags: ["Ventresca Bonito"],
        },
        {
          name: "Ensalada César",
          desc: "Tiras de pechuga de pollo crujiente empanadas al momento, lascas de queso Idiazabal, picatostes dorados y aderezo César cremoso.",
          tags: ["Pollo & Idiazabal"],
        },
        {
          name: "Ensalada Di Mare",
          desc: "Gulas salteadas con guindilla suave, finas láminas de salmón ahumado noruego y txaka marinada sobre cama verde fresca.",
          tags: ["Salmón & Gulas"],
        },
        {
          name: "Ensalada Mixta & Italiana",
          desc: "La clásica mixta de bonita con espárragos y huevo cocido o italiana tricolor con txaka, maíz dulce y salsa rosa suave.",
          tags: ["Fresca"],
        },
      ],
    },
    {
      id: "postres",
      name: "Postres y Tartas Caseras",
      shortDesc: "El broche dulce artesanal elaborado a diario en el pub",
      badge: "@lastartasdelcovent",
      items: [
        {
          name: "Tartas Caseras del Día",
          desc: "Obrador propio en Covent Garden: Tarta Ferrero Rocher, cheesecake horneada, tarta de chocolate y creaciones especiales de temporada.",
          tags: ["Elaboración Diaria"],
        },
        {
          name: "Cafetería Especial y Copas",
          desc: "Café de tueste natural, infusiones selectas y descuento especial en cubatas al comer o cenar con nosotros.",
          tags: ["Sobremesa Tabernera"],
        },
      ],
    },
  ],
};

export const barraContent = {
  tag: "Los Tiradores & La Botillería",
  title: "Una pinta. Otra historia.",
  description: "De la frescura del trago largo de cerveza rubia o tostada a la pausa de un buen whisky, vermut preparado o ginebra destilada.",
  categories: ["CERVEZAS DE BARRIL", "MARIANITOS PREPARADOS", "GIN & TONIC", "DESTILADOS NOBLES"],
  mainImage: {
    src: "images/pub/barra-noche-calida.jpg",
    alt: "Barra nocturna de Covent Garden Bilbao con iluminación cálida",
    title: "Cristalería enfriada y tiro tradicional",
    desc: "Nuestra gran barra de caoba en Doctor Areilza 28: punto de encuentro en Indautxu donde se sirve la mejor caña y se saborea la buena conversación.",
  },
  featureImage: {
    src: "images/pub/tiradores-oro-barra.jpg",
    alt: "Grifos de cerveza de bronce y selección de vinos",
    badge: "Grifo Oro Bilbao",
    title: "Cerveza Servida Como Debe Ser",
    desc: "Espuma consistente con dos dedos de crema densa, temperatura glacial y presión artesana controlada.",
  },
  cornerGinImage: {
    src: "images/pub/corner-gin-bombay.webp",
    alt: "Rincón de coctelería y botillería premium Gin Bombay Covent Garden",
    badge: "Botillería & Gin Club",
    title: "Ginebras Botánicas & Destilados Selectos",
    desc: "Copas de balón heladas, corte de cítrico fresco, tónica prémium y una selecta cava de rones añejos, whiskies de malta y licores nobles.",
  },
  highlights: [
    { icon: "local_bar", title: "Marianito de la Casa", text: "Fórmula de vermut preparado al instante con naranja y aceituna noble." },
    { icon: "sports_bar", title: "Cerveza de Bodega", text: "Tirada a presión constante para conservar todo el aroma y cuerpo." },
    { icon: "liquor", title: "Copas & Sobremesa", text: "Servicio esmerado en cristalería fina para el tardeo y la noche." },
  ],
  posters: [
    cartelesContent.marianitosPreparados,
    cartelesContent.rabasMarianitos,
  ],
};

export const especialidadesContent = {
  tag: "La Cocina & El Picoteo",
  title: "Especialidades de la Casa",
  subtitle: "Sabor tabernero, producto fresco y raciones generosas",
  description: "Desde las rabas doradas y las hamburguesas smash hasta nuestras pizzas artesanales en tabla de madera y la tortilla recién cuajada, cada plato está pensado para acompañar la buena conversación.",
  disclaimer: "Selección de la carta servida a diario en Doctor Areilza 28. Menús completos disponibles.",
  items: [
    {
      id: "rabas",
      title: "Rabas de Bilbao",
      subtitle: "Crujientes y tiernas",
      badge: "Insignia Vermut",
      image: "images/gastronomia/rabas-crujientes.jpg",
      description: "Tiras de calamar limpias fritas al punto exacto con rebozado fino. El maridaje perfecto para un Marianito preparado de la casa.",
      tag: "01 · TRADICIÓN",
    },
    {
      id: "smash",
      title: "Hamburguesas Smash",
      subtitle: "Carne picada al día y pan brioche",
      badge: "Smash Moments",
      image: "images/gastronomia/burger-smash-bacon.webp",
      description: "Doble carne churruscadita en plancha, queso cheddar fundente, bacon ibérico y salsa especial. Acompañada de patatas o ensalada.",
      tag: "02 · ARTESANA",
    },
    {
      id: "patatas-6-salsas",
      title: "Patatas 6 Salsas",
      subtitle: "Tabla rústica de madera",
      badge: "Especial Cuadrilla",
      image: "images/gastronomia/patatas-6-salsas.jpg",
      description: "Generosa ración de patatas fritas crujientes con 6 salsas caseras diferentes para probar y compartir entre amigos.",
      tag: "03 · PARA COMPARTIR",
    },
    {
      id: "pizzas-tabla",
      title: "Pizzas en Tabla Covent",
      subtitle: "Masa artesanal y corteza dorada",
      badge: "Tabla Grabada",
      image: "images/gastronomia/pizza-mediterranea-tabla.webp",
      description: "Horneadas al momento con ingredientes nobles sobre nuestra tabla de madera Covent Garden. Crujientes y jugosas.",
      tag: "04 · HORNO",
    },
    {
      id: "platos-combinados",
      title: "Platos Combinados",
      subtitle: "Completos y equilibrados",
      badge: "Cocina Tabernera",
      image: "images/gastronomia/plato-lomo-croquetas-huevo.webp",
      description: "Carnes nobles, huevos de corral, croquetas caseras y guarniciones abundantes para reponer fuerzas.",
      tag: "05 · ENERGÍA",
    },
    {
      id: "sandwich-indautxu",
      title: "Sándwiches & Bocatas",
      subtitle: "Rellenos nobles al momento",
      badge: "Clásico de Pub",
      image: "images/gastronomia/sandwich-indautxu-tortilla.jpg",
      description: "Tostados dobles con tortilla francesa, bacon, queso fundido y combinaciones calientes pensadas para cualquier hora.",
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
  stadiumImage: "images/athletic/san-mames-campo.jpg", // Foto a pie de campo de San Mamés proporcionada por el usuario
  posterImage: "images/athletic/athletic-poster.jpg",
  videoUrl: "video/athletic-promo.mp4",
  features: [
    {
      number: "01",
      title: "Pantallas & Sonido Envolvente",
      desc: "Retransmisión de todos los partidos oficiales de LaLiga, Copa del Rey y competición europea.",
      highlight: "Ambiente de Grada",
    },
    {
      number: "02",
      title: "La Previa de Doctor Areilza",
      desc: "Cañas tiradas con esmero, rabas y marianitos, pintxos recién salidos y cánticos rojiblancos antes del pitido inicial.",
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
  description: "Celebra cumpleaños, cenas de empresa, reuniones de cuadrilla o previas de partido en Covent Garden. Disfruta de un ambiente tabernero único con el servicio cercano de Josu y su equipo.",
  image: "images/pub/reservado-mesa-robla.jpg",
  secondaryImage: "images/pub/reservado-mesa-tizer.jpg",
  navidadPoster: "images/posters/cartel-navidad-katxopo.jpg",
  cta: {
    label: "SOLICITAR INFORMACIÓN",
    href: "grupos-reservados/",
  },
  highlights: [
    {
      title: "Espacios Reservados y Mesas Corridas",
      desc: "Bancadas de madera noble, rincones de reservado con cartelería histórica y la atmósfera inconfundible de un pub clásico en Doctor Areilza.",
    },
    {
      title: "Menús de Grupo y Catering a Medida",
      desc: "Menús Katxopo, menús especiales de temporada y bandejas de picoteo caliente organizadas al gusto de tu grupo.",
    },
    {
      title: "Atención Directa y Cercana",
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
    src: "images/pub/barra-noche-calida.jpg",
    alt: "Barra iluminada de caoba y botellería en Covent Garden",
    tag: "Atmósfera Central",
    title: "Vigas centenarias y barra noble de noche",
  },
  items: [
    {
      src: "images/pub/ambiente-barra-dia.webp",
      alt: "Punto de encuentro y vida de barra en Indautxu",
      tag: "El Pulso de Indautxu",
      title: "Encuentro diario y cuadrillas en Doctor Areilza",
    },
    {
      src: "images/pub/reservado-mesa-robla.jpg",
      alt: "Mesa reservada con reloj y placa Ferrocarriles de La Robla",
      tag: "Reservados con Historia",
      title: "Rincones íntimos para cenas y cuadrillas",
    },
    {
      src: "images/pub/corner-gin-bombay.webp",
      alt: "Rincón de coctelería con botánicos y ginebra destilada",
      tag: "Botillería & Trago Largo",
      title: "Coctelería clásica y combinados preparados",
    },
    {
      src: "images/pub/barril-madera-covent.jpg",
      alt: "Barril de madera con el escudo grabado de Covent",
      tag: "Identidad Covent",
      title: "Artesanía de madera noble y solera bilbaína",
    },
  ],
};

export const comerBeberContent = {
  tag: "Comer & Beber en Covent",
  title: "Gastronomía viva en Doctor Areilza",
  description: "De las rabas y el marianito del mediodía a las hamburguesas smash, raciones abundantes y pizzas al horno de la cena.",
  mainImage: {
    src: "images/gastronomia/rabas-crujientes.jpg",
    alt: "Ración de rabas doradas crujientes de Covent Garden",
    badge: "Rabas & Marianitos",
  },
  overlayImage: {
    src: "images/gastronomia/burger-smash-bacon.webp",
    alt: "Hamburguesa smash artesana con bacon y queso",
    title: "Smash Covent",
    desc: "Doble carne y salsa especial",
  },
  categories: [
    {
      number: "01",
      title: "El Aperitivo de Indautxu",
      desc: "Rabas doradas crujientes y marianitos preparados con receta de la casa.",
    },
    {
      number: "02",
      title: "Smash Burgers & Raciones",
      desc: "Patatas 6 salsas, croquetas de la amama, carnes smash y combinados abundantes.",
    },
    {
      number: "03",
      title: "Pizzas, Bocatas & Sándwiches",
      desc: "Horneados en tabla de madera y panes crujientes preparados al instante con bebida incluida.",
    },
  ],
};

export const locationContent = {
  instagramBlock: {
    tag: "Comunidad Covent",
    title: "Síguenos en el día a día.",
    description: "Publicamos las previas del Athletic, momentos en la barra, especialidades recién hechas y la vida del pub en el corazón de Indautxu.",
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
    caption: "¡Hoy juega el Athletic! Ambiente inmejorable en Covent Garden Bilbao. Pintas frías, rabas recién hechas y sentimiento zurigorri en el corazón de Indautxu. ¡Aúpa Athletic!",
    imageUrl: "images/pub/ambiente-barra-dia.webp",
    permalink: "https://www.instagram.com/p/DTTF9mwiDq6/",
    timestamp: "2026-10-04T18:30:00Z",
    likes: 154,
  },
};

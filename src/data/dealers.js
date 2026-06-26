// ─────────────────────────────────────────────────────────────────
//  BASE DE CONCESIONARIOS — PROMO MUNDIALISTA MOPAR 2026
//  Armada manualmente por marca.
//  Jeep y RAM comparten la misma red → apuntan al mismo objeto.
// ─────────────────────────────────────────────────────────────────

const JEEP_RAM = {
  'CABA': [
    'SportCars',
    'Autovisiones',
    'CG Automotores',
    'Giama',
    'AutoDrive - Humahuaca 4570',
    'AutoDrive - Av. San Martín 6707',
    'Guini',
    'Sidway',
    'Taraborelli',
  ],
  'Buenos Aires': [
    'A. Russoniello - Colectora Rawson de Dellepiane 289',
    'A. Russoniello - José Cebey 1637, Rincon de Milberg',
    'Trepat',
    'Car One',
    'Cardys',
    'Cabowe',
    'Del Río Servicios',
    'Moena',
    'Giama',
    'J. Pesado Castro',
    'Jack Cars',
    'Le Mont',
    'Lonco-Hue',
    'Lyon',
    'Motorville',
    'Northville',
    'Novo Cars - Echenagucía 536',
    'Novo Cars - Av. Rivadavia 13046',
    'Panamer - Av. Santa Fe 907',
    'Panamer - Cruce Ruta Panamericana y Ruta N° 6',
    'Panamer - Madero 836',
    'SportCars - Hipólito Yrigoyen 224',
    'SportCars - Calle 525 BIS entre Calle 12 y Avenida 13',
    'Trailcar',
  ],
  'Santa Fe': [
    'Bonavita - Juan Jose Paso 1533',
    'Nation',
    'NeoStar',
  ],
  'Catamarca': [
    'Auto Road',
  ],
  'Chubut': [
    'Autoterra',
    'Fiorasi',
  ],
  'Santa Cruz': [
    'Big Car',
  ],
  'Tucumán': [
    'Brook Motors',
  ],
  'Salta': [
    'Brook Motors',
  ],
  'Chaco': [
    'Meucci',
  ],
  'San Luis': [
    'Familia Parra',
  ],
  'Mendoza': [
    'Genco',
  ],
  'Entre Ríos': [
    'Grand Car',
    'Nation',
  ],
  'La Pampa': [
    'Resasco',
  ],
  'Córdoba': [
    'JEA - Urquiza 1002',
    'Montironi',
    'Rubic - Av. Santa Ana 6363',
    'Rubic - Enlace de Ruta A 005 - Calle Estado de Palestina 2086 km 3,1',
    'Vespasiani - Sagrada Familia 434',
    'Vespasiani - Av. Gral. Savio 1350',
  ],
  'San Juan': [
    'Lorwest',
  ],
  'Misiones': [
    'Automision',
  ],
  'Río Negro': [
    'Trailcar',
  ],
  'Neuquén': [
    "Valley Star's",
  ],
  'Jujuy': [
    'Majacen - Colectora Ruta Nac. 9 Km. 10 1007',
  ],
  'Tierra del Fuego': [
    'Viaña',
  ],
}

// ── Fiat ──────────────────────────────────────────────────────────
const FIAT = {
  'Buenos Aires': [
    'Aliva - Av. 59  1045',
    'Aliva - Av. Belgrano 369',
    'Auto Novo - Av. E. Zeballos 3147',
    'Auto Novo - Av. Rivadavia 13026',
    'Auto Veneto S.A.',
    'Auto del Sol - Av. Bartolomé Mitre 1351',
    'Auto del Sol - Av. San Martín 1557',
    'Autofrance',
    'Autos Zanet - Av. Mitre 1880',
    'Autos Zanet - Hipólito Yrigoyen 8569',
    'Autos Zanet - Hipólito Yrigoyen 801',
    'Bahía Automotores - Av. España 650',
    'Bahía Automotores - Misiones 52',
    'Bahía Automotores - Ruta 226 KM 295',
    'Blois - Ruta 205, km 97.5',
    'Blois - Salgado Oeste 235',
    'Cardys - Av. Casey 850',
    'Cardys - Av. García Salinas 2196',
    'Giama - Av. Champagnat 2745',
    'Giama - Ruta 11 Km 397',
    'Ital Rouen',
    'Lego Pourtau - Av. 13 esquina 524',
    'Lego Pourtau - Comandante Cuitiño 27',
    'Lego Pourtau - Rawson y Colectora Ruta 215',
    'Lyon',
    'Montanari',
    'Peara',
    'Pilar',
    'Rotter - Av. Ricardo Balbín 1970',
    'Rotter - Monseñor Bufano 3250',
    'Stampa Automotores',
    'Taraborelli Automobile S.A.',
    'Venezia Auto',
    'Verona Automóviles S.A.',
  ],
  'CABA': [
    'Auto Novo - Av. Rivadavia 7855',
    'Auto Novo - Marcos Sastre 4420',
    'Autodrive',
    'Autogenerali - Av. Cabildo 4402',
    'Autogenerali - Juramento 4740',
    'Giama',
    'Taraborelli Automobile S.A.',
  ],
  'Catamarca': [
    'Ledian',
  ],
  'Chubut': [
    'Autoterra',
    'Fiorasi - Av. Eva Perón 2020',
    'Fiorasi - Fontana 116',
  ],
  'Corrientes': [
    'Scuderia S.A.',
  ],
  'Córdoba': [
    'Azzurra',
    'F.L.G. - Córdoba 644',
    'Montironi - Monseñor Pablo Cabrera 4935',
    'Montironi - Pedro J. Frías 175',
    'Motcor - Av. Presidente Perón 1500',
    'Motcor - Av. Santa Ana 6569',
    'Motcor - Ruta 5 y Pte. Perón (O)',
    'Turin - Av. Fuerza Aérea Argentina 3808',
    'Turin - Av. Urquiza 1041',
  ],
  'Entre Ríos': [
    'Servicio Mecánico Richard - Celia Torra 31',
    'Full Car - Av. 9 de Julio 2435',
    'Full Car - Av. Eva Perón 2508',
    'Romani',
    'Valmotors',
  ],
  'Formosa': [
    'MAPIC S.A.',
  ],
  'Jujuy': [
    'Fadua',
  ],
  'La Pampa': [
    'Genova Automotores - Av. P. Luro 1795',
    'Genova Automotores - Calle 9 nro. 863 (Oeste)',
  ],
  'La Rioja': [
    'Euronoa',
  ],
  'Mendoza': [
    'Denver - Alem 601',
    'Denver - Av. 25 de Mayo 5555',
    'Lorenzo Automotores - Av. Mitre 575 / 585 / 589',
    'Lorenzo Automotores - Bandera de los Andes 1531',
  ],
  'Misiones': [
    'Seewald Auto',
  ],
  'Neuquén': [
    'Pire Rayen Automotores',
  ],
  'Río Negro': [
    'Bahía Automotores',
    'Taraborelli Automobile S.A.',
  ],
  'Salta': [
    'Fadua',
  ],
  'San Juan': [
    'Itala',
  ],
  'San Luis': [
    'Parra e Hijos - 25 de Mayo 100',
    'Parra e Hijos - Av. Ejército de Los Andes 1228',
    'Parra e Hijos - Avenida España 1099',
  ],
  'Santa Cruz': [
    'Centenario',
  ],
  'Santa Fe': [
    'Avec',
    'Mendez Automotores - Bv. 12 de octubre 950',
    'Mendez Automotores - Sarmiento 1344',
    'Seprio',
    'Valmotors - Conscripto Zurbriggen 667 – Ruta 34 Km 222',
    'Valmotors - San Luis 3102',
  ],
  'Santiago del Estero': [
    'Novara Automotores',
  ],
  'Tierra del Fuego': [
    'Liendo - Av. General Don José de San Martín 2599',
    'Liendo - Av. Piedrabuena 256',
  ],
  'Tucumán': [
    'Fadua',
    'Piazza - Don Bosco 2519/2525',
    'Piazza - Don Bosco 2537',
  ],
}

// ── Peugeot ───────────────────────────────────────────────────────
const PEUGEOT = {
  'Buenos Aires': [
    'AUTOMOTORES DEL SUR - Juan M. de Rosas 705',
    'AUTOMOTORES DEL SUR - Olavarría 946',
    'BELCHAMP - Av. Independencia 2265',
    'BELCHAMP - Juan B. Justo 4368',
    'BLOIS',
    'CORCEL',
    'GALIA',
    'GAULOIS',
    'GRAFF',
    'GRANVILLE - Av. Perón 985',
    'GRANVILLE - Francia 976',
    'GRANVILLE - Jujuy 1771',
    'LE MONT - Av. España 37',
    'LE MONT - Lucio V Lopez 350',
    'LE MONT - Ruta 226 - km 285',
    'LENS - Av. Mitre 3410',
    'LENS - Av. García Salinas 1270',
    'LENS - Avellaneda 430',
    'POURTAU - Calle 531 Nro 2540 entre 20 y 21',
    'POURTAU - Ruta 215 esquina Rawson',
    'ROBAYNA',
  ],
  'CABA': [
    'AUTO ASIST',
    'BREST',
    "D'ARC - Av. Lope de Vega 2727",
    "D'ARC - M. Ugarte 1549",
    'DRAGO BERETTA',
    'GIAMA',
    "L'EXPRES - Agrelo 4050",
    "L'EXPRES - Cabrera 3659",
    'LE MERIDIEN',
    'ROSEDAL',
    'SVA - Av. Alvarez Thomas 1020/1032',
    'SVA - Av. Warnes 400',
    'SVA - Rocamora 4538',
  ],
  'Gran Buenos Aires': [
    'ALBENS - Avda. Calchaquí 332',
    'ALBENS - Hipólito Yrigoyen 95',
    'AUTO DEL SOL',
    'AUTOFRANCE',
    'AVIGNON',
    'CHALLANS',
    'CHAMONIX',
    'LE MERIDIEN',
    'NAVE MOTORS',
    'NOVO - Mármol 343',
    'NOVO - Rivadavia 17.258',
    'ROBAYNA - Azcuenaga 1830',
    'ROBAYNA - M.T. de Alvear 1014 (Ruta 202)',
    'SVA',
    'TOULON - Hipólito Yrigoyen 3350',
    'TOULON - Hipólito Yrigoyen 8302',
  ],
  'Catamarca': [
    'ANCASTI',
  ],
  'Chaco': [
    'METZ',
  ],
  'Chubut': [
    'GRANVILLE - Belgrano 198',
    'GRANVILLE - Hipólito Yrigoyen 1906 esq. Ladvocat',
    'GRANVILLE - J. A. Roca 931',
  ],
  'Corrientes': [
    'METZ',
  ],
  'Córdoba': [
    'AVANT - Av. Circunvalación esq. Santa Ana',
    'AVANT - Ruta 36 A005 km 4',
    'AVEC',
    'GIODA AUTOMOTORES',
    'MONTIRONI',
    'SERVICIO LEDESMA',
    'VESUBIO - Av. Pte. Perón 1718',
    'VESUBIO - Bv. Roque Sáenz Peña 1051',
    'VESUBIO - Colón 1045',
  ],
  'Entre Ríos': [
    'BANCHIK',
    'LA CONCORDE',
    'NATION',
  ],
  'Formosa': [
    'LE ROCHER',
  ],
  'Jujuy': [
    'AUTOCIEL',
  ],
  'La Pampa': [
    'VERNON - Calle 9 n° 855 Oeste',
    'VERNON - Fiorucci 22',
  ],
  'La Rioja': [
    'ANDINA',
  ],
  'Mendoza': [
    'AUT. GRAL. SAN MARTIN - Av. 25 de Mayo 5555',
    'AUT. GRAL. SAN MARTIN - L. N. Alem 551/7',
    'ROMA',
    'SUR FRANCE - Derqui 58',
    'SUR FRANCE - Víctor Hugo 187',
  ],
  'Misiones': [
    'LA CONCORDE',
    'SEEWALD',
  ],
  'Neuquén': [
    'PIRE RAYEN',
  ],
  'Río Negro': [
    'ARMORIQUE - Colectora Fortín 1° división 421, Ruta 22 km 1215',
    'ARMORIQUE - Gral. Roca 466',
    'CORCEL',
    'SAGARIA',
  ],
  'Salta': [
    'EURODYCAR',
  ],
  'San Juan': [
    'LORENZO',
  ],
  'San Luis': [
    'PARÍS AUTOS - Av. Sarmiento 420',
    'PARÍS AUTOS - Avda. Mitre 688 esq. Sarmiento',
  ],
  'Santa Cruz': [
    'EXPO SUD',
  ],
  'Santa Fe': [
    'AUTOSUR - Av. 12 de Octubre 1276 (ruta 8)',
    'AUTOSUR - Ovidio Lagos 1063',
    'AVEC',
    'MARSEILLE',
    'NATION',
  ],
  'Santiago del Estero': [
    'LE MANS',
  ],
  'Tierra del Fuego': [
    'TURENNE - General Güemes 994',
    'TURENNE - Héroes de Malvinas 3649',
  ],
  'Tucumán': [
    'INDIANA',
  ],
}

// ── Citroën ───────────────────────────────────────────────────────
const CITROEN = {
  'Buenos Aires': [
    'AUTOMOBILES LYON',
    'CORCEL - J. Newbery esq. Alsina',
    'CORCEL - Zatti 459',
    'ESPRIT POURTAU',
    'GRAFF-SCHWERDT',
    'GRANVILLE',
    'LENS',
    "L'EFFORT - Av. Comandante Espora 1284",
    "L'EFFORT - Calle 24 Nº 2855 (entre calles 57 y 59)",
    "L'EFFORT - Ruta 226 - km 285",
    "L'EFFORT",
    'PI INGENIERIA',
    'ROBAYNA',
    'RODANO - Av. Circunvalación y Sadi Carnot',
    'RODANO - Ruta 8 Km 222,82',
    'SVA S.A.C.I.F.I.',
    'TOURS',
  ],
  'CABA': [
    'AVEC BUENOS AIRES',
    "D'ARC",
    'GIAMA',
    'LA VOITURE - Av. Rivadavia 7702',
    'LA VOITURE - Coronel Ramon Lista 5050',
    'TOULON',
  ],
  'Gran Buenos Aires': [
    'AUTOMOBILES LYON - Av. Rivadavia 12048 (solo chapa y pintura)',
    'AUTOMOBILES LYON - Av. Rivadavia 13.202',
    'AVEC BUENOS AIRES',
    'AUTOFRANCE',
    'GRUPO AUTOFRANCE - Av. Sta. Fe 2458',
    "CI'DANE",
    'DAMVILLE - Av. E. Zeballos 2105 esquina La Cautiva',
    'DAMVILLE - Av. Hipólito Yrigoyen 8563',
    'DAMVILLE - Chaco 347',
    'NAVE MOTORS - Hipólito Yrigoyen 277',
    'NAVE MOTORS - Hipólito Yrigoyen 290',
    'SVA S.A.C.I.F.I.',
  ],
  'Catamarca': [
    'ESSOR',
  ],
  'Chaco': [
    'ROUGE',
  ],
  'Chubut': [
    'GRANVILLE - Belgrano 198, Puerto Madryn',
    'GRANVILLE - J. A. Roca 941',
  ],
  'Corrientes': [
    'ROUGE',
  ],
  'Córdoba': [
    'AVEC CORDOBA',
    'FAMILIA PARRA - Av. Urquiza 349',
    'FAMILIA PARRA - Avenida Castro Barros 1125',
    'LE PARC',
    'S. GIODA - Av. Savio 325',
    'S. GIODA - Ruta A005 Colectora Oeste y Perez Bulnes',
    'SERVICIO LEDESMA',
  ],
  'Entre Ríos': [
    'GERLI',
    'LA CONCORDE',
    'NATION',
    'VES HNOS',
  ],
  'Formosa': [
    'LE ROCHER S.A.',
  ],
  'Jujuy': [
    'AUTOCIEL',
  ],
  'La Pampa': [
    'VERNON - Calle 9 Oeste n° 855',
    'VERNON - Fiorucci 22',
  ],
  'La Rioja': [
    'ANDINA',
  ],
  'Mendoza': [
    'ROMA',
    'SUR FRANCE - Derqui 58',
    'SUR FRANCE - Victor Hugo 187',
  ],
  'Misiones': [
    'SEEWALD',
  ],
  'Neuquén': [
    'PIRE RAYEN',
  ],
  'Río Negro': [
    'ARMORIQUE',
    'MARCELO SAGARÍA',
    'REIMS',
  ],
  'Salta': [
    'EURODYCAR',
  ],
  'San Juan': [
    'LORENZO',
  ],
  'San Luis': [
    'PARIS AUTOS',
  ],
  'Santa Cruz': [
    'HARASIC',
  ],
  'Santa Fe': [
    'AUT. J. PESADO CASTRO',
    'AUTOSUR',
    'MARSEILLE - Av. Ovidio Lagos 740',
    'MARSEILLE - San Martín 2128 (solo chapa y pintura)',
    'NATION - Belgrano 2601 y Av. Allen',
    'NATION - Suipacha 70',
  ],
  'Santiago del Estero': [
    'VERSALLES',
  ],
  'Tierra del Fuego': [
    'TURENNE - General Manuel Belgrano 16',
    'TURENNE - Héroes de Malvinas 3649',
  ],
  'Tucumán': [
    'FORTUNATO FORTINO',
  ],
}

// ─────────────────────────────────────────────────────────────────
export const DEALERS = {
  'Jeep':    JEEP_RAM,   // misma red
  'RAM':     JEEP_RAM,   // misma red
  'Fiat':    FIAT,
  'Peugeot': PEUGEOT,
  'Citroën': CITROEN,
}

function countDealersByBrand(brand) {
  return Object.values(DEALERS[brand] || {})
    .flat()
    .length
}

console.log(countDealersByBrand('RAM'))
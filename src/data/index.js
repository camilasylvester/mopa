// ─────────────────────────────────────────────
//  MOCK DATA — replace with real API endpoints
// ─────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Inicio',              href: '#inicio',   moduleId: null },
  { label: 'Material POP',        href: '#modulos',  moduleId: 'material-pop' },
  { label: 'Material POP con QR', href: '#modulos',  moduleId: 'material-pop-qr' },
  { label: 'Piezas Digitales',    href: '#modulos',  moduleId: 'piezas-digitales' },
  { label: 'Evidencia POP',       href: '#modulos',  moduleId: 'evidencia-pop' },
  { label: 'BBCC',                href: '#modulos',  moduleId: 'bbcc' },
]

export const STATS = [
  { label: 'Concesionarias activas', value: '147',   delta: '+12',   positive: true  },
  { label: 'Registros totales',      value: '3.842', delta: '+234',  positive: true  },
  { label: 'Evidencias subidas',     value: '1.205', delta: '+89',   positive: true  },
  { label: 'Viajes en juego',        value: '28',    delta: 'activos', positive: null },
]

export const MODULES = [
  {
    id: 'material-pop',
    number: '01',
    iconName: 'Package',
    title: 'Material POP',
    subtitle: 'Descargá el material de activación para tu concesionario (sin QR)',
  },
  {
    id: 'material-pop-qr',
    number: '02',
    iconName: 'QrCode',
    title: 'Material POP con QR',
    subtitle: 'Descargá el material de activación para tu concesionario (con QR)',
  },
  {
    id: 'piezas-digitales',
    number: '03',
    iconName: 'Monitor',
    title: 'Piezas Digitales',
    subtitle: 'Piezas para redes y comunicación digital',
  },
  {
    id: 'evidencia-pop',
    number: '04',
    iconName: 'Camera',
    title: 'Evidencia POP',
    subtitle: 'Subí evidencia de activación en tu concesionario',
  },
  {
    id: 'bbcc',
    number: '05',
    iconName: 'FileText',
    title: 'BBCC',
    subtitle: 'Bases y condiciones de la campaña',
  },
]

export const BRANDS = [
  {
    id: 'jeep',
    name: 'Jeep',
    tagline: 'Freedom & Adventure',
    logo: '/logos/jeep.png',
    color: '#1B3A14',
    colorMid: '#2D5C1E',
    colorAccent: '#4A9030',
  },
  {
    id: 'ram',
    name: 'RAM',
    tagline: 'Trabajo & Performance',
    logo: '/logos/ram.png',
    color: '#1E1E1E',
    colorMid: '#2E2E2E',
    colorAccent: '#888888',
  },
  {
    id: 'peugeot',
    name: 'Peugeot',
    tagline: 'Diseño & Tecnología',
    logo: null,
    color: '#0C2440',
    colorMid: '#143560',
    colorAccent: '#2A6CBD',
  },
  {
    id: 'fiat',
    name: 'Fiat',
    tagline: 'Estilo & Pasión',
    logo: '/logos/fiat.png',
    color: '#3D0A0A',
    colorMid: '#5C1414',
    colorAccent: '#CC2222',
  },
  {
    id: 'citroen',
    name: 'Citroën',
    tagline: 'Confort & Innovación',
    logo: '/logos/citroen.png',
    color: '#0A1535',
    colorMid: '#122050',
    colorAccent: '#2244A8',
  },
]

// ─────────────────────────────────────────────
//  FORMULARIO EVIDENCIA POP — Google Apps Script
//  Pegá acá la URL del web app después de deployarlo
// ─────────────────────────────────────────────
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUNn-n1a0lPO1k5c9CJwbWjo7mx7wVyJ1Eb4FY3s-rqrORYqWiynpATEAWjRBmAF1YYQ/exec'

// ─────────────────────────────────────────────
//  LINKS REALES — completar con URLs de Google Drive
//  Estructura: CONTENT[moduleId][brandId]
//  folderUrl → link a la carpeta de Drive (botón "Descargar carpeta")
//  zipUrl    → link directo al ZIP        (botón "Descargar ZIP")
//  viewUrl   → link para visualizar       (botón "Ver materiales")
// ─────────────────────────────────────────────
const CONTENT = {
  'material-pop': {
    jeep:    { folderUrl: 'https://drive.google.com/drive/folders/10i79wmGd_J48y8VZhv2QASKwuR2bKtwf?usp=sharing',  zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/10i79wmGd_J48y8VZhv2QASKwuR2bKtwf?usp=sharing',  lastUpdate: 'Mayo 2026' },
    ram:     { folderUrl: 'https://drive.google.com/drive/folders/1fyf1UuEDGtYuDrOKH8W_QjRhpYfoBL71?usp=sharing',  zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/1fyf1UuEDGtYuDrOKH8W_QjRhpYfoBL71?usp=sharing',  lastUpdate: 'Mayo 2026' },
    peugeot: { folderUrl: 'https://drive.google.com/drive/folders/1UW6u71Ex6VF0KHCRSd5ZWXQOPOFT18X5?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/1UW6u71Ex6VF0KHCRSd5ZWXQOPOFT18X5?usp=drive_link', lastUpdate: 'Mayo 2026' },
    fiat:    { folderUrl: 'https://drive.google.com/drive/folders/153l1IWggOlJZAnhIA70grK9ac1TjcFbS?usp=drive_link',  zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/153l1IWggOlJZAnhIA70grK9ac1TjcFbS?usp=drive_link',  lastUpdate: 'Mayo 2026' },
    citroen: { folderUrl: 'https://drive.google.com/drive/folders/10sDLBWwiH9dz9UCXH4c0EJh8pMNkltP7?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/10sDLBWwiH9dz9UCXH4c0EJh8pMNkltP7?usp=drive_link', lastUpdate: 'Mayo 2026' },
  },
  'piezas-digitales': {
    jeep:    { folderUrl: 'https://drive.google.com/drive/folders/1o2-K6P3hMS0NvJWILi-97JcH3pW8xKkf?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/1o2-K6P3hMS0NvJWILi-97JcH3pW8xKkf?usp=drive_link', lastUpdate: 'Mayo 2026' },
    ram:     { folderUrl: 'https://drive.google.com/drive/folders/1qU_V8zAFhxhNWdhxHY46kYAEaO3lak0f?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/1qU_V8zAFhxhNWdhxHY46kYAEaO3lak0f?usp=drive_link', lastUpdate: 'Mayo 2026' },
    peugeot: { folderUrl: 'https://drive.google.com/drive/folders/1Bhmo1R8nxNJi5cKkDkeu7Wkq3Zy9thn_?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/1Bhmo1R8nxNJi5cKkDkeu7Wkq3Zy9thn_?usp=drive_link', lastUpdate: 'Mayo 2026' },
    fiat:    { folderUrl: 'https://drive.google.com/drive/folders/1Z7C6jgMV6N8J1Jz4kPeSk62uqN6yb9Iw?usp=sharing',   zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/1Z7C6jgMV6N8J1Jz4kPeSk62uqN6yb9Iw?usp=sharing',   lastUpdate: 'Mayo 2026' },
    citroen: { folderUrl: 'https://drive.google.com/drive/folders/1jt7pytukEtQ6ZsFXo4zcdDs63JBjFn6r?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/1jt7pytukEtQ6ZsFXo4zcdDs63JBjFn6r?usp=drive_link', lastUpdate: 'Mayo 2026' },
  },
  'evidencia-pop': {
    jeep:    { folderUrl: null, zipUrl: null, viewUrl: null, lastUpdate: null },
    ram:     { folderUrl: null, zipUrl: null, viewUrl: null, lastUpdate: null },
    peugeot: { folderUrl: null, zipUrl: null, viewUrl: null, lastUpdate: null },
    fiat:    { folderUrl: null, zipUrl: null, viewUrl: null, lastUpdate: null },
    citroen: { folderUrl: null, zipUrl: null, viewUrl: null, lastUpdate: null },
  },
  'material-pop-qr': {
    jeep:    { folderUrl: 'https://drive.google.com/drive/folders/1c08gqZN1DshikQMdneNqlW2BfcJU_8hV?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/1c08gqZN1DshikQMdneNqlW2BfcJU_8hV?usp=drive_link', lastUpdate: 'Mayo 2026' },
    ram:     { folderUrl: 'https://drive.google.com/drive/folders/1EXtZNDbMiY75n3J7ut2V5PFVv4yJ1-Gp?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/1EXtZNDbMiY75n3J7ut2V5PFVv4yJ1-Gp?usp=drive_link', lastUpdate: 'Mayo 2026' },
    peugeot: { folderUrl: 'https://drive.google.com/drive/folders/1e0VL-LLq0Bwj1SvWOvAC7DZzJXd46ENV?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/1e0VL-LLq0Bwj1SvWOvAC7DZzJXd46ENV?usp=drive_link', lastUpdate: 'Mayo 2026' },
    fiat:    { folderUrl: 'https://drive.google.com/drive/folders/14lWXnbqJnlBaYOwe_ubclUGG_7ExZiAF?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/14lWXnbqJnlBaYOwe_ubclUGG_7ExZiAF?usp=drive_link', lastUpdate: 'Mayo 2026' },
    citroen: { folderUrl: 'https://drive.google.com/drive/folders/19YJjzTGcfnzb5Gggggt7hZu7jDGH7hPH?usp=drive_link', zipUrl: null, viewUrl: 'https://drive.google.com/drive/folders/19YJjzTGcfnzb5Gggggt7hZu7jDGH7hPH?usp=drive_link', lastUpdate: 'Mayo 2026' },
  },
}

// BBCC: documento único para todas las marcas
export const BBCC_LINKS = {
  pdfUrl:  null,   // link directo al PDF en Drive
  viewUrl: null,   // link para ver en Drive
  vigencia: 'Mayo 2026',
}

export function getMockContent(moduleId, brandId) {
  const entry = CONTENT[moduleId]?.[brandId]
  if (!entry) return null
  return entry
}

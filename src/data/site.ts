import { SITE_URL } from './siteUrl'

// TODO: completar con el usuario de Instagram (sin @) y el número de WhatsApp
// (solo dígitos, sin el 549 inicial: p. ej. '1123456789'). Mientras estén vacíos,
// los botones correspondientes no se muestran.
const instagramUser: string = ''
const whatsappNumber: string = ''

const whatsappMessage = 'Hola CLB, quiero consultar por un proyecto'

export const site = {
  name: 'CLB Developers',
  url: SITE_URL,
  tagline: 'Desarrollo web y soluciones digitales a medida',
  description:
    'CLB Developers diseña y desarrolla sitios web, landing pages, sistemas a medida y soluciones digitales orientadas a resultados.',
  email: 'clbdevelopers@outlook.es',
  location: 'Buenos Aires, Argentina',
  instagram: instagramUser ? `https://instagram.com/${instagramUser}` : null,
  whatsapp: whatsappNumber
    ? `https://wa.me/549${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : null,
  nav: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Equipo', href: '#equipo' },
    { label: 'Proyectos', href: '#proyectos' },
  ],
  social: [
    ...(instagramUser ? [{ label: 'Instagram', href: `https://instagram.com/${instagramUser}` }] : []),
  ],
}

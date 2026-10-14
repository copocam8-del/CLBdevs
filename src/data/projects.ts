import type { Project } from './types'

// TODO: completar descripciones, links e imágenes reales (en /public/projects).
export const projects: Project[] = [
  {
    slug: 'corta-la-bocha',
    name: 'Corta La Bocha',
    category: 'Plataforma web',
    description:
      'Diseño y desarrollo integral del sitio: identidad digital, contenido administrable y una experiencia rápida en cualquier dispositivo.',
    tags: ['React', 'TypeScript', 'SEO'],
  },
  {
    slug: 'landing-servicios',
    name: 'Landing de lanzamiento',
    category: 'Landing page',
    description:
      'Página de captación de clientes con formulario integrado y medición de conversiones.',
    tags: ['Landing', 'Analítica', 'Formularios'],
  },
  {
    slug: 'sistema-gestion',
    name: 'Sistema de gestión',
    category: 'Sistema a medida',
    description:
      'Panel interno para administrar clientes, turnos y reportes, con usuarios y permisos.',
    tags: ['Dashboard', 'API', 'Base de datos'],
  },
]

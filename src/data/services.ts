import { Cpu, LayoutTemplate, Rocket, Sparkles } from 'lucide-react'
import type { Service } from './types'

export const services: Service[] = [
  {
    icon: LayoutTemplate,
    title: 'Desarrollo web',
    description:
      'Sitios institucionales de alto rendimiento, fáciles de mantener y optimizados para posicionarse en buscadores.',
    features: ['Diseño responsive', 'SEO técnico', 'Contenido administrable'],
  },
  {
    icon: Rocket,
    title: 'Landing pages',
    description:
      'Páginas orientadas a la conversión, con un mensaje claro, llamadas a la acción efectivas y métricas para medir resultados.',
    features: ['Carga optimizada', 'Formularios integrados', 'Analítica y píxeles'],
  },
  {
    icon: Cpu,
    title: 'Sistemas a medida',
    description:
      'Software diseñado según los procesos de cada organización: gestión de turnos, stock, clientes y operaciones.',
    features: ['Paneles de administración', 'APIs e integraciones', 'Usuarios y permisos'],
  },
  {
    icon: Sparkles,
    title: 'Soluciones digitales',
    description:
      'Automatización de tareas, integración de herramientas y digitalización de procesos manuales.',
    features: ['Automatizaciones', 'Integración de pagos', 'Soporte y mantenimiento'],
  },
]

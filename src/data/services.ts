import { Cpu, LayoutTemplate, Rocket, Sparkles } from 'lucide-react'
import type { Service } from './types'

export const services: Service[] = [
  {
    icon: LayoutTemplate,
    title: 'Desarrollo web',
    description:
      'Sitios institucionales rápidos, prolijos y fáciles de mantener, pensados para que te encuentren en Google.',
    features: ['Diseño responsive', 'SEO técnico', 'Panel para editar contenido'],
  },
  {
    icon: Rocket,
    title: 'Landing pages',
    description:
      'Páginas enfocadas en convertir: un mensaje claro, una llamada a la acción y métricas para medir resultados.',
    features: ['Carga ultrarrápida', 'Formularios integrados', 'Analítica y píxeles'],
  },
  {
    icon: Cpu,
    title: 'Sistemas a medida',
    description:
      'Software hecho para tu forma de trabajar: gestión de turnos, stock, clientes o lo que tu operación necesite.',
    features: ['Paneles de administración', 'APIs e integraciones', 'Usuarios y permisos'],
  },
  {
    icon: Sparkles,
    title: 'Soluciones digitales',
    description:
      'Automatizamos tareas, conectamos herramientas y te acompañamos a digitalizar procesos que hoy hacés a mano.',
    features: ['Automatizaciones', 'Integración de pagos', 'Soporte y mantenimiento'],
  },
]

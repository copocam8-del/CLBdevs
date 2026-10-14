import { Code2, MessagesSquare, PenTool, Send } from 'lucide-react'
import type { Step } from './types'

export const steps: Step[] = [
  {
    icon: MessagesSquare,
    title: 'Charlamos',
    description:
      'Nos contás tu idea, tus objetivos y tus tiempos. Te devolvemos una propuesta clara, con alcance y presupuesto.',
  },
  {
    icon: PenTool,
    title: 'Diseñamos',
    description:
      'Armamos la estructura y el diseño visual. Lo revisamos juntos hasta que quede como lo imaginaste.',
  },
  {
    icon: Code2,
    title: 'Desarrollamos',
    description:
      'Construimos el producto con tecnologías modernas y te mostramos avances en cada etapa.',
  },
  {
    icon: Send,
    title: 'Lanzamos y acompañamos',
    description:
      'Publicamos, medimos y seguimos a tu lado con soporte, mejoras y mantenimiento.',
  },
]

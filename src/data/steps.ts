import { Code2, MessagesSquare, PenTool, Send } from 'lucide-react'
import type { Step } from './types'

export const steps: Step[] = [
  {
    icon: MessagesSquare,
    title: 'Relevamiento',
    description:
      'Analizamos los objetivos, el público y los plazos del proyecto, y presentamos una propuesta con alcance, cronograma y presupuesto definidos.',
  },
  {
    icon: PenTool,
    title: 'Diseño',
    description:
      'Definimos la arquitectura de la información y el diseño visual, y lo validamos con el cliente antes de avanzar con el desarrollo.',
  },
  {
    icon: Code2,
    title: 'Desarrollo',
    description:
      'Construimos la solución con tecnologías actuales y buenas prácticas, con entregas parciales para revisar el avance en cada etapa.',
  },
  {
    icon: Send,
    title: 'Lanzamiento y soporte',
    description:
      'Publicamos, medimos el rendimiento y brindamos soporte, mantenimiento y mejoras continuas.',
  },
]

import type { LucideIcon } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

export interface Step {
  icon: LucideIcon
  title: string
  description: string
}

export interface TeamMember {
  name: string
  /** Ruta a una imagen en /public. Si falta, se muestran las iniciales. */
  photo?: string
  links?: { label: string; href: string }[]
}

export interface Project {
  slug: string
  name: string
  category: string
  description: string
  tags: string[]
  url?: string
  /** Ruta a una imagen en /public. Si falta, se muestra un placeholder. */
  image?: string
}

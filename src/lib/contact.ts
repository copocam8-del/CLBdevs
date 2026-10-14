/** Validación del formulario de contacto, compartida entre el frontend y /api/contact. */

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 40 },
  service: { max: 100 },
  message: { min: 10, max: 5000 },
} as const

export interface ContactInput {
  name: string
  email: string
  phone: string
  service: string
  message: string
  /** Honeypot: tiene que llegar vacío. */
  website: string
}

export type ContactField = Exclude<keyof ContactInput, 'website'>
export type ContactErrors = Partial<Record<ContactField, string>>

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ContactErrors }

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

/** Saca saltos de línea de campos de una sola línea (evita inyección de headers). */
function singleLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ')
}

export function validateContact(raw: unknown): ValidationResult {
  const input = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>

  const data: ContactInput = {
    name: singleLine(str(input.name)),
    email: singleLine(str(input.email)).toLowerCase(),
    phone: singleLine(str(input.phone)),
    service: singleLine(str(input.service)),
    message: str(input.message),
    website: str(input.website),
  }

  const errors: ContactErrors = {}
  const L = CONTACT_LIMITS

  if (data.name.length < L.name.min) errors.name = 'Ingresá tu nombre.'
  else if (data.name.length > L.name.max) errors.name = `Máximo ${L.name.max} caracteres.`

  if (!data.email) errors.email = 'Ingresá tu email para poder responderte.'
  else if (data.email.length > L.email.max || !EMAIL_RE.test(data.email))
    errors.email = 'Ingresá un email válido.'

  if (data.phone && (data.phone.length > L.phone.max || !/^[\d\s()+\-.]+$/.test(data.phone)))
    errors.phone = 'Ingresá un teléfono válido (solo números, espacios y + - ( )).'

  if (data.service.length > L.service.max) errors.service = 'Opción inválida.'

  if (data.message.length < L.message.min)
    errors.message = `El mensaje debe tener al menos ${L.message.min} caracteres.`
  else if (data.message.length > L.message.max)
    errors.message = `Máximo ${L.message.max} caracteres.`

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data }
}

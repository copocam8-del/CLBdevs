import { describe, expect, it } from 'vitest'
import { validateContact } from './contact'

const valid = {
  name: 'Ana Pérez',
  email: 'Ana@Example.com ',
  phone: '+54 11 5555-5555',
  service: 'Landing pages',
  message: 'Quiero una landing para mi emprendimiento.',
  website: '',
}

describe('validateContact', () => {
  it('acepta datos válidos y los normaliza', () => {
    const result = validateContact(valid)
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.data.email).toBe('ana@example.com')
  })

  it('marca los campos obligatorios vacíos', () => {
    const result = validateContact({})
    expect(result.ok).toBe(false)
    if (!result.ok) expect(Object.keys(result.errors).sort()).toEqual(['email', 'message', 'name'])
  })

  it('rechaza emails inválidos', () => {
    for (const email of ['ana', 'ana@', 'ana@example', 'a b@example.com', 'ana@ex<ample.com']) {
      const result = validateContact({ ...valid, email })
      expect(result.ok, email).toBe(false)
    }
  })

  it('rechaza teléfonos con letras y mensajes muy cortos', () => {
    const result = validateContact({ ...valid, phone: 'llamame', message: 'hola' })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(Object.keys(result.errors).sort()).toEqual(['message', 'phone'])
  })

  it('aplana saltos de línea en campos de una línea', () => {
    const result = validateContact({ ...valid, name: 'Ana\r\nBcc: x@y.com' })
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.data.name).toBe('Ana Bcc: x@y.com')
  })

  it('ignora tipos no string', () => {
    expect(validateContact({ ...valid, name: 123 }).ok).toBe(false)
    expect(validateContact(null).ok).toBe(false)
  })
})

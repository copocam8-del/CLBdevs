// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { escapeHtml } from '../../api/_lib/brevo'
import { createRateLimiter, getClientIp } from '../../api/_lib/rate-limit'
import { handleContact } from '../../api/contact'

const env = {
  BREVO_API_KEY: 'test-key',
  CONTACT_TO_EMAIL: 'hola@clbdevelopers.com',
  CONTACT_FROM_EMAIL: 'no-reply@clbdevelopers.com',
}

const body = {
  name: 'Ana Pérez',
  email: 'ana@example.com',
  phone: '',
  service: 'Desarrollo web',
  message: 'Necesito un sitio <b>nuevo</b> para mi negocio.',
  website: '',
}

function request(data: unknown = body, headers: Record<string, string> = {}) {
  return new Request('https://clbdevelopers.com/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-real-ip': '1.2.3.4', ...headers },
    body: typeof data === 'string' ? data : JSON.stringify(data),
  })
}

describe('POST /api/contact', () => {
  let fetchImpl: ReturnType<typeof vi.fn<typeof fetch>>
  let rateLimit: ReturnType<typeof createRateLimiter>

  beforeEach(() => {
    fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 201 }))
    rateLimit = createRateLimiter({ limit: 5, windowMs: 60_000 })
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  const call = (req = request(), e: Record<string, string> = env) =>
    handleContact(req, { env: e, fetchImpl, rateLimit })

  it('envía el mail a Brevo con la API key y el contenido escapado', async () => {
    const res = await call()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })

    expect(fetchImpl).toHaveBeenCalledOnce()
    const [url, init] = fetchImpl.mock.calls[0]
    expect(url).toBe('https://api.brevo.com/v3/smtp/email')
    expect((init?.headers as Record<string, string>)['api-key']).toBe('test-key')

    const sent = JSON.parse(init?.body as string)
    expect(sent.to).toEqual([{ email: env.CONTACT_TO_EMAIL }])
    expect(sent.sender.email).toBe(env.CONTACT_FROM_EMAIL)
    expect(sent.replyTo.email).toBe('ana@example.com')
    expect(sent.htmlContent).toContain('&lt;b&gt;nuevo&lt;/b&gt;')
    expect(sent.htmlContent).not.toContain('<b>nuevo</b>')
  })

  it('devuelve 400 con errores por campo', async () => {
    const res = await call(request({ ...body, email: 'mal' }))
    expect(res.status).toBe(400)
    const json = (await res.json()) as { errors: Record<string, string> }
    expect(json.errors).toHaveProperty('email')
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('rechaza JSON inválido, otro content-type y otro origen', async () => {
    expect((await call(request('{no es json'))).status).toBe(400)
    expect((await call(request(body, { 'content-type': 'text/plain' }))).status).toBe(415)
    expect((await call(request(body, { origin: 'https://evil.example' }))).status).toBe(403)
    expect((await call(request(body, { origin: 'https://clbdevelopers.com' }))).status).toBe(200)
  })

  it('rechaza cuerpos demasiado grandes', async () => {
    const res = await call(request({ ...body, message: 'x'.repeat(25_000) }))
    expect(res.status).toBe(413)
  })

  it('finge éxito sin enviar si el honeypot viene completo', async () => {
    const res = await call(request({ ...body, website: 'http://spam.example' }))
    expect(res.status).toBe(200)
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('limita a 5 pedidos por IP', async () => {
    for (let i = 0; i < 5; i++) expect((await call()).status).toBe(200)
    const blocked = await call()
    expect(blocked.status).toBe(429)
    expect(Number(blocked.headers.get('retry-after'))).toBeGreaterThan(0)
    // Otra IP no se ve afectada
    expect((await call(request(body, { 'x-real-ip': '5.6.7.8' }))).status).toBe(200)
  })

  it('responde 500 si faltan variables de entorno', async () => {
    const res = await call(request(), {})
    expect(res.status).toBe(500)
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('responde 502 si Brevo falla, sin filtrar el detalle', async () => {
    fetchImpl.mockResolvedValue(new Response('unauthorized', { status: 401 }))
    const res = await call()
    expect(res.status).toBe(502)
    expect(JSON.stringify(await res.json())).not.toContain('unauthorized')
  })
})

describe('rate limiter', () => {
  it('libera la ventana después de windowMs', () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1000 })
    expect(check('ip', 0).allowed).toBe(true)
    expect(check('ip', 500).allowed).toBe(false)
    expect(check('ip', 1000).allowed).toBe(true)
  })

  it('toma la IP de x-real-ip o del primer x-forwarded-for', () => {
    expect(getClientIp(new Headers({ 'x-forwarded-for': '9.9.9.9, 10.0.0.1' }))).toBe('9.9.9.9')
    expect(getClientIp(new Headers({ 'x-real-ip': '1.1.1.1', 'x-forwarded-for': '9.9.9.9' }))).toBe('1.1.1.1')
    expect(getClientIp(new Headers())).toBe('unknown')
  })
})

describe('escapeHtml', () => {
  it('escapa caracteres especiales', () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe('&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;')
  })
})

import { validateContact } from '../src/lib/contact.js'
import { sendContactEmail, type MailConfig } from './_lib/brevo.js'
import { createRateLimiter, getClientIp } from './_lib/rate-limit.js'

const MAX_BODY_BYTES = 20_000
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 })

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { 'cache-control': 'no-store', ...headers } })
}

function mailConfigFromEnv(env: NodeJS.ProcessEnv): MailConfig | null {
  const apiKey = env.BREVO_API_KEY
  const to = env.CONTACT_TO_EMAIL
  const from = env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) return null
  return { apiKey, to, from }
}

export interface ContactDeps {
  env?: NodeJS.ProcessEnv
  fetchImpl?: typeof fetch
  rateLimit?: ReturnType<typeof createRateLimiter>
}

export async function handleContact(request: Request, deps: ContactDeps = {}): Promise<Response> {
  const { env = process.env, fetchImpl = fetch, rateLimit = limiter } = deps

  // Solo pedidos del mismo sitio (si el navegador manda Origin).
  const origin = request.headers.get('origin')
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ error: 'Origen no permitido.' }, 403)
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ error: 'El cuerpo tiene que ser JSON.' }, 415)
  }

  const { allowed, retryAfter } = rateLimit(getClientIp(request.headers))
  if (!allowed) {
    return json(
      { error: 'Recibimos demasiados mensajes desde tu conexión. Probá de nuevo en unos minutos.' },
      429,
      { 'retry-after': String(retryAfter) },
    )
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return json({ error: 'El mensaje es demasiado largo.' }, 413)

  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return json({ error: 'JSON inválido.' }, 400)
  }

  const result = validateContact(payload)
  // '=== false' y no '!result.ok': el chequeo de tipos de Vercel corre sin strict, y ahí '!' no estrecha el tipo.
  if (result.ok === false) return json({ error: 'Revisá los datos del formulario.', errors: result.errors }, 400)

  // Honeypot completado: respondemos OK sin enviar nada para no darle pistas al bot.
  if (result.data.website) return json({ ok: true })

  const config = mailConfigFromEnv(env)
  if (!config) {
    console.error('[contact] Faltan variables de entorno: BREVO_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL')
    return json({ error: 'El formulario no está disponible en este momento.' }, 500)
  }

  try {
    await sendContactEmail(result.data, config, fetchImpl)
  } catch (err) {
    console.error('[contact] Error enviando con Brevo:', err)
    return json({ error: 'No pudimos enviar tu mensaje. Probá de nuevo en un rato.' }, 502)
  }

  return json({ ok: true })
}

export function POST(request: Request) {
  return handleContact(request)
}

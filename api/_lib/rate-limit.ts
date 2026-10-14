/**
 * Límite de pedidos en memoria (ventana fija por clave).
 *
 * Simple a propósito: el estado vive en la instancia de la función, así que si
 * Vercel levanta varias instancias el límite es por instancia. Alcanza para
 * frenar abusos casuales; para algo estricto conviene un store compartido
 * (p. ej. Upstash Redis).
 */
export interface RateLimitResult {
  allowed: boolean
  remaining: number
  /** Segundos hasta que se libera la ventana. */
  retryAfter: number
}

export interface RateLimiterOptions {
  limit: number
  windowMs: number
  /** Máximo de claves guardadas antes de purgar las vencidas. */
  maxKeys?: number
}

export function createRateLimiter({ limit, windowMs, maxKeys = 10_000 }: RateLimiterOptions) {
  const hits = new Map<string, { count: number; resetAt: number }>()

  function purge(now: number) {
    for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key)
  }

  return function check(key: string, now = Date.now()): RateLimitResult {
    if (hits.size >= maxKeys) purge(now)

    let entry = hits.get(key)
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs }
      hits.set(key, entry)
    }
    entry.count++

    return {
      allowed: entry.count <= limit,
      remaining: Math.max(0, limit - entry.count),
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    }
  }
}

/** IP del cliente según los headers que agrega Vercel. */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return headers.get('x-real-ip')?.trim() || forwarded || 'unknown'
}

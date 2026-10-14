import type { ContactInput } from '../../src/lib/contact.js'

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email'

export interface MailConfig {
  apiKey: string
  to: string
  from: string
  fromName?: string
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildEmail(data: ContactInput, config: MailConfig) {
  const rows: [string, string][] = [
    ['Nombre', data.name],
    ['Email', data.email],
    ['Teléfono', data.phone || '—'],
    ['Servicio', data.service || '—'],
  ]

  const htmlContent = `
    <h2>Nueva consulta desde el sitio</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v)}</td></tr>`).join('')}
    </table>
    <h3>Mensaje</h3>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `.trim()

  const textContent = [...rows.map(([k, v]) => `${k}: ${v}`), '', 'Mensaje:', data.message].join('\n')

  return {
    sender: { email: config.from, name: config.fromName ?? 'Web CLB Developers' },
    to: [{ email: config.to }],
    replyTo: { email: data.email, name: data.name },
    subject: `Nueva consulta de ${data.name}${data.service ? ` · ${data.service}` : ''}`,
    htmlContent,
    textContent,
  }
}

export async function sendContactEmail(
  data: ContactInput,
  config: MailConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<void> {
  const res = await fetchImpl(BREVO_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': config.apiKey,
    },
    body: JSON.stringify(buildEmail(data, config)),
    signal: AbortSignal.timeout(10_000),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Brevo respondió ${res.status}: ${detail.slice(0, 300)}`)
  }
}

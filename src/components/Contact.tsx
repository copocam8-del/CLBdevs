import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin } from 'lucide-react'
import { useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { services } from '../data/services'
import { site } from '../data/site'
import { InstagramIcon, WhatsAppIcon } from './BrandIcons'
import { CONTACT_LIMITS, validateContact, type ContactErrors, type ContactField } from '../lib/contact'
import { SectionHeading } from './SectionHeading'

type Status =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success' }
  | { type: 'error'; message: string }

const FIELD_ORDER: ContactField[] = ['name', 'email', 'phone', 'service', 'message']
const GENERIC_ERROR = `No pudimos enviar el mensaje. Intentá nuevamente más tarde o escribinos a ${site.email}.`

const inputClass =
  'mt-2 block w-full rounded-lg border bg-white px-3 py-2.5 text-ink shadow-sm placeholder:text-slate-500 focus:border-brand-600 focus:outline-none focus-visible:outline-3 focus-visible:outline-brand-500'

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>({ type: 'idle' })

  const focusFirstError = (errs: ContactErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f])
    if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus()
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.type === 'submitting') return

    const form = e.currentTarget
    const payload = Object.fromEntries(new FormData(form))
    const result = validateContact(payload)
    if (!result.ok) {
      setErrors(result.errors)
      setStatus({ type: 'idle' })
      focusFirstError(result.errors)
      return
    }

    setErrors({})
    setStatus({ type: 'submitting' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      const body = (await res.json().catch(() => ({}))) as { error?: string; errors?: ContactErrors }

      if (res.ok) {
        form.reset()
        setStatus({ type: 'success' })
        return
      }
      if (res.status === 400 && body.errors) {
        setErrors(body.errors)
        setStatus({ type: 'idle' })
        focusFirstError(body.errors)
        return
      }
      setStatus({ type: 'error', message: body.error ?? GENERIC_ERROR })
    } catch {
      setStatus({ type: 'error', message: GENERIC_ERROR })
    }
  }

  const fieldProps = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    className: `${inputClass} ${errors[name] ? 'border-red-600' : 'border-slate-300'}`,
  })

  const fieldError = (name: ContactField) =>
    errors[name] && (
      <p id={`contact-${name}-error`} className="mt-1.5 flex items-center gap-1 text-sm text-red-700">
        <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
        {errors[name]}
      </p>
    )

  const submitting = status.type === 'submitting'

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeading
            id="contacto-title"
            eyebrow="Contacto"
            title="Hablemos de tu proyecto"
            description="Completá el formulario y te responderemos dentro de las 48 horas hábiles. La consulta no implica compromiso."
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <aside data-reveal className="space-y-6 lg:pt-2">
            {site.whatsapp && (
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a9e4b] px-6 py-3 font-semibold text-white shadow-md shadow-[#1a9e4b]/25 transition hover:bg-[#168a41] hover:shadow-lg motion-safe:hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="size-5" />
                Escribinos por WhatsApp
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            )}
            <div className="flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <Mail aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-ink">Email</h3>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-slate-700 underline-offset-4 hover:text-brand-700 hover:underline"
                >
                  {site.email}
                </a>
              </div>
            </div>
            {site.instagram && (
              <div className="flex gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <InstagramIcon className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-ink">Instagram</h3>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 underline-offset-4 hover:text-brand-700 hover:underline"
                  >
                    @{site.instagram.split('/').pop()}
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                  </a>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <MapPin aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold text-ink">Ubicación</h3>
                <p className="text-slate-700">{site.location} · Atención remota en todo el país y el exterior</p>
              </div>
            </div>
          </aside>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            data-reveal
            style={{ '--reveal-delay': '100ms' } as CSSProperties}
            aria-describedby="contact-required-note"
            className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2"
          >
            <p id="contact-required-note" className="mb-6 text-sm text-slate-600">
              Los campos marcados con <span aria-hidden="true">*</span>
              <span className="sr-only">asterisco</span> son obligatorios.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-ink">
                  Nombre <span aria-hidden="true">*</span>
                </label>
                <input
                  {...fieldProps('name')}
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={CONTACT_LIMITS.name.max}
                />
                {fieldError('name')}
              </div>

              <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-ink">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  {...fieldProps('email')}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  maxLength={CONTACT_LIMITS.email.max}
                />
                {fieldError('email')}
              </div>

              <div>
                <label htmlFor="contact-phone" className="text-sm font-medium text-ink">
                  Teléfono <span className="font-normal text-slate-600">(opcional)</span>
                </label>
                <input
                  {...fieldProps('phone')}
                  type="tel"
                  autoComplete="tel"
                  maxLength={CONTACT_LIMITS.phone.max}
                />
                {fieldError('phone')}
              </div>

              <div>
                <label htmlFor="contact-service" className="text-sm font-medium text-ink">
                  ¿Qué necesitás? <span className="font-normal text-slate-600">(opcional)</span>
                </label>
                <select {...fieldProps('service')} defaultValue="">
                  <option value="">Elegí una opción</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Otro">Otro / A definir</option>
                </select>
                {fieldError('service')}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-ink">
                  Mensaje <span aria-hidden="true">*</span>
                </label>
                <textarea
                  {...fieldProps('message')}
                  rows={5}
                  required
                  maxLength={CONTACT_LIMITS.message.max}
                  placeholder="Describí brevemente el proyecto, los plazos estimados y cualquier dato relevante."
                />
                {fieldError('message')}
              </div>

              {/* Honeypot anti-spam: invisible para personas, los bots suelen completarlo */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="contact-website">No completar este campo</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 enabled:motion-safe:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting && <Loader2 aria-hidden="true" className="size-5 animate-spin" />}
                {submitting ? 'Enviando…' : 'Enviar mensaje'}
              </button>

              <div role="status" aria-live="polite" className="text-sm">
                {status.type === 'success' && (
                  <p className="flex items-center gap-2 font-medium text-green-800">
                    <CheckCircle2 aria-hidden="true" className="size-5 shrink-0" />
                    Gracias. Recibimos tu mensaje y te responderemos a la brevedad.
                  </p>
                )}
                {status.type === 'error' && (
                  <p className="flex items-center gap-2 font-medium text-red-700">
                    <AlertCircle aria-hidden="true" className="size-5 shrink-0" />
                    {status.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

import { Check } from 'lucide-react'
import { services } from '../data/services'
import { revealDelay } from '../hooks/useReveal'
import { SectionHeading } from './SectionHeading'

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeading
            id="servicios-title"
            eyebrow="Servicios"
            title="Soluciones integrales para cada etapa digital"
            description="Desde una landing page para validar una propuesta hasta un sistema completo para gestionar la operación."
          />
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description, features }, i) => (
            <li key={title} data-reveal style={revealDelay(i)}>
              <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:border-brand-100 hover:bg-white hover:shadow-xl hover:shadow-brand-600/10 motion-safe:hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30 transition-transform duration-300 motion-safe:group-hover:scale-110">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check aria-hidden="true" className="size-4 shrink-0 translate-y-0.5 text-brand-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

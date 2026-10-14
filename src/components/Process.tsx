import { steps } from '../data/steps'
import { SectionHeading } from './SectionHeading'

export function Process() {
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="proceso-title"
          eyebrow="Cómo trabajamos"
          title="Un proceso simple, en 4 pasos"
          description="Sabés en todo momento en qué etapa está tu proyecto y qué viene después."
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, i) => (
            <li key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <span aria-hidden="true" className="text-4xl font-extrabold text-slate-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">
                <span className="sr-only">Paso {i + 1}: </span>
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { steps } from '../data/steps'
import { revealDelay } from '../hooks/useReveal'
import { SectionHeading } from './SectionHeading'

export function Process() {
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeading
            id="proceso-title"
            title="Cómo trabajamos"
            description="Cada etapa tiene objetivos y entregables definidos, para que el cliente conozca en todo momento el estado del proyecto y los próximos pasos."
          />
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, i) => (
            <li key={title} data-reveal style={revealDelay(i)}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-600/10 motion-safe:hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-4xl font-extrabold text-slate-200 transition-colors duration-300 group-hover:text-brand-100"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

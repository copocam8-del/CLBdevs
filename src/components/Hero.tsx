import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { site } from '../data/site'

const highlights = [
  'Propuesta clara y sin vueltas',
  'Sitios rápidos y optimizados para SEO',
  'Soporte después del lanzamiento',
]

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.35),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="inline-flex rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-100">
          {site.tagline}
        </p>
        <h1
          id="hero-title"
          className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-balance text-white sm:text-6xl"
        >
          Llevamos tu idea a la web, <span className="text-brand-300">de punta a punta.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-pretty text-slate-300">
          En {site.name} diseñamos y desarrollamos sitios web, landing pages y sistemas a medida para que tu negocio
          venda más y trabaje mejor.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Pedí tu presupuesto
            <ArrowRight aria-hidden="true" className="size-5" />
          </a>
          <a
            href="#proyectos"
            className="inline-flex items-center justify-center rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ver proyectos
          </a>
        </div>

        <ul className="mt-12 grid gap-3 text-slate-200 sm:grid-cols-3">
          {highlights.map((text) => (
            <li key={text} className="flex items-center gap-2 text-sm">
              <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-brand-300" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

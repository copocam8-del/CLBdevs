import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { CSSProperties } from 'react'
import { site } from '../data/site'

const highlights = [
  'Propuestas con alcance y costos definidos',
  'Sitios de alto rendimiento, optimizados para SEO',
  'Soporte y mantenimiento posteriores al lanzamiento',
]

const piece = (i: number) => ({ '--i': i }) as CSSProperties

/** Maqueta decorativa de un navegador que se "arma" al cargar la página. */
function BrowserMockup() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md select-none">
      <div className="mock-float">
        <div className="overflow-hidden rounded-xl border border-white/15 bg-slate-900/80 shadow-2xl shadow-brand-700/30 backdrop-blur">
          <div className="mock-piece flex items-center gap-2 border-b border-white/10 px-4 py-3" style={piece(0)}>
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="ml-3 h-5 flex-1 rounded-md bg-white/10" />
          </div>

          <div className="space-y-5 p-5">
            <div className="mock-piece flex items-center justify-between" style={piece(1)}>
              <span className="h-3 w-16 rounded bg-brand-400/70" />
              <span className="flex gap-2">
                <span className="h-2 w-8 rounded bg-white/15" />
                <span className="h-2 w-8 rounded bg-white/15" />
                <span className="h-2 w-8 rounded bg-white/15" />
              </span>
            </div>

            <div className="mock-piece space-y-2.5 rounded-lg bg-gradient-to-br from-brand-600/40 to-brand-500/5 p-5" style={piece(2)}>
              <span className="block h-3.5 w-3/4 rounded bg-white/80" />
              <span className="block h-3.5 w-1/2 rounded bg-white/60" />
              <span className="block h-2 w-5/6 rounded bg-white/20" />
              <span className="mt-4 block h-7 w-28 rounded-md bg-brand-500" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[3, 4, 5].map((i) => (
                <div key={i} className="mock-piece space-y-2 rounded-lg border border-white/10 bg-white/5 p-3" style={piece(i)}>
                  <span className="block size-6 rounded-md bg-brand-400/50" />
                  <span className="block h-2 w-full rounded bg-white/20" />
                  <span className="block h-2 w-2/3 rounded bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tarjeta "celular" superpuesta */}
        <div
          className="mock-piece absolute -bottom-8 -left-8 w-28 rounded-2xl border border-white/15 bg-slate-900/90 p-2 shadow-xl shadow-black/40"
          style={piece(6)}
        >
          <div className="space-y-1.5 rounded-xl bg-white/5 p-2">
            <span className="block h-1.5 w-8 rounded bg-brand-400/70" />
            <span className="block h-10 rounded-md bg-gradient-to-br from-brand-600/60 to-brand-500/10" />
            <span className="block h-1.5 w-full rounded bg-white/20" />
            <span className="block h-1.5 w-2/3 rounded bg-white/10" />
            <span className="block h-4 w-12 rounded bg-brand-500" />
          </div>
        </div>

        <div className="mock-piece absolute right-10 bottom-16" style={piece(7)}>
          <svg viewBox="0 0 24 24" className="mock-cursor size-6 drop-shadow-lg">
            <path d="M5 3l14 7-6 2-2 6z" fill="white" stroke="#0b1020" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink">
      {/* Fondo animado: manchas de color difuminadas + grilla sutil */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-blob absolute -top-40 -right-32 size-[34rem] rounded-full bg-brand-600/35 blur-3xl" />
        <div className="hero-blob absolute top-1/3 -left-40 size-[28rem] rounded-full bg-brand-500/20 blur-3xl" />
        <div className="hero-blob absolute -bottom-40 right-1/3 size-[26rem] rounded-full bg-brand-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-flex rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-100">
            {site.tagline}
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-4xl font-extrabold tracking-tight text-balance text-white sm:text-6xl"
          >
            Soluciones digitales, <span className="text-brand-300">de punta a punta.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-slate-300">
            En {site.name} diseñamos y desarrollamos sitios web, landing pages y sistemas a medida que impulsan el
            crecimiento y la eficiencia de cada negocio.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500 hover:shadow-brand-500/40 motion-safe:hover:-translate-y-0.5"
            >
              Solicitar presupuesto
              <ArrowRight
                aria-hidden="true"
                className="size-5 transition-transform motion-safe:group-hover:translate-x-1"
              />
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/10 motion-safe:hover:-translate-y-0.5"
            >
              Ver proyectos
            </a>
          </div>

          <ul className="mt-12 grid gap-3 text-slate-200">
            {highlights.map((text) => (
              <li key={text} className="flex items-center gap-2 text-sm">
                <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-brand-300" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block">
          <BrowserMockup />
        </div>
      </div>
    </section>
  )
}

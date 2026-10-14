import { site } from '../data/site'

export function Logo({ light }: { light?: boolean }) {
  return (
    <a
      href="/#inicio"
      className={`inline-flex items-center gap-2 text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink'}`}
    >
      <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-brand-600 text-xs text-white">
        CLB
      </span>
      <span>
        {site.name}
        <span className="sr-only"> — ir al inicio</span>
      </span>
    </a>
  )
}

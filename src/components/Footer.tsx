import { site } from '../data/site'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-ink text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm">{site.tagline}.</p>
        </div>
        <nav aria-label="Secciones">
          <h2 className="text-sm font-semibold text-white">Secciones</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-white">Contacto</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
          {site.social.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-4 text-sm">
              {site.social.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {social.label}
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <p className="border-t border-white/10 py-6 text-center text-xs text-slate-400">
        © {year} {site.name}. Todos los derechos reservados.
      </p>
    </footer>
  )
}

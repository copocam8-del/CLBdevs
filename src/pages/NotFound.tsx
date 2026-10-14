import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" path="/404" noindex />
      <section aria-labelledby="notfound-title" className="mx-auto max-w-2xl px-4 py-32 text-center sm:px-6">
        <p className="text-sm font-semibold text-brand-600">Error 404</p>
        <h1 id="notfound-title" className="mt-2 text-4xl font-bold tracking-tight text-ink">
          No encontramos esta página
        </h1>
        <p className="mt-4 text-lg text-slate-600">Puede que el link esté roto o que la página se haya movido.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
        >
          Volver al inicio
        </Link>
      </section>
    </>
  )
}

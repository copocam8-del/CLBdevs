import { Head } from 'vite-react-ssg'
import { site } from '../data/site'

interface SeoProps {
  title?: string
  description?: string
  path?: string
  noindex?: boolean
}

export function Seo({ title, description = site.description, path = '/', noindex }: SeoProps) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`
  const url = new URL(path, site.url).toString()
  const image = new URL('/og-image.png', site.url).toString()

  return (
    <Head>
      <html lang="es-AR" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={site.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}

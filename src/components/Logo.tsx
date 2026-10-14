// Versiones optimizadas de /public/logo/clb-logo-{blanco,negro}.png (36px de alto @1x, 2x y 3x).
const sources = (color: 'blanco' | 'negro') => ({
  src: `/logo/clb-logo-${color}-36.png`,
  srcSet: `/logo/clb-logo-${color}-72.png 2x, /logo/clb-logo-${color}-108.png 3x`,
})

/** `light`: versión blanca, para fondos oscuros (navbar, footer). */
export function Logo({ light }: { light?: boolean }) {
  return (
    <a href="/#inicio" className="inline-flex items-center rounded-md">
      <img {...sources(light ? 'blanco' : 'negro')} alt="CLB Developers" width={72} height={36} className="h-9 w-auto" />
      <span className="sr-only"> — ir al inicio</span>
    </a>
  )
}

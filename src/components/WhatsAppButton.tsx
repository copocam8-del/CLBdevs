import { site } from '../data/site'
import { WhatsAppIcon } from './BrandIcons'

/** Botón flotante de WhatsApp (abajo a la derecha). No se muestra si no hay número configurado. */
export function WhatsAppButton() {
  if (!site.whatsapp) return null
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#1a9e4b] hover:bg-[#168a41] text-white shadow-lg shadow-black/25 transition hover:scale-105 focus-visible:outline-offset-4 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
      <span className="sr-only">Escribinos por WhatsApp (se abre en una pestaña nueva)</span>
    </a>
  )
}

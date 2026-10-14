import { useEffect, type CSSProperties } from 'react'

declare global {
  interface Window {
    __revealReady?: boolean
  }
}

/** Agrega `is-visible` a los elementos `[data-reveal]` cuando entran en pantalla (ver index.css). */
export function useReveal() {
  useEffect(() => {
    window.__revealReady = true
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/** Retraso escalonado para elementos `[data-reveal]` dentro de una lista. */
export function revealDelay(index: number, stepMs = 100) {
  return { '--reveal-delay': `${index * stepMs}ms` } as CSSProperties
}

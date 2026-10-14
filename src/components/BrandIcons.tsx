import type { SVGProps } from 'react'

// lucide-react ya no incluye íconos de marcas: estos siguen su mismo estilo (24×24, trazo 2).
const base: SVGProps<SVGSVGElement> = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path
        d="M8.5 9.5c0-.5.4-1 .9-1h.6l1 2.2-.8.9a6 6 0 0 0 2.7 2.7l.9-.8 2.2 1v.6c0 .5-.5.9-1 .9A7 7 0 0 1 8.5 9.5Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  )
}

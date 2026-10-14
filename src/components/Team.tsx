import { team } from '../data/team'
import { SectionHeading } from './SectionHeading'

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export function Team() {
  return (
    <section id="equipo" aria-labelledby="equipo-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="equipo-title"
          eyebrow="Equipo"
          title="Las personas detrás de cada proyecto"
          description="Un equipo chico, con trato directo: hablás con quienes diseñan y programan tu proyecto."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <li key={`${member.name}-${i}`} className="rounded-2xl border border-slate-200 p-6 text-center">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={`Foto de ${member.name}`}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="mx-auto size-24 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="mx-auto grid size-24 place-items-center rounded-full bg-brand-100 text-2xl font-bold text-brand-700"
                >
                  {initials(member.name)}
                </span>
              )}
              <h3 className="mt-5 text-lg font-semibold text-ink">{member.name}</h3>
              <p className="text-sm font-medium text-brand-700">{member.role}</p>
              <p className="mt-3 text-sm text-slate-600">{member.bio}</p>
              {member.links && member.links.length > 0 && (
                <ul className="mt-4 flex justify-center gap-4 text-sm">
                  {member.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-brand-700 underline-offset-4 hover:underline"
                      >
                        {link.label}
                        <span className="sr-only"> de {member.name} (se abre en una pestaña nueva)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

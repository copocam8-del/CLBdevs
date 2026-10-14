import { team } from '../data/team'
import { revealDelay } from '../hooks/useReveal'
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
        <div data-reveal>
          <SectionHeading
            id="equipo-title"
            eyebrow="Equipo"
            title="Las personas detrás de cada proyecto"
            description="Somos un equipo de perfil técnico que se ocupa de cada proyecto de punta a punta: del relevamiento y el diseño al desarrollo, la puesta en producción y el soporte. Cada cliente trabaja directamente con quienes diseñan y construyen su solución."
          />
        </div>

        <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
          {team.map((member, i) => (
            <li
              key={member.name}
              data-reveal
              style={revealDelay(i)}
            >
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 text-center transition duration-300 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-600/10 motion-safe:hover:-translate-y-1">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={`Foto de ${member.name}`}
                    width={128}
                    height={128}
                    loading="lazy"
                    className="mx-auto size-32 rounded-full object-cover ring-4 ring-brand-50"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="mx-auto grid size-32 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-3xl font-bold tracking-wide text-white ring-4 ring-brand-50"
                  >
                    {initials(member.name)}
                  </span>
                )}
                <h3 className="mt-6 text-lg font-semibold text-ink">{member.name}</h3>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

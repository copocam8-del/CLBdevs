import { ExternalLink, FolderCode } from 'lucide-react'
import { projects } from '../data/projects'
import { revealDelay } from '../hooks/useReveal'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeading
            id="proyectos-title"
            eyebrow="Proyectos"
            title="Proyectos destacados"
            description="Una selección de trabajos que reflejan nuestro enfoque: soluciones a medida, sólidas y orientadas a resultados."
            dark
          />
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li key={project.slug} data-reveal style={revealDelay(i)}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:border-brand-400/40 hover:shadow-2xl hover:shadow-brand-600/20 motion-safe:hover:-translate-y-1">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`Captura de ${project.name}`}
                    width={640}
                    height={360}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="grid aspect-video place-items-center bg-gradient-to-br from-brand-600 to-brand-700/40"
                  >
                    <FolderCode className="size-12 text-white/80 transition-transform duration-500 motion-safe:group-hover:scale-110" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-wide text-brand-300 uppercase">{project.category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-300">{project.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologías">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-300 hover:text-white"
                    >
                      Ver proyecto
                      <span className="sr-only"> {project.name} (se abre en una pestaña nueva)</span>
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

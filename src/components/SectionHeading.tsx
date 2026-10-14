interface SectionHeadingProps {
  id: string
  eyebrow?: string
  title: string
  description?: string
  dark?: boolean
}

export function SectionHeading({ id, eyebrow, title, description, dark }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className={`mb-2 text-sm font-semibold tracking-wide uppercase ${dark ? 'text-brand-300' : 'text-brand-600'}`}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-3xl font-bold tracking-tight text-balance sm:text-4xl ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg text-pretty ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
      )}
    </div>
  )
}

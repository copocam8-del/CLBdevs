import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'
import { Process } from '../components/Process'
import { Projects } from '../components/Projects'
import { Seo } from '../components/Seo'
import { Services } from '../components/Services'
import { Team } from '../components/Team'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  logo: `${site.url}/favicon.svg`,
  ...(site.social.length > 0 && { sameAs: site.social.map((s) => s.href) }),
}

export default function Home() {
  useReveal()

  return (
    <>
      <Seo />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <Hero />
      <Services />
      <Process />
      <Team />
      <Projects />
      <Contact />
    </>
  )
}

import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { TechMarquee } from '@/components/tech-marquee'
import { Projects } from '@/components/projects'
import { About } from '@/components/about'
import { Experience } from '@/components/experience'
import { Certifications } from '@/components/certifications'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TechMarquee />
        <Projects />
        <About />
        <Experience />
        <Certifications />
      </main>
      <SiteFooter />
    </>
  )
}

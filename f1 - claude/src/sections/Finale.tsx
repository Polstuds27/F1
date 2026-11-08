import { Parallax } from '../components/Parallax'
import { Photo } from '../components/Photo'
import { Fade, Lines } from '../components/Reveal'
import { TextLink } from '../components/TextLink'
import { Wordmark } from '../components/Wordmark'
import { NAV_LINKS } from '../lib/content'

export function Finale() {
  return (
    <section id="experience" aria-labelledby="finale-title" className="relative bg-obsidian">
      <div className="relative flex min-h-svh flex-col justify-end overflow-hidden">
        <Parallax travel={10} className="absolute inset-x-0 top-0 h-[72%]">
          <Photo photo="soloDark" alt="" className="object-[50%_40%]" />
        </Parallax>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />

        <div className="gutter relative pt-[52svh] pb-16 md:pb-24">
          <Lines
            id="finale-title"
            className="display text-center text-[12.2vw] leading-[0.95] uppercase"
            lines={['Beyond', 'the limit.']}
          />
          <Fade delay={0.3} className="mx-auto mt-10 flex max-w-md flex-col items-center text-center">
            <p className="prose-editorial text-titanium">
              Eleven will be built. Each by invitation, each to a single owner, none twice.
            </p>
            <TextLink href="mailto:atelier@vespera.example" className="mt-6">Request a Private Viewing</TextLink>
          </Fade>
        </div>
      </div>

      <footer className="gutter border-t border-ivory/10 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Wordmark />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="label text-titanium transition-colors duration-500 hover:text-ivory">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 text-xs leading-relaxed text-titanium/70">
          © 2026 Vespera, a conceptual marque. Photography courtesy of the{' '}
          <a href="https://unsplash.com" className="underline decoration-titanium/40 underline-offset-2 hover:text-ivory" rel="noreferrer">Unsplash</a>{' '}
          community; no affiliation with any team or series is implied.
        </p>
      </footer>
    </section>
  )
}

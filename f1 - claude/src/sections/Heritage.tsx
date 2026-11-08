import { Parallax } from '../components/Parallax'
import { Photo } from '../components/Photo'
import { Fade, Lines, Unveil } from '../components/Reveal'

const PRINCIPLES = [
  { year: '1958', title: 'Legacy', body: 'A workshop of six in a former foundry, and a car built before anyone had agreed to race it.' },
  { year: '1976', title: 'Innovation', body: 'The first Vespera in composite. Rivals called it fragile, until it finished every race that season.' },
  { year: '1994', title: 'Ambition', body: 'We left the grid to build what the rules no longer allowed. We have not regretted it.' },
  { year: '2026', title: 'Pursuit', body: 'V-01 is not the end of that argument. It is simply our most convincing point so far.' },
]

export function Heritage() {
  return (
    <section id="heritage" aria-labelledby="heritage-title" className="relative bg-ivory text-obsidian">
      <div className="gutter pt-32 md:pt-48">
        <Fade><p className="label text-graphite/70">Heritage &amp; Philosophy</p></Fade>
        <Lines
          id="heritage-title"
          className="display mt-10 text-[14.5vw] uppercase md:text-[12.6vw]"
          lines={['We have', <span className="block md:text-right">never been</span>, <span className="block normal-case italic">satisfied.</span>]}
        />
      </div>

      <div className="mt-20 grid md:mt-32 md:grid-cols-12">
        <Unveil className="md:col-span-8">
          <Parallax travel={14} className="relative aspect-[3/2]">
            <Photo
              photo="vintageTrack"
              alt="Black and white photograph of a vintage open-wheel racing car passing a grandstand."
              sizes="(min-width: 768px) 66vw, 100vw"
              className="grayscale"
            />
          </Parallax>
        </Unveil>
        <div className="gutter mt-12 md:col-span-4 md:mt-0 md:flex md:flex-col md:justify-end">
          <Fade>
            <blockquote className="display text-[clamp(1.75rem,2.7vw,2.75rem)] leading-[1.14] italic">
              “Second place is simply the first to learn what was left undone.”
            </blockquote>
            <p className="label mt-6 text-graphite/70">Elena Vespera, 1961</p>
          </Fade>
        </div>
      </div>

      <div className="gutter grid pt-24 pb-32 md:grid-cols-12 md:gap-x-6 md:pt-44 md:pb-52">
        <div className="md:col-span-5 md:col-start-2">
          <Unveil>
            <Parallax travel={12} className="relative aspect-[4/5]">
              <Photo
                photo="vintageWheel"
                alt="Black and white detail of a classic steering wheel and instrument dials."
                sizes="(min-width: 768px) 38vw, 100vw"
                className="grayscale"
              />
            </Parallax>
          </Unveil>
        </div>
        <ol className="mt-16 md:col-span-5 md:col-start-8 md:mt-0">
          {PRINCIPLES.map((principle, index) => (
            <li key={principle.year} className="border-t border-obsidian/15 py-7 last:border-b">
              <Fade delay={index * 0.06} className="grid grid-cols-[5rem_1fr] gap-x-4">
                <p className="display text-lg tabular-nums">{principle.year}</p>
                <div>
                  <h3 className="label">{principle.title}</h3>
                  <p className="prose-editorial mt-3 text-graphite/80">{principle.body}</p>
                </div>
              </Fade>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

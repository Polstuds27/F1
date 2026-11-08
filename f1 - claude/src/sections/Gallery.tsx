import { useState } from 'react'
import { Photo } from '../components/Photo'
import { Fade, Lines, Unveil } from '../components/Reveal'
import type { PhotoKey } from '../lib/photos'

const PLATES: { photo: PhotoKey; title: string; place: string; alt: string; position?: string }[] = [
  { photo: 'panning', title: 'Commitment', place: 'Turn nine, late afternoon', alt: 'A racing car panned at speed, the circuit dissolved into streaks of green and red.' },
  { photo: 'circuit', title: 'Stillness', place: 'Pit straight, first light', alt: 'A dark Formula 1 car on track beside red and blue painted kerbs.', position: 'object-[50%_70%]' },
  { photo: 'soloDark', title: 'Silence', place: 'The studio', alt: 'A Formula 1 car alone in a pool of light on a black stage.', position: 'object-[50%_45%]' },
]

const DETAILS: { photo: PhotoKey; alt: string; frame: string; aspect: string; caption: string; crop?: string }[] = [
  { photo: 'tyre', alt: 'Close view of a tyre sidewall in deep shadow.', frame: 'md:col-span-3', aspect: 'aspect-[3/4]', caption: 'Contact' },
  { photo: 'frontWide', alt: 'A front tyre and suspension in near darkness, one edge caught by light.', crop: 'object-[12%_70%] saturate-0', frame: 'md:col-span-4 md:col-start-5 md:mt-[12vw]', aspect: 'aspect-[2/3]', caption: 'Stance' },
  { photo: 'vintageCar', alt: 'Black and white photograph of a classic open-wheel racing car on track.', crop: 'grayscale', frame: 'md:col-span-3 md:col-start-10', aspect: 'aspect-[4/5]', caption: 'Archive' },
]

export function Gallery() {
  const [current, setCurrent] = useState(0)

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-obsidian">
      <div className="gutter flex flex-col justify-between gap-8 pt-32 pb-14 md:flex-row md:items-end md:pt-48 md:pb-20">
        <Lines id="gallery-title" className="display text-[clamp(3.5rem,10vw,11rem)] italic" lines={['Gallery']} />
        <Fade className="max-w-[20rem]">
          <p className="prose-editorial text-titanium">Photographed without ceremony, in the only places it has ever looked at home.</p>
        </Fade>
      </div>

      <div className="relative h-[62svh] overflow-hidden md:h-[88svh]">
        {PLATES.map((plate, index) => (
          <div
            key={plate.photo}
            className={`absolute inset-0 transition-[opacity,scale] duration-[1500ms] ease-cinema ${
              index === current ? 'scale-100 opacity-100' : 'scale-[1.05] opacity-0'
            }`}
          >
            <Photo photo={plate.photo} alt={index === current ? plate.alt : ''} className={`saturate-[0.55] ${plate.position ?? ''}`} />
          </div>
        ))}
      </div>

      {/* The plate list drives the stage above: hover previews, click or focus keeps. */}
      <ul className="gutter grid grid-cols-3">
        {PLATES.map((plate, index) => (
          <li key={plate.photo} className="min-w-0">
            <button
              type="button"
              aria-pressed={index === current}
              onClick={() => setCurrent(index)}
              onMouseEnter={() => setCurrent(index)}
              onFocus={() => setCurrent(index)}
              className={`relative block w-full py-6 pr-4 text-left transition-colors duration-500 ${
                index === current ? 'text-ivory' : 'text-titanium hover:text-ivory'
              }`}
            >
              <span aria-hidden className={`absolute inset-x-0 top-0 h-px transition-colors duration-700 ${index === current ? 'bg-racing' : 'bg-ivory/15'}`} />
              <span className="display block text-lg leading-tight sm:text-2xl md:text-3xl">{plate.title}</span>
              <span className="label mt-2 hidden text-[0.625rem] text-titanium sm:block">{plate.place}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="gutter grid gap-14 pt-24 pb-32 md:grid-cols-12 md:gap-x-6 md:gap-y-0 md:pt-40 md:pb-52">
        {DETAILS.map((detail) => (
          <figure key={detail.photo} className={detail.frame}>
            <Unveil>
              <div className={`group overflow-hidden ${detail.aspect}`}>
                <div className="h-full w-full transition-[scale] duration-[1600ms] ease-cinema group-hover:scale-[1.04]">
                  <Photo photo={detail.photo} alt={detail.alt} sizes="(min-width: 768px) 33vw, 100vw" className={detail.crop ?? 'saturate-[0.2]'} />
                </div>
              </div>
            </Unveil>
            <figcaption className="label mt-4 text-titanium">{detail.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

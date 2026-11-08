import { useState } from 'react'
import { motion } from 'framer-motion'
import { Parallax } from '../components/Parallax'
import { Photo } from '../components/Photo'
import { Fade, Lines } from '../components/Reveal'
import type { PhotoKey } from '../lib/photos'

const CHAPTERS: { photo: PhotoKey; alt: string; title: string; body: string }[] = [
  {
    photo: 'carbonWeave',
    alt: 'Macro view of woven carbon fibre curving away into shadow.',
    title: 'Laid by hand',
    body: 'The monocoque begins as 2,400 individual plies, each placed by hand and cured under pressure for nine hours. It weighs less than the driver it protects.',
  },
  {
    photo: 'carbonEdge',
    alt: 'A sharp carbon fibre edge catching a band of warm light.',
    title: 'Drawn by air',
    body: 'No surface is styled. Each edge was resolved across 40,000 hours of simulation and left only when the air had nothing further to ask of it.',
  },
  {
    photo: 'carbonCurve',
    alt: 'A sculpted carbon fibre form lit against pure black.',
    title: 'Measured in microns',
    body: 'Tolerances across the power unit are held to four microns, a fraction of a human hair. At 15,000 revolutions per minute, anything larger is audible.',
  },
]

const SPECS = [
  { value: '798', unit: 'kg', label: 'Mass, with driver' },
  { value: '1,050', unit: 'hp', label: 'Combined output' },
  { value: '15,000', unit: 'rpm', label: 'Limit' },
  { value: '6.5', unit: 'G', label: 'Peak lateral load' },
]

export function Engineering() {
  const [active, setActive] = useState(0)

  return (
    <section id="engineering" aria-labelledby="engineering-title" className="relative bg-obsidian">
      <div className="lg:grid lg:grid-cols-2">
        {/* Desktop: one held frame that changes as the chapters pass beside it. */}
        <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
          {CHAPTERS.map((chapter, index) => (
            <div
              key={chapter.photo}
              className={`absolute inset-0 transition-[opacity,scale] duration-[1400ms] ease-cinema ${
                active === index ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
              }`}
            >
              <Photo photo={chapter.photo} alt={active === index ? chapter.alt : ''} sizes="50vw" className="brightness-[0.82]" />
            </div>
          ))}
          <p className="label absolute bottom-8 left-[var(--gutter)] text-ivory/80" aria-hidden>
            Plate {active + 1} <span className="mx-2 text-ivory/40">of</span> {CHAPTERS.length}
          </p>
        </div>

        <div className="gutter relative pt-28 pb-24 lg:pt-[22vh] lg:pb-[18vh] lg:pl-[7vw]">
          <Fade><p className="label text-titanium">Engineering</p></Fade>
          {/* On desktop the headline crosses the split, tying image to argument. */}
          <Lines
            id="engineering-title"
            className="display relative z-10 mt-8 text-[clamp(3.25rem,13.5vw,6rem)] uppercase lg:-ml-[22vw] lg:text-[7.2vw]"
            lines={['Perfection', <span className="block lg:ml-[22vw]">is</span>, 'engineered.']}
          />

          <div className="mt-20 lg:mt-[22vh]">
            {CHAPTERS.map((chapter, index) => (
              <motion.article
                key={chapter.title}
                onViewportEnter={() => setActive(index)}
                viewport={{ margin: '-48% 0px -48% 0px' }}
                className="pb-20 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:pb-0"
              >
                <Parallax travel={10} className="relative mb-8 aspect-[4/5] lg:hidden">
                  <Photo photo={chapter.photo} alt={chapter.alt} sizes="100vw" />
                </Parallax>
                <Fade>
                  <p className="label text-titanium tabular-nums">0{index + 1}</p>
                  <h3 className="display mt-5 text-[clamp(2.25rem,4vw,4rem)] leading-none italic">{chapter.title}</h3>
                  <p className="prose-editorial mt-6 max-w-[27rem] text-titanium">{chapter.body}</p>
                </Fade>
              </motion.article>
            ))}
          </div>

          <dl className="grid grid-cols-2 border-t border-ivory/15 lg:mt-[8vh]">
            {SPECS.map((spec, index) => (
              <Fade key={spec.label} delay={index * 0.08} className="border-b border-ivory/15 py-7 odd:pr-5">
                <dt className="label text-titanium">{spec.label}</dt>
                <dd className="mt-4 flex items-baseline gap-2">
                  <span className="display text-[clamp(2.25rem,4.4vw,4.5rem)] leading-none tabular-nums">{spec.value}</span>
                  <span className="text-sm text-titanium">{spec.unit}</span>
                </dd>
              </Fade>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

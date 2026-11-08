import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Parallax } from '../components/Parallax'
import { Photo } from '../components/Photo'
import { Fade, Lines, Unveil } from '../components/Reveal'
import type { PhotoKey } from '../lib/photos'

type Pillar = {
  photo: PhotoKey
  alt: string
  index: string
  title: string
  body: string
  /** Placement on the twelve-column editorial grid. */
  frame: string
  aspect: string
  /** Art-directed crop, chosen to keep the frame free of liveries. */
  crop?: string
  sizes: string
}

const PILLARS: Pillar[] = [
  {
    photo: 'bodywork',
    alt: 'Abstract crop of a nose cone where red and white bodywork meet in a clean line.',
    index: 'I',
    title: 'Aerodynamics',
    body: 'Five tonnes of downforce at full speed: enough, in theory, to drive across a ceiling.',
    frame: 'md:col-span-5 md:col-start-1',
    aspect: 'aspect-[4/5]',
    crop: 'origin-bottom scale-[1.38] object-[50%_100%] saturate-[0.7] brightness-[0.55]',
    sizes: '(min-width: 768px) 42vw, 100vw',
  },
  {
    photo: 'rearStand',
    alt: 'The rear of a Formula 1 car at ground level: diffuser, gearbox and two wide slick tyres.',
    index: 'II',
    title: 'Power',
    body: 'A 1.6-litre V6 and two electric machines, converting more than half their fuel energy into motion.',
    frame: 'md:col-span-6 md:col-start-7 md:mt-[22vw]',
    aspect: 'aspect-[3/2]',
    crop: 'object-[50%_86%] saturate-[0.35]',
    sizes: '(min-width: 768px) 50vw, 100vw',
  },
  {
    photo: 'carbonEdge',
    alt: 'Sharp carbon fibre edge with a fine, regular weave.',
    index: 'III',
    title: 'Materials',
    body: 'Carbon, titanium, and a magnesium alloy once reserved for orbit. Nothing here is decorative.',
    frame: 'md:col-span-4 md:col-start-2 md:mt-24',
    aspect: 'aspect-square',
    sizes: '(min-width: 768px) 34vw, 100vw',
  },
  {
    photo: 'museumWheel',
    alt: 'A racing tyre and suspension arms in close-up, under low workshop light.',
    index: 'IV',
    title: 'Craftsmanship',
    body: 'Fourteen thousand parts, assembled by forty people, each of whom signs what they finish.',
    frame: 'md:col-span-7 md:col-start-6 md:mt-[9vw]',
    aspect: 'aspect-[16/10]',
    crop: 'saturate-[0.15]',
    sizes: '(min-width: 768px) 58vw, 100vw',
  },
]

function WideReveal() {
  const stage = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end end'] })
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.72],
    ['inset(16% 20% 16% 20%)', 'inset(0% 0% 0% 0%)'],
  )
  const scale = useTransform(scrollYProgress, [0, 0.72], [1.18, 1])
  const captionOpacity = useTransform(scrollYProgress, [0.62, 0.86], [0, 1])

  return (
    <div ref={stage} className="relative h-[190vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="h-full w-full" style={{ clipPath: reduceMotion ? 'none' : clipPath }}>
          <motion.div className="h-full w-full" style={{ scale: reduceMotion ? 1 : scale }}>
            <Photo
              photo="frontWide"
              alt="Low, head-on view of a black Formula 1 car, fine lines of light following its front wing and sidepods."
              className="object-[50%_60%] saturate-0"
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="gutter absolute inset-x-0 bottom-8 flex items-end justify-between"
          style={{ opacity: reduceMotion ? 1 : captionOpacity }}
        >
          <p className="display text-[clamp(1.5rem,3vw,3rem)] leading-none italic">Nothing to add.</p>
          <p className="label text-ivory/75">Vespera V-01</p>
        </motion.div>
      </div>
    </div>
  )
}

export function Machine() {
  return (
    <section id="machine" aria-labelledby="machine-title" className="relative bg-graphite">
      <div className="gutter grid pt-32 pb-24 md:grid-cols-12 md:pt-48 md:pb-40">
        <Fade className="md:col-span-3"><p id="machine-title" className="label text-titanium">The Machine</p></Fade>
        <div className="mt-8 md:col-span-9 md:mt-0">
          <Lines
            className="display text-[clamp(2.75rem,7.2vw,8.5rem)] leading-[0.98]"
            lines={['Eleven examples', <span className="block italic md:ml-[8vw]">of a single idea.</span>]}
          />
          <Fade delay={0.2} className="mt-12 max-w-[30rem] md:ml-[8vw]">
            <p className="prose-editorial text-titanium">
              V-01 was never meant to be practical, or even polite. It exists to answer one
              question, as completely as a machine can: how little can stand between intent and motion?
            </p>
          </Fade>
        </div>
      </div>

      <WideReveal />

      <div className="gutter grid gap-20 pt-28 pb-32 md:grid-cols-12 md:gap-x-6 md:gap-y-0 md:pt-48 md:pb-56">
        {PILLARS.map((pillar) => (
          <article key={pillar.title} className={pillar.frame}>
            <Unveil>
              <Parallax travel={14} className={`relative ${pillar.aspect}`}>
                <Photo photo={pillar.photo} alt={pillar.alt} sizes={pillar.sizes} className={pillar.crop} />
              </Parallax>
            </Unveil>
            <Fade className="mt-6 grid grid-cols-[3rem_1fr]">
              <p className="display pt-1 text-lg italic text-titanium">{pillar.index}</p>
              <div>
                <h3 className="label">{pillar.title}</h3>
                <p className="prose-editorial mt-3 max-w-[24rem] text-titanium">{pillar.body}</p>
              </div>
            </Fade>
          </article>
        ))}
      </div>
    </section>
  )
}

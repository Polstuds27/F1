import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Photo } from '../components/Photo'
import { Fade, Lines } from '../components/Reveal'
import { TextLink } from '../components/TextLink'

export function Hero() {
  const section = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={section} id="top" aria-label="Introduction" className="relative h-svh min-h-[620px] overflow-hidden bg-obsidian">
      <motion.div className="absolute inset-0" style={{ y: reduceMotion ? 0 : imageY }}>
        {/* The studio lights come up on the car once, like a reveal on a stage. */}
        <motion.div
          className="absolute inset-0 lg:left-[16%] lg:-right-[8%]"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Photo
            photo="heroFront"
            priority
            sizes="(min-width: 1024px) 92vw, 180vw"
            alt="A Formula 1 car seen head-on in a black studio, its bodywork traced by a thin line of light."
            className="object-[50%_38%]"
          />
        </motion.div>
      </motion.div>

      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />

      <motion.div
        className="gutter relative flex h-full flex-col justify-between pt-28 pb-6 md:pb-8"
        style={{ opacity: reduceMotion ? 1 : contentOpacity }}
      >
        <div className="max-w-[23rem]">
          <Fade immediate delay={1.5}>
            <p className="prose-editorial text-ivory/85">
              Where precision becomes instinct, and engineering becomes extraordinary.
            </p>
            <TextLink href="#machine" className="mt-5">Discover the Machine</TextLink>
          </Fade>
        </div>

        <div>
          <Lines
            as="h1"
            immediate
            delay={0.5}
            className="display uppercase"
            lines={[
              <span className="block text-[clamp(2.5rem,7.4vw,9rem)]">The Art of</span>,
              <span className="-ml-[0.04em] block text-[17.4vw] leading-[0.9]">Velocity.</span>,
            ]}
          />

          <Fade immediate delay={1.9} className="mt-4 flex items-end justify-between border-t border-ivory/15 pt-4 text-titanium md:mt-6">
            <p className="label">V-01 <span className="mx-3 text-ivory/30">/</span> Eleven examples</p>
            <div className="flex items-center gap-4">
              <span className="label hidden sm:block">Scroll</span>
              <span aria-hidden className="relative block h-9 w-px overflow-hidden bg-ivory/15">
                <span className="scroll-cue absolute inset-0 bg-ivory" />
              </span>
            </div>
          </Fade>
        </div>
      </motion.div>
    </section>
  )
}

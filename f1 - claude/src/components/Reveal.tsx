import type { ElementType, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE_CINEMA, VIEWPORT_ONCE } from '../lib/motion'

type LinesProps = {
  as?: ElementType
  id?: string
  lines: ReactNode[]
  className?: string
  delay?: number
  /** Reveal on mount rather than on entering the viewport. */
  immediate?: boolean
}

/** Headline whose lines rise from behind a mask, one after another. */
export function Lines({ as: Tag = 'h2', id, lines, className, delay = 0, immediate = false }: LinesProps) {
  // The trigger sits on the mask: the hidden text is clipped by it, so the text
  // itself would never register as being in the viewport.
  const trigger = immediate
    ? { animate: 'shown' }
    : { whileInView: 'shown', viewport: VIEWPORT_ONCE }

  return (
    <Tag id={id} className={className}>
      {lines.map((line, index) => (
        // The padding gives ascenders and descenders room inside the mask.
        <motion.span key={index} className="block overflow-hidden pt-[0.06em] pb-[0.08em]" initial="hidden" {...trigger}>
          <motion.span
            className="block will-change-transform"
            variants={{ hidden: { y: '112%' }, shown: { y: '0%' } }}
            transition={{ duration: 1.3, delay: delay + index * 0.11, ease: EASE_CINEMA }}
          >
            {line}{' '}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  )
}

type FadeProps = {
  children: ReactNode
  className?: string
  delay?: number
  immediate?: boolean
}

/** Quiet fade and short rise for supporting copy. */
export function Fade({ children, className, delay = 0, immediate = false }: FadeProps) {
  const trigger = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: VIEWPORT_ONCE }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      {...trigger}
      transition={{ duration: 1.1, delay, ease: EASE_CINEMA }}
    >
      {children}
    </motion.div>
  )
}

/** A frame that opens from the bottom edge as it enters the viewport. */
export function Unveil({ children, className, delay = 0 }: Omit<FadeProps, 'immediate'>) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.5, delay, ease: EASE_CINEMA }}
    >
      {children}
    </motion.div>
  )
}

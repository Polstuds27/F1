import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

type ParallaxProps = {
  children: ReactNode
  /** Total travel as a percentage of the frame height. */
  travel?: number
  /** Must position the frame (relative or absolute). */
  className?: string
}

/** A cropped frame whose contents drift gently against the scroll. */
export function Parallax({ children, travel = 12, className = 'relative' }: ParallaxProps) {
  const frame = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-travel / 2}%`, `${travel / 2}%`])

  return (
    <div ref={frame} className={`overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{
          y: reduceMotion ? 0 : y,
          top: `${-travel / 2}%`,
          height: `${100 + travel}%`,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

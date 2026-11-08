import { MotionConfig } from 'framer-motion'
import { Nav } from './components/Nav'
import { Engineering } from './sections/Engineering'
import { Finale } from './sections/Finale'
import { Gallery } from './sections/Gallery'
import { Heritage } from './sections/Heritage'
import { Hero } from './sections/Hero'
import { Machine } from './sections/Machine'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="label fixed top-3 left-3 z-[60] -translate-y-20 bg-ivory px-4 py-3 text-obsidian focus:translate-y-0"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Engineering />
        <Machine />
        <Heritage />
        <Gallery />
        <Finale />
      </main>
    </MotionConfig>
  )
}

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '../lib/content'
import { EASE_CINEMA } from '../lib/motion'
import { Wordmark } from './Wordmark'

function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-3 md:p-4">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: EASE_CINEMA }}
        className={`relative z-10 mx-auto flex h-14 items-center justify-between border px-5 transition-[background-color,border-color] duration-700 md:px-7 ${
          scrolled && !menuOpen
            ? 'border-ivory/10 bg-obsidian/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#top" aria-label="Vespera, back to top" className="transition-opacity duration-500 hover:opacity-70">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-11">
            {NAV_LINKS.map((link) => {
              const current = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={current ? 'location' : undefined}
                    className={`label relative block py-2 transition-colors duration-500 hover:text-ivory ${
                      current ? 'text-ivory' : 'text-titanium'
                    }`}
                  >
                    {link.label}
                    {current && (
                      <motion.span
                        layoutId="nav-current"
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-px bg-racing"
                        transition={{ duration: 0.7, ease: EASE_CINEMA }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <a href="#experience" className="label hidden border-b border-ivory/25 py-1 transition-colors duration-500 hover:border-ivory lg:block">
          Explore the Experience
        </a>

        <button
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="label -mr-2 p-2 lg:hidden"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_CINEMA }}
            className="gutter fixed inset-0 flex flex-col justify-end bg-obsidian pb-12"
          >
            <ul>
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} className="border-t border-ivory/10">
                  <a
                    ref={index === 0 ? firstLink : undefined}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="display block py-5 text-[clamp(2.25rem,10vw,4rem)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#experience" onClick={() => setMenuOpen(false)} className="label mt-8 border-t border-ivory/10 pt-8">
              Explore the Experience
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

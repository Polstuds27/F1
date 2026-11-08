import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown, ArrowRight, X, Menu, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import './styles.css';

const studio = '/images/veloce-studio.webp';
const detail = '/images/veloce-detail.webp';
const track = '/images/veloce-track.webp';
const studies = [
  { name: 'Aerodynamics', title: 'Shaped by the invisible.', text: 'Every contour has a purpose. Sculpted wings and carefully guided airflow turn invisible forces into a language of balance, grip, and control.', metric: '01', label: 'Form follows airflow', image: detail, position: 'center' },
  { name: 'Power', title: 'An instinct for more.', text: 'The visceral character of combustion. The immediate response of electric power. A hybrid philosophy imagined around one singular sensation: acceleration.', metric: '02', label: 'The hybrid philosophy', image: studio, position: 'center' },
  { name: 'Materials', title: 'Nothing without purpose.', text: 'Exposed carbon. Brushed titanium. An uncompromising material palette, selected for strength and lightness, and beautiful in its absolute honesty.', metric: '03', label: 'Material intelligence', image: detail, position: 'left center' },
  { name: 'Craftsmanship', title: 'Precision you can feel.', text: 'From the geometry of the suspension to the edge of a wing, the smallest detail carries the entire ambition. Considered. Refined. Resolved.', metric: '04', label: 'Considered to the micron', image: studio, position: '70% center' },
];
const gallery = [
  { src: studio, title: 'The first encounter', subtitle: 'STUDIO STUDY / 01', position: 'center' },
  { src: detail, title: 'The language of carbon', subtitle: 'MATERIAL STUDY / 02', position: 'center' },
  { src: track, title: 'A moment without limits', subtitle: 'ATMOSPHERIC STUDY / 03', position: 'center' },
];
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .85, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [study, setStudy] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '12%']);
  useEffect(() => {
    if (lightbox === null && !menuOpen) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (lightbox !== null) closeButton.current?.focus();
    function keys(e: KeyboardEvent) {
      if (e.key === 'Escape') { setLightbox(null); setMenuOpen(false); }
      if (lightbox !== null) {
        if (e.key === 'ArrowRight') setLightbox(n => ((n ?? 0) + 1) % gallery.length);
        if (e.key === 'ArrowLeft') setLightbox(n => ((n ?? 0) + gallery.length - 1) % gallery.length);
        if (e.key === 'Tab') {
          const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.lightbox button'));
          const first = buttons[0], last = buttons[buttons.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
      if (menuOpen && e.key === 'Tab') {
        const links = Array.from(document.querySelectorAll<HTMLElement>('.mobile-menu a'));
        if (!e.shiftKey && document.activeElement === links.at(-1)) { e.preventDefault(); menuButton.current?.focus(); }
        else if (e.shiftKey && document.activeElement === menuButton.current) { e.preventDefault(); links.at(-1)?.focus(); }
      }
    }
    window.addEventListener('keydown', keys);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', keys); if (lightbox !== null) opener.current?.focus(); };
  }, [lightbox, menuOpen]);
  const navLinks = [['The Machine', 'machine'], ['Heritage', 'heritage'], ['Engineering', 'engineering'], ['Gallery', 'gallery']];
  function openImage(i: number, button: HTMLButtonElement) { opener.current = button; setLightbox(i); }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="navigation">
      <a className="wordmark" href="#" aria-label="Velocé home">VELOCÉ<span className="brand-line">ATELIER OF PERFORMANCE</span></a>
      <nav className="desktop-links" aria-label="Main navigation">{navLinks.map(([name, id]) => <a key={id} href={`#${id}`}>{name}</a>)}</nav>
      <a href="#final" className="nav-cta">Explore the Experience <ArrowUpRight size={14}/></a>
      <button ref={menuButton} className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    <AnimatePresence>{menuOpen && <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{navLinks.map(([name, id], i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{name}<ArrowUpRight/></a>)}<a href="#final" onClick={() => setMenuOpen(false)}>Explore the Experience <ArrowUpRight/></a></motion.nav>}</AnimatePresence>
    <main id="main">
      <section className="hero" ref={hero} aria-labelledby="hero-title">
        <motion.img className="hero-image" src={studio} alt="Titanium silver Formula-inspired single-seater revealed in a dark photographic studio" fetchPriority="high" style={{ y: imageY }}/>
        <div className="hero-shade"/>
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="red-line"/> THE PURSUIT OF EXTRAORDINARY</p></Reveal>
          <Reveal delay={.1}><h1 id="hero-title">THE ART OF<br/><span className="velocity">VELOCITY<span className="red-period">.</span></span></h1></Reveal>
          <Reveal className="hero-description" delay={.25}><p>Where precision becomes instinct,<br/>and engineering becomes extraordinary.</p><a className="text-link" href="#machine">Discover the Machine <ArrowUpRight size={17}/></a></Reveal>
        </div>
        <div className="hero-bottom"><a href="#engineering" className="scroll-hint"><span className="scroll-line"/> SCROLL TO DISCOVER <ArrowDown size={13}/></a><span className="hero-caption">V—01 <span>/</span> FORMULA CONCEPT</span><span className="edition">DESIGNED TO TRANSCEND.</span></div>
      </section>
      <section className="intro-strip"><span>AN EXERCISE IN ABSOLUTE PRECISION.</span><p>Born from racing.<br className="mobile-break"/> Refined beyond convention.</p><span className="strip-mark">V / 01</span></section>
      <section id="engineering" className="engineering section-pad">
        <Reveal className="engineering-visual"><img src={detail} alt="Macro study of layered carbon-fiber front wing and precision suspension" loading="lazy"/><div className="image-annotation"><span>FIG. 01 — CARBON COMPOSITE</span><Plus size={15}/></div><span className="vertical-note">THE BEAUTY IS IN THE DETAIL.</span></Reveal>
        <Reveal className="engineering-copy"><p className="eyebrow section-label"><span>01 /</span> ENGINEERING EXCELLENCE</p><h2>PERFECTION<br/>IS ENGINEERED<span className="red-period">.</span></h2><p className="body-copy">Extraordinary is never an accident. It is the sum of a thousand decisions, each made with a singular purpose: to create something that feels inevitable.</p><p className="body-copy muted">Every surface considered. Every gram questioned. Every detail in pursuit of the perfect balance between raw performance and effortless control.</p><div className="spec-grid"><div><strong>01</strong><span>SINGULAR VISION</span></div><div><strong>360°</strong><span>DESIGN CONSIDERATION</span></div><div><strong>∞</strong><span>PURSUIT OF PERFECTION</span></div></div><p className="small-note">V—01 / AN INDEPENDENT DESIGN EXPLORATION</p></Reveal>
      </section>
      <section id="machine" className="machine section-pad">
        <Reveal className="section-heading"><div><p className="eyebrow section-label"><span>02 /</span> THE MACHINE</p><h2>FUNCTION.<br/><span className="serif-word">In its purest form.</span></h2></div><p className="body-copy">Nothing added for effect.<br/>Nothing left to chance.</p></Reveal>
        <div className="machine-stage"><AnimatePresence mode="wait"><motion.img key={study} src={studies[study].image} alt={`${studies[study].name} study of the V—01 concept`} style={{ objectPosition: studies[study].position }} initial={{ opacity: .2, scale: reduced ? 1 : 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: .2 }} transition={{ duration: .5 }}/></AnimatePresence><div className="stage-label"><span>V—01</span><span>DESIGN STUDY {studies[study].metric} / 04</span></div><button className="stage-expand" aria-label="View machine image full screen" onClick={e => openImage(study === 0 || study === 2 ? 1 : 0, e.currentTarget)}><Plus size={22}/></button></div>
        <div className="machine-tabs" role="tablist" aria-label="Explore machine details">{studies.map((s, i) => <button key={s.name} id={`tab-${i}`} role="tab" aria-selected={study === i} aria-controls="study-panel" tabIndex={study === i ? 0 : -1} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const next = (i + (e.key === 'ArrowRight' ? 1 : 3)) % 4; setStudy(next); document.getElementById(`tab-${next}`)?.focus(); } }} onClick={() => setStudy(i)}><span>0{i + 1}</span>{s.name}<ArrowUpRight size={15}/></button>)}</div>
        <div id="study-panel" role="tabpanel" aria-labelledby={`tab-${study}`} className="study-panel"><div><p className="eyebrow muted">{studies[study].label}</p><h3>{studies[study].title}</h3></div><p className="body-copy">{studies[study].text}</p></div>
      </section>
      <section id="heritage" className="heritage"><div className="heritage-photo"><img src={track} alt="A silver single-seater on a quiet circuit in the mist, a tribute to motorsport's enduring spirit" loading="lazy"/><span className="photo-caption">THE CIRCUIT IS OUR CANVAS.</span></div><Reveal className="heritage-copy"><p className="eyebrow section-label"><span>03 /</span> HERITAGE & PHILOSOPHY</p><h2>THE SPIRIT<br/>IS TIMELESS.<br/><span className="outline-text">THE PURSUIT</span><br/><span className="outline-text">IS ENDLESS.</span></h2><div className="heritage-bottom"><span className="red-line"/><div><p>Progress has no finish line.</p><p className="body-copy">Inspired by the pioneers who saw possibility where others saw limits. Driven by the belief that the next extraordinary thing is still waiting to be created.</p><a href="#gallery" className="text-link dark-link">A closer perspective <ArrowUpRight size={16}/></a></div></div></Reveal></section>
      <section id="gallery" className="gallery section-pad"><Reveal className="section-heading"><div><p className="eyebrow section-label"><span>04 /</span> SELECTED PERSPECTIVES</p><h2>EVERY ANGLE.<br/><span className="serif-word">A new obsession.</span></h2></div><span className="gallery-instruction">A STUDY IN LIGHT, FORM & EMOTION <Plus size={14}/></span></Reveal><div className="gallery-grid">{gallery.map((item, i) => <Reveal key={item.title} className={`gallery-item gallery-item-${i}`} delay={i * .07}><button onClick={e => openImage(i, e.currentTarget)} aria-label={`Open image: ${item.title}`}><img src={item.src} alt={item.title} loading="lazy" style={{ objectPosition: item.position }}/><span className="gallery-open"><ArrowUpRight size={21}/></span></button><div className="gallery-caption"><div><span>{item.subtitle}</span><h3>{item.title}</h3></div><span>0{i + 1}</span></div></Reveal>)}</div></section>
      <section id="final" className="final"><span className="final-rule"/><Reveal><p className="eyebrow">THE RELENTLESS PURSUIT CONTINUES</p><h2>BEYOND<br/>THE LIMIT<span className="red-period">.</span></h2><p>For those who see performance as an art.</p><a className="final-cta" href="#machine">Explore the Experience <ArrowUpRight size={18}/></a></Reveal><span className="final-watermark" aria-hidden="true">V</span><div className="final-meta"><span>PRECISION. PURPOSE. POSSIBILITY.</span><span>VELOCÉ / V—01</span></div></section>
    </main>
    <footer><div className="footer-top"><a className="wordmark" href="#">VELOCÉ<span className="brand-line">ATELIER OF PERFORMANCE</span></a><p>The art of moving forward.</p><a className="back-top" href="#">BACK TO TOP <ArrowUpRight size={15}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VELOCÉ. A CONCEPT IN MOTION.</span><span>INDEPENDENT DESIGN STUDY. NOT AFFILIATED WITH FORMULA 1.</span><span>CRAFTED WITH INTENT.</span></div></footer>
    <AnimatePresence>{lightbox !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Selected perspectives gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="lightbox-header"><span className="wordmark">VELOCÉ</span><button ref={closeButton} onClick={() => setLightbox(null)} aria-label="Close gallery"><X size={25}/></button></div><div className="lightbox-picture"><AnimatePresence mode="wait"><motion.img key={lightbox} src={gallery[lightbox].src} alt={gallery[lightbox].title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}/></AnimatePresence></div><div className="lightbox-bottom"><div><p className="eyebrow">{gallery[lightbox].subtitle}</p><h3>{gallery[lightbox].title}</h3></div><div className="lightbox-controls"><button aria-label="Previous image" onClick={() => setLightbox((lightbox + 2) % 3)}><ChevronLeft/></button><span>0{lightbox + 1} / 03</span><button aria-label="Next image" onClick={() => setLightbox((lightbox + 1) % 3)}><ChevronRight/></button></div></div></motion.div>}</AnimatePresence>
  </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

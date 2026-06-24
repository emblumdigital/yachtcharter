import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
  }),
}
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut', delay }
  }),
}

function Reveal({ children, delay = 0, className = '', y = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div
      ref={ref}
      variants={y ? fadeUp : fadeIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Fleet', 'Destinations', 'Experience', 'Book']

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(13,13,13,0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid #2C2925' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#hero" className="flex flex-col leading-none">
          <span
            className="font-display font-800 text-cream uppercase"
            style={{ fontSize: '1.1rem', letterSpacing: '0.25em', fontWeight: 800 }}
          >
            Coastal Luxury
          </span>
          <span
            className="font-body"
            style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 400 }}
          >
            Yacht Charters
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="eyebrow hover:text-gold transition-colors duration-200"
              style={{ color: 'var(--color-muted)', fontSize: '0.65rem' }}
            >
              {l}
            </a>
          ))}
          <a
            href="tel:2392920742"
            className="font-body text-cream border border-gold px-5 py-2 hover:bg-gold hover:text-black transition-all duration-300"
            style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            239.292.0742
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span className="block w-6 h-px bg-cream transition-all duration-300" style={{ transform: open ? 'rotate(45deg) translateY(5px)' : '' }} />
          <span className="block w-6 h-px bg-cream transition-all duration-300" style={{ opacity: open ? 0 : 1 }} />
          <span className="block w-6 h-px bg-cream transition-all duration-300" style={{ transform: open ? 'rotate(-45deg) translateY(-5px)' : '' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(13,13,13,0.98)', borderTop: '1px solid #2C2925' }}
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map(l => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="section-label text-cream hover:text-gold transition-colors"
                  style={{ fontSize: '0.9rem' }}
                >
                  {l}
                </a>
              ))}
              <a
                href="tel:2392920742"
                className="eyebrow mt-2"
                style={{ fontSize: '0.9rem' }}
              >
                239.292.0742
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: 600 }}>
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1567899378494-47b22a3ca0a0?w=1800&q=85&auto=format&fit=crop"
          alt="Luxury yacht underway in Southwest Florida"
          className="w-full h-full object-cover"
        />
        {/* Vignette layers */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,13,13,0.82) 0%, rgba(13,13,13,0.3) 60%, rgba(13,13,13,0.15) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 50%)' }} />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="eyebrow mb-6"
          >
            Fort Myers · Sanibel · Captiva
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="headline-display text-cream mb-2"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
          >
            Experience
          </motion.h1>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="headline-display text-cream mb-2"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
          >
            The Water
          </motion.h1>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="headline-display italic mb-10"
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)', color: 'var(--color-gold-light)', fontWeight: 600 }}
          >
            The Way It Was Meant To Be.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.75}
            className="font-body text-cream mb-10 leading-relaxed"
            style={{ fontSize: '0.875rem', letterSpacing: '0.06em', opacity: 0.8, maxWidth: '38ch' }}
          >
            Private yacht charters aboard the 2019 Carver C52 Coupe.
            Half day · Full day · Sunset. Up to 12 guests.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.9}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#book"
              className="font-display font-700 uppercase text-center px-10 py-4 text-black transition-all duration-300 hover:brightness-110"
              style={{ background: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '0.2em', fontWeight: 700 }}
            >
              Reserve Your Experience
            </a>
            <a
              href="#fleet"
              className="font-display font-600 uppercase text-center px-10 py-4 text-cream border border-cream transition-all duration-300 hover:border-gold hover:text-gold"
              style={{ fontSize: '0.8rem', letterSpacing: '0.2em', fontWeight: 600 }}
            >
              Explore The Yacht
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom stats strip */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ background: 'rgba(13,13,13,0.85)', borderTop: '1px solid #2C2925' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-wrap gap-8 justify-between items-center">
          {[
            ['4-Hr Sunset', 'From $3,495'],
            ['6-Hr Day Charter', 'From $4,295'],
            ['8-Hr Full Day', 'From $5,795'],
            ['Capacity', 'Up to 12 Guests'],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col">
              <span className="section-label" style={{ fontSize: '0.55rem' }}>{label}</span>
              <span className="font-display font-700 text-cream" style={{ fontSize: '1.1rem', letterSpacing: '0.05em', fontWeight: 700 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Fleet ────────────────────────────────────────────────────────────────────
const yachts = [
  {
    name: 'Nauti B',
    sub: '2019 Carver C52 Coupe',
    length: '52 ft',
    guests: '12',
    rate: '$3,495',
    rateLabel: 'Starting',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a3ca0a0?w=900&q=80&auto=format&fit=crop',
    features: ['Indoor & Outdoor Living', 'Climate Controlled', 'Premium Sound System', 'Floating Water Mat'],
    tag: 'FEATURED VESSEL',
  },
  {
    name: 'Coastal Star',
    sub: 'Available Upon Request',
    length: '38 ft',
    guests: '8',
    rate: '$2,495',
    rateLabel: 'Starting',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=900&q=80&auto=format&fit=crop',
    features: ['Open-Air Deck', 'Bimini Top', 'Bluetooth Audio', 'Cooler & Ice'],
    tag: 'SUNSET CRUISER',
  },
  {
    name: 'Gulf Horizon',
    sub: 'Private Arrangements',
    length: '44 ft',
    guests: '10',
    rate: 'Inquire',
    rateLabel: 'Custom',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=900&q=80&auto=format&fit=crop',
    features: ['Full Cabin Suite', 'Extended Range', 'Watersport Package', 'Chef Add-On Available'],
    tag: 'CUSTOM CHARTER',
  },
]

function Fleet() {
  return (
    <section id="fleet" className="py-28 lg:py-36" style={{ background: 'var(--color-black)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal className="text-center mb-20">
          <p className="eyebrow mb-4">The Fleet</p>
          <h2 className="headline-display text-cream" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Our Vessels
          </h2>
          <div className="rule-gold mt-6 max-w-xs mx-auto">
            <span className="eyebrow" style={{ fontSize: '0.55rem', color: 'var(--color-gold)' }}>Southwest Florida</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {yachts.map((yacht, i) => (
            <Reveal key={yacht.name} delay={i * 0.12}>
              <div
                className="group relative overflow-hidden cursor-pointer"
                style={{ border: '1px solid #2C2925' }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={yacht.image}
                    alt={yacht.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 50%)' }} />
                  <div
                    className="absolute top-4 left-4 eyebrow"
                    style={{ fontSize: '0.55rem', background: 'var(--color-gold)', color: '#0D0D0D', padding: '3px 10px' }}
                  >
                    {yacht.tag}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-7" style={{ background: 'var(--color-charcoal)' }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3
                      className="headline-display text-cream"
                      style={{ fontSize: '2rem' }}
                    >
                      {yacht.name}
                    </h3>
                    <div className="text-right">
                      <p className="section-label" style={{ fontSize: '0.5rem' }}>{yacht.rateLabel}</p>
                      <p
                        className="font-display font-700 text-gold"
                        style={{ fontSize: '1.4rem', fontWeight: 700 }}
                      >
                        {yacht.rate}
                      </p>
                    </div>
                  </div>
                  <p className="font-body mb-5" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                    {yacht.sub}
                  </p>

                  <hr className="divider mb-5" />

                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
                    {[['Length', yacht.length], ['Capacity', `${yacht.guests} Guests`]].map(([k, v]) => (
                      <div key={k}>
                        <p className="section-label" style={{ fontSize: '0.5rem' }}>{k}</p>
                        <p className="font-display font-600 text-cream" style={{ fontSize: '1rem', fontWeight: 600 }}>{v}</p>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-2 mb-7">
                    {yacht.features.map(f => (
                      <li key={f} className="flex items-center gap-3">
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0, display: 'inline-block' }} />
                        <span className="font-body" style={{ fontSize: '0.72rem', color: 'var(--color-muted)', letterSpacing: '0.04em' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#book"
                    className="block text-center font-display font-700 uppercase py-3 transition-all duration-300"
                    style={{ border: '1px solid var(--color-gold)', color: 'var(--color-gold)', fontSize: '0.7rem', letterSpacing: '0.2em', fontWeight: 700 }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.color = '#0D0D0D' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-gold)' }}
                  >
                    Inquire Now
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Destinations ─────────────────────────────────────────────────────────────
const destinations = [
  {
    name: 'Sanibel Island',
    desc: 'World-renowned shelling beaches and pristine wildlife refuge.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80&auto=format&fit=crop',
    distance: '12 nm',
  },
  {
    name: 'Captiva Island',
    desc: 'Secluded anchorages and dockside dining at the island\'s edge.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700&q=80&auto=format&fit=crop',
    distance: '18 nm',
  },
  {
    name: 'Fort Myers Beach',
    desc: 'Vibrant waterfront with restaurants, bars, and Gulf sunsets.',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=700&q=80&auto=format&fit=crop',
    distance: '6 nm',
  },
  {
    name: 'Naples',
    desc: 'Pristine beaches, fifth avenue dining, and aquamarine waters.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80&auto=format&fit=crop',
    distance: '30 nm',
  },
  {
    name: 'Cayo Costa',
    desc: 'Untouched barrier island — no roads, no crowds, pure coastline.',
    image: 'https://images.unsplash.com/photo-1500370559340-5a31b6de36c0?w=700&q=80&auto=format&fit=crop',
    distance: '22 nm',
  },
  {
    name: 'Boca Grande',
    desc: 'Tarpon capital of the world. Old Florida charm at its finest.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700&q=80&auto=format&fit=crop',
    distance: '28 nm',
  },
]

function Destinations() {
  const scrollRef = useRef(null)

  return (
    <section id="destinations" className="py-28 lg:py-36 overflow-hidden" style={{ background: 'var(--color-charcoal)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14">
        <Reveal>
          <p className="eyebrow mb-4">Charter Destinations</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="headline-display text-cream" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Where We Go
            </h2>
            <p
              className="font-body"
              style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.8, maxWidth: '40ch', letterSpacing: '0.04em' }}
            >
              Every charter departs from our Southwest Florida home port. Custom itineraries crafted around your vision — we know these waters intimately.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-hide px-6 lg:px-12 pb-4"
        style={{ cursor: 'grab' }}
        onMouseDown={e => {
          const el = scrollRef.current
          el.style.cursor = 'grabbing'
          el.dataset.startX = e.pageX - el.offsetLeft
          el.dataset.scrollLeft = el.scrollLeft
          el.dataset.dragging = 'true'
        }}
        onMouseMove={e => {
          const el = scrollRef.current
          if (el.dataset.dragging !== 'true') return
          const x = e.pageX - el.offsetLeft
          el.scrollLeft = el.dataset.scrollLeft - (x - el.dataset.startX)
        }}
        onMouseUp={e => { scrollRef.current.style.cursor = 'grab'; scrollRef.current.dataset.dragging = 'false' }}
        onMouseLeave={e => { scrollRef.current.style.cursor = 'grab'; scrollRef.current.dataset.dragging = 'false' }}
      >
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.name}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
            className="relative flex-shrink-0 overflow-hidden group"
            style={{ width: 280, border: '1px solid #2C2925' }}
          >
            <div className="overflow-hidden" style={{ height: 360 }}>
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                draggable="false"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.1) 55%, transparent 100%)' }}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display font-700 text-cream" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {dest.name}
                </h3>
                <span className="eyebrow" style={{ fontSize: '0.5rem', color: 'var(--color-gold)' }}>{dest.distance}</span>
              </div>
              <p className="font-body" style={{ fontSize: '0.72rem', color: 'var(--color-muted)', lineHeight: 1.6, letterSpacing: '0.03em' }}>
                {dest.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-10">
        <p className="section-label" style={{ color: 'var(--color-muted)' }}>
          Drag to explore · Custom itineraries available upon request
        </p>
      </div>
    </section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────
const packages = [
  { name: 'Luxury Charter Catering', price: '$325', items: ['Premium Charcuterie Board', 'Fresh Seasonal Fruit', 'Shrimp Cocktail', 'Assorted Waters & Soft Drinks', 'Elegant Serving Setup'] },
  { name: 'Celebration Package', price: '$495', items: ['Balloon & Table Decor', 'Champagne Setup', 'Custom Welcome Sign', 'Birthday / Anniversary Styling', 'Photography Setup Areas'] },
  { name: 'Sunset Romance Package', price: '$595', items: ['Dom Pérignon Champagne', 'Luxury Floral Arrangement', 'Romantic Table Setup', 'LED Candle Lighting', 'Dessert Presentation'] },
]

function Experience() {
  return (
    <section id="experience" className="py-28 lg:py-36" style={{ background: 'var(--color-black)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-28 items-center">
          <Reveal>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1540655037529-dec987208707?w=900&q=80&auto=format&fit=crop"
                alt="Guests dining aboard luxury yacht"
                className="w-full object-cover"
                style={{ aspectRatio: '3/4' }}
              />
              {/* Offset accent box */}
              <div
                className="absolute -bottom-6 -right-6 hidden lg:flex flex-col justify-center items-center"
                style={{ width: 160, height: 160, background: 'var(--color-gold)', padding: '1.5rem' }}
              >
                <p className="font-display font-800 text-black text-center leading-none" style={{ fontSize: '2.5rem', fontWeight: 800 }}>12</p>
                <p className="section-label text-black text-center mt-1" style={{ fontSize: '0.5rem', color: '#0D0D0D' }}>Guests Max</p>
                <div className="my-2" style={{ width: 24, height: 1, background: '#0D0D0D', opacity: 0.4 }} />
                <p className="section-label text-black text-center" style={{ fontSize: '0.5rem', color: '#0D0D0D' }}>USCG Certified</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="eyebrow mb-5">The Experience</p>
            <h2 className="headline-display text-cream mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
              Crafted for<br />
              <span style={{ color: 'var(--color-gold-light)' }}>Those Who</span><br />
              Appreciate Excellence.
            </h2>
            <hr className="divider mb-8" style={{ maxWidth: 60 }} />
            <p className="font-body mb-6" style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.9, letterSpacing: '0.04em' }}>
              Every charter is a private experience — no shared vessels, no compromises. Your licensed USCG captain and professional stewardess attend to every detail while you focus on what matters: the water, the moment, and the people beside you.
            </p>
            <p className="font-body mb-10" style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.9, letterSpacing: '0.04em' }}>
              The 2019 Carver C52 Coupe, <em>Nauti B</em>, offers spacious indoor and outdoor living, climate-controlled comfort, a premium sound system, and the finest finishes throughout — a floating retreat built for Southwest Florida's most stunning waters.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                ['Licensed Captain', 'USCG Certified'],
                ['Professional Stewardess', 'Full Service'],
                ['Private Charter', 'Your Group Only'],
                ['SW Florida', 'Home Port'],
              ].map(([k, v]) => (
                <div key={k} style={{ borderLeft: '2px solid var(--color-gold)', paddingLeft: '1rem' }}>
                  <p className="font-display font-700 text-cream" style={{ fontSize: '0.95rem', fontWeight: 700 }}>{k}</p>
                  <p className="section-label" style={{ fontSize: '0.55rem', marginTop: 2 }}>{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Signature packages */}
        <Reveal className="mb-14">
          <p className="eyebrow mb-3">Signature Add-Ons</p>
          <h2 className="headline-display text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Curate Your Charter
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.1}>
              <div className="p-8 h-full" style={{ background: 'var(--color-charcoal)', border: '1px solid #2C2925' }}>
                <div className="flex justify-between items-start mb-6">
                  <h3
                    className="font-display font-700 text-cream uppercase"
                    style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.08em', maxWidth: '18ch', lineHeight: 1.3 }}
                  >
                    {pkg.name}
                  </h3>
                  <span className="font-display font-800 text-gold" style={{ fontSize: '1.5rem', fontWeight: 800, flexShrink: 0, marginLeft: '1rem' }}>
                    {pkg.price}
                  </span>
                </div>
                <hr className="divider mb-6" />
                <ul className="space-y-3">
                  {pkg.items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0, marginTop: 6, display: 'inline-block' }} />
                      <span className="font-body" style={{ fontSize: '0.75rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* All-inclusive strip */}
        <Reveal delay={0.1}>
          <div className="mt-12 p-8 lg:p-10" style={{ background: 'var(--color-charcoal)', border: '1px solid var(--color-gold)' }}>
            <p className="eyebrow mb-5" style={{ color: 'var(--color-gold-light)' }}>All Charters Include</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                'Licensed USCG Captain',
                'Professional Stewardess',
                'Water, Ice & Soft Drinks',
                'Bluetooth Audio System',
                'Floating Water Mat',
                'Local Cruising Allowance',
                'Southwest Florida Pickup',
                'Private Luxury Experience',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6.5" stroke="#C8962A" />
                    <path d="M4 7l2 2 4-4" stroke="#C8962A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-body" style={{ fontSize: '0.72rem', color: 'var(--color-cream)', letterSpacing: '0.04em' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Booking Form ─────────────────────────────────────────────────────────────
function BookingForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', charter: '', date: '', guests: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="book" className="py-28 lg:py-36" style={{ background: 'var(--color-charcoal)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Left */}
          <div className="lg:col-span-2">
            <Reveal>
              <p className="eyebrow mb-5">Make It Yours</p>
              <h2 className="headline-display text-cream mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Reserve Your<br />
                <span style={{ color: 'var(--color-gold-light)' }}>Experience.</span>
              </h2>
              <hr className="divider mb-8" style={{ maxWidth: 60 }} />
              <p className="font-body mb-10" style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.9 }}>
                Every charter begins with a conversation. Share your vision and we'll craft an itinerary around it. Availability is limited — we encourage booking in advance.
              </p>

              <div className="space-y-6">
                <a href="tel:2392920742" className="flex items-center gap-4 group">
                  <div style={{ width: 40, height: 40, border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="section-label" style={{ fontSize: '0.5rem' }}>Call or Text</p>
                    <p className="font-display font-700 text-cream group-hover:text-gold transition-colors" style={{ fontSize: '1.1rem', fontWeight: 700 }}>239.292.0742</p>
                  </div>
                </a>

                <a href="mailto:info@coastalluxuryyachtcharters.com" className="flex items-center gap-4 group">
                  <div style={{ width: 40, height: 40, border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="section-label" style={{ fontSize: '0.5rem' }}>Email</p>
                    <p className="font-display font-700 text-cream group-hover:text-gold transition-colors" style={{ fontSize: '0.85rem', fontWeight: 700 }}>info@coastalluxuryyachtcharters.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div style={{ width: 40, height: 40, border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="section-label" style={{ fontSize: '0.5rem' }}>Home Port</p>
                    <p className="font-display font-700 text-cream" style={{ fontSize: '1rem', fontWeight: 700 }}>Fort Myers, Florida</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center text-center py-24 px-8"
                    style={{ border: '1px solid var(--color-gold)', height: '100%', minHeight: 400 }}
                  >
                    <div style={{ width: 60, height: 60, border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                      <svg width="24" height="24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="eyebrow mb-4">Inquiry Received</p>
                    <h3 className="headline-display text-cream mb-4" style={{ fontSize: '2.5rem' }}>
                      Thank You
                    </h3>
                    <p className="font-body" style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.8, maxWidth: '36ch' }}>
                      We'll be in touch within 24 hours to confirm availability and discuss your charter in detail.
                    </p>
                    <p className="eyebrow mt-8">239.292.0742</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        className="form-input"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <input
                        className="form-input"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        className="form-input"
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                      />
                      <select
                        className="form-input"
                        name="charter"
                        value={form.charter}
                        onChange={handleChange}
                        required
                        style={{ appearance: 'none', cursor: 'pointer' }}
                      >
                        <option value="" disabled>Charter Type</option>
                        <option>4-Hour Sunset / Local Cruise — $3,495</option>
                        <option>6-Hour Day Charter — $4,295</option>
                        <option>8-Hour Full Day Experience — $5,795</option>
                        <option>Custom Itinerary — Inquire</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        className="form-input"
                        name="date"
                        type="date"
                        placeholder="Preferred Date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        style={{ colorScheme: 'dark' }}
                      />
                      <select
                        className="form-input"
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        required
                        style={{ appearance: 'none', cursor: 'pointer' }}
                      >
                        <option value="" disabled>Party Size</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                          <option key={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>

                    <textarea
                      className="form-input resize-none"
                      name="message"
                      placeholder="Tell Us About Your Occasion — Celebrations, Custom Requests, Questions"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                    />

                    <button
                      type="submit"
                      className="w-full font-display font-700 uppercase py-4 text-black transition-all duration-300 hover:brightness-110"
                      style={{ background: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '0.25em', fontWeight: 700 }}
                    >
                      Submit Inquiry
                    </button>

                    <p className="font-body text-center" style={{ fontSize: '0.65rem', color: 'var(--color-muted)', letterSpacing: '0.08em' }}>
                      All charters are private. Up to 12 guests. USCG limits apply.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid #2C2925' }}>
      {/* Top strip */}
      <div style={{ background: 'var(--color-gold)', padding: '1.25rem 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap gap-4 justify-between items-center">
          <p className="font-display font-800 text-black uppercase" style={{ fontSize: '1rem', letterSpacing: '0.2em', fontWeight: 800 }}>
            Reserve Your Experience
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            {['Private Charters', 'Custom Experiences', 'Unforgettable Memories'].map((t, i) => (
              <span key={t} className="font-body text-black" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {i > 0 && <span className="mr-6">·</span>}{t}
              </span>
            ))}
          </div>
          <a
            href="tel:2392920742"
            className="font-display font-700 text-black transition-opacity hover:opacity-70"
            style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.05em' }}
          >
            239.292.0742
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display font-800 text-cream uppercase mb-1" style={{ fontSize: '1.4rem', letterSpacing: '0.2em', fontWeight: 800 }}>Coastal Luxury</p>
            <p className="eyebrow mb-6">Yacht Charters</p>
            <p className="font-body mb-8" style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.9, maxWidth: '38ch' }}>
              Private luxury yacht charters in Southwest Florida. Modern luxury, private experiences, unforgettable memories — aboard the 2019 Carver C52 Coupe, <em>Nauti B</em>.
            </p>
            {/* Socials */}
            <div className="flex gap-4">
              {[
                { label: 'Facebook', href: '#', icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /> },
                { label: 'Instagram', href: '#', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></> },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transition-colors hover:text-gold"
                  style={{ color: 'var(--color-muted)', width: 36, height: 36, border: '1px solid #2C2925', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Charters */}
          <div>
            <p className="section-label mb-6">Charters</p>
            <ul className="space-y-3">
              {['4-Hour Sunset Cruise', '6-Hour Day Charter', '8-Hour Full Day', 'Custom Itinerary', 'Celebration Package', 'Romance Package'].map(item => (
                <li key={item}>
                  <a href="#book" className="font-body hover:text-gold transition-colors" style={{ fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.04em' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <p className="section-label mb-6">Destinations</p>
            <ul className="space-y-3">
              {['Sanibel Island', 'Captiva Island', 'Fort Myers Beach', 'Naples', 'Cayo Costa', 'Boca Grande'].map(item => (
                <li key={item}>
                  <a href="#destinations" className="font-body hover:text-gold transition-colors" style={{ fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.04em' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="divider mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-center md:text-left" style={{ fontSize: '0.65rem', color: 'var(--color-muted)', letterSpacing: '0.08em' }}>
            © 2024 Coastal Luxury Yacht Charters LLC. All Rights Reserved. Fort Myers, Florida.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cancellation Policy'].map(item => (
              <a key={item} href="#" className="font-body hover:text-gold transition-colors" style={{ fontSize: '0.6rem', color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {item}
              </a>
            ))}
          </div>
        </div>

        <p className="font-body text-center mt-6" style={{ fontSize: '0.6rem', color: '#4a4845', letterSpacing: '0.08em' }}>
          MODERN LUXURY · PRIVATE EXPERIENCES · SOUTHWEST FLORIDA
        </p>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: 'var(--color-black)' }}>
      <Nav />
      <Hero />
      <Fleet />
      <Destinations />
      <Experience />
      <BookingForm />
      <Footer />
    </div>
  )
}

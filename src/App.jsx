import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import { motion, useInView, AnimatePresence } from 'motion/react'
import './index.css'

/* ─── design tokens ─── */
const CREAM  = '#ece6d4'
const CREAM2 = '#e2dbc8'
const DARK   = '#141410'
const MID    = '#4a4840'
const MUTED  = '#8a8470'
const AMBER  = '#fcaa2d'
const AMBER2 = '#e89820'

/* ─── motion helpers ─── */
function FadeUp({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  )
}
function FadeLeft({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  )
}

/* ─── shared components ─── */

function ArrowIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18.5621 6V15.75C18.5621 15.8992 18.5029 16.0423 18.3974 16.1477C18.2919 16.2532 18.1488 16.3125 17.9996 16.3125C17.8505 16.3125 17.7074 16.2532 17.6019 16.1477C17.4964 16.0423 17.4371 15.8992 17.4371 15.75V7.3575L6.39714 18.3975C6.29051 18.4969 6.14947 18.551 6.00375 18.5484C5.85802 18.5458 5.71898 18.4868 5.61592 18.3837C5.51286 18.2807 5.45383 18.1416 5.45126 17.9959C5.44869 17.8502 5.50278 17.7091 5.60214 17.6025L16.6421 6.5625H8.24964C8.10046 6.5625 7.95738 6.50324 7.85189 6.39775C7.7464 6.29226 7.68714 6.14918 7.68714 6C7.68714 5.85082 7.7464 5.70774 7.85189 5.60225C7.95738 5.49676 8.10046 5.4375 8.24964 5.4375H17.9996C18.1488 5.4375 18.2919 5.49676 18.3974 5.60225C18.5029 5.70774 18.5621 5.85082 18.5621 6Z" fill={color}/>
    </svg>
  )
}

/* Exact Meridian btn_main structure — clip text slide + diagonal arrow */
const MeridianArrow = () => (
  <>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="btn_main_svg">
      <path d="M18.5621 6V15.75C18.5621 15.8992 18.5029 16.0423 18.3974 16.1477C18.2919 16.2532 18.1488 16.3125 17.9996 16.3125C17.8505 16.3125 17.7074 16.2532 17.6019 16.1477C17.4964 16.0423 17.4371 15.8992 17.4371 15.75V7.3575L6.39714 18.3975C6.29051 18.4969 6.14947 18.551 6.00375 18.5484C5.85802 18.5458 5.71898 18.4868 5.61592 18.3837C5.51286 18.2807 5.45383 18.1416 5.45126 17.9959C5.44869 17.8502 5.50278 17.7091 5.60214 17.6025L16.6421 6.5625H8.24964C8.10046 6.5625 7.95738 6.50324 7.85189 6.39775C7.7464 6.29226 7.68714 6.14918 7.68714 6C7.68714 5.85082 7.7464 5.70774 7.85189 5.60225C7.95738 5.49676 8.10046 5.4375 8.24964 5.4375H17.9996C18.1488 5.4375 18.2919 5.49676 18.3974 5.60225C18.5029 5.70774 18.5621 5.85082 18.5621 6Z" fill="currentColor"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="btn_main_svg is-hover">
      <path d="M18.5621 6V15.75C18.5621 15.8992 18.5029 16.0423 18.3974 16.1477C18.2919 16.2532 18.1488 16.3125 17.9996 16.3125C17.8505 16.3125 17.7074 16.2532 17.6019 16.1477C17.4964 16.0423 17.4371 15.8992 17.4371 15.75V7.3575L6.39714 18.3975C6.29051 18.4969 6.14947 18.551 6.00375 18.5484C5.85802 18.5458 5.71898 18.4868 5.61592 18.3837C5.51286 18.2807 5.45383 18.1416 5.45126 17.9959C5.44869 17.8502 5.50278 17.7091 5.60214 17.6025L16.6421 6.5625H8.24964C8.10046 6.5625 7.95738 6.50324 7.85189 6.39775C7.7464 6.29226 7.68714 6.14918 7.68714 6C7.68714 5.85082 7.7464 5.70774 7.85189 5.60225C7.95738 5.49676 8.10046 5.4375 8.24964 5.4375H17.9996C18.1488 5.4375 18.2919 5.49676 18.3974 5.60225C18.5029 5.70774 18.5621 5.85082 18.5621 6Z" fill="currentColor"/>
    </svg>
  </>
)

function MeridianBtn({ children, href = '#', variant = 'amber', onClick, noArrow = false }) {
  const cls = variant === 'dark' ? 'btn_main_wrap is-dark' : variant === 'outline' ? 'btn_main_wrap is-outline' : 'btn_main_wrap'
  const words = String(children).split(' ')
  return (
    <a href={href} onClick={onClick} className={cls}>
      <div className="btn_main_inner" style={{ display: 'flex', alignItems: 'center', gap: noArrow ? 0 : 10 }}>
        <div className="btn_main_clip">
          <div className="btn_main_text">
            {words.map((w, i) => <span key={i} style={{ display: 'inline-block' }}>{w}{i < words.length - 1 ? ' ' : ''}</span>)}
          </div>
          <div className="btn_main_text is-hover" aria-hidden="true">
            {words.map((w, i) => <span key={i} style={{ display: 'inline-block' }}>{w}{i < words.length - 1 ? ' ' : ''}</span>)}
          </div>
        </div>
        {!noArrow && (
          <div style={{ position: 'relative', width: 18, height: 18, flexShrink: 0 }}>
            <MeridianArrow />
          </div>
        )}
      </div>
    </a>
  )
}

const BtnAmber   = ({ children, href = '#', onClick }) => <MeridianBtn href={href} onClick={onClick} variant="amber">{children}</MeridianBtn>
const BtnDark    = ({ children, href = '#' })           => <MeridianBtn href={href} variant="dark">{children}</MeridianBtn>
const BtnOutline = ({ children, href = '#' })           => <MeridianBtn href={href} variant="outline">{children}</MeridianBtn>

function Eyebrow({ children, light = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 18, height: 1, background: light ? 'rgba(255,255,255,0.4)' : MID, flexShrink: 0 }} />
      <span style={{ fontSize: 11, letterSpacing: '0.09em', textTransform: 'uppercase', fontWeight: 500, color: light ? 'rgba(255,255,255,0.5)' : MID }}>{children}</span>
    </div>
  )
}

/* diagonal image masks */
function MaskedImage({ src, alt, bg = CREAM, ratio = '4/3' }) {
  return (
    <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', aspectRatio: ratio, background: CREAM2 }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.display = 'none' }} />
      <svg xmlns="http://www.w3.org/2000/svg" width="40%" viewBox="0 0 225 48" fill="none" style={{ position: 'absolute', top: -6, right: -8 }}>
        <path d="M225 0H0C3.79228 0 6.89047 1.72683 9.01229 4.04322L39.3706 36.369C40.907 38.539 43.4061 39.8298 46.0715 39.8298H216.8C221.329 39.8298 225 43.4877 225 48V0Z" fill={bg}/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="40%" viewBox="0 0 225 48" fill="none" style={{ position: 'absolute', bottom: -8, left: 0, transform: 'rotate(180deg)' }}>
        <path d="M225 0H0C3.79228 0 6.89047 1.72683 9.01229 4.04322L39.3706 36.369C40.907 38.539 43.4061 39.8298 46.0715 39.8298H216.8C221.329 39.8298 225 43.4877 225 48V0Z" fill={bg}/>
      </svg>
    </div>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [
    { label: 'About', href: '#o-nas' },
    { label: 'Services', href: '#sluzby' },
    { label: 'How we work', href: '#how-we-work' },
    { label: 'Pricing', href: '#cenik' },
    { label: 'Contact', href: '#kontakt' },
  ]
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '1.25rem 0.5rem 1.25rem', pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
        width: 'fit-content',
        background: '#181312',
        backdropFilter: 'blur(16px)',
        borderRadius: '0.375rem',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'background 0.3s',
        pointerEvents: 'all',
        display: 'flex', alignItems: 'center',
        gap: '4rem',
        padding: '0.3rem 0.3rem 0.3rem 1rem',
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
            <polygon points="13,2 24,8 24,18 13,24 2,18 2,8" stroke={CREAM} strokeWidth="1.8" fill="none"/>
            <polygon points="13,7 19,10.5 19,17.5 13,21 7,17.5 7,10.5" fill={CREAM} fillOpacity="0.2"/>
          </svg>
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: CREAM }}>Vintas</span>
        </a>
        <nav style={{ alignItems: 'center', gap: 32 }} className="hidden lg:flex">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: 13, color: '#fff', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = AMBER}
              onMouseLeave={e => e.currentTarget.style.color = '#fff'}
            >{l.label}</a>
          ))}
        </nav>
        <div className="hidden lg:block" style={{ marginLeft: 'auto' }}><MeridianBtn href="#kontakt" noArrow>Contact us</MeridianBtn></div>
        <button className="burger-btn" onClick={() => setMenuOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', flexDirection: 'column', gap: 9, display: 'flex' }}>
          <span style={{ display: 'block', width: 28, height: 1, background: CREAM, borderRadius: 2 }} />
          <span style={{ display: 'block', width: 28, height: 1, background: CREAM, borderRadius: 2 }} />
        </button>
      </motion.div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, background: '#141410', zIndex: 49, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'all' }}
            className="lg:hidden">
            <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 0, padding: 8 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: CREAM, borderRadius: 2, transform: 'rotate(45deg) translateY(0.5px)' }} />
              <span style={{ display: 'block', width: 28, height: 1, background: CREAM, borderRadius: 2, transform: 'rotate(-45deg) translateY(-0.5px)' }} />
            </button>
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 'clamp(28px,6vw,48px)', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', padding: '10px 0', transition: 'color 0.2s', fontFamily: 'Gambarino, serif', letterSpacing: '-0.02em' }}
                  onMouseEnter={e => e.currentTarget.style.color = CREAM}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                >{l.label}</a>
              ))}
              <div style={{ marginTop: 32 }}><MeridianBtn href="#kontakt" onClick={() => setMenuOpen(false)}>Contact us</MeridianBtn></div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: DARK, display: 'flex', flexDirection: 'column' }}>
      {/* background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="/69de8592a5e5663d8b3aceae_home-hero-p-2000.avif" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.display = 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,20,16,0.4) 0%, rgba(20,20,16,0.45) 60%, rgba(20,20,16,0.85) 100%)' }} />
      </div>

      {/* content — full height, space-between */}
      <div className="hero-content" style={{ position: 'relative', flex: 1, maxWidth: '90rem', margin: '0 auto', padding: '100px 28px 80px', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} id="hero-inner">

        {/* middle: eyebrow + headline */}
        <div />
        <div>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hero-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: AMBER, display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 11, letterSpacing: '0.09em', textTransform: 'uppercase', fontWeight: 500, color: '#fff' }}>Lead Generation &amp; Sales</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(48px,7vw,96px)', color: '#fff', lineHeight: 1.02, margin: 0, letterSpacing: '-0.03em', maxWidth: 680 }}>
            Built to scale.<br />Ready to perform.
          </motion.h1>
        </div>

        {/* bottom: description + cta */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.18 }}>
          <p style={{ fontSize: 18, color: '#fff', lineHeight: 1.7, maxWidth: 520, margin: '0 0 24px' }}>
            Vintas embeds with your business to solve operational bottlenecks, build scalable systems, and deliver a clear path forward — in just 90 days.
          </p>
          <div style={{ marginBottom: 24 }}>
            <BtnAmber href="#kontakt">Get started today</BtnAmber>
          </div>
        </motion.div>

      </div>

      {/* bottom-right corner notch */}
      {/* CREAM2 strip — looks like a gap cutout into the next section */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: CREAM2 }} />
      <svg width="315" height="63" viewBox="0 0 315 63" fill="none" className="hero-notch" style={{ position: 'absolute', bottom: 36, right: 0, display: 'block' }}>
        <path d="M315 63H0C3.69958 63 6.72204 61.3091 8.79199 59.041L42.4082 11.3887C43.9071 9.26393 46.3451 8 48.9453 8H307C311.418 8 315 4.41828 315 0V63Z" fill={CREAM2}/>
      </svg>
    </section>
  )
}

/* ─── Stats ─── */
function Stats() {
  const stats = [
    { num: '$2.4B', label: 'Client revenue influenced' },
    { num: '90-day', label: 'Average engagement length' },
    { num: '94%', label: 'Client retention' },
  ]
  return (
    <section style={{ background: CREAM2, padding: '56px 0 80px' }}>
      <div className="inner-pad" style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 28px' }}>
        <div className="stats-wrap" style={{ display: 'flex', alignItems: 'stretch', flexWrap: 'wrap', gap: 0 }}>
          {/* left label */}
          <div className="stats-title" style={{ flex: '0 0 auto', paddingRight: 48, display: 'flex', alignItems: 'center', borderRight: `1px solid rgba(0,0,0,0.12)` }}>
            <h2 style={{ fontSize: 'clamp(22px,2.4vw,32px)', color: DARK, letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0, maxWidth: 220 }}>
              Results that speak for themselves
            </h2>
          </div>
          {/* stats */}
          <div className="stats-numbers" style={{ display: 'contents' }}>
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.08} className="stats-item" style={{ flex: 1, minWidth: 140 }}>
                <div style={{
                  height: '100%',
                  padding: '0 48px',
                  borderRight: i < stats.length - 1 ? `1px solid rgba(0,0,0,0.12)` : 'none',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                  <div style={{ fontSize: 'clamp(32px,4vw,52px)', letterSpacing: '-0.03em', color: DARK, lineHeight: 1, fontFamily: 'Gambarino, serif' }}>{s.num}</div>
                  <p style={{ fontSize: 13, color: MUTED, margin: '8px 0 0', lineHeight: 1.5 }}>{s.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Intro split ─── */
function Intro() {
  return (
    <section id="o-nas" className="section-pad" style={{ background: CREAM, padding: '96px 0' }}>
      <div className="inner-pad" style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 28px' }}>
        <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <FadeLeft>
            <MaskedImage src="/69df796368cee0bbccd9a094_435e23c99a50ecda3c2a4434592115c9_home-intro.jpg" alt="Vintas team" bg={CREAM} ratio="4/3" />
          </FadeLeft>
          <div>
            <FadeLeft delay={0.1}>
              <Eyebrow>Why Vintas</Eyebrow>
              <h2 style={{ fontSize: 'clamp(28px,3.8vw,52px)', fontWeight: 600, letterSpacing: '-0.025em', color: DARK, lineHeight: 1.08, margin: '18px 0 22px' }}>
                Your partner for business success
              </h2>
            </FadeLeft>
            <FadeUp delay={0.2}>
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.75, margin: '0 0 28px' }}>
                At Vintas we focus on providing tailor-made solutions to support your growth through quality leads, streamlined operations, and an improved competitive position. In today's competitive environment we bring expertise and innovative solutions to acquire new customers and drive sustainable growth.
              </p>
              <BtnAmber href="#sluzby">View services</BtnAmber>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
const services = [
  {
    title: 'Lead Generation',
    desc: 'Quality contacts for growth. We effectively reach prospects and build a strong business network that converts.',
    img: '/69df7963f4d7107f44bb5647_operations-audit-p-800.avif',
  },
  {
    title: 'Marketing',
    desc: 'Increase your visibility and reach the ideal clientele. Targeted strategies ensure you are heard and seen.',
    img: '/69df796357d40d908a185636_systems-design-p-800.avif',
  },
  {
    title: 'Sales Support',
    desc: 'Turn prospects into paying customers and maximize the conversions of your sales efforts.',
    img: '/69df79634555589136d204df_org-alignment-p-800.avif',
  },
  {
    title: 'Business Growth',
    desc: 'Fast and sustainable growth with clearly defined goals. Discover new opportunities and expand your reach.',
    img: '/69df7963f4d7107f44bb5647_operations-audit-p-800.avif',
  },
  {
    title: 'Customer Engagement',
    desc: 'Build genuinely strong relationships and continuously strengthen the loyalty of your customers for long-term success.',
    img: '/69df796357d40d908a185636_systems-design-p-800.avif',
  },
  {
    title: 'Digital Transformation',
    desc: 'Leverage the digital world for your business success. Modern technology for better sales and marketing results.',
    img: '/69df79634555589136d204df_org-alignment-p-800.avif',
  },
]

function ServiceCard({ s, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hov, setHov] = useState(false)
  return (
    <motion.a href="#kontakt" ref={ref} style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', aspectRatio: '16/10', background: CREAM2, marginBottom: 20 }}>
        <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s ease', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
          onError={e => { e.currentTarget.style.display = 'none' }} />
        <div style={{
          position: 'absolute', top: 14, right: 14,
          width: 40, height: 40, borderRadius: 999, background: DARK, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.3s, background 0.2s',
          transform: hov ? 'scale(1.12)' : 'scale(1)',
          background: hov ? AMBER : DARK,
        }}>
          <ArrowIcon size={16} color="#fff" />
        </div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 500, color: DARK, margin: '0 0 10px', letterSpacing: '-0.02em', transition: 'color 0.2s', fontFamily: 'Gambarino, serif', ...(hov ? { color: AMBER2 } : {}) }}>{s.title}</div>
      <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
      <div style={{ marginTop: 24, height: 1, background: hov ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)', transition: 'background 0.3s' }} />
    </motion.a>
  )
}

function Services() {
  return (
    <section id="sluzby" className="section-pad" style={{ background: CREAM, padding: '96px 0' }}>
      <div className="inner-pad" style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 28px' }}>
        <FadeUp style={{ marginBottom: 52 }}>
          <Eyebrow>What we do</Eyebrow>
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.025em', color: DARK, lineHeight: 1.08, margin: '14px 0 16px', maxWidth: 540 }}>
            What do we do?
          </h2>
          <p style={{ fontSize: 15, color: MID, lineHeight: 1.75, maxWidth: 560, margin: 0 }}>
            Vintas specializes in generating quality leads, sales support, and effective social media marketing. Through innovative strategies we help businesses build a strong commercial network and reach new customers with maximum impact.
          </p>
        </FadeUp>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
          {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ─── Callout dark (Growth Playbook equivalent) ─── */
function Callout() {
  return (
    <section style={{ background: CREAM, padding: '0 0 96px' }}>
      <div className="inner-pad" style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 28px' }}>
        <div style={{ background: DARK, borderRadius: 10, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 320 }} className="grid-cols-1 md:grid-cols-2">
          {/* image side */}
          <div style={{ position: 'relative', minHeight: 260 }}>
            <img src="/69df796368cee0bbccd9a094_435e23c99a50ecda3c2a4434592115c9_home-intro.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} onError={e => { e.currentTarget.style.display = 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #141410 100%)' }} />
          </div>
          {/* content side */}
          <FadeUp delay={0.1} style={{ padding: '52px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Eyebrow light>Free download</Eyebrow>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 600, color: CREAM, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '16px 0 18px' }}>
              The Growth Playbook
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(236,230,212,0.55)', lineHeight: 1.75, margin: '0 0 28px', maxWidth: 360 }}>
              A 90-day embedded engagement that delivers a complete operational blueprint for your business. Every system documented. Every bottleneck solved.
            </p>
            <div><BtnAmber href="#kontakt">Get the download</BtnAmber></div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ─── Case studies ─── */
const cases = [
  { tag: 'Distribution', title: 'Scaling from $30M to $80M without adding headcount', img: '/69df7963f4d7107f44bb5647_operations-audit-p-800.avif' },
  { tag: 'Construction', title: 'Eliminating project overruns for a mid-size construction firm', img: '/69df796357d40d908a185636_systems-design-p-800.avif' },
  { tag: 'Healthcare', title: 'Building a scalable onboarding process for a growing healthcare company', img: '/69df79634555589136d204df_org-alignment-p-800.avif' },
]

function CaseCard({ c, i }) {
  const [hov, setHov] = useState(false)
  return (
    <FadeUp delay={i * 0.1}>
      <div style={{ background: CREAM, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s', transform: hov ? 'translateY(-4px)' : 'none' }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        <div style={{ position: 'relative', aspectRatio: '16/9', background: CREAM2, overflow: 'hidden' }}>
          <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}
            onError={e => { e.currentTarget.style.display = 'none' }} />
          <div style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 999, background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowIcon size={15} color="#fff" />
          </div>
        </div>
        <div style={{ padding: '20px 22px 24px' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTED, display: 'block', marginBottom: 8 }}>{c.tag}</span>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: DARK, margin: '0 0 14px', lineHeight: 1.45 }}>{c.title}</h3>
          <a href="#" style={{ fontSize: 12, color: MID, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
            Read case study <ArrowIcon size={12} color={MID} />
          </a>
        </div>
        <div style={{ height: 1, background: 'rgba(0,0,0,0.07)', margin: '0 22px' }} />
      </div>
    </FadeUp>
  )
}

function Cases() {
  return (
    <section id="cases" className="section-pad" style={{ background: CREAM2, padding: '96px 0' }}>
      <div className="inner-pad" style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 28px' }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 52 }}>
          <Eyebrow>Hear from our clients</Eyebrow>
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.025em', color: DARK, lineHeight: 1.08, margin: '14px 0 0' }}>
            Operational clarity, measurable results
          </h2>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
          {cases.map((c, i) => <CaseCard key={c.title} c={c} i={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonial ─── */
const testimonials = [
  { quote: '"The Growth Playbook doesn\'t just collect dust. We reference it in every quarterly planning meeting, and it has reshaped how we think about hiring, process, and accountability across our organization. Vintas didn\'t just consult — they transformed the way our company operates."', name: 'Sarah Ødegård', role: 'Chief Operating Officer' },
  { quote: '"We had tried to scale for two years without cracking the code. Vintas identified the core problem in under two weeks and delivered an action plan we could actually execute. 90 days in, we had eliminated 40% of our operational friction."', name: 'Lars Bergman', role: 'CEO, Hartwell Distribution' },
]

function Testimonial() {
  const [idx, setIdx] = useState(0)
  const t = testimonials[idx]
  return (
    <section className="section-pad" style={{ background: CREAM, padding: '96px 0' }}>
      <div className="inner-pad" style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* prev */}
          <button onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)}
            style={{ width: 44, height: 44, borderRadius: 999, border: `1px solid rgba(0,0,0,0.12)`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5.44 18l7.5-7.5L5.44 3" stroke={DARK} strokeWidth="1.5"/></svg>
          </button>

          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} style={{ flex: 1, textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(15px,2.2vw,22px)', color: DARK, lineHeight: 1.65, fontWeight: 400, margin: '0 0 32px', letterSpacing: '-0.01em', fontStyle: 'italic' }}>
                {t.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: CREAM2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: DARK }}>
                  {t.name[0]}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: DARK, margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: MUTED, margin: '2px 0 0' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* next */}
          <button onClick={() => setIdx((idx + 1) % testimonials.length)}
            style={{ width: 44, height: 44, borderRadius: 999, border: `1px solid rgba(0,0,0,0.12)`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18.56 3l-7.5 7.5 7.5 7.5" stroke={DARK} strokeWidth="1.5"/></svg>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── About ─── */
function About() {
  return (
    <section id="how-we-work" className="section-pad" style={{ background: CREAM2, padding: '96px 0' }}>
      <div className="inner-pad" style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 28px' }}>
        <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div className="how-text">
            <FadeLeft>
              <Eyebrow>How we work</Eyebrow>
              <h2 style={{ fontSize: 'clamp(28px,3.8vw,52px)', fontWeight: 600, letterSpacing: '-0.025em', color: DARK, lineHeight: 1.08, margin: '18px 0 22px' }}>
                Committed to your business success
              </h2>
            </FadeLeft>
            <FadeUp delay={0.15}>
              <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, margin: '0 0 28px' }}>
                {[
                  { title: 'Integrity', desc: 'We are committed to honesty and an ethical approach in every collaboration.' },
                  { title: 'Innovation', desc: 'We constantly seek more efficient paths to your success.' },
                  { title: 'Results focus', desc: 'Your needs and goals for customer acquisition and growth are our priority.' },
                  { title: 'Collaboration', desc: 'We believe that together we achieve the best results for your business.' },
                ].map(v => (
                  <div key={v.title} style={{ padding: '18px 20px', background: CREAM, borderRadius: 8, border: `1px solid rgba(0,0,0,0.07)` }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: DARK, margin: '0 0 6px' }}>{v.title}</p>
                    <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.6 }}>{v.desc}</p>
                  </div>
                ))}
              </div>
              <BtnAmber href="#kontakt">Get in touch</BtnAmber>
            </FadeUp>
          </div>
          <FadeLeft delay={0.12} className="how-img">
            <MaskedImage src="/69dd515cd19cc35afa67abbd_playbook.avif" alt="Vintas team" bg={CREAM2} ratio="4/3" />
          </FadeLeft>
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing ─── */
const standardFeatures = ['Lead Generation', 'Marketing Content Production', 'Email Marketing', 'Market & Competitive Analysis', 'Sales Support']
const proFeatures = ['Everything in Standard', 'Advanced Filtering', 'Lead Segmentation', 'Customer Support', 'Marketing Campaign Analysis', 'Sales Process Optimization']

function PricingCard({ plan, sub, price, features, highlight, delay }) {
  return (
    <FadeUp delay={delay}>
      <div style={{
        background: highlight ? DARK : CREAM, borderRadius: 10,
        padding: '36px 28px', border: highlight ? 'none' : `1px solid rgba(0,0,0,0.09)`,
        display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box',
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: highlight ? AMBER : MUTED, marginBottom: 16, display: 'block' }}>{highlight ? 'Most popular' : 'Basic'}</span>
        <div style={{ marginBottom: 22 }}>
          <h3 style={{ fontSize: 26, fontWeight: 700, color: highlight ? CREAM : DARK, margin: '0 0 3px' }}>{plan}</h3>
          <p style={{ fontSize: 12, color: highlight ? 'rgba(236,230,212,0.45)' : MUTED, margin: 0 }}>{sub}</p>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {features.map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: highlight ? 'rgba(236,230,212,0.7)' : MID }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="7.5" cy="7.5" r="7" stroke={highlight ? 'rgba(196,155,42,0.4)' : 'rgba(0,0,0,0.12)'} />
                <path d="M4.5 7.8l2 2 4-4" stroke={highlight ? AMBER : DARK} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <div>
          <p style={{ fontSize: 11, color: highlight ? 'rgba(236,230,212,0.35)' : MUTED, margin: '0 0 3px' }}>Monthly price</p>
          <p style={{ fontSize: 30, fontWeight: 600, color: highlight ? CREAM : DARK, margin: '0 0 18px', letterSpacing: '-0.02em' }}>{price}</p>
          {highlight
            ? <BtnAmber href="#kontakt">I'm interested</BtnAmber>
            : <BtnOutline href="#kontakt">I'm interested</BtnOutline>}
        </div>
      </div>
    </FadeUp>
  )
}

function Pricing() {
  return (
    <section id="cenik" className="section-pad" style={{ background: CREAM, padding: '96px 0' }}>
      <div className="inner-pad" style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 28px' }}>
        <div className="pricing-outer" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          <div>
            <FadeLeft>
              <Eyebrow>Our pricing</Eyebrow>
              <h2 style={{ fontSize: 'clamp(28px,3.8vw,48px)', fontWeight: 600, letterSpacing: '-0.025em', color: DARK, lineHeight: 1.08, margin: '18px 0 18px' }}>
                Find the ideal path to your success.
              </h2>
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.75, maxWidth: 360, margin: 0 }}>
                Flexible packages focused on lead generation, effective marketing, and sales support. Find the solution that fits and helps your business grow.
              </p>
            </FadeLeft>
          </div>
          <div className="pricing-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <PricingCard plan="Standard" sub="For small and mid-size businesses" price="€139" features={standardFeatures} highlight={false} delay={0.1} />
            <PricingCard plan="Professional" sub="For growing businesses" price="€339" features={proFeatures} highlight={true} delay={0.17} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA + Contact ─── */
function FinalCTA() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '', consent: false })
  const [sent, setSent] = useState(false)
  const onChange = e => { const { name, value, type, checked } = e.target; setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value })) }
  const onSubmit = e => { e.preventDefault(); if (form.consent) setSent(true) }

  const inp = {
    width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)',
    border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 7,
    padding: '13px 15px', fontSize: 13, color: CREAM, outline: 'none',
    transition: 'border-color 0.2s', fontFamily: 'inherit',
  }
  const focus = e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }
  const blur  = e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }

  return (
    <section id="kontakt" style={{ position: 'relative', background: DARK, overflow: 'hidden', padding: '100px 0 100px' }}>
      <img src="/69de8592a5e5663d8b3aceae_home-hero-p-2000.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }} onError={e => { e.currentTarget.style.display = 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #141410 0%, rgba(20,20,16,0.7) 50%, #141410 100%)' }} />

      <div style={{ position: 'relative', maxWidth: '90rem', margin: '0 auto', padding: '0 28px' }}>
        <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* left: heading */}
          <FadeLeft>
            <Eyebrow light>Don't wait</Eyebrow>
            <h2 style={{ fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 600, color: CREAM, lineHeight: 1.04, letterSpacing: '-0.03em', margin: '20px 0 24px' }}>
              Transform your<br />business today!
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(236,230,212,0.5)', lineHeight: 1.7, margin: 0 }}>
              Don't wait — contact us and find out how Vintas can help your business reach the next level.
            </p>
          </FadeLeft>

          {/* right: form */}
          <FadeUp delay={0.15}>
            {sent ? (
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '36px 40px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                <p style={{ fontSize: 17, fontWeight: 600, color: CREAM, margin: '0 0 6px' }}>Message sent!</p>
                <p style={{ fontSize: 13, color: 'rgba(236,230,212,0.45)', margin: 0 }}>We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <input name="firstName" value={form.firstName} onChange={onChange} required placeholder="First name" style={inp} onFocus={focus} onBlur={blur} />
                  <input name="lastName" value={form.lastName} onChange={onChange} required placeholder="Last name" style={inp} onFocus={focus} onBlur={blur} />
                </div>
                <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="Email" style={{ ...inp, marginBottom: 10 }} onFocus={focus} onBlur={blur} />
                <input name="subject" value={form.subject} onChange={onChange} required placeholder="Subject" style={{ ...inp, marginBottom: 10 }} onFocus={focus} onBlur={blur} />
                <textarea name="message" value={form.message} onChange={onChange} required placeholder="Message" rows={4} style={{ ...inp, marginBottom: 14, resize: 'none' }} onFocus={focus} onBlur={blur} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 20 }}>
                  <input type="checkbox" id="consent" name="consent" checked={form.consent} onChange={onChange} required style={{ marginTop: 2, accentColor: AMBER, cursor: 'pointer' }} />
                  <label htmlFor="consent" style={{ fontSize: 12, color: 'rgba(236,230,212,0.4)', cursor: 'pointer', lineHeight: 1.55 }}>I consent to the processing of personal data</label>
                </div>
                <BtnAmber onClick={onSubmit}>Send message</BtnAmber>
              </form>
            )}
          </FadeUp>

        </div>
      </div>
    </section>
  )
}

function Contact() { return null }

/* ─── Footer ─── */
function Footer() {
  const cols = [
    { title: 'Services', links: [
      { label: 'Lead Generation', href: '#sluzby' },
      { label: 'Marketing', href: '#sluzby' },
      { label: 'Sales Support', href: '#sluzby' },
      { label: 'Business Growth', href: '#sluzby' },
      { label: 'Customer Engagement', href: '#sluzby' },
      { label: 'Digital Transformation', href: '#sluzby' },
    ]},
    { title: 'Navigation', links: [
      { label: 'About', href: '#o-nas' },
      { label: 'Services', href: '#sluzby' },
      { label: 'Pricing', href: '#cenik' },
      { label: 'Contact', href: '#kontakt' },
    ]},
  ]
  return (
    <footer style={{ background: '#0e0e0b', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '56px 28px 36px' }}>
        <div className="footer-cols" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 44 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
              <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
                <polygon points="13,2 24,8 24,18 13,24 2,18 2,8" stroke={CREAM} strokeWidth="1.8" fill="none"/>
                <polygon points="13,7 19,10.5 19,17.5 13,21 7,17.5 7,10.5" fill={CREAM} fillOpacity="0.2"/>
              </svg>
              <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: CREAM }}>Vintas</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', lineHeight: 1.65, maxWidth: 240, margin: 0 }}>
              Comprehensive growth solutions for your business. Lead generation, marketing and sales support.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 14px' }}>{col.title}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {col.links.map(l => (
                  <li key={l.label}><a href={l.href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = CREAM}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', margin: 0 }}>© 2025 Vintas. All rights reserved.</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)', margin: 0 }}>Made by Vintas</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── Cookie ─── */
function CookieBanner() {
  const [v, setV] = useState(true)
  if (!v) return null
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99, background: 'rgba(20,20,16,0.96)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>
          We use cookies to ensure you get the best experience. By continuing to browse, we assume you accept this.
        </p>
        <button onClick={() => setV(false)} style={{ background: AMBER, color: '#fff', border: 'none', borderRadius: 999, padding: '8px 20px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = AMBER2}
          onMouseLeave={e => e.currentTarget.style.background = AMBER}
        >Accept</button>
      </div>
    </div>
  )
}

/* ─── Root ─── */
export default function App() {
  const lenisRef = useRef(null)
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenisRef.current = lenis
    let rafId
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)

    function handleAnchor(e) {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenisRef.current.scrollTo(target, { offset: -80 })
    }
    document.addEventListener('click', handleAnchor)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.removeEventListener('click', handleAnchor)
    }
  }, [])
  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <Intro />
      <Services />
      <About />
      <Pricing />
      <FinalCTA />
      <Footer />
      <CookieBanner />
    </div>
  )
}

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 6.5h9M8 3l3.5 3.5L8 10"/>
  </svg>
)

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
  const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25,0,0,1] } } }

  return (
    <section ref={ref} id="hero" style={{
      minHeight: '100svh', display: 'grid', alignItems: 'end',
      paddingTop: 64, position: 'relative', overflow: 'hidden',
    }}>
      {/* Animated background glow */}
      <motion.div
        style={{ position: 'absolute', inset: 0, y }}
        aria-hidden
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 65% 55% at 72% 38%,rgba(200,51,42,.10) 0%,transparent 70%),
                       radial-gradient(ellipse 45% 45% at 8% 85%,rgba(200,51,42,.05) 0%,transparent 60%)`,
        }} />
        <div style={{
          position: 'absolute', top: '-15%', right: '-8%',
          width: '52%', height: '140%',
          background: 'var(--soot)',
          transform: 'skewX(-8deg)', transformOrigin: 'top right',
        }} />
        <div style={{
          position: 'absolute', top: 0,
          right: 'calc(48% + 2px)', width: 1, height: '42%',
          background: 'linear-gradient(to bottom,transparent,#C8332A 55%,transparent)',
          transform: 'skewX(-8deg)',
        }} />
      </motion.div>

      {/* Animated ember particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.6, 0], y: -120, x: (i % 2 === 0 ? 1 : -1) * 30 }}
          transition={{ duration: 3 + i * 0.7, delay: i * 1.1, repeat: Infinity, repeatDelay: 2 }}
          style={{
            position: 'absolute',
            left: `${15 + i * 12}%`,
            bottom: '12%',
            width: 3, height: 3,
            borderRadius: '50%',
            background: 'var(--ember)',
            filter: 'blur(1px)',
            zIndex: 1,
          }}
        />
      ))}

      <motion.div
        className="hero-inner"
        style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: 1300,
          marginInline: 'auto',
          paddingInline: 'clamp(16px, 4vw, 32px)',
          boxSizing: 'border-box',
          minWidth: 0,
          paddingBottom: 'clamp(56px,9vh,110px)',
          paddingTop: 'clamp(48px,8vh,72px)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 48,
          alignItems: 'end',
          opacity,
        }}
      >
        <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 740, minWidth: 0 }}>
          {/* Eye badge */}
          <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ember)' }}
            />
            <span style={{ fontFamily: 'var(--f-d)', fontSize: '.68rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--steel)' }}>
              Sydney Roofing Specialists
            </span>
          </motion.div>

          {/* Big headline */}
          <motion.h1 variants={item} style={{ fontFamily: 'var(--f-d)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 0.86, userSelect: 'none', marginBottom: 36 }}>
            <span style={{ fontSize: 'clamp(2.65rem, calc(0.5rem + 12vw), 12rem)', color: 'var(--white)', display: 'block', letterSpacing: '-.015em' }}>HARD</span>
            <motion.span
              style={{
                fontSize: 'clamp(2.65rem, calc(0.5rem + 12vw), 12rem)',
                WebkitTextStroke: '2px var(--ember)',
                color: 'transparent',
                display: 'block',
                letterSpacing: '-.015em',
              }}
              animate={{ WebkitTextStroke: ['2px #C8332A', '2px #e84a3f', '2px #C8332A'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >LINE</motion.span>
            <span style={{
              fontSize: 'clamp(1.15rem, calc(0.35rem + 3.2vw), 3.4rem)',
              color: 'var(--steel)', fontWeight: 300,
              letterSpacing: '.26em', display: 'block',
              marginTop: 14, borderTop: '1px solid rgba(255,255,255,.09)', paddingTop: 16,
            }}>
              ROO<b style={{ color: 'var(--ember)', fontWeight: 600 }}>FING</b>
            </span>
          </motion.h1>

          <motion.p variants={item} style={{
            fontSize: 'clamp(.88rem,1.4vw,1.02rem)', color: 'var(--steel)',
            lineHeight: 1.75, maxWidth: 450, marginBottom: 38,
          }}>
            Roof replacements, restorations, gutters, and cladding — delivered with precision.
            Because getting it right the first time isn't optional.
          </motion.p>

          <motion.div variants={item} style={{ display: 'flex', gap: 13, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#quote" style={{
              fontFamily: 'var(--f-d)', fontWeight: 600, fontSize: '.8rem',
              letterSpacing: '.13em', textTransform: 'uppercase',
              color: 'var(--white)', background: 'var(--ember)',
              textDecoration: 'none', padding: '14px 28px',
              display: 'inline-flex', alignItems: 'center', gap: 9,
              clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 100%,0 100%)',
              transition: 'background .2s, transform .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#a3271f'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--ember)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Get a Free Quote <ArrowRight />
            </a>
            <a href="tel:0450501000" style={{
              fontFamily: 'var(--f-d)', fontWeight: 500, fontSize: '.8rem',
              letterSpacing: '.13em', textTransform: 'uppercase',
              color: 'var(--steel)', textDecoration: 'none', padding: '13px 28px',
              display: 'inline-flex', alignItems: 'center', gap: 9,
              border: '1px solid rgba(255,255,255,.12)',
              clipPath: 'polygon(10px 0,100% 0,100% 100%,0 100%)',
              transition: 'color .2s, border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--chalk)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--steel)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; }}
            >
              📞 0450 501 000
            </a>
          </motion.div>
        </motion.div>

        {/* Aside info */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingBottom: 6, minWidth: 0, maxWidth: 240, alignSelf: 'end' }}
          className="hero-aside"
        >
          {[
            { label: 'Call Direct', value: '0450 501 000', href: 'tel:0450501000' },
            { label: 'Email', value: 'roofing@hardlineconstruction\naustralia.com', href: 'mailto:roofing@hardlineconstructionaustralia.com', small: true },
            { label: 'Based In', value: 'Sydney, NSW' },
          ].map(({ label, value, href, small }) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--f-d)', fontSize: '.58rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: 3 }}>{label}</div>
              {href
                ? <a href={href} style={{ fontFamily: 'var(--f-d)', fontSize: small ? '.72rem' : '.88rem', fontWeight: 500, color: 'var(--chalk)', textDecoration: 'none', lineHeight: 1.4, whiteSpace: 'pre-line', transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--ember)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--chalk)'}
                  >{value}</a>
                : <span style={{ fontFamily: 'var(--f-d)', fontSize: '.88rem', fontWeight: 500, color: 'var(--chalk)' }}>{value}</span>
              }
            </div>
          ))}
        </motion.aside>
      </motion.div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, zIndex: 2 }} aria-hidden>
        <span style={{ fontFamily: 'var(--f-d)', fontSize: '.56rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--steel)', writingMode: 'vertical-rl' }}>Scroll</span>
        <motion.div
          style={{ width: 1, height: 36, background: 'linear-gradient(to bottom,var(--ember),transparent)', transformOrigin: 'top' }}
          animate={{ scaleY: [0, 1, 1, 0], transformOrigin: ['top', 'top', 'bottom', 'bottom'] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <style>{`
        @media(max-width:980px){
          .hero-inner{grid-template-columns:1fr!important}
          .hero-aside{flex-direction:row!important;flex-wrap:wrap!important;gap:28px!important;max-width:100%!important}
        }
        @media(max-width:640px){
          .hero-aside{flex-direction:column!important;gap:12px!important}
        }
      `}</style>
    </section>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Logo = () => (
  <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
    <polygon points="0,16 14,2 28,16" fill="none" stroke="#C8332A" strokeWidth="1.8"/>
    <rect y="15" width="28" height="3" fill="#C8332A"/>
  </svg>
)

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const close = () => setOpen(false)

  const links = [
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#instagram', label: 'Work' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        height: 64, padding: '0 clamp(16px,4vw,60px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: '100%', minWidth: 0,
        background: scrolled ? 'rgba(16,14,12,.97)' : 'rgba(16,14,12,.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        transition: 'background .4s',
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', minWidth: 0, flexShrink: 1 }}>
          <Logo />
          <div style={{ fontFamily: 'var(--f-d)', fontWeight: 700, fontSize: 'clamp(.82rem, 3.2vw, 1.05rem)', letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 1.1 }}>
            HARDLINE<br /><span style={{ color: 'var(--ember)' }}>ROOFING</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: 32 }} className="nav-desktop">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                fontFamily: 'var(--f-d)', fontSize: '.76rem', fontWeight: 500,
                letterSpacing: '.15em', textTransform: 'uppercase',
                color: 'var(--steel)', textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--chalk)'}
              onMouseLeave={e => e.target.style.color = 'var(--steel)'}
              >{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#quote" style={{
              fontFamily: 'var(--f-d)', fontSize: '.76rem', fontWeight: 600,
              letterSpacing: '.15em', textTransform: 'uppercase',
              color: 'var(--white)', background: 'var(--ember)',
              textDecoration: 'none', padding: '9px 20px',
              clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 100%,0 100%)',
              transition: 'background .2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => e.target.style.background = '#a3271f'}
            onMouseLeave={e => e.target.style.background = 'var(--ember)'}
            >Free Quote</a>
          </li>
        </ul>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}
          className="nav-burger"
        >
          <motion.span animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: 22, height: 1.5, background: 'var(--chalk)', originX: 0.5 }} />
          <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} style={{ display: 'block', width: 22, height: 1.5, background: 'var(--chalk)' }} />
          <motion.span animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: 22, height: 1.5, background: 'var(--chalk)', originX: 0.5 }} />
        </button>
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0,
              background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,.07)',
              zIndex: 499, padding: '20px clamp(20px,5vw,60px) 28px',
              display: 'flex', flexDirection: 'column', gap: 0,
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={close}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  fontFamily: 'var(--f-d)', fontWeight: 600, fontSize: '1.35rem',
                  letterSpacing: '.04em', textTransform: 'uppercase',
                  color: 'var(--steel)', textDecoration: 'none',
                  padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,.05)',
                }}
              >{l.label}</motion.a>
            ))}
            <motion.a
              href="#quote"
              onClick={close}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 }}
              style={{
                fontFamily: 'var(--f-d)', fontWeight: 600, fontSize: '1.1rem',
                letterSpacing: '.04em', textTransform: 'uppercase',
                color: 'var(--ember)', textDecoration: 'none', marginTop: 8,
              }}
            >Get a Free Quote →</motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:640px){
          .nav-desktop{display:none!important}
          .nav-burger{display:flex!important}
        }
      `}</style>
    </>
  )
}

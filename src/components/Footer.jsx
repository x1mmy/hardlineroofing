import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <footer ref={ref} style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,.06)', padding: 'clamp(44px,6vw,72px) 0 28px' }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 'clamp(32px,5vw,72px)', paddingBottom: 'clamp(32px,4vw,52px)', borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: 24 }}
          className="ft-grid"
        >
          <div>
            <div style={{ fontFamily: 'var(--f-d)', fontWeight: 700, textTransform: 'uppercase', fontSize: '1.5rem', lineHeight: .95, color: 'var(--white)', marginBottom: 3 }}>
              HARD<span style={{ WebkitTextStroke: '1px var(--ember)', color: 'transparent' }}>LINE</span><br/>ROOFING
            </div>
            <div style={{ fontFamily: 'var(--f-d)', fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--ember)', marginBottom: 14 }}>Hard Made Easy.</div>
            <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: '#3E3A36', maxWidth: 280 }}>Sydney's roofing specialists — replacements, restorations, gutters, cladding. Built to last, done right the first time.</p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--f-d)', fontSize: '.63rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: 14 }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {['Roof Replacement','Roof Repair','Gutter Installation & Repair','Roof Cleaning & Painting','Asbestos Roof Removal'].map(s => (
                <li key={s}><a href="#services" style={{ fontSize: '.84rem', color: '#3E3A36', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--ember)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#3E3A36'}
                >{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--f-d)', fontSize: '.63rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: 14 }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                { label: '📞 0450 501 000', href: 'tel:0450501000' },
                { label: '📧 Email Us', href: 'mailto:roofing@hardlineconstructionaustralia.com' },
                { label: '📸 Instagram', href: 'https://www.instagram.com/thebeardedathlete_/' },
                { label: 'Get a Free Quote →', href: '#quote' },
              ].map(({ label, href }) => (
                <li key={label}><a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontSize: '.84rem', color: '#3E3A36', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--ember)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#3E3A36'}
                >{label}</a></li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.74rem', color: '#2E2A26', flexWrap: 'wrap', gap: 6 }} className="ft-bot">
          <span>© 2026 Hardline Construction Pty Ltd.</span>
          <span>Sydney, NSW · Licensed Roofing Contractors</span>
        </div>
      </div>
      <style>{`
        @media(max-width:980px){.ft-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:640px){.ft-grid{grid-template-columns:1fr!important} .ft-bot{flex-direction:column;align-items:flex-start!important}}
      `}</style>
    </footer>
  )
}

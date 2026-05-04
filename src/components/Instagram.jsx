import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const IG_URL = 'https://www.instagram.com/hardlineroofingptyltd/'

export default function Instagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (inView && window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [inView])

  return (
    <section id="instagram" ref={ref} style={{ background: 'var(--soot)', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }} className="ig-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.25,0,0,1] }}
          >
            <div style={{ fontFamily: 'var(--f-d)', fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--ember)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--ember)' }} />
              Latest Work
            </div>
            <h2 style={{ fontFamily: 'var(--f-d)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(1.9rem,4.5vw,3.3rem)', lineHeight: .92, color: 'var(--white)', marginBottom: 18 }}>
              FOLLOW<br/>THE BUILD
            </h2>
            <p style={{ fontSize: '.92rem', lineHeight: 1.75, color: 'var(--steel)', marginBottom: 26 }}>
              See projects as they happen — before and afters, in-progress shots, and real results from across Sydney and beyond.
            </p>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--f-d)', fontWeight: 600, fontSize: '.92rem', letterSpacing: '.05em',
                color: 'var(--chalk)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9,
                borderBottom: '1px solid rgba(200,51,42,.4)', paddingBottom: 5, transition: 'color .2s, border-color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--ember)'; e.currentTarget.style.borderBottomColor = 'var(--ember)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--chalk)'; e.currentTarget.style.borderBottomColor = 'rgba(200,51,42,.4)'; }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @hardlineroofingptyltd
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.25,0,0,1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/reel/DWdMsccE5F0/?utm_source=ig_embed&utm_campaign=loading"
              data-instgrm-version="14"
              style={{
                background: '#FFF', border: 0, borderRadius: 3,
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: 1, maxWidth: 460, minWidth: 0, padding: 0,
                width: '100%',
              }}
            >
              <div style={{ padding: 16 }}>
                <a href="https://www.instagram.com/reel/DWdMsccE5F0/?utm_source=ig_embed&utm_campaign=loading" target="_blank" rel="noopener noreferrer" style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: 14, lineHeight: '18px', textDecoration: 'none' }}>View this post on Instagram</a>
              </div>
            </blockquote>
            <script async src="//www.instagram.com/embed.js" />
          </motion.div>
        </div>
      </div>
      <style>{`
        @media(max-width:980px){ .ig-grid{grid-template-columns:1fr!important} }
      `}</style>
    </section>
  )
}

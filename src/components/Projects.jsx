import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  { n: '01', loc: 'Roselands, NSW', title: 'Roof Restoration — Dulux Paint System', desc: 'A full roof restoration using Dulux paint — the highest quality in the industry. 2+ days on-site to ensure a flawless, lasting finish. Boosted curb appeal and sealed against future damage.', tags: ['Roof Restoration','Dulux Paint','Residential'] },
  { n: '02', loc: 'Sydney, NSW', title: 'Ridge Cap Rebedding, Wash & Repaint', desc: 'Rebedded and repointed all ridge caps, pressure washed the full roof including the Colorbond extension, repainted, and repaired all leak areas around the skylight. Completely watertight.', tags: ['Ridge Caps','Pressure Wash','Painting','Leak Repair'] },
  { n: '03', loc: 'Cottage Green, NSW', title: 'Gutter & Gutter Guard — 1-Day Install', desc: 'A 5-man team completed a full gutter and gutter guard installation in a single day. We also slid back the first three rows of tiles and repointed all ridge caps — because a proper job means every detail is right.', tags: ['Gutter Install','Gutter Guard','Ridge Cap Repoint'] },
  { n: '04', loc: 'Sydney, NSW', title: 'Balcony Leaks — Klip-Lok Replacement', desc: 'Persistent balcony leaks. After inspection, the right long-term fix was a full sheeting replacement. Dover White Klip-Lok sheets to reflect summer heat, Monument flashings around the parapets to match the existing roofline.', tags: ['Klip-Lok','Dover White','Monument Flashings'] },
  { n: '05', loc: 'Sydney, NSW', title: 'Tile to Colorbond — Full Roof Upgrade', desc: 'Full removal of old concrete tiles. New frame adjustments, top hats, roofing blanket, 0.48 BMT Colorbond corrugated, Colorbond fascia, Monument gutters, upgraded 100×75 downpipes, and 3 whirlybirds.', tags: ['Tile to Colorbond','0.48 BMT','Monument Gutters','3× Whirlybirds'] },
  { n: '06', loc: 'Newcastle, NSW', title: 'V25 Cladding — Master Builders Building', desc: 'Called up from Sydney for a 3-day push on the new Master Builders Apprentice building. V25 cladding in weathered iron — every corner aligned, every line clean, every detail symmetrical.', tags: ['V25 Cladding','Weathered Iron','Commercial'] },
  { n: '07', loc: 'Ashfield, NSW', title: 'Kliplok System Over New Steel Frame', desc: 'Full Kliplok system installed over a new steel frame as part of a complete home renovation. 0.48 BMT sheeting throughout — thicker, stronger, premium. Plus 3 glass skylights with all required flashings.', tags: ['Kliplok','0.48 BMT','3× Glass Skylights','Steel Frame'] },
]

function ProjectCard({ p, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.25,0,0,1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 'clamp(280px,36vw,500px)',
        background: 'var(--soot)',
        borderTop: `3px solid ${hovered ? 'var(--ember)' : 'rgba(255,255,255,.05)'}`,
        padding: '32px 28px 36px',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color .3s',
      }}
    >
      <div style={{ color: '#C8332A', position: 'absolute', bottom: -8, right: 10, fontFamily: 'var(--f-d)', fontWeight: 700, fontSize: '7rem', opacity: 0.03, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>{p.n}</div>
      <div style={{ fontFamily: 'var(--f-d)', fontSize: '.63rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--ember)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ fontSize: '.5rem' }}>▸</span>{p.loc}
      </div>
      <h3 style={{ fontFamily: 'var(--f-d)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(1rem,2.3vw,1.45rem)', lineHeight: 1.05, color: 'var(--white)', marginBottom: 14 }}>{p.title}</h3>
      <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--steel)', marginBottom: 20 }}>{p.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {p.tags.map(t => (
          <span key={t} style={{ fontFamily: 'var(--f-d)', fontSize: '.58rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ember)', border: '1px solid rgba(200,51,42,.3)', padding: '3px 9px' }}>{t}</span>
        ))}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })
  const scrollRef = useRef(null)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startLeft = useRef(0)

  const onMouseDown = e => {
    dragging.current = true
    scrollRef.current.style.cursor = 'grabbing'
    startX.current = e.pageX - scrollRef.current.offsetLeft
    startLeft.current = scrollRef.current.scrollLeft
  }
  const onMouseUp = () => { dragging.current = false; if (scrollRef.current) scrollRef.current.style.cursor = 'grab' }
  const onMouseMove = e => {
    if (!dragging.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    scrollRef.current.scrollLeft = startLeft.current - (x - startX.current) * 1.2
  }

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    return () => document.removeEventListener('mouseup', onMouseUp)
  }, [])

  return (
    <section id="projects" style={{ background: 'var(--ink)', paddingBottom: 0 }}>
      <div className="wrap">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}
        >
          <div>
            <div style={{ fontFamily: 'var(--f-d)', fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--ember)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--ember)' }} />Recent Projects
            </div>
            <h2 style={{ fontFamily: 'var(--f-d)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(1.9rem,4.5vw,3.3rem)', lineHeight: .92, color: 'var(--white)' }}>
              THE WORK<br/>SPEAKS.
            </h2>
          </div>
          <a href="#quote" style={{
            fontFamily: 'var(--f-d)', fontWeight: 600, fontSize: '.8rem', letterSpacing: '.13em', textTransform: 'uppercase',
            color: 'var(--white)', background: 'var(--ember)', textDecoration: 'none', padding: '14px 28px',
            display: 'inline-flex', alignItems: 'center', gap: 9, alignSelf: 'flex-end',
            clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 100%,0 100%)', transition: 'background .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#a3271f'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--ember)'}
          >Start Your Project →</a>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontFamily: 'var(--f-d)', fontSize: '.63rem', fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--steel)' }}>
          <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.06)' }} />
          Drag to explore all projects
          <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.06)' }} />
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        style={{
          overflowX: 'auto', WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none', marginBottom: 'clamp(60px,8vw,110px)',
          cursor: 'grab', paddingBottom: 4,
        }}
      >
        <div style={{
          display: 'flex', gap: 2, width: 'max-content',
          paddingLeft: 'clamp(20px,4vw,54px)', paddingRight: 'clamp(20px,4vw,54px)',
        }}>
          {projects.map((p, i) => <ProjectCard key={p.n} p={p} index={i} />)}
        </div>
        <style>{`.pscroll::-webkit-scrollbar{display:none}`}</style>
      </div>
    </section>
  )
}

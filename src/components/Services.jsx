import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  { n: '01', name: 'Roof Replacement', desc: 'Full tear-off and new install. Colorbond corrugated, Kliplok, and metal sheeting — we recommend 0.48 BMT as standard for maximum durability.' },
  { n: '02', name: 'Roof Repair', desc: 'Leaks, loose screws, rust, damaged panels, failed ridge caps. We find the cause and fix it — not just the symptom.' },
  { n: '03', name: 'Gutter Installation & Repair', desc: 'New gutter systems, gutter guards, repairs. We often repoint ridge caps and slide back tiles as part of a complete job — because the details matter.' },
  { n: '04', name: 'Roof Cleaning & Painting', desc: 'Pressure washing, rebedding, and professional roof painting using Dulux — the highest quality in the industry. We dedicate 2+ days to every restoration for a flawless finish.' },
  { n: '05', name: 'Asbestos Roof Removal', desc: "Safe, licensed removal following all NSW regulations. Don't risk it — let the specialists handle it properly." },
]

function ServiceRow({ s, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25,0,0,1] }}
      className="svc-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '64px 1fr 28px',
        alignItems: 'center',
        gap: 20,
        padding: '26px 0',
        borderBottom: '1px solid rgba(255,255,255,.07)',
        position: 'relative',
        cursor: 'default',
        minWidth: 0,
      }}
    >
      <span style={{ fontFamily: 'var(--f-d)', fontSize: '.65rem', fontWeight: 400, letterSpacing: '.1em', color: 'var(--steel)' }}>{s.n}</span>
      <div style={{ minWidth: 0 }}>
        <div className="svc-nm" style={{
          fontFamily: 'var(--f-d)', fontWeight: 700,
          fontSize: 'clamp(1.1rem,2.8vw,1.9rem)', textTransform: 'uppercase',
          letterSpacing: '.02em', color: 'var(--chalk)', marginBottom: 4,
          transition: 'color .2s',
        }}>{s.name}</div>
        <p style={{ fontSize: '.84rem', color: 'var(--steel)', lineHeight: 1.55, maxWidth: 500 }}>{s.desc}</p>
      </div>
      <span className="svc-ar" style={{ fontSize: '1.1rem', color: 'rgba(200,51,42,.4)', transition: 'transform .25s, color .25s' }}>→</span>
      <style>{`
        .svc-row:hover .svc-nm{color:var(--white)!important}
        .svc-row:hover .svc-ar{transform:translateX(5px);color:var(--ember)!important}
        .svc-row::before{content:'';position:absolute;inset:0;background:rgba(200,51,42,.04);opacity:0;transition:opacity .25s;pointer-events:none}
        .svc-row:hover::before{opacity:1}
        @media(max-width:640px){.svc-row{grid-template-columns:44px 1fr 22px!important;gap:10px!important}}
      `}</style>
    </motion.div>
  )
}

export default function Services() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="services" style={{ background: 'var(--soot)', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div className="wrap">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', gap: 24,
            marginBottom: 'clamp(32px,5vw,56px)', flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--f-d)', fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--ember)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--ember)' }} />
              What We Do
            </div>
            <h2 style={{ fontFamily: 'var(--f-d)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(1.9rem,4.5vw,3.3rem)', lineHeight: .92, color: 'var(--white)' }}>
              ROOFING,<br/>DONE RIGHT
            </h2>
          </div>
          <p style={{ fontSize: '.9rem', color: 'var(--steel)', lineHeight: 1.7, maxWidth: 320, alignSelf: 'flex-end' }}>
            From a single repair to a full replacement — we handle the complete scope, no subcontracting.
          </p>
        </motion.div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
          {services.map((s, i) => <ServiceRow key={s.n} s={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}

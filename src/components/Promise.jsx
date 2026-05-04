import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pills = [
  { icon: '🛡️', title: 'Licensed & Insured', desc: "Fully licensed under NSW regulations. You're protected from day one." },
  { icon: '🎯', title: 'Precision Every Time', desc: "Every flashing, screw, and ridge cap done right. We don't rush the details." },
  { icon: '💎', title: 'Premium Materials', desc: 'We recommend 0.48 BMT sheeting as standard. Dulux paint. Quality throughout.' },
  { icon: '⚡', title: 'Fast & Reliable', desc: 'We get back to you quickly. Urgent jobs are treated as urgent.' },
]

export default function Promise() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="promise" ref={ref} style={{ background: 'var(--ember)', padding: 'clamp(56px,8vw,100px) 0' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }} className="prom-grid">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.25,0,0,1] }}
          >
            <div style={{ fontFamily: 'var(--f-d)', fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'rgba(255,255,255,.55)' }} />
              Our Promise
            </div>
            <h2 style={{ fontFamily: 'var(--f-d)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(2rem,5vw,4rem)', lineHeight: .88, color: 'var(--white)', marginBottom: 22 }}>
              HARD<br/>
              <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,.45)', color: 'transparent' }}>MADE</span><br/>
              EASY.
            </h2>
            <p style={{ fontSize: '.92rem', lineHeight: 1.75, color: 'rgba(255,255,255,.6)' }}>
              We're a new company built on a simple promise: do the job properly, treat people with respect, and leave every site better than we found it. No shortcuts. No excuses. Hard Made Easy.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {pills.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.25,0,0,1] }}
                style={{ background: 'rgba(0,0,0,.15)', padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: 14, transition: 'background .2s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,.27)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,.15)'}
              >
                <span style={{ fontSize: '1rem', marginTop: 2, flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--f-d)', fontWeight: 600, fontSize: '.9rem', letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: 3 }}>{p.title}</h4>
                  <p style={{ fontSize: '.8rem', lineHeight: 1.6, color: 'rgba(255,255,255,.6)' }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:980px){.prom-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

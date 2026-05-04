import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 100, suffix: '+', label: 'Projects Completed' },
  { value: 7, suffix: '', label: 'Service Types' },
  { value: 0.48, suffix: ' BMT', label: 'Standard Sheeting' },
  { value: 1, suffix: ' Day', label: 'Quote Turnaround' },
]

function CountUp({ to, suffix, inView }) {
  const [val, setVal] = useState(0)
  const isFloat = !Number.isInteger(to)

  useEffect(() => {
    if (!inView) return
    let start = null
    const duration = 1600
    const step = timestamp => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(isFloat ? parseFloat((eased * to).toFixed(2)) : Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to])

  return <span>{val}{suffix}</span>
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} style={{
      background: 'var(--charcoal)',
      borderTop: '1px solid rgba(255,255,255,.05)',
      borderBottom: '1px solid rgba(255,255,255,.05)',
      padding: '28px 0',
    }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(16px,3vw,40px)', minWidth: 0 }} className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ textAlign: 'center', padding: '8px 0' }}
            >
              <div style={{ fontFamily: 'var(--f-d)', fontWeight: 700, fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', color: 'var(--ember)', lineHeight: 1, marginBottom: 6 }}>
                <CountUp to={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div style={{ fontFamily: 'var(--f-d)', fontSize: '.6rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--steel)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </div>
  )
}

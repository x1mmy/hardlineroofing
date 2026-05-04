import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const STEPS = 5

const serviceOptions = ['Roof Replacement','Roof Repair','Gutter Installation or Repair','Roof Cleaning & Painting','Asbestos Roof Removal','Not sure — help me decide']
const damageOptions = ['Leaks','Rust or Corrosion','Loose or Missing Screws','Damaged or Missing Panels','No damage — just ready for an upgrade']
const timelineOptions = ['ASAP (within a week)','Within a month','Planning ahead (3+ months)']
const propertyOptions = ['Residential','Commercial','Other']

function Radio({ name, value, options, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {options.map(opt => (
        <label key={opt} style={{
          display: 'flex', alignItems: 'center', gap: 11,
          padding: '10px 13px',
          background: value === opt ? 'rgba(200,51,42,.07)' : 'rgba(255,255,255,.03)',
          border: `1px solid ${value === opt ? 'rgba(200,51,42,.35)' : 'rgba(255,255,255,.07)'}`,
          cursor: 'pointer', transition: 'background .2s, border-color .2s',
        }}>
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            style={{
              appearance: 'none', WebkitAppearance: 'none',
              width: 16, height: 16, borderRadius: '50%',
              border: `1.5px solid ${value === opt ? 'var(--ember)' : 'rgba(255,255,255,.2)'}`,
              background: value === opt ? 'var(--ember)' : 'transparent',
              boxShadow: value === opt ? 'inset 0 0 0 3px var(--charcoal)' : 'none',
              flexShrink: 0, cursor: 'pointer', transition: 'all .2s',
            }}
          />
          <span style={{ fontSize: '.86rem', color: value === opt ? 'var(--chalk)' : '#aaa' }}>{opt}</span>
        </label>
      ))}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontFamily: 'var(--f-d)', fontSize: '.6rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,.04)',
  border: '1px solid rgba(255,255,255,.08)', color: 'var(--chalk)',
  fontFamily: 'var(--f-b)', fontSize: '.9rem', padding: '10px 13px',
  outline: 'none', borderRadius: 0, WebkitAppearance: 'none',
  transition: 'border-color .2s',
}

export default function QuoteForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', propertyType: '',
    service: '', damage: '', timeline: '', size: '', budget: '', date: '', time: '', notes: '',
  })

  const set = key => val => setForm(f => ({ ...f, [key]: val }))
  const setInput = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const next = () => {
    if (step === 1 && (!form.name.trim() || !form.phone.trim() || !form.email.trim())) {
      alert('Please fill in your name, phone and email.')
      return
    }
    setStep(s => Math.min(s + 1, STEPS))
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const back = () => {
    setStep(s => Math.max(s - 1, 1))
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const submit = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScu_VMblAPhFcJUfZkB7mLvP-VQL2mjR1LfYktscsbqemm37Q/viewform', '_blank')
    setDone(true)
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const btnStyle = (primary = true) => ({
    flex: primary ? 1 : 'none',
    fontFamily: 'var(--f-d)', fontWeight: primary ? 600 : 500,
    fontSize: '.78rem', letterSpacing: '.13em', textTransform: 'uppercase',
    color: 'var(--white)', cursor: 'pointer',
    background: primary ? 'var(--ember)' : 'transparent',
    border: primary ? 'none' : '1px solid rgba(255,255,255,.1)',
    padding: '12px 18px',
    clipPath: primary ? 'polygon(0 0,calc(100% - 8px) 0,100% 100%,0 100%)' : 'polygon(8px 0,100% 0,100% 100%,0 100%)',
    transition: 'background .2s, color .2s',
  })

  return (
    <section id="quote" ref={ref} style={{ background: 'var(--soot)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'start' }} className="q-grid">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{ fontFamily: 'var(--f-d)', fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--ember)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--ember)' }} />
              Free Quote
            </div>
            <h2 style={{ fontFamily: 'var(--f-d)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(1.9rem,4.5vw,3.3rem)', lineHeight: .92, color: 'var(--white)', marginBottom: 14 }}>
              GET YOUR<br/>ROOF SORTED
            </h2>
            <p style={{ fontSize: '.9rem', lineHeight: 1.75, color: 'var(--steel)', marginBottom: 36 }}>
              Fill out the form and we'll get back to you within one business day — no obligation, straight answers, fair pricing.
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
              {[
                { icon: '📞', text: '0450 501 000', href: 'tel:0450501000' },
                { icon: '📧', text: 'roofing@hardlineconstructionaustralia.com', href: 'mailto:roofing@hardlineconstructionaustralia.com' },
                { icon: '📍', text: 'Sydney, NSW — All Suburbs' },
                { icon: '📸', text: '@thebeardedathlete_ on Instagram', href: 'https://www.instagram.com/thebeardedathlete_/' },
              ].map(({ icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                  <div style={{ width: 30, height: 30, border: '1px solid rgba(200,51,42,.3)', background: 'rgba(200,51,42,.08)', display: 'grid', placeItems: 'center', fontSize: '.8rem', flexShrink: 0 }}>{icon}</div>
                  {href
                    ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontSize: '.86rem', color: 'var(--chalk)', textDecoration: 'none', transition: 'color .2s', wordBreak: 'break-word' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--ember)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--chalk)'}
                      >{text}</a>
                    : <span style={{ fontSize: '.86rem', color: 'var(--chalk)' }}>{text}</span>
                  }
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ background: 'var(--charcoal)', borderTop: '3px solid var(--ember)', padding: 'clamp(24px,4vw,44px)' }}
          >
            {/* Progress bar */}
            {!done && (
              <div style={{ display: 'flex', gap: 3, marginBottom: 28 }}>
                {[...Array(STEPS)].map((_, i) => (
                  <div key={i} style={{ height: 2, flex: 1, background: i < step ? 'var(--ember)' : 'rgba(255,255,255,.08)', transition: 'background .4s' }} />
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '44px 0' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                    style={{ width: 52, height: 52, background: 'var(--ember)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '1.3rem', margin: '0 auto 18px' }}
                  >✓</motion.div>
                  <h3 style={{ fontFamily: 'var(--f-d)', fontWeight: 700, fontSize: '1.7rem', textTransform: 'uppercase', color: 'var(--white)', marginBottom: 8 }}>You're all set</h3>
                  <p style={{ fontSize: '.86rem', color: 'var(--steel)', lineHeight: 1.7 }}>
                    We'll review your details and be in touch within one business day.<br/>
                    Need to talk now? Call <strong style={{ color: 'var(--chalk)' }}>0450 501 000</strong>.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <div style={{ fontFamily: 'var(--f-d)', fontSize: '.6rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--ember)', marginBottom: 5 }}>Step {step} of {STEPS}</div>

                  {step === 1 && (
                    <>
                      <div style={{ fontFamily: 'var(--f-d)', fontWeight: 600, textTransform: 'uppercase', fontSize: '1.2rem', color: 'var(--white)', marginBottom: 24, letterSpacing: '.03em' }}>Let's Get to Know You</div>
                      <Field label="Your Name *"><input style={inputStyle} value={form.name} onChange={setInput('name')} placeholder="John Smith" onFocus={e => e.target.style.borderColor='var(--ember)'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,.08)'} /></Field>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="qrow">
                        <Field label="Phone *"><input style={inputStyle} type="tel" value={form.phone} onChange={setInput('phone')} placeholder="04XX XXX XXX" onFocus={e => e.target.style.borderColor='var(--ember)'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,.08)'} /></Field>
                        <Field label="Email *"><input style={inputStyle} type="email" value={form.email} onChange={setInput('email')} placeholder="you@email.com" onFocus={e => e.target.style.borderColor='var(--ember)'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,.08)'} /></Field>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div style={{ fontFamily: 'var(--f-d)', fontWeight: 600, textTransform: 'uppercase', fontSize: '1.2rem', color: 'var(--white)', marginBottom: 24, letterSpacing: '.03em' }}>Where's the Job?</div>
                      <Field label="Property Address"><input style={inputStyle} value={form.address} onChange={setInput('address')} placeholder="123 Street, Suburb NSW" onFocus={e => e.target.style.borderColor='var(--ember)'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,.08)'} /></Field>
                      <Field label="Property Type"><Radio name="pt" value={form.propertyType} options={propertyOptions} onChange={set('propertyType')} /></Field>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div style={{ fontFamily: 'var(--f-d)', fontWeight: 600, textTransform: 'uppercase', fontSize: '1.2rem', color: 'var(--white)', marginBottom: 24, letterSpacing: '.03em' }}>What Do You Need?</div>
                      <Field label="Service Required"><Radio name="sv" value={form.service} options={serviceOptions} onChange={set('service')} /></Field>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <div style={{ fontFamily: 'var(--f-d)', fontWeight: 600, textTransform: 'uppercase', fontSize: '1.2rem', color: 'var(--white)', marginBottom: 24, letterSpacing: '.03em' }}>Tell Us About the Roof</div>
                      <Field label="Current Damage?"><Radio name="dm" value={form.damage} options={damageOptions} onChange={set('damage')} /></Field>
                      <Field label="How Soon?"><Radio name="tl" value={form.timeline} options={timelineOptions} onChange={set('timeline')} /></Field>
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <div style={{ fontFamily: 'var(--f-d)', fontWeight: 600, textTransform: 'uppercase', fontSize: '1.2rem', color: 'var(--white)', marginBottom: 24, letterSpacing: '.03em' }}>Almost Done</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="qrow">
                        <Field label="Roof Size (approx)"><input style={inputStyle} value={form.size} onChange={setInput('size')} placeholder="e.g. 200 m²" onFocus={e => e.target.style.borderColor='var(--ember)'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,.08)'} /></Field>
                        <Field label="Budget in Mind?"><input style={inputStyle} value={form.budget} onChange={setInput('budget')} placeholder="e.g. $10–15k" onFocus={e => e.target.style.borderColor='var(--ember)'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,.08)'} /></Field>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="qrow">
                        <Field label="Preferred Date"><input style={{ ...inputStyle, colorScheme: 'dark' }} type="date" value={form.date} onChange={setInput('date')} onFocus={e => e.target.style.borderColor='var(--ember)'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,.08)'} /></Field>
                        <Field label="Preferred Time"><input style={{ ...inputStyle, colorScheme: 'dark' }} type="time" value={form.time} onChange={setInput('time')} onFocus={e => e.target.style.borderColor='var(--ember)'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,.08)'} /></Field>
                      </div>
                      <Field label="Anything Else?">
                        <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 85 }} value={form.notes} onChange={setInput('notes')} placeholder="Any extra details..." onFocus={e => e.target.style.borderColor='var(--ember)'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,.08)'} />
                      </Field>
                    </>
                  )}

                  <div style={{ display: 'flex', gap: 9, marginTop: 24 }}>
                    {step > 1 && (
                      <button onClick={back} style={btnStyle(false)}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--chalk)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; }}
                      >← Back</button>
                    )}
                    {step < STEPS
                      ? <button onClick={next} style={btnStyle(true)}
                          onMouseEnter={e => e.currentTarget.style.background = '#a3271f'}
                          onMouseLeave={e => e.currentTarget.style.background = 'var(--ember)'}
                        >{step === 1 ? 'Next: Your Property →' : step === 2 ? 'Next: Service →' : step === 3 ? 'Next: Roof Condition →' : 'Last Step →'}</button>
                      : <button onClick={submit} style={{ ...btnStyle(true), clipPath: 'none' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#a3271f'}
                          onMouseLeave={e => e.currentTarget.style.background = 'var(--ember)'}
                        >Submit Quote Request</button>
                    }
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media(max-width:980px){.q-grid{grid-template-columns:1fr!important}}
        @media(max-width:640px){.qrow{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}

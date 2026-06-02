import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, ChevronLeft } from 'lucide-react'
import Button from '../ui/Button'

const artists = ['Marcus Webb', 'Zara Chen', 'Kai Williams']
const services = ['Precision Cut', 'Braiding', 'Colour', 'Dreadlocks', 'Grooming', 'Consultation']
const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']

const steps = ['Artist', 'Service', 'Date', 'Time', 'Confirm']

export default function BookingSection() {
  const [step, setStep] = useState(0)
  const [booking, setBooking] = useState({ artist: '', service: '', date: '', time: '' })
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const canProceed = () => {
    if (step === 0) return booking.artist !== ''
    if (step === 1) return booking.service !== ''
    if (step === 2) return booking.date !== ''
    if (step === 3) return booking.time !== ''
    return true
  }

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  }

  // Generate next 14 dates
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return {
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
    }
  })

  const optionStyle = (isSelected: boolean): React.CSSProperties => ({
    padding: 'var(--space-2) var(--space-3)',
    border: `1px solid ${isSelected ? 'var(--color-gold)' : 'var(--color-border)'}`,
    backgroundColor: isSelected ? 'rgba(212, 168, 92, 0.08)' : 'transparent',
    color: isSelected ? 'var(--color-gold)' : 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    transition: 'all var(--duration-fast) var(--ease-luxury)',
    textAlign: 'center' as const,
  })

  return (
    <section id="booking" ref={sectionRef} style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-bg)' }}>
      <div style={{
        maxWidth: '700px', margin: '0 auto', padding: '0 var(--space-4)',
        opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s var(--ease-luxury)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.2em',
            textTransform: 'uppercase' as const, color: 'var(--color-gold)', display: 'block',
            marginBottom: 'var(--space-2)',
          }}>Reserve</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--color-heading)' }}>
            Book Your Visit
          </h2>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
            {steps.map((s, i) => (
              <span key={s} style={{
                fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: i <= step ? 'var(--color-gold)' : 'var(--color-text-muted)',
                transition: 'color var(--duration-fast) ease',
              }}>{s}</span>
            ))}
          </div>
          <div style={{ height: '2px', backgroundColor: 'var(--color-border)', position: 'relative' }}>
            <div style={{
              height: '100%', backgroundColor: 'var(--color-gold)',
              width: `${((step) / (steps.length - 1)) * 100}%`,
              transition: 'width var(--duration-base) var(--ease-luxury)',
            }} />
          </div>
        </div>

        {/* Step Content */}
        <div style={{
          backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)',
          padding: 'var(--space-6)', minHeight: '300px', position: 'relative', overflow: 'hidden',
        }}>
          <AnimatePresence mode="wait">
            <motion.div key={step} variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>

              {step === 0 && (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sub)', fontSize: '22px', color: 'var(--color-heading)', marginBottom: 'var(--space-4)', fontWeight: 400 }}>
                    Choose Your Artist
                  </h4>
                  <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
                    {artists.map(a => (
                      <button key={a} onClick={() => setBooking({ ...booking, artist: a })}
                        style={optionStyle(booking.artist === a)}
                        onMouseEnter={e => { if (booking.artist !== a) e.currentTarget.style.borderColor = 'var(--color-text-muted)' }}
                        onMouseLeave={e => { if (booking.artist !== a) e.currentTarget.style.borderColor = 'var(--color-border)' }}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sub)', fontSize: '22px', color: 'var(--color-heading)', marginBottom: 'var(--space-4)', fontWeight: 400 }}>
                    Select a Service
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                    {services.map(s => (
                      <button key={s} onClick={() => setBooking({ ...booking, service: s })}
                        style={optionStyle(booking.service === s)}
                        onMouseEnter={e => { if (booking.service !== s) e.currentTarget.style.borderColor = 'var(--color-text-muted)' }}
                        onMouseLeave={e => { if (booking.service !== s) e.currentTarget.style.borderColor = 'var(--color-border)' }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sub)', fontSize: '22px', color: 'var(--color-heading)', marginBottom: 'var(--space-4)', fontWeight: 400 }}>
                    Pick a Date
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'var(--space-2)' }}>
                    {dates.map(d => (
                      <button key={d.value} onClick={() => setBooking({ ...booking, date: d.value })}
                        style={optionStyle(booking.date === d.value)}
                        onMouseEnter={e => { if (booking.date !== d.value) e.currentTarget.style.borderColor = 'var(--color-text-muted)' }}
                        onMouseLeave={e => { if (booking.date !== d.value) e.currentTarget.style.borderColor = 'var(--color-border)' }}>
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sub)', fontSize: '22px', color: 'var(--color-heading)', marginBottom: 'var(--space-4)', fontWeight: 400 }}>
                    Choose a Time
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)' }}>
                    {times.map(t => (
                      <button key={t} onClick={() => setBooking({ ...booking, time: t })}
                        style={optionStyle(booking.time === t)}
                        onMouseEnter={e => { if (booking.time !== t) e.currentTarget.style.borderColor = 'var(--color-text-muted)' }}
                        onMouseLeave={e => { if (booking.time !== t) e.currentTarget.style.borderColor = 'var(--color-border)' }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    border: '1px solid var(--color-gold)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)',
                  }}>
                    <Check size={28} strokeWidth={1.5} color="var(--color-gold)" />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-heading)', marginBottom: 'var(--space-3)' }}>
                    Your Aura Awaits
                  </h4>
                  <div style={{ fontFamily: 'var(--font-sub)', fontSize: '18px', color: 'var(--color-text-muted)', fontStyle: 'italic', lineHeight: 1.8 }}>
                    <p>{booking.service} with {booking.artist}</p>
                    <p>{new Date(booking.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at {booking.time}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {step < 4 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-3)' }}>
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              style={{
                background: 'none', border: 'none', color: step === 0 ? 'var(--color-border)' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px',
                letterSpacing: '0.08em', textTransform: 'uppercase' as const,
              }}>
              <ChevronLeft size={16} strokeWidth={1.5} /> Back
            </button>
            <Button size="sm" onClick={() => { if (canProceed()) setStep(step + 1) }}
              style={{ opacity: canProceed() ? 1 : 0.3, pointerEvents: canProceed() ? 'auto' : 'none' }}>
              {step === 3 ? 'Confirm' : 'Next'} <ChevronRight size={14} strokeWidth={1.5} />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

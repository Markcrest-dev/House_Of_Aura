import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'I walked in feeling ordinary. I walked out feeling like I had a presence. That\'s the Aura effect.',
    name: 'Amara J.',
    service: 'Precision Cut & Styling',
    stars: 5,
  },
  {
    quote: 'Marcus doesn\'t just cut hair — he reads you. My fade has never looked this intentional.',
    name: 'David K.',
    service: 'Precision Fade',
    stars: 5,
  },
  {
    quote: 'Zara\'s braids last longer and look better than anywhere I\'ve been. And the atmosphere is unreal.',
    name: 'Nkechi O.',
    service: 'Braiding — Box Braids',
    stars: 5,
  },
  {
    quote: 'The experience matters as much as the result. Complimentary drinks, quiet space, genuine artistry.',
    name: 'Sophie L.',
    service: 'Colour & Treatment',
    stars: 5,
  },
  {
    quote: 'I drove two hours for this. I\'d drive three. This is the standard now.',
    name: 'James R.',
    service: 'Full Grooming',
    stars: 5,
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150)
        }
      },
      { threshold: 0.2 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  const rotateY = (index % 3 - 1) * 2
  const rotateX = index > 2 ? 1.5 : -1.5

  return (
    <div
      ref={cardRef}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderLeft: '2px solid rgba(212, 168, 92, 0.4)',
        padding: 'var(--space-6) var(--space-4)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
          : `perspective(1000px) rotateY(${rotateY + 5}deg) rotateX(${rotateX + 5}deg) translateY(40px)`,
        transition: `all 0.8s var(--ease-luxury)`,
      }}
    >
      <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--space-3)' }}>
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star key={i} size={14} strokeWidth={1.5} fill="var(--color-gold)" color="var(--color-gold)" />
        ))}
      </div>
      <blockquote style={{
        fontFamily: 'var(--font-accent)', fontSize: '16px', fontStyle: 'italic',
        color: 'var(--color-text)', lineHeight: 1.7, marginBottom: 'var(--space-4)',
      }}>
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
        color: 'var(--color-heading)', letterSpacing: '0.06em', textTransform: 'uppercase' as const,
      }}>
        {testimonial.name}
      </p>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)',
        fontWeight: 300, marginTop: '4px',
      }}>
        {testimonial.service}
      </p>
    </div>
  )
}

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.3 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--space-4)' }}>
        <div ref={titleRef} style={{
          textAlign: 'center', marginBottom: 'var(--space-12)',
          opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s var(--ease-luxury)',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.2em',
            textTransform: 'uppercase' as const, color: 'var(--color-gold)', display: 'block',
            marginBottom: 'var(--space-2)',
          }}>Testimonials</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: 'var(--color-heading)' }}>
            Voices
          </h2>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'var(--color-text-muted)', fontWeight: 300, fontStyle: 'italic',
            maxWidth: '500px', margin: 'var(--space-3) auto 0',
          }}>
            What stays with our clients long after they leave.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-3)' }}>
          {testimonials.map((t, i) => <TestimonialCard key={t.name} testimonial={t} index={i} />)}
        </div>
      </div>
    </section>
  )
}

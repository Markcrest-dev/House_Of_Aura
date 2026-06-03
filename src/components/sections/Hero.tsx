import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from '../../lib/gsap'
import Button from '../ui/Button'
import SplitText from '../ui/SplitText'

export default function Hero() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance sequence
      const tl = gsap.timeline({ delay: 0.3 })

      // Character reveal for headline
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.hero-char')
        tl.from(chars, {
          opacity: 0,
          y: 60,
          rotationX: -90,
          stagger: 0.03,
          duration: 0.9,
          ease: 'back.out(1.7)',
        })
      }

      // Subtitle fade in
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.4')

      // CTA fade in
      tl.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')

      // Parallax on scroll — background moves slower
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Fade out content on scroll
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '60% top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineText = 'House of Aura.'
  const subtitleText = 'Where presence is crafted.'

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Layer — parallax */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-20% 0',
          zIndex: 0,
          backgroundColor: 'var(--color-bg)',
        }}
      >
        {/* Background Image with opacity */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/hero_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
          }}
        />
        {/* Ambient radial glows */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(212, 168, 92, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(155, 141, 196, 0.06) 0%, transparent 50%)
            `,
          }}
        />
        {/* Dark overlay to fade into obsidian color at the bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--color-bg) 0%, rgba(9, 9, 14, 0.7) 50%, rgba(9, 9, 14, 0.85) 100%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 var(--space-4)',
        }}
      >
        {/* Headline — characters wrapped for GSAP */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 110px)',
            fontWeight: 700,
            color: 'var(--color-heading)',
            lineHeight: 1.05,
            marginBottom: 'var(--space-3)',
            letterSpacing: '-0.02em',
          }}
        >
          <SplitText text={headlineText} charClassName="hero-char" />
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-sub)',
            fontSize: 'clamp(20px, 3vw, 36px)',
            fontWeight: 300,
            color: 'var(--color-text)',
            marginBottom: 'var(--space-8)',
            fontStyle: 'italic',
          }}
        >
          {subtitleText}
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <Button
            size="lg"
            onClick={() => {
              navigate('/booking')
            }}
          >
            Book Your Appointment
          </Button>
        </div>
      </div>
    </section>
  )
}

import { useRef, useState, useEffect, useCallback } from 'react'

const transformations = [
  {
    id: 1,
    stylist: 'Marcus Webb',
    service: 'Precision Fade',
    beforeColor: '#1a1520',
    afterColor: '#2a2030',
  },
  {
    id: 2,
    stylist: 'Zara Chen',
    service: 'Braiding — Fulani Style',
    beforeColor: '#18141e',
    afterColor: '#261e2e',
  },
  {
    id: 3,
    stylist: 'Kai Williams',
    service: 'Colour — Honey Balayage',
    beforeColor: '#151218',
    afterColor: '#2c2226',
  },
]

function SliderItem({ item }: { item: typeof transformations[0] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX)
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX)
    }
    const handleUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleGlobalMove)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleUp)
    }
  }, [isDragging, handleMove])

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      style={{
        position: 'relative',
        width: '100%',
        minWidth: '400px',
        aspectRatio: '4/3',
        overflow: 'hidden',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {/* Before side */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: item.beforeColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          textAlign: 'center',
          opacity: 0.3,
        }}>
          <span style={{
            fontFamily: 'var(--font-sub)',
            fontSize: '24px',
            color: 'var(--color-text)',
            fontStyle: 'italic',
            fontWeight: 300,
          }}>
            Before
          </span>
        </div>
      </div>

      {/* After side — clipped */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: item.afterColor,
          clipPath: `inset(0 0 0 ${sliderPos}%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          textAlign: 'center',
          opacity: 0.3,
        }}>
          <span style={{
            fontFamily: 'var(--font-sub)',
            fontSize: '24px',
            color: 'var(--color-gold)',
            fontStyle: 'italic',
            fontWeight: 300,
          }}>
            After
          </span>
        </div>
      </div>

      {/* Drag handle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPos}%`,
          transform: 'translateX(-50%)',
          width: '2px',
          backgroundColor: 'var(--color-gold)',
          opacity: 0.8,
          zIndex: 2,
        }}
      >
        {/* Gold diamond */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            width: '14px',
            height: '14px',
            backgroundColor: 'var(--color-gold)',
          }}
        />
      </div>

      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 'var(--space-4)',
          left: 'var(--space-4)',
          zIndex: 3,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-sub)',
          fontSize: '16px',
          color: 'var(--color-text)',
          fontStyle: 'italic',
          fontWeight: 300,
          opacity: 0.8,
        }}>
          {item.service}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginTop: '4px',
        }}>
          by {item.stylist}
        </p>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="gallery"
      style={{
        padding: 'var(--space-16) 0',
        backgroundColor: 'var(--color-surface)',
        overflow: 'hidden',
      }}
    >
      <div
        ref={sectionRef}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 var(--space-4)',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-12)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: `all 0.8s var(--ease-luxury)`,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              display: 'block',
              marginBottom: 'var(--space-2)',
            }}
          >
            Transformations
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              color: 'var(--color-heading)',
              marginBottom: 'var(--space-3)',
            }}
          >
            The Work Speaks
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sub)',
              fontSize: 'clamp(16px, 2vw, 22px)',
              color: 'var(--color-text-muted)',
              fontWeight: 300,
              fontStyle: 'italic',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            Drag to reveal. Let the transformation tell its own story.
          </p>
        </div>

        {/* Horizontal Scrollable Slider Gallery */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
            overflowX: 'auto',
            paddingBottom: 'var(--space-3)',
            scrollSnapType: 'x mandatory',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {transformations.map((item) => (
            <div key={item.id} style={{ scrollSnapAlign: 'start', flex: '0 0 auto' }}>
              <SliderItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

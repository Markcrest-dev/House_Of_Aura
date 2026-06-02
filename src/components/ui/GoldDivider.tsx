import { useEffect, useRef } from 'react'

interface GoldDividerProps {
  width?: string
  style?: React.CSSProperties
}

export default function GoldDivider({ width = '120px', style }: GoldDividerProps) {
  const lineRef = useRef<SVGLineElement>(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            line.style.strokeDashoffset = '0'
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(line)
    return () => observer.disconnect()
  }, [])

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 'var(--space-8) 0',
        ...style,
      }}
    >
      <svg width={width} height="2" viewBox={`0 0 ${parseInt(width)} 2`}>
        <line
          ref={lineRef}
          x1="0"
          y1="1"
          x2={parseInt(width)}
          y2="1"
          stroke="var(--color-gold)"
          strokeWidth="1"
          strokeDasharray={parseInt(width)}
          strokeDashoffset={parseInt(width)}
          style={{
            transition: `stroke-dashoffset 1.4s var(--ease-reveal)`,
          }}
        />
      </svg>
    </div>
  )
}

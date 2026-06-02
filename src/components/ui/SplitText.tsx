import React from 'react'

interface SplitTextProps {
  text: string
  className?: string
  charClassName?: string
  style?: React.CSSProperties
}

export default function SplitText({ text, className, charClassName, style }: SplitTextProps) {
  return (
    <span className={className} style={{ display: 'inline-block', ...style }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={charClassName}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

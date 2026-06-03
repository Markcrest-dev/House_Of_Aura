import BeforeAfter from '../components/sections/BeforeAfter'
import Products3D from '../components/sections/Products3D'

export default function Gallery() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      paddingTop: '120px', 
      backgroundColor: 'var(--color-bg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '550px',
        height: '550px',
        background: 'radial-gradient(circle, rgba(212, 168, 92, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '550px',
        height: '550px',
        background: 'radial-gradient(circle, rgba(155, 141, 196, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <BeforeAfter />
        <div style={{ 
          height: '1px', 
          backgroundColor: 'var(--color-border)', 
          maxWidth: '1400px', 
          margin: 'var(--space-8) auto' 
        }} />
        <Products3D />
      </div>
    </div>
  )
}

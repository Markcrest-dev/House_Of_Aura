import ServicesSection from '../components/sections/Services'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { Calendar } from 'lucide-react'

export default function Services() {
  const navigate = useNavigate()

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
        top: '10%',
        right: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(212, 168, 92, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(155, 141, 196, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ServicesSection />
        
        {/* CTA section */}
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 var(--space-4) var(--space-16)',
          textAlign: 'center'
        }}>
          <div style={{ 
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-8) var(--space-4)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '32px', 
              color: 'var(--color-heading)',
              marginBottom: 'var(--space-2)'
            }}>
              Ready to Craft Your Presence?
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
              fontSize: '15px',
              maxWidth: '500px',
              margin: '0 auto var(--space-6)'
            }}>
              Schedule a dedicated consultation or select your custom services with our master artists.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="filled" onClick={() => navigate('/booking')}>
                Book an Appointment <Calendar size={14} style={{ marginLeft: '8px' }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

// Synthesizer class designed using Web Audio API to create a dark luxury ambient drone
class AmbientSynthesizer {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private noiseSource: AudioBufferSourceNode | null = null
  private noiseLFO: OscillatorNode | null = null
  private initialized = false

  init() {
    if (this.initialized) return

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return

    this.ctx = new AudioContextClass()
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)
    this.masterGain.connect(this.ctx.destination)

    // 1. Low Drone Oscillator 1 (A1 - 55Hz)
    const osc1 = this.ctx.createOscillator()
    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(55, this.ctx.currentTime)

    // Low Drone Oscillator 2 (E2 - 82.4Hz)
    const osc2 = this.ctx.createOscillator()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(82.4, this.ctx.currentTime)

    // Warm Mid Swell 1 (A2 - 110Hz)
    const osc3 = this.ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.setValueAtTime(110, this.ctx.currentTime)

    // Warm Mid Swell 2 (E3 - 164.8Hz) - Added for audibility on standard speakers
    const osc4 = this.ctx.createOscillator()
    osc4.type = 'sine'
    osc4.frequency.setValueAtTime(164.8, this.ctx.currentTime)

    // Warm Mid Swell 3 (A3 - 220Hz) - Added for audibility on standard speakers
    const osc5 = this.ctx.createOscillator()
    osc5.type = 'sine'
    osc5.frequency.setValueAtTime(220, this.ctx.currentTime)

    // Lowpass filter for the oscillators (adjusted cutoff to 350Hz to allow mid harmonics)
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(350, this.ctx.currentTime)
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime)

    // LFO to slowly sweep the lowpass filter frequency (breathing effect between ~230Hz and ~470Hz)
    const lfo = this.ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(0.06, this.ctx.currentTime) // ~16 sec cycle

    const lfoGain = this.ctx.createGain()
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime) // sweep filter +- 120Hz

    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)

    // Connect oscillators to filter
    const oscGain = this.ctx.createGain()
    oscGain.gain.setValueAtTime(0.3, this.ctx.currentTime)

    osc1.connect(oscGain)
    osc2.connect(oscGain)
    osc3.connect(oscGain)
    osc4.connect(oscGain)
    osc5.connect(oscGain)

    oscGain.connect(filter)
    filter.connect(this.masterGain)

    // 2. White Noise generator for atmospheric wind/breathing waves
    const bufferSize = 2 * this.ctx.sampleRate
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    this.noiseSource = this.ctx.createBufferSource()
    this.noiseSource.buffer = noiseBuffer
    this.noiseSource.loop = true

    // Filter white noise
    const noiseFilter = this.ctx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.setValueAtTime(350, this.ctx.currentTime)
    noiseFilter.Q.setValueAtTime(1.0, this.ctx.currentTime)

    // Noise slow LFO swell (simulating natural ocean breathing/wind)
    this.noiseLFO = this.ctx.createOscillator()
    this.noiseLFO.type = 'sine'
    this.noiseLFO.frequency.setValueAtTime(0.04, this.ctx.currentTime) // ~25s cycle

    const noiseLFOGain = this.ctx.createGain()
    noiseLFOGain.gain.setValueAtTime(150, this.ctx.currentTime)

    this.noiseLFO.connect(noiseLFOGain)
    noiseLFOGain.connect(noiseFilter.frequency)

    const noiseGain = this.ctx.createGain()
    noiseGain.gain.setValueAtTime(0.015, this.ctx.currentTime) // Very subtle atmospheric hum

    this.noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(this.masterGain)

    // Start all sound sources
    osc1.start()
    osc2.start()
    osc3.start()
    osc4.start()
    osc5.start()
    lfo.start()
    this.noiseSource.start()
    this.noiseLFO.start()

    this.initialized = true
  }

  async start() {
    this.init()
    if (!this.ctx || !this.masterGain) return

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }

    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)
    // Smooth 2-second fade-in to an audible level (0.16)
    this.masterGain.gain.linearRampToValueAtTime(0.16, this.ctx.currentTime + 2.0)
  }

  stop() {
    if (!this.ctx || !this.masterGain) return

    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime)
    // Smooth 1.5-second fade-out
    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5)

    setTimeout(() => {
      if (this.ctx && this.ctx.state === 'running') {
        this.ctx.suspend()
      }
    }, 1600)
  }
}


export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const synthRef = useRef<AmbientSynthesizer | null>(null)

  useEffect(() => {
    synthRef.current = new AmbientSynthesizer()

    // Fade-in a gentle tooltip after 3 seconds to guide the user
    const timer = setTimeout(() => {
      setShowTooltip(true)
      // Hide tooltip after 5 seconds automatically
      setTimeout(() => setShowTooltip(false), 5000)
    }, 3000)

    return () => {
      clearTimeout(timer)
      if (synthRef.current) {
        synthRef.current.stop()
      }
    }
  }, [])

  const togglePlayback = async () => {
    if (!synthRef.current) return

    if (isPlaying) {
      synthRef.current.stop()
      setIsPlaying(false)
    } else {
      await synthRef.current.start()
      setIsPlaying(true)
      setShowTooltip(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--space-4)',
        left: 'var(--space-4)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <button
        onClick={togglePlayback}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 16, 24, 0.75)',
          border: isPlaying ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isPlaying ? 'var(--color-gold)' : 'var(--color-text-muted)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'all 0.4s var(--ease-luxury)',
          cursor: 'none',
          outline: 'none',
          boxShadow: isPlaying ? '0 0 15px rgba(212, 168, 92, 0.15)' : 'none',
        }}
        className="hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* Spinning/pulsing active state */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Volume2 size={16} strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <VolumeX size={16} strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Pulsing glow ring when active */}
      {isPlaying && (
        <span
          style={{
            position: 'absolute',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '1px solid var(--color-gold)',
            opacity: 0.4,
            animation: 'aura-pulse 2.5s infinite ease-out',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      )}

      {/* Glassmorphic Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(9, 9, 14, 0.9)',
              border: '1px solid var(--color-border)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                display: 'block',
              }}
            >
              Enable Ambient Aura
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes aura-pulse {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

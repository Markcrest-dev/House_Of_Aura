import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from '../../lib/gsap'

/* ── Gold Particle Field ── */
function GoldParticles({ count = 2000 }) {
  const points = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 18
    }
    return pos
  }, [count])

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.0003
      points.current.rotation.x += 0.0001
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xD4A85C}
        size={0.015}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

/* ── Product 1: Amber Hair Oil Bottle ── */
function ProductModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        {/* Amber Glass Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.4, 1.8, 32]} />
          <meshPhysicalMaterial
            color="#cca05a"
            roughness={0.05}
            metalness={0.05}
            transmission={0.8}
            thickness={0.8}
            ior={1.52}
          />
        </mesh>
        {/* Golden Hair Oil Liquid Core inside the bottle */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.31, 0.35, 1.5, 32]} />
          <meshStandardMaterial
            color="#b37f2d"
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
        {/* Polished Gold Cap */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.2, 0.22, 0.4, 32]} />
          <meshStandardMaterial
            color="#D4A85C"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        {/* Textured White Paper Label */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.36, 0.41, 0.6, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.55}
            metalness={0.0}
          />
        </mesh>
        {/* Label Gold Accent Rings */}
        <mesh position={[0, 0.35, 0]}>
          <torusGeometry args={[0.375, 0.015, 8, 32]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.85} roughness={0.15} />
        </mesh>
        <mesh position={[0, -0.25, 0]}>
          <torusGeometry args={[0.415, 0.015, 8, 32]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.85} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Product 2: Frosted Pomade Jar ── */
function ProductModel2({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.25
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef} position={position}>
        {/* Frosted Deep Violet Jar Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
          <meshPhysicalMaterial
            color="#1F153F"
            roughness={0.2}
            metalness={0.05}
            transmission={0.6}
            thickness={0.7}
            ior={1.48}
          />
        </mesh>
        {/* Brushed Gold Lid */}
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.16, 32]} />
          <meshStandardMaterial
            color="#D4A85C"
            metalness={0.9}
            roughness={0.22}
          />
        </mesh>
        {/* Minimalist White Label */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.505, 0.505, 0.42, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.6}
            metalness={0.0}
          />
        </mesh>
        {/* Golden Stripe running through the label */}
        <mesh position={[0, 0.15, 0]}>
          <torusGeometry args={[0.515, 0.012, 8, 32]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Product 3: Rose Gold Styling Tube ── */
function ProductModel3({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
      <group ref={groupRef} position={position}>
        {/* Metallic Rose Gold Tube Body */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI * 0.05]}>
          <capsuleGeometry args={[0.2, 1.2, 8, 16]} />
          <meshStandardMaterial
            color="#d6a5b8"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Metallic Gold Cap */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.25, 16]} />
          <meshStandardMaterial
            color="#D4A85C"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Gold Crimp tail at the bottom */}
        <mesh position={[0, -0.75, 0]} rotation={[0, 0, Math.PI * 0.05]}>
          <boxGeometry args={[0.42, 0.08, 0.06]} />
          <meshStandardMaterial
            color="#D4A85C"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Main Section ── */
export default function Products3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!titleRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current!.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="products" ref={sectionRef} style={{
      padding: 'var(--space-16) 0', backgroundColor: 'var(--color-bg)', position: 'relative',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--space-4)' }}>
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block',
            marginBottom: 'var(--space-2)',
          }}>Products</span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, color: 'var(--color-heading)', marginBottom: 'var(--space-3)',
          }}>Objects of Desire</h2>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'var(--color-text-muted)', fontWeight: 300, fontStyle: 'italic',
            maxWidth: '550px', margin: '0 auto',
          }}>Premium products chosen for your hair. Drag to explore.</p>
        </div>

        {/* 3D Canvas */}
        <div style={{ width: '100%', height: '500px', position: 'relative' }}>
          {isInView && (
            <Canvas camera={{ position: [0, 1.5, 7], fov: 45 }} style={{ background: 'transparent' }}>
              <ambientLight intensity={0.4} />
              <spotLight position={[5, 8, 5]} intensity={2.0} color="#D4A85C" angle={0.4} penumbra={0.5} />
              <spotLight position={[-5, 6, -3]} intensity={1.0} color="#9B8DC4" angle={0.3} penumbra={0.8} />
              <pointLight position={[0, -2, 4]} intensity={0.5} color="#D4A85C" />

              {/* Realistic environmental reflection mapping */}
              <Environment preset="studio" />

              <GoldParticles count={1500} />

              <ProductModel position={[-2.5, 0, 0]} />
              <ProductModel2 position={[0, -0.3, 0.5]} />
              <ProductModel3 position={[2.5, 0, 0]} />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 3}
              />
            </Canvas>
          )}
        </div>
      </div>
    </section>
  )
}

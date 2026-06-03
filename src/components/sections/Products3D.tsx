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
      pos[i] = (Math.random() - 0.5) * 15
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
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

/* ── Tool 1: Branded Barber Clipper ── */
function ClipperModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef} position={position} scale={1.45}>
        {/* Main Casing Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.16, 1.8, 16]} />
          <meshStandardMaterial color="#121216" roughness={0.7} metalness={0.2} />
        </mesh>
        
        {/* Ergonomic grip indentation */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.20, 0.20, 0.4, 16]} />
          <meshStandardMaterial color="#0a0a0d" roughness={0.8} />
        </mesh>

        {/* Polished gold faceplate / Accent strip */}
        <mesh position={[0, 0.1, 0.08]} scale={[1.05, 1, 1.05]}>
          <cylinderGeometry args={[0.18, 0.14, 1.2, 16, 1, false, -Math.PI/2, Math.PI]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Accent Ring near bottom */}
        <mesh position={[0, -0.6, 0]}>
          <torusGeometry args={[0.17, 0.018, 8, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Taper Adjusting Lever */}
        <group position={[0.18, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <mesh>
            <boxGeometry args={[0.05, 0.22, 0.05]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#121216" roughness={0.7} />
          </mesh>
        </group>

        {/* Blade Base (Metallic gold block) */}
        <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 12, 0, 0]}>
          <boxGeometry args={[0.5, 0.1, 0.16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Clipper teeth */}
        <group position={[0, 1.01, 0.04]} rotation={[Math.PI / 12, 0, 0]}>
          {Array.from({ length: 15 }).map((_, idx) => {
            const x = -0.21 + idx * 0.03;
            return (
              <mesh key={idx} position={[x, 0, 0]}>
                <boxGeometry args={[0.012, 0.08, 0.05]} />
                <meshStandardMaterial color="#e2e2e2" metalness={0.95} roughness={0.05} />
              </mesh>
            )
          })}
        </group>

        {/* Power Switch */}
        <mesh position={[0, -0.1, 0.2]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.05, 0.1, 0.03]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Hanging loop at the bottom */}
        <mesh position={[0, -0.96, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.07, 0.016, 8, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Tool 2: Branded Professional Dryer ── */
function DryerModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.2
    }
  })

  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={groupRef} position={position} scale={1.35}>
        {/* Main horizontal barrel */}
        <mesh position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.32, 1.0, 16]} />
          <meshStandardMaterial color="#121216" roughness={0.65} metalness={0.2} />
        </mesh>

        {/* Front Concentrator Nozzle */}
        <mesh position={[-0.6, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.22, 0.25, 16]} />
          <meshStandardMaterial color="#0a0a0d" roughness={0.8} />
        </mesh>
        {/* Gold Tip of Nozzle */}
        <mesh position={[-0.73, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.16, 0.02, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Rear Air Intake */}
        <group position={[0.51, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.31, 0.31, 0.05, 16]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <sphereGeometry args={[0.28, 12, 12]} />
            <meshStandardMaterial color="#1a1a1f" metalness={0.8} roughness={0.4} />
          </mesh>
        </group>

        {/* Angled Handle */}
        <mesh position={[0.12, -0.35, 0]} rotation={[0, 0, -Math.PI / 10]}>
          <cylinderGeometry args={[0.14, 0.12, 0.9, 16]} />
          <meshStandardMaterial color="#121216" roughness={0.65} metalness={0.2} />
        </mesh>

        {/* Handle cap in gold */}
        <mesh position={[0.25, -0.8, 0]} rotation={[0, 0, -Math.PI / 10]}>
          <cylinderGeometry args={[0.12, 0.13, 0.06, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Cord hook */}
        <mesh position={[0.28, -0.89, 0]} rotation={[Math.PI / 2, 0.3, 0]}>
          <torusGeometry args={[0.06, 0.015, 8, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Gold buttons on handle */}
        <group position={[0.04, -0.18, 0]} rotation={[0, 0, -Math.PI / 10]}>
          <mesh position={[0, 0.12, 0.13]} rotation={[0, Math.PI / 2, 0]}>
            <capsuleGeometry args={[0.025, 0.06, 4, 8]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.04, 0.13]} rotation={[0, Math.PI / 2, 0]}>
            <capsuleGeometry args={[0.025, 0.06, 4, 8]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* Decorative gold ring connecting barrel and handle */}
        <mesh position={[0.08, -0.04, 0]}>
          <torusGeometry args={[0.15, 0.025, 8, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Tool 3: Branded Damascene Shears ── */
function ScissorsModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={groupRef} position={position} scale={1.4} rotation={[Math.PI / 6, 0, Math.PI / 4]}>
        {/* Left Shear Blade */}
        <group rotation={[0, 0, Math.PI / 32]}>
          {/* Blade shaft */}
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[0.04, 1.1, 0.015]} />
            <meshStandardMaterial color="#dedede" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Sharp Edge bevel */}
          <mesh position={[-0.025, 0.55, 0.004]}>
            <boxGeometry args={[0.012, 1.1, 0.008]} />
            <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.05} />
          </mesh>
          {/* Golden Handle stem */}
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.5, 8]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Finger ring */}
          <mesh position={[-0.13, -0.55, 0]} rotation={[0, 0, Math.PI / 6]}>
            <torusGeometry args={[0.12, 0.025, 8, 24]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>

        {/* Right Shear Blade */}
        <group rotation={[0, 0, -Math.PI / 32]}>
          {/* Blade shaft */}
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[0.04, 1.1, 0.015]} />
            <meshStandardMaterial color="#dedede" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Sharp Edge bevel */}
          <mesh position={[0.025, 0.55, -0.004]}>
            <boxGeometry args={[0.012, 1.1, 0.008]} />
            <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.05} />
          </mesh>
          {/* Golden Handle stem */}
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.5, 8]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Finger ring */}
          <mesh position={[0.13, -0.55, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <torusGeometry args={[0.12, 0.025, 8, 24]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Finger Rest (Tang) */}
          <mesh position={[0.22, -0.68, 0]} rotation={[0, 0, -Math.PI / 3.5]}>
            <capsuleGeometry args={[0.018, 0.1, 4, 8]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>

        {/* Pivot Pin screw */}
        <mesh position={[0, 0, 0.015]}>
          <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, -0.015]}>
          <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Tool 4: Branded Gold Paddle Brush ── */
function BrushModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  // Pre-generate brush bristle coordinates (flat layout, to be projected onto cushion)
  const bristlePositions = useMemo(() => {
    const arr = []
    const rows = 8
    const cols = 5
    for (let r = 0; r < rows; r++) {
      const y = -0.42 + (r / (rows - 1)) * 0.84
      const factor = Math.sin((r / (rows - 1)) * Math.PI)
      const rowCols = Math.max(1, Math.round(cols * factor))
      for (let c = 0; c < rowCols; c++) {
        const x = rowCols > 1 ? -0.2 + (c / (rowCols - 1)) * 0.4 : 0
        arr.push({ x, y })
      }
    }
    return arr
  }, [])

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={groupRef} position={position} scale={1.35}>
        {/* Handle - sleek, tapered grip */}
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[0.065, 0.045, 0.9, 16]} />
          <meshStandardMaterial color="#121216" roughness={0.65} metalness={0.2} />
        </mesh>
        {/* Handle Cap in gold */}
        <mesh position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.045, 0.055, 0.06, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Gold ring connector at handle neck */}
        <mesh position={[0, -0.4, 0]}>
          <torusGeometry args={[0.07, 0.016, 8, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Back Plate (Oval Gold Plate facing front) */}
        <mesh position={[0, 0.15, -0.03]} rotation={[Math.PI / 2, 0, 0]} scale={[1.15, 0.5, 1.5]}>
          <cylinderGeometry args={[0.34, 0.34, 0.12, 32]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>
        
        {/* Rubber Cushion (facing front) */}
        <mesh position={[0, 0.15, 0.01]} rotation={[Math.PI / 2, 0, 0]} scale={[1.08, 0.5, 1.42]}>
          <cylinderGeometry args={[0.32, 0.32, 0.1, 32]} />
          <meshStandardMaterial color="#1d1d22" roughness={0.85} />
        </mesh>

        {/* Bristle Pins (projecting forwards along Z axis) */}
        <group position={[0, 0.15, 0.05]}>
          {bristlePositions.map((pos, idx) => (
            <group key={idx} position={[pos.x, pos.y, 0]}>
              {/* Pin shaft pointing out along Z */}
              <mesh position={[0, 0, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.007, 0.007, 0.14, 4]} />
                <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Ball tip */}
              <mesh position={[0, 0, 0.14]}>
                <sphereGeometry args={[0.016, 6, 6]} />
                <meshStandardMaterial color="#121216" roughness={0.5} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </Float>
  )
}

/* ── Tool 5: Branded Carbon Comb ── */
function CombModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.25
    }
  })

  const teeth = useMemo(() => {
    const arr = []
    const count = 30
    for (let i = 0; i < count; i++) {
      const x = -0.8 + (i / (count - 1)) * 1.6
      const length = 0.44 - Math.abs(x) * 0.05
      arr.push({ x, length })
    }
    return arr
  }, [])

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={groupRef} position={position} scale={1.45} rotation={[0, 0, Math.PI / 10]}>
        {/* Comb Spine (Main bar in matte black) */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.7, 0.1, 0.04]} />
          <meshStandardMaterial color="#121216" roughness={0.65} metalness={0.2} />
        </mesh>

        {/* Gold Accent Strip on the spine */}
        <mesh position={[0, 0.23, 0.022]}>
          <boxGeometry args={[1.5, 0.025, 0.008]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Gold Plated Teeth */}
        {teeth.map((t, idx) => (
          <mesh key={idx} position={[t.x, 0.2 - t.length / 2 - 0.05, 0]}>
            <boxGeometry args={[0.015, t.length, 0.025]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
          </mesh>
        ))}

        {/* Comb grip details */}
        <mesh position={[-0.75, 0.2, 0.022]}>
          <cylinderGeometry args={[0.05, 0.05, 0.06, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Tool 6: Branded Straight Razor ── */
function RazorModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef} position={position} scale={1.4} rotation={[Math.PI / 6, Math.PI / 6, 0]}>
        {/* Hollow Handle (Double Scales) rotating from pivot [0, 0, 0] */}
        <group rotation={[0, 0, -Math.PI / 3.5]}>
          {/* Left scale plate (matte obsidian) */}
          <mesh position={[-0.55, 0, 0.035]}>
            <boxGeometry args={[1.1, 0.1, 0.015]} />
            <meshStandardMaterial color="#121216" roughness={0.7} metalness={0.1} />
          </mesh>
          {/* Right scale plate (matte obsidian) */}
          <mesh position={[-0.55, 0, -0.035]}>
            <boxGeometry args={[1.1, 0.1, 0.015]} />
            <meshStandardMaterial color="#121216" roughness={0.7} metalness={0.1} />
          </mesh>
          {/* Tail Spacer Block (gold) */}
          <mesh position={[-1.05, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.055]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Tail assembly pin */}
          <mesh position={[-1.05, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* Pivot Screw */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.11, 16]} />
          <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Blade & Shank Assembly rotating from pivot [0, 0, 0] */}
        <group rotation={[0, 0, Math.PI / 5.5]}>
          {/* Gold Shank */}
          <mesh position={[0.25, 0, 0]}>
            <boxGeometry args={[0.5, 0.05, 0.025]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.95} roughness={0.1} />
          </mesh>
          
          {/* Curved Tang (finger rest) sticking out behind pivot */}
          <mesh position={[-0.12, 0.05, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.16, 0.04, 0.025]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[-0.18, 0.1, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Stainless steel blade body */}
          <mesh position={[0.7, 0.08, 0]}>
            <boxGeometry args={[0.65, 0.18, 0.01]} />
            <meshStandardMaterial color="#e5e5e5" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Polished Blade Edge Bevel */}
          <mesh position={[0.7, -0.02, 0.003]}>
            <boxGeometry args={[0.65, 0.02, 0.003]} />
            <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.02} />
          </mesh>
          {/* Blade gold spine backing */}
          <mesh position={[0.7, 0.18, 0]}>
            <boxGeometry args={[0.67, 0.025, 0.02]} />
            <meshStandardMaterial color="#D4A85C" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

/* ── Hardware Specifications Dataset ── */
const TOOLS_DATA = [
  {
    id: 'clipper',
    name: 'AURA Pro-Alloy Clipper',
    subtitle: 'Signature Sculpting & Fading',
    description: 'Designed for master craftsmen, the AURA Pro-Alloy Clipper blends a high-torque rotary motor with our signature gold-plated carbon steel blade. It delivers ultra-close tapering, flawless fades, and runs completely cordless with absolute control.',
    specs: [
      { label: 'Blade Material', value: 'Titanium-coated Carbon Steel' },
      { label: 'Motor Power', value: '7,200 RPM High-Torque Rotary' },
      { label: 'Runtime', value: '180 Minutes Cordless Lithium-Ion' },
      { label: 'Housing Finish', value: 'Matte Obsidian & Electroplated Gold' },
    ]
  },
  {
    id: 'dryer',
    name: 'Gold-Ion Professional Dryer',
    subtitle: 'High-Velocity Sculpting',
    description: 'Engineered with a brushless digital motor and dual-ion technology, the Gold-Ion Dryer delivers ultra-fast drying while locking in natural moisture. The precision concentrator nozzle concentrates gold-ion airflow to banish frizz and create sleek, high-gloss finishes.',
    specs: [
      { label: 'Motor Type', value: '110,000 RPM Brushless Digital' },
      { label: 'Power Output', value: '1800W Eco-Velocity' },
      { label: 'Heat Settings', value: '4 Levels (including Cold Shot)' },
      { label: 'Airflow Speed', value: '3 Speed Levels with Gold Ionization' },
    ]
  },
  {
    id: 'scissors',
    name: 'AURA Damascene Shears',
    subtitle: 'Precision Hair Sculpting',
    description: 'Hand-honed from premium Japanese steel, our professional shears offer surgical precision. Featuring perfectly balanced crossed blades, an adjustable tension pivot screw, and an ergonomic ring system with integrated finger rest for all-day comfort.',
    specs: [
      { label: 'Steel Grade', value: 'Japanese 440C Cobalt Stainless Steel' },
      { label: 'Blade Type', value: 'Convex Edge, Hollow Ground' },
      { label: 'Tension System', value: 'Signature Gold Click-Ball Pivot' },
      { label: 'Ergonomic Rest', value: 'Integrated Tang with Silhouette Ring' },
    ]
  },
  {
    id: 'brush',
    name: 'AURA 24K Gold Paddle Brush',
    subtitle: 'Detangling & Scalp Revitalization',
    description: 'Crafted with a polished gold backplate and a luxurious soft-touch cushion handle, this paddle brush detangles hair smoothly without pulling. Its flexible pin bristles are capped with rounded tips to massage and stimulate the scalp while redistributing natural oils.',
    specs: [
      { label: 'Base Plate', value: '24K Electroplated Gold Finish' },
      { label: 'Cushion', value: 'Anti-Static Natural Rubber Cushion' },
      { label: 'Bristles', value: 'Polished Pins with Anti-Scraping Spheres' },
      { label: 'Ideal For', value: 'Smoothing, Volume, and Scalp Care' },
    ]
  },
  {
    id: 'comb',
    name: 'AURA Carbon Barber Comb',
    subtitle: 'Static-Free Detailing & Sectioning',
    description: 'A dual-action styling comb featuring wide teeth for styling and fine teeth for detailing. Its anti-static carbon spine is accented by electroplated gold teeth, making it both a beautiful styling accessory and a resilient tool for precise sectioning.',
    specs: [
      { label: 'Material', value: 'Carbon Fiber & Electroplated Alloy' },
      { label: 'Tooth Type', value: 'Smooth Rounded-Tip Dual Spacing' },
      { label: 'Resistance', value: 'Heat resistant up to 230°C / Anti-Static' },
      { label: 'Spine Accent', value: 'Branded Gold Aura Badge' },
    ]
  },
  {
    id: 'razor',
    name: 'AURA Luxury Straight Razor',
    subtitle: 'Signature Shaving & Outlining',
    description: 'The ultimate tool for clean outlines and wet shaving. Featuring a folding matte obsidian handle with gold pins, a surgical steel shank, and a quick-load blade holder, this straight razor combines vintage barbering heritage with contemporary luxury styling.',
    specs: [
      { label: 'Shank Material', value: 'Gold-Plated Stainless Steel' },
      { label: 'Handle (Scale)', value: 'Ergonomic Composite in Obsidian Matte' },
      { label: 'Blade Type', value: 'Quick-Load Double-Edge Half Blades' },
      { label: 'Pivot Tension', value: 'Adjustable Brass Dual-Pin Screw' },
    ]
  }
]

/* ── Main Section ── */
export default function Products3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [activeTool, setActiveTool] = useState('clipper')

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

  const activeToolData = useMemo(() => {
    return TOOLS_DATA.find((t) => t.id === activeTool) || TOOLS_DATA[0]
  }, [activeTool])

  const renderActiveModel = () => {
    switch (activeTool) {
      case 'clipper':
        return <ClipperModel position={[0, 0, 0]} />
      case 'dryer':
        return <DryerModel position={[0, -0.1, 0]} />
      case 'scissors':
        return <ScissorsModel position={[0, 0, 0]} />
      case 'brush':
        return <BrushModel position={[0, 0.25, 0]} />
      case 'comb':
        return <CombModel position={[0, -0.1, 0]} />
      case 'razor':
        return <RazorModel position={[0, -0.05, 0]} />
      default:
        return <ClipperModel position={[0, 0, 0]} />
    }
  }

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
          }}>Collection</span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, color: 'var(--color-heading)', marginBottom: 'var(--space-3)',
          }}>Hardware of Aura</h2>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'var(--color-text-muted)', fontWeight: 300, fontStyle: 'italic',
            maxWidth: '550px', margin: '0 auto',
          }}>Branded professional tools engineered for the House. Select a tool to explore.</p>
        </div>

        {/* Split Screen Showcase Grid */}
        <div 
          style={{
            display: 'grid',
            gap: 'var(--space-6)',
            alignItems: 'stretch',
          }} 
          className="grid-cols-1 md:grid-cols-[1.2fr_1.8fr]"
        >
          {/* Left Column: Selector Panel & Specs */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: 'var(--space-4) var(--space-6)',
            justifyContent: 'center',
          }}>
            {/* Horizontal scroll selector on mobile, vertical stack on desktop */}
            <div 
              style={{
                display: 'flex',
                gap: 'var(--space-2)',
                scrollbarWidth: 'none',
              }} 
              className="flex-row overflow-x-auto pb-2 border-b border-[var(--color-border)] md:flex-col md:overflow-visible md:border-b-0 md:pb-0"
            >
              {TOOLS_DATA.map((tool) => {
                const isActive = activeTool === tool.id
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      textAlign: 'left',
                      padding: 'var(--space-2) var(--space-3)',
                      color: isActive ? 'var(--color-gold)' : 'var(--color-text-muted)',
                      backgroundColor: isActive ? 'rgba(212, 168, 92, 0.06)' : 'transparent',
                      border: 'none',
                      borderLeft: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                      borderRadius: '0 4px 4px 0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                    }}
                    className="hover:text-[var(--color-gold)] hover:bg-[rgba(212,168,92,0.03)]"
                  >
                    {tool.name.replace('AURA ', '')}
                  </button>
                )
              })}
            </div>

            {/* Spec Card Details */}
            <div style={{
              paddingTop: 'var(--space-2)',
            }}>
              <span style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'var(--color-gold)',
                display: 'block',
              }}>{activeToolData.subtitle}</span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                fontWeight: 600,
                color: 'var(--color-heading)',
                marginTop: 'var(--space-1)',
                marginBottom: 'var(--space-3)',
              }}>{activeToolData.name}</h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                lineHeight: '1.65',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-4)',
              }}>{activeToolData.description}</p>
              
              <div style={{
                borderTop: '1px solid var(--color-border)',
                paddingTop: 'var(--space-3)',
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: '600',
                }}>Hardware Specifications</h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}>
                  {activeToolData.specs.map((spec, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      fontFamily: 'var(--font-body)',
                      borderBottom: '1px dashed var(--color-border)',
                      paddingBottom: '4px',
                    }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>{spec.label}</span>
                      <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Canvas */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
            className="h-[380px] md:h-[580px]"
          >
            {/* Visual background accents */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,168,92,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            
            {/* Control prompt overlay */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '0',
              right: '0',
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                opacity: 0.7,
              }}>Drag to rotate 360°</span>
            </div>

            {isInView && (
              <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} style={{ background: 'transparent' }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[6, 8, 4]} intensity={2.5} color="#D4A85C" angle={0.45} penumbra={0.6} />
                <spotLight position={[-6, 6, -3]} intensity={1.5} color="#9B8DC4" angle={0.3} penumbra={0.8} />
                <pointLight position={[0, -3, 3]} intensity={0.8} color="#D4A85C" />

                <Environment preset="studio" />

                <GoldParticles count={1000} />

                {renderActiveModel()}

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.4}
                  maxPolarAngle={Math.PI / 1.6}
                  minPolarAngle={Math.PI / 4}
                />
              </Canvas>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


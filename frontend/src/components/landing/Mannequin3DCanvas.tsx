import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../theme/store';

// Snapchat Bitmoji-Style Human Character Model (Manually Draggable Only)
function BitmojiHumanCharacter() {
  const { avatarConfig } = useAppStore();
  const groupRef = useRef<THREE.Group>(null!);

  const isFemale = avatarConfig.gender === 'female';

  return (
    <group ref={groupRef} position={[0, -0.85, 0]}>
      {/* 1. HEAD & EXPRESSIVE BITMOJI FACE */}
      <group position={[0, 1.7, 0]}>
        {/* Cranium / Head */}
        <mesh>
          <sphereGeometry args={[0.22, 64, 64]} />
          <meshStandardMaterial color={avatarConfig.skinTone} roughness={0.3} metalness={0.05} />
        </mesh>
        {/* Cute Jawline */}
        <mesh position={[0, -0.07, 0.04]}>
          <boxGeometry args={[0.18, 0.15, 0.18]} />
          <meshStandardMaterial color={avatarConfig.skinTone} roughness={0.3} />
        </mesh>
        {/* Nose */}
        <mesh position={[0, -0.02, 0.22]} rotation={[-0.3, 0, 0]}>
          <coneGeometry args={[0.025, 0.07, 16]} />
          <meshStandardMaterial color={avatarConfig.skinTone} roughness={0.3} />
        </mesh>
        {/* Expressive Winking Eyes */}
        <mesh position={[-0.07, 0.03, 0.2]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        <mesh position={[0.07, 0.03, 0.2]} scale={[1, 0.2, 1]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>

        {/* Glasses Accent */}
        {avatarConfig.glasses && (
          <mesh position={[0, 0.03, 0.22]}>
            <boxGeometry args={[0.34, 0.08, 0.04]} />
            <meshStandardMaterial color="#0F172A" roughness={0.1} />
          </mesh>
        )}

        {/* Hairstyle Volume */}
        {isFemale ? (
          <mesh position={[0, 0.05, -0.04]}>
            <sphereGeometry args={[0.24, 32, 32]} />
            <meshStandardMaterial color={avatarConfig.hairColor} roughness={0.25} />
          </mesh>
        ) : (
          <mesh position={[0, 0.12, 0.02]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[0.23, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color={avatarConfig.hairColor} roughness={0.2} />
          </mesh>
        )}
      </group>

      {/* 2. NECK */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.065, 0.075, 0.16, 32]} />
        <meshStandardMaterial color={avatarConfig.skinTone} roughness={0.3} />
      </mesh>

      {/* 3. TORSO & OVERSIZED STREETWEAR FIT */}
      <group position={[0, 0.95, 0]}>
        <mesh>
          <cylinderGeometry args={[isFemale ? 0.3 : 0.35, isFemale ? 0.28 : 0.32, 0.9, 32]} />
          <meshStandardMaterial color={avatarConfig.topColor} roughness={0.3} />
        </mesh>

        {/* Left Sleeve */}
        <mesh position={[-0.34, 0.22, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.08, 0.42, 16, 32]} />
          <meshStandardMaterial color={avatarConfig.topColor} roughness={0.3} />
        </mesh>
        {/* Right Sleeve & Pointing Hand Pose */}
        <mesh position={[0.34, 0.22, 0]} rotation={[0, 0, -0.6]}>
          <capsuleGeometry args={[0.08, 0.42, 16, 32]} />
          <meshStandardMaterial color={avatarConfig.topColor} roughness={0.3} />
        </mesh>
        <mesh position={[0.5, 0.05, 0.1]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={avatarConfig.skinTone} roughness={0.3} />
        </mesh>
      </group>

      {/* 4. LEGS & CARGO JEANS */}
      <group position={[0, 0.05, 0]}>
        <mesh position={[-0.13, -0.22, 0]}>
          <capsuleGeometry args={[0.1, 0.85, 16, 32]} />
          <meshStandardMaterial color={avatarConfig.pantsColor} roughness={0.4} />
        </mesh>
        <mesh position={[0.13, -0.22, 0]}>
          <capsuleGeometry args={[0.1, 0.85, 16, 32]} />
          <meshStandardMaterial color={avatarConfig.pantsColor} roughness={0.4} />
        </mesh>
      </group>

      {/* 5. SNEAKERS */}
      <mesh position={[-0.13, -0.72, 0.08]}>
        <boxGeometry args={[0.15, 0.1, 0.32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
      </mesh>
      <mesh position={[0.13, -0.72, 0.08]}>
        <boxGeometry args={[0.15, 0.1, 0.32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
      </mesh>
    </group>
  );
}

export function Mannequin3DCanvas() {
  const { avatarConfig, updateAvatar } = useAppStore();

  return (
    <div className="w-full h-[560px] relative cursor-grab active:cursor-grabbing">
      {/* 3D Canvas without auto-rotation */}
      <Canvas camera={{ position: [0, 0.2, 4.0], fov: 45 }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 8, 5]} intensity={2.8} color="#FFF5E5" />
        <pointLight position={[-5, -2, -5]} intensity={1.8} color="#D92243" />
        
        <Float speed={1.0} rotationIntensity={0.05} floatIntensity={0.15}>
          <BitmojiHumanCharacter />
        </Float>

        {/* Disabled autoRotate - Only rotates on manual drag */}
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>

      {/* Interactive Avatar Customizer Minimal Overlay */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-[#E0C375]/50 p-4 rounded-none shadow-xl space-y-3 font-sans text-xs w-48">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <span className="font-bold text-slate-900 font-mono text-[10px] uppercase">Customizer</span>
          <button
            onClick={() => updateAvatar({ gender: avatarConfig.gender === 'female' ? 'male' : 'female' })}
            className="text-[9px] font-bold text-[#D92243] uppercase bg-[#D92243]/10 px-2 py-0.5 rounded-none font-mono"
          >
            {avatarConfig.gender}
          </button>
        </div>

        {/* Skin Tone Selector */}
        <div>
          <span className="text-[9px] text-slate-500 font-mono uppercase block mb-1">Skin Tone</span>
          <div className="flex gap-1.5">
            {['#E5C1B2', '#DDB2A3', '#8D5B4C', '#F5D0C5'].map(tone => (
              <button
                key={tone}
                onClick={() => updateAvatar({ skinTone: tone })}
                style={{ backgroundColor: tone }}
                className={`w-5 h-5 border ${avatarConfig.skinTone === tone ? 'border-[#D92243] scale-110' : 'border-slate-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Top Color Switcher */}
        <div>
          <span className="text-[9px] text-slate-500 font-mono uppercase block mb-1">Top Color</span>
          <div className="flex gap-1.5">
            {['#D92243', '#F69D39', '#0F172A', '#1E1B4B'].map(color => (
              <button
                key={color}
                onClick={() => updateAvatar({ topColor: color })}
                style={{ backgroundColor: color }}
                className={`w-5 h-5 border ${avatarConfig.topColor === color ? 'border-[#D92243] scale-110' : 'border-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

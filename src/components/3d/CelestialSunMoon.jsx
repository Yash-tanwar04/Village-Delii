import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export function CelestialSunMoon() {
  const journeyProgress = useStore((state) => state.journeyProgress);

  // Celestial arc mapping:
  // Daytime (progress 0.0 to 0.58): Sun moves from dawn horizon to overhead
  // Sunset / Dusk (0.58 to 0.66): Sun sinks into the western horizon
  // Night (0.66 to 1.0): Moon rises into the starry night sky
  const isNight = journeyProgress > 0.64;

  // Sun orbital angle (in radians)
  const sunProgress = Math.min(1, journeyProgress / 0.64);
  const sunAngle = -0.1 + sunProgress * (Math.PI + 0.2);

  // Moon orbital angle (in radians)
  const nightProgress = Math.max(0, (journeyProgress - 0.64) / 0.36);
  const moonAngle = -0.1 + nightProgress * (Math.PI * 0.75);

  const orbitRadius = 90;

  const sunX = Math.cos(sunAngle) * orbitRadius;
  const sunY = Math.sin(sunAngle) * (orbitRadius * 0.65);
  const sunZ = -45;

  const moonX = -Math.cos(moonAngle) * orbitRadius;
  const moonY = Math.sin(moonAngle) * (orbitRadius * 0.6);
  const moonZ = -45;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. PHYSICAL 3D CELESTIAL SUN (Visible during dawn, morning, and dusk) */}
      <group position={[sunX, Math.max(-15, sunY), sunZ]} visible={sunY > -10}>
        {/* Glowing Sun Core */}
        <mesh>
          <sphereGeometry args={[4.8, 32, 32]} />
          <meshBasicMaterial color={journeyProgress > 0.55 ? "#FFA040" : "#FFF7D6"} />
        </mesh>

        {/* Solar Corona Lens Flare Halo */}
        <mesh position={[0, 0, -0.5]}>
          <ringGeometry args={[4.8, 12.0, 32]} />
          <meshBasicMaterial
            color={journeyProgress > 0.55 ? "#FF7A29" : "#FFE299"}
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Primary Sun Light */}
        <pointLight
          color={journeyProgress > 0.55 ? "#FF8E3C" : "#FFF5DE"}
          intensity={journeyProgress > 0.55 ? 3.0 : 4.0}
          distance={240}
        />
      </group>

      {/* 2. PHYSICAL 3D CELESTIAL MOON (Visible during 24/7 night sequence) */}
      <group position={[moonX, Math.max(-15, moonY), moonZ]} visible={moonY > -8}>
        {/* Sculpted Lunar Body with Soft Crater Shading */}
        <mesh>
          <sphereGeometry args={[4.0, 32, 32]} />
          <meshStandardMaterial
            color="#EAECEE"
            emissive="#CFD8DC"
            emissiveIntensity={0.7}
            roughness={0.9}
          />
        </mesh>

        {/* Lunar Atmospheric Halo Ring */}
        <mesh position={[0, 0, -0.5]}>
          <ringGeometry args={[4.0, 9.5, 32]} />
          <meshBasicMaterial
            color="#A4C2D6"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Cool Lunar Moonlight */}
        <pointLight
          color="#B8D5E8"
          intensity={1.5}
          distance={180}
        />
      </group>
    </group>
  );
}

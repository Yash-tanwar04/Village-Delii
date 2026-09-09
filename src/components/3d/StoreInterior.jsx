import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { createTerrazzoTexture, createWoodTexture } from '../../utils/textures';

export function StoreInterior() {
  const journeyProgress = useStore((state) => state.journeyProgress);
  const chakkiRef = useRef();

  const terrazzoTex = useMemo(() => createTerrazzoTexture(), []);
  const woodTex = useMemo(() => createWoodTexture(), []);

  // Visible once store structure assembles (progress > 0.22)
  const isVisible = journeyProgress > 0.22;
  const nightIntensity = journeyProgress > 0.65 ? Math.min(1, (journeyProgress - 0.65) * 5) : 0;

  // Kinetic rotation for Onsite Flour Mill (Chakki)
  useFrame((_, delta) => {
    if (chakkiRef.current) {
      chakkiRef.current.rotation.y += delta * 1.8;
    }
  });

  if (!isVisible) return null;

  return (
    <group position={[12.5, 0, 0]}>
      {/* 1. Polished Terrazzo Interior Flooring with Embedded Stone Chips */}
      <mesh position={[0, 0.31, 0]} receiveShadow>
        <boxGeometry args={[12.2, 0.02, 14.2]} />
        <meshStandardMaterial
          map={terrazzoTex}
          roughness={0.22}
          metalness={0.1}
        />
      </mesh>

      {/* 2. Suspended Black Acoustic Baffles & 2700K Track Lighting */}
      <group position={[0, 4.0, 0]}>
        {[-4.4, -2.2, 0, 2.2, 4.4].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.09, 0.4, 13.8]} />
            <meshStandardMaterial map={woodTex} roughness={0.7} />
          </mesh>
        ))}

        {/* Interior Warm Track Spotlights */}
        {[-3.4, 0, 3.4].map((z, idx) => (
          <pointLight
            key={idx}
            position={[0, -0.45, z]}
            color="#FFF4E2"
            intensity={2.2 + nightIntensity * 2.4}
            distance={11}
            decay={2}
          />
        ))}
      </group>

      {/* =========================================================================
          DEPARTMENT 1: FRESH PRODUCE (Rustic Slanted Wood Crates & Modeled Fruits)
          ========================================================================= */}
      <group position={[-2.8, 0.32, -3.8]}>
        {/* Wood Display Island Base */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.88, 2.4]} />
          <meshStandardMaterial map={woodTex} roughness={0.75} />
        </mesh>

        {/* Slanted Wooden Produce Crates */}
        {[-0.7, 0.7].map((xOffset, i) => (
          <group key={i} position={[xOffset, 0.98, 0]} rotation={[0.22, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[1.1, 0.24, 1.9]} />
              <meshStandardMaterial map={woodTex} roughness={0.8} />
            </mesh>

            {/* Farm Fresh Red Apples */}
            {[-0.34, 0, 0.34].map((cx, idx) => (
              <mesh key={`apple-${idx}`} position={[cx, 0.18, -0.5]}>
                <sphereGeometry args={[0.14, 14, 14]} />
                <meshStandardMaterial color="#D32F2F" roughness={0.28} />
              </mesh>
            ))}

            {/* Fresh Golden Oranges / Citrus */}
            {[-0.34, 0, 0.34].map((cx, idx) => (
              <mesh key={`orange-${idx}`} position={[cx, 0.18, 0]}>
                <sphereGeometry args={[0.15, 14, 14]} />
                <meshStandardMaterial color="#F57C00" roughness={0.32} />
              </mesh>
            ))}

            {/* Crisp Farm Cabbages / Greens */}
            {[-0.3, 0.3].map((cx, idx) => (
              <mesh key={`green-${idx}`} position={[cx, 0.19, 0.5]}>
                <dodecahedronGeometry args={[0.19, 1]} />
                <meshStandardMaterial color="#2E7D32" roughness={0.55} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* =========================================================================
          DEPARTMENT 2 & EXPERIENCE 3: FRESH BAKERY (Artisanal Sourdough Showcase)
          ========================================================================= */}
      <group position={[-2.8, 0.32, 2.8]}>
        {/* Oak Cabinet Base */}
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.98, 3.2]} />
          <meshStandardMaterial map={woodTex} roughness={0.7} />
        </mesh>

        {/* Clear Glass Sneeze Guard Case */}
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[2.55, 0.6, 3.15]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.95}
            roughness={0.04}
            transparent
          />
        </mesh>

        {/* Artisanal Breads on Slate Display Trays */}
        {[-0.95, 0, 0.95].map((zPos, i) => (
          <group key={i} position={[0, 1.08, zPos]}>
            {/* Sourdough Round Loaf */}
            <mesh position={[-0.48, 0.14, 0]} castShadow>
              <sphereGeometry args={[0.26, 14, 14]} scale={[1, 0.62, 1.25]} />
              <meshStandardMaterial color="#8D5524" roughness={0.82} />
            </mesh>
            {/* Golden Croissant / Pastry */}
            <mesh position={[0.38, 0.09, 0]} castShadow>
              <cylinderGeometry args={[0.11, 0.19, 0.38, 12]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#C68945" roughness={0.68} />
            </mesh>
          </group>
        ))}

        {/* Warm Bakery Showcase Spotlight */}
        <pointLight position={[0, 2.0, 0]} color="#FFBE6B" intensity={2.5} distance={5.5} />
      </group>

      {/* =========================================================================
          DEPARTMENT 3 & 4: QUICK MEALS & BEVERAGES (Commercial Multideck Chillers)
          ========================================================================= */}
      <group position={[4.8, 0.32, -2.8]}>
        {/* Chiller Cabinet Frame */}
        <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.35, 2.8, 4.8]} />
          <meshStandardMaterial color="#16191E" roughness={0.35} metalness={0.7} />
        </mesh>

        {/* Double-Glazed Glass Doors with LED Chill Glow */}
        <mesh position={[-0.68, 1.45, 0]}>
          <boxGeometry args={[0.04, 2.6, 4.6]} />
          <meshPhysicalMaterial
            color="#E8F4F8"
            transmission={0.92}
            transparent
            roughness={0.06}
          />
        </mesh>

        {/* Rows of Chilled Beverages */}
        {[-0.65, 0, 0.65].map((yOffset, shelfIdx) => (
          <group key={shelfIdx} position={[-0.2, 1.45 + yOffset, 0]}>
            {[-1.7, -1.1, -0.5, 0.5, 1.1, 1.7].map((zPos, bottleIdx) => (
              <mesh key={bottleIdx} position={[0, 0.19, zPos]}>
                <cylinderGeometry args={[0.09, 0.09, 0.36, 10]} />
                <meshStandardMaterial
                  color={bottleIdx % 2 === 0 ? "#2E7D32" : "#D84315"}
                  roughness={0.18}
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* Chiller Cold White LED Light */}
        <pointLight position={[-0.45, 2.5, 0]} color="#D4EDFF" intensity={2.0} distance={6.5} />
      </group>

      {/* =========================================================================
          EXPERIENCE 1: FRESHLY GROUND (Onsite Traditional Stone/Brass Flour Mill)
          ========================================================================= */}
      <group position={[4.6, 0.32, 3.4]}>
        {/* Mill Base Stand */}
        <mesh position={[0, 0.48, 0]} castShadow>
          <boxGeometry args={[1.6, 0.95, 1.9]} />
          <meshStandardMaterial map={woodTex} roughness={0.7} />
        </mesh>

        {/* Stone Grinding Drum Housing */}
        <mesh position={[0, 1.22, 0]} castShadow>
          <cylinderGeometry args={[0.62, 0.68, 0.58, 28]} />
          <meshStandardMaterial color="#8C734B" metalness={0.75} roughness={0.28} />
        </mesh>

        {/* Kinetic Rotating Grain Hopper & Core */}
        <group ref={chakkiRef} position={[0, 1.65, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.48, 0.18, 0.58, 20]} />
            <meshStandardMaterial color="#B08D4B" metalness={0.82} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.48, 8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.18} />
          </mesh>
        </group>

        {/* Authentic Burlap Canvas Grain Sacks */}
        {[-0.7, 0.7].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.34, 0.8]} castShadow>
            <cylinderGeometry args={[0.28, 0.32, 0.65, 14]} />
            <meshStandardMaterial color="#C8B18B" roughness={0.95} />
          </mesh>
        ))}
      </group>

      {/* =========================================================================
          EXPERIENCE 2: FRESHLY PRESSED (Cold-Pressed Juice Counter)
          ========================================================================= */}
      <group position={[1.8, 0.32, -4.8]}>
        {/* Polished Stainless Steel Countertop */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <boxGeometry args={[2.3, 1.04, 1.15]} />
          <meshStandardMaterial color="#A0A5AA" metalness={0.85} roughness={0.18} />
        </mesh>

        {/* Chilled Glass Juice Dispensers */}
        {[-0.6, 0.6].map((xPos, i) => (
          <group key={i} position={[xPos, 1.3, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.21, 0.21, 0.52, 18]} />
              <meshPhysicalMaterial
                color={i === 0 ? "#FFA500" : "#4CAF50"}
                transmission={0.82}
                transparent
                roughness={0.08}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          EXPERIENCE 5: RELAX & REFRESH (Lounge Armchairs & Fiddle Leaf Fig)
          ========================================================================= */}
      <group position={[1.6, 0.32, 4.8]}>
        {/* Solid Oak Bistro Table */}
        <mesh position={[0, 0.26, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.62, 0.62, 0.42, 24]} />
          <meshStandardMaterial map={woodTex} roughness={0.65} />
        </mesh>

        {/* Scandinavian Lounge Armchairs */}
        {[-1.0, 1.0].map((xPos, idx) => (
          <group key={idx} position={[xPos, 0, 0]} rotation={[0, idx === 0 ? 0.65 : -0.65, 0]}>
            <mesh position={[0, 0.42, 0]} castShadow>
              <boxGeometry args={[0.78, 0.22, 0.78]} />
              <meshStandardMaterial color="#4E6354" roughness={0.88} />
            </mesh>
            <mesh position={[0, 0.78, 0.34]} castShadow>
              <boxGeometry args={[0.78, 0.58, 0.16]} />
              <meshStandardMaterial color="#4E6354" roughness={0.88} />
            </mesh>
          </group>
        ))}

        {/* Potted Fiddle Leaf Fig Tree */}
        <group position={[1.6, 0, 0]}>
          <mesh position={[0, 0.26, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.24, 0.52, 18]} />
            <meshStandardMaterial color="#EDE9E3" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.85, 0]} castShadow>
            <dodecahedronGeometry args={[0.48, 1]} />
            <meshStandardMaterial color="#2E5A36" roughness={0.68} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

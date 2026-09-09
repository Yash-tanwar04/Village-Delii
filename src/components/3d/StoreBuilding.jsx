import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { createWoodTexture, createSidewalkTexture } from '../../utils/textures';

export function StoreBuilding() {
  const journeyProgress = useStore((state) => state.journeyProgress);

  // Progressive construction interpolation:
  // Scene 03: Store progressively assembles as user approaches (progress 0.12 to 0.35)
  const foundationProgress = Math.min(1, Math.max(0, (journeyProgress - 0.10) * 8));
  const structureProgress = Math.min(1, Math.max(0, (journeyProgress - 0.16) * 8));
  const facadeProgress = Math.min(1, Math.max(0, (journeyProgress - 0.22) * 8));
  const signageProgress = Math.min(1, Math.max(0, (journeyProgress - 0.28) * 9));

  // Automatic sliding glass doors (Scene 04 entry threshold: 0.32 to 0.42)
  const doorOpenAmount = Math.min(1.6, Math.max(0, (journeyProgress - 0.32) * 14));

  // Night lighting factor (Scenes 06 to 08 & 16: progress > 0.65)
  const nightIntensity = journeyProgress > 0.65 ? Math.min(1, (journeyProgress - 0.65) * 5) : 0;

  const woodTex = useMemo(() => createWoodTexture(), []);
  const sidewalkTex = useMemo(() => createSidewalkTexture(), []);

  if (foundationProgress <= 0.01) return null;

  return (
    <group position={[12.5, 0, 0]}>
      {/* 1. Engineered Foundation Plinth */}
      <mesh
        position={[0, (foundationProgress * 0.35) / 2, 0]}
        scale={[1, foundationProgress, 1]}
        receiveShadow
      >
        <boxGeometry args={[13.2, 0.35, 15.2]} />
        <meshStandardMaterial color="#2B3038" roughness={0.85} />
      </mesh>

      {/* 2. Structural Envelope & Architectural Fluted Timber Battens */}
      {structureProgress > 0.05 && (
        <group scale={[1, structureProgress, 1]}>
          {/* Rear Service Wall (Charcoal Architectural Concrete) */}
          <mesh position={[6.2, 2.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 4.6, 14.6]} />
            <meshStandardMaterial color="#1E232B" roughness={0.7} />
          </mesh>

          {/* North Wall: Fluted Oak Wood Battens */}
          <mesh position={[0, 2.3, -7.1]} castShadow receiveShadow>
            <boxGeometry args={[12.4, 4.6, 0.45]} />
            <meshStandardMaterial map={woodTex} roughness={0.65} />
          </mesh>

          {/* South Wall: Fluted Oak Wood Battens */}
          <mesh position={[0, 2.3, 7.1]} castShadow receiveShadow>
            <boxGeometry args={[12.4, 4.6, 0.45]} />
            <meshStandardMaterial map={woodTex} roughness={0.65} />
          </mesh>

          {/* Modern Flat Cantilevered Roof Slab */}
          <mesh position={[-0.5, 4.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[14.8, 0.55, 16.6]} />
            <meshStandardMaterial color="#171A20" roughness={0.8} />
          </mesh>

          {/* Exterior Fluted Oak Fascia Crown */}
          <mesh position={[-0.5, 4.55, 0]}>
            <boxGeometry args={[14.9, 0.85, 16.7]} />
            <meshStandardMaterial map={woodTex} roughness={0.6} />
          </mesh>

          {/* Powder-Coated Charcoal Steel Corner Columns */}
          {[
            [-6.2, 2.3, -7.1],
            [-6.2, 2.3, 7.1],
            [6.2, 2.3, -7.1],
            [6.2, 2.3, 7.1],
          ].map((pos, i) => (
            <mesh key={i} position={pos} castShadow>
              <boxGeometry args={[0.5, 4.6, 0.5]} />
              <meshStandardMaterial color="#11151A" metalness={0.85} roughness={0.25} />
            </mesh>
          ))}
        </group>
      )}

      {/* 3. Floor-to-Ceiling Glass Curtain Walls & Sliding Double Doors */}
      {facadeProgress > 0.05 && (
        <group>
          {/* West Facing Glass: North Fixed Bay */}
          <mesh position={[-6.2, 2.2, -4.4]}>
            <boxGeometry args={[0.1, 4.2, 4.8]} />
            <meshPhysicalMaterial
              color="#E2F1F8"
              transmission={0.93}
              transparent
              roughness={0.05}
              reflectivity={0.65}
              ior={1.5}
            />
          </mesh>

          {/* West Facing Glass: South Fixed Bay */}
          <mesh position={[-6.2, 2.2, 4.4]}>
            <boxGeometry args={[0.1, 4.2, 4.8]} />
            <meshPhysicalMaterial
              color="#E2F1F8"
              transmission={0.93}
              transparent
              roughness={0.05}
              reflectivity={0.65}
              ior={1.5}
            />
          </mesh>

          {/* Double-Glazed Automatic Sliding Entry Doors */}
          {/* Left Door - slides open towards -Z */}
          <mesh position={[-6.2, 2.1, -1.0 - doorOpenAmount]}>
            <boxGeometry args={[0.08, 4.0, 1.9]} />
            <meshPhysicalMaterial
              color="#EBF6FC"
              transmission={0.9}
              transparent
              roughness={0.06}
            />
          </mesh>

          {/* Right Door - slides open towards +Z */}
          <mesh position={[-6.2, 2.1, 1.0 + doorOpenAmount]}>
            <boxGeometry args={[0.08, 4.0, 1.9]} />
            <meshPhysicalMaterial
              color="#EBF6FC"
              transmission={0.9}
              transparent
              roughness={0.06}
            />
          </mesh>

          {/* Entrance Door Steel Header Transom */}
          <mesh position={[-6.2, 4.2, 0]}>
            <boxGeometry args={[0.25, 0.25, 4.2]} />
            <meshStandardMaterial color="#11151A" metalness={0.8} roughness={0.25} />
          </mesh>

          {/* Entrance Welcome Rubber Mat */}
          <mesh position={[-6.4, 0.12, 0]} receiveShadow>
            <boxGeometry args={[1.4, 0.02, 3.2]} />
            <meshStandardMaterial color="#22252B" roughness={0.95} />
          </mesh>
        </group>
      )}

      {/* 4. Illuminated 3D Architectural Signage (Authentic Branding) */}
      {signageProgress > 0.05 && (
        <group position={[-6.4, 4.55, 0]}>
          {/* Fascia Wood Mount Backing */}
          <mesh position={[0, 0, -1.2]}>
            <boxGeometry args={[0.1, 0.95, 6.6]} />
            <meshStandardMaterial map={woodTex} roughness={0.6} />
          </mesh>

          {/* 3D Illuminated Channel Letters: "VILLAGE DELI" */}
          <mesh position={[-0.09, 0, -1.4]}>
            <boxGeometry args={[0.08, 0.52, 4.6]} />
            <meshStandardMaterial
              color="#FFFDF7"
              emissive="#FFE7C2"
              emissiveIntensity={0.9 + nightIntensity * 2.2}
              roughness={0.2}
            />
          </mesh>

          {/* Organic Green Leaf Emblem */}
          <mesh position={[-0.12, 0.08, -4.0]}>
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshStandardMaterial
              color="#2E7D32"
              emissive="#4CAF50"
              emissiveIntensity={0.7 + nightIntensity * 1.6}
            />
          </mesh>

          {/* Circular 24/7 Illuminated Badge with Filament Glow */}
          <group position={[-0.14, 0.08, 2.9]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.52, 0.52, 0.1, 32]} />
              <meshStandardMaterial
                color="#DDA15E"
                emissive="#FFAA33"
                emissiveIntensity={1.0 + nightIntensity * 2.4}
                roughness={0.2}
              />
            </mesh>
          </group>

          {/* Canopy Recessed Spotlights casting warm light onto the pavement */}
          {[-4.4, -1.8, 1.8, 4.4].map((zPos, idx) => (
            <group key={idx} position={[-1.0, -0.35, zPos]}>
              <pointLight
                color="#FFE8C4"
                intensity={1.2 + nightIntensity * 3.0}
                distance={8}
                decay={2}
              />
            </group>
          ))}
        </group>
      )}

      {/* 5. Outdoor Seating Bench in front of the store (Street Presence) */}
      <group position={[-5.8, 0.2, 5.8]} rotation={[0, Math.PI / 2, 0]}>
        {/* Timber Bench Slats */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[1.8, 0.08, 0.45]} />
          <meshStandardMaterial map={woodTex} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.75, -0.2]} castShadow>
          <boxGeometry args={[1.8, 0.4, 0.06]} />
          <meshStandardMaterial map={woodTex} roughness={0.7} />
        </mesh>
        {/* Cast Iron Legs */}
        {[-0.8, 0.8].map((lx, lIdx) => (
          <mesh key={lIdx} position={[lx, 0.22, 0]} castShadow>
            <boxGeometry args={[0.08, 0.44, 0.42]} />
            <meshStandardMaterial color="#1E2228" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

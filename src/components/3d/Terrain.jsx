import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { 
  createAsphaltTexture, 
  createGrassTexture, 
  createMountainTexture, 
  createSidewalkTexture 
} from '../../utils/textures';

export function Terrain() {
  const journeyProgress = useStore((state) => state.journeyProgress);

  // Roadway length builds smoothly in Scene 01 (progress 0.0 to 0.14)
  const roadBuildProgress = Math.min(1, Math.max(0.12, journeyProgress * 7));

  // Procedural PBR textures
  const asphaltTex = useMemo(() => createAsphaltTexture(), []);
  const grassTex = useMemo(() => createGrassTexture(), []);
  const mountainTex = useMemo(() => createMountainTexture(), []);
  const sidewalkTex = useMemo(() => createSidewalkTexture(), []);

  // Countryside Terrain Geometry with soft rolling hills
  const terrainGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(240, 260, 64, 64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Flat street corridor (x between -9 and 9)
      if (Math.abs(x) > 8) {
        const dist = Math.abs(x) - 8;
        // Gentle undulating meadows
        const zNoise = Math.sin(x * 0.08) * Math.cos(y * 0.04) * (dist * 0.22);
        pos.setZ(i, zNoise);
      } else {
        pos.setZ(i, 0);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Distant Mountain Ridges (creates majestic North Indian landscape depth)
  const mountainGeos = useMemo(() => {
    const ridges = [];
    // Ridge 1: Distant left mountain ridge
    const g1 = new THREE.ConeGeometry(38, 24, 8);
    g1.scale(1.8, 1, 1.2);
    ridges.push({ geo: g1, pos: [-75, 10, -110], rot: [0, 0.4, 0] });

    // Ridge 2: Distant center-right ridge
    const g2 = new THREE.ConeGeometry(45, 30, 9);
    g2.scale(2.2, 1, 1.4);
    ridges.push({ geo: g2, pos: [85, 14, -130], rot: [0, -0.6, 0] });

    // Ridge 3: Far horizon ridge
    const g3 = new THREE.ConeGeometry(55, 36, 9);
    g3.scale(2.5, 1, 1.5);
    ridges.push({ geo: g3, pos: [-20, 16, -160], rot: [0, 0.2, 0] });
    return ridges;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Distant Mountain Ridges with Atmospheric Aerial Depth */}
      <group>
        {mountainGeos.map((m, idx) => (
          <mesh
            key={idx}
            geometry={m.geo}
            position={m.pos}
            rotation={m.rot}
          >
            <meshStandardMaterial
              map={mountainTex}
              color="#172B3A"
              roughness={0.92}
              metalness={0.05}
              flatShading={true}
            />
          </mesh>
        ))}
      </group>

      {/* 2. Rolling Meadow Countryside Ground */}
      <mesh
        geometry={terrainGeo}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, -30]}
        receiveShadow
      >
        <meshStandardMaterial
          map={grassTex}
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>

      {/* 3. Main Asphalt Highway Street Corridor */}
      <group position={[0, 0.01, -30]}>
        {/* Asphalt Roadway with Aggregate Texture */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          scale={[1, roadBuildProgress, 1]}
          receiveShadow
        >
          <planeGeometry args={[11.5, 240]} />
          <meshStandardMaterial
            map={asphaltTex}
            roughness={0.78}
            metalness={0.16}
          />
        </mesh>

        {/* Real Concrete Curbs (Beveled stone edge) */}
        <mesh position={[-5.9, 0.1, 0]} receiveShadow>
          <boxGeometry args={[0.38, 0.2, 240 * roadBuildProgress]} />
          <meshStandardMaterial color="#8E887E" roughness={0.85} />
        </mesh>
        <mesh position={[5.9, 0.1, 0]} receiveShadow>
          <boxGeometry args={[0.38, 0.2, 240 * roadBuildProgress]} />
          <meshStandardMaterial color="#8E887E" roughness={0.85} />
        </mesh>

        {/* Highway Crash Guardrail on West Verge */}
        <group position={[-6.6, 0.55, 0]}>
          <mesh receiveShadow>
            <boxGeometry args={[0.15, 0.35, 240 * roadBuildProgress]} />
            <meshStandardMaterial color="#A5A096" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Guardrail Support Posts */}
          {Array.from({ length: 24 }).map((_, i) => (
            <mesh key={i} position={[0, -0.28, -100 + i * 10]}>
              <boxGeometry args={[0.12, 0.6, 0.12]} />
              <meshStandardMaterial color="#736E65" metalness={0.8} roughness={0.4} />
            </mesh>
          ))}
        </group>

        {/* Painted Road Markings: Centerline Dashes & Yellow Shoulder Lines */}
        {roadBuildProgress > 0.08 && (
          <group position={[0, 0.025, 0]}>
            {/* Center Dashes */}
            {Array.from({ length: 40 }).map((_, i) => (
              <mesh
                key={i}
                position={[0, 0, -110 + i * 6]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <planeGeometry args={[0.24, 3.4]} />
                <meshStandardMaterial color="#F7F5EE" roughness={0.45} />
              </mesh>
            ))}

            {/* Solid Yellow Highway Shoulder Lines */}
            <mesh position={[-5.1, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.22, 240 * roadBuildProgress]} />
              <meshStandardMaterial color="#E8A938" roughness={0.5} />
            </mesh>
            <mesh position={[5.1, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.22, 240 * roadBuildProgress]} />
              <meshStandardMaterial color="#E8A938" roughness={0.5} />
            </mesh>
          </group>
        )}
      </group>

      {/* 4. Real Commercial Store Forecourt, Paver Sidewalk & Parking Stalls */}
      <group position={[12.5, 0.02, 0]}>
        {/* Asphalt Parking Area */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[14, 30]} />
          <meshStandardMaterial map={asphaltTex} roughness={0.8} />
        </mesh>

        {/* Architectural Precast Paver Sidewalk in front of store */}
        <mesh position={[-0.4, 0.11, 0]} receiveShadow>
          <boxGeometry args={[13.2, 0.2, 26]} />
          <meshStandardMaterial map={sidewalkTex} roughness={0.85} />
        </mesh>

        {/* Painted White Parking Stalls */}
        {[-10, -6, -2, 2, 6, 10].map((z, idx) => (
          <mesh
            key={idx}
            position={[-5.2, 0.22, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[4.4, 0.16]} />
            <meshStandardMaterial color="#F5F3ED" roughness={0.4} />
          </mesh>
        ))}

        {/* Modern Safety Bollards along Sidewalk Edge */}
        {[-9, -4.5, 0, 4.5, 9].map((z, bIdx) => (
          <mesh key={bIdx} position={[-6.2, 0.55, z]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.9, 16]} />
            <meshStandardMaterial color="#1E232A" metalness={0.8} roughness={0.25} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

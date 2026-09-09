import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneController } from './SceneController';
import { LightingCycle } from './LightingCycle';
import { CelestialSunMoon } from './CelestialSunMoon';
import { Terrain } from './Terrain';
import { OrganicTrees } from './OrganicTrees';
import { StoreBuilding } from './StoreBuilding';
import { StoreInterior } from './StoreInterior';
import { ExpansionMap } from './ExpansionMap';

export function ExperienceCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        shadows
        camera={{
          position: [0, 5.5, 26],
          fov: isMobile ? 62 : 45,
          near: 0.1,
          far: 400,
        }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full pointer-events-auto"
      >
        <Suspense fallback={null}>
          {/* Continuous 3D Camera Spline Controller */}
          <SceneController />

          {/* Dynamic Day-to-Night Ambient & Directional Lighting */}
          <LightingCycle />

          {/* 3D Celestial Sun & Moon with Visible Orbital Trajectories */}
          <CelestialSunMoon />

          {/* 3D Rolling Countryside & Asphalt Highway with PBR Textures */}
          <Terrain />

          {/* 3D Organic Deciduous Roadside Trees & Shrubs */}
          <OrganicTrees />

          {/* 3D Flagship Modern Store (Fluted Wood, Glass, Canopy, Illuminated 3D Signs) */}
          <StoreBuilding />

          {/* 3D Interior Sanctum (Terrazzo, Produce, Bakery, Chillers, Mill, Lounge) */}
          <StoreInterior />

          {/* 3D North India Topographic Network & Pulsing Location Nodes */}
          <ExpansionMap />
        </Suspense>
      </Canvas>
    </div>
  );
}

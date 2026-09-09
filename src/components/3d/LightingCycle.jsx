import React from 'react';
import { Sky } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export function LightingCycle() {
  const journeyProgress = useStore((state) => state.journeyProgress);

  // Time-of-day progression factor:
  // Daytime until progress 0.60, then transitions to sunset at 0.66, midnight at 0.72+
  let sunElevation = 35; // degrees above horizon
  let sunAzimuth = 180;
  let sunColor = "#FFF8E7";
  let sunIntensity = 1.6;
  let ambientColor = "#EDE7DF";
  let ambientIntensity = 0.8;
  let isNight = false;

  if (journeyProgress > 0.60 && journeyProgress <= 0.66) {
    // 06:00 PM: Golden Hour / Sunset
    sunElevation = 12;
    sunAzimuth = 250;
    sunColor = "#FF9E57";
    sunIntensity = 1.8;
    ambientColor = "#E0A97E";
    ambientIntensity = 0.6;
  } else if (journeyProgress > 0.66) {
    // 12:00 AM - 03:00 AM: Deep Night
    isNight = true;
    sunElevation = -20;
    sunColor = "#3A4D6B";
    sunIntensity = 0.15;
    ambientColor = "#1B2A36";
    ambientIntensity = 0.35;
  }

  // Calculate sun position vector
  const phi = THREE.MathUtils.degToRad(90 - sunElevation);
  const theta = THREE.MathUtils.degToRad(sunAzimuth);
  const sunPosition = [
    Math.sin(phi) * Math.sin(theta) * 100,
    Math.cos(phi) * 100,
    Math.sin(phi) * Math.cos(theta) * 100
  ];

  return (
    <group>
      {/* Dynamic Sky Simulation */}
      {!isNight ? (
        <Sky
          distance={450000}
          sunPosition={sunPosition}
          inclination={0.49}
          azimuth={0.25}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
          rayleigh={journeyProgress > 0.60 ? 3.0 : 0.8}
          turbidity={6}
        />
      ) : (
        /* Starry Night Sky Dome */
        <mesh>
          <sphereGeometry args={[200, 32, 32]} />
          <meshBasicMaterial color="#0A1118" side={THREE.BackSide} />
        </mesh>
      )}

      {/* Atmospheric Fog */}
      <fogExp2
        attach="fog"
        color={isNight ? "#0D161E" : journeyProgress > 0.60 ? "#C48E68" : "#E2DDD5"}
        density={isNight ? 0.012 : 0.008}
      />

      {/* Primary Directional Sunlight / Moonlight */}
      <directionalLight
        position={sunPosition}
        intensity={sunIntensity}
        color={sunColor}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={120}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0005}
      />

      {/* Hemisphere Ambient Light for Soft Filling */}
      <hemisphereLight
        skyColor={ambientColor}
        groundColor="#2A241E"
        intensity={ambientIntensity}
      />
    </group>
  );
}

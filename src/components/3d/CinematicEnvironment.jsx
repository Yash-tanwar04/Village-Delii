import React, { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export function CinematicEnvironment() {
  const journeyProgress = useStore((state) => state.journeyProgress);

  // Load the 6 high-fidelity 4K architectural scene assets
  const textures = useTexture([
    '/assets/images/empty-landscape.jpg',
    '/assets/images/hero-scenery.jpg',
    '/assets/images/store-approach.jpg',
    '/assets/images/store-interior.jpg',
    '/assets/images/store-night.jpg',
    '/assets/images/network-expansion.jpg',
  ]);

  const [texEmpty, texHero, texApproach, texInterior, texNight, texExpansion] = textures;

  // Set texture filtering for ultra-crisp 4K rendering
  useMemo(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
    });
  }, [textures]);

  // Smooth cross-fade opacity calculations across scroll timeline:
  // Scene 1: Empty Landscape (0.0 to 0.16)
  const opacityEmpty = Math.max(0, Math.min(1, (0.16 - journeyProgress) / 0.08));

  // Scene 2 & 3: Store Emerges in Landscape (0.10 to 0.32)
  const opacityHero = Math.max(0, Math.min(1, (journeyProgress - 0.08) / 0.08)) *
                      Math.max(0, Math.min(1, (0.34 - journeyProgress) / 0.08));

  // Scene 4: Approaching Glass Storefront (0.28 to 0.44)
  const opacityApproach = Math.max(0, Math.min(1, (journeyProgress - 0.28) / 0.08)) *
                          Math.max(0, Math.min(1, (0.46 - journeyProgress) / 0.08));

  // Scene 5: Inside the Store (Offerings & Craft) (0.40 to 0.62)
  const opacityInterior = Math.max(0, Math.min(1, (journeyProgress - 0.40) / 0.08)) *
                          Math.max(0, Math.min(1, (0.64 - journeyProgress) / 0.08));

  // Scene 6, 7, 8: The 24/7 Night Moment (0.58 to 0.82)
  const opacityNight = Math.max(0, Math.min(1, (journeyProgress - 0.58) / 0.08)) *
                       Math.max(0, Math.min(1, (0.84 - journeyProgress) / 0.08));

  // Scene 9, 10, 11: Regional Network Expansion (0.78 to 0.94)
  const opacityExpansion = Math.max(0, Math.min(1, (journeyProgress - 0.78) / 0.08)) *
                           Math.max(0, Math.min(1, (0.95 - journeyProgress) / 0.08));

  // Finale: Returns to Night Store (0.92 to 1.0)
  const opacityFinale = Math.max(0, Math.min(1, (journeyProgress - 0.92) / 0.06));

  // Parallax subtle camera zoom scale (gives 3D depth into each scene)
  const zoomEmpty = 1 + journeyProgress * 0.4;
  const zoomHero = 1 + Math.max(0, journeyProgress - 0.1) * 0.35;
  const zoomApproach = 1 + Math.max(0, journeyProgress - 0.28) * 0.4;
  const zoomInterior = 1 + Math.max(0, journeyProgress - 0.40) * 0.35;
  const zoomNight = 1 + Math.max(0, journeyProgress - 0.58) * 0.25;
  const zoomExpansion = 1 + Math.max(0, journeyProgress - 0.78) * 0.3;

  return (
    <group position={[0, 0, -20]}>
      {/* 1. Scene 01: Empty Landscape (Pristine Dawn Highway) */}
      {opacityEmpty > 0.01 && (
        <mesh position={[0, 0, 0]} scale={[zoomEmpty, zoomEmpty, 1]}>
          <planeGeometry args={[56, 31.5]} />
          <meshBasicMaterial
            map={texEmpty}
            transparent
            opacity={opacityEmpty}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* 2. Scene 02 & 03: Store Emergence (Flagship Store in Scenery) */}
      {opacityHero > 0.01 && (
        <mesh position={[0, 0, 0.2]} scale={[zoomHero, zoomHero, 1]}>
          <planeGeometry args={[56, 31.5]} />
          <meshBasicMaterial
            map={texHero}
            transparent
            opacity={opacityHero}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* 3. Scene 04: Eye-Level Storefront Approach (Sliding Glass Doors) */}
      {opacityApproach > 0.01 && (
        <mesh position={[0, 0, 0.4]} scale={[zoomApproach, zoomApproach, 1]}>
          <planeGeometry args={[56, 31.5]} />
          <meshBasicMaterial
            map={texApproach}
            transparent
            opacity={opacityApproach}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* 4. Scene 05: Store Interior (Produce, Bakery, Juice, Lounge) */}
      {opacityInterior > 0.01 && (
        <mesh position={[0, 0, 0.6]} scale={[zoomInterior, zoomInterior, 1]}>
          <planeGeometry args={[56, 31.5]} />
          <meshBasicMaterial
            map={texInterior}
            transparent
            opacity={opacityInterior}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* 5. Scene 06 & 07: 24/7 Moment (Glowing Nighttime Beacon) */}
      {opacityNight > 0.01 && (
        <mesh position={[0, 0, 0.8]} scale={[zoomNight, zoomNight, 1]}>
          <planeGeometry args={[56, 31.5]} />
          <meshBasicMaterial
            map={texNight}
            transparent
            opacity={opacityNight}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* 6. Scene 09, 10, 11: Regional Network Expansion (Aerial Twilight Highway) */}
      {opacityExpansion > 0.01 && (
        <mesh position={[0, 0, 1.0]} scale={[zoomExpansion, zoomExpansion, 1]}>
          <planeGeometry args={[56, 31.5]} />
          <meshBasicMaterial
            map={texExpansion}
            transparent
            opacity={opacityExpansion}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* 7. Scene 16 & Finale: Return to Glowing Night Store */}
      {opacityFinale > 0.01 && (
        <mesh position={[0, 0, 1.2]}>
          <planeGeometry args={[56, 31.5]} />
          <meshBasicMaterial
            map={texNight}
            transparent
            opacity={opacityFinale}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export function OrganicTrees() {
  const journeyProgress = useStore((state) => state.journeyProgress);

  // Progressive growth in Scene 02 (progress 0.04 to 0.20)
  const treeScale = Math.min(1, Math.max(0, (journeyProgress - 0.04) * 6));

  // Realistic roadside tree layout
  const treeData = useMemo(() => {
    const trees = [];
    // West/Left highway tree line (indigenous Indian neem / deciduous trees)
    for (let z = -90; z <= 40; z += 12) {
      const x = -8.5 - Math.random() * 8;
      const height = 5.8 + Math.random() * 2.8;
      const rot = Math.random() * Math.PI * 2;
      trees.push({ pos: [x, 0, z], height, rot, type: 'neem' });
    }
    // East/Right highway tree line (leaving opening for store between z: -16 and 16)
    for (let z = -90; z <= 40; z += 14) {
      if (z > -16 && z < 16) continue;
      const x = 18 + Math.random() * 8;
      const height = 5.4 + Math.random() * 3.0;
      const rot = Math.random() * Math.PI * 2;
      trees.push({ pos: [x, 0, z], height, rot, type: 'neem' });
    }
    return trees;
  }, []);

  if (treeScale <= 0.01) return null;

  return (
    <group>
      {/* 1. Realistic Roadside Trees with Sculpted Trunks & Layered Canopies */}
      {treeData.map((tree, idx) => (
        <group
          key={idx}
          position={tree.pos}
          scale={[treeScale, treeScale, treeScale]}
          rotation={[0, tree.rot, 0]}
        >
          {/* Tapered Woody Trunk */}
          <mesh position={[0, tree.height * 0.35, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.42, tree.height * 0.7, 10]} />
            <meshStandardMaterial color="#38281E" roughness={0.92} />
          </mesh>

          {/* Primary Asymmetric Branch 1 */}
          <mesh
            position={[0.35, tree.height * 0.58, 0.25]}
            rotation={[0.35, 0.5, 0.45]}
            castShadow
          >
            <cylinderGeometry args={[0.13, 0.2, tree.height * 0.45, 8]} />
            <meshStandardMaterial color="#38281E" roughness={0.92} />
          </mesh>

          {/* Primary Asymmetric Branch 2 */}
          <mesh
            position={[-0.3, tree.height * 0.62, -0.2]}
            rotation={[-0.3, -0.4, -0.4]}
            castShadow
          >
            <cylinderGeometry args={[0.12, 0.18, tree.height * 0.4, 8]} />
            <meshStandardMaterial color="#38281E" roughness={0.92} />
          </mesh>

          {/* Multi-Tiered Organic Canopy Clusters */}
          {/* Lower Canopy Body (Deep Forest Olive) */}
          <mesh position={[0, tree.height * 0.72, 0]} castShadow>
            <icosahedronGeometry args={[tree.height * 0.46, 2]} />
            <meshStandardMaterial
              color="#223B27"
              roughness={0.82}
            />
          </mesh>

          {/* Mid-Tier Foliage (Warm Botanical Green) */}
          <mesh position={[0.45, tree.height * 0.88, -0.3]} castShadow>
            <icosahedronGeometry args={[tree.height * 0.38, 2]} />
            <meshStandardMaterial
              color="#2F5236"
              roughness={0.78}
            />
          </mesh>

          {/* Crown Cluster (Sunlit Leaf Sage) */}
          <mesh position={[-0.25, tree.height * 1.02, 0.25]} castShadow>
            <icosahedronGeometry args={[tree.height * 0.32, 2]} />
            <meshStandardMaterial
              color="#3D6A47"
              roughness={0.75}
            />
          </mesh>
        </group>
      ))}

      {/* 2. Modern Street Light Poles with Realistic Luminaire Heads */}
      {[-80, -40, 0, 40].map((zPos, sIdx) => (
        <group key={`street-light-${sIdx}`} position={[-6.2, 0, zPos]}>
          {/* Galvanized Steel Pole */}
          <mesh position={[0, 4.0, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.14, 8.0, 12]} />
            <meshStandardMaterial color="#555A60" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Overhanging Luminaire Arm */}
          <mesh position={[0.7, 7.8, 0]} rotation={[0, 0, -0.4]}>
            <cylinderGeometry args={[0.07, 0.07, 1.6, 8]} />
            <meshStandardMaterial color="#555A60" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Luminaire Head */}
          <mesh position={[1.4, 7.6, 0]}>
            <boxGeometry args={[0.7, 0.15, 0.35]} />
            <meshStandardMaterial color="#2E3338" roughness={0.5} />
          </mesh>
          {/* Downward Light Glow */}
          <pointLight position={[1.4, 7.4, 0]} color="#FFE8C7" intensity={journeyProgress > 0.65 ? 2.8 : 0.4} distance={16} />
        </group>
      ))}

      {/* 3. Manicured Greenery & Landscaped Planters in Front of Store */}
      {[-10, -5, 5, 10].map((zPos, idx) => (
        <group key={`landscape-bed-${idx}`} position={[6.4, 0.18, zPos]}>
          {/* Concrete Planter Curb */}
          <mesh position={[0, 0.2, 0]} receiveShadow>
            <boxGeometry args={[1.2, 0.35, 2.8]} />
            <meshStandardMaterial color="#8E887E" roughness={0.85} />
          </mesh>
          {/* Dark Soil */}
          <mesh position={[0, 0.36, 0]}>
            <boxGeometry args={[1.0, 0.05, 2.6]} />
            <meshStandardMaterial color="#2A2016" roughness={0.95} />
          </mesh>
          {/* Ornamental Green Shrub Clusters */}
          {[-0.8, 0, 0.8].map((sZ, sI) => (
            <mesh key={sI} position={[0, 0.55, sZ]} castShadow>
              <dodecahedronGeometry args={[0.32, 1]} />
              <meshStandardMaterial color={sI % 2 === 0 ? "#2D5434" : "#3B6945"} roughness={0.8} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

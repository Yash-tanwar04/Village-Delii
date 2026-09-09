import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export function ExpansionMap() {
  const journeyProgress = useStore((state) => state.journeyProgress);
  const openModal = useStore((state) => state.openModal);
  const pulseRef = useRef([]);

  // Visible during regional expansion phase (progress 0.74 to 0.94)
  const isVisible = journeyProgress > 0.72 && journeyProgress < 0.95;
  const opacity = Math.min(1, Math.max(0, (journeyProgress - 0.72) * 8));

  // Pulse animation for network nodes
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    pulseRef.current.forEach((ring, i) => {
      if (ring) {
        const s = 1 + (Math.sin(t * 3.5 + i * 1.2) + 1) * 0.4;
        ring.scale.set(s, s, 1);
      }
    });
  });

  if (!isVisible) return null;

  // Regional Network Nodes strictly from PDF Page 12, 14, 15
  const nodes = [
    { id: "punjab", name: "Punjab Flagship", tag: "Active 24/7", pos: [-12, 1.0, -10], color: "#C86B4A", region: "Punjab" },
    { id: "ambala", name: "Ambala GT Corridor", tag: "Highway Hub", pos: [-6, 1.0, -4], color: "#C86B4A", region: "Haryana" },
    { id: "sec-114", name: "Sector 114 (Dwarka Exp)", tag: "Preview / Upcoming", pos: [5, 1.0, 4], color: "#4CAF50", region: "Gurgaon" },
    { id: "sec-83", name: "Sector 83 (New Gurgaon)", tag: "Preview / Upcoming", pos: [-3, 1.0, 8], color: "#F5A623", region: "Gurgaon" },
    { id: "kd-square", name: "K.D. Square (Sohna Rd)", tag: "Preview / Upcoming", pos: [0, 1.0, 7], color: "#4CAF50", region: "Gurgaon" },
    { id: "jms-marine", name: "JMS Marine Square", tag: "Preview / Upcoming", pos: [7, 1.0, 8], color: "#4CAF50", region: "Gurgaon" },
  ];

  return (
    <group position={[0, 8, -5]}>
      {/* 1. Deep Topographic Terrain Relief Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[75, 55, 32, 32]} />
        <meshStandardMaterial
          color="#0F1713"
          roughness={0.9}
          metalness={0.15}
        />
      </mesh>

      {/* Subtle Topographical Elevation Grid */}
      <gridHelper
        args={[75, 30, "#2D4C3A", "#1A2A20"]}
        position={[0, 0.04, 0]}
      />

      {/* 2. Luminous Arterial Highway Veins (Punjab -> Haryana -> North India) */}
      {/* Vein 1: Punjab to Haryana Trunk */}
      <mesh position={[-9, 0.35, -7]} rotation={[-Math.PI / 2, 0, 0.55]}>
        <planeGeometry args={[0.3, 16]} />
        <meshBasicMaterial color="#E8A858" transparent opacity={0.85 * opacity} />
      </mesh>

      {/* Vein 2: GT Corridor to Gurgaon Gateway */}
      <mesh position={[-2, 0.35, -1]} rotation={[-Math.PI / 2, 0, -0.6]}>
        <planeGeometry args={[0.3, 13]} />
        <meshBasicMaterial color="#E8A858" transparent opacity={0.85 * opacity} />
      </mesh>

      {/* Vein 3: Gurgaon Expressway Network */}
      <mesh position={[2.5, 0.35, 6]} rotation={[-Math.PI / 2, 0, 0.25]}>
        <planeGeometry args={[0.35, 11]} />
        <meshBasicMaterial color="#6BCB77" transparent opacity={0.9 * opacity} />
      </mesh>

      {/* 3. High-End 3D Location Markers with HTML Tooltips */}
      {nodes.map((node, idx) => (
        <group
          key={node.id}
          position={node.pos}
          onClick={() => openModal('locations')}
          className="cursor-pointer"
        >
          {/* Animated Glowing Halo Ground Ripple */}
          <mesh
            ref={(el) => (pulseRef.current[idx] = el)}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.05, 0]}
          >
            <ringGeometry args={[0.6, 1.2, 32]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.55 * opacity} />
          </mesh>

          {/* Vertical Light Core Pin */}
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 2.0, 12]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.2}
            />
          </mesh>

          {/* Top Floating Landmark Sphere */}
          <mesh position={[0, 2.1, 0]}>
            <sphereGeometry args={[0.34, 18, 18]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.5}
            />
          </mesh>

          {/* Elegant 3D HTML Spatial Badge */}
          <Html position={[0, 2.8, 0]} center distanceFactor={28}>
            <div className="pointer-events-none px-3 py-1 rounded-full bg-[#172B3A]/90 backdrop-blur-md text-white border border-[#C86B4A]/40 text-[11px] whitespace-nowrap shadow-lg flex items-center gap-1.5 font-sans">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }}></span>
              <span className="font-bold">{node.name}</span>
              <span className="text-[9px] text-[#E5D8C5] opacity-80">({node.tag})</span>
            </div>
          </Html>
        </group>
      ))}

      {/* 4. Scene 13: 4 Opportunity Pillars (Property, Fuel, Business, Institutional) */}
      <group position={[14, 0, -2]}>
        {[
          { title: "Property Owners", z: -6, cat: "Property" },
          { title: "Fuel Stations", z: -2, cat: "Franchise / Partnership" },
          { title: "Business Partners", z: 2, cat: "Business Collaboration" },
          { title: "Institutional Partners", z: 6, cat: "Business Collaboration" },
        ].map((item, i) => (
          <group
            key={i}
            position={[0, 1.8, item.z]}
            onClick={() => openModal('partner', { selectedPartnerCategory: item.cat })}
            className="cursor-pointer"
          >
            {/* Architectural Pylon Pillar */}
            <mesh castShadow>
              <boxGeometry args={[1.3, 3.6, 2.4]} />
              <meshStandardMaterial
                color="#C86B4A"
                roughness={0.25}
                metalness={0.75}
              />
            </mesh>
            {/* Warm Illuminated Top Accent */}
            <mesh position={[0, 1.9, 0]}>
              <boxGeometry args={[1.4, 0.22, 2.5]} />
              <meshStandardMaterial
                color="#F7F4ED"
                emissive="#FFAA5A"
                emissiveIntensity={1.2}
              />
            </mesh>
            {/* 3D Label */}
            <Html position={[0, 2.3, 0]} center distanceFactor={26}>
              <div className="pointer-events-none px-2.5 py-1 rounded-lg bg-[#202321]/90 backdrop-blur-sm text-white text-[10px] font-bold whitespace-nowrap border border-[#C86B4A]/30">
                {item.title}
              </div>
            </Html>
          </group>
        ))}
      </group>
    </group>
  );
}

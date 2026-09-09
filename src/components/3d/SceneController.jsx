import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export function SceneController() {
  const { camera } = useThree();
  const journeyProgress = useStore((state) => state.journeyProgress);

  // Smoothly interpolated target lookAt vector
  const currentLookAt = useRef(new THREE.Vector3(0, 1.8, 0));

  // 1. Street-Level Realistic Camera Trajectory Spline
  // Glides right along the road at eye-level, approaches store, slides through doors, walks down the aisle,
  // navigates the craft stations, pauses for 24/7 day-to-night, and cranes up to the regional network!
  const cameraSpline = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.2, 28),     // 01: On the street road looking towards dawn horizon
      new THREE.Vector3(0, 2.0, 18),     // 02: Cruising along the asphalt road
      new THREE.Vector3(5.5, 2.1, 10),   // 03: Turning towards the store entrance & forecourt
      new THREE.Vector3(6.4, 2.0, 1.5),  // 04: Approaching the automatic sliding glass doors
      new THREE.Vector3(9.5, 2.0, -0.5), // 04: Gliding across the threshold into the interior
      new THREE.Vector3(12.0, 1.95, -1.8), // 05: Flying down the main aisle (Produce & Bakery)
      new THREE.Vector3(14.2, 1.9, 1.5),  // 05: Focusing on Flour Mill, Juice Bar & Lounge
      new THREE.Vector3(11.5, 2.1, 0.0),  // 06: 24/7 Time-lapse (looking through front glass)
      new THREE.Vector3(5.0, 2.6, 9.0),   // 07 & 08: Exiting back onto the street outside
      new THREE.Vector3(0, 15, 22),       // 09: Camera cranes up, highway expands
      new THREE.Vector3(0, 30, 16),       // 10 & 11: Regional North India Topo Map
      new THREE.Vector3(5, 24, 12),       // 12 & 13: Opportunity Pylons & Location Hubs
      new THREE.Vector3(0, 3.8, 25),      // 16 & Finale: Glowing street view of the store at night
    ], false, 'centripetal');
  }, []);

  // 2. Continuous LookAt Focus Target Spline
  const lookAtSpline = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.8, 0),       // 01: Horizon
      new THREE.Vector3(0, 1.6, -15),     // 02: Down the road
      new THREE.Vector3(12.5, 2.4, 0),    // 03: Facing store facade
      new THREE.Vector3(12.5, 2.1, 0),    // 04: Looking directly through sliding doors
      new THREE.Vector3(12.5, 1.9, -2),   // 04: Looking at fresh produce & bakery aisle
      new THREE.Vector3(14.5, 1.8, 2),    // 05: Looking at flour mill & lounge
      new THREE.Vector3(5.0, 1.9, 0),     // 06: Looking out through glass onto the street
      new THREE.Vector3(12.5, 2.4, 0),    // 07 & 08: Looking back at store building
      new THREE.Vector3(6.0, 1.0, -10),   // 09: Looking at expanding road
      new THREE.Vector3(0, 8.0, -5),      // 10 & 11: Looking at map center
      new THREE.Vector3(5.0, 8.0, 0),     // 12 & 13: Looking at opportunity pylons
      new THREE.Vector3(12.5, 2.4, 0),    // Finale: Looking at glowing store at night
    ], false, 'centripetal');
  }, []);

  useFrame((_, delta) => {
    const t = Math.min(0.999, Math.max(0.001, journeyProgress));
    
    // Evaluate target position and lookAt on the splines
    const targetPos = cameraSpline.getPointAt(t);
    const targetLook = lookAtSpline.getPointAt(t);

    // Highly responsive, silky smooth delta frame damping (solid 60 FPS)
    const lerpSpeed = Math.min(1, delta * 4.2);
    camera.position.lerp(targetPos, lerpSpeed);
    currentLookAt.current.lerp(targetLook, lerpSpeed);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

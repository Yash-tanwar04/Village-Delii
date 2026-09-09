import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Compass, Sparkles, Orbit, Wind, Play, Pause } from 'lucide-react';

export function ConstellationCanvas({
  className = '',
  compact = false,
  showControls = true,
  height = 'min-h-[550px]',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentMode, setCurrentMode] = useState('constellation'); // 'drift' | 'spiral' | 'constellation'
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // References for animation state
  const stateRef = useRef({
    mode: 'constellation',
    tMorph: 1.0, // 0 = drift, 0.5 = spiral, 1.0 = constellation
    rotationSpeed: 0.003,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    particleCount: 2200,
    animating: true,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x172B3A, 0.018);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- 2. GENERATE PROCEDURAL GLOWING STAR TEXTURE ---
    const createStarTexture = () => {
      const size = 128;
      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const ctx = c.getContext('2d');

      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.18, 'rgba(235, 220, 200, 0.9)');
      gradient.addColorStop(0.4, 'rgba(200, 107, 74, 0.45)');
      gradient.addColorStop(0.7, 'rgba(168, 178, 155, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      const texture = new THREE.CanvasTexture(c);
      texture.needsUpdate = true;
      return texture;
    };

    const starTexture = createStarTexture();

    // --- 3. GEOMETRY & COORDINATES GENERATION ---
    const count = stateRef.current.particleCount;

    const positions = new Float32Array(count * 3);
    const driftPositions = new Float32Array(count * 3);
    const spiralPositions = new Float32Array(count * 3);
    const constellationPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randomPhases = new Float32Array(count);

    // Palette Colors
    const colorTerracotta = new THREE.Color(0xC86B4A);
    const colorWarmSand = new THREE.Color(0xE5D8C5);
    const colorSoftSage = new THREE.Color(0xA8B29B);
    const colorStarlight = new THREE.Color(0xFFFFFF);

    // Anchor Nodes for Constellation (8-point Navigational Compass Star)
    const primaryStarPoints = [];

    // Outer Cardinal Tips (N, E, S, W) - Radius 7.2
    primaryStarPoints.push(new THREE.Vector3(0, 7.2, 0));
    primaryStarPoints.push(new THREE.Vector3(7.2, 0, 0));
    primaryStarPoints.push(new THREE.Vector3(0, -7.2, 0));
    primaryStarPoints.push(new THREE.Vector3(-7.2, 0, 0));

    // Outer Diagonal Tips (NE, SE, SW, NW) - Radius 4.8
    const diagR = 4.8;
    const diagCos = Math.cos(Math.PI / 4) * diagR;
    primaryStarPoints.push(new THREE.Vector3(diagCos, diagCos, 0));
    primaryStarPoints.push(new THREE.Vector3(diagCos, -diagCos, 0));
    primaryStarPoints.push(new THREE.Vector3(-diagCos, -diagCos, 0));
    primaryStarPoints.push(new THREE.Vector3(-diagCos, diagCos, 0));

    // Inner Notch Points - Radius 2.2
    const innerPoints = [];
    for (let i = 0; i < 8; i++) {
      const ang = (i * Math.PI) / 4 + Math.PI / 8;
      innerPoints.push(new THREE.Vector3(Math.cos(ang) * 2.2, Math.sin(ang) * 2.2, 0));
    }

    const centerPoint = new THREE.Vector3(0, 0, 0);
    const lineVertices = [];

    // 1. Cardinal and Diagonal spine lines through center
    primaryStarPoints.forEach((pt) => {
      lineVertices.push(pt.x, pt.y, pt.z);
      lineVertices.push(centerPoint.x, centerPoint.y, centerPoint.z);
    });

    // 2. Compass Star Perimeter (Tips connecting to inner notches)
    const starPerimeter = [
      primaryStarPoints[0], innerPoints[0],
      primaryStarPoints[4], innerPoints[1],
      primaryStarPoints[1], innerPoints[2],
      primaryStarPoints[5], innerPoints[3],
      primaryStarPoints[2], innerPoints[4],
      primaryStarPoints[6], innerPoints[5],
      primaryStarPoints[3], innerPoints[6],
      primaryStarPoints[7], innerPoints[7],
      primaryStarPoints[0]
    ];

    for (let i = 0; i < starPerimeter.length - 1; i++) {
      lineVertices.push(starPerimeter[i].x, starPerimeter[i].y, starPerimeter[i].z);
      lineVertices.push(starPerimeter[i + 1].x, starPerimeter[i + 1].y, starPerimeter[i + 1].z);
    }

    // 3. Concentric celestial guidance ring segments
    const ringSegments = 32;
    const ringRadius = 5.6;
    for (let i = 0; i < ringSegments; i++) {
      const a1 = (i / ringSegments) * Math.PI * 2;
      const a2 = ((i + 1) / ringSegments) * Math.PI * 2;
      lineVertices.push(Math.cos(a1) * ringRadius, Math.sin(a1) * ringRadius, 0);
      lineVertices.push(Math.cos(a2) * ringRadius, Math.sin(a2) * ringRadius, 0);
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3));
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xC86B4A,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5,
    });
    const constellationLines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(constellationLines);

    // --- POPULATE PARTICLE COORDINATES ACROSS THE 3 STATES ---
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      randomPhases[i] = Math.random() * Math.PI * 2;

      // --- STATE 1: DRIFT (Loose scattered stars floating in cosmic sphere) ---
      const driftRad = 7 + Math.random() * 20;
      const driftTheta = Math.random() * Math.PI * 2;
      const driftPhi = Math.acos(Math.random() * 2 - 1);

      driftPositions[i3] = driftRad * Math.sin(driftPhi) * Math.cos(driftTheta);
      driftPositions[i3 + 1] = driftRad * Math.sin(driftPhi) * Math.sin(driftTheta);
      driftPositions[i3 + 2] = driftRad * Math.cos(driftPhi) * 0.8;

      // --- STATE 2: SPIRAL (Logarithmic Fibonacci swirl vortex) ---
      const numArms = 3;
      const armIndex = i % numArms;
      const spiralProgress = (i / count);
      const spiralAngle = spiralProgress * Math.PI * 8 + (armIndex * (Math.PI * 2)) / numArms;
      const spiralR = 0.5 + Math.pow(spiralProgress, 0.75) * 16.5;
      const spiralSpread = (Math.random() - 0.5) * (1.2 + spiralProgress * 2.0);
      const zCurvature = Math.sin(spiralProgress * Math.PI * 2) * 2.2 - (spiralR * 0.15);

      spiralPositions[i3] = Math.cos(spiralAngle) * spiralR + spiralSpread;
      spiralPositions[i3 + 1] = Math.sin(spiralAngle) * spiralR + spiralSpread;
      spiralPositions[i3 + 2] = zCurvature + (Math.random() - 0.5) * 1.5;

      // --- STATE 3: CONSTELLATION (Figure you can navigate by) ---
      if (i < 8) {
        // Major 8 Cardinal & Diagonal star tips
        const pt = primaryStarPoints[i];
        constellationPositions[i3] = pt.x;
        constellationPositions[i3 + 1] = pt.y;
        constellationPositions[i3 + 2] = pt.z;
        sizes[i] = 2.4;
        colorStarlight.toArray(colors, i3);
      } else if (i < 16) {
        // 8 Inner notch stars
        const pt = innerPoints[i - 8];
        constellationPositions[i3] = pt.x;
        constellationPositions[i3 + 1] = pt.y;
        constellationPositions[i3 + 2] = pt.z;
        sizes[i] = 1.8;
        colorTerracotta.toArray(colors, i3);
      } else if (i < 30) {
        // Center core star cluster (Navigational Polaris beacon)
        const rad = Math.random() * 0.6;
        const ang = Math.random() * Math.PI * 2;
        constellationPositions[i3] = Math.cos(ang) * rad;
        constellationPositions[i3 + 1] = Math.sin(ang) * rad;
        constellationPositions[i3 + 2] = (Math.random() - 0.5) * 0.3;
        sizes[i] = 2.0;
        colorStarlight.toArray(colors, i3);
      } else if (i < 400) {
        // Star lines interpolation (dense starlight highlighting the compass beams)
        const beamIdx = i % 8;
        const targetPt = primaryStarPoints[beamIdx];
        const frac = Math.random();
        constellationPositions[i3] = targetPt.x * frac + (Math.random() - 0.5) * 0.15;
        constellationPositions[i3 + 1] = targetPt.y * frac + (Math.random() - 0.5) * 0.15;
        constellationPositions[i3 + 2] = (Math.random() - 0.5) * 0.2;
        sizes[i] = 1.1 + Math.random() * 0.7;

        const cChoice = Math.random();
        if (cChoice < 0.5) colorTerracotta.toArray(colors, i3);
        else if (cChoice < 0.8) colorWarmSand.toArray(colors, i3);
        else colorStarlight.toArray(colors, i3);
      } else if (i < 900) {
        // Guidance Orbit Ring (Circle around compass at R = 5.6)
        const ringAng = Math.random() * Math.PI * 2;
        const radJitter = 5.6 + (Math.random() - 0.5) * 0.35;
        constellationPositions[i3] = Math.cos(ringAng) * radJitter;
        constellationPositions[i3 + 1] = Math.sin(ringAng) * radJitter;
        constellationPositions[i3 + 2] = (Math.random() - 0.5) * 0.4;
        sizes[i] = 0.9 + Math.random() * 0.6;

        colorSoftSage.toArray(colors, i3);
      } else if (i < 1500) {
        // Outer Celestial Halo Ring (R = 9.0)
        const outerAng = Math.random() * Math.PI * 2;
        const outR = 9.0 + (Math.random() - 0.5) * 0.6;
        constellationPositions[i3] = Math.cos(outerAng) * outR;
        constellationPositions[i3 + 1] = Math.sin(outerAng) * outR;
        constellationPositions[i3 + 2] = (Math.random() - 0.5) * 0.8;
        sizes[i] = 0.7 + Math.random() * 0.5;

        colorWarmSand.toArray(colors, i3);
      } else {
        // Background cosmic field dust surrounding the resolved figure
        const dustR = 3.0 + Math.random() * 14.0;
        const dustAng = Math.random() * Math.PI * 2;
        const dustZ = (Math.random() - 0.5) * 6.0;
        constellationPositions[i3] = Math.cos(dustAng) * dustR;
        constellationPositions[i3 + 1] = Math.sin(dustAng) * dustR;
        constellationPositions[i3 + 2] = dustZ;
        sizes[i] = 0.5 + Math.random() * 0.6;

        const pC = Math.random();
        if (pC < 0.4) colorTerracotta.toArray(colors, i3);
        else if (pC < 0.7) colorWarmSand.toArray(colors, i3);
        else colorSoftSage.toArray(colors, i3);
      }

      // Initial positions set to Constellation
      positions[i3] = constellationPositions[i3];
      positions[i3 + 1] = constellationPositions[i3 + 1];
      positions[i3 + 2] = constellationPositions[i3 + 2];
    }

    // --- 4. CREATE POINTS MESH ---
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.55,
      map: starTexture,
      transparent: true,
      opacity: 0.92,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // --- 5. MOUSE INTERACTION TRACKER ---
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.mouse.targetX = x * 1.5;
      stateRef.current.mouse.targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- 6. GSAP MORPH CHOREOGRAPHY ---
    const morphToMode = (targetMode) => {
      stateRef.current.mode = targetMode;
      setCurrentMode(targetMode);

      let targetVal = 1.0;
      if (targetMode === 'drift') targetVal = 0.0;
      else if (targetMode === 'spiral') targetVal = 0.5;
      else if (targetMode === 'constellation') targetVal = 1.0;

      gsap.to(stateRef.current, {
        tMorph: targetVal,
        duration: 2.2,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (constellationLines) {
            const lineOpacity = Math.max(0, (stateRef.current.tMorph - 0.6) / 0.4);
            constellationLines.material.opacity = lineOpacity * 0.75;
          }
        },
      });
    };

    let autoCycleTimer;
    const cycleSequence = ['drift', 'spiral', 'constellation'];
    let cycleIndex = 2;

    const scheduleNextCycle = () => {
      if (!stateRef.current.animating) return;
      autoCycleTimer = setTimeout(() => {
        cycleIndex = (cycleIndex + 1) % cycleSequence.length;
        morphToMode(cycleSequence[cycleIndex]);
        scheduleNextCycle();
      }, 7000);
    };

    scheduleNextCycle();

    container.__setMode = (m) => {
      clearTimeout(autoCycleTimer);
      stateRef.current.animating = false;
      setIsAutoPlaying(false);
      morphToMode(m);
    };

    container.__toggleAutoPlay = () => {
      setIsAutoPlaying((prev) => {
        const next = !prev;
        stateRef.current.animating = next;
        if (next) {
          scheduleNextCycle();
        } else {
          clearTimeout(autoCycleTimer);
        }
        return next;
      });
    };

    // --- 7. RENDER LOOP ---
    const startTime = performance.now();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;
      const t = stateRef.current.tMorph;

      stateRef.current.mouse.x += (stateRef.current.mouse.targetX - stateRef.current.mouse.x) * 0.05;
      stateRef.current.mouse.y += (stateRef.current.mouse.targetY - stateRef.current.mouse.y) * 0.05;

      camera.position.x = stateRef.current.mouse.x * 2.0;
      camera.position.y = stateRef.current.mouse.y * 2.0;
      camera.lookAt(0, 0, 0);

      const rotBaseSpeed = t < 0.6 ? 0.005 : 0.0015;
      particles.rotation.z += rotBaseSpeed;
      constellationLines.rotation.z = particles.rotation.z;

      particles.rotation.x = Math.sin(elapsedTime * 0.4) * 0.08 + stateRef.current.mouse.y * 0.15;
      particles.rotation.y = Math.cos(elapsedTime * 0.3) * 0.08 + stateRef.current.mouse.x * 0.15;
      constellationLines.rotation.x = particles.rotation.x;
      constellationLines.rotation.y = particles.rotation.y;

      const pos = particlesGeometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const phase = randomPhases[i];

        const wobbleX = Math.sin(elapsedTime * 1.2 + phase) * 0.35;
        const wobbleY = Math.cos(elapsedTime * 0.9 + phase) * 0.35;
        const wobbleZ = Math.sin(elapsedTime * 1.5 + phase) * 0.2;

        let curX, curY, curZ;

        if (t < 0.5) {
          const p = t / 0.5;
          const easeP = p * p * (3 - 2 * p);

          curX = driftPositions[i3] * (1 - easeP) + spiralPositions[i3] * easeP + wobbleX * (1 - easeP * 0.5);
          curY = driftPositions[i3 + 1] * (1 - easeP) + spiralPositions[i3 + 1] * easeP + wobbleY * (1 - easeP * 0.5);
          curZ = driftPositions[i3 + 2] * (1 - easeP) + spiralPositions[i3 + 2] * easeP + wobbleZ;
        } else {
          const p = (t - 0.5) / 0.5;
          const easeP = p * p * (3 - 2 * p);

          const breath = (1 - easeP) * 0.4 + 0.05;
          curX = spiralPositions[i3] * (1 - easeP) + constellationPositions[i3] * easeP + wobbleX * breath;
          curY = spiralPositions[i3 + 1] * (1 - easeP) + constellationPositions[i3 + 1] * easeP + wobbleY * breath;
          curZ = spiralPositions[i3 + 2] * (1 - easeP) + constellationPositions[i3 + 2] * easeP + wobbleZ * breath;
        }

        pos[i3] = curX;
        pos[i3 + 1] = curY;
        pos[i3 + 2] = curZ;
      }

      particlesGeometry.attributes.position.needsUpdate = true;

      if (constellationLines.material.opacity > 0.05) {
        const pulse = 0.65 + Math.sin(elapsedTime * 2.0) * 0.15;
        constellationLines.material.opacity = ((stateRef.current.tMorph - 0.5) / 0.5) * pulse;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 8. RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(autoCycleTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      starTexture.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#172B3A] text-white select-none ${height} ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Atmospheric Vignette & Radial Light Leak */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(23,43,58,0.4)_60%,rgba(23,43,58,0.95)_100%)]" />

      {/* Top Floating Badge & Poetic Statement */}
      {showControls && (
        <div
          className={`absolute ${
            compact ? 'top-3 left-3 right-3' : 'top-6 left-6 right-6 md:top-8 md:left-10 md:right-10'
          } flex flex-col md:flex-row md:items-center justify-between gap-3 pointer-events-none z-10 text-left`}
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C86B4A]/30 text-[10px] font-mono tracking-widest text-[#E5D8C5]">
              <Sparkles className="w-3 h-3 text-[#C86B4A] animate-pulse" />
              <span>{compact ? '3D SIGNAL' : 'CELESTIAL BEACON • 3D CONSTELLATION'}</span>
            </div>
            {!compact && (
              <p className="text-xs text-[#E5D8C5]/85 max-w-lg leading-relaxed font-light hidden sm:block">
                "Loose stars drift and settle until the spiral resolves into one constellation — turning scattered signal into a figure you can navigate by."
              </p>
            )}
          </div>

          {/* Phase State Pill Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-black/50 backdrop-blur-xl border border-white/15 pointer-events-auto self-start md:self-auto shadow-2xl">
            <button
              onClick={() => containerRef.current?.__setMode?.('drift')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                currentMode === 'drift'
                  ? 'bg-[#C86B4A] text-white shadow-md font-bold'
                  : 'text-[#E5D8C5]/70 hover:text-white hover:bg-white/10'
              }`}
              title="Drift: Scattered Signal"
            >
              <Wind className="w-3 h-3" />
              <span>{compact ? 'Drift' : '01. Drift'}</span>
            </button>

            <button
              onClick={() => containerRef.current?.__setMode?.('spiral')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                currentMode === 'spiral'
                  ? 'bg-[#C86B4A] text-white shadow-md font-bold'
                  : 'text-[#E5D8C5]/70 hover:text-white hover:bg-white/10'
              }`}
              title="Spiral: Gravitational Vortex"
            >
              <Orbit className="w-3 h-3" />
              <span>{compact ? 'Spiral' : '02. Spiral'}</span>
            </button>

            <button
              onClick={() => containerRef.current?.__setMode?.('constellation')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                currentMode === 'constellation'
                  ? 'bg-[#C86B4A] text-white shadow-md font-bold'
                  : 'text-[#E5D8C5]/70 hover:text-white hover:bg-white/10'
              }`}
              title="Constellation: Navigational Star Figure"
            >
              <Compass className="w-3 h-3" />
              <span>{compact ? 'Star' : '03. Constellation'}</span>
            </button>

            <button
              onClick={() => containerRef.current?.__toggleAutoPlay?.()}
              className={`p-1.5 rounded-full transition-colors ${
                isAutoPlaying ? 'text-[#C86B4A] hover:text-white' : 'text-white/40 hover:text-white'
              }`}
              title={isAutoPlaying ? 'Pause Auto Cycle' : 'Resume Auto Cycle'}
            >
              {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        </div>
      )}

      {/* Bottom Celestial Meta Status */}
      <div
        className={`absolute ${
          compact ? 'bottom-3 left-3 right-3' : 'bottom-6 left-6 right-6'
        } flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#E5D8C5]/70 pointer-events-none z-10`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C86B4A] animate-ping" />
          <span className="text-[#E5D8C5] font-semibold uppercase">
            {compact ? currentMode : `Active Signal: ${currentMode.toUpperCase()}`}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[10px] text-[#A8B29B]">
          <span>RA 14h 29m • DEC +62°</span>
          <span>•</span>
          <span>COMPASS STAR</span>
        </div>
      </div>
    </div>
  );
}

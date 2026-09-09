import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Cache procedural lunar textures so they are generated ONCE across the app lifecycle
let cachedMoonColorTexture = null;
let cachedMoonBumpTexture = null;

function getMoonTextures() {
  if (cachedMoonColorTexture && cachedMoonBumpTexture) {
    return { colorTexture: cachedMoonColorTexture, bumpTexture: cachedMoonBumpTexture };
  }

  const width = 1024;
  const height = 512;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const cctx = colorCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bctx = bumpCanvas.getContext('2d');

  function hash(x, y) {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
    return s - Math.floor(s);
  }

  function noise(x, y) {
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;
    const u = fx * fx * (3 - 2 * fx);
    const v = fy * fy * (3 - 2 * fy);

    const a = hash(i, j);
    const b = hash(i + 1, j);
    const c = hash(i, j + 1);
    const d = hash(i + 1, j + 1);

    return a + (b - a) * u + (c - a) * v * (1 - u) + (d - b) * u * v;
  }

  function fbm(x, y, octaves = 5) {
    let val = 0;
    let amp = 0.5;
    let freq = 1.0;
    for (let o = 0; o < octaves; o++) {
      val += amp * noise(x * freq, y * freq);
      freq *= 2.05;
      amp *= 0.5;
    }
    return val;
  }

  const imgData = cctx.createImageData(width, height);
  const bumpData = bctx.createImageData(width, height);

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * 4;

      const qx = fbm(nx * 4.2, ny * 2.2, 4);
      const qy = fbm(nx * 4.2 + 5.2, ny * 2.2 + 1.3, 4);
      const mareNoise = fbm(nx * 3.8 + qx * 1.5, ny * 2.6 + qy * 1.5, 5);
      const microRoughness = (hash(x * 3.1, y * 3.1) - 0.5) * 16;

      const latMask = Math.sin(ny * Math.PI);
      const isMare = mareNoise * latMask > 0.43;

      let r, g, b, bump;
      if (isMare) {
        const basaltTone = 65 + mareNoise * 45 + microRoughness * 0.4;
        r = basaltTone * 0.95;
        g = basaltTone * 0.97;
        b = basaltTone * 1.03;
        bump = 95 + mareNoise * 30;
      } else {
        const highlandTone = 180 + mareNoise * 65 + microRoughness;
        r = highlandTone * 0.98;
        g = highlandTone * 0.99;
        b = highlandTone * 1.01;
        bump = 145 + mareNoise * 60;
      }

      imgData.data[idx] = Math.min(255, Math.max(0, r));
      imgData.data[idx + 1] = Math.min(255, Math.max(0, g));
      imgData.data[idx + 2] = Math.min(255, Math.max(0, b));
      imgData.data[idx + 3] = 255;

      bumpData.data[idx] = Math.min(255, Math.max(0, bump));
      bumpData.data[idx + 1] = Math.min(255, Math.max(0, bump));
      bumpData.data[idx + 2] = Math.min(255, Math.max(0, bump));
      bumpData.data[idx + 3] = 255;
    }
  }

  cctx.putImageData(imgData, 0, 0);
  bctx.putImageData(bumpData, 0, 0);

  // Key Craters (Tycho, Copernicus, Kepler) with soft stippled ejecta
  const keyCraters = [
    { x: 390, y: 395, r: 18, rayCount: 30, maxDist: 160 },
    { x: 330, y: 200, r: 15, rayCount: 20, maxDist: 110 },
    { x: 250, y: 220, r: 12, rayCount: 16, maxDist: 75 },
    { x: 570, y: 280, r: 14, rayCount: 0, maxDist: 0 },
    { x: 690, y: 180, r: 20, rayCount: 0, maxDist: 0 },
  ];

  keyCraters.forEach(cr => {
    if (cr.rayCount > 0) {
      for (let i = 0; i < cr.rayCount * 10; i++) {
        const angle = (i * Math.PI * 2) / (cr.rayCount * 10);
        const nDist = fbm(Math.cos(angle) * 3, Math.sin(angle) * 3, 3);
        const dist = cr.r * 0.9 + Math.pow(nDist, 1.8) * cr.maxDist;
        const px = cr.x + Math.cos(angle) * dist;
        const py = cr.y + Math.sin(angle) * dist;

        const alpha = Math.max(0, 0.42 * (1 - dist / cr.maxDist));
        cctx.fillStyle = `rgba(250, 252, 255, ${alpha.toFixed(3)})`;
        cctx.beginPath();
        cctx.arc(px, py, 1.5, 0, Math.PI * 2);
        cctx.fill();
      }
    }

    // Crater Rim
    const rimGrad = cctx.createRadialGradient(cr.x, cr.y, cr.r * 0.45, cr.x, cr.y, cr.r * 1.3);
    rimGrad.addColorStop(0, 'rgba(30, 34, 40, 0.95)');
    rimGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.95)');
    rimGrad.addColorStop(0.85, 'rgba(215, 220, 230, 0.55)');
    rimGrad.addColorStop(1, 'rgba(180, 185, 195, 0)');
    cctx.fillStyle = rimGrad;
    cctx.beginPath();
    cctx.arc(cr.x, cr.y, cr.r * 1.3, 0, Math.PI * 2);
    cctx.fill();

    // Central Peak
    cctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    cctx.beginPath();
    cctx.arc(cr.x, cr.y, cr.r * 0.2, 0, Math.PI * 2);
    cctx.fill();

    // Bump
    const bRimGrad = bctx.createRadialGradient(cr.x, cr.y, cr.r * 0.4, cr.x, cr.y, cr.r * 1.3);
    bRimGrad.addColorStop(0, '#101010');
    bRimGrad.addColorStop(0.65, '#FFFFFF');
    bRimGrad.addColorStop(0.88, '#A0A0A0');
    bRimGrad.addColorStop(1, '#808080');
    bctx.fillStyle = bRimGrad;
    bctx.beginPath();
    bctx.arc(cr.x, cr.y, cr.r * 1.3, 0, Math.PI * 2);
    bctx.fill();
  });

  cachedMoonColorTexture = new THREE.CanvasTexture(colorCanvas);
  cachedMoonColorTexture.wrapS = THREE.RepeatWrapping;
  cachedMoonColorTexture.wrapT = THREE.ClampToEdgeWrapping;

  cachedMoonBumpTexture = new THREE.CanvasTexture(bumpCanvas);
  cachedMoonBumpTexture.wrapS = THREE.RepeatWrapping;
  cachedMoonBumpTexture.wrapT = THREE.ClampToEdgeWrapping;

  return { colorTexture: cachedMoonColorTexture, bumpTexture: cachedMoonBumpTexture };
}

export function Moon3D({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 140;
    const height = canvas.clientHeight || 140;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.z = 3.3;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const moonGroup = new THREE.Group();
    moonGroup.rotation.z = THREE.MathUtils.degToRad(-8);
    moonGroup.rotation.y = THREE.MathUtils.degToRad(35);
    scene.add(moonGroup);

    // 1. Procedural 3D Lunar Sphere with Normal Bump Displacement
    const { colorTexture, bumpTexture } = getMoonTextures();
    const moonGeo = new THREE.SphereGeometry(1.0, 48, 48);

    const moonMat = new THREE.MeshStandardMaterial({
      map: colorTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.08,
      roughness: 0.94,
      metalness: 0.03,
      emissive: new THREE.Color(0x162230),
      emissiveIntensity: 0.35,
    });

    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonGroup.add(moonMesh);

    // 2. Directional light placed to sculpt a sharp 3D Curved Terminator Line
    const dirLight = new THREE.DirectionalLight(0xffffff, 4.8);
    dirLight.position.set(2.4, 1.3, 0.8);
    scene.add(dirLight);

    // Earthshine ambient fill
    const ambientLight = new THREE.AmbientLight(0x20354b, 0.7);
    scene.add(ambientLight);

    // 3. Ethereal Lunar Atmosphere Fresnel Rim
    const glowGeo = new THREE.SphereGeometry(1.025, 32, 32);
    const glowMat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPos.xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = 1.0 - abs(dot(vNormal, viewDir));
          fresnel = pow(fresnel, 3.2);
          gl_FragColor = vec4(0.72, 0.86, 1.0, fresnel * 0.85);
        }
      `,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    moonGroup.add(glowMesh);

    // RENDER ONCE: Zero continuous RAF loop, zero GPU lag!
    renderer.render(scene, camera);

    return () => {
      moonGeo.dispose();
      moonMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 drop-shadow-[0_0_30px_rgba(180,215,245,0.45)]"
      />
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Cache procedural textures so they are generated ONCE across the app lifecycle
let cachedSunTexture = null;
let cachedCoronaTexture = null;

function getSunTexture() {
  if (cachedSunTexture) return cachedSunTexture;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#D84315');
  grad.addColorStop(0.2, '#F57C00');
  grad.addColorStop(0.5, '#FFD54F');
  grad.addColorStop(0.8, '#F57C00');
  grad.addColorStop(1, '#D84315');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  function hash(x, y) {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return s - Math.floor(s);
  }

  function smoothNoise(x, y) {
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const a = hash(i, j);
    const b = hash(i + 1, j);
    const c = hash(i, j + 1);
    const d = hash(i + 1, j + 1);
    return a + (b - a) * sx + (c - a) * sy * (1 - sx) + (d - b) * sx * sy;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const n = smoothNoise(x * 0.05, y * 0.05) * 0.6 + smoothNoise(x * 0.12, y * 0.12) * 0.4;
      const heat = Math.min(1, Math.max(0, n * 1.3 - 0.15));

      data[idx] = Math.min(255, data[idx] + heat * 75);
      data[idx + 1] = Math.min(255, data[idx + 1] + heat * 90);
      data[idx + 2] = Math.min(255, heat * 135);
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Organic Active Sunspot Cluster
  const spots = [
    { x: 380, y: 220, r: 14 },
    { x: 396, y: 230, r: 8 },
    { x: 408, y: 224, r: 5 },
  ];

  spots.forEach(sp => {
    // Penumbra
    const pen = ctx.createRadialGradient(sp.x, sp.y, sp.r * 0.2, sp.x, sp.y, sp.r * 1.8);
    pen.addColorStop(0, 'rgba(60, 20, 0, 0.95)');
    pen.addColorStop(0.5, 'rgba(150, 55, 0, 0.7)');
    pen.addColorStop(1, 'rgba(255, 140, 0, 0)');
    ctx.fillStyle = pen;
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, sp.r * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Umbra
    const umb = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, sp.r * 0.65);
    umb.addColorStop(0, 'rgba(20, 5, 2, 0.99)');
    umb.addColorStop(1, 'rgba(50, 15, 0, 0.85)');
    ctx.fillStyle = umb;
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, sp.r * 0.65, 0, Math.PI * 2);
    ctx.fill();
  });

  cachedSunTexture = new THREE.CanvasTexture(canvas);
  cachedSunTexture.wrapS = THREE.RepeatWrapping;
  cachedSunTexture.wrapT = THREE.ClampToEdgeWrapping;
  return cachedSunTexture;
}

function getCoronaTexture() {
  if (cachedCoronaTexture) return cachedCoronaTexture;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(256, 256, 75, 256, 256, 250);
  grad.addColorStop(0, 'rgba(255, 245, 200, 0.95)');
  grad.addColorStop(0.18, 'rgba(255, 185, 60, 0.75)');
  grad.addColorStop(0.42, 'rgba(255, 120, 20, 0.35)');
  grad.addColorStop(0.72, 'rgba(255, 60, 0, 0.12)');
  grad.addColorStop(0.95, 'rgba(255, 30, 0, 0)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  cachedCoronaTexture = new THREE.CanvasTexture(canvas);
  return cachedCoronaTexture;
}

export function Sun3D({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 140;
    const height = canvas.clientHeight || 140;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const sunGroup = new THREE.Group();
    sunGroup.rotation.z = THREE.MathUtils.degToRad(14);
    sunGroup.rotation.y = THREE.MathUtils.degToRad(25);
    scene.add(sunGroup);

    // 1. 3D Sun Photosphere Sphere with Physical Limb Darkening
    const sunGeo = new THREE.SphereGeometry(1.0, 48, 48);
    const sunTex = getSunTexture();

    const sunMat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: sunTex },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vec4 texColor = texture2D(uTexture, vUv);
          vec3 viewDir = normalize(vViewPosition);
          float cosTheta = clamp(dot(vNormal, viewDir), 0.0, 1.0);
          float limb = pow(cosTheta, 0.42);

          vec3 finalColor = texColor.rgb * vec3(1.3, 1.15, 0.92);
          // Radiant core
          finalColor += vec3(0.4, 0.28, 0.12) * pow(cosTheta, 1.7);
          // Limb darkening
          finalColor = mix(finalColor * vec3(0.85, 0.42, 0.12), finalColor, limb);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });

    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // 2. Volumetric Solar Chromosphere Fresnel Rim
    const rimGeo = new THREE.SphereGeometry(1.035, 32, 32);
    const rimMat = new THREE.ShaderMaterial({
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
          fresnel = pow(fresnel, 2.2);
          gl_FragColor = vec4(1.0, 0.75, 0.25, fresnel * 0.9);
        }
      `,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    sunGroup.add(rimMesh);

    // 3. Radiant Solar Corona Plane
    const coronaGeo = new THREE.PlaneGeometry(3.0, 3.0);
    const coronaTex = getCoronaTexture();
    const coronaMat = new THREE.MeshBasicMaterial({
      map: coronaTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.95,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coronaMesh.position.z = -0.05;
    sunGroup.add(coronaMesh);

    // RENDER ONCE: Zero continuous RAF loop, zero GPU lag!
    renderer.render(scene, camera);

    return () => {
      sunGeo.dispose();
      sunMat.dispose();
      rimGeo.dispose();
      rimMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 drop-shadow-[0_0_30px_rgba(255,160,50,0.55)]"
      />
    </div>
  );
}

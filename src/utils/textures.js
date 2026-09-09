import * as THREE from 'three';

// Ultra-realistic procedural textures for asphalt, fluted timber, terrain, mountains, concrete, and terrazzo

export function createAsphaltTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep matte asphalt base
  ctx.fillStyle = '#1D1F24';
  ctx.fillRect(0, 0, 1024, 1024);

  // Layer 1: Stone aggregate noise
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 55;
    data[i] = Math.min(255, Math.max(0, 29 + noise));
    data[i + 1] = Math.min(255, Math.max(0, 31 + noise));
    data[i + 2] = Math.min(255, Math.max(0, 36 + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Layer 2: Subtle road wear & asphalt grain patches
  ctx.fillStyle = 'rgba(15, 17, 20, 0.4)';
  for (let j = 0; j < 80; j++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    const rw = 20 + Math.random() * 80;
    const rh = 10 + Math.random() * 40;
    ctx.fillRect(rx, ry, rw, rh);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 24);
  return texture;
}

export function createWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Warm architectural Scandinavian / Japanese fluted oak
  ctx.fillStyle = '#C89B6D';
  ctx.fillRect(0, 0, 1024, 1024);

  const slatWidth = 32;
  for (let x = 0; x < 1024; x += slatWidth) {
    // 3D cylindrical batten light-to-shadow gradient
    const grad = ctx.createLinearGradient(x, 0, x + slatWidth, 0);
    grad.addColorStop(0, '#9E7448');
    grad.addColorStop(0.15, '#DAB488');
    grad.addColorStop(0.5, '#E5C49B');
    grad.addColorStop(0.85, '#B88A58');
    grad.addColorStop(1, '#6E4928');
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, slatWidth - 2, 1024);

    // Deep shadow reveal joint between timber slats
    ctx.fillStyle = '#2A1A0F';
    ctx.fillRect(x + slatWidth - 3, 0, 3, 1024);
  }

  // Micro wood grain noise
  ctx.fillStyle = 'rgba(70, 40, 15, 0.08)';
  for (let k = 0; k < 200; k++) {
    const gx = Math.random() * 1024;
    const gy = Math.random() * 1024;
    ctx.fillRect(gx, gy, 1 + Math.random() * 2, 40 + Math.random() * 100);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createGrassTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Lush organic meadow base (blend of forest moss, warm olive, and rich soil)
  ctx.fillStyle = '#263D2B';
  ctx.fillRect(0, 0, 1024, 1024);

  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const tone = (Math.random() - 0.5) * 45;
    data[i] = Math.min(255, Math.max(0, 38 + tone * 0.9));     // R (rich earth)
    data[i + 1] = Math.min(255, Math.max(0, 64 + tone * 1.6)); // G (botanical green)
    data[i + 2] = Math.min(255, Math.max(0, 42 + tone * 0.8)); // B
  }
  ctx.putImageData(imgData, 0, 0);

  // Add subtle patches of wildflower accents and meadow variance
  ctx.fillStyle = 'rgba(76, 115, 68, 0.25)';
  for (let p = 0; p < 120; p++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 1024, Math.random() * 1024, 15 + Math.random() * 40, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
  return texture;
}

export function createMountainTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Distant misted mountain ridge gradient (aerial perspective)
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#2F4839');
  grad.addColorStop(0.4, '#243A2D');
  grad.addColorStop(0.8, '#1A2E22');
  grad.addColorStop(1, '#16241C');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createTerrazzoTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Warm polished Italian terrazzo ground
  ctx.fillStyle = '#EAE6DF';
  ctx.fillRect(0, 0, 1024, 1024);

  // Realistic aggregate stone chips (terracotta, charcoal, amber, olive, cream)
  const chipPalette = ['#C86B4A', '#8C6239', '#2E353F', '#C86B4A', '#A8B29B', '#FAF7F2', '#3A322C'];
  for (let i = 0; i < 1800; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const rad = 1.5 + Math.random() * 5.0;
    ctx.fillStyle = chipPalette[Math.floor(Math.random() * chipPalette.length)];
    ctx.beginPath();
    ctx.ellipse(x, y, rad, rad * (0.6 + Math.random() * 0.6), Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Polished tile grout joint grid (large format 600mm x 600mm tiles)
  ctx.strokeStyle = 'rgba(160, 150, 140, 0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 512, 512);
  ctx.strokeRect(512, 0, 512, 512);
  ctx.strokeRect(0, 512, 512, 512);
  ctx.strokeRect(512, 512, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}

export function createSidewalkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Architectural precast concrete paver
  ctx.fillStyle = '#C2BCB0';
  ctx.fillRect(0, 0, 512, 512);

  // Micro noise
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 25;
    data[i] += n;
    data[i + 1] += n;
    data[i + 2] += n;
  }
  ctx.putImageData(imgData, 0, 0);

  // Paver expansion joint lines
  ctx.strokeStyle = '#827B70';
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, 256, 256);
  ctx.strokeRect(256, 0, 256, 256);
  ctx.strokeRect(0, 256, 256, 256);
  ctx.strokeRect(256, 256, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
}

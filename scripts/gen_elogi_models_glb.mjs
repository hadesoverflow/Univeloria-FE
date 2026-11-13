import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating 3D GLB models for Elogi series...');

// Polyfill FileReader for Node.js
globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = 'data:' + (blob.type || 'application/octet-stream') + ';base64,' + Buffer.from(buf).toString('base64');
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
};

/**
 * Creates Japanese Architectural Ripple / Wave Drape
 * with customizable wave amplitude, harmonic curve, and bottom weight
 */
function createJapaneseWaveGeometry(width, height, wavesCount, waveAmplitude, harmonicRatio, isLeft) {
  const segmentsX = Math.max(64, wavesCount * 8);
  const segmentsY = 40;
  const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  const pos = geometry.attributes.position;
  const totalWaveAngle = wavesCount * Math.PI * 2;

  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) / width) + 0.5; // 0 to 1
    const y = pos.getY(i);
    const x = pos.getX(i);

    // Height ratio: 0 (bottom floor) to 1 (top ceiling)
    const normY = (y + height * 0.5) / height;

    // Natural drape fall: softer and fuller towards the bottom
    const bottomWeight = 1.0 + (1.0 - normY) * 0.08;

    // S-curve with harmonic component for organic fabric drape
    const phase = u * totalWaveAngle;
    const wave = Math.sin(phase) * (1.0 - harmonicRatio) + Math.sin(phase * 2) * harmonicRatio;

    const z = wave * waveAmplitude * bottomWeight;
    pos.setXYZ(i, x, y, z);
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

async function exportModel(rootGroup, outputPath, name) {
  const exporter = new GLTFExporter();
  const gltf = await exporter.parseAsync(rootGroup, { binary: true });
  const buffer = Buffer.from(gltf);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ SUCCESS: Generated ${name}! Size: ${buffer.length} bytes -> ${outputPath}`);
}

// =========================================================================
// 1. MẪU RÈM VẢI ELOGI - 1198 - 2
// Japanese Minimalist Fine Twill Wave (Màu kem sáng ngà - Ivory Light Sand)
// =========================================================================
async function buildElogi1198() {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'CurtainElogi1198_2';

  // Ceiling Pelmet Box
  const pelmetGeo = new THREE.BoxGeometry(3.6, 0.14, 0.24);
  const pelmetMat = new THREE.MeshStandardMaterial({ color: '#f7f4ee', roughness: 0.9 });
  const pelmetMesh = new THREE.Mesh(pelmetGeo, pelmetMat);
  pelmetMesh.name = 'CeilingPelmetBox';
  pelmetMesh.position.set(0, 1.34, 0.0);
  rootGroup.add(pelmetMesh);

  // Slim Japanese Track
  const trackGeo = new THREE.BoxGeometry(3.5, 0.016, 0.024);
  const trackMat = new THREE.MeshStandardMaterial({ color: '#eee9e0', metalness: 0.6, roughness: 0.35 });
  const trackMesh = new THREE.Mesh(trackGeo, trackMat);
  trackMesh.name = 'SingleCeilingTrack';
  trackMesh.position.set(0, 1.28, 0.02);
  rootGroup.add(trackMesh);

  // Elogi 1198-2 Drape Material: Ivory Light Sand from layer 1 swatch (#ebe6db)
  const drapeMat = new THREE.MeshStandardMaterial({
    color: '#ebe6db',
    roughness: 0.84,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const leftGeo = createJapaneseWaveGeometry(1.7, 2.55, 11, 0.082, 0.08, true);
  const leftMesh = new THREE.Mesh(leftGeo, drapeMat);
  leftMesh.name = 'OuterDrapeLeft';
  leftMesh.position.set(-0.85, 0.0, 0.02);
  rootGroup.add(leftMesh);

  const rightGeo = createJapaneseWaveGeometry(1.7, 2.55, 11, 0.082, 0.08, false);
  const rightMesh = new THREE.Mesh(rightGeo, drapeMat.clone());
  rightMesh.name = 'OuterDrapeRight';
  rightMesh.position.set(0.85, 0.0, 0.02);
  rootGroup.add(rightMesh);

  await exportModel(rootGroup, 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-elogi-1198-2.glb', 'curtain-elogi-1198-2.glb');
}

// =========================================================================
// 2. MẪU RÈM VẢI ELOGI - 1206 - 1
// Japanese Earth & Warmth Deep Waves (Beige Xám Mocha - Greige Light Mocha)
// =========================================================================
async function buildElogi1206() {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'CurtainElogi1206_1';

  // Ceiling Pelmet Box
  const pelmetGeo = new THREE.BoxGeometry(3.6, 0.14, 0.24);
  const pelmetMat = new THREE.MeshStandardMaterial({ color: '#f5f2ec', roughness: 0.9 });
  const pelmetMesh = new THREE.Mesh(pelmetGeo, pelmetMat);
  pelmetMesh.name = 'CeilingPelmetBox';
  pelmetMesh.position.set(0, 1.34, 0.0);
  rootGroup.add(pelmetMesh);

  // Slim Japanese Track
  const trackGeo = new THREE.BoxGeometry(3.5, 0.016, 0.024);
  const trackMat = new THREE.MeshStandardMaterial({ color: '#eae5dc', metalness: 0.6, roughness: 0.35 });
  const trackMesh = new THREE.Mesh(trackGeo, trackMat);
  trackMesh.name = 'SingleCeilingTrack';
  trackMesh.position.set(0, 1.28, 0.02);
  rootGroup.add(trackMesh);

  // Elogi 1206-1 Drape Material: Light Mocha Greige from layer 1 swatch (#b5aba1)
  const drapeMat = new THREE.MeshStandardMaterial({
    color: '#b5aba1',
    roughness: 0.86,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const leftGeo = createJapaneseWaveGeometry(1.7, 2.55, 9, 0.092, 0.12, true);
  const leftMesh = new THREE.Mesh(leftGeo, drapeMat);
  leftMesh.name = 'OuterDrapeLeft';
  leftMesh.position.set(-0.85, 0.0, 0.02);
  rootGroup.add(leftMesh);

  const rightGeo = createJapaneseWaveGeometry(1.7, 2.55, 9, 0.092, 0.12, false);
  const rightMesh = new THREE.Mesh(rightGeo, drapeMat.clone());
  rightMesh.name = 'OuterDrapeRight';
  rightMesh.position.set(0.85, 0.0, 0.02);
  rootGroup.add(rightMesh);

  await exportModel(rootGroup, 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-elogi-1206-1.glb', 'curtain-elogi-1206-1.glb');
}

// =========================================================================
// 3. MẪU RÈM VẢI ELOGI - 1230 - 1
// Japanese Tailored Modern Eco-Luxury (Cát Vàng Kem - Soft Sand Cream)
// =========================================================================
async function buildElogi1230() {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'CurtainElogi1230_1';

  // Ceiling Pelmet Box
  const pelmetGeo = new THREE.BoxGeometry(3.6, 0.14, 0.24);
  const pelmetMat = new THREE.MeshStandardMaterial({ color: '#f6f3eb', roughness: 0.9 });
  const pelmetMesh = new THREE.Mesh(pelmetGeo, pelmetMat);
  pelmetMesh.name = 'CeilingPelmetBox';
  pelmetMesh.position.set(0, 1.34, 0.0);
  rootGroup.add(pelmetMesh);

  // Slim Japanese Track
  const trackGeo = new THREE.BoxGeometry(3.5, 0.016, 0.024);
  const trackMat = new THREE.MeshStandardMaterial({ color: '#ebe6dd', metalness: 0.6, roughness: 0.35 });
  const trackMesh = new THREE.Mesh(trackGeo, trackMat);
  trackMesh.name = 'SingleCeilingTrack';
  trackMesh.position.set(0, 1.28, 0.02);
  rootGroup.add(trackMesh);

  // Elogi 1230-1 Drape Material: Soft Sand Cream from layer 1 swatch (#e3d8c8)
  const drapeMat = new THREE.MeshStandardMaterial({
    color: '#e3d8c8',
    roughness: 0.83,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const leftGeo = createJapaneseWaveGeometry(1.7, 2.55, 12, 0.078, 0.06, true);
  const leftMesh = new THREE.Mesh(leftGeo, drapeMat);
  leftMesh.name = 'OuterDrapeLeft';
  leftMesh.position.set(-0.85, 0.0, 0.02);
  rootGroup.add(leftMesh);

  const rightGeo = createJapaneseWaveGeometry(1.7, 2.55, 12, 0.078, 0.06, false);
  const rightMesh = new THREE.Mesh(rightGeo, drapeMat.clone());
  rightMesh.name = 'OuterDrapeRight';
  rightMesh.position.set(0.85, 0.0, 0.02);
  rootGroup.add(rightMesh);

  await exportModel(rootGroup, 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-elogi-1230-1.glb', 'curtain-elogi-1230-1.glb');
}

async function run() {
  await buildElogi1198();
  await buildElogi1206();
  await buildElogi1230();
  console.log('All 3 Elogi 3D models generated successfully!');
  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal error generating models:', err);
  process.exit(1);
});

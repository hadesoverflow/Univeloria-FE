import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating curtain-sfold-luxury.glb...');

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
 * Creates High-End S-Fold (Wave Pleat) Drape
 * Deep, uniform sine wave folds with vertical drape fall
 */
function createSFoldDrapeGeometry(width, height, wavesCount, isLeft) {
  const segmentsX = Math.max(54, wavesCount * 8);
  const segmentsY = 36;
  const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  const pos = geometry.attributes.position;
  const totalWaveAngle = wavesCount * Math.PI * 2;
  const waveAmplitude = 0.088; // Deep luxurious S-waves

  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) / width) + 0.5; // 0 to 1
    const y = pos.getY(i);
    const x = pos.getX(i);

    // Natural drape fall: slightly wider at bottom floor pool
    const bottomWeight = 1.0 + (1.0 - (y + height * 0.5) / height) * 0.04;
    const z = Math.sin(u * totalWaveAngle) * waveAmplitude * bottomWeight;
    pos.setXYZ(i, x, y, z);
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Creates Dense Slub Linen Sheer with fine S-wave ripples
 */
function createSFoldSheerGeometry(width, height, wavesCount) {
  const segmentsX = Math.max(64, wavesCount * 8);
  const segmentsY = 36;
  const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  const pos = geometry.attributes.position;
  const totalWaveAngle = wavesCount * Math.PI * 2;
  const waveAmplitude = 0.048;

  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) / width) + 0.5;
    const y = pos.getY(i);
    const z = Math.sin(u * totalWaveAngle) * waveAmplitude;
    pos.setXYZ(i, pos.getX(i), y, z);
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

// Assemble Scene Group
const rootGroup = new THREE.Group();
rootGroup.name = 'CurtainSFoldLuxuryHotel';

// 1. Recessed Ceiling Pelmet Box
const pelmetGeo = new THREE.BoxGeometry(3.6, 0.14, 0.32);
const pelmetMat = new THREE.MeshStandardMaterial({ color: '#f7f5ef', roughness: 0.9 });
const pelmetMesh = new THREE.Mesh(pelmetGeo, pelmetMat);
pelmetMesh.name = 'CeilingPelmetBox';
pelmetMesh.position.set(0, 1.34, -0.04);
rootGroup.add(pelmetMesh);

// 2. Dual S-Wave Tracks (Anodized White Aluminum with ball-bearing gliders)
const trackGeo = new THREE.BoxGeometry(3.5, 0.016, 0.026);
const trackMat = new THREE.MeshStandardMaterial({ color: '#ede9e2', metalness: 0.65, roughness: 0.35 });
const frontTrack = new THREE.Mesh(trackGeo, trackMat);
frontTrack.position.set(0, 1.28, 0.02);
const rearTrack = new THREE.Mesh(trackGeo, trackMat);
rearTrack.position.set(0, 1.28, -0.07);
rootGroup.add(frontTrack);
rootGroup.add(rearTrack);

// 3. Outer Premium Linen-Textured Drapes (Warm Greige / Beige Sữa)
// Width: 1.7m each -> meeting at center x = 0 at full closure
const drapeMat = new THREE.MeshStandardMaterial({
  color: '#d5cbbe', // Warm Greige / Linen Beige from user photo
  roughness: 0.88,
  metalness: 0.02,
  side: THREE.DoubleSide
});

// Left S-Fold Drape (Spans from -1.7m to 0.0m)
const leftDrapeGeo = createSFoldDrapeGeometry(1.7, 2.55, 10, true);
const leftDrapeMesh = new THREE.Mesh(leftDrapeGeo, drapeMat);
leftDrapeMesh.name = 'OuterDrapeLeft';
leftDrapeMesh.position.set(-0.85, 0.0, 0.02);
rootGroup.add(leftDrapeMesh);

// Right S-Fold Drape (Spans from 0.0m to 1.7m)
const rightDrapeGeo = createSFoldDrapeGeometry(1.7, 2.55, 10, false);
const rightDrapeMesh = new THREE.Mesh(rightDrapeGeo, drapeMat.clone());
rightDrapeMesh.name = 'OuterDrapeRight';
rightDrapeMesh.position.set(0.85, 0.0, 0.02);
rootGroup.add(rightDrapeMesh);

// 4. Inner Slub Linen Sheer Drape (Voan xước trắng sữa cao cấp, width 3.3m)
const sheerMat = new THREE.MeshStandardMaterial({
  color: '#faf8f5',
  roughness: 0.50,
  transparent: true,
  opacity: 0.88,
  side: THREE.DoubleSide
});

const sheerGeo = createSFoldSheerGeometry(3.3, 2.55, 18);
const sheerMesh = new THREE.Mesh(sheerGeo, sheerMat);
sheerMesh.name = 'InnerEmbroideredLeafSheer'; // Keep standard mesh hook name for texture/material binding
sheerMesh.position.set(0, 0.0, -0.07);
rootGroup.add(sheerMesh);

// Export to GLB
const exporter = new GLTFExporter();
try {
  const gltf = await exporter.parseAsync(rootGroup, { binary: true });
  const buffer = Buffer.from(gltf);
  const outPath = 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-sfold-luxury.glb';
  fs.writeFileSync(outPath, buffer);
  console.log('SUCCESS: Generated curtain-sfold-luxury.glb! Size:', buffer.length, 'bytes');
  process.exit(0);
} catch (err) {
  console.error('ERROR generating GLB:', err);
  process.exit(1);
}

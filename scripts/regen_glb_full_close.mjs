import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Regenerating curtain-leaf-embroidery.glb with 100% full closure...');

// Accurate FileReader polyfill for Node.js
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
 * Creates Full S-Fold Drape that spans full half-window width (1.7m) when closed
 */
function createCurtainDrapeGeometry(width, height, wavesCount, isLeft) {
  const segmentsX = Math.max(48, wavesCount * 8);
  const segmentsY = 36;
  const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  const pos = geometry.attributes.position;
  const totalWaveAngle = wavesCount * Math.PI * 2;
  const waveAmplitude = 0.085;

  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) / width) + 0.5; // 0 to 1
    const y = pos.getY(i);
    const x = pos.getX(i);

    // Natural wave curve in z-depth + slight taper
    const taper = 1.0 - (y / height) * 0.05;
    const z = Math.sin(u * totalWaveAngle) * waveAmplitude * taper;
    pos.setXYZ(i, x, y, z);
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function createFullSheerGeometry(width, height, wavesCount) {
  const segmentsX = Math.max(56, wavesCount * 8);
  const segmentsY = 36;
  const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  const pos = geometry.attributes.position;
  const totalWaveAngle = wavesCount * Math.PI * 2;
  const waveAmplitude = 0.045;

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

// Build Scene to export
const rootGroup = new THREE.Group();
rootGroup.name = 'CurtainLeafEmbroideryLuxury';

// 1. Recessed Ceiling Pelmet Box
const pelmetGeo = new THREE.BoxGeometry(3.6, 0.14, 0.32);
const pelmetMat = new THREE.MeshStandardMaterial({ color: '#f7f5ef', roughness: 0.9 });
const pelmetMesh = new THREE.Mesh(pelmetGeo, pelmetMat);
pelmetMesh.name = 'CeilingPelmetBox';
pelmetMesh.position.set(0, 1.34, -0.04);
rootGroup.add(pelmetMesh);

// 2. Dual Internal Tracks
const trackGeo = new THREE.BoxGeometry(3.5, 0.015, 0.025);
const trackMat = new THREE.MeshStandardMaterial({ color: '#c4b5a0', metalness: 0.7, roughness: 0.3 });
const frontTrack = new THREE.Mesh(trackGeo, trackMat);
frontTrack.position.set(0, 1.28, 0.02);
const rearTrack = new THREE.Mesh(trackGeo, trackMat);
rearTrack.position.set(0, 1.28, -0.07);
rootGroup.add(frontTrack);
rootGroup.add(rearTrack);

// 3. Outer Taupe Dimout Drapes (Full width 1.7m each: meeting at center x = 0 when closed!)
const drapeMat = new THREE.MeshStandardMaterial({
  color: '#7e7065',
  roughness: 0.82,
  metalness: 0.03,
  side: THREE.DoubleSide
});

// Left Drape: width 1.7m, center at -0.85m -> spans from -1.7m to 0.0m (center!)
const leftDrapeGeo = createCurtainDrapeGeometry(1.7, 2.55, 8, true);
const leftDrapeMesh = new THREE.Mesh(leftDrapeGeo, drapeMat);
leftDrapeMesh.name = 'OuterDrapeLeft';
leftDrapeMesh.position.set(-0.85, 0.0, 0.02);
rootGroup.add(leftDrapeMesh);

// Right Drape: width 1.7m, center at 0.85m -> spans from 0.0m to 1.7m (meeting in center!)
const rightDrapeGeo = createCurtainDrapeGeometry(1.7, 2.55, 8, false);
const rightDrapeMesh = new THREE.Mesh(rightDrapeGeo, drapeMat.clone());
rightDrapeMesh.name = 'OuterDrapeRight';
rightDrapeMesh.position.set(0.85, 0.0, 0.02);
rootGroup.add(rightDrapeMesh);

// 4. Inner Embroidered Sheer Drape (Center full width 3.2m)
const sheerMat = new THREE.MeshStandardMaterial({
  color: '#faf7f0',
  roughness: 0.55,
  transparent: true,
  opacity: 0.94,
  side: THREE.DoubleSide
});

const sheerGeo = createFullSheerGeometry(3.2, 2.55, 14);
const sheerMesh = new THREE.Mesh(sheerGeo, sheerMat);
sheerMesh.name = 'InnerEmbroideredLeafSheer';
sheerMesh.position.set(0, 0.0, -0.07);
rootGroup.add(sheerMesh);

// Export to GLB via parseAsync
const exporter = new GLTFExporter();
try {
  const gltf = await exporter.parseAsync(rootGroup, { binary: true });
  const buffer = Buffer.from(gltf);
  const outPath = 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-leaf-embroidery.glb';
  fs.writeFileSync(outPath, buffer);
  console.log('SUCCESS: Generated full-closing curtain-leaf-embroidery.glb! Size:', buffer.length, 'bytes');
  process.exit(0);
} catch (err) {
  console.error('ERROR during GLTFExporter.parseAsync:', err);
  process.exit(1);
}

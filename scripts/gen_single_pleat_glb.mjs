import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating curtain-single-pleat.glb (Rèm 1 Lớp Xếp Ly Định Hình)...');

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
 * Creates Pinch-Pleat (Xếp ly định hình) Drape Geometry
 * Tightly pinched pleats at heading with crisp vertical column folds to the floor
 */
function createPinchPleatDrapeGeometry(width, height, pleatsCount, isLeft) {
  const segmentsX = Math.max(64, pleatsCount * 8);
  const segmentsY = 40;
  const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  const pos = geometry.attributes.position;
  const totalAngle = pleatsCount * Math.PI * 2;
  const waveAmplitude = 0.076; // Crisp uniform pleat depth

  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) / width) + 0.5; // 0 to 1
    const y = pos.getY(i);
    const x = pos.getX(i);

    // Height factor: 0 at bottom (-height/2) to 1 at top (+height/2)
    const normY = (y + height * 0.5) / height;

    // Pinch pleat profile: sharper and tighter at the top heading, smooth column folds below
    const pinchProfile = normY > 0.88 ? 0.75 + (normY - 0.88) * 2.0 : 1.0;
    
    // Asymmetric pinch pleat waveform: steep front pleats and recessed flats
    const pleatPhase = u * totalAngle;
    const wave = Math.sin(pleatPhase) * 0.75 + Math.sin(pleatPhase * 2) * 0.25;
    
    const z = wave * waveAmplitude * (normY > 0.9 ? 0.85 : 1.0);
    pos.setXYZ(i, x, y, z);
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

// Assemble Single-Layer Curtain Group
const rootGroup = new THREE.Group();
rootGroup.name = 'CurtainSinglePleatModern';

// 1. Recessed Ceiling Pelmet Box
const pelmetGeo = new THREE.BoxGeometry(3.6, 0.14, 0.22);
const pelmetMat = new THREE.MeshStandardMaterial({ color: '#f7f5ef', roughness: 0.9 });
const pelmetMesh = new THREE.Mesh(pelmetGeo, pelmetMat);
pelmetMesh.name = 'CeilingPelmetBox';
pelmetMesh.position.set(0, 1.34, 0.0);
rootGroup.add(pelmetMesh);

// 2. Single Sleek Ceiling Track (Ray nhôm đơn định hình)
const trackGeo = new THREE.BoxGeometry(3.5, 0.016, 0.024);
const trackMat = new THREE.MeshStandardMaterial({ color: '#eeeae4', metalness: 0.65, roughness: 0.35 });
const singleTrack = new THREE.Mesh(trackGeo, trackMat);
singleTrack.name = 'SingleCeilingTrack';
singleTrack.position.set(0, 1.28, 0.02);
rootGroup.add(singleTrack);

// 3. Pinch-Pleat Heather Grey Fabric (Modern Slate Silver from photo)
const drapeMat = new THREE.MeshStandardMaterial({
  color: '#9fa4a9', // Heather Silver Grey from user's photo
  roughness: 0.85,
  metalness: 0.02,
  side: THREE.DoubleSide
});

// Left Pinch-Pleat Drape (Width: 1.7m, Center: -0.85m -> spans -1.7m to 0.0m)
const leftDrapeGeo = createPinchPleatDrapeGeometry(1.7, 2.55, 12, true);
const leftDrapeMesh = new THREE.Mesh(leftDrapeGeo, drapeMat);
leftDrapeMesh.name = 'OuterDrapeLeft';
leftDrapeMesh.position.set(-0.85, 0.0, 0.02);
rootGroup.add(leftDrapeMesh);

// Right Pinch-Pleat Drape (Width: 1.7m, Center: 0.85m -> spans 0.0m to 1.7m)
const rightDrapeGeo = createPinchPleatDrapeGeometry(1.7, 2.55, 12, false);
const rightDrapeMesh = new THREE.Mesh(rightDrapeGeo, drapeMat.clone());
rightDrapeMesh.name = 'OuterDrapeRight';
rightDrapeMesh.position.set(0.85, 0.0, 0.02);
rootGroup.add(rightDrapeMesh);

// Export to GLB
const exporter = new GLTFExporter();
try {
  const gltf = await exporter.parseAsync(rootGroup, { binary: true });
  const buffer = Buffer.from(gltf);
  const outPath = 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-single-pleat.glb';
  fs.writeFileSync(outPath, buffer);
  console.log('SUCCESS: Generated curtain-single-pleat.glb! Size:', buffer.length, 'bytes');
  process.exit(0);
} catch (err) {
  console.error('ERROR generating GLB:', err);
  process.exit(1);
}

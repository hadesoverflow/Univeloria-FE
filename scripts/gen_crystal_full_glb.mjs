import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating FULL COVERAGE curtain-roller-crystal.glb...');

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

const rootGroup = new THREE.Group();
rootGroup.name = 'CurtainRollerArtBlind';

const whiteMetalMat = new THREE.MeshStandardMaterial({
  color: '#f0ece4',
  metalness: 0.75,
  roughness: 0.28,
  side: THREE.DoubleSide
});

// 1. Top Round Fixed Roller Tube (Thanh cố định tròn chuẩn 3.62m phủ bì hoàn hảo)
const tubeGeo = new THREE.CylinderGeometry(0.042, 0.042, 3.62, 32);
tubeGeo.rotateZ(Math.PI / 2);
const tubeMesh = new THREE.Mesh(tubeGeo, whiteMetalMat);
tubeMesh.name = 'RollerTopTube';
tubeMesh.position.set(0, 1.26, 0.02);
rootGroup.add(tubeMesh);

// Top Cassette Hood Shield (Hộp che thanh cuộn trang nhã)
const hoodGeo = new THREE.BoxGeometry(3.68, 0.09, 0.10);
const hoodMesh = new THREE.Mesh(hoodGeo, whiteMetalMat);
hoodMesh.name = 'RollerTopHood';
hoodMesh.position.set(0, 1.30, 0.0);
rootGroup.add(hoodMesh);

// 2. Mounting Brackets (Giá đỡ 2 đầu thanh cuộn)
const bracketGeo = new THREE.BoxGeometry(0.04, 0.11, 0.11);
const leftBracket = new THREE.Mesh(bracketGeo, whiteMetalMat);
leftBracket.position.set(-1.81, 1.26, 0.01);
rootGroup.add(leftBracket);

const rightBracket = new THREE.Mesh(bracketGeo, whiteMetalMat);
rightBracket.position.set(1.81, 1.26, 0.01);
rootGroup.add(rightBracket);

// Beaded Pull Chain (Dây kéo hạt cườm bên phải)
const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.95, 12);
const chainMat = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.5, roughness: 0.3 });
const pullChain = new THREE.Mesh(chainGeo, chainMat);
pullChain.name = 'RollerPullChain';
pullChain.position.set(1.78, 0.80, 0.03);
rootGroup.add(pullChain);

// 3. Roller Fabric Canvas Panel (Vải rèm in tranh Phủ bì 100% full ô cửa)
// Width: 3.54m (vượt 2 bên khung 7cm), Height: 2.50m (vượt mép dưới 9cm)
const fabricGeo = new THREE.PlaneGeometry(3.54, 2.50, 32, 32);
const fabricMat = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  roughness: 0.85,
  metalness: 0.02,
  side: THREE.DoubleSide
});
const fabricMesh = new THREE.Mesh(fabricGeo, fabricMat);
fabricMesh.name = 'RollerFabricPanel';
// Center at (0, 0.01, 0.02) -> top at 1.26 (roller tube), bottom at -1.24 (below window sill -1.15)
fabricMesh.position.set(0, 0.01, 0.02);
fabricMesh.castShadow = true;
fabricMesh.receiveShadow = true;
rootGroup.add(fabricMesh);

// 4. Bottom Counterweight Bar (Thanh đáy đối trọng tròn phủ bì 3.56m)
const bottomBarGeo = new THREE.CylinderGeometry(0.018, 0.018, 3.56, 24);
bottomBarGeo.rotateZ(Math.PI / 2);
const bottomBarMat = new THREE.MeshStandardMaterial({
  color: '#e4decb',
  roughness: 0.5,
  metalness: 0.3,
  side: THREE.DoubleSide
});
const bottomBarMesh = new THREE.Mesh(bottomBarGeo, bottomBarMat);
bottomBarMesh.name = 'RollerBottomBar';
bottomBarMesh.position.set(0, -1.24, 0.02);
rootGroup.add(bottomBarMesh);

// Export to GLB
const exporter = new GLTFExporter();
try {
  const gltf = await exporter.parseAsync(rootGroup, { binary: true });
  const buffer = Buffer.from(gltf);
  const outPath = 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-roller-crystal.glb';
  fs.writeFileSync(outPath, buffer);
  console.log('SUCCESS: Generated FULL COVERAGE curtain-roller-crystal.glb! Size:', buffer.length, 'bytes');
  process.exit(0);
} catch (err) {
  console.error('ERROR generating GLB:', err);
  process.exit(1);
}

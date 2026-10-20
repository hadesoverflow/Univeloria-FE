import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating Realistic Window-Scale curtain-roller-triptych.glb...');

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
rootGroup.name = 'CurtainRollerTriptychBlind';

const whiteMetalMat = new THREE.MeshStandardMaterial({
  color: '#f4f0e8',
  metalness: 0.75,
  roughness: 0.28,
  side: THREE.DoubleSide
});

const barMetalMat = new THREE.MeshStandardMaterial({
  color: '#e4decb',
  roughness: 0.5,
  metalness: 0.3,
  side: THREE.DoubleSide
});

const chainMat = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  metalness: 0.5,
  roughness: 0.3
});

// Wall Pillar Material matching the room's warm beige plaster wall
const wallMat = new THREE.MeshStandardMaterial({
  color: '#eae4d9',
  roughness: 0.88,
  metalness: 0.04,
  side: THREE.DoubleSide
});

// Window Sill Material (bậu cửa sổ đá cẩm thạch trắng ngà)
const sillMat = new THREE.MeshStandardMaterial({
  color: '#f5f1e8',
  roughness: 0.35,
  metalness: 0.12,
  side: THREE.DoubleSide
});

// Window Frame Inset Liners (Khung viền cửa sổ nhôm đen kiến trúc)
const frameMat = new THREE.MeshStandardMaterial({
  color: '#282421',
  metalness: 0.85,
  roughness: 0.25,
  side: THREE.DoubleSide
});

// 1. ARCHITECTURAL WALL PILLARS (Khoảng cách giữa các tấm rèm rộng 42cm)
// Left Pillar between Left & Center windows
const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 2.50, 0.12), wallMat);
leftPillar.name = 'TriptychPillarLeft';
leftPillar.position.set(-0.61, 0.05, -0.06);
leftPillar.receiveShadow = true;
rootGroup.add(leftPillar);

// Right Pillar between Center & Right windows
const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 2.50, 0.12), wallMat);
rightPillar.name = 'TriptychPillarRight';
rightPillar.position.set(0.61, 0.05, -0.06);
rightPillar.receiveShadow = true;
rootGroup.add(rightPillar);

// Lower Wall section beneath the 3 window sills (Tường dưới cửa sổ cao 80cm)
const lowerWall = new THREE.Mesh(new THREE.BoxGeometry(3.60, 0.82, 0.12), wallMat);
lowerWall.name = 'TriptychLowerWall';
lowerWall.position.set(0, -0.85, -0.06);
lowerWall.receiveShadow = true;
rootGroup.add(lowerWall);

// Top Header Wall above the 3 windows
const topHeaderWall = new THREE.Mesh(new THREE.BoxGeometry(3.60, 0.18, 0.12), wallMat);
topHeaderWall.name = 'TriptychHeaderWall';
topHeaderWall.position.set(0, 1.34, -0.06);
topHeaderWall.receiveShadow = true;
rootGroup.add(topHeaderWall);

// 2. 3 DISTINCT WINDOW ROLLER BLINDS
// Panel width: 0.80m, height: 1.65m (rèm cửa sổ nhỏ gọn, thanh thoát)
// Centers at x = -1.22, 0.00, +1.22 -> spacing between panels is exactly 42cm!
const panels = [
  { id: 'Left', x: -1.22, width: 0.80, height: 1.65 },
  { id: 'Center', x: 0.00, width: 0.80, height: 1.65 },
  { id: 'Right', x: 1.22, width: 0.80, height: 1.65 }
];

panels.forEach((p) => {
  // A. Window Sill (Bậu cửa sổ)
  const sillMesh = new THREE.Mesh(new THREE.BoxGeometry(p.width + 0.08, 0.045, 0.12), sillMat);
  sillMesh.name = `WindowSill_${p.id}`;
  sillMesh.position.set(p.x, -0.45, -0.02);
  sillMesh.receiveShadow = true;
  rootGroup.add(sillMesh);

  // B. Window Frame Inner Liners (Khung viền cửa sổ)
  const fLeft = new THREE.Mesh(new THREE.BoxGeometry(0.02, p.height, 0.06), frameMat);
  fLeft.position.set(p.x - p.width / 2 - 0.01, 0.395, -0.05);
  rootGroup.add(fLeft);

  const fRight = new THREE.Mesh(new THREE.BoxGeometry(0.02, p.height, 0.06), frameMat);
  fRight.position.set(p.x + p.width / 2 + 0.01, 0.395, -0.05);
  rootGroup.add(fRight);

  const fTop = new THREE.Mesh(new THREE.BoxGeometry(p.width + 0.04, 0.02, 0.06), frameMat);
  fTop.position.set(p.x, 1.22, -0.05);
  rootGroup.add(fTop);

  // C. Top Round Fixed Roller Tube (Thanh cố định tròn)
  const tubeGeo = new THREE.CylinderGeometry(0.035, 0.035, p.width + 0.05, 32);
  tubeGeo.rotateZ(Math.PI / 2);
  const tubeMesh = new THREE.Mesh(tubeGeo, whiteMetalMat);
  tubeMesh.name = `RollerTopTube_${p.id}`;
  tubeMesh.position.set(p.x, 1.22, 0.02);
  rootGroup.add(tubeMesh);

  // Top Cassette Hood Shield
  const hoodGeo = new THREE.BoxGeometry(p.width + 0.08, 0.075, 0.085);
  const hoodMesh = new THREE.Mesh(hoodGeo, whiteMetalMat);
  hoodMesh.name = `RollerTopHood_${p.id}`;
  hoodMesh.position.set(p.x, 1.25, 0.0);
  rootGroup.add(hoodMesh);

  // Brackets
  const bracketGeo = new THREE.BoxGeometry(0.03, 0.09, 0.09);
  const bLeft = new THREE.Mesh(bracketGeo, whiteMetalMat);
  bLeft.position.set(p.x - p.width / 2 - 0.02, 1.22, 0.01);
  rootGroup.add(bLeft);

  const bRight = new THREE.Mesh(bracketGeo, whiteMetalMat);
  bRight.position.set(p.x + p.width / 2 + 0.02, 1.22, 0.01);
  rootGroup.add(bRight);

  // Beaded Pull Chain
  const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.75, 12);
  const pullChain = new THREE.Mesh(chainGeo, chainMat);
  pullChain.name = `RollerPullChain_${p.id}`;
  pullChain.position.set(p.x + p.width / 2 + 0.015, 0.85, 0.03);
  rootGroup.add(pullChain);

  // D. Roller Fabric Canvas Panel
  const fabricGeo = new THREE.PlaneGeometry(p.width, p.height, 24, 24);
  const fabricMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.85,
    metalness: 0.02,
    side: THREE.DoubleSide
  });
  const fabricMesh = new THREE.Mesh(fabricGeo, fabricMat);
  fabricMesh.name = `RollerFabric_${p.id}`;
  // Center at (p.x, 0.395, 0.02) -> top at 1.22, bottom at -0.43
  fabricMesh.position.set(p.x, 0.395, 0.02);
  fabricMesh.castShadow = true;
  fabricMesh.receiveShadow = true;
  rootGroup.add(fabricMesh);

  // E. Bottom Counterweight Bar (Thanh đáy đối trọng tròn)
  const bottomBarGeo = new THREE.CylinderGeometry(0.016, 0.016, p.width + 0.02, 24);
  bottomBarGeo.rotateZ(Math.PI / 2);
  const bottomBarMesh = new THREE.Mesh(bottomBarGeo, barMetalMat);
  bottomBarMesh.name = `RollerBottomBar_${p.id}`;
  bottomBarMesh.position.set(p.x, -0.43, 0.02);
  rootGroup.add(bottomBarMesh);
});

// Export to GLB
const exporter = new GLTFExporter();
try {
  const gltf = await exporter.parseAsync(rootGroup, { binary: true });
  const buffer = Buffer.from(gltf);
  const outPath = 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-roller-triptych.glb';
  fs.writeFileSync(outPath, buffer);
  console.log('SUCCESS: Generated Realistic Window-Scale curtain-roller-triptych.glb! Size:', buffer.length, 'bytes');
  process.exit(0);
} catch (err) {
  console.error('ERROR generating GLB:', err);
  process.exit(1);
}

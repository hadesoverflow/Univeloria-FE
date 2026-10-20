import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating Precision Architectural 4-Window curtain-roller-quad.glb...');

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
rootGroup.name = 'CurtainRollerQuadBlind';

// Metallic & Component Materials
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

// Wall Material matching the room's warm beige plaster wall
const wallMat = new THREE.MeshStandardMaterial({
  color: '#eae4d9',
  roughness: 0.88,
  metalness: 0.04,
  side: THREE.DoubleSide
});

// Window Sill Material (bậu đá cẩm thạch trắng ngà)
const sillMat = new THREE.MeshStandardMaterial({
  color: '#f5f1e8',
  roughness: 0.35,
  metalness: 0.12,
  side: THREE.DoubleSide
});

// Modern Clean Window Casement Frame (Khung nhôm sơn tĩnh điện màu than xám cao cấp)
const casementMat = new THREE.MeshStandardMaterial({
  color: '#282624',
  metalness: 0.65,
  roughness: 0.32,
  side: THREE.DoubleSide
});

// Architectural Window Glass (Kính hộp đôi trong suốt phản chiếu bầu trời)
const glassMat = new THREE.MeshPhysicalMaterial({
  color: '#dbeafe',
  transparent: true,
  opacity: 0.22,
  roughness: 0.06,
  metalness: 0.08,
  transmission: 0.90,
  ior: 1.5,
  side: THREE.DoubleSide
});

// ========================================================
// 1. SEAMLESS ARCHITECTURAL WALL MESHES (Khớp khít 100% với phòng)
// Room opening: X [-1.70, +1.70] (width 3.40m), Y [-1.25, 1.25]
// Windows: 4 windows of width 0.70m, height 1.65m
// P1: [-1.58, -0.88], center -1.23
// Pillar 1: [-0.88, -0.76], center -0.82
// P2: [-0.76, -0.06], center -0.41
// Pillar 2: [-0.06, +0.06], center 0.00
// P3: [+0.06, +0.76], center +0.41
// Pillar 3: [+0.76, +0.88], center +0.82
// P4: [+0.88, +1.58], center +1.23
// Outer walls: [-1.70, -1.58] & [+1.58, +1.70]
// ========================================================

const wallZ = -0.10;
const wallThickness = 0.10;

// A. Lower Wall section beneath the 4 window sills (from y = -1.25 to -0.45)
const lowerWall = new THREE.Mesh(new THREE.BoxGeometry(3.40, 0.80, wallThickness), wallMat);
lowerWall.name = 'QuadLowerWall';
lowerWall.position.set(0, -0.85, wallZ);
lowerWall.receiveShadow = true;
rootGroup.add(lowerWall);

// B. Top Header Wall above the 4 windows (from y = 1.20 to 1.35)
const topHeaderWall = new THREE.Mesh(new THREE.BoxGeometry(3.40, 0.15, wallThickness), wallMat);
topHeaderWall.name = 'QuadHeaderWall';
topHeaderWall.position.set(0, 1.275, wallZ);
topHeaderWall.receiveShadow = true;
rootGroup.add(topHeaderWall);

// C. Left Edge Wall (from x = -1.70 to -1.58, width 0.12)
const leftEdgeWall = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.65, wallThickness), wallMat);
leftEdgeWall.name = 'QuadLeftEdgeWall';
leftEdgeWall.position.set(-1.64, 0.375, wallZ);
leftEdgeWall.receiveShadow = true;
rootGroup.add(leftEdgeWall);

// D. Pillar 1 between P1 and P2 (x = -0.82, width 0.12)
const pillar1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.65, wallThickness), wallMat);
pillar1.name = 'QuadPillar1';
pillar1.position.set(-0.82, 0.375, wallZ);
pillar1.receiveShadow = true;
rootGroup.add(pillar1);

// E. Pillar 2 between P2 and P3 (x = 0.00, width 0.12)
const pillar2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.65, wallThickness), wallMat);
pillar2.name = 'QuadPillar2';
pillar2.position.set(0.00, 0.375, wallZ);
pillar2.receiveShadow = true;
rootGroup.add(pillar2);

// F. Pillar 3 between P3 and P4 (x = +0.82, width 0.12)
const pillar3 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.65, wallThickness), wallMat);
pillar3.name = 'QuadPillar3';
pillar3.position.set(0.82, 0.375, wallZ);
pillar3.receiveShadow = true;
rootGroup.add(pillar3);

// G. Right Edge Wall (from x = +1.58 to +1.70, width 0.12)
const rightEdgeWall = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.65, wallThickness), wallMat);
rightEdgeWall.name = 'QuadRightEdgeWall';
rightEdgeWall.position.set(1.64, 0.375, wallZ);
rightEdgeWall.receiveShadow = true;
rootGroup.add(rightEdgeWall);

// ========================================================
// 2. 4 DISTINCT WINDOWS & ROLLER BLINDS
// ========================================================
const panels = [
  { id: 'P1', x: -1.23, width: 0.70, height: 1.65 },
  { id: 'P2', x: -0.41, width: 0.70, height: 1.65 },
  { id: 'P3', x: 0.41, width: 0.70, height: 1.65 },
  { id: 'P4', x: 1.23, width: 0.70, height: 1.65 }
];

panels.forEach((p) => {
  // A. Architectural Double-Sided Window Glass (Kính cửa sổ)
  const windowGlass = new THREE.Mesh(new THREE.PlaneGeometry(p.width - 0.02, p.height - 0.02), glassMat);
  windowGlass.name = `WindowGlass_${p.id}`;
  windowGlass.position.set(p.x, 0.375, -0.12);
  rootGroup.add(windowGlass);

  // B. Sleek Modern Casement Frames (Nẹp khung cửa sổ nhôm đen cao cấp)
  const frameBorderThickness = 0.02;
  const frameDepth = 0.04;
  const frameZ = -0.09;

  // Frame Top
  const fTop = new THREE.Mesh(new THREE.BoxGeometry(p.width, frameBorderThickness, frameDepth), casementMat);
  fTop.position.set(p.x, 1.20 - frameBorderThickness / 2, frameZ);
  rootGroup.add(fTop);

  // Frame Bottom
  const fBottom = new THREE.Mesh(new THREE.BoxGeometry(p.width, frameBorderThickness, frameDepth), casementMat);
  fBottom.position.set(p.x, -0.45 + frameBorderThickness / 2, frameZ);
  rootGroup.add(fBottom);

  // Frame Left
  const fLeft = new THREE.Mesh(new THREE.BoxGeometry(frameBorderThickness, p.height - frameBorderThickness * 2, frameDepth), casementMat);
  fLeft.position.set(p.x - p.width / 2 + frameBorderThickness / 2, 0.375, frameZ);
  rootGroup.add(fLeft);

  // Frame Right
  const fRight = new THREE.Mesh(new THREE.BoxGeometry(frameBorderThickness, p.height - frameBorderThickness * 2, frameDepth), casementMat);
  fRight.position.set(p.x + p.width / 2 - frameBorderThickness / 2, 0.375, frameZ);
  rootGroup.add(fRight);

  // C. Window Sill (Bậu đá cẩm thạch trắng ngà nhô ra tinh tế)
  const sillMesh = new THREE.Mesh(new THREE.BoxGeometry(p.width + 0.05, 0.04, 0.14), sillMat);
  sillMesh.name = `WindowSill_${p.id}`;
  sillMesh.position.set(p.x, -0.45, -0.02);
  sillMesh.receiveShadow = true;
  rootGroup.add(sillMesh);

  // D. Top Round Fixed Roller Tube (Thanh cố định tròn)
  const tubeGeo = new THREE.CylinderGeometry(0.035, 0.035, p.width + 0.03, 32);
  tubeGeo.rotateZ(Math.PI / 2);
  const tubeMesh = new THREE.Mesh(tubeGeo, whiteMetalMat);
  tubeMesh.name = `RollerTopTube_${p.id}`;
  tubeMesh.position.set(p.x, 1.20, 0.02);
  rootGroup.add(tubeMesh);

  // Top Cassette Hood Shield
  const hoodGeo = new THREE.BoxGeometry(p.width + 0.05, 0.07, 0.08);
  const hoodMesh = new THREE.Mesh(hoodGeo, whiteMetalMat);
  hoodMesh.name = `RollerTopHood_${p.id}`;
  hoodMesh.position.set(p.x, 1.23, 0.00);
  rootGroup.add(hoodMesh);

  // Brackets
  const bracketGeo = new THREE.BoxGeometry(0.02, 0.08, 0.08);
  const bLeft = new THREE.Mesh(bracketGeo, whiteMetalMat);
  bLeft.position.set(p.x - p.width / 2 - 0.01, 1.20, 0.01);
  rootGroup.add(bLeft);

  const bRight = new THREE.Mesh(bracketGeo, whiteMetalMat);
  bRight.position.set(p.x + p.width / 2 + 0.01, 1.20, 0.01);
  rootGroup.add(bRight);

  // Beaded Pull Chain
  const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.75, 12);
  const pullChain = new THREE.Mesh(chainGeo, chainMat);
  pullChain.name = `RollerPullChain_${p.id}`;
  pullChain.position.set(p.x + p.width / 2 + 0.01, 0.825, 0.03);
  rootGroup.add(pullChain);

  // E. Roller Fabric Canvas Panel
  const fabricGeo = new THREE.PlaneGeometry(p.width, p.height, 24, 24);
  const fabricMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.85,
    metalness: 0.02,
    side: THREE.DoubleSide
  });
  const fabricMesh = new THREE.Mesh(fabricGeo, fabricMat);
  fabricMesh.name = `RollerFabric_${p.id}`;
  fabricMesh.position.set(p.x, 0.375, 0.02);
  fabricMesh.castShadow = true;
  fabricMesh.receiveShadow = true;
  rootGroup.add(fabricMesh);

  // F. Bottom Counterweight Bar (Thanh đáy đối trọng tròn)
  const bottomBarGeo = new THREE.CylinderGeometry(0.016, 0.016, p.width + 0.02, 24);
  bottomBarGeo.rotateZ(Math.PI / 2);
  const bottomBarMesh = new THREE.Mesh(bottomBarGeo, barMetalMat);
  bottomBarMesh.name = `RollerBottomBar_${p.id}`;
  bottomBarMesh.position.set(p.x, -0.45, 0.02);
  rootGroup.add(bottomBarMesh);
});

// Export to GLB
const exporter = new GLTFExporter();
try {
  const gltf = await exporter.parseAsync(rootGroup, { binary: true });
  const outPath = 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-roller-quad.glb';
  fs.writeFileSync(outPath, Buffer.from(gltf));
  console.log('Successfully generated clean 4-window GLB at: ' + outPath + ' (size: ' + (gltf.byteLength / 1024).toFixed(1) + ' KB)');
} catch (err) {
  console.error('Failed to export GLB:', err);
}

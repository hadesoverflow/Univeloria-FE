import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating Precision Architectural Window-Scale curtain-roller-triptych.glb...');

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

// Window Sill Material (bậu cửa sổ đá cẩm thạch trắng ngà)
const sillMat = new THREE.MeshStandardMaterial({
  color: '#f5f1e8',
  roughness: 0.35,
  metalness: 0.12,
  side: THREE.DoubleSide
});

// Modern Clean Window Casement Frame (Khung nhôm sơn tĩnh điện màu than xám cao cấp, mịn đẹp, không nhấp nháy)
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
// Windows: 3 windows of width 0.80m, height 1.65m
// Left window: [-1.52, -0.72], center -1.12
// Center window: [-0.40, +0.40], center 0.00
// Right window: [+0.72, +1.52], center +1.12
// Between windows: Pillars of width 0.32m (32cm)
// Outer sides: Wall extensions of width 0.18m (18cm)
// ========================================================

const wallZ = -0.10;
const wallThickness = 0.10;

// A. Lower Wall section beneath the 3 window sills (from y = -1.25 to -0.45)
const lowerWall = new THREE.Mesh(new THREE.BoxGeometry(3.40, 0.80, wallThickness), wallMat);
lowerWall.name = 'TriptychLowerWall';
lowerWall.position.set(0, -0.85, wallZ);
lowerWall.receiveShadow = true;
rootGroup.add(lowerWall);

// B. Top Header Wall above the 3 windows (from y = 1.20 to 1.35)
const topHeaderWall = new THREE.Mesh(new THREE.BoxGeometry(3.40, 0.15, wallThickness), wallMat);
topHeaderWall.name = 'TriptychHeaderWall';
topHeaderWall.position.set(0, 1.275, wallZ);
topHeaderWall.receiveShadow = true;
rootGroup.add(topHeaderWall);

// C. Left Edge Wall (from x = -1.70 to -1.52, y = -0.45 to 1.20)
const leftEdgeWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.65, wallThickness), wallMat);
leftEdgeWall.name = 'TriptychLeftEdgeWall';
leftEdgeWall.position.set(-1.61, 0.375, wallZ);
leftEdgeWall.receiveShadow = true;
rootGroup.add(leftEdgeWall);

// D. Left-Center Wall Pillar (between Left and Center windows: x = -0.72 to -0.40, width 0.32m)
const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.65, wallThickness), wallMat);
leftPillar.name = 'TriptychPillarLeft';
leftPillar.position.set(-0.56, 0.375, wallZ);
leftPillar.receiveShadow = true;
rootGroup.add(leftPillar);

// E. Center-Right Wall Pillar (between Center and Right windows: x = +0.40 to +0.72, width 0.32m)
const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.65, wallThickness), wallMat);
rightPillar.name = 'TriptychPillarRight';
rightPillar.position.set(0.56, 0.375, wallZ);
rightPillar.receiveShadow = true;
rootGroup.add(rightPillar);

// F. Right Edge Wall (from x = +1.52 to +1.70, y = -0.45 to 1.20)
const rightEdgeWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.65, wallThickness), wallMat);
rightEdgeWall.name = 'TriptychRightEdgeWall';
rightEdgeWall.position.set(1.61, 0.375, wallZ);
rightEdgeWall.receiveShadow = true;
rootGroup.add(rightEdgeWall);

// ========================================================
// 2. 3 DISTINCT WINDOWS (Cửa sổ 3 ô độc lập, sắc nét, không nhấp nháy)
// ========================================================
const panels = [
  { id: 'Left', x: -1.12, width: 0.80, height: 1.65 },
  { id: 'Center', x: 0.00, width: 0.80, height: 1.65 },
  { id: 'Right', x: 1.12, width: 0.80, height: 1.65 }
];

panels.forEach((p) => {
  // A. Architectural Double-Sided Window Glass (Kính cửa sổ)
  const windowGlass = new THREE.Mesh(new THREE.PlaneGeometry(p.width - 0.02, p.height - 0.02), glassMat);
  windowGlass.name = `WindowGlass_${p.id}`;
  windowGlass.position.set(p.x, 0.375, -0.12);
  rootGroup.add(windowGlass);

  // B. Sleek Modern Casement Frames (Nẹp khung cửa sổ nhôm đen cao cấp, không bị giật hay va chạm)
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
  const sillMesh = new THREE.Mesh(new THREE.BoxGeometry(p.width + 0.06, 0.04, 0.14), sillMat);
  sillMesh.name = `WindowSill_${p.id}`;
  sillMesh.position.set(p.x, -0.45, -0.02);
  sillMesh.receiveShadow = true;
  rootGroup.add(sillMesh);

  // D. Top Round Fixed Roller Tube (Thanh cố định tròn)
  const tubeGeo = new THREE.CylinderGeometry(0.035, 0.035, p.width + 0.04, 32);
  tubeGeo.rotateZ(Math.PI / 2);
  const tubeMesh = new THREE.Mesh(tubeGeo, whiteMetalMat);
  tubeMesh.name = `RollerTopTube_${p.id}`;
  tubeMesh.position.set(p.x, 1.20, 0.02);
  rootGroup.add(tubeMesh);

  // Top Cassette Hood Shield
  const hoodGeo = new THREE.BoxGeometry(p.width + 0.06, 0.07, 0.08);
  const hoodMesh = new THREE.Mesh(hoodGeo, whiteMetalMat);
  hoodMesh.name = `RollerTopHood_${p.id}`;
  hoodMesh.position.set(p.x, 1.23, 0.00);
  rootGroup.add(hoodMesh);

  // Brackets
  const bracketGeo = new THREE.BoxGeometry(0.025, 0.08, 0.08);
  const bLeft = new THREE.Mesh(bracketGeo, whiteMetalMat);
  bLeft.position.set(p.x - p.width / 2 - 0.015, 1.20, 0.01);
  rootGroup.add(bLeft);

  const bRight = new THREE.Mesh(bracketGeo, whiteMetalMat);
  bRight.position.set(p.x + p.width / 2 + 0.015, 1.20, 0.01);
  rootGroup.add(bRight);

  // Beaded Pull Chain
  const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.75, 12);
  const pullChain = new THREE.Mesh(chainGeo, chainMat);
  pullChain.name = `RollerPullChain_${p.id}`;
  pullChain.position.set(p.x + p.width / 2 + 0.012, 0.825, 0.03);
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
  const outPath = 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-roller-triptych.glb';
  fs.writeFileSync(outPath, Buffer.from(gltf));
  console.log('Successfully generated clean GLB at: ' + outPath + ' (size: ' + (gltf.byteLength / 1024).toFixed(1) + ' KB)');
} catch (err) {
  console.error('Failed to export GLB:', err);
}

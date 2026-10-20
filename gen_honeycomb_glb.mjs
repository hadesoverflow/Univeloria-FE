import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating Precision Architectural Rèm Tổ Ong curtain-honeycomb.glb...');

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
rootGroup.name = 'CurtainHoneycombBlind';

// Metallic & Component Materials
const whiteAluminumMat = new THREE.MeshStandardMaterial({
  color: '#f5f4ef',
  metalness: 0.72,
  roughness: 0.28,
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
// 1. SEAMLESS ARCHITECTURAL WALL MESHES
// Room opening: X [-1.70, +1.70] (width 3.40m), Y [-1.25, 1.25]
// Honeycomb Window: width 2.60m, height 1.65m, centered at x = 0
// Left wall extension: [-1.70, -1.30], width 0.40m, center -1.50
// Right wall extension: [+1.30, +1.70], width 0.40m, center +1.50
// Lower wall: width 3.40m, y from -1.25 to -0.45
// Top header: width 3.40m, y from 1.20 to 1.35
// ========================================================

const wallZ = -0.10;
const wallThickness = 0.10;

// A. Lower Wall section beneath window sill (from y = -1.25 to -0.45)
const lowerWall = new THREE.Mesh(new THREE.BoxGeometry(3.40, 0.80, wallThickness), wallMat);
lowerWall.name = 'HoneycombLowerWall';
lowerWall.position.set(0, -0.85, wallZ);
lowerWall.receiveShadow = true;
rootGroup.add(lowerWall);

// B. Top Header Wall above window (from y = 1.20 to 1.35)
const topHeaderWall = new THREE.Mesh(new THREE.BoxGeometry(3.40, 0.15, wallThickness), wallMat);
topHeaderWall.name = 'HoneycombHeaderWall';
topHeaderWall.position.set(0, 1.275, wallZ);
topHeaderWall.receiveShadow = true;
rootGroup.add(topHeaderWall);

// C. Left Wall Extension (from x = -1.70 to -1.30, width 0.40m)
const leftEdgeWall = new THREE.Mesh(new THREE.BoxGeometry(0.40, 1.65, wallThickness), wallMat);
leftEdgeWall.name = 'HoneycombLeftEdgeWall';
leftEdgeWall.position.set(-1.50, 0.375, wallZ);
leftEdgeWall.receiveShadow = true;
rootGroup.add(leftEdgeWall);

// D. Right Wall Extension (from x = +1.30 to +1.70, width 0.40m)
const rightEdgeWall = new THREE.Mesh(new THREE.BoxGeometry(0.40, 1.65, wallThickness), wallMat);
rightEdgeWall.name = 'HoneycombRightEdgeWall';
rightEdgeWall.position.set(1.50, 0.375, wallZ);
rightEdgeWall.receiveShadow = true;
rootGroup.add(rightEdgeWall);

// ========================================================
// 2. WINDOW CASEMENT & GLASS
// ========================================================
const winW = 2.60;
const winH = 1.65;

// Window Glass
const windowGlass = new THREE.Mesh(new THREE.PlaneGeometry(winW - 0.04, winH - 0.04), glassMat);
windowGlass.name = 'WindowGlass_Honeycomb';
windowGlass.position.set(0, 0.375, -0.12);
rootGroup.add(windowGlass);

// Casement Frame
const frameBorderThickness = 0.025;
const frameDepth = 0.04;
const frameZ = -0.09;

// Frame Top & Bottom
const fTop = new THREE.Mesh(new THREE.BoxGeometry(winW, frameBorderThickness, frameDepth), casementMat);
fTop.position.set(0, 1.20 - frameBorderThickness / 2, frameZ);
rootGroup.add(fTop);

const fBottom = new THREE.Mesh(new THREE.BoxGeometry(winW, frameBorderThickness, frameDepth), casementMat);
fBottom.position.set(0, -0.45 + frameBorderThickness / 2, frameZ);
rootGroup.add(fBottom);

// Frame Left & Right
const fLeft = new THREE.Mesh(new THREE.BoxGeometry(frameBorderThickness, winH - frameBorderThickness * 2, frameDepth), casementMat);
fLeft.position.set(-winW / 2 + frameBorderThickness / 2, 0.375, frameZ);
rootGroup.add(fLeft);

const fRight = new THREE.Mesh(new THREE.BoxGeometry(frameBorderThickness, winH - frameBorderThickness * 2, frameDepth), casementMat);
fRight.position.set(winW / 2 - frameBorderThickness / 2, 0.375, frameZ);
rootGroup.add(fRight);

// Vertical Center Mullion for architectural realism
const fCenterMullion = new THREE.Mesh(new THREE.BoxGeometry(0.02, winH - frameBorderThickness * 2, frameDepth * 0.8), casementMat);
fCenterMullion.position.set(0, 0.375, frameZ);
rootGroup.add(fCenterMullion);

// Window Sill
const sillMesh = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.10, 0.045, 0.16), sillMat);
sillMesh.name = 'WindowSill_Honeycomb';
sillMesh.position.set(0, -0.45, -0.02);
sillMesh.receiveShadow = true;
rootGroup.add(sillMesh);

// ========================================================
// 3. HONEYCOMB SHADE MECHANISM & CELLULAR FABRIC
// ========================================================

// A. Top Headrail Cassette (Hộp máng nhôm sơn tĩnh điện chữ U)
const headrailGeo = new THREE.BoxGeometry(winW + 0.04, 0.065, 0.08);
const headrailMesh = new THREE.Mesh(headrailGeo, whiteAluminumMat);
headrailMesh.name = 'HoneycombHeadrail';
headrailMesh.position.set(0, 1.20, 0.02);
headrailMesh.castShadow = true;
rootGroup.add(headrailMesh);

// End caps
const capGeo = new THREE.BoxGeometry(0.015, 0.075, 0.09);
const capLeft = new THREE.Mesh(capGeo, whiteAluminumMat);
capLeft.position.set(-winW / 2 - 0.02, 1.20, 0.02);
rootGroup.add(capLeft);

const capRight = new THREE.Mesh(capGeo, whiteAluminumMat);
capRight.position.set(winW / 2 + 0.02, 1.20, 0.02);
rootGroup.add(capRight);

// Cordless / Beaded pull chain on right
const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.85, 12);
const pullChain = new THREE.Mesh(chainGeo, chainMat);
pullChain.name = 'HoneycombPullChain';
pullChain.position.set(winW / 2 + 0.012, 0.775, 0.035);
rootGroup.add(pullChain);

// B. Honeycomb Cellular Pleated Fabric (Mặt nan rèm tổ ong dập nếp lục giác)
// Front faceted canvas
const fabricGeo = new THREE.PlaneGeometry(winW, winH, 32, 64);
const fabricMat = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  roughness: 0.82,
  metalness: 0.03,
  side: THREE.DoubleSide
});
const fabricMesh = new THREE.Mesh(fabricGeo, fabricMat);
fabricMesh.name = 'HoneycombFabricPanel';
fabricMesh.position.set(0, 0.375, 0.02);
fabricMesh.castShadow = true;
fabricMesh.receiveShadow = true;
rootGroup.add(fabricMesh);

// Distinctive Honeycomb Hexagonal Side Profiles on Left & Right edges!
const edgeGeo = new THREE.PlaneGeometry(0.06, winH, 1, 32);
edgeGeo.rotateY(Math.PI / 2);
const edgeMat = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  roughness: 0.75,
  metalness: 0.05,
  side: THREE.DoubleSide
});

const leftEdgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
leftEdgeMesh.name = 'HoneycombEdgeLeft';
leftEdgeMesh.position.set(-winW / 2, 0.375, 0.02);
rootGroup.add(leftEdgeMesh);

const rightEdgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
rightEdgeMesh.name = 'HoneycombEdgeRight';
rightEdgeMesh.position.set(winW / 2, 0.375, 0.02);
rootGroup.add(rightEdgeMesh);

// C. Bottom Counterweight Rail (Thanh đáy nhôm định hình nâng hạ theo nếp gấp)
const bottomRailGeo = new THREE.BoxGeometry(winW + 0.02, 0.035, 0.06);
const bottomRailMesh = new THREE.Mesh(bottomRailGeo, whiteAluminumMat);
bottomRailMesh.name = 'HoneycombBottomBar';
bottomRailMesh.position.set(0, -0.45, 0.02);
bottomRailMesh.castShadow = true;
rootGroup.add(bottomRailMesh);

// Export to GLB
const exporter = new GLTFExporter();
try {
  const gltf = await exporter.parseAsync(rootGroup, { binary: true });
  const outPath = 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-honeycomb.glb';
  fs.writeFileSync(outPath, Buffer.from(gltf));
  console.log('Successfully generated clean Honeycomb GLB at: ' + outPath + ' (size: ' + (gltf.byteLength / 1024).toFixed(1) + ' KB)');
} catch (err) {
  console.error('Failed to export GLB:', err);
}

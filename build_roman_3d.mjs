import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating Photorealistic 3D Roman Shade with Organic Slub Linen Fabric...');

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
rootGroup.name = 'CurtainRomanShade';

// ========================================================
// MATERIALS
// ========================================================
const whiteAluminumMat = new THREE.MeshStandardMaterial({
  color: '#f8fafc',
  metalness: 0.20,
  roughness: 0.28,
  side: THREE.DoubleSide
});

const chainMat = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  metalness: 0.65,
  roughness: 0.25
});

const wallMat = new THREE.MeshStandardMaterial({
  color: '#eae4d9',
  roughness: 0.88,
  metalness: 0.04,
  side: THREE.DoubleSide
});

const sillMat = new THREE.MeshStandardMaterial({
  color: '#f5f1e8',
  roughness: 0.35,
  metalness: 0.12,
  side: THREE.DoubleSide
});

const casementMat = new THREE.MeshStandardMaterial({
  color: '#282624',
  metalness: 0.65,
  roughness: 0.32,
  side: THREE.DoubleSide
});

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

// Organic Slub Coarse Woven Linen Material (Warm Oatmeal / Rustic Flax)
const romanLinenMat = new THREE.MeshStandardMaterial({
  color: '#dfd7c8',
  roughness: 0.92,
  metalness: 0.0,
  side: THREE.DoubleSide
});

// ========================================================
// 1. ARCHITECTURAL SURROUND (SEAMLESS PENTHOUSE WINDOW)
// ========================================================
const wallZ = -0.10;
const wallThickness = 0.10;

const lowerWall = new THREE.Mesh(new THREE.BoxGeometry(3.40, 0.80, wallThickness), wallMat);
lowerWall.name = 'RomanLowerWall';
lowerWall.position.set(0, -0.85, wallZ);
lowerWall.receiveShadow = true;
rootGroup.add(lowerWall);

const topHeaderWall = new THREE.Mesh(new THREE.BoxGeometry(3.40, 0.15, wallThickness), wallMat);
topHeaderWall.name = 'RomanHeaderWall';
topHeaderWall.position.set(0, 1.275, wallZ);
topHeaderWall.receiveShadow = true;
rootGroup.add(topHeaderWall);

const leftEdgeWall = new THREE.Mesh(new THREE.BoxGeometry(0.40, 1.65, wallThickness), wallMat);
leftEdgeWall.name = 'RomanLeftEdgeWall';
leftEdgeWall.position.set(-1.50, 0.375, wallZ);
leftEdgeWall.receiveShadow = true;
rootGroup.add(leftEdgeWall);

const rightEdgeWall = new THREE.Mesh(new THREE.BoxGeometry(0.40, 1.65, wallThickness), wallMat);
rightEdgeWall.name = 'RomanRightEdgeWall';
rightEdgeWall.position.set(1.50, 0.375, wallZ);
rightEdgeWall.receiveShadow = true;
rootGroup.add(rightEdgeWall);

// ========================================================
// 2. WINDOW CASEMENT & GLASS
// ========================================================
const winW = 2.60;
const winH = 1.65;

const windowGlass = new THREE.Mesh(new THREE.PlaneGeometry(winW - 0.04, winH - 0.04), glassMat);
windowGlass.name = 'WindowGlass_Roman';
windowGlass.position.set(0, 0.375, -0.12);
rootGroup.add(windowGlass);

const frameBorderThickness = 0.025;
const frameDepth = 0.04;
const frameZ = -0.09;

const fTop = new THREE.Mesh(new THREE.BoxGeometry(winW, frameBorderThickness, frameDepth), casementMat);
fTop.position.set(0, 1.20 - frameBorderThickness / 2, frameZ);
rootGroup.add(fTop);

const fBottom = new THREE.Mesh(new THREE.BoxGeometry(winW, frameBorderThickness, frameDepth), casementMat);
fBottom.position.set(0, -0.45 + frameBorderThickness / 2, frameZ);
rootGroup.add(fBottom);

const fLeft = new THREE.Mesh(new THREE.BoxGeometry(frameBorderThickness, winH - frameBorderThickness * 2, frameDepth), casementMat);
fLeft.position.set(-winW / 2 + frameBorderThickness / 2, 0.375, frameZ);
rootGroup.add(fLeft);

const fRight = new THREE.Mesh(new THREE.BoxGeometry(frameBorderThickness, winH - frameBorderThickness * 2, frameDepth), casementMat);
fRight.position.set(winW / 2 - frameBorderThickness / 2, 0.375, frameZ);
rootGroup.add(fRight);

const fCenterMullion = new THREE.Mesh(new THREE.BoxGeometry(0.02, winH - frameBorderThickness * 2, frameDepth * 0.8), casementMat);
fCenterMullion.position.set(0, 0.375, frameZ);
rootGroup.add(fCenterMullion);

const sillMesh = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.10, 0.045, 0.16), sillMat);
sillMesh.name = 'WindowSill_Roman';
sillMesh.position.set(0, -0.45, -0.02);
sillMesh.receiveShadow = true;
rootGroup.add(sillMesh);

// ========================================================
// 3. ROMAN SHADE HEADRAIL & MOUNTING CASSETTE
// ========================================================
// Low profile fabric-wrapped / white cassette: width 2.62m, height 0.05m, depth 0.06m
const headrailMesh = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.04, 0.05, 0.06), whiteAluminumMat);
headrailMesh.name = 'RomanHeadrail';
headrailMesh.position.set(0, 1.20, 0.025);
headrailMesh.castShadow = true;
rootGroup.add(headrailMesh);

const capLeft = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.055, 0.065), whiteAluminumMat);
capLeft.position.set(-winW / 2 - 0.02, 1.20, 0.025);
rootGroup.add(capLeft);

const capRight = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.055, 0.065), whiteAluminumMat);
capRight.position.set(winW / 2 + 0.02, 1.20, 0.025);
rootGroup.add(capRight);

const pullChain = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.85, 12), chainMat);
pullChain.name = 'RomanPullChain';
pullChain.position.set(winW / 2 + 0.012, 0.775, 0.035);
rootGroup.add(pullChain);

// ========================================================
// 4. ROMAN SHADE 5 HORIZONTAL SEGMENT PANELS
// ========================================================
// Full height = 1.65m (from y = 1.20 to y = -0.45)
// 5 Panels: Each panel is 0.33m high
const numPanels = 5;
const panelHeight = winH / numPanels; // 0.33m

const foldingGroup = new THREE.Group();
foldingGroup.name = 'RomanFoldingGroup';
foldingGroup.position.set(0, 1.20, 0.025); // Anchored at top headrail
rootGroup.add(foldingGroup);

for (let i = 0; i < numPanels; i++) {
  const panelGroup = new THREE.Group();
  panelGroup.name = `RomanPanel_${i}`;
  // Local position within foldingGroup:
  // Each panel's pivot is at its top edge (y = - i * panelHeight)
  panelGroup.position.set(0, - i * panelHeight, 0);

  // Main flat linen panel face
  const faceGeo = new THREE.PlaneGeometry(winW, panelHeight);
  // Center plane so its top edge is at y = 0, bottom edge is at y = -panelHeight
  faceGeo.translate(0, -panelHeight / 2, 0);

  // Set precise UV coordinates matching linen texture repeat
  const uvAttr = faceGeo.attributes.uv;
  for (let k = 0; k < uvAttr.count; k++) {
    const u = uvAttr.getX(k) * 4.0; // Repeat 4 times across 2.6m width
    const v = (i + uvAttr.getY(k)) / numPanels;
    uvAttr.setXY(k, u, v);
  }

  const faceMesh = new THREE.Mesh(faceGeo, romanLinenMat);
  faceMesh.name = `RomanFace_${i}`;
  faceMesh.castShadow = true;
  faceMesh.receiveShadow = true;
  panelGroup.add(faceMesh);

  // Horizontal batten seam ridge (Gờ xương luồn ngang 3D)
  // Modeled as a subtle rounded cylinder projecting slightly forward at the bottom seam
  const battenGeo = new THREE.CylinderGeometry(0.004, 0.004, winW, 16);
  battenGeo.rotateZ(Math.PI / 2);
  const battenMesh = new THREE.Mesh(battenGeo, romanLinenMat);
  battenMesh.name = `RomanBatten_${i}`;
  battenMesh.position.set(0, -panelHeight, 0.004);
  battenMesh.castShadow = true;
  panelGroup.add(battenMesh);

  // Signature Roman Cascading Bottom Flap (Múi gập nếp xếp lớp đặc trưng)
  // A subtle double-layer fabric flap at the bottom of each panel that hangs down 3.5cm
  const flapH = 0.038;
  const flapGeo = new THREE.PlaneGeometry(winW, flapH);
  flapGeo.translate(0, -flapH / 2, 0);
  const flapMesh = new THREE.Mesh(flapGeo, romanLinenMat);
  flapMesh.name = `RomanFlap_${i}`;
  flapMesh.position.set(0, -panelHeight, 0.006);
  flapMesh.rotation.x = 0.08; // Subtle natural forward flare
  flapMesh.castShadow = true;
  panelGroup.add(flapMesh);

  foldingGroup.add(panelGroup);
}

// ========================================================
// 5. ROMAN BOTTOM COUNTERWEIGHT RAIL & DOUBLE HEM
// ========================================================
const bottomRailGeo = new THREE.BoxGeometry(winW + 0.01, 0.035, 0.016);
const bottomRailMesh = new THREE.Mesh(bottomRailGeo, whiteAluminumMat);
bottomRailMesh.name = 'RomanBottomBar';
bottomRailMesh.position.set(0, -0.45, 0.026);
bottomRailMesh.castShadow = true;
rootGroup.add(bottomRailMesh);

// Export to GLB
const exporter = new GLTFExporter();
try {
  const gltf = await exporter.parseAsync(rootGroup, { binary: true });
  const outPath = 'D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-roman.glb';
  fs.writeFileSync(outPath, Buffer.from(gltf));
  const outDist = 'D:/UniVeloria/UniVeloria-FE/dist/models/curtains/curtain-roman.glb';
  fs.writeFileSync(outDist, Buffer.from(gltf));
  console.log('Successfully generated Photorealistic Roman Shade GLB at: ' + outPath + ' (size: ' + (gltf.byteLength / 1024).toFixed(1) + ' KB)');
} catch (err) {
  console.error('Failed to export GLB:', err);
}

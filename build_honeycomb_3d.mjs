import fs from 'fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating Photorealistic 3D Cellular Honeycomb Blind with Sharp Hexagonal Cells...');

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

// Materials
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

// Outer Linen Fabric Material
const linenMat = new THREE.MeshStandardMaterial({
  color: '#d6cec2',
  roughness: 0.82,
  metalness: 0.02,
  side: THREE.DoubleSide
});

// Hexagonal Side Rim Outline Material (Mép viền lục giác màu trắng kem sắc nét như ảnh mẫu)
const hexRimMat = new THREE.MeshStandardMaterial({
  color: '#faf7f0',
  roughness: 0.65,
  metalness: 0.05,
  side: THREE.DoubleSide
});

// Inner Blackout Foil Lining Material (Mặt trong màu than đen cản sáng tuyệt đối)
const innerBlackoutMat = new THREE.MeshStandardMaterial({
  color: '#1a1918',
  roughness: 0.8,
  metalness: 0.1,
  side: THREE.DoubleSide
});

// ========================================================
// 1. SEAMLESS ARCHITECTURAL WALL MESHES
// ========================================================
const wallZ = -0.10;
const wallThickness = 0.10;

const lowerWall = new THREE.Mesh(new THREE.BoxGeometry(3.40, 0.80, wallThickness), wallMat);
lowerWall.name = 'HoneycombLowerWall';
lowerWall.position.set(0, -0.85, wallZ);
lowerWall.receiveShadow = true;
rootGroup.add(lowerWall);

const topHeaderWall = new THREE.Mesh(new THREE.BoxGeometry(3.40, 0.15, wallThickness), wallMat);
topHeaderWall.name = 'HoneycombHeaderWall';
topHeaderWall.position.set(0, 1.275, wallZ);
topHeaderWall.receiveShadow = true;
rootGroup.add(topHeaderWall);

const leftEdgeWall = new THREE.Mesh(new THREE.BoxGeometry(0.40, 1.65, wallThickness), wallMat);
leftEdgeWall.name = 'HoneycombLeftEdgeWall';
leftEdgeWall.position.set(-1.50, 0.375, wallZ);
leftEdgeWall.receiveShadow = true;
rootGroup.add(leftEdgeWall);

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

const windowGlass = new THREE.Mesh(new THREE.PlaneGeometry(winW - 0.04, winH - 0.04), glassMat);
windowGlass.name = 'WindowGlass_Honeycomb';
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
sillMesh.name = 'WindowSill_Honeycomb';
sillMesh.position.set(0, -0.45, -0.02);
sillMesh.receiveShadow = true;
rootGroup.add(sillMesh);

// ========================================================
// 3. HONEYCOMB HEADRAIL CASSETTE
// ========================================================
// Cassette depth 0.075m, height 0.065m
const headrailMesh = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.04, 0.065, 0.075), whiteAluminumMat);
headrailMesh.name = 'HoneycombHeadrail';
headrailMesh.position.set(0, 1.20, 0.02);
headrailMesh.castShadow = true;
rootGroup.add(headrailMesh);

const capLeft = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.075, 0.085), whiteAluminumMat);
capLeft.position.set(-winW / 2 - 0.02, 1.20, 0.02);
rootGroup.add(capLeft);

const capRight = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.075, 0.085), whiteAluminumMat);
capRight.position.set(winW / 2 + 0.02, 1.20, 0.02);
rootGroup.add(capRight);

const pullChain = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.85, 12), chainMat);
pullChain.name = 'HoneycombPullChain';
pullChain.position.set(winW / 2 + 0.012, 0.775, 0.035);
rootGroup.add(pullChain);

// ========================================================
// 4. DISTINCT 3D HONEYCOMB GEOMETRY (38 Rộng Mở Chuẩn Lục Giác)
// ========================================================
const N = 38;
const cellH = winH / N; // ~0.0434m (4.34cm)
const zFront = 0.026;   // +2.6cm
const zBack = -0.026;   // -2.6cm (Total cell depth = 5.2cm - perfectly proportioned!)
const tubeWidth = 0.06; // 6cm depth into shade

// Returns the 6 vertices of hexagonal cell i in (Y, Z) relative to topY = 0
function getHexVertices(i) {
  const yTop = - i * cellH;
  const yBot = - (i + 1) * cellH;
  const yMid = - (i + 0.5) * cellH;
  return [
    { y: yTop, z: 0.0 },                     // V0: Top apex (bond line)
    { y: yMid + 0.16 * cellH, z: zFront },   // V1: Upper front crease
    { y: yMid - 0.16 * cellH, z: zFront },   // V2: Lower front crease
    { y: yBot, z: 0.0 },                     // V3: Bottom apex (bond line)
    { y: yMid - 0.16 * cellH, z: zBack },    // V4: Lower back crease
    { y: yMid + 0.16 * cellH, z: zBack }     // V5: Upper back crease
  ];
}

// A. 3D HOLLOW HEXAGONAL CELLS AT SIDES (Tube walls)
function buildHexTubesGeometry(xOuter, xInner) {
  const positions = [];
  const normals = [];
  const uvs = [];

  for (let i = 0; i < N; i++) {
    const v = getHexVertices(i);
    for (let f = 0; f < 6; f++) {
      const pA = v[f];
      const pB = v[(f + 1) % 6];

      const dy = pB.y - pA.y;
      const dz = pB.z - pA.z;
      let ny = -dz;
      let nz = dy;
      const len = Math.hypot(ny, nz);
      ny /= len;
      nz /= len;

      positions.push(
        xOuter, pA.y, pA.z,
        xInner, pA.y, pA.z,
        xInner, pB.y, pB.z
      );
      normals.push(0, ny, nz, 0, ny, nz, 0, ny, nz);
      uvs.push(0, 0, 1, 0, 1, 1);

      positions.push(
        xOuter, pA.y, pA.z,
        xInner, pB.y, pB.z,
        xOuter, pB.y, pB.z
      );
      normals.push(0, ny, nz, 0, ny, nz, 0, ny, nz);
      uvs.push(0, 0, 1, 1, 0, 1);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  return geo;
}

// B. INNER BLACKOUT FOIL LINING INSIDE THE HEXAGON
function buildHexInteriorLiningGeometry(xOuter, xInner) {
  const positions = [];
  const normals = [];
  const uvs = [];

  const xIn1 = xOuter + (xOuter < 0 ? 0.002 : -0.002);
  const xIn2 = xInner;

  for (let i = 0; i < N; i++) {
    const v = getHexVertices(i);
    for (let f = 0; f < 6; f++) {
      const pA = v[f];
      const pB = v[(f + 1) % 6];

      // Inward facing normals
      const dy = pB.y - pA.y;
      const dz = pB.z - pA.z;
      let ny = dz;
      let nz = -dy;
      const len = Math.hypot(ny, nz);
      ny /= len;
      nz /= len;

      positions.push(
        xIn1, pA.y, pA.z,
        xIn2, pA.y, pA.z,
        xIn2, pB.y, pB.z
      );
      normals.push(0, ny, nz, 0, ny, nz, 0, ny, nz);
      uvs.push(0, 0, 1, 0, 1, 1);

      positions.push(
        xIn1, pA.y, pA.z,
        xIn2, pB.y, pB.z,
        xIn1, pB.y, pB.z
      );
      normals.push(0, ny, nz, 0, ny, nz, 0, ny, nz);
      uvs.push(0, 0, 1, 1, 0, 1);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  return geo;
}

// C. CRISP HEXAGONAL END-RIM (Mép viền lục giác nhìn từ cạnh bên)
// Creates a distinct 2.5mm light-colored rim along the 6 edges of each hexagon at x = xOuter!
function buildHexRimsGeometry(xOuter) {
  const positions = [];
  const normals = [];
  const uvs = [];

  const rimThickness = 0.0025; // 2.5mm rim
  const nx = xOuter < 0 ? -1 : 1;

  for (let i = 0; i < N; i++) {
    const v = getHexVertices(i);
    const yMid = - (i + 0.5) * cellH;

    // Build 6 quadrilaterals forming the hexagonal ring rim
    for (let f = 0; f < 6; f++) {
      const pA = v[f];
      const pB = v[(f + 1) % 6];

      // Outer points: pA, pB
      // Inner points: slightly scaled towards cell center (yMid, 0)
      const scaleFactor = 0.85;
      const pA_in = {
        y: yMid + (pA.y - yMid) * scaleFactor,
        z: pA.z * scaleFactor
      };
      const pB_in = {
        y: yMid + (pB.y - yMid) * scaleFactor,
        z: pB.z * scaleFactor
      };

      // Quad: pA -> pB -> pB_in -> pA_in
      if (nx < 0) {
        positions.push(
          xOuter, pA.y, pA.z,
          xOuter, pB.y, pB.z,
          xOuter, pB_in.y, pB_in.z,

          xOuter, pA.y, pA.z,
          xOuter, pB_in.y, pB_in.z,
          xOuter, pA_in.y, pA_in.z
        );
      } else {
        positions.push(
          xOuter, pA.y, pA.z,
          xOuter, pB_in.y, pB_in.z,
          xOuter, pB.y, pB.z,

          xOuter, pA.y, pA.z,
          xOuter, pA_in.y, pA_in.z,
          xOuter, pB_in.y, pB_in.z
        );
      }
      for (let k = 0; k < 6; k++) {
        normals.push(nx, 0, 0);
        uvs.push(0.5, 0.5);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  return geo;
}

// D. FRONT & BACK PLEATED ACCORDION SHEETS
function buildPleatedSheetGeometry(isFront) {
  const positions = [];
  const normals = [];
  const uvs = [];

  const xL = -winW / 2;
  const xR = winW / 2;

  for (let i = 0; i < N; i++) {
    const v = getHexVertices(i);
    const faceIndices = isFront ? [[0, 1], [1, 2], [2, 3]] : [[3, 4], [4, 5], [5, 0]];

    for (const [idxA, idxB] of faceIndices) {
      const pA = v[idxA];
      const pB = v[idxB];

      const dy = pB.y - pA.y;
      const dz = pB.z - pA.z;
      let ny = -dz;
      let nz = dy;
      if (!isFront) {
        ny = dz;
        nz = -dy;
      }
      const len = Math.hypot(ny, nz);
      ny /= len;
      nz /= len;

      const vUv0 = i / N;
      const vUv1 = (i + 1) / N;

      positions.push(
        xL, pA.y, pA.z,
        xR, pA.y, pA.z,
        xR, pB.y, pB.z
      );
      normals.push(0, ny, nz, 0, ny, nz, 0, ny, nz);
      uvs.push(0, vUv0, 1, vUv0, 1, vUv1);

      positions.push(
        xL, pA.y, pA.z,
        xR, pB.y, pB.z,
        xL, pB.y, pB.z
      );
      normals.push(0, ny, nz, 0, ny, nz, 0, ny, nz);
      uvs.push(0, vUv0, 1, vUv1, 0, vUv1);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  return geo;
}

// ========================================================
// 5. ASSEMBLE ACCORDION FOLDING GROUP (topY = 1.20)
// ========================================================
const foldingGroup = new THREE.Group();
foldingGroup.name = 'HoneycombFoldingGroup';
foldingGroup.position.set(0, 1.20, 0.02);
rootGroup.add(foldingGroup);

// Front Pleated Sheet
const frontSheetGeo = buildPleatedSheetGeometry(true);
const frontSheetMesh = new THREE.Mesh(frontSheetGeo, linenMat);
frontSheetMesh.name = 'HoneycombFabricPanel';
frontSheetMesh.castShadow = true;
frontSheetMesh.receiveShadow = true;
foldingGroup.add(frontSheetMesh);

// Back Pleated Sheet
const backSheetGeo = buildPleatedSheetGeometry(false);
const backSheetMesh = new THREE.Mesh(backSheetGeo, linenMat);
backSheetMesh.name = 'HoneycombBackSheet';
backSheetMesh.castShadow = true;
backSheetMesh.receiveShadow = true;
foldingGroup.add(backSheetMesh);

// Left 3D Hollow Hexagonal Cells
const leftTubesGeo = buildHexTubesGeometry(-winW / 2, -winW / 2 + tubeWidth);
const leftTubesMesh = new THREE.Mesh(leftTubesGeo, linenMat);
leftTubesMesh.name = 'HoneycombCellsLeft';
leftTubesMesh.castShadow = true;
leftTubesMesh.receiveShadow = true;
foldingGroup.add(leftTubesMesh);

// Left Dark Interior Lining
const leftInnerGeo = buildHexInteriorLiningGeometry(-winW / 2, -winW / 2 + tubeWidth);
const leftInnerMesh = new THREE.Mesh(leftInnerGeo, innerBlackoutMat);
leftInnerMesh.name = 'HoneycombInteriorLeft';
foldingGroup.add(leftInnerMesh);

// Left Crisp White/Cream Hexagonal Rims (Đường viền lục giác rõ nét!)
const leftRimsGeo = buildHexRimsGeometry(-winW / 2);
const leftRimsMesh = new THREE.Mesh(leftRimsGeo, hexRimMat);
leftRimsMesh.name = 'HoneycombRimsLeft';
foldingGroup.add(leftRimsMesh);

// Right 3D Hollow Hexagonal Cells
const rightTubesGeo = buildHexTubesGeometry(winW / 2, winW / 2 - tubeWidth);
const rightTubesMesh = new THREE.Mesh(rightTubesGeo, linenMat);
rightTubesMesh.name = 'HoneycombCellsRight';
rightTubesMesh.castShadow = true;
rightTubesMesh.receiveShadow = true;
foldingGroup.add(rightTubesMesh);

// Right Dark Interior Lining
const rightInnerGeo = buildHexInteriorLiningGeometry(winW / 2, winW / 2 - tubeWidth);
const rightInnerMesh = new THREE.Mesh(rightInnerGeo, innerBlackoutMat);
rightInnerMesh.name = 'HoneycombInteriorRight';
foldingGroup.add(rightInnerMesh);

// Right Crisp White/Cream Hexagonal Rims
const rightRimsGeo = buildHexRimsGeometry(winW / 2);
const rightRimsMesh = new THREE.Mesh(rightRimsGeo, hexRimMat);
rightRimsMesh.name = 'HoneycombRimsRight';
foldingGroup.add(rightRimsMesh);

// ========================================================
// 6. BOTTOM COUNTERWEIGHT RAIL
// ========================================================
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
  console.log('Successfully generated Photorealistic Honeycomb GLB at: ' + outPath + ' (size: ' + (gltf.byteLength / 1024).toFixed(1) + ' KB)');
} catch (err) {
  console.error('Failed to export GLB:', err);
}

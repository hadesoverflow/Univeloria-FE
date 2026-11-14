import fs from 'fs';
import path from 'path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating 3D GLB models for 5 Rainbow / Zebra Blind products...');

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
 * Creates a zebra stripe DataTexture with solid fabric bands and sheer mesh bands
 */
function createZebraDataTexture(fabricHex, isBackLayer = false) {
  const width = 256;
  const height = 256;
  const size = width * height * 4;
  const data = new Uint8Array(size);

  const col = new THREE.Color(fabricHex);
  const rBase = Math.round(col.r * 255);
  const gBase = Math.round(col.g * 255);
  const bBase = Math.round(col.b * 255);

  const cycleHeight = 32; // 8 cycles in 256px
  const solidHeight = 20; // 62.5% solid, 37.5% sheer
  const offset = isBackLayer ? 6 : 0; // slight offset for back layer

  for (let y = 0; y < height; y++) {
    const cycleY = (y + offset) % cycleHeight;
    const isSolid = cycleY < solidHeight;

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (isSolid) {
        // Fine fabric thread variation
        const threadNoise = ((x % 4 === 0 ? 12 : 0) + (y % 3 === 0 ? 8 : 0) - 8);
        const r = Math.min(255, Math.max(0, rBase + threadNoise));
        const g = Math.min(255, Math.max(0, gBase + threadNoise));
        const b = Math.min(255, Math.max(0, bBase + threadNoise));
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255; // 100% solid opacity
      } else {
        // Translucent sheer voile / mesh netting
        const isMeshLine = (x % 6 === 0) || (y % 4 === 0);
        if (isMeshLine) {
          data[idx] = 240;
          data[idx + 1] = 240;
          data[idx + 2] = 245;
          data[idx + 3] = 160; // delicate sheer thread
        } else {
          data[idx] = 250;
          data[idx + 1] = 250;
          data[idx + 2] = 250;
          data[idx + 3] = 55; // airy see-through mesh (approx 22% alpha)
        }
      }
    }
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 2.5); // repeats along the 2.5m drop
  texture.needsUpdate = true;
  return texture;
}

function createRainbowModel({
  name,
  hoodColor,
  frontFabricColor,
  backFabricColor,
  bottomBarColor,
  chainColor = '#f0f0f0',
  hoodMetalness = 0.5,
  hoodRoughness = 0.3
}) {
  const rootGroup = new THREE.Group();
  rootGroup.name = name;

  const hoodMat = new THREE.MeshStandardMaterial({
    color: hoodColor,
    metalness: hoodMetalness,
    roughness: hoodRoughness,
    side: THREE.DoubleSide
  });

  // 1. Top Round Roller Tube (Trục cuốn nhôm trên đỉnh)
  const tubeGeo = new THREE.CylinderGeometry(0.038, 0.038, 3.62, 32);
  tubeGeo.rotateZ(Math.PI / 2);
  const tubeMesh = new THREE.Mesh(tubeGeo, hoodMat);
  tubeMesh.name = 'RainbowTopTube';
  tubeMesh.position.set(0, 1.26, 0.015);
  rootGroup.add(tubeMesh);

  // Top Curved Cassette Hood Box (Hộp máng rèm cầu vồng bo vát cong chuẩn hiện đại)
  const hoodGeo = new THREE.BoxGeometry(3.68, 0.11, 0.12);
  const hoodMesh = new THREE.Mesh(hoodGeo, hoodMat);
  hoodMesh.name = 'RainbowTopHood';
  hoodMesh.position.set(0, 1.30, 0.01);
  rootGroup.add(hoodMesh);

  // 2. Mounting Brackets (Giá đỡ và ốp hồi 2 bên hộp rèm)
  const bracketGeo = new THREE.BoxGeometry(0.04, 0.13, 0.13);
  const leftBracket = new THREE.Mesh(bracketGeo, hoodMat);
  leftBracket.position.set(-1.82, 1.28, 0.01);
  rootGroup.add(leftBracket);

  const rightBracket = new THREE.Mesh(bracketGeo, hoodMat);
  rightBracket.position.set(1.82, 1.28, 0.01);
  rootGroup.add(rightBracket);

  // Beaded Pull Chain (Dây kéo chuỗi hạt bên phải)
  const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 1.10, 12);
  const chainMat = new THREE.MeshStandardMaterial({
    color: chainColor,
    metalness: chainColor === '#d4af37' ? 0.85 : 0.65,
    roughness: chainColor === '#d4af37' ? 0.2 : 0.25
  });
  const pullChain = new THREE.Mesh(chainGeo, chainMat);
  pullChain.name = 'RainbowPullChain';
  pullChain.position.set(1.78, 0.73, 0.04);
  rootGroup.add(pullChain);

  // 3. FRONT Fabric Panel (Lớp rèm trước z = 0.024)
  const frontFabricGeo = new THREE.PlaneGeometry(3.54, 2.50, 32, 32);
  const frontFabricMat = new THREE.MeshStandardMaterial({
    color: frontFabricColor,
    transparent: true,
    opacity: 0.95,
    roughness: 0.82,
    metalness: 0.02,
    side: THREE.DoubleSide
  });
  const frontFabricMesh = new THREE.Mesh(frontFabricGeo, frontFabricMat);
  frontFabricMesh.name = 'RainbowFrontFabric';
  frontFabricMesh.position.set(0, 0.01, 0.024);
  frontFabricMesh.castShadow = true;
  frontFabricMesh.receiveShadow = true;
  rootGroup.add(frontFabricMesh);

  // 4. BACK Fabric Panel (Lớp rèm sau z = 0.006)
  const backFabricGeo = new THREE.PlaneGeometry(3.54, 2.50, 32, 32);
  const backFabricMat = new THREE.MeshStandardMaterial({
    color: backFabricColor || frontFabricColor,
    transparent: true,
    opacity: 0.88,
    roughness: 0.82,
    metalness: 0.02,
    side: THREE.DoubleSide
  });
  const backFabricMesh = new THREE.Mesh(backFabricGeo, backFabricMat);
  backFabricMesh.name = 'RainbowBackFabric';
  backFabricMesh.position.set(0, 0.01, 0.006);
  backFabricMesh.castShadow = true;
  backFabricMesh.receiveShadow = true;
  rootGroup.add(backFabricMesh);

  // 5. Bottom Weighted Double-Roller Bar (Thanh đáy đối trọng rèm cầu vồng)
  const bottomBarGeo = new THREE.CylinderGeometry(0.020, 0.020, 3.56, 24);
  bottomBarGeo.rotateZ(Math.PI / 2);
  const bottomBarMat = new THREE.MeshStandardMaterial({
    color: bottomBarColor,
    roughness: 0.35,
    metalness: 0.45,
    side: THREE.DoubleSide
  });
  const bottomBarMesh = new THREE.Mesh(bottomBarGeo, bottomBarMat);
  bottomBarMesh.name = 'RainbowBottomBar';
  bottomBarMesh.position.set(0, -1.24, 0.015);
  rootGroup.add(bottomBarMesh);

  return rootGroup;
}

async function exportGlb(rootGroup, outPath) {
  const exporter = new GLTFExporter();
  const gltf = await exporter.parseAsync(rootGroup, { binary: true });
  const buffer = Buffer.from(gltf);
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated ${path.basename(outPath)} (${buffer.length} bytes)`);
}

async function main() {
  const outDir = 'UniVeloria-FE/public/models/curtains';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. ModernStripe: Clean Contemporary Minimalist Zebra Blind (Trắng kem / Ghi xám hiện đại)
  const modernStripe = createRainbowModel({
    name: 'CurtainRainbowModernStripe',
    hoodColor: '#ffffff',
    frontFabricColor: '#f3ebe1',
    backFabricColor: '#f3ebe1',
    bottomBarColor: '#ffffff',
    chainColor: '#e0e0e0',
    hoodMetalness: 0.4,
    hoodRoughness: 0.3
  });
  await exportGlb(modernStripe, path.join(outDir, 'curtain-rainbow-modernstripe.glb'));

  // 2. NordicRay: Scandinavian Cozy Relaxing Zebra Blind (Be cát Bắc Âu / Nâu sữa ấm áp)
  const nordicRay = createRainbowModel({
    name: 'CurtainRainbowNordicRay',
    hoodColor: '#ede4d8',
    frontFabricColor: '#cbae92',
    backFabricColor: '#cbae92',
    bottomBarColor: '#e5dbcd',
    chainColor: '#e0d8cc',
    hoodMetalness: 0.45,
    hoodRoughness: 0.35
  });
  await exportGlb(nordicRay, path.join(outDir, 'curtain-rainbow-nordicray.glb'));

  // 3. SunnyView: Natural Warm Sunlight Zebra Blind (Vàng champagne / Nắng mai rạng rỡ)
  const sunnyView = createRainbowModel({
    name: 'CurtainRainbowSunnyView',
    hoodColor: '#f6ede0',
    frontFabricColor: '#c8af8d',
    backFabricColor: '#c8af8d',
    bottomBarColor: '#eddcc5',
    chainColor: '#f2e6d6',
    hoodMetalness: 0.5,
    hoodRoughness: 0.3
  });
  await exportGlb(sunnyView, path.join(outDir, 'curtain-rainbow-sunnyview.glb'));

  // 4. River.E: Premium 10-Color Series Zebra Blind (Xanh slate thanh lịch / Máng nhôm trắng tuyết)
  const riverE = createRainbowModel({
    name: 'CurtainRainbowRiverE',
    hoodColor: '#f8f9fa',
    frontFabricColor: '#3e586d',
    backFabricColor: '#3e586d',
    bottomBarColor: '#ffffff',
    chainColor: '#eceff1',
    hoodMetalness: 0.5,
    hoodRoughness: 0.25
  });
  await exportGlb(riverE, path.join(outDir, 'curtain-rainbow-rivere.glb'));

  // 5. GoldenWeave: Luxurious Natural Woven Slub Zebra Blind (Dệt sợi vàng óng / Dây kéo mạ kim loại vàng)
  const goldenWeave = createRainbowModel({
    name: 'CurtainRainbowGoldenWeave',
    hoodColor: '#c8a87d',
    frontFabricColor: '#cfb384',
    backFabricColor: '#cfb384',
    bottomBarColor: '#bfa075',
    chainColor: '#d4af37', // metallic gold chain!
    hoodMetalness: 0.75,
    hoodRoughness: 0.25
  });
  await exportGlb(goldenWeave, path.join(outDir, 'curtain-rainbow-goldenweave.glb'));

  console.log('All 5 Rainbow Curtain GLB 3D models generated successfully!');
}

main().catch(console.error);

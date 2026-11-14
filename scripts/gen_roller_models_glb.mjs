import fs from 'fs';
import path from 'path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating 3D GLB models for 3 Roller Blind products...');

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

function createRollerModel({ name, hoodColor, fabricColor, bottomBarColor, metalness = 0.5, roughness = 0.3 }) {
  const rootGroup = new THREE.Group();
  rootGroup.name = name;

  const hoodMat = new THREE.MeshStandardMaterial({
    color: hoodColor,
    metalness: metalness,
    roughness: roughness,
    side: THREE.DoubleSide
  });

  // 1. Top Round Fixed Roller Tube (Thanh cuộn tròn trên đỉnh)
  const tubeGeo = new THREE.CylinderGeometry(0.042, 0.042, 3.62, 32);
  tubeGeo.rotateZ(Math.PI / 2);
  const tubeMesh = new THREE.Mesh(tubeGeo, hoodMat);
  tubeMesh.name = 'RollerTopTube';
  tubeMesh.position.set(0, 1.26, 0.02);
  rootGroup.add(tubeMesh);

  // Top Cassette Hood Shield (Hộp máng nhôm định hình trang nhã)
  const hoodGeo = new THREE.BoxGeometry(3.68, 0.10, 0.11);
  const hoodMesh = new THREE.Mesh(hoodGeo, hoodMat);
  hoodMesh.name = 'RollerTopHood';
  hoodMesh.position.set(0, 1.30, 0.0);
  rootGroup.add(hoodMesh);

  // 2. Mounting Brackets (Giá đỡ 2 đầu thanh cuộn)
  const bracketGeo = new THREE.BoxGeometry(0.04, 0.12, 0.12);
  const leftBracket = new THREE.Mesh(bracketGeo, hoodMat);
  leftBracket.position.set(-1.82, 1.26, 0.01);
  rootGroup.add(leftBracket);

  const rightBracket = new THREE.Mesh(bracketGeo, hoodMat);
  rightBracket.position.set(1.82, 1.26, 0.01);
  rootGroup.add(rightBracket);

  // Beaded Pull Chain (Dây kéo hạt cườm bên phải)
  const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 1.05, 12);
  const chainMat = new THREE.MeshStandardMaterial({ color: '#f5f5f5', metalness: 0.6, roughness: 0.25 });
  const pullChain = new THREE.Mesh(chainGeo, chainMat);
  pullChain.name = 'RollerPullChain';
  pullChain.position.set(1.78, 0.75, 0.03);
  rootGroup.add(pullChain);

  // 3. Roller Fabric Canvas Panel (Vải rèm phủ bì 100% full ô cửa)
  // Width: 3.54m, Height: 2.50m
  const fabricGeo = new THREE.PlaneGeometry(3.54, 2.50, 32, 32);
  const fabricMat = new THREE.MeshStandardMaterial({
    color: fabricColor,
    roughness: 0.88,
    metalness: 0.02,
    side: THREE.DoubleSide
  });
  const fabricMesh = new THREE.Mesh(fabricGeo, fabricMat);
  fabricMesh.name = 'RollerFabricPanel';
  fabricMesh.position.set(0, 0.01, 0.02);
  fabricMesh.castShadow = true;
  fabricMesh.receiveShadow = true;
  rootGroup.add(fabricMesh);

  // 4. Bottom Counterweight Bar (Thanh đáy đối trọng tròn phủ bì 3.56m)
  const bottomBarGeo = new THREE.CylinderGeometry(0.018, 0.018, 3.56, 24);
  bottomBarGeo.rotateZ(Math.PI / 2);
  const bottomBarMat = new THREE.MeshStandardMaterial({
    color: bottomBarColor,
    roughness: 0.45,
    metalness: 0.4,
    side: THREE.DoubleSide
  });
  const bottomBarMesh = new THREE.Mesh(bottomBarGeo, bottomBarMat);
  bottomBarMesh.name = 'RollerBottomBar';
  bottomBarMesh.position.set(0, -1.24, 0.02);
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

  // 1. OfficePro: Modern Dark Titanium Office Roller
  const officePro = createRollerModel({
    name: 'CurtainRollerOfficePro',
    hoodColor: '#2f333a',
    fabricColor: '#4f5560',
    bottomBarColor: '#2b2e34',
    metalness: 0.8,
    roughness: 0.25
  });
  await exportGlb(officePro, path.join(outDir, 'curtain-roller-officepro.glb'));

  // 2. LivingLite: Warm Elegant Living Room Roller
  const livingLite = createRollerModel({
    name: 'CurtainRollerLivingLite',
    hoodColor: '#e8decb',
    fabricColor: '#f4ece3',
    bottomBarColor: '#d6cbb6',
    metalness: 0.4,
    roughness: 0.4
  });
  await exportGlb(livingLite, path.join(outDir, 'curtain-roller-livinglite.glb'));

  // 3. CoastalLite: Crisp Clean Coastal Balcony Roller
  const coastalLite = createRollerModel({
    name: 'CurtainRollerCoastalLite',
    hoodColor: '#ffffff',
    fabricColor: '#ede6db',
    bottomBarColor: '#ffffff',
    metalness: 0.6,
    roughness: 0.3
  });
  await exportGlb(coastalLite, path.join(outDir, 'curtain-roller-coastallite.glb'));

  console.log('All 3 roller curtain GLB models generated successfully!');
}

main().catch(console.error);


import fs from 'fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const buf = fs.readFileSync('D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-sfold-luxury.glb');
const arrayBuf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

const loader = new GLTFLoader();
loader.parse(arrayBuf, '', (gltf) => {
  console.log('Parsed curtain-sfold-luxury.glb successfully!');
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.geometry.computeBoundingBox();
      const bb = child.geometry.boundingBox;
      console.log(`Mesh: "${child.name}", pos: (${child.position.x}, ${child.position.y}, ${child.position.z}), BB min: (${bb.min.x.toFixed(2)}, ${bb.min.y.toFixed(2)}, ${bb.min.z.toFixed(2)}), max: (${bb.max.x.toFixed(2)}, ${bb.max.y.toFixed(2)}, ${bb.max.z.toFixed(2)})`);
    }
  });
});

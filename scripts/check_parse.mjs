import fs from 'fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

globalThis.FileReader = class {
  readAsArrayBuffer(b) {
    b.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
    });
  }
};

const loader = new GLTFLoader();
const buf = fs.readFileSync('D:/UniVeloria/UniVeloria-FE/public/models/curtains/curtain-roller-crystal.glb');
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

loader.parse(ab, '', (gltf) => {
  console.log('--- GLTFLoader Parsed Hierarchy ---');
  gltf.scene.traverse((c) => {
    console.log(`name: "${c.name}", type: ${c.type}, isMesh: ${c.isMesh}`);
  });
});

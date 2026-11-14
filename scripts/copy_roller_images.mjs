import fs from 'fs';
import path from 'path';

const uploadDir = 'C:/Users/songn/.gemini/antigravity/brain/0934d00b-5565-4f6a-9197-342000854c1c/.user_uploaded/';
const mappings = [
  {
    src: 'media_1794641832053_81f7a944.jpg',
    assetName: 'curtain-roller-harmony-2.jpg',
    productName: 'Mẫu Rèm Cuốn Harmony 2.png'
  },
  {
    src: 'media_1794641832054_20a8ac55.jpg',
    assetName: 'curtain-roller-malange-1.jpg',
    productName: 'Mẫu Rèm Cuốn Malange 1.png'
  },
  {
    src: 'media_1794641832055_89de8047.jpg',
    assetName: 'curtain-roller-moon.jpg',
    productName: 'Mẫu Rèm Cuốn Moon.png'
  },
  {
    src: 'media_1794641832057_40c7d301.jpg',
    assetName: 'curtain-roller-silvia.jpg',
    productName: 'Mẫu Rèm Cuốn Silvia.png'
  },
  {
    src: 'media_1794641832061_08531b0f.jpg',
    assetName: 'curtain-roller-sunny.jpg',
    productName: 'Mẫu Rèm Cuốn Sunny.png'
  }
];

for (const item of mappings) {
  const srcPath = path.join(uploadDir, item.src);
  if (fs.existsSync(srcPath)) {
    const assetDest = path.join('UniVeloria-FE/public/assets/curtains', item.assetName);
    fs.copyFileSync(srcPath, assetDest);
    console.log(`Copied to ${assetDest}`);

    const productDest = path.join('UniVeloria-FE/public/product/Rèm/Rèm Cuốn', item.productName);
    fs.copyFileSync(srcPath, productDest);
    console.log(`Copied to ${productDest}`);
  } else {
    console.warn(`Source not found: ${srcPath}`);
  }
}
console.log('Finished copying all 5 roller catalogue images.');


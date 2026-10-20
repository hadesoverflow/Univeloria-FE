import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset, 
  CloudRain, 
  RotateCcw, 
  Sparkles, 
  Sliders, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Maximize2, 
  Minimize2 
} from 'lucide-react';

export const ATMOSPHERE_MODES = {
  morning: {
    id: 'morning',
    name: 'Sáng sớm',
    icon: 'Sunrise',
    sunColor: '#ffecdb',
    sunIntensity: 2.7,
    sunPos: [-3.8, 2.4, 3.8],
    ambColor: '#eae2d5',
    ambIntensity: 1.15,
    skyTop: '#8ec3f8',
    skyBottom: '#fce3c7',
    coveIntensity: 0.6,
    coveColor: '#fff0dc',
    roomTone: '#f4ece3'
  },
  noon: {
    id: 'noon',
    name: 'Trưa nắng',
    icon: 'Sun',
    sunColor: '#ffffff',
    sunIntensity: 3.5,
    sunPos: [1.2, 5.8, 3.2],
    ambColor: '#f7f2ea',
    ambIntensity: 1.35,
    skyTop: '#51a8f5',
    skyBottom: '#d0eaff',
    coveIntensity: 0.2,
    coveColor: '#ffffff',
    roomTone: '#faf6ef'
  },
  sunset: {
    id: 'sunset',
    name: 'Hoàng hôn',
    icon: 'Sunset',
    sunColor: '#ff7b32',
    sunIntensity: 3.1,
    sunPos: [4.6, 1.5, 3.6],
    ambColor: '#e08f62',
    ambIntensity: 0.95,
    skyTop: '#ea5d28',
    skyBottom: '#fbc572',
    coveIntensity: 1.9,
    coveColor: '#ffb56b',
    roomTone: '#f3e1d3'
  },
  night: {
    id: 'night',
    name: 'Ban tối',
    icon: 'Moon',
    sunColor: '#5a82b5',
    sunIntensity: 0.55,
    sunPos: [2.5, 3.2, 2.5],
    ambColor: '#1d2638',
    ambIntensity: 0.65,
    skyTop: '#090f1d',
    skyBottom: '#142036',
    coveIntensity: 2.8,
    coveColor: '#ffc87a',
    roomTone: '#1b2232'
  },
  rain: {
    id: 'rain',
    name: 'Trời mưa + Gió',
    icon: 'CloudRain',
    sunColor: '#9bb1c8',
    sunIntensity: 1.2,
    sunPos: [0, 4.2, 2.2],
    ambColor: '#c2ced9',
    ambIntensity: 1.2,
    skyTop: '#7e93a5',
    skyBottom: '#b9cad7',
    coveIntensity: 1.5,
    coveColor: '#ffe7ca',
    roomTone: '#e4ebf1'
  }
};

/**
 * Procedural 3D Wave Curtain Geometry (Fallback)
 */
function createCurtainGeometry(width, height, wavesCount, openRatio, isLeft) {
  const segmentsX = Math.max(30, wavesCount * 8);
  const segmentsY = 32;
  const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  const pos = geometry.attributes.position;

  // openRatio: 0 = fully closed (width covers to center), 1 = fully open (compressed)
  const currentWidth = width * (1.0 - openRatio * 0.74);
  const waveAmplitude = 0.08 + openRatio * 0.09;
  const totalWaveAngle = wavesCount * Math.PI * 2;
  const anchorX = isLeft ? -width * 0.5 : width * 0.5;

  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) / width) + 0.5;
    const y = pos.getY(i);
    let x;
    if (isLeft) {
      x = anchorX + u * currentWidth;
    } else {
      x = anchorX - (1 - u) * currentWidth;
    }
    const taper = 1.0 - (y / height) * 0.08;
    const z = Math.sin(u * totalWaveAngle) * waveAmplitude * taper;
    pos.setXYZ(i, x, y, z);
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Procedural Sky Gradient Canvas Texture
 */
function createSkyCanvasTexture(colorTop, colorBottom) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, colorTop);
  grad.addColorStop(1, colorBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}


function createPvcCanvasTexture(stripeColor = '#1a56b7') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Background crisp white
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1024, 1024);

  const numStripes = 16;
  const stripeW = 1024 / numStripes;

  for (let i = 0; i < numStripes; i++) {
    const x = i * stripeW;
    if (i % 2 === 0) {
      // Primary stripe color
      ctx.fillStyle = stripeColor;
      ctx.fillRect(x, 0, stripeW, 1024);

      // Subtle center pinstripe highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.fillRect(x + stripeW * 0.42, 0, stripeW * 0.16, 1024);

      // Edge seams
      ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
      ctx.fillRect(x, 0, 1.5, 1024);
      ctx.fillRect(x + stripeW - 1.5, 0, 1.5, 1024);
    } else {
      // White stripe borders
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(x, 0, 1.5, 1024);
      ctx.fillRect(x + stripeW - 1.5, 0, 1.5, 1024);
    }
  }

  // Cross-hatch reinforcement polyester grid weave
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 1;
  for (let p = 0; p < 1024; p += 16) {
    ctx.beginPath();
    ctx.moveTo(0, p);
    ctx.lineTo(1024, p);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, 1024);
    ctx.stroke();
  }

  // Glossy vinyl sheen
  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
  grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.14)');
  grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
  grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.15)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0.03)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  return texture;
}

export const RoomCurtain3DViewer = forwardRef(function RoomCurtain3DViewer({
  roomImage,
  hasUploaded = false,
  isAdjusting = false,
  studioColor = '#7e7065',
  curtainType = { id: 'leaf-embroidery', name: 'Rèm Hai Lớp Thêu Lá Cao Cấp' },
  showOriginal = false,
  isAnalyzing = false,
  aiDiagnosis = null,
  openRatio = 0.0, // controlled from parent
  activeAtmosphere = 'noon',
  setActiveAtmosphere,
  onConsultClick,
}, ref) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Mesh & Group refs
  const curtainAssemblyRef = useRef(null);
  const genericAssemblyRef = useRef(null);
  const customModelGroupRef = useRef(null);

  const leftCurtainMeshRef = useRef(null);
  const rightCurtainMeshRef = useRef(null);
  const leftSheerMeshRef = useRef(null);
  const rightSheerMeshRef = useRef(null);

  const customLeftDrapeRef = useRef(null);
  const customRightDrapeRef = useRef(null);
  const customSheerRef = useRef(null);
  const customRollerFabricRef = useRef(null);
  const customRollerBottomBarRef = useRef(null);
  const customRollerTopTubeRef = useRef(null);
  const customRollerWrapRef = useRef(null);
  const customRollerPullChainRef = useRef(null);
  const customTriptychRef = useRef({ fabrics: [], bottomBars: [], topTubes: [] });
  const customHoneycombFabricRef = useRef(null);
  const customRomanFoldingGroupRef = useRef(null);
  const customRomanBottomBarRef = useRef(null);
  const customRomanMeshesRef = useRef([]);
  const customHoneycombFoldingGroupRef = useRef(null);
  const customHoneycombBottomBarRef = useRef(null);
  const customHoneycombEdgesRef = useRef([]);
  const customPvcSheetRef = useRef(null);
  const customPvcWrapRef = useRef(null);
  const customPvcBottomRollerRef = useRef(null);
  const customPvcTopHemRef = useRef(null);
  const studioColorRef = useRef(studioColor);
  studioColorRef.current = studioColor;
  const balconyFrameGroupRef = useRef(null);
  const [threeReady, setThreeReady] = useState(false);

  // Room Wall & Custom Image Mapping Refs
  const wallMatRef = useRef(null);
  const wallMeshesRef = useRef([]);
  const roomWallMeshesRef = useRef([]);
  const loadedTextureRef = useRef(null);
  const currentImageUrlRef = useRef(null);
  const photoWallMeshRef = useRef(null);
  const leftWallRef = useRef(null);
  const rightWallRef = useRef(null);
  const topWallRef = useRef(null);
  const floorMeshRef = useRef(null);
  const ceilingMeshRef = useRef(null);
  const balconyMeshRef = useRef(null);
  const railingMeshRef = useRef(null);
  const railingTopBarRef = useRef(null);

  // Update wall texture dynamically without distortion & without room elements cutting off
  const applyWallTexture = useCallback(() => {
    const isUploaded = hasUploaded || (roomImage && (roomImage.startsWith('data:') || roomImage.startsWith('blob:') || !roomImage.includes('studio-room.png')));

    if (!isUploaded || !roomImage) {
      // Revert to clean showroom state
      if (photoWallMeshRef.current) photoWallMeshRef.current.visible = false;
      if (leftWallRef.current) leftWallRef.current.visible = true;
      if (rightWallRef.current) rightWallRef.current.visible = true;
      if (topWallRef.current) topWallRef.current.visible = true;
      if (floorMeshRef.current) floorMeshRef.current.visible = true;
      if (ceilingMeshRef.current) ceilingMeshRef.current.visible = true;
      if (skyMeshRef.current) skyMeshRef.current.visible = true;
      if (balconyMeshRef.current) balconyMeshRef.current.visible = true;
      if (railingMeshRef.current) railingMeshRef.current.visible = true;
      if (railingTopBarRef.current) railingTopBarRef.current.visible = true;
      if (balconyFrameGroupRef.current) {
        balconyFrameGroupRef.current.visible = (curtainType?.id !== 'roller-triptych' && curtainType?.id !== 'roller-quad' && curtainType?.id !== 'honeycomb' && curtainType?.id !== 'roman-linen' && !curtainType?.isPvc && curtainType?.id !== 'roller-linen' && !curtainType?.isRoller);
      }
      if (wallMeshesRef.current) {
        wallMeshesRef.current.forEach((mesh) => {
          if (mesh && mesh.isMesh && mesh !== photoWallMeshRef.current) {
            mesh.visible = true;
            if (wallMatRef.current) mesh.material = wallMatRef.current;
          }
        });
      }
      return;
    }

    const applyTextureToScene = (tex) => {
      const imgW = tex.image?.width || 1920;
      const imgH = tex.image?.height || 1080;
      const aspect = imgW / imgH; // Natural aspect ratio of uploaded photo

      // Container viewport dimensions
      const containerW = containerRef.current?.clientWidth || 1200;
      const containerH = containerRef.current?.clientHeight || 680;
      const canvasAspect = containerW / containerH;

      // Distance from camera (z=5.4) to wall plane (z=-0.22) is 5.62m
      const defaultDist = 5.62;
      // Frustum height visible to camera at default viewing distance (FOV = 38 deg)
      const baseViewH = 2 * defaultDist * Math.tan((38 / 2) * Math.PI / 180); // ~3.87m
      const baseViewW = baseViewH * canvasAspect; // ~6.8m - 7.5m

      // Clean natural fit matching camera viewport (no 3.6x over-magnification):
      let photoW, photoH;
      if (aspect >= canvasAspect) {
        // Photo is wider than viewport: fit height, natural width
        photoH = baseViewH;
        photoW = photoH * aspect;
        if (photoW > baseViewW * 1.35) {
          photoW = baseViewW * 1.35;
          photoH = photoW / aspect;
        }
      } else {
        // Photo is narrower / taller than viewport: fit width, natural height
        photoW = baseViewW;
        photoH = photoW / aspect;
        if (photoH > baseViewH * 1.25) {
          photoH = baseViewH * 1.25;
          photoW = photoH * aspect;
        }
      }

      basePhotoDimsRef.current = { w: photoW, h: photoH };
      const currentScale = photoScaleRef.current || 1.0;

      if (photoWallMeshRef.current) {
        photoWallMeshRef.current.geometry.dispose();
        photoWallMeshRef.current.geometry = new THREE.PlaneGeometry(photoW * currentScale, photoH * currentScale);
        photoWallMeshRef.current.position.set(0, 0.20, -0.22);
        photoWallMeshRef.current.material.map = tex;
        photoWallMeshRef.current.material.color.set('#ffffff');
        photoWallMeshRef.current.material.needsUpdate = true;
        photoWallMeshRef.current.visible = true;
      }

      // Hide showroom box walls, ceiling, floor, sky, and balcony so they never block/obstruct ("khuất") user's photo
      if (leftWallRef.current) leftWallRef.current.visible = false;
      if (rightWallRef.current) rightWallRef.current.visible = false;
      if (topWallRef.current) topWallRef.current.visible = false;
      if (floorMeshRef.current) floorMeshRef.current.visible = false;
      if (ceilingMeshRef.current) ceilingMeshRef.current.visible = false;
      if (skyMeshRef.current) skyMeshRef.current.visible = false;
      if (balconyMeshRef.current) balconyMeshRef.current.visible = false;
      if (railingMeshRef.current) railingMeshRef.current.visible = false;
      if (railingTopBarRef.current) railingTopBarRef.current.visible = false;
      if (balconyFrameGroupRef.current) balconyFrameGroupRef.current.visible = false;
      if (wallMeshesRef.current) {
        wallMeshesRef.current.forEach((mesh) => {
          if (mesh && mesh.isMesh && mesh !== photoWallMeshRef.current) {
            mesh.visible = false;
          }
        });
      }
    };

    if (currentImageUrlRef.current === roomImage && loadedTextureRef.current) {
      applyTextureToScene(loadedTextureRef.current);
    } else {
      const loader = new THREE.TextureLoader();
      loader.load(
        roomImage,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.needsUpdate = true;

          if (loadedTextureRef.current && loadedTextureRef.current !== tex) {
            loadedTextureRef.current.dispose();
          }
          loadedTextureRef.current = tex;
          currentImageUrlRef.current = roomImage;

          // When uploading/changing photo, reset camera distance to standard 5.4m and angle
          zoomTargetRef.current = 5.4;
          rotTargetRef.current = { x: 0, y: 0 };
          photoScaleRef.current = 1.0;
          setPhotoScale(1.0);
          setCurtainOffset({ x: 0, y: 0 });
          setCurtainScale({ w: 1, h: 1 });

          applyTextureToScene(tex);
        },
        undefined,
        (err) => {
          console.error('Lỗi nạp ảnh phòng:', err);
        }
      );
    }
  }, [roomImage, hasUploaded]);

  useEffect(() => {
    applyWallTexture();
  }, [applyWallTexture]);

  // Lighting & Environment refs
  const sunLightRef = useRef(null);
  const ambientLightRef = useRef(null);
  const coveLightRef = useRef(null);
  const skyMeshRef = useRef(null);
  const rainPointsRef = useRef(null);

  // Position & scale calibration
  const [curtainOffset, setCurtainOffset] = useState({ x: 0, y: 0 });
  const [curtainScale, setCurtainScale] = useState({ w: 1, h: 1 });
  const [photoScale, setPhotoScale] = useState(1.0);
  const photoScaleRef = useRef(1.0);
  const basePhotoDimsRef = useRef({ w: 6.8, h: 3.87 });

  // Interaction tracking (Continuous 360-degree rotation & distance)
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const initialPinchDistRef = useRef(null);
  const rotTargetRef = useRef({ x: 0, y: 0 });
  const rotCurrentRef = useRef({ x: 0, y: 0 });
  // Camera pulled back further for expansive depth (default: 5.4 as requested)
  const zoomTargetRef = useRef(5.4);
  const zoomCurrentRef = useRef(5.4);

  // Reset 3D camera
  const handleResetCamera = () => {
    rotTargetRef.current = { x: 0, y: 0 };
    zoomTargetRef.current = 5.4;
  };

  // 3D Camera Zoom In & Deep Zoom Out Controls
  const zoomIn = (delta = 0.65) => {
    zoomTargetRef.current = Math.max(2.2, Math.round((zoomTargetRef.current - delta) * 100) / 100);
  };

  const zoomOut = (delta = 0.95) => {
    // Increased maximum zoom out distance to 15.0m for expansive wide-angle view!
    zoomTargetRef.current = Math.min(15.0, Math.round((zoomTargetRef.current + delta) * 100) / 100);
  };

  const rotate = (angle = Math.PI / 8) => {
    rotTargetRef.current.y += angle;
  };

  const moveCurtain = (dx, dy) => {
    setCurtainOffset((prev) => ({
      x: Math.round((prev.x + dx) * 100) / 100,
      y: Math.round((prev.y + dy) * 100) / 100,
    }));
  };

  const scaleCurtain = (dw, dh) => {
    setCurtainScale((prev) => ({
      w: Math.max(0.15, Math.min(3.8, Math.round((prev.w + dw) * 100) / 100)),
      h: Math.max(0.15, Math.min(3.8, Math.round((prev.h + dh) * 100) / 100)),
    }));
  };

  const setCurtainDimensions = (w, h) => {
    setCurtainScale({
      w: Math.max(0.15, Math.min(3.8, Math.round(w * 100) / 100)),
      h: Math.max(0.15, Math.min(3.8, Math.round(h * 100) / 100)),
    });
  };

  const setCurtainPosition = (x, y) => {
    setCurtainOffset({
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100,
    });
  };

  const scalePhoto = (delta) => {
    const next = Math.max(0.4, Math.min(2.5, Math.round(((photoScaleRef.current || 1.0) + delta) * 100) / 100));
    photoScaleRef.current = next;
    setPhotoScale(next);
    if (photoWallMeshRef.current && loadedTextureRef.current && basePhotoDimsRef.current) {
      photoWallMeshRef.current.geometry.dispose();
      photoWallMeshRef.current.geometry = new THREE.PlaneGeometry(
        basePhotoDimsRef.current.w * next,
        basePhotoDimsRef.current.h * next
      );
    }
  };

  const resetPhotoScale = () => {
    photoScaleRef.current = 1.0;
    setPhotoScale(1.0);
    if (photoWallMeshRef.current && loadedTextureRef.current && basePhotoDimsRef.current) {
      photoWallMeshRef.current.geometry.dispose();
      photoWallMeshRef.current.geometry = new THREE.PlaneGeometry(
        basePhotoDimsRef.current.w,
        basePhotoDimsRef.current.h
      );
    }
  };

  const resetCurtainTransform = () => {
    setCurtainOffset({ x: 0, y: 0 });
    setCurtainScale({ w: 1, h: 1 });
    resetPhotoScale();
    handleResetCamera();
  };

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    resetCamera: handleResetCamera,
    zoomIn,
    zoomOut,
    rotate,
    moveCurtain,
    scaleCurtain,
    setCurtainPosition,
    setCurtainDimensions,
    resetCurtainTransform,
    scalePhoto,
    resetPhotoScale,
  }));

  // Update curtain assembly transform and overhead lighting when offset or scale changes
  useEffect(() => {
    if (curtainAssemblyRef.current) {
      curtainAssemblyRef.current.position.set(curtainOffset.x, curtainOffset.y, 0);
      curtainAssemblyRef.current.scale.set(curtainScale.w, curtainScale.h, 1);
    }
    if (customModelGroupRef.current) {
      customModelGroupRef.current.position.set(curtainOffset.x, curtainOffset.y, 0);
      customModelGroupRef.current.scale.set(curtainScale.w, curtainScale.h, 1);
    }
    if (balconyFrameGroupRef.current) {
      balconyFrameGroupRef.current.position.set(curtainOffset.x, curtainOffset.y, 0);
      balconyFrameGroupRef.current.scale.set(curtainScale.w, curtainScale.h, 1);
    }
    if (coveLightRef.current) {
      // Overhead LED spotlight moves along with the curtain in all positions!
      coveLightRef.current.position.set(curtainOffset.x, 1.30 + curtainOffset.y, 0.25);
    }
  }, [curtainOffset, curtainScale]);

  /**
   * Applies openRatio to both GLB Model and Procedural Curtain
   * ratio = 0.0: 100% FULL CLOSURE with center overlap (completely blocks light)
   * ratio = 0.85: Bunched gracefully to sides, revealing center sheer
   */
  const applyCurtainOpenRatio = (ratio) => {
    // 000. For Roman Shade (Rèm Roman Xếp Lớp Vải Linen Thô)
        // 000. For Outdoor Weatherproof PVC Tarpaulin Rolling (Rèm Bạt Nhựa PVC Ngoài Trời)
        // 00. For Luxury Textured Linen Roller Blind (Rèm Cuốn Vải Dệt Linen)
    if (curtainType?.id === 'roller-linen' && customRollerFabricRef.current) {
      if (genericAssemblyRef.current) genericAssemblyRef.current.visible = false;
      const topY = 1.22;
      const bottomY = -0.43;
      const totalH = topY - bottomY; // 1.65
      const unrollProgress = Math.max(0.015, 1.0 - ratio * 0.985);

      customRollerFabricRef.current.scale.y = unrollProgress;
      customRollerFabricRef.current.visible = true;

      if (customRollerBottomBarRef.current) {
        customRollerBottomBarRef.current.position.y = topY - totalH * unrollProgress;
        customRollerBottomBarRef.current.visible = true;
      }
      if (customRollerTopTubeRef.current) {
        customRollerTopTubeRef.current.rotation.x = -ratio * Math.PI * 10.0;
      }
      if (customRollerWrapRef.current) {
        customRollerWrapRef.current.rotation.x = -ratio * Math.PI * 10.0;
        const rollScale = 1.0 + ratio * 0.40;
        customRollerWrapRef.current.scale.set(1, rollScale, rollScale);
      }
      return;
    }
    if (curtainType?.isPvc && customPvcSheetRef.current) {
      if (genericAssemblyRef.current) genericAssemblyRef.current.visible = false;
      const topY = 1.25;
      const deployedY = -0.94;
      const unrollProgress = Math.max(0.025, 1.0 - ratio * 0.975);

      customPvcSheetRef.current.scale.y = unrollProgress;
      customPvcSheetRef.current.visible = true;

      if (customPvcBottomRollerRef.current) {
        customPvcBottomRollerRef.current.position.y = topY - (topY - deployedY) * unrollProgress;
        customPvcBottomRollerRef.current.rotation.x = ratio * Math.PI * 12.0;
        customPvcBottomRollerRef.current.visible = true;
      }
      return;
    }
    if (curtainType?.id === 'roman-linen' && customRomanFoldingGroupRef.current) {
      if (genericAssemblyRef.current) genericAssemblyRef.current.visible = false;
      const fullH = 1.65;
      const topY = 1.20;
      // ratio = 0.0: Hạ rèm hết cỡ phẳng phiu che kín cửa (0% mở)
      // ratio = 1.0: Xếp lớp 5 tầng rèm Roman dồn lên sát hộp máng (100% mở)
      const unrollProgress = Math.max(0.065, 1.0 - ratio * 0.935);

      customRomanFoldingGroupRef.current.scale.y = unrollProgress;
      customRomanFoldingGroupRef.current.visible = true;

      if (customRomanBottomBarRef.current) {
        customRomanBottomBarRef.current.position.y = topY - fullH * unrollProgress;
        customRomanBottomBarRef.current.visible = true;
      }
      return;
    }

    // 00. For Honeycomb / Cellular Blind (Rèm Tổ Ong 3D Xếp Gấp Accordion)
    if (curtainType?.id === 'honeycomb' && customHoneycombFoldingGroupRef.current) {
      if (genericAssemblyRef.current) genericAssemblyRef.current.visible = false;
      const fullH = 1.65;
      const topY = 1.20;
      // ratio = 0.0: Hạ rèm hết cỡ che kín cửa (0% mở)
      // ratio = 1.0: Xếp nén toàn bộ nan tổ ong lên hộp máng nhôm (100% mở)
      const unrollProgress = Math.max(0.025, 1.0 - ratio * 0.975);

      customHoneycombFoldingGroupRef.current.scale.y = unrollProgress;
      customHoneycombFoldingGroupRef.current.visible = true;

      if (customHoneycombBottomBarRef.current) {
        customHoneycombBottomBarRef.current.position.y = topY - fullH * unrollProgress;
        customHoneycombBottomBarRef.current.visible = true;
      }
      return;
    }

    // 0A. For 3-Window Triptych Roller Blinds (Bộ 3 Rèm Cửa Sổ In Tranh)
    if (customTriptychRef.current && customTriptychRef.current.fabrics.length > 0) {
      if (genericAssemblyRef.current) genericAssemblyRef.current.visible = false;
      const unrollProgress = Math.max(0.015, 1.0 - ratio * 0.985);
      const fullFabricH = 1.65; // Kích thước rèm cửa sổ gọn gàng 1.65m
      const topY = 1.20;
      const currentH = fullFabricH * unrollProgress;

      customTriptychRef.current.fabrics.forEach((f) => {
        f.scale.y = unrollProgress;
        f.position.y = topY - currentH * 0.5;
        f.visible = true;
      });

      customTriptychRef.current.bottomBars.forEach((b) => {
        b.position.y = topY - currentH;
        b.visible = true;
      });

      customTriptychRef.current.topTubes.forEach((t) => {
        t.rotation.x = -ratio * Math.PI * 8.0;
      });
      return;
    }

    // 0. For Single Roller Blind (Rèm Cuốn In Tranh Nghệ Thuật)
    if (customPvcBottomRollerRef.current && customPvcSheetRef.current) {
        if (activeAtmosphere === 'rain') {
          const windForce = Math.sin(t * 1.8) * 0.035 + Math.cos(t * 3.2) * 0.015;
          customPvcSheetRef.current.rotation.x = windForce * 0.25;
          customPvcBottomRollerRef.current.rotation.x = windForce * 0.25;
          customPvcBottomRollerRef.current.position.z = 0.05 + windForce * 0.08;
        } else {
          customPvcSheetRef.current.rotation.x *= 0.92;
          customPvcBottomRollerRef.current.rotation.x *= 0.92;
          customPvcBottomRollerRef.current.position.z += (0.05 - customPvcBottomRollerRef.current.position.z) * 0.1;
        }
      }
        if (customRollerFabricRef.current) {
      if (genericAssemblyRef.current) genericAssemblyRef.current.visible = false;
      // ratio = 0.0: Hạ rèm hết cỡ cản sáng (0% cuộn) - Phủ bì 100% full cửa sổ
      // ratio = 1.0: Cuộn tròn 100% quanh thanh cố định trên đỉnh
      const unrollProgress = Math.max(0.015, 1.0 - ratio * 0.985);
      const fullFabricH = 2.50; // Chiều dài rèm phủ bì tràn mép dưới cửa sổ
      const currentH = fullFabricH * unrollProgress;
      customRollerFabricRef.current.scale.y = unrollProgress;
      customRollerFabricRef.current.position.y = 1.26 - currentH * 0.5;
      customRollerFabricRef.current.visible = true;

      if (customRollerBottomBarRef.current) {
        customRollerBottomBarRef.current.position.y = 1.26 - currentH;
        customRollerBottomBarRef.current.visible = true;
      }
      if (customRollerTopTubeRef.current) {
        // Visual rotation of round roller tube as fabric rolls
        customRollerTopTubeRef.current.rotation.x = -ratio * Math.PI * 8.0;
      }
      return;
    }

    // 1. For Custom GLB 3D Model (Curtain Leaf Embroidery)
    if (customLeftDrapeRef.current && customRightDrapeRef.current) {
      // At ratio = 0: scaleX = 1.04 (full half-window with center overlap, 100% closed)
      // At ratio = 1.0: scaleX = 0.16 (100% open, bunched gracefully at side edges)
      const scaleX = Math.max(0.16, 1.04 - ratio * 0.88);
      customLeftDrapeRef.current.scale.x = scaleX;
      customRightDrapeRef.current.scale.x = scaleX;

      // At ratio = 0: left drape center at -0.835m -> right edge reaches +0.049m (center overlap)
      // At ratio = 1.0: left drape center moves outward to -1.595m
      const leftCenterX = -0.835 - ratio * 0.76;
      const rightCenterX = 0.835 + ratio * 0.76;

      customLeftDrapeRef.current.position.x = leftCenterX;
      customRightDrapeRef.current.position.x = rightCenterX;

      customLeftDrapeRef.current.visible = true;
      customRightDrapeRef.current.visible = true;
    }

    // 2. For Procedural Curtain (fallback)
    const curtainWidth = 1.7;
    const curtainHeight = 2.45;
    const waves = curtainType.id === 'sheer' ? 8 : 6;

    if (leftCurtainMeshRef.current) {
      leftCurtainMeshRef.current.geometry.dispose();
      leftCurtainMeshRef.current.geometry = createCurtainGeometry(curtainWidth, curtainHeight, waves, ratio, true);
    }
    if (rightCurtainMeshRef.current) {
      rightCurtainMeshRef.current.geometry.dispose();
      rightCurtainMeshRef.current.geometry = createCurtainGeometry(curtainWidth, curtainHeight, waves, ratio, false);
    }
    if (leftSheerMeshRef.current) {
      leftSheerMeshRef.current.geometry.dispose();
      leftSheerMeshRef.current.geometry = createCurtainGeometry(curtainWidth, curtainHeight, 10, ratio * 0.35, true);
    }
    if (rightSheerMeshRef.current) {
      rightSheerMeshRef.current.geometry.dispose();
      rightSheerMeshRef.current.geometry = createCurtainGeometry(curtainWidth, curtainHeight, 10, ratio * 0.35, false);
    }
  };

  // Dedicated 3D GLB Model Loader
  useEffect(() => {
    let isCancelled = false;
    if (!sceneRef.current || !customModelGroupRef.current || !genericAssemblyRef.current) return;

    if (balconyFrameGroupRef.current) {
      balconyFrameGroupRef.current.visible = !hasUploaded && (curtainType?.id !== 'roller-triptych' && curtainType?.id !== 'roller-quad' && curtainType?.id !== 'honeycomb' && curtainType?.id !== 'roman-linen' && !curtainType?.isPvc && curtainType?.id !== 'roller-linen' && !curtainType?.isRoller);
    }

    if (curtainType?.model3dUrl) {
      genericAssemblyRef.current.visible = false;
      customModelGroupRef.current.visible = true;

      while (customModelGroupRef.current.children.length > 0) {
        customModelGroupRef.current.remove(customModelGroupRef.current.children[0]);
      }

      customLeftDrapeRef.current = null;
      customRightDrapeRef.current = null;
      customSheerRef.current = null;
      customRollerFabricRef.current = null;
      customRollerBottomBarRef.current = null;
      customRollerTopTubeRef.current = null;
      customRollerWrapRef.current = null;
      customRollerPullChainRef.current = null;
      customTriptychRef.current = { fabrics: [], bottomBars: [], topTubes: [] };
      customHoneycombFabricRef.current = null;
      customRomanFoldingGroupRef.current = null;
      customRomanBottomBarRef.current = null;
      customRomanMeshesRef.current = [];
      customHoneycombFoldingGroupRef.current = null;
      customHoneycombBottomBarRef.current = null;
      customHoneycombEdgesRef.current = [];
      customPvcSheetRef.current = null;
      customPvcWrapRef.current = null;
      customPvcBottomRollerRef.current = null;
      customPvcTopHemRef.current = null;

      const loader = new GLTFLoader();
      loader.load(
        curtainType.model3dUrl,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(0, 0, 0);

          const glbWalls = [];

          model.traverse((child) => {
            // Outdoor PVC Tarpaulin: Always remove ceiling and patio steps as requested!
            if (
              child.name === 'PVCEaveCeiling' ||
              child.name === 'PVCPatioStep' ||
              child.name === 'PVCPatioFloor'
            ) {
              child.visible = false;
              return;
            }

            // PVC Structural elements (pillars, header wall, window glass)
            if (
              child.name === 'PVCHeaderWall' ||
              child.name === 'PVCLeftPillar' ||
              child.name === 'PVCRightPillar' ||
              child.name === 'PVCWindowGlass'
            ) {
              glbWalls.push(child);
              if (hasUploaded) {
                child.visible = false;
              }
            }

            if (child.isMesh && child.name && child.name.toLowerCase().includes('wall')) {
              child.receiveShadow = true;
              child.castShadow = false;
              if (wallMatRef.current) child.material = wallMatRef.current;
              glbWalls.push(child);
            }
            if (child.name === 'RomanFoldingGroup') {
              customRomanFoldingGroupRef.current = child;
            } else if (child.name === 'RomanBottomBar') {
              customRomanBottomBarRef.current = child;
            } else if (child.name === 'HoneycombFoldingGroup') {
              customHoneycombFoldingGroupRef.current = child;
              customHoneycombFoldingGroupRef.current = child;
            } else if (child.name === 'PVCBottomRoller') {
              customPvcBottomRollerRef.current = child;
            } else if (child.name === 'PVCTarpaulinSheet' || child.name === 'PVCWrapMesh') {
              if (child.name === 'PVCTarpaulinSheet') customPvcSheetRef.current = child;
              if (child.name === 'PVCWrapMesh') customPvcWrapRef.current = child;
              child.material = new THREE.MeshStandardMaterial({
                map: createPvcCanvasTexture(studioColorRef.current),
                roughness: 0.22,
                metalness: 0.02,
                side: THREE.DoubleSide
              });
            } else if (child.name === 'PVCTopHem') {
              customPvcTopHemRef.current = child;
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(studioColorRef.current),
                roughness: 0.38,
                metalness: 0.08,
                side: THREE.DoubleSide
              }); } else if (child.name === 'HoneycombBottomBar') {
              customHoneycombBottomBarRef.current = child;
            }
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.material.side = THREE.DoubleSide; // Full 360 visibility!

              if (child.name === 'OuterDrapeLeft') {
                customLeftDrapeRef.current = child;
                child.material = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(studioColor),
                  roughness: 0.82,
                  metalness: 0.03,
                  side: THREE.DoubleSide
                });
              } else if (child.name === 'OuterDrapeRight') {
                customRightDrapeRef.current = child;
                child.material = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(studioColor),
                  roughness: 0.82,
                  metalness: 0.03,
                  side: THREE.DoubleSide
                });
              } else if (child.name === 'RollerFabricPanel') {
                customRollerFabricRef.current = child;
                const mat = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(studioColorRef.current),
                  roughness: 0.85,
                  metalness: 0.02,
                  side: THREE.DoubleSide
                });
                child.material = mat;
                const textureLoader = new THREE.TextureLoader();
                const texUrl = curtainType.rollerLinenTextureUrl || curtainType.rollerTextureUrl || '/assets/curtains/roller-art-texture.jpg';
                textureLoader.load(texUrl, (tex) => {
                  tex.colorSpace = THREE.SRGBColorSpace;
                  if (curtainType?.id === 'roller-linen') {
                    tex.wrapS = THREE.RepeatWrapping;
                    tex.wrapT = THREE.RepeatWrapping;
                    tex.repeat.set(4, 3);
                  }
                  mat.map = tex;
                  mat.needsUpdate = true;
                });
              } else if (child.name === 'RollerBottomBar') {
                customRollerBottomBarRef.current = child;
              } else if (child.name === 'RollerTubeWrapMesh') {
              customRollerWrapRef.current = child;
              const mat = new THREE.MeshStandardMaterial({
                color: new THREE.Color(studioColorRef.current),
                roughness: 0.88,
                metalness: 0.02,
                side: THREE.DoubleSide
              });
              child.material = mat;
              const textureLoader = new THREE.TextureLoader();
              textureLoader.load('/assets/curtains/roller-linen-texture.jpg', (tex) => {
                tex.colorSpace = THREE.SRGBColorSpace;
                tex.wrapS = THREE.RepeatWrapping;
                tex.wrapT = THREE.RepeatWrapping;
                tex.repeat.set(4, 1);
                mat.map = tex;
                mat.needsUpdate = true;
              });
            } else if (child.name === 'RollerPullChain') {
              customRollerPullChainRef.current = child;
            } else if (child.name === 'RollerTopTube') {
                customRollerTopTubeRef.current = child;
              } else if (child.name.startsWith('RollerFabric_')) {
                const panelId = child.name.split('_')[1];
                let texUrl = '/assets/curtains/triptych-left-texture.jpg';
                if (panelId === 'Center') texUrl = '/assets/curtains/triptych-center-texture.jpg';
                else if (panelId === 'Right') texUrl = '/assets/curtains/triptych-right-texture.jpg';
                else if (panelId === 'P1') texUrl = '/assets/curtains/quad-p1-texture.jpg';
                else if (panelId === 'P2') texUrl = '/assets/curtains/quad-p2-texture.jpg';
                else if (panelId === 'P3') texUrl = '/assets/curtains/quad-p3-texture.jpg';
                else if (panelId === 'P4') texUrl = '/assets/curtains/quad-p4-texture.jpg';

                const mat = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(studioColorRef.current),
                  roughness: 0.85,
                  metalness: 0.02,
                  side: THREE.DoubleSide
                });
                child.material = mat;
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(texUrl, (tex) => {
                  tex.colorSpace = THREE.SRGBColorSpace;
                  mat.map = tex;
                  mat.needsUpdate = true;
                });
                customTriptychRef.current.fabrics.push(child);
              } else if (child.name.startsWith('RollerBottomBar_')) {
                customTriptychRef.current.bottomBars.push(child);
              } else if (child.name.startsWith('RollerTopTube_')) {
                customTriptychRef.current.topTubes.push(child);
              } else if (child.name === 'HoneycombFoldingGroup') {
                customHoneycombFoldingGroupRef.current = child;
              } else if (child.name.startsWith('RomanFace_') || child.name.startsWith('RomanBatten_') || child.name.startsWith('RomanFlap_')) {
                const mat = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(studioColor),
                  roughness: 0.92,
                  metalness: 0.0,
                  side: THREE.DoubleSide
                });
                child.material = mat;
                const textureLoader = new THREE.TextureLoader();
                const texUrl = curtainType.romanTextureUrl || '/assets/curtains/roman-linen-texture.jpg';
                textureLoader.load(texUrl, (tex) => {
                  tex.colorSpace = THREE.SRGBColorSpace;
                  tex.wrapS = THREE.RepeatWrapping;
                  tex.wrapT = THREE.RepeatWrapping;
                  mat.map = tex;
                  mat.needsUpdate = true;
                });
                customRomanMeshesRef.current.push(child);
              } else if (child.name === 'HoneycombFabricPanel' || child.name === 'HoneycombBackSheet' || child.name.startsWith('HoneycombCells')) {
                if (child.name === 'HoneycombFabricPanel') customHoneycombFabricRef.current = child;
                const mat = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(studioColor),
                  roughness: 0.82,
                  metalness: 0.02,
                  side: THREE.DoubleSide
                });
                child.material = mat;
                const textureLoader = new THREE.TextureLoader();
                const texUrl = curtainType.honeycombTextureUrl || '/assets/curtains/honeycomb-texture.jpg';
                textureLoader.load(texUrl, (tex) => {
                  tex.colorSpace = THREE.SRGBColorSpace;
                  tex.wrapS = THREE.RepeatWrapping;
                  tex.wrapT = THREE.RepeatWrapping;
                  mat.map = tex;
                  mat.needsUpdate = true;
                });
                customHoneycombEdgesRef.current.push(child);
              } else if (child.name.startsWith('HoneycombInterior') || child.name.startsWith('HoneycombCells')) {
                child.visible = false;
              } else if (child.name.startsWith('HoneycombRims')) {
                // Crisp white/cream hexagonal end rim for photorealistic contrast
                child.material = new THREE.MeshStandardMaterial({
                  color: '#faf7f0',
                  roughness: 0.55,
                  metalness: 0.05,
                  side: THREE.DoubleSide
                });
              } else if (child.name === 'HoneycombBottomBar') {
                customHoneycombBottomBarRef.current = child;
              } else if (child.name === 'InnerEmbroideredLeafSheer') {
                customSheerRef.current = child;
                const textureLoader = new THREE.TextureLoader();
                const texUrl = curtainType.sheerTextureUrl || '/assets/curtains/leaf-sheer-texture.svg';
                textureLoader.load(texUrl, (tex) => {
                  tex.colorSpace = THREE.SRGBColorSpace;
                  tex.wrapS = THREE.RepeatWrapping;
                  tex.wrapT = THREE.ClampToEdgeWrapping;
                  if (curtainType?.id === 'sfold-luxury') {
                    tex.repeat.set(4, 1);
                  } else {
                    tex.repeat.set(1, 1);
                  }
                  child.material = new THREE.MeshStandardMaterial({
                    map: tex,
                    transparent: true,
                    opacity: curtainType?.id === 'sfold-luxury' ? 0.85 : 0.94,
                    roughness: 0.55,
                    side: THREE.DoubleSide
                  });
                  child.material.needsUpdate = true;
                });
              }
            }
          });

          if (isCancelled) return;
          while (customModelGroupRef.current.children.length > 0) {
            customModelGroupRef.current.remove(customModelGroupRef.current.children[0]);
          }
          customModelGroupRef.current.add(model);
          customModelGroupRef.current.position.set(curtainOffset.x, curtainOffset.y, 0);
          customModelGroupRef.current.scale.set(curtainScale.w, curtainScale.h, 1);

          // Update active wall meshes list with GLB wall pieces and re-project photo
          wallMeshesRef.current = [...roomWallMeshesRef.current, ...glbWalls];
          applyWallTexture();

          // Apply current studioColor immediately to newly loaded model!
          const initTargetColor = new THREE.Color(studioColorRef.current);
          if (customLeftDrapeRef.current?.material?.color) customLeftDrapeRef.current.material.color.set(initTargetColor);
          if (customRightDrapeRef.current?.material?.color) customRightDrapeRef.current.material.color.set(initTargetColor);
          if (customRollerFabricRef.current?.material?.color) customRollerFabricRef.current.material.color.set(initTargetColor);
          if (customRollerWrapRef.current?.material?.color) customRollerWrapRef.current.material.color.set(initTargetColor);
          customTriptychRef.current?.fabrics?.forEach((f) => { if (f?.material?.color) f.material.color.set(initTargetColor); });
          customHoneycombEdgesRef.current.forEach((e) => { if (e?.material?.color) e.material.color.set(initTargetColor); });
          if (customHoneycombFabricRef.current?.material?.color) customHoneycombFabricRef.current.material.color.set(initTargetColor);
          customRomanMeshesRef.current.forEach((m) => { if (m?.material?.color) m.material.color.set(initTargetColor); });
          if (customPvcSheetRef.current?.material) {
            customPvcSheetRef.current.material.map = createPvcCanvasTexture(studioColorRef.current);
            customPvcSheetRef.current.material.needsUpdate = true;
          }
          if (customPvcWrapRef.current?.material) {
            customPvcWrapRef.current.material.map = createPvcCanvasTexture(studioColorRef.current);
            customPvcWrapRef.current.material.needsUpdate = true;
          }
          if (customPvcTopHemRef.current?.material?.color) customPvcTopHemRef.current.material.color.set(initTargetColor);

          // Apply current openRatio immediately when loaded so it closes or opens properly!
          applyCurtainOpenRatio(openRatio);
        },
        undefined,
        (err) => {
          console.warn('Falling back to procedural engine:', err);
          genericAssemblyRef.current.visible = true;
          customModelGroupRef.current.visible = false;
        }
      );
    } else {
      genericAssemblyRef.current.visible = true;
      customModelGroupRef.current.visible = false;
    }

    return () => {
      isCancelled = true;
    };
  }, [curtainType?.model3dUrl, curtainType?.id, threeReady]);

  // Update openRatio
  useEffect(() => {
    applyCurtainOpenRatio(openRatio);
  }, [openRatio, curtainType.id]);

  // Update Fabric Color
  useEffect(() => {
    const targetColor = new THREE.Color(studioColor);

    if (customLeftDrapeRef.current?.material?.color) {
      customLeftDrapeRef.current.material.color.set(targetColor);
      customLeftDrapeRef.current.material.needsUpdate = true;
    }
    if (customRightDrapeRef.current?.material?.color) {
      customRightDrapeRef.current.material.color.set(targetColor);
      customRightDrapeRef.current.material.needsUpdate = true;
    }
    if (customHoneycombFabricRef.current?.material?.color) {
      customHoneycombFabricRef.current.material.color.set(targetColor);
      customHoneycombFabricRef.current.material.needsUpdate = true;
    }
    if (customHoneycombEdgesRef.current && customHoneycombEdgesRef.current.length > 0) {
      customHoneycombEdgesRef.current.forEach((edge) => {
        if (edge?.material?.color) {
          edge.material.color.set(targetColor);
          edge.material.needsUpdate = true;
        }
      });
    }
    if (customRomanMeshesRef.current && customRomanMeshesRef.current.length > 0) {
      customRomanMeshesRef.current.forEach((mesh) => {
        if (mesh?.material?.color) {
          mesh.material.color.set(targetColor);
          mesh.material.needsUpdate = true;
        }
      });
    }
    if (customPvcSheetRef.current?.material) {
      customPvcSheetRef.current.material.map = createPvcCanvasTexture(studioColor);
      customPvcSheetRef.current.material.needsUpdate = true;
    }
    if (customPvcWrapRef.current?.material) {
      customPvcWrapRef.current.material.map = createPvcCanvasTexture(studioColor);
      customPvcWrapRef.current.material.needsUpdate = true;
    }
    if (customPvcTopHemRef.current?.material?.color) {
      customPvcTopHemRef.current.material.color.set(targetColor);
      customPvcTopHemRef.current.material.needsUpdate = true;
    }
    if (customRollerWrapRef.current?.material?.color) {
      customRollerWrapRef.current.material.color.set(targetColor);
      customRollerWrapRef.current.material.needsUpdate = true;
    }
    if (customRollerFabricRef.current?.material?.color) {
      customRollerFabricRef.current.material.color.set(targetColor);
      customRollerFabricRef.current.material.needsUpdate = true;
    }
    if (customTriptychRef.current && customTriptychRef.current.fabrics.length > 0) {
      customTriptychRef.current.fabrics.forEach((f) => {
        if (f?.material?.color) {
          f.material.color.set(targetColor);
          f.material.needsUpdate = true;
        }
      });
    }

    if (leftCurtainMeshRef.current && rightCurtainMeshRef.current) {
      let roughness = 0.85;
      let metalness = 0.02;
      let opacity = 1.0;
      let transparent = false;

      if (curtainType.id === 'sheer') {
        roughness = 0.45;
        opacity = 0.45;
        transparent = true;
      } else if (curtainType.id === 'velvet') {
        roughness = 0.95;
        metalness = 0.08;
      } else if (curtainType.id === 'linen') {
        roughness = 0.9;
        metalness = 0.0;
      }

      [leftCurtainMeshRef.current, rightCurtainMeshRef.current].forEach((mesh) => {
        if (mesh?.material?.color) mesh.material.color.set(targetColor);
        mesh.material.roughness = roughness;
        mesh.material.metalness = metalness;
        mesh.material.opacity = opacity;
        mesh.material.transparent = transparent;
        mesh.material.needsUpdate = true;
      });

      const isDouble = curtainType.id === 'double-layer' || curtainType.id === 'leaf-embroidery';
      if (leftSheerMeshRef.current && rightSheerMeshRef.current) {
        leftSheerMeshRef.current.visible = isDouble;
        rightSheerMeshRef.current.visible = isDouble;
      }
    }
  }, [studioColor, curtainType]);

  // Update Time of Day / Weather Atmosphere
  useEffect(() => {
    const config = ATMOSPHERE_MODES[activeAtmosphere] || ATMOSPHERE_MODES.noon;

    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(config.roomTone);
    }

    if (sunLightRef.current) {
      sunLightRef.current.color.set(config.sunColor);
      sunLightRef.current.intensity = config.sunIntensity;
      sunLightRef.current.position.set(...config.sunPos);
    }

    if (ambientLightRef.current) {
      ambientLightRef.current.color.set(config.ambColor);
      ambientLightRef.current.intensity = config.ambIntensity;
    }

    if (coveLightRef.current) {
      coveLightRef.current.color.set(config.coveColor);
      coveLightRef.current.intensity = config.coveIntensity;
    }

    if (skyMeshRef.current) {
      if (skyMeshRef.current.material.map) {
        skyMeshRef.current.material.map.dispose();
      }
      skyMeshRef.current.material.map = createSkyCanvasTexture(config.skyTop, config.skyBottom);
      skyMeshRef.current.material.needsUpdate = true;
    }

    if (rainPointsRef.current) {
      rainPointsRef.current.visible = activeAtmosphere === 'rain';
    }
  }, [activeAtmosphere]);

  // Initialize Three.js WebGL Scene (True 3D Architectural Room & 360° Orbit)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 680;

    // 1. Scene
    const scene = new THREE.Scene();
    const initAtmosphere = ATMOSPHERE_MODES[activeAtmosphere] || ATMOSPHERE_MODES.noon;
    scene.background = new THREE.Color(initAtmosphere.roomTone);
    sceneRef.current = scene;

    // 2. Camera (Pulled back for grand room depth: 5.4)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 70);
    camera.position.set(0, 0.2, zoomTargetRef.current);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(initAtmosphere.ambColor, initAtmosphere.ambIntensity);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const sunLight = new THREE.DirectionalLight(initAtmosphere.sunColor, initAtmosphere.sunIntensity);
    sunLight.position.set(...initAtmosphere.sunPos);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0003;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 16;
    sunLight.shadow.camera.left = -4;
    sunLight.shadow.camera.right = 4;
    sunLight.shadow.camera.top = 4;
    sunLight.shadow.camera.bottom = -4;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Cove LED strip light recessed in ceiling
    const coveLight = new THREE.PointLight(initAtmosphere.coveColor, initAtmosphere.coveIntensity, 12, 1.8);
    coveLight.position.set(0, 1.30, 0.25);
    scene.add(coveLight);
    coveLightRef.current = coveLight;

    const fillLight = new THREE.PointLight('#fff4e8', 0.65, 8, 2.0);
    fillLight.position.set(-1.8, -0.2, 2.2);
    scene.add(fillLight);

    // ========================================================
    // 5. TRUE 3D ARCHITECTURAL ROOM (360° Double-Sided Mesh)
    // ========================================================
    const roomGroup = new THREE.Group();
    roomGroup.name = 'ArchitecturalRoom';
    scene.add(roomGroup);

    // 5A. Interior Wood Parquet Floor (Sàn gỗ sồi cao cấp)
    const floorGeo = new THREE.PlaneGeometry(24, 16);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#baa68f',
      roughness: 0.38,
      metalness: 0.08,
      side: THREE.DoubleSide
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -1.25, 0);
    floorMesh.receiveShadow = true;
    roomGroup.add(floorMesh);
    floorMeshRef.current = floorMesh;

    // 5B. Plaster Ceiling (Trần thạch cao)
    const ceilingGeo = new THREE.PlaneGeometry(24, 16);
    ceilingGeo.rotateX(Math.PI / 2);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: '#f9f7f2',
      roughness: 0.9,
      side: THREE.DoubleSide
    });
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceilingMesh.position.set(0, 1.35, 0);
    roomGroup.add(ceilingMesh);
    ceilingMeshRef.current = ceilingMesh;

    // 5C. Back Wall Sections around the Grand Window
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#eae4d9',
      roughness: 0.88,
      side: THREE.DoubleSide
    });
    wallMatRef.current = wallMat;

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.6, 0.14), wallMat);
    leftWall.name = 'RoomLeftWall';
    leftWall.position.set(-3.7, 0.05, -0.15);
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);
    leftWallRef.current = leftWall;

    // Right Wall
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.6, 0.14), wallMat);
    rightWall.name = 'RoomRightWall';
    rightWall.position.set(3.7, 0.05, -0.15);
    rightWall.receiveShadow = true;
    roomGroup.add(rightWall);
    rightWallRef.current = rightWall;

    // Top Header Wall above window
    const topWall = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.25, 0.14), wallMat);
    topWall.name = 'RoomTopWall';
    topWall.position.set(0, 1.25, -0.15);
    roomGroup.add(topWall);
    topWallRef.current = topWall;

    // 5C-2. Dedicated Un-Distorted Room Photo Wall Plane
    const photoWallMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.85,
      metalness: 0.02,
      side: THREE.DoubleSide
    });
    const photoWallMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 2.65), photoWallMat);
    photoWallMesh.name = 'PhotoWallMesh';
    photoWallMesh.position.set(0, 0.05, -0.16);
    photoWallMesh.visible = false;
    roomGroup.add(photoWallMesh);
    photoWallMeshRef.current = photoWallMesh;

    roomWallMeshesRef.current = [leftWall, rightWall, topWall];
    wallMeshesRef.current = [leftWall, rightWall, topWall];
    applyWallTexture();

    // 5D. Grand Balcony Window Frame (Khung nhôm kính ban công dành cho rèm lớn)
    const balconyFrameGroup = new THREE.Group();
    balconyFrameGroup.name = 'BalconyFrameGroup';
    balconyFrameGroupRef.current = balconyFrameGroup;
    roomGroup.add(balconyFrameGroup);

    const frameMat = new THREE.MeshStandardMaterial({
      color: '#282421',
      metalness: 0.85,
      roughness: 0.22,
      side: THREE.DoubleSide
    });

    const windowWidth = 3.4;
    const frameThickness = 0.035;
    const actualFrameH = 2.375;
    const actualCenterY = -0.0625;

    // Flush perimeter frame that never clips into wall meshes
    const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, actualFrameH, 0.06), frameMat);
    frameLeft.position.set(-windowWidth / 2 + frameThickness / 2, actualCenterY, -0.16);
    balconyFrameGroup.add(frameLeft);

    const frameRight = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, actualFrameH, 0.06), frameMat);
    frameRight.position.set(windowWidth / 2 - frameThickness / 2, actualCenterY, -0.16);
    balconyFrameGroup.add(frameRight);

    const frameBottom = new THREE.Mesh(new THREE.BoxGeometry(windowWidth, frameThickness, 0.06), frameMat);
    frameBottom.position.set(0, -1.25 + frameThickness / 2, -0.16);
    balconyFrameGroup.add(frameBottom);

    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(windowWidth, frameThickness, 0.06), frameMat);
    frameTop.position.set(0, 1.125 - frameThickness / 2, -0.16);
    balconyFrameGroup.add(frameTop);

    const mullionCenter = new THREE.Mesh(new THREE.BoxGeometry(0.03, actualFrameH, 0.05), frameMat);
    mullionCenter.position.set(0, actualCenterY, -0.16);
    balconyFrameGroup.add(mullionCenter);

    // Architectural Double-Sided Glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#e4f1fc',
      transparent: true,
      opacity: 0.18,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.88,
      ior: 1.5,
      side: THREE.DoubleSide
    });
    const glassMesh = new THREE.Mesh(new THREE.PlaneGeometry(windowWidth - frameThickness * 2, actualFrameH - frameThickness * 2), glassMat);
    glassMesh.position.set(0, actualCenterY, -0.17);
    balconyFrameGroup.add(glassMesh);

    // Explicitly hide balcony frame if current curtain is 3-window triptych
    balconyFrameGroup.visible = !hasUploaded && (curtainType?.id !== 'roller-triptych' && curtainType?.id !== 'roller-quad' && curtainType?.id !== 'honeycomb' && curtainType?.id !== 'roman-linen' && !curtainType?.isPvc && curtainType?.id !== 'roller-linen' && !curtainType?.isRoller);

    // 5E. Exterior Penthouse Terrace Balcony (Seen when orbiting 360° to the back!)
    const balconyGeo = new THREE.PlaneGeometry(16, 8);
    balconyGeo.rotateX(-Math.PI / 2);
    const balconyMat = new THREE.MeshStandardMaterial({
      color: '#5c5752',
      roughness: 0.65,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const balconyMesh = new THREE.Mesh(balconyGeo, balconyMat);
    balconyMesh.position.set(0, -1.26, -4.18);
    roomGroup.add(balconyMesh);
    balconyMeshRef.current = balconyMesh;

    // Balcony Glass Railing at z = -2.8
    const railingGeo = new THREE.PlaneGeometry(windowWidth + 1.2, 1.1);
    const railingMat = new THREE.MeshPhysicalMaterial({
      color: '#c2dcf0',
      transparent: true,
      opacity: 0.22,
      roughness: 0.15,
      transmission: 0.82,
      side: THREE.DoubleSide
    });
    const railingMesh = new THREE.Mesh(railingGeo, railingMat);
    railingMesh.position.set(0, -0.70, -2.8);
    roomGroup.add(railingMesh);
    railingMeshRef.current = railingMesh;

    const railingTopBar = new THREE.Mesh(new THREE.BoxGeometry(windowWidth + 1.2, 0.04, 0.06), frameMat);
    railingTopBar.position.set(0, -0.15, -2.8);
    roomGroup.add(railingTopBar);
    railingTopBarRef.current = railingTopBar;

    // 5F. Panoramic Curved Sky Cylinder (Surrounds entire 360° scene at radius 26m)
    // Never intersects camera and visible from both front and back!
    const skyGeo = new THREE.CylinderGeometry(26, 26, 28, 48, 1, true);
    const skyMat = new THREE.MeshBasicMaterial({
      map: createSkyCanvasTexture(initAtmosphere.skyTop, initAtmosphere.skyBottom),
      side: THREE.BackSide,
      depthWrite: false
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    skyMesh.position.set(0, 2.0, 0);
    scene.add(skyMesh);
    skyMeshRef.current = skyMesh;

    // 5G. 3D Rain & Wind Particle System (Falling outside the window)
    const rainCount = 1600;
    const rainGeo = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = (Math.random() - 0.5) * 12;
      rainPositions[i * 3 + 1] = Math.random() * 5.0 - 1.5;
      rainPositions[i * 3 + 2] = -0.5 - Math.random() * 3.5; // outside window on balcony
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rainMat = new THREE.PointsMaterial({
      color: '#b0cbe0',
      size: 0.042,
      transparent: true,
      opacity: 0.78
    });
    const rainPoints = new THREE.Points(rainGeo, rainMat);
    rainPoints.visible = activeAtmosphere === 'rain';
    scene.add(rainPoints);
    rainPointsRef.current = rainPoints;

    // ========================================================
    // 6. MASTER CURTAIN ASSEMBLY GROUP
    // ========================================================
    const assemblyGroup = new THREE.Group();
    assemblyGroup.position.set(curtainOffset.x, curtainOffset.y, 0);
    assemblyGroup.scale.set(curtainScale.w, curtainScale.h, 1);
    scene.add(assemblyGroup);
    curtainAssemblyRef.current = assemblyGroup;

    // 6A. Subgroup for Dedicated 3D GLB Models
    const customGroup = new THREE.Group();
    assemblyGroup.add(customGroup);
    customModelGroupRef.current = customGroup;

    // 6B. Subgroup for Generic Procedural Curtain (Fallback)
    const genericGroup = new THREE.Group();
    genericGroup.visible = !curtainType?.model3dUrl;
    assemblyGroup.add(genericGroup);
    genericAssemblyRef.current = genericGroup;

    // 7. Metallic Track & Rod Assembly (Generic)
    const rodGroup = new THREE.Group();
    rodGroup.position.set(0, 1.25, 0.05);

    const rodGeo = new THREE.CylinderGeometry(0.016, 0.016, 3.4, 24);
    rodGeo.rotateZ(Math.PI / 2);
    const rodMat = new THREE.MeshStandardMaterial({
      color: '#baa993',
      metalness: 0.85,
      roughness: 0.25,
      side: THREE.DoubleSide
    });
    const rodMesh = new THREE.Mesh(rodGeo, rodMat);
    rodGroup.add(rodMesh);

    const finialGeo = new THREE.SphereGeometry(0.038, 20, 20);
    const finialLeft = new THREE.Mesh(finialGeo, rodMat);
    finialLeft.position.set(-1.72, 0, 0);
    const finialRight = new THREE.Mesh(finialGeo, rodMat);
    finialRight.position.set(1.72, 0, 0);
    rodGroup.add(finialLeft);
    rodGroup.add(finialRight);
    genericGroup.add(rodGroup);

    // 8. Procedural Curtain Fabric Meshes (Fallback)
    const curtainWidth = 1.7;
    const curtainHeight = 2.45;
    const waves = curtainType.id === 'sheer' ? 8 : 6;

    const fabricMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(studioColor),
      roughness: 0.85,
      metalness: 0.02,
      side: THREE.DoubleSide
    });

    const leftCurtainGeo = createCurtainGeometry(curtainWidth, curtainHeight, waves, openRatio, true);
    const leftCurtainMesh = new THREE.Mesh(leftCurtainGeo, fabricMat);
    leftCurtainMesh.position.set(0, 0.05, 0.04);
    leftCurtainMesh.castShadow = true;
    leftCurtainMesh.receiveShadow = true;
    genericGroup.add(leftCurtainMesh);
    leftCurtainMeshRef.current = leftCurtainMesh;

    const rightCurtainGeo = createCurtainGeometry(curtainWidth, curtainHeight, waves, openRatio, false);
    const rightCurtainMesh = new THREE.Mesh(rightCurtainGeo, fabricMat.clone());
    rightCurtainMesh.position.set(0, 0.05, 0.04);
    rightCurtainMesh.castShadow = true;
    rightCurtainMesh.receiveShadow = true;
    genericGroup.add(rightCurtainMesh);
    rightCurtainMeshRef.current = rightCurtainMesh;

    const sheerMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.45,
      transparent: true,
      opacity: 0.52,
      side: THREE.DoubleSide
    });

    const leftSheerGeo = createCurtainGeometry(curtainWidth, curtainHeight, 10, openRatio * 0.35, true);
    const leftSheerMesh = new THREE.Mesh(leftSheerGeo, sheerMat);
    leftSheerMesh.position.set(0, 0.05, -0.06);
    leftSheerMesh.visible = curtainType.id === 'double-layer';
    genericGroup.add(leftSheerMesh);
    leftSheerMeshRef.current = leftSheerMesh;

    const rightSheerGeo = createCurtainGeometry(curtainWidth, curtainHeight, 10, openRatio * 0.35, false);
    const rightSheerMesh = new THREE.Mesh(rightSheerGeo, sheerMat.clone());
    rightSheerMesh.position.set(0, 0.05, -0.06);
    rightSheerMesh.visible = curtainType.id === 'double-layer';
    genericGroup.add(rightSheerMesh);
    rightSheerMeshRef.current = rightSheerMesh;

    // 9. Render Animation Loop (Continuous 360-degree Orbit & Physical Wind Simulation)
    const renderLoop = () => {
      rotCurrentRef.current.x += (rotTargetRef.current.x - rotCurrentRef.current.x) * 0.08;
      rotCurrentRef.current.y += (rotTargetRef.current.y - rotCurrentRef.current.y) * 0.08;
      zoomCurrentRef.current += (zoomTargetRef.current - zoomCurrentRef.current) * 0.08;

      const dist = zoomCurrentRef.current;
      const rotY = rotCurrentRef.current.y;
      const rotX = rotCurrentRef.current.x;

      camera.position.x = dist * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = Math.max(-0.75, Math.min(1.10, 0.2 + dist * Math.sin(rotX)));
      camera.position.z = dist * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 0.1, 0);

      const isRain = activeAtmosphere === 'rain';

      // Rain particles animation & Wind breeze simulation
      if (rainPointsRef.current && rainPointsRef.current.visible) {
        const rPos = rainPointsRef.current.geometry.attributes.position;
        for (let i = 0; i < rPos.count; i++) {
          let py = rPos.getY(i) - 0.22; // rapid falling speed
          let px = rPos.getX(i) - 0.055; // strong wind slant
          let pz = rPos.getZ(i) + 0.015; // wind pushing toward window
          if (py < -1.5) {
            py = 3.0 + Math.random() * 0.6;
            px = (Math.random() - 0.5) * 12;
            pz = -0.5 - Math.random() * 3.5;
          }
          rPos.setXYZ(i, px, py, pz);
        }
        rPos.needsUpdate = true;
      }

      // PHYSICAL WIND SWAY ON CURTAINS (Active in rain mode)
      if (isRain) {
        const t = performance.now() * 0.0028;
        // Multi-frequency gusting wind pattern
        const gustBase = Math.sin(t * 1.6) * 0.5 + Math.sin(t * 3.1) * 0.3 + Math.sin(t * 5.7) * 0.15;
        const windForce = Math.max(0.02, gustBase + 0.45);

        // 1. Overall assembly sway
        if (curtainAssemblyRef.current) {
          curtainAssemblyRef.current.rotation.x = windForce * 0.08;
          curtainAssemblyRef.current.rotation.z = Math.sin(t * 2.2) * 0.025;
          curtainAssemblyRef.current.position.z = windForce * 0.06;
        }

        // 2. Embroidered Leaf Sheer billows lightly in wind
        if (customSheerRef.current) {
          customSheerRef.current.rotation.x = windForce * 0.16 + Math.sin(t * 4.2) * 0.04;
          customSheerRef.current.rotation.y = Math.cos(t * 2.8) * 0.03;
          customSheerRef.current.position.z = -0.07 + windForce * 0.12;
        }

        // 3. Outer Drapes sway
        if (customLeftDrapeRef.current) {
          customLeftDrapeRef.current.rotation.x = windForce * 0.09;
          customLeftDrapeRef.current.rotation.y = -Math.sin(t * 2.0) * 0.03;
        }
        if (customRightDrapeRef.current) {
          customRightDrapeRef.current.rotation.x = windForce * 0.09;
          customRightDrapeRef.current.rotation.y = Math.sin(t * 2.0) * 0.03;
        }

        if (leftSheerMeshRef.current && rightSheerMeshRef.current) {
          leftSheerMeshRef.current.rotation.x = windForce * 0.14;
          rightSheerMeshRef.current.rotation.x = windForce * 0.14;
        }

        if (customRollerFabricRef.current) {
          customRollerFabricRef.current.rotation.x = windForce * 0.05;
          customRollerFabricRef.current.position.z = 0.02 + windForce * 0.04;
          if (customRollerBottomBarRef.current) {
            customRollerBottomBarRef.current.position.z = 0.02 + windForce * 0.04;
          }
        }
        if (customTriptychRef.current && customTriptychRef.current.fabrics.length > 0) {
          customTriptychRef.current.fabrics.forEach((f, idx) => {
            const phase = t * 1.5 + idx * 0.8;
            f.rotation.x = windForce * 0.05 + Math.sin(phase) * 0.01;
            f.position.z = 0.02 + windForce * 0.04;
          });
          customTriptychRef.current.bottomBars.forEach((b) => {
            b.position.z = 0.02 + windForce * 0.04;
          });
        }
      } else {
        // Smoothly ease back to stillness
        if (curtainAssemblyRef.current) {
          curtainAssemblyRef.current.rotation.x *= 0.92;
          curtainAssemblyRef.current.rotation.z *= 0.92;
          curtainAssemblyRef.current.position.z *= 0.92;
        }
        if (customSheerRef.current) {
          customSheerRef.current.rotation.x *= 0.90;
          customSheerRef.current.rotation.y *= 0.90;
          customSheerRef.current.position.z += (-0.07 - customSheerRef.current.position.z) * 0.1;
        }
        if (customLeftDrapeRef.current) {
          customLeftDrapeRef.current.rotation.x *= 0.92;
          customLeftDrapeRef.current.rotation.y *= 0.92;
        }
        if (customRightDrapeRef.current) {
          customRightDrapeRef.current.rotation.x *= 0.92;
          customRightDrapeRef.current.rotation.y *= 0.92;
        }
        if (customRollerFabricRef.current) {
          customRollerFabricRef.current.rotation.x *= 0.92;
          customRollerFabricRef.current.position.z += (0.02 - customRollerFabricRef.current.position.z) * 0.1;
          if (customRollerBottomBarRef.current) {
            customRollerBottomBarRef.current.position.z = customRollerFabricRef.current.position.z;
          }
        }
        if (customTriptychRef.current && customTriptychRef.current.fabrics.length > 0) {
          customTriptychRef.current.fabrics.forEach((f) => {
            f.rotation.x *= 0.92;
            f.position.z += (0.02 - f.position.z) * 0.1;
          });
          customTriptychRef.current.bottomBars.forEach((b) => {
            b.position.z += (0.02 - b.position.z) * 0.1;
          });
        }
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // 10. Robust Resize Handling
    let resizeTimer = null;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || !entries.length) return;
      if (resizeTimer) cancelAnimationFrame(resizeTimer);
      resizeTimer = requestAnimationFrame(() => {
        const entry = entries[0];
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 100 && newH > 100) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH, false);
        }
      });
    });

    resizeObserver.observe(container);
    setThreeReady(true);

    return () => {
      if (resizeTimer) cancelAnimationFrame(resizeTimer);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  // Mouse & Touch Interaction Handlers (Continuous 360° Orbit & Mobile Touch Gestures)
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - prevMouseRef.current.x;
    const deltaY = e.clientY - prevMouseRef.current.y;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };

    if (isAdjusting) {
      // In calibration mode, directly drag the 3D curtain and overhead light over the window!
      setCurtainOffset((prev) => {
        const nextX = Math.round((prev.x + deltaX * 0.007) * 100) / 100;
        const nextY = Math.round((prev.y - deltaY * 0.007) * 100) / 100;
        if (coveLightRef.current) {
          coveLightRef.current.position.set(nextX, 1.30 + nextY, 0.25);
        }
        return { x: nextX, y: nextY };
      });
      return;
    }

    // Continuous 360-degree horizontal rotation (no clamp!)
    rotTargetRef.current.y -= deltaX * 0.007;

    // Vertical pitch tilt safely clamped
    rotTargetRef.current.x = Math.max(-0.28, Math.min(0.35, rotTargetRef.current.x + deltaY * 0.004));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Mobile Touch Support: 1-finger orbit/drag, 2-finger smooth pinch zoom
  const handleTouchStart = (e) => {
    if (!e.touches) return;
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      initialPinchDistRef.current = null;
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      initialPinchDistRef.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  };

  const handleTouchMove = (e) => {
    if (!e.touches) return;
    if (e.touches.length === 1 && isDraggingRef.current) {
      const deltaX = e.touches[0].clientX - prevMouseRef.current.x;
      const deltaY = e.touches[0].clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      if (isAdjusting) {
        // Drag curtain with finger in calibration mode
        setCurtainOffset((prev) => {
          const nextX = Math.round((prev.x + deltaX * 0.007) * 100) / 100;
          const nextY = Math.round((prev.y - deltaY * 0.007) * 100) / 100;
          if (coveLightRef.current) {
            coveLightRef.current.position.set(nextX, 1.30 + nextY, 0.25);
          }
          return { x: nextX, y: nextY };
        });
        return;
      }

      // Smooth horizontal rotation
      rotTargetRef.current.y -= deltaX * 0.008;
      // Vertical pitch tilt safely clamped
      rotTargetRef.current.x = Math.max(-0.28, Math.min(0.35, rotTargetRef.current.x + deltaY * 0.005));
    } else if (e.touches.length === 2 && initialPinchDistRef.current !== null) {
      // 2-finger pinch to zoom on mobile
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const diff = (initialPinchDistRef.current - currentDist) * 0.015;
      zoomTargetRef.current = Math.max(2.2, Math.min(10.0, zoomTargetRef.current + diff));
      initialPinchDistRef.current = currentDist;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    initialPinchDistRef.current = null;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newZoom = zoomTargetRef.current + e.deltaY * 0.003;
    zoomTargetRef.current = Math.max(2.2, Math.min(15.0, newZoom));
  };

  return (
    <div
      className="curtain-3d-stage"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ 
        position: 'absolute', 
        inset: 0, 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden', 
        touchAction: 'none',
        cursor: isDraggingRef.current ? 'grabbing' : 'grab' 
      }}
    >
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="curtain-3d-canvas-wrap" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }} />

      {/* Analyzing Scan Line Overlay */}
      {isAnalyzing && (
        <div className="analysis-overlay">
          <span className="scan-line" />
          <div className="analysis-orb"><Sparkles size={28} /></div>
          <strong>Đang khởi tạo không gian 3D</strong>
          <small>Tạo phòng kiến trúc · Mô phỏng ánh sáng vật lý</small>
        </div>
      )}

      {/* Floating 3D Minimalist Badge (Clean, unobstructed canvas) */}
      <div className="stage-3d-badge">
        <span className="live-dot" />
        <span>
          3D SHOWROOM · {ATMOSPHERE_MODES[activeAtmosphere]?.name.toUpperCase()} · XOAY 360° CHUẨN VẬT LÝ
        </span>
      </div>
    </div>
  );
});

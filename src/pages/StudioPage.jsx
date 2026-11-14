import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import { StudioIcon } from '../components/ui/Icons';
import { curtainTypes, fabricSamples, fabricCurtainSamples, rollerCurtainSamples, rainbowCurtainSamples, studioStyleFilters } from '../data/studioData';
import { RoomCurtain3DViewer } from '../components/studio/RoomCurtain3DViewer';
import { analyzeRoomPhoto, determineCurtainRecommendations } from '../utils/aiRoomAnalyzer';
import { WindowMeasurementGuideModal } from '../components/ui/WindowMeasurementGuideModal';
import { 
  Eye, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Box, 
  Layers, 
  RefreshCw,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  CloudRain,
  RotateCcw,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Camera,
  Upload,
  Home,
  Check,
  X,
  Scan,
  Compass,
  Zap,
  FastForward,
  Palette,
  Ruler,
  Tag,
  Star,
  Settings,
  Search
} from 'lucide-react';

const CURTAIN_COLOR_NAMES = {
  // sfold-luxury
  '#d5cbbe': 'Kem cát S-Fold',
  '#e4ded5': 'Trắng ngà sang trọng',
  '#c2b4a3': 'Be vàng hoàng gia',
  '#a89986': 'Nâu be quý phái',
  '#877867': 'Nâu trầm ấm cúng',
  '#ded8cf': 'Kem tuyết 5 sao',
  '#4a443e': 'Gỗ mun quý tộc',
  // single-pleat
  '#9fa4a9': 'Xám bạc Melange',
  '#767c82': 'Xám trung tính',
  '#b4b9bf': 'Xám ngọc trai',
  '#61666b': 'Xám than chì',
  '#c5beb5': 'Be cát mềm mại',
  '#6f7a85': 'Xanh xám hiện đại',
  '#383b3e': 'Đen than huyền bí',
  // elogi-1198-2
  '#ebe6db': 'Lớp vải mặt (Kem sáng)',
  '#9ea9b3': 'Lớp trung gian (Xám xanh pastel)',
  '#cfc3b0': 'Lớp vải lót (Nâu be cát)',
  '#84909a': 'Xám đá tự nhiên',
  '#d7cdc0': 'Be yến mạch',
  '#463f38': 'Nâu cà phê',
  // elogi-1206-1
  '#b5aba1': 'Lớp vải mặt (Xám be mocha)',
  '#ddd3c3': 'Lớp trung gian (Vàng be linen)',
  '#564a40': 'Lớp vải lót (Nâu sô-cô-la)',
  '#8d7d70': 'Be đất nung',
  '#c5b9aa': 'Kem hạnh nhân',
  '#362d26': 'Nâu gỗ trầm',
  // elogi-1230-1
  '#e3d8c8': 'Chất liệu vải (Cát vàng kem)',
  '#8d8c89': 'Bề mặt vải (Xám xi măng)',
  '#9e8875': 'Màu sắc (Nâu socola sữa)',
  '#d4c6b2': 'Be cát tự nhiên',
  '#6f6e6b': 'Xám tro hiện đại',
  '#3b322a': 'Nâu đất đậm',
  // Harmony 2 (CICI HOME)
  '#c5cbcf': 'H 66 - Xám bạc ghi sáng',
  '#586573': 'H 67 - Xanh xám slate đậm',
  '#6e5a4d': 'H 69 - Nâu cà phê trầm',
  '#ece8dc': 'H 610 - Kem sữa linen',
  '#ded6cb': 'H 611 - Be yến mạch trung tính',
  // Malange 1 (CICI HOME)
  '#f4f6f8': 'MA 11 - Trắng tinh khôi',
  '#ebe7d0': 'MA 12 - Vàng be champagne',
  '#b2b7b9': 'MA 13 - Xám tro trung tính',
  '#9bb7cc': 'MA 14 - Xanh pastel baby blue',
  '#d6cbb8': 'MA 15 - Be cát ấm',
  '#3d474d': 'MA 17 - Xám than chì',
  // Moon (CICI HOME)
  '#fdfdfd': 'M 81 - Trắng sứ mặt trăng',
  '#9fb1be': 'M 82 - Xám xanh sương mù',
  '#889299': 'M 86 - Xám xi măng hiện đại',
  '#f2e7cd': 'M 87 - Kem vàng pastel',
  '#b0c8d8': 'M 88 - Xanh da trời pastel',
  '#b9bec2': 'M 89 - Xám bạc ánh kim',
  '#8b786d': 'M 681 - Nâu be mocha',
  // Silvia (CICI HOME)
  '#dbe1e6': 'SV 04201 - Trắng xám sương',
  '#eee9d7': 'SV 04202 - Kem vani dịu',
  '#ded8c8': 'SV 04203 - Be sáng tự nhiên',
  '#c8bdae': 'SV 04204 - Nâu be linen dệt xước',
  '#cad1d7': 'SV 04205 - Xám bạc kim loại',
  '#8e969a': 'SV 04206 - Xám đậm graphite',
  // Sunny (CICI HOME)
  '#ece6d5': 'S 91 - Kem bơ sáng nắng',
  '#aab0b4': 'S 92 - Ghi xám mờ',
  '#7f92a3': 'S 93 - Xanh denim cổ điển',
  '#7f7863': 'S 94 - Nâu rêu olive',
  '#58626b': 'S 95 - Xám khói đậm',
  '#353c42': 'S 96 - Đen than chì',
  // art prints / white
  '#ffffff': 'Trắng tinh khôi',
  // River.E (CICI HOME R 101 - R 110)
  '#7cb9e8': 'R 101 - Xanh dương nhạt',
  '#dfcaa7': 'R 102 - Vàng kem cát',
  '#c2bcaf': 'R 103 - Be xám nhạt',
  '#7d8387': 'R 104 - Xám ghi sắc nét',
  '#3e586d': 'R 105 - Xanh phiến đậm',
  '#54463d': 'R 106 - Nâu đất ấm',
  '#6d7671': 'R 107 - Xám rêu',
  '#6b7a8d': 'R 108 - Xanh xám khói',
  '#9a7457': 'R 109 - Nâu caramel',
  '#2c3b47': 'R 110 - Xanh than đậm',
  // GoldenWeave
  '#cfb384': 'Vàng tơ dệt óng',
  '#a88958': 'Sợi óng hổ phách',
  '#876337': 'Nâu vàng gỗ ấm',
  '#5a4225': 'Gỗ teak sẫm',
  '#ded0b6': 'Kem dệt ánh kim',
  // ModernStripe / NordicRay / SunnyView
  '#f3ebe1': 'Trắng sữa tinh khiết',
  '#d0c3b5': 'Be khói thanh lịch',
  '#b1a293': 'Ghi xám trung tính',
  '#5c544d': 'Xám đậm graphite',
  '#cbae92': 'Nâu sữa Latte',
  '#f7e9de': 'Cát Bắc Âu',
  '#bb8e61': 'Cam đất nung',
  '#8a5832': 'Gỗ óc chó',
  '#c8af8d': 'Vàng champagne',
  '#f5e8d8': 'Màu nắng mai',
  '#9d8062': 'Nâu ấm gỗ sồi',
  '#484421': 'Xanh rêu đậm'
};

function getCurtainColorName(hex) {
  if (!hex) return 'Mặc định';
  return CURTAIN_COLOR_NAMES[hex.toLowerCase()] || 'Màu vải cao cấp';
}

function isLightColorHex(hex) {
  if (!hex || hex === 'transparent') return false;
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0, 2), 16) || 0;
  const g = parseInt(c.substr(2, 2), 16) || 0;
  const b = parseInt(c.substr(4, 2), 16) || 0;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}
const isLightColor = isLightColorHex;
if (typeof window !== 'undefined') {
  window.isLightColor = isLightColorHex;
  window.isLightColorHex = isLightColorHex;
}

export function StudioPage({
  navigateTo,
  fileRef,
  roomImage,
  hasUploaded,
  isAnalyzing,
  analyzed,
  activeType,
  studioColor,
  setStudioColor,
  activeStudioFilter,
  setActiveStudioFilter,
  viewMode,
  setViewMode,
  zoom,
  setZoom,
  fullScreen,
  setFullScreen,
  dragging,
  setDragging,
  showOriginal,
  setShowOriginal,
  setRoomImage,
  setHasUploaded,
  setAnalyzed,
  currentType,
  loadFile,
  analyzeRoom,
  chooseType,
}) {
  // AI Room Diagnosis State
  const [aiDiagnosis, setAiDiagnosis] = useState(null);
  const [internalAnalyzing, setInternalAnalyzing] = useState(false);

  // 3D Curtain State (Controlled outside 3D canvas)
  const [curtainOpenRatio, setCurtainOpenRatio] = useState(0.0);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [activeAtmosphere, setActiveAtmosphere] = useState('noon');
  const viewer3dRef = useRef(null);
  const stepperRef = useRef(null);
  const [showAdjuster, setShowAdjuster] = useState(false);
  const [showMeasureGuide, setShowMeasureGuide] = useState(false);
  const [calibrationPrecision, setCalibrationPrecision] = useState('fine'); // 'fine' (2%) | 'medium' (5%) | 'coarse' (10%)
  const isRollerCurtain = currentType?.isRoller || currentType?.category === 'Rèm cuốn';
  const isRainbowCurtain = currentType?.isRainbow || currentType?.category === 'Rèm cầu vồng';
  const [rainbowStripeMode, setRainbowStripeMode] = useState('sheer'); // 'sheer' (Lấy sáng - Trùng nan) | 'blackout' (Che kín - So le nan)

  const availableFabricSamples = useMemo(() => {
    if (isRainbowCurtain) return rainbowCurtainSamples;
    if (isRollerCurtain) return rollerCurtainSamples;
    return fabricCurtainSamples;
  }, [isRollerCurtain, isRainbowCurtain]);

  const [activeFabricId, setActiveFabricId] = useState(
    isRainbowCurtain 
      ? (currentType?.defaultFabricId || 'rainbow-brioni')
      : isRollerCurtain 
      ? (currentType?.defaultFabricId || 'roller-sunny') 
      : 'elogi-1198-2'
  );

  const currentFabric = useMemo(() => {
    return availableFabricSamples.find(f => f.id === activeFabricId) 
      || fabricSamples.find(f => f.id === activeFabricId) 
      || availableFabricSamples[0];
  }, [availableFabricSamples, activeFabricId]);

  // Synchronize fabric sample when curtain type changes
  const prevCurtainTypeIdRef = useRef(currentType?.id);
  useEffect(() => {
    if (prevCurtainTypeIdRef.current !== currentType?.id) {
      prevCurtainTypeIdRef.current = currentType?.id;
      const nextId = currentType?.defaultFabricId || (
        isRainbowCurtain ? 'rainbow-brioni' : isRollerCurtain ? 'roller-sunny' : 'elogi-1198-2'
      );
      setActiveFabricId(nextId);
      const f = fabricSamples.find(item => item.id === nextId);
      if (f) setStudioColor(f.defaultColor);
      else if (currentType?.colors?.[0]) setStudioColor(currentType.colors[0]);
    }
  }, [currentType?.id, isRollerCurtain, isRainbowCurtain]);

  useEffect(() => {
    if (activeType) {
      if (activeType.startsWith('elogi')) {
        setActiveFabricId(activeType);
        const f = fabricSamples.find(item => item.id === activeType);
        if (f) setStudioColor(f.defaultColor);
      } else if (activeType.startsWith('roller-') && !curtainTypes.some(ct => ct.id === activeType)) {
        setActiveFabricId(activeType);
        const f = fabricSamples.find(item => item.id === activeType);
        if (f) setStudioColor(f.defaultColor);
      } else if (activeType.startsWith('rainbow-') && rainbowCurtainSamples.some(rs => rs.id === activeType)) {
        setActiveFabricId(activeType);
        const f = fabricSamples.find(item => item.id === activeType);
        if (f) setStudioColor(f.defaultColor);
      }
    }
  }, [activeType]);

  useEffect(() => {
    // Ensure stepper starts scrolled fully to the left so Step 1 icon is never clipped on mobile (iPhone 14/15/16/17)
    const resetStepperScroll = () => {
      if (stepperRef.current) {
        stepperRef.current.scrollLeft = 0;
      }
    };
    resetStepperScroll();
    const timer = setTimeout(resetStepperScroll, 100);
    window.addEventListener('resize', resetStepperScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resetStepperScroll);
      if (sliderRafRef.current) cancelAnimationFrame(sliderRafRef.current);
      if (curtainAnimRafRef.current) cancelAnimationFrame(curtainAnimRafRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && fullScreen) {
        setFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullScreen, setFullScreen]);

  const curtainMoveStep = calibrationPrecision === 'fine' ? 0.02 : calibrationPrecision === 'medium' ? 0.04 : 0.08;
  const curtainScaleStep = calibrationPrecision === 'fine' ? 0.025 : calibrationPrecision === 'medium' ? 0.05 : 0.10;
  const photoScaleStep = calibrationPrecision === 'fine' ? 0.02 : calibrationPrecision === 'medium' ? 0.04 : 0.08;

  // Pagination for curtain recommendations (5 items per page)
  const ITEMS_PER_PAGE = 5;
  const [curtainPage, setCurtainPage] = useState(1);
  const [mobileActiveTab, setMobileActiveTab] = useState('preview'); // 'preview' | 'curtains' | 'upload'

  // Dedicated file input refs for Camera vs Gallery
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Questionnaire Survey & AI Scanner State
  const [surveyModalOpen, setSurveyModalOpen] = useState(false);
  const [pendingImage, setPendingImage] = useState(null);
  const [surveyAnswers, setSurveyAnswers] = useState({
    location: 'indoor', // 'indoor' | 'outdoor'
    doorType: 'window',  // 'window' | 'main'
    windowPanels: 'single', // 'single' | '3' | '4'
    budget: 'all' // 'all' | 'economy' | 'standard' | 'luxury'
  });
  const [isScanning, setIsScanning] = useState(false);
  const scanTimerRef = useRef(null);
  const scanIntervalRef = useRef(null);
  const [scanPhaseIndex, setScanPhaseIndex] = useState(0);

  const SCAN_PHASES = [
    'Đang tải dữ liệu ảnh phòng & cân chỉnh chất lượng quang học...',
    'Đang quét cấu trúc khung cửa và nhận diện tọa độ không gian 3D...',
    'Phân tích cường độ ánh sáng tự nhiên và bảng màu căn phòng...',
    'Mô phỏng phối cảnh và đo đạc tỷ lệ chuẩn...',
    'Hoàn tất nhận diện! Đang áp dụng các mẫu rèm tối ưu...'
  ];

  // Prioritize and filter curtain types based on AI Diagnosis
  const filteredCurtainTypes = useMemo(() => {
    let list = [...curtainTypes];

    // If an AI diagnosis exists with recommended IDs, sort them to the top
    if (aiDiagnosis?.recommendedTypeIds?.length) {
      list.sort((a, b) => {
        const aRec = aiDiagnosis.recommendedTypeIds.includes(a.id);
        const bRec = aiDiagnosis.recommendedTypeIds.includes(b.id);
        if (aRec && !bRec) return -1;
        if (!aRec && bRec) return 1;
        return 0;
      });
    }

    return list.filter((t) => {
      if (activeStudioFilter === 'Tất cả') return true;
      if (activeStudioFilter === 'Rèm vải') {
        return t.category === 'Rèm vải';
      }
      if (activeStudioFilter === 'Rèm cuốn') {
        return t.category === 'Rèm cuốn' || t.isRoller;
      }
      if (activeStudioFilter === 'Rèm cầu vồng') {
        return t.category === 'Rèm cầu vồng' || t.isRainbow;
      }
      return t.category === activeStudioFilter;
    });
  }, [activeStudioFilter, aiDiagnosis]);

  const totalCurtainPages = Math.max(1, Math.ceil(filteredCurtainTypes.length / ITEMS_PER_PAGE));

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurtainPage(1);
  }, [activeStudioFilter]);

  useEffect(() => {
    if (curtainPage > totalCurtainPages) {
      setCurtainPage(totalCurtainPages);
    }
  }, [totalCurtainPages, curtainPage]);

  const paginatedCurtainTypes = useMemo(() => {
    const startIdx = (curtainPage - 1) * ITEMS_PER_PAGE;
    return filteredCurtainTypes.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredCurtainTypes, curtainPage]);

  // Automatically reset curtain to 0% (closed) whenever switching to another curtain model
  useEffect(() => {
    setCurtainOpenRatio(0.0);
    setIsCurtainOpen(false);
  }, [activeType]);

  const sliderRafRef = useRef(null);

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    // Instant 3D WebGL transform update without waiting for React cycle
    viewer3dRef.current?.setCurtainOpenRatio?.(val);

    // Throttle React state update via requestAnimationFrame for 60fps responsiveness
    if (sliderRafRef.current) cancelAnimationFrame(sliderRafRef.current);
    sliderRafRef.current = requestAnimationFrame(() => {
      setCurtainOpenRatio(val);
      setIsCurtainOpen(val > 0.35);
    });
  };

  const curtainAnimRafRef = useRef(null);
  const handleToggleCurtainOpen = () => {
    const next = !isCurtainOpen;
    setIsCurtainOpen(next);
    const startRatio = curtainOpenRatio;
    const targetRatio = next ? 1.0 : 0.0;
    const startTime = performance.now();
    const duration = 950; // 950ms smooth rolling animation

    if (curtainAnimRafRef.current) cancelAnimationFrame(curtainAnimRafRef.current);

    const animateCurtain = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);
      // Easing: easeInOutCubic
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const currentVal = startRatio + (targetRatio - startRatio) * ease;

      setCurtainOpenRatio(currentVal);
      viewer3dRef.current?.setCurtainOpenRatio?.(currentVal);

      if (progress < 1.0) {
        curtainAnimRafRef.current = requestAnimationFrame(animateCurtain);
      } else {
        setCurtainOpenRatio(targetRatio);
        viewer3dRef.current?.setCurtainOpenRatio?.(targetRatio);
      }
    };

    curtainAnimRafRef.current = requestAnimationFrame(animateCurtain);
  };

  // Gợi ý mức giá theo cấu trúc khung cửa & phân khúc khách chọn
  const getEstimatedPriceInfo = (answers) => {
    if (answers.location === 'outdoor') {
      return {
        range: '650.000đ - 1.250.000đ',
        unit: 'bộ',
        desc: 'Bạt PVC 3 lớp dệt cốt sợi poly chịu lực gia cường, kháng nước 100%'
      };
    }
    if (answers.doorType === 'main') {
      if (answers.budget === 'economy') {
        return {
          range: '1.650.000đ - 2.850.000đ',
          unit: 'bộ',
          desc: 'Rèm vải 1 lớp xếp ly định hình cản sáng 100% chuẩn tối giản'
        };
      }
      return {
        range: '2.850.000đ - 5.650.000đ',
        unit: 'bộ',
        desc: 'Rèm 2 lớp cao cấp thêu lá / S-Fold chuẩn biệt thự & khách sạn 5 sao'
      };
    }
    // Window
    if (answers.windowPanels === '3') {
      return {
        range: '1.850.000đ - 2.950.000đ',
        unit: 'bộ 3 ô',
        desc: 'Bộ 3 rèm cuốn in tranh Botanical 3 cánh liền mạch đối xứng'
      };
    }
    if (answers.windowPanels === '4') {
      return {
        range: '2.450.000đ - 3.850.000đ',
        unit: 'bộ 4 ô',
        desc: 'Bộ 4 rèm cuốn tranh Panorama Đại lộ Ngân Hạnh ghép 4 tấm'
      };
    }
    // Single window
    if (answers.budget === 'economy') {
      return {
        range: '550.000đ - 950.000đ',
        unit: 'bộ',
        desc: 'Rèm cuốn vải dệt Linen cản sáng tự nhiên, giải pháp tiết kiệm'
      };
    }
    if (answers.budget === 'luxury') {
      return {
        range: '980.000đ - 1.850.000đ',
        unit: 'bộ',
        desc: 'Rèm tổ ong cách nhiệt tráng bạc 100% hoặc Rèm Roman Linen cao cấp'
      };
    }
    if (answers.budget === 'standard') {
      return {
        range: '850.000đ - 1.850.000đ',
        unit: 'bộ',
        desc: 'Rèm Roman xếp lớp Slub hoặc Rèm tổ ong lục giác cản nhiệt'
      };
    }
    // 'all'
    return {
      range: '550.000đ - 2.450.000đ',
      unit: 'bộ',
      desc: 'Khoảng giá linh hoạt từ rèm cuốn hiện đại đến rèm xếp lớp cao cấp'
    };
  };

  // Trigger file selection -> open questionnaire survey
  const handlePhotoSelected = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      setPendingImage(dataUrl);
      setSurveyModalOpen(true);
      setIsScanning(false);
    };
    reader.readAsDataURL(file);
  };

  // Open survey for preset images or re-analysis
  const handleOpenSurveyForPreset = (imgSrc) => {
    setPendingImage(imgSrc);
    setSurveyModalOpen(true);
    setIsScanning(false);
  };

  // Start AI Scanning (runs for 20s without displaying countdown numbers)
  const handleStartScan = () => {
    setIsScanning(true);
    setScanPhaseIndex(0);
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    // Update dynamic phase every 4 seconds (5 phases * 4s = 20s)
    let phase = 0;
    scanIntervalRef.current = setInterval(() => {
      phase += 1;
      if (phase < SCAN_PHASES.length) {
        setScanPhaseIndex(phase);
      }
    }, 4000);

    // Complete after exactly 20 seconds (20,000ms)
    scanTimerRef.current = setTimeout(() => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      finishScanAndApplyRecommendations();
    }, 20000);
  };

  const finishScanAndApplyRecommendations = () => {
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    // Calculate AI recommendations based on user's answers
    const diagnosis = determineCurtainRecommendations(surveyAnswers);
    setAiDiagnosis(diagnosis);

    const imageToUse = pendingImage || roomImage;
    setRoomImage(imageToUse);
    setHasUploaded(true);
    setShowOriginal(false);
    setShowAdjuster(true);
    setAnalyzed(true);
    setIsScanning(false);
    setSurveyModalOpen(false);
    setMobileActiveTab('preview');

    // Automatically choose primary recommended curtain type & color
    const primaryType = curtainTypes.find((t) => t.id === diagnosis.primaryTypeId);
    if (primaryType) {
      chooseType(primaryType);
    }
    if (diagnosis.primaryFabricId) {
      setActiveFabricId(diagnosis.primaryFabricId);
    }
    if (diagnosis.primaryColor) {
      setStudioColor(diagnosis.primaryColor);
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  // Run initial default analysis on mount if none exists
  useEffect(() => {
    if (!aiDiagnosis) {
      const initialDiagnosis = determineCurtainRecommendations({
        doorType: 'window',
        location: 'indoor',
        windowPanels: 'single'
      });
      setAiDiagnosis(initialDiagnosis);
    }
  }, []);

  const analyzingState = isAnalyzing || internalAnalyzing || isScanning;

  return (
    <div className="studio-page">
      <div className="scene-backdrop" />

      {/* Studio Topbar */}
      <Header currentPage="studio" navigateTo={navigateTo} themeClass="topbar-studio" />

      {/* Studio Header Banner: Title & Stepper side-by-side */}
      <section className="studio-header-banner" id="top">
        <div className="studio-header-left">
          <span className="studio-accent-line" />
          <div className="studio-title-wrap">
            <h1>Trải nghiệm phòng 3D<br />và AI cùng UniVeloria</h1>
            <p>Khám phá không gian sống lý tưởng với rèm cửa phù hợp nhất cho bạn.</p>
          </div>
        </div>

        <div className="studio-stepper-capsule" ref={stepperRef} aria-label="Quy trình 4 bước">
          <div className="step-pill step-1 active">
            <span className="step-icon-circle"><Home size={15} /></span>
            <span className="step-label">
              <b>1</b>
              <span>Tải ảnh phòng</span>
            </span>
          </div>

          <span className="step-arrow-divider">›</span>

          <div className="step-pill step-2">
            <span className="step-icon-circle"><Layers size={15} /></span>
            <span className="step-label">
              <b>2</b>
              <span>Chọn rèm</span>
            </span>
          </div>

          <span className="step-arrow-divider">›</span>

          <div className="step-pill step-3">
            <span className="step-icon-circle"><Palette size={15} /></span>
            <span className="step-label">
              <b>3</b>
              <span>Tùy chỉnh</span>
            </span>
          </div>

          <span className="step-arrow-divider">›</span>

          <div className="step-pill step-4">
            <span className="step-icon-circle"><Check size={15} /></span>
            <span className="step-label">
              <b>4</b>
              <span>Xem kết quả</span>
            </span>
          </div>
        </div>
      </section>

      {/* Mobile Studio Quick Segment Navigation Bar */}
      <div className="mobile-studio-tabs" role="tablist" aria-label="Điều hướng nhanh Studio trên điện thoại">
        <button
          type="button"
          role="tab"
          aria-selected={mobileActiveTab === 'preview'}
          className={'mobile-tab-btn ' + (mobileActiveTab === 'preview' ? 'active' : '')}
          onClick={() => setMobileActiveTab('preview')}
        >
          <Box size={16} />
          <span>Phòng 3D</span>
          <span className="mobile-tab-badge">WebGL</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileActiveTab === 'curtains'}
          className={'mobile-tab-btn ' + (mobileActiveTab === 'curtains' ? 'active' : '')}
          onClick={() => setMobileActiveTab('curtains')}
        >
          <Layers size={16} />
          <span>Loại rèm ({curtainTypes?.length || 5})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileActiveTab === 'upload'}
          className={'mobile-tab-btn ' + (mobileActiveTab === 'upload' ? 'active' : '')}
          onClick={() => setMobileActiveTab('upload')}
        >
          <StudioIcon name="image" size={16} />
          <span>Đổi ảnh phòng</span>
        </button>
      </div>

      {/* Interactive Workspace (3 Panels) */}
      <section className={'workspace show-tab-' + mobileActiveTab} id="studio-workspace">
        {/* Panel 1: Upload */}
        <aside className="upload-panel glass-panel">
          <div>
            <div className="panel1-header">
              <h2>
                <Sparkles size={16} color="#C8A87D" />
                <span>Tải ảnh phòng của bạn</span>
              </h2>
              <p>Chỉ cần một bức ảnh, chúng mình sẽ lo phần còn lại!</p>
            </div>

            <div
              className={'panel1-dropzone ' + (dragging ? 'dragging' : '')}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); handlePhotoSelected(e.dataTransfer.files?.[0]); }}
            >
              <div style={{ color: '#94A3B8', marginBottom: '8px' }}>
                <Camera size={26} />
              </div>
              <strong style={{ fontSize: '13px', color: '#173352', display: 'block', marginBottom: '4px' }}>
                Kéo thả ảnh phòng vào đây
              </strong>
              <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '10px' }}>
                hoặc
              </span>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#173352',
                    color: '#FEF3E3',
                    border: 'none',
                    padding: '7px 16px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  onClick={() => galleryInputRef.current?.click()}
                >
                  <Camera size={13} />
                  <span>Chọn ảnh</span>
                </button>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#FEF3E3',
                    color: '#173352',
                    border: '1.5px solid #173352',
                    padding: '6px 16px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  onClick={() => cameraInputRef.current?.click()}
                >
                  <Upload size={13} />
                  <span>Tải ảnh lên</span>
                </button>
              </div>

              {/* Mobile Camera direct capture input */}
              <input
                ref={cameraInputRef}
                className="hidden-input"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handlePhotoSelected(e.target.files?.[0])}
              />

              {/* Gallery / File picker input */}
              <input
                ref={galleryInputRef}
                className="hidden-input"
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoSelected(e.target.files?.[0])}
              />

              <small style={{ display: 'block', marginTop: '10px', fontSize: '10.5px', color: '#94A3B8' }}>
                Hỗ trợ: JPG, PNG, tối đa 10MB
              </small>
            </div>

            {/* Room Samples Carousel */}
            <div className="panel1-samples-section">
              <div className="panel1-samples-title">
                <Sparkles size={13} color="#C8A87D" />
                <span>Khám phá phòng mẫu</span>
              </div>
              <div className="panel1-samples-row">
                <button
                  type="button"
                  className="panel1-sample-btn"
                  onClick={() => handleOpenSurveyForPreset('/assets/living-room.jpg')}
                  title="Trước"
                >
                  <ChevronLeft size={14} />
                </button>
                <div
                  className="panel1-sample-card"
                  onClick={() => handleOpenSurveyForPreset('/assets/living-room.jpg')}
                  title="Phòng khách"
                >
                  <img src="/assets/tip-window.jpg" alt="Phòng khách" />
                </div>
                <div
                  className="panel1-sample-card"
                  onClick={() => handleOpenSurveyForPreset('/assets/bedroom.jpg')}
                  title="Phòng ngủ"
                >
                  <img src="/assets/tip-light.jpg" alt="Phòng ngủ" />
                </div>
                <div
                  className="panel1-sample-card"
                  onClick={() => handleOpenSurveyForPreset('/assets/studio-room.png')}
                  title="Studio mẫu"
                >
                  <img src="/assets/tip-angle.jpg" alt="Studio mẫu" />
                </div>
                <button
                  type="button"
                  className="panel1-sample-btn"
                  onClick={() => handleOpenSurveyForPreset('/assets/bedroom.jpg')}
                  title="Sau"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* AI Mascot Card */}
          <div className="panel1-mascot-card">
            <div className="mascot-info">
              <strong>
                <Sparkles size={12} color="#C8A87D" />
                <span>AI phân tích không gian</span>
              </strong>
              <p>Gợi ý loại rèm phù hợp với phong cách và nhu cầu của bạn</p>
            </div>
            <img src="/assets/ChatBot.png" alt="UniVeloria AI Mascot" className="mascot-img" />
          </div>
        </aside>

        {/* Panel 2: Pure 3D Interactive Visualization */}
        <section className={'preview-panel glass-panel ' + (fullScreen ? 'preview-fullscreen' : '')} aria-label="Không gian 3D của bạn">
          <div className="panel2-header">
            <div className="panel2-header-title">
              <Box size={16} color="#173352" />
              <span>Không gian 3D của bạn</span>
            </div>
            <div className="panel2-header-right">
              <span className="panel2-status-pill">
                <span className="dot" />
                <span>3D View Active</span>
              </span>
              {fullScreen && (
                <button
                  type="button"
                  className="fullscreen-exit-btn"
                  onClick={() => setFullScreen(false)}
                >
                  <Minimize2 size={13} />
                  <span>Thoát toàn màn hình (Esc)</span>
                </button>
              )}
              <button
                type="button"
                className="icon-button"
                style={{ width: '28px', height: '28px' }}
                onClick={() => setFullScreen(!fullScreen)}
                title={fullScreen ? 'Thu nhỏ' : 'Toàn màn hình'}
              >
                {fullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                type="button"
                className={'icon-button ' + (showAdjuster ? 'active' : '')}
                style={{ width: '28px', height: '28px' }}
                onClick={() => setShowAdjuster(!showAdjuster)}
                title={showAdjuster ? 'Đóng cài đặt & căn chỉnh' : 'Cài đặt mô phỏng ánh sáng & căn chỉnh rèm 3D'}
              >
                <Settings size={14} />
              </button>
            </div>
          </div>

          {/* UNIFIED SETTINGS & CALIBRATION PANEL (Mô phỏng bên trái, Căn chỉnh rèm bên phải) */}
          {showAdjuster && (
            <div className="studio-unified-settings-panel">
              <div className="unified-settings-header">
                <div className="unified-settings-title">
                  <Settings size={14} color="#C8A87D" />
                  <span>Cài đặt mô phỏng ánh sáng & Căn chỉnh rèm 3D</span>
                </div>
                <button
                  type="button"
                  className="unified-settings-close"
                  onClick={() => setShowAdjuster(false)}
                  title="Đóng bảng cài đặt"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="unified-settings-body">
                {/* CỘT TRÁI: Mô phỏng ánh sáng & thời tiết */}
                <div className="unified-col unified-col-atmo">
                  <div className="unified-section-label">
                    <span>Mô phỏng ánh sáng & thời tiết</span>
                  </div>

                  <div className="unified-atmo-pills">
                    <button
                      className={'atmo-pill-btn ' + (activeAtmosphere === 'morning' ? 'active' : '')}
                      onClick={() => setActiveAtmosphere('morning')}
                      type="button"
                      title="Ánh sáng ban mai nhẹ nhàng"
                    >
                      <Sunrise size={13} color="#ff9e3b" />
                      <span>Sáng sớm</span>
                    </button>
                    <button
                      className={'atmo-pill-btn ' + (activeAtmosphere === 'noon' ? 'active' : '')}
                      onClick={() => setActiveAtmosphere('noon')}
                      type="button"
                      title="Ánh sáng trưa rực rỡ & cản sáng"
                    >
                      <Sun size={13} color="#f4b400" />
                      <span>Trưa nắng</span>
                    </button>
                    <button
                      className={'atmo-pill-btn ' + (activeAtmosphere === 'sunset' ? 'active' : '')}
                      onClick={() => setActiveAtmosphere('sunset')}
                      type="button"
                      title="Hoàng hôn vàng hổ phách"
                    >
                      <Sunset size={13} color="#f25c3b" />
                      <span>Hoàng hôn</span>
                    </button>
                    <button
                      className={'atmo-pill-btn ' + (activeAtmosphere === 'night' ? 'active' : '')}
                      onClick={() => setActiveAtmosphere('night')}
                      type="button"
                      title="Ban tối ấm áp với đèn LED hắt trần"
                    >
                      <Moon size={13} color="#7ba4d5" />
                      <span>Ban tối</span>
                    </button>
                    <button
                      className={'atmo-pill-btn ' + (activeAtmosphere === 'rain' ? 'active' : '')}
                      onClick={() => setActiveAtmosphere('rain')}
                      type="button"
                      title="Trời mưa rả rích kèm gió lay rèm"
                    >
                      <CloudRain size={13} color="#89b2c9" />
                      <span>Trời mưa + Gió</span>
                    </button>
                  </div>

                  <div className="unified-atmo-tools">
                    <button
                      className="atmo-action-btn"
                      onClick={() => setShowMeasureGuide(true)}
                      type="button"
                      title="Xem quy chuẩn 5 bước đo cửa chính xác"
                    >
                      <Ruler size={12} />
                      <span>Cách đo cửa</span>
                    </button>
                    <button
                      className="atmo-action-btn"
                      onClick={() => viewer3dRef.current?.resetCamera()}
                      type="button"
                      title="Đặt lại góc nhìn chính diện"
                    >
                      <RotateCcw size={12} />
                      <span>Chính diện</span>
                    </button>
                  </div>
                </div>

                {/* CỘT PHẢI: Căn chỉnh rèm 3D */}
                <div className="unified-col unified-col-adjust">
                  <div className="unified-section-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Căn chỉnh rèm 3D</span>
                    <div className="adjuster-precision-segmented">
                      <button
                        type="button"
                        className={`prec-btn ${calibrationPrecision === 'fine' ? 'active' : ''}`}
                        onClick={() => setCalibrationPrecision('fine')}
                        title="Chỉnh tỉ mỉ 2%"
                      >
                        Tỉ mỉ 2%
                      </button>
                      <button
                        type="button"
                        className={`prec-btn ${calibrationPrecision === 'medium' ? 'active' : ''}`}
                        onClick={() => setCalibrationPrecision('medium')}
                        title="Chỉnh tiêu chuẩn 5%"
                      >
                        Chuẩn 5%
                      </button>
                      <button
                        type="button"
                        className={`prec-btn ${calibrationPrecision === 'coarse' ? 'active' : ''}`}
                        onClick={() => setCalibrationPrecision('coarse')}
                        title="Chỉnh nhanh 10%"
                      >
                        Nhanh 10%
                      </button>
                    </div>
                  </div>

                  <div className="adjuster-grid compact">
                    {/* 1. Window Presets */}
                    <div className="adjuster-row">
                      <span className="adjuster-row-label">Khớp cửa:</span>
                      <div className="adjuster-row-btns cols-3">
                        <button onClick={() => viewer3dRef.current?.setCurtainPosition(-0.88, 0)} title="Khớp vào cửa sổ bên trái ảnh" type="button">⇦ Cửa trái</button>
                        <button onClick={() => viewer3dRef.current?.setCurtainPosition(0, 0)} title="Khớp vào cửa sổ chính giữa ảnh" type="button">⦿ Cửa giữa</button>
                        <button onClick={() => viewer3dRef.current?.setCurtainPosition(0.88, 0)} title="Khớp vào cửa sổ bên phải ảnh" type="button">⇨ Cửa phải</button>
                      </div>
                    </div>

                    {/* 2. Position Offset */}
                    <div className="adjuster-row">
                      <span className="adjuster-row-label">Dời ({calibrationPrecision === 'fine' ? '±2cm' : calibrationPrecision === 'medium' ? '±4cm' : '±8cm'}):</span>
                      <div className="adjuster-row-btns cols-4">
                        <button onClick={() => viewer3dRef.current?.moveCurtain(-curtainMoveStep, 0)} title="Sang trái" type="button"><ArrowLeft size={10}/> Trái</button>
                        <button onClick={() => viewer3dRef.current?.moveCurtain(curtainMoveStep, 0)} title="Sang phải" type="button"><ArrowRight size={10}/> Phải</button>
                        <button onClick={() => viewer3dRef.current?.moveCurtain(0, curtainMoveStep)} title="Lên trên" type="button"><ArrowUp size={10}/> Lên</button>
                        <button onClick={() => viewer3dRef.current?.moveCurtain(0, -curtainMoveStep)} title="Xuống dưới" type="button"><ArrowDown size={10}/> Xuống</button>
                      </div>
                    </div>

                    {/* 3. Curtain Scale */}
                    <div className="adjuster-row">
                      <span className="adjuster-row-label">Cỡ rèm:</span>
                      <div className="adjuster-row-btns cols-4">
                        <button onClick={() => viewer3dRef.current?.scaleCurtain(curtainScaleStep, 0)} title="Rộng hơn" type="button">Rộng +</button>
                        <button onClick={() => viewer3dRef.current?.scaleCurtain(-curtainScaleStep, 0)} title="Hẹp hơn" type="button">Hẹp −</button>
                        <button onClick={() => viewer3dRef.current?.scaleCurtain(0, curtainScaleStep)} title="Dài hơn" type="button">Dài +</button>
                        <button onClick={() => viewer3dRef.current?.scaleCurtain(0, -curtainScaleStep)} title="Ngắn hơn" type="button">Ngắn −</button>
                      </div>
                    </div>

                    {/* 4. Room Photo Zoom & Reset */}
                    <div className="adjuster-row">
                      <span className="adjuster-row-label">Ảnh & ⟳:</span>
                      <div className="adjuster-row-btns cols-photo-reset">
                        <button onClick={() => viewer3dRef.current?.scalePhoto(-photoScaleStep)} title="Thu nhỏ ảnh căn phòng" type="button">Ảnh −</button>
                        <button onClick={() => viewer3dRef.current?.scalePhoto(photoScaleStep)} title="Phóng to ảnh căn phòng" type="button">Ảnh +</button>
                        <button className="adjuster-reset-btn" onClick={() => viewer3dRef.current?.resetCurtainTransform()} title="Khôi phục rèm về vị trí và kích thước ban đầu" type="button">
                          <RotateCcw size={10}/> Đặt lại
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3D Canvas with Floating Left Dock */}
          <div className="panel2-canvas-wrapper">
            <div className="panel2-zoom-dock">
              <button onClick={() => viewer3dRef.current?.zoomIn()} title="Phóng to">+</button>
              <button onClick={() => viewer3dRef.current?.zoomOut()} title="Thu nhỏ">−</button>
              <button onClick={() => viewer3dRef.current?.resetCamera()} title="Đặt lại góc nhìn">↺</button>
              <button onClick={() => setFullScreen(!fullScreen)} title="Toàn màn hình">⛶</button>
            </div>

            <div className="room-stage" style={{ height: '100%' }}>
              <RoomCurtain3DViewer
                ref={viewer3dRef}
                roomImage={roomImage}
                hasUploaded={hasUploaded}
                isAdjusting={showAdjuster}
                studioColor={studioColor}
                curtainType={currentType}
                activeFabricId={activeFabricId}
                fabricSample={currentFabric}
                isAnalyzing={analyzingState}
                aiDiagnosis={aiDiagnosis}
                openRatio={curtainOpenRatio}
                rainbowStripeMode={rainbowStripeMode}
                activeAtmosphere={activeAtmosphere}
                setActiveAtmosphere={setActiveAtmosphere}
                onConsultClick={() => navigateTo('contact')}
              />
            </div>
          </div>

          {/* KÉO XẾP LỚP DOCK: Curtain Open / Fold Action & Ratio Slider */}
          <div className="external-curtain-dock">
            <button
              className={'curtain-toggle-btn ' + (isCurtainOpen ? 'active' : '')}
              onClick={handleToggleCurtainOpen}
              title="Kéo mở hoặc đóng rèm"
              type="button"
            >
              <Eye size={13} />
              <span>{isCurtainOpen ? 'Đóng rèm' : 'Mở rèm'}</span>
            </button>

            <div className="slider-track-wrap">
              <label>Độ mở:</label>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.01"
                value={curtainOpenRatio}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                onChange={handleSliderChange}
              />
              <span className="ratio-badge">{Math.round(curtainOpenRatio * 100)}%</span>
            </div>

            {isRainbowCurtain && (
              <div className="rainbow-mode-switch">
                <button
                  type="button"
                  className={`rainbow-mode-btn ${rainbowStripeMode === 'sheer' ? 'active' : ''}`}
                  onClick={() => {
                    setRainbowStripeMode('sheer');
                    viewer3dRef.current?.setRainbowStripeMode?.('sheer');
                  }}
                  title="Chỉnh nan rèm trùng nhau để lấy sáng tự nhiên qua dải voan"
                >
                  <Sun size={12} />
                  <span>Lấy sáng (Trùng nan)</span>
                </button>
                <button
                  type="button"
                  className={`rainbow-mode-btn ${rainbowStripeMode === 'blackout' ? 'active' : ''}`}
                  onClick={() => {
                    setRainbowStripeMode('blackout');
                    viewer3dRef.current?.setRainbowStripeMode?.('blackout');
                  }}
                  title="Chỉnh nan rèm so le nhau để cản sáng 100% che kín riêng tư"
                >
                  <Moon size={12} />
                  <span>Che kín (So le nan)</span>
                </button>
              </div>
            )}
          </div>

          {/* Streamlined Bottom Control Bar matching Image 2 */}
          <div className="panel2-bottom-bar">
            <div className="panel2-ctrl-item">
              <span>Mẫu vải</span>
              <select
                className="panel2-ctrl-select"
                value={activeFabricId}
                onChange={(e) => {
                  const found = availableFabricSamples.find(f => f.id === e.target.value) || fabricSamples.find(f => f.id === e.target.value);
                  if (found) {
                    setActiveFabricId(found.id);
                    setStudioColor(found.defaultColor);
                    const matchingType = curtainTypes.find(ct => ct.id === found.id);
                    if (matchingType) {
                      chooseType(matchingType);
                    }
                  }
                }}
              >
                {availableFabricSamples.map(f => (
                  <option key={f.id} value={f.id}>{f.shortName || f.name}</option>
                ))}
              </select>
            </div>

            <div className="panel2-ctrl-item">
              <span>Màu sắc</span>
              <div className="panel2-swatches">
                {(currentFabric?.colors || []).map((col, idx) => {
                  const code = currentFabric?.colorCodes?.[idx];
                  const cName = currentFabric?.colorNames?.[idx];
                  const label = code && cName ? `${code} - ${cName}` : getCurtainColorName(col);
                  return (
                    <button
                      key={col + idx}
                      type="button"
                      className={`panel2-swatch-circle ${studioColor === col ? 'selected' : ''}`}
                      style={{ backgroundColor: col }}
                      onClick={() => setStudioColor(col)}
                      title={label}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Panel 3: AI Recommendations */}
        <aside className="recommend-panel glass-panel">
          <div>
            <div className="panel3-header">
              <h2>
                <Star size={16} fill="#E2A96A" color="#E2A96A" />
                <span>Gợi ý loại rèm</span>
              </h2>
              <button
                type="button"
                className="icon-button"
                style={{ width: '28px', height: '28px' }}
                onClick={() => setShowAdjuster(!showAdjuster)}
                title="Căn chỉnh chi tiết"
              >
                <Sliders size={14} color="#64748B" />
              </button>
            </div>

            <div className="panel3-tabs">
              {studioStyleFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`panel3-tab-btn ${activeStudioFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveStudioFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="panel3-card-list">
              {paginatedCurtainTypes.map((item) => {
                const isSelected = activeType === item.id;
                return (
                  <div
                    key={item.id}
                    className={`panel3-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      chooseType(item);
                      setCurtainOpenRatio(0.0);
                      setIsCurtainOpen(false);
                      setMobileActiveTab('preview');
                    }}
                  >
                    <div className="panel3-card-thumb">
                      <img src={item.thumb} alt={item.name} onError={(e) => { e.target.src = '/assets/curtains/curtain-single-pleat.jpg'; }} />
                    </div>
                    <div className="panel3-card-info">
                      <strong>{item.name}</strong>
                      <small>{item.desc}</small>
                      {item.priceDisplay ? <div className="panel3-card-price">{item.priceDisplay}</div> : null}
                    </div>
                    <button
                      type="button"
                      className={`panel3-card-btn ${isSelected ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        chooseType(item);
                        setCurtainOpenRatio(0.0);
                        setIsCurtainOpen(false);
                        setMobileActiveTab('preview');
                      }}
                    >
                      {isSelected ? 'Đã chọn' : 'Chọn'}
                    </button>
                  </div>
                );
              })}
            </div>

            {totalCurtainPages > 1 && (
              <div className="panel3-pagination">
                <button
                  type="button"
                  className="panel3-page-btn nav-btn"
                  disabled={curtainPage === 1}
                  onClick={() => setCurtainPage((p) => Math.max(1, p - 1))}
                  title="Trang trước"
                >
                  <ChevronLeft size={14} />
                </button>

                <div className="panel3-page-numbers">
                  {Array.from({ length: totalCurtainPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      className={`panel3-page-btn num-btn ${curtainPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurtainPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="panel3-page-btn nav-btn"
                  disabled={curtainPage === totalCurtainPages}
                  onClick={() => setCurtainPage((p) => Math.min(totalCurtainPages, p + 1))}
                  title="Trang sau"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          <a
            href="#products"
            className="panel3-view-more"
            onClick={(e) => {
              e.preventDefault();
              if (navigateTo) navigateTo('products');
            }}
          >
            Xem thêm sản phẩm →
          </a>
        </aside>
      </section>

      {/* =========================================================================
          QUESTIONNAIRE & 20-SECOND AI SCANNER MODAL
          ========================================================================= */}
      {surveyModalOpen && (
        <div className="studio-survey-overlay" onClick={() => !isScanning && setSurveyModalOpen(false)}>
          <div className="studio-survey-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="survey-modal-header">
              <div className="survey-modal-title">
                <Sparkles size={18} color="#c8a87d" />
                <h3>{isScanning ? 'AI Đang Phân Tích & Nhận Diện Không Gian...' : 'Khảo Sát Khung Cửa Để AI Gợi Ý Chuẩn Xác'}</h3>
              </div>
              {!isScanning && (
                <button
                  type="button"
                  className="survey-close-btn"
                  onClick={() => setSurveyModalOpen(false)}
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="survey-modal-body">
              {!isScanning ? (
                /* STEP 1: QUESTIONNAIRE FORM (LANDSCAPE RECTANGULAR LAYOUT) */
                <div className="survey-form-content">
                  {/* LEFT COLUMN: ROOM PHOTO PREVIEW & DYNAMIC PRICE ESTIMATE */}
                  <div className="survey-form-left-col">
                    <div className="survey-preview-thumb">
                      <img src={pendingImage || roomImage} alt="Ảnh phòng khảo sát" />
                      <span className="survey-photo-tag">Ảnh phòng của bạn</span>
                    </div>

                    {/* Dynamic Price Estimate Highlight Box */}
                    {(() => {
                      const priceInfo = getEstimatedPriceInfo(surveyAnswers);
                      return (
                        <div className="survey-price-estimate-card">
                          <div className="estimate-header">
                            <div className="estimate-label">
                              <Tag size={14} color="#8b6b3e" />
                              <span>MỨC GIÁ GỢI Ý DỰ KIẾN:</span>
                            </div>
                            <div className="estimate-price-value">
                              <strong>{priceInfo.range}</strong>
                              <small>/{priceInfo.unit}</small>
                            </div>
                          </div>
                          <p className="estimate-note">
                            ✨ {priceInfo.desc}
                          </p>
                          <div className="estimate-included-perks">
                            <span>✓ Miễn phí khảo sát & may đo</span>
                            <span>✓ Trọn bộ ray & phụ kiện</span>
                            <span>✓ Bảo hành chính hãng 5 năm</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* RIGHT COLUMN: SURVEY QUESTIONS & ACTION BUTTON */}
                  <div className="survey-form-right-col">
                    {/* Question 1: Vị trí không gian (Chỉ trong nhà) */}
                    <div className="survey-question-group">
                      <label className="question-title">
                        <span className="q-num">1</span>
                        Vị trí không gian lắp đặt:
                      </label>
                      <div className="question-options-single">
                        <button
                          type="button"
                          className="q-opt-btn selected"
                          style={{ width: '100%', cursor: 'default' }}
                        >
                          <span className="opt-emoji">🏠</span>
                          <div className="opt-text">
                            <strong>Trong nhà</strong>
                            <small>Phòng khách, phòng ngủ, phòng làm việc, căn hộ & biệt thự</small>
                          </div>
                          <Check size={16} className="opt-check" />
                        </button>
                      </div>
                    </div>

                    {/* Question 2: Loại cửa */}
                    <div className="survey-question-group">
                      <label className="question-title">
                        <span className="q-num">2</span>
                        Loại khung cửa:
                      </label>
                      <div className="question-options-row">
                        <button
                          type="button"
                          className={'q-opt-btn ' + (surveyAnswers.doorType === 'window' ? 'selected' : '')}
                          onClick={() => setSurveyAnswers(prev => ({ ...prev, doorType: 'window' }))}
                        >
                          <span className="opt-emoji">🪟</span>
                          <div className="opt-text">
                            <strong>Cửa sổ</strong>
                            <small>Khung cửa sổ phòng</small>
                          </div>
                          {surveyAnswers.doorType === 'window' && <Check size={16} className="opt-check" />}
                        </button>

                        <button
                          type="button"
                          className={'q-opt-btn ' + (surveyAnswers.doorType === 'main' ? 'selected' : '')}
                          onClick={() => setSurveyAnswers(prev => ({ ...prev, doorType: 'main' }))}
                        >
                          <span className="opt-emoji">🚪</span>
                          <div className="opt-text">
                            <strong>Cửa chính / Cửa đi</strong>
                            <small>Cửa ra vào, đại sảnh, vách lớn</small>
                          </div>
                          {surveyAnswers.doorType === 'main' && <Check size={16} className="opt-check" />}
                        </button>
                      </div>
                    </div>

                    {/* Question 3: Gợi ý mức giá & Ngân sách mong muốn */}
                    <div className="survey-question-group">
                      <label className="question-title">
                        <span className="q-num">3</span>
                        Gợi ý mức giá & Ngân sách dự kiến:
                      </label>
                      <div className="question-options-grid-budget">
                        <button
                          type="button"
                          className={'q-opt-btn q-opt-budget ' + (surveyAnswers.budget === 'economy' ? 'selected' : '')}
                          onClick={() => setSurveyAnswers(prev => ({ ...prev, budget: 'economy' }))}
                        >
                          <span className="opt-emoji">🏷️</span>
                          <div className="opt-text">
                            <strong>Tiết kiệm</strong>
                            <small>&lt; 1.5 triệu / bộ</small>
                          </div>
                          {surveyAnswers.budget === 'economy' && <Check size={14} className="opt-check" />}
                        </button>

                        <button
                          type="button"
                          className={'q-opt-btn q-opt-budget ' + (surveyAnswers.budget === 'standard' ? 'selected' : '')}
                          onClick={() => setSurveyAnswers(prev => ({ ...prev, budget: 'standard' }))}
                        >
                          <span className="opt-emoji">💎</span>
                          <div className="opt-text">
                            <strong>Tiêu chuẩn</strong>
                            <small>1.5 - 3.5 triệu</small>
                          </div>
                          {surveyAnswers.budget === 'standard' && <Check size={14} className="opt-check" />}
                        </button>

                        <button
                          type="button"
                          className={'q-opt-btn q-opt-budget ' + (surveyAnswers.budget === 'luxury' ? 'selected' : '')}
                          onClick={() => setSurveyAnswers(prev => ({ ...prev, budget: 'luxury' }))}
                        >
                          <span className="opt-emoji">👑</span>
                          <div className="opt-text">
                            <strong>Cao cấp</strong>
                            <small>&gt; 3.5 triệu / bộ</small>
                          </div>
                          {surveyAnswers.budget === 'luxury' && <Check size={14} className="opt-check" />}
                        </button>

                        <button
                          type="button"
                          className={'q-opt-btn q-opt-budget ' + (surveyAnswers.budget === 'all' ? 'selected' : '')}
                          onClick={() => setSurveyAnswers(prev => ({ ...prev, budget: 'all' }))}
                        >
                          <span className="opt-emoji">✨</span>
                          <div className="opt-text">
                            <strong>Tất cả mức giá</strong>
                            <small>Xem toàn bộ</small>
                          </div>
                          {surveyAnswers.budget === 'all' && <Check size={14} className="opt-check" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm & Start AI Recognition Button */}
                    <div className="survey-actions-bar">
                      <button
                        type="button"
                        className="start-scan-btn"
                        onClick={handleStartScan}
                      >
                        <Zap size={18} />
                        <span>Xem đề xuất rèm 3D phù hợp</span>
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* STEP 2: HIGH-TECH AI SCANNER SCREEN */
                <div className="survey-scanner-content">
                  {/* Photo with Scanning Laser Animation */}
                  <div className="scanner-visual-stage">
                    <img src={pendingImage || roomImage} alt="Quét ảnh phòng" className="scanner-target-photo" />
                    
                    {/* Glowing Laser Beam */}
                    <div className="scanner-laser-line" />
                    
                    {/* AR Bounding Box Overlays */}
                    <div className="scanner-ar-box">
                      <span className="corner top-left" />
                      <span className="corner top-right" />
                      <span className="corner bottom-left" />
                      <span className="corner bottom-right" />
                      <div className="ar-box-tag">
                        <span>DETECTION: {surveyAnswers.doorType === 'window' ? 'WINDOW' : 'MAIN_DOOR'}</span>
                        <span>ENV: INDOOR</span>
                      </div>
                    </div>
                  </div>

                  {/* High-Tech 20s AI Recognition Status Card */}
                  <div className="scanner-status-card">
                    <div className="scanner-timer-header">
                      <div className="timer-badge">
                        <Scan size={18} className="spin-slow" />
                        <span>AI ĐANG PHÂN TÍCH & NHẬN DIỆN KHÔNG GIAN...</span>
                      </div>
                    </div>

                    <div className="scanner-progress-track">
                      <div className="scanner-progress-fill scanning-animated" />
                    </div>

                    <div className="scanner-phase-info">
                      <Sparkles size={16} color="#c8a87d" />
                      <p>{SCAN_PHASES[scanPhaseIndex]}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WINDOW MEASUREMENT GUIDE MODAL */}
      <WindowMeasurementGuideModal
        isOpen={showMeasureGuide}
        onClose={() => setShowMeasureGuide(false)}
        onConsult={() => {
          setShowMeasureGuide(false);
          if (navigateTo) navigateTo('contact');
        }}
      />

      <UnifiedFooter navigateTo={navigateTo} />
    </div>
  );
}

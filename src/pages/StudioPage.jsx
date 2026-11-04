import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import { StudioIcon } from '../components/ui/Icons';
import { curtainTypes, studioStyleFilters } from '../data/studioData';
import { RoomCurtain3DViewer } from '../components/studio/RoomCurtain3DViewer';
import { analyzeRoomPhoto, determineCurtainRecommendations } from '../utils/aiRoomAnalyzer';
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
  Palette
} from 'lucide-react';

const CURTAIN_COLOR_NAMES = {
  // roman-linen
  '#dfd7c8': 'Kem Linen tự nhiên',
  '#c8bcae': 'Cát ấm mộc mạc',
  '#a89f91': 'Be sẫm tân cổ điển',
  '#f0ece3': 'Trắng ngà Slub',
  '#7d7263': 'Xám tro Rustic',
  // honeycomb
  '#c8beaf': 'Be nhạt thanh lịch',
  '#b5ab9e': 'Be ấm cách nhiệt',
  '#ded8cf': 'Kem sáng Pastel',
  '#8c8275': 'Nâu trầm Bắc Âu',
  '#5c544b': 'Cà phê ấm áp',
  // pvc-tarpaulin
  '#1a56b7': 'Xanh dương sọc trắng',
  '#1b5e3b': 'Xanh rêu ban công',
  '#4b5563': 'Xám than hiện đại',
  '#c25827': 'Cam đất nung',
  '#10223e': 'Xanh Navy bảo vệ',
  // roller-linen
  '#dfd5c4': 'Kem mộc Linen',
  '#f4f0e8': 'Trắng sứ tự nhiên',
  '#c8c0b2': 'Cát xám thanh nhã',
  '#9b8d7e': 'Nâu tây cản sáng',
  '#9ca899': 'Xanh Sage dịu mát',
  '#4a443e': 'Nâu đen tối giản',
  // single-pleat
  '#9fa4a9': 'Xám bạc thanh lịch',
  '#767c82': 'Xám trung tính',
  '#b4b9bf': 'Xám ngọc trai',
  '#61666b': 'Xám than chì',
  '#c5beb5': 'Be cát mềm mại',
  '#6f7a85': 'Xanh xám hiện đại',
  '#383b3e': 'Đen than huyền bí',
  // sfold-luxury
  '#d5cbbe': 'Kem cát S-Fold',
  '#e4ded5': 'Trắng ngà sang trọng',
  '#c2b4a3': 'Be vàng hoàng gia',
  '#a89986': 'Nâu be quý phái',
  '#877867': 'Nâu trầm ấm cúng',
  // leaf-embroidery
  '#7e7065': 'Nâu xám thêu lá',
  '#8f8074': 'Be sẫm dệt thoi',
  '#6b6057': 'Nâu tro cổ điển',
  '#9e8e81': 'Xám ấm tinh tế',
  '#544c45': 'Nâu hạt dẻ',
  '#cfc4b8': 'Kem nhạt Slub',
  '#a89a8c': 'Cát mộc Slub',
  // art prints
  '#ffffff': 'Trắng in tranh 3D'
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
  const [calibrationPrecision, setCalibrationPrecision] = useState('fine'); // 'fine' (2%) | 'medium' (5%) | 'coarse' (10%)

  useEffect(() => {
    // Ensure stepper starts scrolled fully to the left so Step 1 icon is never clipped on mobile
    if (stepperRef.current) {
      stepperRef.current.scrollLeft = 0;
    }
  }, []);

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
    windowPanels: 'single' // 'single' | '3' | '4'
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
      if (activeStudioFilter === 'Rèm Cuốn') return t.isRollerLinen || t.id === 'roller-linen';
      if (activeStudioFilter === 'Rèm Roman') return t.isRoman;
      if (activeStudioFilter === 'Rèm Tổ Ong') return t.id === 'honeycomb';
      if (activeStudioFilter === 'Rèm Tranh') return t.isRoller && !t.isRollerLinen;
      if (activeStudioFilter === 'Rèm Nhựa PVC') return t.isPvc;
      if (activeStudioFilter === 'Rèm 1 Lớp') return t.id === 'single-pleat' || t.isHoneycomb;
      if (activeStudioFilter === 'Khách sạn 5 Sao') return t.id === 'sfold-luxury' || t.id === 'leaf-embroidery';
      return true;
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

  const handleToggleCurtainOpen = () => {
    const next = !isCurtainOpen;
    setIsCurtainOpen(next);
    setCurtainOpenRatio(next ? 1.0 : 0.0);
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
      if (diagnosis.primaryColor) {
        setStudioColor(diagnosis.primaryColor);
      }
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

      {/* Intro & Stepper */}
      <section className="studio-intro" id="top">
        <div className="studio-intro-copy">
          <div className="kicker">AI 3D STUDIO <span /></div>
          <h1>Trải nghiệm phòng 3D<br/>tương tác thời gian thực<br/><em>AI Studio Siêu Thực</em></h1>
          <p>Tải lên ảnh căn phòng của bạn. AI sẽ khảo sát khung cửa, nhận diện thông minh và trực tiếp ướm rèm 3D vào khung cửa với mô phỏng ánh sáng, gió và chuyển động chân thực.</p>
        </div>
        <div className="stepper" ref={stepperRef} aria-label="Quy trình 4 bước">
          {[
            ['image', '1', 'Tải ảnh phòng'],
            ['sparkle', '2', 'AI Nhận diện'],
            ['cube', '3', 'Không gian 3D'],
            ['grid', '4', 'Cân chỉnh rèm'],
          ].map(([icon, n, label], i) => (
            <React.Fragment key={n}>
              <div className={'step ' + (analyzed ? 'step-done' : i === 0 ? 'step-active' : '')}>
                <span className="step-icon"><StudioIcon name={icon} size={22} /></span>
                <span className="step-text"><b>{n}</b><small>{label}</small></span>
              </div>
              {i < 3 && <span className="step-chevron">›</span>}
            </React.Fragment>
          ))}
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
          <span>Mẫu rèm ({curtainTypes?.length || 11})</span>
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
          <div className="panel-heading">
            <div>
              <span className="panel-step">01 / YOUR SPACE</span>
              <h2>Tải ảnh căn phòng của bạn</h2>
            </div>
            {hasUploaded && (
              <button
                className="icon-button"
                onClick={() => {
                  setRoomImage('/assets/studio-room.png');
                  setHasUploaded(false);
                  setAnalyzed(false);
                  const resetDiag = determineCurtainRecommendations({ doorType: 'window', location: 'indoor', windowPanels: 'single' });
                  setAiDiagnosis(resetDiag);
                }}
                aria-label="Đặt lại ảnh"
                title="Khôi phục ảnh mẫu"
              >
                <StudioIcon name="rotate" size={17} />
              </button>
            )}
          </div>
          <p className="panel-description">Chụp bằng điện thoại hoặc tải ảnh phòng lên. AI sẽ khảo sát loại cửa, vị trí để gợi ý các mẫu rèm chuẩn xác.</p>

          <div
            className={'dropzone ' + (dragging ? 'dragging' : '')}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handlePhotoSelected(e.dataTransfer.files?.[0]); }}
          >
            <span className="upload-illustration"><StudioIcon name="image" size={34} /><i>+</i></span>
            <strong>Kéo thả ảnh phòng vào đây</strong>
            <span className="or">Hoặc</span>
            <div className="upload-actions">
              <button
                className="button button-dark"
                type="button"
                onClick={() => {
                  if (cameraInputRef.current) {
                    cameraInputRef.current.click();
                  }
                }}
              >
                <Camera size={17} /> Chụp ảnh
              </button>
              <button
                className="button button-light"
                type="button"
                onClick={() => {
                  if (galleryInputRef.current) {
                    galleryInputRef.current.click();
                  }
                }}
              >
                <Upload size={17} /> Tải ảnh lên
              </button>

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
            </div>
            <small>Hỗ trợ JPG, PNG, WEBP · Khảo sát & AI nhận diện</small>
          </div>

          <div className="tips-title" style={{ marginTop: '14px', marginBottom: '8px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted, #8c827a)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Click thử nhanh với phòng mẫu 3D:
          </div>
          <div className="tips-grid">
            <div 
              style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => handleOpenSurveyForPreset('/assets/living-room.jpg')}
              title="Khảo sát & nhận diện phòng khách"
            >
              <img src="/assets/tip-window.jpg" alt="Phòng khách" />
              <span><i><StudioIcon name="check" size={11} /></i>Phòng khách</span>
            </div>
            <div 
              style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => handleOpenSurveyForPreset('/assets/bedroom.jpg')}
              title="Khảo sát & nhận diện phòng ngủ"
            >
              <img src="/assets/tip-light.jpg" alt="Phòng ngủ" />
              <span><i><StudioIcon name="check" size={11} /></i>Phòng ngủ</span>
            </div>
            <div 
              style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => handleOpenSurveyForPreset('/assets/studio-room.png')}
              title="Khảo sát & nhận diện studio mẫu"
            >
              <img src="/assets/tip-angle.jpg" alt="Studio tối giản" />
              <span><i><StudioIcon name="check" size={11} /></i>Studio mẫu</span>
            </div>
          </div>

          

          {aiDiagnosis && (
            <div className="analysis-summary-box">
              <div className="summary-badge" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="#d4a373" />
                  <span>AI ĐÃ PHÂN TÍCH XONG</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPendingImage(roomImage);
                    setSurveyModalOpen(true);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '11px',
                    color: '#8b6b3e',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Thay đổi lựa chọn khảo sát"
                >
                  <Sliders size={12} />
                  <span>Khảo sát lại</span>
                </button>
              </div>
              
              <div className="summary-item">
                <span className="lbl">Không gian:</span>
                <strong>{aiDiagnosis.spaceTypeLabel || 'Trong nhà'}</strong>
              </div>

              <div className="summary-item">
                <span className="lbl">Loại cửa:</span>
                <strong>{aiDiagnosis.doorTypeLabel || 'Cửa sổ đơn'}</strong>
              </div>

              <div className="summary-item">
                <span className="lbl">Đề xuất:</span>
                <span style={{ fontSize: '11px', color: '#8b6b3e', fontWeight: 600 }}>{aiDiagnosis.caseTitle}</span>
              </div>

              <div className="recommended-chips-wrapper" style={{ marginTop: '8px' }}>
                <span className="lbl" style={{ display: 'block', fontSize: '10.5px', marginBottom: '4px' }}>Các mẫu rèm AI gợi ý:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {aiDiagnosis.recommendedTypeIds?.map((recId) => {
                    const found = curtainTypes.find(c => c.id === recId);
                    if (!found) return null;
                    const isActive = activeType === found.id;
                    return (
                      <button
                        key={recId}
                        type="button"
                        onClick={() => {
                          chooseType(found);
                          setMobileActiveTab('preview');
                        }}
                        style={{
                          fontSize: '10.5px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: isActive ? '1px solid #8b6b3e' : '1px solid #d4c7b8',
                          background: isActive ? '#f4ece1' : '#ffffff',
                          color: isActive ? '#653d12' : '#334155',
                          fontWeight: isActive ? 700 : 500,
                          cursor: 'pointer'
                        }}
                        title="Click để áp dụng mẫu rèm này vào phòng 3D"
                      >
                        {found.name.split(' ')[0]} {found.name.split(' ')[1] || ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Panel 2: Pure 3D Interactive Visualization */}
        <section className={'preview-panel glass-panel ' + (fullScreen ? 'preview-fullscreen' : '')} aria-label="Kết quả mô phỏng">
          <div className="preview-header">
            <div>
              <span className="panel-step">02 / VISUALIZATION</span>
              <h2>Không gian 3D tương tác</h2>
            </div>
            <span className="status-pill status-ready">
              <i />3D WebGL Active
            </span>
            <button
              className="icon-button"
              onClick={() => {
                setPendingImage(roomImage);
                setSurveyModalOpen(true);
              }}
              aria-label="Phân tích lại ảnh"
              title="Khảo sát & nhận diện lại khung cửa"
            >
              <StudioIcon name="rotate" size={17} />
            </button>
          </div>

          {/* EXTERNAL 3D ATMOSPHERE & ENVIRONMENT TOOLBAR */}
          <div className="studio-3d-external-toolbar">
            <div className="external-toolbar-left">
              <span className="atmo-toolbar-label">MÔ PHỎNG ÁNH SÁNG & THỜI TIẾT:</span>
              <div className="external-atmo-group">
                <button
                  className={'atmo-pill-btn ' + (activeAtmosphere === 'morning' ? 'active' : '')}
                  onClick={() => setActiveAtmosphere('morning')}
                  type="button"
                  title="Ánh sáng ban mai nhẹ nhàng"
                >
                  <Sunrise size={14} color="#ff9e3b" />
                  <span>Sáng sớm</span>
                </button>
                <button
                  className={'atmo-pill-btn ' + (activeAtmosphere === 'noon' ? 'active' : '')}
                  onClick={() => setActiveAtmosphere('noon')}
                  type="button"
                  title="Ánh sáng trưa rực rỡ & cản sáng"
                >
                  <Sun size={14} color="#f4b400" />
                  <span>Trưa nắng</span>
                </button>
                <button
                  className={'atmo-pill-btn ' + (activeAtmosphere === 'sunset' ? 'active' : '')}
                  onClick={() => setActiveAtmosphere('sunset')}
                  type="button"
                  title="Hoàng hôn vàng hổ phách"
                >
                  <Sunset size={14} color="#f25c3b" />
                  <span>Hoàng hôn</span>
                </button>
                <button
                  className={'atmo-pill-btn ' + (activeAtmosphere === 'night' ? 'active' : '')}
                  onClick={() => setActiveAtmosphere('night')}
                  type="button"
                  title="Ban tối ấm áp với đèn LED hắt trần"
                >
                  <Moon size={14} color="#7ba4d5" />
                  <span>Ban tối</span>
                </button>
                <button
                  className={'atmo-pill-btn ' + (activeAtmosphere === 'rain' ? 'active' : '')}
                  onClick={() => setActiveAtmosphere('rain')}
                  type="button"
                  title="Trời mưa rả rích kèm gió lay rèm"
                >
                  <CloudRain size={14} color="#89b2c9" />
                  <span>Trời mưa + Gió</span>
                </button>
              </div>
            </div>

            <div className="external-toolbar-right">
              <button
                className="atmo-action-btn"
                onClick={() => viewer3dRef.current?.resetCamera()}
                type="button"
                title="Đặt lại góc nhìn chính diện"
              >
                <RotateCcw size={13} />
                <span>Chính diện</span>
              </button>
              <button
                className={'atmo-action-btn ' + (showAdjuster ? 'active' : '')}
                onClick={() => setShowAdjuster(!showAdjuster)}
                type="button"
                title="Căn chỉnh vị trí & kích thước rèm khớp khung cửa"
              >
                <Sliders size={13} />
                <span>Căn chỉnh rèm</span>
              </button>
            </div>
          </div>

          {/* External Window Fit Calibration Drawer */}
          {showAdjuster && (
            <div className="external-adjuster-panel">
              <div className="adjuster-header">
                <div className="adjuster-header-left">
                  <span className="adjuster-title">⚡ Căn chỉnh rèm 3D</span>
                </div>
                <div className="adjuster-precision-segmented">
                  <button
                    type="button"
                    className={'prec-btn ' + (calibrationPrecision === 'fine' ? 'active' : '')}
                    onClick={() => setCalibrationPrecision('fine')}
                    title="Bước nhảy siêu tỉ mỉ 2% (khớp chuẩn từng cm)"
                  >
                    🎯 Tỉ mỉ 2%
                  </button>
                  <button
                    type="button"
                    className={'prec-btn ' + (calibrationPrecision === 'medium' ? 'active' : '')}
                    onClick={() => setCalibrationPrecision('medium')}
                    title="Bước nhảy vừa phải 5%"
                  >
                    ⚖️ Vừa 5%
                  </button>
                  <button
                    type="button"
                    className={'prec-btn ' + (calibrationPrecision === 'coarse' ? 'active' : '')}
                    onClick={() => setCalibrationPrecision('coarse')}
                    title="Bước nhảy nhanh 10%"
                  >
                    ⏩ Nhanh 10%
                  </button>
                </div>
                <button className="adjuster-close" onClick={() => setShowAdjuster(false)} type="button">✕</button>
              </div>

              <div className="adjuster-grid">
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
                    <button onClick={() => viewer3dRef.current?.moveCurtain(-curtainMoveStep, 0)} title="Sang trái" type="button"><ArrowLeft size={11}/> Trái</button>
                    <button onClick={() => viewer3dRef.current?.moveCurtain(curtainMoveStep, 0)} title="Sang phải" type="button"><ArrowRight size={11}/> Phải</button>
                    <button onClick={() => viewer3dRef.current?.moveCurtain(0, curtainMoveStep)} title="Lên trên" type="button"><ArrowUp size={11}/> Lên</button>
                    <button onClick={() => viewer3dRef.current?.moveCurtain(0, -curtainMoveStep)} title="Xuống dưới" type="button"><ArrowDown size={11}/> Xuống</button>
                  </div>
                </div>

                {/* 3. Curtain Scale */}
                <div className="adjuster-row">
                  <span className="adjuster-row-label">Cỡ rèm:</span>
                  <div className="adjuster-row-btns cols-4">
                    <button onClick={() => viewer3dRef.current?.scaleCurtain(curtainScaleStep, 0)} title="Rộng hơn" type="button">Rộng +</button>
                    <button onClick={() => viewer3dRef.current?.scaleCurtain(-curtainScaleStep, 0)} title="Hẹp hơn" type="button">Hẹp -</button>
                    <button onClick={() => viewer3dRef.current?.scaleCurtain(0, curtainScaleStep)} title="Dài hơn" type="button">Dài +</button>
                    <button onClick={() => viewer3dRef.current?.scaleCurtain(0, -curtainScaleStep)} title="Ngắn hơn" type="button">Ngắn -</button>
                  </div>
                </div>

                {/* 4. Room Photo Zoom & Reset in 1 combined tidy row */}
                <div className="adjuster-row">
                  <span className="adjuster-row-label">Ảnh & ⟳:</span>
                  <div className="adjuster-row-btns cols-photo-reset">
                    <button onClick={() => viewer3dRef.current?.scalePhoto(-photoScaleStep)} title="Thu nhỏ ảnh căn phòng" type="button">Ảnh -</button>
                    <button onClick={() => viewer3dRef.current?.scalePhoto(photoScaleStep)} title="Phóng to ảnh căn phòng" type="button">Ảnh +</button>
                    <button className="adjuster-reset-btn" onClick={() => viewer3dRef.current?.resetCurtainTransform()} title="Khôi phục rèm về vị trí và kích thước ban đầu" type="button">
                      <RotateCcw size={11}/> Đặt lại
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="room-stage">
            <RoomCurtain3DViewer
              ref={viewer3dRef}
              roomImage={roomImage}
              hasUploaded={hasUploaded}
              isAdjusting={showAdjuster}
              studioColor={studioColor}
              curtainType={currentType}
              isAnalyzing={analyzingState}
              aiDiagnosis={aiDiagnosis}
              openRatio={curtainOpenRatio}
              activeAtmosphere={activeAtmosphere}
              setActiveAtmosphere={setActiveAtmosphere}
              onConsultClick={() => navigateTo('contact')}
            />
          </div>

          {/* Interactive Curtain Fabric Color Palette */}
          {currentType?.colors && currentType.colors.length > 0 && (
            <div className="studio-curtain-color-dock">
              <div className="color-dock-info">
                <Palette size={13} color="#c8a87d" />
                <span className="color-dock-title">Màu rèm:</span>
                <strong className="color-dock-active-name">{getCurtainColorName(studioColor)}</strong>
              </div>
              <div className="color-dock-swatches">
                {currentType.colors.map((c, idx) => {
                  const isActive = studioColor?.toLowerCase() === c.toLowerCase();
                  return (
                    <button
                      key={c + idx}
                      type="button"
                      className={'studio-swatch-btn ' + (isActive ? 'active' : '')}
                      style={{ backgroundColor: c }}
                      onClick={() => setStudioColor(c)}
                      title={`Chọn màu: ${getCurtainColorName(c)} (${c})`}
                      aria-label={`Chọn màu ${getCurtainColorName(c)}`}
                    >
                      {isActive && <Check size={11} color={isLightColorHex(c) ? '#1a1816' : '#ffffff'} strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="viewer-controls">
            {/* 3D Curtain Action Dock */}
            <div className="external-curtain-dock">
              <button
                className={'curtain-toggle-btn ' + (isCurtainOpen ? 'active' : '')}
                onClick={handleToggleCurtainOpen}
                title="Kéo mở hoặc đóng rèm"
                type="button"
              >
                <Eye size={15} />
                <span>{currentType?.isRoman ? (isCurtainOpen ? 'Hạ rèm xuống' : 'Kéo xếp lớp Roman') : currentType?.isHoneycomb ? (isCurtainOpen ? 'Hạ rèm xuống' : 'Kéo xếp rèm lên') : currentType?.isPvc ? (isCurtainOpen ? 'Hạ bạt xuống' : 'Cuộn bạt lên') : currentType?.isRoller ? (isCurtainOpen ? 'Hạ rèm xuống' : 'Cuộn rèm lên') : (isCurtainOpen ? 'Đóng rèm' : 'Mở rèm 3D')}</span>
              </button>

              <div className="slider-track-wrap">
                <label>{currentType?.isRoman ? 'Độ xếp lớp:' : currentType?.isHoneycomb ? 'Độ kéo xếp:' : currentType?.isPvc ? 'Độ cuộn bạt:' : currentType?.isRoller ? 'Độ cuộn:' : 'Độ mở:'}</label>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.01"
                  value={curtainOpenRatio}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setCurtainOpenRatio(val);
                    setIsCurtainOpen(val > 0.35);
                  }}
                />
                <span className="ratio-percent">{Math.round(curtainOpenRatio * 100)}%</span>
              </div>
            </div>

            <span className="control-divider" />

            {/* 3D Camera Controls */}
            <div className="camera-view-actions">
              <button
                onClick={() => viewer3dRef.current?.rotate()}
                title="Xoay góc nhìn 3D"
                type="button"
              >
                <StudioIcon name="rotate" size={15} /> Xoay 3D
              </button>
              <button
                onClick={() => viewer3dRef.current?.zoomIn()}
                title="Phóng to không gian (Zoom In)"
                type="button"
              >
                <ZoomIn size={15} /> Phóng to
              </button>
              <button
                onClick={() => viewer3dRef.current?.zoomOut()}
                title="Thu nhỏ không gian (Zoom Out)"
                type="button"
              >
                <ZoomOut size={15} /> Thu nhỏ
              </button>
              <button
                onClick={() => setFullScreen(!fullScreen)}
                title={fullScreen ? 'Thoát toàn màn hình' : 'Mở rộng toàn màn hình'}
                type="button"
              >
                <StudioIcon name="expand" size={15} /> {fullScreen ? 'Thu gọn' : 'Toàn màn hình'}
              </button>
            </div>
          </div>

          {/* Mobile In-Studio Quick Action Buttons */}
          <div className="mobile-studio-quick-nav">
            <button
              type="button"
              className="mobile-quick-btn curtains"
              onClick={() => setMobileActiveTab('curtains')}
            >
              <Layers size={15} />
              <span>Đổi mẫu rèm ({curtainTypes?.length || 11} mẫu)</span>
            </button>
            <button
              type="button"
              className="mobile-quick-btn upload"
              onClick={() => setMobileActiveTab('upload')}
            >
              <StudioIcon name="image" size={15} />
              <span>Đổi ảnh căn phòng</span>
            </button>
          </div>
        </section>

        {/* Panel 3: AI Recommendations */}
        <aside className="recommend-panel glass-panel">
          <div className="recommend-heading">
            <div>
              <span className="panel-step">03 / AI RECOMMENDATIONS</span>
              <h2>Mẫu rèm phù hợp nhất</h2>
            </div>
            <span className="recommend-count">{aiDiagnosis?.recommendedTypeIds?.length || 4}</span>
          </div>

          {/* AI Reasoning Widget in Panel 3 */}
          {aiDiagnosis && (
            <div className="ai-diagnostic-pill">
              <div className="diag-header">
                <Sparkles size={15} color="#c9a473" />
                <strong>{aiDiagnosis.caseTitle || 'Gợi ý từ Chuyên gia AI:'}</strong>
              </div>
              <p>{aiDiagnosis.aiReason}</p>
              <div className="diag-tags">
                {aiDiagnosis.tags?.map((t) => (
                  <span key={t} className="tag">✓ {t}</span>
                ))}
              </div>
            </div>
          )}

          <div className="filter-tabs">
            {studioStyleFilters.map((filter) => (
              <button
                key={filter}
                className={activeStudioFilter === filter ? 'selected' : ''}
                onClick={() => setActiveStudioFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="recommend-list">
            {paginatedCurtainTypes.map((type) => {
              const isRecommended = aiDiagnosis?.recommendedTypeIds?.includes(type.id);
              return (
                <button
                  className={'recommend-card ' + (activeType === type.id ? 'active ' : '') + (isRecommended ? 'is-ai-pick' : '')}
                  key={type.id}
                  onClick={() => {
                    chooseType(type);
                    setCurtainOpenRatio(0.0);
                    setIsCurtainOpen(false);
                    setMobileActiveTab('preview');
                  }}
                >
                  <span className={'fabric-thumb fabric-' + type.id}>
                    <img src={type.thumb || roomImage} alt={type.name} />
                  </span>
                  <span className="recommend-info">
                    <div className="card-top-title">
                      <strong>{type.name}</strong>
                      {isRecommended && <span className="ai-pick-badge">AI Khuyên dùng ⭐</span>}
                    </div>
                    <small>{type.desc}</small>
                    <span className="mini-swatches" onClick={(e) => e.stopPropagation()}>
                      {type.colors.slice(0, 7).map((c) => {
                        const isCurrentActive = activeType === type.id && studioColor?.toLowerCase() === c.toLowerCase();
                        return (
                          <button
                            key={c}
                            type="button"
                            className={'card-mini-swatch ' + (isCurrentActive ? 'active' : '')}
                            style={{ backgroundColor: c }}
                            onClick={(e) => {
                              e.stopPropagation();
                              chooseType(type);
                              setStudioColor(c);
                            }}
                            title={getCurtainColorName(c)}
                            aria-label={`Chọn màu ${getCurtainColorName(c)}`}
                          />
                        );
                      })}
                    </span>
                  </span>
                  <span className="recommend-arrow"><StudioIcon name="arrow" size={16} /></span>
                </button>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalCurtainPages > 1 && (
            <div className="studio-curtain-pagination">
              <div className="studio-pagination-info">
                <span>
                  Trang <strong>{curtainPage}</strong> / {totalCurtainPages} ({filteredCurtainTypes.length} mẫu rèm)
                </span>
              </div>
              <div className="studio-pagination-btns">
                <button
                  type="button"
                  className="studio-pagi-nav"
                  disabled={curtainPage === 1}
                  onClick={() => setCurtainPage((p) => Math.max(1, p - 1))}
                  aria-label="Trang trước"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalCurtainPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={'studio-pagi-btn ' + (curtainPage === pageNum ? 'active' : '')}
                    onClick={() => setCurtainPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  type="button"
                  className="studio-pagi-nav"
                  disabled={curtainPage === totalCurtainPages}
                  onClick={() => setCurtainPage((p) => Math.min(totalCurtainPages, p + 1))}
                  aria-label="Trang sau"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
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
                /* STEP 1: QUESTIONNAIRE FORM */
                <div className="survey-form-content">
                  <div className="survey-preview-thumb">
                    <img src={pendingImage || roomImage} alt="Ảnh phòng khảo sát" />
                    <span className="survey-photo-tag">Ảnh phòng của bạn</span>
                  </div>

                  {/* Question 1: Vị trí không gian */}
                  <div className="survey-question-group">
                    <label className="question-title">
                      <span className="q-num">1</span>
                      Vị trí không gian lắp đặt:
                    </label>
                    <div className="question-options-row">
                      <button
                        type="button"
                        className={'q-opt-btn ' + (surveyAnswers.location === 'indoor' ? 'selected' : '')}
                        onClick={() => setSurveyAnswers(prev => ({ ...prev, location: 'indoor' }))}
                      >
                        <span className="opt-emoji">🏠</span>
                        <div className="opt-text">
                          <strong>Trong nhà</strong>
                          <small>Phòng khách, phòng ngủ, làm việc...</small>
                        </div>
                        {surveyAnswers.location === 'indoor' && <Check size={16} className="opt-check" />}
                      </button>

                      <button
                        type="button"
                        className={'q-opt-btn ' + (surveyAnswers.location === 'outdoor' ? 'selected' : '')}
                        onClick={() => setSurveyAnswers(prev => ({ ...prev, location: 'outdoor' }))}
                      >
                        <span className="opt-emoji">☀️</span>
                        <div className="opt-text">
                          <strong>Ngoài trời</strong>
                          <small>Ban công, hiên nhà, chòi villa...</small>
                        </div>
                        {surveyAnswers.location === 'outdoor' && <Check size={16} className="opt-check" />}
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
                          <small>Cửa sổ đơn, 3 cửa hoặc 4 cửa</small>
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
                          <small>Cửa ra vào, cửa đại sảnh, vách lớn</small>
                        </div>
                        {surveyAnswers.doorType === 'main' && <Check size={16} className="opt-check" />}
                      </button>
                    </div>
                  </div>

                  {/* Question 3: Cấu trúc số cửa (Chỉ khi chọn Cửa sổ) */}
                  {surveyAnswers.doorType === 'window' && (
                    <div className="survey-question-group">
                      <label className="question-title">
                        <span className="q-num">3</span>
                        Cấu trúc khung cửa sổ:
                      </label>
                      <div className="question-options-grid-3">
                        <button
                          type="button"
                          className={'q-opt-btn ' + (surveyAnswers.windowPanels === 'single' ? 'selected' : '')}
                          onClick={() => setSurveyAnswers(prev => ({ ...prev, windowPanels: 'single' }))}
                        >
                          <span className="opt-emoji">🪟</span>
                          <div className="opt-text">
                            <strong>Cửa sổ đơn</strong>
                            <small>1 khung cửa</small>
                          </div>
                          {surveyAnswers.windowPanels === 'single' && <Check size={15} className="opt-check" />}
                        </button>

                        <button
                          type="button"
                          className={'q-opt-btn ' + (surveyAnswers.windowPanels === '3' ? 'selected' : '')}
                          onClick={() => setSurveyAnswers(prev => ({ ...prev, windowPanels: '3' }))}
                        >
                          <span className="opt-emoji">🪟🪟🪟</span>
                          <div className="opt-text">
                            <strong>3 cửa</strong>
                            <small>Bộ 3 ô liền kề</small>
                          </div>
                          {surveyAnswers.windowPanels === '3' && <Check size={15} className="opt-check" />}
                        </button>

                        <button
                          type="button"
                          className={'q-opt-btn ' + (surveyAnswers.windowPanels === '4' ? 'selected' : '')}
                          onClick={() => setSurveyAnswers(prev => ({ ...prev, windowPanels: '4' }))}
                        >
                          <span className="opt-emoji">🪟🪟🪟🪟</span>
                          <div className="opt-text">
                            <strong>4 cửa</strong>
                            <small>Bộ 4 ô panorama</small>
                          </div>
                          {surveyAnswers.windowPanels === '4' && <Check size={15} className="opt-check" />}
                        </button>
                      </div>
                    </div>
                  )}

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
                        <span>DETECTION: {surveyAnswers.doorType === 'window' ? (surveyAnswers.windowPanels === '3' ? 'TRIPLE_WINDOW' : surveyAnswers.windowPanels === '4' ? 'QUAD_WINDOW' : 'SINGLE_WINDOW') : 'MAIN_DOOR'}</span>
                        <span>ENV: {surveyAnswers.location.toUpperCase()}</span>
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

      <UnifiedFooter navigateTo={navigateTo} />
    </div>
  );
}

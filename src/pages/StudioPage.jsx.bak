import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import { StudioIcon } from '../components/ui/Icons';
import { curtainTypes, studioStyleFilters } from '../data/studioData';
import { RoomCurtain3DViewer } from '../components/studio/RoomCurtain3DViewer';
import { analyzeRoomPhoto } from '../utils/aiRoomAnalyzer';
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
  ZoomOut
} from 'lucide-react';

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
  const [showAdjuster, setShowAdjuster] = useState(false);

  // Pagination for curtain recommendations (5 items per page)
  const ITEMS_PER_PAGE = 5;
  const [curtainPage, setCurtainPage] = useState(1);
  const [mobileActiveTab, setMobileActiveTab] = useState('preview'); // 'preview' | 'curtains' | 'upload'

  const filteredCurtainTypes = useMemo(() => {
    return curtainTypes.filter((t) => {
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
  }, [activeStudioFilter]);

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

  // Trigger AI Room Analysis whenever roomImage changes or when user triggers it
  const runAiAnalysis = async (imgUrl) => {
    setInternalAnalyzing(true);
    setAnalyzed(false);

    try {
      const result = await analyzeRoomPhoto(imgUrl || roomImage);
      if (result) {
        setAiDiagnosis(result);

        // Auto-select the AI recommended curtain type & color
        const foundType = curtainTypes.find((t) => t.id === result.recommendedTypeId);
        if (foundType) {
          chooseType(foundType);
          setStudioColor(result.recommendedColor);
        }
      }
    } catch (err) {
      console.error('Error during AI room analysis:', err);
    } finally {
      setTimeout(() => {
        setInternalAnalyzing(false);
        setAnalyzed(true);
      }, 900);
    }
  };

  // Handler for file upload with auto AI analysis
  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImg = e.target?.result;
      setRoomImage(newImg);
      setHasUploaded(true);
      setShowOriginal(false);
      setShowAdjuster(true); // Mở thanh căn chỉnh rèm để người dùng dễ dàng dời rèm khớp cửa sổ
      setMobileActiveTab('preview');
      // Run AI analysis immediately on uploaded room photo
      runAiAnalysis(newImg);
    };
    reader.readAsDataURL(file);
  };

  // Run initial analysis if not analyzed yet
  useEffect(() => {
    if (!aiDiagnosis && roomImage) {
      runAiAnalysis(roomImage);
    }
  }, []);

  const analyzingState = isAnalyzing || internalAnalyzing;

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
          <p>Tải lên ảnh căn phòng của bạn, AI sẽ phân tích không gian và trực tiếp ướm rèm 3D vào khung cửa với mô phỏng ánh sáng, gió và chuyển động chân thực.</p>
        </div>
        <div className="stepper" aria-label="Quy trình 4 bước">
          {[
            ['image', '1', 'Tải ảnh phòng'],
            ['sparkle', '2', 'AI Phân tích'],
            ['cube', '3', 'Không gian 3D'],
            ['grid', '4', 'Căn chỉnh rèm'],
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
          <span>Mẫu rèm ({curtainTypes?.length || 8})</span>
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
                  runAiAnalysis('/assets/studio-room.png');
                }}
                aria-label="Đặt lại ảnh"
                title="Khôi phục ảnh mẫu"
              >
                <StudioIcon name="rotate" size={17} />
              </button>
            )}
          </div>
          <p className="panel-description">Chụp hoặc tải ảnh căn phòng của bạn. AI sẽ phân tích tone màu & ánh sáng để đề xuất rèm và tạo không gian 3D.</p>

          <div
            className={'dropzone ' + (dragging ? 'dragging' : '')}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFileUpload(e.dataTransfer.files?.[0]); }}
          >
            <span className="upload-illustration"><StudioIcon name="image" size={34} /><i>+</i></span>
            <strong>Kéo thả ảnh phòng vào đây</strong>
            <span className="or">Hoặc</span>
            <div className="upload-actions">
              <button
                className="button button-dark"
                onClick={() => {
                  if (fileRef.current) {
                    fileRef.current.setAttribute('capture', 'environment');
                    fileRef.current.click();
                  }
                }}
              >
                <StudioIcon name="camera" size={17} /> Chụp ảnh
              </button>
              <button
                className="button button-light"
                onClick={() => {
                  if (fileRef.current) {
                    fileRef.current.removeAttribute('capture');
                    fileRef.current.click();
                  }
                }}
              >
                <StudioIcon name="upload" size={17} /> Tải ảnh lên
              </button>
              <input
                ref={fileRef}
                className="hidden-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files?.[0])}
              />
            </div>
            <small>Hỗ trợ JPG, PNG, WEBP · AI xử lý tức thì</small>
          </div>

          <div className="tips-title" style={{ marginTop: '14px', marginBottom: '8px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted, #8c827a)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Click thử nhanh với phòng mẫu 3D:
          </div>
          <div className="tips-grid">
            <div 
              style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => { setRoomImage('/assets/living-room.jpg'); setHasUploaded(true); setMobileActiveTab('preview'); runAiAnalysis('/assets/living-room.jpg'); }}
              title="Click để ướm thử phòng khách vào tường 3D"
            >
              <img src="/assets/tip-window.jpg" alt="Phòng khách" />
              <span><i><StudioIcon name="check" size={11} /></i>Phòng khách</span>
            </div>
            <div 
              style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => { setRoomImage('/assets/bedroom.jpg'); setHasUploaded(true); setMobileActiveTab('preview'); runAiAnalysis('/assets/bedroom.jpg'); }}
              title="Click để ướm thử phòng ngủ vào tường 3D"
            >
              <img src="/assets/tip-light.jpg" alt="Phòng ngủ" />
              <span><i><StudioIcon name="check" size={11} /></i>Phòng ngủ</span>
            </div>
            <div 
              style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => { setRoomImage('/assets/studio-room.png'); setHasUploaded(true); setMobileActiveTab('preview'); runAiAnalysis('/assets/studio-room.png'); }}
              title="Click để ướm thử studio mẫu vào tường 3D"
            >
              <img src="/assets/tip-angle.jpg" alt="Studio tối giản" />
              <span><i><StudioIcon name="check" size={11} /></i>Studio mẫu</span>
            </div>
          </div>

          <button
            className="analyze-button"
            onClick={() => runAiAnalysis(roomImage)}
            disabled={analyzingState}
          >
            {analyzingState ? (
              <><span className="spinner" /> AI đang phân tích không gian...</>
            ) : (
              <><StudioIcon name="sparkle" size={17} /> {analyzed ? 'Phân tích lại ảnh' : 'AI Phân tích & Gợi ý rèm'} <StudioIcon name="arrow" size={17} /></>
            )}
          </button>

          {analyzed && aiDiagnosis && (
            <div className="analysis-summary-box">
              <div className="summary-badge">
                <Sparkles size={14} color="#d4a373" />
                <span>AI ĐÃ PHÂN TÍCH XONG</span>
              </div>
              <div className="summary-item">
                <span className="lbl">Phong cách:</span>
                <strong>{aiDiagnosis.style}</strong>
              </div>
              <div className="summary-item">
                <span className="lbl">Tông màu phòng:</span>
                <strong>{aiDiagnosis.wallTone}</strong>
              </div>
              <div className="summary-item">
                <span className="lbl">Ánh sáng:</span>
                <strong>{aiDiagnosis.lightCondition}</strong>
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
            <button className="icon-button" onClick={() => runAiAnalysis(roomImage)} aria-label="Phân tích lại ảnh" title="Chạy lại phân tích AI">
              <StudioIcon name="rotate" size={17} />
            </button>
          </div>

          {/* EXTERNAL 3D ATMOSPHERE & ENVIRONMENT TOOLBAR */}
          {true && (
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
          )}

          {/* External Window Fit Calibration Drawer (Outside 3D Canvas) */}
          {showAdjuster && (
            <div className="external-adjuster-panel">
              <div className="adjuster-header">
                <span>🎯 Căn chỉnh rèm theo khung cửa (3D Calibration)</span>
                <button className="adjuster-close" onClick={() => setShowAdjuster(false)} type="button">✕</button>
              </div>
              <div className="adjuster-grid">
                <div className="adjuster-group" style={{ gridColumn: 'span 2' }}>
                  <small>Khớp nhanh vị trí cửa sổ trong ảnh (hoặc click & kéo trực tiếp rèm 3D):</small>
                  <div className="btn-row" style={{ marginTop: '4px' }}>
                    <button onClick={() => viewer3dRef.current?.setCurtainPosition(-0.88, 0)} title="Khớp vào cửa sổ bên trái ảnh" type="button" style={{ fontWeight: 600 }}>👈 Cửa bên trái</button>
                    <button onClick={() => viewer3dRef.current?.setCurtainPosition(0, 0)} title="Khớp vào cửa sổ chính giữa ảnh" type="button" style={{ fontWeight: 600 }}>⏺️ Cửa chính giữa</button>
                    <button onClick={() => viewer3dRef.current?.setCurtainPosition(0.88, 0)} title="Khớp vào cửa sổ bên phải ảnh" type="button" style={{ fontWeight: 600 }}>👉 Cửa bên phải</button>
                  </div>
                </div>
                <div className="adjuster-group">
                  <small>Dời vị trí tinh chỉnh</small>
                  <div className="btn-row">
                    <button onClick={() => viewer3dRef.current?.moveCurtain(-0.06, 0)} title="Sang trái" type="button"><ArrowLeft size={13}/> Trái</button>
                    <button onClick={() => viewer3dRef.current?.moveCurtain(0.06, 0)} title="Sang phải" type="button"><ArrowRight size={13}/> Phải</button>
                    <button onClick={() => viewer3dRef.current?.moveCurtain(0, 0.05)} title="Lên trên" type="button"><ArrowUp size={13}/> Lên</button>
                    <button onClick={() => viewer3dRef.current?.moveCurtain(0, -0.05)} title="Xuống dưới" type="button"><ArrowDown size={13}/> Xuống</button>
                  </div>
                </div>
                <div className="adjuster-group">
                  <small>Kích thước rèm</small>
                  <div className="btn-row">
                    <button onClick={() => viewer3dRef.current?.scaleCurtain(0.10, 0)} title="Rộng hơn" type="button"><Maximize2 size={13}/> Rộng +</button>
                    <button onClick={() => viewer3dRef.current?.scaleCurtain(-0.10, 0)} title="Hẹp hơn" type="button"><Minimize2 size={13}/> Hẹp -</button>
                    <button onClick={() => viewer3dRef.current?.scaleCurtain(0, 0.10)} title="Dài hơn" type="button">Dài +</button>
                    <button onClick={() => viewer3dRef.current?.scaleCurtain(0, -0.10)} title="Ngắn hơn" type="button">Ngắn -</button>
                  </div>
                </div>
                <div className="adjuster-group">
                  <small>Kích thước ảnh phòng</small>
                  <div className="btn-row">
                    <button onClick={() => viewer3dRef.current?.scalePhoto(-0.08)} title="Thu nhỏ kích thước ảnh căn phòng" type="button"><Minimize2 size={13}/> Thu nhỏ ảnh -</button>
                    <button onClick={() => viewer3dRef.current?.scalePhoto(0.08)} title="Phóng to kích thước ảnh căn phòng" type="button"><Maximize2 size={13}/> Phóng to ảnh +</button>
                  </div>
                </div>
                <button className="adjuster-reset-btn" onClick={() => viewer3dRef.current?.resetCurtainTransform()} type="button">
                  <RotateCcw size={12}/> Đặt lại chuẩn
                </button>
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
              <span>Đổi mẫu rèm ({curtainTypes?.length || 8} mẫu)</span>
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
            <span className="recommend-count">04</span>
          </div>

          {/* AI Reasoning Widget in Panel 3 */}
          {aiDiagnosis && (
            <div className="ai-diagnostic-pill">
              <div className="diag-header">
                <Sparkles size={15} color="#c9a473" />
                <strong>Tư vấn từ Chuyên gia AI:</strong>
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
              const isRecommended = !aiDiagnosis || aiDiagnosis.recommendedTypeId === type.id;
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
                      {isRecommended && <span className="ai-pick-badge">AI Khuyên dùng ★</span>}
                    </div>
                    <small>{type.desc}</small>
                    <span className="mini-swatches">
                      {type.colors.slice(0, 7).map((c) => (
                        <i key={c} style={{ background: c }} />
                      ))}
                    </span>
                  </span>
                  <span className="recommend-arrow"><StudioIcon name="arrow" size={16} /></span>
                </button>
              );
            })}
          </div>

          {/* Pagination Controls (5 items per page) */}
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
                    className={`studio-pagi-num ${curtainPage === pageNum ? 'active' : ''}`}
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
                  aria-label="Trang tiếp theo"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          <div className="color-picker">
            <div className="subheading">
              <strong>Màu sắc vải rèm</strong>
              <span>{studioColor.toUpperCase()}</span>
            </div>
            <div className="color-swatches">
              {currentType.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={'Chọn màu ' + color}
                  className={studioColor?.toLowerCase() === color?.toLowerCase() ? 'chosen' : ''}
                  style={{ background: color }}
                  onClick={() => setStudioColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="selected-summary">
            <div>
              <span>ĐANG CHỌN</span>
              <strong>{currentType.name}</strong>
            </div>
            <button onClick={() => navigateTo('contact')}>
              Tư vấn mẫu này <StudioIcon name="arrow" size={16} />
            </button>
          </div>
        </aside>
      </section>

      <UnifiedFooter navigateTo={navigateTo} />
    </div>
  );
}

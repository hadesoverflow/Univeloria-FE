import React from 'react';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import { StudioIcon } from '../components/ui/Icons';
import { curtainTypes, studioStyleFilters } from '../data/studioData';

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
  currentType,
  loadFile,
  analyzeRoom,
  chooseType,
}) {
  return (
        <div className="studio-page">
          <div className="scene-backdrop" />

          {/* Studio Topbar */}
          <Header currentPage="studio" navigateTo={navigateTo} themeClass="topbar-studio" />

          {/* Intro & Stepper */}
          <section className="studio-intro" id="top">
            <div className="studio-intro-copy">
              <div className="kicker">AI 3D STUDIO <span /></div>
              <h1>Biến không gian<br/>của bạn trở nên<br/><em>hoàn hảo</em></h1>
              <p>Chỉ cần một bức ảnh, AI sẽ phân tích không gian và gợi ý những mẫu rèm phù hợp, giúp bạn xem trước dưới dạng 3D trực quan.</p>
            </div>
            <div className="stepper" aria-label="Quy trình 4 bước">
              {[
                ["image", "1", "Tải ảnh"],
                ["sparkle", "2", "AI phân tích"],
                ["grid", "3", "Đề xuất rèm"],
                ["cube", "4", "Xem 3D & lựa chọn"],
              ].map(([icon, n, label], i) => (
                <React.Fragment key={n}>
                  <div className={`step ${i === 0 ? "step-active" : analyzed && i < 4 ? "step-done" : ""}`}>
                    <span className="step-icon"><StudioIcon name={icon} size={22}/></span>
                    <span className="step-text"><b>{n}</b><small>{label}</small></span>
                  </div>
                  {i < 3 && <span className="step-chevron">›</span>}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Interactive Workspace (3 Panels) */}
          <section className="workspace" id="studio-workspace">
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
                    onClick={() => { setRoomImage("/assets/studio-room.png"); setHasUploaded(false); setAnalyzed(false); }}
                    aria-label="Đặt lại ảnh"
                  >
                    <StudioIcon name="rotate" size={17}/>
                  </button>
                )}
              </div>
              <p className="panel-description">Chụp ảnh trực tiếp hoặc tải ảnh lên để AI phân tích không gian và gợi ý rèm phù hợp nhất.</p>
              
              <div
                className={`dropzone ${dragging ? "dragging" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files?.[0]); }}
              >
                <span className="upload-illustration"><StudioIcon name="image" size={34}/><i>+</i></span>
                <strong>Kéo thả ảnh vào đây</strong>
                <span className="or">Hoặc</span>
                <div className="upload-actions">
                  <button
                    className="button button-dark"
                    onClick={() => {
                      if (fileRef.current) {
                        fileRef.current.setAttribute("capture", "environment");
                        fileRef.current.click();
                      }
                    }}
                  >
                    <StudioIcon name="camera" size={17}/> Chụp ảnh
                  </button>
                  <button
                    className="button button-light"
                    onClick={() => {
                      if (fileRef.current) {
                        fileRef.current.removeAttribute("capture");
                        fileRef.current.click();
                      }
                    }}
                  >
                    <StudioIcon name="upload" size={17}/> Tải ảnh lên
                  </button>
                  <input
                    ref={fileRef}
                    className="hidden-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => loadFile(e.target.files?.[0])}
                  />
                </div>
                <small>Hỗ trợ JPG, PNG, WEBP · Tối đa 20MB</small>
              </div>

              <div className="tips-title">Mẹo chụp ảnh đẹp hơn</div>
              <div className="tips-grid">
                <div>
                  <img src="/assets/tip-window.jpg" alt="Chụp toàn bộ cửa sổ"/>
                  <span><i><StudioIcon name="check" size={11}/></i>Chụp toàn bộ cửa sổ</span>
                </div>
                <div>
                  <img src="/assets/tip-light.jpg" alt="Đủ ánh sáng"/>
                  <span><i><StudioIcon name="check" size={11}/></i>Đủ ánh sáng</span>
                </div>
                <div>
                  <img src="/assets/tip-angle.jpg" alt="Góc chụp thẳng"/>
                  <span><i><StudioIcon name="check" size={11}/></i>Góc chụp thẳng</span>
                </div>
              </div>

              <button className="analyze-button" onClick={analyzeRoom} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <><span className="spinner"/> Đang phân tích không gian...</>
                ) : (
                  <><StudioIcon name="sparkle" size={17}/> {analyzed ? "Phân tích lại ảnh" : "Phân tích & gợi ý rèm"} <StudioIcon name="arrow" size={17}/></>
                )}
              </button>
              {analyzed && (
                <div className="analysis-note">
                  <StudioIcon name="check" size={15}/> Phân tích không gian hoàn tất. Hãy chọn mẫu rèm để xem trước.
                </div>
              )}
            </aside>

            {/* Panel 2: 3D Visualization */}
            <section className={`preview-panel glass-panel ${fullScreen ? "preview-fullscreen" : ""}`} aria-label="Kết quả mô phỏng">
              <div className="preview-header">
                <div>
                  <span className="panel-step">02 / VISUALIZATION</span>
                  <h2>{analyzed ? "Không gian đề xuất từ AI" : "Xem trước không gian"}</h2>
                </div>
                <span className={`status-pill ${analyzed ? "status-ready" : ""}`}>
                  <i/>{analyzed ? "Đã phân tích xong" : "Bản xem trước"}
                </span>
                <button className="icon-button" onClick={analyzeRoom} aria-label="Phân tích ảnh">
                  <StudioIcon name="rotate" size={17}/>
                </button>
              </div>

              <div className="room-stage">
                <img
                  className={`room-render ${showOriginal ? "show-original" : ""}`}
                  src={roomImage}
                  alt="Không gian xem trước"
                  style={{ transform: `scale(${zoom})` }}
                />
                <div className="stage-gradient"/>
                
                <div className="compare-switch">
                  <button className={showOriginal ? "selected" : ""} onClick={() => setShowOriginal(true)}>Ảnh gốc</button>
                  <button className={!showOriginal ? "selected" : ""} onClick={() => setShowOriginal(false)}>Xem rèm</button>
                </div>

                {!showOriginal && (
                  <div
                    className="curtain-tint"
                    style={{ "--fabric-color": studioColor, opacity: activeType === "sheer" ? 0.15 : 0.24 }}
                  />
                )}

                {isAnalyzing && (
                  <div className="analysis-overlay">
                    <span className="scan-line"/>
                    <div className="analysis-orb"><StudioIcon name="sparkle" size={26}/></div>
                    <strong>Đang phân tích căn phòng</strong>
                    <small>Nhận diện cửa sổ · ánh sáng · phong cách</small>
                  </div>
                )}

                <div className="stage-label">
                  <span className="live-dot"/>{viewMode} PREVIEW <span>·</span> {currentType.name}
                </div>
              </div>

              <div className="viewer-controls">
                <div className="mode-switch">
                  <button className={viewMode === "2D" ? "selected" : ""} onClick={() => setViewMode("2D")}>2D</button>
                  <button className={viewMode === "3D" ? "selected" : ""} onClick={() => setViewMode("3D")}>3D</button>
                </div>
                <span className="control-divider"/>
                <button onClick={() => setZoom(zoom >= 1.2 ? 1 : zoom + 0.1)}>
                  <StudioIcon name="rotate" size={17}/> Xoay
                </button>
                <button onClick={() => setZoom(zoom >= 1.3 ? 1 : zoom + 0.15)}>
                  <StudioIcon name="zoom" size={17}/> Phóng to
                </button>
                <button onClick={() => setFullScreen(!fullScreen)}>
                  <StudioIcon name="expand" size={16}/> {fullScreen ? "Thu nhỏ" : "Toàn màn hình"}
                </button>
              </div>
            </section>

            {/* Panel 3: AI Recommendations */}
            <aside className="recommend-panel glass-panel">
              <div className="recommend-heading">
                <div>
                  <span className="panel-step">03 / AI RECOMMENDATIONS</span>
                  <h2>Mẫu rèm phù hợp</h2>
                </div>
                <span className="recommend-count">04</span>
              </div>

              <div className="filter-tabs">
                {studioStyleFilters.map((filter) => (
                  <button
                    key={filter}
                    className={activeStudioFilter === filter ? "selected" : ""}
                    onClick={() => setActiveStudioFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="recommend-list">
                {curtainTypes
                  .filter((t) =>
                    activeStudioFilter === "Tất cả" ||
                    (activeStudioFilter === "Hiện đại"
                      ? ["linen", "double"].includes(t.id)
                      : activeStudioFilter === "Tối giản"
                      ? ["sheer", "linen"].includes(t.id)
                      : ["pattern", "double"].includes(t.id))
                  )
                  .map((type) => (
                    <button
                      className={`recommend-card ${activeType === type.id ? "active" : ""}`}
                      key={type.id}
                      onClick={() => chooseType(type)}
                    >
                      <span className={`fabric-thumb fabric-${type.id}`}>
                        <img src={roomImage} alt=""/>
                      </span>
                      <span className="recommend-info">
                        <strong>{type.name}</strong>
                        <small>{type.desc}</small>
                        <span className="mini-swatches">
                          {type.colors.slice(0, 5).map((c) => (
                            <i key={c} style={{ background: c }}/>
                          ))}
                        </span>
                      </span>
                      <span className="recommend-arrow"><StudioIcon name="arrow" size={16}/></span>
                    </button>
                  ))}
              </div>

              <div className="color-picker">
                <div className="subheading">
                  <strong>Màu sắc</strong>
                  <span>{studioColor.toUpperCase()}</span>
                </div>
                <div className="color-swatches">
                  {currentType.colors.map((color) => (
                    <button
                      key={color}
                      aria-label={`Chọn màu ${color}`}
                      className={studioColor === color ? "chosen" : ""}
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
                  Tư vấn mẫu này <StudioIcon name="arrow" size={16}/>
                </button>
              </div>
            </aside>
          </section>

          <UnifiedFooter navigateTo={navigateTo} />
        </div>

  );
}

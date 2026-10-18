import React from 'react';
import { ArrowRight, ArrowLeft, Sun, House, ChevronDown, ShieldCheck, Box, Palette } from 'lucide-react';
import { Header } from '../components/layout/Header';

export function HomePage({
  navigateTo,
  scrollTo,
  curtainOpen,
  setCurtainOpen,
  activeColor,
  setActiveColor,
  colors,
  currentSlide,
  setCurrentSlide,
  slides,
}) {
  return (
        <div className="home-page-view">
          <section className="hero" id="home">
            <div className="sky-glow" />
            <Header currentPage="home" navigateTo={navigateTo} />

            <div className="hero-art-wrap">
              <img className="hero-art" src="/assets/hero-room.png" alt="Không gian cửa kính với rèm voan và rèm vải cao cấp" />
            </div>

            <div className="hero-panel">
              <div className="hero-copy">
                <p className="eyebrow">CURTAINS · SPACES · TECHNOLOGY</p>
                <h1>Beyond<br/>the Window.</h1>
                <p className="intro">Rèm cửa không chỉ che nắng,<br className="desktop-only"/> mà còn kiến tạo không gian sống của bạn.</p>
                <div className="hero-actions">
                  <button className="pill pill-dark" onClick={() => navigateTo('studio')}>
                    <span>Trải nghiệm AI 3D</span>
                    <ArrowRight size={17}/>
                  </button>
                  <button className="pill pill-light" onClick={() => navigateTo('collections')}>
                    <span>Khám phá bộ sưu tập</span>
                    <ArrowRight size={17}/>
                  </button>
                </div>
              </div>

              <div className="preview-card">
                <div className="preview-head">
                  <span>AI 3D Preview</span>
                  <button aria-label="Mở AI 3D Studio" onClick={() => navigateTo('studio')}>
                    <ArrowRight size={15}/>
                  </button>
                </div>
                <div className="preview-content">
                  <div className={`preview-room tint-${activeColor}`}>
                    <img src="/assets/window-scene.png" alt="Xem trước rèm trong căn phòng"/>
                  </div>
                  <div className="preview-swatch-column">
                    <div className="swatches">
                      {colors.map((c, i) => (
                        <button
                          key={c.name}
                          title={c.name}
                          aria-label={c.name}
                          className={activeColor === i ? 'swatch selected' : 'swatch'}
                          style={{ background: c.hex }}
                          onClick={() => setActiveColor(i)}
                        />
                      ))}
                    </div>
                    <div className="fabric-samples">
                      <img src="/assets/beige-drape.png" alt="Voan trắng" className="fabric-tint-light"/>
                      <img src="/assets/beige-drape.png" alt="Vải be"/>
                      <img src="/assets/beige-drape.png" alt="Vải nâu" className="fabric-tint-brown"/>
                      <img src="/assets/beige-drape.png" alt="Vải xám đen" className="fabric-tint-dark"/>
                    </div>
                  </div>
                </div>
                <button className="preview-link" onClick={() => navigateTo('studio')}>
                  <span>Thử phối màu</span>
                  <ArrowRight size={14}/>
                </button>
              </div>
            </div>

            <div className="hero-bottom-strip">
              <div className="hero-slide-tracker">
                <div className="slide-counter">
                  <strong>{`0${currentSlide + 1}`}</strong>
                  <span>/ {slides.length < 10 ? `0${slides.length}` : slides.length}</span>
                </div>
                <div className="slide-progress-track">
                  <div className="slide-progress-bar" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
                </div>
                <div className="slide-categories">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      className={currentSlide === i ? 'slide-category active' : 'slide-category'}
                      onClick={() => {
                        setCurrentSlide(i);
                        if (s.id === 'home') {
                          scrollTo('home');
                        } else {
                          navigateTo(s.id);
                        }
                      }}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hero-nav-arrows">
                <button
                  className="nav-arrow nav-arrow-prev"
                  onClick={() => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)}
                  aria-label="Slide trước"
                >
                  <ArrowLeft size={18}/>
                </button>
                <button
                  className="nav-arrow nav-arrow-next"
                  onClick={() => setCurrentSlide((p) => (p + 1) % slides.length)}
                  aria-label="Slide sau"
                >
                  <ArrowRight size={18}/>
                </button>
              </div>
            </div>
          </section>
        </div>

  );
}

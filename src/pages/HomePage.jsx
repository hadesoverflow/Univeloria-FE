import React from 'react';
import {
  ArrowRight,
  Gem,
  ShieldCheck,
  Headphones,
  Clock
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { MusicPlayerButton } from '../components/audio/MusicPlayerButton';

export function HomePage({ navigateTo }) {
  return (
    <div className="home-page-view">
      <section className="hero home-luxury-hero" id="home">
        <Header currentPage="home" navigateTo={navigateTo} />

        {/* Hero Content Left Column */}
        <div className="hero-main-container">
          <div className="hero-copy-block">
            <h1 className="hero-headline-serif font-headline-serif">
              <span className="hero-title-line">Cảm nhận sự khác biệt.</span>
              <span className="hero-title-line">Kiến tạo không gian</span>
            </h1>
            <div className="hero-brand-script font-headline-script">
              Cùng UniVeloria
            </div>

            <p className="hero-description font-body-vietnam">
              Rèm cửa cao cấp và những sản phẩm nội thất tinh tế,<br className="desktop-br" />
              mang đến sự hài hòa và thoải mái cho tổ ấm của bạn.
            </p>

            <div className="hero-cta-buttons font-body-vietnam">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => navigateTo('studio')}
                aria-label="Trải nghiệm AI 3D"
              >
                <span>Trải nghiệm AI 3D</span>
                <span className="btn-arrow-circle">
                  <ArrowRight size={15} />
                </span>
              </button>

              <button
                type="button"
                className="btn-hero-secondary"
                onClick={() => navigateTo('collections')}
                aria-label="Khám phá bộ sưu tập"
              >
                <span>Khám phá bộ sưu tập</span>
                <span className="btn-arrow-circle-outline">
                  <ArrowRight size={15} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Floating Features Capsule (Large & Centered) */}
        <div className="hero-features-capsule-wrap">
          <div className="hero-features-capsule font-feature-public">
            <div className="feature-capsule-item">
              <div className="feature-icon-box">
                <Gem size={30} strokeWidth={1.8} />
              </div>
              <div className="feature-text-box">
                <strong className="feature-item-title">Thiết kế tinh tế</strong>
                <span className="feature-item-sub">Phù hợp mọi phong cách</span>
              </div>
            </div>

            <div className="feature-capsule-item">
              <div className="feature-icon-box">
                <ShieldCheck size={30} strokeWidth={1.8} />
              </div>
              <div className="feature-text-box">
                <strong className="feature-item-title">Chất lượng vượt trội</strong>
                <span className="feature-item-sub">Bền đẹp theo thời gian</span>
              </div>
            </div>

            <div className="feature-capsule-item">
              <div className="feature-icon-box">
                <Headphones size={30} strokeWidth={1.8} />
              </div>
              <div className="feature-text-box">
                <strong className="feature-item-title">Tư vấn chuyên nghiệp</strong>
                <span className="feature-item-sub">Tận tâm, tận tình</span>
              </div>
            </div>

            <div className="feature-capsule-item">
              <div className="feature-icon-box">
                <Clock size={30} strokeWidth={1.8} />
              </div>
              <div className="feature-text-box">
                <strong className="feature-item-title">Lắp đặt nhanh chóng</strong>
                <span className="feature-item-sub">An tâm sử dụng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Music Player at Bottom-Left */}
      <MusicPlayerButton />
    </div>
  );
}

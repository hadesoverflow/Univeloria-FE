import { aboutValues, aboutReasons } from '../data/aboutData';
import React from 'react';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import { AboutIcon } from '../components/ui/Icons';

export function AboutPage({ navigateTo }) {
  return (
        <div className="about-page-view">
          {/* Topbar */}
          <Header currentPage="about" navigateTo={navigateTo} themeClass="topbar-about" />

          {/* Hero Section */}
          <section className="about-hero" id="top">
            <div className="about-hero-image" />
            <div className="about-hero-overlay" />
            <div className="hero-copy">
              <div className="eyebrow">ABOUT US <span /></div>
              <h1>Vẻ đẹp<br />bắt đầu từ<br />không gian sống</h1>
              <p>
                UNIVELORIA tin rằng mỗi ô cửa sổ đều có một câu chuyện,<br className="desktop" />
                và rèm cửa là cách để kể nên câu chuyện ấy – bằng ánh sáng,<br className="desktop" />
                chất liệu và cảm xúc.
              </p>
              <a
                className="dark-cta"
                href="#story"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('brand-story')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Câu chuyện của chúng tôi <AboutIcon name="arrow" size={16} />
              </a>
            </div>
            <div className="hero-caption"><span>01</span> / THE ART OF LIVING</div>
          </section>

          {/* Brand Story Section */}
          <section className="story-section" id="brand-story">
            <div className="story-image-wrap">
              <img src="/assets/about-story.jpg" alt="Rèm voan mềm mại trong ánh nắng hoàng hôn" />
              <div className="story-image-quote">
                A Beautiful<br />Space,<br />A Better You.
              </div>
            </div>
            <div className="story-copy">
              <div className="eyebrow">BRAND STORY <span /></div>
              <h2>Câu chuyện<br />thương hiệu</h2>
              <p>
                UNIVELORIA ra đời từ tình yêu dành cho những không gian sống đẹp và tinh tế.
                Chúng tôi tin rằng rèm cửa không chỉ là vật dụng che nắng, mà còn là một phần của phong cách sống – nơi thẩm mỹ, công năng và cảm xúc gặp nhau.
              </p>
              <p>
                Từ những ngày đầu, UNIVELORIA đã hướng đến việc mang các giải pháp rèm cửa hiện đại, chất lượng cao và phù hợp với từng không gian sống tại Việt Nam, kết hợp cùng công nghệ AI 3D để giúp khách hàng dễ dàng hình dung và lựa chọn sản phẩm phù hợp nhất.
              </p>
              <div className="side-note">
                <span>MORE</span><span>THAN</span><span>CURTAINS</span><i />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="values-section">
            {aboutValues.map((v) => (
              <article className="value-card" key={v.title}>
                <div className="value-icon"><AboutIcon name={v.icon} size={23} /></div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </section>

          {/* Why Section */}
          <section className="why-section">
            <div className="why-image">
              <img src="/assets/about-why.jpg" alt="Phòng khách cao cấp với rèm cửa màu kem" />
            </div>
            <div className="why-copy">
              <div className="eyebrow">WHY UNIVELORIA <span /></div>
              <h2>Vì sao lựa chọn<br />UNIVELORIA?</h2>
              <div className="reason-list">
                {aboutReasons.map((r) => (
                  <article className="reason" key={r.title}>
                    <div className="reason-icon"><AboutIcon name={r.icon} size={22} /></div>
                    <div>
                      <h3>{r.title}</h3>
                      <p>{r.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="stats-bg">
              <img src="/assets/about-coast.jpg" alt="Ánh nắng hoàng hôn trên biển" />
            </div>
            <div className="stats-content">
              <div className="eyebrow">NHỮNG CON SỐ BIẾT NÓI <span /></div>
              <h2>Hành trình tạo nên<br />những không gian đẹp hơn</h2>
              <div className="stats-grid">
                <div>
                  <strong>10+</strong>
                  <span>Năm kinh nghiệm<br />trong ngành rèm cửa</span>
                </div>
                <div>
                  <strong>5.000+</strong>
                  <span>Khách hàng<br />tin tưởng lựa chọn</span>
                </div>
                <div>
                  <strong>500+</strong>
                  <span>Mẫu rèm đa dạng<br />và cập nhật liên tục</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Cam kết chất lượng<br />và dịch vụ tận tâm</span>
                </div>
              </div>
            </div>
          </section>

          <UnifiedFooter navigateTo={navigateTo} />
        </div>

  );
}

import React, { useState } from 'react';
import {
  aboutStory,
  aboutMissionVision,
  aboutCoreValues,
  aboutReasons
} from '../data/aboutData';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import { AboutIcon } from '../components/ui/Icons';
import {
  Target,
  Compass,
  Eye,
  SlidersHorizontal,
  Layers,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Boxes,
  Workflow
} from 'lucide-react';

export function AboutPage({ navigateTo }) {
  // State for collapsible "Xem thêm" in Core Values cards
  const [expandedValues, setExpandedValues] = useState({});

  const toggleExpand = (id) => {
    setExpandedValues((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderValueIcon = (iconName) => {
    switch (iconName) {
      case 'Eye':
        return <Eye size={22} />;
      case 'SlidersHorizontal':
        return <SlidersHorizontal size={22} />;
      case 'Layers':
        return <Layers size={22} />;
      case 'TrendingUp':
        return <TrendingUp size={22} />;
      default:
        return <Sparkles size={22} />;
    }
  };

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
            và rèm cửa là cách để kể nên câu chuyện ấy bằng ánh sáng,<br className="desktop" />
            chất liệu và cảm xúc.
          </p>
          <a
            className="dark-cta"
            href="#brand-story"
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
            {aboutStory.quote}
          </div>
        </div>
        <div className="story-copy">
          <div className="eyebrow">{aboutStory.eyebrow} <span /></div>
          <h2>{aboutStory.title}</h2>
          <p>{aboutStory.p1}</p>
          <p>{aboutStory.p2}</p>

          {/* 4 Ecosystem Pillars */}
          <div className="about-ecosystem-wrapper">
            <h4 className="ecosystem-heading">Hệ sinh thái UniVeloria:</h4>
            <div className="about-ecosystem-grid">
              {aboutStory.ecosystem.map((eco) => (
                <div className="ecosystem-card" key={eco.name}>
                  <div className="ecosystem-badge">{eco.name}</div>
                  <div className="ecosystem-role">{eco.role}</div>
                  <p className="ecosystem-desc">{eco.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="side-note">
            <span>MORE</span><span>THAN</span><span>CURTAINS</span><i />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section: 2 distinct separate blocks */}
      <section className="mission-vision-section" id="mission-vision">
        <div className="mv-container">
          <div className="mv-header">
            <div className="eyebrow">MISSION & VISION <span /></div>
            <h2>Sứ Mệnh & Tầm Nhìn</h2>
            <p>Định hướng chiến lược và kim chỉ nam trên hành trình ứng dụng công nghệ hoàn thiện không gian sống</p>
          </div>

          <div className="mv-grid">
            {/* Sứ mệnh Block */}
            <div className="mv-block mv-mission-block">
              <div className="mv-card-top">
                <div className="mv-icon-badge">
                  <Target size={20} />
                </div>
                <div className="mv-titles">
                  <span className="mv-tag">{aboutMissionVision.mission.tag}</span>
                  <span className="mv-subtag">{aboutMissionVision.mission.subTag}</span>
                </div>
              </div>
              <h3>{aboutMissionVision.mission.title}</h3>
              <div className="mv-highlight-box">
                <Sparkles size={15} />
                <span>{aboutMissionVision.mission.highlight}</span>
              </div>
              <p className="mv-body-text">{aboutMissionVision.mission.content}</p>
            </div>

            {/* Tầm nhìn Block */}
            <div className="mv-block mv-vision-block">
              <div className="mv-card-top">
                <div className="mv-icon-badge">
                  <Compass size={20} />
                </div>
                <div className="mv-titles">
                  <span className="mv-tag">{aboutMissionVision.vision.tag}</span>
                  <span className="mv-subtag">{aboutMissionVision.vision.subTag}</span>
                </div>
              </div>
              <h3>{aboutMissionVision.vision.title}</h3>
              <div className="mv-highlight-box">
                <Sparkles size={15} />
                <span>{aboutMissionVision.vision.highlight}</span>
              </div>
              <p className="mv-body-text">{aboutMissionVision.vision.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section: 4 distinct unified cards */}
      <section className="core-values-section" id="core-values">
        <div className="cv-container">
          <div className="core-values-header">
            <div className="eyebrow">CORE VALUES <span /></div>
            <h2>4 Giá Trị Cốt Lõi</h2>
            <p>Nguyên tắc nền tảng định hình từng giải pháp, thuật toán AI và trải nghiệm khách hàng tại UniVeloria</p>
          </div>

          <div className="core-values-grid">
            {aboutCoreValues.map((val) => {
              const isExpanded = !!expandedValues[val.id];
              return (
                <article className={`core-value-card ${isExpanded ? 'expanded' : ''}`} key={val.id}>
                  <div className="cv-top-bar">
                    <span className="cv-number">{val.index}</span>
                    <div className="cv-icon-box">
                      {renderValueIcon(val.icon)}
                    </div>
                  </div>

                  <div className="cv-heading-wrap">
                    <h3 className="cv-title">{val.title}</h3>
                    <span className="cv-subtitle">{val.subtitle}</span>
                  </div>

                  <div className="cv-content-wrap">
                    <p className="cv-text">
                      {isExpanded ? val.fullText : val.shortText}
                    </p>
                  </div>

                  <div className="cv-card-footer">
                    <button
                      type="button"
                      className="cv-toggle-btn"
                      onClick={() => toggleExpand(val.id)}
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
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

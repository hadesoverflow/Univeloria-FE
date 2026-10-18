import React from 'react';
import { ArrowRight, ShieldCheck, Box, Palette } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import { collectionsData, collectionFilters } from '../data/collectionsData';

export function CollectionsPage({
  navigateTo,
  activeCollectionFilter,
  setActiveCollectionFilter,
  visibleCollections,
  savedCollections,
  toggleSavedCollection,
}) {
  return (
        <div className="collections-page">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />

          {/* Dedicated Collections Header */}
          <Header currentPage="collections" navigateTo={navigateTo} themeClass="topbar-collections" />

          {/* Collections Hero Banner */}
          <section className="collections-hero" id="top">
            <div className="hero-image" aria-hidden="true" />
            <div className="hero-wash" aria-hidden="true" />

            <div className="hero-copy">
              <div className="eyebrow"><span>BỘ SƯU TẬP</span><i /></div>
              <h1>Luxury Curtains<br /><em>for Every Space</em></h1>
              <p>
                Khám phá bộ sưu tập rèm cao cấp, được thiết kế<br className="desktop-break" />
                dành riêng cho từng không gian sống.
              </p>
              <div className="collections-banner-actions">
                <a className="pill-button dark-button" href="#collection-grid">
                  Khám phá tất cả <span className="arrow">↗</span>
                </a>
                <button className="pill-button light-button" onClick={() => navigateTo('home')}>
                  <span>← Về Không Gian Sống</span>
                </button>
              </div>
            </div>

            <div className="hero-note">
              <span className="note-mark">↘</span>
              <span>Không gian sống, theo cách của bạn.</span>
            </div>
          </section>

          {/* Collection Content (Toolbar + Filtered Grid) */}
          <section className="collection-content" id="collection-grid">
            <div className="collection-toolbar">
              <div className="filter-list" role="tablist" aria-label="Lọc bộ sưu tập">
                {collectionFilters.map((filter) => (
                  <button
                    key={filter}
                    role="tab"
                    aria-selected={activeCollectionFilter === filter}
                    className={`filter-chip ${activeCollectionFilter === filter ? "selected" : ""}`}
                    onClick={() => setActiveCollectionFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="collection-count">
                <span>0{visibleCollections.length}</span> BỘ SƯU TẬP
              </div>
            </div>

            <div className={`collection-grid ${visibleCollections.length === 1 ? "single-result" : ""}`}>
              {visibleCollections.map((item, index) => (
                <article className="collection-card" key={item.id} style={{ "--delay": `${index * 80}ms` }}>
                  <div
                    className="card-image-link"
                    onClick={() => navigateTo('studio')}
                    style={{ cursor: 'pointer' }}
                    aria-label={`Khám phá ${item.title}`}
                  >
                    <img className="card-image" src={item.image} alt={item.title} />
                    <span className="card-index">0{collectionsData.findIndex((c) => c.id === item.id) + 1} / 04</span>
                    <button
                      className={`save-button ${savedCollections.includes(item.id) ? "saved" : ""}`}
                      aria-label={savedCollections.includes(item.id) ? "Bỏ lưu bộ sưu tập" : "Lưu bộ sưu tập"}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleSavedCollection(item.id);
                      }}
                    >
                      {savedCollections.includes(item.id) ? "♥" : "♡"}
                    </button>
                    <span className="image-arrow">↗</span>
                  </div>
                  <div className="card-copy">
                    <div className="card-eyebrow">{item.eyebrow}</div>
                    <div className="card-title-row">
                      <h2>{item.title}</h2>
                      <button
                        className="round-arrow"
                        onClick={() => navigateTo('studio')}
                        aria-label={`Xem ${item.title}`}
                      >
                        ↗
                      </button>
                    </div>
                    <p>{item.subtitle}</p>
                    <div className="card-tags">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <UnifiedFooter navigateTo={navigateTo} />
        </div>

  );
}

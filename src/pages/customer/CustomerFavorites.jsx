import React from 'react';
import {
  Heart,
  ArrowRight,
  Loader2
} from 'lucide-react';

export function CustomerFavorites({
  displayFavorites = [],
  favoritesLoading = false,
  handleRemoveFavorite,
  navigateTo
}) {
  return (
    <div className="panel-tab-view fade-in">
      <div className="panel-header-bar">
        <div>
          <h2 className="panel-title">Mẫu Rèm Yêu Thích</h2>
          <p className="panel-subtitle">
            Danh sách các thiết kế rèm may đo bạn đã lưu lại để phối cảnh hoặc đặt may.
          </p>
        </div>
        <button
          type="button"
          className="btn-ghost-cancel"
          onClick={() => navigateTo('products')}
        >
          <span>Khám phá thêm</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {favoritesLoading ? (
        <div className="panel-loading-state">
          <Loader2 size={32} className="spin-icon" />
          <span>Đang tải danh sách rèm đã lưu...</span>
        </div>
      ) : displayFavorites.length === 0 ? (
        <div className="panel-empty-state">
          <Heart size={42} color="#c8a87d" />
          <h3>Chưa có sản phẩm yêu thích</h3>
          <p>
            Danh sách sản phẩm rèm yêu thích của bạn hiện đang trống. Hãy nhấn biểu tượng
            trái tim trên các mẫu rèm bạn ưng ý để lưu lại.
          </p>
          <button
            type="button"
            className="btn-primary-action"
            onClick={() => navigateTo('products')}
          >
            Khám phá bộ sưu tập rèm
          </button>
        </div>
      ) : (
        <div className="favorites-cards-grid">
          {displayFavorites.map((product) => (
            <div key={product.id} className="compact-fav-card">
              <div className="fav-thumb-box">
                <img src={product.image} alt={product.name} />
                <button
                  type="button"
                  className="fav-toggle-btn active"
                  title="Xóa khỏi yêu thích"
                  onClick={() => handleRemoveFavorite(product.id)}
                >
                  <Heart size={16} fill="#e11d48" color="#e11d48" />
                </button>
                {product.badge && (
                  <span className="fav-pill-badge">{product.badge}</span>
                )}
              </div>

              <div className="fav-meta-box">
                <span className="fav-cat-tag">
                  {product.category} • {product.style}
                </span>
                <h4 className="fav-item-title">{product.name}</h4>

                <div className="fav-bottom-row">
                  <span className="fav-cost">
                    {Number(product.price || 0).toLocaleString('vi-VN')}₫
                    <small>/m²</small>
                  </span>
                  <div className="fav-btn-group">
                    <button
                      type="button"
                      className="fav-btn-order"
                      onClick={() => navigateTo('contact')}
                    >
                      Đặt may
                    </button>
                    <button
                      type="button"
                      className="fav-btn-studio"
                      onClick={() => navigateTo('studio')}
                    >
                      Phối 3D
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

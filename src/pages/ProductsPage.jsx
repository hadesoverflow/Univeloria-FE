import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import { ProductIcon } from '../components/ui/Icons';
import { ProductFilterSection } from '../components/ui/ProductFilterSection';
import { productsData, productCategories, productCurtainTypes, productStyles, productPaletteColors } from '../data/productsData';
import { formatProductPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext';

export function ProductsPage({
  navigateTo,
  selectedProductCategory,
  setSelectedProductCategory,
  selectedProductTypes,
  setSelectedProductTypes,
  selectedProductStyles,
  setSelectedProductStyles,
  selectedProductColors,
  setSelectedProductColors,
  maxProductPrice,
  setMaxProductPrice,
  productSortBy,
  setProductSortBy,
  productSearch,
  setProductSearch,
  productSearchOpen,
  setProductSearchOpen,
  productView,
  setProductView,
  productNotice,
  filteredProducts,
  productFavorites,
  toggleProductFavorite,
  productCart,
  addToCart,
  toggleProductFilter,
  resetProductFilters,
  activeCardColors,
  setActiveCardColors,
}) {
  const { addToCart: addCartItem } = useCart();

  // Luxury Pagination Suite: 8 items per page by default
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever any filter or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedProductCategory,
    selectedProductTypes,
    selectedProductStyles,
    selectedProductColors,
    maxProductPrice,
    productSortBy,
    productSearch,
    itemsPerPage
  ]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  return (
        <div className="products-page" id="top">
          {/* Products Topbar */}
          <Header currentPage="products" navigateTo={navigateTo} themeClass="topbar-products" />

          {/* Products Hero */}
          <section className="products-hero">
            <div className="hero-photo" />
            <div className="hero-fade" />
            <div className="hero-copy">
              <div className="eyebrow">SẢN PHẨM <span /></div>
              <h1>Rèm cao cấp<br />cho mọi không gian</h1>
              <p>
                Tinh tế trong từng chi tiết, mang đến sự hài hòa<br className="desktop-break" /> giữa thẩm mỹ và công năng cho ngôi nhà của bạn.
              </p>
            </div>
            <div className="hero-bottom-note"><span /> Được thiết kế cho cách bạn sống.</div>
          </section>

          {/* Category Strip */}
          <section className="category-strip" aria-label="Danh mục không gian">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                className={`category-card ${selectedProductCategory === cat.id ? 'chosen' : ''}`}
                onClick={() => setSelectedProductCategory(cat.id === selectedProductCategory ? 'Tất cả' : cat.id)}
              >
                <div className="category-card-img-wrap">
                  <img src={cat.image} alt={cat.title} />
                </div>
                <div className="category-card-bottom">
                  <span className="category-text">
                    <strong>{cat.title}</strong>
                    <small>{cat.subtitle}</small>
                  </span>
                  <span className="category-arrow">
                    <ProductIcon name="arrow" size={14} />
                  </span>
                </div>
              </button>
            ))}
          </section>

          {/* Catalog Layout */}
          <section className="catalog-layout">
            <aside className="filter-sidebar">
              <div className="filter-header">
                <h2>Bộ lọc sản phẩm</h2>
                <button onClick={resetProductFilters}>Đặt lại</button>
              </div>

              <ProductFilterSection title="Loại rèm">
                {productCurtainTypes.map((item) => (
                  <label className="check-row" key={item.name}>
                    <input
                      type="checkbox"
                      checked={selectedProductTypes.includes(item.name)}
                      onChange={() => toggleProductFilter(selectedProductTypes, setSelectedProductTypes, item.name)}
                    />
                    <span>{item.name}</span>
                    <small>({item.count})</small>
                  </label>
                ))}
              </ProductFilterSection>

              <ProductFilterSection title="Phong cách">
                {productStyles.map((item) => (
                  <label className="check-row" key={item.name}>
                    <input
                      type="checkbox"
                      checked={selectedProductStyles.includes(item.name)}
                      onChange={() => toggleProductFilter(selectedProductStyles, setSelectedProductStyles, item.name)}
                    />
                    <span>{item.name}</span>
                    <small>({item.count})</small>
                  </label>
                ))}
              </ProductFilterSection>

              <ProductFilterSection title="Màu sắc" defaultOpen={true}>
                <div className="filter-colors">
                  {productPaletteColors.map((color) => (
                    <button
                      key={color}
                      aria-label={`Lọc màu ${color}`}
                      className={selectedProductColors.includes(color) ? 'selected' : ''}
                      style={{ background: color }}
                      onClick={() => toggleProductFilter(selectedProductColors, setSelectedProductColors, color)}
                    />
                  ))}
                </div>
              </ProductFilterSection>

              <ProductFilterSection title="Khoảng giá">
                <input
                  className="price-range"
                  type="range"
                  min="500000"
                  max="10000000"
                  step="250000"
                  value={maxProductPrice}
                  onChange={(e) => setMaxProductPrice(Number(e.target.value))}
                />
                <div className="price-range-labels">
                  <span>500.000đ</span>
                  <span>{new Intl.NumberFormat('vi-VN').format(maxProductPrice)}đ</span>
                </div>
              </ProductFilterSection>
            </aside>

            <div className="catalog-main">
              <div className="catalog-toolbar">
                <div className="catalog-title-group">
                  <h2>
                    {selectedProductCategory === 'Tất cả' ? 'Tất cả sản phẩm' : selectedProductCategory}{' '}
                    <span className="product-count">({totalProducts})</span>
                  </h2>
                </div>
                <div className="toolbar-actions">
                  <label className="sort-select">
                    <span>Sắp xếp:</span>
                    <select value={productSortBy} onChange={(e) => setProductSortBy(e.target.value)}>
                      <option value="popular">Phổ biến nhất</option>
                      <option value="price-asc">Giá thấp đến cao</option>
                      <option value="price-desc">Giá cao đến thấp</option>
                      <option value="rating">Đánh giá cao</option>
                    </select>
                    <ProductIcon name="chevron" size={14} />
                  </label>
                  <button
                    className={`view-button ${productView === 'grid' ? 'selected' : ''}`}
                    aria-label="Dạng lưới"
                    onClick={() => setProductView('grid')}
                  >
                    <ProductIcon name="grid" size={16} />
                  </button>
                  <button
                    className={`view-button ${productView === 'list' ? 'selected' : ''}`}
                    aria-label="Dạng danh sách"
                    onClick={() => setProductView('list')}
                  >
                    <ProductIcon name="list" size={16} />
                  </button>
                </div>
              </div>

              <div className={`product-grid ${productView === 'list' ? 'list-view' : ''}`} id="product-grid">
                {filteredProducts.length === 0 && (
                  <div className="empty-state">
                    <ProductIcon name="search" size={28} />
                    <strong>Không tìm thấy sản phẩm phù hợp</strong>
                    <span>Thử thay đổi bộ lọc hoặc đặt lại điều kiện tìm kiếm.</span>
                    <button onClick={resetProductFilters}>Xóa bộ lọc</button>
                  </div>
                )}
                {paginatedProducts.map((product) => (
                  <article
                    className="product-card"
                    key={product.id}
                    onClick={() => navigateTo('product-detail', product.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-image-wrap">
                      <img src={product.image} alt={product.name} className="product-image" onError={(e) => { e.target.src = "/assets/product-linen.jpg"; }} />
                      {product.badge && (
                        <span className={`product-badge ${product.badge === 'Ưu đãi' ? 'sale' : product.badge === 'Mới' ? 'new' : ''}`}>
                          {product.badge}
                        </span>
                      )}
                      <button
                        className={`favorite-button ${productFavorites.includes(product.id) ? 'favorited' : ''}`}
                        aria-label="Yêu thích"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProductFavorite(product.id);
                        }}
                      >
                        <ProductIcon name="heart" size={16} />
                      </button>
                    </div>
                    <div className="product-info">
                      <h3 onClick={(e) => { e.stopPropagation(); navigateTo('product-detail', product.id); }}>
                        {product.name}
                      </h3>
                      <span className="product-code">{product.code}</span>
                      <div className="rating">
                        <span className="stars">★★★★★</span>
                        <span>{product.rating} ({product.reviews})</span>
                      </div>
                      <div className="product-colors">
                        {product.colors.map((color, colorIdx) => {
                          const isCurrent = (activeCardColors[product.id] ?? 0) === colorIdx;
                          return (
                            <button
                              key={color}
                              aria-label={`Màu ${color}`}
                              className={isCurrent ? 'active' : ''}
                              style={{ background: color }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCardColors((prev) => ({ ...prev, [product.id]: colorIdx }));
                              }}
                            />
                          );
                        })}
                      </div>
                      <div className="product-pricing-row">
                        <div className="price-wrap">
                          <strong className="price">{formatProductPrice(product.price)}</strong>
                          {product.oldPrice && <small className="old-price">{formatProductPrice(product.oldPrice)}</small>}
                        </div>
                        <button
                          className="card-cart-btn"
                          aria-label="Thêm vào giỏ hàng"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (addCartItem) addCartItem(product);
                            else addToCart(product);
                          }}
                        >
                          <ProductIcon name="cart" size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Luxury Pagination Suite */}
              {totalProducts > 0 && (
                <div className="catalog-pagination-wrap" id="catalog-pagination">
                  <div className="pagination-info-luxury">
                    <span className="pagination-status-indicator" />
                    <div className="pagination-info-text">
                      <span className="pagination-info-main">
                        Hiển thị <strong>{startIndex + 1}–{Math.min(startIndex + itemsPerPage, totalProducts)}</strong> trên <strong>{totalProducts}</strong> sản phẩm
                      </span>
                      <span className="pagination-page-badge">Trang {currentPage} / {totalPages}</span>
                    </div>
                  </div>

                  <div className="catalog-pagination">
                    <button
                      type="button"
                      className="pagination-btn pagination-nav-btn pagination-edge-btn"
                      disabled={currentPage === 1}
                      title="Về trang đầu"
                      aria-label="Về trang đầu"
                      onClick={() => {
                        setCurrentPage(1);
                        document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <ChevronsLeft size={16} />
                    </button>

                    <button
                      type="button"
                      className="pagination-btn pagination-nav-btn"
                      disabled={currentPage === 1}
                      title="Trang trước"
                      aria-label="Trang trước"
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <ChevronLeft size={16} />
                      <span className="nav-btn-text">Trước</span>
                    </button>

                    <div className="pagination-numbers-group">
                      {getPageNumbers().map((item, idx) => {
                        if (item === '...') {
                          return <span key={`ellipsis-${idx}`} className="pagination-ellipsis">…</span>;
                        }
                        const pageNum = Number(item);
                        return (
                          <button
                            key={pageNum}
                            type="button"
                            className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                            aria-label={`Trang ${pageNum}`}
                            aria-current={currentPage === pageNum ? 'page' : undefined}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      className="pagination-btn pagination-nav-btn"
                      disabled={currentPage === totalPages}
                      title="Trang sau"
                      aria-label="Trang sau"
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <span className="nav-btn-text">Sau</span>
                      <ChevronRight size={16} />
                    </button>

                    <button
                      type="button"
                      className="pagination-btn pagination-nav-btn pagination-edge-btn"
                      disabled={currentPage === totalPages}
                      title="Đến trang cuối"
                      aria-label="Đến trang cuối"
                      onClick={() => {
                        setCurrentPage(totalPages);
                        document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <ChevronsRight size={16} />
                    </button>
                  </div>

                  <div className="pagination-pagesize-luxury">
                    <span className="pagesize-label">Mỗi trang:</span>
                    <div className="pagesize-select-wrap">
                      <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="pagesize-select"
                        aria-label="Số sản phẩm mỗi trang"
                      >
                        <option value={8}>8 mẫu</option>
                        <option value={12}>12 mẫu</option>
                        <option value={16}>16 mẫu</option>
                        <option value={24}>24 mẫu</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <UnifiedFooter navigateTo={navigateTo} />

          {/* Toast Notification */}
          <div className={`toast ${productNotice ? 'visible' : ''}`} role="status">
            <ProductIcon name="check" size={16} /> {productNotice}
          </div>
        </div>

  );
}

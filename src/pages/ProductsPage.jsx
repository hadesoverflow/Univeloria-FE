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
  const [recOffset, setRecOffset] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');

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

          {/* Products Search Strip */}
          <section className="products-search-strip" style={{
            maxWidth: '1240px',
            margin: '0 auto 24px',
            padding: '0 20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              backgroundColor: '#ffffff',
              padding: '12px 20px',
              borderRadius: '16px',
              border: '1px solid rgba(23, 51, 82, 0.08)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              flexWrap: 'wrap'
            }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#173352', minWidth: '160px' }}>
                Tìm kiếm sản phẩm
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                minWidth: '260px',
                gap: '10px'
              }}>
                <div style={{
                  position: 'relative',
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <input
                    type="text"
                    value={productSearch || ''}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm rèm bạn cần..."
                    style={{
                      width: '100%',
                      padding: '10px 16px 10px 38px',
                      borderRadius: '999px',
                      border: '1px solid rgba(23, 51, 82, 0.16)',
                      fontSize: '13.5px',
                      outline: 'none',
                      backgroundColor: '#faf8f5',
                      fontFamily: 'inherit'
                    }}
                  />
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, pointerEvents: 'none' }}>
                    <ProductIcon name="search" size={16} />
                  </span>
                  {productSearch && (
                    <button
                      type="button"
                      onClick={() => setProductSearch('')}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748b',
                        fontSize: '14px'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  style={{
                    backgroundColor: '#173352',
                    color: '#FEF3E3',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(23, 51, 82, 0.2)'
                  }}
                  onClick={() => {
                    document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
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

              {/* Roller Curtains Custom Print & Personalization Banner */}
              {(selectedProductCategory === 'Rèm cuốn' || selectedProductTypes.includes('Rèm cuốn')) && (
                <div className="catalog-roller-banner">
                  <div className="roller-banner-content">
                    <span className="roller-badge">✨ DỊCH VỤ IN TRANH THEO YÊU CẦU</span>
                    <h3>Hỗ trợ thiết kế và in hình ảnh, họa tiết theo yêu cầu của khách hàng</h3>
                    <p>
                      Các mục Rèm cuốn của UniVeloria hỗ trợ in ấn tranh nghệ thuật, phong cảnh và logo theo kích thước chuẩn từng khung cửa.
                      Khách hàng có nhu cầu cá nhân hóa sản phẩm vui lòng nhấn <strong>“Liên hệ tư vấn”</strong> để được hỗ trợ chuyên sâu 1:1.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-roller-banner-contact"
                    onClick={() => navigateTo('contact')}
                  >
                    💬 Liên hệ tư vấn
                  </button>
                </div>
              )}

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

          {/* Section: Gợi ý dành riêng cho bạn (Recommendations) */}
          <section className="products-recommendations-section" style={{
            maxWidth: '1240px',
            margin: '50px auto 30px',
            padding: '0 20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#173352',
                  margin: '0 0 6px 0',
                  letterSpacing: '-0.02em'
                }}>
                  Gợi ý dành riêng cho bạn
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  margin: 0
                }}>
                  Khám phá những thiết kế rèm được yêu thích nhất cho không gian sống của bạn
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #173352',
                    color: '#173352',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: recOffset === 0 ? 'not-allowed' : 'pointer',
                    opacity: recOffset === 0 ? 0.4 : 1
                  }}
                  onClick={() => setRecOffset((p) => Math.max(0, p - 1))}
                  disabled={recOffset === 0}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#173352',
                    border: 'none',
                    color: '#FEF3E3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: recOffset + 4 >= productsData.length ? 'not-allowed' : 'pointer',
                    opacity: recOffset + 4 >= productsData.length ? 0.4 : 1
                  }}
                  onClick={() => setRecOffset((p) => (p + 4 < productsData.length ? p + 1 : p))}
                  disabled={recOffset + 4 >= productsData.length}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {productsData.slice(recOffset, recOffset + 4).map((p) => (
                <article
                  key={p.id}
                  onClick={() => navigateTo('product-detail', p.id)}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid rgba(23, 51, 82, 0.08)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {p.badge && (
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#173352',
                        color: '#FEF3E3',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '999px'
                      }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#173352', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                      ★ {p.rating} ({p.reviews} đánh giá)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Từ</span>
                        <strong style={{ fontSize: '15px', color: '#173352' }}>{formatProductPrice(p.price)}</strong>
                      </div>
                      <button
                        type="button"
                        style={{
                          backgroundColor: '#173352',
                          color: '#FEF3E3',
                          border: 'none',
                          padding: '7px 16px',
                          borderRadius: '999px',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (addCartItem) addCartItem(p);
                          else addToCart(p);
                        }}
                      >
                        Thêm giỏ
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Section: Khung nhận ưu đãi & tư vấn (Ready to get our new stuff?) */}
          <section className="products-newsletter-section" style={{
            maxWidth: '1240px',
            margin: '30px auto 60px',
            padding: '0 20px'
          }}>
            <div style={{
              backgroundColor: '#f6f3ed',
              borderRadius: '24px',
              padding: '40px 36px',
              border: '1px solid rgba(23, 51, 82, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#173352',
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.02em'
                }}>
                  Sẵn sàng đón nhận những điều mới mẻ?
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  margin: '0 0 20px 0',
                  lineHeight: '1.6'
                }}>
                  Nhập email của bạn để nhận tư vấn thiết kế và ưu đãi độc quyền từ UniVeloria.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newsletterEmail) return;
                    alert(`Cảm ơn bạn! UniVeloria đã ghi nhận email: ${newsletterEmail}`);
                    setNewsletterEmail('');
                  }}
                  style={{ display: 'flex', gap: '8px', maxWidth: '420px' }}
                >
                  <input
                    type="email"
                    placeholder="Nhập email của bạn..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: '12px 18px',
                      borderRadius: '999px',
                      border: '1px solid rgba(23, 51, 82, 0.18)',
                      fontSize: '13.5px',
                      outline: 'none',
                      backgroundColor: '#ffffff'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#173352',
                      color: '#FEF3E3',
                      border: 'none',
                      padding: '12px 26px',
                      borderRadius: '999px',
                      fontWeight: 700,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(23, 51, 82, 0.2)'
                    }}
                  >
                    Gửi
                  </button>
                </form>
              </div>

              <div style={{
                paddingLeft: '20px',
                borderLeft: '1px solid rgba(23, 51, 82, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#173352',
                  margin: '0 0 6px 0'
                }}>
                  UniVeloria cho tổ ấm & không gian sống
                </h3>
                <p style={{
                  fontSize: '13.5px',
                  color: '#64748b',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Chúng tôi đem đến sự kết hợp hoàn hảo giữa công nghệ mô phỏng AI 3D tiên tiến và nghệ thuật may đo rèm thủ công tinh xảo, đáp ứng chuẩn mực thẩm mỹ của mọi ngôi nhà.
                </p>
              </div>
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

import React, { useState, useEffect } from 'react';
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Star,
  ShieldCheck,
  Ruler,
  Truck,
  Sparkles,
  Check,
  Maximize2,
  X,
  ChevronRight,
  Eye,
  Sliders,
  Calendar,
  Share2
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import { productsData } from '../data/productsData';
import { formatProductPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { reviewApi } from '../api/reviewApi';

export function ProductDetailPage({
  productId,
  navigateTo,
  productsList = productsData,
  productFavorites = [],
  toggleProductFavorite
}) {
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [reviewSummary, setReviewSummary] = useState(null);
  const [canReviewState, setCanReviewState] = useState(null);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const loadReviewsData = () => {
    if (!productId) return;
    reviewApi.getProductReviews(productId)
      .then((res) => {
        if (res && res.success && res.data) {
          setReviewSummary(res.data);
        }
      })
      .catch((err) => console.log('Error loading reviews:', err));

    if (isAuthenticated) {
      reviewApi.checkCanReview(productId)
        .then((res) => {
          if (res && res.success && res.data) {
            setCanReviewState(res.data);
          }
        })
        .catch((err) => console.log('Error checking review permission:', err));
    } else {
      setCanReviewState(null);
    }
  };

  useEffect(() => {
    loadReviewsData();
  }, [productId, isAuthenticated]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert('Vui lòng nhập nội dung đánh giá của bạn.');
      return;
    }
    setIsSubmittingReview(true);
    try {
      const res = await reviewApi.submitProductReview(productId, {
        rating: newRating,
        comment: newComment.trim()
      });
      setToastMsg(res?.message || 'Cảm ơn bạn đã gửi đánh giá sản phẩm thành công!');
      setShowToast(true);
      setNewComment('');
      setNewRating(5);
      loadReviewsData();
    } catch (err) {
      console.error('Lỗi gửi đánh giá:', err);
      alert(err.message || 'Không thể gửi đánh giá.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const [liveProduct, setLiveProduct] = useState(null);

  // Always fetch fresh product detail from Backend API whenever productId changes
  useEffect(() => {
    if (!productId) return;
    let isMounted = true;
    fetch(`/api/Products/${productId}`)
      .then((res) => res.json())
      .then((res) => {
        if (!isMounted) return;
        if (res && res.success && res.data) {
          const p = res.data;
          const categoryMap = {
            linen: 'Rèm vải',
            sheer: 'Rèm voan',
            double: 'Rèm hai lớp',
            roller: 'Rèm cuốn',
            roman: 'Rèm roman',
            wood: 'Rèm gỗ',
            pattern: 'Rèm vải'
          };
          setLiveProduct({
            id: p.id,
            name: p.name,
            code: p.code || `UVL-${p.id}`,
            category: categoryMap[p.category?.toLowerCase()] || p.category || 'Rèm vải',
            room: p.roomType || 'Phòng khách',
            style: p.style || 'Hiện đại',
            colors: Array.isArray(p.colors) && p.colors.length > 0
              ? p.colors.map((c) => (typeof c === 'string' ? c : c.hexCode || '#c8a87d'))
              : ['#e9d8c2', '#c5a27d'],
            price: Number(p.basePrice) || 2450000,
            oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
            rating: p.rating ? String(p.rating) : '5.0',
            reviews: p.reviewsCount || 12,
            badge: p.badge || (p.isFeatured ? 'Nổi bật' : ''),
            image: p.thumbnailUrl || p.imageUrls?.[0] || '/assets/product-linen.jpg',
            mainImage: (p.code === 'UVL-4' || String(p.id) === '4') ? '/assets/uvl4-main.jpg' : (p.imageUrls?.[0] || p.thumbnailUrl || '/assets/product-linen.jpg'),
            subImages: (p.code === 'UVL-4' || String(p.id) === '4')
              ? ['/assets/uvl4-sub1.jpg', '/assets/uvl4-sub2.jpg', '/assets/uvl4-sub3.jpg']
              : (Array.isArray(p.imageUrls) && p.imageUrls.length > 1
                  ? p.imageUrls.slice(1, 4)
                  : []),
            imageUrls: p.imageUrls || [],
            description: p.description,
            fullDescription: p.fullDescription,
            material: p.material,
            lightBlocking: p.lightBlocking,
            fabricWidth: p.fabricWidth,
            origin: p.origin,
            warranty: p.warranty
          });
        }
      })
      .catch((err) => console.log('Using cached product detail:', err));
    return () => { isMounted = false; };
  }, [productId]);

  // Find target product or fallback to id 4
  const baseProduct = productsList.find((p) => String(p.id) === String(productId)) ||
    productsData.find((p) => String(p.id) === String(productId)) ||
    productsData.find((p) => p.code === 'UVL-4') ||
    productsData[0];

  const product = liveProduct || baseProduct;

  // Gallery state - Exactly matching user reference for UVL-4
  const isUvl4 = product.code === 'UVL-4' || String(product.id) === '4';
  const primaryImg = isUvl4 ? '/assets/uvl4-main.jpg' : (product.mainImage || (product.imageUrls && product.imageUrls[0]) || product.image || '/assets/product-linen.jpg');
  const allImages = Array.isArray(product.imageUrls) && product.imageUrls.length > 0
    ? product.imageUrls
    : (product.image ? [product.image] : [primaryImg]);

  const subImgs = isUvl4
    ? ['/assets/uvl4-sub1.jpg', '/assets/uvl4-sub2.jpg', '/assets/uvl4-sub3.jpg']
    : (allImages.length > 1
        ? allImages.slice(1, 4)
        : (Array.isArray(product.subImages) && product.subImages.length > 0
            ? product.subImages
            : []));

  const [activeImage, setActiveImage] = useState(primaryImg);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [width, setWidth] = useState(2.4);
  const [height, setHeight] = useState(2.6);
  const [pleatStyle, setPleatStyle] = useState('Xếp ly định hình 2 lớp cao cấp');
  const [activeTab, setActiveTab] = useState('desc');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Reset active image when product changes
  useEffect(() => {
    const isUvl4 = product.code === 'UVL-4' || String(product.id) === '4';
    const initialImg = isUvl4 ? '/assets/uvl4-main.jpg' : (product.mainImage || (product.imageUrls && product.imageUrls[0]) || product.image || '/assets/product-linen.jpg');
    setActiveImage(initialImg);
    setSelectedColorIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId, product]);

  const colors = Array.isArray(product.colors) && product.colors.length > 0
    ? product.colors
    : ['#d5c3aa', '#9e8265', '#776e65'];

  const colorNames = {
    '#d5c3aa': 'Antique Gold (Vàng cát tân cổ điển)',
    '#d7c4a8': 'Antique Gold (Vàng cát tân cổ điển)',
    '#a99072': 'Earth Brown (Nâu hạt dẻ ấm cúng)',
    '#8d8375': 'Ash Grey (Xám trầm quý phái)',
    '#9e8265': 'Earth Brown (Nâu hạt dẻ ấm cúng)',
    '#776e65': 'Ash Grey (Xám trầm quý phái)',
    '#e9d8c2': 'Kem Linen tự nhiên',
    '#c5a27d': 'Nâu be nhã nhặn',
    '#755039': 'Gỗ mun sồi sang trọng',
    '#d7b89a': 'Vàng champange óng ánh',
    '#f1ece5': 'Trắng tinh khôi',
    '#171b24': 'Đen huyền bí'
  };

  // Sub images labels / subtitles for luxury feel
  const subLabels = [
    { title: 'Chi tiết voan thêu', desc: 'Họa tiết lá thêu tinh xảo trên nền voan trắng mờ' },
    { title: 'Chất vải rủ dệt thoi', desc: 'Độ mềm mại và gợn sóng hoàn hảo màu hạt dẻ' },
    { title: 'May xếp ly & ray trượt', desc: 'Khớp nối ray trượt âm trần kéo trơn tru êm ái' }
  ];

  const displayRating = reviewSummary && reviewSummary.totalReviews > 0
    ? reviewSummary.averageRating.toFixed(1)
    : (product.rating ? Number(product.rating).toFixed(1) : '5.0');
  const displayReviewsCount = reviewSummary
    ? reviewSummary.totalReviews
    : (product.reviews || 0);

  const calculatedArea = (width * height).toFixed(2);
  const unitPrice = product.price || 980000;
  const estimatedTotal = Math.round(unitPrice * calculatedArea * quantity);

  const handleAddToCart = () => {
    const chosenColor = colors[selectedColorIdx] || colors[0];
    const customizedProduct = {
      ...product,
      calculatedArea,
      width,
      height,
      pleatStyle,
      price: unitPrice
    };
    if (addToCart) {
      addToCart(customizedProduct, quantity, chosenColor);
    }
    setToastMsg(`Đã thêm "${product.name}" (${quantity} bộ - ${calculatedArea}m²) vào giỏ hàng!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const isFavorited = productFavorites.includes(product.id);

  // Related products
  const relatedProducts = productsData.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="product-detail-page">
      {/* Top Header */}
      <Header currentPage="products" navigateTo={navigateTo} themeClass="topbar-products" />

      {/* Breadcrumb Navigation Bar */}
      <div className="pdetail-nav-strip">
        <div className="pdetail-container pdetail-nav-inner">
          <button
            className="pdetail-back-btn"
            onClick={() => navigateTo('products')}
            aria-label="Quay lại danh mục sản phẩm"
          >
            <ArrowLeft size={16} />
            <span>Quay lại danh sách sản phẩm</span>
          </button>

          <nav className="pdetail-breadcrumbs" aria-label="Breadcrumbs">
            <span onClick={() => navigateTo('home')}>Trang chủ</span>
            <ChevronRight size={13} />
            <span onClick={() => navigateTo('products')}>Sản phẩm</span>
            <ChevronRight size={13} />
            <span onClick={() => navigateTo('products')}>{product.category || 'Rèm vải'}</span>
            <ChevronRight size={13} />
            <strong className="current">{product.name}</strong>
          </nav>
        </div>
      </div>

      {/* Main Detail Content Area */}
      <section className="pdetail-main-section">
        <div className="pdetail-container pdetail-main-grid">

          {/* LEFT: LUXURY IMAGE GALLERY (1 MAIN IMAGE + 3 SUB-IMAGES) */}
          <div className="pdetail-gallery-column">
            <div className="pdetail-gallery-composite">
              
              {/* 1. Main Large Image */}
              <div className="gallery-main-frame">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="gallery-main-photo"
                />



                {/* Inspect Fullscreen Button */}
                <button
                  className="gallery-zoom-btn"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="Phóng to ảnh chi tiết"
                  title="Xem ảnh toàn màn hình"
                >
                  <Maximize2 size={16} />
                  <span>Phóng to chi tiết</span>
                </button>
              </div>

              {/* 2. Sub Images Vertically Stacked on Right (only if subImgs exist) */}
              {subImgs && subImgs.length > 0 && (
                <div className="gallery-sub-column" role="region" aria-label="Ảnh phụ chi tiết góc chụp">
                  {subImgs.slice(0, 3).map((subImg, idx) => {
                    const isActive = activeImage === subImg;
                    const label = (isUvl4 && subLabels[idx]) || { title: `Góc chụp chi tiết ${idx + 1}`, desc: 'Cận cảnh sản phẩm' };
                    return (
                      <div
                        key={idx}
                        className={`gallery-sub-thumb-card ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveImage(subImg)}
                        title={label.title}
                      >
                        <div className="gallery-sub-thumb-img-wrap">
                          <img
                            src={subImg}
                            alt={`${product.name} - ${label.title}`}
                            className="gallery-sub-thumb-img"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            </div>

          {/* RIGHT: PRODUCT INFO & PURCHASE PANEL */}
          <div className="pdetail-info-column">
            <div className="pdetail-info-card">

              {/* Header Info */}
              <div className="pdetail-eyebrow-row">
                <span className="pdetail-collection-tag">
                  {product.room ? `Bộ sưu tập ${product.room}` : 'UniVeloria Haute Couture'}
                </span>
                <span className="pdetail-stock-tag">
                  <Check size={12} /> Sẵn sàng may đo lắp đặt
                </span>
              </div>

              <h1 className="pdetail-title">{product.name}</h1>
              
              <div className="pdetail-meta-row">
                <span className="pdetail-code-badge">Mã SP: {product.code || (`UVL-${product.id}`)}</span>
                <div className="pdetail-rating">
                  <div className="stars">
                    <Star size={14} fill="#e5a93b" color="#e5a93b" />
                    <Star size={14} fill="#e5a93b" color="#e5a93b" />
                    <Star size={14} fill="#e5a93b" color="#e5a93b" />
                    <Star size={14} fill="#e5a93b" color="#e5a93b" />
                    <Star size={14} fill="#e5a93b" color="#e5a93b" />
                  </div>
                  <strong>{displayRating}</strong>
                  <span className="reviews">({displayReviewsCount} đánh giá khách hàng)</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="pdetail-price-box">
                <div className="pdetail-price-main">
                  <span className="pdetail-current-price">{formatProductPrice(product.price || 980000)}</span>
                  <span className="pdetail-price-unit">/ m² hoàn thiện</span>
                </div>
                {product.oldPrice && (
                  <div className="pdetail-price-sub">
                    <span className="pdetail-old-price">{formatProductPrice(product.oldPrice)}</span>
                    <span className="pdetail-save-badge">
                      Tiết kiệm {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Short summary */}
              <p className="pdetail-short-desc">
                {product.description || `Mẫu rèm cao cấp ${product.name} thiết kế tinh xảo, may đo chuẩn xác theo kích thước từng ô cửa.`}
              </p>

              <hr className="pdetail-divider" />

              {/* Color Swatch Selection */}
              <div className="pdetail-option-group">
                <div className="pdetail-option-label">
                  <span>Màu sắc tuyển chọn:</span>
                  <strong>{colorNames[colors[selectedColorIdx]] || colors[selectedColorIdx]}</strong>
                </div>
                <div className="pdetail-color-swatches">
                  {colors.map((color, idx) => {
                    const isSelected = selectedColorIdx === idx;
                    return (
                      <button
                        key={color + idx}
                        className={`pdetail-swatch-btn ${isSelected ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColorIdx(idx)}
                        aria-label={`Chọn màu ${color}`}
                      >
                        {isSelected && <span className="swatch-check" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dimension & Measuring Inputs */}
              <div className="pdetail-option-group">
                <div className="pdetail-option-label">
                  <span>Kích thước may đo cửa sổ / cửa đi:</span>
                  <small className="label-tip">(Hỗ trợ thợ kỹ thuật khảo sát lại tại nhà)</small>
                </div>
                <div className="pdetail-dimension-grid">
                  <div className="dimension-field">
                    <label>Chiều rộng (m)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="20"
                      value={width}
                      onChange={(e) => setWidth(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                    />
                  </div>
                  <div className="dimension-field">
                    <label>Chiều cao (m)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="10"
                      value={height}
                      onChange={(e) => setHeight(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                    />
                  </div>
                  <div className="dimension-calc-badge">
                    <Ruler size={14} />
                    <span>Diện tích: <strong>{calculatedArea} m²</strong></span>
                  </div>
                </div>
              </div>

              {/* Quantity & Estimated Total */}
              <div className="pdetail-action-summary">
                <div className="quantity-controller">
                  <span className="qty-label">Số lượng bộ:</span>
                  <div className="qty-stepper">
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                  </div>
                </div>

                <div className="estimate-total-box">
                  <span className="estimate-label">Tạm tính ({calculatedArea}m² × {quantity} bộ):</span>
                  <strong className="estimate-val">{formatProductPrice(estimatedTotal)}</strong>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="pdetail-cta-group">
                <button
                  className="pdetail-btn-cart"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} />
                  <span>Thêm vào giỏ hàng</span>
                </button>

                <button
                  className={`pdetail-btn-fav ${isFavorited ? 'favorited' : ''}`}
                  onClick={() => toggleProductFavorite && toggleProductFavorite(product.id)}
                  aria-label="Lưu vào yêu thích"
                  title="Yêu thích sản phẩm"
                >
                  <Heart size={20} fill={isFavorited ? '#df6459' : 'none'} color={isFavorited ? '#df6459' : 'currentColor'} />
                </button>
              </div>

              {/* Secondary Action: AI 3D Studio */}
              <div className="pdetail-single-secondary">
                <button
                  className="pdetail-btn-studio-full"
                  onClick={() => navigateTo('studio')}
                >
                  <Sliders size={16} />
                  <span>Thử mẫu rèm vào phòng thực tế bằng AI 3D Studio</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pdetail-trust-grid">
                <div className="trust-item">
                  <ShieldCheck size={20} className="trust-icon" />
                  <div>
                    <strong>Bảo hành 5 năm</strong>
                    <span>Ray trượt, phụ kiện & đường may</span>
                  </div>
                </div>
                <div className="trust-item">
                  <Ruler size={20} className="trust-icon" />
                  <div>
                    <strong>Khảo sát tận nơi</strong>
                    <span>Mang mẫu vải & tư vấn miễn phí tại nhà</span>
                  </div>
                </div>
                <div className="trust-item">
                  <Truck size={20} className="trust-icon" />
                  <div>
                    <strong>Miễn phí lắp đặt</strong>
                    <span>Hoàn thiện thẩm mỹ chuẩn cao cấp</span>
                  </div>
                </div>
                <div className="trust-item">
                  <Sparkles size={20} className="trust-icon" />
                  <div>
                    <strong>Vải cao cấp OEKO-TEX</strong>
                    <span>An toàn tuyệt đối cho sức khỏe</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* TABS SECTION: SPECIFICATIONS, CARE & REVIEWS */}
      <section className="pdetail-tabs-section">
        <div className="pdetail-container">
          <div className="pdetail-tabs-header">
            <button
              className={`pdetail-tab-btn ${activeTab === 'desc' ? 'active' : ''}`}
              onClick={() => setActiveTab('desc')}
            >
              Mô tả chi tiết & Cảm hứng
            </button>
            <button
              className={`pdetail-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Thông số kỹ thuật
            </button>
            <button
              className={`pdetail-tab-btn ${activeTab === 'care' ? 'active' : ''}`}
              onClick={() => setActiveTab('care')}
            >
              Hướng dẫn chăm sóc & Bảo quản
            </button>
            <button
              className={`pdetail-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Đánh giá khách hàng ({displayReviewsCount})
            </button>
          </div>

          <div className="pdetail-tab-body">
            {activeTab === 'desc' && (
              <div className="tab-pane desc-pane">
                <div className="desc-text-wrap">
                  <h3>{product.name ? `Cảm hứng thiết kế & Không gian: ${product.name}` : 'Mô tả chi tiết sản phẩm'}</h3>
                  <div className="desc-content-body" style={{ whiteSpace: 'pre-line', fontSize: '14.5px', lineHeight: '1.85', color: '#334155' }}>
                    {product.fullDescription || product.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
                  </div>
                </div>
                <div className="desc-showcase-img">
                  <img src={primaryImg} alt={product.name} />
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="tab-pane specs-pane">
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <th>Mã sản phẩm</th>
                      <td>{product.code || (`UVL-${product.id}`)}</td>
                    </tr>
                    <tr>
                      <th>Loại rèm / Danh mục</th>
                      <td>{product.category || 'Rèm vải cao cấp'}</td>
                    </tr>
                    <tr>
                      <th>Không gian phù hợp</th>
                      <td>{product.room || product.roomType || 'Phòng khách'}</td>
                    </tr>
                    <tr>
                      <th>Phong cách thiết kế</th>
                      <td>{product.style || 'Hiện đại'}</td>
                    </tr>
                    <tr>
                      <th>Chất liệu vải</th>
                      <td>{product.material || 'Theo tiêu chuẩn nhà sản xuất'}</td>
                    </tr>
                    <tr>
                      <th>Khổ vải may tiêu chuẩn</th>
                      <td>{product.fabricWidth || 'Theo kích thước đo đạc thực tế'}</td>
                    </tr>
                    <tr>
                      <th>Khả năng cản sáng</th>
                      <td>{product.lightBlocking || 'Tùy chỉnh theo yêu cầu'}</td>
                    </tr>
                    <tr>
                      <th>Xuất xứ vải & phụ kiện</th>
                      <td>{product.origin || 'Nhập khẩu chính hãng'}</td>
                    </tr>
                    <tr>
                      <th>Chế độ bảo hành chính hãng</th>
                      <td>{product.warranty || 'Bảo hành chính hãng UniVeloria'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="tab-pane care-pane">
                <div className="care-card-grid">
                  <div className="care-card">
                    <span className="care-num">01</span>
                    <strong>Hút bụi định kỳ</strong>
                    <p>Sử dụng đầu hút chổi mềm nhẹ nhàng hút bụi bề mặt rèm mỗi tháng một lần để giữ màu vải luôn tươi sáng.</p>
                  </div>
                  <div className="care-card">
                    <span className="care-num">02</span>
                    <strong>Chế độ giặt phù hợp</strong>
                    <p>Có thể giặt khô chuyên dụng hoặc giặt máy chế độ nhẹ (Delicate) dưới 30°C với túi giặt bảo vệ.</p>
                  </div>
                  <div className="care-card">
                    <span className="care-num">03</span>
                    <strong>Ủi & Giữ nếp sóng</strong>
                    <p>Sử dụng bàn ủi hơi nước đứng ở nhiệt độ vừa phải để rèm vào nếp sóng suôn mượt tự nhiên.</p>
                  </div>
                  <div className="care-card">
                    <span className="care-num">04</span>
                    <strong>Dịch vụ giặt rèm tận nhà</strong>
                    <p>UniVeloria hỗ trợ dịch vụ tháo lắp và giặt ủi rèm chuyên nghiệp định kỳ cho quý khách hàng thân thiết.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane reviews-pane">
                {/* 1. Score summary & star distribution */}
                <div className="reviews-summary-header">
                  <div className="score-box">
                    <span className="score">{displayRating}</span>
                    <div className="score-stars">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={16}
                          fill={s <= Math.round(Number(displayRating)) ? '#e5a93b' : 'none'}
                          color="#e5a93b"
                        />
                      ))}
                    </div>
                    <small>
                      {displayReviewsCount > 0
                        ? `Dựa trên ${displayReviewsCount} lượt may đo thực tế`
                        : 'Sản phẩm may đo thiết kế thủ công cao cấp'}
                    </small>
                  </div>
                  <div className="review-stats-bars">
                    <div className="bar-row">
                      <span>5 sao</span>
                      <div className="bar">
                        <div className="fill" style={{ width: `${reviewSummary?.fiveStarPercent || (displayReviewsCount === 0 ? 0 : 100)}%` }} />
                      </div>
                      <span>{reviewSummary?.fiveStarPercent || (displayReviewsCount === 0 ? 0 : 100)}%</span>
                    </div>
                    <div className="bar-row">
                      <span>4 sao</span>
                      <div className="bar">
                        <div className="fill" style={{ width: `${reviewSummary?.fourStarPercent || 0}%` }} />
                      </div>
                      <span>{reviewSummary?.fourStarPercent || 0}%</span>
                    </div>
                    <div className="bar-row">
                      <span>3 sao</span>
                      <div className="bar">
                        <div className="fill" style={{ width: `${reviewSummary?.threeStarPercent || 0}%` }} />
                      </div>
                      <span>{reviewSummary?.threeStarPercent || 0}%</span>
                    </div>
                    <div className="bar-row">
                      <span>2 sao</span>
                      <div className="bar">
                        <div className="fill" style={{ width: `${reviewSummary?.twoStarPercent || 0}%` }} />
                      </div>
                      <span>{reviewSummary?.twoStarPercent || 0}%</span>
                    </div>
                    <div className="bar-row">
                      <span>1 sao</span>
                      <div className="bar">
                        <div className="fill" style={{ width: `${reviewSummary?.oneStarPercent || 0}%` }} />
                      </div>
                      <span>{reviewSummary?.oneStarPercent || 0}%</span>
                    </div>
                  </div>
                </div>

                {/* 2. Review Form / Purchase Condition Status */}
                {canReviewState?.canReview && (
                  <div className="review-form-card">
                    <h4 className="review-form-title">
                      <Sparkles size={18} color="#c8a87d" />
                      <span>Đánh giá trải nghiệm may đo thực tế của bạn</span>
                    </h4>
                    <p className="review-form-sub">
                      Xác nhận: Bạn đã đặt may đo thành công sản phẩm này. Hãy chia sẻ cảm nhận chân thực về đường may, chất vải và dịch vụ lắp đặt nhé!
                    </p>
                    <form onSubmit={handleSubmitReview}>
                      <div className="review-rating-select">
                        <span>Đánh giá mức độ hài lòng:</span>
                        <div className="star-picker">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              className={`star-pick-btn ${star <= newRating ? 'active' : ''}`}
                              onClick={() => setNewRating(star)}
                              title={`${star} sao`}
                            >
                              <Star
                                size={22}
                                fill={star <= newRating ? '#e5a93b' : 'none'}
                                color="#e5a93b"
                              />
                            </button>
                          ))}
                          <strong className="star-rating-text">{newRating} / 5 sao</strong>
                        </div>
                      </div>
                      <div className="review-textarea-wrap">
                        <textarea
                          rows={3}
                          placeholder="Chia sẻ về độ rủ, chất liệu vải, khả năng cản sáng và dịch vụ lắp đặt của UniVeloria..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="review-submit-btn" disabled={isSubmittingReview}>
                        {isSubmittingReview ? 'Đang gửi đánh giá...' : 'Gửi đánh giá sản phẩm'}
                      </button>
                    </form>
                  </div>
                )}

                {canReviewState?.alreadyReviewed && (
                  <div className="review-status-notice verified">
                    <Check size={20} color="#2e7d32" />
                    <div>
                      <strong>Đã ghi nhận đánh giá của bạn</strong>
                      <p>Bạn đã gửi đánh giá cho mẫu rèm này. Cảm ơn bạn đã tin tưởng đồng hành cùng UniVeloria!</p>
                    </div>
                  </div>
                )}

                {isAuthenticated && !canReviewState?.hasPurchased && (
                  <div className="review-status-notice locked">
                    <ShieldCheck size={20} color="#755039" />
                    <div>
                      <strong>Chỉ dành cho khách hàng đã mua sản phẩm</strong>
                      <p>
                        Tính năng đánh giá chỉ mở cho những khách hàng đã đặt may đo thành công sản phẩm này nhằm đảm bảo tính khách quan và minh bạch 100%.
                      </p>
                    </div>
                  </div>
                )}

                {!isAuthenticated && (
                  <div className="review-status-notice guest">
                    <ShieldCheck size={20} color="#755039" />
                    <div>
                      <strong>Bạn đã đặt mua sản phẩm này?</strong>
                      <p>Vui lòng đăng nhập bằng tài khoản đặt hàng để viết nhận xét và đánh giá thực tế.</p>
                      <button
                        type="button"
                        className="review-login-btn"
                        onClick={() => navigateTo('login')}
                      >
                        Đăng nhập để đánh giá
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Real Customer Reviews List */}
                <div className="reviews-list">
                  {reviewSummary?.reviews && reviewSummary.reviews.length > 0 ? (
                    reviewSummary.reviews.map((rev) => (
                      <div key={rev.id} className="review-item">
                        <div className="review-item-top">
                          <div className="review-user-avatar">
                            {rev.customerAvatar || (rev.customerName ? rev.customerName.charAt(0).toUpperCase() : 'K')}
                          </div>
                          <div className="review-user-meta">
                            <div className="review-user-name-row">
                              <span className="review-user-name">{rev.customerName || 'Khách hàng UniVeloria'}</span>
                              <span className="review-verified-tag">
                                <Check size={11} /> Đã mua hàng
                              </span>
                            </div>
                            <span className="review-date">
                              {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('vi-VN') : 'Gần đây'}
                            </span>
                          </div>
                        </div>

                        <div className="stars">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={14}
                              fill={s <= rev.rating ? '#e5a93b' : 'none'}
                              color="#e5a93b"
                            />
                          ))}
                        </div>

                        <p style={{ color: '#334155', lineHeight: '1.6', margin: '4px 0 0 0', fontSize: '14px' }}>
                          {rev.comment}
                        </p>

                        {rev.adminReply && (
                          <div className="review-admin-reply">
                            <strong>Phản hồi từ UniVeloria:</strong>
                            <p>{rev.adminReply}</p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="reviews-empty-state">
                      <Star size={36} color="#c8a87d" strokeWidth={1.5} />
                      <h4>Chưa có đánh giá nào cho sản phẩm này</h4>
                      <p>
                        Các đánh giá từ những khách hàng đã mua và trải nghiệm thực tế mẫu rèm này sẽ hiển thị tại đây.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS SECTION */}
      <section className="pdetail-related-section">
        <div className="pdetail-container">
          <div className="related-header">
            <div>
              <span className="eyebrow">KHÁM PHÁ THÊM <span /></span>
              <h2>Sản phẩm cùng phong cách</h2>
            </div>
            <button
              className="view-all-btn"
              onClick={() => navigateTo('products')}
            >
              Xem tất cả sản phẩm
            </button>
          </div>

          <div className="related-grid">
            {relatedProducts.map((rel) => (
              <article
                key={rel.id}
                className="product-card"
                onClick={() => navigateTo('product-detail', rel.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-image-wrap">
                  <img src={rel.image} alt={rel.name} className="product-image" />
                  {rel.badge && <span className="product-badge">{rel.badge}</span>}
                  <button
                    className={`favorite-button ${productFavorites.includes(rel.id) ? 'favorited' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleProductFavorite && toggleProductFavorite(rel.id);
                    }}
                    aria-label="Yêu thích"
                  >
                    <Heart size={16} />
                  </button>
                </div>
                <div className="product-info">
                  <h3>{rel.name}</h3>
                  <span className="product-code">{rel.code}</span>
                  <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span>{rel.rating} ({rel.reviews})</span>
                  </div>
                  <div className="product-pricing-row">
                    <div className="price-wrap">
                      <strong className="price">{formatProductPrice(rel.price)}</strong>
                      {rel.oldPrice && <small className="old-price">{formatProductPrice(rel.oldPrice)}</small>}
                    </div>
                    <button
                      className="card-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart && addToCart(rel, 1);
                        setToastMsg(`Đã thêm "${rel.name}" vào giỏ hàng!`);
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000);
                      }}
                      aria-label="Thêm vào giỏ hàng"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <UnifiedFooter navigateTo={navigateTo} />

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div className="pdetail-lightbox-modal" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Đóng phóng to"
            >
              <X size={24} />
            </button>
            <img src={activeImage} alt={product.name} className="lightbox-img" />
            <div className="lightbox-thumbs-bar">
              <button
                className={`lb-thumb ${activeImage === primaryImg ? 'active' : ''}`}
                onClick={() => setActiveImage(primaryImg)}
              >
                <img src={primaryImg} alt="Ảnh chính" />
              </button>
              {subImgs.slice(0, 3).map((sub, i) => (
                <button
                  key={i}
                  className={`lb-thumb ${activeImage === sub ? 'active' : ''}`}
                  onClick={() => setActiveImage(sub)}
                >
                  <img src={sub} alt={`Ảnh phụ ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div className={`toast ${showToast ? 'visible' : ''}`} role="status">
        <Check size={16} /> {toastMsg}
      </div>
    </div>
  );
}

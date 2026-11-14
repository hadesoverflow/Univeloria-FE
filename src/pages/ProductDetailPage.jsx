import React, { useState, useEffect } from 'react';
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
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
import { apiClient } from '../api/apiClient';
import { WindowMeasurementGuideModal } from '../components/ui/WindowMeasurementGuideModal';

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
    setLiveProduct(null);
    if (!productId) return;
    let isMounted = true;
    apiClient(`/api/Products/${productId}`)
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
      .catch((err) => {
        console.log('Using cached product detail:', err);
        if (isMounted) setLiveProduct(null);
      });
    return () => { isMounted = false; };
  }, [productId]);

  // Find target product or fallback to id 1
  const baseProduct = productsList.find((p) => String(p.id) === String(productId)) ||
    productsData.find((p) => String(p.id) === String(productId)) ||
    productsData.find((p) => Number(p.id) === Number(productId)) ||
    productsData.find((p) => p.code === 'UVL-SFOLD01') ||
    productsData[0];

  const product = (liveProduct && String(liveProduct.id) === String(productId)) ? liveProduct : baseProduct;

  // Gallery state - Single main image per user requirement
  const primaryImg = product.mainImage || product.image || (product.imageUrls && product.imageUrls[0]) || '/product/Rèm/Rèm Vải/Rèm Hai Lớp S-Fold Định Hình Cao Cấp.png';
  const subImgs = []; // Only 1 image is displayed on Detail page

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
  const [showMeasureGuide, setShowMeasureGuide] = useState(false);

  const isRollerCurtain = Boolean(
    product?.category?.toLowerCase().includes('cuốn') ||
    product?.name?.toLowerCase().includes('cuốn') ||
    product?.name?.toLowerCase().includes('roller') ||
    product?.category?.toLowerCase().includes('roller')
  );

  // Reset active image when product changes
  useEffect(() => {
    const initialImg = product.mainImage || product.image || (product.imageUrls && product.imageUrls[0]) || '/product/Rèm/Rèm Vải/Rèm Hai Lớp S-Fold Định Hình Cao Cấp.png';
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

  const isSetUnit = product.unit === 'bộ' || product.category === 'Thanh rèm';
  const calculatedArea = (width * height).toFixed(2);
  const unitPrice = product.price || 980000;
  const estimatedTotal = isSetUnit
    ? Math.round(unitPrice * quantity)
    : Math.round(unitPrice * calculatedArea * quantity);

  const handleAddToCart = () => {
    const chosenColor = colors[selectedColorIdx] || colors[0];
    const customizedProduct = {
      ...product,
      calculatedArea: isSetUnit ? null : calculatedArea,
      width,
      height: isSetUnit ? null : height,
      pleatStyle: isSetUnit ? null : pleatStyle,
      price: unitPrice
    };
    if (addToCart) {
      addToCart(customizedProduct, quantity, chosenColor);
    }
    const specInfo = isSetUnit ? `${quantity} bộ` : `${quantity} bộ - ${calculatedArea}m²`;
    setToastMsg(`Đã thêm "${product.name}" (${specInfo}) vào giỏ hàng!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const isFavorited = productFavorites.includes(product.id);

  // Related products (same category preferred)
  const relatedProducts = [
    ...productsData.filter((p) => p.id !== product.id && p.category === product.category),
    ...productsData.filter((p) => p.id !== product.id && p.category !== product.category)
  ].slice(0, 4);

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
              
              {/* 1. Main Large Image (Single View) */}
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

            </div>

            </div>

          {/* RIGHT: PRODUCT INFO & PURCHASE PANEL */}
          <div className="pdetail-info-column">
            <div className="pdetail-info-card">

              {/* Header Info */}
              <div className="pdetail-eyebrow-row">
                <div className="pdetail-tags-group">
                  <span className="pdetail-category-pill">
                    {product.category || 'Rèm cao cấp'}
                  </span>
                  <span className="pdetail-collection-tag">
                    {product.room ? `Bộ sưu tập ${product.room}` : 'UniVeloria Haute Couture'}
                  </span>
                </div>
                <span className="pdetail-stock-tag">
                  <Check size={12} /> Sẵn sàng may đo lắp đặt
                </span>
              </div>

              <h1 className="pdetail-title">{product.name}</h1>
              
              <div className="pdetail-meta-row">
                <span className="pdetail-code-badge">Mã SP: {product.code || (`UVL-${product.id}`)}</span>
                <span className="pdetail-category-badge">
                  Danh mục: <strong>{product.category || 'Rèm cao cấp'}</strong>
                </span>
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
                  <span className="pdetail-price-unit">/ {product.unit || 'm² hoàn thiện'}</span>
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
                  <strong>{product.colorNames?.[selectedColorIdx] || colorNames[colors[selectedColorIdx]] || colors[selectedColorIdx]}</strong>
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

              {/* Roller Curtain Customization & Print Notice */}
              {isRollerCurtain && (
                <div className="pdetail-roller-custom-card">
                  <div className="custom-card-header">
                    <Sparkles size={16} color="#c8a87d" />
                    <strong>Hỗ trợ in tranh & họa tiết theo yêu cầu</strong>
                  </div>
                  <p className="custom-card-desc">
                    (Hỗ trợ thiết kế và in hình ảnh, họa tiết theo yêu cầu của khách hàng). Khách hàng có nhu cầu cá nhân hóa sản phẩm vui lòng nhấn <strong>“Liên hệ tư vấn”</strong> để được hỗ trợ.
                  </p>
                  <button
                    type="button"
                    className="btn-roller-consult-link"
                    onClick={() => navigateTo && navigateTo('contact')}
                  >
                    💬 Liên hệ tư vấn
                  </button>
                </div>
              )}

              {/* Dimension & Measuring Inputs */}
              {!isSetUnit ? (
                <div className="pdetail-option-group">
                  <div className="pdetail-option-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span>Kích thước may đo cửa sổ / cửa đi:</span>
                      <small className="label-tip">(Hỗ trợ thợ kỹ thuật khảo sát lại tại nhà)</small>
                    </div>
                    <button
                      type="button"
                      className="pdetail-btn-measure-guide"
                      onClick={() => setShowMeasureGuide(true)}
                      title="Xem quy chuẩn 5 bước đo cửa chính xác"
                    >
                      <Ruler size={13} />
                      <span>Cách đo cửa để đặt rèm</span>
                    </button>
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
              ) : (
                <div className="pdetail-option-group">
                  <div className="pdetail-option-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span>Quy cách lắp đặt thanh rèm:</span>
                      <small className="label-tip">(Đo theo kích thước thực tế ô cửa tại công trình)</small>
                    </div>
                  </div>
                  <div className="pdetail-dimension-grid" style={{ gridTemplateColumns: '1fr auto' }}>
                    <div className="dimension-field">
                      <label>Chiều dài thanh ray dự kiến (m)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="12"
                        value={width}
                        onChange={(e) => setWidth(Math.max(1, parseFloat(e.target.value) || 1))}
                      />
                    </div>
                    <div className="dimension-calc-badge">
                      <Ruler size={14} />
                      <span>Chiều dài ray: <strong>{width} mét</strong></span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity & Estimated Total */}
              <div className="pdetail-action-summary">
                <div className="quantity-controller">
                  <span className="qty-label">Số lượng {product.unit || 'bộ'}:</span>
                  <div className="qty-stepper">
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                  </div>
                </div>

                <div className="estimate-total-box">
                  <span className="estimate-label">
                    {isSetUnit ? `Tạm tính (${quantity} ${product.unit || 'bộ'}):` : `Tạm tính (${calculatedArea}m² × ${quantity} bộ):`}
                  </span>
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
                  onClick={() => {
                    let targetStudioId = 'rainbow-brioni';
                    if (product?.name?.includes('1198')) targetStudioId = 'elogi-1198-2';
                    else if (product?.name?.includes('1206')) targetStudioId = 'elogi-1206-1';
                    else if (product?.name?.includes('1230')) targetStudioId = 'elogi-1230-1';
                    else if (product?.name?.includes('Harmony')) targetStudioId = 'roller-harmony-2';
                    else if (product?.name?.includes('Malange')) targetStudioId = 'roller-malange-1';
                    else if (product?.name?.includes('Moon')) targetStudioId = 'roller-moon';
                    else if (product?.name?.includes('Silvia')) targetStudioId = 'roller-silvia';
                    else if (product?.name?.includes('Sunny')) targetStudioId = 'roller-sunny';
                    else if (product?.name?.includes('Brioni')) targetStudioId = 'rainbow-brioni';
                    else if (product?.name?.includes('Infiniti')) targetStudioId = 'rainbow-infiniti';
                    else if (product?.name?.includes('River')) targetStudioId = 'rainbow-rivere';
                    else if (product?.name?.includes('Dragon')) targetStudioId = 'rainbow-dragon';
                    else if (product?.category === 'Rèm vải') targetStudioId = 'elogi-1198-2';
                    else if (product?.category === 'Rèm cuốn') targetStudioId = 'roller-harmony-2';
                    else if (product?.category === 'Rèm cầu vồng') targetStudioId = 'rainbow-brioni';
                    navigateTo('studio', targetStudioId);
                  }}
                >
                  <Sliders size={16} />
                  <span>Xem chất vải & phối phòng thực tế dưới dạng 3D</span>
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
              Mô tả sản phẩm
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
              Chính sách & Bảo quản
            </button>
            <button
              className={`pdetail-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Đánh giá ({displayReviewsCount})
            </button>
            <button
              className={`pdetail-tab-btn ${activeTab === 'measuring' ? 'active' : ''}`}
              onClick={() => setActiveTab('measuring')}
            >
              📏 Cách đo cửa để đặt rèm
            </button>
          </div>

          <div className="pdetail-tab-body">
            {activeTab === 'desc' && (
              <div className="tab-pane desc-pane-after" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
                alignItems: 'center',
                padding: '16px 0'
              }}>
                <div className="desc-visual-col" style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: '320px',
                  backgroundColor: '#f1f5f9',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                }}>
                  <img
                    src={primaryImg || product.image || '/assets/product-linen.jpg'}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      bottom: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    title="Phóng to ảnh chất liệu"
                  >
                    <Maximize2 size={16} color="#173352" />
                  </button>
                </div>

                <div className="desc-details-col">
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#173352',
                    marginBottom: '14px',
                    letterSpacing: '-0.02em'
                  }}>
                    Chất liệu cao cấp, trải nghiệm vượt trội
                  </h3>

                  <p style={{
                    fontSize: '14.5px',
                    lineHeight: '1.8',
                    color: '#475569',
                    marginBottom: '14px'
                  }}>
                    Sản phẩm <strong>{product.name}</strong> được tuyển chọn kỹ lưỡng từ {product.material || 'chất liệu cao cấp'}, mang đến độ bền bỉ vượt trội và thẩm mỹ đỉnh cao cho không gian sống hiện đại.
                  </p>

                  {product.fullDescription && (
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.75',
                      color: '#64748b',
                      marginBottom: '18px'
                    }}>
                      {product.fullDescription}
                    </p>
                  )}

                  {/* 3 feature badges */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginTop: '18px',
                    paddingTop: '18px',
                    borderTop: '1px solid rgba(23, 51, 82, 0.08)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#FEF3E3',
                      border: '1px solid rgba(23, 51, 82, 0.12)',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#173352'
                    }}>
                      <Sparkles size={16} color="#c8a87d" />
                      <span>Mềm mịn, thoáng khí</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#FEF3E3',
                      border: '1px solid rgba(23, 51, 82, 0.12)',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#173352'
                    }}>
                      <ShieldCheck size={16} color="#c8a87d" />
                      <span>Cản sáng tốt</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#FEF3E3',
                      border: '1px solid rgba(23, 51, 82, 0.12)',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#173352'
                    }}>
                      <Check size={16} color="#c8a87d" />
                      <span>Bền màu theo thời gian</span>
                    </div>
                  </div>
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

            {activeTab === 'measuring' && (
              <div className="tab-pane measuring-tab-pane">
                <div className="measuring-tab-intro">
                  <div className="tab-intro-badge">
                    <Ruler size={16} color="#c8a87d" />
                    <span>QUY CHUẨN KỸ THUẬT</span>
                  </div>
                  <h3>Cách đo cửa để đặt rèm chính xác</h3>
                  <p>Áp dụng chuẩn xác cho tất cả dòng rèm: rèm cuốn, rèm roman, rèm xếp ly, rèm tổ ong và rèm s-fold.</p>
                </div>

                <div className="measuring-steps-grid-view">
                  <div className="m-step-card">
                    <div className="m-step-header">
                      <span className="step-tag">Bước 1</span>
                      <h4>Đo chiều ngang của cửa</h4>
                    </div>
                    <p>Dùng thước đo từ mép bên trái sang mép bên phải của cửa. <strong>Nên đo ở ít nhất 2–3 vị trí:</strong> phía trên, giữa và phía dưới.</p>
                  </div>

                  <div className="m-step-card">
                    <div className="m-step-header">
                      <span className="step-tag">Bước 2</span>
                      <h4>Đo chiều dọc của cửa</h4>
                    </div>
                    <p>Đo từ mép trên xuống mép dưới của cửa. <strong>Cũng nên đo ở 2–3 vị trí:</strong> bên trái, giữa và bên phải.</p>
                  </div>

                  <div className="m-step-card">
                    <div className="m-step-header">
                      <span className="step-tag">Bước 3</span>
                      <h4>Giữ thước thật thẳng</h4>
                    </div>
                    <p>Khi đo chiều ngang, <strong>giữ thước nằm ngang</strong>. Khi đo chiều dọc, <strong>giữ thước thẳng đứng</strong> để số đo chính xác hơn.</p>
                  </div>

                  <div className="m-step-card highlight">
                    <div className="m-step-header">
                      <span className="step-tag highlight">Bước 4</span>
                      <h4>Chọn số đo nhỏ nhất</h4>
                    </div>
                    <p>Nếu các vị trí có số đo khác nhau, <strong>hãy lấy số nhỏ nhất</strong>. Điều này giúp tránh trường hợp khung cửa hơi lệch hoặc không vuông.</p>
                  </div>

                  <div className="m-step-card highlight">
                    <div className="m-step-header">
                      <span className="step-tag highlight">Bước 5</span>
                      <h4>Trừ thêm 0,5–1 cm</h4>
                    </div>
                    <p>Sau khi lấy được số đo nhỏ nhất, <strong>trừ thêm khoảng 0,5–1 cm</strong> để rèm có khoảng hở phù hợp khi lắp đặt.</p>
                  </div>
                </div>

                <div className="measuring-example-card">
                  <div className="ex-badge">
                    <Sparkles size={16} color="#c8a87d" />
                    <strong>Ví dụ:</strong>
                  </div>
                  <div className="ex-content">
                    <p>Nếu chiều ngang đo được là <strong>120 cm</strong>, <strong>119,5 cm</strong> và <strong>120,5 cm</strong> → lấy <strong>119,5 cm</strong>.</p>
                    <p>Sau đó trừ thêm 0,5–1 cm → kích thước đặt rèm khoảng <strong>118,5–119 cm</strong>.</p>
                  </div>
                </div>

                <div className="measuring-tab-footer-callout">
                  <div className="callout-text">
                    <strong>Bạn muốn nhân viên kỹ thuật UniVeloria khảo sát tận nơi?</strong>
                    <span>Chúng tôi hỗ trợ mang mẫu thực tế và đo đạc lại chính xác 100% tại nhà bạn trước khi sản xuất.</span>
                  </div>
                  <button
                    type="button"
                    className="btn-callout-contact"
                    onClick={() => navigateTo && navigateTo('contact')}
                  >
                    💬 Liên hệ tư vấn đo đạc
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS SECTION */}
      <section className="pdetail-related-section" style={{ padding: '60px 0 40px', backgroundColor: '#faf9f6' }}>
        <div className="pdetail-container">
          <div className="related-header" style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '32px'
          }}>
            <div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#173352',
                margin: '0 0 6px 0',
                letterSpacing: '-0.02em'
              }}>
                Sản phẩm tương tự
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: 0
              }}>
                Khám phá thêm những mẫu rèm phù hợp với không gian của bạn
              </p>
            </div>
            <button
              type="button"
              style={{
                backgroundColor: '#FEF3E3',
                color: '#173352',
                border: '1.5px solid #173352',
                padding: '10px 22px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '13.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => navigateTo('products')}
            >
              <span>Xem tất cả</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="related-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {relatedProducts.slice(0, 4).map((rel) => (
              <article
                key={rel.id}
                className="product-card"
                onClick={() => navigateTo('product-detail', rel.id)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(23, 51, 82, 0.08)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div className="product-image-wrap" style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img src={rel.image} alt={rel.name} className="product-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <div className="product-info" style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#173352', margin: '0 0 4px 0' }}>{rel.name}</h3>
                  <span className="product-code" style={{ fontSize: '11.5px', color: '#94a3b8' }}>{rel.code}</span>
                  <div className="rating" style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0' }}>
                    <span className="stars" style={{ color: '#e5a93b', fontSize: '12px' }}>★★★★★</span>
                    <span style={{ fontSize: '11.5px', color: '#64748b' }}>{rel.rating} ({rel.reviews})</span>
                  </div>
                  <div className="product-pricing-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div className="price-wrap">
                      <span style={{ fontSize: '11.5px', color: '#64748b', display: 'block' }}>Từ</span>
                      <strong className="price" style={{ fontSize: '15px', color: '#173352' }}>{formatProductPrice(rel.price)}</strong>
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
                      style={{
                        backgroundColor: '#173352',
                        color: '#FEF3E3',
                        border: 'none',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <ShoppingCart size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS SECTION */}
      <section className="pdetail-testimonials-section" style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
        <div className="pdetail-container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#173352',
              margin: '0 0 8px 0',
              letterSpacing: '-0.02em'
            }}>
              Khách hàng nói gì về UniVeloria?
            </h2>
            <p style={{
              fontSize: '14.5px',
              color: '#64748b',
              margin: 0
            }}>
              Cùng lắng nghe những chia sẻ chân thật từ khách hàng của chúng tôi
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {/* Testimonial 1 */}
            <div style={{
              backgroundColor: '#faf8f5',
              padding: '26px 22px',
              borderRadius: '18px',
              border: '1px solid rgba(23, 51, 82, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ color: '#e5a93b', fontSize: '15px', marginBottom: '12px', letterSpacing: '2px' }}>★★★★★</div>
                <p style={{
                  fontSize: '14.5px',
                  color: '#334155',
                  lineHeight: '1.7',
                  fontStyle: 'italic',
                  margin: '0 0 16px 0'
                }}>
                  "Rèm rất đẹp, chất lượng tốt, lắp đặt nhanh chóng!"
                </p>
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#173352',
                paddingTop: '12px',
                borderTop: '1px solid rgba(23, 51, 82, 0.08)'
              }}>
                Chị Mai Anh - Hà Nội
              </div>
            </div>

            {/* Testimonial 2 */}
            <div style={{
              backgroundColor: '#faf8f5',
              padding: '26px 22px',
              borderRadius: '18px',
              border: '1px solid rgba(23, 51, 82, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ color: '#e5a93b', fontSize: '15px', marginBottom: '12px', letterSpacing: '2px' }}>★★★★★</div>
                <p style={{
                  fontSize: '14.5px',
                  color: '#334155',
                  lineHeight: '1.7',
                  fontStyle: 'italic',
                  margin: '0 0 16px 0'
                }}>
                  "Dịch vụ tư vấn tận tâm giúp mình chọn được mẫu ưng ý."
                </p>
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#173352',
                paddingTop: '12px',
                borderTop: '1px solid rgba(23, 51, 82, 0.08)'
              }}>
                Anh Hoàng - Hải Phòng
              </div>
            </div>

            {/* Testimonial 3 */}
            <div style={{
              backgroundColor: '#faf8f5',
              padding: '26px 22px',
              borderRadius: '18px',
              border: '1px solid rgba(23, 51, 82, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ color: '#e5a93b', fontSize: '15px', marginBottom: '12px', letterSpacing: '2px' }}>★★★★★</div>
                <p style={{
                  fontSize: '14.5px',
                  color: '#334155',
                  lineHeight: '1.7',
                  fontStyle: 'italic',
                  margin: '0 0 16px 0'
                }}>
                  "Không gian nhà mình trở nên sang trọng hơn hẳn!"
                </p>
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#173352',
                paddingTop: '12px',
                borderTop: '1px solid rgba(23, 51, 82, 0.08)'
              }}>
                Chị Thu Trang - Hà Nội
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="pdetail-cta-banner-section" style={{ padding: '20px 0 60px', backgroundColor: '#ffffff' }}>
        <div className="pdetail-container">
          <div style={{
            backgroundColor: '#f6f3ed',
            borderRadius: '24px',
            padding: '40px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            border: '1px solid rgba(23, 51, 82, 0.08)'
          }}>
            <div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#173352',
                margin: '0 0 6px 0'
              }}>
                Bạn đã sẵn sàng nâng tầm không gian của mình?
              </h3>
              <p style={{
                fontSize: '14.5px',
                color: '#64748b',
                margin: 0
              }}>
                Khám phá ngay các mẫu rèm và trải nghiệm 3D độc quyền!
              </p>
            </div>

            <button
              type="button"
              style={{
                backgroundColor: '#173352',
                color: '#FEF3E3',
                border: 'none',
                padding: '13px 28px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(23, 51, 82, 0.25)',
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                let targetStudioId = 'rainbow-brioni';
                if (product?.name?.includes('1198')) targetStudioId = 'elogi-1198-2';
                else if (product?.name?.includes('1206')) targetStudioId = 'elogi-1206-1';
                else if (product?.name?.includes('1230')) targetStudioId = 'elogi-1230-1';
                else if (product?.name?.includes('Harmony')) targetStudioId = 'roller-harmony-2';
                else if (product?.name?.includes('Malange')) targetStudioId = 'roller-malange-1';
                else if (product?.name?.includes('Moon')) targetStudioId = 'roller-moon';
                else if (product?.name?.includes('Silvia')) targetStudioId = 'roller-silvia';
                else if (product?.name?.includes('Sunny')) targetStudioId = 'roller-sunny';
                else if (product?.name?.includes('Brioni')) targetStudioId = 'rainbow-brioni';
                else if (product?.name?.includes('Infiniti')) targetStudioId = 'rainbow-infiniti';
                else if (product?.name?.includes('River')) targetStudioId = 'rainbow-rivere';
                else if (product?.name?.includes('Dragon')) targetStudioId = 'rainbow-dragon';
                else if (product?.category === 'Rèm vải') targetStudioId = 'elogi-1198-2';
                else if (product?.category === 'Rèm cuốn') targetStudioId = 'roller-harmony-2';
                else if (product?.category === 'Rèm cầu vồng') targetStudioId = 'rainbow-brioni';
                navigateTo('studio', targetStudioId);
              }}
            >
              <span>Bắt đầu trải nghiệm</span>
              <ArrowRight size={16} />
            </button>
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
            {subImgs && subImgs.length > 0 && (
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
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div className={`toast ${showToast ? 'visible' : ''}`} role="status">
        <Check size={16} /> {toastMsg}
      </div>

      {/* WINDOW MEASUREMENT GUIDE MODAL */}
      <WindowMeasurementGuideModal
        isOpen={showMeasureGuide}
        onClose={() => setShowMeasureGuide(false)}
        onConsult={() => {
          setShowMeasureGuide(false);
          if (navigateTo) navigateTo('contact');
        }}
      />
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import {
  ExternalLink,
  Search,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Truck,
  HeartHandshake,
  Star,
  Award,
  BadgeCheck,
  Building2,
  ArrowRight
} from 'lucide-react';

export const ShopeeBagIcon = ({ size = 20, className = '' }) => (
  <img
    src="/assets/shopee.jpg"
    alt="Shopee"
    className={className}
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      borderRadius: '4px',
      flexShrink: 0
    }}
  />
);

export const PARTNERS_DATA = [
  {
    id: 'bedding-m2t',
    category: 'Chăn, ga, gối, đệm',
    categoryIcon: '🛏️',
    memberTier: 'Thành viên đối tác vàng',
    name: 'Chăn ga M2T Bedding',
    subtitle: 'Bộ chăn ga gối Lụa Thái M2T Bedding',
    description: 'Chất liệu lụa Thái cao cấp thoáng mát, gồm chăn hè chần bông, ga giường và 2 vỏ gối nằm đồng bộ sang trọng.',
    url: 'https://shopee.vn/B%E1%BB%99-ch%C4%83n-ga-g%E1%BB%91i-L%E1%BB%A5a-Th%C3%A1i-M2T-bedding-m%E1%BB%81m-m%E1%BB%8Bn-m%C3%A1t-g%E1%BB%93m-ch%C4%83n-h%C3%A8-ch%E1%BA%A7n-b%C3%B4ng-ga-gi%C6%B0%E1%BB%9Dng-v%C3%A0-2-v%E1%BB%8F-g%E1%BB%91i-n%E1%BA%B1m-i.240825360.19831465954?extraParams=%7B%22display_model_id%22%3A163961267063%2C%22model_selection_logic%22%3A3%7D&image_ids=vn-11134207-81ztc-mqg3xp8ouwhu64',
    badge: 'Khuyên Dùng Cho Phòng Ngủ',
    rating: 4.9,
    reviews: '12.4k',
    image: '/affiliate/m2t-bedding.jpg',
    tags: ['Lụa Thái cao cấp', 'Chăn hè chần bông', 'Đủ size m6/m8/2m']
  },
  {
    id: 'lamp-rambotoy',
    category: 'Đèn chiếu sáng & Decor',
    categoryIcon: '💡',
    memberTier: 'Thành viên đối tác vàng',
    name: 'Đèn Cây RamboToy',
    subtitle: 'Đèn cây đứng cao 170cm Bắc Âu',
    description: 'Đèn sàn dáng cao thân kim loại xếp lớp hiện đại, công tắc đạp chân tiện lợi, ánh sáng dịu mắt chống cận thị.',
    url: 'https://shopee.vn/%C4%90%C3%A8n-c%C3%A2y-%C4%91%E1%BB%A9ng-cao-170cm-chi%E1%BA%BFu-s%C3%A1ng-phong-c%C3%A1ch-B%E1%BA%AFc-%C3%82u-%C4%91%C3%A8n-s%C3%A0n-d%C3%A1ng-cao-th%C3%A2n-x%E1%BA%BFp-l%E1%BB%9Bp-%C4%91%C3%A8n-ph%C3%B2ng-kh%C3%A1ch-ph%C3%B2ng-ng%E1%BB%A7-i.474590847.57750951153?extraParams=%7B%22display_model_id%22%3A365086021862%2C%22model_selection_logic%22%3A3%7D&image_ids=vn-11134207-820l4-mgrd17who1s97c',
    badge: 'Best Seller Phong Cách Bắc Âu',
    rating: 4.9,
    reviews: '8.6k',
    image: '/affiliate/rambotoy-floor-lamp.jpg',
    tags: ['Chiều cao 170cm', 'Kim loại xếp lớp', 'Bóng LED 3 màu']
  },
  {
    id: 'lamp-hobi',
    category: 'Đèn chiếu sáng & Decor',
    categoryIcon: '💡',
    memberTier: 'Thành viên đối tác vàng',
    name: "HOBI's Decor",
    subtitle: 'Đèn trang trí không gian 3D',
    description: 'Hệ thống đèn decor nghệ thuật tạo hiệu ứng ánh sáng lung linh, tôn vinh nét thẩm mỹ của rèm cửa và nội thất.',
    url: 'https://shopee.vn/hobi_3d?uls_trackid=574b580100k1&utm_content=3Bt4MK4hqdkhyrPtdPKuyNHg1DtK',
    badge: 'Decor Nghệ Thuật 3D',
    rating: 4.8,
    reviews: '5.2k',
    image: '/affiliate/hobi-decor-light.jpg',
    tags: ['Đèn decor 3D', 'Thiết kế tinh xảo', 'Dễ dàng lắp đặt']
  },
  {
    id: 'plant-leehozy',
    category: 'Cây cảnh & Không gian xanh',
    categoryIcon: '🌿',
    memberTier: 'Thành viên đối tác vàng',
    name: 'LEEHOZY GARDEN',
    subtitle: 'Cây cảnh nội thất phong thủy',
    description: 'Cây cảnh chọn lọc thanh lọc không khí, chậu tự dưỡng thông minh mang hơi thở sinh thái xanh mát vào căn nhà.',
    url: 'https://shopee.vn/leehozy?uls_trackid=574b5a0401lv&utm_content=3Bt4MK4hqdaCmeD94wc2i9RHD6z3',
    badge: 'Xanh Mát Tổ Ấm',
    rating: 4.9,
    reviews: '15.1k',
    image: '/affiliate/leehozy-plants.jpg',
    tags: ['Cây phong thủy', 'Chậu tự dưỡng', 'Thanh lọc khí']
  },
  {
    id: 'art-men-decor',
    category: 'Tranh treo tường nghệ thuật',
    categoryIcon: '🖼️',
    memberTier: 'Thành viên đối tác vàng',
    name: 'Tiệm tranh Men Decor',
    subtitle: 'Tranh tráng gương & Canvas hiện đại',
    description: 'Tranh treo tường tráng gương pha lê và canvas cao cấp, phối màu tinh tế ăn khớp hoàn mỹ với từng màu rèm UniVeloria.',
    url: 'https://shopee.vn/tiemtranhmendecor?uls_trackid=574b5bvo00k1&utm_content=3Bt4MK4hqcr2uBDpeKxU943ypXks',
    badge: 'Nghệ Thuật Tráng Gương',
    rating: 4.9,
    reviews: '9.8k',
    image: '/affiliate/men-decor-art.jpg',
    tags: ['Tráng gương pha lê', 'Viền hợp kim titan', 'Độ bền 10+ năm']
  }
];

export const PARTNER_CATEGORIES = [
  'Tất cả',
  'Chăn, ga, gối, đệm',
  'Đèn chiếu sáng & Decor',
  'Cây cảnh & Không gian xanh',
  'Tranh treo tường nghệ thuật'
];

export function PartnersPage({ navigateTo }) {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPartners = useMemo(() => {
    return PARTNERS_DATA.filter((partner) => {
      const matchCat = activeCategory === 'Tất cả' || partner.category === activeCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        `${partner.name} ${partner.subtitle} ${partner.category} ${partner.description}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="partners-page-view">
      {/* Header */}
      <Header currentPage="partners" navigateTo={navigateTo} themeClass="topbar-partners" />

      {/* Hero Banner */}
      <section className="partners-hero-banner" id="top">
        <div className="partners-hero-bg" />
        <div className="partners-hero-overlay" />
        <div className="partners-hero-content">
          <div className="partners-hero-badge">
            <ShopeeBagIcon size={16} />
            <span>HỆ SINH THÁI ĐỐI TÁC SHOPEE CHÍNH HÃNG</span>
          </div>
          <h1>Đơn Vị Liên Kết Cùng UniVeloria</h1>
          <p>
            Khám phá 5 đơn vị liên kết đối tác uy tín được UniVeloria tuyển chọn đồng hành.
            Dễ dàng mua sắm trực tiếp trên Shopee với giá ưu đãi và giao hàng toàn quốc!
          </p>

          {/* Quick Search Input */}
          <div className="partners-search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm đối tác, chăn ga, đèn, cây cảnh, tranh nghệ thuật..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Partners Section */}
      <section className="partners-main-section">
        <div className="partners-container">

          {/* =========================================================================
              KHUNG THÀNH VIÊN ĐỐI TÁC (PARTNER MEMBERSHIP NETWORK BOX)
              ========================================================================= */}
          <div className="partner-membership-box">
            <div className="pm-header-row">
              <div className="pm-title-block">
                <span className="pm-gold-badge">
                  <Award size={14} /> MẠNG LƯỚI THÀNH VIÊN ĐỐI TÁC CHIẾN LƯỢC
                </span>
                <h2>Khung Thành Viên Đối Tác UniVeloria</h2>
                <p>
                  Hệ sinh thái kết nối các thương hiệu nội thất, chiếu sáng & decor uy tín hàng đầu trên Shopee Mall
                </p>
              </div>

              <div className="pm-stats-group">
                <div className="pm-stat-item">
                  <span className="stat-num">5</span>
                  <span className="stat-lbl">Đơn vị liên kết</span>
                </div>
                <div className="pm-stat-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-lbl">Shopee uy tín</span>
                </div>
                <div className="pm-stat-item">
                  <span className="stat-num">4.9★</span>
                  <span className="stat-lbl">Đánh giá khách hàng</span>
                </div>
              </div>
            </div>

            {/* 4 Partner Membership Perks */}
            <div className="pm-perks-grid">
              <div className="pm-perk-card">
                <div className="perk-icon-wrap">
                  <BadgeCheck size={20} color="#8c6036" />
                </div>
                <div className="perk-info">
                  <strong>Thẩm định chuẩn 5 sao</strong>
                  <p>100% đối tác được kiểm chứng chất lượng và đánh giá trên 4.8★ tại Shopee.</p>
                </div>
              </div>

              <div className="pm-perk-card">
                <div className="perk-icon-wrap">
                  <Sparkles size={20} color="#8c6036" />
                </div>
                <div className="perk-info">
                  <strong>Đồng điệu thiết kế</strong>
                  <p>Sản phẩm decor tương thích hoàn hảo với các dòng rèm cao cấp của UniVeloria.</p>
                </div>
              </div>

              <div className="pm-perk-card">
                <div className="perk-icon-wrap">
                  <ShopeeBagIcon size={20} className="perk-shopee-color" />
                </div>
                <div className="perk-info">
                  <strong>Ưu đãi thành viên Shopee</strong>
                  <p>Khách hàng UniVeloria nhận mã voucher giảm giá độc quyền tại gian hàng đối tác.</p>
                </div>
              </div>

              <div className="pm-perk-card">
                <div className="perk-icon-wrap">
                  <Building2 size={20} color="#8c6036" />
                </div>
                <div className="pm-perk-info">
                  <strong>Mạng lưới hợp tác B2B</strong>
                  <p>Mở rộng kết nối kinh doanh nội thất trọn gói cho biệt thự, căn hộ và văn phòng.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="partners-filter-tabs">
            {PARTNER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`partners-filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Partner Count Summary */}
          <div className="partners-count-row">
            <span>Hiển thị <strong>{filteredPartners.length}</strong> đơn vị thành viên đối tác cùng 1 hàng</span>
            <span className="shopee-mall-tag">
              <ShopeeBagIcon size={14} /> Gian hàng Shopee uy tín
            </span>
          </div>

          {/* =========================================================================
              5 ĐƠN VỊ CÙNG 1 HÀNG (5 CARDS IN A SINGLE HORIZONTAL ROW)
              ========================================================================= */}
          <div className="partners-grid-5-col">
            {filteredPartners.map((item) => (
              <article key={item.id} className="partner-card-detailed">
                {/* Thành viên đối tác badge top strip */}
                <div className="card-member-strip">
                  <span className="strip-dot" />
                  <span>{item.memberTier}</span>
                  <BadgeCheck size={13} color="#2e7d32" />
                </div>

                {/* Visual Thumbnail Stage */}
                <div className="partner-card-image-wrap">
                  <img src={item.image} alt={item.name} />
                  <span className="partner-category-pill">
                    {item.categoryIcon} {item.category}
                  </span>
                  <span className="partner-rating-badge">
                    <Star size={12} fill="#e5a93b" color="#e5a93b" />
                    <strong>{item.rating}</strong>
                    <small>({item.reviews})</small>
                  </span>
                </div>

                {/* Card Information */}
                <div className="partner-card-body">
                  <div className="partner-card-top">
                    <span className="partner-card-highlight-badge">{item.badge}</span>
                    <h2 className="partner-card-title">{item.name}</h2>
                    <h3 className="partner-card-subtitle">{item.subtitle}</h3>
                    <p className="partner-card-description">{item.description}</p>
                  </div>

                  {/* Feature Tags */}
                  <div className="partner-feature-tags">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="p-tag-pill">
                        <CheckCircle2 size={10} color="#8c6036" /> {tag}
                      </span>
                    ))}
                  </div>

                  {/* Trust badges */}
                  <div className="partner-trust-strip">
                    <span><Truck size={12} /> Giao toàn quốc</span>
                    <span><ShieldCheck size={12} /> Chính hãng</span>
                  </div>

                  {/* BIG PROMINENT SHOPEE BUTTON */}
                  <div className="partner-cta-wrapper">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shopee-primary-cta-btn"
                      title={`Mở gian hàng ${item.name} trên Shopee`}
                    >
                      <ShopeeBagIcon size={19} />
                      <div className="btn-label-group">
                        <span className="btn-main-label">Xem Trên Shopee</span>
                        <small className="btn-sub-label">Mua qua Shopee Mall</small>
                      </div>
                      <ExternalLink size={14} className="cta-arrow-icon" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Value Props Banner */}
          <div className="partners-value-banner">
            <div className="value-banner-item">
              <div className="val-icon-box">
                <HeartHandshake size={22} color="#8c6036" />
              </div>
              <div className="val-text">
                <strong>Đồng hành uy tín</strong>
                <p>Tuyển chọn các đơn vị decor và chiếu sáng hàng đầu, tương thích với rèm UniVeloria.</p>
              </div>
            </div>

            <div className="value-banner-item">
              <div className="val-icon-box">
                <ShopeeBagIcon size={22} className="val-shopee-icon" />
              </div>
              <div className="val-text">
                <strong>Mua sắm an tâm trên Shopee</strong>
                <p>Bảo vệ người mua 100%, voucher giảm giá và tích xu Shopee hấp dẫn.</p>
              </div>
            </div>

            <div className="value-banner-item">
              <div className="val-icon-box">
                <Sparkles size={22} color="#8c6036" />
              </div>
              <div className="val-text">
                <strong>Tư vấn trọn gói không gian</strong>
                <p>Đội ngũ kỹ thuật UniVeloria sẵn sàng khảo sát may đo rèm kết hợp bài trí nội thất liên kết.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <UnifiedFooter navigateTo={navigateTo} />
    </div>
  );
}

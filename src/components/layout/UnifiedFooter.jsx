import React from 'react';

export function UnifiedFooter({ navigateTo }) {
  return (
    <footer className="footer unified-footer">
      <div className="footer-glow" />
      <div className="footer-wrap">
        <div className="footer-brand-col">
          <a
            href="#home"
            className="footer-brand"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
          >
            <img src="/logo/logo.png" alt="UNIVELORIA Logo" className="footer-logo" />
            <span className="footer-brand-text">
              <span className="brand-name">
                <span className="brand-uni">Uni</span>
                <span className="brand-veloria">Veloria</span>
                <span className="reg">®</span>
              </span>
              <small>Thấu hiểu không gian, nâng tầm tổ ấm</small>
            </span>
          </a>
          <p className="footer-desc">
            Không gian rèm cửa cao cấp, kết hợp hài hòa giữa thủ công tinh xảo và công nghệ mô phỏng AI 3D tiên phong tại Việt Nam.
          </p>
        </div>

        <div className="footer-col">
          <h4>Khám Phá</h4>
          <a href="#collections" onClick={(e) => { e.preventDefault(); navigateTo('collections'); }}>Bộ sưu tập</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); navigateTo('products'); }}>Sản phẩm</a>
          <a href="#studio" onClick={(e) => { e.preventDefault(); navigateTo('studio'); }}>AI 3D Studio</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>Giới thiệu</a>
        </div>

        <div className="footer-col">
          <h4>Hỗ Trợ Khách Hàng</h4>
          <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Tư vấn & May đo</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Bảo hành 5 năm</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Hướng dẫn chọn rèm</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Câu hỏi thường gặp</a>
        </div>

        <div className="footer-col">
          <h4>Liên Hệ</h4>
          <p className="footer-contact-item">
            <span>Hotline tư vấn: </span>
            <a href="tel:0334713541" className="footer-highlight-link">0334713541</a>
          </p>
          <p className="footer-contact-item">
            <span>Email hỗ trợ: </span>
            <a href="mailto:univeloria@gmail.com" className="footer-highlight-link">univeloria@gmail.com</a>
          </p>
          <p className="footer-contact-item footer-hours">
            <span>Thời gian phục vụ: </span>
            <strong>8:00 - 21:00 (Tất cả các ngày)</strong>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 UNIVELORIA®. Bản quyền thuộc về thương hiệu rèm cửa cao cấp UNIVELORIA.</p>
        <div className="footer-links">
          <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Chính sách bảo mật</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Điều khoản dịch vụ</a>
        </div>
      </div>
    </footer>
  );
}

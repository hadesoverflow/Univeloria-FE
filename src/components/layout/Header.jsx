import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import {
  User,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Gem,
  Crown,
  Menu,
  X,
  Search
} from 'lucide-react';

export function Header({ currentPage, navigateTo, themeClass = '' }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, openCart } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className={`topbar ${themeClass}`.trim()}>
      <a
        href="#home"
        className="mini-brand"
        aria-label="UniVeloria - Thấu hiểu không gian, nâng tầm tổ ấm"
        onClick={(e) => {
          e.preventDefault();
          navigateTo('home');
        }}
      >
        <img src="/logo/logo.png" alt="UniVeloria Logo" className="brand-logo" />
        <span className="brand-text">
          <span className="brand-name font-logo">
            <span className="brand-uni">Uni</span>
            <span className="brand-veloria">Veloria</span>
            <span className="reg">®</span>
          </span>
          <small className="font-slogan">Thấu hiểu không gian, nâng tầm tổ ấm</small>
        </span>
      </a>

      {/* Center Floating Capsule Navigation */}
      <nav className="nav nav-capsule font-menu-auth" aria-label="Menu điều hướng chính">
        <button
          type="button"
          className={`nav-capsule-btn ${currentPage === 'home' ? 'active-nav-btn' : ''}`}
          onClick={() => navigateTo('home')}
        >
          Trang Chủ
        </button>
        <button
          type="button"
          className={`nav-capsule-btn ${currentPage === 'collections' ? 'active-nav-btn' : ''}`}
          onClick={() => navigateTo('collections')}
        >
          Bộ Sưu Tập
        </button>
        <button
          type="button"
          className={`nav-capsule-btn ${currentPage === 'products' ? 'active-nav-btn' : ''}`}
          onClick={() => navigateTo('products')}
        >
          Sản Phẩm
        </button>
        <button
          type="button"
          className={`nav-capsule-btn ${currentPage === 'studio' ? 'active-nav-btn' : ''}`}
          onClick={() => navigateTo('studio')}
        >
          AI 3D Studio
        </button>
        <button
          type="button"
          className={`nav-capsule-btn ${currentPage === 'about' ? 'active-nav-btn' : ''}`}
          onClick={() => navigateTo('about')}
        >
          Giới Thiệu
        </button>
        <button
          type="button"
          className={`nav-capsule-btn ${currentPage === 'contact' ? 'active-nav-btn' : ''}`}
          onClick={() => navigateTo('contact')}
        >
          Liên Hệ
        </button>
      </nav>

      <div className="topbar-actions topbar-right-group">
        {/* Search button (circular) */}
        <button
          type="button"
          className="topbar-circle-btn topbar-search-btn"
          onClick={() => navigateTo('products')}
          title="Tìm kiếm sản phẩm rèm"
          aria-label="Tìm kiếm sản phẩm rèm"
        >
          <Search size={17} />
        </button>

        {/* Shopping Cart Trigger */}
        <button
          type="button"
          className="topbar-circle-btn topbar-cart-btn"
          onClick={openCart}
          title="Xem giỏ hàng may đo"
          aria-label="Giỏ hàng may đo"
        >
          <ShoppingBag size={17} />
          {cartCount > 0 && (
            <span className="cart-badge-count">{cartCount}</span>
          )}
        </button>

        {/* SEPARATED AUTH SECTION */}
        <div className="topbar-auth-section font-menu-auth">
          {!isAuthenticated ? (
            <button
              className={`topbar-auth-btn font-menu-auth ${currentPage === 'login' ? 'active-auth-btn' : ''}`}
              onClick={() => navigateTo('login')}
              aria-label="Đăng nhập tài khoản"
            >
              <User size={15} />
              <span>Đăng nhập</span>
            </button>
          ) : (
            <div className="topbar-user-dropdown-wrap" ref={dropdownRef}>
              <button
                type="button"
                className={`topbar-user-trigger ${dropdownOpen ? 'dropdown-active' : ''}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title="Tài khoản người dùng"
                aria-expanded={dropdownOpen}
              >
                <span className="user-avatar-badge">
                  {user?.fullName ? user.fullName.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || 'U')}
                </span>
                <span className="user-name-label">
                  {user?.fullName || user?.email || 'Tài khoản'}
                </span>
                <ChevronDown size={14} className={`dropdown-chevron ${dropdownOpen ? 'open' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="topbar-user-menu">
                  {/* Menu User Header */}
                  <div className="menu-header">
                    <span className="menu-avatar">
                      {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                    </span>
                    <div className="menu-info">
                      <strong className="menu-name">{user?.fullName || (user?.role === 'Admin' ? 'Quản trị viên UniVeloria' : 'Khách hàng')}</strong>
                      <span className="menu-email">{user?.email}</span>
                      <span className={`menu-role-tag ${user?.role === 'Admin' ? 'admin' : 'customer'}`}>
                        {user?.role === 'Admin' ? (
                          <>
                            <Crown size={12} />
                            <span>Quản trị viên</span>
                          </>
                        ) : (
                          <>
                            <User size={12} />
                            <span>Khách hàng</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="menu-divider" />

                  {/* Menu Navigation Links */}
                  <div className="menu-items">
                    {user?.role === 'Admin' ? (
                      /* ================= ADMIN PROFILE MENU ================= */
                      <>
                        <button
                          type="button"
                          className="menu-item-btn admin-link-item"
                          style={{ background: '#fdfaf5', color: '#8b6b3e', fontWeight: 700 }}
                          onClick={() => {
                            setDropdownOpen(false);
                            navigateTo('admin');
                          }}
                        >
                          <Crown size={16} color="#c8a87d" />
                          <span>Trang quản trị (Admin)</span>
                        </button>
                      </>
                    ) : (
                      /* ================= CUSTOMER PROFILE MENU ================= */
                      <>
                        <button
                          type="button"
                          className="menu-item-btn"
                          onClick={() => {
                            setDropdownOpen(false);
                            navigateTo('customer', 'profile');
                          }}
                        >
                          <User size={16} />
                          <span>Hồ sơ cá nhân</span>
                        </button>

                        <button
                          type="button"
                          className="menu-item-btn"
                          onClick={() => {
                            setDropdownOpen(false);
                            navigateTo('customer', 'orders');
                          }}
                        >
                          <ShoppingBag size={16} />
                          <span>Lịch sử mua hàng</span>
                        </button>

                        <button
                          type="button"
                          className="menu-item-btn"
                          onClick={() => {
                            setDropdownOpen(false);
                            navigateTo('customer', 'favorites');
                          }}
                        >
                          <Heart size={16} />
                          <span>Sản phẩm yêu thích</span>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="menu-divider" />

                  {/* Logout Button */}
                  <button
                    type="button"
                    className="menu-item-btn menu-logout-btn"
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                      navigateTo('home');
                    }}
                  >
                    <LogOut size={16} />
                    <span>{user?.role === 'Admin' ? 'Đăng xuất Quản trị' : 'Đăng xuất'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Trigger */}
        <button
          type="button"
          className={`topbar-mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <div className="mobile-nav-brand">
                <span className="brand-uni">Uni</span>
                <span className="brand-veloria">Veloria</span>
                <span className="reg">®</span>
              </div>
              <button
                type="button"
                className="mobile-nav-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Đóng menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              <button
                type="button"
                className={`mobile-nav-item ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); navigateTo('home'); }}
              >
                <span className="nav-item-icon">🏠</span>
                <span className="nav-item-text">Trang Chủ</span>
                <span className="nav-item-chevron">›</span>
              </button>
              <button
                type="button"
                className={`mobile-nav-item ${currentPage === 'collections' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); navigateTo('collections'); }}
              >
                <span className="nav-item-icon">🏛️</span>
                <span className="nav-item-text">Bộ Sưu Tập</span>
                <span className="nav-item-chevron">›</span>
              </button>
              <button
                type="button"
                className={`mobile-nav-item ${currentPage === 'products' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); navigateTo('products'); }}
              >
                <span className="nav-item-icon">🪟</span>
                <span className="nav-item-text">Sản Phẩm May Đo</span>
                <span className="nav-item-chevron">›</span>
              </button>
              <button
                type="button"
                className={`mobile-nav-item studio-highlight ${currentPage === 'studio' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); navigateTo('studio'); }}
              >
                <span className="nav-item-icon">✨</span>
                <span className="nav-item-text">AI 3D Studio</span>
                <span className="mobile-badge-3d">3D WebGL</span>
              </button>
              <button
                type="button"
                className={`mobile-nav-item ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); navigateTo('about'); }}
              >
                <span className="nav-item-icon">📖</span>
                <span className="nav-item-text">Giới Thiệu Thương Hiệu</span>
                <span className="nav-item-chevron">›</span>
              </button>
              <button
                type="button"
                className={`mobile-nav-item ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => { setMobileMenuOpen(false); navigateTo('contact'); }}
              >
                <span className="nav-item-icon">📞</span>
                <span className="nav-item-text">Liên Hệ & Khảo Sát</span>
                <span className="nav-item-chevron">›</span>
              </button>
            </nav>

            <div className="mobile-nav-footer">
              {!isAuthenticated ? (
                <button
                  type="button"
                  className="mobile-nav-login-btn"
                  onClick={() => { setMobileMenuOpen(false); navigateTo('login'); }}
                >
                  <User size={16} />
                  <span>Đăng nhập / Đăng ký</span>
                </button>
              ) : (
                <div className="mobile-nav-user-panel">
                  <div className="mobile-user-row">
                    <span className="mobile-user-avatar">
                      {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                    </span>
                    <div className="mobile-user-info">
                      <strong>{user?.fullName || user?.email}</strong>
                      <small>{user?.role === 'Admin' ? 'Quản trị viên' : 'Khách hàng'}</small>
                    </div>
                  </div>
                  <div className="mobile-user-actions">
                    <button
                      type="button"
                      className="mobile-sub-btn"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateTo(user?.role === 'Admin' ? 'admin' : 'customer', 'profile');
                      }}
                    >
                      Hồ sơ
                    </button>
                    <button
                      type="button"
                      className="mobile-sub-btn logout"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                        navigateTo('home');
                      }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

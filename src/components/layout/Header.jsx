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
  Crown
} from 'lucide-react';

export function Header({ currentPage, navigateTo, themeClass = '' }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, openCart } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
        aria-label="UNIVELORIA - Thấu hiểu không gian, nâng tầm tổ ấm"
        onClick={(e) => {
          e.preventDefault();
          navigateTo('home');
        }}
      >
        <img src="/logo/logo.png" alt="UNIVELORIA Logo" className="brand-logo" />
        <span className="brand-text">
          <span className="brand-name">
            <span className="brand-uni">Uni</span>
            <span className="brand-veloria">Veloria</span>
            <span className="reg">®</span>
          </span>
          <small>Thấu hiểu không gian, nâng tầm tổ ấm</small>
        </span>
      </a>

      <div className="topbar-actions">
        {/* Navigation Menu List */}
        <nav className="nav">
          <button
            className={currentPage === 'home' ? 'active-nav-btn' : ''}
            onClick={() => navigateTo('home')}
          >
            Không Gian Sống
          </button>
          <button
            className={currentPage === 'collections' ? 'active-nav-btn' : ''}
            onClick={() => navigateTo('collections')}
          >
            Bộ Sưu Tập
          </button>
          <button
            className={currentPage === 'products' ? 'active-nav-btn' : ''}
            onClick={() => navigateTo('products')}
          >
            Sản Phẩm
          </button>
          <button
            className={currentPage === 'studio' ? 'active-nav-btn' : ''}
            onClick={() => navigateTo('studio')}
          >
            AI 3D Studio
          </button>
          <button
            className={currentPage === 'about' ? 'active-nav-btn' : ''}
            onClick={() => navigateTo('about')}
          >
            Giới Thiệu
          </button>
          <button
            className={currentPage === 'contact' ? 'active-nav-btn' : ''}
            onClick={() => navigateTo('contact')}
          >
            Liên Hệ
          </button>
        </nav>

        {/* Separator Divider */}
        <div className="topbar-auth-divider" />

        {/* Shopping Cart Trigger */}
        <button
          type="button"
          className="topbar-cart-btn"
          onClick={openCart}
          title="Xem giỏ hàng may đo"
          aria-label="Giỏ hàng may đo"
        >
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <span className="cart-badge-count">{cartCount}</span>
          )}
        </button>

        {/* SEPARATED AUTH SECTION */}
        <div className="topbar-auth-section">
          {!isAuthenticated ? (
            <button
              className={`topbar-auth-btn ${currentPage === 'login' ? 'active-auth-btn' : ''}`}
              onClick={() => navigateTo('login')}
              aria-label="Đăng nhập tài khoản"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
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
      </div>
    </header>
  );
}

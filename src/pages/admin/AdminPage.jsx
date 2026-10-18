import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Star,
  MessageSquare,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Crown,
  Bell,
  Search,
  ExternalLink,
  ShieldAlert,
  MessageCircle
} from 'lucide-react';

import { AdminDashboard } from './AdminDashboard';
import { AdminUsers } from './AdminUsers';
import { AdminOrders } from './AdminOrders';
import { AdminProducts } from './AdminProducts';
import { AdminReviews } from './AdminReviews';
import { AdminConsultations } from './AdminConsultations';
import { AdminFeedbacks } from './AdminFeedbacks';

const VALID_ADMIN_TABS = ['dashboard', 'users', 'orders', 'products', 'reviews', 'consultations', 'feedbacks'];

export function AdminPage({ navigateTo, initialTab = 'dashboard', onTabChange, onProductUpdated }) {
  const { user, isAuthenticated, logout } = useAuth();

  // Helper to extract the active tab from current URL pathname
  const getTabFromLocation = () => {
    const pathname = window.location.pathname;
    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
      const sub = pathname.replace('/admin', '').replace(/^\/+/, '');
      if (VALID_ADMIN_TABS.includes(sub)) return sub;
    }
    // Check hash for legacy bookmarks: #admin/orders or #admin
    const hash = window.location.hash;
    if (hash.startsWith('#admin')) {
      const cleanHash = hash.replace(/^#admin\/?/, '');
      const matched = VALID_ADMIN_TABS.find((t) => cleanHash.includes(t));
      if (matched) return matched;
    }
    return initialTab && VALID_ADMIN_TABS.includes(initialTab) ? initialTab : 'dashboard';
  };

  const [activeTab, setActiveTab] = useState(getTabFromLocation);

  // Sync state if initialTab prop updates from parent (e.g. App router)
  useEffect(() => {
    if (initialTab && VALID_ADMIN_TABS.includes(initialTab) && initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Clean URL tab switcher: updates view and points browser URL directly to /admin/<section> without '#'
  const handleTabChange = (tabId) => {
    if (!VALID_ADMIN_TABS.includes(tabId)) return;
    setActiveTab(tabId);
    if (onTabChange) onTabChange(tabId);

    const targetPath = tabId === 'dashboard' ? '/admin' : `/admin/${tabId}`;
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState({ page: 'admin', tab: tabId }, '', targetPath);
    }
  };

  // Ensure initial URL is clean on mount (stripping '#' if user came via #admin or #admin/...)
  useEffect(() => {
    const targetPath = activeTab === 'dashboard' ? '/admin' : `/admin/${activeTab}`;
    if (window.location.hash || window.location.pathname !== targetPath) {
      window.history.replaceState({ page: 'admin', tab: activeTab }, '', targetPath);
    }
  }, []);

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromLocation();
      setActiveTab(tab);
      if (onTabChange) onTabChange(tab);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Menu items definition
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Quản lí người dùng', icon: Users },
    { id: 'orders', label: 'Quản lí đơn hàng', icon: ShoppingBag, badge: '4' },
    { id: 'products', label: 'Quản lí sản phẩm', icon: Package },
    { id: 'reviews', label: 'Quản lí đánh giá', icon: Star },
    { id: 'feedbacks', label: 'Quản lí phản hồi', icon: MessageCircle, badge: '4' },
    { id: 'consultations', label: 'Quản lí tư vấn', icon: MessageSquare, badge: '3' },
  ];

  const currentTabObj = menuItems.find((m) => m.id === activeTab) || menuItems[0];

  return (
    <div className="admin-console-view">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="admin-sidebar">
        {/* Brand Header */}
        <div className="admin-brand-header" onClick={() => handleTabChange('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="admin-brand-logo">
            <img src="/logo/logo.png" alt="UniVeloria Logo" className="admin-brand-logo-img" />
            <div className="admin-brand-text">
              <h3>UniVeloria<span className="brand-reg">®</span></h3>
              <span>PORTAL QUẢN TRỊ</span>
            </div>
          </div>
        </div>

        {/* Admin Profile Box */}
        <div className="admin-sidebar-profile">
          <div className="admin-avatar">
            <span>{user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'A'}</span>
          </div>
          <div className="admin-meta">
            <h4>{user?.fullName || 'Quản trị viên UniVeloria'}</h4>
            <span className="admin-role-tag">
              <Crown size={11} />
              <span>Toàn quyền hệ thống</span>
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="admin-nav-menu" aria-label="Admin Navigation">
          <span className="admin-nav-label">HỆ THỐNG QUẢN LÝ</span>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleTabChange(item.id)}
              >
                <div className="nav-btn-left">
                  <Icon size={17} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`admin-badge-count ${isActive ? 'active' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Actions */}
        <div className="admin-sidebar-footer">
          <button
            type="button"
            className="admin-switch-store-btn"
            onClick={() => navigateTo('home')}
            title="Quay lại giao diện website bán hàng"
          >
            <ExternalLink size={15} />
            <span>Xem website bán lẻ</span>
          </button>

          <button
            type="button"
            className="admin-logout-btn"
            onClick={() => {
              logout();
              navigateTo('login');
            }}
          >
            <LogOut size={15} />
            <span>Đăng xuất Quản trị</span>
          </button>
        </div>
      </aside>

      {/* ================= RIGHT MAIN AREA ================= */}
      <div className="admin-main-wrap">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-breadcrumb">
            <span className="crumb-root" onClick={() => navigateTo('home')}>Trang chủ</span>
            <ChevronRight size={14} className="crumb-arrow" />
            <span className="crumb-root" onClick={() => handleTabChange('dashboard')}>Admin</span>
            <ChevronRight size={14} className="crumb-arrow" />
            <span className="crumb-active">{currentTabObj.label}</span>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-live-badge">
              <span className="live-pulse" />
              <span>Hệ thống trực tuyến</span>
            </div>

            <button
              type="button"
              className="admin-icon-btn"
              title="Thông báo hệ thống"
              onClick={() => handleTabChange('consultations')}
            >
              <Bell size={17} />
              <span className="icon-badge-dot" />
            </button>
          </div>
        </header>

        {/* Content Body Rendering Active Tab */}
        <main className="admin-body-area">
          {activeTab === 'dashboard' && (
            <AdminDashboard onNavigateTab={handleTabChange} navigateTo={navigateTo} />
          )}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'products' && <AdminProducts onProductUpdated={onProductUpdated} />}
          {activeTab === 'reviews' && <AdminReviews onNavigateTab={handleTabChange} />}
          {activeTab === 'feedbacks' && <AdminFeedbacks />}
          {activeTab === 'consultations' && <AdminConsultations />}
        </main>
      </div>
    </div>
  );
}
export default AdminPage;

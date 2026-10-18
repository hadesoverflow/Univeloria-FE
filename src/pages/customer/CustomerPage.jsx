import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/layout/Header';
import { UnifiedFooter } from '../../components/layout/UnifiedFooter';
import { authApi } from '../../api/authApi';
import { customerApi } from '../../api/customerApi';
import { storageService } from '../../services/storageService';
import {
  User,
  ShoppingBag,
  Heart,
  Phone,
  ChevronRight,
  Headphones,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

import { CustomerProfile } from './CustomerProfile';
import { CustomerOrders } from './CustomerOrders';
import { CustomerFavorites } from './CustomerFavorites';
import { CustomerSecurity } from './CustomerSecurity';

export function CustomerPage({
  navigateTo,
  initialTab = 'profile',
  productFavorites = [],
  toggleProductFavorite
}) {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab); // 'profile' | 'orders' | 'favorites' | 'security'

  // Update tab if initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // ================= PROFILE STATE =================
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || 'Khách hàng UniVeloria',
    email: user?.email || 'customer@univeloria.com',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    role: user?.role || 'Customer'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: profileData.fullName,
    phoneNumber: profileData.phoneNumber,
    address: profileData.address,
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileErrorMsg, setProfileErrorMsg] = useState('');

  // ================= PASSWORD CHANGE STATE =================
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });

  // ================= ORDERS STATE (Real data only) =================
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ================= FAVORITES STATE (Real data only) =================
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  // Fetch all customer data from backend
  const fetchCustomerData = async () => {
    if (!storageService.getToken()) return;

    // 1. Fetch Profile
    try {
      setProfileLoading(true);
      const res = await customerApi.getProfile();
      if (res && res.success && res.data) {
        setProfileData({
          fullName: res.data.fullName || user?.fullName || 'Khách hàng UniVeloria',
          email: res.data.email || user?.email || 'customer@univeloria.com',
          phoneNumber: res.data.phoneNumber || user?.phoneNumber || '',
          address: res.data.address || '',
          role: res.data.role || 'Customer'
        });
        setProfileForm({
          fullName: res.data.fullName || '',
          phoneNumber: res.data.phoneNumber || '',
          address: res.data.address || '',
        });
        const currentSaved = storageService.getUser() || {};
        storageService.setUser({ ...currentSaved, ...res.data });
      }
    } catch (err) {
      console.warn('Could not fetch profile from BE:', err.message);
    } finally {
      setProfileLoading(false);
    }

    // 2. Fetch Orders (strictly from backend, no sample fallback)
    try {
      setOrdersLoading(true);
      const res = await customerApi.getOrders();
      if (res && res.success && Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.warn('Could not fetch orders from BE:', err.message);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }

    // 3. Fetch Favorites (strictly from backend, no sample fallback)
    try {
      setFavoritesLoading(true);
      const res = await customerApi.getFavorites();
      if (res && res.success && Array.isArray(res.data)) {
        setFavorites(res.data);
      } else {
        setFavorites([]);
      }
    } catch (err) {
      console.warn('Could not fetch favorites from BE:', err.message);
      setFavorites([]);
    } finally {
      setFavoritesLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileErrorMsg('');
    setProfileSuccessMsg('');

    try {
      const res = await customerApi.updateProfile({
        fullName: profileForm.fullName,
        phoneNumber: profileForm.phoneNumber,
        address: profileForm.address,
      });

      if (res && res.success && res.data) {
        setProfileData((prev) => ({
          ...prev,
          fullName: res.data.fullName,
          phoneNumber: res.data.phoneNumber,
          address: res.data.address,
        }));
        setIsEditingProfile(false);
        setProfileSuccessMsg('Cập nhật hồ sơ cá nhân thành công!');
        const currentSaved = storageService.getUser() || {};
        storageService.setUser({ ...currentSaved, ...res.data });
        setTimeout(() => setProfileSuccessMsg(''), 4000);
      }
    } catch (err) {
      setProfileErrorMsg(err.message || 'Không thể cập nhật hồ sơ cá nhân.');
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (!passwordForm.currentPassword) {
      setPasswordMsg({ type: 'error', text: 'Vui lòng nhập mật khẩu hiện tại.' });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordMsg({ type: 'error', text: 'Xác nhận mật khẩu mới không khớp.' });
      return;
    }

    setPasswordLoading(true);
    try {
      await authApi.changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
        passwordForm.confirmNewPassword
      );
      setPasswordMsg({ type: 'success', text: 'Đổi mật khẩu tài khoản thành công!' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setTimeout(() => setPasswordMsg({ type: '', text: '' }), 5000);
    } catch (err) {
      setPasswordMsg({ type: 'error', text: err.message || 'Mật khẩu hiện tại chưa chính xác.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Remove item from favorites via Backend
  const handleRemoveFavorite = async (productId) => {
    try {
      await customerApi.removeFavorite(productId);
      setFavorites((prev) => prev.filter((item) => item.productId !== productId));
      if (toggleProductFavorite) {
        toggleProductFavorite(productId);
      }
    } catch (err) {
      console.warn('Error removing favorite:', err.message);
      setFavorites((prev) => prev.filter((item) => item.productId !== productId));
    }
  };

  // Display favorite items: mapped directly from backend favorites (no fallback mock products)
  const displayFavorites = favorites.map((fav) => ({
    id: fav.productId,
    name: fav.productName,
    price: fav.price,
    category: fav.category,
    style: fav.style,
    image: fav.imageUrl || '/assets/category-living.jpg',
    badge: 'Yêu thích',
    colors: ['#c9a87c', '#e2d5c3', '#5a6268'],
  }));

  const initialLetter = profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : 'U';

  return (
    <div className="customer-page-view">
      {/* Top Header */}
      <Header currentPage="customer" navigateTo={navigateTo} />

      {/* Main Workspace */}
      <main className="customer-main-wrap">
        {/* Subtle Breadcrumb Header */}
        <div className="customer-top-breadcrumb">
          <div className="breadcrumb-nav">
            <span onClick={() => navigateTo('home')} className="crumb-link">
              Trang chủ
            </span>
            <ChevronRight size={14} className="crumb-arrow" />
            <span className="crumb-current">Tài khoản khách hàng</span>
          </div>
          <div className="customer-page-badge">
            <User size={13} color="#c8a87d" />
            <span>Cổng Khách Hàng UniVeloria®</span>
          </div>
        </div>

        {/* 2-Column Master-Detail Layout */}
        <div className="customer-workspace-layout">
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="customer-sidebar">
            {/* User Mini Profile Card */}
            <div className="sidebar-profile-card">
              <div className="sidebar-avatar-wrap">
                <div className="sidebar-avatar-circle">
                  <span>{initialLetter}</span>
                </div>
              </div>

              <div className="sidebar-user-meta">
                <h3 className="sidebar-user-name">{profileData.fullName}</h3>
                <p className="sidebar-user-email">{profileData.email}</p>
              </div>

              {/* Quick Counter Chips: Only Đơn may and Đã lưu */}
              <div className="sidebar-stats-row">
                <div
                  className="stat-chip"
                  onClick={() => setActiveTab('orders')}
                  title="Xem đơn hàng"
                >
                  <strong className="chip-num">{orders.length}</strong>
                  <span className="chip-txt">Đơn may</span>
                </div>
                <div
                  className="stat-chip"
                  onClick={() => setActiveTab('favorites')}
                  title="Xem rèm yêu thích"
                >
                  <strong className="chip-num">{displayFavorites.length}</strong>
                  <span className="chip-txt">Đã lưu</span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="customer-vertical-menu" aria-label="Customer Navigation">
              <button
                type="button"
                className={`menu-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <div className="nav-item-left">
                  <User size={17} />
                  <span>Hồ sơ cá nhân</span>
                </div>
                <ChevronRight size={15} className="menu-arrow" />
              </button>

              <button
                type="button"
                className={`menu-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <div className="nav-item-left">
                  <ShoppingBag size={17} />
                  <span>Lịch sử may đo</span>
                </div>
                <span className="menu-counter-badge">{orders.length}</span>
              </button>

              <button
                type="button"
                className={`menu-nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                <div className="nav-item-left">
                  <Heart size={17} />
                  <span>Mẫu rèm yêu thích</span>
                </div>
                <span className="menu-counter-badge">{displayFavorites.length}</span>
              </button>

              <button
                type="button"
                className={`menu-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <div className="nav-item-left">
                  <KeyRound size={17} />
                  <span>Bảo mật & Mật khẩu</span>
                </div>
                <ChevronRight size={15} className="menu-arrow" />
              </button>
            </nav>

            {/* Support Concierge Card */}
            <div className="sidebar-concierge-card">
              <div className="concierge-header">
                <Headphones size={15} color="#c8a87d" />
                <span>Hỗ Trợ May Đo Tận Nơi</span>
              </div>
              <p className="concierge-desc">
                Cần tư vấn mẫu vải thực tế tại tư gia hoặc đo đạc gấp?
              </p>
              <a href="tel:0334713541" className="concierge-phone">
                <Phone size={13} />
                <span>0334 713 541</span>
              </a>
            </div>
          </aside>

          {/* ================= RIGHT MAIN PANEL ================= */}
          <section className="customer-main-panel">
            {/* Global Alerts */}
            {profileSuccessMsg && (
              <div className="panel-alert success">
                <CheckCircle2 size={16} />
                <span>{profileSuccessMsg}</span>
              </div>
            )}
            {profileErrorMsg && (
              <div className="panel-alert error">
                <AlertCircle size={16} />
                <span>{profileErrorMsg}</span>
              </div>
            )}

            {/* Sub-component render based on activeTab */}
            {activeTab === 'profile' && (
              <CustomerProfile
                profileData={profileData}
                isEditingProfile={isEditingProfile}
                setIsEditingProfile={setIsEditingProfile}
                profileForm={profileForm}
                setProfileForm={setProfileForm}
                profileLoading={profileLoading}
                handleUpdateProfile={handleUpdateProfile}
              />
            )}

            {activeTab === 'orders' && (
              <CustomerOrders
                orders={orders}
                ordersLoading={ordersLoading}
                navigateTo={navigateTo}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
              />
            )}

            {activeTab === 'favorites' && (
              <CustomerFavorites
                displayFavorites={displayFavorites}
                favoritesLoading={favoritesLoading}
                handleRemoveFavorite={handleRemoveFavorite}
                navigateTo={navigateTo}
              />
            )}

            {activeTab === 'security' && (
              <CustomerSecurity
                passwordForm={passwordForm}
                setPasswordForm={setPasswordForm}
                passwordLoading={passwordLoading}
                passwordMsg={passwordMsg}
                handleChangePassword={handleChangePassword}
              />
            )}
          </section>
        </div>
      </main>

      {/* Unified Footer */}
      <UnifiedFooter navigateTo={navigateTo} />
    </div>
  );
}
export default CustomerPage;

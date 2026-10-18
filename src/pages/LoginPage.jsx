import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Crown,
  Gem,
  LogOut,
  Sparkles,
  ShieldCheck,
  House,
  Palette,
  User
} from 'lucide-react';

export function LoginPage({ navigateTo }) {
  const { user, isAuthenticated, login, loginWithGoogle, register, logout } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register'

  // Form states
  const [loginInput, setLoginInput] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: true,
  });

  const [registerInput, setRegisterInput] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'Customer',
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Quick autofill demo accounts
  const fillDemoAccount = (role) => {
    setErrorMsg('');
    setSuccessMsg('');
    setTab('login');
    if (role === 'admin') {
      setLoginInput({
        emailOrPhone: 'admin@univeloria.com',
        password: 'Admin@123',
        rememberMe: true,
      });
    } else {
      setLoginInput({
        emailOrPhone: 'customer@univeloria.com',
        password: 'Customer@123',
        rememberMe: true,
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginInput.emailOrPhone.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ Email hoặc Số điện thoại.');
      return;
    }
    if (!loginInput.password) {
      setErrorMsg('Vui lòng nhập mật khẩu tài khoản.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(loginInput.emailOrPhone.trim(), loginInput.password);
      setSuccessMsg(`Đăng nhập thành công! Chào mừng ${res.user.fullName}`);
      setTimeout(() => {
        if (res.user?.role === 'Admin') {
          navigateTo('admin');
        } else {
          navigateTo('customer');
        }
      }, 900);
    } catch (err) {
      setErrorMsg(err.message || 'Email, số điện thoại hoặc mật khẩu chưa chính xác.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!registerInput.fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!registerInput.email.trim()) {
      setErrorMsg('Vui lòng cung cấp địa chỉ email.');
      return;
    }
    if (!registerInput.phoneNumber.trim()) {
      setErrorMsg('Vui lòng cung cấp số điện thoại liên hệ.');
      return;
    }
    if (!registerInput.password || registerInput.password.length < 6) {
      setErrorMsg('Mật khẩu cần có tối thiểu 6 ký tự.');
      return;
    }
    if (registerInput.password !== registerInput.confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp với mật khẩu đã nhập.');
      return;
    }
    if (!registerInput.agreeTerms) {
      setErrorMsg('Vui lòng đồng ý với điều khoản sử dụng và chính sách bảo mật.');
      return;
    }

    setLoading(true);
    try {
      const res = await register({
        fullName: registerInput.fullName.trim(),
        email: registerInput.email.trim(),
        phoneNumber: registerInput.phoneNumber.trim(),
        password: registerInput.password,
        role: registerInput.role || 'Customer',
      });
      setSuccessMsg(res.message || 'Tạo tài khoản thành công! Bạn có thể đăng nhập ngay.');
      setTab('login');
      setLoginInput({
        emailOrPhone: registerInput.email.trim(),
        password: registerInput.password,
        rememberMe: true,
      });
    } catch (err) {
      setErrorMsg(err.message || 'Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    try {
      const googleData = {
        email: 'customer.google@univeloria.com',
        fullName: 'Khách hàng Google UniVeloria',
        googleId: 'google_oauth_' + Date.now(),
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      };

      const result = await loginWithGoogle(googleData);
      setSuccessMsg('Đăng nhập bằng tài khoản Google thành công!');
      setTimeout(() => {
        if (navigateTo) {
          if (result?.user?.role === 'Admin') {
            navigateTo('admin');
          } else {
            navigateTo('customer');
          }
        }
      }, 600);
    } catch (err) {
      setErrorMsg(err.message || 'Đăng nhập bằng tài khoản Google không thành công. Vui lòng thử lại.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="smart-split-auth">
      {/* ================= CỘT TRÁI: HÌNH ẢNH KHÔNG GIAN RÈM CAO CẤP ================= */}
      <div className="smart-auth-visual">
        <img
          src="/assets/login-backdrop.jpg"
          alt="Không gian rèm cửa UniVeloria"
          className="smart-auth-bg-img"
        />
        <div className="smart-auth-overlay-top" />
        <div className="smart-auth-overlay-bottom" />

        {/* Tiêu đề thương hiệu góc trên bên trái */}
        <div className="smart-visual-brand-header">
          <h1 className="smart-visual-title">UniVeloria</h1>
          <p className="smart-visual-subtitle">Thấu hiểu không gian, nâng tầm tổ ấm.</p>
        </div>

        {/* Chú thích bản quyền góc dưới bên trái */}
        <div className="smart-visual-brand-footer">
          <p>© 2026 UNIVELORIA®. Bản quyền đã được bảo lưu.</p>
        </div>
      </div>

      {/* ================= CỘT PHẢI: KHUNG ĐĂNG NHẬP / ĐĂNG KÝ ================= */}
      <div className="smart-auth-panel">
        {/* Nút quay về trang chủ */}
        <div className="smart-auth-topbar">
          <button
            type="button"
            className="smart-back-pill"
            onClick={() => navigateTo('home')}
            title="Quay về trang chủ Không Gian Sống"
          >
            <ArrowLeft size={15} />
            <span>TRANG CHỦ</span>
          </button>
        </div>

        {/* Khung nội dung chính */}
        <div className="smart-auth-center">
          {isAuthenticated && user ? (
            /* ================= TRẠNG THÁI ĐÃ ĐĂNG NHẬP ================= */
            <div className="smart-logged-card">
              <div className="smart-logged-avatar">
                <Crown size={28} />
              </div>
              <h2 className="smart-auth-heading">Chào mừng trở lại!</h2>
              <p className="smart-auth-subheading">
                Bạn hiện đang đăng nhập với vai trò{' '}
                <strong className="smart-role-tag">
                  {user.role === 'Admin' ? '👑 Quản Trị Viên (Admin)' : 'Khách Hàng'}
                </strong>
              </p>

              <div className="smart-user-details">
                <div className="detail-row">
                  <span>Họ và tên:</span>
                  <strong>{user.fullName}</strong>
                </div>
                <div className="detail-row">
                  <span>Địa chỉ email:</span>
                  <strong>{user.email}</strong>
                </div>
                {user.phoneNumber && (
                  <div className="detail-row">
                    <span>Số điện thoại:</span>
                    <strong>{user.phoneNumber}</strong>
                  </div>
                )}
              </div>

              <div className="smart-logged-actions">
                {user.role === 'Admin' ? (
                  <button
                    type="button"
                    className="smart-btn-primary"
                    onClick={() => navigateTo('admin')}
                  >
                    <Crown size={16} />
                    <span>TRANG QUẢN TRỊ (ADMIN)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="smart-btn-primary"
                    onClick={() => navigateTo('customer')}
                  >
                    <User size={16} />
                    <span>VÀO TRANG KHÁCH HÀNG</span>
                  </button>
                )}
                <button
                  type="button"
                  className="smart-btn-secondary"
                  onClick={() => navigateTo('home')}
                >
                  <House size={16} />
                  <span>VỀ TRANG CHỦ</span>
                </button>
                <button
                  type="button"
                  className="smart-btn-outline"
                  onClick={() => {
                    logout();
                    setSuccessMsg('Đã đăng xuất tài khoản an toàn.');
                  }}
                >
                  <LogOut size={16} />
                  <span>ĐĂNG XUẤT</span>
                </button>
              </div>
            </div>
          ) : (
            /* ================= FORM ĐĂNG NHẬP / ĐĂNG KÝ ================= */
            <div className="smart-form-container">
              {tab === 'login' ? (
                <>
                  <h2 className="smart-auth-heading">Chào mừng trở lại</h2>
                  <p className="smart-auth-subheading">Vui lòng nhập thông tin để đăng nhập tài khoản.</p>

                  {/* Đăng nhập với Google */}
                  <button
                    type="button"
                    className="smart-google-btn"
                    onClick={handleGoogleSignIn}
                    disabled={googleLoading}
                  >
                    <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{googleLoading ? 'Đang kết nối Google...' : 'Tiếp tục với Google'}</span>
                  </button>

                  {/* Phân cách */}
                  <div className="smart-divider">
                    <span className="smart-divider-line" />
                    <span className="smart-divider-text">hoặc đăng nhập bằng email</span>
                    <span className="smart-divider-line" />
                  </div>

                  {/* Nút chọn nhanh tài khoản thử nghiệm */}
                  <div className="smart-quick-demo">
                    <span className="demo-label">Tài khoản thử nghiệm:</span>
                    <button
                      type="button"
                      className="demo-pill admin-pill"
                      onClick={() => fillDemoAccount('admin')}
                      title="Email: admin@univeloria.com | Mật khẩu: Admin@123"
                    >
                      👑 Quản trị viên
                    </button>
                    <button
                      type="button"
                      className="demo-pill customer-pill"
                      onClick={() => fillDemoAccount('customer')}
                      title="Email: customer@univeloria.com | Mật khẩu: Customer@123"
                    >
                      💎 Khách hàng
                    </button>
                  </div>

                  {/* Thông báo lỗi / thành công */}
                  {errorMsg && (
                    <div className="smart-alert smart-alert-error">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                  {successMsg && (
                    <div className="smart-alert smart-alert-success">
                      <CheckCircle2 size={16} />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  {/* Biểu mẫu đăng nhập */}
                  <form onSubmit={handleLoginSubmit} className="smart-auth-form">
                    <div className="smart-field">
                      <label htmlFor="login-email">Địa chỉ Email hoặc SĐT</label>
                      <input
                        id="login-email"
                        type="text"
                        placeholder="Nhập địa chỉ email hoặc số điện thoại"
                        value={loginInput.emailOrPhone}
                        onChange={(e) =>
                          setLoginInput({ ...loginInput, emailOrPhone: e.target.value })
                        }
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="smart-field">
                      <label htmlFor="login-password">Mật khẩu</label>
                      <div className="smart-input-with-icon">
                        <input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Nhập mật khẩu của bạn"
                          value={loginInput.password}
                          onChange={(e) =>
                            setLoginInput({ ...loginInput, password: e.target.value })
                          }
                          autoComplete="current-password"
                          required
                        />
                        <button
                          type="button"
                          className="smart-toggle-eye"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Ẩn / Hiện mật khẩu"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="smart-row-options">
                      <label className="smart-checkbox-label">
                        <input
                          type="checkbox"
                          checked={loginInput.rememberMe}
                          onChange={(e) =>
                            setLoginInput({ ...loginInput, rememberMe: e.target.checked })
                          }
                        />
                        <span className="smart-checkbox-box" />
                        <span>Ghi nhớ đăng nhập</span>
                      </label>
                      <a
                        href="#contact"
                        className="smart-forgot-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setErrorMsg('Vui lòng liên hệ hotline 0334713541 hoặc email univeloria@gmail.com để lấy lại mật khẩu.');
                        }}
                      >
                        Quên mật khẩu?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="smart-submit-btn"
                      disabled={loading}
                    >
                      {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                    </button>
                  </form>

                  <div className="smart-switch-auth">
                    <span>Chưa có tài khoản? </span>
                    <button
                      type="button"
                      className="smart-switch-btn"
                      onClick={() => {
                        setTab('register');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                    >
                      Đăng ký ngay
                    </button>
                  </div>
                </>
              ) : (
                /* ================= FORM ĐĂNG KÝ TÀI KHOẢN MỚI ================= */
                <>
                  <h2 className="smart-auth-heading">Tạo tài khoản mới</h2>
                  <p className="smart-auth-subheading">Vui lòng điền thông tin để đăng ký tài khoản thành viên.</p>

                  {/* Lựa chọn vai trò */}
                  <div className="smart-role-selector">
                    <button
                      type="button"
                      className={`role-select-btn ${registerInput.role === 'Customer' ? 'active' : ''}`}
                      onClick={() => setRegisterInput({ ...registerInput, role: 'Customer' })}
                    >
                      <Gem size={15} />
                      <span>Khách hàng (Customer)</span>
                    </button>
                    <button
                      type="button"
                      className={`role-select-btn ${registerInput.role === 'Admin' ? 'active' : ''}`}
                      onClick={() => setRegisterInput({ ...registerInput, role: 'Admin' })}
                    >
                      <Crown size={15} />
                      <span>Quản trị viên (Admin)</span>
                    </button>
                  </div>

                  {/* Thông báo lỗi / thành công */}
                  {errorMsg && (
                    <div className="smart-alert smart-alert-error">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                  {successMsg && (
                    <div className="smart-alert smart-alert-success">
                      <CheckCircle2 size={16} />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleRegisterSubmit} className="smart-auth-form">
                    <div className="smart-field">
                      <label htmlFor="reg-name">Họ và tên</label>
                      <input
                        id="reg-name"
                        type="text"
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={registerInput.fullName}
                        onChange={(e) =>
                          setRegisterInput({ ...registerInput, fullName: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="smart-field">
                      <label htmlFor="reg-email">Địa chỉ Email</label>
                      <input
                        id="reg-email"
                        type="email"
                        placeholder="Ví dụ: univeloria@gmail.com"
                        value={registerInput.email}
                        onChange={(e) =>
                          setRegisterInput({ ...registerInput, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="smart-field">
                      <label htmlFor="reg-phone">Số điện thoại</label>
                      <input
                        id="reg-phone"
                        type="tel"
                        placeholder="Ví dụ: 0334713541"
                        value={registerInput.phoneNumber}
                        onChange={(e) =>
                          setRegisterInput({ ...registerInput, phoneNumber: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="smart-field">
                      <label htmlFor="reg-pass">Mật khẩu</label>
                      <div className="smart-input-with-icon">
                        <input
                          id="reg-pass"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Tối thiểu 6 ký tự"
                          value={registerInput.password}
                          onChange={(e) =>
                            setRegisterInput({ ...registerInput, password: e.target.value })
                          }
                          required
                        />
                        <button
                          type="button"
                          className="smart-toggle-eye"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="smart-field">
                      <label htmlFor="reg-confirm">Xác nhận mật khẩu</label>
                      <div className="smart-input-with-icon">
                        <input
                          id="reg-confirm"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Nhập lại mật khẩu vừa đặt"
                          value={registerInput.confirmPassword}
                          onChange={(e) =>
                            setRegisterInput({ ...registerInput, confirmPassword: e.target.value })
                          }
                          required
                        />
                        <button
                          type="button"
                          className="smart-toggle-eye"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="smart-row-options">
                      <label className="smart-checkbox-label">
                        <input
                          type="checkbox"
                          checked={registerInput.agreeTerms}
                          onChange={(e) =>
                            setRegisterInput({ ...registerInput, agreeTerms: e.target.checked })
                          }
                          required
                        />
                        <span className="smart-checkbox-box" />
                        <span>Tôi đồng ý với Điều khoản dịch vụ & Chính sách bảo mật</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="smart-submit-btn"
                      disabled={loading}
                    >
                      {loading ? 'Đang tạo tài khoản...' : 'Đăng Ký Tài Khoản'}
                    </button>
                  </form>

                  <div className="smart-switch-auth">
                    <span>Đã có tài khoản? </span>
                    <button
                      type="button"
                      className="smart-switch-btn"
                      onClick={() => {
                        setTab('login');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                    >
                      Đăng nhập ngay
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

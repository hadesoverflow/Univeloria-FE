import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  Shield,
  Lock,
  Unlock,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL'); // ALL | Customer | Admin
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New User Form State
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    role: 'Customer',
    isActive: true
  });

  const showToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch real users from Database via API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getUsers(searchTerm, roleFilter);
      if (res && res.data) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách người dùng:', err);
      setError(err.message || 'Không thể kết nối đến cơ sở dữ liệu.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Toggle user lock/unlock status in Database
  const handleToggleStatus = async (user) => {
    const actionText = user.isActive ? 'khóa' : 'mở khóa';
    if (!window.confirm(`Bạn có chắc chắn muốn ${actionText} tài khoản của ${user.fullName} (${user.email})?`)) {
      return;
    }

    try {
      await adminApi.toggleUserStatus(user.id);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u))
      );
      if (selectedUser && selectedUser.id === user.id) {
        setSelectedUser((prev) => ({ ...prev, isActive: !prev.isActive }));
      }
      showToast(`Đã ${actionText} tài khoản ${user.fullName} thành công!`);
    } catch (err) {
      showToast('Lỗi khi cập nhật trạng thái: ' + err.message, true);
    }
  };

  // Toggle role Admin <-> Customer in Database
  const handleToggleRole = async (user) => {
    const newRole = user.role === 'Admin' ? 'Customer' : 'Admin';
    const roleLabel = newRole === 'Admin' ? 'Quản trị viên (Admin)' : 'Khách hàng (Customer)';
    if (!window.confirm(`Bạn có chắc muốn chuyển vai trò của ${user.fullName} sang "${roleLabel}"?`)) {
      return;
    }

    try {
      await adminApi.changeUserRole(user.id, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
      if (selectedUser && selectedUser.id === user.id) {
        setSelectedUser((prev) => ({ ...prev, role: newRole }));
      }
      showToast(`Đã chuyển vai trò của ${user.fullName} thành ${roleLabel}!`);
    } catch (err) {
      showToast('Lỗi khi phân quyền: ' + err.message, true);
    }
  };

  // Delete user from Database
  const handleDeleteUser = async (user) => {
    if (!window.confirm(`CẢNH BÁO: Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản ${user.fullName} (${user.email}) khỏi cơ sở dữ liệu?`)) {
      return;
    }

    try {
      await adminApi.deleteUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      if (selectedUser && selectedUser.id === user.id) {
        setSelectedUser(null);
      }
      showToast(`Đã xóa tài khoản ${user.fullName} khỏi cơ sở dữ liệu!`);
    } catch (err) {
      showToast('Lỗi khi xóa người dùng: ' + err.message, true);
    }
  };

  // Create new user in Database
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.fullName || !newUser.email || !newUser.phoneNumber || !newUser.password) {
      alert('Vui lòng điền đầy đủ họ tên, email, số điện thoại và mật khẩu.');
      return;
    }

    setSubmitting(true);
    try {
      await adminApi.createUser(newUser);
      showToast(`Đã tạo tài khoản ${newUser.fullName} thành công!`);
      setShowCreateModal(false);
      setNewUser({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        role: 'Customer',
        isActive: true
      });
      fetchUsers();
    } catch (err) {
      alert('Không thể tạo người dùng: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Counts based on real database records
  const totalUsers = users.length;
  const totalCustomers = users.filter((u) => u.role === 'Customer').length;
  const totalAdmins = users.filter((u) => u.role === 'Admin').length;

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="admin-tab-content fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '12px 20px',
            borderRadius: '10px',
            background: toastMessage.isError ? '#fee2e2' : '#ecfdf5',
            color: toastMessage.isError ? '#991b1b' : '#065f46',
            border: `1px solid ${toastMessage.isError ? '#fca5a5' : '#a7f3d0'}`,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: 500,
            animation: 'fadeIn 0.25s ease'
          }}
        >
          {toastMessage.isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="admin-welcome-bar">
        <div>
          <h2 className="admin-page-heading">Quản Lý Người Dùng &amp; Phân Quyền</h2>
          <p className="admin-page-sub">
            Toàn bộ danh sách tài khoản được truy vấn trực tiếp từ cơ sở dữ liệu SQL Server ({totalUsers} thành viên).
          </p>
        </div>
        <div className="admin-quick-actions">
          <button
            type="button"
            className="btn-admin-secondary"
            onClick={fetchUsers}
            disabled={loading}
            title="Làm mới danh sách từ Database"
          >
            <RefreshCw size={15} className={loading ? 'admin-spin' : ''} />
            <span>Đồng bộ DB</span>
          </button>
          <button
            type="button"
            className="btn-admin-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={15} />
            <span>Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Tổng thành viên</span>
            <div className="stat-icon-wrap" style={{ background: 'rgba(200, 168, 125, 0.15)', color: '#c8a87d' }}>
              <Users size={18} />
            </div>
          </div>
          <div className="stat-value">{totalUsers}</div>
          <div className="stat-card-bottom">
            <span className="stat-sub">Tài khoản thực tế trong hệ thống</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Khách hàng đặt may</span>
            <div className="stat-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div className="stat-value">{totalCustomers}</div>
          <div className="stat-card-bottom">
            <span className="stat-sub">Khách hàng may đo và đăng ký web</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Ban quản trị</span>
            <div className="stat-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <Shield size={18} />
            </div>
          </div>
          <div className="stat-value">{totalAdmins}</div>
          <div className="stat-card-bottom">
            <span className="stat-sub">Quản trị viên &amp; Chuyên viên</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Đang hoạt động</span>
            <div className="stat-icon-wrap" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="stat-value">{users.filter((u) => u.isActive).length}</div>
          <div className="stat-card-bottom">
            <span className="stat-sub">Tài khoản có quyền đăng nhập</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="admin-filter-bar">
        <div className="admin-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm theo họ tên, email hoặc số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-filter-pills">
          <button
            type="button"
            className={`filter-pill-btn ${roleFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setRoleFilter('ALL')}
          >
            Tất cả ({totalUsers})
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${roleFilter === 'Customer' ? 'active' : ''}`}
            onClick={() => setRoleFilter('Customer')}
          >
            Khách hàng ({totalCustomers})
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${roleFilter === 'Admin' ? 'active' : ''}`}
            onClick={() => setRoleFilter('Admin')}
          >
            Quản trị viên ({totalAdmins})
          </button>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="admin-card-panel">
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
            <RefreshCw size={28} className="admin-spin" style={{ margin: '0 auto 12px auto', color: '#c8a87d' }} />
            <p>Đang tải danh sách người dùng từ cơ sở dữ liệu...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#dc2626' }}>
            <AlertCircle size={28} style={{ margin: '0 auto 10px auto' }} />
            <p>{error}</p>
            <button type="button" className="btn-admin-secondary" onClick={fetchUsers} style={{ marginTop: '12px' }}>
              Thử lại
            </button>
          </div>
        ) : (
          <div className="admin-table-responsive">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Thành viên</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ khảo sát</th>
                  <th>Vai trò</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="table-empty-cell" style={{ textAlign: 'center', padding: '40px' }}>
                      Không tìm thấy tài khoản người dùng nào phù hợp trong Database.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => {
                    const initial = u.fullName ? u.fullName.charAt(0).toUpperCase() : 'U';
                    return (
                      <tr key={u.id}>
                        <td>
                          <div className="user-profile-cell">
                            <div className={`cell-avatar ${u.role === 'Admin' ? 'admin' : ''}`}>
                              {initial}
                            </div>
                            <div className="cell-user-info">
                              <strong>{u.fullName}</strong>
                              <span>{u.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="table-phone">{u.phoneNumber || '—'}</span>
                        </td>
                        <td>
                          <span className="table-address-truncate" title={u.address}>
                            {u.address || 'Chưa cập nhật'}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-role-badge ${u.role === 'Admin' ? 'role-admin' : 'role-customer'}`}>
                            {u.role === 'Admin' ? '👑 Quản trị viên' : 'Khách hàng'}
                          </span>
                        </td>
                        <td>
                          <span className="table-date">{formatDate(u.createdAt)}</span>
                        </td>
                        <td>
                          <span className={`admin-status-pill ${u.isActive ? 'status-completed' : 'status-locked'}`}>
                            {u.isActive ? 'Đang hoạt động' : 'Tạm khóa'}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions-row">
                            <button
                              type="button"
                              className="btn-table-action view"
                              title="Xem chi tiết"
                              onClick={() => setSelectedUser(u)}
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              type="button"
                              className={`btn-table-action ${u.isActive ? 'lock' : 'unlock'}`}
                              title={u.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                              onClick={() => handleToggleStatus(u)}
                            >
                              {u.isActive ? <Lock size={14} /> : <Unlock size={14} />}
                            </button>
                            <button
                              type="button"
                              className="btn-table-action role"
                              title={u.role === 'Admin' ? 'Hạ cấp xuống Khách hàng' : 'Thăng cấp lên Quản trị viên'}
                              onClick={() => handleToggleRole(u)}
                            >
                              <Shield size={14} />
                            </button>
                            <button
                              type="button"
                              className="btn-table-action delete"
                              title="Xóa tài khoản khỏi Database"
                              onClick={() => handleDeleteUser(u)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="modal-backdrop" onClick={() => setSelectedUser(null)}>
          <div className="order-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-sub">HỒ SƠ THÀNH VIÊN THỰC TẾ (DATABASE)</span>
                <h3 className="modal-title">{selectedUser.fullName}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedUser(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-data-table">
                <div className="modal-data-row">
                  <span style={{ color: '#64748b' }}>Mã định danh (ID):</span>
                  <strong>#{selectedUser.id}</strong>
                </div>
                <div className="modal-data-row">
                  <span style={{ color: '#64748b' }}>Họ và tên:</span>
                  <strong>{selectedUser.fullName}</strong>
                </div>
                <div className="modal-data-row">
                  <span style={{ color: '#64748b' }}>Địa chỉ Email:</span>
                  <strong>{selectedUser.email}</strong>
                </div>
                <div className="modal-data-row">
                  <span style={{ color: '#64748b' }}>Số điện thoại:</span>
                  <strong>{selectedUser.phoneNumber || 'Chưa cập nhật'}</strong>
                </div>
                <div className="modal-data-row">
                  <span style={{ color: '#64748b' }}>Địa chỉ khảo sát / nhà:</span>
                  <strong>{selectedUser.address || 'Chưa cập nhật'}</strong>
                </div>
                <div className="modal-data-row">
                  <span style={{ color: '#64748b' }}>Vai trò tài khoản:</span>
                  <strong>{selectedUser.role === 'Admin' ? '👑 Quản trị viên (Admin)' : 'Khách hàng may đo'}</strong>
                </div>
                <div className="modal-data-row">
                  <span style={{ color: '#64748b' }}>Số đơn may đo liên kết:</span>
                  <strong>{selectedUser.ordersCount || 0} đơn hàng</strong>
                </div>
                <div className="modal-data-row">
                  <span style={{ color: '#64748b' }}>Trạng thái hoạt động:</span>
                  <span className={`admin-status-pill ${selectedUser.isActive ? 'status-completed' : 'status-locked'}`}>
                    {selectedUser.isActive ? 'Đang hoạt động' : 'Đã tạm khóa'}
                  </span>
                </div>
                <div className="modal-data-row">
                  <span style={{ color: '#64748b' }}>Ngày đăng ký trong DB:</span>
                  <strong>{formatDate(selectedUser.createdAt)}</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-admin-secondary"
                  onClick={() => handleToggleStatus(selectedUser)}
                >
                  {selectedUser.isActive ? 'Khóa tài khoản' : 'Mở khóa'}
                </button>
                <button
                  type="button"
                  className="btn-admin-secondary"
                  onClick={() => handleToggleRole(selectedUser)}
                >
                  Đổi vai trò
                </button>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedUser(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New User Modal */}
      {showCreateModal && (
        <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
          <div className="order-detail-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <div>
                <span className="modal-sub">THÊM TÀI KHOẢN MỚI VÀO CƠ SỞ DỮ LIỆU</span>
                <h3 className="modal-title">Tạo thành viên mới</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="modal-body-scroll" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="modal-form-group">
                    <label>
                      Họ và tên <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      className="modal-input"
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={newUser.fullName}
                      onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label>
                      Địa chỉ Email <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      className="modal-input"
                      placeholder="an.nguyen@example.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label>
                      Số điện thoại <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      className="modal-input"
                      placeholder="0912 345 678"
                      value={newUser.phoneNumber}
                      onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label>
                      Địa chỉ khách hàng
                    </label>
                    <input
                      type="text"
                      className="modal-input"
                      placeholder="Căn hộ / Số nhà, Phường, Quận, Thành phố..."
                      value={newUser.address}
                      onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label>
                      Mật khẩu khởi tạo <span className="req">*</span>
                    </label>
                    <input
                      type="password"
                      className="modal-input"
                      placeholder="Tối thiểu 6 ký tự"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="modal-form-group">
                    <label>
                      Vai trò phân quyền
                    </label>
                    <select
                      className="modal-select"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="Customer">Khách hàng may đo (Customer)</option>
                      <option value="Admin">Quản trị viên (Admin)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-modal-close"
                  onClick={() => setShowCreateModal(false)}
                  disabled={submitting}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="btn-admin-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Đang tạo...' : 'Lưu vào cơ sở dữ liệu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

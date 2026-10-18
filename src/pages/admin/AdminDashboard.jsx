import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  MessageSquare,
  DollarSign,
  ArrowRight,
  Clock,
  Plus,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';

export function AdminDashboard({ onNavigateTab, navigateTo }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getDashboard();
      if (res && res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Lỗi khi tải Dashboard:', err);
      setError(err.message || 'Không thể kết nối đến máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const getMetricIcon = (id) => {
    switch (id) {
      case 'revenue': return DollarSign;
      case 'orders': return ShoppingBag;
      case 'users': return Users;
      case 'consultations': return MessageSquare;
      default: return TrendingUp;
    }
  };

  const stats = data?.stats || [];
  const recentOrders = data?.recentOrders || [];
  const recentConsultations = data?.recentConsultations || [];

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
      {/* Top Banner / Welcome Row */}
      <div className="admin-welcome-bar">
        <div>
          <h2 className="admin-page-heading">Tổng Quan Hoạt Động (Dashboard)</h2>
          <p className="admin-page-sub">
            Số liệu kinh doanh, tiến độ may đo công trình và khách hàng thực tế từ cơ sở dữ liệu.
          </p>
        </div>
        <div className="admin-quick-actions">
          <button
            type="button"
            className="btn-admin-secondary"
            onClick={fetchDashboard}
            title="Đồng bộ dữ liệu thời gian thực"
          >
            <RefreshCw size={15} className={loading ? 'admin-spin' : ''} />
            <span>Làm mới DB</span>
          </button>
          <button
            type="button"
            className="btn-admin-secondary"
            onClick={() => onNavigateTab('consultations')}
          >
            <Clock size={15} />
            <span>Xử lý tư vấn ({recentConsultations.length})</span>
          </button>
          <button
            type="button"
            className="btn-admin-primary"
            onClick={() => onNavigateTab('orders')}
          >
            <Plus size={15} />
            <span>Tạo đơn may đo mới</span>
          </button>
        </div>
      </div>

      {loading && !data ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
          <RefreshCw size={28} className="admin-spin" style={{ margin: '0 auto 12px auto', color: '#c8a87d' }} />
          <p>Đang tổng hợp dữ liệu thống kê từ SQL Server...</p>
        </div>
      ) : error ? (
        <div style={{ padding: '30px', textAlign: 'center', color: '#dc2626' }}>
          <AlertCircle size={24} style={{ margin: '0 auto 8px auto' }} />
          <p>{error}</p>
          <button type="button" className="admin-btn-secondary" onClick={fetchDashboard} style={{ marginTop: '10px' }}>
            Thử lại
          </button>
        </div>
      ) : (
        <>
          {/* Metrics 4-Col Grid */}
          <div className="admin-stats-grid">
            {stats.map((item) => {
              const Icon = getMetricIcon(item.id);
              return (
                <div key={item.id} className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-title">{item.title}</span>
                    <div
                      className="stat-icon-wrap"
                      style={{ background: item.bgColor, color: item.color }}
                    >
                      <Icon size={18} />
                    </div>
                  </div>
                  <div className="stat-value">{item.value}</div>
                  <div className="stat-card-bottom">
                    <span className={`stat-badge ${item.isPositive ? 'positive' : 'urgent'}`}>
                      {item.change}
                    </span>
                    <span className="stat-sub">{item.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2-Column Split: Orders Table & Consultations Feed */}
          <div className="admin-grid-2col">
            {/* Left: Recent Orders */}
            <div className="admin-card-panel">
              <div className="panel-card-header">
                <div>
                  <h3 className="panel-card-title">Tiến Độ May Đo Gần Đây</h3>
                  <p className="panel-card-sub">Các đơn may rèm thủ công đang trong tiến trình</p>
                </div>
                <button
                  type="button"
                  className="btn-link-action"
                  onClick={() => onNavigateTab('orders')}
                >
                  <span>Xem tất cả</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="admin-table-responsive">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Phòng / Vị trí</th>
                      <th>Tổng giá</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                          Chưa có đơn hàng nào trong hệ thống.
                        </td>
                      </tr>
                    ) : (
                      recentOrders.map((ord) => (
                        <tr key={ord.id}>
                          <td>
                            <span className="table-code-badge">#{ord.orderCode}</span>
                          </td>
                          <td>
                            <div className="table-user-cell">
                              <strong>{ord.customerName}</strong>
                              <small>{ord.customerPhone}</small>
                            </div>
                          </td>
                          <td>
                            <span className="table-curtain-name">{ord.roomType || 'Phòng khách'}</span>
                          </td>
                          <td>
                            <span className="table-price-val">{ord.totalPrice?.toLocaleString('vi-VN')}₫</span>
                          </td>
                          <td>
                            <span className={`admin-status-pill ${ord.statusType === 'completed' ? 'status-completed' : ord.statusType === 'pending' ? 'status-pending' : 'status-progress'}`}>
                              {ord.status}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn-table-icon"
                              title="Xem chi tiết đơn hàng"
                              onClick={() => onNavigateTab('orders')}
                            >
                              <Eye size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Consultations Feed */}
            <div className="admin-card-panel">
              <div className="panel-card-header">
                <div>
                  <h3 className="panel-card-title">Yêu Cầu Tư Vấn May Đo Mới</h3>
                  <p className="panel-card-sub">Khách hàng gửi yêu cầu tư vấn mẫu rèm & kích thước</p>
                </div>
                <button
                  type="button"
                  className="btn-link-action"
                  onClick={() => onNavigateTab('consultations')}
                >
                  <span>Chi tiết</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="consultations-feed">
                {recentConsultations.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                    Không có yêu cầu tư vấn mới nào cần xử lý.
                  </div>
                ) : (
                  recentConsultations.map((item) => (
                    <div key={item.id} className="consultation-item">
                      <div className="item-avatar">
                        {item.customerName ? item.customerName.charAt(0).toUpperCase() : 'C'}
                      </div>
                      <div className="item-info">
                        <div className="item-name-row">
                          <strong>{item.customerName}</strong>
                          <span className="item-time">{formatDate(item.createdAt)}</span>
                        </div>
                        <div className="item-phone">{item.phone}</div>
                        <div className="item-address" title={item.address}>
                          {item.address || 'Showroom UniVeloria'}
                        </div>
                        <div className="item-type-badge">{item.serviceType}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

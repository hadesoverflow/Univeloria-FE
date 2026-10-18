import React, { useState, useEffect, useCallback } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Edit2,
  Calendar,
  User,
  MapPin,
  FileText,
  RefreshCw,
  AlertCircle,
  Trash2,
  CreditCard
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';

export function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getOrders(statusFilter, searchTerm);
      if (res && res.data) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách đơn hàng:', err);
      setError(err.message || 'Không thể tải danh sách đơn hàng.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Update order status in Database
  const handleUpdateStatus = async (newStatus, newType) => {
    if (!selectedOrder) return;
    setUpdating(true);
    try {
      await adminApi.updateOrderStatus(selectedOrder.id, newStatus, newType);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id
            ? { ...o, status: newStatus, statusType: newType }
            : o
        )
      );
      setSelectedOrder((prev) => ({
        ...prev,
        status: newStatus,
        statusType: newType
      }));
    } catch (err) {
      alert('Lỗi khi cập nhật trạng thái đơn: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Update order payment status in Database
  const handleUpdatePayment = async (status, amount, method = null) => {
    if (!selectedOrder) return;
    setUpdating(true);
    try {
      const payload = {
        paymentStatus: status,
        paidAmount: Number(amount),
        paymentMethod: method || selectedOrder.paymentMethod || 'Chuyển khoản VietQR',
        transactionCode: selectedOrder.transactionCode || `ADM-TXN-${Date.now().toString().slice(-6)}`
      };
      await adminApi.updateOrderPayment(selectedOrder.id, payload);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id
            ? { ...o, paymentStatus: status, paidAmount: Number(amount), paymentMethod: payload.paymentMethod }
            : o
        )
      );
      setSelectedOrder((prev) => ({
        ...prev,
        paymentStatus: status,
        paidAmount: Number(amount),
        paymentMethod: payload.paymentMethod
      }));
      alert(`Đã cập nhật thanh toán đơn #${selectedOrder.orderCode}: ${status}`);
    } catch (err) {
      alert('Lỗi khi cập nhật thanh toán: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Delete order from Database
  const handleDeleteOrder = async (order) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng #${order.orderCode} (${order.productName}) khỏi Database?`)) {
      try {
        await adminApi.deleteOrder(order.id);
        setOrders((prev) => prev.filter((o) => o.id !== order.id));
        if (selectedOrder && selectedOrder.id === order.id) {
          setSelectedOrder(null);
        }
      } catch (err) {
        alert('Lỗi khi xóa đơn hàng: ' + err.message);
      }
    }
  };

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
      <div className="admin-welcome-bar">
        <div>
          <h2 className="admin-page-heading">Quản Lí Đơn Hàng & May Đo Rèm</h2>
          <p className="admin-page-sub">
            Theo dõi quy trình cắt may thủ công, thanh toán cọc và tiến độ đóng gói giao nhận theo kích thước khách đặt.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="btn-admin-secondary"
            onClick={fetchOrders}
            title="Đồng bộ danh sách từ DB"
          >
            <RefreshCw size={15} className={loading ? 'admin-spin' : ''} />
            <span>Làm mới DB</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm theo mã đơn #UV-..., khách hàng, sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-filter-pills">
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setStatusFilter('ALL')}
          >
            Tất cả ({orders.length})
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Chờ xác nhận kích thước
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'in_progress' ? 'active' : ''}`}
            onClick={() => setStatusFilter('in_progress')}
          >
            Đang may đo
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            Đã hoàn thành
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card-panel">
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
            <RefreshCw size={28} className="admin-spin" style={{ margin: '0 auto 12px auto', color: '#c8a87d' }} />
            <p>Đang tải đơn hàng từ cơ sở dữ liệu...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#dc2626' }}>
            <AlertCircle size={28} style={{ margin: '0 auto 10px auto' }} />
            <p>{error}</p>
            <button type="button" className="btn-admin-secondary" onClick={fetchOrders} style={{ marginTop: '12px' }}>
              Thử lại
            </button>
          </div>
        ) : (
          <div className="admin-table-responsive">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Sản phẩm & Không gian</th>
                  <th>Tổng giá trị</th>
                  <th>Thanh toán & Cọc</th>
                  <th>Chuyên viên</th>
                  <th>Tiến độ may đo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="table-empty-cell" style={{ textAlign: 'center', padding: '40px' }}>
                      Không tìm thấy đơn may đo nào thỏa mãn điều kiện.
                    </td>
                  </tr>
                ) : (
                  orders.map((ord) => (
                    <tr key={ord.id}>
                      <td>
                        <span className="table-code-badge">#{ord.orderCode}</span>
                        <small className="table-sub-date">{formatDate(ord.createdAt)}</small>
                      </td>
                      <td>
                        <div className="table-user-cell">
                          <strong>{ord.customerName}</strong>
                          <small>{ord.customerPhone}</small>
                        </div>
                      </td>
                      <td>
                        <div className="table-curtain-cell">
                          <strong>{ord.productName}</strong>
                          <span>{ord.roomType} • {ord.dimensions}</span>
                        </div>
                      </td>
                      <td>
                        <strong className="table-price">
                          {Number(ord.totalPrice).toLocaleString('vi-VN')}₫
                        </strong>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span className={
                            ord.paymentStatus?.includes('100%')
                              ? 'payment-badge-full'
                              : ord.paymentStatus?.includes('50%') || ord.paymentStatus?.includes('40%')
                              ? 'payment-badge-deposit'
                              : 'payment-badge-pending'
                          }>
                            {ord.paymentStatus || 'Chờ thanh toán PayOS'}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: ord.paymentTier === '50%' ? '#b45309' : '#047857', background: ord.paymentTier === '50%' ? '#fffbeb' : '#ecfdf5', padding: '1px 6px', borderRadius: '4px', border: `1px solid ${ord.paymentTier === '50%' ? '#fde68a' : '#a7f3d0'}` }}>
                              {ord.paymentTier === '50%' ? 'Cọc 50% • Ship 50k' : '100% • Free Ship'}
                            </span>
                          </div>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>
                            {ord.paymentMethod || 'Cổng PayOS'}
                            {ord.payOSOrderCode ? ` (#${ord.payOSOrderCode})` : ''}
                          </span>
                          <strong style={{ fontSize: '12px', color: '#0f172a' }}>
                            {(Number(ord.paidAmount) || 0).toLocaleString('vi-VN')}₫
                            <span style={{ fontWeight: 'normal', color: '#94a3b8', fontSize: '10.5px' }}>
                              {' '}/ {(Number(ord.totalPrice) + Number(ord.shippingFee || 0)).toLocaleString('vi-VN')}₫
                            </span>
                          </strong>
                        </div>
                      </td>
                      <td>
                        <span className="table-installer">{ord.installerName || 'Chưa phân công'}</span>
                      </td>
                      <td>
                        <span className={`admin-status-pill ${
                          ord.statusType === 'completed'
                            ? 'status-completed'
                            : ord.statusType === 'in_progress'
                            ? 'status-progress'
                            : 'status-pending'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions-row">
                          <button
                            type="button"
                            className="btn-table-action view"
                            title="Xem chi tiết & Quản lý thanh toán"
                            onClick={() => setSelectedOrder(ord)}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            type="button"
                            className="btn-table-action delete"
                            title="Xóa đơn hàng khỏi Database"
                            onClick={() => handleDeleteOrder(ord)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail & Status Management Modal */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="order-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-sub">CHI TIẾT ĐƠN HÀNG MAY ĐO & GIAO NHẬN</span>
                <h3>Đơn hàng #{selectedOrder.orderCode}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-grid-2col">
                <div className="modal-left">
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '15px' }}>Trạng Thái May Đo & Giao Nhận</h4>
                  <div className="modal-status-box" style={{ marginBottom: '16px' }}>
                    <span>Hiện tại:</span>
                    <strong className="status-highlight">{selectedOrder.status}</strong>
                  </div>

                  <span className="info-label" style={{ display: 'block', marginBottom: '8px' }}>
                    Cập nhật tiến độ may đo vào DB:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    <button
                      type="button"
                      className="btn-admin-secondary"
                      disabled={updating}
                      onClick={() => handleUpdateStatus('Chờ xác nhận kích thước', 'pending')}
                    >
                      <Clock size={14} />
                      <span>Chuyển: Chờ kích thước</span>
                    </button>
                    <button
                      type="button"
                      className="btn-admin-secondary"
                      disabled={updating}
                      onClick={() => handleUpdateStatus('Đang may đo thủ công', 'in_progress')}
                    >
                      <Edit2 size={14} />
                      <span>Chuyển: Đang may đo</span>
                    </button>
                    <button
                      type="button"
                      className="btn-admin-secondary"
                      disabled={updating}
                      onClick={() => handleUpdateStatus('Đang đóng gói & Giao hàng', 'in_progress')}
                    >
                      <Truck size={14} />
                      <span>Chuyển: Đang giao hàng</span>
                    </button>
                    <button
                      type="button"
                      className="btn-admin-primary"
                      disabled={updating}
                      onClick={() => handleUpdateStatus('Đã giao hàng & Hoàn thành', 'completed')}
                    >
                      <CheckCircle2 size={14} />
                      <span>Đánh dấu Đã Giao & Hoàn Thành</span>
                    </button>
                  </div>

                  {/* Quản lý thanh toán */}
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                    Quản Lý Thanh Toán PayOS (Cọc 50% / 100%)
                  </h4>
                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Trạng thái:</span>
                      <span className={
                        selectedOrder.paymentStatus?.includes('100%')
                          ? 'payment-badge-full'
                          : selectedOrder.paymentStatus?.includes('50%') || selectedOrder.paymentStatus?.includes('40%')
                          ? 'payment-badge-deposit'
                          : 'payment-badge-pending'
                      }>
                        {selectedOrder.paymentStatus || 'Chờ thanh toán PayOS'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Mức thanh toán:</span>
                      <strong style={{ fontSize: '12px', color: selectedOrder.paymentTier === '50%' ? '#b45309' : '#047857' }}>
                        {selectedOrder.paymentTier === '50%' ? 'Cọc 50% (Không hỗ trợ phí ship)' : 'Thanh toán 100% (Được Miễn phí ship)'}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Phí vận chuyển:</span>
                      <strong style={{ fontSize: '12px', color: (selectedOrder.shippingFee || 0) === 0 ? '#047857' : '#0f172a' }}>
                        {(selectedOrder.shippingFee || 0) === 0 ? '0₫ (Miễn phí ship)' : `${Number(selectedOrder.shippingFee || 50000).toLocaleString('vi-VN')}₫`}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Hình thức:</span>
                      <strong style={{ fontSize: '12px' }}>
                        {selectedOrder.paymentMethod || 'Cổng PayOS'}
                        {selectedOrder.payOSOrderCode ? ` (#${selectedOrder.payOSOrderCode})` : ''}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Đã thanh toán:</span>
                      <strong style={{ color: '#047857', fontSize: '13px' }}>
                        {(Number(selectedOrder.paidAmount) || 0).toLocaleString('vi-VN')}₫ / {(Number(selectedOrder.totalPrice) + Number(selectedOrder.shippingFee || 0)).toLocaleString('vi-VN')}₫
                      </strong>
                    </div>
                  </div>

                  <span className="info-label" style={{ display: 'block', marginBottom: '8px' }}>
                    Thao tác nhanh xác nhận tiền PayOS:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      type="button"
                      className="btn-admin-secondary"
                      disabled={updating}
                      onClick={() => handleUpdatePayment('Đã thanh toán cọc 50%', Math.round(selectedOrder.totalPrice * 0.5), 'Cổng PayOS')}
                      style={{ color: '#047857', borderColor: '#a7f3d0', background: '#ecfdf5' }}
                    >
                      <CheckCircle2 size={14} color="#047857" />
                      <span>Xác nhận ĐÃ NHẬN CỌC 50% ({(Math.round(selectedOrder.totalPrice * 0.5)).toLocaleString('vi-VN')}₫)</span>
                    </button>
                    <button
                      type="button"
                      className="btn-admin-secondary"
                      disabled={updating}
                      onClick={() => handleUpdatePayment('Đã thanh toán 100%', selectedOrder.totalPrice + Number(selectedOrder.shippingFee || 0), 'Cổng PayOS')}
                      style={{ color: '#1d4ed8', borderColor: '#bfdbfe', background: '#eff6ff' }}
                    >
                      <CheckCircle2 size={14} color="#1d4ed8" />
                      <span>Xác nhận ĐÃ THU ĐỦ 100% ({Number(selectedOrder.totalPrice + Number(selectedOrder.shippingFee || 0)).toLocaleString('vi-VN')}₫{selectedOrder.paymentTier !== '50%' ? ' • Free Ship' : ''})</span>
                    </button>
                    <button
                      type="button"
                      className="btn-admin-secondary"
                      disabled={updating}
                      onClick={() => handleUpdatePayment('Chờ thanh toán cọc', 0, 'Cổng PayOS')}
                      style={{ color: '#b45309', borderColor: '#fde68a', background: '#fffbeb' }}
                    >
                      <RefreshCw size={14} color="#b45309" />
                      <span>Đặt lại: Chờ thanh toán PayOS (0₫)</span>
                    </button>
                  </div>
                </div>

                <div className="modal-right-info">
                  <h4>{selectedOrder.productName}</h4>
                  <div className="modal-data-table">
                    <div className="data-row">
                      <span>Khách hàng:</span>
                      <strong>{selectedOrder.customerName} ({selectedOrder.customerPhone})</strong>
                    </div>
                    <div className="data-row">
                      <span>Địa chỉ giao hàng:</span>
                      <strong>{selectedOrder.customerAddress || 'Chưa cập nhật'}</strong>
                    </div>
                    <div className="data-row">
                      <span>Vị trí phòng:</span>
                      <strong>{selectedOrder.roomType}</strong>
                    </div>
                    <div className="data-row">
                      <span>Kích thước:</span>
                      <strong>{selectedOrder.dimensions || 'Theo bản vẽ'}</strong>
                    </div>
                    <div className="data-row">
                      <span>Chất liệu vải:</span>
                      <strong>{selectedOrder.fabric}</strong>
                    </div>
                    <div className="data-row">
                      <span>Hệ thống ray / Động cơ:</span>
                      <strong>{selectedOrder.motorType}</strong>
                    </div>
                    <div className="data-row">
                      <span>Chuyên viên phụ trách:</span>
                      <strong>{selectedOrder.installerName || 'Chuyên viên UniVeloria'}</strong>
                    </div>
                    {selectedOrder.notes && (
                      <div className="data-row">
                        <span>Ghi chú may đo:</span>
                        <em>{selectedOrder.notes}</em>
                      </div>
                    )}
                  </div>

                  <div className="modal-price-breakdown">
                    <div className="price-item">
                      <span>Tiền rèm may đo:</span>
                      <strong>{Number(selectedOrder.totalPrice).toLocaleString('vi-VN')}₫</strong>
                    </div>
                    <div className="price-item">
                      <span>Phí vận chuyển:</span>
                      <strong style={{ color: Number(selectedOrder.shippingFee || 0) === 0 ? '#047857' : '#0f172a' }}>
                        {Number(selectedOrder.shippingFee || 0) === 0
                          ? '🎉 Miễn phí (0₫)'
                          : `${Number(selectedOrder.shippingFee || 50000).toLocaleString('vi-VN')}₫ (Không hỗ trợ do cọc 50%)`}
                      </strong>
                    </div>
                    <div className="price-item" style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '6px' }}>
                      <span>Tổng giá trị đơn:</span>
                      <strong style={{ fontSize: '14px', color: '#0f172a' }}>
                        {(Number(selectedOrder.totalPrice) + Number(selectedOrder.shippingFee || 0)).toLocaleString('vi-VN')}₫
                      </strong>
                    </div>
                    <div className="price-item">
                      <span>Mức giao dịch PayOS:</span>
                      <strong className="paid">
                        {selectedOrder.paymentTier === '50%'
                          ? `Cọc 50% (${(Math.round(selectedOrder.totalPrice * 0.5)).toLocaleString('vi-VN')}₫)`
                          : `100% (${Number(selectedOrder.totalPrice).toLocaleString('vi-VN')}₫ • Free Ship)`}
                      </strong>
                    </div>
                    <div className="price-item">
                      <span>Thực tế đã thanh toán:</span>
                      <strong style={{ color: '#047857' }}>
                        {(Number(selectedOrder.paidAmount) || 0).toLocaleString('vi-VN')}₫
                      </strong>
                    </div>
                    <div className="price-item">
                      <span>Còn lại cần thu khi giao:</span>
                      <strong style={{ color: '#dc2626' }}>
                        {Math.max(0, (Number(selectedOrder.totalPrice) + Number(selectedOrder.shippingFee || 0)) - (Number(selectedOrder.paidAmount) || 0)).toLocaleString('vi-VN')}₫
                      </strong>
                    </div>
                  </div>

                  <div style={{ marginTop: '14px', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>
                    <strong style={{ color: '#0f172a', display: 'block', marginBottom: '2px' }}>Chính sách bán hàng UniVeloria:</strong>
                    Sản phẩm rèm may đo hoàn thiện kèm đầy đủ phụ kiện treo (ray/móc/pát gắn) và hướng dẫn tự lắp đặt tại nhà. UniVeloria không cung cấp dịch vụ nhân công lắp đặt.
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

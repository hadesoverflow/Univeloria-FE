import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  PhoneCall,
  CalendarCheck,
  Trash2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';

export function AdminConsultations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scheduleModal, setScheduleModal] = useState(null);
  const [assigneeName, setAssigneeName] = useState('Trần Song Nam');
  const [scheduleDate, setScheduleDate] = useState('');
  const [submittingSchedule, setSubmittingSchedule] = useState(false);

  // Fetch real consultations from Database
  const fetchConsultations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getConsultations(statusFilter, searchTerm);
      if (res && res.data) {
        setConsultations(res.data);
      } else {
        setConsultations([]);
      }
    } catch (err) {
      console.error('Lỗi khi tải yêu cầu tư vấn:', err);
      setError(err.message || 'Không thể kết nối đến cơ sở dữ liệu.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  // Update status handler
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await adminApi.updateConsultationStatus(id, newStatus);
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      alert('Lỗi khi cập nhật trạng thái: ' + err.message);
    }
  };

  // Submit scheduling
  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!scheduleModal || !scheduleDate) {
      alert('Vui lòng chọn ngày giờ hẹn khảo sát.');
      return;
    }

    setSubmittingSchedule(true);
    try {
      await adminApi.scheduleConsultation(scheduleModal.id, new Date(scheduleDate).toISOString(), assigneeName);
      setConsultations((prev) =>
        prev.map((c) =>
          c.id === scheduleModal.id
            ? { ...c, status: 'scheduled', scheduledDate: scheduleDate, assignee: assigneeName }
            : c
        )
      );
      setScheduleModal(null);
    } catch (err) {
      alert('Lỗi khi xếp lịch hẹn: ' + err.message);
    } finally {
      setSubmittingSchedule(false);
    }
  };

  // Delete inquiry
  const handleDelete = async (id, customerName) => {
    if (window.confirm(`Bạn có chắc muốn xóa yêu cầu tư vấn của "${customerName}" khỏi Database?`)) {
      try {
        await adminApi.deleteConsultation(id);
        setConsultations((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        alert('Lỗi khi xóa yêu cầu: ' + err.message);
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
          <h2 className="admin-page-heading">Quản Lí Yêu Cầu Tư Vấn & Báo Giá Rèm</h2>
          <p className="admin-page-sub">
            Danh sách yêu cầu tư vấn kích thước và mẫu vải rèm từ khách hàng trong Database ({consultations.length} yêu cầu).
          </p>
        </div>
        <button
          type="button"
          className="admin-btn-secondary"
          onClick={fetchConsultations}
          disabled={loading}
          title="Làm mới từ Database"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          <span>Làm mới</span>
        </button>
      </div>

      {error && (
        <div className="admin-error-banner" style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '10px', color: '#b91c1c', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm theo tên khách hàng, số điện thoại, địa chỉ công trình..."
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
            Tất cả ({consultations.length})
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Chờ liên hệ
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'scheduled' ? 'active' : ''}`}
            onClick={() => setStatusFilter('scheduled')}
          >
            Đã hẹn lịch
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

      {/* Consultations Table */}
      <div className="admin-card-panel">
        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Địa chỉ khảo sát</th>
                <th>Nhu cầu may đo</th>
                <th>Ghi chú yêu cầu</th>
                <th>Ngày gửi</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>
                    <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 8px', display: 'block', color: '#c8a87d' }} />
                    <span>Đang tải danh sách tư vấn từ Database...</span>
                  </td>
                </tr>
              ) : consultations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="table-empty-cell" style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                    Không có yêu cầu tư vấn nào trong cơ sở dữ liệu.
                  </td>
                </tr>
              ) : (
                consultations.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="user-profile-cell">
                        <div className="cell-avatar">{c.customerName ? c.customerName.charAt(0) : 'K'}</div>
                        <div className="cell-user-info">
                          <strong>{c.customerName}</strong>
                          <a href={`tel:${c.phone}`} className="table-phone-link">
                            📞 {c.phone}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="table-address-truncate" title={c.address}>
                        {c.address || '—'}
                      </span>
                    </td>
                    <td>
                      <div className="table-curtain-cell">
                        <strong>{c.serviceType}</strong>
                        {c.fabricDemand && <span>{c.fabricDemand}</span>}
                      </div>
                    </td>
                    <td style={{ maxWidth: '280px' }}>
                      <p className="table-comment-text">{c.notes || '—'}</p>
                      {c.scheduledDate && (
                        <div style={{ marginTop: '4px', fontSize: '11px', color: '#3b82f6', fontWeight: 600 }}>
                          🗓 Lịch: {formatDate(c.scheduledDate)} {c.assignee ? `(${c.assignee})` : ''}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="table-date">{formatDate(c.createdAt)}</span>
                    </td>
                    <td>
                      <span className={`admin-status-pill ${
                        (c.status || '').toLowerCase() === 'completed'
                          ? 'status-completed'
                          : (c.status || '').toLowerCase() === 'scheduled'
                          ? 'status-progress'
                          : 'status-pending'
                      }`}>
                        {(c.status || '').toLowerCase() === 'completed'
                          ? 'Đã tư vấn'
                          : (c.status || '').toLowerCase() === 'scheduled'
                          ? 'Đã hẹn lịch'
                          : 'Chờ liên hệ'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions-row">
                        <a
                          href={`tel:${c.phone || c.phoneNumber || ''}`}
                          className="btn-table-action view"
                          title="Gọi điện tư vấn"
                        >
                          <PhoneCall size={14} />
                        </a>
                        {(c.status || '').toLowerCase() === 'pending' && (
                          <button
                            type="button"
                            className="btn-table-action role"
                            title="Xếp lịch hẹn khảo sát"
                            onClick={() => {
                              setScheduleModal(c);
                              setScheduleDate('');
                            }}
                          >
                            <CalendarCheck size={14} color="#3b82f6" />
                          </button>
                        )}
                        {(c.status || '').toLowerCase() !== 'completed' && (
                          <button
                            type="button"
                            className="btn-table-action unlock"
                            title="Đánh dấu hoàn thành"
                            onClick={() => handleUpdateStatus(c.id, 'completed')}
                          >
                            <CheckCircle2 size={14} color="#10b981" />
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-table-action delete"
                          title="Xóa yêu cầu khỏi Database"
                          onClick={() => handleDelete(c.id, c.customerName || c.fullName || 'Khách hàng')}
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
      </div>

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="modal-backdrop" onClick={() => setScheduleModal(null)}>
          <div className="order-detail-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <div>
                <span className="modal-sub">XẾP LỊCH HẸN KHẢO SÁT TẬN NƠI</span>
                <h3>{scheduleModal.customerName}</h3>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setScheduleModal(null)}>✕</button>
            </div>
            <form onSubmit={handleScheduleSubmit}>
              <div className="modal-body-scroll" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Ngày & giờ khảo sát công trình: <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="datetime-local"
                      className="admin-search-input"
                      style={{ width: '100%', boxSizing: 'border-box' }}
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Chuyên viên kỹ thuật / tư vấn phụ trách:
                    </label>
                    <input
                      type="text"
                      className="admin-search-input"
                      style={{ width: '100%', boxSizing: 'border-box' }}
                      value={assigneeName}
                      onChange={(e) => setAssigneeName(e.target.value)}
                      placeholder="Ví dụ: Trần Song Nam (0912.381.212)"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" className="btn-modal-close" onClick={() => setScheduleModal(null)}>Hủy</button>
                <button type="submit" className="admin-btn-primary" disabled={submittingSchedule}>
                  {submittingSchedule ? 'Đang lưu...' : 'Lưu lịch hẹn vào Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

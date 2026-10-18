import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Reply,
  RefreshCw,
  AlertCircle,
  Star,
  User,
  Mail,
  Phone,
  Tag,
  Filter,
  Check,
  Send
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';

export function AdminFeedbacks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal reply state
  const [replyModal, setReplyModal] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyStatus, setReplyStatus] = useState('resolved');
  const [submittingReply, setSubmittingReply] = useState(false);

  // Fetch real feedbacks from Database
  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getFeedbacks(statusFilter, categoryFilter, searchTerm);
      if (res && res.data) {
        setFeedbacks(res.data);
      } else {
        setFeedbacks([]);
      }
    } catch (err) {
      console.error('Lỗi khi tải phản hồi:', err);
      setError(err.message || 'Không thể kết nối đến cơ sở dữ liệu.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, searchTerm]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  // Open reply modal
  const handleOpenReply = (item) => {
    setReplyModal(item);
    setReplyText(item.adminResponse || '');
    setReplyStatus(item.status === 'pending' ? 'resolved' : item.status);
  };

  // Submit reply to DB
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyModal || !replyText.trim()) return;

    setSubmittingReply(true);
    try {
      await adminApi.respondFeedback(replyModal.id, replyText.trim(), replyStatus);
      setFeedbacks((prev) =>
        prev.map((f) =>
          f.id === replyModal.id
            ? {
                ...f,
                adminResponse: replyText.trim(),
                status: replyStatus,
                respondedAt: new Date().toISOString(),
                respondedBy: 'UniVeloria Support'
              }
            : f
        )
      );
      setReplyModal(null);
      setReplyText('');
    } catch (err) {
      alert('Lỗi khi gửi phản hồi: ' + err.message);
    } finally {
      setSubmittingReply(false);
    }
  };

  // Delete feedback from DB
  const handleDelete = async (id, fullName) => {
    if (window.confirm(`Bạn có chắc muốn xóa ý kiến đóng góp của khách hàng "${fullName}" khỏi Database?`)) {
      try {
        await adminApi.deleteFeedback(id);
        setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      } catch (err) {
        alert('Lỗi khi xóa phản hồi: ' + err.message);
      }
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  const pendingCount = feedbacks.filter((f) => f.status === 'pending').length;
  const inProgressCount = feedbacks.filter((f) => f.status === 'in_progress').length;
  const resolvedCount = feedbacks.filter((f) => f.status === 'resolved').length;

  return (
    <div className="admin-tab-content fade-in">
      {/* Top Welcome Bar */}
      <div className="admin-welcome-bar">
        <div>
          <h2 className="admin-page-heading">Quản Lí Ý Kiến & Phản Hồi Khách Hàng</h2>
          <p className="admin-page-sub">
            Dữ liệu thực tế từ bảng Feedbacks trong Database SQL Server ({feedbacks.length} phản hồi).
          </p>
        </div>
        <button
          type="button"
          className="admin-btn-secondary"
          onClick={fetchFeedbacks}
          disabled={loading}
          title="Làm mới từ Database"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          <span>Làm mới</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="admin-stats-grid" style={{ marginBottom: '24px' }}>
        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Tổng phản hồi</span>
            <div className="stat-icon-wrap" style={{ background: '#f8fafc', color: '#64748b' }}>
              <MessageSquare size={18} />
            </div>
          </div>
          <div className="stat-value">{feedbacks.length}</div>
          <div className="stat-card-bottom">
            <span className="stat-sub">Ý kiến ghi nhận từ website</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Chờ phản hồi</span>
            <div className="stat-icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-card-bottom">
            <span className="stat-sub">Cần chuyên viên giải đáp</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Đang xử lý</span>
            <div className="stat-icon-wrap" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <RefreshCw size={18} />
            </div>
          </div>
          <div className="stat-value">{inProgressCount}</div>
          <div className="stat-card-bottom">
            <span className="stat-sub">Đang liên hệ khách hàng</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Đã giải quyết</span>
            <div className="stat-icon-wrap" style={{ background: '#ecfdf5', color: '#059669' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="stat-value">{resolvedCount}</div>
          <div className="stat-card-bottom">
            <span className="stat-sub">Khách hàng hài lòng</span>
          </div>
        </div>
      </div>

      {error && (
        <div
          className="admin-error-banner"
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            padding: '12px 16px',
            borderRadius: '10px',
            color: '#b91c1c',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Search & Filters */}
      <div className="admin-filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <div className="admin-search-box" style={{ flex: '1', minWidth: '280px' }}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm theo tên khách hàng, số điện thoại, tiêu đề hoặc nội dung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filters */}
        <div className="admin-filter-pills">
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setStatusFilter('ALL')}
          >
            Tất cả ({feedbacks.length})
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Chờ xử lý ({feedbacks.filter(f => f.status === 'pending').length})
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'in_progress' ? 'active' : ''}`}
            onClick={() => setStatusFilter('in_progress')}
          >
            Đang xử lý
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'resolved' ? 'active' : ''}`}
            onClick={() => setStatusFilter('resolved')}
          >
            Đã giải quyết
          </button>
        </div>
      </div>

      {/* Feedbacks Table */}
      <div className="admin-card-panel">
        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th style={{ width: '220px' }}>Khách hàng</th>
                <th style={{ width: '150px' }}>Chuyên mục</th>
                <th style={{ width: '120px' }}>Mức hài lòng</th>
                <th>Tiêu đề & Nội dung phản hồi</th>
                <th style={{ width: '140px' }}>Ngày gửi</th>
                <th style={{ width: '130px' }}>Trạng thái</th>
                <th style={{ width: '110px', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>
                    <RefreshCw
                      size={24}
                      className="animate-spin"
                      style={{ margin: '0 auto 8px', display: 'block', color: '#c8a87d' }}
                    />
                    <span>Đang tải danh sách phản hồi từ Database...</span>
                  </td>
                </tr>
              ) : feedbacks.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="table-empty-cell"
                    style={{ textAlign: 'center', padding: '48px 20px', color: '#94a3b8' }}
                  >
                    <MessageSquare size={36} color="#cbd5e1" style={{ margin: '0 auto 12px', display: 'block' }} />
                    <p>Không tìm thấy ý kiến đóng góp nào phù hợp với bộ lọc.</p>
                  </td>
                </tr>
              ) : (
                feedbacks.map((item) => (
                  <tr key={item.id}>
                    {/* Customer Info */}
                    <td>
                      <div className="user-profile-cell">
                        <div className="cell-avatar" style={{ background: '#f1ede7', color: '#8a6b3e' }}>
                          {item.fullName ? item.fullName.charAt(0).toUpperCase() : 'K'}
                        </div>
                        <div>
                          <strong style={{ display: 'block', color: '#1e293b' }}>{item.fullName}</strong>
                          {item.phoneNumber && (
                            <span style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>
                              📞 {item.phoneNumber}
                            </span>
                          )}
                          {item.email && (
                            <span style={{ display: 'block', fontSize: '12px', color: '#94a3b8' }}>
                              ✉️ {item.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: '#475569'
                        }}
                      >
                        {item.category || 'Góp ý chung'}
                      </span>
                    </td>

                    {/* Rating */}
                    <td>
                      {item.rating ? (
                        <div className="table-rating-stars" style={{ display: 'flex', gap: '2px' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={13}
                              fill={i < item.rating ? '#f59e0b' : '#e2e8f0'}
                              color={i < item.rating ? '#f59e0b' : '#cbd5e1'}
                            />
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>Chưa chấm sao</span>
                      )}
                    </td>

                    {/* Title & Content */}
                    <td style={{ maxWidth: '400px' }}>
                      <strong style={{ display: 'block', color: '#1e293b', marginBottom: '4px', fontSize: '13.5px' }}>
                        {item.title}
                      </strong>
                      <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                        {item.content}
                      </p>

                      {/* Admin Response if exists */}
                      {item.adminResponse && (
                        <div
                          style={{
                            marginTop: '8px',
                            background: '#faf6f0',
                            borderLeft: '3px solid #c8a87d',
                            padding: '6px 12px',
                            borderRadius: '0 6px 6px 0',
                            fontSize: '12px'
                          }}
                        >
                          <strong style={{ color: '#8a6b3e' }}>Phản hồi từ UniVeloria: </strong>
                          <span style={{ color: '#334155' }}>{item.adminResponse}</span>
                          {item.respondedAt && (
                            <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>
                              Lúc {formatDate(item.respondedAt)}
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Date */}
                    <td>
                      <span className="table-date">{formatDate(item.createdAt)}</span>
                    </td>

                    {/* Status Pill */}
                    <td>
                      <span
                        className={`admin-status-pill ${
                          item.status === 'resolved'
                            ? 'status-completed'
                            : item.status === 'in_progress'
                            ? 'status-progress'
                            : item.status === 'closed'
                            ? 'status-locked'
                            : 'status-pending'
                        }`}
                      >
                        {item.status === 'resolved'
                          ? 'Đã giải quyết'
                          : item.status === 'in_progress'
                          ? 'Đang xử lý'
                          : item.status === 'closed'
                          ? 'Đã đóng'
                          : 'Chờ xử lý'}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td>
                      <div className="table-actions-row">
                        <button
                          type="button"
                          className="btn-table-action view"
                          title="Phản hồi khách hàng"
                          onClick={() => handleOpenReply(item)}
                        >
                          <Reply size={14} color="#3b82f6" />
                        </button>
                        <button
                          type="button"
                          className="btn-table-action delete"
                          title="Xóa phản hồi khỏi Database"
                          onClick={() => handleDelete(item.id, item.fullName)}
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

      {/* Reply Modal */}
      {replyModal && (
        <div
          className="admin-modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            className="admin-modal-card"
            style={{
              background: '#fff',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
                  Phản Hồi Ý Kiến Khách Hàng
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
                  Khách hàng: <strong>{replyModal.fullName}</strong> ({replyModal.email || replyModal.phoneNumber || 'N/A'})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setReplyModal(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {/* Original content preview */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 14px',
                marginBottom: '18px',
                fontSize: '13px'
              }}
            >
              <div style={{ fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                Tiêu đề: {replyModal.title}
              </div>
              <div style={{ color: '#475569' }}>"{replyModal.content}"</div>
            </div>

            <form onSubmit={handleSendReply}>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#334155',
                    marginBottom: '6px'
                  }}
                >
                  Nội dung phản hồi chính thức từ UniVeloria:
                </label>
                <textarea
                  rows="4"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Nhập nội dung giải đáp, tri ân hoặc hướng xử lý cho khách hàng..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13.5px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#334155',
                    marginBottom: '6px'
                  }}
                >
                  Cập nhật trạng thái sau khi phản hồi:
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="status"
                      value="resolved"
                      checked={replyStatus === 'resolved'}
                      onChange={(e) => setReplyStatus(e.target.value)}
                    />
                    <span>Đã giải quyết</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="status"
                      value="in_progress"
                      checked={replyStatus === 'in_progress'}
                      onChange={(e) => setReplyStatus(e.target.value)}
                    />
                    <span>Đang xử lý</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setReplyModal(null)}
                  className="admin-btn-secondary"
                  style={{ padding: '8px 16px' }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  style={{
                    padding: '8px 18px',
                    background: '#c8a87d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                  disabled={submittingReply}
                >
                  <Send size={14} />
                  <span>{submittingReply ? 'Đang gửi...' : 'Gửi phản hồi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

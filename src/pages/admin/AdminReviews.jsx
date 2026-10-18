import React, { useState, useEffect, useCallback } from 'react';
import {
  Star,
  Search,
  CheckCircle2,
  EyeOff,
  Trash2,
  Reply,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';

export function AdminReviews({ onNavigateTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyModal, setReplyModal] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  // Fetch real reviews from Database
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getReviews(statusFilter, null, searchTerm);
      if (res && res.data) {
        setReviews(res.data);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error('Lỗi khi tải đánh giá:', err);
      setError(err.message || 'Không thể kết nối đến cơ sở dữ liệu.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Update status handler (approved / hidden)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await adminApi.updateReviewStatus(id, newStatus);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      alert('Lỗi khi cập nhật trạng thái: ' + err.message);
    }
  };

  // Delete review
  const handleDelete = async (id, customerName) => {
    if (window.confirm(`Bạn có chắc muốn xóa đánh giá của khách hàng "${customerName}" khỏi Database?`)) {
      try {
        await adminApi.deleteReview(id);
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } catch (err) {
        alert('Lỗi khi xóa đánh giá: ' + err.message);
      }
    }
  };

  // Submit reply
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyModal || !replyText.trim()) return;

    setSubmittingReply(true);
    try {
      const res = await adminApi.replyReview(replyModal.id, replyText.trim());
      setReviews((prev) =>
        prev.map((r) =>
          r.id === replyModal.id
            ? { ...r, reply: replyText.trim(), status: 'approved' }
            : r
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
          <h2 className="admin-page-heading">Quản Lí Đánh Giá & Nhận Xét Của Khách Hàng</h2>
          <p className="admin-page-sub">
            Kiểm duyệt phản hồi thực tế từ khách hàng trong Database ({reviews.length} nhận xét).
          </p>
        </div>
        <button
          type="button"
          className="admin-btn-secondary"
          onClick={fetchReviews}
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

      {/* Category Toggle Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          type="button"
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #c8a87d',
            background: '#c8a87d',
            color: '#fff',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'default'
          }}
        >
          ⭐ Đánh giá sản phẩm ({reviews.length})
        </button>
        {onNavigateTab && (
          <button
            type="button"
            onClick={() => onNavigateTab('feedbacks')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#fff',
              color: '#64748b',
              fontWeight: '500',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            💬 Phản hồi & Góp ý khách hàng (Database)
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm theo tên khách hàng, sản phẩm, nội dung nhận xét..."
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
            Tất cả ({reviews.length})
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'approved' ? 'active' : ''}`}
            onClick={() => setStatusFilter('approved')}
          >
            Đã duyệt
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Chờ duyệt
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${statusFilter === 'hidden' ? 'active' : ''}`}
            onClick={() => setStatusFilter('hidden')}
          >
            Đã ẩn
          </button>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="admin-card-panel">
        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Sản phẩm đánh giá</th>
                <th>Số sao</th>
                <th>Nội dung cảm nhận</th>
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
                    <span>Đang tải danh sách đánh giá từ Database...</span>
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan="7" className="table-empty-cell" style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                    Không có đánh giá nào trong cơ sở dữ liệu.
                  </td>
                </tr>
              ) : (
                reviews.map((rev) => (
                  <tr key={rev.id}>
                    <td>
                      <div className="user-profile-cell">
                        <div className="cell-avatar">{rev.customerAvatar || rev.customerName?.charAt(0) || 'K'}</div>
                        <strong>{rev.customerName}</strong>
                      </div>
                    </td>
                    <td>
                      <span className="table-curtain-title">{rev.productName}</span>
                    </td>
                    <td>
                      <div className="table-rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            fill={i < rev.rating ? '#f59e0b' : '#e2e8f0'}
                            color={i < rev.rating ? '#f59e0b' : '#cbd5e1'}
                          />
                        ))}
                      </div>
                    </td>
                    <td style={{ maxWidth: '340px' }}>
                      <p className="table-comment-text">{rev.comment}</p>
                      {rev.reply && (
                        <div className="table-reply-box" style={{ marginTop: '6px', background: 'rgba(200, 168, 125, 0.1)', padding: '6px 10px', borderRadius: '6px', fontSize: '12px' }}>
                          <strong style={{ color: '#8a6b3e' }}>UniVeloria:</strong> {rev.reply}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="table-date">{formatDate(rev.createdAt)}</span>
                    </td>
                    <td>
                      <span className={`admin-status-pill ${
                        rev.status === 'approved'
                          ? 'status-completed'
                          : rev.status === 'pending'
                          ? 'status-progress'
                          : 'status-locked'
                      }`}>
                        {rev.status === 'approved' ? 'Đã duyệt' : rev.status === 'pending' ? 'Chờ duyệt' : 'Đã ẩn'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions-row">
                        <button
                          type="button"
                          className="btn-table-action view"
                          title="Phản hồi đánh giá"
                          onClick={() => {
                            setReplyModal(rev);
                            setReplyText(rev.reply || '');
                          }}
                        >
                          <Reply size={14} color="#3b82f6" />
                        </button>
                        {rev.status !== 'approved' && (
                          <button
                            type="button"
                            className="btn-table-action view"
                            title="Duyệt đánh giá"
                            onClick={() => handleUpdateStatus(rev.id, 'approved')}
                          >
                            <CheckCircle2 size={14} color="#10b981" />
                          </button>
                        )}
                        {rev.status !== 'hidden' && (
                          <button
                            type="button"
                            className="btn-table-action lock"
                            title="Ẩn đánh giá"
                            onClick={() => handleUpdateStatus(rev.id, 'hidden')}
                          >
                            <EyeOff size={14} color="#f59e0b" />
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-table-action delete"
                          title="Xóa đánh giá khỏi Database"
                          onClick={() => handleDelete(rev.id, rev.customerName)}
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
        <div className="modal-backdrop" onClick={() => setReplyModal(null)}>
          <div className="order-detail-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <div>
                <span className="modal-sub">PHẢN HỒI ĐÁNH GIÁ</span>
                <h3>{replyModal.customerName} - {replyModal.productName}</h3>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setReplyModal(null)}>✕</button>
            </div>
            <form onSubmit={handleSendReply}>
              <div className="modal-body-scroll" style={{ padding: '20px' }}>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', color: '#475569' }}>
                  <strong>Nội dung khách viết:</strong>
                  <p style={{ marginTop: '4px', fontStyle: 'italic' }}>"{replyModal.comment}"</p>
                </div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Câu trả lời từ UniVeloria:
                </label>
                <textarea
                  className="admin-search-input"
                  style={{ width: '100%', height: '110px', padding: '10px', boxSizing: 'border-box' }}
                  placeholder="Nhập lời cảm ơn hoặc giải đáp thắc mắc..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                />
              </div>
              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" className="btn-modal-close" onClick={() => setReplyModal(null)}>Hủy</button>
                <button type="submit" className="admin-btn-primary" disabled={submittingReply}>
                  {submittingReply ? 'Đang gửi...' : 'Gửi phản hồi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

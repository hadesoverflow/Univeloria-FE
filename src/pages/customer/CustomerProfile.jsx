import React from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  ShieldCheck,
  Check
} from 'lucide-react';

export function CustomerProfile({
  profileData,
  isEditingProfile,
  setIsEditingProfile,
  profileForm,
  setProfileForm,
  profileLoading,
  handleUpdateProfile
}) {
  return (
    <div className="panel-tab-view fade-in">
      {/* Panel Header */}
      <div className="panel-header-bar">
        <div>
          <h2 className="panel-title">Thông Tin Cá Nhân</h2>
          <p className="panel-subtitle">
            Thông tin liên hệ, số điện thoại và địa chỉ công trình khảo sát may đo.
          </p>
        </div>

        {!isEditingProfile ? (
          <button
            type="button"
            className="btn-primary-action"
            onClick={() => setIsEditingProfile(true)}
          >
            <Edit3 size={15} />
            <span>Chỉnh sửa hồ sơ</span>
          </button>
        ) : (
          <div className="header-edit-actions">
            <button
              type="button"
              className="btn-ghost-cancel"
              onClick={() => {
                setIsEditingProfile(false);
                setProfileForm({
                  fullName: profileData.fullName,
                  phoneNumber: profileData.phoneNumber,
                  address: profileData.address,
                });
              }}
            >
              Hủy
            </button>
            <button
              type="button"
              className="btn-primary-action"
              onClick={handleUpdateProfile}
              disabled={profileLoading}
            >
              {profileLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        )}
      </div>

      {/* Profile Form (Edit Mode) vs Info Cards Grid (Read Mode) */}
      {isEditingProfile ? (
        <form onSubmit={handleUpdateProfile} className="panel-edit-form">
          <div className="form-fields-grid">
            <div className="form-cell">
              <label>
                Họ và tên <span className="req">*</span>
              </label>
              <input
                type="text"
                value={profileForm.fullName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, fullName: e.target.value })
                }
                required
                placeholder="Ví dụ: Trịnh Song Nam"
              />
            </div>

            <div className="form-cell">
              <label>Địa chỉ email (Không thể thay đổi)</label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="disabled-input"
              />
            </div>

            <div className="form-cell">
              <label>
                Số điện thoại liên lạc <span className="req">*</span>
              </label>
              <input
                type="tel"
                value={profileForm.phoneNumber}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, phoneNumber: e.target.value })
                }
                required
                placeholder="Ví dụ: 0912 381 212"
              />
            </div>

            <div className="form-cell full-width">
              <label>
                Địa chỉ nhận hàng & giao rèm tận nơi <span className="req">*</span>
              </label>
              <textarea
                rows="2"
                value={profileForm.address}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, address: e.target.value })
                }
                required
                placeholder="Số nhà, tên đường, khu căn hộ, phường/xã, quận/huyện, tỉnh/TP"
              />
            </div>
          </div>

          <div className="form-submit-row">
            <button
              type="button"
              className="btn-ghost-cancel"
              onClick={() => {
                setIsEditingProfile(false);
                setProfileForm({
                  fullName: profileData.fullName,
                  phoneNumber: profileData.phoneNumber,
                  address: profileData.address,
                });
              }}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="btn-primary-action"
              disabled={profileLoading}
            >
              {profileLoading ? 'Đang lưu thông tin...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      ) : (
        <div className="info-cards-grid">
          <div className="info-card-item">
            <div className="info-card-icon">
              <User size={18} />
            </div>
            <div className="info-card-content">
              <span className="info-label">Họ và tên</span>
              <strong className="info-val">{profileData.fullName}</strong>
            </div>
          </div>

          <div className="info-card-item">
            <div className="info-card-icon">
              <Mail size={18} />
            </div>
            <div className="info-card-content">
              <div className="label-with-tag">
                <span className="info-label">Địa chỉ email</span>
                <span className="verified-pill">Đã xác minh</span>
              </div>
              <strong className="info-val">{profileData.email}</strong>
            </div>
          </div>

          <div className="info-card-item">
            <div className="info-card-icon">
              <Phone size={18} />
            </div>
            <div className="info-card-content">
              <span className="info-label">Số điện thoại liên lạc</span>
              <strong className="info-val">
                {profileData.phoneNumber || 'Chưa cập nhật'}
              </strong>
            </div>
          </div>

          <div className="info-card-item">
            <div className="info-card-icon">
              <MapPin size={18} />
            </div>
            <div className="info-card-content">
              <span className="info-label">Địa chỉ khảo sát may đo & giao nhận</span>
              <strong className="info-val address-val">
                {profileData.address || 'Chưa cập nhật địa chỉ công trình'}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Quality & Service Commitments Ribbon */}
      <div className="vip-perks-ribbon">
        <div className="ribbon-title-row">
          <div className="ribbon-brand-mark">
            <ShieldCheck size={16} color="#c8a87d" />
            <h4>Cam Kết Chất Lượng May Đo UniVeloria®</h4>
          </div>
          <span className="ribbon-sub">Tiêu Chuẩn 5 Sao</span>
        </div>

        <div className="perks-badge-grid">
          <div className="perk-badge-item">
            <div className="perk-bullet">
              <Check size={13} />
            </div>
            <div className="perk-text">
              <strong>Khảo sát miễn phí tận nơi</strong>
              <span>Chuyên viên mang mẫu vải dệt thực tế tư vấn tại gia</span>
            </div>
          </div>

          <div className="perk-badge-item">
            <div className="perk-bullet">
              <Check size={13} />
            </div>
            <div className="perk-text">
              <strong>Bảo hành chính hãng 5 năm</strong>
              <span>Áp dụng cho mọi bộ rèm may đo và động cơ thông minh</span>
            </div>
          </div>

          <div className="perk-badge-item">
            <div className="perk-bullet">
              <Check size={13} />
            </div>
            <div className="perk-text">
              <strong>Trợ lý 3D AI không giới hạn</strong>
              <span>Mô phỏng phối cảnh rèm vào căn hộ thực tế nhanh chóng</span>
            </div>
          </div>

          <div className="perk-badge-item">
            <div className="perk-bullet">
              <Check size={13} />
            </div>
            <div className="perk-text">
              <strong>Ưu tiên may đo & giao hàng 48 giờ</strong>
              <span>Cắt may chuẩn tỷ lệ xếp ly 2.5 khách sạn 5 sao, kèm trọn bộ phụ kiện</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function CustomerSecurity({
  passwordForm,
  setPasswordForm,
  passwordLoading,
  passwordMsg,
  handleChangePassword
}) {
  return (
    <div className="panel-tab-view fade-in">
      <div className="panel-header-bar">
        <div>
          <h2 className="panel-title">Bảo Mật & Mật Khẩu</h2>
          <p className="panel-subtitle">
            Cập nhật mật khẩu định kỳ để bảo vệ tài khoản và thông tin công trình may đo.
          </p>
        </div>
      </div>

      {passwordMsg?.text && (
        <div className={`panel-alert ${passwordMsg.type}`}>
          {passwordMsg.type === 'success' ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span>{passwordMsg.text}</span>
        </div>
      )}

      <div className="security-card-box">
        <form onSubmit={handleChangePassword} className="security-form">
          <div className="form-cell">
            <label>
              Mật khẩu hiện tại <span className="req">*</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="security-grid-2">
            <div className="form-cell">
              <label>
                Mật khẩu mới <span className="req">*</span>
              </label>
              <input
                type="password"
                placeholder="Tối thiểu 6 ký tự"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                required
              />
            </div>

            <div className="form-cell">
              <label>
                Xác nhận mật khẩu mới <span className="req">*</span>
              </label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={passwordForm.confirmNewPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmNewPassword: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="password-rules-note">
            <ShieldCheck size={16} color="#c8a87d" />
            <span>
              Mật khẩu phải có ít nhất 6 ký tự. Khuyến khích kết hợp chữ hoa, chữ thường và chữ số để đảm bảo tính an toàn.
            </span>
          </div>

          <div className="security-submit-wrap">
            <button
              type="submit"
              className="btn-primary-action"
              disabled={passwordLoading}
            >
              {passwordLoading ? 'Đang cập nhật mật khẩu...' : 'Lưu mật khẩu mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

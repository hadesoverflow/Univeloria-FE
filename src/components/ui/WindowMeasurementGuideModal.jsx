import React, { useEffect } from 'react';
import { Ruler, CheckCircle2, AlertCircle, Phone, X, ArrowRight, Sparkles } from 'lucide-react';

export function WindowMeasurementGuideModal({ isOpen, onClose, onConsult }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="measure-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="measure-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="measure-modal-header">
          <div className="measure-header-left">
            <div className="measure-icon-circle">
              <Ruler size={22} color="#c8a87d" />
            </div>
            <div>
              <h3>Cách đo cửa để đặt rèm</h3>
              <p>Quy chuẩn 5 bước đo đạc chính xác giúp rèm vừa khít và thẩm mỹ tối ưu</p>
            </div>
          </div>
          <button
            type="button"
            className="measure-modal-close"
            onClick={onClose}
            aria-label="Đóng hướng dẫn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="measure-modal-body">
          {/* Visual Diagram Illustration */}
          <div className="measure-diagram-card">
            <div className="diagram-illustration">
              <svg viewBox="0 0 420 220" className="measure-svg-guide" aria-label="Sơ đồ đo khung cửa">
                {/* Wall background */}
                <rect x="10" y="10" width="400" height="200" rx="8" fill="#f8f6f2" stroke="#e3dacd" strokeWidth="1.5" />
                
                {/* Window Frame Outer */}
                <rect x="70" y="30" width="280" height="160" rx="4" fill="#ffffff" stroke="#c8a87d" strokeWidth="2" />
                {/* Window Glass Panes */}
                <line x1="210" y1="30" x2="210" y2="190" stroke="#c8a87d" strokeWidth="1.5" />
                <rect x="80" y="40" width="120" height="140" fill="#eaf3fb" opacity="0.6" />
                <rect x="220" y="40" width="120" height="140" fill="#eaf3fb" opacity="0.6" />

                {/* Horizontal Measure Lines (Width) */}
                {/* 1. Top Width */}
                <line x1="75" y1="55" x2="345" y2="55" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="75,55 83,51 83,59" fill="#2563eb" />
                <polygon points="345,55 337,51 337,59" fill="#2563eb" />
                <rect x="175" y="46" width="70" height="18" rx="3" fill="#ffffff" stroke="#2563eb" strokeWidth="1" />
                <text x="210" y="59" textAnchor="middle" fontSize="10.5" fill="#1e40af" fontWeight="700">① Ngang trên</text>

                {/* 2. Middle Width */}
                <line x1="75" y1="110" x2="345" y2="110" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="75,110 83,106 83,114" fill="#2563eb" />
                <polygon points="345,110 337,106 337,114" fill="#2563eb" />
                <rect x="175" y="101" width="70" height="18" rx="3" fill="#ffffff" stroke="#2563eb" strokeWidth="1" />
                <text x="210" y="114" textAnchor="middle" fontSize="10.5" fill="#1e40af" fontWeight="700">② Ngang giữa</text>

                {/* 3. Bottom Width */}
                <line x1="75" y1="165" x2="345" y2="165" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="75,165 83,161 83,169" fill="#2563eb" />
                <polygon points="345,165 337,161 337,169" fill="#2563eb" />
                <rect x="175" y="156" width="70" height="18" rx="3" fill="#ffffff" stroke="#2563eb" strokeWidth="1" />
                <text x="210" y="169" textAnchor="middle" fontSize="10.5" fill="#1e40af" fontWeight="700">③ Ngang dưới</text>

                {/* Vertical Measure Line (Height) */}
                <line x1="38" y1="35" x2="38" y2="185" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="38,35 34,43 42,43" fill="#ea580c" />
                <polygon points="38,185 34,177 42,177" fill="#ea580c" />
                <rect x="12" y="100" width="52" height="18" rx="3" fill="#ffffff" stroke="#ea580c" strokeWidth="1" />
                <text x="38" y="113" textAnchor="middle" fontSize="9.5" fill="#9a3412" fontWeight="700">Chiều dọc</text>
              </svg>
            </div>
            <div className="diagram-note">
              <span className="diagram-pill width-pill">↔ Đo chiều ngang: Đo tại 3 vị trí (Trên - Giữa - Dưới)</span>
              <span className="diagram-pill height-pill">↕ Đo chiều dọc: Đo tại 3 vị trí (Trái - Giữa - Phải)</span>
            </div>
          </div>

          {/* 5 Core Steps List */}
          <div className="measure-steps-list">
            <div className="measure-step-item">
              <div className="step-num">1</div>
              <div className="step-info">
                <h4>Đo chiều ngang của cửa</h4>
                <p>
                  Dùng thước đo từ mép bên trái sang mép bên phải của cửa.
                  <br />
                  <strong>Nên đo ở ít nhất 2–3 vị trí:</strong> phía trên, giữa và phía dưới.
                </p>
              </div>
            </div>

            <div className="measure-step-item">
              <div className="step-num">2</div>
              <div className="step-info">
                <h4>Đo chiều dọc của cửa</h4>
                <p>
                  Đo từ mép trên xuống mép dưới của cửa.
                  <br />
                  <strong>Cũng nên đo ở 2–3 vị trí:</strong> bên trái, giữa và bên phải.
                </p>
              </div>
            </div>

            <div className="measure-step-item">
              <div className="step-num">3</div>
              <div className="step-info">
                <h4>Giữ thước thật thẳng</h4>
                <p>
                  Khi đo chiều ngang, <strong>giữ thước nằm ngang</strong>.
                  <br />
                  Khi đo chiều dọc, <strong>giữ thước thẳng đứng</strong> để số đo chính xác hơn.
                </p>
              </div>
            </div>

            <div className="measure-step-item">
              <div className="step-num highlight">4</div>
              <div className="step-info">
                <h4>Chọn số đo nhỏ nhất</h4>
                <p>
                  Nếu các vị trí có số đo khác nhau, <strong>hãy lấy số nhỏ nhất</strong>. Điều này giúp tránh trường hợp khung cửa bị xây lệch, xéo góc hoặc không vuông.
                </p>
              </div>
            </div>

            <div className="measure-step-item">
              <div className="step-num highlight">5</div>
              <div className="step-info">
                <h4>Trừ thêm 0,5–1 cm</h4>
                <p>
                  Sau khi lấy được số đo nhỏ nhất, <strong>trừ thêm khoảng 0,5–1 cm</strong> để rèm có khoảng hở phù hợp khi lắp đặt lọt lòng khung cửa (không bị cạ mép tường).
                </p>
              </div>
            </div>
          </div>

          {/* Practical Calculation Example */}
          <div className="measure-example-box">
            <div className="example-header">
              <Sparkles size={16} color="#c8a87d" />
              <strong>Ví dụ thực tế:</strong>
            </div>
            <div className="example-calc-row">
              <div className="calc-col">
                <span className="calc-label">Kết quả đo chiều ngang 3 điểm:</span>
                <span className="calc-data">120 cm &nbsp;|&nbsp; <strong>119,5 cm</strong> &nbsp;|&nbsp; 120,5 cm</span>
              </div>
              <div className="calc-arrow">
                <ArrowRight size={18} color="#c8a87d" />
              </div>
              <div className="calc-col target">
                <span className="calc-label">Chọn số đo nhỏ nhất:</span>
                <span className="calc-result">119,5 cm</span>
              </div>
            </div>
            <div className="calc-deduct-note">
              <span>Trừ dung sai lắp đặt (0,5–1 cm):</span>
              <strong className="calc-final-size">
                Kích thước đặt rèm hoàn thiện ≈ 118,5 – 119 cm
              </strong>
            </div>
          </div>

          {/* Technical Survey Notice */}
          <div className="measure-survey-callout">
            <AlertCircle size={18} color="#c8a87d" />
            <div>
              <strong>Bạn còn băn khoăn về quy cách lắp lọt lòng hay phủ bì?</strong>
              <p>Đội ngũ chuyên viên UniVeloria luôn sẵn sàng hỗ trợ mang mẫu vải tận nhà và đo đạc lại chính xác 100% trước khi tiến hành may xưởng.</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="measure-modal-footer">
          <button
            type="button"
            className="btn-measure-secondary"
            onClick={() => {
              if (onConsult) onConsult();
              else onClose();
            }}
          >
            <Phone size={14} />
            <span>Liên hệ tư vấn đo đạc tận nơi</span>
          </button>
          <button
            type="button"
            className="btn-measure-primary"
            onClick={onClose}
          >
            <CheckCircle2 size={16} />
            <span>Đã hiểu & Áp dụng ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
}


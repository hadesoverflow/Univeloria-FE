import React, { useState } from 'react';
import {
  ShoppingBag,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  Loader2,
  QrCode,
  CreditCard,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { customerApi } from '../../api/customerApi';

export function CustomerOrders({
  orders = [],
  ordersLoading = false,
  navigateTo,
  selectedOrder,
  setSelectedOrder
}) {
  const [localOrders, setLocalOrders] = useState(orders);
  const [payingOrder, setPayingOrder] = useState(null);
  const [payingLoading, setPayingLoading] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [paySuccessMsg, setPaySuccessMsg] = useState(null);

  // Sync localOrders when orders prop updates
  React.useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleCopy = (text, fieldName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleConfirmPayment = async () => {
    if (!payingOrder) return;
    setPayingLoading(true);
    try {
      const isPendingDeposit = !payingOrder.paymentStatus || payingOrder.paymentStatus === 'Chờ thanh toán cọc';
      const is50Tier = payingOrder.paymentTier === '50%' || payingOrder.paymentStatus?.includes('50%');
      const amountToPay = isPendingDeposit
        ? (payingOrder.deposit || Math.round(payingOrder.totalPrice * 0.5))
        : (payingOrder.totalPrice - (payingOrder.paidAmount || payingOrder.deposit)) + (payingOrder.shippingFee || 50000);

      // Confirm via PayOS endpoint if payOSOrderCode exists
      if (payingOrder.payOSOrderCode) {
        await customerApi.confirmPayOSSimulation(payingOrder.payOSOrderCode);
      } else {
        await customerApi.payOrder(payingOrder.id, {
          amount: amountToPay,
          paymentMethod: 'Thanh toán PayOS',
          transactionCode: `PAYOS-${Date.now().toString().slice(-6)}`
        });
      }

      const newStatus = isPendingDeposit
        ? (is50Tier ? 'Đã thanh toán cọc 50%' : 'Đã thanh toán 100% (Free Ship)')
        : 'Đã thanh toán 100%';

      const updated = {
        paymentStatus: newStatus,
        paidAmount: isPendingDeposit ? amountToPay : payingOrder.totalPrice,
        paymentMethod: 'Thanh toán PayOS'
      };

      setLocalOrders((prev) =>
        prev.map((o) => (o.id === payingOrder.id ? { ...o, ...updated } : o))
      );
      if (selectedOrder && selectedOrder.id === payingOrder.id) {
        setSelectedOrder((prev) => ({ ...prev, ...updated }));
      }

      setPaySuccessMsg(`Đã ghi nhận thanh toán ${amountToPay.toLocaleString('vi-VN')}₫ qua PayOS thành công cho đơn #${payingOrder.orderCode}!`);
      setTimeout(() => {
        setPaySuccessMsg(null);
        setPayingOrder(null);
      }, 2000);
    } catch (err) {
      alert('Lỗi xử lý thanh toán PayOS: ' + err.message);
    } finally {
      setPayingLoading(false);
    }
  };
  return (
    <div className="panel-tab-view fade-in">
      <div className="panel-header-bar">
        <div>
          <h2 className="panel-title">Lịch Sử May Đo & Mua Hàng</h2>
          <p className="panel-subtitle">
            Theo dõi tiến độ cắt may thủ công, đóng gói vận chuyển và phiếu bảo hành điện tử.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary-action"
          onClick={() => navigateTo('contact')}
        >
          <span>Đặt may rèm mới</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {ordersLoading ? (
        <div className="panel-loading-state">
          <Loader2 size={32} className="spin-icon" />
          <span>Đang tải lịch sử đơn may đo...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="panel-empty-state">
          <ShoppingBag size={42} color="#c8a87d" />
          <h3>Bạn chưa có đơn may đo nào</h3>
          <p>
            Lịch sử may đo và phiếu bảo hành điện tử của bạn sẽ hiển thị tại đây khi bạn đặt may rèm.
          </p>
          <button
            type="button"
            className="btn-primary-action"
            onClick={() => navigateTo('contact')}
          >
            Đặt may rèm ngay
          </button>
        </div>
      ) : (
        <div className="orders-stack">
          {orders.map((order) => {
            const code = order.orderCode || `UV-${order.id}`;
            const dateStr = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString('vi-VN')
              : '';
            const isCompleted =
              order.statusType === 'completed' || order.status?.includes('hoàn thành');

            return (
              <div key={order.id} className="compact-order-card">
                <div className="order-card-header">
                  <div className="code-and-date">
                    <span className="order-code-tag">#{code}</span>
                    {dateStr && (
                      <span className="order-date-text">
                        <Calendar size={13} />
                        {dateStr}
                      </span>
                    )}
                  </div>
                  <span
                    className={`order-status-chip ${
                      order.statusType || (isCompleted ? 'completed' : 'in_progress')
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    <span>{order.status}</span>
                  </span>
                </div>

                <div className="order-card-body">
                  <img
                    src={order.imageUrl || '/assets/category-living.jpg'}
                    alt={order.productName}
                    className="order-thumb"
                  />

                  <div className="order-details-col">
                    <h4 className="order-name">{order.productName}</h4>
                    <div className="order-specs-row">
                      <span>
                        <strong>Vị trí:</strong> {order.roomType}
                      </span>
                      <span>
                        <strong>Kích thước:</strong> {order.dimensions}
                      </span>
                      <span>
                        <strong>Chất liệu:</strong> {order.fabric}
                      </span>
                      <span>
                        <strong>Ray/Motor:</strong> {order.motorType}
                      </span>
                    </div>
                  </div>

                  <div className="order-price-col">
                    <span className="price-title">Tổng đơn hàng</span>
                    <strong className="price-amount">
                      {Number(order.totalPrice || 0).toLocaleString('vi-VN')}₫
                    </strong>

                    {/* Payment Status & Method Tag */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end', margin: '4px 0' }}>
                      {order.paymentStatus?.includes('100%') ? (
                        <span className="payment-badge-full">
                          ✓ Đã thanh toán 100% {order.shippingFee === 0 ? '• Free Ship' : ''}
                        </span>
                      ) : order.paymentStatus?.includes('50%') ? (
                        <span className="payment-badge-deposit">
                          ✓ Đã cọc 50%: {Number(order.paidAmount || order.deposit || 0).toLocaleString('vi-VN')}₫
                        </span>
                      ) : (
                        <span className="payment-badge-pending">
                          Chờ thanh toán ({order.paymentTier === '100%' ? '100% Free Ship' : 'Cọc 50%'})
                        </span>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          {order.paymentMethod || 'Thanh toán PayOS'}
                        </span>
                        {order.shippingFee === 0 ? (
                          <span style={{ fontSize: '10.5px', color: '#059669', background: '#d1fae5', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>
                            Free Ship
                          </span>
                        ) : (
                          <span style={{ fontSize: '10.5px', color: '#dc2626', background: '#fef2f2', padding: '1px 5px', borderRadius: '4px', fontWeight: 600 }}>
                            Ship +50k
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                      {(!order.paymentStatus || order.paymentStatus === 'Chờ thanh toán cọc') && (
                        <button
                          type="button"
                          className="btn-pay-now"
                          style={{ background: 'linear-gradient(135deg, #0066cc 0%, #004c99 100%)' }}
                          onClick={() => setPayingOrder(order)}
                          title="Thanh toán qua cổng PayOS"
                        >
                          <QrCode size={13} />
                          <span>Thanh toán PayOS</span>
                        </button>
                      )}

                      {order.paymentStatus?.includes('50%') && (
                        <button
                          type="button"
                          className="btn-pay-now"
                          style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
                          onClick={() => setPayingOrder(order)}
                          title="Thanh toán số tiền còn lại qua PayOS"
                        >
                          <QrCode size={13} />
                          <span>Trả nốt 50%</span>
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn-compact-detail"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={13} />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Order Details */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="order-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-sub">PHIẾU MAY ĐO & BẢO HÀNH ĐIỆN TỬ</span>
                <h3>Chi tiết đơn hàng #{selectedOrder.orderCode || selectedOrder.id}</h3>
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
                  <img
                    src={selectedOrder.imageUrl || '/assets/category-living.jpg'}
                    alt={selectedOrder.productName}
                    className="modal-img"
                  />
                  <div className="modal-status-box">
                    <span>Tiến độ may đo & giao hàng:</span>
                    <strong className="status-highlight">{selectedOrder.status}</strong>
                  </div>
                </div>

                <div className="modal-right-info">
                  <h4>{selectedOrder.productName}</h4>

                  <div className="modal-data-table">
                    <div className="data-row">
                      <span>Không gian treo rèm:</span>
                      <strong>{selectedOrder.roomType}</strong>
                    </div>
                    <div className="data-row">
                      <span>Kích thước may đo:</span>
                      <strong>{selectedOrder.dimensions}</strong>
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
                      <span>Ngày hoàn thành dự kiến:</span>
                      <strong>{selectedOrder.estimatedDelivery || ''}</strong>
                    </div>
                    <div className="data-row">
                      <span>Chuyên viên phụ trách:</span>
                      <strong>{selectedOrder.installerName || 'Đội ngũ chuyên viên UniVeloria'}</strong>
                    </div>
                  </div>

                  <div className="modal-notes-box">
                    <span>Ghi chú may đo kỹ thuật:</span>
                    <p>{selectedOrder.notes || 'May đo theo chuẩn tỷ lệ nếp rèm 2.5.'}</p>
                  </div>

                  <div className="modal-price-breakdown">
                    <div className="price-item">
                      <span>Tổng giá trị đơn:</span>
                      <strong>
                        {Number(selectedOrder.totalPrice || 0).toLocaleString('vi-VN')}₫
                      </strong>
                    </div>
                    <div className="price-item">
                      <span>Đã thanh toán:</span>
                      <strong className="paid">
                        {Number(selectedOrder.paidAmount || (selectedOrder.paymentStatus?.includes('100%') ? selectedOrder.totalPrice : (selectedOrder.paymentStatus?.includes('cọc') ? selectedOrder.deposit : 0))).toLocaleString('vi-VN')}₫
                      </strong>
                    </div>
                    <div className="price-item">
                      <span>Phương thức:</span>
                      <strong>{selectedOrder.paymentMethod || 'Chuyển khoản VietQR'}</strong>
                    </div>
                    <div className="price-item">
                      <span>Tình trạng:</span>
                      <strong style={{ color: selectedOrder.paymentStatus?.includes('100%') ? '#1d4ed8' : (selectedOrder.paymentStatus?.includes('cọc') ? '#047857' : '#b45309') }}>
                        {selectedOrder.paymentStatus || 'Chờ thanh toán cọc'}
                      </strong>
                    </div>
                  </div>

                  <div style={{ marginTop: '14px', padding: '10px 14px', background: '#fbfaf8', border: '1px solid #ebd8c3', borderRadius: '8px', fontSize: '12px', color: '#68594b', lineHeight: '1.5' }}>
                    <strong style={{ color: '#2c221e', display: 'block', marginBottom: '2px' }}>Bộ rèm hoàn thiện giao tận nơi:</strong>
                    Sản phẩm bao gồm đầy đủ phụ kiện treo (ray nhôm/móc định hình/pát gắn tường) và tài liệu/video hướng dẫn tự treo nhanh chóng tại nhà. UniVeloria là nơi may đo và bán rèm thành phẩm, không kèm phí nhân công lắp đặt.
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
                Đóng cửa sổ
              </button>
              <button
                type="button"
                className="btn-modal-contact"
                onClick={() => {
                  setSelectedOrder(null);
                  navigateTo('contact');
                }}
              >
                <span>Hỗ trợ may đo & bảo hành</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAYMENT MODAL (PAYOS) ================= */}
      {payingOrder && (
        <div className="cart-checkout-modal-backdrop" onClick={() => !payingLoading && setPayingOrder(null)}>
          <div className="cart-checkout-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="cart-checkout-modal-header">
              <div>
                <span className="cart-checkout-modal-sub" style={{ color: '#0066cc', fontWeight: 700 }}>
                  CỔNG THANH TOÁN TRỰC TUYẾN PAYOS
                </span>
                <h3>Thanh Toán Đơn #{payingOrder.orderCode}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => !payingLoading && setPayingOrder(null)}
              >
                ✕
              </button>
            </div>

            <div className="cart-checkout-modal-body" style={{ textAlign: 'center' }}>
              {paySuccessMsg ? (
                <div style={{ padding: '24px 10px', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    Ghi Nhận Thanh Toán PayOS Thành Công!
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#475569' }}>{paySuccessMsg}</p>
                </div>
              ) : (
                <>
                  <div style={{ background: '#fdfbf7', border: '1.5px solid #ebd9c2', borderRadius: '12px', padding: '16px', marginBottom: '16px', textAlign: 'left', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#64748b' }}>Mẫu rèm may đo:</span>
                      <strong style={{ color: '#0f172a' }}>{payingOrder.productName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#64748b' }}>Tiền hàng may đo:</span>
                      <span>{Number(payingOrder.totalPrice || 0).toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#64748b' }}>Phí vận chuyển:</span>
                      {payingOrder.shippingFee === 0 ? (
                        <strong style={{ color: '#059669' }}>0₫ (Được Miễn Phí Vận Chuyển)</strong>
                      ) : (
                        <strong style={{ color: '#dc2626' }}>50.000₫ (Không hỗ trợ ship khi cọc 50%)</strong>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#64748b' }}>Đã thanh toán trước:</span>
                      <span style={{ color: '#059669', fontWeight: 600 }}>{Number(payingOrder.paidAmount || 0).toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px dashed #cbd5e1', fontSize: '14.5px', fontWeight: 700, color: '#0066cc' }}>
                      <span>Số tiền thanh toán PayOS ngay:</span>
                      <span>
                        {(payingOrder.paymentStatus?.includes('50%')
                          ? Math.round(payingOrder.totalPrice - (payingOrder.paidAmount || payingOrder.deposit)) + (payingOrder.shippingFee || 50000)
                          : payingOrder.deposit || Math.round(payingOrder.totalPrice * 0.5)
                        ).toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>

                  {/* PayOS VietQR Box */}
                  <div className="vietqr-box" style={{ marginTop: 0, marginBottom: '16px' }}>
                    <img
                      src={`https://img.vietqr.io/image/MB-0908123456-compact2.png?amount=${
                        payingOrder.paymentStatus?.includes('50%')
                          ? Math.round(payingOrder.totalPrice - (payingOrder.paidAmount || payingOrder.deposit)) + (payingOrder.shippingFee || 50000)
                          : payingOrder.deposit || Math.round(payingOrder.totalPrice * 0.5)
                      }&addInfo=PAYOS%20${payingOrder.payOSOrderCode || payingOrder.orderCode}&accountName=CONG%20TY%20TNHH%20UNIVELORIA`}
                      alt="PayOS QR Chuyển khoản"
                      className="vietqr-qr-img"
                    />
                    <div className="vietqr-info-table">
                      <div className="vietqr-info-row">
                        <span style={{ color: '#64748b' }}>Cổng thanh toán:</span>
                        <strong style={{ color: '#0066cc' }}>PayOS Napas 24/7</strong>
                      </div>
                      <div className="vietqr-info-row">
                        <span style={{ color: '#64748b' }}>Ngân hàng:</span>
                        <strong>MB Bank (Quân Đội)</strong>
                      </div>
                      <div className="vietqr-info-row">
                        <span style={{ color: '#64748b' }}>Số tài khoản:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ color: '#0f172a' }}>0908 123 456</strong>
                          <button
                            type="button"
                            className="vietqr-copy-btn"
                            onClick={() => handleCopy('0908123456', 'stk')}
                          >
                            {copiedField === 'stk' ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                            <span>{copiedField === 'stk' ? 'Đã chép' : 'Sao chép'}</span>
                          </button>
                        </div>
                      </div>
                      <div className="vietqr-info-row">
                        <span style={{ color: '#64748b' }}>Chủ tài khoản:</span>
                        <strong>CONG TY TNHH UNIVELORIA</strong>
                      </div>
                      <div className="vietqr-info-row">
                        <span style={{ color: '#64748b' }}>Nội dung CK:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ color: '#8a6b3e' }}>PAYOS {payingOrder.payOSOrderCode || payingOrder.orderCode}</strong>
                          <button
                            type="button"
                            className="vietqr-copy-btn"
                            onClick={() => handleCopy(`PAYOS ${payingOrder.payOSOrderCode || payingOrder.orderCode}`, 'nd')}
                          >
                            {copiedField === 'nd' ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                            <span>{copiedField === 'nd' ? 'Đã chép' : 'Sao chép'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                    Mở ứng dụng ngân hàng bất kỳ (Vietcombank, MB, Techcombank, VPBank,...) để quét mã chuyển khoản tức thì.
                  </p>
                </>
              )}
            </div>

            <div className="cart-checkout-modal-footer">
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setPayingOrder(null)}
                disabled={payingLoading}
              >
                Đóng
              </button>
              {!paySuccessMsg && (
                <button
                  type="button"
                  className="admin-btn-primary"
                  onClick={handleConfirmPayment}
                  disabled={payingLoading}
                >
                  {payingLoading ? 'Đang ghi nhận...' : 'Tôi đã chuyển khoản thành công'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

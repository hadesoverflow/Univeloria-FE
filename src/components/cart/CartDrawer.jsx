import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Ruler,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  QrCode,
  CreditCard,
  Banknote,
  Copy,
  Check,
  Clock,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  MapPin,
  Phone,
  User
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import { customerApi } from '../../api/customerApi';

export function CartDrawer({ navigateTo }) {
  const {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    openCart,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const { user, isAuthenticated } = useAuth();

  // Checkout modal state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phoneNumber || '');
  const [customerAddress, setCustomerAddress] = useState(user?.address || '');
  const [curtainWidth, setCurtainWidth] = useState(''); // Chiều dài / Chiều ngang rèm (m)
  const [curtainHeight, setCurtainHeight] = useState(''); // Chiều cao rèm cửa (m)
  const [customerNotes, setCustomerNotes] = useState('');
  const [payOSTier, setPayOSTier] = useState('100'); // '100' (100% Free ship) | '50' (Cọc 50%, ship 50k)
  const [copiedField, setCopiedField] = useState(null);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [confirmingPayOS, setConfirmingPayOS] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);

  // PayOS Professional Features: Đếm ngược 15 phút & Auto polling nhận tiền
  const [payOSTimeLeft, setPayOSTimeLeft] = useState(15 * 60); // 15 phút (900 giây)
  const [isPayOSPolling, setIsPayOSPolling] = useState(false);
  const [isPayOSRegenerating, setIsPayOSRegenerating] = useState(false);
  const [autoPaidCelebration, setAutoPaidCelebration] = useState(false);

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 1. Đồng hồ đếm ngược 15 phút (hết hạn QR PayOS)
  useEffect(() => {
    const isPaid = orderSuccess?.paymentStatus?.includes('Đã thanh toán');
    if (!orderSuccess || isPaid || payOSTimeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setPayOSTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderSuccess, orderSuccess?.paymentStatus, payOSTimeLeft]);

  // 2. Auto-polling: Tự động kiểm tra trạng thái thanh toán từ PayOS Gateway mỗi 2.5s
  useEffect(() => {
    const isPaid = orderSuccess?.paymentStatus?.includes('Đã thanh toán');
    const isExpired = payOSTimeLeft <= 0;

    if (!orderSuccess?.payOSOrderCode || !checkoutModalOpen || isPaid || isExpired) {
      setIsPayOSPolling(false);
      return;
    }

    setIsPayOSPolling(true);
    const pollInterval = setInterval(async () => {
      try {
        const res = await customerApi.getPayOSStatus(orderSuccess.payOSOrderCode);
        const data = res?.data;
        if (data?.status === 'PAID') {
          clearInterval(pollInterval);
          setIsPayOSPolling(false);
          setAutoPaidCelebration(true);
          setOrderSuccess((prev) => ({
            ...prev,
            paymentStatus: prev.isFreeShip
              ? 'Đã thanh toán 100% (PayOS Tự Động Xác Nhận)'
              : 'Đã thanh toán cọc 50% (PayOS Tự Động Xác Nhận)'
          }));
        } else if (data?.status === 'EXPIRED' || data?.status === 'CANCELLED') {
          clearInterval(pollInterval);
          setIsPayOSPolling(false);
          setPayOSTimeLeft(0);
        }
      } catch (err) {
        console.debug('Đang kiểm tra kết quả PayOS...', err);
      }
    }, 2500);

    return () => {
      clearInterval(pollInterval);
      setIsPayOSPolling(false);
    };
  }, [orderSuccess?.payOSOrderCode, orderSuccess?.paymentStatus, checkoutModalOpen, payOSTimeLeft]);

  // Tạo lại mã QR PayOS mới khi quá hạn 15 phút
  const handleRegeneratePayOSLink = async () => {
    if (!orderSuccess?.orderId) return;
    setIsPayOSRegenerating(true);
    try {
      const res = await customerApi.createPayOSPayment({
        orderId: orderSuccess.orderId,
        tier: orderSuccess.paymentTier,
        returnUrl: window.location.origin + '/orders',
        cancelUrl: window.location.origin + '/orders'
      });
      const newData = res?.data;
      if (newData) {
        setOrderSuccess((prev) => ({
          ...prev,
          payOSOrderCode: newData.orderCode,
          amountToPayNow: newData.amount,
          qrCode: newData.qrCode,
          checkoutUrl: newData.checkoutUrl,
          accountNumber: newData.accountNumber || prev.accountNumber,
          accountName: newData.accountName || prev.accountName,
          payDescription: newData.description || prev.payDescription,
          paymentStatus: 'Chờ thanh toán cọc'
        }));
        setPayOSTimeLeft(15 * 60);
        setAutoPaidCelebration(false);
      }
    } catch (err) {
      alert('Không thể tạo lại mã QR: ' + (err.message || 'Lỗi kết nối'));
    } finally {
      setIsPayOSRegenerating(false);
    }
  };

  if (!isCartOpen && !checkoutModalOpen) return null;

  const is50Percent = payOSTier === '50';
  const shippingFee = is50Percent ? 50000 : 0;
  const payAmountNow = is50Percent ? Math.round(cartTotal * 0.5) : cartTotal;
  const remainingUponDelivery = is50Percent ? (cartTotal - payAmountNow) + shippingFee : 0;

  const handleCopy = (text, fieldName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleOpenCheckout = () => {
    setCustomerName(user?.fullName || '');
    setCustomerPhone(user?.phoneNumber || '');
    setCustomerAddress(user?.address || '');
    setCurtainWidth('');
    setCurtainHeight('');
    setCustomerNotes('');
    setPayOSTier('100'); // Mặc định khuyến khích khách chọn 100% để hưởng Free Ship
    setCopiedField(null);
    setOrderSuccess(null);
    setCheckoutError(null);
    setPayOSTimeLeft(15 * 60);
    setAutoPaidCelebration(false);
    closeCart(); // Close drawer so the modal is completely unhampered and crisp
    setCheckoutModalOpen(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutModalOpen(false);
    if (!orderSuccess) {
      openCart(); // Reopen drawer only if canceled before ordering
    }
  };

  const handleConfirmPayOSPaid = async () => {
    if (!orderSuccess?.payOSOrderCode) return;
    setConfirmingPayOS(true);
    try {
      await customerApi.confirmPayOSSimulation(orderSuccess.payOSOrderCode);
      setAutoPaidCelebration(true);
      setOrderSuccess(prev => ({
        ...prev,
        paymentStatus: prev.isFreeShip ? 'Đã thanh toán 100% (Free Ship)' : 'Đã thanh toán cọc 50%'
      }));
    } catch (err) {
      alert('Lỗi xác nhận PayOS: ' + err.message);
    } finally {
      setConfirmingPayOS(false);
    }
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setCheckoutError('Vui lòng điền đầy đủ họ tên và số điện thoại liên hệ.');
      return;
    }

    setSubmittingOrder(true);
    setCheckoutError(null);

    try {
      const productNames = cartItems.map((item) => `${item.name} (${item.quantity} bộ)`).join(', ');
      const totalEstimated = cartTotal;
      const tierStr = payOSTier === '50' ? '50%' : '100%';
      const fee = payOSTier === '50' ? 50000 : 0;
      const depositVal = payOSTier === '50' ? Math.round(cartTotal * 0.5) : cartTotal;
      const payAmountNow = payOSTier === '100' ? cartTotal : Math.round(cartTotal * 0.5);
      const remainingUponDelivery = payOSTier === '100' ? 0 : Math.round(cartTotal * 0.5) + fee;

      // Tính toán kích thước chiều dài & chiều cao
      let dimensionsStr = 'Khảo sát kích thước thực tế tận nơi';
      if (curtainWidth && curtainHeight) {
        const area = (parseFloat(curtainWidth) * parseFloat(curtainHeight)).toFixed(2);
        dimensionsStr = `Dài ${curtainWidth}m x Cao ${curtainHeight}m (~${area} m²)`;
      } else if (curtainWidth) {
        dimensionsStr = `Chiều dài/ngang ${curtainWidth}m`;
      } else if (curtainHeight) {
        dimensionsStr = `Chiều cao ${curtainHeight}m`;
      }

      const orderPayload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim(),
        productName: productNames,
        roomType: cartItems[0]?.room || 'Không gian gia đình',
        dimensions: dimensionsStr,
        fabric: cartItems.map(i => i.name).join(' + '),
        motorType: 'Động cơ thông minh Somfy Zigbee / Kéo êm thủ công',
        totalPrice: totalEstimated,
        deposit: depositVal,
        shippingFee: fee,
        paymentTier: tierStr,
        imageUrl: cartItems[0]?.image || '/assets/product-linen.jpg',
        notes: `Khách đặt qua Giỏ hàng Online. Kích thước rèm: ${dimensionsStr}. Mức thanh toán PayOS: ${tierStr} (${fee === 0 ? 'Free Ship 0₫' : 'Phí ship 50k'}). Ghi chú: ${customerNotes}`,
        paymentMethod: 'Thanh toán PayOS'
      };

      let createdOrder = null;
      try {
        const res = await customerApi.createOrder(orderPayload);
        createdOrder = res?.data || null;
      } catch (orderErr) {
        console.warn('Lỗi lưu đơn hàng:', orderErr);
      }

      // If guest and API failed, also record consultation inquiry
      if (!createdOrder) {
        try {
          await fetch('/api/Consultations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fullName: customerName,
              phoneNumber: customerPhone,
              email: user?.email || null,
              serviceType: `Đặt may đo rèm: ${productNames}`,
              preferredShowroom: 'Khảo sát đo đạc tận nơi',
              roomType: cartItems[0]?.room || 'Phòng khách',
              note: `Địa chỉ: ${customerAddress}. Chi tiết giỏ hàng: ${productNames}. Mức PayOS: ${tierStr} (Ship: ${fee === 0 ? 'Free Ship 0₫' : '50.000₫'}). ${customerNotes}`
            })
          });
        } catch (inquiryErr) {
          console.warn('Lỗi ghi nhận lịch hẹn:', inquiryErr);
        }
      }

      // Generate PayOS payment link
      let payOSResult = null;
      if (createdOrder?.id) {
        try {
          const payRes = await customerApi.createPayOSPayment({
            orderId: createdOrder.id,
            tier: tierStr,
            returnUrl: window.location.origin + '/orders',
            cancelUrl: window.location.origin + '/orders'
          });
          payOSResult = payRes?.data || null;
        } catch (payErr) {
          console.warn('Lỗi khởi tạo link PayOS:', payErr);
        }
      }

      const finalOrderCode = createdOrder?.orderCode || `UV-${Math.floor(1000 + Math.random() * 9000)}`;
      const payOSOrderCode = payOSResult?.orderCode || Date.now().toString().slice(-8);

      setPayOSTimeLeft(15 * 60);
      setAutoPaidCelebration(false);

      setOrderSuccess({
        orderId: createdOrder?.id,
        orderCode: finalOrderCode,
        payOSOrderCode: payOSOrderCode,
        customerName,
        customerPhone,
        customerAddress,
        customerNotes,
        curtainWidth,
        curtainHeight,
        dimensions: dimensionsStr,
        items: cartItems.map((item) => ({ ...item })),
        totalEstimated,
        depositAmount: depositVal,
        shippingFee: fee,
        paymentTier: tierStr,
        amountToPayNow: payAmountNow,
        remainingAmount: remainingUponDelivery,
        qrCode: payOSResult?.qrCode || `https://img.vietqr.io/image/MB-0908123456-compact2.png?amount=${payAmountNow}&addInfo=PAYOS%20${payOSOrderCode}&accountName=CONG%20TY%20TNHH%20UNIVELORIA`,
        checkoutUrl: payOSResult?.checkoutUrl,
        accountNumber: payOSResult?.accountNumber || '0908123456',
        accountName: payOSResult?.accountName || 'LUONG QUOC HA DANG',
        payDescription: payOSResult?.description || `UV${createdOrder?.id || ''} ${tierStr.replace('%', '')}`,
        isFreeShip: fee === 0,
        paymentStatus: 'Chờ thanh toán cọc'
      });

      clearCart();
    } catch (err) {
      console.error('Lỗi đặt đơn may đo:', err);
      setCheckoutError(err.message || 'Không thể gửi đơn đặt may đo. Vui lòng thử lại.');
    } finally {
      setSubmittingOrder(false);
    }
  };

  return (
    <>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div className="cart-drawer-backdrop" onClick={closeCart} />

          {/* Main Drawer */}
          <aside className="cart-drawer-container fade-in-right" aria-label="Giỏ hàng may đo">
            {/* Header */}
            <div className="cart-drawer-header">
          <div className="cart-drawer-header-left">
            <div className="cart-header-icon-wrap">
              <ShoppingBag size={20} color="#8a6b3e" />
            </div>
            <div>
              <h3 className="cart-header-title">Giỏ Hàng May Đo</h3>
              <span className="cart-header-sub">
                {cartCount > 0 ? `${cartCount} mẫu thiết kế rèm đã chọn` : 'Chưa có sản phẩm'}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="cart-drawer-close-btn"
            onClick={closeCart}
            title="Đóng giỏ hàng"
            aria-label="Đóng giỏ hàng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Consultation Banner */}
        <div className="cart-banner-perks">
          <div className="cart-perk-item">
            <Ruler size={14} color="#8a6b3e" />
            <span>Miễn phí khảo sát & đo đạc tận nơi</span>
          </div>
          <div className="cart-perk-item">
            <ShieldCheck size={14} color="#059669" />
            <span>Bảo hành chính hãng 5 năm</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-view">
              <div className="cart-empty-icon-wrap">
                <ShoppingBag size={48} strokeWidth={1.2} color="#c8a87d" />
              </div>
              <h4>Giỏ hàng của bạn đang trống</h4>
              <p>
                Khám phá bộ sưu tập rèm may đo cao cấp với đa dạng chất liệu linen, voan Nhật, rèm roman và động cơ tự động thông minh.
              </p>
              <button
                type="button"
                className="cart-btn-explore"
                onClick={() => {
                  closeCart();
                  if (navigateTo) navigateTo('products');
                }}
              >
                <span>Khám phá bộ sưu tập rèm</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  {/* Thumbnail */}
                  <div className="cart-item-thumb">
                    <img src={item.image} alt={item.name} />
                    <span className="cart-item-room-tag">{item.room}</span>
                  </div>

                  {/* Info */}
                  <div className="cart-item-details">
                    <div className="cart-item-header-row">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        title="Xóa mẫu rèm khỏi giỏ hàng"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="cart-item-meta">
                      <span className="cart-item-sku">Mã: {item.code}</span>
                      <span className="cart-item-category">{item.category}</span>
                      {item.selectedColor && (
                        <div className="cart-item-color-pill">
                          <span
                            className="cart-color-dot"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                          <span>Màu vải</span>
                        </div>
                      )}
                    </div>

                    {/* Price and Quantity Controller */}
                    <div className="cart-item-bottom-row">
                      <div className="cart-item-pricing">
                        <span className="cart-item-unit-price">
                          {Number(item.price).toLocaleString('vi-VN')}₫<small>/m²</small>
                        </span>
                        {item.oldPrice && (
                          <span className="cart-item-old-price">
                            {Number(item.oldPrice).toLocaleString('vi-VN')}₫
                          </span>
                        )}
                      </div>

                      {/* Quantity buttons */}
                      <div className="cart-qty-control">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.id, -1)}
                          title="Giảm số lượng"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="cart-qty-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.id, 1)}
                          title="Tăng số lượng"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal for line item */}
                    <div className="cart-item-subtotal-line">
                      <span>Tạm tính ({item.quantity} bộ):</span>
                      <strong>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout Area */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Price Calculations */}
            <div className="cart-summary-box">
              <div className="cart-summary-row">
                <span>Tạm tính ({cartCount} món)</span>
                <span>{cartTotal.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="cart-summary-row">
                <span>Khảo sát kích thước tại nhà</span>
                <span className="cart-free-tag">Miễn phí 100%</span>
              </div>
              <div className="cart-summary-divider" />
              <div className="cart-summary-row cart-total-row">
                <strong>Tổng thanh toán dự kiến</strong>
                <strong className="cart-total-amount">
                  {cartTotal.toLocaleString('vi-VN')}₫
                </strong>
              </div>
              <p className="cart-note-deposit">
                * Quý khách chỉ cần đặt cọc 40% sau khi chuyên viên đo đạc chính xác tại công trình.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="cart-footer-actions">
              <button
                type="button"
                className="cart-btn-checkout"
                onClick={handleOpenCheckout}
              >
                <span>Tiến hành đặt may đo</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="cart-btn-consult"
                onClick={() => {
                  closeCart();
                  if (navigateTo) navigateTo('contact');
                }}
              >
                <span>Yêu cầu chuyên viên tư vấn chi tiết</span>
              </button>

              <button
                type="button"
                className="cart-btn-clear"
                onClick={() => {
                  if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
                    clearCart();
                  }
                }}
              >
                Xóa toàn bộ giỏ hàng
              </button>
            </div>
          </div>
        )}
          </aside>
        </>
      )}

      {/* ================= CHECKOUT / CONFIRMATION MODAL ================= */}
      {checkoutModalOpen && (
        <div
          className="cart-checkout-modal-backdrop"
          onClick={handleCloseCheckout}
        >
          <div
            className="cart-checkout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-checkout-modal-header">
              <div>
                <span className="cart-checkout-modal-sub" style={{ color: orderSuccess ? '#0066cc' : '#8a6b3e' }}>
                  {orderSuccess ? 'CỔNG THANH TOÁN TRỰC TUYẾN PAYOS NAPAS 24/7' : 'ĐẶT MAY ĐO RÈM CAO CẤP'}
                </span>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', margin: '3px 0 0 0' }}>
                  {orderSuccess ? (
                    <>
                      <span>Chi Tiết Đơn Hàng & Cổng Thanh Toán</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: '6px' }}>
                        #{orderSuccess.orderCode}
                      </span>
                    </>
                  ) : (
                    `Xác Nhận Đơn May Đo (${cartItems.length} mẫu rèm)`
                  )}
                </h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={handleCloseCheckout}
                title="Đóng cửa sổ"
              >
                ✕
              </button>
            </div>

            {orderSuccess ? (
              <div
                className="cart-checkout-modal-body"
                style={{
                  padding: '24px',
                  overflowY: 'auto',
                  flex: 1,
                  background: '#f8fafc'
                }}
              >
                {/* Thanh thông báo trạng thái đơn hàng */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  marginBottom: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: orderSuccess.paymentStatus?.includes('Đã thanh toán') ? '#ecfdf5' : '#eff6ff',
                      color: orderSuccess.paymentStatus?.includes('Đã thanh toán') ? '#059669' : '#0066cc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                        Đơn May Đo #{orderSuccess.orderCode}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Khách hàng: <strong>{orderSuccess.customerName}</strong> • {orderSuccess.customerPhone}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Trạng thái thanh toán:</span>
                    <span className={orderSuccess.paymentStatus?.includes('Đã thanh toán') ? 'payment-badge-full' : 'payment-badge-pending'}>
                      {orderSuccess.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Grid 2 Cột chuẩn cổng thanh toán PayOS Gateway */}
                <div
                  className="cart-checkout-grid payos-gateway-layout"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.08fr 0.92fr',
                    gap: '20px',
                    alignItems: 'start'
                  }}
                >
                  {/* CỘT 1 (BÊN TRÁI): CHI TIẾT SẢN PHẨM MUA, KÍCH THƯỚC VÀ THÔNG TIN ĐƠN HÀNG */}
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '14px',
                      border: '1px solid #e2e8f0',
                      padding: '18px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                      textAlign: 'left'
                    }}
                  >
                    {/* Header mục sản phẩm */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '14px',
                      borderBottom: '1.5px solid #f1f5f9',
                      paddingBottom: '10px'
                    }}>
                      <ShoppingBag size={17} color="#0066cc" />
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                        MẪU RÈM & DỊCH VỤ MAY ĐO
                      </h4>
                    </div>

                    {/* Danh sách sản phẩm mua */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                      {orderSuccess.items && orderSuccess.items.length > 0 ? (
                        orderSuccess.items.map((item, idx) => (
                          <div
                            key={item.id || idx}
                            style={{
                              display: 'flex',
                              gap: '12px',
                              alignItems: 'center',
                              background: '#f8fafc',
                              padding: '10px 12px',
                              borderRadius: '10px',
                              border: '1px solid #f1f5f9'
                            }}
                          >
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300'}
                              alt={item.name}
                              style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '8px',
                                objectFit: 'cover',
                                border: '1px solid #e2e8f0',
                                flexShrink: 0
                              }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.name}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#64748b', flexWrap: 'wrap' }}>
                                <span>{item.category || 'Rèm cao cấp'}</span>
                                {item.room && <span>• {item.room}</span>}
                                {item.selectedColor && (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.selectedColor }} />
                                    Màu vải đã chọn
                                  </span>
                                )}
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '12px' }}>
                                <span style={{ color: '#475569' }}>SL: <strong>{item.quantity} bộ</strong></span>
                                <strong style={{ color: '#8a6b3e' }}>
                                  {((item.price || 0) * (item.quantity || 1)).toLocaleString('vi-VN')}₫
                                </strong>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ fontSize: '13px', color: '#475569', background: '#f8fafc', padding: '10px 12px', borderRadius: '8px' }}>
                          Mẫu rèm đặt may đo theo đơn #{orderSuccess.orderCode}
                        </div>
                      )}
                    </div>

                    {/* Khung kích thước may đo chi tiết */}
                    <div style={{
                      background: '#fdfbf7',
                      border: '1px solid #ebd9c2',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      marginBottom: '14px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#8a6b3e', fontWeight: 700, fontSize: '12px' }}>
                        <Ruler size={14} />
                        <span>KÍCH THƯỚC RÈM CỬA MAY ĐO</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '12px', textAlign: 'center' }}>
                        <div style={{ background: '#fff', padding: '8px 4px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                          <span style={{ color: '#64748b', display: 'block', fontSize: '11px', marginBottom: '2px' }}>Chiều dài / ngang</span>
                          <strong style={{ color: '#0f172a', fontSize: '13px' }}>
                            {orderSuccess.curtainWidth ? `${orderSuccess.curtainWidth}m` : 'Đo tận nơi'}
                          </strong>
                        </div>
                        <div style={{ background: '#fff', padding: '8px 4px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                          <span style={{ color: '#64748b', display: 'block', fontSize: '11px', marginBottom: '2px' }}>Chiều cao</span>
                          <strong style={{ color: '#0f172a', fontSize: '13px' }}>
                            {orderSuccess.curtainHeight ? `${orderSuccess.curtainHeight}m` : 'Đo tận nơi'}
                          </strong>
                        </div>
                        <div style={{ background: '#fff', padding: '8px 4px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                          <span style={{ color: '#64748b', display: 'block', fontSize: '11px', marginBottom: '2px' }}>Diện tích dự kiến</span>
                          <strong style={{ color: '#8a6b3e', fontSize: '13px' }}>
                            {orderSuccess.curtainWidth && orderSuccess.curtainHeight
                              ? `${(parseFloat(orderSuccess.curtainWidth) * parseFloat(orderSuccess.curtainHeight)).toFixed(2)} m²`
                              : 'Khảo sát thực tế'}
                          </strong>
                        </div>
                      </div>
                      <div style={{ marginTop: '8px', fontSize: '11.5px', color: '#64748b' }}>
                        Quy cách: <strong style={{ color: '#334155' }}>{orderSuccess.dimensions || 'Khảo sát kích thước tận nơi'}</strong>
                      </div>
                    </div>

                    {/* Thông tin người nhận & Địa chỉ */}
                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      marginBottom: '14px',
                      fontSize: '12.5px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#0066cc', fontWeight: 700, fontSize: '12px' }}>
                        <MapPin size={13} />
                        <span>ĐỊA CHỈ & THÔNG TIN LẮP ĐẶT</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ color: '#64748b' }}>Người nhận:</span>
                        <strong style={{ color: '#0f172a' }}>{orderSuccess.customerName}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ color: '#64748b' }}>Số điện thoại:</span>
                        <strong style={{ color: '#0f172a' }}>{orderSuccess.customerPhone}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ color: '#64748b' }}>Địa chỉ lắp rèm:</span>
                        <strong style={{ color: '#0f172a', textAlign: 'right', maxWidth: '65%' }}>
                          {orderSuccess.customerAddress || 'Khảo sát tận nơi tại nhà'}
                        </strong>
                      </div>
                      {orderSuccess.customerNotes && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '5px', marginTop: '5px' }}>
                          <span style={{ color: '#64748b' }}>Ghi chú:</span>
                          <span style={{ color: '#475569', fontStyle: 'italic', textAlign: 'right', maxWidth: '65%' }}>
                            {orderSuccess.customerNotes}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bảng chi phí & Giá tiền rõ ràng */}
                    <div style={{ borderTop: '1.5px solid #f1f5f9', paddingTop: '12px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: '#64748b' }}>Tổng tiền rèm:</span>
                        <strong>{orderSuccess.totalEstimated?.toLocaleString('vi-VN')}₫</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: '#64748b' }}>Phí vận chuyển:</span>
                        {orderSuccess.isFreeShip ? (
                          <strong style={{ color: '#059669' }}>0₫ (Ưu đãi Miễn Phí)</strong>
                        ) : (
                          <strong style={{ color: '#dc2626' }}>50.000₫ (Không hỗ trợ ship)</strong>
                        )}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#64748b' }}>Hình thức thanh toán:</span>
                        <span className={orderSuccess.isFreeShip ? 'payment-badge-full' : 'payment-badge-deposit'}>
                          {orderSuccess.paymentTier === '100%' ? 'Thanh toán 100% (Free Ship 0₫)' : 'Cọc 50% tiền rèm'}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1.5px solid #0066cc',
                        paddingTop: '10px',
                        marginTop: '6px'
                      }}>
                        <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '13.5px' }}>
                          SỐ TIỀN CẦN TRẢ PAYOS:
                        </span>
                        <strong style={{ fontSize: '17px', color: '#0066cc', fontWeight: 800 }}>
                          {orderSuccess.amountToPayNow?.toLocaleString('vi-VN')}₫
                        </strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px', color: '#64748b' }}>
                        <span>Còn lại thanh toán khi giao rèm:</span>
                        <strong>{orderSuccess.remainingAmount === 0 ? '0₫ (Đã tất toán toàn bộ)' : `${orderSuccess.remainingAmount?.toLocaleString('vi-VN')}₫`}</strong>
                      </div>
                    </div>
                  </div>

                  {/* CỘT 2 (BÊN PHẢI): CỔNG THANH TOÁN PAYOS / VIETQR NAPAS 24/7 */}
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '14px',
                      border: '1px solid #e2e8f0',
                      padding: '18px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
                    }}
                  >
                    {/* Header Cổng PayOS */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '14px',
                      borderBottom: '1.5px solid #f1f5f9',
                      paddingBottom: '10px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          background: '#0066cc',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '12px',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          payOS
                        </span>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                          THANH TOÁN NAPAS 24/7
                        </h4>
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Quét QR ngân hàng</span>
                    </div>

                    {orderSuccess.paymentStatus?.includes('Đã thanh toán') ? (
                      /* Thẻ xác nhận thanh toán thành công tự động */
                      <div className="payos-success-card" style={{ marginTop: '10px' }}>
                        <div style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          margin: '0 auto 12px auto',
                          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                        }}>
                          <CheckCircle2 size={32} />
                        </div>
                        <h3 style={{ margin: '0 0 6px 0', fontSize: '17px', fontWeight: 800, color: '#065f46' }}>
                          THANH TOÁN PAYOS THÀNH CÔNG!
                        </h3>
                        <p style={{ margin: '0 0 16px 0', fontSize: '12.5px', color: '#047857' }}>
                          Hệ thống đã tự động nhận diện tiền chuyển từ cổng <strong>PayOS Napas 24/7</strong>. Đơn hàng của bạn đã được xác nhận tức thời.
                        </p>

                        <div style={{
                          background: '#ffffff',
                          border: '1px solid #bbf7d0',
                          borderRadius: '10px',
                          padding: '12px 14px',
                          fontSize: '12.5px',
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Mã giao dịch PayOS:</span>
                            <strong style={{ color: '#0f172a' }}>#{orderSuccess.payOSOrderCode}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Số tiền đã thanh toán:</span>
                            <strong style={{ color: '#059669', fontSize: '14px' }}>
                              {orderSuccess.amountToPayNow?.toLocaleString('vi-VN')}₫
                            </strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Hình thức:</span>
                            <strong>{orderSuccess.paymentTier === '100%' ? 'Thanh toán 100% (Free Ship)' : 'Cọc 50%'}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                            <span style={{ color: '#64748b' }}>Tiến độ đơn rèm:</span>
                            <strong style={{ color: '#8a6b3e' }}>Chờ khảo sát / Chuẩn bị may đo</strong>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Khung hiển thị VietQR, đếm ngược 15p và auto-polling */
                      <>
                        {/* Thanh đếm ngược 15 phút & Trạng thái auto polling */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '9px 12px',
                          background: payOSTimeLeft > 180 ? '#f8fafc' : '#fef2f2',
                          border: `1px solid ${payOSTimeLeft > 180 ? '#e2e8f0' : '#fecaca'}`,
                          borderRadius: '8px',
                          marginBottom: '12px',
                          fontSize: '12px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Clock size={14} color={payOSTimeLeft > 180 ? '#0284c7' : '#dc2626'} />
                            <span style={{ color: '#475569', fontWeight: 600 }}>Mã QR hết hạn sau:</span>
                            <strong style={{
                              fontFamily: 'monospace',
                              fontSize: '13.5px',
                              color: payOSTimeLeft > 180 ? '#0369a1' : '#b91c1c'
                            }}>
                              {formatCountdown(payOSTimeLeft)}
                            </strong>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {isPayOSPolling && payOSTimeLeft > 0 ? (
                              <>
                                <span className="payos-pulse-dot" />
                                <span style={{ color: '#0284c7', fontSize: '11px', fontWeight: 600 }}>
                                  Đang tự động kiểm tra...
                                </span>
                              </>
                            ) : (
                              <span style={{ color: '#94a3b8', fontSize: '11px' }}>Napas 24/7</span>
                            )}
                          </div>
                        </div>

                        {/* Box VietQR và Bảng thông tin */}
                        <div style={{ position: 'relative' }}>
                          <div className="vietqr-box" style={{ marginTop: 0, textAlign: 'left', opacity: payOSTimeLeft <= 0 ? 0.25 : 1, transition: 'opacity 0.3s' }}>
                            <img
                              src={orderSuccess.qrCode}
                              alt="Mã QR PayOS"
                              className="vietqr-qr-img"
                              style={{ width: '135px', height: '135px' }}
                            />
                            <div className="vietqr-info-table">
                              <div className="vietqr-info-row">
                                <span style={{ color: '#64748b' }}>Ngân hàng:</span>
                                <strong>MB Bank (Quân Đội)</strong>
                              </div>
                              <div className="vietqr-info-row">
                                <span style={{ color: '#64748b' }}>Số tài khoản:</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <strong style={{ color: '#0f172a' }}>{orderSuccess.accountNumber || '0908 123 456'}</strong>
                                  <button
                                    type="button"
                                    className="vietqr-copy-btn"
                                    onClick={() => handleCopy(orderSuccess.accountNumber || '0908123456', 'stk')}
                                  >
                                    {copiedField === 'stk' ? <Check size={11} color="#059669" /> : <Copy size={11} />}
                                    <span>{copiedField === 'stk' ? 'Đã chép' : 'Chép'}</span>
                                  </button>
                                </div>
                              </div>
                              <div className="vietqr-info-row">
                                <span style={{ color: '#64748b' }}>Chủ tài khoản:</span>
                                <strong>{orderSuccess.accountName || 'LUONG QUOC HA DANG'}</strong>
                              </div>
                              <div className="vietqr-info-row">
                                <span style={{ color: '#64748b' }}>Số tiền PayOS:</span>
                                <strong style={{ color: '#0066cc', fontSize: '14px' }}>
                                  {orderSuccess.amountToPayNow?.toLocaleString('vi-VN')}₫
                                </strong>
                              </div>
                              <div className="vietqr-info-row">
                                <span style={{ color: '#64748b' }}>Nội dung:</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <strong style={{ color: '#8a6b3e', fontSize: '12px' }}>{orderSuccess.payDescription || `PAYOS ${orderSuccess.payOSOrderCode}`}</strong>
                                  <button
                                    type="button"
                                    className="vietqr-copy-btn"
                                    onClick={() => handleCopy(orderSuccess.payDescription || `PAYOS ${orderSuccess.payOSOrderCode}`, 'nd')}
                                  >
                                    {copiedField === 'nd' ? <Check size={11} color="#059669" /> : <Copy size={11} />}
                                    <span>{copiedField === 'nd' ? 'Đã chép' : 'Chép'}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Overlay khi hết hạn 15 phút */}
                          {payOSTimeLeft <= 0 && (
                            <div style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(255, 255, 255, 0.95)',
                              backdropFilter: 'blur(3px)',
                              borderRadius: '12px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '16px',
                              textAlign: 'center',
                              zIndex: 10,
                              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                            }}>
                              <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                background: '#fee2e2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '8px'
                              }}>
                                <AlertTriangle size={22} color="#dc2626" />
                              </div>
                              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, color: '#991b1b' }}>
                                Mã QR Đã Quá Hạn (15 Phút)
                              </h4>
                              <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748b', maxWidth: '300px' }}>
                                Theo chuẩn bảo mật PayOS, mã thanh toán đã tự động đóng. Vui lòng bấm bên dưới để gia hạn mã mới.
                              </p>
                              <button
                                type="button"
                                className="btn-pay-now"
                                style={{
                                  padding: '7px 14px',
                                  fontSize: '12px',
                                  background: '#8a6b3e',
                                  color: '#fff',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}
                                disabled={isPayOSRegenerating}
                                onClick={handleRegeneratePayOSLink}
                              >
                                <RefreshCw size={13} className={isPayOSRegenerating ? 'spin-animation' : ''} />
                                <span>{isPayOSRegenerating ? 'Đang tạo mã mới...' : 'Tạo lại mã thanh toán mới'}</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Nút mở cổng thanh toán PayOS hosted */}
                        {orderSuccess.checkoutUrl && orderSuccess.checkoutUrl.startsWith('http') && payOSTimeLeft > 0 && (
                          <a
                            href={orderSuccess.checkoutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              width: '100%',
                              marginTop: '10px',
                              padding: '9px 14px',
                              background: '#eff6ff',
                              color: '#0066cc',
                              border: '1px solid #bfdbfe',
                              borderRadius: '8px',
                              fontWeight: 600,
                              fontSize: '12.5px',
                              textDecoration: 'none',
                              transition: 'all 0.2s ease',
                              boxShadow: '0 1px 3px rgba(0,102,204,0.08)'
                            }}
                          >
                            <ExternalLink size={14} />
                            <span>Mở cổng thanh toán PayOS (Trang chính thức)</span>
                          </a>
                        )}

                        {/* Nút xác nhận thanh toán */}
                        {payOSTimeLeft > 0 && (
                          <button
                            type="button"
                            className="btn-pay-now"
                            style={{
                              width: '100%',
                              justifyContent: 'center',
                              marginTop: '10px',
                              padding: '10px 16px',
                              background: 'linear-gradient(135deg, #0066cc 0%, #004c99 100%)'
                            }}
                            disabled={confirmingPayOS}
                            onClick={handleConfirmPayOSPaid}
                          >
                            <CheckCircle2 size={16} />
                            <span>{confirmingPayOS ? 'Đang xác nhận...' : 'Tôi đã chuyển khoản PayOS thành công'}</span>
                          </button>
                        )}
                      </>
                    )}

                    {/* Footer bảo mật */}
                    <div style={{
                      marginTop: '14px',
                      paddingTop: '10px',
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '11px',
                      color: '#94a3b8',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      <ShieldCheck size={14} color="#10b981" />
                      <span>Bảo mật SSL 256-Bit • Tự động xác thực • Hỗ trợ mọi ngân hàng</span>
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
                  {isAuthenticated && (
                    <button
                      type="button"
                      className="admin-btn-primary"
                      onClick={() => {
                        setCheckoutModalOpen(false);
                        if (navigateTo) navigateTo('customer', 'orders');
                      }}
                    >
                      Xem đơn trong hồ sơ cá nhân
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn-modal-close"
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      if (navigateTo) navigateTo('home');
                    }}
                  >
                    Về trang chủ
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmOrder} style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1, overflow: 'hidden' }}>
                <div className="cart-checkout-modal-body">
                  {checkoutError && (
                    <div
                      style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        color: '#b91c1c',
                        marginBottom: '18px',
                        fontSize: '13.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <AlertCircle size={18} />
                      <span>{checkoutError}</span>
                    </div>
                  )}

                  <div className="cart-checkout-grid">
                    {/* ========== CỘT TRÁI: THÔNG TIN KHÁCH HÀNG & KÍCH THƯỚC RÈM ========== */}
                    <div className="checkout-col-left">
                      {/* Box 1: Thông tin người nhận */}
                      <div className="checkout-card-box">
                        <div className="checkout-card-title">
                          <span className="badge-num">1</span>
                          <span>Thông tin người nhận & Địa chỉ</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#1e293b', marginBottom: '5px' }}>
                              Họ tên người nhận: <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                              type="text"
                              style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                background: '#ffffff',
                                border: '1.5px solid #cbd5e1',
                                borderRadius: '8px',
                                padding: '9px 12px',
                                fontSize: '13.5px',
                                color: '#0f172a'
                              }}
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              placeholder="Ví dụ: Trịnh Vũ Song Nam"
                              required
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#1e293b', marginBottom: '5px' }}>
                              Số điện thoại liên hệ: <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                              type="tel"
                              style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                background: '#ffffff',
                                border: '1.5px solid #cbd5e1',
                                borderRadius: '8px',
                                padding: '9px 12px',
                                fontSize: '13.5px',
                                color: '#0f172a'
                              }}
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              placeholder="Ví dụ: 0912 381 212"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#1e293b', marginBottom: '5px' }}>
                            Địa chỉ lắp đặt / khảo sát công trình: <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <input
                            type="text"
                            style={{
                              width: '100%',
                              boxSizing: 'border-box',
                              background: '#ffffff',
                              border: '1.5px solid #cbd5e1',
                              borderRadius: '8px',
                              padding: '9px 12px',
                              fontSize: '13.5px',
                              color: '#0f172a'
                            }}
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            placeholder="Số nhà, tên đường, khu căn hộ, quận/huyện..."
                            required
                          />
                        </div>
                      </div>

                      {/* Box 2: KÍCH THƯỚC RÈM CỬA MAY ĐO (CHIỀU DÀI & CHIỀU CAO) */}
                      <div className="checkout-card-box" style={{ background: '#fdfbf7', border: '1.5px solid #ede3d5' }}>
                        <div className="checkout-card-title" style={{ color: '#8a6b3e' }}>
                          <span className="badge-num" style={{ background: '#8a6b3e' }}>2</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Ruler size={16} />
                            Kích thước rèm cửa may đo (Chiều dài & Chiều cao)
                          </span>
                        </div>

                        <p style={{ fontSize: '12px', color: '#64748b', margin: '-4px 0 10px 0', lineHeight: '1.4' }}>
                          Nhập số đo cửa để xưởng UniVeloria cắt may chuẩn xác từng milimet:
                        </p>

                        <div className="dimensions-input-row">
                          <div>
                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#1e293b', marginBottom: '5px' }}>
                              Chiều dài / Chiều ngang rèm:
                            </label>
                            <div className="dim-input-wrap">
                              <input
                                type="number"
                                step="0.05"
                                min="0.5"
                                max="20"
                                placeholder="Ví dụ: 3.2"
                                value={curtainWidth}
                                onChange={(e) => setCurtainWidth(e.target.value)}
                              />
                              <span className="dim-unit-tag">mét</span>
                            </div>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#1e293b', marginBottom: '5px' }}>
                              Chiều cao rèm cửa:
                            </label>
                            <div className="dim-input-wrap">
                              <input
                                type="number"
                                step="0.05"
                                min="0.5"
                                max="10"
                                placeholder="Ví dụ: 2.7"
                                value={curtainHeight}
                                onChange={(e) => setCurtainHeight(e.target.value)}
                              />
                              <span className="dim-unit-tag">mét</span>
                            </div>
                          </div>
                        </div>

                        {curtainWidth && curtainHeight && (
                          <div className="dimensions-live-badge" style={{ marginTop: '10px', marginBottom: 0 }}>
                            <CheckCircle2 size={15} color="#16a34a" />
                            <span>
                              Kích thước may đo: <strong>{curtainWidth}m (dài) x {curtainHeight}m (cao)</strong>
                              {' • '}Diện tích ước tính: <strong>{(parseFloat(curtainWidth) * parseFloat(curtainHeight)).toFixed(2)} m²</strong>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Box 3: Ghi chú may đo */}
                      <div className="checkout-card-box">
                        <div className="checkout-card-title">
                          <span className="badge-num">3</span>
                          <span>Ghi chú may đo & Yêu cầu riêng</span>
                        </div>
                        <textarea
                          style={{
                            width: '100%',
                            height: '62px',
                            boxSizing: 'border-box',
                            background: '#ffffff',
                            border: '1.5px solid #cbd5e1',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontSize: '13px',
                            color: '#0f172a',
                            resize: 'vertical'
                          }}
                          value={customerNotes}
                          onChange={(e) => setCustomerNotes(e.target.value)}
                          placeholder="Ví dụ: Rèm phòng khách 3.2m x 2.7m, giao cuối tuần, may xếp ly 2 lớp..."
                        />
                      </div>
                    </div>

                    {/* ========== CỘT PHẢI: MẪU RÈM & CỔNG THANH TOÁN PAYOS ========== */}
                    <div className="checkout-col-right">
                      {/* Box 4: Mẫu rèm đã chọn */}
                      <div className="checkout-card-box" style={{ background: '#faf8f5', border: '1px solid #ede3d5' }}>
                        <div className="checkout-card-title" style={{ justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <ShoppingBag size={16} color="#8a6b3e" />
                            <span>Mẫu rèm đặt may ({cartCount} món)</span>
                          </span>
                          <strong style={{ color: '#8a6b3e', fontSize: '14px' }}>
                            {Number(cartTotal).toLocaleString('vi-VN')}₫
                          </strong>
                        </div>

                        <div style={{ maxHeight: '120px', overflowY: 'auto', paddingRight: '4px' }}>
                          {cartItems.map((item) => (
                            <div
                              key={item.id || item.dbId}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '6px 0',
                                borderBottom: '1px dashed #e2e8f0'
                              }}
                            >
                              <img
                                src={item.image || '/assets/product-linen.jpg'}
                                alt={item.name}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '6px',
                                  objectFit: 'cover',
                                  border: '1px solid #e2e8f0',
                                  flexShrink: 0
                                }}
                              />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {item.name}
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>
                                  {item.room} • {item.quantity} bộ x {item.price.toLocaleString('vi-VN')}₫
                                </div>
                              </div>
                              <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>
                                {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                              </strong>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Box 5: Cổng thanh toán trực tuyến PayOS */}
                      <div className="checkout-card-box">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ background: '#0066cc', color: '#fff', padding: '2px 7px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>payOS</span>
                            Mức thanh toán trực tuyến:
                          </label>
                          <span style={{ fontSize: '11px', color: '#0066cc', fontWeight: 600 }}>Tự động 24/7</span>
                        </div>

                        <div className="payos-tiers-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          {/* Option 1: Cọc 50% */}
                          <div
                            className={`payos-tier-card ${payOSTier === '50' ? 'active' : ''}`}
                            onClick={() => setPayOSTier('50')}
                            style={{
                              padding: '10px 12px',
                              border: payOSTier === '50' ? '2px solid #8a6b3e' : '1px solid #cbd5e1',
                              borderRadius: '10px',
                              background: payOSTier === '50' ? '#fdfbf7' : '#ffffff',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>1. Đặt cọc 50%</strong>
                              <span style={{ fontSize: '10px', color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', padding: '1px 5px', borderRadius: '4px', fontWeight: 600 }}>
                                Ship +50k
                              </span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#64748b', marginBottom: '4px' }}>
                              Cọc ngay: <strong style={{ color: '#8a6b3e' }}>{Math.round(cartTotal * 0.5).toLocaleString('vi-VN')}₫</strong>
                            </div>
                            <div style={{ fontSize: '10.5px', color: '#64748b', borderTop: '1px dashed #e2e8f0', paddingTop: '4px', lineHeight: '1.3' }}>
                              Không hỗ trợ ship. Còn lại <strong style={{ color: '#0f172a' }}>{(Math.round(cartTotal * 0.5) + 50000).toLocaleString('vi-VN')}₫</strong> (gồm 50k ship) thu khi nhận rèm.
                            </div>
                          </div>

                          {/* Option 2: Thanh toán 100% (FREE SHIP) */}
                          <div
                            className={`payos-tier-card ${payOSTier === '100' ? 'active' : ''}`}
                            onClick={() => setPayOSTier('100')}
                            style={{
                              padding: '10px 12px',
                              border: payOSTier === '100' ? '2px solid #059669' : '1px solid #cbd5e1',
                              borderRadius: '10px',
                              background: payOSTier === '100' ? '#ecfdf5' : '#ffffff',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div style={{ position: 'absolute', top: '-9px', right: '8px', background: '#059669', color: '#fff', fontSize: '9.5px', fontWeight: 800, padding: '1px 7px', borderRadius: '8px', textTransform: 'uppercase', boxShadow: '0 2px 5px rgba(5,150,105,0.3)' }}>
                              🎉 Free Ship 0₫
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <strong style={{ fontSize: '12.5px', color: '#065f46' }}>2. Trả 100%</strong>
                              <span style={{ fontSize: '10px', color: '#059669', background: '#d1fae5', border: '1px solid #a7f3d0', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>
                                Miễn phí
                              </span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#047857', marginBottom: '4px' }}>
                              Trả ngay: <strong style={{ color: '#047857' }}>{Number(cartTotal).toLocaleString('vi-VN')}₫</strong>
                            </div>
                            <div style={{ fontSize: '10.5px', color: '#047857', borderTop: '1px dashed #a7f3d0', paddingTop: '4px', lineHeight: '1.3' }}>
                              Được <strong>FREE PHÍ SHIP TOÀN QUỐC</strong> (Tiết kiệm 50.000₫). Nhận rèm không trả thêm bất kỳ phí nào!
                            </div>
                          </div>
                        </div>

                        {/* Cost Breakdown Details */}
                        <div style={{ marginTop: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px', fontSize: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ color: '#64748b' }}>Tạm tính tiền hàng:</span>
                            <strong style={{ color: '#0f172a' }}>{Number(cartTotal).toLocaleString('vi-VN')}₫</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'center' }}>
                            <span style={{ color: '#64748b' }}>Phí vận chuyển:</span>
                            {payOSTier === '100' ? (
                              <strong style={{ color: '#059669' }}>
                                <span style={{ textDecoration: 'line-through', color: '#94a3b8', marginRight: '4px' }}>50.000₫</span>
                                0₫ (Free Ship PayOS)
                              </strong>
                            ) : (
                              <strong style={{ color: '#dc2626' }}>50.000₫ (Cọc 50% không hỗ trợ ship)</strong>
                            )}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #cbd5e1', paddingTop: '6px', marginTop: '4px' }}>
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>Số tiền thanh toán PayOS ngay:</span>
                            <strong style={{ fontSize: '14px', color: payOSTier === '100' ? '#059669' : '#8a6b3e' }}>
                              {(payOSTier === '100' ? cartTotal : Math.round(cartTotal * 0.5)).toLocaleString('vi-VN')}₫
                            </strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px', fontSize: '11px', color: '#64748b' }}>
                            <span>Còn lại khi nhận rèm:</span>
                            <strong>
                              {payOSTier === '100' ? '0₫ (Đã tất toán trọn gói)' : `${(Math.round(cartTotal * 0.5) + 50000).toLocaleString('vi-VN')}₫ (gồm 50k ship)`}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cart-checkout-modal-footer">
                  <button
                    type="button"
                    className="btn-modal-close"
                    onClick={handleCloseCheckout}
                  >
                    Quay lại giỏ hàng
                  </button>
                  <button
                    type="submit"
                    className="admin-btn-primary"
                    disabled={submittingOrder}
                    style={{
                      background: payOSTier === '100'
                        ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                        : 'linear-gradient(135deg, #8a6b3e 0%, #b89758 100%)',
                      padding: '11px 22px',
                      fontSize: '13.5px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <ShieldCheck size={16} />
                    <span>
                      {submittingOrder
                        ? 'Đang kết nối PayOS...'
                        : payOSTier === '100'
                        ? `Thanh toán 100% (${Number(cartTotal).toLocaleString('vi-VN')}₫ • Free Ship)`
                        : `Đặt cọc 50% (${(Math.round(cartTotal * 0.5)).toLocaleString('vi-VN')}₫)`}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default CartDrawer;

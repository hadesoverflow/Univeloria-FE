import { showroomCards, contactFaqs } from '../data/contactData';
import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { UnifiedFooter } from '../components/layout/UnifiedFooter';
import { ContactIcon } from '../components/ui/Icons';
import { ContactItem } from '../components/ui/ContactItem';
import { feedbackApi } from '../api/feedbackApi';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export function ContactPage({
  navigateTo,
  contactForm,
  setContactForm,
  contactErrors,
  setContactErrors,
  contactSubmitted,
  setContactSubmitted,
  openContactFaq,
  setOpenContactFaq,
  updateContact,
  handleContactSubmit,
}) {
  const [formMode, setFormMode] = useState('consultation'); // 'consultation' | 'feedback'
  const [feedbackForm, setFeedbackForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    title: '',
    category: 'Góp ý sản phẩm',
    rating: 5,
    content: ''
  });
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackError('');
    if (!feedbackForm.fullName.trim()) {
      setFeedbackError('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!feedbackForm.title.trim()) {
      setFeedbackError('Vui lòng nhập tiêu đề ý kiến đóng góp.');
      return;
    }
    if (!feedbackForm.content.trim()) {
      setFeedbackError('Vui lòng nhập chi tiết nội dung ý kiến đóng góp.');
      return;
    }

    setFeedbackSubmitting(true);
    try {
      await feedbackApi.submitFeedback({
        fullName: feedbackForm.fullName.trim(),
        phoneNumber: feedbackForm.phoneNumber.trim() || null,
        email: feedbackForm.email.trim() || null,
        title: feedbackForm.title.trim(),
        category: feedbackForm.category || 'Góp ý chung',
        rating: Number(feedbackForm.rating) || 5,
        content: feedbackForm.content.trim()
      });
      setFeedbackSubmitted(true);
    } catch (err) {
      setFeedbackError(err.message || 'Không thể gửi phản hồi lúc này. Vui lòng thử lại sau.');
    } finally {
      setFeedbackSubmitting(false);
    }
  };
  return (
        <div className="contact-page-view">
          {/* Hero Section */}
          <section className="contact-hero" id="top">
            <div className="contact-hero-photo" />
            <div className="contact-hero-overlay" />

            <Header currentPage="contact" navigateTo={navigateTo} themeClass="topbar-contact" />

            <div className="hero-copy">
              <div className="eyebrow">CONTACT US <span /></div>
              <h1>Liên hệ<br />với chúng tôi</h1>
              <p>UNIVELORIA luôn sẵn sàng lắng nghe và đồng hành cùng bạn trong hành trình kiến tạo không gian sống đẹp hơn.</p>
            </div>
          </section>

          {/* Contact Section: Info + Consultation Form */}
          <section className="contact-section" id="contact">
            <div className="contact-intro">
              <div className="eyebrow">THÔNG TIN LIÊN HỆ <span /></div>
              <h2>Luôn đồng hành<br />cùng bạn</h2>
              <p>Dù bạn cần tư vấn chọn rèm, thiết kế theo yêu cầu hay trải nghiệm AI 3D, đội ngũ UNIVELORIA luôn sẵn sàng hỗ trợ.</p>
              <div className="contact-list">
                <ContactItem icon="pin" title="Địa chỉ showroom">
                  <span>123 Đường Hoa Phượng, Quận 7,</span>
                  <span>TP. Hồ Chí Minh, Việt Nam</span>
                </ContactItem>
                <ContactItem icon="phone" title="Số điện thoại">
                  <a href="tel:+842812345678">+84 28 1234 5678</a>
                  <a href="tel:+84901234567">+84 90 123 4567</a>
                </ContactItem>
                <ContactItem icon="mail" title="Email">
                  <a href="mailto:hello@univeloria.vn">hello@univeloria.vn</a>
                </ContactItem>
                <ContactItem icon="clock" title="Giờ làm việc">
                  <span>Thứ 2 - Thứ 7: 8:30 - 18:00</span>
                  <span>Chủ nhật: 9:00 - 17:00</span>
                </ContactItem>
              </div>
            </div>

            <div className="form-card">
              {/* Form Mode Selector: Tư vấn may rèm vs Đóng góp ý kiến */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', borderBottom: '1px solid #e8e0d5', paddingBottom: '14px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setFormMode('consultation')}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: formMode === 'consultation' ? '#c8a87d' : '#e2e8f0',
                    background: formMode === 'consultation' ? '#c8a87d' : '#f8fafc',
                    color: formMode === 'consultation' ? '#fff' : '#64748b',
                    fontWeight: '600',
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  📋 Đăng ký tư vấn chọn rèm
                </button>
                <button
                  type="button"
                  onClick={() => setFormMode('feedback')}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: formMode === 'feedback' ? '#c8a87d' : '#e2e8f0',
                    background: formMode === 'feedback' ? '#c8a87d' : '#f8fafc',
                    color: formMode === 'feedback' ? '#fff' : '#64748b',
                    fontWeight: '600',
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  💬 Gửi ý kiến & Đóng góp phản hồi
                </button>
              </div>

              {formMode === 'consultation' ? (
                !contactSubmitted ? (
                  <>
                    <div className="eyebrow">GỬI YÊU CẦU TƯ VẤN <span /></div>
                    <h2>Để lại thông tin cho chúng tôi</h2>
                    <p className="form-intro">Chúng tôi sẽ liên hệ và tư vấn giải pháp rèm phù hợp nhất cho không gian của bạn.</p>
                    <form onSubmit={handleContactSubmit} noValidate>
                      <div className="form-grid">
                        <label>
                          Họ và tên *
                          <input
                            value={contactForm.name}
                            onChange={(e) => updateContact("name", e.target.value)}
                            placeholder="Nhập họ và tên"
                          />
                          {contactErrors.name && <small className="error">{contactErrors.name}</small>}
                        </label>
                        <label>
                          Số điện thoại *
                          <input
                            value={contactForm.phone}
                            onChange={(e) => updateContact("phone", e.target.value)}
                            placeholder="Nhập số điện thoại"
                            inputMode="tel"
                          />
                          {contactErrors.phone && <small className="error">{contactErrors.phone}</small>}
                        </label>
                        <label>
                          Email
                          <input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => updateContact("email", e.target.value)}
                            placeholder="Nhập email của bạn"
                          />
                          {contactErrors.email && <small className="error">{contactErrors.email}</small>}
                        </label>
                        <label>
                          Nhu cầu
                          <select value={contactForm.need} onChange={(e) => updateContact("need", e.target.value)}>
                            <option value="">Chọn nhu cầu tư vấn</option>
                            <option>Tư vấn chọn rèm</option>
                            <option>Đặt lịch showroom</option>
                            <option>Thiết kế rèm theo yêu cầu</option>
                            <option>Hỗ trợ AI 3D Studio</option>
                            <option>Báo giá & may đo theo kích thước</option>
                          </select>
                        </label>
                        <label>
                          Không gian sử dụng
                          <select value={contactForm.space} onChange={(e) => updateContact("space", e.target.value)}>
                            <option value="">Chọn không gian</option>
                            <option>Phòng khách</option>
                            <option>Phòng ngủ</option>
                            <option>Phòng ăn</option>
                            <option>Văn phòng</option>
                            <option>Khách sạn / dự án</option>
                            <option>Không gian ngoài trời</option>
                          </select>
                        </label>
                        <label>
                          Ngân sách dự kiến
                          <select value={contactForm.budget} onChange={(e) => updateContact("budget", e.target.value)}>
                            <option value="">Chọn khoảng ngân sách</option>
                            <option>Dưới 3 triệu</option>
                            <option>3 - 5 triệu</option>
                            <option>5 - 10 triệu</option>
                            <option>10 - 20 triệu</option>
                            <option>Trên 20 triệu</option>
                            <option>Cần tư vấn thêm</option>
                          </select>
                        </label>
                        <label className="full-width">
                          Nội dung yêu cầu
                          <textarea
                            value={contactForm.message}
                            onChange={(e) => updateContact("message", e.target.value)}
                            placeholder="Chia sẻ chi tiết nhu cầu của bạn..."
                            rows="3"
                          />
                        </label>
                      </div>
                      <label className="consent">
                        <input
                          type="checkbox"
                          checked={contactForm.consent}
                          onChange={(e) => updateContact("consent", e.target.checked)}
                        />
                        <span>Tôi đồng ý cho UNIVELORIA liên hệ để tư vấn.</span>
                      </label>
                      {contactErrors.consent && <small className="error consent-error">{contactErrors.consent}</small>}
                      <div className="form-bottom">
                        <span className="privacy-note">Thông tin của bạn được lưu vào hệ thống để hỗ trợ yêu cầu tư vấn.</span>
                        <button type="submit" className="submit-btn">
                          Gửi yêu cầu tư vấn <ContactIcon name="arrow" size={16} />
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="success-state">
                    <div className="success-icon"><ContactIcon name="check" size={28} /></div>
                    <div className="eyebrow">ĐÃ TIẾP NHẬN THÔNG TIN <span /></div>
                    <h2>Cảm ơn bạn đã liên hệ!</h2>
                    <p>Yêu cầu tư vấn của bạn đã được lưu trực tiếp vào cơ sở dữ liệu. Chuyên viên UNIVELORIA sẽ sớm liên hệ lại với bạn.</p>
                    <button
                      className="submit-btn"
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({ name: "", phone: "", email: "", need: "", space: "", budget: "", message: "", consent: false });
                        setContactErrors({});
                      }}
                    >
                      Gửi yêu cầu khác <ContactIcon name="arrow" size={16} />
                    </button>
                  </div>
                )
              ) : (
                /* FEEDBACK FORM MODE */
                !feedbackSubmitted ? (
                  <>
                    <div className="eyebrow">Ý KIẾN & GÓP Ý KHÁCH HÀNG <span /></div>
                    <h2>Đóng góp ý kiến cho UNIVELORIA</h2>
                    <p className="form-intro">
                      Mọi góp ý của quý khách là động lực quý báu để UniVeloria không ngừng hoàn thiện chất lượng vải dệt, tay nghề may đo và công nghệ AI 3D Studio.
                    </p>

                    {feedbackError && (
                      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '10px 14px', borderRadius: '8px', color: '#b91c1c', marginBottom: '16px', fontSize: '13px' }}>
                        {feedbackError}
                      </div>
                    )}

                    <form onSubmit={handleFeedbackSubmit} noValidate>
                      <div className="form-grid">
                        <label>
                          Họ và tên *
                          <input
                            value={feedbackForm.fullName}
                            onChange={(e) => setFeedbackForm({ ...feedbackForm, fullName: e.target.value })}
                            placeholder="Nhập họ và tên của bạn"
                            required
                          />
                        </label>
                        <label>
                          Số điện thoại
                          <input
                            value={feedbackForm.phoneNumber}
                            onChange={(e) => setFeedbackForm({ ...feedbackForm, phoneNumber: e.target.value })}
                            placeholder="Nhập số điện thoại (nếu muốn liên hệ lại)"
                            inputMode="tel"
                          />
                        </label>
                        <label>
                          Email
                          <input
                            type="email"
                            value={feedbackForm.email}
                            onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                            placeholder="Nhập email nhận phản hồi"
                          />
                        </label>
                        <label>
                          Chuyên mục góp ý
                          <select
                            value={feedbackForm.category}
                            onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                          >
                            <option value="Góp ý sản phẩm">Góp ý sản phẩm & mẫu vải</option>
                            <option value="Công nghệ AI 3D">Công nghệ AI 3D Studio</option>
                            <option value="Trải nghiệm dịch vụ">Trải nghiệm tư vấn & showroom</option>
                            <option value="Chính sách bảo hành">Chính sách bảo hành & may đo</option>
                            <option value="Góp ý chung">Ý kiến đóng góp khác</option>
                          </select>
                        </label>

                        {/* Rating stars */}
                        <label className="full-width">
                          Mức độ hài lòng với UniVeloria
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: '4px'
                                }}
                              >
                                <Star
                                  size={24}
                                  fill={star <= feedbackForm.rating ? '#f59e0b' : '#e2e8f0'}
                                  color={star <= feedbackForm.rating ? '#f59e0b' : '#cbd5e1'}
                                />
                              </button>
                            ))}
                            <span style={{ fontSize: '13px', color: '#64748b', marginLeft: '6px' }}>
                              ({feedbackForm.rating}/5 sao)
                            </span>
                          </div>
                        </label>

                        <label className="full-width">
                          Tiêu đề ý kiến *
                          <input
                            value={feedbackForm.title}
                            onChange={(e) => setFeedbackForm({ ...feedbackForm, title: e.target.value })}
                            placeholder="Ví dụ: Rất ưng ý chất liệu rèm voan, đề xuất thêm màu be pastel..."
                            required
                          />
                        </label>

                        <label className="full-width">
                          Nội dung đóng góp chi tiết *
                          <textarea
                            value={feedbackForm.content}
                            onChange={(e) => setFeedbackForm({ ...feedbackForm, content: e.target.value })}
                            placeholder="Chia sẻ trải nghiệm hoặc đề xuất cụ thể của bạn..."
                            rows="4"
                            required
                          />
                        </label>
                      </div>

                      <div className="form-bottom">
                        <span className="privacy-note">Ý kiến của bạn sẽ được lưu trực tiếp vào cơ sở dữ liệu và gửi đến ban quản lý UniVeloria.</span>
                        <button type="submit" className="submit-btn" disabled={feedbackSubmitting}>
                          {feedbackSubmitting ? 'Đang gửi ý kiến...' : 'Gửi ý kiến đóng góp'} <Send size={15} style={{ marginLeft: '6px' }} />
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="success-state">
                    <div className="success-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                      <CheckCircle2 size={36} />
                    </div>
                    <div className="eyebrow">ĐÃ GHI NHẬN Ý KIẾN <span /></div>
                    <h2>Trân trọng cảm ơn quý khách!</h2>
                    <p>
                      Ý kiến đóng góp của quý khách đã được lưu trực tiếp vào cơ sở dữ liệu hệ thống. Ban quản trị UniVeloria sẽ xem xét và phản hồi đến quý khách trong thời gian sớm nhất.
                    </p>
                    <button
                      className="submit-btn"
                      onClick={() => {
                        setFeedbackSubmitted(false);
                        setFeedbackForm({
                          fullName: '',
                          phoneNumber: '',
                          email: '',
                          title: '',
                          category: 'Góp ý sản phẩm',
                          rating: 5,
                          content: ''
                        });
                        setFeedbackError('');
                      }}
                    >
                      Gửi thêm ý kiến khác <ContactIcon name="arrow" size={16} />
                    </button>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Showroom & Interactive Vector Map Section */}
          <section className="showroom-section" id="showroom">
            <div className="showroom-heading">
              <div>
                <div className="eyebrow">SHOWROOM <span /></div>
                <h2>Trải nghiệm thực tế tại showroom</h2>
                <p>Trực tiếp cảm nhận chất liệu, màu sắc và các mẫu rèm cao cấp của UNIVELORIA với không gian trưng bày hiện đại và sang trọng.</p>
              </div>
            </div>
            <div className="showroom-layout">
              <div className="showroom-cards">
                {showroomCards.map((card) => (
                  <article className="showroom-card" key={card.title}>
                    <img src={card.image} alt={card.title} />
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="map-card">
                <div className="map-art">
                  <div className="map-road road-one" />
                  <div className="map-road road-two" />
                  <div className="map-road road-three" />
                  <div className="map-green green-one" />
                  <div className="map-green green-two" />
                  <div className="map-label">Showroom UNIVELORIA</div>
                  <div className="map-pin"><ContactIcon name="pin" size={24} /></div>
                  <span className="map-caption">BẢN ĐỒ MINH HỌA</span>
                </div>
                <div className="map-bottom">
                  <div className="map-pin-small"><ContactIcon name="pin" size={18} /></div>
                  <div className="map-address">
                    <strong>UNIVELORIA Showroom</strong>
                    <span>123 Đường Hoa Phượng, Quận 7, TP. Hồ Chí Minh</span>
                  </div>
                  <a
                    className="directions"
                    href="https://maps.google.com/?q=Qu%E1%BA%ADn+7+TP+H%E1%BB%93+Ch%C3%AD+Minh"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chỉ đường <ContactIcon name="arrow" size={14} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* AI 3D Studio Banner */}
          <section className="ai-banner">
            <div className="ai-photo" />
            <div className="ai-overlay" />
            <div className="ai-copy">
              <div className="eyebrow">AI 3D STUDIO <span /></div>
              <h2>Thử rèm trong chính<br />không gian của bạn</h2>
              <p>Tải ảnh căn phòng, để AI 3D giúp bạn xem trước và lựa chọn mẫu rèm phù hợp nhất một cách trực quan.</p>
              <button onClick={() => navigateTo('studio')} className="ai-btn">
                Trải nghiệm AI 3D Studio <ContactIcon name="arrow" size={16} />
              </button>
            </div>
            <div className="ai-preview">
              <div className="preview-window">
                <img src="/assets/studio-room.png" alt="Xem trước không gian có rèm" />
              </div>
              <button onClick={() => navigateTo('studio')} className="preview-arrow" aria-label="Mở AI 3D Studio">
                <ContactIcon name="arrow" size={19} />
              </button>
              <span className="preview-tag">Xem trước với AI 3D</span>
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <section className="faq-section">
            <div className="faq-heading">
              <div className="eyebrow">CÂU HỎI THƯỜNG GẶP <span /></div>
              <h2>Giải đáp nhanh<br />những thắc mắc</h2>
              <p>Chưa tìm thấy câu trả lời? Hãy gửi yêu cầu, chúng tôi sẵn sàng hỗ trợ.</p>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Liên hệ tư vấn <ContactIcon name="arrow" size={15} />
              </a>
            </div>
            <div className="faq-list">
              {contactFaqs.map((faq, i) => (
                <article className={`faq-item ${openContactFaq === i ? "open" : ""}`} key={faq.q}>
                  <button onClick={() => setOpenContactFaq(openContactFaq === i ? -1 : i)} aria-expanded={openContactFaq === i}>
                    <span>{faq.q}</span>
                    <ContactIcon name="plus" size={17} />
                  </button>
                  {openContactFaq === i && <p>{faq.a}</p>}
                </article>
              ))}
            </div>
          </section>

          <UnifiedFooter navigateTo={navigateTo} />
        </div>

  );
}

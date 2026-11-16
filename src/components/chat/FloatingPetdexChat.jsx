import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ExternalLink, Dices, User } from 'lucide-react';
import { CURTAIN_PROFILES, analyzeUserMessage } from './chatEngine';

export { CURTAIN_PROFILES, analyzeUserMessage };

export function FloatingPetdexChat({ navigateTo }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [facingLeft, setFacingLeft] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingMode, setThinkingMode] = useState(false);
  const [thinkingStageIdx, setThinkingStageIdx] = useState(0);

  // Quản lý ngữ cảnh hội thoại qua nhiều lượt chat
  const [consultationContext, setConsultationContext] = useState({
    room: null,
    style: null,
    orientation: null,
    categoryPref: null,
    lightNeed: null,
    budget: null,
    lastCurtainId: null,
    lastBotTopic: null,
    recommendedCurtainIds: [],
    dislikedProductIds: [],
    hasGreeted: false,
    askedSpace: false,
    askedPriority: false,
    askedBudget: false
  });

  const contextRef = useRef(consultationContext);
  useEffect(() => {
    contextRef.current = consultationContext;
  }, [consultationContext]);

  const thinkingStages = [
    { icon: '🔍', title: 'Đang đối chiếu nhu cầu', text: 'Đang lọc mẫu phù hợp theo không gian và yêu cầu của bạn...' },
    { icon: '✨', title: 'Hoàn thiện gợi ý', text: 'Đang chuẩn bị thông tin chi tiết và mức giá...' }
  ];

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào! Mình là trợ lý tư vấn rèm UniVeloria ☁️✨ Bạn cần tìm rèm cho phòng nào, muốn hỏi về chất liệu, hay cần tính giá theo kích thước cửa? Cứ nhắn tự nhiên với mình nhé!',
      curtain: null
    }
  ]);

  const messagesEndRef = useRef(null);
  const popupBodyRef = useRef(null);
  const timersRef = useRef([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    if (chatOpen && popupBodyRef.current) {
      popupBodyRef.current.scrollTo({
        top: popupBodyRef.current.scrollHeight,
        behavior: messages.length <= 1 ? 'auto' : 'smooth'
      });
    }
  }, [messages, chatOpen, isTyping, thinkingStageIdx]);

  // Translation offset from default bottom-right origin
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    initPosX: 0,
    initPosY: 0,
    hasMoved: false
  });

  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      initPosX: pos.x,
      initPosY: pos.y,
      hasMoved: false
    };
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const stepDx = e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragRef.current.hasMoved = true;
    }

    if (stepDx > 1.2) {
      setFacingLeft(false);
    } else if (stepDx < -1.2) {
      setFacingLeft(true);
    }

    setPos({
      x: dragRef.current.initPosX + dx,
      y: dragRef.current.initPosY + dy
    });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (!dragRef.current.hasMoved) {
      handleToggleChat();
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
  };

  const handleToggleChat = () => {
    if (!chatOpen) {
      setPos({ x: 0, y: 0 });
      setChatOpen(true);
    } else {
      setChatOpen(false);
    }
  };

  const handleSendMessage = (textOverride = null) => {
    const query = (textOverride || chatInput).trim();
    if (!query || isTyping) return;

    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];

    setMessages((prev) => [...prev, { sender: 'user', text: query, curtain: null }]);
    if (!textOverride) setChatInput('');

    const currentCtx = contextRef.current;
    const lastBotCurtain =
      currentCtx.lastCurtainId ||
      [...messages].reverse().find((m) => m.curtain)?.curtain?.id ||
      null;
    const result = analyzeUserMessage(query, currentCtx, lastBotCurtain);

    // Đồng bộ contextRef ngay để tránh race condition
    if (result.updatedContext) {
      contextRef.current = result.updatedContext;
    }

    const isCardReply =
      result.type === 'final_consultation' ||
      result.type === 'alternative_curtain' ||
      result.type === 'rod_consultation';

    const delayMs = result.delayMs || (isCardReply ? 1000 : 500);
    setIsTyping(true);
    setThinkingMode(isCardReply);
    setThinkingStageIdx(0);

    if (isCardReply) {
      const tHalf = setTimeout(() => setThinkingStageIdx(1), Math.floor(delayMs * 0.5));
      const tFinal = setTimeout(() => {
        if (result.confirmText) {
          setMessages((prev) => [
            ...prev,
            { sender: 'bot', text: result.confirmText, curtain: null },
            { sender: 'bot', text: result.finalText || result.text, curtain: result.curtain || null }
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { sender: 'bot', text: result.finalText || result.text, curtain: result.curtain || null }
          ]);
        }
        setIsTyping(false);
        setThinkingMode(false);
        if (result.updatedContext) {
          setConsultationContext(result.updatedContext);
        }
      }, delayMs);

      timersRef.current = [tHalf, tFinal];
    } else {
      const t = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: result.text, curtain: null }
        ]);
        setIsTyping(false);
        setThinkingMode(false);
        if (result.updatedContext) {
          setConsultationContext(result.updatedContext);
        }
      }, delayMs);

      timersRef.current = [t];
    }
  };

  const handleRequestAnotherCurtain = () => {
    if (isTyping) return;
    handleSendMessage('Mẫu này chưa phù hợp, cho mình xem mẫu khác nhé');
  };

  return (
    <div
      className={`floating-petdex-container ${chatOpen ? 'chat-is-open' : ''}`}
      style={
        pos.x !== 0 || pos.y !== 0 || isDragging
          ? {
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }
          : undefined
      }
    >
      {/* Mini Chat Window */}
      {chatOpen && (
        <div className="chatbot-popup-card">
          <div className="chatbot-popup-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar-circle">
                <img
                  src="/assets/ChatBot.png"
                  alt="Trợ lý AI UniVeloria"
                  className="chatbot-header-cat"
                />
                <span className="chatbot-status-dot" />
              </div>
              <div className="chatbot-header-text">
                <strong className="chatbot-header-title">Chuyên Gia Tư Vấn Không Gian Rèm</strong>
                <small className="chatbot-header-sub">UniVeloria AI · Trợ lý tư vấn</small>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-close-btn"
              onClick={() => setChatOpen(false)}
              aria-label="Đóng khung chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-popup-body" ref={popupBodyRef}>
            <div className="chatbot-messages-list">
              {messages.map((m, idx) => (
                <div key={idx} className={m.sender === 'bot' ? 'chatbot-bot-wrap' : 'chatbot-user-wrap'}>
                  {m.sender === 'bot' ? (
                    <div className="chatbot-msg-row bot">
                      <div className="chatbot-msg-avatar chatbot-msg-avatar-bot" title="Trợ lý AI UniVeloria">
                        <img src="/assets/ChatBot.png" alt="Bot" />
                      </div>
                      <div className="chatbot-msg-col">
                        <div className="chatbot-bot-msg" style={{ whiteSpace: 'pre-line' }}>
                          {typeof m.text === 'string' ? m.text.replace(/\*\*/g, '') : m.text}
                        </div>

                        {/* Render Curtain Recommendation Card if present */}
                        {m.curtain && (
                          <div className="chatbot-recommend-card">
                            <div className="chatbot-rec-media">
                              <img
                                src={m.curtain.image}
                                alt={m.curtain.name}
                                onError={(e) => { e.target.src = '/assets/curtains/curtain-single-pleat.jpg'; }}
                              />
                              <span className="chatbot-rec-badge">{m.curtain.badge}</span>
                            </div>
                            <div className="chatbot-rec-info">
                              <h4 className="chatbot-rec-title">{m.curtain.name}</h4>
                              <div className="chatbot-rec-price">{m.curtain.priceDisplay}</div>
                              <p className="chatbot-rec-story">{typeof m.curtain.story === 'string' ? m.curtain.story.replace(/\*\*/g, '') : m.curtain.story}</p>
                              <div className="chatbot-rec-actions">
                                <button
                                  type="button"
                                  className="chatbot-btn-3d"
                                  onClick={() => {
                                    setChatOpen(false);
                                    if (navigateTo) navigateTo('studio', m.curtain.studioId);
                                  }}
                                  title="Mở ngay không gian 3D của tấm rèm này"
                                >
                                  <Sparkles size={13} />
                                  <span>Xem 3D ngay</span>
                                </button>
                                <a
                                  href={`/products/${m.curtain.id}`}
                                  className="chatbot-btn-detail"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setChatOpen(false);
                                    if (navigateTo) navigateTo('product-detail', m.curtain.id);
                                  }}
                                  title={`Xem chi tiết ${m.curtain.name}`}
                                >
                                  <ExternalLink size={13} />
                                  <span>Chi tiết</span>
                                </a>
                              </div>
                              <button
                                type="button"
                                className="chatbot-btn-another"
                                onClick={() => handleRequestAnotherCurtain()}
                                disabled={isTyping}
                              >
                                <Dices size={12} />
                                <span>Xem mẫu khác phù hợp hơn</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="chatbot-msg-row user">
                      <div className="chatbot-user-msg" style={{ whiteSpace: 'pre-line' }}>
                        {typeof m.text === 'string' ? m.text.replace(/\*\*/g, '') : m.text}
                      </div>
                      <div className="chatbot-msg-avatar chatbot-msg-avatar-user" title="Bạn">
                        <User size={14} strokeWidth={2.2} />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Responsive Typing / Brief Thinking Indicator */}
              {isTyping && thinkingMode && (
                <div className="chatbot-bot-wrap">
                  <div className="chatbot-msg-row bot">
                    <div className="chatbot-msg-avatar chatbot-msg-avatar-bot" title="Trợ lý AI UniVeloria">
                      <img src="/assets/ChatBot.png" alt="Bot" />
                    </div>
                    <div className="chatbot-msg-col">
                      <div className="chatbot-thinking-box">
                        <div className="chatbot-thinking-header">
                          <div className="chatbot-thinking-spinner" />
                          <span className="chatbot-thinking-title">
                            {thinkingStages[thinkingStageIdx]?.icon} {thinkingStages[thinkingStageIdx]?.title}
                          </span>
                        </div>
                        <div className="chatbot-thinking-text">
                          {thinkingStages[thinkingStageIdx]?.text}
                        </div>
                        <div className="chatbot-thinking-progress">
                          <div
                            className="chatbot-thinking-progress-bar"
                            style={{ animationDuration: '1.1s' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isTyping && !thinkingMode && (
                <div className="chatbot-bot-wrap">
                  <div className="chatbot-msg-row bot">
                    <div className="chatbot-msg-avatar chatbot-msg-avatar-bot" title="Trợ lý AI UniVeloria">
                      <img src="/assets/ChatBot.png" alt="Bot" />
                    </div>
                    <div className="chatbot-bot-msg chatbot-typing-indicator">
                      Trợ lý AI đang trả lời...
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="chatbot-popup-footer">
            <input
              type="text"
              placeholder={isTyping ? 'Đang phản hồi...' : 'Nhắn nhu cầu hoặc đặt câu hỏi về rèm...'}
              className="chatbot-input"
              value={chatInput}
              disabled={isTyping}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button
              type="button"
              className="chatbot-send-btn"
              aria-label="Gửi tin nhắn"
              onClick={() => handleSendMessage()}
              disabled={isTyping || !chatInput.trim()}
              style={{ opacity: isTyping || !chatInput.trim() ? 0.6 : 1 }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Draggable Pet Mascot + Speech Bubble */}
      {!chatOpen && (
        <div
          className="petdex-mascot-trigger"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="petdex-speech-bubble" onClick={handleToggleChat}>
            <span className="bubble-icon">💬</span>
            <span className="bubble-text">Bạn cần tư vấn không?</span>
            <div className="bubble-tail" />
          </div>

          <div className={`petdex-avatar-wrap ${facingLeft ? 'facing-left' : ''}`}>
            <img
              src="/assets/ChatBot.png"
              alt="Trợ lý AI UniVeloria"
              className="petdex-cat-img"
              draggable={false}
            />
            <span className="petdex-online-badge" />
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

export function FloatingPetdexChat({ navigateTo }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [spriteUrl, setSpriteUrl] = useState('https://assets.petdex.dev/pets/dundun-4ce1d541faef/sprite.webp');

  // Verify external sprite URL or fall back to local bundled webp asset
  useEffect(() => {
    const img = new Image();
    img.src = 'https://assets.petdex.dev/pets/dundun-4ce1d541faef/sprite.webp';
    img.onerror = () => {
      setSpriteUrl('/assets/dundun-sprite.webp');
    };
  }, []);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào! Tôi là Trợ lý AI của UniVeloria. Bạn cần hỗ trợ gì về rèm cửa hôm nay?'
    }
  ]);

  // Animation state for Dundun:
  // Row 0, 6 frames, 1100ms: Idle
  // Row 1, 8 frames, 1060ms: Run Right
  // Row 2, 8 frames, 1060ms: Run Left
  const [animState, setAnimState] = useState({
    row: 0,
    frames: 6,
    duration: '1100ms',
    label: '墩墩 Idle animation'
  });

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

    // Directional Running Animations:
    // Row 1, 8 frames, 1060ms -> Run Right
    // Row 2, 8 frames, 1060ms -> Run Left
    if (stepDx > 1.2) {
      setAnimState((prev) => (prev.row === 1 ? prev : {
        row: 1,
        frames: 8,
        duration: '1060ms',
        label: '墩墩 Run Right animation'
      }));
    } else if (stepDx < -1.2) {
      setAnimState((prev) => (prev.row === 2 ? prev : {
        row: 2,
        frames: 8,
        duration: '1060ms',
        label: '墩墩 Run Left animation'
      }));
    }

    setPos({
      x: dragRef.current.initPosX + dx,
      y: dragRef.current.initPosY + dy
    });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    // Return to Idle when dragging ends
    setAnimState({
      row: 0,
      frames: 6,
      duration: '1100ms',
      label: '墩墩 Idle animation'
    });

    // If user clicked/tapped without dragging, toggle chat
    if (!dragRef.current.hasMoved) {
      handleToggleChat();
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setAnimState({
      row: 0,
      frames: 6,
      duration: '1100ms',
      label: '墩墩 Idle animation'
    });
  };

  const handleToggleChat = () => {
    if (!chatOpen) {
      // Snap smoothly back to bottom-right corner when opened
      setPos({ x: 0, y: 0 });
      setChatOpen(true);
    } else {
      setChatOpen(false);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `UniVeloria đã ghi nhận: "${userMsg}". Chuyên viên tư vấn rèm của chúng tôi sẽ liên hệ và giải đáp chi tiết cho bạn ngay!`
        }
      ]);
    }, 600);
  };

  return (
    <div
      className={`floating-petdex-container ${chatOpen ? 'chat-is-open' : ''}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Mini Chat Window */}
      {chatOpen && (
        <div className="chatbot-popup-card">
          <div className="chatbot-popup-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar-circle">
                <div
                  className="pet-sprite-frame chatbot-pet-mini"
                  style={{
                    '--pet-scale': 0.17,
                    width: '32px',
                    height: '32px'
                  }}
                >
                  <div
                    className="pet-sprite"
                    style={{
                      '--sprite-url': `url("${spriteUrl}")`,
                      '--sprite-row': 0,
                      '--sprite-frames': 6,
                      '--sprite-duration': '1100ms',
                      '--sprite-sheet-width': '1536px'
                    }}
                  />
                </div>
                <span className="chatbot-status-dot" />
              </div>
              <div>
                <strong className="chatbot-header-title">Trợ lý AI UniVeloria</strong>
                <small className="chatbot-header-sub">Trực tuyến 24/7 · Tư vấn rèm</small>
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

          <div className="chatbot-popup-body">
            <div className="chatbot-messages-list">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={m.sender === 'bot' ? 'chatbot-bot-msg' : 'chatbot-user-msg'}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="chatbot-quick-options">
              <button
                type="button"
                onClick={() => {
                  setChatOpen(false);
                  if (navigateTo) navigateTo('studio');
                }}
              >
                ✨ Trải nghiệm AI 3D Studio
              </button>
              <button
                type="button"
                onClick={() => {
                  setChatOpen(false);
                  if (navigateTo) navigateTo('collections');
                }}
              >
                🏛️ Xem các bộ sưu tập rèm
              </button>
              <button
                type="button"
                onClick={() => {
                  setChatOpen(false);
                  if (navigateTo) navigateTo('contact');
                }}
              >
                📞 Đặt lịch tư vấn & khảo sát đo đạc
              </button>
            </div>
          </div>

          <div className="chatbot-popup-footer">
            <input
              type="text"
              placeholder="Nhập câu hỏi của bạn..."
              className="chatbot-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button
              type="button"
              className="chatbot-send-btn"
              aria-label="Gửi tin nhắn"
              onClick={handleSendMessage}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Draggable Pet Mascot + Speech Bubble (Hidden when chat is open to make room) */}
      {!chatOpen && (
        <div
          className="petdex-mascot-trigger"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Always visible message bubble when chat is closed */}
          <div className="petdex-speech-bubble" onClick={handleToggleChat}>
            <span className="bubble-icon">💬</span>
            <span className="bubble-text">Bạn cần tư vấn không?</span>
            <div className="bubble-tail" />
          </div>

          {/* Petdex Mascot 3D/Sprite Animated (Idle, Run Right, Run Left) */}
          <div className="petdex-avatar-wrap">
            <div
              className="pet-sprite-frame"
              role="img"
              aria-label={animState.label}
              style={{
                '--pet-scale': 0.44
              }}
            >
              <div
                className="pet-sprite"
                style={{
                  '--sprite-url': `url("${spriteUrl}")`,
                  '--sprite-row': animState.row,
                  '--sprite-frames': animState.frames,
                  '--sprite-duration': animState.duration,
                  '--sprite-sheet-width': '1536px'
                }}
              />
            </div>
            <span className="petdex-online-badge" />
          </div>
        </div>
      )}
    </div>
  );
}


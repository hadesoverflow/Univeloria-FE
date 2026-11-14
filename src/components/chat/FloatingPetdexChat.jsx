import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ExternalLink, Dices } from 'lucide-react';

// =============================================================================
// HỒ SƠ 12 MẪU RÈM CHÍNH HÃNG KÈM CÂU CHUYỆN KHÔNG GIAN
// (Chỉ gồm Rèm Cầu Vòng, Rèm Cuốn, Rèm Vải - Loại trừ Thanh Rèm theo yêu cầu)
// =============================================================================
export const CURTAIN_PROFILES = [
  {
    id: 1,
    studioId: 'rainbow-brioni',
    name: 'Mẫu Rèm Cầu Vồng Brioni.E Blackout',
    category: 'Rèm cầu vồng',
    price: 1350000,
    priceDisplay: 'Từ 1.350.000đ / m²',
    image: '/product/Rèm/Rèm Cầu Vòng/Mẫu Rèm Cầu Vồng Brioni.E Blackout.png',
    badge: 'Cản sáng 94%',
    story: 'Với bề mặt vân dệt gỗ xước ngang tự nhiên Wood-grain, Brioni.E mang đến sự trầm ấm, sang trọng và khả năng cản sáng đến 94%. Tấm rèm này sinh ra để đồng điệu với nội thất gỗ, phòng khách biệt thự hoặc phòng ngủ cần chiều sâu mộc mạc và sự riêng tư yên bình.',
    keywords: ['phong khach', 'biet thu', 'go', 'van go', 'nau', 'am cung', 'sang trong', 'can sang', 'ngu', 'rieng tu', 'tram am']
  },
  {
    id: 2,
    studioId: 'rainbow-infiniti',
    name: 'Mẫu Rèm Cầu Vồng Infiniti.E Blackout',
    category: 'Rèm cầu vồng',
    price: 1550000,
    priceDisplay: 'Từ 1.550.000đ / m²',
    image: '/product/Rèm/Rèm Cầu Vòng/Mẫu Rèm Cầu Vồng Infiniti.E Blackout.png',
    badge: 'Dual-Border độc bản',
    story: 'Điểm nhấn chữ ký của Infiniti.E là đường nẹp viền sáng kép Dual-Border độc quyền chạy dọc từng nan rèm. Thiết kế này tạo nên nét vẽ kiến trúc sắc sảo, cản sáng 90%, cực kỳ phù hợp cho phòng làm việc hiện đại hoặc phòng ngủ của gia chủ yêu thích sự chỉn chu và khác biệt.',
    keywords: ['lam viec', 'van phong', 'vien sang', 'nep vien', 'hien dai', 'tinh te', 'kien truc', 'chi tiet', 'doc la', 'doc quyen']
  },
  {
    id: 3,
    studioId: 'rainbow-rivere',
    name: 'Mẫu Rèm Cầu Vồng River.E',
    category: 'Rèm cầu vồng',
    price: 1150000,
    priceDisplay: 'Từ 1.150.000đ / m²',
    image: '/product/Rèm/Rèm Cầu Vòng/Mẫu Rèm Cầu Vồng River.E.png',
    badge: '10 Sắc Thái Màu',
    story: 'Như dòng sông êm đềm mang sinh khí và sự tươi mới, River.E sở hữu bảng 10 mã màu phong phú từ pastel dịu mát đến trung tính thanh lịch. Chất vải dệt canvas bền bỉ chống bám bụi và lọc sáng dịu nhẹ, là sự lựa chọn số một cho căn hộ trẻ trung và gia đình hiện đại.',
    keywords: ['chung cu', 'tre trung', 'mau sac', 'nhieu mau', 'xanh', 'be', 'pastel', 'linh hoat', 'gia tot', 'tiet kiem', 'gia dinh']
  },
  {
    id: 4,
    studioId: 'rainbow-dragon',
    name: 'Mẫu Rèm Cầu Vồng Dragon.E Blackout',
    category: 'Rèm cầu vồng',
    price: 1450000,
    priceDisplay: 'Từ 1.450.000đ / m²',
    image: '/product/Rèm/Rèm Cầu Vòng/Mẫu Rèm Cầu Vồng Dragon.E Blackout.png',
    badge: 'Cản sáng 95%',
    story: 'Sở hữu ma trận dệt chéo melange đan khít dày dặn, Dragon.E là "người vệ sĩ" cản sáng 95% vượt trội. Nếu phòng ngủ của bạn quay về hướng tây nắng gắt hay cạnh trục đường ồn ào, Dragon.E sẽ che chắn toàn bộ ánh chói và hạ nhiệt, đem lại sự tĩnh lặng tuyệt đối cho giấc ngủ.',
    keywords: ['nang gat', 'huong tay', 'can sang 95', 'ngu ngon', 'yen tinh', 'toi gian', 'chong choi', 'mat me', 'ha nhiet', 'duong lon', 'xe co']
  },
  {
    id: 5,
    studioId: 'roller-harmony-2',
    name: 'Mẫu Rèm Cuốn Harmony 2',
    category: 'Rèm cuốn',
    price: 420000,
    priceDisplay: 'Từ 420.000đ / m²',
    image: '/product/Rèm/Rèm Cuốn/Mẫu Rèm Cuốn Harmony 2.png',
    badge: 'Gân dệt Corded Rib',
    story: 'Biểu tượng của sự gọn gàng và ổn định: Harmony 2 với chất vải dệt gân mịn corded rib chống trượt nước, hạn chế bám bụi tối đa. Rèm cuộn lên gọn ghẽ trong hộp máng, tiết kiệm diện tích tối ưu cho góc làm việc, văn phòng hoặc khung cửa sổ căn hộ nhỏ.',
    keywords: ['van phong', 'lam viec', 'gon gang', 'nho', 'dien tich nho', 'de lau chui', 'chong nuoc', 'ben bi', 'on dinh']
  },
  {
    id: 6,
    studioId: 'roller-malange-1',
    name: 'Mẫu Rèm Cuốn Malange 1',
    category: 'Rèm cuốn',
    price: 380000,
    priceDisplay: 'Từ 380.000đ / m²',
    image: '/product/Rèm/Rèm Cuốn/Mẫu Rèm Cuốn Malange 1.png',
    badge: 'Melange Bắc Âu',
    story: 'Tựa như một bức tranh tối giản phong cách Scandinavian, Malange 1 đan xen các vệt xước hoa râm đa sắc thái làm mềm đi nét cứng nhắc của những bức tường bê tông. Cản sáng 90-95% nhẹ nhàng, rèm mang lại bầu không khí thanh lịch, thư thái cho phòng khách hay căn hộ studio.',
    keywords: ['bac au', 'scandinavian', 'hoa ram', 'thanh lich', 'nhe nhang', 'nghe thuat', 'studio', 'can ho', 'xanh nhat']
  },
  {
    id: 7,
    studioId: 'roller-moon',
    name: 'Mẫu Rèm Cuốn Moon',
    category: 'Rèm cuốn',
    price: 450000,
    priceDisplay: 'Từ 450.000đ / m²',
    image: '/product/Rèm/Rèm Cuốn/Mẫu Rèm Cuốn Moon.png',
    badge: '100% Blackout Tuyệt Đối',
    story: 'Lấy cảm hứng từ sự êm đềm của ánh trăng tròn, rèm cuốn Moon là giải pháp cản sáng 100% Blackout tuyệt đối nhờ lớp bọt Foam 3 lớp. Ngay cả giữa trưa hè rực lửa, căn phòng vẫn tối dịu mát mẻ, biến góc phòng ngủ thành ốc đảo bình yên để tái tạo năng lượng.',
    keywords: ['ngu', 'phong ngu', 'blackout', '100%', 'toi hoan toan', 'mat ngu', 'em be', 'trua', 'chong nong', 'cach nhiet']
  },
  {
    id: 8,
    studioId: 'roller-silvia',
    name: 'Mẫu Rèm Cuốn Silvia',
    category: 'Rèm cuốn',
    price: 490000,
    priceDisplay: 'Từ 490.000đ / m²',
    image: '/product/Rèm/Rèm Cuốn/Mẫu Rèm Cuốn Silvia.png',
    badge: 'Jacquard Châu Âu',
    story: 'Phong thái vương giả Châu Âu với hoa văn dệt nổi Jacquard Diamond Twill tinh xảo và chuẩn chống cháy B1 an toàn. Silvia là điểm tựa khẳng định vị thế và gu thẩm mỹ quyền quý cho không gian phòng khách lớn, phòng họp VIP hay biệt thự sang trọng.',
    keywords: ['sang trong', 'quy toc', 'chau au', 'hoang gia', 'hoa van', 'jacquard', 'biet thu', 'vip', 'chong chay']
  },
  {
    id: 9,
    studioId: 'roller-sunny',
    name: 'Mẫu Rèm Cuốn Sunny',
    category: 'Rèm cuốn',
    price: 390000,
    priceDisplay: 'Từ 390.000đ / m²',
    image: '/product/Rèm/Rèm Cuốn/Mẫu Rèm Cuốn Sunny.png',
    badge: 'Lọc Sáng Tự Nhiên',
    story: 'Nếu phòng khách hoặc góc đọc sách của bạn có ban công hướng ra sân vườn hay thành phố, Sunny sẽ giúp bạn đón trọn ánh nắng ban mai mà không hề chói gắt. Mắt lưới Micro Sunscreen lọc sáng dịu mát, cản 95% tia UV nhưng vẫn giữ trọn tầm nhìn mở khoáng đạt.',
    keywords: ['loc sang', 'ngam canh', 'ban cong', 'thoang daang', 'view', 'nhin ra ngoai', 'nang som', 'doc sach', 'thien nhien']
  },
  {
    id: 10,
    studioId: 'elogi-1198-2',
    name: 'Mẫu rèm vải Elogi - 1198 - 2',
    category: 'Rèm vải',
    price: 680000,
    priceDisplay: 'Từ 680.000đ / m²',
    image: '/product/Rèm/Rèm Vải/Mẫu rèm vải Elogi - 1198 - 2.png',
    badge: 'Chuẩn Khách Sạn 5 Sao',
    story: 'Chuẩn mực khách sạn 5 sao cho những khung cửa kính rộng lớn: Elogi 1198 sở hữu nếp gấp sóng rèm bồng bềnh lượn sóng đều đặn từ trần xuống sàn. Sợi gấm dệt thô cao cấp phong cách Nhật Bản cản sáng 95%, tôn vinh vẻ trang nhã, bề thế cho phòng khách biệt thự.',
    keywords: ['rem vai', 'cua lon', 'phong khach', 'khach san', '5 sao', 'song rem', 'nhat ban', 'be the', 'trang nha', 'sang trong']
  },
  {
    id: 11,
    studioId: 'elogi-1206-1',
    name: 'Mẫu rèm vải Elogi - 1206 - 1',
    category: 'Rèm vải',
    price: 600000,
    priceDisplay: 'Từ 600.000đ / m²',
    image: '/product/Rèm/Rèm Vải/Mẫu rèm vải Elogi - 1206 - 1.png',
    badge: 'Sợi Lanh Êm Mịn',
    story: 'Cảm giác ấm cúng, vỗ về ngay từ cái chạm tay đầu tiên nhờ sự pha trộn sợi lanh tự nhiên mềm rũ như nhung cùng tone đất nung mộc mạc. Elogi 1206 giảm tiếng ồn đường phố và cản nhiệt nhẹ nhàng, lý tưởng cho phòng ngủ vợ chồng hoặc không gian nghỉ dưỡng cần thư giãn.',
    keywords: ['am cung', 'dat nung', 'nau be', 'lanh', 'em ai', 'cach am', 'nghi duong', 'vo chong', 'thu gian', 'phong ngu']
  },
  {
    id: 12,
    studioId: 'elogi-1230-1',
    name: 'Mẫu rèm vải Elogi - 1230 - 1',
    category: 'Rèm vải',
    price: 580000,
    priceDisplay: 'Từ 580.000đ / m²',
    image: '/product/Rèm/Rèm Vải/Mẫu rèm vải Elogi - 1230 - 1.png',
    badge: 'Japandi Eco-Friendly',
    story: 'Dành cho tâm hồn yêu thiên nhiên và phong cách sống mộc mạc Japandi: Elogi 1230 dệt từ sợi Eco-friendly an toàn với các đường gân nổi mộc mạc. Tone cát vàng kem dịu mắt xua tan mọi căng thẳng âu lo, kết nối bạn với thiên nhiên thanh bình trong từng khoảnh khắc.',
    keywords: ['japandi', 'eco', 'song xanh', 'an toan', 'thien nhien', 'moc mac', 'gan noi', 'vang kem', 'thanh binh', 'thu thai']
  }
];

function normalizeText(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ');
}

function getAiCurtainRecommendation(userInput, currentCurtainId = null) {
  const norm = normalizeText(userInput);

  // 1. Check if user explicitly asked for random or another model
  const isExplicitRandom = norm.includes('random') || 
                           norm.includes('ngau nhien') || 
                           norm.includes('bat ky') || 
                           norm.includes('tuy y') || 
                           norm.includes('chon dai') ||
                           norm.includes('khac') ||
                           norm.includes('mau khac');

  if (isExplicitRandom) {
    const candidates = currentCurtainId 
      ? CURTAIN_PROFILES.filter(c => c.studioId !== currentCurtainId)
      : CURTAIN_PROFILES;
    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    return {
      curtain: picked,
      intro: `Một gợi ý ngẫu nhiên đầy thú vị dành cho bạn! Dưới đây là mẫu rèm đặc sắc mà UniVeloria nghĩ bạn sẽ thích:`
    };
  }

  // 2. Score candidates based on matching keywords
  const scored = CURTAIN_PROFILES.map(item => {
    let score = 0;
    // Category hints
    if (norm.includes('cau vong') || norm.includes('zebra')) {
      if (item.category === 'Rèm cầu vồng') score += 10;
      else score -= 10;
    }
    if (norm.includes('cuon') || norm.includes('roller')) {
      if (item.category === 'Rèm cuốn') score += 10;
      else score -= 10;
    }
    if (norm.includes('rem vai') || norm.includes('vai')) {
      if (item.category === 'Rèm vải') score += 10;
      else score -= 10;
    }

    // Specific keyword matching
    item.keywords.forEach(kw => {
      const normKw = normalizeText(kw);
      if (norm.includes(normKw)) {
        score += 3;
      }
    });

    return { item, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  const highestScore = scored[0].score;
  let chosen;
  if (highestScore > 0) {
    // If multiple items share top score (or within 2 points), randomly pick one among top candidates
    const topCandidates = scored.filter(s => s.score >= highestScore - 2).map(s => s.item);
    chosen = topCandidates[Math.floor(Math.random() * topCandidates.length)];
  } else {
    // General story / no specific keywords -> Randomly pick one among all 12 curtains
    chosen = CURTAIN_PROFILES[Math.floor(Math.random() * CURTAIN_PROFILES.length)];
  }

  const intros = [
    `Lắng nghe câu chuyện của bạn, UniVeloria nhận thấy không gian này sẽ tỏa sáng nhất khi kết hợp cùng:`,
    `Để mang lại sự hài hòa tối ưu cho căn phòng như bạn vừa chia sẻ, mình xin gợi ý mẫu rèm chuẩn chỉ này:`,
    `Một câu chuyện căn phòng rất ấm áp! Mình tìm thấy mẫu rèm hoàn hảo sinh ra để giải quyết đúng nhu cầu của bạn:`
  ];
  const intro = intros[Math.floor(Math.random() * intros.length)];

  return {
    curtain: chosen,
    intro
  };
}

export function FloatingPetdexChat({ navigateTo }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [facingLeft, setFacingLeft] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào! Tôi là Trợ lý AI UniVeloria ☁️✨ Hãy kể cho tôi nghe về căn phòng của bạn (phòng ngủ, phòng khách, hướng nắng, phong cách yêu thích...) hoặc bất kỳ câu chuyện nào, tôi sẽ gợi ý ngay mẫu rèm hoàn hảo kèm câu chuyện, mức giá và dẫn bạn vào trải nghiệm 3D ngay lập tức!',
      curtain: null
    }
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatOpen, isTyping]);

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
    if (!query) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: query, curtain: null }]);
    if (!textOverride) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      // Find current active curtain to avoid immediate duplicate on random
      const lastBotCurtain = [...messages].reverse().find(m => m.curtain)?.curtain?.studioId || null;
      const { curtain, intro } = getAiCurtainRecommendation(query, lastBotCurtain);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: intro,
          curtain
        }
      ]);
      setIsTyping(false);
    }, 650);
  };

  const handleRequestAnotherCurtain = (currentStudioId) => {
    setIsTyping(true);
    setTimeout(() => {
      const { curtain, intro } = getAiCurtainRecommendation('random', currentStudioId);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: intro,
          curtain
        }
      ]);
      setIsTyping(false);
    }, 500);
  };

  const quickPrompts = [
    { label: '🌅 Phòng ngủ hướng tây nắng gắt', text: 'Tôi cần một tấm rèm cản sáng thật tốt cho phòng ngủ hướng tây nắng gắt, chống nóng và giúp ngủ sâu.' },
    { label: '🛋️ Phòng khách tông gỗ sang trọng', text: 'Phòng khách nhà tôi thiết kế phong cách hiện đại với nhiều đồ gỗ, cần một tấm rèm sang trọng và ấm cúng.' },
    { label: '🏢 Góc làm việc căn hộ cần rèm gọn', text: 'Tôi muốn tìm rèm cuốn gọn gàng, hiện đại cho góc bàn làm việc trong căn hộ nhỏ, dễ vệ sinh lau chùi.' },
    { label: '🎲 Gợi ý ngẫu nhiên 1 mẫu rèm', text: 'Gợi ý ngẫu nhiên cho tôi 1 mẫu rèm độc đáo kèm câu chuyện của nó.' }
  ];

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
                <img
                  src="/assets/ChatBot.png"
                  alt="Trợ lý AI UniVeloria"
                  className="chatbot-header-cat"
                />
                <span className="chatbot-status-dot" />
              </div>
              <div>
                <strong className="chatbot-header-title">Trợ lý AI Tư Vấn Rèm</strong>
                <small className="chatbot-header-sub">UniVeloria AI · Gợi ý theo câu chuyện</small>
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
                <div key={idx} className={m.sender === 'bot' ? 'chatbot-bot-wrap' : 'chatbot-user-wrap'}>
                  <div className={m.sender === 'bot' ? 'chatbot-bot-msg' : 'chatbot-user-msg'}>
                    {m.text}
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
                        <p className="chatbot-rec-story">{m.curtain.story}</p>
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
                            <Sparkles size={14} />
                            <span>Xem 3D ngay</span>
                          </button>
                          <button
                            type="button"
                            className="chatbot-btn-detail"
                            onClick={() => {
                              setChatOpen(false);
                              if (navigateTo) navigateTo('product-detail', m.curtain.id);
                            }}
                            title="Xem chi tiết thông số và đặt mua"
                          >
                            <ExternalLink size={14} />
                            <span>Chi tiết</span>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="chatbot-btn-another"
                          onClick={() => handleRequestAnotherCurtain(m.curtain.studioId)}
                        >
                          <Dices size={13} />
                          <span>Gợi ý mẫu khác cho phòng này</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="chatbot-bot-msg chatbot-typing-indicator">
                  <span>Trợ lý AI đang phân tích câu chuyện căn phòng...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Story Prompts */}
            <div className="chatbot-quick-pills">
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginTop: '4px' }}>
                💡 Gợi ý câu chuyện mẫu:
              </span>
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(p.text)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="chatbot-popup-footer">
            <input
              type="text"
              placeholder="Kể về căn phòng của bạn (ví dụ: phòng ngủ hướng tây...)"
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
              onClick={() => handleSendMessage()}
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
          {/* Always visible message bubble when chat is closed */}
          <div className="petdex-speech-bubble" onClick={handleToggleChat}>
            <span className="bubble-icon">💬</span>
            <span className="bubble-text">Bạn cần tư vấn không?</span>
            <div className="bubble-tail" />
          </div>

          {/* 3D Cat Mascot (/assets/ChatBot.png) */}
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

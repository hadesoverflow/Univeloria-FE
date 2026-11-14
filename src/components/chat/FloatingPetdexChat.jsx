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

// =============================================================================
// AI ANALYSIS ENGINE: PHÂN TÍCH NGỮ CẢNH CÂU CHUYỆN & Ý ĐỊNH NGƯỜI DÙNG
// =============================================================================
export function analyzeUserMessage(rawInput, currentCurtainId = null) {
  const trimmed = (rawInput || '').trim();
  const norm = normalizeText(trimmed);

  // 1. Phân loại Chào hỏi / Xã giao đơn thuần (Greeting only)
  const greetingWords = ['chao', 'xin chao', 'hello', 'hi', 'alo', 'ad oi', 'shop oi', 'em oi', 'ban oi', 'cho hoi', 'tu van'];
  const hasGreeting = greetingWords.some(w => norm.includes(w));
  const hasRoomDetail = norm.includes('phong') || 
                        norm.includes('rem') || 
                        norm.includes('nang') || 
                        norm.includes('tay') || 
                        norm.includes('dong') || 
                        norm.includes('go') || 
                        norm.includes('can sang') || 
                        norm.includes('cua') || 
                        norm.includes('nha') ||
                        norm.includes('kinh') ||
                        norm.includes('can ho') ||
                        norm.includes('chung cu');

  if (hasGreeting && !hasRoomDetail && trimmed.split(/\s+/).length <= 7) {
    return {
      delayMs: 3800,
      curtain: null,
      text: "Dạ em chào anh/chị ạ! Em là Trợ lý AI tư vấn rèm của UniVeloria ☁️✨\n\nEm rất sẵn lòng đồng hành cùng anh/chị tìm ra mẫu rèm hoàn hảo cho ngôi nhà. Anh/chị hãy kể cho em nghe một chút về căn phòng mình muốn lắp rèm nhé:\n• Đó là phòng ngủ, phòng khách, phòng làm việc hay ban công ạ?\n• Hướng cửa có bị nắng gắt buổi chiều không và phong cách nội thất chủ đạo là gì ạ?\n\nChỉ cần vài chi tiết, em sẽ phân tích và gợi ý ngay mẫu rèm chuẩn chỉ kèm trải nghiệm 3D trực quan ạ!"
    };
  }

  // 2. Cảm ơn / Tạm biệt (Thanks / Farewell)
  const thanksWords = ['cam on', 'thank', 'tuyet voi', 'hay qua', 'ok shop', 'tam biet', 'bye'];
  if (thanksWords.some(w => norm.includes(w)) && !hasRoomDetail) {
    return {
      delayMs: 3200,
      curtain: null,
      text: "Dạ không có gì ạ! Rất vui được trò chuyện và tư vấn cùng anh/chị. Bất cứ khi nào anh/chị cần trải nghiệm phối cảnh rèm 3D hoặc tìm kiếm giải pháp che nắng, em luôn sẵn sàng hỗ trợ nhé. Chúc anh/chị một ngày thật an yên và nhiều niềm vui! 🌿✨"
    };
  }

  // 3. Hỏi giá / Báo giá / Cách tính giá (Price FAQ)
  if (norm.includes('gia') && (norm.includes('tinh') || norm.includes('bao nhieu') || norm.includes('bang gia') || norm.includes('met') || norm.includes('dat khong'))) {
    return {
      delayMs: 4200,
      curtain: null,
      text: "Dạ giá rèm tại UniVeloria được niêm yết rõ ràng và tính theo diện tích thực tế:\n• 🌟 Rèm Cuốn: Từ 380.000đ – 490.000đ / m² (Gọn gàng, hiện đại, cản sáng tốt)\n• 🌈 Rèm Cầu Vòng: Từ 1.150.000đ – 1.550.000đ / m² (Nan 2 lớp xoay lật điều chỉnh sáng linh hoạt)\n• 💎 Rèm Vải Cao Cấp: Từ 580.000đ – 680.000đ / m² (Sóng đổ bồng bềnh chuẩn 5 sao)\n\nAnh/chị hãy kể cho em về căn phòng cụ thể của mình để em gợi ý mẫu phù hợp và dẫn vào trải nghiệm 3D nhé!"
    };
  }

  // 4. Hỏi về Dịch vụ / Lắp đặt / Bảo hành / Đo đạc (Service FAQ)
  if (norm.includes('lap dat') || norm.includes('thi cong') || norm.includes('bao hanh') || norm.includes('do dac') || norm.includes('o dau') || norm.includes('dia chi')) {
    return {
      delayMs: 4200,
      curtain: null,
      text: "Dạ dịch vụ trọn gói chuẩn 5 sao của UniVeloria bao gồm:\n1. Đo đạc tận nơi: Chuyên viên mang mẫu vải thực tế đến tận nhà tư vấn và đo đạc miễn phí.\n2. Thi công lắp đặt: Nhanh gọn, chuẩn chỉ trong vòng 24h - 48h.\n3. Bảo hành vàng: 3 năm chính hãng cho chất liệu vải & phụ kiện máng rèm, 5 năm cho động cơ rèm tự động.\n\nAnh/chị đang muốn tân trang cho không gian phòng nào trong nhà ạ?"
    };
  }

  // 5. Yêu cầu ngẫu nhiên / Chọn đại / Mẫu khác (Explicit Random)
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
      delayMs: 5500,
      curtain: picked,
      text: `Một đề xuất ngẫu nhiên đầy bất ngờ dành cho bạn! Dưới đây là tuyệt phẩm rèm được nhiều gia chủ và kiến trúc sư lựa chọn tại UniVeloria:`
    };
  }

  // 6. PHÂN TÍCH CHUYÊN SÂU: HƯỚNG MẶT TRỜI, HƯỚNG GIÓ, ÁNH SÁNG & VỊ TRÍ CĂN PHÒNG
  const isWest = norm.includes('phia tay') || 
                 norm.includes('huong tay') || 
                 norm.includes('nha tay') || 
                 norm.includes('cua tay') ||
                 norm.includes('nang tay') || 
                 norm.includes('chieu tay') || 
                 norm.includes('tay bac') || 
                 norm.includes('tay nam') || 
                 norm.includes('mat troi lan') || 
                 norm.includes('nang chieu') || 
                 norm.includes('nang gat') || 
                 norm.includes('om nhiet') || 
                 norm.includes('nong ham hap') ||
                 norm.includes('buc xa') ||
                 /\b(tay|phia tay|huong tay)\b/.test(norm);

  const isEast = norm.includes('phia dong') || 
                 norm.includes('huong dong') || 
                 norm.includes('nha dong') || 
                 norm.includes('cua dong') ||
                 norm.includes('nang dong') || 
                 norm.includes('dong bac') || 
                 norm.includes('dong nam') || 
                 norm.includes('mat troi moc') || 
                 norm.includes('binh minh') || 
                 norm.includes('nang som') || 
                 norm.includes('ban mai') ||
                 norm.includes('nang sang') ||
                 /\b(dong|phia dong|huong dong)\b/.test(norm);

  const isSouth = norm.includes('phia nam') || 
                  norm.includes('huong nam') || 
                  norm.includes('nha nam') || 
                  norm.includes('cua nam') || 
                  norm.includes('gio nam') || 
                  norm.includes('gio nom') || 
                  norm.includes('gio mat') ||
                  norm.includes('thoang gio') ||
                  /\b(nam|phia nam|huong nam)\b/.test(norm);

  const isNorth = norm.includes('phia bac') || 
                  norm.includes('huong bac') || 
                  norm.includes('nha bac') || 
                  norm.includes('cua bac') || 
                  norm.includes('gio bac') || 
                  norm.includes('gio lanh') || 
                  norm.includes('dong bac') || 
                  norm.includes('tay bac') || 
                  norm.includes('mua dong') || 
                  norm.includes('thieu sang') || 
                  norm.includes('thieu nang') ||
                  norm.includes('it nang') ||
                  /\b(bac|phia bac|huong bac)\b/.test(norm);

  const hasWindOrSunQuery = norm.includes('huong gio') || 
                            norm.includes('huong mat troi') || 
                            norm.includes('anh sang phu hop') || 
                            norm.includes('theo huong');

  const isLivingRoom = norm.includes('phong khach') || norm.includes('khach') || norm.includes('biet thu') || norm.includes('gian chinh') || norm.includes('phong sinh hoat');
  const isBedRoom = norm.includes('phong ngu') || norm.includes('ngu') || norm.includes('em be') || norm.includes('master') || norm.includes('vo chong');
  const isWorkRoom = norm.includes('lam viec') || norm.includes('van phong') || norm.includes('cong ty') || norm.includes('ban lam viec') || norm.includes('doc sach');
  const isApartment = norm.includes('chung cu') || norm.includes('can ho') || norm.includes('studio') || norm.includes('phong nho') || norm.includes('dien tich hep');

  const isWood = norm.includes('go') || norm.includes('van go') || norm.includes('nau') || norm.includes('am cung') || norm.includes('moc mac');
  const isScandinavian = norm.includes('bac au') || norm.includes('scandinavian') || norm.includes('hoa ram') || norm.includes('thanh lich');
  const isLuxury5Star = norm.includes('sang trong') || norm.includes('5 sao') || norm.includes('khach san') || norm.includes('hoang gia') || norm.includes('quy toc') || norm.includes('chau au') || norm.includes('be the');
  const isJapandi = norm.includes('japandi') || norm.includes('eco') || norm.includes('song xanh') || norm.includes('thien nhien');

  // Tính điểm phù hợp cho 12 mẫu rèm dựa trên Hướng + Vị trí + Môi trường
  const scored = CURTAIN_PROFILES.map(item => {
    let score = 0;

    // Loại rèm theo mong muốn
    if (norm.includes('cau vong') || norm.includes('zebra')) {
      if (item.category === 'Rèm cầu vồng') score += 15;
      else score -= 15;
    }
    if (norm.includes('cuon') || norm.includes('roller')) {
      if (item.category === 'Rèm cuốn') score += 15;
      else score -= 15;
    }
    if (norm.includes('rem vai') || norm.includes('vai')) {
      if (item.category === 'Rèm vải') score += 15;
      else score -= 15;
    }

    // 1. Phù hợp hướng Tây (Nắng chiều gay gắt, gió khô nóng)
    if (isWest) {
      if (item.studioId === 'rainbow-dragon') score += 28;
      if (item.studioId === 'roller-moon') score += 28;
      if (item.studioId === 'rainbow-brioni') score += 20;
    }

    // 2. Phù hợp hướng Đông (Nắng sớm ban mai, gió Đông mát mẻ)
    if (isEast) {
      if (item.studioId === 'rainbow-rivere') score += 26;
      if (item.studioId === 'roller-sunny') score += 26;
      if (item.studioId === 'roller-harmony-2') score += 18;
    }

    // 3. Phù hợp hướng Nam (Ánh sáng chan hòa, gió nồm mát rượi)
    if (isSouth) {
      if (item.studioId === 'elogi-1198-2') score += 26;
      if (item.studioId === 'elogi-1206-1') score += 24;
      if (item.studioId === 'roller-malange-1') score += 18;
    }

    // 4. Phù hợp hướng Bắc (Thiếu nắng trực tiếp, gió mùa Đông Bắc lạnh)
    if (isNorth) {
      if (item.studioId === 'elogi-1230-1') score += 26;
      if (item.studioId === 'rainbow-brioni') score += 22;
      if (item.studioId === 'roller-silvia') score += 20;
    }

    // Phòng & Công năng
    if (isLivingRoom) {
      if (item.studioId === 'elogi-1198-2') score += 16;
      if (item.studioId === 'rainbow-brioni') score += 15;
      if (item.studioId === 'roller-silvia') score += 13;
      if (item.studioId === 'roller-sunny') score += 10;
    }
    if (isBedRoom) {
      if (item.studioId === 'roller-moon') score += 18;
      if (item.studioId === 'rainbow-dragon') score += 17;
      if (item.studioId === 'elogi-1206-1') score += 15;
      if (item.studioId === 'rainbow-brioni') score += 12;
    }
    if (isWorkRoom) {
      if (item.studioId === 'rainbow-infiniti') score += 18;
      if (item.studioId === 'roller-harmony-2') score += 16;
      if (item.studioId === 'roller-malange-1') score += 12;
    }
    if (isApartment) {
      if (item.studioId === 'rainbow-rivere') score += 16;
      if (item.studioId === 'roller-malange-1') score += 15;
      if (item.studioId === 'roller-harmony-2') score += 13;
    }

    // Phong cách nội thất
    if (isWood) {
      if (item.studioId === 'rainbow-brioni') score += 20;
      if (item.studioId === 'elogi-1206-1') score += 15;
    }
    if (isLuxury5Star) {
      if (item.studioId === 'elogi-1198-2') score += 20;
      if (item.studioId === 'roller-silvia') score += 18;
    }
    if (isScandinavian) {
      if (item.studioId === 'roller-malange-1') score += 20;
      if (item.studioId === 'roller-harmony-2') score += 14;
    }
    if (isJapandi) {
      if (item.studioId === 'elogi-1230-1') score += 22;
    }

    // Khớp từ khóa cụ thể trong hồ sơ sản phẩm
    item.keywords.forEach(kw => {
      const normKw = normalizeText(kw);
      if (norm.includes(normKw)) score += 3.5;
    });

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const highestScore = scored[0].score;
  let chosen;
  if (highestScore > 0) {
    const topCandidates = scored.filter(s => s.score >= highestScore - 2).map(s => s.item);
    chosen = topCandidates[Math.floor(Math.random() * topCandidates.length)];
  } else {
    chosen = CURTAIN_PROFILES[Math.floor(Math.random() * CURTAIN_PROFILES.length)];
  }

  // TỔNG HỢP CÂU TRẢ LỜI THÔNG MINH (KHÔNG CÓ DẤU **)
  let narrative = '';

  if (isWest) {
    narrative = `Đối với căn phòng nằm ở phía Tây (hoặc hướng Tây / Tây Bắc / Tây Nam):

• Hướng Mặt Trời: Đón nhận trọn vẹn ánh nắng chiều gay gắt từ 13h00 đến 17h30 với góc chiếu xiên thấp chiếu sâu vào phòng, bức xạ nhiệt cực đại khiến căn phòng dễ bị tích nhiệt (om nhiệt), hầm hập và chói lóa mắt dữ dội.
• Hướng Gió: Mùa hè thường đón gió Tây Nam khô nóng (gió Lào/gió phơn), độ ẩm thấp, dễ làm không khí trong phòng ngột ngạt và làm cong vênh, bạc màu đồ gỗ nội thất.
• Ánh Sáng & Rèm Thích Hợp: Căn phòng phía Tây bắt buộc phải sử dụng rèm có khả năng cản sáng đỉnh cao từ 94% đến 100% Blackout tuyệt đối kết hợp tính năng cách nhiệt để hạ nhiệt độ phòng từ 3 - 5°C so với bên ngoài.

Các mẫu rèm thích hợp nhất cho căn phòng phía Tây:
1. Mẫu Rèm Cầu Vồng Dragon.E Blackout: Dệt chéo melange đan khít dày dặn, cản sáng 95%, chống chói lóa và cản nhiệt vượt trội cho phòng ngủ và phòng khách hướng Tây.
2. Mẫu Rèm Cuốn Moon: Cản sáng 100% Blackout tuyệt đối nhờ 3 lớp bọt Foam cách nhiệt, chặn đứng hoàn toàn tia bức xạ mặt trời.
3. Mẫu Rèm Cầu Vồng Brioni.E Blackout: Vân gỗ sang trọng, cản sáng 94%, bảo vệ nội thất gỗ không bị bạc màu do nắng chiều.`;
  } else if (isEast) {
    narrative = `Đối với căn phòng nằm ở phía Đông (hoặc Đông Bắc / Đông Nam):

• Hướng Mặt Trời: Đón nhận ánh nắng trực diện vào sáng sớm từ 6h00 đến 10h30 (bình minh). Ánh sáng sớm có cường độ chói mắt khi vừa thức giấc nhưng tắt nắng nhanh, từ sau 11h phòng trở nên râm mát.
• Hướng Gió: Đón gió Đông mát mẻ vào buổi sáng, không khí trong lành và lưu thông tự nhiên rất tốt.
• Ánh Sáng & Rèm Thích Hợp: Căn phòng phía Đông thích hợp nhất với các mẫu rèm có cơ chế điều tiết ánh sáng linh hoạt: sáng sớm cản chói để bạn ngủ ngon, ban ngày có thể mở hé để đón gió lành và ánh sáng chan hòa mà không cần kéo hết rèm lên.

Các mẫu rèm thích hợp nhất cho căn phòng phía Đông:
1. Mẫu Rèm Cầu Vồng River.E: Cấu trúc nan 2 lớp so le, sáng sớm xoay lệch nan để che chói, sau đó xoay trùng nan để đón trọn gió lành và ánh sáng dịu mát.
2. Mẫu Rèm Cuốn Sunny: Mắt lưới Micro Sunscreen lọc sáng dịu mát, ngăn 95% tia UV nhưng vẫn giữ tầm nhìn mở thoáng đãng ngắm cảnh ban mai.
3. Mẫu Rèm Cuốn Harmony 2: Thiết kế gọn gàng, gân dệt cản sáng 85-90% vừa đủ cho giấc ngủ sớm êm đềm.`;
  } else if (isSouth) {
    narrative = `Đối với căn phòng nằm ở phía Nam (hoặc Đông Nam):

• Hướng Mặt Trời: Đây là hướng đắc địa nhất trong kiến trúc vì tránh được ánh nắng chiếu trực diện gay gắt quanh năm. Ánh sáng mặt trời chiếu nghiêng ổn định, dịu êm và chan hòa từ sáng đến chiều.
• Hướng Gió: Đón trọn luồng gió nồm Đông Nam mát rượi vào mùa hè, ấm áp vào mùa đông và lưu thông không khí tuyệt vời.
• Ánh Sáng & Rèm Thích Hợp: Căn phòng phía Nam không cần loại rèm cản sáng quá dày nặng nề, mà nên ưu tiên các dòng rèm mềm mại, tôn vinh thẩm mỹ cao cấp, bay bổng theo làn gió và điều tiết ánh sáng nhẹ nhàng.

Các mẫu rèm thích hợp nhất cho căn phòng phía Nam:
1. Mẫu rèm vải Elogi - 1198 - 2: Sóng rèm chữ S lượn bồng bềnh chuẩn khách sạn 5 sao, đón gió nồm đu đưa mềm mại, tôn vinh sự bề thế của phòng khách hoặc phòng ngủ.
2. Mẫu rèm vải Elogi - 1206 - 1: Dệt từ sợi lanh tự nhiên mềm rũ thoáng khí, giữ căn phòng luôn thơm mát, thư thái cùng làn gió Nam trong lành.
3. Mẫu Rèm Cuốn Malange 1: Tối giản phong cách Bắc Âu Scandinavian, mang lại ánh sáng khuếch tán thanh lịch.`;
  } else if (isNorth) {
    narrative = `Đối với căn phòng nằm ở phía Bắc (hoặc Đông Bắc):

• Hướng Mặt Trời: Hướng này hầu như không có ánh nắng mặt trời chiếu trực tiếp quanh năm. Căn phòng thường chỉ nhận ánh sáng khuếch tán yếu, dễ tạo cảm giác thiếu sáng và tĩnh lặng.
• Hướng Gió: Vào mùa đông phải hứng chịu gió mùa Đông Bắc (gió bấc) lạnh buốt, độ ẩm thấp, dễ làm căn phòng bị lạnh lẽo và hanh khô.
• Ánh Sáng & Rèm Thích Hợp: Căn phòng phía Bắc rất thích hợp với các dòng rèm mang tone màu ấm áp (vàng kem, nâu gỗ, be ấm, đất nung) để cân bằng thị giác, xua tan cảm giác lạnh lẽo và có khả năng cản gió lùa giữ ấm mà không làm phòng bị tối sầm.

Các mẫu rèm thích hợp nhất cho căn phòng phía Bắc:
1. Mẫu rèm vải Elogi - 1230 - 1: Sợi eco gân nổi với tone cát vàng Japandi dịu mắt, mang năng lượng ấm áp xua tan sự lạnh lẽo của hướng Bắc, kết nối thiên nhiên thanh bình.
2. Mẫu Rèm Cầu Vồng Brioni.E Blackout: Tone màu gỗ tự nhiên ấm cúng, bản nan dày dặn cản gió lùa mùa đông cực tốt khi khép kín.
3. Mẫu Rèm Cuốn Silvia: Họa tiết dệt Jacquard Châu Âu dày dặn, giữ ấm căn phòng và tăng thêm vẻ sang trọng, quý phái.`;
  } else if (hasWindOrSunQuery) {
    narrative = `Tư vấn giải pháp rèm theo Hướng Mặt Trời, Hướng Gió & Ánh Sáng:

1. Hướng Tây (Nắng chiều gay gắt, gió Tây Nam khô nóng): Thích hợp rèm cản sáng 95% - 100% có lớp cách nhiệt chống nóng (Rèm Cuốn Moon 100% Blackout, Rèm Cầu Vồng Dragon.E 95%).
2. Hướng Đông (Nắng sớm ban mai, gió Đông mát mẻ): Thích hợp rèm điều chỉnh nan linh hoạt để cản chói sáng sớm và đón gió ban ngày (Rèm Cầu Vồng River.E, Rèm Cuốn Sunny lọc sáng tự nhiên).
3. Hướng Nam (Ánh sáng chan hòa, gió nồm mát rượi): Thích hợp rèm vải sóng chữ S bồng bềnh hoặc rèm cuốn thanh lịch, tối ưu thông gió (Rèm Vải Elogi 1198-2, Elogi 1206-1 sợi lanh).
4. Hướng Bắc (Thiếu nắng trực tiếp, gió mùa Đông Bắc lạnh): Thích hợp rèm tone màu ấm áp, cản gió lùa giữ nhiệt (Rèm Vải Elogi 1230-1 Japandi tone vàng cát, Rèm Cầu Vồng Brioni.E vân gỗ ấm).`;
  } else if (isLivingRoom && isWood) {
    narrative = `Với không gian phòng khách hiện đại kết hợp nhiều nội thất gỗ sang trọng: Sự phối hợp đắt giá nhất là tấm rèm có vân dệt tự nhiên trầm ấm, tôn lên chất mộc quý phái và đồng điệu với thẩm mỹ căn nhà.`;
  } else if (isWorkRoom) {
    narrative = `Đối với góc làm việc cần sự chỉn chu và tập trung: Tiêu chuẩn hàng đầu là khả năng cản chói chống lóa màn hình, vận hành êm ái và có đường nét kiến trúc sắc sảo, gọn gàng.`;
  } else if (isBedRoom) {
    narrative = `Phòng ngủ là chốn riêng tư để nghỉ ngơi và tái tạo năng lượng: Tấm rèm hoàn hảo cần mang lại độ che chắn riêng tư cao, chất cảm êm dịu và khả năng cách âm, cản nhiệt tốt.`;
  } else if (isLivingRoom) {
    narrative = `Phòng khách là trung tâm của ngôi nhà: Việc chọn rèm cần tạo được sự bề thế, linh hoạt lấy sáng tự nhiên đón tài lộc và tạo cảm giác thoáng đãng, ấm cúng.`;
  } else if (isApartment) {
    narrative = `Với không gian căn hộ chung cư hiện đại: Giải pháp rèm cần tiết kiệm diện tích tối đa, dễ dàng vệ sinh lau chùi và mang lại cảm giác trẻ trung, thoáng mát.`;
  } else {
    narrative = `Lắng nghe câu chuyện và mong muốn về không gian của bạn: UniVeloria đã phân tích các tiêu chí về vị trí, hướng nắng, hướng gió và phong cách nội thất để tìm ra giải pháp chuẩn xác nhất.`;
  }

  const responseText = `${narrative}\n\nUniVeloria trân trọng đề xuất ${chosen.name} (${chosen.badge}) — sự lựa chọn chuẩn mực dành riêng cho căn phòng của bạn:`;

  return {
    delayMs: 6500, // Thời gian phân tích từ 5-10s theo yêu cầu
    curtain: chosen,
    text: responseText
  };
}

export function FloatingPetdexChat({ navigateTo }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [facingLeft, setFacingLeft] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStageIdx, setThinkingStageIdx] = useState(0);

  const thinkingStages = [
    { icon: '🔍', title: 'Tiếp nhận thông tin', text: 'Đang đọc hiểu câu chuyện không gian & vị trí căn phòng...' },
    { icon: '☀️', title: 'Phân tích môi trường', text: 'Đang đánh giá hướng nắng, nhu cầu cản sáng & phong cách nội thất...' },
    { icon: '🧵', title: 'Đối chiếu dữ liệu', text: 'Đang quét kho dữ liệu 12 mẫu rèm chính hãng UniVeloria...' },
    { icon: '✨', title: 'Thiết lập giải pháp', text: 'Đang hoàn tất đề xuất và chuẩn bị không gian 3D tương ứng...' }
  ];

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào! Tôi là Trợ lý AI UniVeloria ☁️✨ Hãy kể cho tôi nghe về căn phòng của bạn (phòng ngủ, phòng khách, hướng nắng, phong cách yêu thích...) hoặc bất kỳ câu chuyện nào, tôi sẽ phân tích chuyên sâu và gợi ý ngay mẫu rèm hoàn hảo kèm câu chuyện, mức giá và dẫn bạn vào trải nghiệm 3D ngay lập tức!',
      curtain: null
    }
  ]);

  const messagesEndRef = useRef(null);
  const timersRef = useRef([]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    // Clear previous timers if any
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: query, curtain: null }]);
    if (!textOverride) setChatInput('');
    setIsTyping(true);
    setThinkingStageIdx(0);

    // Find current active curtain to avoid immediate duplicate on random
    const lastBotCurtain = [...messages].reverse().find(m => m.curtain)?.curtain?.studioId || null;
    const { curtain, text, delayMs } = analyzeUserMessage(query, lastBotCurtain);

    // Cycle thinking stages across the 5-10s analysis duration
    const stepDuration = Math.floor(delayMs / 4);
    const t1 = setTimeout(() => setThinkingStageIdx(1), stepDuration);
    const t2 = setTimeout(() => setThinkingStageIdx(2), stepDuration * 2);
    const t3 = setTimeout(() => setThinkingStageIdx(3), stepDuration * 3);
    const tFinal = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text,
          curtain
        }
      ]);
      setIsTyping(false);
    }, delayMs);

    timersRef.current = [t1, t2, t3, tFinal];
  };

  const handleRequestAnotherCurtain = (currentStudioId) => {
    if (isTyping) return;

    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];

    setIsTyping(true);
    setThinkingStageIdx(0);
    const delayMs = 5200; // > 5s per user requirement
    const stepDuration = Math.floor(delayMs / 4);

    const t1 = setTimeout(() => setThinkingStageIdx(1), stepDuration);
    const t2 = setTimeout(() => setThinkingStageIdx(2), stepDuration * 2);
    const t3 = setTimeout(() => setThinkingStageIdx(3), stepDuration * 3);
    const tFinal = setTimeout(() => {
      const { curtain, text } = analyzeUserMessage('random', currentStudioId);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text,
          curtain
        }
      ]);
      setIsTyping(false);
    }, delayMs);

    timersRef.current = [t1, t2, t3, tFinal];
  };

  const quickPrompts = [
    { label: '🌅 Căn phòng phía tây nắng gắt chiều', text: 'Tôi muốn có 1 bộ rèm ở căn phòng phía tây, hướng nắng chiều gay gắt cần chống nóng và cản nhiệt tốt.' },
    { label: '☀️ Căn phòng phía đông đón nắng sớm', text: 'Căn phòng phía đông nhà tôi bị chói mắt lúc bình minh, tôi cần rèm điều chỉnh sáng linh hoạt và đón gió ban ngày.' },
    { label: '🍃 Căn phòng phía nam đón gió mát', text: 'Căn phòng phía nam nhà tôi nhiều gió mát quanh năm, cần rèm mềm mại sang trọng đón gió lưu thông.' },
    { label: '❄️ Căn phòng phía bắc cần giữ ấm', text: 'Căn phòng phía bắc ít nắng và mùa đông có gió lạnh, cần rèm tone màu ấm cúng và cản gió tốt.' },
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
                <small className="chatbot-header-sub">UniVeloria AI</small>
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
                  <div 
                    className={m.sender === 'bot' ? 'chatbot-bot-msg' : 'chatbot-user-msg'}
                    style={{ whiteSpace: 'pre-line' }}
                  >
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
                            <Sparkles size={14} />
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
                            <ExternalLink size={14} />
                            <span>Chi tiết</span>
                          </a>
                        </div>
                        <button
                          type="button"
                          className="chatbot-btn-another"
                          onClick={() => handleRequestAnotherCurtain(m.curtain.studioId)}
                          disabled={isTyping}
                        >
                          <Dices size={13} />
                          <span>Gợi ý mẫu khác cho phòng này</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Dynamic AI Thinking State (5-10s Analysis) */}
              {isTyping && (
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
                    <div className="chatbot-thinking-progress-bar" />
                  </div>
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
                  disabled={isTyping}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="chatbot-popup-footer">
            <input
              type="text"
              placeholder={isTyping ? "AI đang phân tích câu chuyện căn phòng..." : "Kể về căn phòng (phòng ngủ hướng tây, phòng khách đồ gỗ...)"}
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

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ExternalLink, Dices } from 'lucide-react';

// =============================================================================
// HỒ SƠ 14 SẢN PHẨM CHÍNH HÃNG KÈM LUẬN ĐIỂM TƯ VẤN CHUYÊN GIA
// (Gồm 12 mẫu rèm chính thức + 2 mẫu thanh rèm/động cơ thông minh)
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
    story: 'Bề mặt vân dệt gỗ xước ngang tự nhiên Wood-grain mang đến sự trầm ấm, sang trọng và khả năng cản sáng đến 94%. Tấm rèm sinh ra để đồng điệu với nội thất gỗ, phòng khách biệt thự hoặc phòng ngủ cần chiều sâu mộc mạc và sự riêng tư yên bình.',
    whyChoose: 'Bề mặt dệt xước vân gỗ Wood-grain với độ dày sợi cao cấp giúp cản sáng 94% và hạ nhiệt tối ưu. Nếu căn phòng của bạn có nhiều nội thất gỗ, các loại rèm trơn thông thường sẽ làm không gian bị đơn điệu, trong khi Brioni.E tạo nên sự đồng điệu mộc mạc, tôn vinh đẳng cấp đồ gỗ và bảo vệ bề mặt gỗ không bị bạc màu do tia cực tím.',
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
    whyChoose: 'Đường nẹp viền sáng kép Dual-Border độc quyền tạo nên nét vẽ kiến trúc sắc nét, cản sáng 90% chống lóa màn hình máy tính tuyệt đối. Góc làm việc hay văn phòng hiện đại cần sự chỉn chu, dứt khoát; rèm thông thường dễ tạo cảm giác buồn tẻ, còn Infiniti.E mang lại phong thái kỷ luật, hiện đại và tập trung tối đa.',
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
    whyChoose: 'Sở hữu hệ 10 mã màu phong phú cùng cơ chế nan so le lấy sáng êm dịu. Với các căn hộ chung cư hoặc phòng gia đình trẻ, bạn không muốn một tấm rèm nặng nề che kín mít cả ngày; River.E cho phép bạn vừa cản chói lúc nắng sớm, vừa xoay nan đón gió và ánh sáng tự nhiên dịu nhẹ vào phòng mà vẫn giữ được sự riêng tư.',
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
    story: 'Sở hữu ma trận dệt chéo melange đan khít dày dặn, Dragon.E là người vệ sĩ cản sáng 95% vượt trội. Nếu phòng ngủ của bạn quay về hướng tây nắng gắt hay cạnh trục đường ồn ào, Dragon.E sẽ che chắn toàn bộ ánh chói và hạ nhiệt, đem lại sự tĩnh lặng tuyệt đối cho giấc ngủ.',
    whyChoose: 'Ma trận dệt chéo melange đan khít cản sáng đến 95%. Với những căn phòng phía Tây nắng chiều rực lửa hoặc cạnh đường lớn ồn ào, bất kỳ loại rèm mỏng nào cũng sẽ bị nắng xuyên qua gây om nhiệt; chỉ có kết cấu dệt dày dặn của Dragon.E mới chặn đứng bức xạ nhiệt, hạ nhiệt độ phòng tức thì và bảo vệ giấc ngủ tĩnh lặng.',
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
    whyChoose: 'Vải dệt gân corded rib tráng lớp bảo vệ chống bám bụi và chống thấm nước, cuộn gọn gàng tuyệt đối vào hộp máng. Với góc bàn làm việc hoặc căn hộ diện tích nhỏ, việc dùng rèm vải rườm rà sẽ chiếm dụng không gian và dễ bám bụi; Harmony 2 giải phóng 100% diện tích cửa sổ, dễ lau chùi và vận hành cực kỳ bền bỉ.',
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
    whyChoose: 'Họa tiết dệt hoa râm Scandinavian làm mềm đi những mảng tường bê tông thô cứng, cản sáng 90% nhẹ nhàng. Không gian phòng khách căn hộ hoặc studio cần sự thanh lịch, thoáng đãng; Malange 1 biến khung cửa sổ thành một bức tranh nghệ thuật Bắc Âu tinh tế mà không làm phòng bị tối sầm.',
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
    whyChoose: 'Giải pháp cản sáng 100% Blackout tuyệt đối nhờ 3 lớp bọt Foam cách nhiệt độc quyền. Đối với phòng ngủ người già, trẻ nhỏ hoặc người hay mất ngủ cần bóng tối tuyệt đối giữa trưa hè, đây là tấm rèm duy nhất chặn đứng 100% tia nắng và ngăn nhiệt lượng từ kính phả vào phòng.',
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
    whyChoose: 'Vải dệt Jacquard Châu Âu hoa văn dệt nổi vương giả đạt chuẩn chống cháy B1 an toàn. Phòng khách lớn, phòng họp VIP hoặc biệt thự cần khẳng định vị thế gia chủ; các loại rèm cuốn trơn văn phòng sẽ làm giảm giá trị không gian, trong khi Silvia nâng tầm sự sang trọng quý phái như một tác phẩm dệt hoàng gia.',
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
    whyChoose: 'Mắt lưới Micro Sunscreen lọc sáng dịu mát, ngăn 95% tia UV độc hại nhưng vẫn giữ trọn 100% tầm nhìn ngắm cảnh thiên nhiên. Nếu cửa sổ của bạn có ban công đẹp, hướng biển hoặc nhìn ra sân vườn, chọn rèm tối màu sẽ làm mất view; Sunny giúp bạn đón nắng ban mai dịu êm mà không hề bị chói mắt.',
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
    whyChoose: 'Chuẩn mực khách sạn 5 sao với kỹ thuật may sóng chữ S bồng bềnh từ trần xuống sàn, chất gấm dệt thô cao cấp phong cách Nhật Bản cản sáng 95%. Với các khung cửa kính lớn ở phòng khách biệt thự hoặc căn hộ duplex, chỉ có độ rủ mềm mại bề thế của Elogi 1198 mới xứng tầm định hình đẳng cấp kiến trúc.',
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
    whyChoose: 'Sợi lanh tự nhiên mềm rũ phối tone đất nung ấm áp có khả năng cách âm và tiêu âm đường phố vượt trội. Đối với phòng ngủ vợ chồng hoặc không gian nghỉ dưỡng, cảm giác thô ráp của rèm công nghiệp sẽ làm mất đi sự thư giãn; Elogi 1206 vỗ về xúc giác, giảm tiếng ồn và tạo nên chốn nghỉ ngơi bình yên, ấm cúng.',
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
    whyChoose: 'Dệt từ sợi Eco-friendly an toàn sức khỏe với tone cát vàng kem Japandi mộc mạc xua tan mọi căng thẳng. Với căn phòng hướng Bắc thiếu sáng hoặc gia chủ theo đuổi lối sống xanh, Elogi 1230 mang năng lượng ấm áp của thiên nhiên vào từng mét vải, cân bằng thị giác và giữ không gian luôn an lành.',
    keywords: ['japandi', 'eco', 'song xanh', 'an toan', 'thien nhien', 'moc mac', 'gan noi', 'vang kem', 'thanh binh', 'thu thai']
  },
  {
    id: 13,
    studioId: 'elogi-1198-2',
    name: 'UniVeloria Motion A25 Pro',
    category: 'Thanh rèm',
    price: 3450000,
    priceDisplay: 'Từ 3.450.000đ / bộ',
    image: '/product/Thanh Rèm/UniVeloria Motion A25 Pro.png',
    badge: 'Smart Motor Tự Động',
    story: 'Đỉnh cao công nghệ Smart Home cho rèm cửa: Động cơ siêu tĩnh âm <25dB công nghệ Đức, hỗ trợ kéo tay nhẹ Touch Motion và điều khiển giọng nói qua Apple HomeKit / Google Assistant. Thanh ray nhôm hàng không 6063-T5 chịu tải 60kg, tự động đóng mở theo lịch trình mỗi ngày.',
    whyChoose: 'Motion A25 Pro giải phóng hoàn toàn sức lao động, nâng cấp căn phòng thành không gian sống thông minh đẳng cấp quốc tế. Động cơ không chổi than Brushless siêu êm không phát ra tiếng ồn (<25dB), tải trọng cực đại 60kg cho mọi bộ rèm vải dày, tính năng kéo tay nhẹ tự chạy (Touch Motion) và bảo hành đổi mới 5 năm chính hãng.',
    keywords: ['thanh rem', 'thanh ray', 'dong co', 'tu dong', 'smart', 'motor', 'homekit', 'google', 'dieu khien', 'ray rem', 'ray tu dong', 'thanh treo']
  },
  {
    id: 14,
    studioId: 'elogi-1206-1',
    name: 'UniVeloria Motion R25',
    category: 'Thanh rèm',
    price: 2850000,
    priceDisplay: 'Từ 2.850.000đ / bộ',
    image: '/product/Thanh Rèm/UniVeloria Motion R25.png',
    badge: 'Ray Bi Teflon Siêu Mượt',
    story: 'Hệ rãnh trượt bi con lăn phủ hạt nhựa Teflon tự bôi trơn siêu êm ái, kéo rèm lướt nhẹ như nhung không phát ra tiếng động. Nhôm đúc nguyên khối chịu lực uốn cong 90 độ hoặc bo tròn theo góc cửa sổ vòng cung, độ bền trên 15 năm.',
    whyChoose: 'Motion R25 khắc phục triệt để hiện tượng kẹt rít, võng ray của các loại thanh treo thông thường. Hệ bi phủ hạt nhựa Teflon tự bôi trơn giúp rèm vải nặng lướt êm ái như nhung, kết hợp khả năng uốn góc 90 độ theo kiến trúc cửa sổ bo cong với độ bền trên 15 năm mà không cần bảo dưỡng.',
    keywords: ['thanh rem', 'thanh treo', 'ray rem', 'ray bi', 'teflon', 'sieu muot', 'uon cong', 'keo tay', 'ben bi', 'phu kien', 'thanh ray co']
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
      text: "Dạ em chào anh/chị ạ! Em là Chuyên gia Tư vấn Không gian Rèm của UniVeloria ☁️✨\n\nEm sẵn sàng đồng hành cùng anh/chị phân tích và đưa ra giải pháp rèm chuẩn mực nhất cho ngôi nhà. Anh/chị hãy chia sẻ chi tiết về căn phòng nhé:\n• Đó là phòng ngủ, phòng khách, phòng làm việc hay ban công ạ?\n• Hướng cửa sổ có chịu nắng chiều gay gắt (hướng Tây), đón nắng sớm (hướng Đông) hay lộng gió (hướng Nam) không ạ?\n• Anh/chị cần tư vấn giải pháp rèm vải, rèm cuốn, rèm cầu vồng hay hệ thanh ray / động cơ thông minh ạ?\n\nChỉ cần vài dữ liệu không gian, em sẽ thẩm định chuyên môn và tư vấn chính xác tại sao anh/chị bắt buộc phải chọn loại rèm đó cho căn phòng kèm trải nghiệm 3D trực quan ạ!"
    };
  }

  // 2. Cảm ơn / Tạm biệt (Thanks / Farewell)
  const thanksWords = ['cam on', 'thank', 'tuyet voi', 'hay qua', 'ok shop', 'tam biet', 'bye'];
  if (thanksWords.some(w => norm.includes(w)) && !hasRoomDetail) {
    return {
      delayMs: 3200,
      curtain: null,
      text: "Dạ không có gì ạ! Rất vui được đồng hành tư vấn không gian cùng anh/chị. Bất cứ khi nào anh/chị cần phân tích hướng nắng, chất liệu vải hay trải nghiệm phối cảnh rèm 3D thực tế, em luôn sẵn sàng hỗ trợ nhé. Chúc anh/chị một ngày thật an yên và nhiều năng lượng tích cực! 🌿✨"
    };
  }

  // 3. Hỏi giá / Báo giá / Cách tính giá (Price FAQ)
  if (norm.includes('gia') && (norm.includes('tinh') || norm.includes('bao nhieu') || norm.includes('bang gia') || norm.includes('met') || norm.includes('dat khong'))) {
    return {
      delayMs: 4200,
      curtain: null,
      text: "Dạ giá rèm tại UniVeloria được niêm yết minh bạch và tính theo diện tích thực tế:\n• 🌟 Rèm Cuốn: Từ 380.000đ – 490.000đ / m² (Gọn gàng, hiện đại, cản sáng tốt)\n• 🌈 Rèm Cầu Vòng: Từ 1.150.000đ – 1.550.000đ / m² (Nan 2 lớp xoay lật điều chỉnh sáng linh hoạt)\n• 💎 Rèm Vải Cao Cấp: Từ 580.000đ – 680.000đ / m² (Sóng đổ bồng bềnh chuẩn 5 sao)\n• ⚡ Thanh Ray & Động Cơ Tự Động: Từ 2.850.000đ – 3.450.000đ / bộ (Động cơ thông minh siêu êm & ray trượt Teflon)\n\nAnh/chị hãy chia sẻ về đặc điểm căn phòng để em tư vấn phương án kỹ thuật chuẩn xác và dẫn vào trải nghiệm 3D nhé!"
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
      ? CURTAIN_PROFILES.filter(c => c.category !== 'Thanh rèm' && c.studioId !== currentCurtainId)
      : CURTAIN_PROFILES.filter(c => c.category !== 'Thanh rèm');
    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    return {
      delayMs: 5500,
      curtain: picked,
      text: `TƯ VẤN CHUYÊN GIA: TẠI SAO BẠN NÊN CHỌN LOẠI RÈM NÀY CHO CĂN PHÒNG\n\nPhân tích lý do chuyên gia khuyên dùng:\n${picked.whyChoose}\n\nChuyên gia tư vấn UniVeloria khẳng định: ${picked.name} (${picked.badge}) là phương án độc đáo giúp tối ưu hóa không gian sống của bạn:`
    };
  }

  // 6. PHÂN TÍCH NHU CẦU VỀ THANH RÈM / ĐỘNG CƠ RÈM TỰ ĐỘNG
  const isThanhRemQuery = norm.includes('thanh rem') || 
                          norm.includes('thanh treo') || 
                          norm.includes('ray rem') || 
                          norm.includes('thanh ray') || 
                          norm.includes('ray truot') || 
                          norm.includes('motor') || 
                          norm.includes('dong co') || 
                          norm.includes('rem tu dong') || 
                          norm.includes('smart motor') || 
                          norm.includes('phu kien rem') ||
                          norm.includes('ray treo') ||
                          norm.includes('thanh keo') ||
                          norm.includes('treo rem');

  if (isThanhRemQuery) {
    const isAuto = norm.includes('tu dong') || norm.includes('smart') || norm.includes('dien thoai') || norm.includes('giong noi') || norm.includes('motor') || norm.includes('dong co') || norm.includes('app');
    const chosenRod = isAuto 
      ? CURTAIN_PROFILES.find(c => c.id === 13) 
      : (CURTAIN_PROFILES.find(c => c.id === 14) || CURTAIN_PROFILES.find(c => c.id === 13));

    const rodNarrative = `TƯ VẤN CHUYÊN GIA: TẠI SAO BẮT BUỘC PHẢI CHỌN THANH RÈM VÀ ĐỘNG CƠ CAO CẤP CHO CĂN PHÒNG

1. Vai trò cốt lõi của thanh rèm trong không gian:
Thanh rèm được ví như bộ xương sống quyết định 50% độ êm ái, thẩm mỹ và tuổi thọ của cả bộ rèm. Dù vải rèm có cao cấp đến đâu nhưng nếu lắp trên thanh ray kém chất lượng, sau một thời gian ray sẽ bị xệ máng, rít kẹt bi và phát ra tiếng ồn khó chịu khi kéo.

2. Tại sao thanh treo giá rẻ truyền thống KHÔNG ĐẠT YÊU CẦU:
Các thanh nhôm mỏng thông thường trên thị trường rất nhanh bị rỉ sét, bi trượt nhanh mòn và không chịu được tải trọng của các dòng rèm vải cao cấp dày dặn. Hơn nữa, việc kéo tay thủ công mỗi ngày dễ làm xô lệch sóng rèm và tốn công sức.

3. Tại sao bạn BẮT BUỘC PHẢI CHỌN thanh rèm này:
${chosenRod.whyChoose}`;

    return {
      delayMs: 5500,
      curtain: chosenRod,
      text: `${rodNarrative}\n\nChuyên gia tư vấn UniVeloria khẳng định: ${chosenRod.name} (${chosenRod.badge}) là trang bị chuẩn mực nâng tầm toàn bộ không gian phòng của bạn:`
    };
  }

  // 7. PHÂN TÍCH CHUYÊN SÂU: HƯỚNG MẶT TRỜI, HƯỚNG GIÓ, ÁNH SÁNG & VỊ TRÍ CĂN PHÒNG
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

  // Lọc chỉ chấm điểm các mẫu RÈM (không gán ngẫu nhiên thanh rèm khi hỏi về rèm)
  const curtainPool = CURTAIN_PROFILES.filter(c => c.category !== 'Thanh rèm');

  const scored = curtainPool.map(item => {
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
    chosen = curtainPool[Math.floor(Math.random() * curtainPool.length)];
  }

  // TỔNG HỢP LUẬN ĐIỂM TƯ VẤN CHUYÊN GIA: TẠI SAO BẮT BUỘC PHẢI CHỌN LOẠI RÈM NÀY
  let narrative = '';

  if (isWest) {
    narrative = `TƯ VẤN CHUYÊN GIA: TẠI SAO BẠN BẮT BUỘC PHẢI CHỌN LOẠI RÈM NÀY CHO CĂN PHÒNG PHÍA TÂY

1. Thực trạng khắc nghiệt của căn phòng phía Tây:
• Hướng Mặt Trời: Đón nhận trọn vẹn ánh nắng chiều gay gắt từ 13h00 đến 17h30 với góc chiếu xiên thấp chiếu sâu vào lòng phòng, bức xạ nhiệt cực đại khiến căn phòng dễ bị tích nhiệt (om nhiệt), hầm hập và chói lóa mắt dữ dội.
• Hướng Gió: Mùa hè thường chịu gió Tây Nam khô nóng (gió Lào/gió phơn), độ ẩm thấp, dễ làm không khí trong phòng ngột ngạt và làm cong vênh, bạc màu đồ gỗ nội thất.

2. Tại sao rèm thông thường KHÔNG THỂ đáp ứng:
Nếu bạn dùng các loại rèm vải mỏng, rèm voan hoặc rèm cuốn thông thường, ánh nắng và tia cực tím vẫn xuyên qua lớp vải, biến tấm rèm thành một tấm hấp nhiệt làm căn phòng nóng hơn và tuổi thọ rèm chỉ được vài tháng là giòn mục.

3. Tại sao bạn BẮT BUỘC PHẢI CHỌN loại rèm này:
Căn phòng phía Tây bắt buộc phải có rèm cản sáng từ 94% đến 100% Blackout với kết cấu dệt đa lớp hoặc lớp bọt Foam cách nhiệt để tạo màng chắn nhiệt độc lập, hạ nhiệt độ phòng từ 3 - 5°C so với bên ngoài.

Lý do then chốt chuyên gia tư vấn cho căn phòng này:
${chosen.whyChoose}`;
  } else if (isEast) {
    narrative = `TƯ VẤN CHUYÊN GIA: TẠI SAO BẠN BẮT BUỘC PHẢI CHỌN LOẠI RÈM NÀY CHO CĂN PHÒNG PHÍA ĐÔNG

1. Đặc thù vi khí hậu của căn phòng phía Đông:
• Hướng Mặt Trời: Đón nhận ánh nắng trực diện vào sáng sớm từ 6h00 đến 10h30 (bình minh). Ánh sáng sớm có cường độ chói mắt khi vừa thức giấc nhưng tắt nắng nhanh, từ sau 11h phòng trở nên râm mát.
• Hướng Gió: Đón gió Đông mát mẻ vào buổi sáng, không khí trong lành và lưu thông tự nhiên rất tốt.

2. Tại sao rèm 1 lớp truyền thống KHÔNG PHÙ HỢP:
Nếu bạn dùng rèm cuốn cản sáng 100% kín mít, sau khi thức dậy bạn phải kéo hết rèm lên, căn phòng sẽ mất đi sự riêng tư và bị nhìn từ bên ngoài. Nếu dùng rèm quá mỏng thì bạn sẽ bị chói mắt không thể ngủ tiếp vào sáng sớm.

3. Tại sao bạn BẮT BUỘC PHẢI CHỌN loại rèm này:
Căn phòng phía Đông bắt buộc phải sử dụng rèm có cơ chế điều tiết ánh sáng linh hoạt đa tầng: sáng sớm xoay nan so le cản chói để ngủ ngon, sau đó xoay trùng nan để đón trọn luồng gió Đông mát rượi và ánh sáng tự nhiên dịu nhẹ mà không cần kéo rèm lên.

Lý do then chốt chuyên gia tư vấn cho căn phòng này:
${chosen.whyChoose}`;
  } else if (isSouth) {
    narrative = `TƯ VẤN CHUYÊN GIA: TẠI SAO BẠN BẮT BUỘC PHẢI CHỌN LOẠI RÈM NÀY CHO CĂN PHÒNG PHÍA NAM

1. Ưu thế tự nhiên của căn phòng phía Nam:
• Hướng Mặt Trời: Đây là hướng đắc địa nhất trong kiến trúc vì tránh được ánh nắng chiếu trực diện gay gắt quanh năm. Ánh sáng mặt trời chiếu nghiêng ổn định, dịu êm và chan hòa từ sáng đến chiều.
• Hướng Gió: Đón trọn luồng gió nồm Đông Nam mát rượi vào mùa hè, ấm áp vào mùa đông và lưu thông không khí tuyệt vời.

2. Tại sao rèm thô cứng hoặc quá dày KHÔNG NÊN DÙNG:
Nếu bạn chọn các dòng rèm cuốn tối màu hoặc rèm văn phòng cứng nhắc, bạn sẽ vô tình triệt tiêu toàn bộ ưu thế đón gió mát lành và làm không gian trở nên bí bách, mất đi tính thẩm mỹ bề thế của ngôi nhà.

3. Tại sao bạn BẮT BUỘC PHẢI CHỌN loại rèm này:
Căn phòng phía Nam cần loại rèm tôn vinh tính thẩm mỹ cao cấp, có chất liệu dệt tự nhiên mềm mại, sóng rèm đổ bồng bềnh lướt nhẹ theo làn gió nồm để tối ưu hóa sự thông thoáng và mang lại cảm giác nghỉ dưỡng chuẩn 5 sao.

Lý do then chốt chuyên gia tư vấn cho căn phòng này:
${chosen.whyChoose}`;
  } else if (isNorth) {
    narrative = `TƯ VẤN CHUYÊN GIA: TẠI SAO BẠN BẮT BUỘC PHẢI CHỌN LOẠI RÈM NÀY CHO CĂN PHÒNG PHÍA BẮC

1. Thách thức không gian của căn phòng phía Bắc:
• Hướng Mặt Trời: Quanh năm hầu như không có ánh nắng mặt trời chiếu trực tiếp, ánh sáng khuếch tán yếu khiến căn phòng có cảm giác hơi tối và tĩnh mịch.
• Hướng Gió: Mùa đông hứng trọn gió mùa Đông Bắc (gió bấc) lạnh buốt, hanh khô, làm nhiệt độ trong phòng hạ thấp và có cảm giác lạnh lẽo.

2. Tại sao rèm tối màu hoặc mỏng manh KHÔNG PHÙ HỢP:
Rèm tối màu sẽ làm căn phòng hướng Bắc càng thêm u tối, ngột ngạt. Còn rèm quá mỏng sẽ không cản được gió lùa mùa đông, khiến căn phòng bị thất thoát nhiệt sưởi ấm.

3. Tại sao bạn BẮT BUỘC PHẢI CHỌN loại rèm này:
Căn phòng phía Bắc bắt buộc cần dòng rèm có tone màu ấm áp (vàng kem, be ấm, nâu gỗ) để cân bằng thị giác, mang sinh khí ấm cúng và có độ đan khít dày dặn để ngăn gió lạnh mùa đông lùa qua khe cửa mà vẫn đảm bảo độ thoáng sáng cho căn phòng.

Lý do then chốt chuyên gia tư vấn cho căn phòng này:
${chosen.whyChoose}`;
  } else if (hasWindOrSunQuery) {
    narrative = `TƯ VẤN CHUYÊN GIA: NGUYÊN TẮC CHỌN RÈM THEO HƯỚNG MẶT TRỜI, HƯỚNG GIÓ & ÁNH SÁNG

1. Hướng Tây (Nắng chiều gay gắt, gió Tây Nam khô nóng): Bắt buộc chọn rèm cản sáng 95% - 100% có lớp cách nhiệt chống nóng (Rèm Cuốn Moon 100% Blackout, Rèm Cầu Vồng Dragon.E 95%).
2. Hướng Đông (Nắng sớm ban mai, gió Đông mát mẻ): Bắt buộc chọn rèm điều chỉnh nan linh hoạt để cản chói sáng sớm và đón gió ban ngày (Rèm Cầu Vồng River.E, Rèm Cuốn Sunny lọc sáng tự nhiên).
3. Hướng Nam (Ánh sáng chan hòa, gió nồm mát rượi): Bắt buộc chọn rèm vải sóng chữ S bồng bềnh hoặc rèm cuốn thanh lịch, tối ưu thông gió (Rèm Vải Elogi 1198-2, Elogi 1206-1 sợi lanh).
4. Hướng Bắc (Thiếu nắng trực tiếp, gió mùa Đông Bắc lạnh): Bắt buộc chọn rèm tone màu ấm áp, cản gió lùa giữ nhiệt (Rèm Vải Elogi 1230-1 Japandi tone vàng cát, Rèm Cầu Vồng Brioni.E vân gỗ ấm).`;
  } else if (isLivingRoom && isWood) {
    narrative = `TƯ VẤN CHUYÊN GIA: TẠI SAO BẠN BẮT BUỘC PHẢI CHỌN LOẠI RÈM NÀY CHO PHÒNG KHÁCH ĐỒ GỖ

1. Yêu cầu phối hợp chất liệu và kiến trúc:
Phòng khách có nhiều nội thất gỗ đòi hỏi sự đồng điệu về sắc độ và chất cảm bề mặt. Nếu dùng rèm vải trơn công nghiệp đơn điệu sẽ làm không gian mất đi chiều sâu sang trọng.

2. Tại sao bạn BẮT BUỘC PHẢI CHỌN loại rèm này:
${chosen.whyChoose}`;
  } else if (isWorkRoom) {
    narrative = `TƯ VẤN CHUYÊN GIA: TẠI SAO BẠN BẮT BUỘC PHẢI CHỌN LOẠI RÈM NÀY CHO GÓC LÀM VIỆC

1. Yêu cầu công năng & bảo vệ thị giác:
Góc làm việc cần kiểm soát ánh sáng chống chói lóa màn hình tuyệt đối, đồng thời thiết kế phải gọn gàng, không chiếm dụng diện tích bàn làm việc.

2. Tại sao bạn BẮT BUỘC PHẢI CHỌN loại rèm này:
${chosen.whyChoose}`;
  } else if (isBedRoom) {
    narrative = `TƯ VẤN CHUYÊN GIA: TẠI SAO BẠN BẮT BUỘC PHẢI CHỌN LOẠI RÈM NÀY CHO PHÒNG NGỦ

1. Tiêu chuẩn sinh học cho giấc ngủ chất lượng cao:
Phòng ngủ đòi hỏi khả năng chắn sáng tối ưu để kích thích cơ thể sản sinh melatonin tự nhiên cho giấc ngủ sâu, kết hợp tính năng cản nhiệt và giảm thiểu tiếng ồn từ môi trường.

2. Tại sao bạn BẮT BUỘC PHẢI CHỌN loại rèm này:
${chosen.whyChoose}`;
  } else if (isLivingRoom) {
    narrative = `TƯ VẤN CHUYÊN GIA: TẠI SAO BẠN BẮT BUỘC PHẢI CHỌN LOẠI RÈM NÀY CHO PHÒNG KHÁCH

1. Bộ mặt thẩm mỹ và phong thủy của ngôi nhà:
Phòng khách cần sự bề thế, linh hoạt lấy sáng tự nhiên đón vượng khí và tạo cảm giác ấm cúng, trang nhã khi tiếp đón bạn bè người thân.

2. Tại sao bạn BẮT BUỘC PHẢI CHỌN loại rèm này:
${chosen.whyChoose}`;
  } else if (isApartment) {
    narrative = `TƯ VẤN CHUYÊN GIA: TẠI SAO BẠN BẮT BUỘC PHẢI CHỌN LOẠI RÈM NÀY CHO CĂN HỘ CHUNG CƯ

1. Tối ưu không gian và phong cách sống hiện đại:
Căn hộ chung cư đòi hỏi giải pháp rèm tiết kiệm diện tích, hạn chế bám bụi từ gió tầng cao và mang lại sự trẻ trung, tiện dụng hàng ngày.

2. Tại sao bạn BẮT BUỘC PHẢI CHỌN loại rèm này:
${chosen.whyChoose}`;
  } else {
    narrative = `TƯ VẤN CHUYÊN GIA: PHÂN TÍCH GIẢI PHÁP RÈM TỐI ƯU CHO CĂN PHÒNG CỦA BẠN

Sau khi phân tích toàn diện về vị trí phòng, hướng nắng, hướng gió và công năng sử dụng, chuyên gia tư vấn UniVeloria chỉ ra lý do bạn bắt buộc phải chọn mẫu rèm này:
${chosen.whyChoose}`;
  }

  const responseText = `${narrative}\n\nChuyên gia tư vấn UniVeloria khẳng định: ${chosen.name} (${chosen.badge}) là giải pháp chuẩn xác và tối ưu nhất cho căn phòng của bạn:`;

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
    { icon: '🔍', title: 'Thẩm định không gian', text: 'Đang phân tích vị trí phòng, kiến trúc cửa sổ & vi khí hậu...' },
    { icon: '☀️', title: 'Đánh giá hướng nắng & gió', text: 'Đang tính toán góc nắng, bức xạ nhiệt & lưu thông khí tươi...' },
    { icon: '🧵', title: 'Đối chiếu vật liệu & kỹ thuật', text: 'Đang thẩm định mật độ sợi dệt, độ cản sáng & hệ ray rèm...' },
    { icon: '🎯', title: 'Xác lập luận điểm tư vấn', text: 'Đang hoàn thiện lý do tại sao bắt buộc phải chọn dòng sản phẩm này...' }
  ];

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào! Tôi là Chuyên gia Tư vấn Không gian Rèm UniVeloria ☁️✨ Hãy cho tôi biết về căn phòng của bạn (vị trí phòng, hướng cửa sổ, hướng nắng, hướng gió, phong cách nội thất, hoặc nhu cầu thanh rèm / động cơ tự động...). Tôi sẽ thẩm định chuyên môn và tư vấn chính xác tại sao bạn bắt buộc phải chọn loại rèm này cho căn phòng của mình!',
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
    { label: '🌅 Căn phòng phía tây nắng gắt chiều', text: 'Tôi cần tư vấn rèm cho căn phòng phía tây, hướng nắng chiều gay gắt và om nhiệt, tại sao nên chọn loại rèm cản nhiệt chuyên dụng?' },
    { label: '☀️ Căn phòng phía đông đón nắng sớm', text: 'Tôi cần tư vấn rèm cho căn phòng phía đông bị chói mắt lúc bình minh, cần loại rèm điều tiết sáng và đón gió ban ngày.' },
    { label: '🍃 Căn phòng phía nam đón gió mát', text: 'Tôi cần tư vấn rèm cho căn phòng phía nam lộng gió mát quanh năm, loại rèm nào tối ưu độ thông thoáng và thẩm mỹ?' },
    { label: '❄️ Căn phòng phía bắc cần giữ ấm', text: 'Tôi cần tư vấn rèm cho căn phòng phía bắc ít nắng và mùa đông có gió lạnh, loại rèm nào cân bằng thị giác và cản gió tốt?' },
    { label: '⚡ Tư vấn thanh rèm & động cơ tự động', text: 'Tư vấn cho tôi về thanh rèm và động cơ rèm tự động thông minh, tại sao bắt buộc phải chọn thanh ray cao cấp?' }
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
                <strong className="chatbot-header-title">Chuyên Gia Tư Vấn Không Gian Rèm</strong>
                <small className="chatbot-header-sub">UniVeloria AI · Chuyên gia tư vấn</small>
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
                          <span>Tư vấn phương án khác cho căn phòng</span>
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
                💡 Tình huống tư vấn thực tế:
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
              placeholder={isTyping ? "Chuyên gia AI đang phân tích dữ liệu không gian..." : "Kể về căn phòng (phía tây nắng gắt, phòng khách đồ gỗ, cần thanh ray rèm...)"}
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

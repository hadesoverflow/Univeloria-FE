import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ExternalLink, Dices } from 'lucide-react';

// =============================================================================
// HỒ SƠ 3 DÒNG RÈM CHÍNH THỨC + 2 MẪU THANH RÈM/ĐỘNG CƠ THÔNG MINH
// 1. Duo Onyx Blackout (Rèm Cầu Vồng)
// 2. Shade Solis (Rèm Cuốn)
// 3. Drape Elysia (Rèm Vải)
// =============================================================================
export const CURTAIN_PROFILES = [
  {
    id: 1,
    studioId: 'rainbow-brioni',
    name: 'Duo Onyx Blackout',
    category: 'Rèm cầu vồng',
    price: 740000,
    priceDisplay: 'Từ 740.000đ / m²',
    image: '/product/Rèm/Rèm Cầu Vòng/Duo Onyx Blackout.png',
    badge: 'Cản sáng 94%',
    story: 'Bề mặt vân dệt gỗ xước ngang tự nhiên Wood-grain mang đến sự trầm ấm, sang trọng và khả năng cản sáng đến 94%. Cơ chế nan 2 lớp so le xoay lật 180 độ điều chỉnh ánh sáng linh hoạt, vừa riêng tư vừa thoáng đãng.',
    whyChoose: 'Bề mặt dệt xước vân gỗ Wood-grain với độ dày sợi cao cấp giúp cản sáng 94% và hạ nhiệt tối ưu. Nếu căn phòng của bạn có nhiều nội thất gỗ, rèm cầu vồng tạo nên sự đồng điệu mộc mạc, tôn vinh đẳng cấp đồ gỗ và bảo vệ bề mặt nội thất không bị bạc màu do tia cực tím.',
    pros: [
      'Bề mặt vân dệt gỗ Wood-grain tự nhiên, mang lại sự sang trọng mộc mạc và đồng điệu với đồ gỗ.',
      'Khả năng cản sáng 94% và hạ nhiệt tối ưu, ngăn tia bức xạ cực tím làm bạc màu nội thất.',
      'Cơ chế nan 2 lớp so le xoay lật 180 độ điều chỉnh ánh sáng linh hoạt, giữ trọn sự riêng tư.'
    ],
    keywords: ['cau vong', 'rainbow', 'duo', 'onyx', 'blackout', 'riviera', 'eclipse', 'orion', 'van go', 'go', 'nau', 'am cung', 'sang trong', 'can sang', 'ngu', 'phong ngu', 'rieng tu', 'huong tay', 'nang chieu', 'nang gat']
  },
  {
    id: 9,
    studioId: 'roller-sunny',
    name: 'Shade Solis',
    category: 'Rèm cuốn',
    price: 550000,
    priceDisplay: 'Từ 550.000đ / m²',
    image: '/product/Rèm/Rèm Cuốn/Shade Solis.png',
    badge: 'Lọc Sáng Tự Nhiên',
    story: 'Đón trọn ánh nắng ban mai với mắt lưới Micro Sunscreen lọc sáng dịu mát, cản 95% tia UV nhưng vẫn giữ trọn 100% tầm nhìn view khoáng đạt. Thiết kế cuộn gọn gàng tuyệt đối trong hộp máng, tiết kiệm diện tích tối ưu cho khung cửa sổ.',
    whyChoose: 'Mắt lưới Micro Sunscreen lọc sáng dịu mát, ngăn 95% tia UV độc hại nhưng vẫn giữ trọn 100% tầm nhìn ngắm cảnh thiên nhiên. Với thiết kế cuộn gọn ghẽ giải phóng hoàn toàn diện tích cửa sổ, rèm cuốn là giải pháp tối ưu cho phòng làm việc, căn hộ chung cư hoặc cửa sổ view đẹp cần sự gọn gàng, tinh tế.',
    pros: [
      'Mắt lưới Micro Sunscreen lọc sáng dịu mát, ngăn 95% tia UV độc hại nhưng giữ trọn 100% tầm nhìn view.',
      'Cuộn lên gọn gàng 100% trong hộp máng, tiết kiệm diện tích tối ưu cho khung cửa sổ nhỏ.',
      'Sợi thủy tinh phủ nhựa PVC chống chịu thời tiết, dễ lau chùi vệ sinh và độ bền bỉ cao.'
    ],
    keywords: ['cuon', 'roller', 'shade', 'solis', 'luna', 'aria', 'elara', 'melange', 'sunny', 'loc sang', 'ngam canh', 'ban cong', 'view', 'gon gang', 'nho', 'dien tich nho', 'lam viec', 'van phong', 'chung cu', 'can ho', 'dong', 'huong dong', 'nang som']
  },
  {
    id: 10,
    studioId: 'elogi-1198-2',
    name: 'Drape Elysia',
    category: 'Rèm vải',
    price: 780000,
    priceDisplay: 'Từ 780.000đ / m²',
    image: '/product/Rèm/Rèm Vải/Drape Elysia.png',
    badge: 'Chuẩn Khách Sạn 5 Sao',
    story: 'Chuẩn mực khách sạn 5 sao cho những khung cửa kính rộng lớn: Rèm vải sở hữu nếp gấp sóng rèm bồng bềnh lượn sóng đều đặn từ trần xuống sàn. Sợi gấm dệt thô cao cấp phong cách Nhật Bản cản sáng 95%, tôn vinh vẻ trang nhã, bề thế cho phòng khách biệt thự.',
    whyChoose: 'Kỹ thuật may sóng chữ S bồng bềnh từ trần xuống sàn chuẩn khách sạn 5 sao kết hợp sợi gấm dệt thô phong cách Nhật Bản cản sáng 95%. Với các khung cửa kính lớn ở phòng khách biệt thự hoặc phòng ngủ cần sự êm ái, chỉ có độ rủ mềm mại bề thế của Rèm Vải mới xứng tầm định hình đẳng cấp kiến trúc và tiêu âm tĩnh lặng.',
    pros: [
      'May sóng chữ S bồng bềnh từ trần xuống sàn chuẩn khách sạn 5 sao, bề thế và sang trọng.',
      'Sợi gấm dệt thô cao cấp phong cách Nhật Bản cản sáng 95%, cách nhiệt và tiêu âm vượt trội.',
      'Định hình chuẩn mực kiến trúc cho phòng khách biệt thự và các khung cửa kính lớn.'
    ],
    keywords: ['vai', 'rem vai', 'drape', 'elysia', 'celeste', 'aurelia', 'elogi', 'cua lon', 'phong khach', 'khach san', '5 sao', 'song rem', 'nhat ban', 'be the', 'trang nha', 'sang trong', 'phong ngu', 'nam', 'huong nam', 'bac', 'huong bac']
  },
  {
    id: 13,
    studioId: 'elogi-1198-2',
    name: 'Smart Automation A25 Pro',
    category: 'Thanh rèm',
    price: 2800000,
    priceDisplay: 'Từ 2.800.000đ / bộ',
    image: '/product/Thanh Rèm/Smart Automation A25 Pro.png',
    badge: 'Smart Motor Tự Động',
    story: 'Đỉnh cao công nghệ Smart Home cho rèm cửa: Động cơ siêu tĩnh âm <25dB công nghệ Đức, hỗ trợ kéo tay nhẹ Touch Motion và điều khiển giọng nói qua Apple HomeKit / Google Assistant. Thanh ray nhôm hàng không 6063-T5 chịu tải 60kg, tự động đóng mở theo lịch trình mỗi ngày.',
    whyChoose: 'Smart Automation A25 Pro giải phóng hoàn toàn sức lao động, nâng cấp căn phòng thành không gian sống thông minh đẳng cấp quốc tế. Động cơ không chổi than Brushless siêu êm không phát ra tiếng ồn (<25dB), tải trọng cực đại 60kg cho mọi bộ rèm vải dày, tính năng kéo tay nhẹ tự chạy (Touch Motion) và bảo hành đổi mới 5 năm chính hãng.',
    pros: [
      'Động cơ Brushless không chổi than siêu tĩnh âm <25dB công nghệ Đức, không phát ra tiếng ồn.',
      'Tích hợp thông minh: Kéo tay nhẹ tự chạy (Touch Motion), điều khiển Apple HomeKit / Google Assistant.',
      'Thanh ray nhôm hàng không 6063-T5 tải trọng 60kg, bảo hành đổi mới 5 năm chính hãng.'
    ],
    keywords: ['thanh rem', 'thanh ray', 'dong co', 'tu dong', 'smart', 'motor', 'homekit', 'google', 'dieu khien', 'ray rem', 'ray tu dong', 'thanh treo', 'a25', 'automation']
  },
  {
    id: 14,
    studioId: 'elogi-1198-2',
    name: 'Smart Automation R25',
    category: 'Thanh rèm',
    price: 2500000,
    priceDisplay: 'Từ 2.500.000đ / bộ',
    image: '/product/Thanh Rèm/Smart Automation R25.png',
    badge: 'Ray Bi Teflon Siêu Mượt',
    story: 'Hệ rãnh trượt bi con lăn phủ hạt nhựa Teflon tự bôi trơn siêu êm ái, kéo rèm lướt nhẹ như nhung không phát ra tiếng động. Nhôm đúc nguyên khối chịu lực uốn cong 90 độ hoặc bo tròn theo góc cửa sổ vòng cung, độ bền trên 15 năm.',
    whyChoose: 'Smart Automation R25 khắc phục triệt để hiện tượng kẹt rít, võng ray của các loại thanh treo thông thường. Hệ bi phủ hạt nhựa Teflon tự bôi trơn giúp rèm vải nặng lướt êm ái như nhung, kết hợp khả năng uốn góc 90 độ theo kiến trúc cửa sổ bo cong với độ bền trên 15 năm mà không cần bảo dưỡng.',
    pros: [
      'Hệ rãnh trượt con lăn phủ hạt nhựa Teflon tự bôi trơn siêu êm ái, kéo nhẹ như lướt trên nhung.',
      'Uốn cong 90 độ hoặc bo tròn góc cửa sổ vòng cung linh hoạt theo mọi kiến trúc.',
      'Nhôm đúc nguyên khối chịu tải 60kg, độ bền trên 15 năm không lo xệ máng hay kẹt rít.'
    ],
    keywords: ['thanh rem', 'thanh treo', 'ray rem', 'ray bi', 'teflon', 'sieu muot', 'uon cong', 'keo tay', 'ben bi', 'phu kien', 'thanh ray co', 'r25']
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
// AI ANALYSIS ENGINE: ĐỐI THOẠI TƯƠNG TÁC THÔNG MINH (3 DÒNG RÈM CHÍNH THỨC)
// - 3 dòng rèm: Rèm Cầu Vồng, Rèm Cuốn, Rèm Vải
// - Tương tác tự nhiên qua chat chữ (không nút bấm)
// - Không tự ý đưa thanh rèm trừ khi được hỏi
// - Đầy đủ 3 phần: Mức độ phù hợp, Tại sao chọn nó, Mặt tốt của nó
// =============================================================================
export function analyzeUserMessage(rawInput, context = {}, currentCurtainId = null) {
  const trimmed = (rawInput || '').trim();
  const norm = normalizeText(trimmed);

  // 1. Phân tích nhu cầu về THANH RÈM / ĐỘNG CƠ TỰ ĐỘNG
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

    const rodText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP THANH RÈM & ĐỘNG CƠ CAO CẤP CHO CĂN PHÒNG

1. Công năng của nó:
${chosenRod.story}

2. Tại sao bạn bắt buộc phải chọn nó:
${chosenRod.whyChoose}

3. Nó giúp ích được gì cho không gian sống:
${chosenRod.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria khẳng định: ${chosenRod.name} (${chosenRod.badge}) là trang bị chuẩn mực quyết định 50% độ êm ái và đẳng cấp cho toàn bộ hệ thống rèm của bạn:`;

    return {
      type: 'rod_consultation',
      delayMs: 4500,
      curtain: chosenRod,
      text: rodText,
      updatedContext: { ...context, lastCurtainId: chosenRod.id }
    };
  }

  // 2. Yêu cầu ĐỔI MẪU KHÁC / MẪU NÀY KHÔNG PHÙ HỢP
  const isChangeRequest = norm.includes('doi mau') ||
                          norm.includes('mau khac') ||
                          norm.includes('khong thich') ||
                          norm.includes('khong hop') ||
                          norm.includes('khong phu hop') ||
                          norm.includes('chua hop') ||
                          norm.includes('chua ung') ||
                          norm.includes('xem mau khac') ||
                          norm.includes('mau khac di') ||
                          norm.includes('dat qua') ||
                          norm.includes('toi qua') ||
                          norm.includes('don gian qua') ||
                          norm.includes('random') ||
                          norm.includes('ngau nhien');

  if (isChangeRequest) {
    const curId = currentCurtainId || context.lastCurtainId;
    const excludedIds = [curId, ...(context.recommendedCurtainIds || [])].filter(Boolean);
    const curtainPool = CURTAIN_PROFILES.filter(c => c.category !== 'Thanh rèm');
    let pool = curtainPool.filter(c => !excludedIds.includes(c.id));
    if (pool.length === 0) pool = curtainPool.filter(c => c.id !== curId);
    if (pool.length === 0) pool = curtainPool;

    const chosenAlt = pool[Math.floor(Math.random() * pool.length)];
    const roomLabel = context.room?.label || 'căn phòng';

    const altText = `Tôi rất hiểu cảm nhận của bạn! Mỗi không gian sống đều có gu thẩm mỹ riêng, nếu mẫu vừa rồi chưa thực sự đúng gu hoặc bạn cảm thấy chưa phù hợp với căn phòng, tôi xin tiếp thu phản hồi và thẩm định ngay phương án thay thế với ngôn ngữ thiết kế hoàn toàn khác biệt:

TƯ VẤN PHƯƠNG ÁN THAY THẾ: GIẢI PHÁP RÈM PHÙ HỢP HƠN CHO ${roomLabel.toUpperCase()}

1. Mức độ phù hợp với không gian:
Phương án này khắc phục cảm giác chưa ưng ý của mẫu trước, mang đến diện mạo mới mẻ, thanh thoát hơn nhưng vẫn đảm bảo tối ưu bài toán cản nhiệt và ánh sáng cho phòng.

2. Tại sao bạn bắt buộc phải chọn sản phẩm này:
${chosenAlt.whyChoose}

3. Mặt tốt & Ưu điểm vượt trội của sản phẩm:
${chosenAlt.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria khẳng định: ${chosenAlt.name} (${chosenAlt.badge}) là phương án thay thế chuẩn mực giúp hoàn thiện không gian sống của bạn:`;

    return {
      type: 'alternative_curtain',
      delayMs: 4800,
      curtain: chosenAlt,
      text: altText,
      updatedContext: {
        ...context,
        lastCurtainId: chosenAlt.id,
        recommendedCurtainIds: [...(context.recommendedCurtainIds || []), chosenAlt.id]
      }
    };
  }

  // 3. Cảm ơn / Tạm biệt (Thanks / Farewell)
  const thanksWords = ['cam on', 'thank', 'tuyet voi', 'hay qua', 'ok shop', 'tam biet', 'bye'];
  if (thanksWords.some(w => norm.includes(w)) && !norm.includes('phong') && !norm.includes('rem') && !norm.includes('nang')) {
    return {
      type: 'faq',
      delayMs: 1000,
      curtain: null,
      text: "Dạ không có gì ạ! Rất vui được đồng hành tư vấn không gian cùng bạn. Bất cứ khi nào bạn cần phân tích hướng nắng, chất liệu vải hay trải nghiệm phối cảnh rèm 3D thực tế, tôi luôn sẵn sàng hỗ trợ nhé. Chúc bạn một ngày thật an yên và nhiều năng lượng tích cực! 🌿✨"
    };
  }

  // 4. Báo giá / Cách tính giá (Price FAQ)
  if (norm.includes('gia') && (norm.includes('tinh') || norm.includes('bao nhieu') || norm.includes('bang gia') || norm.includes('met') || norm.includes('dat khong'))) {
    return {
      type: 'faq',
      delayMs: 1200,
      curtain: null,
      text: "Dạ giá rèm tại UniVeloria được niêm yết minh bạch và tính theo diện tích thực tế:\n• 🌟 Rèm Cuốn: Từ 395.000đ / m² (Gọn gàng, lọc sáng tự nhiên chống chói)\n• 🌈 Rèm Cầu Vòng: Từ 720.000đ / m² (Vân dệt gỗ sang trọng, cản sáng 94%)\n• 💎 Rèm Vải: Từ 780.000đ / m² (Sóng đổ bồng bềnh chuẩn khách sạn 5 sao)\n• ⚡ Thanh Ray & Động Cơ Thông Minh: Từ 2.500.000đ – 2.800.000đ / bộ (Smart Automation A25 Pro & R25)\n\nBạn hãy chia sẻ về căn phòng của mình để tôi tư vấn phương án kỹ thuật chuẩn xác và cùng bạn trải nghiệm mô phỏng 3D nhé!"
    };
  }

  // 5. TRÍCH XUẤT THÔNG TIN TỪ LỜI NHẮN
  let extractedRoom = null;
  if (norm.includes('phong ngu') || norm.includes('ngu') || norm.includes('master') || norm.includes('em be') || norm.includes('vo chong')) {
    extractedRoom = { key: 'bedroom', label: 'Phòng ngủ' };
  } else if (norm.includes('phong khach') || norm.includes('khach') || norm.includes('biet thu') || norm.includes('gian chinh')) {
    extractedRoom = { key: 'living', label: 'Phòng khách' };
  } else if (norm.includes('lam viec') || norm.includes('van phong') || norm.includes('doc sach') || norm.includes('ban lam viec')) {
    extractedRoom = { key: 'study', label: 'Phòng làm việc' };
  } else if (norm.includes('chung cu') || norm.includes('can ho') || norm.includes('studio')) {
    extractedRoom = { key: 'apartment', label: 'Căn hộ chung cư' };
  } else if (norm.includes('cua so chinh') || norm.includes('cua chinh') || norm.includes('vach kinh')) {
    extractedRoom = { key: 'main_window', label: 'Cửa sổ chính căn phòng' };
  } else if (norm.includes('cua so') || norm.includes('khung cua') || norm.includes('o cua')) {
    extractedRoom = { key: 'window', label: 'Cửa sổ căn phòng' };
  }

  let extractedStyle = null;
  if (norm.includes('sang trong') || norm.includes('dang cap') || norm.includes('5 sao') || norm.includes('quy toc') || norm.includes('chau au') || norm.includes('be the')) {
    extractedStyle = { key: 'luxury', label: 'Sang trọng' };
  } else if (norm.includes('don gian') || norm.includes('gon gang') || norm.includes('hien dai') || norm.includes('toi gian') || norm.includes('minimal')) {
    extractedStyle = { key: 'simple', label: 'Đơn giản' };
  } else if (norm.includes('toi uu') || norm.includes('can sang') || norm.includes('blackout') || norm.includes('chong nong') || norm.includes('cach nhiet') || norm.includes('toi hoan toan')) {
    extractedStyle = { key: 'blackout', label: 'Tối ưu phòng' };
  } else if (norm.includes('go') || norm.includes('van go') || norm.includes('nau') || norm.includes('am cung') || norm.includes('moc mac')) {
    extractedStyle = { key: 'wood', label: 'Ấm cúng vân gỗ' };
  } else if (norm.includes('loc sang') || norm.includes('ngam canh') || norm.includes('view') || norm.includes('ban cong')) {
    extractedStyle = { key: 'view', label: 'Lọc sáng tự nhiên' };
  }

  let extractedOrientation = null;
  if (norm.includes('tay') || norm.includes('phia tay') || norm.includes('huong tay') || norm.includes('nang chieu') || norm.includes('nang gat') || norm.includes('om nhiet') || norm.includes('tay bac') || norm.includes('tay nam')) {
    extractedOrientation = { key: 'west', label: 'Hướng Tây' };
  } else if (norm.includes('dong') || norm.includes('phia dong') || norm.includes('huong dong') || norm.includes('nang som') || norm.includes('binh minh') || norm.includes('dong bac') || norm.includes('dong nam')) {
    extractedOrientation = { key: 'east', label: 'Hướng Đông' };
  } else if (norm.includes('nam') || norm.includes('phia nam') || norm.includes('huong nam') || norm.includes('gio mat') || norm.includes('gio nom')) {
    extractedOrientation = { key: 'south', label: 'Hướng Nam' };
  } else if (norm.includes('bac') || norm.includes('phia bac') || norm.includes('huong bac') || norm.includes('gio lanh') || norm.includes('mua dong') || norm.includes('thieu sang')) {
    extractedOrientation = { key: 'north', label: 'Hướng Bắc' };
  } else if (norm.includes('khong biet') || norm.includes('khong ro') || norm.includes('sao cung duoc') || norm.includes('tuy') || norm.includes('mac dinh')) {
    extractedOrientation = { key: 'general', label: 'Căn phòng' };
  }

  // Kết hợp thông tin mới với context đã tích lũy qua các lượt chat trước
  const activeRoom = extractedRoom || context.room;
  const activeStyle = extractedStyle || context.style;
  const activeOrientation = extractedOrientation || context.orientation;

  // 6. XỬ LÝ LỜI NHẮN CHÀO HỎI / MỞ ĐẦU CHUNG CHUNG
  const greetingWords = ['alo', 'chao', 'xin chao', 'hello', 'hi', 'ad oi', 'shop oi', 'em oi', 'ban oi'];
  const isGreetingOnly = greetingWords.includes(norm);
  const isGenericIntent = norm.includes('mua rem') || norm.includes('tu van rem') || norm.includes('can mua') || norm.includes('can tu van') || norm === 'rem';

  // 6.1 Nếu người dùng chỉ chào hỏi ("Hello", "Alo") ở lượt đầu
  if (isGreetingOnly && !activeRoom && !activeStyle && !activeOrientation) {
    return {
      type: 'question',
      delayMs: 800,
      curtain: null,
      text: "Dạ UniVeloria xin chào bạn! Tôi là Chuyên gia Tư vấn Không gian Rèm AI ☁️✨\n\nĐể chọn được bộ rèm ưng ý và chuẩn xác nhất, bạn đang muốn lắp rèm cho căn phòng nào (như phòng ngủ, phòng khách, phòng làm việc hay căn hộ...)? Hãy chia sẻ cho tôi biết nhé!",
      updatedContext: { ...context, hasGreeted: true, askedRoom: true }
    };
  }

  // 6.2 Nếu người dùng nhắn chung chung "Tôi muốn mua rèm"
  if (isGenericIntent && !extractedRoom && !extractedStyle && !extractedOrientation) {
    // Nếu Bot đã từng chào hoặc đã hỏi về phòng rồi mà người dùng vẫn nhắn "Tôi muốn mua rèm":
    // Người dùng muốn được gợi ý ngay -> Chủ động tư vấn ngay Rèm Cầu Vồng bán chạy số 1!
    if (context.hasGreeted || context.askedRoom) {
      const chosenDefault = CURTAIN_PROFILES.find(c => c.category === 'Rèm cầu vồng') || CURTAIN_PROFILES[0];
      const confirmText = `Tôi hiểu rồi! Để bạn không mất thời gian, tôi xin phép thẩm định và chọn ngay cho bạn mẫu ${chosenDefault.name} (Rèm Cầu Vồng) cao cấp đa năng, hoàn hảo cho cả phòng ngủ lẫn phòng khách. Bạn đợi tôi trong giây phút nhé!`;
      const finalText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP RÈM TỐI ƯU TOÀN DIỆN CHO CĂN PHÒNG

1. Mức độ phù hợp:
10/10 - Rất hoàn hảo cho không gian căn phòng. ${chosenDefault.name} sở hữu khả năng cản sáng 94%, cách nhiệt và cơ chế nan so le lấy sáng linh hoạt, đáp ứng hoàn hảo cho cả phòng ngủ cần sự tĩnh lặng lẫn phòng khách cần sự sang trọng, hiện đại.

2. Tại sao chọn nó:
${chosenDefault.whyChoose}

3. Mặt tốt của nó:
${chosenDefault.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria khẳng định: ${chosenDefault.name} (${chosenDefault.badge}) là giải pháp chuẩn xác và tối ưu nhất cho căn phòng của bạn:`;

      return {
        type: 'final_consultation',
        delayMs: 5000,
        confirmText,
        finalText,
        curtain: chosenDefault,
        updatedContext: {
          ...context,
          room: { key: 'general', label: 'Căn phòng' },
          style: { key: 'luxury', label: 'Sang trọng' },
          orientation: { key: 'west', label: 'Hướng nắng' },
          lastCurtainId: chosenDefault.id,
          recommendedCurtainIds: [...(context.recommendedCurtainIds || []), chosenDefault.id]
        }
      };
    }

    // Nếu chưa từng hỏi thì hỏi phòng một cách tự nhiên
    return {
      type: 'question',
      delayMs: 800,
      curtain: null,
      text: "Dạ vâng! Để chọn được bộ rèm ưng ý và chuẩn xác nhất, bạn đang muốn lắp rèm cho căn phòng nào (như phòng ngủ, phòng khách, phòng làm việc hay căn hộ...)? Hãy chia sẻ cho tôi biết nhé!",
      updatedContext: { ...context, hasGreeted: true, askedRoom: true }
    };
  }

  // 7. ĐỐI THOẠI TƯƠNG TÁC (HỎI TIẾP KHI THIẾU THÔNG TIN)
  // 7.1 Nếu chưa có thông tin về loại phòng
  if (!activeRoom) {
    return {
      type: 'question',
      delayMs: 800,
      curtain: null,
      text: "Bạn đang muốn lắp rèm cho căn phòng nào (như phòng ngủ, phòng khách, phòng làm việc hay căn hộ...)?",
      updatedContext: {
        ...context,
        hasGreeted: true,
        askedRoom: true,
        style: activeStyle,
        orientation: activeOrientation
      }
    };
  }

  // 7.2 Nếu đã có phòng nhưng chưa có phong cách mong muốn
  if (!activeStyle) {
    return {
      type: 'question',
      delayMs: 800,
      curtain: null,
      text: "Bạn muốn cái rèm trông như thế nào: Đơn giản hay sang trọng hoặc tối ưu phòng?",
      updatedContext: {
        ...context,
        hasGreeted: true,
        room: activeRoom,
        askedStyle: true,
        orientation: activeOrientation
      }
    };
  }

  // 7.3 Nếu đã có phòng và phong cách nhưng chưa có hướng cửa sổ
  if (!activeOrientation) {
    return {
      type: 'question',
      delayMs: 800,
      curtain: null,
      text: "Cửa sổ của bạn nằm ở hướng nào?",
      updatedContext: {
        ...context,
        hasGreeted: true,
        room: activeRoom,
        style: activeStyle,
        askedOrientation: true
      }
    };
  }

  // 8. ĐÃ ĐỦ DỮ LIỆU ĐỂ TƯ VẤN CHUYÊN GIA (CHỌN 1 TRONG 3 DÒNG RÈM CHÍNH THỨC)
  const curtainPool = CURTAIN_PROFILES.filter(c => c.category !== 'Thanh rèm');
  const scored = curtainPool.map(item => {
    let score = 0;

    // Khớp loại rèm trực tiếp nếu user gọi tên
    if ((norm.includes('cau vong') || norm.includes('rainbow') || norm.includes('duo') || norm.includes('onyx') || norm.includes('riviera') || norm.includes('eclipse') || norm.includes('orion')) && item.category === 'Rèm cầu vồng') score += 50;
    if ((norm.includes('cuon') || norm.includes('roller') || norm.includes('shade') || norm.includes('solis') || norm.includes('luna') || norm.includes('aria') || norm.includes('elara') || norm.includes('melange')) && item.category === 'Rèm cuốn') score += 50;
    if ((norm.includes('vai') || norm.includes('drape') || norm.includes('elysia') || norm.includes('celeste') || norm.includes('aurelia') || norm.includes('elogi')) && item.category === 'Rèm vải') score += 50;

    // Khớp hướng nắng & vi khí hậu
    if (activeOrientation.key === 'west') {
      if (item.category === 'Rèm cầu vồng') score += 36;
      if (item.category === 'Rèm vải') score += 24;
      if (item.category === 'Rèm cuốn') score += 18;
    } else if (activeOrientation.key === 'east') {
      if (item.category === 'Rèm cuốn') score += 36;
      if (item.category === 'Rèm cầu vồng') score += 22;
      if (item.category === 'Rèm vải') score += 20;
    } else if (activeOrientation.key === 'south' || activeOrientation.key === 'north') {
      if (item.category === 'Rèm vải') score += 36;
      if (item.category === 'Rèm cầu vồng') score += 26;
      if (item.category === 'Rèm cuốn') score += 20;
    }

    // Khớp phong cách & nhu cầu
    if (activeStyle.key === 'luxury') {
      if (item.category === 'Rèm vải') score += 36;
      if (item.category === 'Rèm cầu vồng') score += 26;
      if (item.category === 'Rèm cuốn') score += 16;
    } else if (activeStyle.key === 'simple') {
      if (item.category === 'Rèm cuốn') score += 36;
      if (item.category === 'Rèm cầu vồng') score += 22;
      if (item.category === 'Rèm vải') score += 16;
    } else if (activeStyle.key === 'blackout') {
      if (item.category === 'Rèm cầu vồng') score += 36;
      if (item.category === 'Rèm vải') score += 30;
      if (item.category === 'Rèm cuốn') score += 18;
    } else if (activeStyle.key === 'wood') {
      if (item.category === 'Rèm cầu vồng') score += 40;
    } else if (activeStyle.key === 'view') {
      if (item.category === 'Rèm cuốn') score += 40;
    }

    // Khớp loại phòng
    if (activeRoom.key === 'bedroom') {
      if (item.category === 'Rèm cầu vồng') score += 26;
      if (item.category === 'Rèm vải') score += 26;
      if (item.category === 'Rèm cuốn') score += 16;
    } else if (activeRoom.key === 'living' || activeRoom.key === 'main_window') {
      if (item.category === 'Rèm vải') score += 32;
      if (item.category === 'Rèm cầu vồng') score += 26;
      if (item.category === 'Rèm cuốn') score += 16;
    } else if (activeRoom.key === 'study' || activeRoom.key === 'apartment') {
      if (item.category === 'Rèm cuốn') score += 32;
      if (item.category === 'Rèm cầu vồng') score += 26;
      if (item.category === 'Rèm vải') score += 18;
    }

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const chosen = scored[0].item;

  const roomName = activeRoom.label;
  const styleName = activeStyle.label;
  const orientName = activeOrientation.label;

  const confirmText = `Tôi hiểu rồi bạn đợi tôi trong giây phút để tôi chọn cho bạn 1 cái rèm phù hợp với các yêu cầu ${styleName} thoải mái nhất cho bạn.`;

  // Luận điểm 1: Mức độ phù hợp
  let fitReason = '';
  if (chosen.category === 'Rèm cầu vồng') {
    fitReason = `10/10 - Rất hoàn hảo cho ${roomName} ${orientName}. Tấm rèm sở hữu bề mặt vân dệt gỗ Wood-grain sang trọng, khả năng cản sáng 94% và cơ chế nan 2 lớp so le xoay lật 180 độ điều chỉnh ánh sáng linh hoạt, bảo vệ đồ nội thất và giữ trọn sự riêng tư.`;
  } else if (chosen.category === 'Rèm cuốn') {
    fitReason = `10/10 - Rất hoàn hảo cho ${roomName} ${orientName}. Mắt lưới Micro Sunscreen lọc sáng dịu mát, ngăn 95% tia UV nhưng vẫn giữ trọn view ngắm cảnh khoáng đạt, thiết kế cuộn gọn ghẽ tối ưu 100% diện tích cửa sổ.`;
  } else {
    fitReason = `10/10 - Rất hoàn hảo cho ${roomName} ${orientName}. Kỹ thuật may sóng chữ S bồng bềnh từ trần xuống sàn chuẩn khách sạn 5 sao kết hợp sợi gấm Nhật Bản cản sáng 95%, cách âm tĩnh lặng và tôn vinh vẻ bề thế cho căn phòng.`;
  }

  const finalText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP ${chosen.name.toUpperCase()} TỐI ƯU CHO ${roomName.toUpperCase()} ${orientName.toUpperCase()}

1. Mức độ phù hợp:
${fitReason}

2. Tại sao chọn nó:
${chosen.whyChoose}

3. Mặt tốt của nó:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria khẳng định: ${chosen.name} (${chosen.badge}) là giải pháp chuẩn xác và tối ưu nhất cho căn phòng của bạn:`;

  return {
    type: 'final_consultation',
    delayMs: 5200,
    confirmText,
    finalText,
    curtain: chosen,
    updatedContext: {
      ...context,
      room: activeRoom,
      style: activeStyle,
      orientation: activeOrientation,
      lastCurtainId: chosen.id,
      recommendedCurtainIds: [...(context.recommendedCurtainIds || []), chosen.id]
    }
  };
}

export function FloatingPetdexChat({ navigateTo }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [facingLeft, setFacingLeft] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStageIdx, setThinkingStageIdx] = useState(0);

  // Quản lý ngữ cảnh tư vấn đàm thoại qua các lượt hội thoại
  const [consultationContext, setConsultationContext] = useState({
    room: null,
    style: null,
    orientation: null,
    lastCurtainId: null,
    recommendedCurtainIds: [],
    hasGreeted: false,
    askedRoom: false,
    askedStyle: false,
    askedOrientation: false
  });
  const contextRef = useRef(consultationContext);
  useEffect(() => {
    contextRef.current = consultationContext;
  }, [consultationContext]);

  const thinkingStages = [
    { icon: '🔍', title: 'Thẩm định không gian', text: 'Đang phân tích vị trí phòng, kiến trúc cửa sổ & vi khí hậu...' },
    { icon: '☀️', title: 'Đánh giá hướng nắng & gió', text: 'Đang tính toán góc nắng, bức xạ nhiệt & lưu thông khí tươi...' },
    { icon: '🧵', title: 'Đối chiếu vật liệu & kỹ thuật', text: 'Đang thẩm định mật độ sợi dệt, độ cản sáng & công năng vải...' },
    { icon: '🎯', title: 'Xác lập luận điểm tư vấn', text: 'Đang hoàn thiện lý do tại sao bắt buộc phải chọn dòng sản phẩm này...' }
  ];

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào! Tôi là Chuyên gia Tư vấn Không gian Rèm UniVeloria ☁️✨ Hãy cho tôi biết về căn phòng của bạn (vị trí phòng, hướng cửa sổ, hướng nắng, hướng gió, phong cách nội thất, hoặc nhu cầu thanh rèm / động cơ tự động...). Tôi sẽ thẩm định chuyên môn và trực tiếp tư vấn giải pháp rèm tối ưu nhất cho căn phòng của bạn!',
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

    const currentCtx = contextRef.current;
    const lastBotCurtain = [...messages].reverse().find(m => m.curtain)?.curtain?.studioId || null;
    const result = analyzeUserMessage(query, currentCtx, lastBotCurtain);

    if (result.type === 'question' || result.type === 'faq') {
      setIsTyping(false);
      const t = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: result.text,
            curtain: null
          }
        ]);
        if (result.updatedContext) {
          setConsultationContext(result.updatedContext);
        }
      }, result.delayMs || 800);
      timersRef.current = [t];
    } else if (result.type === 'final_consultation') {
      // 1. Phản hồi xác nhận đối thoại: "Tôi hiểu rồi bạn đợi tôi trong giây phút..."
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: result.confirmText,
          curtain: null
        }
      ]);

      // 2. Chuyển sang trạng thái suy nghĩ chuyên sâu từ 5-7s
      setIsTyping(true);
      setThinkingStageIdx(0);
      const delayMs = result.delayMs || 5200;
      const stepDuration = Math.floor(delayMs / 4);

      const t1 = setTimeout(() => setThinkingStageIdx(1), stepDuration);
      const t2 = setTimeout(() => setThinkingStageIdx(2), stepDuration * 2);
      const t3 = setTimeout(() => setThinkingStageIdx(3), stepDuration * 3);
      const tFinal = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: result.finalText,
            curtain: result.curtain
          }
        ]);
        setIsTyping(false);
        if (result.updatedContext) {
          setConsultationContext(result.updatedContext);
        }
      }, delayMs);

      timersRef.current = [t1, t2, t3, tFinal];
    } else {
      // Thanh rèm hoặc Đổi mẫu khác
      setIsTyping(true);
      setThinkingStageIdx(0);
      const delayMs = result.delayMs || 4800;
      const stepDuration = Math.floor(delayMs / 4);

      const t1 = setTimeout(() => setThinkingStageIdx(1), stepDuration);
      const t2 = setTimeout(() => setThinkingStageIdx(2), stepDuration * 2);
      const t3 = setTimeout(() => setThinkingStageIdx(3), stepDuration * 3);
      const tFinal = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: result.text,
            curtain: result.curtain || null
          }
        ]);
        setIsTyping(false);
        if (result.updatedContext) {
          setConsultationContext(result.updatedContext);
        }
      }, delayMs);

      timersRef.current = [t1, t2, t3, tFinal];
    }
  };

  const handleRequestAnotherCurtain = () => {
    if (isTyping) return;
    handleSendMessage('Mẫu này chưa phù hợp với tôi, hãy tư vấn cho tôi phương án khác');
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
                          onClick={() => handleRequestAnotherCurtain()}
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
          </div>

          <div className="chatbot-popup-footer">
            <input
              type="text"
              placeholder={isTyping ? "Chuyên gia AI đang phân tích dữ liệu không gian..." : "Kể về căn phòng (phía tây nắng gắt, phòng khách đồ gỗ, phòng ngủ...)"}
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

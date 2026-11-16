import { productsData } from '../../data/productsData.js';

// Metadata chuẩn hóa cho 14 sản phẩm (khớp tuyệt đối studioId trong studioData.js và thông số thực tế productsData.js)
const PROFILE_META = {
  1: {
    studioId: 'rainbow-brioni',
    shortBadge: 'Cản Sáng 94% · Vân Gỗ',
    colorTone: 'warm_dark',
    whyChoose: 'Kết cấu 2 lớp nan vải vân gỗ Wood-grain xen kẽ lưới voan xoay lật 180°, vừa tạo chiều sâu mộc mạc sang trọng vừa điều tiết sáng linh hoạt hơn rèm 1 lớp.',
    homeBenefit: 'Chắn sáng 94% và ngăn 99% tia UV giúp bảo vệ đồ nội thất gỗ, sàn nhà khỏi bạc màu, rạn nứt; giữ không gian riêng tư mà vẫn thông thoáng khi cần.',
    highlights: [
      'Bề mặt dệt xước vân gỗ Wood-grain tự nhiên, chống tia UV 99%.',
      'Cản sáng 94%, kết cấu 2 lớp xoay lật điều tiết ánh sáng linh hoạt.',
      'Chất liệu Polyester bền đẹp, dễ vệ sinh bằng khăn ẩm.'
    ]
  },
  2: {
    studioId: 'rainbow-infiniti',
    shortBadge: 'Cản Sáng 90% · Nẹp Viền',
    colorTone: 'neutral',
    whyChoose: 'Sở hữu cấu trúc nan nẹp viền sáng kép Dual-Border sắc nét tạo điểm nhấn kiến trúc hiện đại, kèm bộ cơ trợ lực giúp kéo lên xuống rất nhẹ.',
    homeBenefit: 'Cản sáng 90% làm dịu nắng gắt để giảm chói mắt khi sinh hoạt hay làm việc, đồng thời hạn chế bám bụi và giữ sự yên tĩnh riêng tư cho căn nhà.',
    highlights: [
      'Cấu trúc nan nẹp viền sáng kép Dual-Border sắc sảo, hiện đại.',
      'Cản sáng 90% êm dịu, bảo vệ sự riêng tư cho sinh hoạt.',
      'Bộ cơ trợ lực kéo mượt mà, chống bám bụi tốt.'
    ]
  },
  3: {
    studioId: 'rainbow-rivere',
    shortBadge: '10 Tông Màu · Bền Bỉ',
    colorTone: 'light',
    whyChoose: 'Bộ sưu tập đa dạng nhất tới 10 mã màu (từ pastel dịu đến be kem, xám, xanh than), dễ phối tệp với mọi màu sơn tường và phong cách nhà.',
    homeBenefit: 'Sợi Polyester dệt chắc chống tĩnh điện giúp rèm ít bám bụi để nhà luôn sạch, vừa cản 90–95% ánh sáng và chống UV vừa lấy sáng tự nhiên theo từng khung giờ.',
    highlights: [
      'Đa dạng 10 mã màu từ pastel đến be kem, xám và xanh than.',
      'Cản sáng 90–95%, sợi polyester dệt chắc chống tĩnh điện ít bám bụi.',
      'Chuyển đổi mượt mà giữa lấy sáng tự nhiên và che chắn riêng tư.'
    ]
  },
  4: {
    studioId: 'rainbow-dragon',
    shortBadge: 'Cản Sáng 95% · Melange',
    colorTone: 'neutral',
    whyChoose: 'Sợi dệt ma trận melange mật độ cao mang lại bề mặt lì phẳng tối giản và khả năng cản sáng đứng đầu dòng cầu vồng (tới 95%).',
    homeBenefit: 'Ngăn nắng chói và giảm sức nóng truyền qua cửa kính để phòng mát hơn, đồng thời chống co rút bai dão giúp bộ rèm giữ dáng phẳng đẹp nhiều năm.',
    highlights: [
      'Sợi dệt melange mật độ cao cản sáng vượt trội tới 95%.',
      'Bề mặt lì phẳng hiện đại, không lo co rút hay bai dão.',
      'Cách nhiệt hiệu quả cho cửa kính nhiều nắng.'
    ]
  },
  5: {
    studioId: 'roller-harmony-2',
    shortBadge: 'Gân Mịn · Cách Nhiệt 30%',
    colorTone: 'neutral',
    whyChoose: 'Chất vải gân mịn phủ nano vừa đứng phom phẳng gọn tuyệt đối vừa kháng nước, chống bám bụi tốt hơn rèm vải thông thường.',
    homeBenefit: 'Cản sáng 95% và cách nhiệt 30% giúp phòng mát nhanh, tiết kiệm điện điều hòa (~25%); khi bám bẩn chỉ cần lau nhẹ bằng khăn ẩm rất tiện dọn dẹp.',
    highlights: [
      'Bề mặt gân mịn phủ nano chống bám bụi và chống thấm nước.',
      'Cản sáng 95%, cách nhiệt 30% giúp phòng mát mẻ hơn.',
      'Thiết kế cuộn phẳng gọn gàng, lau sạch dễ dàng.'
    ]
  },
  6: {
    studioId: 'roller-malange-1',
    shortBadge: 'Hoa Râm Đa Sắc · Giá Tốt',
    colorTone: 'light',
    whyChoose: 'Mức giá dễ tiếp cận nhất (395.000đ/m²) nhưng vẫn dùng sợi dệt hoa râm Melange thanh lịch, đứng mép và cản sáng 90–95%.',
    homeBenefit: 'Giảm lóa mắt khi làm việc hay nghỉ ngơi, kháng khuẩn chống ẩm mốc tốt trong khí hậu nóng ẩm và tối ưu ngân sách khi lắp cho nhiều ô cửa.',
    highlights: [
      'Mức giá tiết kiệm nhất (395.000đ/m²) trong các dòng may đo.',
      'Sợi dệt hoa râm Melange thanh lịch, cản sáng 90–95%.',
      'Kháng khuẩn, chống ẩm tốt, phù hợp căn hộ & văn phòng.'
    ]
  },
  7: {
    studioId: 'roller-moon',
    shortBadge: '100% Blackout Tuyệt Đối',
    colorTone: 'light',
    whyChoose: 'Cấu tạo 3 lớp tráng phủ bọt đen Foam Blackout + lớp phản nhiệt giúp chặn sáng 100% tuyệt đối không lọt kẽ nắng qua mặt vải.',
    homeBenefit: 'Cách nhiệt tới 45% giúp hạ nhiệt khu vực cửa kính nắng gắt rõ rệt (khoảng 5°C), giảm tải điều hòa, cản 99% tia UV bảo vệ da và giữ giấc ngủ sâu trọn vẹn.',
    highlights: [
      'Tráng phủ bọt Foam 3 lớp cản sáng 100% tuyệt đối.',
      'Cách nhiệt tới 45%, phản xạ nhiệt giảm nóng rõ rệt (~5°C).',
      'Kháng tia UV 99%, bảo đảm riêng tư và giấc ngủ sâu.'
    ]
  },
  8: {
    studioId: 'roller-silvia',
    shortBadge: 'Jacquard · Chuẩn B1',
    colorTone: 'neutral',
    whyChoose: 'Bề mặt dệt hoa văn Jacquard gân chéo sang trọng hiếm có ở dòng rèm cuốn, vải dày cản sáng 98% và đạt chuẩn chống cháy lan B1.',
    homeBenefit: 'Vừa tăng tính an toàn phòng cháy cho ngôi nhà và cách âm nhẹ tiếng ồn bên ngoài, vừa giúp khung cửa trông chỉn chu, đẳng cấp hơn rèm trơn.',
    highlights: [
      'Họa tiết Jacquard dập nổi gân chéo sang trọng, đứng phom.',
      'Cản sáng 98% và đạt chuẩn chống cháy lan B1.',
      'Hộp máng nhôm định hình vận hành êm ái.'
    ]
  },
  9: {
    studioId: 'roller-sunny',
    shortBadge: 'Lọc Sáng Tự Nhiên · Cản UV',
    colorTone: 'light',
    whyChoose: 'Sử dụng mắt lưới vi mảnh Micro Sunscreen sợi thủy tinh bọc Vinyl, giải quyết bài toán chống nắng mà không làm nhà bị tối bí.',
    homeBenefit: 'Ngăn 95% tia UV độc hại và khử chói gắt nhưng vẫn giữ được tầm nhìn ra ngoài, tận dụng ánh sáng tự nhiên ban ngày để tiết kiệm điện đèn và giữ phòng thoáng đãng.',
    highlights: [
      'Mắt lưới Micro Sunscreen lọc sáng dịu (75–85%), không gây chói.',
      'Cản 95% tia UV nhưng vẫn nhìn xuyên ra view bên ngoài rõ nét.',
      'Sợi thủy tinh bọc Vinyl bền với nắng, dễ lau chùi.'
    ]
  },
  10: {
    studioId: 'elogi-1198-2',
    shortBadge: 'Chuẩn 5 Sao · Gấm Nhật Bản',
    colorTone: 'light',
    whyChoose: 'Dòng vải Elogi 3 lớp phong cách Nhật Bản may sóng chữ S suôn đều mềm mại, kháng khuẩn chuẩn Châu Âu và bảo hành dài tới 5 năm.',
    homeBenefit: 'Tạo chiều sâu sang trọng và cảm giác trần cao thoáng cho ngôi nhà, đồng thời cản sáng 95%, ngăn 99% tia UV bảo vệ đồ nội thất và giữ nhiệt phòng ổn định.',
    highlights: [
      'May sóng chữ S bồng bềnh mềm mại, tôn chiều cao không gian.',
      'Cản sáng 95%, chống tia UV 99%, kháng khuẩn chuẩn Châu Âu.',
      'Gam màu trung tính sang trọng, dễ phối nội thất.'
    ]
  },
  11: {
    studioId: 'elogi-1206-1',
    shortBadge: 'Nâu Be Ấm · Cách Âm 35%',
    colorTone: 'warm_dark',
    whyChoose: 'Pha giữa sợi lanh tự nhiên và microfiber chạm tay êm mịn, không chứa Formaldehyde, không nhăn nhàu sau khi giặt và giữ độ rủ tự nhiên.',
    homeBenefit: 'Cản sáng 90% kết hợp giảm ồn & cách nhiệt khoảng 35% giúp căn nhà yên tĩnh, mát mẻ và an toàn sức khỏe cho cả gia đình, đặc biệt giữ cảm giác ấm cúng.',
    highlights: [
      'Pha sợi lanh và microfiber mềm rũ tự nhiên, không nhăn.',
      'Cách âm giảm tiếng ồn & cách nhiệt ~35%, cản sáng 90%.',
      'Tone nâu be/mocha ấm áp, an toàn không chứa Formaldehyde.'
    ]
  },
  12: {
    studioId: 'elogi-1230-1',
    shortBadge: 'Cát Vàng Japandi · Eco',
    colorTone: 'light',
    whyChoose: 'Chất liệu Eco-friendly thân thiện môi trường, không hóa chất độc hại, dệt vân gân nổi mộc mạc chuẩn Japandi và bảo hành chính hãng 5 năm.',
    homeBenefit: 'Tán sáng êm dịu 85–90% giúp mắt thư giãn và không gian thêm gần gũi tự nhiên; ít bám bụi, giặt nhanh khô và không co rút khi sử dụng lâu dài.',
    highlights: [
      'Vải dệt Eco-friendly vân gân nhẹ mộc mạc, gần gũi thiên nhiên.',
      'Cản sáng dịu 85–90%, giữ không gian ấm áp và thoáng mắt.',
      'Chống bám bụi, nhanh khô, không co rút khi giặt.'
    ]
  },
  13: {
    studioId: 'elogi-1198-2',
    shortBadge: 'Smart Motor <25dB',
    colorTone: 'neutral',
    whyChoose: 'Động cơ Brushless siêu tĩnh âm (<25dB), chịu tải 60kg, tích hợp kéo tay nhẹ tự chạy (Touch Motion) cùng Apple HomeKit & Google Assistant.',
    homeBenefit: 'Hẹn giờ tự động mở đón sáng hoặc đóng kín chống nắng qua điện thoại/giọng nói giúp cả nhà sinh hoạt tiện nghi hơn và bảo vệ nếp rèm bền lâu.',
    highlights: [
      'Động cơ không chổi than siêu tĩnh âm (<25dB), tải trọng 60kg.',
      'Kéo tay nhẹ tự chạy (Touch Motion), hỗ trợ Apple HomeKit & Google Assistant.',
      'Ray nhôm 6063-T5 bảo hành động cơ 5 năm đổi mới.'
    ]
  },
  14: {
    studioId: 'elogi-1198-2',
    shortBadge: 'Ray Bi Teflon Siêu Mượt',
    colorTone: 'neutral',
    whyChoose: 'Hệ bi trượt phủ Teflon tự bôi trơn kết hợp đệm giảm chấn giúp kéo rèm nặng lướt nhẹ mượt, lại có thể uốn cong góc 90° hoặc bo vòng cung.',
    homeBenefit: 'Loại bỏ hoàn toàn tình trạng kẹt rít ồn ào hay võng thanh ray sau nhiều năm, giúp rèm vận hành nhẹ tay êm ái bền bỉ trên 15 năm.',
    highlights: [
      'Con lăn bi phủ Teflon tự bôi trơn, kéo nhẹ mượt không ồn.',
      'Hỗ trợ uốn cong góc 90° hoặc bo vòng cung theo kiến trúc cửa.',
      'Nhôm đúc chống oxy hóa, bảo hành phụ kiện 5 năm.'
    ]
  }
};

export const CURTAIN_PROFILES = productsData.map((p) => {
  const meta = PROFILE_META[p.id] || {
    studioId: 'elogi-1198-2',
    shortBadge: p.badge || 'Chính hãng',
    colorTone: 'neutral',
    whyChoose: p.description,
    homeBenefit: p.fullDescription || p.description,
    highlights: p.highlights?.map((h) => `${h.title}: ${h.desc}`) || []
  };
  const unitLabel = p.unit === 'bộ' ? 'bộ' : 'm²';
  return {
    id: p.id,
    studioId: meta.studioId,
    name: p.name,
    code: p.code,
    category: p.category,
    room: p.room,
    style: p.style,
    price: p.price,
    priceDisplay: `${Number(p.price).toLocaleString('vi-VN')}đ / ${unitLabel}`,
    image: p.image,
    badge: meta.shortBadge,
    colorTone: meta.colorTone,
    whyChoose: meta.whyChoose,
    homeBenefit: meta.homeBenefit,
    story: p.description,
    highlights: meta.highlights,
    colorNames: p.colorNames || [],
    material: p.material || '',
    lightBlocking: p.lightBlocking || '',
    fabricWidth: p.fabricWidth || '',
    origin: p.origin || 'UniVeloria',
    warranty: p.warranty || 'Bảo hành chính hãng'
  };
});

export function normalizeText(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pad(norm) {
  return ` ${norm} `;
}

function hasPhrase(padded, phrases) {
  return phrases.some((p) => padded.includes(` ${p} `));
}

function formatVnd(amount) {
  return `${Math.round(amount).toLocaleString('vi-VN')}đ`;
}

// Trích xuất kích thước cửa (vd: "2m x 2.2m", "1m8 x 2m2", "200x220cm", "5m2", "4.5 m2")
function detectDimensions(rawInput) {
  const clean = (rawInput || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/,/g, '.')
    .replace(/(\d+)m(\d+)/g, '$1.$2m');

  const dimMatch = clean.match(/(\d+(?:\.\d+)?)\s*(cm|m)?\s*[x*]\s*(\d+(?:\.\d+)?)\s*(cm|m)?/);
  if (dimMatch) {
    let w = parseFloat(dimMatch[1]);
    const u1 = dimMatch[2];
    let h = parseFloat(dimMatch[3]);
    const u2 = dimMatch[4];
    const unitIsCm = u1 === 'cm' || u2 === 'cm' || (!u1 && !u2 && (w > 20 || h > 20));
    if (unitIsCm) {
      w = w / 100;
      h = h / 100;
    }
    if (w > 0 && h > 0 && w <= 30 && h <= 20) {
      const area = Math.round(w * h * 100) / 100;
      return { widthM: w, heightM: h, areaM2: area };
    }
  }

  const areaMatch = clean.match(/(\d+(?:\.\d+)?)\s*(m2|m\s*2|met\s*vuong)/);
  if (areaMatch) {
    const area = parseFloat(areaMatch[1]);
    if (area > 0 && area <= 300) {
      return { widthM: null, heightM: null, areaM2: area };
    }
  }
  return null;
}

const PRODUCT_ALIASES = {
  1: ['duo onyx', 'onyx', 'brioni'],
  2: ['duo eclipse', 'eclipse', 'infiniti'],
  3: ['duo riviera', 'riviera', 'river'],
  4: ['duo orion', 'orion', 'dragon'],
  5: ['shade aria', 'aria', 'harmony'],
  6: ['shade melange', 'melange', 'malange'],
  7: ['shade luna', 'luna', 'moon'],
  8: ['shade elara', 'elara', 'silvia'],
  9: ['shade solis', 'solis', 'sunny'],
  10: ['drape elysia', 'elysia', '1198'],
  11: ['drape celeste', 'celeste', '1206'],
  12: ['drape aurelia', 'aurelia', '1230'],
  13: ['a25 pro', 'a25', 'smart automation a25'],
  14: ['r25', 'smart automation r25']
};

function findMentionedCurtain(padded) {
  for (const profile of CURTAIN_PROFILES) {
    const pNorm = normalizeText(profile.name);
    if (padded.includes(` ${pNorm} `)) return profile;
    const aliases = PRODUCT_ALIASES[profile.id] || [];
    if (hasPhrase(padded, aliases)) return profile;
  }
  return null;
}

const COLOR_QUERY_MAP = [
  {
    key: 'trang',
    label: 'trắng',
    tone: 'light',
    accented: /(?:^|\s)trắng(?=$|\s|[?!.,])/i,
    unaccentedPhrases: ['mau trang', 'tong trang', 'rem trang', 'bach kim'],
    colorMatchTerms: ['trang', 'bach kim']
  },
  {
    key: 'kem',
    label: 'kem / be',
    tone: 'light',
    accented: /(?:^|\s)(?:kem|màu be|tông be|be cát|be sữa)(?=$|\s|[?!.,])/i,
    unaccentedPhrases: ['mau kem', 'tong kem', 'rem kem', 'mau be', 'tong be', 'rem be', 'be cat', 'yen mach'],
    colorMatchTerms: ['kem', 'be', 'mocha', 'yen mach']
  },
  {
    key: 'nau',
    label: 'nâu / gỗ',
    tone: 'warm_dark',
    accented: /(?:^|\s)nâu(?=$|\s|[?!.,])/i,
    unaccentedPhrases: ['mau nau', 'tong nau', 'rem nau', 'nau go', 'socola', 'cafe', 'mocha'],
    colorMatchTerms: ['nau', 'go', 'socola', 'cafe', 'mocha', 'caramel', 'espresso']
  },
  {
    key: 'xam',
    label: 'xám / ghi',
    tone: 'neutral',
    accented: /(?:^|\s)(?:xám|ghi)(?=$|\s|[?!.,])/i,
    unaccentedPhrases: ['mau xam', 'tong xam', 'rem xam', 'mau ghi', 'tong ghi', 'than chi', 'xam khoi'],
    colorMatchTerms: ['xam', 'ghi', 'than chi', 'graphite', 'bac']
  },
  {
    key: 'den',
    label: 'đen',
    tone: 'warm_dark',
    accented: /(?:^|\s)đen(?=$|\s|[?!.,])/i,
    unaccentedPhrases: ['mau den', 'tong den', 'rem den', 'den tuyen', 'graphite'],
    colorMatchTerms: ['den', 'graphite']
  },
  {
    key: 'xanh',
    label: 'xanh',
    tone: 'neutral',
    accented: /(?:^|\s)xanh(?=$|\s|[?!.,])/i,
    unaccentedPhrases: ['mau xanh', 'tong xanh', 'rem xanh', 'thien thanh', 'pastel', 'xanh than'],
    colorMatchTerms: ['xanh', 'thien thanh', 'pastel', 'slate']
  },
  {
    key: 'vang',
    label: 'vàng / cát',
    tone: 'light',
    accented: /(?:^|\s)vàng(?=$|\s|[?!.,])/i,
    unaccentedPhrases: ['mau vang', 'tong vang', 'rem vang', 'cat vang', 'vang be'],
    colorMatchTerms: ['vang', 'cat vang', 'ho phach', 'champagne']
  }
];

function colorTermsFor(c) {
  return c ? (c.colorMatchTerms || []) : [];
}

function curtainMatchesColor(curtain, colorObj) {
  if (!curtain || !colorObj || !Array.isArray(curtain.colorNames)) return false;
  return curtain.colorNames.some((cn) => {
    const cnPad = pad(normalizeText(cn));
    return hasPhrase(cnPad, colorObj.colorMatchTerms);
  });
}

// Phát hiện câu hỏi FAQ hoặc câu hỏi kiến thức mà user đặt ra (kể cả khi xen giữa câu trả lời)
function detectEmbeddedFaqs(rawInput, padded) {
  const answers = [];

  if (hasPhrase(padded, ['co nhung loai', 'cac loai rem', 'cac dong rem', 'nhung loai nao', 'co may loai', 'ban nhung gi', 'ban gi', 'nhung dong nao'])) {
    answers.push(
      'UniVeloria hiện có 3 dòng rèm may đo chính: **Rèm Cầu Vồng** (720k–770k/m²), **Rèm Cuốn** (395k–550k/m²) và **Rèm Vải** (780k–790k/m²), cùng **Thanh ray & Động cơ tự động** (2,5tr–2,8tr/bộ).'
    );
  } else if (
    hasPhrase(padded, ['khac gi', 'khac nhau', 'so sanh']) &&
    (padded.includes('cau vong') || padded.includes('rem cuon') || padded.includes('rem vai'))
  ) {
    const parts = [];
    if (padded.includes('cau vong')) parts.push('• **Rèm Cầu Vồng (720k–770k/m²):** 2 lớp xen kẽ điều chỉnh sáng linh hoạt, gọn đẹp.');
    if (padded.includes('rem cuon')) parts.push('• **Rèm Cuốn (395k–550k/m²):** Cuộn phẳng gọn nhất, giá mềm, có bản cản sáng 100% hoặc lưới ngắm view.');
    if (padded.includes('rem vai')) parts.push('• **Rèm Vải (780k–790k/m²):** Sóng vải mềm mại sang trọng, cách âm và giữ nhiệt tốt cho cửa lớn.');
    answers.push(parts.join('\n'));
  }

  if (hasPhrase(padded, ['lap dat', 'tu lap', 'tho lap', 'bao gom lap', 'co lap khong'])) {
    answers.push(
      'Về lắp đặt: UniVeloria chuyên may đo thành phẩm giá xưởng nên **chưa gồm nhân công lắp tận nhà**, nhưng mỗi bộ rèm đều **tặng kèm trọn bộ phụ kiện ray treo + video hướng dẫn tự lắp rất dễ làm**.'
    );
  }

  if (hasPhrase(padded, ['cach do', 'do cua', 'huong dan do', 'do the nao', 'do sao', 'chua do'])) {
    answers.push(
      'Khi đo cửa, bạn đo 3 điểm ngang & 3 điểm dọc rồi lấy **số nhỏ nhất** (trừ nhẹ **0.5–1cm** chiều ngang nếu lắp lọt lòng khung cửa). Nếu hiện chưa có sẵn số đo cũng không sao ạ!'
    );
  }

  if (hasPhrase(padded, ['giao hang', 'ship', 'bao lau', 'may ngay', 'van chuyen'])) {
    answers.push('Thời gian may đo hoàn thiện khoảng **2 – 5 ngày làm việc** và giao hàng toàn quốc ạ.');
  }

  if (hasPhrase(padded, ['in tranh', 'in hinh', 'in logo', 'in theo yeu cau'])) {
    answers.push('Dòng **Rèm cuốn** bên mình có nhận in tranh phong cảnh/họa tiết hoặc logo theo yêu cầu (liên hệ hotline **039 835 6785**).');
  }

  if (hasPhrase(padded, ['3d', 'xem thu', 'thu rem', 'studio', 'tai anh', 'up anh'])) {
    answers.push('Bạn có thể mở tab **AI 3D Studio** trên thanh menu để xoay 3D hoặc tải ảnh phòng lên ướm thử mẫu rèm trực tiếp.');
  }

  if (hasPhrase(padded, ['hotline', 'so dien thoai', 'sdt', 'lien he', 'email', 'gio lam viec', 'mo cua', 'showroom', 'dia chi'])) {
    answers.push('Thông tin liên hệ UniVeloria: Hotline **039 835 6785** · Email **univeloria@gmail.com** (T2–T7: 8:30–18:00, CN: 9:00–17:00).');
  }

  if (hasPhrase(padded, ['bao hanh', 'doi tra', 'chinh hang'])) {
    answers.push('UniVeloria **bảo hành chính hãng 2 – 5 năm** tùy chất liệu vải, đường may và hệ động cơ (A25 Pro bảo hành đổi mới 5 năm).');
  }

  if (
    hasPhrase(padded, ['gia bao nhieu', 'gia sao', 'gia the nao', 'bao gia', 'bang gia', 'gia khoang', 'bao nhieu 1m', 'bao nhieu 1 m', 'nhieu 1m2', 'nhieu 1m', 'gia nhieu', 'gia nhiu', 'may tien', 'bao nhiu']) ||
    (hasPhrase(padded, ['gia', 'gia ca', 'chi phi']) && hasPhrase(padded, ['bao nhieu', 'nhieu', 'nhiu', 'khoang', 'tam', '1m2', '1m', 'met']))
  ) {
    if (padded.includes('rem cuon')) {
      answers.push('Dòng **Rèm cuốn** hiện có giá từ **395.000đ – 550.000đ / m²** (đã kèm phụ kiện ray treo).');
    } else if (padded.includes('cau vong')) {
      answers.push('Dòng **Rèm cầu vồng** hiện có giá từ **720.000đ – 770.000đ / m²** (đã kèm phụ kiện đầy đủ).');
    } else if (padded.includes('rem vai')) {
      answers.push('Dòng **Rèm vải cao cấp** hiện có giá từ **780.000đ – 790.000đ / m²** (đã kèm phụ kiện ray treo).');
    } else {
      answers.push('Bảng giá may đo theo m²: **Rèm Cuốn** 395k–550k/m² · **Rèm Cầu Vồng** 720k–770k/m² · **Rèm Vải** 780k–790k/m² · **Ray thông minh** 2,5tr–2,8tr/bộ.');
    }
  }

  if (hasPhrase(padded, ['chong tham', 'chong nuoc'])) {
    answers.push('Trong các dòng hiện có, mẫu rèm cuốn phủ nano (**Shade Aria**) chống thấm nước và chống bám bụi rất tốt.');
  } else if (hasPhrase(padded, ['cach am', 'chong on', 'giam on'])) {
    answers.push('Để giảm tiếng ồn tốt nhất, các mẫu rèm vải dày như **Drape Celeste** (cách âm ~35%) hoặc chất liệu nhiều lớp sẽ hiệu quả hơn rèm mỏng.');
  }

  return answers;
}

function isShortReplyMatch(rawInput, norm, padded, answerWords) {
  // Không nhầm câu hỏi kết thúc bằng "... không?" (vd: "có lắp không?") thành câu trả lời phủ định "Không"
  const endsAsQuestion = rawInput.includes('?') || /\bkhong(?:\s+a|\s+shop|\s+ban)?$/.test(norm);
  if (endsAsQuestion && !/^(?:khong|co|it)\b/.test(norm)) return false;
  return hasPhrase(padded, answerWords);
}

// Nhận diện thông tin sở thích & điều kiện phòng trong câu nói của khách
function extractSignals(rawInput, padded, context = {}, faqCount = 0) {
  const lastDim = context.lastAskedDim || null;
  const norm = normalizeText(rawInput);

  let room = null;
  const askingRoom = lastDim === 'room' || lastDim === 'room_and_sunlight' || context.lastBotTopic === 'greeting';
  if (hasPhrase(padded, ['phong tho', 'gian tho', 'ban tho', 'noi tho', 'tho cung', 'tho gia tien']) || (askingRoom && hasPhrase(padded, ['tho']))) {
    room = { key: 'worship', label: 'phòng thờ' };
  } else if (hasPhrase(padded, ['phong ngu', 'giac ngu', 'de ngu', 'di ngu', 'phong master', 'phong vo chong', 'phong be', 'phong em be']) || (askingRoom && hasPhrase(padded, ['ngu']))) {
    room = { key: 'bedroom', label: 'phòng ngủ' };
  } else if (hasPhrase(padded, ['phong khach', 'tiep khach', 'phong sinh hoat', 'biet thu']) || (askingRoom && hasPhrase(padded, ['khach']))) {
    room = { key: 'living', label: 'phòng khách' };
  } else if (hasPhrase(padded, ['phong lam viec', 'ban lam viec', 'van phong', 'phong doc sach', 'doc sach', 'phong hoc']) || (askingRoom && hasPhrase(padded, ['lam viec']))) {
    room = { key: 'study', label: 'phòng làm việc' };
  } else if (hasPhrase(padded, ['phong an', 'ban an', 'phong bep', 'nha bep']) || (askingRoom && hasPhrase(padded, ['bep', 'an']))) {
    room = { key: 'dining', label: 'phòng ăn' };
  } else if (hasPhrase(padded, ['ban cong', 'lo gia', 'logia', 'ngoai troi', 'san vuon']) || (askingRoom && hasPhrase(padded, ['ban cong']))) {
    room = { key: 'balcony', label: 'ban công' };
  } else if (hasPhrase(padded, ['chung cu', 'can ho', 'studio']) || (askingRoom && hasPhrase(padded, ['chung cu', 'can ho']))) {
    room = { key: 'apartment', label: 'căn hộ' };
  }

  const askingLight = lastDim === 'sunlight' || lastDim === 'room_and_sunlight';
  let orientation = null;
  if (hasPhrase(padded, ['huong tay', 'phia tay', 'chinh tay', 'tay bac', 'tay nam', 'nang chieu', 'nang buoi chieu']) || (askingLight && hasPhrase(padded, ['tay']))) {
    orientation = { key: 'west', label: 'hướng Tây (nắng chiều)' };
  } else if (hasPhrase(padded, ['huong dong', 'phia dong', 'chinh dong', 'dong bac', 'dong nam', 'nang som', 'nang sang', 'binh minh']) || (askingLight && hasPhrase(padded, ['dong']))) {
    orientation = { key: 'east', label: 'hướng Đông (nắng sáng)' };
  } else if (hasPhrase(padded, ['huong nam', 'phia nam', 'chinh nam', 'gio nom']) || (askingLight && hasPhrase(padded, ['nam']))) {
    orientation = { key: 'south', label: 'hướng Nam' };
  } else if (hasPhrase(padded, ['huong bac', 'phia bac', 'chinh bac', 'gio lanh']) || (askingLight && hasPhrase(padded, ['bac']))) {
    orientation = { key: 'north', label: 'hướng Bắc' };
  }

  let lightNeed = null;
  if (hasPhrase(padded, ['100', 'toi tuyet doi', 'toi han', 'toi sau', 'can sang tuyet doi', 'phong chieu', 'media', 'chong nong', 'can nhiet', 'nang gat', 'nang nhieu', 'rat nang', 'can sang tot', 'toi da', 'che kin', 'it lot sang'])) {
    lightNeed = 'blackout100';
  } else if (hasPhrase(padded, ['loc sang', 'lay sang', 'ngam view', 'ngam canh', 'nhin ra ngoai', 'thoang sang', 'khong toi qua', 'diu nhe', 'anh sang tu nhien', 'diu sang', 'nhe nhang', 'khong can toi qua', 'it nang', 'nang nhe'])) {
    lightNeed = 'filter';
  } else if (hasPhrase(padded, ['can sang', 'chong nang', 'rieng tu', 'kin dao', 'chong choi', 'can tia uv', 'can uv', 'co nang'])) {
    lightNeed = 'high';
  } else if (askingLight && faqCount === 0) {
    if (isShortReplyMatch(rawInput, norm, padded, ['khong', 'khong nang', 'it', 'khong nhieu'])) lightNeed = 'filter';
    else if (isShortReplyMatch(rawInput, norm, padded, ['co', 'nhieu', 'co nang'])) lightNeed = 'high';
  }

  let acousticNeed = hasPhrase(padded, ['on', 'tieng on', 'cach am', 'giam on', 'gan duong', 'yen tinh']);

  const askingCategory = lastDim === 'window_category' || lastDim === 'category_only';
  let categoryPref = null;
  if (hasPhrase(padded, ['thanh rem', 'thanh treo', 'ray rem', 'thanh ray', 'ray truot', 'dong co', 'rem tu dong', 'smart motor', 'homekit', 'google assistant'])) {
    categoryPref = 'Thanh rèm';
  } else if (hasPhrase(padded, ['rem cau vong', 'cau vong'])) {
    categoryPref = 'Rèm cầu vồng';
  } else if (hasPhrase(padded, ['rem cuon', 'loai cuon', 'chon cuon']) || (askingCategory && hasPhrase(padded, ['cuon']))) {
    categoryPref = 'Rèm cuốn';
  } else if (hasPhrase(padded, ['rem vai', 'loai vai', 'chon vai', 'vai buong']) || (askingCategory && hasPhrase(padded, ['vai']))) {
    categoryPref = 'Rèm vải';
  }

  let windowSize = null;
  if (hasPhrase(padded, ['cua lon', 'cua kinh lon', 'vach kinh', 'sat san', 'cua rong', 'ban cong lon', 'cua to', 'cua chinh']) || (lastDim === 'window_category' && hasPhrase(padded, ['lon', 'rong', 'to']))) {
    windowSize = 'large';
  } else if (hasPhrase(padded, ['cua nho', 'cua so nho', 'cua so vua', 'cua vua', 'khung nho', 'dien tich nho']) || (lastDim === 'window_category' && hasPhrase(padded, ['nho', 'vua']))) {
    windowSize = 'small';
  }

  let woodInterior = hasPhrase(padded, ['noi that go', 'do go', 'van go', 'go gu', 'go oc cho', 'ban tho go', 'giuong go', 'tu go']) ||
    (lastDim === 'interior' && hasPhrase(padded, ['go', 'nhieu go']));

  let style = null;
  if (hasPhrase(padded, ['sang trong', 'dang cap', '5 sao', 'khach san', 'be the', 'co dien', 'quy phai', 'mem mai'])) {
    style = 'luxury';
  } else if (woodInterior || hasPhrase(padded, ['am cung', 'am ap', 'tram am', 'japandi', 'moc mac'])) {
    style = 'wood_warm';
  } else if (hasPhrase(padded, ['toi gian', 'don gian', 'gon gang', 'minimal', 'nho gon', 'kieu gon', 'keo gon', 'cho gon']) || (lastDim === 'window_category' && hasPhrase(padded, ['gon']))) {
    style = 'minimal';
  } else if (hasPhrase(padded, ['hien dai', 'tre trung', 'tinh te'])) {
    style = 'modern';
  }

  let requestedColor = null;
  for (const c of COLOR_QUERY_MAP) {
    // Chỉ dùng colorMatchTerms để dò màu khi câu không nói về chất liệu "đồ gỗ" (tránh nhầm "gỗ" -> "nâu / gỗ")
    const replyTerms = c.key === 'nau' ? ['nau', 'socola', 'cafe', 'mocha', 'caramel', 'espresso'] : c.colorMatchTerms;
    if (
      c.accented.test(rawInput || '') ||
      hasPhrase(padded, c.unaccentedPhrases) ||
      (lastDim === 'color' && hasPhrase(padded, replyTerms))
    ) {
      requestedColor = c;
      break;
    }
  }

  let colorTone = requestedColor ? requestedColor.tone : null;
  if (!colorTone) {
    if (hasPhrase(padded, ['tong sang', 'mau sang', 'tuong trang', 'nen sang', 'nha sang']) || (lastDim === 'color' && hasPhrase(padded, ['sang', 'tuong trang']))) {
      colorTone = 'light';
    } else if (hasPhrase(padded, ['trung tinh', 'tong trung tinh']) || (lastDim === 'color' && hasPhrase(padded, ['trung tinh']))) {
      colorTone = 'neutral';
    } else if (hasPhrase(padded, ['tong tram', 'mau tram', 'tong am', 'mau am', 'tong toi']) || (lastDim === 'color' && hasPhrase(padded, ['tram', 'am', 'toi']))) {
      colorTone = 'warm_dark';
    }
  }

  let budget = null;
  let budgetTarget = null;
  const kMatch = norm.match(/\b(\d{3})\s*k\b/);
  if (kMatch) {
    const val = parseInt(kMatch[1], 10) * 1000;
    if (val >= 200000 && val <= 1500000) {
      budgetTarget = val;
      if (val <= 550000) budget = 'low';
      else if (val >= 700000) budget = 'high';
      else budget = 'mid';
    }
  }
  if (!budget) {
    if (hasPhrase(padded, ['gia re', 're nhat', 'tiet kiem', 'vua tui tien', 'binh dan', 'gia mem', 'it tien', 'thap nhat', 'pho thong', 'duoi 500', 'tam 400', '400k', '500k']) || (lastDim === 'budget_size' && hasPhrase(padded, ['re', 'thap', '400', '500']))) {
      budget = 'low';
    } else if (hasPhrase(padded, ['cao cap', 'xin nhat', 'hang sang', '700k', 'tam 700', 'tam cao', 'khong ngai gia']) || (lastDim === 'budget_size' && hasPhrase(padded, ['700', 'cao']))) {
      budget = 'high';
    } else if (hasPhrase(padded, ['tam trung', 'vua phai']) || (lastDim === 'budget_size' && hasPhrase(padded, ['vua']))) {
      budget = 'mid';
    }
  }

  let smartInterest = null;
  if (hasPhrase(padded, ['tu dong', 'motor', 'dong co', 'dieu khien dien thoai', 'homekit', 'smart'])) {
    smartInterest = true;
  } else if (lastDim === 'motor' && hasPhrase(padded, ['khong', 'keo tay', 'truyen thong', 'binh thuong', 'co'])) {
    // Lưu ý: khi hỏi "kéo tay hay tự động", trả lời "tự động" đã bắt ở nhánh trên, còn "kéo tay / bình thường / không" -> false
    smartInterest = false;
  } else if (hasPhrase(padded, ['keo tay', 'day keo', 'keo tay truyen thong', 'khong can motor', 'khong tu dong'])) {
    smartInterest = false;
  }

  const cleaningPriority = hasPhrase(padded, ['chong bui', 'chong bam bui', 'de lau', 'lau chui', 'de ve sinh', 'chong tham', 'chong nuoc']);
  const windowMount = hasPhrase(padded, ['lot long', 'phu bi']);

  return {
    room,
    orientation,
    lightNeed,
    acousticNeed,
    categoryPref,
    windowSize,
    style,
    requestedColor,
    colorTone,
    budget,
    budgetTarget,
    smartInterest,
    cleaningPriority,
    windowMount
  };
}

function getPreferredIdsForRoom(roomKey) {
  switch (roomKey) {
    case 'worship': return [1, 11, 12, 8];
    case 'bedroom': return [7, 4, 11, 2];
    case 'living': return [10, 3, 1, 9];
    case 'study': return [5, 2, 9, 6];
    case 'balcony': return [9, 5, 6];
    case 'apartment': return [6, 3, 5, 1];
    case 'dining': return [12, 5, 3, 10];
    default: return [1, 10, 7, 3];
  }
}

function selectBestCurtain(pool, dislikedIds, recommendedIds, criteria) {
  let candidates = pool.filter((c) => !dislikedIds.has(c.id));
  if (candidates.length === 0) candidates = [...pool];

  if (criteria.categoryPref && criteria.categoryPref !== 'Thanh rèm') {
    const catMatched = candidates.filter((c) => c.category === criteria.categoryPref);
    if (catMatched.length > 0) candidates = catMatched;
  }

  const roomRank = criteria.room ? getPreferredIdsForRoom(criteria.room.key) : [];

  const scored = candidates.map((item) => {
    let score = 0;

    if (roomRank.length > 0) {
      const idx = roomRank.indexOf(item.id);
      if (idx !== -1) score += 50 - idx * 10;
    }

    if (criteria.orientation?.key === 'west') {
      if (item.id === 7) score += 45;
      else if (item.id === 4 || item.id === 8 || item.id === 10) score += 35;
    } else if (criteria.orientation?.key === 'east') {
      if (item.id === 9 || item.id === 3 || item.id === 5) score += 35;
    }

    if (criteria.lightNeed === 'blackout100') {
      if (item.id === 7) score += 55;
      else if (item.id === 8 || item.id === 4 || item.id === 10 || item.id === 1) score += 38;
    } else if (criteria.lightNeed === 'high') {
      if ([1, 4, 5, 8, 10, 7].includes(item.id)) score += 30;
    } else if (criteria.lightNeed === 'filter') {
      if (item.id === 9) score += 55;
      else if (item.id === 3 || item.id === 12 || item.id === 2) score += 32;
    }

    if (criteria.acousticNeed) {
      if (item.id === 11) score += 35;
      else if (item.category === 'Rèm vải') score += 25;
      else if (item.id === 7) score += 18;
    }

    if (criteria.windowSize === 'large') {
      if (item.category === 'Rèm vải') score += 30;
    } else if (criteria.windowSize === 'small') {
      if (item.category === 'Rèm cuốn' || item.category === 'Rèm cầu vồng') score += 25;
    }

    if (criteria.style === 'luxury') {
      if (item.category === 'Rèm vải' || item.id === 8 || item.id === 1) score += 38;
    } else if (criteria.style === 'minimal') {
      if (item.category === 'Rèm cuốn' || item.category === 'Rèm cầu vồng') score += 32;
    } else if (criteria.style === 'wood_warm') {
      if (item.id === 1 || item.id === 11 || item.id === 12) score += 45;
    }

    if (criteria.budgetTarget) {
      const diff = Math.abs(item.price - criteria.budgetTarget);
      if (diff <= 20000) score += 28;
      else if (diff <= 60000) score += 12;
      else if (item.price > criteria.budgetTarget + 80000) score -= 18;
    } else if (criteria.budget === 'low') {
      if (item.id === 6) score += 55;
      else if (item.id === 5 || item.id === 7) score += 45;
      else if (item.price <= 550000) score += 25;
    } else if (criteria.budget === 'high') {
      if (item.price >= 740000) score += 25;
    }

    if (criteria.requestedColor && curtainMatchesColor(item, criteria.requestedColor)) {
      score += 50;
    } else if (criteria.colorTone && item.colorTone === criteria.colorTone) {
      score += 18;
    }

    if (recommendedIds.has(item.id)) score -= 12;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.item || candidates[0];
}

// Tạo phản hồi tự nhiên bám sát nội dung khách hàng vừa nói
function buildReactionToTurn(signals, faqAnswers, rawInput, padded, context) {
  const parts = [];

  if (faqAnswers.length > 0) {
    parts.push(faqAnswers.join('\n\n'));
  }

  const notes = [];
  if (signals.room && signals.room.key !== context.room?.key) {
    const r = signals.room.key;
    if (r === 'worship') {
      notes.push('Với **phòng thờ**, tiêu chí quan trọng nhất là chắn nắng trực diện vào bàn thờ, giữ không gian tĩnh tại và màu sắc trầm ấm hài hòa đồ gỗ.');
    } else if (r === 'bedroom') {
      notes.push('Với **phòng ngủ**, rèm cần ưu tiên khả năng cản sáng sâu và sự riêng tư để giấc ngủ không bị gián đoạn.');
    } else if (r === 'living') {
      notes.push('Với **phòng khách**, bộ rèm vừa cần đẹp mắt tôn không gian tiếp khách, vừa điều tiết ánh sáng linh hoạt ban ngày.');
    } else if (r === 'study') {
      notes.push('Với **phòng làm việc**, độ gọn gàng và chống lóa màn hình sẽ giúp bạn tập trung thoải mái hơn.');
    } else if (r === 'balcony') {
      notes.push('Khu vực **ban công** đón nắng gió nhiều nên ưu tiên chất liệu bền nắng, cản UV mà vẫn thoáng.');
    } else {
      notes.push(`Mình đã ghi nhận nhu cầu cho **${signals.room.label}** của bạn.`);
    }
  }

  if (signals.categoryPref && signals.categoryPref !== context.categoryPref && faqAnswers.length === 0) {
    if (signals.categoryPref === 'Rèm vải') {
      notes.push('Dòng **Rèm vải** may sóng mềm mại sẽ mang lại vẻ sang trọng và ấm áp rất đẹp cho căn phòng.');
    } else if (signals.categoryPref === 'Rèm cầu vồng') {
      notes.push('Dòng **Rèm cầu vồng** 2 lớp vừa gọn gàng vừa xoay lật điều chỉnh ánh sáng rất linh hoạt.');
    } else if (signals.categoryPref === 'Rèm cuốn') {
      notes.push('Dòng **Rèm cuốn** rất gọn gàng, tiết kiệm diện tích và dễ vệ sinh.');
    }
  }

  if (signals.orientation?.key === 'west') {
    notes.push('Cửa **hướng Tây nắng chiều** thường tích nhiệt khá gắt, nên chọn dòng cản nhiệt và phản xạ bức xạ tốt.');
  } else if (signals.orientation?.key === 'east') {
    notes.push('Nắng sáng hướng Đông dịu hơn nắng chiều, thường chỉ cần lọc sáng êm hoặc cản sáng vừa phải.');
  } else if (signals.orientation?.key === 'north') {
    notes.push('Cửa **hướng Bắc** ánh sáng thường dịu đều và ít nắng gắt trực tiếp, nên rất thoải mái chọn chất liệu theo thẩm mỹ phòng.');
  } else if (signals.orientation?.key === 'south') {
    notes.push('Cửa **hướng Nam** thường đón gió mát và ánh sáng khá dễ chịu suốt ngày.');
  } else if (signals.lightNeed === 'blackout100') {
    notes.push('Nếu cần **tối sâu gần như 100% / chống nóng mạnh**, mình sẽ ưu tiên các dòng tráng phủ bọt foam hoặc dệt mật độ khít.');
  } else if (signals.lightNeed === 'filter' && !signals.room) {
    notes.push('Thiên về **lọc sáng dịu và giữ độ thoáng**, rèm lưới hoặc nan so le sẽ rất dễ chịu.');
  }

  if (signals.requestedColor && !signals.room) {
    notes.push(`Mình đã ghi nhận bạn thích tông màu **${signals.requestedColor.label}**.`);
  }

  if (signals.cleaningPriority) {
    notes.push('Mình sẽ ưu tiên dòng chất liệu ít bám bụi và dễ lau chùi bảo dưỡng nhé.');
  }

  if (signals.windowMount) {
    notes.push(
      padded.includes(' lot long ')
        ? 'Lắp **lọt lòng** sẽ gọn gàng ôm sát khung cửa (khi đo bạn nhớ trừ nhẹ 0.5–1cm chiều ngang nhé).'
        : 'Lắp **phủ bì** giúp trùm kín mép cửa và hạn chế hở sáng hai bên rất tốt.'
    );
  }

  if (signals.acousticNeed) {
    notes.push('Phòng gần khu vực ồn thì chất liệu dày (như rèm vải sợi dày hoặc vải phủ 3 lớp) sẽ hỗ trợ tiêu âm tốt hơn.');
  }

  if (signals.style && signals.style !== context.style) {
    if (signals.style === 'wood_warm') {
      notes.push('Đồ nội thất gỗ đi cùng tông màu ấm, be cát hoặc vân gỗ sẽ đồng điệu rất tự nhiên.');
    } else if (signals.style === 'minimal') {
      notes.push('Phong cách gọn gàng hiện đại lên cửa rất thanh thoát và dễ vệ sinh hàng ngày.');
    } else if (signals.style === 'luxury') {
      notes.push('Phong cách sang trọng sẽ nổi bật rõ khi dùng chất vải có độ rủ đẹp hoặc hoa văn dập nổi tinh tế.');
    }
  }

  if (signals.budget === 'low' && faqAnswers.length === 0) {
    notes.push('Mức ngân sách tiết kiệm bên mình vẫn có các mẫu rèm cuốn may đo bền đẹp tầm **395.000đ – 550.000đ/m²**.');
  } else if (signals.budget === 'high' && faqAnswers.length === 0) {
    notes.push('Ở phân khúc cao cấp, bạn sẽ có các dòng vải gấm Nhật, vân gỗ Woodgrain hoặc Jacquard sang trọng.');
  }

  if (signals.colorTone && !signals.requestedColor && signals.colorTone !== context.colorTone) {
    if (signals.colorTone === 'light') {
      notes.push('Tông nền sáng rất dễ phối màu, giúp phòng trông rộng và nhẹ mắt hơn.');
    } else if (signals.colorTone === 'warm_dark') {
      notes.push('Tông trầm ấm giúp căn phòng có chiều sâu, sạch sẽ và che nắng tốt.');
    } else if (signals.colorTone === 'neutral') {
      notes.push('Tông trung tính (xám, ghi) mang lại cảm giác hiện đại và rất dễ ăn nhập với nội thất.');
    }
  }

  if (signals.smartInterest === false) {
    notes.push('Dùng dây/kéo tay truyền thống vừa gọn chi phí vừa rất bền bỉ ạ.');
  } else if (signals.smartInterest === true && faqAnswers.length === 0) {
    notes.push('Nếu muốn kéo tự động qua điện thoại, lát mình sẽ gợi ý kèm tương thích thanh ray motor luôn cho bạn.');
  }

  if (signals.dimensions) {
    const dimDesc = signals.dimensions.widthM
      ? `${signals.dimensions.widthM}m × ${signals.dimensions.heightM}m (${signals.dimensions.areaM2}m²)`
      : `${signals.dimensions.areaM2}m²`;
    notes.push(`Mình đã lưu kích thước **${dimDesc}** để lát tính chi phí chi tiết luôn khi chốt mẫu nhé.`);
  }

  if (notes.length > 0) {
    parts.push(notes.join(' '));
  } else if (faqAnswers.length === 0) {
    if (hasPhrase(padded, ['khong biet', 'chua biet', 'chua ro', 'tu van giup', 'tim 1 tam rem', 'tim rem', 'mua rem', 'phu hop'])) {
      parts.push('Mình hiểu rồi, để chọn đúng mẫu hợp với nhà mình nhất, mình cùng đi qua vài câu ngắn gọn để lọc chuẩn nhé.');
    } else if (hasPhrase(padded, ['khong', 'chua co', 'chua do'])) {
      parts.push('Dạ không sao đâu ạ, mình cứ ước lượng trước theo nhu cầu thực tế là được.');
    } else if (lastDimAnswered(context) === 'cleaning_priority') {
      parts.push('Mình đã ghi nhận thêm tiêu chí ưu tiên của bạn rồi ạ.');
    }
  }

  return parts.join('\n\n');
}

function lastDimAnswered(ctx) {
  return ctx?.lastAskedDim || null;
}

// Chọn câu hỏi tiếp theo DỰA TRÊN những thông tin còn thiếu & liên kết với ngữ cảnh hiện tại
function pickNextDiscoveryQuestion(criteria, askedDims, lastDim) {
  const roomLabel = criteria.room ? criteria.room.label : 'căn phòng';

  // 1. Nếu chưa biết phòng: lần đầu hỏi room, nếu đã hỏi room mà khách trả lời chung chung -> hỏi room + sunlight gộp tự nhiên
  if (!criteria.room) {
    if (!askedDims.has('room')) {
      return {
        dim: 'room',
        question: 'Bộ rèm này bạn dự định lắp cho **phòng nào** ạ?'
      };
    }
    if (!askedDims.has('room_and_sunlight')) {
      return {
        dim: 'room_and_sunlight',
        question: 'Trước tiên bạn cho mình biết thêm 2 ý nhé: rèm này lắp cho **phòng nào** trong nhà, và cửa sổ khu vực đó có bị **nắng chiếu gắt** nhiều không ạ?'
      };
    }
  }

  // 2. Chưa biết hướng nắng / mức độ che sáng
  if (!criteria.lightNeed && !criteria.orientation && !askedDims.has('sunlight')) {
    if (criteria.room?.key === 'worship') {
      return {
        dim: 'sunlight',
        question: 'Cửa sổ phòng thờ nhà bạn có bị **nắng rọi thẳng vào bàn thờ** không, hay chỉ đón sáng nhẹ thôi ạ?'
      };
    }
    if (criteria.room?.key === 'balcony') {
      return {
        dim: 'sunlight',
        question: 'Ban công nhà mình có nắng gắt hướng Tây nhiều không, và bạn muốn **che kín hẳn** hay **vẫn nhìn xuyên ngắm cảnh** được?'
      };
    }
    return {
      dim: 'sunlight',
      question: `Vị trí cửa ở ${roomLabel} có đón **nắng gắt** (như nắng chiều hướng Tây) không, và bạn cần **cản sáng gần như tuyệt đối** hay chỉ cần **dịu bớt sáng**?`
    };
  }

  // 3. Chưa biết kiểu dáng / kích thước cửa (gọn vs rèm vải, cửa nhỏ vs lớn)
  if ((!criteria.categoryPref && !criteria.windowSize) && !askedDims.has('window_category')) {
    return {
      dim: 'window_category',
      question: `Khung cửa ${roomLabel} là **cửa sổ vừa nhỏ** hay **cửa kính lớn sát sàn**, và bạn thích kiểu **rèm kéo gọn** (cuốn / cầu vồng) hay **rèm vải buông mềm mại**?`
    };
  }

  if (!criteria.categoryPref && !askedDims.has('category_only') && !askedDims.has('window_category')) {
    return {
      dim: 'category_only',
      question: 'Bạn thích dòng **rèm cuốn** (kéo phẳng gọn), **rèm cầu vồng** (2 lớp lật lấy sáng) hay **rèm vải** (sóng mềm mại) hơn ạ?'
    };
  }

  // 4. Chưa biết phong cách nội thất
  if (!criteria.style && !askedDims.has('interior')) {
    return {
      dim: 'interior',
      question: `Đồ nội thất và kiến trúc xung quanh ${roomLabel} đang thiên về kiểu **hiện đại tối giản**, **ấm cúng nhiều đồ gỗ**, hay **sang trọng mềm mại** ạ?`
    };
  }

  // 5. Chưa biết tông màu tường / màu yêu thích
  if (!criteria.requestedColor && !criteria.colorTone && !askedDims.has('color')) {
    return {
      dim: 'color',
      question: 'Về màu sắc, tường và đồ đạc phòng mình đang thiên về **tông sáng** (trắng, kem), **trung tính** (xám, ghi) hay **tông trầm ấm** (nâu gỗ, đậm) để mình chọn màu rèm cho tệp nhé?'
    };
  }

  // 6. Chưa biết ngân sách hoặc kích thước cửa
  if (!criteria.budget && !criteria.dimensions && !askedDims.has('budget_size')) {
    return {
      dim: 'budget_size',
      question: 'Bạn dự tính ngân sách ở mức **tiết kiệm** (tầm 395k–550k/m²) hay **dòng cao cấp hơn** (720k–790k/m²), và đã có kích thước cửa sơ bộ chưa ạ?'
    };
  }

  // 7. Chưa hỏi thói quen kéo tay vs động cơ tự động
  if (criteria.smartInterest === null && !askedDims.has('motor')) {
    return {
      dim: 'motor',
      question: 'Thêm một câu nhỏ nữa nhé: bạn muốn dùng **kéo tay truyền thống** hay có dự định lắp **động cơ rèm tự động** điều khiển qua điện thoại không ạ?'
    };
  }

  // 8. Hỏi tiêu chí phụ trợ (vệ sinh, cách âm, kiểu lắp lọt lòng vs phủ bì)
  if (!askedDims.has('cleaning_priority')) {
    return {
      dim: 'cleaning_priority',
      question: 'Bạn có yêu cầu ưu tiên thêm về công năng không — chẳng hạn như **chống bám bụi dễ lau**, **chống thấm nước**, hay **tiêu âm giảm ồn**?'
    };
  }

  if (!askedDims.has('window_mount')) {
    return {
      dim: 'window_mount',
      question: 'Cuối cùng, cửa nhà mình định lắp kiểu **lọt lòng** gọn bên trong khung cửa hay **phủ bì** trùm rộng ra ngoài mép cửa ạ?'
    };
  }

  return null;
}

function filterColorsByTone(colorNames, tone) {
  if (!Array.isArray(colorNames) || colorNames.length === 0) return [];
  const toneRegex = {
    light: /trắng|kem|be\s|vàng|bạch kim|pastel|yến mạch|sáng/i,
    neutral: /xám|ghi|tro|bạc|slate|thiên thanh|khói|trung tính/i,
    warm_dark: /nâu|gỗ|mocha|sô-?cô-?la|socola|cà phê|caramel|espresso|đen|than|đậm|trầm/i
  };
  const rx = toneRegex[tone];
  if (!rx) return colorNames.slice(0, 2);
  const filtered = colorNames.filter((cn) => rx.test(cn));
  return (filtered.length > 0 ? filtered : colorNames).slice(0, 2);
}

// Gắn kết lý do chọn sản phẩm theo đúng bối cảnh phòng/hướng/ngân sách khách đã chia sẻ (không suy diễn thêm)
function buildRoomFitReason(chosen, criteria = {}) {
  const parts = [];
  const roomKey = criteria.room?.key;
  if (roomKey === 'worship') {
    parts.push('Rất hợp **phòng thờ** cần sự trang nghiêm, giữ kín đáo khi hành lễ và điều tiết ánh sáng êm dịu.');
  } else if (roomKey === 'bedroom') {
    parts.push('Phù hợp **phòng ngủ** nhờ kiểm soát ánh sáng tốt để tạo độ tối êm, riêng tư và ngủ sâu giấc hơn.');
  } else if (roomKey === 'living') {
    parts.push('Rất hợp **phòng khách** vì nâng tính thẩm mỹ mặt tiền đồng thời linh hoạt đón sáng khi sinh hoạt hoặc tiếp khách.');
  } else if (roomKey === 'study') {
    parts.push('Tối ưu cho **phòng làm việc** nhờ giảm chói lóa màn hình mà vẫn giữ độ thoáng tinh tế để tập trung.');
  } else if (roomKey === 'dining') {
    parts.push('Phù hợp **phòng ăn / bếp** nhờ chất liệu gọn sạch, ít bám bụi và dễ lau chùi hằng ngày.');
  } else if (roomKey === 'balcony') {
    parts.push('Phù hợp khu vực **ban công / logia** giúp giảm nắng gió hắt từ bên ngoài mà vẫn gọn gàng.');
  } else if (roomKey === 'apartment') {
    parts.push('Dễ ứng dụng cho tổng thể **căn hộ** nhờ phom dáng hiện đại và phối màu hài hòa.');
  }

  if (criteria.orientation?.key === 'west' || criteria.orientation?.key === 'east') {
    parts.push(`Đáp ứng tốt cửa **${criteria.orientation.label}** vốn có nắng chiếu trực diện.`);
  } else if (criteria.orientation?.label) {
    parts.push(`Hài hòa với cửa **${criteria.orientation.label}** có cường độ sáng ổn định.`);
  }

  if (criteria.budgetTarget && chosen.category !== 'Thanh rèm') {
    const kLabel = `${Math.round(criteria.budgetTarget / 1000)}k`;
    if (chosen.price <= criteria.budgetTarget) {
      parts.push(`Mức giá **${chosen.priceDisplay}** vừa vặn trong tầm ngân sách **${kLabel}/m²** bạn đặt ra.`);
    } else if (chosen.price - criteria.budgetTarget <= 65000) {
      parts.push(`Mức giá **${chosen.priceDisplay}** chỉ nhỉnh nhẹ so với tầm **${kLabel}/m²** để đạt đúng tiêu chí phòng.`);
    }
  } else if (criteria.style === 'luxury' && parts.length < 2) {
    parts.push('Bề mặt hoàn thiện sắc nét, tôn lên vẻ **sang trọng** cho nội thất.');
  } else if (criteria.style === 'wood_warm' && parts.length < 2) {
    parts.push('Chất liệu và sắc độ rất ăn nhập với **nội thất đồ gỗ ấm cúng**.');
  } else if (criteria.style === 'minimal' && parts.length < 2) {
    parts.push('Phom dáng gọn thanh, hợp tinh thần **tối giản**.');
  }

  return parts.slice(0, 2).join(' ');
}

// Chuẩn hóa khung trả lời mọi thẻ sản phẩm: nêu rõ Tại sao nên chọn + Công dụng/Lợi ích cho ngôi nhà + Màu & Chi phí
function formatProductCardReply(chosen, leadLine, criteria = {}, dimensions = null, closingLine = '') {
  const lines = [leadLine, ''];

  lines.push(`**1. Tại sao nên chọn ${chosen.name}?**`);
  const fitReason = buildRoomFitReason(chosen, criteria);
  if (fitReason) lines.push(`• ${fitReason}`);
  if (chosen.whyChoose) lines.push(`• ${chosen.whyChoose}`);

  lines.push('');
  lines.push('**2. Công dụng & Lợi ích cho ngôi nhà:**');
  if (chosen.homeBenefit) {
    lines.push(`• ${chosen.homeBenefit}`);
  } else if (chosen.highlights?.length) {
    lines.push(`• ${chosen.highlights.join(' ')}`);
  }

  lines.push('');
  if (criteria.requestedColor && chosen.colorNames?.length > 0) {
    const matchedColors = chosen.colorNames.filter((cn) => hasPhrase(pad(normalizeText(cn)), colorTermsFor(criteria.requestedColor)));
    if (matchedColors.length > 0) {
      lines.push(`• Có sẵn tông **${criteria.requestedColor.label}**: ${matchedColors.join(', ')}.`);
    } else if (criteria.colorTone) {
      lines.push(`• Gợi ý màu hợp tông bạn thích: ${filterColorsByTone(chosen.colorNames, criteria.colorTone).join(', ')}.`);
    }
  } else if (criteria.colorTone && chosen.colorNames?.length > 0) {
    lines.push(`• Gợi ý màu hợp tông bạn thích: ${filterColorsByTone(chosen.colorNames, criteria.colorTone).join(', ')}.`);
  }

  if (dimensions && chosen.category !== 'Thanh rèm') {
    const est = dimensions.areaM2 * chosen.price;
    lines.push(`• Chi phí: ${chosen.priceDisplay} → ước tính cho **${dimensions.areaM2}m²** khoảng **${formatVnd(est)}** (${chosen.warranty}).`);
  } else {
    lines.push(`• Giá tham khảo: ${chosen.priceDisplay} (${chosen.warranty}).`);
  }

  if (criteria.smartInterest === true && chosen.category !== 'Thanh rèm') {
    lines.push('• Tích hợp tự động: có thể lắp kèm thanh ray motor **Smart Automation A25 Pro** (2,8tr/bộ).');
  }

  if (closingLine) {
    lines.push('');
    lines.push(closingLine);
  }
  return lines.join('\n');
}

// Tạo phần chốt sản phẩm cuối cùng tổng hợp đúng toàn bộ các câu khách vừa trao đổi
function buildFinalRecommendationText(chosen, criteria, dimensions) {
  const matchedSummary = [];
  if (criteria.room) matchedSummary.push(criteria.room.label);
  if (criteria.orientation) matchedSummary.push(criteria.orientation.label);
  else if (criteria.lightNeed === 'blackout100') matchedSummary.push('cản sáng tối đa');
  else if (criteria.lightNeed === 'filter') matchedSummary.push('lọc sáng dịu thoáng');
  if (criteria.style === 'wood_warm') matchedSummary.push('nội thất ấm cúng/đồ gỗ');
  else if (criteria.style === 'minimal') matchedSummary.push('gọn gàng tối giản');
  else if (criteria.style === 'luxury') matchedSummary.push('sang trọng');
  if (criteria.acousticNeed) matchedSummary.push('giảm ồn');
  if (criteria.budgetTarget) matchedSummary.push(`tầm ${Math.round(criteria.budgetTarget / 1000)}k/m²`);
  else if (criteria.budget === 'low') matchedSummary.push('ngân sách tiết kiệm');

  const leadLine = matchedSummary.length > 0
    ? `Cảm ơn bạn đã chia sẻ khá chi tiết (${matchedSummary.join(', ')}). Dựa trên các tiêu chí bạn chọn, mẫu **${chosen.name}** (${chosen.category}) là lựa chọn sát nhu cầu nhất:`
    : `Từ những gì mình vừa trao đổi, bạn xem thử mẫu **${chosen.name}** (${chosen.category}) rất hợp với nhu cầu nhà mình:`;

  return formatProductCardReply(
    chosen,
    leadLine,
    criteria,
    dimensions,
    'Bạn thấy mẫu này ưng ý chưa? Bạn có thể hỏi thêm bảng màu, tính giá kích thước khác, xem 3D hoặc bấm đổi mẫu khác nếu muốn so sánh nhé!'
  );
}

function buildProductSpecificAnswer(curtain, padded, dimensions, requestedColor) {
  if (dimensions && curtain.category !== 'Thanh rèm') {
    const est = dimensions.areaM2 * curtain.price;
    const dimLabel = dimensions.widthM
      ? `${dimensions.widthM}m × ${dimensions.heightM}m (${dimensions.areaM2}m²)`
      : `${dimensions.areaM2}m²`;
    return {
      text: `Với kích thước **${dimLabel}**, mẫu **${curtain.name}** (${curtain.priceDisplay}) ước tính khoảng **${formatVnd(est)}** (đã kèm phụ kiện ray treo tiêu chuẩn).\n\nLưu ý: lắp lọt lòng khung cửa nhớ trừ 0.5–1cm chiều ngang nhé. Bạn muốn chốt mẫu này hay đổi mẫu khác ạ?`,
      curtain: null
    };
  }

  if (hasPhrase(padded, ['mau sac', 'mau gi', 'co nhung mau', 'co mau nao', 'bang mau', 'mau gi khong']) || requestedColor) {
    if (requestedColor) {
      const matchedColors = curtain.colorNames.filter((cn) => hasPhrase(pad(normalizeText(cn)), colorTermsFor(requestedColor)));
      if (matchedColors.length > 0) {
        return {
          text: `Dạ có ạ! Mẫu **${curtain.name}** có tông **${requestedColor.label}** với các mã: ${matchedColors.join(', ')}.\n\nBạn muốn xem thử màu này trong không gian 3D luôn không?`,
          curtain: null
        };
      }
      const altWithColor = CURTAIN_PROFILES.find((c) => c.id !== curtain.id && c.category !== 'Thanh rèm' && curtainMatchesColor(c, requestedColor));
      const altHint = altWithColor
        ? ` Nếu thích đúng tông này, bạn tham khảo thêm mẫu **${altWithColor.name}** (${altWithColor.priceDisplay}) có sẵn rất đẹp ạ.`
        : '';
      return {
        text: `Mẫu **${curtain.name}** hiện gồm: ${curtain.colorNames.join(', ')}.${altHint}`,
        curtain: null
      };
    }
    return {
      text: `Bảng màu của **${curtain.name}** gồm ${curtain.colorNames.length} tông:\n• ${curtain.colorNames.join('\n• ')}\n\nBạn ưng mã màu nào nhất trong bảng trên ạ?`,
      curtain: null
    };
  }

  if (hasPhrase(padded, ['chat lieu', 'vai gi', 'lam tu gi', 'co day khong', 'giat', 've sinh', 'lau chui', 'bam bui', 'chong tham'])) {
    const careTip = curtain.category === 'Rèm vải'
      ? 'Có thể tháo giặt nhẹ hoặc giặt hấp định kỳ, vải ít nhăn và giữ sóng tốt.'
      : curtain.category === 'Thanh rèm'
        ? 'Chỉ cần lau bụi định kỳ bằng khăn khô.'
        : 'Chỉ cần lau nhẹ bằng khăn ẩm hoặc dùng chổi lông/máy hút bụi cầm tay, rất ít bám bụi.';
    return {
      text: `Về chất liệu **${curtain.name}**: ${curtain.material}.\n\nVệ sinh: ${careTip} (${curtain.origin}).`,
      curtain: null
    };
  }

  if (hasPhrase(padded, ['can sang', 'chong nang', 'chong uv', 'cach nhiet', 'cach am', 'bao nhieu phan tram', 'do day'])) {
    const extraSound = curtain.id === 11 ? ' Khả năng cách âm giảm ồn đạt khoảng 35%.' : '';
    return {
      text: `Khả năng che chắn của **${curtain.name}**: ${curtain.lightBlocking}.${extraSound}`,
      curtain: null
    };
  }

  if (hasPhrase(padded, ['bao hanh', 'doi tra', 'xuat xu', 'nuoc nao', 'han quoc', 'chinh hang'])) {
    return {
      text: `Mẫu **${curtain.name}** là hàng **${curtain.origin}**, áp dụng **${curtain.warranty}**.`,
      curtain: null
    };
  }

  if (hasPhrase(padded, ['gia', 'bao nhieu', 'gia sao', 'chi phi', 'tien'])) {
    return {
      text: `Giá của **${curtain.name}** hiện là **${curtain.priceDisplay}** (đã gồm phụ kiện đồng bộ). Bạn có thể nhắn kích thước ` + '`Rộng × Cao`' + ` để mình ước tính tổng tiền cho nhé!`,
      curtain: null
    };
  }

  return null;
}

// =============================================================================
// ENGINE TƯ VẤN CHÍNH:
// - Hỏi tự nhiên ~5–7 câu tương tác bám sát ngữ cảnh trước khi chốt sản phẩm
// - Luôn trả lời đúng trọng tâm câu hỏi khách hàng đang hỏi
// - Khi đã gợi ý sản phẩm, hỗ trợ đầy đủ hỏi đáp nối tiếp, tính giá, đổi mẫu
// =============================================================================
export function analyzeUserMessage(rawInput, context = {}, currentCurtainId = null) {
  const trimmed = (rawInput || '').trim();
  const norm = normalizeText(trimmed);
  const padded = pad(norm);

  const dislikedIds = new Set(context.dislikedProductIds || []);
  const recommendedIds = new Set(context.recommendedCurtainIds || []);
  const askedDims = new Set(context.askedDims || []);
  const curtainPool = CURTAIN_PROFILES.filter((c) => c.category !== 'Thanh rèm');
  const activeCurtain = CURTAIN_PROFILES.find((c) => c.id === (currentCurtainId || context.lastCurtainId)) || null;
  const hasRecommended = Boolean(context.hasRecommendedProduct && activeCurtain);

  const dimensions = detectDimensions(trimmed);
  const mentionedCurtain = findMentionedCurtain(padded);
  const faqAnswers = detectEmbeddedFaqs(trimmed, padded);
  const signals = extractSignals(trimmed, padded, context, faqAnswers.length);

  const baseCtx = {
    room: context.room || null,
    orientation: context.orientation || null,
    lightNeed: context.lightNeed || null,
    acousticNeed: Boolean(context.acousticNeed),
    categoryPref: context.categoryPref || null,
    windowSize: context.windowSize || null,
    style: context.style || null,
    requestedColor: context.requestedColor || null,
    colorTone: context.colorTone || null,
    budget: context.budget || null,
    budgetTarget: context.budgetTarget || null,
    smartInterest: context.smartInterest ?? null,
    dimensions: dimensions || context.dimensions || null,
    questionsAsked: context.questionsAsked || 0,
    askedDims: Array.from(askedDims),
    lastAskedDim: context.lastAskedDim || null,
    hasGreeted: Boolean(context.hasGreeted),
    hasRecommendedProduct: Boolean(context.hasRecommendedProduct),
    lastCurtainId: context.lastCurtainId || null,
    lastBotTopic: context.lastBotTopic || null,
    recommendedCurtainIds: Array.from(recommendedIds),
    dislikedProductIds: Array.from(dislikedIds)
  };

  // 1. LỜI CHÀO HỎI ĐƠN THUẦN ("Hi", "Hello", "Alo"...)
  const greetingOnly = hasPhrase(padded, ['hi', 'hello', 'alo', 'chao', 'xin chao', 'chao shop', 'chao ad', 'chao ban', 'shop oi', 'ad oi', 'em oi', 'ban oi']) &&
    trimmed.split(/\s+/).length <= 4 &&
    !signals.room &&
    !signals.categoryPref &&
    !mentionedCurtain &&
    faqAnswers.length === 0;

  if (greetingOnly) {
    const qCount = baseCtx.questionsAsked + 1;
    askedDims.add('room');
    const text = baseCtx.hasGreeted
      ? 'Chào bạn nhé! Bạn cần tìm rèm cho phòng nào, hay muốn mình giải đáp câu hỏi gì trước ạ?'
      : 'Chào bạn! Mình là trợ lý tư vấn rèm UniVeloria ☁️✨ Bạn đang cần tìm rèm cho **phòng nào** ạ?';
    return {
      type: 'question',
      delayMs: 450,
      curtain: null,
      text,
      updatedContext: {
        ...baseCtx,
        hasGreeted: true,
        questionsAsked: qCount,
        askedDims: Array.from(askedDims),
        lastAskedDim: 'room',
        lastBotTopic: 'greeting'
      }
    };
  }

  // 2. HỎI DANH TÍNH / CẢM ƠN / TẠM BIỆT
  if (hasPhrase(padded, ['ban la ai', 'ban ten gi', 'may la ai', 'ai day', 'giup duoc gi', 'tu van duoc gi'])) {
    return {
      type: 'faq',
      delayMs: 450,
      curtain: null,
      text: 'Mình là trợ lý tư vấn rèm UniVeloria. Mình sẽ hỏi qua vài nhu cầu cơ bản (phòng lắp, ánh sáng, kiểu dáng, tông màu, ngân sách) để lọc đúng mẫu rèm chuẩn nhất cho bạn, hoặc giải đáp ngay nếu bạn cần hỏi giá và kích thước. Mình bắt đầu nhé — bạn định lắp rèm cho phòng nào ạ?',
      updatedContext: { ...baseCtx, lastBotTopic: 'identity' }
    };
  }

  if (hasPhrase(padded, ['cam on', 'thank', 'thanks', 'tks']) && !signals.room && !signals.categoryPref && faqAnswers.length === 0) {
    return {
      type: 'faq',
      delayMs: 450,
      curtain: null,
      text: 'Không có gì ạ! Khi nào bạn cần tư vấn tiếp, hỏi thêm màu sắc hay tính giá theo kích thước cứ nhắn mình nhé 🌿',
      updatedContext: { ...baseCtx, lastBotTopic: 'thanks' }
    };
  }

  if (hasPhrase(padded, ['tam biet', 'bye', 'hen gap lai'])) {
    return {
      type: 'faq',
      delayMs: 450,
      curtain: null,
      text: 'Chào bạn nhé! Chúc bạn sớm hoàn thiện không gian ưng ý cho tổ ấm của mình.',
      updatedContext: { ...baseCtx, lastBotTopic: 'farewell' }
    };
  }

  // 3. YÊU CẦU ĐÍCH DANH MỘT MẪU CỤ THỂ (vd: "Cho xem Shade Luna", "Duo Onyx có màu gì?")
  if (mentionedCurtain) {
    const isRejectingMentioned = hasPhrase(padded, ['khong thich', 'bo qua', 'doi mau', 'khac']);
    if (!isRejectingMentioned) {
      dislikedIds.delete(mentionedCurtain.id);
      const specificAnswer = buildProductSpecificAnswer(mentionedCurtain, padded, dimensions, signals.requestedColor);
      if (specificAnswer) {
        return {
          type: 'faq',
          delayMs: 550,
          curtain: null,
          text: specificAnswer.text,
          updatedContext: {
            ...baseCtx,
            lastCurtainId: mentionedCurtain.id,
            lastBotTopic: 'product_detail',
            dislikedProductIds: Array.from(dislikedIds)
          }
        };
      }
      const lead = `Thông tin chi tiết về **${mentionedCurtain.name}** (${mentionedCurtain.category} · ${mentionedCurtain.priceDisplay}):`;
      const intro = formatProductCardReply(
        mentionedCurtain,
        lead,
        {
          ...baseCtx,
          room: signals.room || baseCtx.room,
          orientation: signals.orientation || baseCtx.orientation,
          style: signals.style || baseCtx.style,
          requestedColor: signals.requestedColor || baseCtx.requestedColor,
          colorTone: signals.colorTone || baseCtx.colorTone,
          budgetTarget: signals.budgetTarget || baseCtx.budgetTarget
        },
        dimensions || baseCtx.dimensions,
        'Bạn muốn xem bảng màu, tính giá theo kích thước hay thử trên 3D Studio?'
      );
      return {
        type: 'final_consultation',
        delayMs: 850,
        finalText: intro,
        curtain: mentionedCurtain,
        updatedContext: {
          ...baseCtx,
          hasRecommendedProduct: true,
          lastCurtainId: mentionedCurtain.id,
          lastBotTopic: 'product_card',
          dislikedProductIds: Array.from(dislikedIds),
          recommendedCurtainIds: Array.from(new Set([...recommendedIds, mentionedCurtain.id]))
        }
      };
    }
  }

  // 4. ĐỔI MẪU KHÁC / KHÔNG THÍCH MẪU ĐÃ GỢI Ý
  const isChangeRequest = hasPhrase(padded, [
    'doi mau', 'mau khac', 'khong thich', 'chua thich', 'khong ung', 'chua ung',
    'khong hop', 'chua hop', 'khong phu hop', 'chua phu hop', 'xem mau khac',
    'mau khac di', 'dat qua', 're hon', 'mau re hon', 'toi qua', 'sang hon',
    'can sang hon', 'chua du toi', 'xau qua', 'don gian qua', 'random', 'ngau nhien',
    'bo qua', 'chon lai', 'goi y khac', 'phuong an khac'
  ]);

  if (isChangeRequest && (activeCurtain || hasRecommended)) {
    const curId = mentionedCurtain?.id || activeCurtain?.id;
    const curObj = CURTAIN_PROFILES.find((c) => c.id === curId) || null;
    if (curId && curObj?.category !== 'Thanh rèm') dislikedIds.add(curId);

    let candidatePool = curtainPool.filter((c) => !dislikedIds.has(c.id));
    if (candidatePool.length === 0) candidatePool = curtainPool.filter((c) => c.id !== curId);

    let altReasonText = '';
    const wantsCheaper = hasPhrase(padded, ['dat qua', 're hon', 'mau re hon', 'gia mem', 'tiet kiem hon']);
    const wantsBrighter = hasPhrase(padded, ['toi qua', 'sang hon', 'thoang hon', 'nhe hon']);
    const wantsDarker = hasPhrase(padded, ['can sang hon', 'chua du toi', 'choi qua', 'day hon']);

    if (signals.categoryPref && signals.categoryPref !== 'Thanh rèm') {
      const byCat = candidatePool.filter((c) => c.category === signals.categoryPref);
      if (byCat.length > 0) candidatePool = byCat;
      altReasonText = `Mình đổi sang dòng **${signals.categoryPref}** theo ý bạn nhé. Mẫu **{{NAME}}** sẽ phù hợp hơn:`;
    } else if (wantsCheaper && curObj) {
      const cheaper = candidatePool.filter((c) => c.price < curObj.price).sort((a, b) => a.price - b.price);
      if (cheaper.length > 0) {
        candidatePool = cheaper;
        altReasonText = `Để tối ưu chi phí hơn mẫu trước (${curObj.priceDisplay}), mình chuyển sang mẫu **{{NAME}}** giá mềm hơn:`;
      }
    } else if (wantsBrighter) {
      const brighter = candidatePool.filter((c) => [9, 3, 12, 6, 2].includes(c.id));
      if (brighter.length > 0) {
        candidatePool = brighter;
        altReasonText = 'Để phòng thoáng sáng hơn, bạn xem thử mẫu **{{NAME}}** nhé:';
      }
    } else if (wantsDarker) {
      const darker = candidatePool.filter((c) => [7, 8, 4, 10, 1].includes(c.id));
      if (darker.length > 0) {
        candidatePool = darker;
        altReasonText = 'Nếu cần độ cản sáng sâu hơn nữa, bạn chuyển sang mẫu **{{NAME}}** nhé:';
      }
    }

    const freshPool = candidatePool.filter((c) => !recommendedIds.has(c.id));
    if (freshPool.length > 0 && !wantsCheaper && !wantsBrighter && !wantsDarker) {
      const diffCat = curObj ? freshPool.filter((c) => c.category !== curObj.category) : [];
      candidatePool = diffCat.length > 0 ? diffCat : freshPool;
    }

    const altCriteria = {
      ...baseCtx,
      lightNeed: wantsBrighter ? 'filter' : wantsDarker ? 'blackout100' : baseCtx.lightNeed,
      budget: wantsCheaper ? 'low' : baseCtx.budget,
      categoryPref: signals.categoryPref || baseCtx.categoryPref
    };
    const chosenAlt = selectBestCurtain(candidatePool, dislikedIds, recommendedIds, altCriteria);

    const lead = (altReasonText || 'Mình đã ghi nhận và bỏ qua mẫu trước. Bạn xem thử mẫu **{{NAME}}** này nhé:')
      .replace('{{NAME}}', chosenAlt.name);

    const text = formatProductCardReply(
      chosenAlt,
      lead,
      altCriteria,
      dimensions || baseCtx.dimensions,
      'Bạn muốn kiểm tra màu sắc, tính giá kích thước hay đổi phương án khác không ạ?'
    );

    return {
      type: 'alternative_curtain',
      delayMs: 900,
      curtain: chosenAlt,
      text,
      updatedContext: {
        ...baseCtx,
        hasRecommendedProduct: true,
        lastCurtainId: chosenAlt.id,
        lastBotTopic: 'product_card',
        dislikedProductIds: Array.from(dislikedIds),
        recommendedCurtainIds: Array.from(new Set([...recommendedIds, chosenAlt.id]))
      }
    };
  }

  // 5. HỎI NỐI TIẾP SAU KHI ĐÃ ĐƯỢC GỢI Ý SẢN PHẨM (Màu sắc, chất liệu, kích thước/tính giá...)
  if (hasRecommended) {
    const isFollowUpAboutActive =
      !signals.room &&
      (Boolean(dimensions) ||
        Boolean(signals.requestedColor) ||
        hasPhrase(padded, ['mau nay', 'no', 'cai nay', 'san pham nay', 'rem nay', 'mau sac', 'mau gi', 'co nhung mau', 'co mau nao', 'bang mau', 'chat lieu', 'vai gi', 'giat', 've sinh', 'lau chui', 'bao hanh', 'xuat xu', 'can sang bao nhieu', 'chong uv', 'cach am', 'gia bao nhieu', 'bao nhieu tien', 'gia sao']));

    if (isFollowUpAboutActive) {
      const specificAnswer = buildProductSpecificAnswer(activeCurtain, padded, dimensions, signals.requestedColor);
      if (specificAnswer) {
        return {
          type: 'faq',
          delayMs: 500,
          curtain: null,
          text: specificAnswer.text,
          updatedContext: { ...baseCtx, lastBotTopic: 'product_detail' }
        };
      }
    }
  }

  // 6. HỎI ĐÍCH DANH THANH RÈM / ĐỘNG CƠ (khi hỏi riêng về thanh ray/motor ngoài luồng chọn vải)
  if (signals.categoryPref === 'Thanh rèm' && !signals.room && baseCtx.questionsAsked < 2) {
    const isAuto = hasPhrase(padded, ['tu dong', 'smart', 'dien thoai', 'giong noi', 'motor', 'dong co', 'homekit', 'google assistant', 'app', 'a25']);
    const chosenRod = isAuto ? CURTAIN_PROFILES.find((c) => c.id === 13) : CURTAIN_PROFILES.find((c) => c.id === 14);
    const rodLead = `Với hệ thanh rèm thông minh, bạn tham khảo **${chosenRod.name}** (${chosenRod.priceDisplay}):`;
    const text = formatProductCardReply(
      chosenRod,
      rodLead,
      baseCtx,
      null,
      'Bạn dự định lắp cho rèm phòng nào để mình kiểm tra thêm ạ?'
    );
    return {
      type: 'rod_consultation',
      delayMs: 850,
      curtain: chosenRod,
      text,
      updatedContext: {
        ...baseCtx,
        hasRecommendedProduct: true,
        lastCurtainId: chosenRod.id,
        lastBotTopic: 'rod_card',
        recommendedCurtainIds: Array.from(new Set([...recommendedIds, chosenRod.id]))
      }
    };
  }

  // 7. CẬP NHẬT NGỮ CẢNH HỘI THOẠI CHO LƯỢT NÀY
  const switchedRoom = Boolean(signals.room && baseCtx.room && signals.room.key !== baseCtx.room.key);
  const merged = {
    room: signals.room || baseCtx.room,
    orientation: signals.orientation || (switchedRoom ? null : baseCtx.orientation),
    lightNeed: signals.lightNeed || (switchedRoom ? null : baseCtx.lightNeed),
    acousticNeed: switchedRoom ? signals.acousticNeed : (baseCtx.acousticNeed || signals.acousticNeed),
    categoryPref: (signals.categoryPref && signals.categoryPref !== 'Thanh rèm')
      ? signals.categoryPref
      : (switchedRoom ? null : baseCtx.categoryPref),
    windowSize: signals.windowSize || (switchedRoom ? null : baseCtx.windowSize),
    style: signals.style || (switchedRoom ? null : baseCtx.style),
    requestedColor: signals.requestedColor || (signals.colorTone ? null : (switchedRoom ? null : baseCtx.requestedColor)),
    colorTone: signals.colorTone || (switchedRoom ? null : baseCtx.colorTone),
    budget: signals.budget || (switchedRoom ? null : baseCtx.budget),
    budgetTarget: signals.budgetTarget || (switchedRoom ? null : baseCtx.budgetTarget),
    smartInterest: signals.smartInterest !== null ? signals.smartInterest : (switchedRoom ? null : baseCtx.smartInterest),
    dimensions: dimensions || (switchedRoom ? null : baseCtx.dimensions)
  };

  // Nếu user vừa chuyển sang một căn phòng hoàn toàn mới SAU KHI đã được tư vấn phòng cũ:
  let curAskedDims = switchedRoom ? new Set(['room']) : askedDims;
  let curQuestionsAsked = switchedRoom ? 1 : baseCtx.questionsAsked;

  const hasNeutralDiscoveryAnswer = hasPhrase(padded, [
    'tim 1 tam rem', 'tim rem', 'mua rem', 'chon rem', 'may rem', 'dat rem', 'tu van', 'phu hop',
    'khong', 'co', 'vua', 'binh thuong', 'tuy ban', 'sao cung duoc', 'mau nao cung duoc',
    'khong yeu cau', 'khong can gi them', 'khong biet', 'chua biet', 'chua ro', 'chua co', 'chua do'
  ]);

  const hasCustomerProvidedSignal = Boolean(
    signals.room ||
    signals.orientation ||
    signals.lightNeed ||
    signals.acousticNeed ||
    signals.categoryPref ||
    signals.windowSize ||
    signals.style ||
    signals.requestedColor ||
    signals.colorTone ||
    signals.budget ||
    signals.budgetTarget ||
    signals.smartInterest !== null ||
    signals.cleaningPriority ||
    signals.windowMount ||
    dimensions ||
    hasNeutralDiscoveryAnswer
  );

  // Kiểm tra câu hỏi ngoài lề (chỉ báo ngoài chủ đề khi thực sự lạc đề hoặc không nằm trong mạch hỏi đáp rèm)
  const obviousOffTopic = hasPhrase(padded, [
    'thoi tiet', 'sai gon nong', 'mua bao', 'an gi', 'uong gi', 'code', 'python', 'javascript',
    'bong da', 'chung khoan', 'gia vang', 'xo so', 'ke chuyen', 'hat mot bai'
  ]);
  const isPureOffTopic = (!hasCustomerProvidedSignal && faqAnswers.length === 0) &&
    (obviousOffTopic || !baseCtx.lastAskedDim || trimmed.split(/\s+/).length > 4);

  if (isPureOffTopic) {
    return {
      type: 'faq',
      delayMs: 450,
      curtain: null,
      text: 'Mình là trợ lý chuyên tư vấn rèm cửa và giải pháp ánh sáng nội thất tại UniVeloria nên chưa hỗ trợ được nội dung ngoài chủ đề này ạ. Bạn đang cần tìm rèm cho phòng nào hoặc muốn hỏi giá/chất liệu cứ nhắn mình nhé!',
      updatedContext: { ...baseCtx, lastBotTopic: 'off_topic' }
    };
  }

  // Ghi nhận chiều hiện tại vừa được user trả lời (trừ trường hợp FAQ thuần hoặc câu hỏi ngoài lề)
  const isPureFaqQuestionOnly = faqAnswers.length > 0 &&
    !signals.room && !signals.orientation && !signals.lightNeed &&
    !signals.categoryPref && !signals.windowSize && !signals.style &&
    !signals.requestedColor && !signals.colorTone && !signals.budget &&
    signals.smartInterest === null;

  if (baseCtx.lastAskedDim && hasCustomerProvidedSignal && !isPureFaqQuestionOnly) {
    curAskedDims.add(baseCtx.lastAskedDim);
    if (baseCtx.lastAskedDim === 'room_and_sunlight') {
      curAskedDims.add('room');
      if (merged.lightNeed || merged.orientation) curAskedDims.add('sunlight');
    }
  }
  if (merged.room) curAskedDims.add('room');
  if (merged.lightNeed || merged.orientation) curAskedDims.add('sunlight');
  if (merged.categoryPref && merged.windowSize) curAskedDims.add('window_category');
  if (merged.style) curAskedDims.add('interior');
  if (merged.requestedColor || merged.colorTone) curAskedDims.add('color');
  if (merged.budget || merged.dimensions) curAskedDims.add('budget_size');
  if (merged.smartInterest !== null) curAskedDims.add('motor');

  // Tính số chiều thông tin đã thu thập
  const collectedCount = [
    merged.room,
    merged.lightNeed || merged.orientation,
    merged.categoryPref || merged.windowSize,
    merged.style,
    merged.requestedColor || merged.colorTone,
    merged.budget || merged.dimensions,
    merged.smartInterest !== null ? merged.smartInterest : null
  ].filter((v) => v !== null && v !== undefined).length;

  // Kiểm tra user có chủ động đòi xem sản phẩm NGAY LẬP TỨC không ("gợi ý luôn đi", "đừng hỏi nữa", "cho xem mẫu ngay")
  const wantsImmediateProduct = hasPhrase(padded, [
    'goi y luon', 'goi y ngay', 'cho xem luon', 'cho xem ngay', 'xem mau luon',
    'dung hoi nua', 'khoi hoi nua', 'dua mau ra', 'xem san pham ngay', 'tu van nhanh di',
    'chon giup luon'
  ]);

  // Nếu đã tư vấn sản phẩm rồi và khách hỏi thêm câu hỏi FAQ chung (giao hàng, lắp đặt, cách đo, in tranh...): trả lời gọn FAQ, không gửi lại thẻ sản phẩm
  if (hasRecommended && isPureFaqQuestionOnly) {
    return {
      type: 'faq',
      delayMs: 500,
      curtain: null,
      text: faqAnswers.join('\n\n'),
      updatedContext: { ...baseCtx, lastBotTopic: 'faq' }
    };
  }

  if (dimensions && !merged.room && curQuestionsAsked === 0) {
    const a = dimensions.areaM2;
    const dimLabel = dimensions.widthM ? `${dimensions.widthM}m × ${dimensions.heightM}m (${a}m²)` : `${a}m²`;
    const rollerEst = `${formatVnd(a * 395000)} – ${formatVnd(a * 550000)}`;
    const rainbowEst = `${formatVnd(a * 720000)} – ${formatVnd(a * 770000)}`;
    const drapeEst = `${formatVnd(a * 780000)} – ${formatVnd(a * 790000)}`;
    curAskedDims.add('budget_size');
    curAskedDims.add('room');
    return {
      type: 'question',
      delayMs: 550,
      curtain: null,
      text: `Với kích thước **${dimLabel}** (đã kèm phụ kiện ray treo chuẩn), chi phí ước tính theo dòng là:\n• **Rèm Cuốn:** ${rollerEst}\n• **Rèm Cầu Vồng:** ${rainbowEst}\n• **Rèm Vải:** ${drapeEst}\n\nĐể mình lọc ra đúng 1 mẫu chuẩn nhất trong tầm đó, bạn dự định lắp bộ rèm này cho **phòng nào** ạ?`,
      updatedContext: {
        ...baseCtx,
        ...merged,
        questionsAsked: 1,
        askedDims: Array.from(curAskedDims),
        lastAskedDim: 'room',
        lastBotTopic: 'calc_price_and_ask'
      }
    };
  }

  // QUYẾT ĐỊNH: TIẾP TỤC HỎI ĐỂ TƯƠNG TÁC (TẦM 5-7 CÂU) HAY CHỐT ĐƯA RA SẢN PHẨM?
  const nextQuestionObj = pickNextDiscoveryQuestion(merged, curAskedDims, baseCtx.lastAskedDim);

  // Điều kiện sẵn sàng đưa sản phẩm:
  // - User yêu cầu xem ngay (wantsImmediateProduct)
  // - HOẶC không phải câu hỏi FAQ thuần, và đã hỏi >= 5 câu khi thu thập đủ 6 tiêu chí, hoặc đã hỏi >= 6 câu
  const readyToShowProduct = wantsImmediateProduct ||
    (!isPureFaqQuestionOnly && (
      (curQuestionsAsked >= 5 && (collectedCount >= 6 || !nextQuestionObj)) ||
      (curQuestionsAsked >= 6)
    ));

  if (!readyToShowProduct && nextQuestionObj) {
    const reaction = buildReactionToTurn({ ...signals, dimensions }, faqAnswers, trimmed, padded, baseCtx);
    const shouldIncrementTurn = !isPureFaqQuestionOnly;
    const nextTurnNum = shouldIncrementTurn ? curQuestionsAsked + 1 : curQuestionsAsked;

    // Nếu user vừa hỏi câu hỏi FAQ thuần giữa chừng -> trả lời xong nối tự nhiên lại mạch tư vấn
    let combinedReply = '';
    if (isPureFaqQuestionOnly && baseCtx.lastAskedDim) {
      combinedReply = `${reaction}\n\nQuay lại để chọn đúng mẫu cho nhà mình nhé: ${nextQuestionObj.question.charAt(0).toLowerCase() + nextQuestionObj.question.slice(1)}`;
    } else if (reaction) {
      combinedReply = `${reaction}\n\n${nextQuestionObj.question}`;
    } else {
      combinedReply = nextQuestionObj.question;
    }

    curAskedDims.add(nextQuestionObj.dim);

    return {
      type: 'question',
      delayMs: 550,
      curtain: null,
      text: combinedReply,
      updatedContext: {
        ...baseCtx,
        ...merged,
        hasRecommendedProduct: false,
        questionsAsked: nextTurnNum,
        askedDims: Array.from(curAskedDims),
        lastAskedDim: nextQuestionObj.dim,
        lastBotTopic: 'discovery_question'
      }
    };
  }

  // ĐÃ ĐỦ 5–7 CÂU HỎI TƯƠNG TÁC HOẶC USER YÊU CẦU XEM NGAY -> ĐƯA RA SẢN PHẨM PHÙ HỢP NHẤT!
  const chosen = selectBestCurtain(curtainPool, dislikedIds, recommendedIds, merged);
  const faqLead = faqAnswers.length > 0 ? `${faqAnswers.join('\n')}\n\n` : '';
  const finalText = faqLead + buildFinalRecommendationText(chosen, merged, merged.dimensions);

  return {
    type: 'final_consultation',
    delayMs: 950,
    finalText,
    curtain: chosen,
    updatedContext: {
      ...baseCtx,
      ...merged,
      hasRecommendedProduct: true,
      questionsAsked: curQuestionsAsked,
      askedDims: Array.from(curAskedDims),
      lastCurtainId: chosen.id,
      lastBotTopic: 'product_card',
      recommendedCurtainIds: Array.from(new Set([...recommendedIds, chosen.id])),
      dislikedProductIds: Array.from(dislikedIds)
    }
  };
}

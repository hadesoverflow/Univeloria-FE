import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ExternalLink, Dices } from 'lucide-react';

// =============================================================================
// HỒ SƠ 14 SẢN PHẨM CHÍNH HÃNG UNIVELORIA
// - 4 Mẫu Rèm Cầu Vồng (Duo Onyx, Duo Eclipse, Duo Riviera, Duo Orion)
// - 5 Mẫu Rèm Cuốn (Shade Aria, Shade Melange, Shade Luna, Shade Elara, Shade Solis)
// - 3 Mẫu Rèm Vải (Drape Elysia, Drape Celeste, Drape Aurelia)
// - 2 Mẫu Thanh Rèm & Động Cơ Tự Động (Smart Automation A25 Pro & R25)
// =============================================================================
export const CURTAIN_PROFILES = [
  {
    "id": 1,
    "studioId": "rainbow-brioni",
    "name": "Duo Onyx Blackout",
    "category": "Rèm cầu vồng",
    "price": 740000,
    "priceDisplay": "Từ 740.000đ / m²",
    "image": "/product/Rèm/Rèm Cầu Vòng/Duo Onyx Blackout.png",
    "badge": "Cản Sáng 94% · Vân Gỗ",
    "story": "Bề mặt vân dệt gỗ xước ngang tự nhiên Wood-grain mang đến sự trầm ấm, sang trọng và khả năng cản sáng đến 94%. Cơ chế nan 2 lớp so le xoay lật 180 độ điều chỉnh ánh sáng linh hoạt, vừa riêng tư vừa thoáng đãng.",
    "whyChoose": "Bề mặt dệt xước vân gỗ Wood-grain với độ dày sợi cao cấp giúp cản sáng 94% và hạ nhiệt tối ưu. Rất phù hợp với phòng thờ tôn nghiêm hoặc không gian có nhiều nội thất gỗ, tạo nên sự đồng điệu mộc mạc và phong thủy hanh thông.",
    "pros": [
      "Bề mặt vân dệt gỗ Wood-grain tự nhiên, mang lại sự sang trọng mộc mạc và đồng điệu với đồ gỗ.",
      "Khả năng cản sáng 94% và hạ nhiệt tối ưu, ngăn tia bức xạ cực tím làm bạc màu nội thất.",
      "Cơ chế nan 2 lớp so le xoay lật 180 độ điều chỉnh ánh sáng linh hoạt, giữ trọn sự riêng tư."
    ],
    "keywords": [
      "cau vong",
      "onyx",
      "van go",
      "go",
      "nau",
      "am cung",
      "phong tho",
      "ban tho",
      "gian tho",
      "ton nghiem",
      "phong ngu",
      "can sang",
      "huong tay",
      "nang gat"
    ]
  },
  {
    "id": 2,
    "studioId": "rainbow-infiniti",
    "name": "Duo Eclipse Blackout",
    "category": "Rèm cầu vồng",
    "price": 720000,
    "priceDisplay": "Từ 720.000đ / m²",
    "image": "/product/Rèm/Rèm Cầu Vòng/Duo Eclipse Blackout.png",
    "badge": "Cản Sáng 90% · Nẹp Viền",
    "story": "Cấu trúc nan nẹp viền sáng kép Dual-Border nổi bật, mang lại đường nét kiến trúc sắc sảo và chiều sâu thị giác ấn tượng. Khả năng cản sáng 90% kết hợp bộ cơ trợ lực giúp rèm vận hành êm ái.",
    "whyChoose": "Cấu trúc nẹp viền sáng kép độc quyền tạo chiều sâu kiến trúc sắc sảo, cản sáng 90% êm dịu. Thích hợp cho phòng ngủ, phòng làm việc và phòng thờ cần sự tĩnh lặng, kín đáo và trang nghiêm.",
    "pros": [
      "Nan nẹp viền sáng kép Dual-Border độc quyền, tạo hiệu ứng thị giác sắc sảo, hiện đại.",
      "Cản sáng 90% kết hợp lọc sáng êm dịu, giữ không gian luôn dịu mát và thanh bình.",
      "Bộ cơ trợ lực cuốn mượt mà, độ bền ổn định cao và chống bám bụi hiệu quả."
    ],
    "keywords": [
      "cau vong",
      "eclipse",
      "nep vien",
      "dual border",
      "tinh te",
      "phong tho",
      "phong ngu",
      "lam viec",
      "can sang",
      "am cung"
    ]
  },
  {
    "id": 3,
    "studioId": "rainbow-river",
    "name": "Duo Riviera",
    "category": "Rèm cầu vồng",
    "price": 720000,
    "priceDisplay": "Từ 720.000đ / m²",
    "image": "/product/Rèm/Rèm Cầu Vòng/Duo Riviera.png",
    "badge": "10 Tông Màu · Bền Bỉ",
    "story": "Bộ sưu tập 10 mã màu phong phú từ pastel dịu mát đến xanh than thanh lịch. Chất liệu polyester dệt chắc, chống bám bụi và chống tia UV hiệu quả, chuyển đổi mượt mà giữa lấy sáng và riêng tư.",
    "whyChoose": "Sở hữu bảng màu đa dạng nhất với 10 tông màu hiện đại, dễ dàng đồng điệu với mọi màu sơn tường và phong cách nội thất. Độ bền cao, ít bám bụi, thích hợp cho phòng khách, phòng ngủ và văn phòng làm việc.",
    "pros": [
      "Bảng 10 tông màu đa dạng từ be kem, nâu đất đến xanh than, phối hợp hoàn hảo với mọi nội thất.",
      "Chất liệu polyester dệt chắc chắn, chống bám bụi và chống tia UV bảo vệ sức khỏe.",
      "Cấu trúc 2 lớp thông minh điều chỉnh ánh sáng linh hoạt theo từng thời điểm trong ngày."
    ],
    "keywords": [
      "cau vong",
      "riviera",
      "10 mau",
      "da dang",
      "ben bi",
      "phong khach",
      "van phong",
      "can ho",
      "chung cu",
      "hien dai"
    ]
  },
  {
    "id": 4,
    "studioId": "rainbow-dragon",
    "name": "Duo Orion Blackout",
    "category": "Rèm cầu vồng",
    "price": 770000,
    "priceDisplay": "Từ 770.000đ / m²",
    "image": "/product/Rèm/Rèm Cầu Vòng/Duo Orion Blackout.png",
    "badge": "Cản Sáng 95% · Melange",
    "story": "Cấu trúc sợi dệt đan khít mật độ cao dạng ma trận melange, tạo độ cản sáng vượt trội 95% và bề mặt phẳng mịn hiện đại. Bộ sưu tập tông xám và nâu ấm là giải pháp cản nắng hoàn hảo cho kiến trúc tối giản.",
    "whyChoose": "Chất vải dệt melange xước cao cấp cản sáng lên tới 95%, giải quyết triệt để vấn đề chói nắng và bức xạ nhiệt. Thiết kế lì phẳng tinh tế, thời thượng cho những gia chủ yêu phong cách tối giản và hiện đại.",
    "pros": [
      "Sợi dệt melange mật độ cao cản sáng đến 95%, cách nhiệt vượt trội cho phòng hướng Tây.",
      "Bề mặt phẳng lì tối giản, mang phong thái thời thượng và không lo bai dão hay co rút.",
      "Cơ chế cuốn trợ lực lò xo êm ái, đóng mở nhẹ nhàng, độ bền trên 10 năm."
    ],
    "keywords": [
      "cau vong",
      "orion",
      "melange",
      "can sang 95",
      "toi gian",
      "hien dai",
      "phong ngu",
      "phong hop",
      "huong tay",
      "nang gat"
    ]
  },
  {
    "id": 5,
    "studioId": "roller-harmony",
    "name": "Shade Aria",
    "category": "Rèm cuốn",
    "price": 460000,
    "priceDisplay": "Từ 460.000đ / m²",
    "image": "/product/Rèm/Rèm Cuốn/Shade Aria.png",
    "badge": "Gân Mịn · Cách Nhiệt 30%",
    "story": "Bề mặt gân mịn corded fine rib giúp rèm giữ form đứng phẳng, cản nhiệt tốt, tiết kiệm đến 25% điện năng điều hòa. Lớp phủ nano chống bám bụi và chống thấm nước vượt trội.",
    "whyChoose": "Khả năng cản sáng 95% kết hợp lớp phủ nano chống thấm nước và chống bám bụi dễ lau chùi. Thiết kế cuộn phẳng đứng phom, cách nhiệt tốt giúp phòng luôn mát mẻ và gọn gàng tuyệt đối.",
    "pros": [
      "Bề mặt gân mịn cao cấp phủ nano chống bám bụi và chống thấm nước, lau sạch chỉ bằng khăn ẩm.",
      "Cách nhiệt 30%, cản sáng 95%, tiết kiệm điện năng điều hòa hiệu quả.",
      "Độ bền màu cao, không bị phai màu dưới tác động của bức xạ mặt trời."
    ],
    "keywords": [
      "cuon",
      "aria",
      "gan min",
      "cach nhiet",
      "chong tham",
      "van phong",
      "phong khach",
      "gon gang",
      "gia tot"
    ]
  },
  {
    "id": 6,
    "studioId": "roller-melange",
    "name": "Shade Mélange",
    "category": "Rèm cuốn",
    "price": 395000,
    "priceDisplay": "Từ 395.000đ / m²",
    "image": "/product/Rèm/Rèm Cuốn/Shade Mélange.png",
    "badge": "Hoa Râm Đa Sắc · Giá Tốt",
    "story": "Hiệu ứng dệt hoa râm đan xen tinh tế mang làn gió thẩm mỹ đương đại. Chất vải mềm nhưng đứng phom, độ cản sáng 90-95% làm dịu ánh nắng gắt nhiệt đới, tạo không gian thư thái cho căn hộ và studio.",
    "whyChoose": "Mức giá tối ưu nhất phân khúc nhưng vẫn sở hữu sợi dệt Melange hoa râm thời thượng, cản sáng 90-95%. Rất thích hợp cho căn hộ chung cư, phòng làm việc cần sự trẻ trung, thanh lịch và tiết kiệm ngân sách.",
    "pros": [
      "Mức giá cực kỳ hấp dẫn từ 395.000đ/m², tối ưu ngân sách đầu tư cho toàn bộ ngôi nhà.",
      "Hiệu ứng hoa râm Melange thanh lịch, che khuyết điểm bụi bẩn và tạo chiều sâu trang nhã.",
      "Kháng khuẩn, chống ẩm mốc tốt trong môi trường khí hậu nhiệt đới ẩm."
    ],
    "keywords": [
      "cuon",
      "melange",
      "hoa ram",
      "gia re",
      "tiet kiem",
      "can ho",
      "chung cu",
      "studio",
      "gon gang",
      "hien dai"
    ]
  },
  {
    "id": 7,
    "studioId": "roller-moon",
    "name": "Shade Luna",
    "category": "Rèm cuốn",
    "price": 460000,
    "priceDisplay": "Từ 460.000đ / m²",
    "image": "/product/Rèm/Rèm Cuốn/Shade Luna.png",
    "badge": "100% Blackout Tuyệt Đối",
    "story": "Giải pháp cản sáng tuyệt đối 100% Blackout nhờ lớp tráng bọt Foam cách nhiệt 3 lớp. Chặn đứng toàn bộ ánh nắng mặt trời và giảm nhiệt độ phòng đến 5 độ C vào những ngày hè oi bức.",
    "whyChoose": "Chặn sáng tuyệt đối 100% không lọt một kẽ nắng, đồng thời hạ nhiệt phòng đến 5 độ C nhờ lớp Foam tráng bạc 3 lớp. Lựa chọn số 1 cho cửa sổ nhỏ phòng thờ đón nắng gắt, phòng ngủ cần tối đen để ngủ sâu hoặc phòng chiếu phim.",
    "pros": [
      "Cản sáng 100% Blackout tuyệt đối, tạo bóng tối hoàn hảo và sự riêng tư trọn vẹn.",
      "Cách nhiệt đến 45%, hạ nhiệt mặt kính rõ rệt, bảo vệ đồ nội thất gỗ không bị cong vênh.",
      "Kháng tia UV 99%, chống nóng bỏng rát ở các khung cửa sổ hướng Tây."
    ],
    "keywords": [
      "cuon",
      "luna",
      "100 blackout",
      "toi tuyet doi",
      "chong nong",
      "foam",
      "cach nhiet",
      "phong tho",
      "phong ngu",
      "huong tay",
      "nang gat"
    ]
  },
  {
    "id": 8,
    "studioId": "roller-silvia",
    "name": "Shade Elara",
    "category": "Rèm cuốn",
    "price": 520000,
    "priceDisplay": "Từ 520.000đ / m²",
    "image": "/product/Rèm/Rèm Cuốn/Shade Elara.png",
    "badge": "Jacquard Quý Phái · Chuẩn B1",
    "story": "Công nghệ dệt hoa văn Jacquard gân chéo Diamond Twill sắc nét nâng tầm dòng rèm cuốn thông thường lên đẳng cấp nghệ thuật. Sợi vải dày dặn cản sáng 98% và khả năng chống cháy lan đạt tiêu chuẩn B1 quốc tế.",
    "whyChoose": "Họa tiết Jacquard gân chéo dập nổi sang trọng và chuẩn chống cháy lan B1 an toàn tuyệt đối. Phù hợp cho không gian tôn nghiêm như phòng thờ, phòng khách biệt thự hoặc phòng làm việc đòi hỏi sự trang trọng, chỉn chu.",
    "pros": [
      "Họa tiết Jacquard dập nổi Diamond Twill mang phong thái cổ điển Châu Âu quý phái.",
      "Cản sáng 98%, chống cháy lan tiêu chuẩn B1 quốc tế đảm bảo an toàn tối đa.",
      "Hộp máng nhôm định hình cao cấp, vận hành êm ái và che chắn kín đáo."
    ],
    "keywords": [
      "cuon",
      "elara",
      "jacquard",
      "sang trong",
      "co dien",
      "chong chay",
      "phong tho",
      "biet thu",
      "quan trong",
      "ton nghiem"
    ]
  },
  {
    "id": 9,
    "studioId": "roller-sunny",
    "name": "Shade Solis",
    "category": "Rèm cuốn",
    "price": 550000,
    "priceDisplay": "Từ 550.000đ / m²",
    "image": "/product/Rèm/Rèm Cuốn/Shade Solis.png",
    "badge": "Lọc Sáng Tự Nhiên · Cản UV",
    "story": "Mắt lưới Micro Sunscreen lọc sáng dịu mát, ngăn 95% tia UV nhưng vẫn giữ trọn 100% tầm nhìn view khoáng đạt. Thiết kế cuộn gọn gàng tuyệt đối trong hộp máng, tiết kiệm diện tích tối ưu cho khung cửa sổ.",
    "whyChoose": "Tận dụng trọn vẹn nguồn sáng tự nhiên mà không lo chói mắt hay hại da nhờ mắt lưới vi mảnh cản 95% tia UV. Giữ trọn tầm nhìn ngắm cảnh sân vườn, ban công, mở rộng không gian cho phòng khách và góc làm việc.",
    "pros": [
      "Mắt lưới Micro Sunscreen khử tia chói gắt, lọc sáng dịu mát nhưng vẫn ngắm cảnh nhìn ra ngoài rõ nét.",
      "Cuộn lên 100% gọn gàng trong máng nhôm, không chiếm diện tích bậu cửa sổ.",
      "Sợi thủy tinh bọc Vinyl bền bỉ với nắng mưa, không giòn gãy và rất dễ vệ sinh."
    ],
    "keywords": [
      "cuon",
      "solis",
      "loc sang",
      "ngam view",
      "view",
      "ban cong",
      "phong khach",
      "lam viec",
      "thoang mat",
      "anh sang"
    ]
  },
  {
    "id": 10,
    "studioId": "elogi-1198-2",
    "name": "Drape Elysia",
    "category": "Rèm vải",
    "price": 780000,
    "priceDisplay": "Từ 780.000đ / m²",
    "image": "/product/Rèm/Rèm Vải/Drape Elysia.png",
    "badge": "Chuẩn Khách Sạn 5 Sao",
    "story": "May sóng chữ S bồng bềnh từ trần xuống sàn chuẩn khách sạn 5 sao kết hợp sợi gấm Nhật Bản cản sáng 95%. Tôn vinh vẻ trang nhã, bề thế cho phòng khách biệt thự và các khung cửa kính lớn.",
    "whyChoose": "Định hình chuẩn mực kiến trúc bề thế với từng múi sóng rèm đổ đều tăm tắp từ trần xuống sàn. Sợi gấm dệt thô cao cấp phong cách Nhật Bản cản sáng 95%, cách nhiệt và tiêu âm tĩnh lặng cho những gian phòng rộng lớn.",
    "pros": [
      "Kỹ thuật may sóng chữ S bồng bềnh chuẩn 5 sao, định hình đẳng cấp bề thế cho ngôi nhà.",
      "Sợi gấm dệt thô phong cách Nhật Bản kháng khuẩn chuẩn Châu Âu, cản sáng 95% và cách nhiệt tối ưu.",
      "Tiêu âm vượt trội, giảm tiếng vang và tạp âm từ bên ngoài, mang lại không gian yên tĩnh."
    ],
    "keywords": [
      "vai",
      "elysia",
      "5 sao",
      "song s",
      "phong khach",
      "biet thu",
      "cua lon",
      "be the",
      "sang trong",
      "nhat ban"
    ]
  },
  {
    "id": 11,
    "studioId": "elogi-1206-1",
    "name": "Drape Celeste",
    "category": "Rèm vải",
    "price": 790000,
    "priceDisplay": "Từ 790.000đ / m²",
    "image": "/product/Rèm/Rèm Vải/Drape Celeste.png",
    "badge": "Nâu Gỗ Trầm · Êm Mịn",
    "story": "Được dệt từ sợi lanh thô mộc kết hợp sợi microfiber với tone màu nâu sô-cô-la và xám be mocha ấm áp. Chất vải mềm rũ tự nhiên không nhăn nhàu, cản sáng 90% và cách âm 35% cho không gian nghỉ dưỡng thanh tịnh.",
    "whyChoose": "Tone nâu gỗ trầm và be mocha ấm cúng mang năng lượng an lành, cực kỳ tương hợp với không gian tôn nghiêm của phòng thờ và sự thư thái của phòng ngủ. Vải mềm rũ tự nhiên, tiêu âm 35% giữ không gian luôn tĩnh lặng.",
    "pros": [
      "Tone nâu trầm và be mocha ấm áp, đồng điệu tuyệt đối với bàn thờ gia tiên và đồ gỗ nội thất.",
      "Chất liệu lanh pha microfiber mềm rũ tự nhiên, không nhăn nhúm, an toàn cho sức khỏe không chứa Formaldehyde.",
      "Cách âm giảm tiếng ồn 35%, mang lại sự thanh tịnh, tôn nghiêm cho phòng thờ và an yên cho giấc ngủ."
    ],
    "keywords": [
      "vai",
      "celeste",
      "nau go",
      "tram am",
      "mocha",
      "phong tho",
      "ban tho",
      "gian tho",
      "ton nghiem",
      "phong ngu",
      "nghi duong",
      "tinh lang"
    ]
  },
  {
    "id": 12,
    "studioId": "elogi-1230-1",
    "name": "Drape Aurelia",
    "category": "Rèm vải",
    "price": 780000,
    "priceDisplay": "Từ 780.000đ / m²",
    "image": "/product/Rèm/Rèm Vải/Drape Aurelia.png",
    "badge": "Cát Vàng Kem Japandi",
    "story": "Lấy cảm hứng từ triết lý sống tối giản Japandi với tone cát vàng kem mộc mạc và sợi dệt đan thô thân thiện môi trường. Cân bằng thị giác, xua tan căng thẳng và tôn lên nét sang trọng của nội thất gỗ tự nhiên.",
    "whyChoose": "Sắc cát vàng kem Japandi mộc mạc mang sinh khí ấm áp tự nhiên của đất trời, rất tốt cho phong thủy phòng thờ và không gian sum vầy gia đình. Chất vải Eco-friendly dệt gân nổi mộc mạc, chống bám bụi và bền màu lâu năm.",
    "pros": [
      "Sắc cát vàng kem Japandi mộc mạc mang sinh khí ấm áp, cân bằng phong thủy thị giác.",
      "Chất liệu Eco-friendly dệt gân nổi mộc mạc, không hóa chất độc hại, thân thiện với môi trường.",
      "Cản sáng 85-90% dịu êm, chống bám bụi, giặt ủi nhanh khô và không co rút."
    ],
    "keywords": [
      "vai",
      "aurelia",
      "cat vang",
      "kem",
      "japandi",
      "eco friendly",
      "phong tho",
      "phong an",
      "moc mac",
      "am cung",
      "phong thuy"
    ]
  },
  {
    "id": 13,
    "studioId": "elogi-1198-2",
    "name": "Smart Automation A25 Pro",
    "category": "Thanh rèm",
    "price": 2800000,
    "priceDisplay": "Từ 2.800.000đ / bộ",
    "image": "/product/Thanh Rèm/Smart Automation A25 Pro.png",
    "badge": "Smart Motor Tự Động",
    "story": "Đỉnh cao công nghệ Smart Home cho rèm cửa: Động cơ siêu tĩnh âm <25dB công nghệ Đức, hỗ trợ kéo tay nhẹ Touch Motion và điều khiển giọng nói qua Apple HomeKit / Google Assistant. Thanh ray nhôm hàng không 6063-T5 chịu tải 60kg, tự động đóng mở theo lịch trình mỗi ngày.",
    "whyChoose": "Smart Automation A25 Pro giải phóng hoàn toàn sức lao động, nâng cấp căn phòng thành không gian sống thông minh đẳng cấp quốc tế. Động cơ không chổi than Brushless siêu êm không phát ra tiếng ồn (<25dB), tải trọng cực đại 60kg cho mọi bộ rèm vải dày, tính năng kéo tay nhẹ tự chạy (Touch Motion) và bảo hành đổi mới 5 năm chính hãng.",
    "pros": [
      "Động cơ Brushless không chổi than siêu tĩnh âm <25dB công nghệ Đức, không phát ra tiếng ồn.",
      "Tích hợp thông minh: Kéo tay nhẹ tự chạy (Touch Motion), điều khiển Apple HomeKit / Google Assistant.",
      "Thanh ray nhôm hàng không 6063-T5 tải trọng 60kg, bảo hành đổi mới 5 năm chính hãng."
    ],
    "keywords": [
      "thanh rem",
      "thanh ray",
      "dong co",
      "tu dong",
      "smart",
      "motor",
      "homekit",
      "google",
      "dieu khien",
      "ray rem",
      "ray tu dong",
      "thanh treo",
      "a25",
      "automation"
    ]
  },
  {
    "id": 14,
    "studioId": "elogi-1198-2",
    "name": "Smart Automation R25",
    "category": "Thanh rèm",
    "price": 2500000,
    "priceDisplay": "Từ 2.500.000đ / bộ",
    "image": "/product/Thanh Rèm/Smart Automation R25.png",
    "badge": "Ray Bi Teflon Siêu Mượt",
    "story": "Hệ rãnh trượt bi con lăn phủ hạt nhựa Teflon tự bôi trơn siêu êm ái, kéo rèm lướt nhẹ như nhung không phát ra tiếng động. Nhôm đúc nguyên khối chịu lực uốn cong 90 độ hoặc bo tròn theo góc cửa sổ vòng cung, độ bền trên 15 năm.",
    "whyChoose": "Smart Automation R25 khắc phục triệt để hiện tượng kẹt rít, võng ray của các loại thanh treo thông thường. Hệ bi phủ hạt nhựa Teflon tự bôi trơn giúp rèm vải nặng lướt êm ái như nhung, kết hợp khả năng uốn góc 90 độ theo kiến trúc cửa sổ bo cong với độ bền trên 15 năm mà không cần bảo dưỡng.",
    "pros": [
      "Hệ rãnh trượt con lăn phủ hạt nhựa Teflon tự bôi trơn siêu êm ái, kéo nhẹ như lướt trên nhung.",
      "Uốn cong 90 độ hoặc bo tròn góc cửa sổ vòng cung linh hoạt theo mọi kiến trúc.",
      "Nhôm đúc nguyên khối chịu tải 60kg, độ bền trên 15 năm không lo xệ máng hay kẹt rít."
    ],
    "keywords": [
      "thanh rem",
      "thanh treo",
      "ray rem",
      "ray bi",
      "teflon",
      "sieu muot",
      "uon cong",
      "keo tay",
      "ben bi",
      "phu kien",
      "thanh ray co",
      "r25"
    ]
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
// AI ANALYSIS ENGINE: TƯ VẤN THÔNG MINH, KHÔNG CỨNG NHẮC
// - Thêm mục Phòng Thờ gia tiên tôn nghiêm, chuẩn phong thủy
// - Hiểu ngữ nghĩa câu hỏi, trả lời trực tiếp và đưa ra câu hỏi gợi mở bám sát ngữ cảnh
// - Theo dõi dislikedProductIds: TUYỆT ĐỐI KHÔNG lặp lại sản phẩm người dùng không thích
// - Chỉ lặp lại nếu người dùng chủ động yêu cầu xem lại mẫu đó
// =============================================================================
export function analyzeUserMessage(rawInput, context = {}, currentCurtainId = null) {
  const trimmed = (rawInput || '').trim();
  const norm = normalizeText(trimmed);

  const dislikedIds = new Set(context.dislikedProductIds || []);
  const recommendedIds = new Set(context.recommendedCurtainIds || []);
  const curtainPool = CURTAIN_PROFILES.filter(c => c.category !== 'Thanh rèm');

  // Helper to pick candidate not in dislikedIds
  const pickCandidate = (preferredIds = []) => {
    let candidates = curtainPool.filter(c => !dislikedIds.has(c.id));
    if (candidates.length === 0) {
      dislikedIds.clear();
      candidates = curtainPool;
    }
    // Prefer non-recommended first from preferredIds
    for (const pId of preferredIds) {
      const found = candidates.find(c => c.id === pId && !recommendedIds.has(c.id));
      if (found) return found;
    }
    // Otherwise any from preferredIds
    for (const pId of preferredIds) {
      const found = candidates.find(c => c.id === pId);
      if (found) return found;
    }
    // Otherwise any non-recommended
    const fresh = candidates.filter(c => !recommendedIds.has(c.id));
    return fresh.length > 0 ? fresh[0] : candidates[0];
  };

  // 1. Phân tích nhu cầu về THANH RÈM / ĐỘNG CƠ TỰ ĐỘNG (Chỉ hiện khi khách hỏi)
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
                          norm.includes('treo rem') ||
                          norm.includes('a25') ||
                          norm.includes('r25');

  if (isThanhRemQuery) {
    const isAuto = norm.includes('tu dong') || norm.includes('smart') || norm.includes('dien thoai') || norm.includes('giong noi') || norm.includes('motor') || norm.includes('dong co') || norm.includes('app') || norm.includes('a25');
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
      delayMs: 3200,
      curtain: chosenRod,
      text: rodText,
      updatedContext: { ...context, lastCurtainId: chosenRod.id }
    };
  }

  // 2. YÊU CẦU ĐÍCH DANH XEM LẠI HOẶC CHỌN 1 MẪU RÈM CỤ THỂ
  const requestedSpecific = curtainPool.find(c => {
    const cNorm = normalizeText(c.name);
    return norm.includes(cNorm);
  });

  if (requestedSpecific && (norm.includes('xem') || norm.includes('cho toi') || norm.includes('quay lai') || norm.includes('chon mau') || norm.includes('mau nay') || norm.includes('tu van') || norm.includes('chi tiet'))) {
    dislikedIds.delete(requestedSpecific.id);
    return {
      type: 'final_consultation',
      delayMs: 3200,
      confirmText: `Dạ vâng! Tôi đã mở lại mẫu ${requestedSpecific.name} (${requestedSpecific.badge}) theo đúng yêu cầu của bạn. Bạn đợi tôi trong giây phút nhé!`,
      finalText: `TƯ VẤN CHUYÊN GIA: THÔNG TIN CHI TIẾT VỀ ${requestedSpecific.name.toUpperCase()}

1. Mức độ phù hợp với không gian:
Mẫu ${requestedSpecific.name} thuộc dòng ${requestedSpecific.category} cao cấp, được may đo hoàn thiện chuẩn xác theo kích thước thực tế của khung cửa.

2. Tại sao chọn nó:
${requestedSpecific.whyChoose}

3. Mặt tốt của nó:
${requestedSpecific.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria gửi bạn chi tiết mẫu ${requestedSpecific.name}:`,
      curtain: requestedSpecific,
      updatedContext: {
        ...context,
        lastCurtainId: requestedSpecific.id,
        dislikedProductIds: Array.from(dislikedIds),
        recommendedCurtainIds: [...recommendedIds, requestedSpecific.id]
      }
    };
  }

  // 3. YÊU CẦU ĐỔI MẪU KHÁC / NGƯỜI DÙNG KHÔNG THÍCH MẪU NÀY
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
                          norm.includes('xau qua') ||
                          norm.includes('don gian qua') ||
                          norm.includes('random') ||
                          norm.includes('ngau nhien');

  if (isChangeRequest) {
    const curId = currentCurtainId || context.lastCurtainId;
    if (curId) {
      dislikedIds.add(curId);
    }

    // Lọc pool: TUYỆT ĐỐI LOẠI BỎ các sản phẩm người dùng không thích
    let candidatePool = curtainPool.filter(c => !dislikedIds.has(c.id) && !recommendedIds.has(c.id));
    if (candidatePool.length === 0) {
      candidatePool = curtainPool.filter(c => !dislikedIds.has(c.id) && c.id !== curId);
    }
    if (candidatePool.length === 0) {
      candidatePool = curtainPool.filter(c => c.id !== curId);
    }

    const prevCategory = curtainPool.find(c => c.id === curId)?.category;
    const diffCategoryCandidates = candidatePool.filter(c => c.category !== prevCategory);
    const chosenPool = diffCategoryCandidates.length > 0 ? diffCategoryCandidates : candidatePool;
    const chosenAlt = chosenPool[Math.floor(Math.random() * chosenPool.length)] || curtainPool[0];

    const roomLabel = context.room?.label || 'căn phòng';

    const altText = `Tôi rất hiểu cảm nhận của bạn! Mỗi gia chủ và không gian sống đều có gu thẩm mỹ riêng. Tôi đã ghi nhận và loại bỏ mẫu vừa rồi, cam kết không lặp lại mẫu bạn không ưng ý nữa.

Tôi xin gửi tới bạn phương án thay thế với ngôn ngữ thiết kế hoàn toàn khác biệt:

TƯ VẤN PHƯƠNG ÁN THAY THẾ: GIẢI PHÁP RÈM PHÙ HỢP HƠN CHO ${roomLabel.toUpperCase()}

1. Mức độ phù hợp với không gian:
Phương án này khắc phục cảm giác chưa ưng ý của mẫu trước, mang đến diện mạo mới mẻ, hài hòa hơn nhưng vẫn đảm bảo tối ưu bài toán cản nhiệt, điều tiết ánh sáng và giữ vượng khí cho phòng.

2. Tại sao bạn bắt buộc phải chọn sản phẩm này:
${chosenAlt.whyChoose}

3. Mặt tốt & Ưu điểm vượt trội của sản phẩm:
${chosenAlt.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria khẳng định: ${chosenAlt.name} (${chosenAlt.badge}) là phương án thay thế chuẩn mực giúp hoàn thiện không gian sống của bạn:`;

    return {
      type: 'alternative_curtain',
      delayMs: 3400,
      curtain: chosenAlt,
      text: altText,
      updatedContext: {
        ...context,
        lastCurtainId: chosenAlt.id,
        dislikedProductIds: Array.from(dislikedIds),
        recommendedCurtainIds: [...recommendedIds, chosenAlt.id]
      }
    };
  }

  // 4. CẢM ƠN / TẠM BIỆT
  const thanksWords = ['cam on', 'thank', 'tuyet voi', 'hay qua', 'ok shop', 'tam biet', 'bye'];
  if (thanksWords.some(w => norm.includes(w)) && !norm.includes('phong') && !norm.includes('rem') && !norm.includes('nang')) {
    return {
      type: 'faq',
      delayMs: 600,
      curtain: null,
      text: "Dạ không có gì ạ! Rất vui được đồng hành tư vấn không gian cùng bạn. Bất cứ khi nào bạn cần phân tích hướng nắng, chất liệu vải hay trải nghiệm phối cảnh rèm 3D thực tế, tôi luôn sẵn sàng hỗ trợ nhé. Chúc bạn một ngày thật an yên và nhiều niềm vui! 🌿✨"
    };
  }

  // 5. CÂU HỎI VỀ BÁO GIÁ / CHI PHÍ
  const isPriceQuery = (norm.includes('gia') || norm.includes('tien') || norm.includes('chi phi') || norm.includes('bao nhieu')) &&
                       (norm.includes('bao nhieu') || norm.includes('1m') || norm.includes('met') || norm.includes('tinh') || norm.includes('bang gia') || norm.includes('dat khong') || norm.includes('re khong'));

  if (isPriceQuery) {
    return {
      type: 'faq',
      delayMs: 700,
      curtain: null,
      text: `Dạ bảng giá rèm tại UniVeloria được niêm yết công khai, minh bạch và tính theo diện tích m² thực tế (đã gồm đầy đủ phụ kiện chuẩn & công lắp đặt hoàn thiện):

• 🌟 Rèm Cuốn: Từ 395.000đ – 550.000đ / m² (Gọn gàng, cản nhiệt đến 100% Blackout)
• 🌈 Rèm Cầu Vồng: Từ 720.000đ – 770.000đ / m² (Dệt vân gỗ Woodgrain sang trọng, lấy sáng đa năng)
• 💎 Rèm Vải Cao Cấp: Từ 780.000đ – 790.000đ / m² (May sóng S bồng bềnh chuẩn 5 sao, gấm dệt Nhật Bản)
• ⚡ Thanh Ray & Động Cơ Tự Động: Từ 2.500.000đ – 2.800.000đ / bộ (Smart Automation A25 Pro & R25)

Bạn đang dự tính làm rèm cho không gian nào (như phòng khách, phòng ngủ, phòng thờ hay căn hộ...)? Hãy chia sẻ để tôi lên dự toán chuẩn xác nhất cho bạn nhé!`
    };
  }

  // 6. CÂU HỎI VỀ CÁC LOẠI RÈM / SO SÁNH CÁC DÒNG RÈM
  const isTypesQuery = norm.includes('co nhung loai') || 
                       norm.includes('cac loai rem') || 
                       norm.includes('cac dong rem') || 
                       norm.includes('nhung loai nao') || 
                       norm.includes('co loai nao') || 
                       norm.includes('co may loai') || 
                       norm.includes('phan biet') || 
                       norm.includes('loai rem gi');

  if (isTypesQuery) {
    return {
      type: 'faq',
      delayMs: 750,
      curtain: null,
      text: `Dạ hiện tại UniVeloria sản xuất và may đo 3 dòng rèm chính hãng cùng hệ thống điều khiển tự động:

1. 🌈 **Rèm Cầu Vồng (Dòng Duo)**: Cấu tạo 2 lớp nan so le xoay lật 180 độ, bề mặt vân gỗ Wood-grain hoặc dệt melange cản sáng 90-95%. Rất hiện đại, gọn gàng và điều tiết ánh sáng linh hoạt.
2. 🌟 **Rèm Cuốn (Dòng Shade)**: Cuộn phẳng đứng phom trong hộp máng nhôm. Nổi bật với khả năng cản sáng 100% Blackout (Shade Luna) hoặc mắt lưới vi mảnh ngắm view (Shade Solis).
3. 💎 **Rèm Vải Cao Cấp (Dòng Drape)**: Kỹ thuật may sóng chữ S bồng bềnh từ trần xuống sàn chuẩn khách sạn 5 sao, chất vải gấm Nhật Bản cách âm 35% và cách nhiệt bề thế.
4. ⚡ **Hệ Thanh Rèm & Động Cơ Tự Động (Smart Automation A25 Pro & R25)**: Động cơ siêu êm <25dB, tích hợp điều khiển giọng nói qua Apple HomeKit / Google Assistant.

Bạn quan tâm hoặc thích phong cách của dòng rèm nào trong các loại trên? Hãy chia sẻ để tôi tư vấn chi tiết hơn nhé!`
    };
  }

  // 7. CÂU HỎI VỀ KHẢ NĂNG CẢN NHIỆT / CHỐNG NẮNG GẮT
  const isHeatQuery = (norm.includes('can nhiet') || norm.includes('chong nong') || norm.includes('can sang') || norm.includes('cach nhiet') || norm.includes('100')) && (norm.includes('tot nhat') || norm.includes('loai nao') || norm.includes('the nao') || norm.includes('co tot khong') || norm.includes('giam nong'));

  if (isHeatQuery) {
    return {
      type: 'faq',
      delayMs: 750,
      curtain: null,
      text: `Dạ để chống nóng và cản nắng tối ưu cho nhà hướng Tây hoặc phòng nắng gắt, UniVeloria phân loại theo từng cấp độ giải pháp chuyên môn:

1. 🥇 **Cản nhiệt & Cản sáng 100% Tuyệt đối**: Mẫu Shade Luna (Rèm Cuốn) phủ 3 lớp bọt Foam cách nhiệt, giảm tới 5 độ C cho phòng đón nắng gay gắt.
2. 🥈 **Cản sáng 95% Sang trọng & Lì phẳng**: Mẫu Duo Orion Blackout (Rèm Cầu Vồng sợi melange mật độ cao) hoặc Drape Elysia (Rèm Vải gấm Nhật Bản may sóng S dày dặn).
3. 🥉 **Cản sáng 94% Ấm cúng vân gỗ**: Mẫu Duo Onyx Blackout (Rèm Cầu Vồng vân gỗ tự nhiên), bảo vệ đồ nội thất gỗ khỏi bạc màu.

Cửa sổ căn phòng của bạn hiện đang ở hướng nào (hướng Tây nắng chiều hay hướng Đông nắng sớm)? Tôi sẽ chọn đúng mẫu cản nhiệt chuẩn nhất cho bạn!`
    };
  }

  // 8. CÂU HỎI VỀ ĐO ĐẠC & LẮP ĐẶT
  const isInstallQuery = norm.includes('lap dat') || norm.includes('do dac') || norm.includes('thi cong') || norm.includes('khao sat') || norm.includes('bao lau') || norm.includes('co tinh phi khong');
  if (isInstallQuery) {
    return {
      type: 'faq',
      delayMs: 750,
      curtain: null,
      text: `Dạ quy trình may đo & lắp đặt tại UniVeloria rất nhanh chóng và hoàn toàn tiện lợi:

• 📏 **Khảo sát & Mang mẫu tận nhà**: Hoàn toàn MIỄN PHÍ. Kỹ thuật viên sẽ đem bảng mẫu vải thực tế đến tận nhà để bạn sờ chất liệu và phối thử với màu sơn tường.
• ⏱️ **Thời gian hoàn thiện**: Chỉ từ 24h – 48h từ khi chốt mẫu may đo.
• 🔧 **Thi công & Lắp đặt**: Kỹ thuật viên chuyên nghiệp lắp đặt chuẩn chỉ, sạch sẽ, hướng dẫn sử dụng và bàn giao trọn gói.
• 🛡️ **Bảo hành**: 5 năm đổi mới cho động cơ thông minh và bảo dưỡng trọn đời.

Bạn muốn kỹ thuật viên UniVeloria hỗ trợ đo đạc tận nhà hay cần tư vấn mẫu rèm trước qua chat ạ?`
    };
  }

  // 9. NHẬN DIỆN CĂN PHÒNG ĐƯỢC HỎI HOẶC ĐỀ CẬP (Bao gồm "Phòng thờ thì sao", "Còn phòng khách", "Thế phòng ngủ", v.v.)
  let extractedRoom = null;
  if (norm.includes('phong tho') || norm.includes('gian tho') || norm.includes('ban tho') || norm.includes('tho gia tien') || norm.includes('tam linh') || norm.includes('ton nghiem') || norm.includes('thanh tinh') || norm.includes('noi tho') || norm.includes('khong gian tho') || norm.includes('tho')) {
    extractedRoom = { key: 'worship', label: 'Phòng thờ' };
  } else if (norm.includes('phong ngu') || norm.includes('ngu') || norm.includes('master') || norm.includes('em be') || norm.includes('vo chong')) {
    extractedRoom = { key: 'bedroom', label: 'Phòng ngủ' };
  } else if (norm.includes('phong khach') || norm.includes('khach') || norm.includes('biet thu') || norm.includes('gian chinh')) {
    extractedRoom = { key: 'living', label: 'Phòng khách' };
  } else if (norm.includes('lam viec') || norm.includes('van phong') || norm.includes('doc sach') || norm.includes('ban lam viec')) {
    extractedRoom = { key: 'study', label: 'Phòng làm việc' };
  } else if (norm.includes('chung cu') || norm.includes('can ho') || norm.includes('studio')) {
    extractedRoom = { key: 'apartment', label: 'Căn hộ chung cư' };
  } else if (norm.includes('ban cong') || norm.includes('ngoai troi') || norm.includes('logia') || norm.includes('lo gia')) {
    extractedRoom = { key: 'balcony', label: 'Ban công' };
  } else if (norm.includes('phong an') || norm.includes('bep') || norm.includes('nha bep')) {
    extractedRoom = { key: 'dining', label: 'Phòng ăn' };
  }

  // 10. NẾU NGƯỜI DÙNG NHẮC ĐẾN HOẶC HỎI VỀ 1 CĂN PHÒNG CỤ THỂ -> TRỰC TIẾP TƯ VẤN NGAY CHO PHÒNG ĐÓ KÈM THẺ SẢN PHẨM!
  // Tuyệt đối không lặp lại câu hỏi "Bạn muốn lắp cho phòng nào?"
  if (extractedRoom) {
    if (extractedRoom.key === 'worship') {
      const chosen = pickCandidate([1, 11, 12, 2, 7, 8]);
      const confirmText = `Dạ với không gian **Phòng thờ gia tiên**, sự tôn nghiêm, thanh tịnh và phong thủy tụ khí sinh tài là tiêu chuẩn khắt khe nhất! Bạn đợi tôi trong giây phút để tôi thẩm định và đưa ra giải pháp rèm chuẩn phong thủy nhất nhé!`;
      const finalText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP RÈM TÔN NGHIÊM CHO PHÒNG THỜ GIA TIÊN

1. Mức độ phù hợp với không gian:
10/10 - Rất hoàn hảo cho không gian phòng thờ gia tiên. Mẫu ${chosen.name} sở hữu gam màu trầm ấm đồng điệu tuyệt đối với bàn thờ gỗ tự nhiên và hoành phi câu đối. Cơ chế che chắn kín đáo ngăn chặn triệt để luồng nắng chói gắt và bức xạ nhiệt chiếu trực diện vào bát hương, bài vị (điều tối kỵ gây tán khí trong phong thủy), giữ cho gian thờ luôn tĩnh mịch, tụ khí sinh tài.

2. Tại sao bạn bắt buộc phải chọn nó:
${chosen.whyChoose}

3. Mặt tốt & Ưu điểm vượt trội của sản phẩm:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria khẳng định: ${chosen.name} (${chosen.badge}) là giải pháp chuẩn phong thủy và tôn nghiêm nhất cho gian thờ của bạn:`;

      return {
        type: 'final_consultation',
        delayMs: 3800,
        confirmText,
        finalText,
        curtain: chosen,
        updatedContext: {
          ...context,
          room: extractedRoom,
          lastCurtainId: chosen.id,
          lastQuestionType: 'consulted_worship',
          recommendedCurtainIds: [...recommendedIds, chosen.id],
          dislikedProductIds: Array.from(dislikedIds)
        }
      };
    }

    if (extractedRoom.key === 'living') {
      const chosen = pickCandidate([10, 3, 1, 9, 12]);
      const confirmText = `Dạ với **Phòng khách**, yếu tố bề thế, sang trọng và khả năng lấy sáng hài hòa là ưu tiên số một. Bạn đợi tôi trong giây phút nhé!`;
      const finalText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP RÈM SANG TRỌNG BỀ THẾ CHO PHÒNG KHÁCH

1. Mức độ phù hợp với không gian:
10/10 - Cực kỳ hoàn mỹ cho phòng khách. Mẫu ${chosen.name} định hình chuẩn mực kiến trúc sang trọng, tôn lên vẻ đẹp của sofa và nội thất. Vừa giúp đón ánh sáng tự nhiên khoáng đạt khi sinh hoạt chung, vừa đảm bảo sự riêng tư trang trọng.

2. Tại sao bạn bắt buộc phải chọn nó:
${chosen.whyChoose}

3. Mặt tốt & Ưu điểm vượt trội:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria gửi bạn phương án tối ưu nhất cho phòng khách:`;

      return {
        type: 'final_consultation',
        delayMs: 3800,
        confirmText,
        finalText,
        curtain: chosen,
        updatedContext: {
          ...context,
          room: extractedRoom,
          lastCurtainId: chosen.id,
          lastQuestionType: 'consulted_living',
          recommendedCurtainIds: [...recommendedIds, chosen.id],
          dislikedProductIds: Array.from(dislikedIds)
        }
      };
    }

    if (extractedRoom.key === 'bedroom') {
      const chosen = pickCandidate([7, 4, 1, 11, 2]);
      const confirmText = `Dạ với **Phòng ngủ**, ưu tiên hàng đầu là cản sáng tuyệt đối, cách âm và tạo bóng tối êm dịu để có giấc ngủ sâu thư thái nhất! Bạn đợi tôi trong giây phút nhé!`;
      const finalText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP RÈM CẢN SÁNG CHỐNG ỒN CHO PHÒNG NGỦ

1. Mức độ phù hợp với không gian:
10/10 - Lựa chọn hoàn hảo cho phòng ngủ. Mẫu ${chosen.name} triệt tiêu toàn bộ tia nắng chói và giảm nhiệt độ phòng, mang lại không gian tĩnh lặng, mát mẻ để bạn và gia đình phục hồi năng lượng trọn vẹn sau ngày dài.

2. Tại sao bạn bắt buộc phải chọn nó:
${chosen.whyChoose}

3. Mặt tốt & Ưu điểm vượt trội:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria gửi bạn mẫu rèm phòng ngủ tối ưu nhất:`;

      return {
        type: 'final_consultation',
        delayMs: 3800,
        confirmText,
        finalText,
        curtain: chosen,
        updatedContext: {
          ...context,
          room: extractedRoom,
          lastCurtainId: chosen.id,
          lastQuestionType: 'consulted_bedroom',
          recommendedCurtainIds: [...recommendedIds, chosen.id],
          dislikedProductIds: Array.from(dislikedIds)
        }
      };
    }

    if (extractedRoom.key === 'study') {
      const chosen = pickCandidate([5, 2, 9, 3]);
      const confirmText = `Dạ với **Phòng làm việc**, rèm cần thiết kế gọn gàng, cách nhiệt tốt và chống chói màn hình máy tính để bạn tập trung tối đa. Bạn đợi tôi trong giây phút nhé!`;
      const finalText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP RÈM GỌN GÀNG CHỐNG CHÓI CHO PHÒNG LÀM VIỆC

1. Mức độ phù hợp với không gian:
10/10 - Mẫu ${chosen.name} cuộn phẳng đứng phom, tiết kiệm diện tích tối đa cho bàn làm việc, lọc ánh sáng dịu mắt để bảo vệ thị lực khi làm việc với máy tính liên tục.

2. Tại sao bạn bắt buộc phải chọn nó:
${chosen.whyChoose}

3. Mặt tốt & Ưu điểm vượt trội:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria gửi bạn phương án phòng làm việc lý tưởng:`;

      return {
        type: 'final_consultation',
        delayMs: 3800,
        confirmText,
        finalText,
        curtain: chosen,
        updatedContext: {
          ...context,
          room: extractedRoom,
          lastCurtainId: chosen.id,
          lastQuestionType: 'consulted_study',
          recommendedCurtainIds: [...recommendedIds, chosen.id],
          dislikedProductIds: Array.from(dislikedIds)
        }
      };
    }

    if (extractedRoom.key === 'balcony') {
      const chosen = pickCandidate([9, 5, 6]);
      const confirmText = `Dạ với **Ban công & Logia**, tiêu chí quan trọng nhất là cản tia UV, chịu nắng mưa tốt nhưng vẫn giữ tầm nhìn view khoáng đạt. Bạn đợi tôi trong giây phút nhé!`;
      const finalText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP RÈM LỌC SÁNG NGẮM CẢNH CHO BAN CÔNG

1. Mức độ phù hợp với không gian:
10/10 - Mẫu ${chosen.name} sở hữu sợi dệt Micro Sunscreen cản 95% tia bức xạ nhưng vẫn giữ trọn 100% view nhìn ra ngoài sân vườn và bầu trời, không lo ẩm mốc hay bay màu dưới nắng.

2. Tại sao bạn bắt buộc phải chọn nó:
${chosen.whyChoose}

3. Mặt tốt & Ưu điểm vượt trội:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria gửi bạn giải pháp hoàn hảo cho ban công:`;

      return {
        type: 'final_consultation',
        delayMs: 3800,
        confirmText,
        finalText,
        curtain: chosen,
        updatedContext: {
          ...context,
          room: extractedRoom,
          lastCurtainId: chosen.id,
          lastQuestionType: 'consulted_balcony',
          recommendedCurtainIds: [...recommendedIds, chosen.id],
          dislikedProductIds: Array.from(dislikedIds)
        }
      };
    }

    // Default room fallback (apartment, dining, etc.)
    const chosen = pickCandidate([6, 12, 3, 10]);
    const confirmText = `Dạ tôi đã hiểu nhu cầu cho không gian ${extractedRoom.label} của bạn. Bạn đợi tôi trong giây phút nhé!`;
    const finalText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP RÈM TỐI ƯU CHO ${extractedRoom.label.toUpperCase()}

1. Mức độ phù hợp với không gian:
10/10 - Mẫu ${chosen.name} đáp ứng xuất sắc cả về công năng lẫn tính thẩm mỹ, gọn gàng và dễ dàng vệ sinh.

2. Tại sao bạn bắt buộc phải chọn nó:
${chosen.whyChoose}

3. Mặt tốt & Ưu điểm vượt trội:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria gửi bạn phương án tối ưu:`;

    return {
      type: 'final_consultation',
      delayMs: 3800,
      confirmText,
      finalText,
      curtain: chosen,
      updatedContext: {
        ...context,
        room: extractedRoom,
        lastCurtainId: chosen.id,
        lastQuestionType: `consulted_${extractedRoom.key}`,
        recommendedCurtainIds: [...recommendedIds, chosen.id],
        dislikedProductIds: Array.from(dislikedIds)
      }
    };
  }

  // 11. HƯỚNG NẮNG GẮT / HƯỚNG TÂY
  const isWestSun = norm.includes('huong tay') || norm.includes('nang gat') || norm.includes('nang chieu') || norm.includes('chong nong');
  if (isWestSun) {
    const chosen = pickCandidate([7, 4, 1]);
    const confirmText = `Dạ với cửa sổ hướng Tây đón nắng gắt, bài toán cấp bách nhất là cản bức xạ nhiệt và tia cực tím để hạ nhiệt cho phòng! Bạn đợi tôi trong giây phút nhé!`;
    const finalText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP CẢN NHIỆT CHỐNG NẮNG GẮT HƯỚNG TÂY

1. Mức độ phù hợp với vị trí nắng gắt:
10/10 - Mẫu ${chosen.name} giải quyết triệt để vấn đề chói chang và hầm nóng của hướng Tây, giảm nhiệt độ phòng rõ rệt và ngăn tia UV làm hư hại đồ gỗ.

2. Tại sao bạn bắt buộc phải chọn nó:
${chosen.whyChoose}

3. Mặt tốt & Ưu điểm vượt trội:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria gửi bạn phương án cản nhiệt hướng Tây tối ưu:`;

    return {
      type: 'final_consultation',
      delayMs: 3800,
      confirmText,
      finalText,
      curtain: chosen,
      updatedContext: {
        ...context,
        lastCurtainId: chosen.id,
        lastQuestionType: 'consulted_west',
        recommendedCurtainIds: [...recommendedIds, chosen.id],
        dislikedProductIds: Array.from(dislikedIds)
      }
    };
  }

  // 12. NGƯỜI DÙNG MUỐN TÌM RÈM / MUA RÈM / TƯ VẤN NHƯNG CHƯA NÓI RÕ PHÒNG
  // (Ví dụ: "Tôi muốn tìm 1 cái rèm", "Tôi muốn mua rèm", "Tư vấn cho tôi", "Có mẫu nào đẹp")
  // -> CHỦ ĐỘNG GỢI Ý MẪU BESTSELLER SỐ 1 KÈM THẺ SẢN PHẨM TRỰC QUAN, TUYỆT ĐỐI KHÔNG HỎI DỒN DẬP
  const isGeneralSearchQuery = norm.includes('tim 1 cai rem') || 
                               norm.includes('tim rem') || 
                               norm.includes('mua rem') || 
                               norm.includes('can lam rem') || 
                               norm.includes('tu van giup toi') || 
                               norm.includes('tu van cho toi') || 
                               norm.includes('tu van rem') || 
                               norm.includes('co mau nao dep') || 
                               norm.includes('goi y cho toi') || 
                               norm.includes('chua biet chon') || 
                               norm.includes('gioi thieu mau');

  if (isGeneralSearchQuery) {
    const chosen = pickCandidate([1, 10, 7, 3]);
    const confirmText = `Dạ chào bạn! UniVeloria rất hân hạnh được đồng hành tư vấn không gian cùng bạn 🌿✨ Để bạn dễ dàng trải nghiệm ngay, tôi xin giới thiệu mẫu rèm được đánh giá 5 sao bán chạy hàng đầu tại UniVeloria:`;
    const finalText = `TƯ VẤN CHUYÊN GIA: ${chosen.name.toUpperCase()} – LỰA CHỌN ĐƯỢC ƯA CHUỘNG HÀNG ĐẦU TẠI UNIVELORIA

1. Mức độ đa năng & Phù hợp không gian:
Mẫu ${chosen.name} (${chosen.category}) là dòng sản phẩm linh hoạt nhất, phù hợp cho cả phòng khách, phòng ngủ lẫn phòng thờ. Thiết kế tinh tế nâng tầm thẩm mỹ nội thất ngay từ ánh nhìn đầu tiên.

2. Tại sao bạn nên trải nghiệm sản phẩm này:
${chosen.whyChoose}

3. Ưu điểm nổi bật:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Bạn có thể xem chi tiết mẫu ${chosen.name} bên dưới. Nếu bạn đang muốn may rèm cho một căn phòng cụ thể (như phòng khách, phòng ngủ hay phòng thờ...), hãy kể thêm cho tôi nhé!`;

    return {
      type: 'final_consultation',
      delayMs: 3800,
      confirmText,
      finalText,
      curtain: chosen,
      updatedContext: {
        ...context,
        lastCurtainId: chosen.id,
        lastQuestionType: 'bestseller_suggested',
        recommendedCurtainIds: [...recommendedIds, chosen.id],
        dislikedProductIds: Array.from(dislikedIds)
      }
    };
  }

  // 13. LỜI CHÀO HỎI ĐẦU TIÊN (Alo, Hello, Chào shop...)
  const greetingWords = ['alo', 'chao', 'xin chao', 'hello', 'hi', 'ad oi', 'shop oi', 'em oi', 'ban oi'];
  const isGreetingOnly = greetingWords.includes(norm);
  if (isGreetingOnly) {
    return {
      type: 'question',
      delayMs: 600,
      curtain: null,
      text: "Dạ UniVeloria xin chào bạn! Tôi là Chuyên gia Tư vấn Không gian Rèm AI ☁️✨\n\nBạn đang quan tâm đến rèm cho không gian nào (như phòng khách, phòng ngủ, phòng thờ hay căn hộ...)? Hoặc bạn có thể cho tôi biết về hướng cửa đón nắng để tôi tư vấn giải pháp phù hợp nhất nhé!",
      updatedContext: { ...context, hasGreeted: true, lastQuestionType: 'ask_room_first' }
    };
  }

  // 14. NẾU ĐÃ TỪNG HỎI PHÒNG MÀ NGƯỜI DÙNG TRẢ LỜI NGẮN HOẶC LẠ:
  // KHÔNG BAO GIỜ HỎI LẠI CÂU "BẠN MUỐN LẮP CHO CĂN PHÒNG NÀO"
  if (context.lastQuestionType === 'ask_room_first' || context.lastQuestionType === 'ask_room') {
    const chosen = pickCandidate([1, 10, 7]);
    const confirmText = `Dạ tôi hiểu rồi! Để bạn có hình dung trực quan nhất, tôi xin gửi bạn mẫu rèm cao cấp đang được ưa chuộng nhất tại UniVeloria:`;
    const finalText = `TƯ VẤN CHUYÊN GIA: ${chosen.name.toUpperCase()} (${chosen.badge})

1. Mức độ phù hợp với không gian sống:
Mẫu ${chosen.name} đáp ứng trọn vẹn cả công năng điều hòa ánh sáng lẫn tính thẩm mỹ sang trọng, hài hòa với mọi phong cách nội thất.

2. Lý do chọn:
${chosen.whyChoose}

3. Mặt tốt của sản phẩm:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria gửi bạn chi tiết mẫu ${chosen.name}:`;

    return {
      type: 'final_consultation',
      delayMs: 3600,
      confirmText,
      finalText,
      curtain: chosen,
      updatedContext: {
        ...context,
        lastCurtainId: chosen.id,
        lastQuestionType: 'bestseller_fallback',
        recommendedCurtainIds: [...recommendedIds, chosen.id],
        dislikedProductIds: Array.from(dislikedIds)
      }
    };
  }

  // 15. FALLBACK LINH HOẠT VỚI GỢI MỞ ĐA CHIỀU (KHÔNG LẶP CÂU HỎI CŨ)
  return {
    type: 'question',
    delayMs: 650,
    curtain: null,
    text: "Dạ vâng! Để tôi hỗ trợ bạn chuẩn xác nhất, bạn có thể cho tôi biết vị trí phòng cần lắp rèm (như phòng khách, phòng ngủ hay phòng thờ), hoặc bạn đang thích kiểu rèm cản sáng tuyệt đối hay rèm cuốn gọn gàng ngắm view?",
    updatedContext: { ...context, hasGreeted: true, lastQuestionType: 'ask_room' }
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
    dislikedProductIds: [],
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
      text: 'Xin chào! Tôi là Chuyên gia Tư vấn Không gian Rèm UniVeloria ☁️✨ Hãy cho tôi biết về căn phòng của bạn (vị trí phòng khách, phòng ngủ, phòng thờ, phòng làm việc, hướng nắng, phong cách nội thất, hoặc nhu cầu thanh rèm / động cơ tự động...). Tôi sẽ thẩm định chuyên môn và trực tiếp tư vấn giải pháp rèm tối ưu nhất cho bạn!',
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
    const lastBotCurtain = [...messages].reverse().find(m => m.curtain)?.curtain?.id || contextRef.current.lastCurtainId || null;
    const result = analyzeUserMessage(query, currentCtx, lastBotCurtain);

    if (result.type === 'question' || result.type === 'faq') {
      setIsTyping(true);
      const t = setTimeout(() => {
        setIsTyping(false);
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
      }, result.delayMs || 600);
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

      // 2. Chuyển sang trạng thái suy nghĩ chuyên sâu
      setIsTyping(true);
      setThinkingStageIdx(0);
      const delayMs = result.delayMs || 4200;
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
      const delayMs = result.delayMs || 3800;
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

              {/* Bot thinking / analyzing state indicator */}
              {isTyping && (
                <div className="chatbot-bot-wrap">
                  <div className="chatbot-thinking-box">
                    <div className="thinking-stage-header">
                      <span className="stage-icon">{thinkingStages[thinkingStageIdx]?.icon || '✨'}</span>
                      <strong className="stage-title">{thinkingStages[thinkingStageIdx]?.title || 'Đang thẩm định...'}</strong>
                    </div>
                    <p className="stage-desc">{thinkingStages[thinkingStageIdx]?.text || 'Chuyên gia AI đang phân tích dữ liệu...'}</p>
                    <div className="stage-progress-bar">
                      <div 
                        className="stage-progress-fill" 
                        style={{ width: `${((thinkingStageIdx + 1) / thinkingStages.length) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form 
              className="chatbot-popup-inputbar"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                placeholder="Kể về căn phòng (phòng thờ, phòng ngủ hướng Tây...)"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isTyping}
                aria-label="Nhập mô tả căn phòng hoặc nhu cầu rèm"
              />
              <button 
                type="submit" 
                disabled={!chatInput.trim() || isTyping}
                aria-label="Gửi tin nhắn"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Cat Mascot Avatar */}
      <div
        className={`petdex-mascot-wrapper ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        title="UniVeloria AI - Chuyên gia tư vấn rèm (Kéo để di chuyển, click để chat)"
      >
        <div className={`petdex-avatar-halo ${facingLeft ? 'face-left' : ''}`}>
          <img
            src="/assets/ChatBot.png"
            alt="Mèo tư vấn rèm UniVeloria"
            className="petdex-cat-img"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

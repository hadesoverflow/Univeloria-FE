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
    pros: [
      'Bề mặt vân dệt gỗ Wood-grain tự nhiên, mang lại sự sang trọng mộc mạc và đồng điệu với đồ gỗ.',
      'Khả năng cản sáng 94% và hạ nhiệt tối ưu, ngăn tia bức xạ cực tím làm bạc màu nội thất.',
      'Cơ chế nan 2 lớp so le xoay lật 180 độ điều chỉnh ánh sáng linh hoạt, giữ trọn sự riêng tư.'
    ],
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
    pros: [
      'Nẹp viền sáng kép Dual-Border độc quyền tạo nên nét vẽ kiến trúc hiện đại, sắc sảo.',
      'Cản sáng 90%, chống lóa màn hình máy tính tuyệt đối cho góc làm việc và văn phòng.',
      'Vải dệt siêu phẳng chống bám bụi và chống co rút, tuổi thọ sử dụng bền bỉ.'
    ],
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
    pros: [
      'Hệ 10 mã màu phong phú từ pastel dịu mát đến trung tính thanh lịch, dễ phối màu nội thất.',
      'Vải canvas dệt cao cấp chống bám bụi bẩn, cản chói sáng sớm và đón gió tự nhiên vào ban ngày.',
      'Chi phí đầu tư hợp lý, tối ưu công năng cho căn hộ gia đình trẻ.'
    ],
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
    pros: [
      'Ma trận dệt chéo melange đan khít cản sáng đến 95%, hạ nhiệt độ phòng tức thì 3 - 5°C.',
      'Chặn đứng nắng chiều gay gắt và bức xạ nhiệt hướng Tây, bảo vệ đồ đạc không bị om nóng.',
      'Hạn chế tiếng ồn từ đường phố, đem lại không gian tĩnh lặng tuyệt đối cho giấc ngủ ngon.'
    ],
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
    pros: [
      'Chất vải dệt gân corded rib tráng lớp chống bám bụi và chống thấm nước, cực kỳ dễ vệ sinh lau chùi.',
      'Cuộn lên gọn gàng 100% trong hộp máng, tiết kiệm diện tích tối ưu cho khung cửa sổ nhỏ.',
      'Hệ thống máng kéo trợ lực siêu bền bỉ, vận hành êm ái hàng chục nghìn lần kéo.'
    ],
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
    pros: [
      'Họa tiết dệt hoa râm Scandinavian làm mềm nét thô cứng của bê tông, tạo không gian thanh lịch.',
      'Cản sáng 90% nhẹ nhàng, giữ cho căn phòng ngập tràn cảm hứng tự nhiên mà không bị tối sầm.',
      'Chất liệu mỏng nhẹ, chống phai màu, không chiếm dụng diện tích phòng.'
    ],
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
    pros: [
      'Khả năng cản sáng 100% Blackout tuyệt đối nhờ 3 lớp bọt Foam cách nhiệt độc quyền.',
      'Ngăn chặn toàn bộ nhiệt lượng bức xạ qua kính, giúp phòng mát rượi và tiết kiệm điện điều hòa.',
      'Đem lại bóng tối dịu mát hoàn hảo bất kể giữa trưa hè cho người già, trẻ nhỏ hoặc người mất ngủ.'
    ],
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
    pros: [
      'Vải dệt Jacquard Châu Âu hoa văn dệt nổi vương giả đạt chuẩn chống cháy B1 an toàn.',
      'Tôn vinh đẳng cấp, khẳng định vị thế và gu thẩm mỹ quyền quý của gia chủ.',
      'Chất liệu dày dặn, phom dáng rủ thẳng chuẩn mực, độ bền trên 10 năm.'
    ],
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
    pros: [
      'Mắt lưới Micro Sunscreen lọc sáng dịu mát, ngăn 95% tia UV độc hại nhưng giữ trọn 100% tầm nhìn view.',
      'Thưởng thức trọn vẹn cảnh sắc sân vườn, ban công, thành phố mà không bị chói mắt hay nóng rát.',
      'Sợi thủy tinh phủ nhựa PVC chống chịu thời tiết, bền màu trước gió mưa.'
    ],
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
    pros: [
      'May sóng chữ S bồng bềnh từ trần xuống sàn chuẩn khách sạn 5 sao, bề thế và sang trọng.',
      'Sợi gấm dệt thô cao cấp phong cách Nhật Bản cản sáng 95%, cách nhiệt và tiêu âm vượt trội.',
      'Định hình chuẩn mực kiến trúc cho phòng khách biệt thự và các khung cửa kính lớn.'
    ],
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
    pros: [
      'Sợi lanh tự nhiên mềm rũ phối tone đất nung ấm áp mang lại cảm giác vỗ về xúc giác thư thái.',
      'Tiêu âm và cách âm tiếng ồn đường phố hiệu quả, giữ chốn nghỉ ngơi luôn tĩnh tại.',
      'Mát mẻ vào mùa hè, giữ ấm vào mùa đông, nâng niu giấc ngủ sâu của gia đình.'
    ],
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
    pros: [
      'Dệt từ sợi Eco-friendly an toàn sức khỏe tuyệt đối cho trẻ nhỏ và người lớn tuổi.',
      'Tone cát vàng kem Japandi mộc mạc cân bằng thị giác, xua tan căng thẳng và mang sinh khí an lành.',
      'Dày dặn cản gió lùa mùa đông cho phòng hướng Bắc, giữ ấm căn phòng hiệu quả.'
    ],
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
    pros: [
      'Động cơ Brushless không chổi than siêu tĩnh âm <25dB công nghệ Đức, không phát ra tiếng ồn.',
      'Tích hợp thông minh: Kéo tay nhẹ tự chạy (Touch Motion), điều khiển Apple HomeKit / Google Assistant.',
      'Thanh ray nhôm hàng không 6063-T5 tải trọng 60kg, bảo hành đổi mới 5 năm chính hãng.'
    ],
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
    pros: [
      'Hệ rãnh trượt con lăn phủ hạt nhựa Teflon tự bôi trơn siêu êm ái, kéo nhẹ như lướt trên nhung.',
      'Uốn cong 90 độ hoặc bo tròn góc cửa sổ vòng cung linh hoạt theo mọi kiến trúc.',
      'Nhôm đúc nguyên khối chịu tải 60kg, độ bền trên 15 năm không lo xệ máng hay kẹt rít.'
    ],
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
// AI ANALYSIS ENGINE: ĐỐI THOẠI & TƯ VẤN CHUYÊN SÂU
// - Tương tác tự nhiên qua chat chữ (hỏi ngược lại khi thiếu thông tin)
// - KHÔNG dùng nút bấm bắt chọn
// - KHÔNG nhắc đến thanh rèm trừ khi khách hỏi
// - Đầy đủ 3 phần: Mức độ phù hợp, Tại sao chọn nó, Mặt tốt của nó
// =============================================================================
export function analyzeUserMessage(rawInput, context = {}, currentCurtainId = null) {
  const trimmed = (rawInput || '').trim();
  const norm = normalizeText(trimmed);

  // 1. Phân tích nhu cầu về THANH RÈM / ĐỘNG CƠ TỰ ĐỘNG
  // Chỉ kích hoạt khi khách hàng hỏi đích danh về thanh rèm / ray rèm / motor
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
      text: "Dạ giá rèm tại UniVeloria được niêm yết minh bạch và tính theo diện tích thực tế:\n• 🌟 Rèm Cuốn: Từ 380.000đ – 490.000đ / m² (Gọn gàng, hiện đại, cản sáng tốt)\n• 🌈 Rèm Cầu Vòng: Từ 1.150.000đ – 1.550.000đ / m² (Nan 2 lớp xoay lật điều chỉnh sáng linh hoạt)\n• 💎 Rèm Vải Cao Cấp: Từ 580.000đ – 680.000đ / m² (Sóng đổ bồng bềnh chuẩn 5 sao)\n• ⚡ Thanh Ray & Động Cơ Tự Động: Từ 2.850.000đ – 3.450.000đ / bộ (Động cơ thông minh siêu êm & ray trượt Teflon)\n\nBạn hãy chia sẻ về căn phòng của mình để tôi tư vấn phương án kỹ thuật chuẩn xác và cùng bạn trải nghiệm mô phỏng 3D nhé!"
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
  } else if (norm.includes('japandi') || norm.includes('eco') || norm.includes('song xanh') || norm.includes('thien nhien')) {
    extractedStyle = { key: 'japandi', label: 'Japandi mộc mạc' };
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

  // 6. KIỂM TRA LỜI NHẮN MỞ ĐẦU CHUNG CHUNG / CHÀO HỎI (VÍ DỤ "ALO", "TÔI MUỐN MUA RÈM", "TƯ VẤN RÈM")
  const isGenericStarter = norm === 'alo' || 
                            norm === 'chao' || 
                            norm === 'xin chao' || 
                            norm === 'hello' || 
                            norm === 'hi' ||
                            norm.includes('toi muon mua rem') || 
                            norm.includes('muon mua rem') || 
                            norm.includes('mua rem') || 
                            norm.includes('tu van rem') || 
                            norm.includes('can mua rem') || 
                            norm.includes('can tu van');

  if (isGenericStarter && !activeRoom && !activeStyle && !activeOrientation) {
    return {
      type: 'question',
      delayMs: 900,
      curtain: null,
      text: "Dạ UniVeloria xin chào bạn! Tôi là Chuyên gia Tư vấn Không gian Rèm AI ☁️✨\n\nĐể chọn được bộ rèm ưng ý và chuẩn xác nhất, bạn đang muốn lắp rèm cho căn phòng nào (như phòng ngủ, phòng khách, phòng làm việc hay căn hộ...)? Hãy chia sẻ cho tôi biết nhé!",
      updatedContext: context
    };
  }

  // 7. ĐỐI THOẠI TƯƠNG TÁC (HỎI NGƯỢC LẠI KHI THIẾU THÔNG TIN ĐỂ TƯ VẤN CHUẨN)
  // 7.1 Nếu chưa có thông tin về loại phòng
  if (!activeRoom) {
    return {
      type: 'question',
      delayMs: 900,
      curtain: null,
      text: "Bạn đang muốn lắp rèm cho căn phòng nào (như phòng ngủ, phòng khách, phòng làm việc hay căn hộ...)?",
      updatedContext: {
        ...context,
        style: activeStyle,
        orientation: activeOrientation
      }
    };
  }

  // 7.2 Nếu đã có phòng nhưng chưa có phong cách mong muốn
  if (!activeStyle) {
    return {
      type: 'question',
      delayMs: 900,
      curtain: null,
      text: "Bạn muốn cái rèm trông như thế nào: Đơn giản hay sang trọng hoặc tối ưu phòng?",
      updatedContext: {
        ...context,
        room: activeRoom,
        orientation: activeOrientation
      }
    };
  }

  // 7.3 Nếu đã có phòng và phong cách nhưng chưa có hướng cửa sổ
  if (!activeOrientation) {
    return {
      type: 'question',
      delayMs: 900,
      curtain: null,
      text: "Cửa sổ của bạn nằm ở hướng nào?",
      updatedContext: {
        ...context,
        room: activeRoom,
        style: activeStyle
      }
    };
  }

  // 8. ĐÃ ĐỦ DỮ LIỆU ĐỂ TƯ VẤN CHUYÊN GIA
  // Chấm điểm chọn mẫu rèm tối ưu nhất từ 12 mẫu rèm chính thức (không đưa thanh rèm)
  const curtainPool = CURTAIN_PROFILES.filter(c => c.category !== 'Thanh rèm');
  const scored = curtainPool.map(item => {
    let score = 0;

    // Khớp hướng nắng & vi khí hậu
    if (activeOrientation.key === 'west') {
      if (item.studioId === 'rainbow-dragon') score += 36;
      if (item.studioId === 'roller-moon') score += 32;
      if (item.studioId === 'rainbow-brioni') score += 22;
    } else if (activeOrientation.key === 'east') {
      if (item.studioId === 'rainbow-rivere') score += 30;
      if (item.studioId === 'roller-sunny') score += 30;
      if (item.studioId === 'roller-harmony-2') score += 20;
    } else if (activeOrientation.key === 'south') {
      if (item.studioId === 'elogi-1198-2') score += 28;
      if (item.studioId === 'elogi-1206-1') score += 26;
      if (item.studioId === 'roller-malange-1') score += 20;
    } else if (activeOrientation.key === 'north') {
      if (item.studioId === 'elogi-1230-1') score += 30;
      if (item.studioId === 'rainbow-brioni') score += 22;
    }

    // Khớp phong cách & nhu cầu
    if (activeStyle.key === 'luxury') {
      if (item.studioId === 'elogi-1198-2') score += 28;
      if (item.studioId === 'rainbow-dragon') score += 24;
      if (item.studioId === 'rainbow-brioni') score += 24;
      if (item.studioId === 'roller-silvia') score += 22;
    } else if (activeStyle.key === 'simple') {
      if (item.studioId === 'roller-harmony-2') score += 26;
      if (item.studioId === 'roller-malange-1') score += 24;
      if (item.studioId === 'rainbow-rivere') score += 20;
    } else if (activeStyle.key === 'blackout') {
      if (item.studioId === 'roller-moon') score += 32;
      if (item.studioId === 'rainbow-dragon') score += 30;
    } else if (activeStyle.key === 'wood') {
      if (item.studioId === 'rainbow-brioni') score += 32;
      if (item.studioId === 'elogi-1206-1') score += 22;
    } else if (activeStyle.key === 'japandi') {
      if (item.studioId === 'elogi-1230-1') score += 32;
    }

    // Khớp loại phòng
    if (activeRoom.key === 'bedroom') {
      if (item.studioId === 'rainbow-dragon') score += 24;
      if (item.studioId === 'roller-moon') score += 24;
      if (item.studioId === 'elogi-1206-1') score += 20;
    } else if (activeRoom.key === 'living' || activeRoom.key === 'main_window') {
      if (item.studioId === 'elogi-1198-2') score += 28;
      if (item.studioId === 'rainbow-brioni') score += 24;
      if (item.studioId === 'roller-silvia') score += 20;
    } else if (activeRoom.key === 'study') {
      if (item.studioId === 'rainbow-infiniti') score += 30;
      if (item.studioId === 'roller-harmony-2') score += 24;
    } else if (activeRoom.key === 'apartment') {
      if (item.studioId === 'rainbow-rivere') score += 24;
      if (item.studioId === 'roller-malange-1') score += 22;
    }

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const chosen = scored[0].item;

  const roomName = activeRoom.label;
  const styleName = activeStyle.label;
  const orientName = activeOrientation.label;

  // Câu phản hồi đồng cảm đúng theo mong muốn của user
  const confirmText = `Tôi hiểu rồi bạn đợi tôi trong giây phút để tôi chọn cho bạn 1 cái rèm phù hợp với các yêu cầu ${styleName} thoải mái nhất cho bạn.`;

  // Luận điểm 1: Mức độ phù hợp
  let fitReason = '';
  if (activeOrientation.key === 'west') {
    fitReason = `10/10 - Cực kỳ hoàn hảo cho ${roomName} ${orientName} chịu bức xạ nhiệt gay gắt vào buổi chiều. Tấm rèm cản sáng đến ${chosen.badge.includes('Cản sáng') ? chosen.badge : 'tối ưu'} và hạ nhiệt phòng tức thì, mang lại không gian mát mẻ, yên tĩnh và thư thái.`;
  } else if (activeOrientation.key === 'east') {
    fitReason = `10/10 - Rất hoàn hảo cho ${roomName} ${orientName} đón ánh nắng sớm ban mai. Tấm rèm lọc sáng êm dịu, ngăn chói mắt tuyệt đối nhưng vẫn giữ trọn sự tươi sáng và thông thoáng tự nhiên.`;
  } else if (activeRoom.key === 'bedroom') {
    fitReason = `10/10 - Rất hoàn hảo cho không gian phòng ngủ với định hướng thiết kế ${styleName}. Sản phẩm giải quyết trọn vẹn bài toán cản sáng tuyệt đối và cách âm tĩnh lặng, kiến tạo không gian nghỉ ngơi thư thái, vỗ về giấc ngủ sâu cho gia chủ.`;
  } else if (activeRoom.key === 'living' || activeRoom.key === 'main_window') {
    fitReason = `10/10 - Rất hoàn hảo cho không gian ${roomName} với phong thái ${styleName}. Thiết kế bề thế tôn vinh vẻ đẹp kiến trúc, đồng thời điều tiết ánh sáng tự nhiên linh hoạt, mang lại vẻ sang trọng và thoáng đãng.`;
  } else {
    fitReason = `10/10 - Rất hoàn hảo cho ${roomName} với phong cách ${styleName}. Tấm rèm cân bằng chuẩn mực giữa công năng che chắn ánh sáng, cách nhiệt hiệu quả và giá trị thẩm mỹ tinh tế cho căn phòng.`;
  }

  const finalText = `TƯ VẤN CHUYÊN GIA: GIẢI PHÁP RÈM TỐI ƯU CHO ${roomName.toUpperCase()} ${orientName.toUpperCase()} (${styleName.toUpperCase()})

1. Mức độ phù hợp:
${fitReason}

2. Tại sao chọn nó:
${chosen.whyChoose}

3. Mặt tốt của nó:
${chosen.pros.map(p => `• ${p}`).join('\n')}

Chuyên gia tư vấn UniVeloria khẳng định: ${chosen.name} (${chosen.badge}) là giải pháp chuẩn xác và tối ưu nhất cho căn phòng của bạn:`;

  return {
    type: 'final_consultation',
    delayMs: 5500,
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
    recommendedCurtainIds: []
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
      // Đối thoại tương tác tự nhiên (hỏi lại thông tin)
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
      }, result.delayMs || 900);
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
      const delayMs = result.delayMs || 5500;
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

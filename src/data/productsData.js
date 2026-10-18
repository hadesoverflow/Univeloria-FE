export const curtainRooms = [
  "Phòng khách",
  "Phòng ngủ",
  "Phòng ăn",
  "Văn phòng",
  "Ngoài trời"
];

export const productsData = [
  {
    id: 4,
    name: "Rèm linen họa tiết tân cổ điển",
    code: "UVL-4",
    category: "Rèm vải",
    room: "Phòng ăn",
    style: "Tân cổ điển",
    colors: ["#d5c3aa", "#9e8265", "#776e65"],
    price: 980000,
    oldPrice: 1250000,
    rating: "5.0",
    reviews: 12,
    badge: "",
    image: "/assets/uvl4-card-photo.png",
    mainImage: "/assets/uvl4-main.jpg",
    subImages: [
      "/assets/uvl4-sub1.jpg",
      "/assets/uvl4-sub2.jpg",
      "/assets/uvl4-sub3.jpg"
    ],
    description: "Sự kết hợp hoàn hảo giữa nét tân cổ điển quý phái và chất liệu linen tự nhiên dệt thêu thủ công. Tấm rèm voan hoạ tiết lá thêu tinh xảo mang lại ánh sáng dịu nhẹ ban ngày, kết hợp lớp rèm vải rủ màu hạt dẻ sang trọng bảo vệ tối đa sự riêng tư cho không gian sống.",
    material: "Gấm linen jacquard & voan thêu chỉ lụa cao cấp",
    lightBlocking: "Cản sáng 85% - 95%, chống tia cực tím UV 99%",
    fabricWidth: "280cm (Hỗ trợ may liền không nối vải cho trần cao đến 3.2m)",
    origin: "Nhập khẩu nguyên cây Thổ Nhĩ Kỳ / Bỉ",
    warranty: "Bảo hành chính hãng 5 năm cho ray trượt và phụ kiện",
    fullDescription: "Rèm linen họa tiết tân cổ điển đại diện cho sự giao thoa tinh tế giữa phong cách kiến trúc Tân cổ điển quyền quý và chất sống hiện đại thanh lịch. Thiết kế hai lớp độc đáo mang đến giải pháp điều tiết ánh sáng toàn diện: lớp voan trắng thêu họa tiết lá tinh xảo giúp đón trọn vẹn luồng sáng tự nhiên dịu mát vào ban ngày, trong khi lớp vải dệt thoi màu hạt dẻ rủ mượt bảo đảm sự riêng tư và cản nắng hoàn hảo vào buổi trưa và chiều."
  },
  {
    id: 1,
    name: "Rèm vải linen cao cấp",
    code: "UVL-LN001",
    category: "Rèm vải",
    room: "Phòng khách",
    style: "Tự nhiên",
    colors: ["#e9d8c2", "#c5a27d", "#755039", "#e8e4d9", "#9c9b8c"],
    price: 2450000,
    oldPrice: null,
    rating: "4.9",
    reviews: 128,
    badge: "Bán chạy",
    image: "/assets/product-linen.jpg",
    mainImage: "/assets/product-linen.jpg",
    subImages: [
      "/assets/uvl4-sub1.jpg",
      "/assets/uvl4-sub2.jpg",
      "/assets/uvl4-sub3.jpg"
    ],
    description: "Chất vải linen mộc mạc dệt từ sợi lanh tự nhiên, mang hơi thở thiên nhiên trong lành và cảm giác mộc mạc thư thái cho ngôi nhà.",
    material: "100% Linen dệt tự nhiên",
    lightBlocking: "Cản sáng 75%",
    origin: "Vải nhập khẩu Bỉ"
  },
  {
    id: 2,
    name: "Rèm vải nhung sang trọng",
    code: "UVL-VT002",
    category: "Rèm vải",
    room: "Phòng ngủ",
    style: "Sang trọng",
    colors: ["#d7b89a", "#987354", "#594133", "#5c7893", "#171b24"],
    price: 2890000,
    oldPrice: null,
    rating: "4.8",
    reviews: 96,
    badge: "",
    image: "/assets/product-velvet.jpg",
    mainImage: "/assets/product-velvet.jpg",
    subImages: [
      "/assets/uvl4-sub2.jpg",
      "/assets/uvl4-sub1.jpg",
      "/assets/uvl4-sub3.jpg"
    ],
    description: "Vải nhung tuyết óng ả mềm mịn như tơ, có độ rủ mềm mại tuyệt hảo giúp phòng ngủ thêm phần kiêu kỳ, ấm cúng và cách âm vượt trội.",
    material: "Nhung tuyết sợi cao cấp",
    lightBlocking: "Cản sáng 95%",
    origin: "Vải nhập khẩu Hàn Quốc"
  },
  {
    id: 3,
    name: "Rèm voan mềm mại",
    code: "UVL-VO003",
    category: "Rèm voan",
    room: "Phòng khách",
    style: "Tối giản",
    colors: ["#f1ece5", "#d5c0a7", "#b59a80", "#8c7968"],
    price: 1850000,
    oldPrice: null,
    rating: "4.9",
    reviews: 112,
    badge: "",
    image: "/assets/product-sheer.jpg",
    mainImage: "/assets/product-sheer.jpg",
    subImages: [
      "/assets/uvl4-sub1.jpg",
      "/assets/uvl4-main.jpg",
      "/assets/uvl4-sub3.jpg"
    ],
    description: "Lớp voan mềm mỏng như sương mai, giúp lọc ánh nắng gay gắt thành làn ánh sáng êm dịu, đón gió tự nhiên thoáng đãng.",
    material: "Voan tơ lụa siêu mịn",
    lightBlocking: "Lấy sáng 40%",
    origin: "Nhập khẩu Nhật Bản"
  },
  {
    id: 5,
    name: "Rèm roman hiện đại",
    code: "UVL-RM005",
    category: "Rèm roman",
    room: "Phòng ăn",
    style: "Hiện đại",
    colors: ["#f0e4d5", "#d0b292", "#987658", "#77604b"],
    price: 2150000,
    oldPrice: null,
    rating: "4.7",
    reviews: 64,
    badge: "Mới",
    image: "/assets/product-roman.jpg",
    mainImage: "/assets/product-roman.jpg",
    subImages: [
      "/assets/uvl4-sub3.jpg",
      "/assets/uvl4-sub2.jpg",
      "/assets/uvl4-sub1.jpg"
    ],
    description: "Thiết kế nếp gấp điêu khắc gọn gàng, thao tác kéo êm ái, thích hợp với các ô cửa sổ nhỏ và phong cách sống hiện đại.",
    material: "Bố sợi dệt dày dặn",
    lightBlocking: "Cản sáng 90%",
    origin: "Hàn Quốc"
  },
  {
    id: 6,
    name: "Rèm cuốn chống nắng Smart Roller",
    code: "UVL-CN006",
    category: "Rèm cuốn",
    room: "Văn phòng",
    style: "Tối giản",
    colors: ["#f1ece4", "#c7aa8b", "#a78a6d", "#6b5b4b"],
    price: 1950000,
    oldPrice: 2250000,
    rating: "4.8",
    reviews: 91,
    badge: "Ưu đãi",
    image: "/assets/product-roller.jpg",
    mainImage: "/assets/product-roller.jpg",
    subImages: [
      "/assets/uvl4-sub3.jpg",
      "/assets/office.jpg",
      "/assets/tip-window.jpg"
    ],
    description: "Rèm cuốn phủ tráng bạc cách nhiệt hoàn hảo, chống bám bụi và hỗ trợ tích hợp mô tơ điều khiển tự động thông minh.",
    material: "Polyester tráng phủ chống nhiệt",
    lightBlocking: "Cản sáng 100%",
    origin: "Úc"
  },
  {
    id: 7,
    name: "Rèm văn phòng tối giản",
    code: "UVL-VP007",
    category: "Rèm vải",
    room: "Văn phòng",
    style: "Tối giản",
    colors: ["#e7ded1", "#aaa49a", "#686d69", "#272b2a"],
    price: 2350000,
    oldPrice: null,
    rating: "4.6",
    reviews: 78,
    badge: "",
    image: "/assets/product-office.jpg",
    mainImage: "/assets/product-office.jpg",
    subImages: [
      "/assets/office.jpg",
      "/assets/tip-light.jpg",
      "/assets/uvl4-sub2.jpg"
    ],
    description: "Vẻ đẹp nhã nhặn, tôn vinh tác phong chuyên nghiệp và khả năng lọc sáng dễ chịu cho không gian làm việc tập trung.",
    material: "Sợi tổng hợp kháng tĩnh điện",
    lightBlocking: "Cản sáng 80%",
    origin: "Đài Loan"
  },
  {
    id: 8,
    name: "Rèm ngoài trời cao cấp",
    code: "UVL-NN008",
    category: "Rèm gỗ",
    room: "Ngoài trời",
    style: "Sang trọng",
    colors: ["#d9c6a9", "#a99071", "#786149", "#4b4c43"],
    price: 3850000,
    oldPrice: null,
    rating: "4.8",
    reviews: 83,
    badge: "",
    image: "/assets/product-outdoor.jpg",
    mainImage: "/assets/product-outdoor.jpg",
    subImages: [
      "/assets/about-coast.jpg",
      "/assets/tip-window.jpg",
      "/assets/uvl4-sub3.jpg"
    ],
    description: "Chịu mưa nắng bền bỉ, gỗ tự nhiên xử lý tẩm sấy chống mối mọt cong vênh mang lại trải nghiệm nghỉ dưỡng tại ban công và sân vườn.",
    material: "Gỗ Basswood tự nhiên phủ sơn UV",
    lightBlocking: "Cản nắng 90%",
    origin: "Bắc Mỹ"
  }
];

export const productCategories = [
  { id: "Phòng khách", title: "Phòng khách", subtitle: "Sang trọng, tinh tế", image: "/assets/category-living.jpg" },
  { id: "Phòng ngủ", title: "Phòng ngủ", subtitle: "Êm ái, thư giãn", image: "/assets/category-bedroom.jpg" },
  { id: "Phòng ăn", title: "Phòng ăn", subtitle: "Ấm cúng, hiện đại", image: "/assets/category-dining.jpg" },
  { id: "Văn phòng", title: "Văn phòng", subtitle: "Chuyên nghiệp, tối giản", image: "/assets/category-office.jpg" },
  { id: "Ngoài trời", title: "Ngoài trời", subtitle: "Bền bỉ, chống nắng", image: "/assets/category-outdoor.jpg" }
];

export const productCurtainTypes = [
  { name: "Rèm vải", count: 124 },
  { name: "Rèm voan", count: 68 },
  { name: "Rèm cuốn", count: 42 },
  { name: "Rèm gỗ", count: 26 },
  { name: "Rèm roman", count: 34 },
  { name: "Rèm hai lớp", count: 56 }
];

export const productStyles = [
  { name: "Hiện đại", count: 98 },
  { name: "Tối giản", count: 66 },
  { name: "Tân cổ điển", count: 45 },
  { name: "Sang trọng", count: 72 },
  { name: "Tự nhiên", count: 38 }
];

export const productPaletteColors = ["#d5c3aa", "#9e8265", "#776e65", "#f0dfc8", "#d49a5b", "#aa7c56", "#cbb59e", "#282b2d"];

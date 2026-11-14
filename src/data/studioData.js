// =============================================================================
// 1. LOẠI RÈM (CURTAIN TYPES / CẤU TRÚC KHUNG RÈM 3D)
// Gồm 2 loại Rèm Vải (S-Fold 2 Lớp, Xếp Ly 1 Lớp) và 3 sản phẩm Rèm Cuốn
// =============================================================================
export const curtainTypes = [
  {
    id: "sfold-luxury",
    price: 2850000,
    priceDisplay: "Từ 2.850.000đ / bộ",
    name: "Rèm Hai Lớp S-Fold Định Hình Cao Cấp",
    shortName: "Rèm 2 Lớp S-Fold",
    category: "Rèm vải",
    defaultFabricId: "elogi-1198-2",
    desc: "Vải dệt thô cao cấp & Voan tuyết đón sáng chuẩn 5 sao · Sóng chữ S đều đặn",
    colors: ["#ebe6db", "#9ea9b3", "#cfc3b0", "#84909a", "#d7cdc0", "#463f38"],
    thumb: "/assets/curtains/curtain-sfold-luxury.jpg",
    model3dUrl: "/models/curtains/curtain-sfold-luxury.glb",
    sheerTextureUrl: "/assets/curtains/sfold-sheer-texture.svg",
    style: "Khách Sạn 5 Sao",
    features: [
      "Sóng rèm chữ S (S-Fold Wave) định hình chuẩn 5 sao bồng bềnh lượn sóng",
      "Vải dệt thô cao cấp Linen-Cotton cản sáng 98% chống nắng cách nhiệt",
      "Lớp voan tuyết Nhật Bản xuyên sáng nhẹ nhàng, thoáng khí lọc sáng",
      "Hệ ray nhôm âm trần đôi bi chống ồn vận hành êm ái"
    ]
  },
  {
    id: "single-pleat",
    price: 1650000,
    priceDisplay: "Từ 1.650.000đ / bộ",
    name: "Rèm Vải 1 Lớp Xếp Ly Định Hình Cao Cấp",
    shortName: "Rèm 1 Lớp Xếp Ly",
    category: "Rèm vải",
    defaultFabricId: "elogi-1206-1",
    desc: "Vải dệt melange xám bạc cản sáng 100% · May xếp ly đôi chuẩn khách sạn",
    colors: ["#b5aba1", "#ddd3c3", "#564a40", "#8d7d70", "#c5b9aa", "#362d26"],
    thumb: "/assets/curtains/curtain-single-pleat.jpg",
    model3dUrl: "/models/curtains/curtain-single-pleat.glb",
    style: "Tối giản & Hiện đại",
    features: [
      "Vải 1 lớp cản sáng 100% tuyệt đối cho giấc ngủ sâu, cách nhiệt 40%",
      "May xếp ly đôi (Pinch Pleat) định hình nếp đứng sắc nét từ trần đến sàn",
      "Sợi dệt melange cao cấp chống bám bụi, kháng khuẩn & chống tia UV",
      "Hệ ray nhôm đơn định hình âm trần vận hành êm ái chuẩn 5 sao"
    ]
  },
  {
    id: "roller-officepro",
    price: 650000,
    priceDisplay: "Từ 650.000đ / m²",
    name: "Rèm Cuốn Văn Phòng OfficePro",
    shortName: "Rèm Cuốn OfficePro",
    category: "Rèm cuốn",
    defaultFabricId: "roller-harmony-2",
    desc: "Giải pháp che nắng hiện đại cho không gian làm việc · Kiểm soát ánh sáng chống chói lóa",
    colors: ["#c5cbcf", "#586573", "#6e5a4d", "#ece8dc", "#ded6cb"],
    thumb: "/assets/curtains/curtain-roller-officepro.jpg",
    model3dUrl: "/models/curtains/curtain-roller-officepro.glb",
    style: "Rèm cuốn",
    isRoller: true,
    features: [
      "Kiểm soát ánh sáng hiệu quả, chống lóa màn hình máy tính làm việc",
      "Giảm nhiệt, tiết kiệm năng lượng 25% điện điều hòa",
      "Vận hành êm ái, cơ chế cuốn mượt mà bền bỉ",
      "Chất liệu cao cấp dệt mịn, bền màu, chống bám bụi và chống tia UV"
    ]
  },
  {
    id: "roller-livinglite",
    price: 730000,
    priceDisplay: "Từ 730.000đ / m²",
    name: "Rèm Cuốn LivingLite",
    shortName: "Rèm Cuốn LivingLite",
    category: "Rèm cuốn",
    defaultFabricId: "roller-malange-1",
    desc: "Tối giản – Thanh lịch – Hài hòa cho không gian sống · Cản sáng và cách nhiệt tối ưu",
    colors: ["#f4f6f8", "#ebe7d0", "#b2b7b9", "#9bb7cc", "#d6cbb8", "#3d474d"],
    thumb: "/assets/curtains/curtain-roller-livinglite.jpg",
    model3dUrl: "/models/curtains/curtain-roller-livinglite.glb",
    style: "Rèm cuốn",
    isRoller: true,
    features: [
      "Thiết kế tinh tế, cản sáng hiệu quả, mang lại sự riêng tư cho phòng khách",
      "Cách nhiệt, giữ không gian mát mẻ và giảm tiếng ồn nhẹ nhàng",
      "Chất liệu cao cấp dệt chắc, bền màu, dễ vệ sinh lau chùi",
      "Cơ chế cuốn mượt mà, vận hành linh hoạt và bền bỉ"
    ]
  },
  {
    id: "roller-coastallite",
    price: 850000,
    priceDisplay: "Từ 850.000đ / m²",
    name: "Rèm Cuốn CoastalLite",
    shortName: "Rèm Cuốn CoastalLite",
    category: "Rèm cuốn",
    defaultFabricId: "roller-sunny",
    desc: "Không gian thoáng đãng đón trọn thiên nhiên · Chống tia UV và trượt nước vượt trội",
    colors: ["#ece6d5", "#aab0b4", "#7f92a3", "#7f7863", "#58626b", "#353c42"],
    thumb: "/assets/curtains/curtain-roller-coastallite.jpg",
    model3dUrl: "/models/curtains/curtain-roller-coastallite.glb",
    style: "Rèm cuốn",
    isRoller: true,
    features: [
      "Thiết kế tối giản, tinh tế, thoáng sáng đón trọn thiên nhiên",
      "Chất liệu cao cấp mềm mịn, bền màu, chống tia UV hiệu quả",
      "Khả năng chống thấm nước vượt trội, hạn chế bám bụi, dễ lau chùi",
      "Hệ thống cuốn hiện đại, vận hành êm ái và bền bỉ"
    ]
  },
  {
    id: "rainbow-modernstripe",
    price: 1350000,
    priceDisplay: "Từ 1.350.000đ / m²",
    name: "Rèm Cầu Vồng ModernStripe",
    shortName: "ModernStripe",
    category: "Rèm cầu vồng",
    slogan: "Hiện đại – Linh hoạt – Tinh tế",
    desc: "Thiết kế hai lớp sọc xen kẽ, dễ dàng điều chỉnh ánh sáng, mang đến không gian sống hiện đại và thoải mái.",
    colors: ["#f3ebe1", "#d0c3b5", "#b1a293", "#5c544d", "#ffffff"],
    thumb: "/assets/curtains/curtain-rainbow-modernstripe.jpg",
    model3dUrl: "/models/curtains/curtain-rainbow-modernstripe.glb",
    style: "Rèm cầu vồng",
    isRainbow: true,
    features: [
      "Điều chỉnh ánh sáng linh hoạt giữa lấy sáng và riêng tư",
      "Đảm bảo sự riêng tư, cản sáng chống chói hiệu quả",
      "Thiết kế hai lớp sọc hiện đại, phong cách Scandinavian tinh tế",
      "Vận hành êm ái, cơ chế cuốn mượt mà với độ bền ổn định"
    ]
  },
  {
    id: "rainbow-nordicray",
    price: 1550000,
    priceDisplay: "Từ 1.550.000đ / m²",
    name: "Rèm Cầu Vồng NordicRay",
    shortName: "NordicRay",
    category: "Rèm cầu vồng",
    slogan: "Ánh sáng linh hoạt - Cho không gian thư giãn",
    desc: "Thiết kế hai lớp vải xen kẽ hiện đại, điều chỉnh ánh sáng linh hoạt, mang lại sự riêng tư và thoáng sáng cho phòng ngủ.",
    colors: ["#cbae92", "#f7e9de", "#bb8e61", "#8a5832", "#ded0b6"],
    thumb: "/assets/curtains/curtain-rainbow-nordicray.jpg",
    model3dUrl: "/models/curtains/curtain-rainbow-nordicray.glb",
    style: "Rèm cầu vồng",
    isRainbow: true,
    features: [
      "Ánh sáng linh hoạt, dễ dàng chuyển đổi lấy sáng tự nhiên",
      "Đảm bảo sự riêng tư tuyệt đối cho phòng ngủ và phòng làm việc",
      "Chất liệu cao cấp dệt tinh tế, bền màu, độ bền cao",
      "Vận hành êm ái, cơ chế cuốn mượt mà, dễ sử dụng và bền bỉ"
    ]
  },
  {
    id: "rainbow-sunnyview",
    price: 1250000,
    priceDisplay: "Từ 1.250.000đ / m²",
    name: "Rèm Cầu Vồng SunnyView",
    shortName: "SunnyView",
    category: "Rèm cầu vồng",
    slogan: "Ánh sáng tự nhiên, không gian ấm áp",
    desc: "Thiết kế hiện đại, linh hoạt điều chỉnh ánh sáng, tạo không gian sống thoáng sáng và đầy cảm hứng.",
    colors: ["#c8af8d", "#f5e8d8", "#9d8062", "#484421", "#e8ded1"],
    thumb: "/assets/curtains/curtain-rainbow-sunnyview.jpg",
    model3dUrl: "/models/curtains/curtain-rainbow-sunnyview.glb",
    style: "Rèm cầu vồng",
    isRainbow: true,
    features: [
      "Ánh sáng tự nhiên ngập tràn, tạo không gian sống ấm áp",
      "Hiệu ứng ánh sáng đa tầng, điều chỉnh độ sáng dễ dàng",
      "Chất liệu cao cấp bền màu, dệt mịn, độ bền cao",
      "Vận hành êm ái, cơ chế cuốn mượt mà bền bỉ theo thời gian"
    ]
  },
  {
    id: "rainbow-rivere",
    price: 1150000,
    priceDisplay: "Từ 1.150.000đ / m²",
    name: "Rèm Cầu Vồng River.E",
    shortName: "River.E",
    category: "Rèm cầu vồng",
    slogan: "Hiện Đại – Bền Bỉ – Đa Dạng Màu Sắc",
    desc: "Dòng rèm cầu vồng River.E với chất liệu polyester cao cấp, điều chỉnh ánh sáng linh hoạt, phù hợp cho nhiều không gian nhà ở và văn phòng.",
    colors: ["#7cb9e8", "#dfcaa7", "#c2bcaf", "#7d8387", "#3e586d", "#54463d", "#6d7671", "#6b7a8d", "#9a7457", "#2c3b47"],
    thumb: "/assets/curtains/curtain-rainbow-rivere.jpg",
    model3dUrl: "/models/curtains/curtain-rainbow-rivere.glb",
    style: "Rèm cầu vồng",
    isRainbow: true,
    features: [
      "Bộ sưu tập 10 mã màu đa dạng (R 101 đến R 110) dễ dàng phối nội thất",
      "Chất liệu polyester cao cấp bề mặt mịn, dệt chắc, độ bền cao",
      "Cấu trúc 2 lớp điều chỉnh ánh sáng linh hoạt, chống nắng và chống tia UV",
      "Vận hành êm ái, cơ chế cuốn mượt mà, bền bỉ và dễ sử dụng"
    ]
  },
  {
    id: "rainbow-goldenweave",
    price: 1450000,
    priceDisplay: "Từ 1.450.000đ / m²",
    name: "Rèm Cầu Vồng Dệt Sợi GoldenWeave",
    shortName: "GoldenWeave",
    category: "Rèm cầu vồng",
    slogan: "Vẻ đẹp tự nhiên, ánh sắc ấm áp",
    desc: "Rèm cầu vồng dệt sợi cao cấp, kết hợp độ thoáng sáng linh hoạt và chất cảm vải dệt tinh tế, mang đến không gian sang trọng, ấm cúng.",
    colors: ["#cfb384", "#a88958", "#876337", "#5a4225", "#ded0b6"],
    thumb: "/assets/curtains/curtain-rainbow-goldenweave.jpg",
    model3dUrl: "/models/curtains/curtain-rainbow-goldenweave.glb",
    style: "Rèm cầu vồng",
    isRainbow: true,
    features: [
      "Bề mặt vân dệt sợi tự nhiên cao cấp, tinh tế và độ bền vượt trội",
      "Điều sáng linh hoạt, dễ dàng chuyển đổi giữa lấy sáng và che chắn",
      "Đảm bảo sự riêng tư, mang lại không gian sang trọng và ấm áp",
      "Dây kéo chuỗi hạt ánh kim mạ vàng sang trọng, vận hành êm ái"
    ]
  }
];

// =============================================================================
// 2A. MẪU VẢI RÈM VẢI (3 MẪU ELOGI CHÍNH HÃNG)
// =============================================================================
export const fabricCurtainSamples = [
  {
    id: "elogi-1198-2",
    name: "Mẫu rèm vải Elogi - 1198 - 2",
    shortName: "Elogi - 1198 - 2",
    category: "Rèm vải",
    price: 680000,
    priceDisplay: "Từ 680.000đ / m²",
    desc: "Vải rèm cao cấp phong cách Nhật Bản · Bề mặt dệt mịn tinh tế, vân dệt chéo hiện đại",
    thumb: "/assets/curtains/curtain-elogi-1198-2.jpg",
    defaultColor: "#ebe6db",
    colors: ["#ebe6db", "#9ea9b3", "#cfc3b0", "#84909a", "#d7cdc0", "#463f38"],
    colorCodes: ["1198-2", "1198-3", "1198-8", "1198-4", "1198-5", "1198-9"],
    colorNames: [
      "Kem sáng dệt mịn",
      "Xám xanh nhạt",
      "Nâu be cát ấm",
      "Xám đá tự nhiên",
      "Be yến mạch",
      "Nâu cà phê"
    ],
    fabricLayers: [
      {
        layerNumber: 1,
        title: "Lớp vải mặt",
        code: "Elogi - 1198-2",
        colorHex: "#ebe6db",
        name: "Kem sáng dệt mịn",
        desc: "Bề mặt dệt mịn, tinh tế, dễ phối nội thất không gian sống",
        weaveDetail: "Chi tiết dệt mịn, sợi liên kết đồng đều"
      },
      {
        layerNumber: 2,
        title: "Lớp vải trung gian",
        code: "Elogi - 1198-3",
        colorHex: "#9ea9b3",
        name: "Xám xanh nhạt",
        desc: "Tăng độ dày, giữ form đứng dáng, cản sáng nhẹ nhàng",
        weaveDetail: "Họa tiết vân dệt chéo tinh tế, hiện đại"
      },
      {
        layerNumber: 3,
        title: "Lớp vải lót",
        code: "Elogi - 1198-8",
        colorHex: "#cfc3b0",
        name: "Nâu be cát ấm",
        desc: "Ổn định cấu trúc sợi vải, bền đẹp và giữ màu lâu dài",
        weaveDetail: "Tông màu trung tính, dễ dàng phối hợp"
      }
    ]
  },
  {
    id: "elogi-1206-1",
    name: "Mẫu rèm vải Elogi - 1206 - 1",
    shortName: "Elogi - 1206 - 1",
    category: "Rèm vải",
    price: 600000,
    priceDisplay: "Từ 600.000đ / m²",
    desc: "Vải rèm cao cấp phong cách Nhật Bản · Tông nâu be trung tính, êm mịn và tạo độ rũ tự nhiên",
    thumb: "/assets/curtains/curtain-elogi-1206-1.jpg",
    defaultColor: "#b5aba1",
    colors: ["#b5aba1", "#ddd3c3", "#564a40", "#8d7d70", "#c5b9aa", "#362d26"],
    colorCodes: ["1206-1", "1206-2", "1206-4", "1206-3", "1206-5", "1206-6"],
    colorNames: [
      "Xám be mocha êm mịn",
      "Vàng be champagne",
      "Nâu sô-cô-la cản sáng",
      "Be đất nung",
      "Kem hạnh nhân",
      "Nâu gỗ trầm"
    ],
    fabricLayers: [
      {
        layerNumber: 1,
        title: "Lớp vải mặt",
        code: "Elogi - 1206-1",
        colorHex: "#b5aba1",
        name: "Xám be mocha êm mịn",
        desc: "Bề mặt dệt tinh tế, êm mịn sang trọng, tôn vẻ đẹp thanh lịch",
        weaveDetail: "Dệt sợi mịn màng, bề mặt đồng đều"
      },
      {
        layerNumber: 2,
        title: "Lớp vải trung gian",
        code: "Elogi - 1206-2",
        colorHex: "#ddd3c3",
        name: "Vàng be champagne",
        desc: "Cân bằng ánh sáng tự nhiên, tạo độ rũ suôn mềm mại",
        weaveDetail: "Họa tiết vân dệt chéo hiện đại"
      },
      {
        layerNumber: 3,
        title: "Lớp vải lót",
        code: "Elogi - 1206-4",
        colorHex: "#564a40",
        name: "Nâu sô-cô-la cản sáng",
        desc: "Tăng độ dày, giữ phom sóng rèm, cản sáng và cách nhiệt tối ưu",
        weaveDetail: "Tông nâu be trung tính, dễ phối nội thất"
      }
    ]
  },
  {
    id: "elogi-1230-1",
    name: "Mẫu rèm vải Elogi - 1230 - 1",
    shortName: "Elogi - 1230 - 1",
    category: "Rèm vải",
    price: 580000,
    priceDisplay: "Từ 580.000đ / m²",
    desc: "Vẻ đẹp tinh tế từ chất liệu vải cao cấp UniVeloria · Mềm mịn, thân thiện môi trường, vân dệt sắc nét",
    thumb: "/assets/curtains/curtain-elogi-1230-1.jpg",
    defaultColor: "#e3d8c8",
    colors: ["#e3d8c8", "#8d8c89", "#9e8875", "#d4c6b2", "#6f6e6b", "#3b322a"],
    colorCodes: ["1230-1", "1230-3", "1230-5", "1230-2", "1230-4", "1230-6"],
    colorNames: [
      "Cát vàng kem mềm mịn",
      "Xám ghi sắc nét",
      "Nâu be trung tính",
      "Be cát tự nhiên",
      "Xám tro hiện đại",
      "Nâu đất đậm"
    ],
    fabricLayers: [
      {
        layerNumber: 1,
        title: "Chất liệu vải",
        code: "Elogi - 1230-1",
        colorHex: "#e3d8c8",
        name: "Cát vàng kem mềm mịn",
        desc: "Vải cao cấp Eco-friendly, mềm mịn, thân thiện môi trường",
        weaveDetail: "Chi tiết mép vải cắt gọt sắc nét, đều và thẩm mỹ"
      },
      {
        layerNumber: 2,
        title: "Bề mặt vải",
        code: "Elogi - 1230-3",
        colorHex: "#8d8c89",
        name: "Xám ghi sắc nét",
        desc: "Dệt mịn, họa tiết sắc nét tinh tế, tạo chiều sâu thị giác sang trọng",
        weaveDetail: "Họa tiết vải dệt mịn, tinh tế"
      },
      {
        layerNumber: 3,
        title: "Màu sắc phối",
        code: "Elogi - 1230-5",
        colorHex: "#9e8875",
        name: "Nâu be trung tính",
        desc: "Tông màu trung tính trang nhã, dễ dàng phối hợp với mọi không gian",
        weaveDetail: "Bảng màu đa dạng, hài hòa không gian sống"
      }
    ]
  }
];

// =============================================================================
// 2B. MẪU RÈM CUỐN (5 MẪU CICI HOME CHÍNH HÃNG)
// =============================================================================
export const rollerCurtainSamples = [
  {
    id: "roller-harmony-2",
    name: "Mẫu rèm cuốn Harmony 2",
    shortName: "Harmony 2",
    brand: "CICI HOME",
    category: "Rèm cuốn",
    isRoller: true,
    slogan: "Bền bỉ – Ổn định – Thẩm mỹ cao",
    desc: "Dòng rèm cuốn chất liệu cao cấp, bề mặt mịn, cản sáng hiệu quả, phù hợp cho không gian gia đình và văn phòng hiện đại.",
    price: 420000,
    priceDisplay: "Từ 420.000đ / m²",
    thumb: "/assets/curtains/curtain-roller-harmony-2.jpg",
    defaultColor: "#c5cbcf",
    colors: ["#c5cbcf", "#586573", "#6e5a4d", "#ece8dc", "#ded6cb"],
    colorCodes: ["H 66", "H 67", "H 69", "H 610", "H 611"],
    colorNames: [
      "Xám bạc ghi sáng",
      "Xanh xám slate đậm",
      "Nâu cà phê trầm",
      "Kem sữa linen",
      "Be yến mạch trung tính"
    ],
    highlights: [
      "Cản sáng hiệu quả",
      "Cách nhiệt tốt",
      "Bền màu lâu dài",
      "Dễ vệ sinh & bảo dưỡng"
    ],
    fabricLayers: [
      {
        layerNumber: 1,
        title: "Lớp bề mặt",
        code: "H 66",
        colorHex: "#c5cbcf",
        name: "Vải dệt mịn chống bám bụi",
        desc: "Vải dệt mịn, đồng đều, chống bám bụi, hạn chế thấm nước, dễ lau chùi",
        weaveDetail: "Chi tiết dệt gân dọc viền mịn (Corded fine rib weave)"
      },
      {
        layerNumber: 2,
        title: "Lớp gia cường",
        code: "H 67",
        colorHex: "#586573",
        name: "Lớp gia cường giữ form",
        desc: "Tăng độ bền kéo, chống xô lệch sợi, giữ form ổn định",
        weaveDetail: "Lõi liên kết sợi gia cường tăng độ bền xé"
      },
      {
        layerNumber: 3,
        title: "Lớp lót",
        code: "H 69",
        colorHex: "#6e5a4d",
        name: "Lớp lót cản sáng cách nhiệt",
        desc: "Cản sáng, cách nhiệt và bảo vệ độ bền cấu trúc vải lâu dài",
        weaveDetail: "Lớp phủ cản sáng tiêu chuẩn xuất khẩu"
      }
    ]
  },
  {
    id: "roller-malange-1",
    name: "Mẫu rèm cuốn Malange 1",
    shortName: "Malange 1",
    brand: "CICI HOME",
    category: "Rèm cuốn",
    isRoller: true,
    slogan: "Hiện đại – Thanh lịch – Đa ứng dụng",
    desc: "Sợi dệt hoa râm Melange xước đa sắc thái hiện đại, cản sáng tốt, giữ nhiệt và bền màu theo năm tháng.",
    price: 380000,
    priceDisplay: "Từ 380.000đ / m²",
    thumb: "/assets/curtains/curtain-roller-malange-1.jpg",
    defaultColor: "#b2b7b9",
    colors: ["#f4f6f8", "#ebe7d0", "#b2b7b9", "#9bb7cc", "#d6cbb8", "#3d474d"],
    colorCodes: ["MA 11", "MA 12", "MA 13", "MA 14", "MA 15", "MA 17"],
    colorNames: [
      "Trắng tinh khôi",
      "Vàng be champagne",
      "Xám tro trung tính",
      "Xanh pastel baby blue",
      "Be cát ấm",
      "Xám than chì"
    ],
    highlights: [
      "Bề mặt dệt Melange hoa râm tinh tế",
      "Cản nhiệt, chống lóa màn hình",
      "Kháng khuẩn, chống ẩm mốc",
      "Phù hợp căn hộ và văn phòng làm việc"
    ],
    fabricLayers: [
      {
        layerNumber: 1,
        title: "Lớp bề mặt",
        code: "MA 11",
        colorHex: "#f4f6f8",
        name: "Sợi dệt Melange hoa râm",
        desc: "Dệt mịn đồng đều, hiệu ứng xước hoa râm thanh lịch, chống bám bụi",
        weaveDetail: "Vân dệt Melange đan xen đa sắc thái"
      },
      {
        layerNumber: 2,
        title: "Lớp gia cường",
        code: "MA 13",
        colorHex: "#b2b7b9",
        name: "Lớp gia cường chống co giãn",
        desc: "Giữ form rèm luôn phẳng phiu, không quăn mép khi cuộn mở",
        weaveDetail: "Định hình nhiệt phẳng tuyệt đối"
      },
      {
        layerNumber: 3,
        title: "Lớp lót",
        code: "MA 17",
        colorHex: "#3d474d",
        name: "Lớp lót cản sáng",
        desc: "Cản sáng 90-95%, cách nhiệt giữ không gian mát mẻ",
        weaveDetail: "Lớp lót bảo vệ sợi vải bền màu"
      }
    ]
  },
  {
    id: "roller-moon",
    name: "Mẫu rèm cuốn Moon",
    shortName: "Moon",
    brand: "CICI HOME",
    category: "Rèm cuốn",
    isRoller: true,
    slogan: "Thanh lịch – Tối giản – Hiện đại",
    desc: "Bề mặt vân da trơn mịn màng cản sáng 100%, cách nhiệt Thermo-Shield, mang vẻ đẹp huyền ảo như ánh trăng.",
    price: 450000,
    priceDisplay: "Từ 450.000đ / m²",
    thumb: "/assets/curtains/curtain-roller-moon.jpg",
    defaultColor: "#fdfdfd",
    colors: ["#fdfdfd", "#9fb1be", "#889299", "#f2e7cd", "#b0c8d8", "#b9bec2", "#8b786d"],
    colorCodes: ["M 81", "M 82", "M 86", "M 87", "M 88", "M 89", "M 681"],
    colorNames: [
      "Trắng sứ mặt trăng",
      "Xám xanh sương mù",
      "Xám xi măng hiện đại",
      "Kem vàng pastel",
      "Xanh da trời pastel",
      "Xám bạc ánh kim",
      "Nâu be mocha"
    ],
    highlights: [
      "Cản sáng 100% Blackout tuyệt đối",
      "Tráng bạc phản xạ nhiệt Thermo-Shield",
      "Bề mặt trơn mịn dễ lau chùi",
      "Chống tia cực tím 99.9%"
    ],
    fabricLayers: [
      {
        layerNumber: 1,
        title: "Lớp bề mặt",
        code: "M 81",
        colorHex: "#fdfdfd",
        name: "Bề mặt trơn mịn lì",
        desc: "Bề mặt dệt mịn đồng đều, chống bám bụi, trơn mịn mượt mà",
        weaveDetail: "Bề mặt trứng lì mờ sang trọng (Eggshell finish)"
      },
      {
        layerNumber: 2,
        title: "Lớp gia cường",
        code: "M 86",
        colorHex: "#889299",
        name: "Lớp gia cường trung tâm",
        desc: "Tăng độ bền, giữ form phẳng phiu, chịu nhiệt tốt",
        weaveDetail: "Kết cấu sợi chịu nhiệt ổn định"
      },
      {
        layerNumber: 3,
        title: "Lớp lót",
        code: "M 681",
        colorHex: "#8b786d",
        name: "Lớp lót cách nhiệt cản sáng",
        desc: "Cản sáng 100%, cách nhiệt hiệu quả, bảo vệ mắt và nội thất",
        weaveDetail: "Lớp tráng phủ phản xạ nhiệt cao cấp"
      }
    ]
  },
  {
    id: "roller-silvia",
    name: "Mẫu rèm cuốn Silvia",
    shortName: "Silvia",
    brand: "CICI HOME",
    category: "Rèm cuốn",
    isRoller: true,
    slogan: "Tinh tế – Hiện đại – Ứng dụng linh hoạt",
    desc: "Vải dệt sợi mềm mại dày dặn, thoáng khí, tôn vinh nét đẹp kiến trúc hiện đại, chống ẩm mốc và dễ lau chùi.",
    price: 480000,
    priceDisplay: "Từ 480.000đ / m²",
    thumb: "/assets/curtains/curtain-roller-silvia.jpg",
    defaultColor: "#dbe1e6",
    colors: ["#dbe1e6", "#eee9d7", "#ded8c8", "#c8bdae", "#cad1d7", "#8e969a"],
    colorCodes: ["SV 04201", "SV 04202", "SV 04203", "SV 04204", "SV 04205", "SV 04206"],
    colorNames: [
      "Trắng xám sương",
      "Kem vani dịu",
      "Be sáng tự nhiên",
      "Nâu be linen dệt xước",
      "Xám bạc kim loại",
      "Xám đậm graphite"
    ],
    highlights: [
      "Sợi dệt mềm mại êm ái",
      "Chống bám bụi, lau sạch bằng khăn ẩm",
      "Giữ form phẳng phiu không nhăn nhàu",
      "Kháng ẩm mốc và không phai màu"
    ],
    fabricLayers: [
      {
        layerNumber: 1,
        title: "Lớp bề mặt",
        code: "SV 04201",
        colorHex: "#dbe1e6",
        name: "Sợi dệt mềm mại sang trọng",
        desc: "Lớp bề mặt sợi dệt mịn sang trọng, thoáng khí tự nhiên",
        weaveDetail: "Vân dệt đan thoi mềm rũ cao cấp"
      },
      {
        layerNumber: 2,
        title: "Lớp gia cường",
        code: "SV 04203",
        colorHex: "#ded8c8",
        name: "Lớp gia cường giữ form",
        desc: "Tăng độ bền xé, chống nhăn nhàu, giữ form phẳng phiu",
        weaveDetail: "Lớp đệm vi sợi gia cường cơ học"
      },
      {
        layerNumber: 3,
        title: "Lớp lót",
        code: "SV 04206",
        colorHex: "#8e969a",
        name: "Lớp lót cản sáng",
        desc: "Cản sáng tốt, bảo vệ sợi vải luôn bền màu",
        weaveDetail: "Lớp lót bảo vệ cản tia UV"
      }
    ]
  },
  {
    id: "roller-sunny",
    name: "Mẫu rèm cuốn Sunny",
    shortName: "Sunny",
    brand: "CICI HOME",
    category: "Rèm cuốn",
    isRoller: true,
    slogan: "Bộ sưu tập màu sắc Sunny – Bền đẹp – Dễ phối nội thất",
    desc: "Vải dệt thô sợi canvas đan khít dày dặn, cản nhiệt vượt trội, trượt nước chống bám bẩn, gam màu ấm áp như nắng mai.",
    price: 460000,
    priceDisplay: "Từ 460.000đ / m²",
    thumb: "/assets/curtains/curtain-roller-sunny.jpg",
    defaultColor: "#ece6d5",
    colors: ["#ece6d5", "#aab0b4", "#7f92a3", "#7f7863", "#58626b", "#353c42"],
    colorCodes: ["S 91", "S 92", "S 93", "S 94", "S 95", "S 96"],
    colorNames: [
      "Kem bơ sáng nắng",
      "Ghi xám mờ",
      "Xanh denim cổ điển",
      "Nâu rêu olive",
      "Xám khói đậm",
      "Đen than chì"
    ],
    highlights: [
      "Chất liệu canvas dệt thô đan khít",
      "Khả năng chống thấm trượt nước vượt trội",
      "Cản nhiệt và cản tia UV tối đa",
      "Bền bỉ, thích hợp cả không gian ẩm"
    ],
    fabricLayers: [
      {
        layerNumber: 1,
        title: "Lớp bề mặt",
        code: "S 91",
        colorHex: "#ece6d5",
        name: "Canvas dệt thô dày dặn",
        desc: "Bề mặt dệt cao cấp chống bám bụi, trượt nước, dễ vệ sinh",
        weaveDetail: "Vân dệt sợi canvas đan chéo dày dặn chịu lực"
      },
      {
        layerNumber: 2,
        title: "Lớp gia cường",
        code: "S 93",
        colorHex: "#7f92a3",
        name: "Lớp giữa gia cường",
        desc: "Kháng co giãn nhiệt, tăng độ bền cơ học gấp 2 lần",
        weaveDetail: "Khung dệt sợi polyester cường lực cao"
      },
      {
        layerNumber: 3,
        title: "Lớp lót",
        code: "S 96",
        colorHex: "#353c42",
        name: "Lớp lót cản nhiệt cản sáng",
        desc: "Lớp lót dày dặn cản nhiệt hiệu quả, cản sáng 100%",
        weaveDetail: "Lớp màng nhiệt cản nhiệt cách điện"
      }
    ]
  }
];

// =============================================================================
// 2C. TỔNG HỢP TOÀN BỘ MẪU VẢI & MẪU RÈM (ALL SAMPLES)
// =============================================================================
export const fabricSamples = [
  ...fabricCurtainSamples,
  ...rollerCurtainSamples
];

export const studioStyleFilters = [
  "Tất cả",
  "Rèm vải",
  "Rèm cuốn",
  "Rèm cầu vồng"
];

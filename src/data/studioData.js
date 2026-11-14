// =============================================================================
// 1. LOẠI RÈM (CURTAIN TYPES / CẤU TRÚC KHUNG RÈM 3D - CỐ ĐỊNH 2 LOẠI)
// =============================================================================
export const curtainTypes = [
  {
    id: "sfold-luxury",
    price: 2850000,
    priceDisplay: "Từ 2.850.000đ / bộ",
    name: "Rèm Hai Lớp S-Fold Định Hình Cao Cấp",
    shortName: "Rèm 2 Lớp S-Fold",
    category: "Rèm vải",
    desc: "Vải dệt thô cao cấp & Voan tuyết đón sáng chuẩn 5 sao · Sóng chữ S đều đặn",
    colors: ["#d5cbbe", "#e4ded5", "#c2b4a3", "#a89986", "#877867", "#ded8cf", "#4a443e"],
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
    desc: "Vải dệt melange xám bạc cản sáng 100% · May xếp ly đôi chuẩn khách sạn",
    colors: ["#9fa4a9", "#767c82", "#b4b9bf", "#61666b", "#c5beb5", "#6f7a85", "#383b3e"],
    thumb: "/assets/curtains/curtain-single-pleat.jpg",
    model3dUrl: "/models/curtains/curtain-single-pleat.glb",
    style: "Tối giản & Hiện đại",
    category: "Rèm vải",
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
    desc: "Giải pháp che nắng hiện đại cho không gian làm việc · Kiểm soát ánh sáng chống chói lóa",
    colors: ["#6e727e", "#f2dfcf", "#efdbc9", "#c5b5aa", "#2b2e34"],
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
    desc: "Tối giản – Thanh lịch – Hài hòa cho không gian sống · Cản sáng và cách nhiệt tối ưu",
    colors: ["#f4ece3", "#bdab95", "#b8a58d", "#9d6d42", "#ded8cf"],
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
    desc: "Không gian thoáng đãng đón trọn thiên nhiên · Chống tia UV và trượt nước vượt trội",
    colors: ["#f5ebe2", "#ede1d4", "#c4b6a5", "#747d4d", "#ffffff"],
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
  }
];

// =============================================================================
// 2. MẪU VẢI / MẪU RÈM (FABRIC SAMPLES & TEXTURE COLLECTIONS - 3 MẪU ELOGI)
// =============================================================================
export const fabricSamples = [
  {
    id: "elogi-1198-2",
    name: "Mẫu rèm vải Elogi - 1198 - 2",
    shortName: "Elogi - 1198 - 2",
    price: 680000,
    priceDisplay: "Từ 680.000đ / m²",
    desc: "Vải rèm cao cấp phong cách Nhật Bản · Bề mặt dệt mịn tinh tế, vân dệt chéo hiện đại",
    thumb: "/assets/curtains/curtain-elogi-1198-2.jpg",
    defaultColor: "#ebe6db",
    colors: ["#ebe6db", "#9ea9b3", "#cfc3b0", "#84909a", "#d7cdc0", "#463f38"],
    colorNames: [
      "Lớp vải mặt (Kem sáng)",
      "Lớp trung gian (Xám xanh)",
      "Lớp vải lót (Nâu be cát)",
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
    price: 600000,
    priceDisplay: "Từ 600.000đ / m²",
    desc: "Vải rèm cao cấp phong cách Nhật Bản · Tông nâu be trung tính, êm mịn và tạo độ rũ tự nhiên",
    thumb: "/assets/curtains/curtain-elogi-1206-1.jpg",
    defaultColor: "#b5aba1",
    colors: ["#b5aba1", "#ddd3c3", "#564a40", "#8d7d70", "#c5b9aa", "#362d26"],
    colorNames: [
      "Lớp vải mặt (Xám be mocha)",
      "Lớp trung gian (Vàng be linen)",
      "Lớp vải lót (Nâu sô-cô-la)",
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
    price: 580000,
    priceDisplay: "Từ 580.000đ / m²",
    desc: "Vẻ đẹp tinh tế từ chất liệu vải cao cấp UniVeloria · Mềm mịn, thân thiện môi trường, vân dệt sắc nét",
    thumb: "/assets/curtains/curtain-elogi-1230-1.jpg",
    defaultColor: "#e3d8c8",
    colors: ["#e3d8c8", "#8d8c89", "#9e8875", "#d4c6b2", "#6f6e6b", "#3b322a"],
    colorNames: [
      "Chất liệu vải (Cát vàng kem)",
      "Bề mặt vải (Xám xi măng)",
      "Màu sắc (Nâu socola sữa)",
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

export const studioStyleFilters = [
  "Tất cả",
  "Rèm vải",
  "Rèm cuốn"
];

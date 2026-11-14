export const curtainTypes = [
  {
    id: "sfold-luxury",
    price: 2850000,
    priceDisplay: "Từ 2.850.000đ / bộ",
    name: "Rèm Hai Lớp S-Fold Định Hình Cao Cấp",
    desc: "Vải dệt thô cao cấp Khaki/Greige & Voan tuyết đón sáng chuẩn 5 sao · Sóng chữ S đều đặn",
    colors: ["#d5cbbe", "#e4ded5", "#c2b4a3", "#a89986", "#877867", "#ded8cf", "#4a443e"],
    colorNames: ["Be xám Greige", "Trắng sữa linen", "Nâu cát ấm", "Vàng nhạt ánh kim", "Nâu socola", "Kem tuyết", "Gỗ trầm"],
    thumb: "/assets/curtains/curtain-sfold-luxury.jpg",
    model3dUrl: "/models/curtains/curtain-sfold-luxury.glb",
    sheerTextureUrl: "/assets/curtains/sfold-sheer-texture.svg",
    style: "Khách Sạn 5 Sao",
    fabricLayers: [
      {
        layerNumber: 1,
        title: "Lớp vải chính",
        code: "S-Fold Khaki Greige",
        colorHex: "#d5cbbe",
        name: "Be xám Greige",
        desc: "Vải dệt thô cao cấp Linen-Cotton cản sáng 98% chuẩn khách sạn 5 sao",
        weaveDetail: "Sóng rèm chữ S định hình bồng bềnh lượn sóng"
      },
      {
        layerNumber: 2,
        title: "Lớp voan tuyết",
        code: "Voan Xước Nhật Bản",
        colorHex: "#ded8cf",
        name: "Voan tuyết xuyên sáng",
        desc: "Lớp voan tuyết Nhật Bản xuyên sáng nhẹ nhàng, thoáng khí lọc sáng",
        weaveDetail: "Sợi voan mịn tự nhiên đón nắng"
      },
      {
        layerNumber: 3,
        title: "Tone ấm sang trọng",
        code: "S-Fold Warm Sand",
        colorHex: "#c2b4a3",
        name: "Nâu cát ấm",
        desc: "Tone màu ấm áp, sang trọng cho phòng ngủ và phòng khách rộng",
        weaveDetail: "Sợi dệt dày dặn, cản nhiệt tốt"
      }
    ],
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
    desc: "Vải dệt melange xám bạc cản sáng 100% · May xếp ly đôi chuẩn khách sạn",
    colors: ["#9fa4a9", "#767c82", "#b4b9bf", "#61666b", "#c5beb5", "#6f7a85", "#383b3e"],
    colorNames: ["Xám bạc Melange", "Xám khói đậm", "Ghi sáng ánh kim", "Xám than chì", "Kem be", "Xanh xám slate", "Đen tuyền"],
    thumb: "/assets/curtains/curtain-single-pleat.jpg",
    model3dUrl: "/models/curtains/curtain-single-pleat.glb",
    style: "Tối giản & Hiện đại",
    fabricLayers: [
      {
        layerNumber: 1,
        title: "Lớp vải chính",
        code: "Pinch Pleat Silver",
        colorHex: "#9fa4a9",
        name: "Xám bạc Melange",
        desc: "Vải 1 lớp cản sáng 100% tuyệt đối cho giấc ngủ sâu, cách nhiệt 40%",
        weaveDetail: "May xếp ly đôi định hình nếp đứng sắc nét từ trần đến sàn"
      },
      {
        layerNumber: 2,
        title: "Tone trung tính",
        code: "Pinch Pleat Neutral",
        colorHex: "#767c82",
        name: "Xám trung tính",
        desc: "Sợi dệt melange cao cấp chống bám bụi, kháng khuẩn & chống tia UV",
        weaveDetail: "Sợi dệt chéo dẻo dai, giữ form đứng"
      },
      {
        layerNumber: 3,
        title: "Tone ánh kim",
        code: "Pinch Pleat Pearl",
        colorHex: "#b4b9bf",
        name: "Ghi sáng ánh kim",
        desc: "Hiện đại, thanh lịch, tạo cảm giác thoáng đãng và sang trọng",
        weaveDetail: "Hệ ray nhôm đơn định hình âm trần chuẩn 5 sao"
      }
    ],
    features: [
      "Vải 1 lớp cản sáng 100% tuyệt đối cho giấc ngủ sâu, cách nhiệt 40%",
      "May xếp ly đôi (Pinch Pleat) định hình nếp đứng sắc nét từ trần đến sàn",
      "Sợi dệt melange cao cấp chống bám bụi, kháng khuẩn & chống tia UV",
      "Hệ ray nhôm đơn định hình âm trần vận hành êm ái chuẩn 5 sao"
    ]
  },
  {
    id: "elogi-1198-2",
    price: 680000,
    priceDisplay: "Từ 680.000đ / m²",
    name: "Mẫu rèm vải Elogi - 1198 - 2",
    desc: "Vải rèm cao cấp phong cách Nhật Bản · Bề mặt dệt mịn tinh tế, vân dệt chéo hiện đại",
    colors: ["#ebe6db", "#9ea9b3", "#cfc3b0", "#84909a", "#d7cdc0", "#463f38"],
    colorNames: ["Lớp vải mặt (Kem sáng)", "Lớp trung gian (Xám xanh)", "Lớp vải lót (Nâu be cát)", "Xám đá tự nhiên", "Be yến mạch", "Nâu cà phê"],
    thumb: "/assets/curtains/curtain-elogi-1198-2.jpg",
    model3dUrl: "/models/curtains/curtain-elogi-1198-2.glb",
    style: "Phong cách Nhật Bản",
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
    ],
    features: [
      "Lớp vải mặt (Elogi 1198-2): Bề mặt dệt mịn, tinh tế, dễ phối nội thất không gian",
      "Lớp vải trung gian (Elogi 1198-3): Tăng độ dày, giữ form đứng dáng, cản sáng nhẹ",
      "Lớp vải lót (Elogi 1198-8): Ổn định cấu trúc sợi vải, bền đẹp và giữ màu lâu dài",
      "Họa tiết & vân dệt: Vân dệt chéo tinh tế, hiện đại chuẩn phong cách Nhật Bản"
    ]
  },
  {
    id: "elogi-1206-1",
    price: 600000,
    priceDisplay: "Từ 600.000đ / m²",
    name: "Mẫu rèm vải Elogi - 1206 - 1",
    desc: "Vải rèm cao cấp phong cách Nhật Bản · Tông nâu be trung tính, êm mịn và tạo độ rũ tự nhiên",
    colors: ["#b5aba1", "#ddd3c3", "#564a40", "#8d7d70", "#c5b9aa", "#362d26"],
    colorNames: ["Lớp vải mặt (Xám be mocha)", "Lớp trung gian (Vàng be linen)", "Lớp vải lót (Nâu sô-cô-la)", "Be đất nung", "Kem hạnh nhân", "Nâu gỗ trầm"],
    thumb: "/assets/curtains/curtain-elogi-1206-1.jpg",
    model3dUrl: "/models/curtains/curtain-elogi-1206-1.glb",
    style: "Phong cách Nhật Bản",
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
    ],
    features: [
      "Lớp vải mặt (Elogi 1206-1): Bề mặt dệt tinh tế, êm mịn như lụa nhung, sang trọng quý phái",
      "Lớp vải trung gian (Elogi 1206-2): Cân bằng ánh sáng tự nhiên, tạo độ rũ suôn mềm mại",
      "Lớp vải lót (Elogi 1206-4): Tăng độ dày, giữ phom sóng rèm, cản sáng và cản nhiệt tốt",
      "Bảng màu: Tông nâu be trung tính ấm cúng, hài hòa hoàn hảo với nội thất"
    ]
  },
  {
    id: "elogi-1230-1",
    price: 580000,
    priceDisplay: "Từ 580.000đ / m²",
    name: "Mẫu rèm vải Elogi - 1230 - 1",
    desc: "Vẻ đẹp tinh tế từ chất liệu vải cao cấp UniVeloria · Mềm mịn, thân thiện môi trường, vân dệt sắc nét",
    colors: ["#e3d8c8", "#8d8c89", "#9e8875", "#d4c6b2", "#6f6e6b", "#3b322a"],
    colorNames: ["Chất liệu vải (Cát vàng kem)", "Bề mặt vải (Xám xi măng)", "Màu sắc (Nâu socola sữa)", "Be cát tự nhiên", "Xám tro hiện đại", "Nâu đất đậm"],
    thumb: "/assets/curtains/curtain-elogi-1230-1.jpg",
    model3dUrl: "/models/curtains/curtain-elogi-1230-1.glb",
    style: "Phong cách Nhật Bản",
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
    ],
    features: [
      "Chất liệu vải (Elogi 1230-1): Vải cao cấp Eco-friendly, mềm mịn, thân thiện môi trường",
      "Bề mặt vải (Elogi 1230-3): Dệt mịn, họa tiết sắc nét tinh tế, tạo chiều sâu thị giác sang trọng",
      "Màu sắc phối (Elogi 1230-5): Tông màu trung tính trang nhã, dễ dàng phối hợp nội thất",
      "Chi tiết mép vải: Cắt gọt chuẩn xác, giữ nếp phẳng phiu và độ thẩm mỹ hoàn hảo"
    ]
  }
];

export const studioStyleFilters = [
  "Tất cả",
  "Phong cách Nhật Bản",
  "Khách Sạn 5 Sao",
  "Tối giản & Hiện đại"
];

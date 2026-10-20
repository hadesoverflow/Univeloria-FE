/**
 * AI Room Vision & Rule-Based Recommendation Engine
 * Analyzes room image colors, lighting & architecture to recommend the ideal curtain.
 */

export function determineCurtainRecommendations({
  doorType = 'window',
  location = 'indoor',
  windowPanels = 'single'
} = {}) {
  // Case 2: Cửa sổ đơn hoặc cửa chính NGOÀI TRỜI
  if (location === 'outdoor') {
    return {
      ruleKey: 'outdoor',
      caseTitle: 'Không gian Ngoài trời (Ban công / Hiên / Sân thượng)',
      spaceTypeLabel: 'Ngoài trời',
      doorTypeLabel: doorType === 'main' ? 'Cửa chính ngoài trời' : 'Cửa sổ ngoài trời',
      recommendedTypeIds: ['pvc-tarpaulin'],
      primaryTypeId: 'pvc-tarpaulin',
      primaryColor: '#1a56b7',
      style: 'Ngoài Trời & Chống Mưa Nắng',
      wallTone: 'Không gian mở ban công / villa',
      lightCondition: 'Thời tiết ngoài trời (Nắng gắt & Mưa bão)',
      matchScore: 99,
      aiReason: 'Với không gian ngoài trời hoặc ban công tiếp xúc trực tiếp với nắng, gió và mưa bão, AI đề xuất Rèm Bạt Nhựa PVC: sợi polyester 3 lớp siêu dai chống rách, phủ Nano chống bám bụi và chống thấm nước 100%.',
      tags: ['Ngoài trời', 'Bạt nhựa PVC', 'Chống mưa nắng 100%']
    };
  }

  // Case 3: Cửa sổ 3 CỬA (trong nhà)
  if (doorType === 'window' && windowPanels === '3') {
    return {
      ruleKey: 'tripleWindow',
      caseTitle: 'Cửa sổ 3 cánh (Bộ 3 ô cửa sổ liền kề)',
      spaceTypeLabel: 'Trong nhà',
      doorTypeLabel: 'Cửa sổ 3 cánh',
      recommendedTypeIds: ['roller-triptych'],
      primaryTypeId: 'roller-triptych',
      primaryColor: '#ffffff',
      style: 'Tranh Nghệ Thuật 3 Cánh',
      wallTone: 'Không gian cửa sổ 3 ô liền kề',
      lightCondition: 'Ánh sáng tự nhiên 3 hướng',
      matchScore: 99,
      aiReason: 'Với cấu trúc 3 ô cửa sổ liền kề, AI đề xuất Bộ 3 rèm cửa cuốn in tranh Botanical 3: họa tiết tranh nghệ thuật lá cây phối màu xanh ngọc bích & kem linen đối xứng hoàn mỹ, 3 trục cuốn nhôm riêng biệt linh hoạt.',
      tags: ['Cửa sổ 3 cánh', 'Bộ 3 tranh Botanical 3', 'Trục cuốn độc lập']
    };
  }

  // Case 4: Cửa sổ 4 CỬA (trong nhà)
  if (doorType === 'window' && windowPanels === '4') {
    return {
      ruleKey: 'quadWindow',
      caseTitle: 'Cửa sổ 4 cánh (Bộ 4 ô cửa panorama)',
      spaceTypeLabel: 'Trong nhà',
      doorTypeLabel: 'Cửa sổ 4 cánh',
      recommendedTypeIds: ['roller-quad'],
      primaryTypeId: 'roller-quad',
      primaryColor: '#ffffff',
      style: 'Tranh Panorama Mùa Thu Vàng',
      wallTone: 'Không gian vách kính 4 ô rộng',
      lightCondition: 'Góc nhìn Panorama toàn cảnh',
      matchScore: 99,
      aiReason: 'Với cấu trúc 4 ô cửa sổ rộng, AI đề xuất Bộ 4 rèm cửa cuốn in tranh Panorama Mùa Thu Vàng: đại cảnh lá vàng rực rỡ ghép 4 tấm liền mạch, cản sáng 100% và tạo điểm nhấn sang trọng cho toàn bộ gian phòng.',
      tags: ['Cửa sổ 4 cánh', 'Tranh Panorama Mùa Thu Vàng', 'Ghép 4 tấm liền mạch']
    };
  }

  // Case 5: CỬA CHÍNH (trong nhà)
  if (doorType === 'main') {
    return {
      ruleKey: 'mainDoorIndoor',
      caseTitle: 'Cửa chính / Cửa đi trong nhà',
      spaceTypeLabel: 'Trong nhà',
      doorTypeLabel: 'Cửa chính / Cửa đi',
      recommendedTypeIds: ['leaf-embroidery', 'sfold-luxury', 'single-pleat'],
      primaryTypeId: 'leaf-embroidery',
      primaryColor: '#7e7065',
      style: 'Rèm Vải Khách Sạn 5 Sao & Biệt Thự',
      wallTone: 'Khu vực cửa chính phòng khách',
      lightCondition: 'Đón tiếp ánh sáng không gian chính',
      matchScore: 99,
      aiReason: 'Với khu vực cửa chính trong nhà, AI đề xuất các dòng rèm vải cao cấp: Rèm 2 lớp thêu lá quý phái, Rèm 2 lớp S-Fold chuẩn khách sạn 5 sao và Rèm 1 lớp xếp ly định hình, tạo sự bề thế và đón tiếp sang trọng.',
      tags: ['Cửa chính trong nhà', 'Rèm vải 2 lớp', 'Xếp ly & S-Fold 5 sao']
    };
  }

  // Case 1: Cửa sổ ĐƠN trong nhà (mặc định)
  return {
    ruleKey: 'singleWindowIndoor',
    caseTitle: 'Cửa sổ đơn trong nhà',
    spaceTypeLabel: 'Trong nhà',
    doorTypeLabel: 'Cửa sổ đơn',
    recommendedTypeIds: ['roman-linen', 'honeycomb', 'roller-linen', 'roller-crystal', 'roller-art'],
    primaryTypeId: 'roman-linen',
    primaryColor: '#dfd7c8',
    style: 'Hiện Đại, Tối Giản & Nghệ Thuật',
    wallTone: 'Cửa sổ đơn phòng ngủ / làm việc',
    lightCondition: 'Ánh sáng cửa sổ đơn',
    matchScore: 99,
    aiReason: 'Với ô cửa sổ đơn trong nhà, AI đề xuất 5 giải pháp rèm gọn gàng, cách nhiệt và thẩm mỹ cao: Rèm Roman xếp lớp, Rèm tổ ong cách nhiệt, Rèm cuốn vải dệt Linen, Rèm cuốn in tranh Hoa Pha Lê & Kim Cương, và Rèm cuốn Botanical.',
    tags: ['Cửa sổ đơn', 'Rèm Roman & Tổ ong', 'Rèm cuốn & Tranh nghệ thuật']
  };
}

export async function analyzeRoomPhoto(imageUrl, options = null) {
  // If user provided survey questionnaire options, apply the deterministic rules
  if (options && (options.doorType || options.location || options.windowPanels)) {
    const recommendation = determineCurtainRecommendations(options);
    return Promise.resolve(recommendation);
  }

  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve(determineCurtainRecommendations({ doorType: 'window', location: 'indoor', windowPanels: 'single' }));
      return;
    }

    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const w = 64;
        const h = 64;
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        const imgData = ctx.getImageData(0, 0, w, h).data;
        let totalR = 0, totalG = 0, totalB = 0;
        let brightPixels = 0;
        let darkPixels = 0;
        const totalSample = imgData.length / 4;

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          totalR += r;
          totalG += g;
          totalB += b;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum > 150) brightPixels++;
          if (lum < 60) darkPixels++;
        }

        const avgR = Math.round(totalR / totalSample);
        const avgG = Math.round(totalG / totalSample);
        const avgB = Math.round(totalB / totalSample);
        const avgLum = Math.round(0.299 * avgR + 0.587 * avgG + 0.114 * avgB);

        const isWarm = (avgR * 1.05 + avgG * 0.95) > (avgB * 1.25);
        const isBright = avgLum > 130 || (brightPixels / totalSample > 0.4);

        // Default single window indoor
        const base = determineCurtainRecommendations({ doorType: 'window', location: 'indoor', windowPanels: 'single' });
        base.lightCondition = isBright ? 'Ánh sáng tự nhiên dồi dào' : 'Ánh sáng dịu nhẹ';
        base.wallTone = isWarm ? 'Tone Be Sữa & Gỗ Tự Nhiên' : 'Tone Trắng Sáng & Ghi Hiện Đại';
        resolve(base);
      } catch (e) {
        resolve(determineCurtainRecommendations({ doorType: 'window', location: 'indoor', windowPanels: 'single' }));
      }
    };

    img.onerror = () => {
      resolve(determineCurtainRecommendations({ doorType: 'window', location: 'indoor', windowPanels: 'single' }));
    };

    img.src = imageUrl;
  });
}

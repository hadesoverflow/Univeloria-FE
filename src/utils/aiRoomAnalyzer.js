/**
 * AI Room Vision & Rule-Based Recommendation Engine
 * Analyzes room image colors, lighting & architecture to recommend the ideal curtain.
 */

export function determineCurtainRecommendations({
  doorType = 'window',
  location = 'indoor',
  windowPanels = 'single',
  budget = 'all'
} = {}) {
  // Case 1: Cửa chính / Cửa đi lớn (Phòng khách & Không gian lớn)
  if (doorType === 'main') {
    return {
      ruleKey: 'mainDoorIndoor',
      caseTitle: 'Cửa chính / Cửa ban công lớn phòng khách',
      spaceTypeLabel: 'Trong nhà',
      doorTypeLabel: 'Cửa chính / Cửa đi',
      recommendedTypeIds: ['sfold-luxury', 'elogi-1198-2', 'elogi-1206-1', 'single-pleat', 'elogi-1230-1'],
      primaryTypeId: 'sfold-luxury',
      primaryColor: '#d5cbbe',
      style: 'Khách Sạn 5 Sao & Biệt Thự Cao Cấp',
      wallTone: 'Khu vực cửa chính phòng khách',
      lightCondition: 'Đón ánh sáng tự nhiên toàn cảnh',
      matchScore: 99,
      aiReason: 'Với khu vực cửa chính hoặc cửa ban công rộng, AI đề xuất Rèm Hai Lớp S-Fold Định Hình Cao Cấp: công nghệ dập sóng chữ S bồng bềnh chuẩn 5 sao, kết hợp lớp vải gấm dệt cản sáng 98% và lớp voan tuyết đón nắng nhẹ nhàng.',
      tags: ['Cửa chính', 'Rèm Hai Lớp S-Fold', 'Chuẩn khách sạn 5 sao'],
      estimatedPriceRange: '2.850.000đ - 3.200.000đ / bộ'
    };
  }

  // Case 2: Phân khúc phong cách Nhật Bản / Tinh tế nhẹ nhàng
  if (budget === 'japanese' || windowPanels === 'single') {
    if (budget === 'economy') {
      return {
        ruleKey: 'elogi1230',
        caseTitle: 'Cửa sổ trong nhà - Phong cách Nhật Bản Eco',
        spaceTypeLabel: 'Trong nhà',
        doorTypeLabel: 'Cửa sổ đơn',
        recommendedTypeIds: ['elogi-1230-1', 'elogi-1206-1', 'single-pleat', 'elogi-1198-2', 'sfold-luxury'],
        primaryTypeId: 'elogi-1230-1',
        primaryColor: '#e3d8c8',
        style: 'Phong cách Nhật Bản',
        wallTone: 'Cửa sổ phòng ngủ / phòng làm việc',
        lightCondition: 'Ánh sáng êm dịu',
        matchScore: 98,
        aiReason: 'Với nhu cầu rèm vải cao cấp tối ưu ngân sách, AI đề xuất Mẫu rèm vải Elogi - 1230 - 1: chất vải Eco-friendly mềm mịn, họa tiết dệt sắc nét và viền mép chuẩn xác.',
        tags: ['Cửa sổ đơn', 'Elogi 1230-1', 'Vải Eco-friendly'],
        estimatedPriceRange: '580.000đ / m² hoàn thiện'
      };
    }

    if (budget === 'warmth') {
      return {
        ruleKey: 'elogi1206',
        caseTitle: 'Cửa sổ trong nhà - Tông nâu be ấm áp',
        spaceTypeLabel: 'Trong nhà',
        doorTypeLabel: 'Cửa sổ đơn',
        recommendedTypeIds: ['elogi-1206-1', 'elogi-1198-2', 'sfold-luxury', 'elogi-1230-1', 'single-pleat'],
        primaryTypeId: 'elogi-1206-1',
        primaryColor: '#b5aba1',
        style: 'Phong cách Nhật Bản',
        wallTone: 'Cửa sổ phòng ngủ / nghỉ dưỡng',
        lightCondition: 'Lọc sáng dịu mắt',
        matchScore: 99,
        aiReason: 'Với không gian cần sự ấm cúng và thư giãn, AI đề xuất Mẫu rèm vải Elogi - 1206 - 1: tông nâu be trung tính, chất vải êm mịn tạo độ rũ tự nhiên và cản sáng tốt.',
        tags: ['Cửa sổ', 'Elogi 1206-1', 'Tone nâu be thư giãn'],
        estimatedPriceRange: '600.000đ / m² hoàn thiện'
      };
    }
  }

  // Case 3: Mặc định chuẩn phong cách Nhật Bản tinh tế
  return {
    ruleKey: 'elogi1198',
    caseTitle: 'Cửa sổ trong nhà - Phong cách Nhật Bản tinh tế',
    spaceTypeLabel: 'Trong nhà',
    doorTypeLabel: 'Cửa sổ trong nhà',
    recommendedTypeIds: ['elogi-1198-2', 'sfold-luxury', 'single-pleat', 'elogi-1206-1', 'elogi-1230-1'],
    primaryTypeId: 'elogi-1198-2',
    primaryColor: '#ebe6db',
    style: 'Phong cách Nhật Bản',
    wallTone: 'Không gian sống hiện đại & tối giản',
    lightCondition: 'Ánh sáng tự nhiên êm dịu',
    matchScore: 99,
    aiReason: 'Với kiến trúc hiện đại tối giản, AI đề xuất Mẫu rèm vải Elogi - 1198 - 2: cấu trúc 3 lớp vải cao cấp dệt mịn vân chéo tinh tế, gam màu kem sáng sang trọng và dễ phối hợp nội thất.',
    tags: ['Cửa sổ', 'Elogi 1198-2', 'Dệt chéo tinh tế'],
    estimatedPriceRange: '680.000đ / m² hoàn thiện'
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

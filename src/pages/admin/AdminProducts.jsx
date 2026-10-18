import React, { useState, useEffect, useCallback, useRef } from 'react';

import {

  Package,

  Search,

  Plus,

  Trash2,

  Star,

  Tag,

  Palette,

  Check,

  Image as ImageIcon,

  Home,

  SlidersHorizontal,

  X,

  RefreshCw,

  AlertCircle,

  Edit2,

  UploadCloud,
  Upload,

  Sparkles,

  Settings,

  ExternalLink,

  ShieldCheck,

  CheckCircle2,

  Layers,

  FileCheck

} from 'lucide-react';

import { adminApi } from '../../api/adminApi';

import { appwriteService } from '../../services/appwriteService';



const SLOT_DEFINITIONS = [
  { id: 0, title: 'Ảnh 1: Ảnh chính (Catalog)', isPrimary: true, hint: 'Ảnh đại diện chính của mẫu rèm (Bắt buộc)' },
  { id: 1, title: 'Ảnh 2: Phối cảnh không gian', isPrimary: false, hint: 'Góc phối cảnh rèm trong phòng khách / phòng ngủ' },
  { id: 2, title: 'Ảnh 3: Cận chất liệu vải', isPrimary: false, hint: 'Cận cảnh vân dệt sợi vải và độ rủ mềm mại' },
  { id: 3, title: 'Ảnh 4: Chi tiết may đo', isPrimary: false, hint: 'Múi rèm, ray trượt phụ kiện hoặc thanh treo' }
];



// Preset color options matching the public catalog

const AVAILABLE_COLOR_PALETTES = [

  { name: 'Kem lụa sáng', hex: '#f0dfc8' },

  { name: 'Vàng cát caramel', hex: '#d49a5b' },

  { name: 'Nâu đất hổ phách', hex: '#aa7c56' },

  { name: 'Be xám ấm', hex: '#cbb59e' },

  { name: 'Xám xi măng', hex: '#aaa69d' },

  { name: 'Xám than chì', hex: '#8e8c82' },

  { name: 'Đen tuyền tối', hex: '#282b2d' },

  { name: 'Xanh navy Bỉ', hex: '#5c7893' },

  { name: 'Trắng voan ngọc', hex: '#f1ece5' },

  { name: 'Nâu chocolate', hex: '#755039' },

  { name: 'Vải nhung sữa', hex: '#d7b89a' },

  { name: 'Nâu espresso', hex: '#3a302a' }

];



// Preset curated images for curtain fabrics

const PRESET_CURTAIN_IMAGES = [

  { label: 'Rèm vải linen', src: '/assets/product-linen.jpg' },

  { label: 'Rèm vải nhung', src: '/assets/product-velvet.jpg' },

  { label: 'Rèm voan mềm', src: '/assets/product-sheer.jpg' },

  { label: 'Rèm 2 lớp cản sáng', src: '/assets/product-blackout.jpg' },

  { label: 'Rèm roman hiện đại', src: '/assets/product-roman.jpg' },

  { label: 'Rèm cuốn văn phòng', src: '/assets/product-roller.jpg' },

  { label: 'Rèm văn phòng tối giản', src: '/assets/product-office.jpg' },

  { label: 'Rèm ngoài trời cao cấp', src: '/assets/product-outdoor.jpg' },

  { label: 'Phòng khách Master', src: '/assets/category-living.jpg' },

  { label: 'Phòng ngủ Suite', src: '/assets/category-bedroom.jpg' },

  { label: 'Phòng ăn hiện đại', src: '/assets/category-dining.jpg' }

];



export function AdminProducts({ onProductUpdated }) {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const [roomFilter, setRoomFilter] = useState('ALL');

  const [showAddModal, setShowAddModal] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [submittingText, setSubmittingText] = useState('');

  const [customColorHex, setCustomColorHex] = useState('#c8a87d');



  // 4-Image Upload States: 4 slots per product
  const [newProductImages, setNewProductImages] = useState(['', '', '', '']);
  const [pendingImageFilesAdd, setPendingImageFilesAdd] = useState([null, null, null, null]);
  const [pendingImageInfosAdd, setPendingImageInfosAdd] = useState([null, null, null, null]);

  const [editProductImages, setEditProductImages] = useState(['', '', '', '']);
  const [pendingImageFilesEdit, setPendingImageFilesEdit] = useState([null, null, null, null]);
  const [pendingImageInfosEdit, setPendingImageInfosEdit] = useState([null, null, null, null]);

  const [activeSlotIdx, setActiveSlotIdx] = useState(0);
  const [isEditSlot, setIsEditSlot] = useState(false);
  const activeSlotIdxRef = useRef(0);
  const isEditSlotRef = useRef(false);
  const singleFileInputRef = useRef(null);
  const batchFileInputRef = useRef(null);

  // Appwrite Config Panel
  const [showAppwriteConfig, setShowAppwriteConfig] = useState(false);
  const [appwriteConfigState, setAppwriteConfigState] = useState(() => appwriteService.getConfig());



  // Form State for Adding Product

  const [newProduct, setNewProduct] = useState({

    name: '',

    code: '',

    category: 'Rèm vải',

    room: 'Phòng khách',

    style: 'Hiện đại',

    price: 2450000,

    oldPrice: '',

    badge: 'Mới',

    colors: ['#f0dfc8', '#d49a5b', '#282b2d'],

    image: '/assets/product-linen.jpg',

    description: '',

    fullDescription: 'Rèm linen họa tiết tân cổ điển đại diện cho sự giao thoa tinh tế giữa phong cách kiến trúc Tân cổ điển quyến quý và chất sống hiện đại thanh lịch. Thiết kế hai lớp độc đáo mang đến giải pháp điều tiết ánh sáng toàn diện.',

    material: 'Gấm linen jacquard & voan thêu chỉ lụa cao cấp',

    lightBlocking: 'Cản sáng 85% - 95%, chống tia cực tím UV 99%',

    fabricWidth: '280cm (Hỗ trợ may liền không nối vải cho trần cao đến 3.2m)',

    origin: 'Nhập khẩu nguyên cây Thổ Nhĩ Kỳ / Bỉ',

    warranty: 'Bảo hành 5 năm chính hãng cho ray trượt và phụ kiện',

    rating: '5.0',

    reviews: 12

  });



  // Form State for Editing Product

  const [editingProduct, setEditingProduct] = useState(null);

  const [editFormData, setEditFormData] = useState({

    name: '',

    code: '',

    category: 'Rèm vải',

    room: 'Phòng khách',

    style: 'Hiện đại',

    price: 2450000,

    oldPrice: '',

    badge: '',

    colors: ['#f0dfc8', '#d49a5b'],

    image: '/assets/product-linen.jpg',

    description: '',

    fullDescription: '',

    material: '',

    lightBlocking: '',

    fabricWidth: '',

    origin: '',

    warranty: '',

    rating: '5.0',

    reviews: 12

  });



  const categories = ['ALL', 'Rèm vải', 'Rèm voan', 'Rèm cuốn', 'Rèm roman', 'Rèm gỗ', 'Rèm hai lớp'];

  const rooms = ['ALL', 'Phòng khách', 'Phòng ngủ', 'Phòng ăn', 'Văn phòng', 'Ngoài trời'];



  // Fetch real products from Database

  const fetchProducts = useCallback(async () => {

    try {

      setLoading(true);

      setError(null);

      const res = await adminApi.getProducts({

        category: categoryFilter,

        room: roomFilter,

        search: searchTerm.trim() || undefined

      });



      const rawList = Array.isArray(res)

        ? res

        : Array.isArray(res?.data)

        ? res.data

        : [];



      const normalized = rawList.map((p) => {

        let parsedColors = ['#f0dfc8', '#d49a5b'];

        if (Array.isArray(p.colorHexList) && p.colorHexList.length > 0) {

          parsedColors = p.colorHexList;

        } else if (Array.isArray(p.colors) && p.colors.length > 0) {

          parsedColors = p.colors.map((c) => (typeof c === 'string' ? c : c.hexCode || '#c8a87d'));

        }



        return {

          id: p.id,

          name: p.name,

          code: p.code || ('UVL-' + (1000 + p.id)),

          category: p.category || 'Rèm vải',

          room: p.roomType || 'Phòng khách',

          style: p.style || 'Hiện đại',

          price: p.basePrice || 2450000,

          oldPrice: p.oldPrice,

          badge: p.badge,

          colors: parsedColors,

          image: p.thumbnailUrl || '/assets/product-linen.jpg',
          imageUrls: Array.isArray(p.imageUrls) ? p.imageUrls : (p.thumbnailUrl ? [p.thumbnailUrl] : []),

          description: p.description,

          fullDescription: p.fullDescription,

          material: p.material,

          lightBlocking: p.lightBlocking,

          fabricWidth: p.fabricWidth,

          origin: p.origin,

          warranty: p.warranty,

          rating: p.rating || 5.0,

          reviews: p.reviewsCount || 0

        };

      });



      setProducts(normalized);

    } catch (err) {

      console.error('Fetch products error:', err);

      setError('Không thể kết nối đến máy chủ quản trị: ' + (err.message || 'Lỗi không xác định'));

    } finally {

      setLoading(false);

    }

  }, [categoryFilter, roomFilter, searchTerm]);



  useEffect(() => {

    fetchProducts();

  }, [fetchProducts]);



  // Multi-image upload handlers: 4 slots per product
  const handlePickSlot = (slotIdx, isEdit = false) => {
    activeSlotIdxRef.current = slotIdx;
    isEditSlotRef.current = isEdit;
    setActiveSlotIdx(slotIdx);
    setIsEditSlot(isEdit);
    if (singleFileInputRef.current) {
      singleFileInputRef.current.value = '';
      singleFileInputRef.current.click();
    }
  };

  const handleSelectSlotFile = (file) => {
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      alert('Kích thước ảnh vượt quá 15MB. Vui lòng chọn ảnh nhẹ hơn.');
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    const fileInfo = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    };
    const targetIdx = activeSlotIdxRef.current;
    const isEdit = isEditSlotRef.current;

    if (isEdit) {
      setEditProductImages((prev) => {
        const next = [...prev];
        next[targetIdx] = previewUrl;
        return next;
      });
      setPendingImageFilesEdit((prev) => {
        const next = [...prev];
        next[targetIdx] = file;
        return next;
      });
      setPendingImageInfosEdit((prev) => {
        const next = [...prev];
        next[targetIdx] = fileInfo;
        return next;
      });
      if (targetIdx === 0) {
        setEditFormData((prev) => ({ ...prev, image: previewUrl }));
      }
    } else {
      setNewProductImages((prev) => {
        const next = [...prev];
        next[targetIdx] = previewUrl;
        return next;
      });
      setPendingImageFilesAdd((prev) => {
        const next = [...prev];
        next[targetIdx] = file;
        return next;
      });
      setPendingImageInfosAdd((prev) => {
        const next = [...prev];
        next[targetIdx] = fileInfo;
        return next;
      });
      if (targetIdx === 0) {
        setNewProduct((prev) => ({ ...prev, image: previewUrl }));
      }
    }
  };

  const handleBatchFiles = (fileList, isEdit = false) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).slice(0, 4);

    files.forEach((file, idx) => {
      if (file.size > 15 * 1024 * 1024) return;
      const previewUrl = URL.createObjectURL(file);
      const fileInfo = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      };

      if (isEdit) {
        setEditProductImages((prev) => {
          const next = [...prev];
          next[idx] = previewUrl;
          return next;
        });
        setPendingImageFilesEdit((prev) => {
          const next = [...prev];
          next[idx] = file;
          return next;
        });
        setPendingImageInfosEdit((prev) => {
          const next = [...prev];
          next[idx] = fileInfo;
          return next;
        });
        if (idx === 0) {
          setEditFormData((prev) => ({ ...prev, image: previewUrl }));
        }
      } else {
        setNewProductImages((prev) => {
          const next = [...prev];
          next[idx] = previewUrl;
          return next;
        });
        setPendingImageFilesAdd((prev) => {
          const next = [...prev];
          next[idx] = file;
          return next;
        });
        setPendingImageInfosAdd((prev) => {
          const next = [...prev];
          next[idx] = fileInfo;
          return next;
        });
        if (idx === 0) {
          setNewProduct((prev) => ({ ...prev, image: previewUrl }));
        }
      }
    });
  };

  const handleRemoveSlot = (slotIdx, isEdit = false, e) => {
    if (e) e.stopPropagation();
    if (isEdit) {
      setEditProductImages((prev) => {
        const next = [...prev];
        next[slotIdx] = '';
        return next;
      });
      setPendingImageFilesEdit((prev) => {
        const next = [...prev];
        next[slotIdx] = null;
        return next;
      });
      setPendingImageInfosEdit((prev) => {
        const next = [...prev];
        next[slotIdx] = null;
        return next;
      });
      if (slotIdx === 0) {
        setEditFormData((prev) => ({ ...prev, image: '' }));
      }
    } else {
      setNewProductImages((prev) => {
        const next = [...prev];
        next[slotIdx] = '';
        return next;
      });
      setPendingImageFilesAdd((prev) => {
        const next = [...prev];
        next[slotIdx] = null;
        return next;
      });
      setPendingImageInfosAdd((prev) => {
        const next = [...prev];
        next[slotIdx] = null;
        return next;
      });
      if (slotIdx === 0) {
        setNewProduct((prev) => ({ ...prev, image: '' }));
      }
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewProductImages(['', '', '', '']);
    setPendingImageFilesAdd([null, null, null, null]);
    setPendingImageInfosAdd([null, null, null, null]);
  };

  const handleCloseEditModal = () => {
    setEditingProduct(null);
    setEditProductImages(['', '', '', '']);
    setPendingImageFilesEdit([null, null, null, null]);
    setPendingImageInfosEdit([null, null, null, null]);
  };

  // Save Appwrite Configuration

  const handleSaveAppwriteConfig = (e) => {

    e.preventDefault();

    const updated = appwriteService.saveConfig(appwriteConfigState);

    setAppwriteConfigState(updated);

    alert('Đã lưu cấu hình Appwrite thành công!');

    setShowAppwriteConfig(false);

  };



  // Toggle color picker for Add

  const handleToggleColor = (hex) => {

    if (newProduct.colors.includes(hex)) {

      if (newProduct.colors.length > 1) {

        setNewProduct({

          ...newProduct,

          colors: newProduct.colors.filter((c) => c !== hex)

        });

      }

    } else {

      setNewProduct({

        ...newProduct,

        colors: [...newProduct.colors, hex]

      });

    }

  };



  // Add custom hex color

  const handleAddCustomColor = () => {

    if (!customColorHex || !customColorHex.startsWith('#')) return;

    if (!newProduct.colors.includes(customColorHex)) {

      setNewProduct({

        ...newProduct,

        colors: [...newProduct.colors, customColorHex]

      });

    }

  };



  // Add new product submit into Database: Upload image to Appwrite NOW if pending

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name.trim()) {
      alert('Vui lòng nhập tên thiết kế rèm.');
      return;
    }

    setSubmitting(true);

    try {
      // Step 1: Upload 4 image slots to Appwrite if pending
      const finalImageUrls = [...newProductImages];

      for (let i = 0; i < 4; i++) {
        const pendingFile = pendingImageFilesAdd[i];
        if (pendingFile) {
          setSubmittingText('Đang tải ảnh ' + (i + 1) + '/4 lên Appwrite Cloud Storage...');
          try {
            const uploadRes = await (appwriteService.uploadProductImage ? appwriteService.uploadProductImage(pendingFile) : appwriteService.uploadImage(pendingFile));
            const uploadedUrl = typeof uploadRes === 'string' ? uploadRes : (uploadRes?.url || uploadRes?.previewUrl);
            finalImageUrls[i] = uploadedUrl;
          } catch (uploadErr) {
            console.error('Lỗi tải ảnh slot ' + (i + 1) + ' lên Appwrite:', uploadErr);
            throw new Error('Tải ảnh ' + (i + 1) + ' thất bại: ' + uploadErr.message);
          }
        }
      }

      if (!finalImageUrls[0]) {
        finalImageUrls[0] = newProduct.image || '/assets/product-linen.jpg';
      }

      const cleanImageUrls = finalImageUrls.filter(Boolean);

      // Step 2: Save product to Database
      setSubmittingText('Đang lưu mẫu rèm vào Database...');

      const payload = {
        name: newProduct.name.trim(),
        code: newProduct.code.trim() || undefined,
        category: newProduct.category,
        roomType: newProduct.room,
        style: newProduct.style,
        price: Number(newProduct.price) || 2000000,
        oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
        priceUnit: '/m²',
        badge: newProduct.badge?.trim() || null,
        image: cleanImageUrls[0] || '/assets/product-linen.jpg',
        imageUrls: cleanImageUrls,
        colors: newProduct.colors,
        description: newProduct.description?.trim() || ('Mẫu rèm ' + newProduct.name + ' cao cấp cho ' + newProduct.room + '.'),
        fullDescription: newProduct.fullDescription?.trim() || newProduct.description?.trim() || '',
        material: newProduct.material?.trim() || 'Gấm linen jacquard & voan thêu chỉ lụa cao cấp',
        lightBlocking: newProduct.lightBlocking?.trim() || 'Cản sáng 85% - 95%, chống tia cực tím UV 99%',
        fabricWidth: newProduct.fabricWidth?.trim() || '280cm (Hỗ trợ may liền không nối vải cho trần cao đến 3.2m)',
        origin: newProduct.origin?.trim() || 'Nhập khẩu nguyên cây Thổ Nhĩ Kỳ / Bỉ',
        warranty: newProduct.warranty?.trim() || 'Bảo hành 5 năm chính hãng cho ray trượt và phụ kiện',
        rating: Number(newProduct.rating) || 5.0,
        reviews: Number(newProduct.reviews) || 0
      };

      const res = await adminApi.createProduct(payload);
      const createdId = res?.id || res?.data?.id || Date.now();

      setProducts((prev) => [
        {
          id: createdId,
          ...payload,
          basePrice: payload.price,
          roomType: payload.roomType,
          thumbnailUrl: payload.image,
          imageUrls: cleanImageUrls
        },
        ...prev
      ]);

      // Reset
      handleCloseAddModal();
      setNewProduct({
        name: '',
        code: '',
        category: 'Rèm vải',
        room: 'Phòng khách',
        style: 'Hiện đại',
        price: 2450000,
        oldPrice: '',
        badge: 'Mới',
        colors: ['#f0dfc8', '#d49a5b', '#282b2d'],
        image: '/assets/product-linen.jpg',
        description: '',
        fullDescription: 'Rèm linen họa tiết tân cổ điển đại diện cho sự giao thoa tinh tế giữa phong cách kiến trúc Tân cổ điển quyến quý và chất sống hiện đại thanh lịch. Thiết kế hai lớp độc đáo mang đến giải pháp điều tiết ánh sáng toàn diện.',
        material: 'Gấm linen jacquard & voan thêu chỉ lụa cao cấp',
        lightBlocking: 'Cản sáng 85% - 95%, chống tia cực tím UV 99%',
        fabricWidth: '280cm (Hỗ trợ may liền không nối vải cho trần cao đến 3.2m)',
        origin: 'Nhập khẩu nguyên cây Thổ Nhĩ Kỳ / Bỉ',
        warranty: 'Bảo hành 5 năm chính hãng cho ray trượt và phụ kiện',
        rating: '5.0',
        reviews: 12
      });

      alert('Đã lưu mẫu rèm cùng bộ sưu tập 4 ảnh thành công!');
    } catch (err) {
      console.error('Lỗi khi thêm sản phẩm:', err);
      alert('Lỗi: ' + err.message);
    } finally {
      setSubmitting(false);
      setSubmittingText('');
    }
  };

  // Delete product from Database

  const handleDeleteProduct = async (id, name) => {

    if (window.confirm('Bạn có chắc chắn muốn xóa mẫu rèm "' + name + '" vĩnh viễn khỏi cơ sở dữ liệu?')) {

      try {

        await adminApi.deleteProduct(id);

        setProducts((prev) => prev.filter((p) => p.id !== id));

      } catch (err) {

        alert('Lỗi khi xóa sản phẩm: ' + err.message);

      }

    }

  };



  // Open Edit Product Modal
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);

    let initImages = ['', '', '', ''];
    if (Array.isArray(product.imageUrls) && product.imageUrls.length > 0) {
      initImages = [
        product.imageUrls[0] || product.image || '',
        product.imageUrls[1] || '',
        product.imageUrls[2] || '',
        product.imageUrls[3] || ''
      ];
    } else if (product.image) {
      initImages[0] = product.image;
    }
    setEditProductImages(initImages);
    setPendingImageFilesEdit([null, null, null, null]);
    setPendingImageInfosEdit([null, null, null, null]);

    setEditFormData({
      name: product.name || '',
      code: product.code || '',
      category: product.category || 'Rèm vải',
      room: product.room || product.roomType || 'Phòng khách',
      style: product.style || 'Hiện đại',
      price: product.price || 2450000,
      oldPrice: product.oldPrice || '',
      badge: product.badge || '',
      colors: Array.isArray(product.colors) && product.colors.length > 0 ? product.colors : ['#f0dfc8', '#d49a5b'],
      image: initImages[0] || '/assets/product-linen.jpg',
      description: product.description || '',
      fullDescription: product.fullDescription || '',
      material: product.material || '',
      lightBlocking: product.lightBlocking || '',
      fabricWidth: product.fabricWidth || '',
      origin: product.origin || '',
      warranty: product.warranty || '',
      rating: product.rating || 5.0,
      reviews: product.reviews || 12
    });
  };

  // Submit Update Product to Database: Upload 4 image slots to Appwrite NOW if pending
  const handleUpdateProductSubmit = async (e) => {
    e.preventDefault();
    if (!editFormData.name.trim()) {
      alert('Vui lòng nhập tên thiết kế rèm.');
      return;
    }

    setSubmitting(true);

    try {
      // Step 1: Upload 4 image slots to Appwrite if pending
      const finalImageUrls = [...editProductImages];

      for (let i = 0; i < 4; i++) {
        const pendingFile = pendingImageFilesEdit[i];
        if (pendingFile) {
          setSubmittingText('Đang tải ảnh ' + (i + 1) + '/4 lên Appwrite Cloud Storage...');
          try {
            const uploadRes = await (appwriteService.uploadProductImage ? appwriteService.uploadProductImage(pendingFile) : appwriteService.uploadImage(pendingFile));
            const uploadedUrl = typeof uploadRes === 'string' ? uploadRes : (uploadRes?.url || uploadRes?.previewUrl);
            finalImageUrls[i] = uploadedUrl;
          } catch (uploadErr) {
            console.error('Lỗi tải ảnh slot ' + (i + 1) + ' lên Appwrite:', uploadErr);
            throw new Error('Tải ảnh ' + (i + 1) + ' thất bại: ' + uploadErr.message);
          }
        }
      }

      if (!finalImageUrls[0]) {
        finalImageUrls[0] = editFormData.image || '/assets/product-linen.jpg';
      }

      const cleanImageUrls = finalImageUrls.filter(Boolean);

      // Step 2: Save to Database
      setSubmittingText('Đang cập nhật Database...');

      const payload = {
        name: editFormData.name.trim(),
        code: editFormData.code.trim() || undefined,
        category: editFormData.category,
        roomType: editFormData.room,
        style: editFormData.style,
        price: Number(editFormData.price) || 2000000,
        oldPrice: editFormData.oldPrice ? Number(editFormData.oldPrice) : null,
        priceUnit: '/m²',
        badge: editFormData.badge?.trim() || null,
        image: cleanImageUrls[0] || '/assets/product-linen.jpg',
        imageUrls: cleanImageUrls,
        colors: editFormData.colors,
        description: editFormData.description?.trim() || ('Mẫu rèm ' + editFormData.name + ' cao cấp cho ' + editFormData.room + '.'),
        fullDescription: editFormData.fullDescription?.trim() || editFormData.description?.trim() || '',
        material: editFormData.material?.trim() || '',
        lightBlocking: editFormData.lightBlocking?.trim() || '',
        fabricWidth: editFormData.fabricWidth?.trim() || '',
        origin: editFormData.origin?.trim() || '',
        warranty: editFormData.warranty?.trim() || '',
        rating: Number(editFormData.rating) || 5.0,
        reviews: Number(editFormData.reviews) || 0
      };

      await adminApi.updateProduct(editingProduct.id, payload);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...payload,
                basePrice: payload.price,
                roomType: payload.roomType,
                thumbnailUrl: payload.image,
                imageUrls: cleanImageUrls
              }
            : p
        )
      );

      handleCloseEditModal();
      if (onProductUpdated) onProductUpdated();
      alert('Đã cập nhật mẫu rèm và bộ 4 ảnh thành công!');
    } catch (err) {
      console.error('Lỗi khi cập nhật sản phẩm:', err);
      alert('Lỗi: ' + err.message);
    } finally {
      setSubmitting(false);
      setSubmittingText('');
    }
  };

  return (

    <div className="admin-tab-content fade-in">

      {/* Header bar */}

      <div className="admin-welcome-bar">

        <div>

          <h2 className="admin-page-heading">Quản Lí Mẫu Rèm & Danh Mục Sản Phẩm</h2>

          <p className="admin-page-sub">

            Quản lý kho thiết kế rèm may đo cao cấp thực tế trong Database ({products.length} sản phẩm).

          </p>

        </div>

        <div style={{ display: 'flex', gap: '10px' }}>

          <button

            type="button"

            className="admin-btn-secondary"

            onClick={fetchProducts}

            disabled={loading}

            title="Làm mới dữ liệu từ Database"

          >

            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />

            <span>Làm mới</span>

          </button>

          <button

            type="button"

            className="btn-admin-primary"

            onClick={() => {
              setNewProductImages(['', '', '', '']);
              setPendingImageFilesAdd([null, null, null, null]);
              setPendingImageInfosAdd([null, null, null, null]);
              setShowAddModal(true);
            }}

          >

            <Plus size={16} />

            <span>Thêm thiết kế rèm mới</span>

          </button>

        </div>

      </div>



      {/* Error Notice */}

      {error && (

        <div

          className="admin-error-banner"

          style={{

            background: '#fef2f2',

            border: '1px solid #fecaca',

            padding: '12px 16px',

            borderRadius: '10px',

            color: '#b91c1c',

            marginBottom: '20px',

            display: 'flex',

            alignItems: 'center',

            gap: '10px'

          }}

        >

          <AlertCircle size={18} />

          <span>{error}</span>

        </div>

      )}



      {/* Filter and Search Bar */}

      <div className="admin-filter-bar">

        <div className="admin-search-box">

          <Search size={16} className="search-icon" />

          <input

            type="text"

            placeholder="Tìm theo tên mẫu rèm, mã UVL-..."

            value={searchTerm}

            onChange={(e) => setSearchTerm(e.target.value)}

          />

        </div>



        {/* Category pills */}

        <div className="admin-filter-pills">

          {categories.map((cat) => (

            <button

              key={cat}

              type="button"

              className={`filter-pill-btn ${categoryFilter === cat ? 'active' : ''}`}

              onClick={() => setCategoryFilter(cat)}

            >

              {cat === 'ALL' ? 'Tất cả loại rèm' : cat}

            </button>

          ))}

        </div>

      </div>



      {/* Room Category Quick Strip */}

      <div className="admin-room-filter-strip">

        <span className="room-strip-label">

          <Home size={14} />

          <span>Không gian phòng:</span>

        </span>

        <div className="room-strip-btns">

          {rooms.map((rm) => (

            <button

              key={rm}

              type="button"

              className={`room-chip-btn ${roomFilter === rm ? 'active' : ''}`}

              onClick={() => setRoomFilter(rm)}

            >

              {rm === 'ALL' ? 'Tất cả không gian' : rm}

            </button>

          ))}

        </div>

      </div>



      {/* Products Table with Color Swatches */}

      <div className="admin-card-panel">

        <div className="admin-table-responsive">

          <table className="admin-data-table">

            <thead>

              <tr>

                <th>Sản phẩm rèm</th>

                <th>Mã SKU</th>

                <th>Phân loại & Không gian</th>

                <th>Phong cách</th>

                <th>Bảng màu sắc</th>

                <th>Đơn giá / m²</th>

                <th>Đánh giá</th>

                <th>Huy hiệu</th>

                <th>Thao tác</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td colSpan="9" style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>

                    <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 8px', display: 'block', color: '#c8a87d' }} />

                    <span>Đang tải danh mục rèm từ cơ sở dữ liệu...</span>

                  </td>

                </tr>

              ) : products.length === 0 ? (

                <tr>

                  <td colSpan="9" style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>

                    Không tìm thấy mẫu rèm phù hợp trong cơ sở dữ liệu.

                  </td>

                </tr>

              ) : (

                products.map((p) => (

                  <tr key={p.id}>

                    <td>

                      <div className="product-table-cell">

                        <img src={p.image} alt={p.name} className="product-table-thumb" />

                        <div className="product-info-cell">

                          <strong>{p.name}</strong>

                          {p.room && <span className="product-room-tag">{p.room}</span>}

                        </div>

                      </div>

                    </td>

                    <td>

                      <span className="table-code-badge">{p.code}</span>

                    </td>

                    <td>

                      <div className="table-cat-cell">

                        <span className="table-cat-pill">{p.category}</span>

                      </div>

                    </td>

                    <td>

                      <span className="table-style-pill">{p.style}</span>

                    </td>

                    <td>

                      <div className="table-color-swatches" title={`Gồm ${p.colors ? p.colors.length : 0} màu dệt`}>

                        {p.colors && p.colors.map((c, idx) => (

                          <span

                            key={idx}

                            className="swatch-circle"

                            style={{ backgroundColor: c }}

                            title={c}

                          />

                        ))}

                      </div>

                    </td>

                    <td>

                      <div className="table-price-cell">

                        <strong className="table-price">

                          {Number(p.price).toLocaleString('vi-VN')}₫

                        </strong>

                        {p.oldPrice && (

                          <small className="table-old-price">

                            {Number(p.oldPrice).toLocaleString('vi-VN')}₫

                          </small>

                        )}

                      </div>

                    </td>

                    <td>

                      <div className="table-rating-cell">

                        <Star size={13} fill="#f59e0b" color="#f59e0b" />

                        <span>{p.rating}</span>

                        <small>({p.reviews || 0})</small>

                      </div>

                    </td>

                    <td>

                      {p.badge ? (

                        <span className={`table-badge-pill ${p.badge === 'Ưu đãi' ? 'sale' : p.badge === 'Bán chạy' ? 'hot' : 'new'}`}>

                          {p.badge}

                        </span>

                      ) : (

                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>—</span>

                      )}

                    </td>

                    <td>

                      <div className="table-actions-row">

                        <button

                          type="button"

                          className="btn-table-action view"

                          title="Chỉnh sửa mẫu rèm"

                          onClick={() => handleOpenEditModal(p)}

                        >

                          <Edit2 size={14} color="#3b82f6" />

                        </button>

                        <button

                          type="button"

                          className="btn-table-action delete"

                          title="Xóa mẫu thiết kế khỏi Database"

                          onClick={() => handleDeleteProduct(p.id, p.name)}

                        >

                          <Trash2 size={14} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>



      {/* ================= COMPREHENSIVE ADD PRODUCT MODAL ================= */}

      {showAddModal && (

        <div className="modal-backdrop" onClick={handleCloseAddModal}>

          <div

            className="order-detail-modal product-modal-large"

            onClick={(e) => e.stopPropagation()}

          >

            {/* Modal Header */}

            <div className="modal-header">

              <div>

                <span className="modal-sub">THÊM MẪU RÈM VÀO CƠ SỞ DỮ LIỆU</span>

                <h3 className="modal-title">Thêm Mẫu Rèm May Đo Mới</h3>

              </div>

              <button

                type="button"

                className="modal-close-btn"

                onClick={() => setShowAddModal(false)}

              >

                ✕

              </button>

            </div>



            <form onSubmit={handleAddProduct}>

              <div className="modal-body-scroll" style={{ padding: '24px' }}>

                <div className="add-product-modal-grid">
                  {/* Left Column: Basic Details, Pricing & Color Swatches */}
                  <div className="modal-form-col">
                    <h4 className="modal-section-title">
                      <Sparkles size={15} />
                      <span>Thông tin mẫu rèm</span>
                    </h4>

                    {/* Product Name */}
                    <div className="modal-form-group">
                      <label>
                        Tên thiết kế rèm <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="modal-input"
                        placeholder="VD: Rèm Vải Linen Thô Dệt Cản Sáng Monaco"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                      />
                    </div>

                    {/* Product SKU & Badge */}
                    <div className="modal-form-row">
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>Mã sản phẩm (SKU)</label>
                        <input
                          type="text"
                          className="modal-input"
                          placeholder="VD: UVL-101"
                          value={newProduct.code}
                          onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                        />
                      </div>
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>Huy hiệu (Badge)</label>
                        <select
                          className="modal-select"
                          value={newProduct.badge}
                          onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                        >
                          <option value="Mới">Mới</option>
                          <option value="Bán chạy">Bán chạy</option>
                          <option value="Cao cấp">Cao cấp</option>
                          <option value="Đặc biệt">Đặc biệt</option>
                          <option value="Giảm giá">Giảm giá</option>
                          <option value="">Không có</option>
                        </select>
                      </div>
                    </div>

                    {/* Category & Room */}
                    <div className="modal-form-row">
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>
                          Loại rèm <span className="req">*</span>
                        </label>
                        <select
                          className="modal-select"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                          <option value="Rèm vải">Rèm vải</option>
                          <option value="Rèm voan">Rèm voan</option>
                          <option value="Rèm cuốn">Rèm cuốn</option>
                          <option value="Rèm roman">Rèm roman</option>
                          <option value="Rèm gỗ">Rèm gỗ</option>
                          <option value="Rèm hai lớp">Rèm hai lớp</option>
                        </select>
                      </div>
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>
                          Không gian phòng <span className="req">*</span>
                        </label>
                        <select
                          className="modal-select"
                          value={newProduct.room}
                          onChange={(e) => setNewProduct({ ...newProduct, room: e.target.value })}
                        >
                          <option value="Phòng khách">Phòng khách</option>
                          <option value="Phòng ngủ">Phòng ngủ</option>
                          <option value="Phòng ăn">Phòng ăn</option>
                          <option value="Văn phòng">Văn phòng</option>
                          <option value="Ngoài trời">Ngoài trời</option>
                        </select>
                      </div>
                    </div>

                    {/* Style & Measure Unit */}
                    <div className="modal-form-row">
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>Phong cách</label>
                        <select
                          className="modal-select"
                          value={newProduct.style}
                          onChange={(e) => setNewProduct({ ...newProduct, style: e.target.value })}
                        >
                          <option value="Hiện đại">Hiện đại</option>
                          <option value="Tối giản">Tối giản</option>
                          <option value="Tân cổ điển">Tân cổ điển</option>
                          <option value="Bắc Âu (Scandi)">Bắc Âu (Scandi)</option>
                          <option value="Wabi Sabi">Wabi Sabi</option>
                          <option value="Sang trọng">Sang trọng</option>
                        </select>
                      </div>
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>Đơn vị may đo</label>
                        <select className="modal-select" defaultValue="m2">
                          <option value="m2">Mét vuông (m²)</option>
                          <option value="m">Mét ngang hoàn thiện (m)</option>
                          <option value="set">Bộ rèm hoàn chỉnh</option>
                        </select>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="modal-form-row">
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>
                          Đơn giá may đo / m² (VNĐ) <span className="req">*</span>
                        </label>
                        <input
                          type="number"
                          className="modal-input"
                          placeholder="2450000"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          required
                        />
                      </div>
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>Giá gốc trước giảm (nếu có)</label>
                        <input
                          type="number"
                          className="modal-input"
                          placeholder="Để trống nếu không giảm"
                          value={newProduct.oldPrice}
                          onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Phân loại màu sắc dệt sẵn - Integrated into Left Column */}
                    <div className="modal-color-section" style={{ marginTop: '16px' }}>
                      <h4 className="modal-section-title">
                        <Palette size={15} />
                        <span>Phân loại màu sắc dệt sẵn</span>
                      </h4>
                      <p className="modal-section-sub">
                        Chọn các màu sắc vải dệt khách hàng có thể chọn:
                      </p>

                      <div className="palette-picker-grid">
                        {AVAILABLE_COLOR_PALETTES.map((colorItem) => {
                          const isSelected = newProduct.colors.includes(colorItem.hex);
                          return (
                            <button
                              key={colorItem.hex}
                              type="button"
                              className={`color-palette-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleToggleColor(colorItem.hex)}
                              title={`${colorItem.name} (${colorItem.hex})`}
                            >
                              <span
                                className="color-btn-dot"
                                style={{ backgroundColor: colorItem.hex }}
                              >
                                {isSelected && (
                                  <Check
                                    size={12}
                                    color={['#f0dfc8', '#f1ece5', '#e9d8c2'].includes(colorItem.hex) ? '#0f172a' : '#ffffff'}
                                  />
                                )}
                              </span>
                              <span className="color-btn-name">{colorItem.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Hex Add */}
                      <div className="custom-hex-row">
                        <input
                          type="text"
                          className="modal-input hex-input"
                          placeholder="Nhập mã #hex khác..."
                          value={customColorHex}
                          onChange={(e) => setCustomColorHex(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn-add-hex"
                          onClick={handleAddCustomColor}
                        >
                          + Thêm màu
                        </button>
                      </div>

                      {/* Selected Swatches Preview */}
                      <div className="selected-swatches-box">
                        <span className="selected-label">Màu đã chọn ({newProduct.colors.length}):</span>
                        <div className="selected-dots-row">
                          {newProduct.colors.map((c) => (
                            <span
                              key={c}
                              className="selected-dot-pill"
                              style={{ backgroundColor: c }}
                              title={`Click để bỏ: ${c}`}
                              onClick={() => handleToggleColor(c)}
                            >
                              <X size={10} className="remove-dot-x" />
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 4-Slot Multi-Image Gallery with Appwrite */}
                  <div className="modal-form-col">
                    <div className="multi-image-section">
                      {/* Appwrite Header */}
                      <div className="appwrite-header-row">
                        <div>
                          <h4 className="modal-section-title" style={{ margin: 0 }}>
                            <ImageIcon size={15} />
                            <span>Bộ sưu tập 4 ảnh sản phẩm (Appwrite Cloud)</span>
                          </h4>
                          <p className="modal-section-sub" style={{ margin: '4px 0 0 0' }}>
                            Upload 4 góc ảnh tiêu chuẩn để hiển thị đầy đủ trên trang chi tiết rèm.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn-appwrite-config"
                          onClick={() => setShowAppwriteConfig(!showAppwriteConfig)}
                        >
                          <Settings size={13} />
                          <span>Cấu hình</span>
                        </button>
                      </div>

                      {/* Appwrite Settings Panel Popup */}
                      {showAppwriteConfig && (
                        <div className="appwrite-config-panel fade-in">
                          <div className="appwrite-config-title">
                            <Cloud size={16} />
                            <span>Cấu hình Appwrite Cloud Storage</span>
                          </div>
                          <div className="appwrite-config-row">
                            <label>Appwrite Endpoint</label>
                            <input
                              type="text"
                              value={appwriteConfigState.endpoint}
                              onChange={(e) =>
                                setAppwriteConfigState({ ...appwriteConfigState, endpoint: e.target.value })
                              }
                              placeholder="https://cloud.appwrite.io/v1"
                            />
                          </div>
                          <div className="appwrite-config-row">
                            <label>Project ID *</label>
                            <input
                              type="text"
                              value={appwriteConfigState.projectId}
                              onChange={(e) =>
                                setAppwriteConfigState({ ...appwriteConfigState, projectId: e.target.value })
                              }
                              placeholder="Nhập Project ID từ Appwrite Console"
                            />
                          </div>
                          <div className="appwrite-config-row">
                            <label>Storage Bucket ID *</label>
                            <input
                              type="text"
                              value={appwriteConfigState.bucketId}
                              onChange={(e) =>
                                setAppwriteConfigState({ ...appwriteConfigState, bucketId: e.target.value })
                              }
                              placeholder="Nhập Bucket ID (ví dụ: univeloria-products)"
                            />
                          </div>
                          <div className="appwrite-config-actions">
                            <button
                              type="button"
                              className="btn-save-appwrite"
                              onClick={handleSaveAppwriteConfig}
                            >
                              Lưu cài đặt
                            </button>
                            <button
                              type="button"
                              className="btn-cancel-appwrite"
                              onClick={() => setShowAppwriteConfig(false)}
                            >
                              Đóng
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Batch 4-Image Quick Dropzone */}
                      <div
                        className="multi-image-batch-zone"
                        onClick={() => {
                          setIsEditSlot(false);
                          if (batchFileInputRef.current) {
                            batchFileInputRef.current.value = '';
                            batchFileInputRef.current.click();
                          }
                        }}
                      >
                        <Upload size={16} />
                        <span>Tải lên nhanh 4 ảnh cùng lúc (chọn tối đa 4 tệp)</span>
                      </div>

                      {/* 4 Image Slots Grid (2x2) */}
                      <div className="image-slots-grid">
                        {SLOT_DEFINITIONS.map((slot) => {
                          const currentUrl = newProductImages[slot.id];
                          const pendingFile = pendingImageFilesAdd[slot.id];

                          return (
                            <div
                              key={slot.id}
                              className={`image-slot-card ${currentUrl ? 'has-image' : ''}`}
                              onClick={() => handlePickSlot(slot.id, false)}
                            >
                              <span className="slot-badge">
                                {slot.id === 0 ? '#1 Chính' : slot.id === 1 ? '#2 Không gian' : slot.id === 2 ? '#3 Chất liệu' : '#4 May đo'}
                              </span>

                              {pendingFile && (
                                <span className="slot-pending-pill">Chờ lưu</span>
                              )}

                              {currentUrl ? (
                                <>
                                  <img
                                    src={currentUrl}
                                    alt={slot.title}
                                    className="slot-preview-img"
                                  />
                                  <button
                                    type="button"
                                    className="slot-quick-delete"
                                    onClick={(e) => handleRemoveSlot(slot.id, true, e)}
                                    title="Xóa ảnh này"
                                  >
                                    ✕
                                  </button>
                                  <button
                                    type="button"
                                    className="slot-quick-delete"
                                    onClick={(e) => handleRemoveSlot(slot.id, false, e)}
                                    title="Xóa ảnh này"
                                  >
                                    ✕
                                  </button>
                                  <div className="slot-overlay-actions">
                                    <button
                                      type="button"
                                      className="slot-action-btn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePickSlot(slot.id, false);
                                      }}
                                    >
                                      Đổi ảnh
                                    </button>
                                    <button
                                      type="button"
                                      className="slot-action-btn delete"
                                      onClick={(e) => handleRemoveSlot(slot.id, false, e)}
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="slot-placeholder">
                                  <Upload size={22} color="#8b6b3e" />
                                  <div className="slot-title">{slot.title}</div>
                                  <div className="slot-hint">{slot.hint}</div>
                                  <span className="slot-upload-btn-text">+ Chọn ảnh</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= FULL-WIDTH SECTION: MÔ TẢ CHI TIẾT & CẢM HỨNG ================= */}

                <div className="modal-section-full">

                  <h4 className="modal-section-full-title">

                    <Sparkles size={16} color="#c8a87d" />

                    <span>Mô tả chi tiết & Cảm hứng thiết kế</span>

                  </h4>

                  <p className="modal-section-full-sub">

                    Nội dung văn phong nghệ thuật và câu chuyện cảm hứng sẽ hiển thị trang trọng tại tab <strong>"Mô tả chi tiết & Cảm hứng"</strong> của trang sản phẩm.

                  </p>

                  <div className="modal-form-group">

                    <textarea

                      className="modal-input"

                      rows="4"

                      placeholder="Ví dụ: Tuyệt tác rèm vải mang hơi thở Tân cổ điển đương đại... Rèm linen họa tiết tân cổ điển đại diện cho sự giao thoa tinh tế giữa phong cách kiến trúc Tân cổ điển quyến quý và chất sống hiện đại thanh lịch..."

                      value={newProduct.fullDescription}

                      onChange={(e) => setNewProduct({ ...newProduct, fullDescription: e.target.value })}

                    />

                  </div>

                </div>



                {/* ================= FULL-WIDTH SECTION: THÔNG SỐ KỸ THUẬT ================= */}

                <div className="modal-section-full">

                  <h4 className="modal-section-full-title">

                    <SlidersHorizontal size={16} color="#c8a87d" />

                    <span>Thông số kỹ thuật may đo</span>

                  </h4>

                  <p className="modal-section-full-sub">

                    Các thông số tiêu chuẩn chất liệu được chuẩn hóa và hiển thị tại bảng tra cứu tab <strong>"Thông số kỹ thuật"</strong>.

                  </p>



                  <div className="specs-grid-inputs">

                    <div className="modal-form-group">

                      <label>Chất liệu vải <span className="req">*</span></label>

                      <input

                        type="text"

                        className="modal-input"

                        placeholder="Ví dụ: Gấm linen jacquard & voan thêu chỉ lụa cao cấp"

                        value={newProduct.material}

                        onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}

                        required

                      />

                    </div>



                    <div className="modal-form-group">

                      <label>Khả năng cản sáng <span className="req">*</span></label>

                      <input

                        type="text"

                        className="modal-input"

                        placeholder="Ví dụ: Cản sáng 85% - 95%, chống tia cực tím UV 99%"

                        value={newProduct.lightBlocking}

                        onChange={(e) => setNewProduct({ ...newProduct, lightBlocking: e.target.value })}

                        required

                      />

                    </div>



                    <div className="modal-form-group">

                      <label>Khổ vải may tiêu chuẩn</label>

                      <input

                        type="text"

                        className="modal-input"

                        placeholder="Ví dụ: 280cm (Hỗ trợ may liền không nối vải cho trần cao đến 3.2m)"

                        value={newProduct.fabricWidth}

                        onChange={(e) => setNewProduct({ ...newProduct, fabricWidth: e.target.value })}

                      />

                    </div>



                    <div className="modal-form-group">

                      <label>Xuất xứ vải & phụ kiện</label>

                      <input

                        type="text"

                        className="modal-input"

                        placeholder="Ví dụ: Nhập khẩu nguyên cây Thổ Nhĩ Kỳ / Bỉ"

                        value={newProduct.origin}

                        onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })}

                      />

                    </div>



                    <div className="modal-form-group specs-input-full">

                      <label>Chế độ bảo hành chính hãng</label>

                      <input

                        type="text"

                        className="modal-input"

                        placeholder="Ví dụ: Bảo hành 5 năm chính hãng cho ray trượt và phụ kiện"

                        value={newProduct.warranty}

                        onChange={(e) => setNewProduct({ ...newProduct, warranty: e.target.value })}

                      />

                    </div>

                  </div>

                </div>

              </div>



              {/* Modal Footer */}

              <div className="modal-footer">

                <button

                  type="button"

                  className="btn-modal-close"

                  onClick={() => setShowAddModal(false)}

                  disabled={submitting}

                >

                  Hủy bỏ

                </button>

                <button

                  type="submit"

                  className="btn-admin-primary"

                  disabled={submitting}

                >

                  {submitting ? (submittingText || 'Đang lưu vào Database...') : 'Lưu mẫu rèm vào Database'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}



      {/* ================= COMPREHENSIVE EDIT PRODUCT MODAL ================= */}

      {editingProduct && (

        <div className="modal-backdrop" onClick={handleCloseEditModal}>

          <div

            className="order-detail-modal product-modal-large"

            onClick={(e) => e.stopPropagation()}

          >

            <div className="modal-header">

              <div>

                <span className="modal-sub">CẬP NHẬT THIẾT KẾ RÈM #{editingProduct.id}</span>

                <h3 className="modal-title">Chỉnh Sửa Mẫu Rèm: {editingProduct.name}</h3>

              </div>

              <button

                type="button"

                className="modal-close-btn"

                onClick={() => setEditingProduct(null)}

              >

                ✕

              </button>

            </div>



            <form onSubmit={handleUpdateProductSubmit}>

              <div className="modal-body-scroll" style={{ padding: '24px' }}>

                <div className="add-product-modal-grid">
                  {/* Left Column: Basic Details, Pricing & Color Swatches */}
                  <div className="modal-form-col">
                    <h4 className="modal-section-title">
                      <Sparkles size={15} />
                      <span>Thông tin mẫu rèm</span>
                    </h4>

                    {/* Product Name */}
                    <div className="modal-form-group">
                      <label>
                        Tên thiết kế rèm <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="modal-input"
                        placeholder="VD: Rèm Vải Linen Thô Dệt Cản Sáng Monaco"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        required
                      />
                    </div>

                    {/* Product SKU & Badge */}
                    <div className="modal-form-row">
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>Mã sản phẩm (SKU)</label>
                        <input
                          type="text"
                          className="modal-input"
                          placeholder="VD: UVL-101"
                          value={editFormData.code}
                          onChange={(e) => setEditFormData({ ...editFormData, code: e.target.value })}
                        />
                      </div>
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>Huy hiệu (Badge)</label>
                        <select
                          className="modal-select"
                          value={editFormData.badge}
                          onChange={(e) => setEditFormData({ ...editFormData, badge: e.target.value })}
                        >
                          <option value="Mới">Mới</option>
                          <option value="Bán chạy">Bán chạy</option>
                          <option value="Cao cấp">Cao cấp</option>
                          <option value="Đặc biệt">Đặc biệt</option>
                          <option value="Giảm giá">Giảm giá</option>
                          <option value="">Không có</option>
                        </select>
                      </div>
                    </div>

                    {/* Category & Room */}
                    <div className="modal-form-row">
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>
                          Loại rèm <span className="req">*</span>
                        </label>
                        <select
                          className="modal-select"
                          value={editFormData.category}
                          onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                        >
                          <option value="Rèm vải">Rèm vải</option>
                          <option value="Rèm voan">Rèm voan</option>
                          <option value="Rèm cuốn">Rèm cuốn</option>
                          <option value="Rèm roman">Rèm roman</option>
                          <option value="Rèm gỗ">Rèm gỗ</option>
                          <option value="Rèm hai lớp">Rèm hai lớp</option>
                        </select>
                      </div>
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>
                          Không gian phòng <span className="req">*</span>
                        </label>
                        <select
                          className="modal-select"
                          value={editFormData.room}
                          onChange={(e) => setEditFormData({ ...editFormData, room: e.target.value })}
                        >
                          <option value="Phòng khách">Phòng khách</option>
                          <option value="Phòng ngủ">Phòng ngủ</option>
                          <option value="Phòng ăn">Phòng ăn</option>
                          <option value="Văn phòng">Văn phòng</option>
                          <option value="Ngoài trời">Ngoài trời</option>
                        </select>
                      </div>
                    </div>

                    {/* Style & Measure Unit */}
                    <div className="modal-form-row">
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>Phong cách</label>
                        <select
                          className="modal-select"
                          value={editFormData.style}
                          onChange={(e) => setEditFormData({ ...editFormData, style: e.target.value })}
                        >
                          <option value="Hiện đại">Hiện đại</option>
                          <option value="Tối giản">Tối giản</option>
                          <option value="Tân cổ điển">Tân cổ điển</option>
                          <option value="Bắc Âu (Scandi)">Bắc Âu (Scandi)</option>
                          <option value="Wabi Sabi">Wabi Sabi</option>
                          <option value="Sang trọng">Sang trọng</option>
                        </select>
                      </div>
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>Đơn vị may đo</label>
                        <select className="modal-select" defaultValue="m2">
                          <option value="m2">Mét vuông (m²)</option>
                          <option value="m">Mét ngang hoàn thiện (m)</option>
                          <option value="set">Bộ rèm hoàn chỉnh</option>
                        </select>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="modal-form-row">
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>
                          Đơn giá may đo / m² (VNĐ) <span className="req">*</span>
                        </label>
                        <input
                          type="number"
                          className="modal-input"
                          placeholder="2450000"
                          value={editFormData.price}
                          onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                          required
                        />
                      </div>
                      <div className="modal-form-group" style={{ flex: 1 }}>
                        <label>Giá gốc trước giảm (nếu có)</label>
                        <input
                          type="number"
                          className="modal-input"
                          placeholder="Để trống nếu không giảm"
                          value={editFormData.oldPrice}
                          onChange={(e) => setEditFormData({ ...editFormData, oldPrice: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Phân loại màu sắc dệt sẵn - Integrated into Left Column */}
                    <div className="modal-color-section" style={{ marginTop: '16px' }}>
                      <h4 className="modal-section-title">
                        <Palette size={15} />
                        <span>Phân loại màu sắc dệt sẵn</span>
                      </h4>
                      <p className="modal-section-sub">
                        Chọn các màu sắc vải dệt khách hàng có thể chọn:
                      </p>

                      <div className="palette-picker-grid">
                        {AVAILABLE_COLOR_PALETTES.map((colorItem) => {
                          const isSelected = editFormData.colors.includes(colorItem.hex);
                          return (
                            <button
                              key={colorItem.hex}
                              type="button"
                              className={`color-palette-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => {
                                if (isSelected) {
                                  if (editFormData.colors.length > 1) {
                                    setEditFormData({
                                      ...editFormData,
                                      colors: editFormData.colors.filter((c) => c !== colorItem.hex)
                                    });
                                  }
                                } else {
                                  setEditFormData({
                                    ...editFormData,
                                    colors: [...editFormData.colors, colorItem.hex]
                                  });
                                }
                              }}
                              title={`${colorItem.name} (${colorItem.hex})`}
                            >
                              <span
                                className="color-btn-dot"
                                style={{ backgroundColor: colorItem.hex }}
                              >
                                {isSelected && (
                                  <Check
                                    size={12}
                                    color={['#f0dfc8', '#f1ece5', '#e9d8c2'].includes(colorItem.hex) ? '#0f172a' : '#ffffff'}
                                  />
                                )}
                              </span>
                              <span className="color-btn-name">{colorItem.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Hex Add */}
                      <div className="custom-hex-row">
                        <input
                          type="text"
                          className="modal-input hex-input"
                          placeholder="Nhập mã #hex khác..."
                          value={customColorHex}
                          onChange={(e) => setCustomColorHex(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn-add-hex"
                          onClick={() => {
                            if (customColorHex && customColorHex.startsWith('#') && !editFormData.colors.includes(customColorHex)) {
                              setEditFormData({
                                ...editFormData,
                                colors: [...editFormData.colors, customColorHex]
                              });
                            }
                          }}
                        >
                          + Thêm màu
                        </button>
                      </div>

                      {/* Selected Swatches Preview */}
                      <div className="selected-swatches-box">
                        <span className="selected-label">Màu đã chọn ({editFormData.colors.length}):</span>
                        <div className="selected-dots-row">
                          {editFormData.colors.map((c) => (
                            <span
                              key={c}
                              className="selected-dot-pill"
                              style={{ backgroundColor: c }}
                              title={`Click để bỏ: ${c}`}
                              onClick={() => {
                                if (editFormData.colors.length > 1) {
                                  setEditFormData({
                                    ...editFormData,
                                    colors: editFormData.colors.filter((hex) => hex !== c)
                                  });
                                }
                              }}
                            >
                              <X size={10} className="remove-dot-x" />
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 4-Slot Multi-Image Gallery with Appwrite */}
                  <div className="modal-form-col">
                    <div className="multi-image-section">
                      {/* Appwrite Header */}
                      <div className="appwrite-header-row">
                        <div>
                          <h4 className="modal-section-title" style={{ margin: 0 }}>
                            <ImageIcon size={15} />
                            <span>Bộ sưu tập 4 ảnh sản phẩm (Appwrite Cloud)</span>
                          </h4>
                          <p className="modal-section-sub" style={{ margin: '4px 0 0 0' }}>
                            Upload 4 góc ảnh tiêu chuẩn để hiển thị đầy đủ trên trang chi tiết rèm.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn-appwrite-config"
                          onClick={() => setShowAppwriteConfig(!showAppwriteConfig)}
                        >
                          <Settings size={13} />
                          <span>Cấu hình</span>
                        </button>
                      </div>

                      {/* Appwrite Settings Panel Popup */}
                      {showAppwriteConfig && (
                        <div className="appwrite-config-panel fade-in">
                          <div className="appwrite-config-title">
                            <Cloud size={16} />
                            <span>Cấu hình Appwrite Cloud Storage</span>
                          </div>
                          <div className="appwrite-config-row">
                            <label>Appwrite Endpoint</label>
                            <input
                              type="text"
                              value={appwriteConfigState.endpoint}
                              onChange={(e) =>
                                setAppwriteConfigState({ ...appwriteConfigState, endpoint: e.target.value })
                              }
                              placeholder="https://cloud.appwrite.io/v1"
                            />
                          </div>
                          <div className="appwrite-config-row">
                            <label>Project ID *</label>
                            <input
                              type="text"
                              value={appwriteConfigState.projectId}
                              onChange={(e) =>
                                setAppwriteConfigState({ ...appwriteConfigState, projectId: e.target.value })
                              }
                              placeholder="Nhập Project ID từ Appwrite Console"
                            />
                          </div>
                          <div className="appwrite-config-row">
                            <label>Storage Bucket ID *</label>
                            <input
                              type="text"
                              value={appwriteConfigState.bucketId}
                              onChange={(e) =>
                                setAppwriteConfigState({ ...appwriteConfigState, bucketId: e.target.value })
                              }
                              placeholder="Nhập Bucket ID (ví dụ: univeloria-products)"
                            />
                          </div>
                          <div className="appwrite-config-actions">
                            <button
                              type="button"
                              className="btn-save-appwrite"
                              onClick={handleSaveAppwriteConfig}
                            >
                              Lưu cài đặt
                            </button>
                            <button
                              type="button"
                              className="btn-cancel-appwrite"
                              onClick={() => setShowAppwriteConfig(false)}
                            >
                              Đóng
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Batch 4-Image Quick Dropzone */}
                      <div
                        className="multi-image-batch-zone"
                        onClick={() => {
                          setIsEditSlot(true);
                          if (batchFileInputRef.current) {
                            batchFileInputRef.current.value = '';
                            batchFileInputRef.current.click();
                          }
                        }}
                      >
                        <Upload size={16} />
                        <span>Tải lên nhanh 4 ảnh cùng lúc (chọn tối đa 4 tệp)</span>
                      </div>

                      {/* 4 Image Slots Grid (2x2) */}
                      <div className="image-slots-grid">
                        {SLOT_DEFINITIONS.map((slot) => {
                          const currentUrl = editProductImages[slot.id];
                          const pendingFile = pendingImageFilesEdit[slot.id];

                          return (
                            <div
                              key={slot.id}
                              className={`image-slot-card ${currentUrl ? 'has-image' : ''}`}
                              onClick={() => handlePickSlot(slot.id, true)}
                            >
                              <span className="slot-badge">
                                {slot.id === 0 ? '#1 Chính' : slot.id === 1 ? '#2 Không gian' : slot.id === 2 ? '#3 Chất liệu' : '#4 May đo'}
                              </span>

                              {pendingFile && (
                                <span className="slot-pending-pill">Chờ lưu</span>
                              )}

                              {currentUrl ? (
                                <>
                                  <img
                                    src={currentUrl}
                                    alt={slot.title}
                                    className="slot-preview-img"
                                  />
                                  <div className="slot-overlay-actions">
                                    <button
                                      type="button"
                                      className="slot-action-btn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePickSlot(slot.id, true);
                                      }}
                                    >
                                      Đổi ảnh
                                    </button>
                                    <button
                                      type="button"
                                      className="slot-action-btn delete"
                                      onClick={(e) => handleRemoveSlot(slot.id, true, e)}
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="slot-placeholder">
                                  <Upload size={22} color="#8b6b3e" />
                                  <div className="slot-title">{slot.title}</div>
                                  <div className="slot-hint">{slot.hint}</div>
                                  <span className="slot-upload-btn-text">+ Chọn ảnh</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= FULL-WIDTH SECTION: MÔ TẢ CHI TIẾT & CẢM HỨNG ================= */}

                <div className="modal-section-full">

                  <h4 className="modal-section-full-title">

                    <Sparkles size={16} color="#c8a87d" />

                    <span>Mô tả chi tiết & Cảm hứng thiết kế</span>

                  </h4>

                  <p className="modal-section-full-sub">

                    Nội dung này hiển thị tại tab <strong>"Mô tả chi tiết & Cảm hứng"</strong> của khách hàng.

                  </p>

                  <div className="modal-form-group">

                    <textarea

                      className="modal-input"

                      rows="4"

                      placeholder="Giới thiệu chi tiết về nguồn cảm hứng thiết kế, chất liệu vải, độ rủ sóng..."

                      value={editFormData.fullDescription}

                      onChange={(e) => setEditFormData({ ...editFormData, fullDescription: e.target.value })}

                    />

                  </div>

                </div>



                {/* ================= FULL-WIDTH SECTION: THÔNG SỐ KỸ THUẬT ================= */}

                <div className="modal-section-full">

                  <h4 className="modal-section-full-title">

                    <SlidersHorizontal size={16} color="#c8a87d" />

                    <span>Thông số kỹ thuật may đo</span>

                  </h4>

                  <p className="modal-section-full-sub">

                    Hiển thị tại bảng kỹ thuật chuẩn hóa ở tab <strong>"Thông số kỹ thuật"</strong>.

                  </p>



                  <div className="specs-grid-inputs">

                    <div className="modal-form-group">

                      <label>Chất liệu vải <span className="req">*</span></label>

                      <input

                        type="text"

                        className="modal-input"

                        placeholder="Ví dụ: Gấm linen jacquard & voan thêu chỉ lụa cao cấp"

                        value={editFormData.material}

                        onChange={(e) => setEditFormData({ ...editFormData, material: e.target.value })}

                        required

                      />

                    </div>



                    <div className="modal-form-group">

                      <label>Khả năng cản sáng <span className="req">*</span></label>

                      <input

                        type="text"

                        className="modal-input"

                        placeholder="Ví dụ: Cản sáng 85% - 95%, chống tia cực tím UV 99%"

                        value={editFormData.lightBlocking}

                        onChange={(e) => setEditFormData({ ...editFormData, lightBlocking: e.target.value })}

                        required

                      />

                    </div>



                    <div className="modal-form-group">

                      <label>Khổ vải may tiêu chuẩn</label>

                      <input

                        type="text"

                        className="modal-input"

                        placeholder="Ví dụ: 280cm (Hỗ trợ may liền không nối vải cho trần cao đến 3.2m)"

                        value={editFormData.fabricWidth}

                        onChange={(e) => setEditFormData({ ...editFormData, fabricWidth: e.target.value })}

                      />

                    </div>



                    <div className="modal-form-group">

                      <label>Xuất xứ vải & phụ kiện</label>

                      <input

                        type="text"

                        className="modal-input"

                        placeholder="Ví dụ: Nhập khẩu nguyên cây Thổ Nhĩ Kỳ / Bỉ"

                        value={editFormData.origin}

                        onChange={(e) => setEditFormData({ ...editFormData, origin: e.target.value })}

                      />

                    </div>



                    <div className="modal-form-group specs-input-full">

                      <label>Chế độ bảo hành chính hãng</label>

                      <input

                        type="text"

                        className="modal-input"

                        placeholder="Ví dụ: Bảo hành 5 năm chính hãng cho ray trượt và phụ kiện"

                        value={editFormData.warranty}

                        onChange={(e) => setEditFormData({ ...editFormData, warranty: e.target.value })}

                      />

                    </div>

                  </div>

                </div>

              </div>



              {/* Modal Footer */}

              <div className="modal-footer">

                <button

                  type="button"

                  className="btn-modal-close"

                  onClick={() => setEditingProduct(null)}

                  disabled={submitting}

                >

                  Hủy bỏ

                </button>

                <button

                  type="submit"

                  className="btn-admin-primary"

                  disabled={submitting}

                >

                  {submitting ? (submittingText || 'Đang cập nhật Database...') : 'Lưu thay đổi vào Database'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* Hidden file inputs for single slot and batch multi-image selection */}
      <input
        type="file"
        ref={singleFileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleSelectSlotFile(e.target.files[0]);
          }
        }}
      />
      <input
        type="file"
        ref={batchFileInputRef}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleBatchFiles(e.target.files, isEditSlot);
          }
        }}
      />
    </div>

  );

}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { curtainTypes } from './data/studioData';
import { collectionsData } from './data/collectionsData';
import { productsData } from './data/productsData';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { StudioPage } from './pages/StudioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { CustomerPage } from './pages/customer/CustomerPage';
import { AdminPage } from './pages/admin/AdminPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { customerApi } from './api/customerApi';
import { apiClient } from './api/apiClient';
import { storageService } from './services/storageService';

const VALID_ADMIN_TABS = ['dashboard', 'users', 'orders', 'products', 'reviews', 'consultations', 'feedbacks'];

function parseAppRoute() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const hash = window.location.hash || '';

  // 1. Admin path: /admin or /admin/<subpath>
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const sub = pathname.replace('/admin', '').replace(/^\/+/, '');
    const tab = VALID_ADMIN_TABS.includes(sub) ? sub : 'dashboard';
    const cleanUrl = tab === 'dashboard' ? '/admin' : `/admin/${tab}`;
    return {
      page: 'admin',
      adminTab: tab,
      cleanUrl,
      shouldReplace: Boolean(hash) || pathname !== cleanUrl
    };
  }

  // Legacy #admin or #admin/orders
  if (hash.startsWith('#admin')) {
    const cleanHash = hash.replace(/^#admin\/?/, '');
    const tab = VALID_ADMIN_TABS.find((t) => cleanHash.includes(t)) || 'dashboard';
    return {
      page: 'admin',
      adminTab: tab,
      cleanUrl: tab === 'dashboard' ? '/admin' : `/admin/${tab}`,
      shouldReplace: true
    };
  }

  // 2. Customer path: /customer or /customer/<tab>
  if (pathname === '/customer' || pathname.startsWith('/customer/')) {
    const sub = pathname.replace('/customer', '').replace(/^\/+/, '');
    const cleanUrl = sub ? `/customer/${sub}` : '/customer';
    return {
      page: 'customer',
      customerTab: sub || 'profile',
      cleanUrl,
      shouldReplace: Boolean(hash)
    };
  }
  if (hash.startsWith('#customer')) {
    const sub = hash.replace(/^#customer\/?/, '');
    return {
      page: 'customer',
      customerTab: sub || 'profile',
      cleanUrl: sub ? `/customer/${sub}` : '/customer',
      shouldReplace: true
    };
  }

    // 2.5 Product detail route: /products/:id or /product/:id
  const prodMatch = pathname.match(/^\/(?:products|product)\/([^/]+)/);
  if (prodMatch) {
    const rawId = prodMatch[1];
    const numId = isNaN(Number(rawId)) ? rawId : Number(rawId);
    return {
      page: 'product-detail',
      productId: numId,
      cleanUrl: `/products/${rawId}`,
      shouldReplace: Boolean(hash)
    };
  }

  // 3. Other known pages
  const knownPages = ['collections', 'products', 'studio', 'about', 'contact', 'login'];
  for (const p of knownPages) {
    if (pathname === `/${p}` || hash === `#${p}`) {
      return {
        page: p,
        cleanUrl: `/${p}`,
        shouldReplace: Boolean(hash)
      };
    }
  }

  return {
    page: 'home',
    cleanUrl: '/',
    shouldReplace: Boolean(hash && hash !== '#')
  };
}

export default function App() {
  const initialRoute = parseAppRoute();
  const [currentPage, setCurrentPage] = useState(initialRoute.page);
  const [adminTab, setAdminTab] = useState(initialRoute.adminTab || 'dashboard');
  const [customerTab, setCustomerTab] = useState(initialRoute.customerTab || 'profile');
  const [selectedProductId, setSelectedProductId] = useState(initialRoute.productId || 4);

  // Immediately strip '#' from URL on initial mount if present
  useEffect(() => {
    const r = parseAppRoute();
    if (r.shouldReplace && r.cleanUrl) {
      window.history.replaceState(null, '', r.cleanUrl);
    }
  }, []);

  // Home state
  const [activeColor, setActiveColor] = useState(0);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Collections state
  const [activeCollectionFilter, setActiveCollectionFilter] = useState("Tất cả");
  const [savedCollections, setSavedCollections] = useState([]);

  // AI 3D Studio state
  const fileRef = useRef(null);
  const [roomImage, setRoomImage] = useState("/assets/studio-room.png");
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [activeType, setActiveType] = useState("roman-linen");
  const [studioColor, setStudioColor] = useState(curtainTypes[0]?.colors[0] || "#dfd7c8");
  const [activeStudioFilter, setActiveStudioFilter] = useState("Tất cả");
  const [viewMode, setViewMode] = useState("3D");
  const [zoom, setZoom] = useState(1);
  const [fullScreen, setFullScreen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const currentType = curtainTypes.find((t) => t.id === activeType) || curtainTypes[0];

  const visibleCollections = useMemo(() => {
    if (activeCollectionFilter === "Tất cả") return collectionsData;
    const map = {
      "Phòng khách": "living",
      "Phòng ngủ": "bedroom",
      "Phòng ăn": "dining",
      "Văn phòng": "office",
    };
    return collectionsData.filter((item) => item.id === map[activeCollectionFilter]);
  }, [activeCollectionFilter]);

  const toggleSavedCollection = (id) => {
    setSavedCollections((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  function loadFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setRoomImage(url);
    setHasUploaded(true);
    setAnalyzed(false);
    setIsAnalyzing(false);
    setShowOriginal(false);
  }

  function analyzeRoom() {
    setIsAnalyzing(true);
    setAnalyzed(false);
    window.setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1400);
  }

  function chooseType(type) {
    setActiveType(type.id);
    setStudioColor(type.colors[Math.min(1, type.colors.length - 1)]);
  }

  // Products state
  const [selectedProductCategory, setSelectedProductCategory] = useState("Tất cả");
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedProductStyles, setSelectedProductStyles] = useState([]);
  const [selectedProductColors, setSelectedProductColors] = useState([]);
  const [maxProductPrice, setMaxProductPrice] = useState(10000000);
  const [productSortBy, setProductSortBy] = useState("popular");
  const [productFavorites, setProductFavorites] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [productSearchOpen, setProductSearchOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productView, setProductView] = useState("grid");
  const [productNotice, setProductNotice] = useState("");
  const [activeCardColors, setActiveCardColors] = useState({});
  const [productsList, setProductsList] = useState(productsData);

  // Fetch real product catalog from Database
  const fetchProductsCatalog = () => {
    apiClient('/api/Products')
      .then((res) => {
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const categoryMap = {
            linen: 'Rèm vải',
            sheer: 'Rèm voan',
            double: 'Rèm hai lớp',
            roller: 'Rèm cuốn',
            roman: 'Rèm roman',
            wood: 'Rèm gỗ',
            pattern: 'Rèm vải'
          };
          const mapped = res.data.map((p) => ({
            id: p.id,
            name: p.name,
            code: p.code || `UVL-${p.id}`,
            category: categoryMap[p.category?.toLowerCase()] || p.category || 'Rèm vải',
            room: p.roomType || 'Phòng khách',
            style: p.style || 'Hiện đại',
            colors: Array.isArray(p.colors) && p.colors.length > 0
              ? p.colors.map((c) => (typeof c === 'string' ? c : c.hexCode || '#c8a87d'))
              : ['#e9d8c2', '#c5a27d'],
            price: Number(p.basePrice) || 2450000,
            oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
            rating: p.rating ? String(p.rating) : '5.0',
            reviews: p.reviewsCount || 12,
            badge: p.badge || (p.isFeatured ? 'Nổi bật' : ''),
            image: p.thumbnailUrl || '/assets/uvl4-card-photo.png',
            mainImage: (p.code === 'UVL-4' || p.id === 4) ? '/assets/uvl4-main.jpg' : (p.imageUrls?.[0] || p.thumbnailUrl || '/assets/uvl4-main.jpg'),
            subImages: (p.code === 'UVL-4' || p.id === 4)
              ? ['/assets/uvl4-sub1.jpg', '/assets/uvl4-sub2.jpg', '/assets/uvl4-sub3.jpg']
              : (Array.isArray(p.imageUrls) && p.imageUrls.length >= 4 ? p.imageUrls.slice(1, 4) : ['/assets/uvl4-sub1.jpg', '/assets/uvl4-sub2.jpg', '/assets/uvl4-sub3.jpg']),
            description: p.description,
            fullDescription: p.fullDescription,
            material: p.material,
            lightBlocking: p.lightBlocking,
            fabricWidth: p.fabricWidth,
            origin: p.origin,
            warranty: p.warranty
          }));
          setProductsList(mapped);
        }
      })
      .catch((err) => console.log('Using default product catalog:', err));
  };

  useEffect(() => {
    fetchProductsCatalog();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = productsList.filter((p) => {
      const typeOk = selectedProductTypes.length === 0 || selectedProductTypes.includes(p.category);
      const styleOk = selectedProductStyles.length === 0 || selectedProductStyles.includes(p.style);
      const colorOk = selectedProductColors.length === 0 || selectedProductColors.some((selColor) => {
        if (p.colors.includes(selColor)) return true;
        const c1 = parseInt(selColor.replace('#', ''), 16);
        const r1 = (c1 >> 16) & 255, g1 = (c1 >> 8) & 255, b1 = c1 & 255;
        return p.colors.some((pCol) => {
          const c2 = parseInt(pCol.replace('#', ''), 16);
          const r2 = (c2 >> 16) & 255, g2 = (c2 >> 8) & 255, b2 = c2 & 255;
          const dist = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
          return dist < 85;
        });
      });
      const priceOk = p.price <= maxProductPrice;
      const categoryOk = selectedProductCategory === "Tất cả" || (
        selectedProductCategory === "Phòng khách" ? ["Rèm vải", "Rèm voan", "Rèm hai lớp"].includes(p.category) :
        selectedProductCategory === "Phòng ngủ" ? ["Rèm vải", "Rèm voan", "Rèm roman", "Rèm hai lớp"].includes(p.category) :
        selectedProductCategory === "Phòng ăn" ? ["Rèm voan", "Rèm vải"].includes(p.category) :
        selectedProductCategory === "Văn phòng" ? ["Rèm cuốn", "Rèm roman", "Rèm vải"].includes(p.category) :
        ["Rèm gỗ", "Rèm cuốn"].includes(p.category)
      );
      const queryOk = `${p.name} ${p.code} ${p.category} ${p.style}`.toLowerCase().includes(productSearch.toLowerCase());
      return typeOk && styleOk && colorOk && priceOk && categoryOk && queryOk;
    });

    if (productSortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (productSortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (productSortBy === "rating") result.sort((a, b) => Number(b.rating) - Number(a.rating));
    if (productSortBy === "popular") result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [productsList, selectedProductCategory, selectedProductTypes, selectedProductStyles, selectedProductColors, maxProductPrice, productSortBy, productSearch]);

  function toggleProductFilter(list, setList, value) {
    setList((current) => current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  }

  function resetProductFilters() {
    setSelectedProductCategory("Tất cả");
    setSelectedProductTypes([]);
    setSelectedProductStyles([]);
    setSelectedProductColors([]);
    setMaxProductPrice(10000000);
    setProductSearch("");
  }

  function addToCart(product) {
    setProductCart((current) => [...current, product]);
    setProductNotice(`Đã thêm “${product.name}” vào giỏ hàng`);
    window.setTimeout(() => setProductNotice(""), 2500);
  }

  // Sync favorite list from backend when authenticated
  useEffect(() => {
    if (storageService.getToken()) {
      customerApi.getFavorites()
        .then((res) => {
          if (res && res.success && Array.isArray(res.data)) {
            setProductFavorites(res.data.map((f) => f.productId));
          }
        })
        .catch(() => {});
    }
  }, [currentPage]);

  async function toggleProductFavorite(id) {
    const isFav = productFavorites.includes(id);
    setProductFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
    if (storageService.getToken()) {
      try {
        if (isFav) {
          await customerApi.removeFavorite(id);
        } else {
          await customerApi.addFavorite(id);
        }
      } catch (err) {
        console.warn('Could not sync favorite to backend:', err);
      }
    }
  }

  // Contact state
  const [openContactFaq, setOpenContactFaq] = useState(-1);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", need: "", space: "", budget: "", message: "", consent: false });
  const [contactErrors, setContactErrors] = useState({});
  const updateContact = (key, value) => setContactForm(current => ({ ...current, [key]: value }));

  function handleContactSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!contactForm.name.trim()) next.name = "Vui lòng nhập họ và tên.";
    if (!contactForm.phone.trim()) next.phone = "Vui lòng nhập số điện thoại.";
    else if (!/^[+()\d\s.-]{8,20}$/.test(contactForm.phone.trim())) next.phone = "Số điện thoại chưa hợp lệ.";
    if (contactForm.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim())) next.email = "Email chưa hợp lệ.";
    if (!contactForm.consent) next.consent = "Vui lòng đồng ý để chúng tôi liên hệ tư vấn.";
    setContactErrors(next);
    if (Object.keys(next).length === 0) {
      // POST real consultation to backend SQL Server DB
      apiClient('/api/Consultations', {
        method: 'POST',
        data: {
          fullName: contactForm.name.trim(),
          phoneNumber: contactForm.phone.trim(),
          email: contactForm.email.trim() || null,
          serviceType: contactForm.need || 'Tư vấn chọn rèm',
          roomType: contactForm.space || null,
          note: `Ngân sách: ${contactForm.budget || 'Chưa chọn'} | Ghi chú: ${contactForm.message || 'Không có'}`
        }
      })
      .catch((err) => console.error('Lỗi khi gửi yêu cầu tư vấn:', err))
      .finally(() => {
        setContactSubmitted(true);
      });
    }
  }

  const slides = [
    { id: 'home', name: 'Không gian sống' },
    { id: 'collections', name: 'Bộ sưu tập' },
    { id: 'products', name: 'Sản phẩm cao cấp' },
    { id: 'studio', name: 'Công nghệ AI 3D' },
    { id: 'about', name: 'Giới thiệu' },
    { id: 'contact', name: 'Liên hệ' }
  ];

  const colors = [
    { name: 'Ivory', hex: '#f3eee3' }, { name: 'Sand', hex: '#d6c2a8' },
    { name: 'Taupe', hex: '#a48b72' }, { name: 'Olive', hex: '#777a65' },
    { name: 'Slate', hex: '#49565a' }, { name: 'Black', hex: '#171b1c' }
  ];

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const r = parseAppRoute();
      if (r.shouldReplace && r.cleanUrl) {
        window.history.replaceState(null, '', r.cleanUrl);
      }
      setCurrentPage(r.page);
      if (r.adminTab) setAdminTab(r.adminTab);
      if (r.customerTab) setCustomerTab(r.customerTab);
      if (r.productId) setSelectedProductId(r.productId);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Page entrance animations
  useEffect(() => {
    if (currentPage === 'home') {
      const ctx = gsap.context(() => {
        gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.2, ease: 'power3.out' });
        gsap.from('.preview-card', { y: 30, opacity: 0, duration: 0.8, delay: 0.65, ease: 'power3.out' });
        gsap.from('.hero-art', { scale: 0.96, opacity: 0, duration: 1.2, delay: 0.1, ease: 'power2.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'collections') {
      const ctx = gsap.context(() => {
        gsap.from('.collections-hero .hero-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.collection-card', { y: 28, opacity: 0, duration: 0.7, stagger: 0.08, delay: 0.35, ease: 'power3.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'products') {
      const ctx = gsap.context(() => {
        gsap.from('.products-hero .hero-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.category-card', { y: 20, opacity: 0, duration: 0.6, stagger: 0.06, delay: 0.25, ease: 'power3.out' });
        gsap.from('.filter-sidebar', { x: -20, opacity: 0, duration: 0.7, delay: 0.35, ease: 'power3.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'studio') {
      const ctx = gsap.context(() => {
        gsap.from('.studio-intro .studio-intro-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.stepper', { y: 20, opacity: 0, duration: 0.7, delay: 0.25, ease: 'power3.out' });
        gsap.from('.workspace > *', { y: 26, opacity: 0, duration: 0.75, stagger: 0.1, delay: 0.35, ease: 'power3.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'about') {
      const ctx = gsap.context(() => {
        gsap.from('.about-hero .hero-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.story-section', { y: 24, opacity: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
        gsap.from('.value-card', { y: 20, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.4, ease: 'power3.out' });
        gsap.from('.why-section', { y: 24, opacity: 0, duration: 0.7, delay: 0.45, ease: 'power3.out' });
        gsap.from('.stats-section', { y: 20, opacity: 0, duration: 0.7, delay: 0.5, ease: 'power3.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'contact') {
      const ctx = gsap.context(() => {
        gsap.from('.contact-page-view .hero-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.contact-intro', { y: 24, opacity: 0, duration: 0.7, delay: 0.25, ease: 'power3.out' });
        gsap.from('.form-card', { y: 24, opacity: 0, duration: 0.7, delay: 0.35, ease: 'power3.out' });
        gsap.from('.showroom-section', { y: 24, opacity: 0, duration: 0.7, delay: 0.45, ease: 'power3.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'customer') {
      const ctx = gsap.context(() => {
        gsap.from('.customer-hero-card', { y: 20, opacity: 0, duration: 0.7, delay: 0.15, ease: 'power3.out' });
        gsap.from('.customer-tab-content', { y: 20, opacity: 0, duration: 0.6, delay: 0.25, ease: 'power3.out' });
      });
      return () => ctx.revert();
    } else if (currentPage === 'login') {
      const ctx = gsap.context(() => {
        gsap.from('.smart-form-container, .smart-logged-card', { y: 30, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' });
      });
      return () => ctx.revert();
    }
  }, [currentPage]);

  // Page navigation with clean URLs (no #) & luxury curtain transition
  const navigateTo = (targetPage, targetSection = null) => {
    if (targetPage === 'admin') {
      const tab = targetSection && VALID_ADMIN_TABS.includes(targetSection) ? targetSection : 'dashboard';
      setAdminTab(tab);
      setCurrentPage('admin');
      const targetUrl = tab === 'dashboard' ? '/admin' : `/admin/${tab}`;
      if (window.location.pathname !== targetUrl || window.location.hash) {
        window.history.pushState({ page: 'admin', tab }, '', targetUrl);
      }
      window.scrollTo(0, 0);
      return;
    }

    if (targetPage === 'customer') {
      const tab = targetSection || 'profile';
      setCustomerTab(tab);
      setCurrentPage('customer');
      const targetUrl = tab === 'profile' ? '/customer' : `/customer/${tab}`;
      if (window.location.pathname !== targetUrl || window.location.hash) {
        window.history.pushState({ page: 'customer', tab }, '', targetUrl);
      }
      window.scrollTo(0, 0);
      return;
    }

        if (targetPage === 'product-detail') {
      const prodId = targetSection || selectedProductId || 4;
      setSelectedProductId(prodId);
      const targetUrl = `/products/${prodId}`;
      if (currentPage === 'product-detail' && selectedProductId === prodId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const tl = gsap.timeline();
      tl.set('.page-transition-curtain-wrap', { pointerEvents: 'all' })
        .to('.page-transition-curtain', {
          scaleY: 1,
          duration: 0.38,
          ease: 'power3.inOut',
          transformOrigin: 'bottom',
        })
        .call(() => {
          setCurrentPage('product-detail');
          window.history.pushState({ page: 'product-detail', productId: prodId }, '', targetUrl);
          window.scrollTo(0, 0);
        })
        .to('.page-transition-curtain', {
          scaleY: 0,
          duration: 0.38,
          ease: 'power3.inOut',
          transformOrigin: 'top',
        })
        .set('.page-transition-curtain-wrap', { pointerEvents: 'none' });
      return;
    }

    const targetUrl = targetPage === 'home' ? '/' : `/${targetPage}`;

    if (currentPage === targetPage) {
      if (targetSection) {
        document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const tl = gsap.timeline();

    tl.set('.page-transition-curtain-wrap', { pointerEvents: 'all' })
      .to('.page-transition-curtain', {
        scaleY: 1,
        duration: 0.45,
        ease: 'power3.inOut',
        transformOrigin: 'bottom',
      })
      .to('.curtain-brand-glow', {
        opacity: 1,
        scale: 1,
        duration: 0.22,
        ease: 'power2.out',
      }, '-=0.18')
      .call(() => {
        setCurrentPage(targetPage);
        window.history.pushState({ page: targetPage }, '', targetUrl);
        window.scrollTo(0, 0);
        if (targetSection) {
          setTimeout(() => {
            document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      })
      .to('.curtain-brand-glow', {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        delay: 0.08,
        ease: 'power2.in',
      })
      .to('.page-transition-curtain', {
        scaleY: 0,
        duration: 0.45,
        ease: 'power3.inOut',
        transformOrigin: 'top',
      })
      .set('.page-transition-curtain-wrap', { pointerEvents: 'none' });
  };

  const scrollTo = (id) => {
    if (id === 'collections') {
      navigateTo('collections');
      return;
    }
    if (id === 'products') {
      navigateTo('products');
      return;
    }
    if (id === 'studio') {
      navigateTo('studio');
      return;
    }
    if (id === 'about') {
      navigateTo('about');
      return;
    }
    if (id === 'contact') {
      navigateTo('contact');
      return;
    }
    if (id === 'login') {
      navigateTo('login');
      return;
    }
    if (id === 'customer') {
      navigateTo('customer');
      return;
    }
    if (currentPage !== 'home') {
      navigateTo('home', id);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="app-container">
      {/* Cinematic Luxury Curtain Transition */}
      <div className="page-transition-curtain-wrap" aria-hidden="true">
        <div className="page-transition-curtain" />
        <div className="curtain-brand-glow">
          <img src="/logo/logo.png" alt="UNIVELORIA" />
          <span className="curtain-brand-title">UNIVELORIA</span>
          <span className="curtain-brand-sub">KHÔNG GIAN SỐNG & BỘ SƯU TẬP CAO CẤP</span>
        </div>
      </div>

      {/* Global Luxury Cart Drawer */}
      <CartDrawer navigateTo={navigateTo} />

      {currentPage === 'home' && (
        <HomePage
          navigateTo={navigateTo}
          scrollTo={scrollTo}
          curtainOpen={curtainOpen}
          setCurtainOpen={setCurtainOpen}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
          colors={colors}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          slides={slides}
        />
      )}

      {currentPage === 'collections' && (
        <CollectionsPage
          navigateTo={navigateTo}
          activeCollectionFilter={activeCollectionFilter}
          setActiveCollectionFilter={setActiveCollectionFilter}
          visibleCollections={visibleCollections}
          savedCollections={savedCollections}
          toggleSavedCollection={toggleSavedCollection}
        />
      )}

      {currentPage === 'product-detail' && (
        <ProductDetailPage
          productId={selectedProductId}
          navigateTo={navigateTo}
          productsList={productsList}
          productFavorites={productFavorites}
          toggleProductFavorite={toggleProductFavorite}
        />
      )}

      {currentPage === 'products' && (
        <ProductsPage
          navigateTo={navigateTo}
          selectedProductCategory={selectedProductCategory}
          setSelectedProductCategory={setSelectedProductCategory}
          selectedProductTypes={selectedProductTypes}
          setSelectedProductTypes={setSelectedProductTypes}
          selectedProductStyles={selectedProductStyles}
          setSelectedProductStyles={setSelectedProductStyles}
          selectedProductColors={selectedProductColors}
          setSelectedProductColors={setSelectedProductColors}
          maxProductPrice={maxProductPrice}
          setMaxProductPrice={setMaxProductPrice}
          productSortBy={productSortBy}
          setProductSortBy={setProductSortBy}
          productSearch={productSearch}
          setProductSearch={setProductSearch}
          productSearchOpen={productSearchOpen}
          setProductSearchOpen={setProductSearchOpen}
          productView={productView}
          setProductView={setProductView}
          productNotice={productNotice}
          filteredProducts={filteredProducts}
          productFavorites={productFavorites}
          toggleProductFavorite={toggleProductFavorite}
          productCart={productCart}
          addToCart={addToCart}
          toggleProductFilter={toggleProductFilter}
          resetProductFilters={resetProductFilters}
          activeCardColors={activeCardColors}
          setActiveCardColors={setActiveCardColors}
        />
      )}

      {currentPage === 'studio' && (
        <StudioPage
          navigateTo={navigateTo}
          fileRef={fileRef}
          roomImage={roomImage}
          hasUploaded={hasUploaded}
          isAnalyzing={isAnalyzing}
          analyzed={analyzed}
          activeType={activeType}
          studioColor={studioColor}
          setStudioColor={setStudioColor}
          activeStudioFilter={activeStudioFilter}
          setActiveStudioFilter={setActiveStudioFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          zoom={zoom}
          setZoom={setZoom}
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
          dragging={dragging}
          setDragging={setDragging}
          showOriginal={showOriginal}
          setShowOriginal={setShowOriginal}
          setRoomImage={setRoomImage}
          setHasUploaded={setHasUploaded}
          setAnalyzed={setAnalyzed}
          currentType={currentType}
          loadFile={loadFile}
          analyzeRoom={analyzeRoom}
          chooseType={chooseType}
        />
      )}

      {currentPage === 'about' && (
        <AboutPage navigateTo={navigateTo} />
      )}

      {currentPage === 'contact' && (
        <ContactPage
          navigateTo={navigateTo}
          contactForm={contactForm}
          setContactForm={setContactForm}
          contactErrors={contactErrors}
          setContactErrors={setContactErrors}
          contactSubmitted={contactSubmitted}
          setContactSubmitted={setContactSubmitted}
          openContactFaq={openContactFaq}
          setOpenContactFaq={setOpenContactFaq}
          updateContact={updateContact}
          handleContactSubmit={handleContactSubmit}
        />
      )}

      {currentPage === 'customer' && (
        <CustomerPage
          navigateTo={navigateTo}
          initialTab={customerTab}
          productFavorites={productFavorites}
          toggleProductFavorite={toggleProductFavorite}
        />
      )}

      {currentPage === 'admin' && (
        <AdminPage
          navigateTo={navigateTo}
          initialTab={adminTab}
          onTabChange={setAdminTab}
          onProductUpdated={fetchProductsCatalog}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage navigateTo={navigateTo} />
      )}
    </main>
  );
}

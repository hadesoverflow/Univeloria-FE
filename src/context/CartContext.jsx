import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { customerApi } from '../api/customerApi';

const CartContext = createContext(null);

const STORAGE_KEY = 'univeloria_cart_v1';

function mapDbCartItemToLocal(item) {
  return {
    dbId: item.id,
    id: item.productId,
    name: item.productName,
    code: item.productCode || `UVL-${item.productId}`,
    category: item.category || 'Rèm vải',
    room: item.roomType || 'Phòng khách',
    style: item.style || 'Hiện đại',
    price: Number(item.price) || 0,
    oldPrice: item.oldPrice ? Number(item.oldPrice) : null,
    image: item.thumbnailUrl || '/assets/product-linen.jpg',
    quantity: item.quantity || 1,
    selectedColor: item.selectedColor || '#c8a87d',
    notes: item.notes || ''
  };
}

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartNotice, setCartNotice] = useState(null);

  // Sync with database if authenticated
  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated) {
      customerApi.getCart()
        .then((res) => {
          if (!isMounted) return;
          const dbItems = res?.data || [];
          if (dbItems.length > 0) {
            setCartItems(dbItems.map(mapDbCartItemToLocal));
          } else {
            // If DB is empty, check if we have local guest items to migrate
            try {
              const saved = localStorage.getItem(STORAGE_KEY);
              const localItems = saved ? JSON.parse(saved) : [];
              if (localItems.length > 0) {
                Promise.all(
                  localItems.map((item) =>
                    customerApi.addToCart({
                      productId: item.id,
                      quantity: item.quantity,
                      selectedColor: item.selectedColor,
                      roomType: item.room,
                      notes: item.notes || ''
                    })
                  )
                ).then(() => {
                  customerApi.getCart().then((r) => {
                    if (isMounted && r?.data) {
                      setCartItems(r.data.map(mapDbCartItemToLocal));
                    }
                  });
                }).catch((e) => console.error('Lỗi đồng bộ giỏ hàng lên DB:', e));
              }
            } catch (e) {
              console.error(e);
            }
          }
        })
        .catch((err) => {
          console.error('Lỗi tải giỏ hàng từ server:', err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user?.id]);

  // Sync with localStorage as backup
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Lỗi lưu giỏ hàng vào localStorage:', e);
    }
  }, [cartItems]);

  const showNotice = (msg) => {
    setCartNotice(msg);
    setTimeout(() => setCartNotice(null), 3000);
  };

  // Add product to cart
  const addToCart = async (product, quantity = 1, selectedColor = null) => {
    if (!product || !product.id) return;

    const chosenColor = selectedColor || (Array.isArray(product.colors) ? product.colors[0] : '#c8a87d');
    const chosenRoom = product.room || product.roomType || 'Phòng khách';
    const numQty = quantity > 0 ? quantity : 1;

    if (isAuthenticated) {
      try {
        const payload = {
          productId: product.id,
          quantity: numQty,
          selectedColor: chosenColor,
          roomType: chosenRoom,
          notes: ''
        };
        await customerApi.addToCart(payload);
        const updatedCart = await customerApi.getCart();
        if (updatedCart?.data) {
          setCartItems(updatedCart.data.map(mapDbCartItemToLocal));
        }
      } catch (err) {
        console.error('Lỗi lưu giỏ hàng vào DB:', err);
        // Fallback local update
        setCartItems((prev) => {
          const existingIndex = prev.findIndex((item) => item.id === product.id);
          if (existingIndex > -1) {
            const next = [...prev];
            next[existingIndex] = {
              ...next[existingIndex],
              quantity: next[existingIndex].quantity + numQty,
              selectedColor: chosenColor
            };
            return next;
          }
          return [...prev, {
            id: product.id,
            name: product.name,
            code: product.code || `UVL-${product.id}`,
            category: product.category || 'Rèm vải',
            room: chosenRoom,
            style: product.style || 'Hiện đại',
            price: Number(product.price) || 2450000,
            oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
            image: product.image || product.thumbnailUrl || '/assets/product-linen.jpg',
            quantity: numQty,
            selectedColor: chosenColor
          }];
        });
      }
    } else {
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === product.id);
        if (existingIndex > -1) {
          const next = [...prev];
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: next[existingIndex].quantity + numQty,
            selectedColor: chosenColor
          };
          return next;
        }

        const newItem = {
          id: product.id,
          name: product.name,
          code: product.code || `UVL-${product.id}`,
          category: product.category || 'Rèm vải',
          room: chosenRoom,
          style: product.style || 'Hiện đại',
          price: Number(product.price) || 2450000,
          oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
          image: product.image || product.thumbnailUrl || '/assets/product-linen.jpg',
          quantity: numQty,
          selectedColor: chosenColor
        };
        return [...prev, newItem];
      });
    }

    showNotice(`Đã thêm “${product.name}” vào giỏ hàng`);
    setIsCartOpen(true);
  };

  // Update item quantity
  const updateQuantity = async (productId, delta) => {
    const item = cartItems.find((i) => i.id === productId || i.dbId === productId);
    if (!item) return;

    const nextQty = item.quantity + delta;

    if (isAuthenticated && item.dbId) {
      try {
        if (nextQty <= 0) {
          await customerApi.removeCartItem(item.dbId);
        } else {
          await customerApi.updateCartItem(item.dbId, nextQty);
        }
        const updatedCart = await customerApi.getCart();
        if (updatedCart?.data) {
          setCartItems(updatedCart.data.map(mapDbCartItemToLocal));
        }
        return;
      } catch (err) {
        console.error('Lỗi cập nhật giỏ hàng DB:', err);
      }
    }

    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.id === productId || it.dbId === productId) {
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean)
    );
  };

  // Remove specific item
  const removeFromCart = async (productId) => {
    const item = cartItems.find((i) => i.id === productId || i.dbId === productId);
    if (isAuthenticated && item?.dbId) {
      try {
        await customerApi.removeCartItem(item.dbId);
        const updatedCart = await customerApi.getCart();
        if (updatedCart?.data) {
          setCartItems(updatedCart.data.map(mapDbCartItemToLocal));
        }
        return;
      } catch (err) {
        console.error('Lỗi xóa mục giỏ hàng DB:', err);
      }
    }

    setCartItems((prev) => prev.filter((item) => item.id !== productId && item.dbId !== productId));
  };

  // Clear entire cart
  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await customerApi.clearCart();
      } catch (err) {
        console.error('Lỗi xóa sạch giỏ hàng DB:', err);
      }
    }
    setCartItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  // Computed values
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartNotice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

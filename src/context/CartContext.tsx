import React, { createContext, useContext, useMemo, useState } from "react";
import type { CartContextType, Cart, CartItem } from "../types/cart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import inventoryService from "../services/inventoryService";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "wayback-cart",
    []
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate cart totals
  const cart: Cart = useMemo(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items: cartItems,
      total: Math.round(total * 100) / 100, // Round to 2 decimal places
      itemCount,
    };
  }, [cartItems]);

  // Add item to cart
  const addToCart = (
    product: Omit<CartItem, "quantity">,
    quantity: number = 1
  ) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart completely
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Process purchase and update inventory
  const processPurchase = (orderId: string) => {
    const success = inventoryService.processPurchase(cartItems, orderId);
    if (success) {
      clearCart();
    }
    return success;
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    toggleCart,
    processPurchase,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

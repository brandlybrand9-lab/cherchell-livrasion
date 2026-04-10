import React, { createContext, useContext, useState } from 'react';
import { MenuItem, Restaurant } from './data';

export type CartItem = MenuItem & { quantity: number; restaurantId: string; restaurantName: string };

type CartContextType = {
  items: CartItem[];
  addItem: (item: MenuItem, restaurant: Restaurant) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: MenuItem, restaurant: Restaurant) => {
    setItems((prev) => {
      // Check if we're adding from a different restaurant
      if (prev.length > 0 && prev[0].restaurantId !== restaurant.id) {
        // Automatically clear cart if switching restaurants to keep it simple
        return [{ ...item, quantity: 1, restaurantId: restaurant.id, restaurantName: restaurant.name }];
      }

      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1, restaurantId: restaurant.id, restaurantName: restaurant.name }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

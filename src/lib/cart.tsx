import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem, Product } from "./supabase";

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, capacityOption: string, quantity?: number) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, qty: number) => void;
  updateCapacity: (index: number, capacity: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  updateCapacity: () => {},
  clearCart: () => {},
  totalQuantity: 0,
  isOpen: false,
  setOpen: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const addToCart = (product: Product, capacityOption: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.findIndex(
        (i) => i.product.id === product.id && i.capacityOption === capacityOption
      );
      if (existing >= 0) {
        return prev.map((i, idx) =>
          idx === existing ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, capacityOption, quantity }];
    });
    setOpen(true);
  };

  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const updateQuantity = (index: number, qty: number) =>
    setItems((prev) =>
      prev.map((i, idx) => (idx === index ? { ...i, quantity: Math.max(1, qty) } : i))
    );

  const updateCapacity = (index: number, capacity: string) =>
    setItems((prev) =>
      prev.map((i, idx) => (idx === index ? { ...i, capacityOption: capacity } : i))
    );

  const clearCart = () => setItems([]);

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeItem, updateQuantity, updateCapacity, clearCart, totalQuantity, isOpen, setOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

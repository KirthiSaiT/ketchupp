"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  slug: string;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string; size: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; size: string; quantity: number } }
  | { type: "CLEAR" };

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQty: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.findIndex(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );
      if (existing > -1) {
        const items = [...state.items];
        items[existing] = {
          ...items[existing],
          quantity: items[existing].quantity + action.payload.quantity,
        };
        return { ...state, items, isOpen: true };
      }
      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.id === action.payload.id && i.size === action.payload.size)
        ),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id && i.size === action.payload.size
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Persist to localStorage
  useEffect(() => {
    const stored = localStorage.getItem("ketchupp-cart");
    if (stored) {
      const parsed = JSON.parse(stored) as CartItem[];
      parsed.forEach((item) =>
        dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 0 } })
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ketchupp-cart", JSON.stringify(state.items));
  }, [state.items]);

  const total = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const itemCount = state.items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
        removeItem: (id, size) => dispatch({ type: "REMOVE_ITEM", payload: { id, size } }),
        updateQty: (id, size, quantity) =>
          dispatch({ type: "UPDATE_QTY", payload: { id, size, quantity } }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        openCart: () => {},
        closeCart: () => {},
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

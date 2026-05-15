"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  slug: string;
  maxStock: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string; size: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; size: string; quantity: number } }
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "CLEAR" };

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartContextType extends CartState {
  addItem: (item: CartItem) => boolean;
  removeItem: (id: string, size: string) => void;
  updateQty: (id: string, size: string, quantity: number) => boolean;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "ADD_ITEM": {
      const existing = state.items.findIndex(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );
      if (existing > -1) {
        const items = [...state.items];
        const newQty = Math.min(
          items[existing].quantity + action.payload.quantity,
          items[existing].maxStock
        );
        items[existing] = {
          ...items[existing],
          quantity: newQty,
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
            ? { ...i, quantity: Math.min(Math.max(1, action.payload.quantity), i.maxStock) }
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
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        dispatch({ type: "SET_ITEMS", payload: parsed });
      } catch (e) {
        console.error("Cart hydration failed", e);
      }
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
        addItem: (item) => {
          const existing = state.items.find(i => i.id === item.id && i.size === item.size);
          const currentQty = existing ? existing.quantity : 0;
          if (currentQty + item.quantity > item.maxStock) {
            toast.error(`Only ${item.maxStock} units available for this size`);
            if (currentQty < item.maxStock) {
              dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: item.maxStock - currentQty } });
              return true;
            }
            return false;
          }
          dispatch({ type: "ADD_ITEM", payload: item });
          return true;
        },
        removeItem: (id, size) => dispatch({ type: "REMOVE_ITEM", payload: { id, size } }),
        updateQty: (id, size, quantity) => {
          const item = state.items.find(i => i.id === id && i.size === size);
          if (item && quantity > item.maxStock) {
            toast.error(`Maximum stock reached (${item.maxStock})`);
            dispatch({ type: "UPDATE_QTY", payload: { id, size, quantity: item.maxStock } });
            return false;
          }
          dispatch({ type: "UPDATE_QTY", payload: { id, size, quantity } });
          return true;
        },
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

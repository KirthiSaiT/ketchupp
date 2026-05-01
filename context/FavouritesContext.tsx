"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface FavouriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

type FavAction =
  | { type: "TOGGLE"; payload: FavouriteItem }
  | { type: "REMOVE"; payload: string };

interface FavContextType {
  favourites: FavouriteItem[];
  toggle: (item: FavouriteItem) => void;
  isFav: (id: string) => boolean;
}

const FavContext = createContext<FavContextType | null>(null);

function favReducer(state: FavouriteItem[], action: FavAction): FavouriteItem[] {
  switch (action.type) {
    case "TOGGLE":
      return state.some((i) => i.id === action.payload.id)
        ? state.filter((i) => i.id !== action.payload.id)
        : [...state, action.payload];
    case "REMOVE":
      return state.filter((i) => i.id !== action.payload);
    default:
      return state;
  }
}

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [favourites, dispatch] = useReducer(favReducer, []);

  useEffect(() => {
    const stored = localStorage.getItem("ketchupp-favs");
    if (stored) {
      const parsed = JSON.parse(stored) as FavouriteItem[];
      parsed.forEach((item) => dispatch({ type: "TOGGLE", payload: item }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ketchupp-favs", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <FavContext.Provider
      value={{
        favourites,
        toggle: (item) => dispatch({ type: "TOGGLE", payload: item }),
        isFav: (id) => favourites.some((i) => i.id === id),
      }}
    >
      {children}
    </FavContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavContext);
  if (!ctx) throw new Error("useFavourites must be used within FavouritesProvider");
  return ctx;
}

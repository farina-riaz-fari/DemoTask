import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type CartContextValue = {
  cartCount: number;
  addToCart: (quantity: number) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = useCallback((quantity: number) => {
    const n = Math.floor(quantity);
    if (n < 1) {
      return;
    }
    setCartCount((c) => c + n);
  }, []);

  const value = useMemo(
    () => ({ cartCount, addToCart }),
    [cartCount, addToCart],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

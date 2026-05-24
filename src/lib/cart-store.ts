import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products, type Product } from "./products";

export interface CartLine {
  productId: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      add: (productId, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.productId === productId);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.productId === productId ? { ...l, qty: l.qty + qty } : l,
              ),
              isOpen: true,
            };
          }
          return { lines: [...s.lines, { productId, qty }], isOpen: true };
        }),
      remove: (productId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.productId !== productId) })),
      setQty: (productId, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.productId === productId ? { ...l, qty } : l))
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "ashaway-cart" },
  ),
);

export interface ResolvedLine extends CartLine {
  product: Product;
  subtotal: number;
}

export const resolveLines = (lines: CartLine[]): ResolvedLine[] =>
  lines
    .map((l) => {
      const product = products.find((p) => p.id === l.productId);
      if (!product) return null;
      return { ...l, product, subtotal: product.price * l.qty };
    })
    .filter((x): x is ResolvedLine => x !== null);

export const cartTotals = (lines: CartLine[]) => {
  const resolved = resolveLines(lines);
  const subtotal = resolved.reduce((s, l) => s + l.subtotal, 0);
  const itemCount = resolved.reduce((s, l) => s + l.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 49;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;
  return { resolved, subtotal, shipping, tax, total, itemCount };
};
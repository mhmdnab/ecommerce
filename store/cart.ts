import { create } from "zustand";
import {
  addOrUpdateCartItem,
  CartItem,
  getCart,
  getStoredTokens,
  getProductById,
  removeCartItem,
} from "@/lib/api";

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, qty?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  reset: () => void;
}

const normalizeCartItem = (item: CartItem): CartItem => {
  // productId might come back as an object (populated) or string
  const productId =
    typeof item.productId === "string"
      ? item.productId
      : (item.productId as any)?._id ||
        (item.productId as any)?.id ||
        (item.productId as any)?.toString?.() ||
        "";

  // if product already has a title, prefer it and set productId string
  if (item.product && (item.product as any).title) {
    return { ...item, productId, product: item.product };
  }

  // if productId is an object with details, treat that as product
  if (item.productId && typeof item.productId === "object") {
    return { ...item, productId, product: item.productId as any };
  }

  return { ...item, productId };
};

const hydrateProducts = async (items: CartItem[]): Promise<CartItem[]> => {
  const normalized = items.map(normalizeCartItem);
  const enriched = await Promise.all(
    normalized.map(async (item) => {
      if (item.product && (item.product as any).title) return item;
      if (!item.productId) return item;
      try {
        const res = await getProductById(item.productId);
        return { ...item, product: res.product };
      } catch (err) {
        console.warn("Failed to load product for cart item", item.productId, err);
        return item;
      }
    })
  );

  return enriched;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  loading: false,
  error: null,

  fetchCart: async () => {
    const tokens = getStoredTokens();
    if (!tokens.accessToken) {
      set({ items: [], error: null, loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await getCart();
      const itemsWithProducts = await hydrateProducts(data.items ?? []);
      set({ items: itemsWithProducts, loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to load cart right now.";
      set({ error: message, loading: false });
    }
  },

  addItem: async (productId, qty = 1) => {
    const tokens = getStoredTokens();
    if (!tokens.accessToken) {
      const message = "Please login to add items to your cart.";
      set({ error: message });
      throw new Error(message);
    }

    set({ loading: true, error: null });
    try {
      const data = await addOrUpdateCartItem(productId, qty);
      const itemsWithProducts = await hydrateProducts(data.items ?? []);
      set({ items: itemsWithProducts, loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to update cart.";
      set({ error: message, loading: false });
      throw err instanceof Error ? err : new Error(message);
    }
  },

  removeItem: async (productId) => {
    const tokens = getStoredTokens();
    if (!tokens.accessToken) {
      const message = "Please login to manage your cart.";
      set({ error: message });
      throw new Error(message);
    }

    set({ loading: true, error: null });
    try {
      const data = await removeCartItem(productId);
      const itemsWithProducts = await hydrateProducts(data.items ?? []);
      set({ items: itemsWithProducts, loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to remove item.";
      set({ error: message, loading: false });
      throw err instanceof Error ? err : new Error(message);
    }
  },

  reset: () => set({ items: [], error: null, loading: false }),
}));

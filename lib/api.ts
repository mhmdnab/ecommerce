const DEFAULT_API_BASE_URL = "http://localhost:5002";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;

type RequestOptions = RequestInit & {
  auth?: boolean;
};

type ApiError = {
  error: string;
  details?: string[] | Record<string, unknown> | null;
  status?: number;
};

type AuthTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

const TOKEN_STORAGE_KEY = "shop_auth_tokens";

let refreshPromise: Promise<string | null> | null = null;

const safeParse = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const toError = async (res: Response): Promise<ApiError> => {
  const parsed = await safeParse(res);
  if (parsed && typeof parsed === "object") {
    if ("error" in parsed) {
      return {
        error: (parsed as ApiError).error || "Request failed",
        details: (parsed as ApiError).details,
        status: res.status,
      };
    }

    const maybeMessage =
      (parsed as Record<string, unknown>).message ||
      (parsed as Record<string, unknown>).msg;

    return {
      error:
        typeof maybeMessage === "string"
          ? maybeMessage
          : `Request failed: ${JSON.stringify(parsed)}`,
      status: res.status,
    };
  }
  const fallbackText = await res.text();
  return {
    error: fallbackText || `Request failed with status ${res.status}`,
    status: res.status,
  };
};

const formatDetails = (details?: ApiError["details"]): string => {
  if (!details) return "";
  if (Array.isArray(details)) return details.join(", ");
  if (typeof details === "object") return JSON.stringify(details);
  return String(details);
};

export const setStoredTokens = (tokens: AuthTokens) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
};

export const getStoredTokens = (): AuthTokens => {
  if (typeof window === "undefined") {
    return { accessToken: null, refreshToken: null };
  }
  const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!raw) return { accessToken: null, refreshToken: null };
  try {
    return JSON.parse(raw) as AuthTokens;
  } catch {
    return { accessToken: null, refreshToken: null };
  }
};

export const clearStoredTokens = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken } = getStoredTokens();
  if (!refreshToken) return null;

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        clearStoredTokens();
        return null;
      }

      const data = (await res.json()) as {
        accessToken?: string;
        refreshToken?: string;
      };

      const tokens: AuthTokens = {
        accessToken: data.accessToken || null,
        refreshToken: data.refreshToken || refreshToken || null,
      };

      setStoredTokens(tokens);
      return tokens.accessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const { auth, ...restOptions } = options;
  const headers = new Headers(restOptions.headers as HeadersInit);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const tokens = getStoredTokens();
  if (auth && tokens.accessToken) {
    headers.set("Authorization", `Bearer ${tokens.accessToken}`);
  }

  const makeRequest = async (skipRetry = false): Promise<Response> => {
    const response = await fetch(url, {
      ...restOptions,
      headers,
    });

    if (
      response.status === 401 &&
      auth &&
      !skipRetry &&
      tokens.refreshToken
    ) {
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        headers.set("Authorization", `Bearer ${newAccess}`);
        return makeRequest(true);
      }
    }

    return response;
  };

  const res = await makeRequest();

  if (!res.ok) {
    const err = await toError(res);
    const message =
      err.error ||
      "Something went wrong. Please try again or contact support.";
    const detailText = formatDetails(err.details);
    throw new Error(detailText ? `${message}: ${detailText}` : message);
  }

  if (res.status === 204) {
    return null as T;
  }

  return res.json() as Promise<T>;
}

// ---- AUTH ---- //
export const loginRequest = (email: string, password: string) =>
  apiRequest<{ accessToken: string; refreshToken: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const registerRequest = (
  email: string,
  password: string,
  username: string
) =>
  apiRequest<{ accessToken: string; refreshToken: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
  });

export const logoutRequest = (refreshToken: string | null) =>
  apiRequest<void>("/auth/logout", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ refreshToken }),
  });

export const getCurrentUser = () =>
  apiRequest<{ id?: string; email: string; role?: string }>("/users/me", {
    auth: true,
  });

// ---- PRODUCTS ---- //
export interface Product {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  price: number;
  images?: string[];
  stock?: number;
  category?: string;
}

export const getProducts = (params: {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) => {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (typeof params.minPrice === "number")
    query.set("minPrice", String(params.minPrice));
  if (typeof params.maxPrice === "number")
    query.set("maxPrice", String(params.maxPrice));
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const suffix = query.toString() ? `?${query.toString()}` : "";
  return apiRequest<{
    items: Product[];
    total: number;
    page: number;
    pages: number;
  }>(`/products${suffix}`);
};

export const getProductById = (id: string) =>
  apiRequest<{ product: Product; rating?: { average: number; count: number } }>(
    `/products/${id}`
  );

// ---- CART ---- //
export interface CartItem {
  productId: string;
  qty: number;
  product?: Product;
}

export const getCart = () =>
  apiRequest<{ items: CartItem[] }>("/cart", { auth: true });

export const addOrUpdateCartItem = (productId: string, qty: number) =>
  apiRequest<{ items: CartItem[] }>("/cart/items", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ productId, qty }),
  });

export const removeCartItem = (productId: string) =>
  apiRequest<{ items: CartItem[] }>(`/cart/items/${productId}`, {
    method: "DELETE",
    auth: true,
  });

// ---- ORDERS ---- //
export const createOrder = () =>
  apiRequest("/orders", { method: "POST", auth: true });

import { create } from "zustand";
import {
  clearStoredTokens,
  getCurrentUser,
  getStoredTokens,
  loginRequest,
  logoutRequest,
  registerRequest,
  setStoredTokens,
} from "@/lib/api";

type User = {
  id?: string;
  email: string;
  role?: string;
};

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  initializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

const initialTokens = getStoredTokens();

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  accessToken: initialTokens.accessToken,
  refreshToken: initialTokens.refreshToken,
  initializing: true,

  hydrate: async () => {
    const { accessToken, refreshToken } = getStoredTokens();
    if (!accessToken || !refreshToken) {
      set({ initializing: false });
      return;
    }

    set({ accessToken, refreshToken });

    try {
      const user = await getCurrentUser();
      set({ user, initializing: false });
    } catch (err) {
      console.error("Failed to hydrate user", err);
      clearStoredTokens();
      set({ user: null, accessToken: null, refreshToken: null, initializing: false });
    }
  },

  login: async (email, password) => {
    const data = await loginRequest(email, password);
    const tokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    set({ ...tokens, initializing: false });
    setStoredTokens(tokens);

    const user = await getCurrentUser();
    set({ user, initializing: false });
  },

  register: async (email, password, username) => {
    const data = await registerRequest(email, password, username);
    const tokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    set({ ...tokens, initializing: false });
    setStoredTokens(tokens);

    const user = await getCurrentUser();
    set({ user, initializing: false });
  },

  logout: async () => {
    const { refreshToken } = get();
    try {
      await logoutRequest(refreshToken);
    } catch (err) {
      console.warn("Logout error", err);
    }

    clearStoredTokens();
    set({ user: null, accessToken: null, refreshToken: null, initializing: false });
  },
}));

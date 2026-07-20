"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// ============================================================================
// ONE GLOBAL CONTEXT — single source of truth for auth, cart & wishlist state
// ============================================================================
const AppContext = createContext(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006";

// Single axios instance. A request interceptor attaches the token
// automatically so we never have to repeat `Authorization: Bearer ${token}`
// (and never risk sending a stale one) in every function below.
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export function AppProvider({ children }) {
  const router = useRouter();

  // ----- Auth state -----
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // initial auth bootstrap
  const [authActionLoading, setAuthActionLoading] = useState(false); // login/register button state

  // ----- Cart state -----
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  // ----- Wishlist state -----
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Derived counts — always calculated from the arrays, so they can never
  // drift out of sync with the data that produced them.
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishlistCount = wishlistItems.length;

  // Guards against setting state after the provider unmounts (fast route
  // changes / logout while a request is in flight).
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // ===========================================================================
  // CART
  // ===========================================================================
  const fetchCart = useCallback(async () => {
    if (typeof window === "undefined") return [];
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      setCartItems([]);
      setCartTotal(0);
      return [];
    }

    setCartLoading(true);
    try {
      const res = await api.get("/api/viewcart");
      const items = res.data?.cartdata || res.data?.items || [];

      if (mountedRef.current) {
        setCartItems(items);
        const total = items.reduce((sum, item) => {
          const price = item.productid?.price || item.price || 0;
          const quantity = item.quantity || 1;
          return sum + price * quantity;
        }, 0);
        setCartTotal(total);
      }
      return items;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return [];
    } finally {
      if (mountedRef.current) setCartLoading(false);
    }
  }, []);

  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!savedToken) {
        router.push("/login");
        return { success: false, error: "Please login first" };
      }

      setCartLoading(true);
      try {
        const res = await api.post("/api/addcart", { productid: productId, quantity });
        // Re-sync the whole cart from the server so cartCount/cartItems
        // are always the source of truth (no manual/optimistic drift).
        await fetchCart();
        return { success: true, data: res.data };
      } catch (error) {
        console.error("Error adding to cart:", error);
        return {
          success: false,
          error: error.response?.data?.message || "Failed to add to cart",
        };
      } finally {
        if (mountedRef.current) setCartLoading(false);
      }
    },
    [fetchCart, router]
  );

  // NOTE ON BACKEND CONTRACT:
  // PUT /api/cartupdate/:id expects the CART DOCUMENT id (item._id from
  // /api/viewcart) and a body of { action: "inc" | "dec" } — it does NOT
  // accept an arbitrary quantity. Keeping the client aligned with this
  // instead of guessing a `{ quantity }` payload (which the backend silently
  // ignores) was one of the root causes of "count not updating".
  const updateCartQuantity = useCallback(
    async (cartItemId, action) => {
      const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!savedToken) return { success: false, error: "Please login first" };

      setCartLoading(true);
      try {
        await api.put(`/api/cartupdate/${cartItemId}`, { action });
        await fetchCart();
        return { success: true };
      } catch (error) {
        console.error("Error updating cart:", error);
        return {
          success: false,
          error: error.response?.data?.message || "Failed to update cart",
        };
      } finally {
        if (mountedRef.current) setCartLoading(false);
      }
    },
    [fetchCart]
  );

  // cartItemId = the cart document's _id (matches DELETE /api/cartdelete/:id)
  const removeFromCart = useCallback(
    async (cartItemId) => {
      const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!savedToken) return { success: false, error: "Please login first" };

      setCartLoading(true);
      try {
        await api.delete(`/api/cartdelete/${cartItemId}`);
        await fetchCart();
        return { success: true };
      } catch (error) {
        console.error("Error removing from cart:", error);
        return {
          success: false,
          error: error.response?.data?.message || "Failed to remove from cart",
        };
      } finally {
        if (mountedRef.current) setCartLoading(false);
      }
    },
    [fetchCart]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartTotal(0);
  }, []);

  const isInCart = useCallback(
    (productId) =>
      cartItems.some(
        (item) => item.productid?._id === productId || item.productId === productId
      ),
    [cartItems]
  );

  // ===========================================================================
  // WISHLIST
  // ===========================================================================
  const fetchWishlist = useCallback(async () => {
    if (typeof window === "undefined") return [];
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      setWishlistItems([]);
      return [];
    }

    setWishlistLoading(true);
    try {
      const res = await api.get("/api/getwish");
      const items = res.data?.wishes || res.data?.items || [];
      if (mountedRef.current) setWishlistItems(items);
      return items;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    } finally {
      if (mountedRef.current) setWishlistLoading(false);
    }
  }, []);

  const addToWishlist = useCallback(
    async (productId) => {
      const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!savedToken) {
        router.push("/login");
        return { success: false, error: "Please login first" };
      }

      // Avoid a pointless (and backend-rejected) duplicate call.
      const alreadyIn = wishlistItems.some(
        (item) => item.productid?._id === productId || item.productId === productId
      );
      if (alreadyIn) {
        return { success: true, alreadyExists: true };
      }

      setWishlistLoading(true);
      try {
        await api.post("/api/addwish", { productid: productId });
        await fetchWishlist();
        return { success: true };
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        return {
          success: false,
          error: error.response?.data?.message || "Failed to add to wishlist",
        };
      } finally {
        if (mountedRef.current) setWishlistLoading(false);
      }
    },
    [fetchWishlist, router, wishlistItems]
  );

  // wishlistItemId = the wishlist document's _id (matches DELETE /api/removewish/:id)
  const removeFromWishlist = useCallback(
    async (wishlistItemId) => {
      const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!savedToken) return { success: false, error: "Please login first" };

      setWishlistLoading(true);
      try {
        await api.delete(`/api/removewish/${wishlistItemId}`);
        await fetchWishlist();
        return { success: true };
      } catch (error) {
        console.error("Error removing from wishlist:", error);
        return {
          success: false,
          error: error.response?.data?.message || "Failed to remove from wishlist",
        };
      } finally {
        if (mountedRef.current) setWishlistLoading(false);
      }
    },
    [fetchWishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const isInWishlist = useCallback(
    (productId) =>
      wishlistItems.some(
        (item) => item.productid?._id === productId || item.productId === productId
      ),
    [wishlistItems]
  );

  // Convenience helper for listing pages (shop grid, search results, etc.)
  // that only know a product's id, not the wishlist document's id that
  // DELETE /api/removewish/:id actually requires. Calling
  // removeFromWishlist(productId) directly from those pages was a real bug
  // — it silently failed (404, item not found) because the ids don't
  // match, so the heart never un-toggled and the count never dropped.
  // This looks the matching wishlist entry up first, then calls the right
  // function with the right id.
  const toggleWishlist = useCallback(
    async (productId) => {
      const existing = wishlistItems.find(
        (item) => item.productid?._id === productId || item.productId === productId
      );
      if (existing) {
        return removeFromWishlist(existing._id);
      }
      return addToWishlist(productId);
    },
    [wishlistItems, removeFromWishlist, addToWishlist]
  );

  // ===========================================================================
  // AUTH
  // ===========================================================================
  const checkAuth = useCallback(async () => {
    if (typeof window === "undefined") return;
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.get("/api/profile");
      setUser(res.data);
      setToken(savedToken);
      setIsAuthenticated(true);

      // Fetch cart + wishlist together, once, right after we know who the
      // user is — this is the single place they get loaded on app start.
      await Promise.all([fetchCart(), fetchWishlist()]);
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      setCartItems([]);
      setCartTotal(0);
      setWishlistItems([]);
    } finally {
      if (mountedRef.current) setIsLoading(false);
    }
  }, [fetchCart, fetchWishlist]);

  // Runs exactly once on mount to restore session from localStorage.
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (email, password) => {
      setAuthActionLoading(true);
      try {
        const res = await api.post("/api/login", { email, password });
        const newToken = res.data.data;
        const userData = res.data.user;

        localStorage.setItem("token", newToken);
        localStorage.setItem("userRole", userData.roll || "user");

        setUser(userData);
        setToken(newToken);
        setIsAuthenticated(true);

        // Cart & wishlist are fetched immediately after login so the
        // header badges update the instant login succeeds — no refresh
        // needed.
        await Promise.all([fetchCart(), fetchWishlist()]);

        return { success: true, user: userData };
      } catch (error) {
        console.error("Login failed:", error);
        return {
          success: false,
          error: error.response?.data?.message || "Login failed",
        };
      } finally {
        if (mountedRef.current) setAuthActionLoading(false);
      }
    },
    [fetchCart, fetchWishlist]
  );

  const register = useCallback(async (userData) => {
    setAuthActionLoading(true);
    try {
      const res = await api.post("/api/create", userData);
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    } finally {
      if (mountedRef.current) setAuthActionLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("addressId");
    localStorage.removeItem("paymentMethod");

    // Clear every piece of global state immediately — this is what makes
    // the header badges disappear the instant you log out, with no
    // leftover cart/wishlist data from the previous session.
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setCartItems([]);
    setCartTotal(0);
    setWishlistItems([]);

    router.push("/login");
  }, [router]);

  const updateUser = useCallback((updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  }, []);

  // ===========================================================================
  // CONTEXT VALUE — memoized so consumers don't re-render (or re-run
  // useEffects that depend on these functions) on every keystroke elsewhere
  // in the tree. This is what actually prevents the "sometimes the provider
  // isn't working" / runaway re-render symptoms.
  // ===========================================================================
  const value = useMemo(
    () => ({
      // auth
      user,
      token,
      setUser,
      isLoading, // true only during the initial session bootstrap
      isAuthenticated,
      isAuthLoading: authActionLoading, // true only while login/register is in flight
      login,
      register,
      logout,
      checkAuth,
      updateUser,

      // cart
      cartItems,
      cartCount,
      cartTotal,
      cartLoading,
      fetchCart,
      refreshCart: fetchCart, // alias requested for the standard hook shape
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isInCart,

      // wishlist
      wishlistItems,
      wishlistCount,
      wishlistLoading,
      fetchWishlist,
      refreshWishlist: fetchWishlist, // alias requested for the standard hook shape
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
      isInWishlist,
    }),
    [
      user,
      token,
      isLoading,
      isAuthenticated,
      authActionLoading,
      login,
      register,
      logout,
      checkAuth,
      updateUser,
      cartItems,
      cartCount,
      cartTotal,
      cartLoading,
      fetchCart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isInCart,
      wishlistItems,
      wishlistCount,
      wishlistLoading,
      fetchWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
      isInWishlist,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Kept as the original hook name so every existing page (`useApp`) keeps
// working without a mass rename.
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// Alias matching the `useAppContext()` shape requested in the spec — same
// context, same object, just a second name so both styles work.
export const useAppContext = useApp;

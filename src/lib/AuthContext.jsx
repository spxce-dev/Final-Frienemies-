import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

/**
 * Base44 Auth removed.
 * This storefront is public and does not require app_id / tokens.
 * We keep the same API (useAuth) so the rest of the app doesn't crash.
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user] = useState(null);

  // No auth / no public settings in headless Woo build
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: false,
      isLoadingAuth: false,
      isLoadingPublicSettings: false,
      authError: null,
      logout: () => {},
      navigateToLogin: () => {},
    }),
    [user]
  );

  // keep interface parity
  useEffect(() => {}, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      isAuthenticated: false,
      isLoadingAuth: false,
      isLoadingPublicSettings: false,
      authError: null,
      logout: () => {},
      navigateToLogin: () => {},
    };
  }
  return ctx;
}

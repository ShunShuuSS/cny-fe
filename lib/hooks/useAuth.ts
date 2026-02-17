import { useState, useEffect } from "react";
import * as api from "../api";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    loading: true, // Start with loading true to check auth on mount
    error: null,
  });

  // Check auth status on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await api.get("/api/admin/invitations");
        setState({ isAuthenticated: true, loading: false, error: null });
      } catch {
        setState({ isAuthenticated: false, loading: false, error: null });
      }
    };
    verifyAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await api.post("/api/admin/auth/login", { email, password });
      setState({ isAuthenticated: true, loading: false, error: null });
      return true;
    } catch (error) {
      setState({
        isAuthenticated: false,
        loading: false,
        error: error instanceof Error ? error.message : "Login failed",
      });
      return false;
    }
  };

  const logout = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      await api.post("/api/admin/auth/logout");
      setState({ isAuthenticated: false, loading: false, error: null });
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const checkAuth = async () => {
    try {
      await api.get("/api/admin/invitations");
      setState((prev) => ({ ...prev, isAuthenticated: true }));
      return true;
    } catch {
      setState((prev) => ({ ...prev, isAuthenticated: false }));
      return false;
    }
  };

  return {
    ...state,
    login,
    logout,
    checkAuth,
  };
}

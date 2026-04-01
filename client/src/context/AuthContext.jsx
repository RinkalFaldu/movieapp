import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, signupUser } from "../api/authApi.js";

const AuthContext = createContext(null);
const storageKey = "cinestack-auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : { token: "", user: null };
  });
  const [loading, setLoading] = useState(Boolean(auth.token));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    async function hydrate() {
      if (!auth.token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser(auth.token);
        setAuth((current) => ({ ...current, user: response.user }));
      } catch {
        setAuth({ token: "", user: null });
      } finally {
        setLoading(false);
      }
    }

    hydrate();
  }, [auth.token]);

  async function login(formValues) {
    const response = await loginUser(formValues);
    setAuth({ token: response.token, user: response.user });
    return response.user;
  }

  async function signup(formValues) {
    const response = await signupUser(formValues);
    setAuth({ token: response.token, user: response.user });
    return response.user;
  }

  function logout() {
    setAuth({ token: "", user: null });
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        loading,
        isAuthenticated: Boolean(auth.token),
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

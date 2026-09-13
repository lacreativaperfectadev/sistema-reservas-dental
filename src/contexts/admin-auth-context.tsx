import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { sha256, generateToken, saveSession, getSession, clearSession } from "../utils/auth-utils";

const ADMIN_PASSWORD_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"; // sha256("admin")

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check session on mount
  useEffect(() => {
    const session = getSession();
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  async function login(password: string): Promise<boolean> {
    const passwordHash = await sha256(password);
    if (passwordHash === ADMIN_PASSWORD_HASH) {
      const token = generateToken();
      saveSession(password, token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout() {
    clearSession();
    setIsAuthenticated(false);
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}

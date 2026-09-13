import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { sha256, generateToken, saveSession, getSession, clearSession } from "../utils/auth-utils";

const ADMIN_PASSWORD_HASH = "8d969eef6ecad3c29a3a873fba1fda4b1f67e9c67a02e2f72e94b91d87f77f9e"; // sha256("admin")

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

import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  signInWithPassword: (
    password: string
  ) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing authentication on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuthenticated");
    const expiry = sessionStorage.getItem("adminSessionExpiry");
    const now = Date.now();
    if (authStatus === "true" && expiry && Number(expiry) > now) {
      setIsAuthenticated(true);
    } else {
      sessionStorage.removeItem("adminAuthenticated");
      sessionStorage.removeItem("adminSessionExpiry");
    }
  }, []);

  // Simple SHA-256 helper
  const sha256 = async (text: string): Promise<string> => {
    const data = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const getLockoutInfo = () => {
    const attempts = Number(localStorage.getItem("adminFailedAttempts") || "0");
    const until = Number(localStorage.getItem("adminLockoutUntil") || "0");
    return { attempts, until };
  };

  const setLockoutInfo = (attempts: number, until: number) => {
    localStorage.setItem("adminFailedAttempts", String(attempts));
    localStorage.setItem("adminLockoutUntil", String(until));
  };

  const clearLockout = () => {
    localStorage.removeItem("adminFailedAttempts");
    localStorage.removeItem("adminLockoutUntil");
  };

  const signInWithPassword: AdminAuthContextType["signInWithPassword"] = async (
    password
  ) => {
    const { attempts, until } = getLockoutInfo();
    const now = Date.now();
    if (until && now < until) {
      const remaining = Math.ceil((until - now) / 1000);
      return {
        ok: false,
        message: `Too many attempts. Try again in ${remaining}s.`,
      };
    }

    const expectedHash = import.meta.env.VITE_ADMIN_PASS_HASH as
      | string
      | undefined;
    if (!expectedHash) {
      return { ok: false, message: "Missing VITE_ADMIN_PASS_HASH" };
    }
    const computed = await sha256(password);
    if (computed.toLowerCase() === expectedHash.toLowerCase()) {
      const hours = Number(import.meta.env.VITE_ADMIN_SESSION_HOURS || "12");
      const expiry = Date.now() + hours * 60 * 60 * 1000;
      sessionStorage.setItem("adminAuthenticated", "true");
      sessionStorage.setItem("adminSessionExpiry", String(expiry));
      setIsAuthenticated(true);
      clearLockout();
      return { ok: true };
    }

    const nextAttempts = attempts + 1;
    if (nextAttempts >= 5) {
      setLockoutInfo(0, now + 2 * 60 * 1000);
      return { ok: false, message: "Too many attempts. Locked for 2 minutes." };
    }
    setLockoutInfo(nextAttempts, 0);
    return { ok: false, message: "Invalid credentials." };
  };

  const signOut = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuthenticated");
    sessionStorage.removeItem("adminSessionExpiry");
  };

  const value = {
    isAuthenticated,
    signInWithPassword,
    signOut,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

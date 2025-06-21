import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import authService from "../services/authService";
import type {
  AuthContextType,
  AuthState,
  User,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordData,
  ChangePasswordData,
  UserProfile,
  UserPreferences,
} from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        if (firebaseUser) {
          // For demo purposes, create a simplified user object
          const user: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || undefined,
            photoURL: firebaseUser.photoURL || undefined,
            emailVerified: firebaseUser.emailVerified,
            createdAt: new Date(),
            lastLoginAt: new Date(),
          };

          setAuthState({
            user,
            loading: false,
            error: null,
            isAuthenticated: true,
          });
        } else {
          setAuthState({
            user: null,
            loading: false,
            error: null,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setAuthState({
          user: null,
          loading: false,
          error:
            error instanceof Error ? error.message : "Failed to load user data",
          isAuthenticated: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const user = await authService.login(credentials);
      setAuthState((prev) => ({ ...prev, loading: false }));
      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<User> => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const user = await authService.register(credentials);
      setAuthState((prev) => ({ ...prev, loading: false }));
      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await authService.logout();
      setAuthState({
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const resetPassword = async (data: ResetPasswordData): Promise<void> => {
    setAuthState((prev) => ({ ...prev, error: null }));

    try {
      await authService.resetPassword(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Password reset failed";
      setAuthState((prev) => ({ ...prev, error: errorMessage }));
      throw error;
    }
  };

  const changePassword = async (data: ChangePasswordData): Promise<void> => {
    setAuthState((prev) => ({ ...prev, error: null }));

    try {
      await authService.changePassword(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Password change failed";
      setAuthState((prev) => ({ ...prev, error: errorMessage }));
      throw error;
    }
  };

  const updateProfile = async (
    profile: Partial<UserProfile>
  ): Promise<void> => {
    try {
      await authService.updateProfile(profile);
      // Profile updates will be reflected on next auth state change
    } catch (error) {
      throw error;
    }
  };

  const updatePreferences = async (
    preferences: Partial<UserPreferences>
  ): Promise<void> => {
    try {
      await authService.updatePreferences(preferences);
      // Preferences updates will be reflected on next auth state change
    } catch (error) {
      throw error;
    }
  };

  const resendVerification = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, error: null }));

    try {
      await authService.resendVerification();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to resend verification";
      setAuthState((prev) => ({ ...prev, error: errorMessage }));
      throw error;
    }
  };

  const deleteAccount = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await authService.deleteAccount();
      setAuthState({
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Account deletion failed";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const value: AuthContextType = {
    authState,
    login,
    register,
    logout,
    resetPassword,
    changePassword,
    updateProfile,
    updatePreferences,
    resendVerification,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

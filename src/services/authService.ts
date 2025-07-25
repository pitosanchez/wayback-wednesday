import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  sendEmailVerification,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  type User as FirebaseUser,
  type UserCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordData,
  ChangePasswordData,
  UserProfile,
  UserPreferences,
} from "../types/auth";

class AuthService {
  // Convert Firebase user to our User type
  async convertFirebaseUser(firebaseUser: FirebaseUser): Promise<User> {
    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
    const userData = userDoc.data() as Record<string, unknown> | undefined;

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
      emailVerified: firebaseUser.emailVerified,
      createdAt: (userData?.createdAt as { toDate: () => Date })?.toDate() || new Date(),
      lastLoginAt: new Date(),
      preferences: userData?.preferences as UserPreferences | undefined,
      profile: userData?.profile as UserProfile | undefined,
    };
  }

  // Register new user
  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      // Validate passwords match
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Create user account
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );

      const firebaseUser = userCredential.user;

      // Update display name if provided
      if (credentials.firstName || credentials.lastName) {
        const displayName = `${credentials.firstName || ""} ${
          credentials.lastName || ""
        }`.trim();
        await updateProfile(firebaseUser, { displayName });
      }

      // Create user document in Firestore
      const userProfile: UserProfile = {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        marketingOptIn: credentials.marketingOptIn || false,
      };

      const userPreferences: UserPreferences = {
        theme: "auto",
        language: "en",
        currency: "USD",
        notifications: {
          email: {
            orderUpdates: true,
            promotions: credentials.marketingOptIn || false,
            newsletter: credentials.marketingOptIn || false,
            restockAlerts: false,
          },
          push: {
            orderUpdates: true,
            promotions: false,
            cartReminders: true,
          },
        },
      };

      await setDoc(doc(db, "users", firebaseUser.uid), {
        email: credentials.email,
        profile: userProfile,
        preferences: userPreferences,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      });

      // Send email verification
      await sendEmailVerification(firebaseUser);

      return this.convertFirebaseUser(firebaseUser);
    } catch (error: unknown) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      // Update last login time
      await updateDoc(doc(db, "users", userCredential.user.uid), {
        lastLoginAt: new Date(),
      });

      return this.convertFirebaseUser(userCredential.user);
    } catch (error: unknown) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: unknown) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Reset password
  async resetPassword(data: ResetPasswordData): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, data.email);
    } catch (error: unknown) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Change password
  async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        throw new Error("No user is currently logged in");
      }

      if (data.newPassword !== data.confirmPassword) {
        throw new Error("New passwords do not match");
      }

      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        data.currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, data.newPassword);
    } catch (error: unknown) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Update user profile
  async updateProfile(profileData: Partial<UserProfile>): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is currently logged in");
      }

      // Update display name in Firebase Auth if first/last name changed
      if (
        profileData.firstName !== undefined ||
        profileData.lastName !== undefined
      ) {
        const currentDoc = await getDoc(doc(db, "users", user.uid));
        const currentData = currentDoc.data() as Record<string, unknown> | undefined;
        const currentProfile = (currentData?.profile as UserProfile) || {};

        const firstName = profileData.firstName ?? currentProfile.firstName;
        const lastName = profileData.lastName ?? currentProfile.lastName;
        const displayName = `${firstName || ""} ${lastName || ""}`.trim();

        if (displayName) {
          await updateProfile(user, { displayName });
        }
      }

      // Update profile in Firestore
      await updateDoc(doc(db, "users", user.uid), {
        [`profile`]: profileData,
      });
    } catch (error: unknown) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Update user preferences
  async updatePreferences(
    preferencesData: Partial<UserPreferences>
  ): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is currently logged in");
      }

      await updateDoc(doc(db, "users", user.uid), {
        preferences: preferencesData,
      });
    } catch (error: unknown) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Resend email verification
  async resendVerification(): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is currently logged in");
      }

      await sendEmailVerification(user);
    } catch (error: unknown) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Delete user account
  async deleteAccount(): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is currently logged in");
      }

      // Delete user document from Firestore
      await updateDoc(doc(db, "users", user.uid), {
        deletedAt: new Date(),
        active: false,
      });

      // Delete Firebase Auth account
      await deleteUser(user);
    } catch (error: unknown) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Get current user
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  // Helper method to convert Firebase errors to user-friendly messages
  private getErrorMessage(error: unknown): string {
    // Type guard to check if error has the expected Firebase error structure
    const isFirebaseError = (err: unknown): err is { code: string; message?: string } => {
      return typeof err === 'object' && err !== null && 'code' in err && typeof (err as Record<string, unknown>).code === 'string';
    };

    if (!isFirebaseError(error)) {
      if (error instanceof Error) {
        return error.message || "An unexpected error occurred. Please try again.";
      }
      return "An unexpected error occurred. Please try again.";
    }

    const firebaseError = error;
    switch (firebaseError.code) {
      case "auth/user-not-found":
        return "No account found with this email address.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/weak-password":
        return "Password should be at least 6 characters long.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection and try again.";
      case "auth/requires-recent-login":
        return "Please log in again to complete this action.";
      default:
        return (
          firebaseError.message || "An unexpected error occurred. Please try again."
        );
    }
  }
}

export const authService = new AuthService();
export default authService;

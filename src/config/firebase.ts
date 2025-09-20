import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { logger } from "../utils/logger";

// Firebase configuration with fallback to demo values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "wayback-wednesday-demo.firebaseapp.com",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID || "wayback-wednesday-demo",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "wayback-wednesday-demo.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdefghijklmnop",
};

// Validate configuration in production
if (import.meta.env.PROD && firebaseConfig.apiKey === "demo-api-key") {
  console.warn(
    "⚠️ Warning: Using demo Firebase configuration in production mode. Please configure environment variables."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// For development/demo purposes, we'll use emulators
// In production, remove these lines
const isDevelopment = import.meta.env.DEV;

if (isDevelopment) {
  try {
    // Connect to Firebase emulators if running locally
    // Note: These will only connect once, subsequent calls are ignored
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(db, "localhost", 8080);
    connectStorageEmulator(storage, "localhost", 9199);
  } catch {
    // Emulators already connected or not available
    logger.info("Firebase emulators not available, using production services");
  }
}

// Auth configuration
auth.useDeviceLanguage(); // Use device language for auth UI

export default app;

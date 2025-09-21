import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized - No token provided" });
    return;
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
    return;
  }
};

export const adminMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // First check if user is authenticated
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    // Check if user has admin role in Firestore
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(req.user.uid)
      .get();

    const userData = userDoc.data();

    if (!userData || userData.role !== "admin") {
      res.status(403).json({ error: "Forbidden - Admin access required" });
      return;
    }

    next();
  } catch (error) {
    console.error("Admin check failed:", error);
    res.status(500).json({ error: "Failed to verify admin status" });
    return;
  }
};

import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { stripeRouter } from "./routes/stripe";
import { ordersRouter } from "./routes/orders";
import { webhookRouter } from "./routes/webhooks";
import { errorHandler } from "./middleware/errorHandler";
import { authMiddleware } from "./middleware/auth";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// Stripe webhook needs raw body
app.use("/api/webhooks/stripe", express.raw({ type: "application/json" }));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/stripe", stripeRouter);
app.use("/api/orders", authMiddleware, ordersRouter);
app.use("/api/webhooks", webhookRouter);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔒 CORS enabled for: ${corsOptions.origin}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
});

import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
// import bodyParser from "body-parser"; // not needed here; raw used on specific route
import { Resend } from "resend";
import { stripeRouter } from "./routes/stripe";
import { ordersRouter } from "./routes/orders";
import { webhookRouter } from "./routes/webhooks";
import { errorHandler } from "./middleware/errorHandler";
import { authMiddleware } from "./middleware/auth";
import Stripe from "stripe";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration: allow Vercel preview domains, prod domain, and local dev
const allowedOrigins = [
  /\.vercel\.app$/,
  "https://gbothepro.com",
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean) as (string | RegExp)[];

const corsOptions = {
  origin: allowedOrigins,
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

// ---------- Resend contact form ----------
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : undefined;

app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const { email, name, message } = req.body as {
      email?: string;
      name?: string;
      message?: string;
    };
    if (!resend) {
      return res
        .status(503)
        .json({ ok: false, error: "Email service not configured" });
    }
    if (!email || !name || !message) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }
    const from = process.env.EMAIL_FROM || "noreply@gbothepro.com";
    const to = process.env.CONTACT_TO || "gbothepro1@gmail.com";
    await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New contact from ${name}`,
      text: message,
    });
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false });
  }
});

// ---------- Stripe checkout session (priceId-based) ----------
// Keep JSON body parser for this route
app.post(
  "/api/checkout/session",
  express.json(),
  async (req: Request, res: Response) => {
    try {
      const {
        priceId,
        quantity = 1,
        successUrl,
        cancelUrl,
      } = req.body as {
        priceId?: string;
        quantity?: number;
        successUrl?: string;
        cancelUrl?: string;
      };
      if (!priceId) {
        return res.status(400).json({ error: "Missing priceId" });
      }
      const stripeSecret = process.env.STRIPE_SECRET_KEY;
      if (!stripeSecret) {
        return res.status(503).json({ error: "Stripe not configured" });
      }
      const stripe = new Stripe(stripeSecret, { apiVersion: "2023-10-16" });
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price: priceId, quantity }],
        success_url:
          successUrl ||
          "https://gbothepro.com/thank-you?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: cancelUrl || "https://gbothepro.com/cancelled",
      });
      return res.json({ url: session.url });
    } catch (err) {
      console.error("Checkout session error", err);
      return res.status(500).json({ error: "Failed to create session" });
    }
  }
);

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

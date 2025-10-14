import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string().default("3001"),

  // Supabase
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_KEY: z.string().min(1),

  // Database
  DATABASE_URL: z.string().url(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),

  // Resend (Email)
  RESEND_API_KEY: z.string().startsWith("re_"),
  EMAIL_FROM: z.string().min(1),
  CONTACT_TO: z.string().email(),
  ALLOWED_TEST_EMAILS: z.string().optional(),

  // Frontend
  FRONTEND_URL: z.string().url(),

  // Optional
  API_BASE_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

// Validate and export
export const env = EnvSchema.parse(process.env);

// Log configuration (without sensitive data)
console.log("✅ Environment validated successfully");
console.log(`📍 Environment: ${env.NODE_ENV}`);
console.log(`🌐 Frontend URL: ${env.FRONTEND_URL}`);
console.log(`📧 Email From: ${env.EMAIL_FROM}`);
if (env.ALLOWED_TEST_EMAILS) {
  console.log(`🧪 Allowed test recipients: ${env.ALLOWED_TEST_EMAILS}`);
}

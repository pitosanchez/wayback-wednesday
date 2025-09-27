import { Router, type Request, type Response } from "express";
import { Resend } from "resend";

const router = Router();

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : undefined;

router.post("/", async (req: Request, res: Response) => {
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

    const from = process.env.EMAIL_FROM || "noreply@gbothepro.com"; // must be a verified sending domain
    const to = process.env.CONTACT_TO || "gbothepro1@gmail.com"; // recipient

    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: "Website Contact Form",
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    });

    return res.status(200).json(result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(400).json({ ok: false, error: String(error) });
  }
});

export { router as contactRouter };

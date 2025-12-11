const API_BASE = import.meta.env.VITE_API_URL as string;

if (!API_BASE) {
  // eslint-disable-next-line no-console
  console.warn("VITE_API_URL is not set; API requests will fail.");
}

export async function createCheckoutSession(params: {
  priceId: string;
  quantity?: number;
  successUrl?: string;
  cancelUrl?: string;
}): Promise<{ url: string }> {
  const res = await fetch(`${API_BASE}/api/checkout/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Checkout session failed: ${res.status} ${text}`);
  }
  return (await res.json()) as { url: string };
}

export async function sendContact(payload: {
  email: string;
  name: string;
  message: string;
}): Promise<{ ok: boolean }> {
  if (!API_BASE) {
    throw new Error(
      "API URL is not configured. Please set VITE_API_URL environment variable."
    );
  }

  const url = new URL(`${API_BASE}/api/contact`);
  const testTo = import.meta.env.VITE_TEST_EMAIL as string | undefined;
  if (testTo) url.searchParams.set("testTo", testTo);

  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errorMessage = `Contact submission failed (${res.status})`;
      try {
        const errorData = await res.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        const text = await res.text();
        if (text) errorMessage = text;
      }
      throw new Error(errorMessage);
    }

    return (await res.json()) as { ok: boolean };
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error(
        "Unable to connect to the server. Please check your internet connection and try again."
      );
    }
    throw error;
  }
}

export default {
  createCheckoutSession,
  sendContact,
};

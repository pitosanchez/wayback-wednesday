export function generateId(): string {
  // Prefer native UUID if available
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyCrypto = typeof crypto !== "undefined" ? (crypto as any) : null;
    if (anyCrypto?.randomUUID) {
      return anyCrypto.randomUUID();
    }
  } catch {
    // ignore and fall back
  }

  // Fallback: crypto.getRandomValues-based UUID v4
  try {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      // Per RFC 4122 section 4.4
      bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
      bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
      const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
      return (
        hex.slice(0, 4).join("") +
        hex.slice(4, 6).join("") +
        hex.slice(6, 8).join("") +
        hex.slice(8, 10).join("") +
        hex.slice(10, 16).join("")
      ).replace(/^(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/, "$1-$2-$3-$4-$5");
    }
  } catch {
    // ignore and fall back
  }

  // Last resort: time+random
  return `id_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

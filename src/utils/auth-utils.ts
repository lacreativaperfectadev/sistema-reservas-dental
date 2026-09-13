// SHA256 hash usando Web Crypto API
export async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Token generation
export function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

// Session storage helpers
export function saveSession(password: string, token: string, expiryMinutes = 30) {
  const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
  localStorage.setItem("adminSession", JSON.stringify({
    password,
    token,
    expiryTime,
  }));
}

export function getSession(): { password: string; token: string } | null {
  const sessionStr = localStorage.getItem("adminSession");
  if (!sessionStr) return null;

  const session = JSON.parse(sessionStr);
  if (Date.now() > session.expiryTime) {
    localStorage.removeItem("adminSession");
    return null;
  }

  return { password: session.password, token: session.token };
}

export function clearSession() {
  localStorage.removeItem("adminSession");
}

// Database-free enquiry helpers: reference ID + client-side rate limiting.

export function generateReferenceId(prefix = "PI"): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${yyyy}${mm}${dd}-${rand}`;
}

/**
 * Simple localStorage-backed rate limiter. Returns true when allowed.
 * Default: max 3 submissions per 10 minutes per bucket.
 */
export function checkClientRateLimit(
  bucket: string,
  { max = 3, windowMs = 10 * 60 * 1000 }: { max?: number; windowMs?: number } = {},
): { allowed: boolean; retryAfterSec: number } {
  if (typeof window === "undefined") return { allowed: true, retryAfterSec: 0 };
  const key = `pi_rl_${bucket}`;
  const now = Date.now();
  let times: number[] = [];
  try {
    times = JSON.parse(window.localStorage.getItem(key) || "[]");
    if (!Array.isArray(times)) times = [];
  } catch {
    times = [];
  }
  times = times.filter((t) => now - t < windowMs);
  if (times.length >= max) {
    const retryAfterSec = Math.ceil((windowMs - (now - times[0])) / 1000);
    return { allowed: false, retryAfterSec };
  }
  times.push(now);
  try {
    window.localStorage.setItem(key, JSON.stringify(times));
  } catch {
    /* ignore quota errors */
  }
  return { allowed: true, retryAfterSec: 0 };
}

/** Opens the user's mail client with a pre-composed enquiry. */
export function openMailto({ to, subject, body }: { to: string; subject: string; body: string }) {
  const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}

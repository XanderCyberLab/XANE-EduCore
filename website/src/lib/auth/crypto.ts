import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SCRYPT_KEY_LENGTH = 64;
const SCRYPT_PARAMS = {
  N: 16384,
  r: 8,
  p: 1,
};

export function hashSecret(secret: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(secret, salt, SCRYPT_KEY_LENGTH, SCRYPT_PARAMS).toString("hex");

  return `scrypt$${SCRYPT_PARAMS.N}$${SCRYPT_PARAMS.r}$${SCRYPT_PARAMS.p}$${salt}$${derivedKey}`;
}

export function verifySecret(secret: string, storedHash: string | null | undefined) {
  if (!storedHash) {
    return false;
  }

  const [algorithm, n, r, p, salt, expectedHex] = storedHash.split("$");

  if (algorithm !== "scrypt" || !n || !r || !p || !salt || !expectedHex) {
    return false;
  }

  const derivedKey = scryptSync(secret, salt, SCRYPT_KEY_LENGTH, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  });

  const expected = Buffer.from(expectedHex, "hex");

  if (expected.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(expected, derivedKey);
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

export function normalizePin(pin: string) {
  return pin.replace(/\D/g, "").slice(0, 8);
}

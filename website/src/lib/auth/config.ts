export const authConfig = {
  secret: process.env.AUTH_SECRET,
  parentCookieName: "educore_parent_session",
  childCookieName: "educore_child_session",
  parentSessionMaxAge: 60 * 60 * 24 * 14,
  childSessionMaxAge: 60 * 60 * 12,
  issuer: "educore",
} as const;

export function requireAuthSecret() {
  if (!authConfig.secret) {
    throw new Error("AUTH_SECRET is required before auth flows can run.");
  }

  return authConfig.secret;
}

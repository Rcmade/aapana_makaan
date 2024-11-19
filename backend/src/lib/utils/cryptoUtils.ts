import crypto from "crypto";

export function generateHash(data: any) {
  const productString = JSON.stringify(data); // Sort for consistent hash
  return crypto.createHash("sha256").update(productString).digest("hex");
}

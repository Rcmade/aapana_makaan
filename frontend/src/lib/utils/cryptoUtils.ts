import crypto from "crypto";

export const generateSHA1 = (data: any) => {
  const dataString = JSON.stringify(data);
  const hash = crypto.createHash("sha1");
  hash.update(dataString);
  return hash.digest("hex");
};

export function verifyRazorpaySignature(data: any, signature: string) {
  const dataString = JSON.stringify(data);

  // Generate the HMAC SHA256 hash
  const expected_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!!)
    .update(dataString)
    .digest("hex");
  // Compare the generated signature with the received signature
  return expected_signature === signature;
}

export const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

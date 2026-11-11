// MSG91 Widget access-token verification; never expose the AuthKey to the browser.
const VERIFY_URL = 'https://control.msg91.com/api/v5/widget/verifyAccessToken';

export function normalizeIndiaMobile(value) {
  const digits = String(value ?? '').replace(/[\s()+-]/g, '');
  if (/^[6-9]\d{9}$/.test(digits)) return `91${digits}`;
  if (/^91[6-9]\d{9}$/.test(digits)) return digits;
  return null;
}

export function createMsg91Verifier({ authKey, fetchImpl = fetch }) {
  if (!authKey) throw new Error('MSG91_AUTHKEY is required when MSG91_OTP_REQUIRED=true');
  return async function verifyOtpAccessToken(accessToken, expectedPhone) {
    if (typeof accessToken !== 'string' || accessToken.length < 20 || accessToken.length > 4096) return false;
    const expected = normalizeIndiaMobile(expectedPhone);
    if (!expected) return false;
    const response = await fetchImpl(VERIFY_URL, {
      method: 'POST',
      headers: { 'authkey': authKey, 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'access-token': accessToken }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return false;
    const result = await response.json();
    // The MSG91 success response has type=success and message=verified identifier.
    // Fail closed on non-phone identifiers, missing fields or error bodies.
    if (!result || result.type !== 'success') return false;
    return normalizeIndiaMobile(result.message) === expected;
  };
}

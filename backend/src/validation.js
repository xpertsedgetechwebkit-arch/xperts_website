import { z } from 'zod';

const safeText = (max) => z.string().trim().max(max);
const optionalText = (max) => safeText(max).optional().default('');

// Preserve international numbers; validate Indian mobile numbers at the API boundary too.
// Contact form's phone field remains optional.
const validIndianPhone = (phone) => {
  if (!phone) return true;
  if (phone.startsWith('+91')) return /^\+91\s*[6-9][0-9]{9}$/.test(phone);
  if (!phone.startsWith('+')) return /^[6-9][0-9]{9}$/.test(phone);
  return true;
};

export const leadSchema = z.object({
  // The website generates this once for a repeated submit attempt.
  leadId: z.string().uuid(),
  otpAccessToken: optionalText(4096), // Verified with MSG91 server-side when OTP is enabled.
  formType: z.enum(['contact', 'free_demo', 'registration', 'careers']),
  name: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(254),
  phone: optionalText(32).refine(validIndianPhone, { message: 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9' }),
  company: optionalText(200),
  course: optionalText(200),
  subject: optionalText(250),
  message: optionalText(5000),
  website: optionalText(150), // Honeypot: silently reject bot-filled submissions.
  attribution: z.object({
    utm_source: optionalText(150),
    utm_medium: optionalText(150),
    utm_campaign: optionalText(150),
    utm_content: optionalText(150),
    utm_term: optionalText(150),
    landing_page: optionalText(400),
    referrer_url: optionalText(400),
  }).strict().optional().default({}),
}).strict();

export function validateLead(input) {
  const result = leadSchema.safeParse(input);
  if (!result.success) return { success: false };
  return { success: true, data: result.data };
}

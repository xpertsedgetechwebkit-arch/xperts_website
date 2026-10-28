import { z } from 'zod';

const safeText = (max) => z.string().trim().max(max);
const optionalText = (max) => safeText(max).optional().default('');

export const leadSchema = z.object({
  // The website generates this once for a repeated submit attempt.
  leadId: z.string().uuid(),
  formType: z.enum(['contact', 'free_demo', 'registration', 'careers']),
  name: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(254),
  phone: optionalText(32),
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

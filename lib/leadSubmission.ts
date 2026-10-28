/**
 * Patch 02A/02B/02C: Contact, Demo, Registration popup and Careers. Web3Forms remains unchanged.
 * Database syncing is an explicit opt-in so that an undeployed production API
 * never silently breaks the live website.
 *
 * NEXT_PUBLIC_LEADS_DB_ENABLED=true (build-time)
 * NEXT_PUBLIC_LEADS_API_URL=http://127.0.0.1:3001/api/leads (local)
 * Production API URL: /api/leads (after Nginx is configured).
 * No database credentials or private keys belong in client-side code.
 */
import { submitLead } from '@/lib/web3forms'
import { getLeadAttribution } from '@/lib/utmAttribution'

type LeadFormType = 'contact' | 'free_demo' | 'registration' | 'careers'

type FormFields = {
  name: string
  email: string
  phone?: string
  company?: string
  course?: string
  message: string
  subject?: string
}

export type LeadDelivery = {
  databaseSaved: boolean
  emailSent: boolean
  notice: string | null
}

async function saveToDatabase(fields: FormFields, formType: LeadFormType, leadId: string): Promise<void> {
  const url = process.env.NEXT_PUBLIC_LEADS_API_URL?.trim() || '/api/leads'
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12000)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId,
        formType,
        name: fields.name,
        email: fields.email,
        phone: fields.phone || '',
        company: fields.company || '',
        course: fields.course || '',
        subject: fields.subject || '',
        message: fields.message,
        website: '',
        attribution: getLeadAttribution(),
      }),
      signal: controller.signal,
    })
    const result = (await response.json().catch(() => ({}))) as { success?: boolean }
    if (!response.ok || result.success !== true) {
      throw new Error('Database lead delivery failed')
    }
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Tries the database AND Web3Forms, reporting partial success clearly.
 * Use formType 'registration' for popup and 'careers' for job applications.
 * When the opt-in flag is OFF the original Web3Forms behavior is preserved.
 * leadId should stay constant across retries to prevent duplicate DB inserts.
 */
export async function submitContactOrDemoLead(
  fields: FormFields,
  formType: LeadFormType,
  leadId: string
): Promise<LeadDelivery> {
  const databaseEnabled = process.env.NEXT_PUBLIC_LEADS_DB_ENABLED === 'true'
  let databaseSaved = false
  let emailSent = false
  let emailError: Error | null = null

  if (databaseEnabled) {
    try {
      await saveToDatabase(fields, formType, leadId)
      databaseSaved = true
    } catch {
      // Never log student data, DB credentials, or raw API request details.
      console.warn('[XpertsEdge] Lead database delivery failed; trying email fallback.')
    }
  }

  try {
    await submitLead(fields)
    emailSent = true
  } catch (error) {
    emailError = error instanceof Error ? error : new Error('Email delivery failed.')
  }

  if (!databaseSaved && !emailSent) {
    // Preserve the existing user-visible Web3Forms error when DB is disabled.
    if (!databaseEnabled && emailError) throw emailError
    throw new Error('Unable to send your enquiry. Please try again or call our team.')
  }

  let notice: string | null = null
  if (databaseEnabled && !databaseSaved) {
    notice = 'Your enquiry was emailed to our team, but dashboard syncing is temporarily unavailable.'
  } else if (databaseEnabled && !emailSent) {
    notice = 'Your enquiry was saved successfully. The email notification could not be sent.'
  }
  return { databaseSaved, emailSent, notice }
}

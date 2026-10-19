// Web3Forms lead submission (client-side).
// The access key is a public key — Web3Forms requires the submit request to
// originate from the browser (server-side POST is blocked on the free plan).

export const WEB3FORMS_ACCESS_KEY = '1a0cdcf5-c78d-43a3-84af-0a18b6f8dfdd'

type LeadFields = {
  name: string
  email: string
  phone?: string
  company?: string
  course?: string
  message: string
  subject?: string
}

/**
 * Submits a lead to Web3Forms. Throws with a friendly message on failure.
 */
export async function submitLead(fields: LeadFields): Promise<void> {
  const payload: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: 'XpertsEdge Website',
    subject:
      fields.subject ||
      `New enquiry from ${fields.name}${fields.course ? ` — ${fields.course}` : ''}`,
    name: fields.name,
    email: fields.email,
    message: fields.message,
  }
  if (fields.phone) payload.phone = fields.phone
  if (fields.company) payload.company = fields.company
  if (fields.course) payload.course = fields.course

  let res: Response
  try {
    res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('Network error. Please check your connection and try again.')
  }

  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to send your message. Please try again later.')
  }
}

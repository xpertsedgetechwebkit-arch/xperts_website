// Shared client-side input sanitisers for lead / application forms.

/** Names: letters, spaces and dots only. */
export const filterName = (v: string) => v.replace(/[^a-zA-Z\s.]/g, '')

/** Default country dialling code shown as a prefix in phone inputs. */
export const DEFAULT_COUNTRY_CODE = '+91'

/** Indian mobile: digits only, up to 10; do not accept a leading digit outside 6–9. */
export const filterPhone = (v: string) => {
  const digits = v.replace(/\D/g, '')
  return digits && !/^[6-9]/.test(digits) ? '' : digits.slice(0, 10)
}

/** Prepend the country code before submitting so the stored value is internationalised. */
export const formatPhoneWithCode = (v: string, code = DEFAULT_COUNTRY_CODE) =>
  v ? `${code} ${v}` : ''

/** Email: always lowercase, no spaces. */
export const filterEmail = (v: string) => v.replace(/\s/g, '').toLowerCase()

/** Other course: strip all digits so only text can be entered. */
export const filterOtherCourse = (v: string) => v.replace(/[0-9]/g, '')

/** True when the URL points to Google Drive/Docs or LinkedIn. */
export const isResumeLinkValid = (v: string) =>
  /^https?:\/\/(www\.)?(drive\.google\.com|docs\.google\.com|linkedin\.com)\/\S+/i.test(
    v.trim()
  )

// Reusable HTML validation attributes for a 10-digit phone number.
export const phoneAttrs = {
  inputMode: 'numeric' as const,
  pattern: '[6-9][0-9]{9}',
  title: 'Enter a 10-digit Indian mobile number starting with 6, 7, 8, or 9',
  maxLength: 10,
  minLength: 10,
}

/** Must contain at least one letter — blocks all-numeric junk. */
export const hasLetterAttrs = {
  pattern: '.*[A-Za-z].*',
  title: 'Please enter a valid value',
}

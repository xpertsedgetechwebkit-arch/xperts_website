'use client'

/**
 * Opens the global RegistrationPopup form (mounted in the root layout) by
 * dispatching the "open-registration" event. Used where we want a lead form
 * instead of a direct action — e.g. the curriculum "Download PDF" button.
 */
export default function RegisterTrigger({
  className,
  children,
  ariaLabel,
}: {
  className?: string
  children: React.ReactNode
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => window.dispatchEvent(new Event('open-registration'))}
      className={className}
    >
      {children}
    </button>
  )
}

'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'

type Handler = (value: unknown) => void
type Msg91Config = {
  widgetId: string
  tokenAuth: string
  exposeMethods: true
  captchaRenderId: string
  success?: (data: unknown) => void
  failure?: (error: unknown) => void
}
declare global {
  interface Window {
    initSendOTP?: (config: Msg91Config) => void
    sendOtp?: (identifier: string, success?: Handler, failure?: Handler) => void
    retryOtp?: (channel: string | null, success?: Handler, failure?: Handler, reqId?: string) => void
    verifyOtp?: (otp: string, success?: Handler, failure?: Handler, reqId?: string) => void
    isCaptchaVerified?: () => boolean
  }
}

const widgetId = process.env.NEXT_PUBLIC_MSG91_WIDGET_ID || ''
const tokenAuth = process.env.NEXT_PUBLIC_MSG91_WIDGET_TOKEN || ''
let activeDialog = false

function extractAccessToken(value: unknown): string | null {
  if (typeof value === 'string') return value.length >= 20 ? value : null
  if (!value || typeof value !== 'object') return null
  const obj = value as Record<string, unknown>
  const token = obj['access-token'] || obj.accessToken || obj.token || obj.message
  return typeof token === 'string' && token.length >= 20 ? token : null
}
function extractRequestId(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  const obj = value as Record<string, unknown>
  return typeof obj.reqId === 'string' ? obj.reqId : typeof obj.message === 'string' ? obj.message : undefined
}
function errorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message.slice(0, 180)
  }
  return 'OTP request failed. Please check the phone number and try again.'
}

function Dialog({ phone, resolve, reject }: {
  phone: string
  resolve: (token: string) => void
  reject: (error: Error) => void
}) {
  const captchaId = `msg91-captcha-${useId().replace(/:/g, '')}`
  const [sdkReady, setSdkReady] = useState(false)
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [lastSent, setLastSent] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const requestId = useRef<string | undefined>(undefined)
  const [initializing, setInitializing] = useState(true)
  const completed = useRef(false)

  useEffect(() => {
    if (!widgetId || !tokenAuth) {
      setInitializing(false)
      setError('MSG91 Widget configuration is missing. Contact the website administrator.')
      return
    }
    let cancelled = false
    const initialize = () => {
      if (cancelled) return
      try {
        if (typeof window.initSendOTP !== 'function') throw new Error('MSG91 SDK unavailable.')
        window.initSendOTP({
          widgetId,
          tokenAuth,
          exposeMethods: true,
          captchaRenderId: captchaId,
          success: () => {},
          failure: () => {},
        })
        setSdkReady(true)
      } catch {
        setError('Could not initialize mobile verification. Please try again.')
      } finally { setInitializing(false) }
    }
    if (typeof window.initSendOTP === 'function') {
      initialize()
    } else {
      const script = document.createElement('script')
      script.src = 'https://verify.msg91.com/otp-provider.js'
      script.async = true
      script.onload = initialize
      script.onerror = () => {
        if (!cancelled) {
          setInitializing(false)
          setError('Could not load the OTP service. Check your internet connection.')
        }
      }
      document.head.appendChild(script)
    }
    return () => { cancelled = true }
  }, [captchaId])

  useEffect(() => {
    if (!sent) return
    const id = window.setInterval(() => setSeconds(Math.max(0, 60 - Math.floor((Date.now() - lastSent) / 1000))), 1000)
    return () => window.clearInterval(id)
  }, [lastSent, sent])

  const cancel = () => {
    if (completed.current) return
    completed.current = true
    reject(new Error('Mobile verification cancelled. No enquiry was submitted.'))
  }
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') cancel() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  const send = () => {
    if (!window.sendOtp || busy) return
    setError('')
    setBusy(true)
    window.sendOtp(phone,
      (response) => {
        requestId.current = extractRequestId(response)
        setSent(true)
        setLastSent(Date.now())
        setSeconds(60)
        setBusy(false)
      },
      (failure) => { setError(errorMessage(failure)); setBusy(false) }
    )
  }
  const resend = () => {
    if (!window.retryOtp || busy || seconds) return
    setError(''); setBusy(true)
    window.retryOtp(null,
      (response) => {
        requestId.current = extractRequestId(response) || requestId.current
        setLastSent(Date.now()); setSeconds(60); setBusy(false)
      },
      (failure) => { setError(errorMessage(failure)); setBusy(false) },
      requestId.current
    )
  }
  const verify = () => {
    if (!window.verifyOtp || !/^\d{6}$/.test(otp) || busy) return
    setError(''); setBusy(true)
    window.verifyOtp(otp,
      (response) => {
        const token = extractAccessToken(response)
        if (!token) {
          setError('OTP response did not include a verification token.')
          setBusy(false)
          return
        }
        if (!completed.current) {
          completed.current = true
          resolve(token)
        }
      },
      (failure) => { setError(errorMessage(failure)); setBusy(false) },
      requestId.current
    )
  }

  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/70 p-4" role="presentation">
      <section role="dialog" aria-modal="true" aria-label="Verify mobile number" className="w-full max-w-md rounded-2xl border border-border bg-background p-6 text-foreground shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Verify your mobile number</h2>
            <p className="mt-2 text-sm text-muted-foreground">We will send a 6-digit SMS OTP to +{phone}. Your enquiry is submitted only after verification.</p>
          </div>
          <button type="button" onClick={cancel} aria-label="Cancel OTP verification" className="text-2xl leading-none text-muted-foreground hover:text-foreground">×</button>
        </div>
        <div id={captchaId} className="my-4 min-h-4" />
        {error && <p role="alert" className="my-3 text-sm text-red-500">{error}</p>}
        {!sent ? (
          <button type="button" onClick={send} disabled={!sdkReady || busy} className="mt-3 w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-50">
            {initializing ? 'Loading OTP service…' : busy ? 'Sending…' : 'Send SMS OTP'}
          </button>
        ) : (
          <div className="mt-4 space-y-3">
            <label htmlFor="msg91-otp-value" className="block text-sm font-medium">Enter OTP</label>
            <input id="msg91-otp-value" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="6-digit code" className="w-full rounded-xl border border-border bg-background px-4 py-3 tracking-widest" />
            <button type="button" onClick={verify} disabled={busy || otp.length !== 6} className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-50">{busy ? 'Verifying…' : 'Verify & Submit'}</button>
            <button type="button" onClick={resend} disabled={busy || seconds > 0} className="w-full rounded-xl border border-border px-4 py-2 text-sm disabled:opacity-50">{seconds ? `Resend OTP in ${seconds}s` : 'Resend OTP'}</button>
          </div>
        )}
        <button type="button" onClick={cancel} className="mt-4 w-full text-sm text-muted-foreground underline">Cancel</button>
      </section>
    </div>
  )
}

export function requestMsg91Otp(inputPhone: string): Promise<string> {
  if (typeof document === 'undefined') return Promise.reject(new Error('OTP verification requires a browser.'))
  if (activeDialog) return Promise.reject(new Error('Another verification is in progress.'))
  const phone = inputPhone.replace(/[^0-9]/g, '')
  const normalized = /^91[6-9]\d{9}$/.test(phone) ? phone : /^[6-9]\d{9}$/.test(phone) ? `91${phone}` : null
  if (!normalized) return Promise.reject(new Error('SMS OTP is available for valid Indian mobile numbers only (+91).'))
  activeDialog = true
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root: Root = createRoot(container)
  return new Promise<string>((resolve, reject) => {
    let settled = false
    const settle = (value: string | Error) => {
      if (settled) return
      settled = true
      // Avoid unmounting during React's event dispatch.
      window.setTimeout(() => {
        root.unmount()
        container.remove()
        activeDialog = false
      }, 0)
      if (typeof value === 'string') resolve(value)
      else reject(value)
    }
    root.render(<Dialog phone={normalized} resolve={(token) => settle(token)} reject={(error) => settle(error)} />)
  })
}

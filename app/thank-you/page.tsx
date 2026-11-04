'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, House, Sparkles, ShieldCheck } from 'lucide-react'

type Receipt = {
  source: 'contact' | 'demo' | 'registration'
  notice: string | null
  createdAt: number
}

const RECEIPT_KEY = 'xpertsedge_thank_you_v1'
const RECEIPT_MAX_AGE = 30 * 60 * 1000

export default function ThankYouPage() {
  // Undefined while hydrating; reading sessionStorage only in effect keeps SSR deterministic.
  const [receipt, setReceipt] = useState<Receipt | null | undefined>(undefined)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(RECEIPT_KEY)
      if (!raw) {
        setReceipt(null)
        return
      }
      const parsed = JSON.parse(raw) as Partial<Receipt>
      const validSource = parsed.source === 'contact' || parsed.source === 'demo' || parsed.source === 'registration'
      const validTime = typeof parsed.createdAt === 'number' &&
        parsed.createdAt <= Date.now() && Date.now() - parsed.createdAt < RECEIPT_MAX_AGE
      if (!validSource || !validTime) {
        sessionStorage.removeItem(RECEIPT_KEY)
        setReceipt(null)
        return
      }
      setReceipt({
        source: parsed.source as Receipt['source'],
        notice: typeof parsed.notice === 'string' ? parsed.notice : null,
        createdAt: parsed.createdAt as number,
      })
    } catch {
      setReceipt(null)
    }
  }, [])

  const isContact = receipt?.source === 'contact'
  const heading = isContact ? 'Thank You for Reaching Out!' : 'Thank You for Registering!'
  const description = isContact
    ? 'Your enquiry has been delivered. Our team will get back to you shortly.'
    : 'Your registration enquiry has been delivered. Our team will contact you about your free demo.'

  return (
    <main className="relative isolate min-h-[80vh] overflow-hidden bg-[#080d0a] px-4 pb-20 pt-28 text-white sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-28 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/[0.09] blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'radial-gradient(rgba(163,230,53,0.18) 0.7px, transparent 0.7px)', backgroundSize: '25px 25px' }} />
      </div>

      <div className="mx-auto w-full max-w-[650px] overflow-hidden rounded-[28px] border border-emerald-200/15 bg-[#111a13]/95 p-6 text-center shadow-[0_32px_100px_rgba(0,0,0,0.35)] sm:p-12">
        {receipt === undefined ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-4" role="status">
            <span className="h-9 w-9 rounded-full border-2 border-emerald-300/20 border-t-[#a3e635] motion-safe:animate-spin" />
            <p className="text-sm text-[#bdcfc1]">Checking your registration status...</p>
          </div>
        ) : receipt === null ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-[#a3e635]">
              <ShieldCheck size={32} aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Registration Status</h1>
            <p className="max-w-md text-sm leading-7 text-[#aabfaf]">
              Please submit one of our website forms to receive your confirmation here.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[#a3e635]/30 px-6 py-3 text-sm font-semibold text-[#a3e635] hover:bg-[#a3e635]/10">
              <House size={16} aria-hidden="true" /> Back to Home
            </Link>
          </div>
        ) : (
          <>
            <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-[#a3e635]/25 bg-[#a3e635]/[0.07] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#b6f38a]">
              <Sparkles size={14} aria-hidden="true" /> XpertsEdge Technologies
            </div>
            <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#a3e635]/25 bg-gradient-to-br from-[#1b633a]/40 to-[#a3e635]/[0.08] text-[#a3e635] shadow-[0_0_45px_rgba(163,230,53,0.12)]">
              <span aria-hidden="true" className="absolute inset-[-10px] rounded-full border border-[#a3e635]/10 motion-safe:animate-pulse" />
              <CheckCircle2 size={47} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{heading}</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#b7c7bb] sm:text-base">{description}</p>
            {receipt.notice && (
              <p role="status" className="mx-auto mt-6 max-w-lg rounded-xl border border-amber-400/25 bg-amber-400/[0.07] px-4 py-3 text-sm leading-6 text-amber-200">
                {receipt.notice}
              </p>
            )}
            <div className="mx-auto my-8 h-px max-w-[400px] bg-gradient-to-r from-transparent via-[#a3e635]/20 to-transparent" />
            <p className="text-xs text-[#88a491]">We look forward to connecting with you.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#22c55e] to-[#a3e635] px-7 py-3 text-sm font-bold text-[#06100a] shadow-[0_8px_24px_rgba(34,197,94,0.18)] transition-transform motion-safe:hover:-translate-y-0.5">
                <House size={16} aria-hidden="true" /> Back to Home
              </Link>
              <Link href="/#courses" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-[#a3e635]/40 hover:text-[#a3e635]">
                Explore Our Courses <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

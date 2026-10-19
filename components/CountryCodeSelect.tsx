'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown, Search } from 'lucide-react'
import { DEMO_COUNTRIES, type CountryDialCode } from '@/lib/countryDialCodes'

type CountryCodeSelectProps = {
  value: CountryDialCode
  onChange: (country: CountryDialCode) => void
  disabled?: boolean
}

type MenuPosition = { left: number; top: number; width: number; maxHeight: number }

function getMenuPosition(trigger: HTMLButtonElement): MenuPosition {
  const rect = trigger.getBoundingClientRect()
  const margin = 12
  const gap = 6
  const width = Math.min(360, window.innerWidth - margin * 2)
  const left = Math.max(margin, Math.min(rect.left, window.innerWidth - width - margin))
  const availableBelow = Math.max(0, window.innerHeight - rect.bottom - margin - gap)
  const availableAbove = Math.max(0, rect.top - margin - gap)
  const showBelow = availableBelow >= 200 || availableBelow >= availableAbove
  const maxHeight = Math.min(300, showBelow ? availableBelow : availableAbove)

  return {
    left,
    top: showBelow ? rect.bottom + gap : rect.top - gap - maxHeight,
    width,
    maxHeight,
  }
}

export default function CountryCodeSelect({ value, onChange, disabled = false }: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState<MenuPosition | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])

  const matchingCountries = useMemo(() => {
    const q = search.trim().toLowerCase().replace(/^\+/, '')
    if (q) {
      return DEMO_COUNTRIES.filter((country) =>
        country.name.toLowerCase().includes(q) ||
        country.iso.toLowerCase().includes(q) ||
        country.dial.startsWith(q)
      )
    }
    // Keep the default country easy to find while retaining an alphabetical list.
    return [...DEMO_COUNTRIES.filter((country) => country.iso === 'IN'),
      ...DEMO_COUNTRIES.filter((country) => country.iso !== 'IN')]
  }, [search])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return

    const dismissOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node
      if (!triggerRef.current?.contains(target) && !dropdownRef.current?.contains(target)) {
        setOpen(false)
      }
    }
    const dismissOnScrollOutsideMenu = (event: Event) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const reposition = () => {
      if (triggerRef.current) setPosition(getMenuPosition(triggerRef.current))
    }

    document.addEventListener('pointerdown', dismissOnOutsideClick)
    document.addEventListener('scroll', dismissOnScrollOutsideMenu, true)
    window.addEventListener('resize', reposition)
    return () => {
      document.removeEventListener('pointerdown', dismissOnOutsideClick)
      document.removeEventListener('scroll', dismissOnScrollOutsideMenu, true)
      window.removeEventListener('resize', reposition)
    }
  }, [open])

  const showMenu = () => {
    if (!triggerRef.current || disabled) return
    setPosition(getMenuPosition(triggerRef.current))
    setSearch('')
    setActiveIndex(0)
    setOpen(true)
  }

  const selectCountry = (country: CountryDialCode) => {
    onChange(country)
    setOpen(false)
  }

  const onMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      // Do not close the entire registration modal when closing the country list.
      event.preventDefault()
      event.stopPropagation()
      setOpen(false)
      triggerRef.current?.focus()
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      event.stopPropagation()
      const delta = event.key === 'ArrowDown' ? 1 : -1
      const next = (activeIndex + delta + matchingCountries.length) % matchingCountries.length
      if (Number.isFinite(next)) {
        setActiveIndex(next)
        optionRefs.current[next]?.scrollIntoView({ block: 'nearest' })
      }
    } else if (event.key === 'Enter' && matchingCountries[activeIndex]) {
      event.preventDefault()
      event.stopPropagation()
      selectCountry(matchingCountries[activeIndex])
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-label={`Country code: ${value.name} +${value.dial}. Change country`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => open ? setOpen(false) : showMenu()}
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-l-xl border border-r-0 border-border bg-primary/10 px-2.5 text-primary text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 disabled:opacity-60"
      >
        <span>{value.iso} +{value.dial}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && position && createPortal(
        <div
          ref={dropdownRef}
          data-country-code-dropdown="true"
          style={{ left: position.left, top: position.top, width: position.width, maxHeight: position.maxHeight }}
          className="fixed z-[100] flex flex-col overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-2xl"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={onMenuKeyDown}
        >
          <div className="shrink-0 border-b border-border px-3 py-2">
            <div className="flex items-center gap-2 rounded-lg border border-border px-2 focus-within:border-primary">
              <Search size={15} className="shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={search}
                onChange={(event) => { setSearch(event.target.value); setActiveIndex(0) }}
                placeholder="Search country or code"
                aria-label="Search country name or calling code"
                aria-controls="demo-country-list"
                className="w-full min-w-0 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div id="demo-country-list" role="listbox" aria-label="Country calling codes" className="min-h-0 overflow-y-auto overscroll-contain py-1">
            {matchingCountries.length === 0 ? (
              <p className="px-3 py-4 text-center text-sm text-muted-foreground">No countries found</p>
            ) : matchingCountries.map((country, index) => (
              <button
                key={country.iso}
                ref={(node) => { optionRefs.current[index] = node }}
                type="button"
                role="option"
                aria-selected={value.iso === country.iso}
                tabIndex={-1}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectCountry(country)}
                className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-primary/10 ${activeIndex === index ? 'bg-primary/10' : ''}`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="w-7 shrink-0 font-semibold text-primary">{country.iso}</span>
                  <span className="truncate">{country.name}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1 font-medium text-muted-foreground">
                  +{country.dial}
                  {value.iso === country.iso && <Check size={14} className="text-primary" aria-hidden="true" />}
                </span>
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

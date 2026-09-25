import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Search } from 'lucide-react'
import { Button } from './ui'
import { cn } from '../lib/cn'
import type { PropertyType } from '../types'

const propertyTypes: Array<{ value: PropertyType | ''; label: string }> = [
  { value: '', label: 'Any type' },
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'penthouse', label: 'Penthouse' },
]

const budgets: Array<{ value: string; label: string; min?: string; max?: string }> = [
  { value: '', label: 'Any price' },
  { value: 'under-50', label: 'Under ₦50M', max: '50000000' },
  { value: '50-100', label: '₦50M – ₦100M', min: '50000000', max: '100000000' },
  { value: '100-200', label: '₦100M – ₦200M', min: '100000000', max: '200000000' },
  { value: 'over-200', label: '₦200M and above', min: '200000000' },
]

export function SearchPanel() {
  const navigate = useNavigate()
  const [listing, setListing] = useState<'sale' | 'rent'>('sale')
  const [city, setCity] = useState('')
  const [type, setType] = useState<PropertyType | ''>('')
  const [budget, setBudget] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({ listing })
    if (city.trim()) params.set('city', city.trim())
    if (type) params.set('type', type)
    const selected = budgets.find((item) => item.value === budget)
    if (selected?.min) params.set('min', selected.min)
    if (selected?.max) params.set('max', selected.max)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-white p-2 shadow-soft">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-1 sm:border-r sm:border-black/10 sm:pr-2">
          {(['sale', 'rent'] as const).map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setListing(item)}
              aria-pressed={listing === item}
              className={cn('flex-1 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-[.12em] transition sm:flex-none', listing === item ? 'bg-ink text-white' : 'text-black/50 hover:text-ink')}
            >
              {item === 'sale' ? 'Buy' : 'Rent'}
            </button>
          ))}
        </div>

        <div className="grid flex-1 gap-2 sm:grid-cols-[1.3fr_1fr_1fr_auto]">
          <label className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-3">
            <MapPin size={18} className="shrink-0 text-moss" aria-hidden="true" />
            <span className="w-full">
              <span className="block text-[10px] font-bold uppercase tracking-[.14em] text-black/50">Location</span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City or area"
                className="h-auto w-full border-0 bg-transparent p-0 text-sm font-medium text-ink outline-none placeholder:text-black/40"
              />
            </span>
          </label>

          <label className="block rounded-2xl bg-paper px-4 py-3">
            <span className="block text-[10px] font-bold uppercase tracking-[.14em] text-black/50">Property type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as PropertyType | '')}
              className="h-auto w-full cursor-pointer border-0 bg-transparent p-0 text-sm font-medium text-ink outline-none"
            >
              {propertyTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>

          <label className="block rounded-2xl bg-paper px-4 py-3">
            <span className="block text-[10px] font-bold uppercase tracking-[.14em] text-black/50">Budget</span>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="h-auto w-full cursor-pointer border-0 bg-transparent p-0 text-sm font-medium text-ink outline-none"
            >
              {budgets.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>

          <Button type="submit" className="w-full sm:w-auto"><Search size={17} aria-hidden="true" /> Search</Button>
        </div>
      </div>
    </form>
  )
}

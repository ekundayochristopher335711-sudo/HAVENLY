import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, SlidersHorizontal, Search } from 'lucide-react'
import { Button, Input, cn } from './ui'

export function SearchPanel({ dark = false }: { dark?: boolean }) {
  const navigate = useNavigate()
  const [listing, setListing] = useState<'sale' | 'rent'>('sale')
  const [location, setLocation] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({ listing })
    if (location.trim()) params.set('city', location.trim())
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <form onSubmit={submit} className={cn('rounded-[26px] p-2 shadow-soft', dark ? 'bg-white' : 'bg-white')}>
      <div className="flex items-center gap-1 border-b border-black/10 px-2 sm:border-b-0 sm:border-r">
        {(['sale', 'rent'] as const).map((item) => (
          <button type="button" key={item} onClick={() => setListing(item)} className={cn('rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-[.12em]', listing === item ? 'bg-ink text-white' : 'text-black/45 hover:text-ink')}>
            {item === 'sale' ? 'Buy' : 'Rent'}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-[1.3fr_1fr_1fr_auto]">
        <label className="flex items-center gap-3 px-4 py-3">
          <MapPin size={18} className="text-moss" />
          <span className="w-full">
            <span className="block text-[10px] font-bold uppercase tracking-[.14em] text-black/35">Location</span>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or neighbourhood" className="h-auto border-0 bg-transparent p-0 shadow-none focus:ring-0" />
          </span>
        </label>
        <label className="hidden items-center gap-3 rounded-2xl bg-paper px-4 py-3 md:flex">
          <span><span className="block text-[10px] font-bold uppercase tracking-[.14em] text-black/35">Property</span><span className="text-sm font-medium">Any type</span></span>
        </label>
        <label className="hidden items-center gap-3 rounded-2xl bg-paper px-4 py-3 md:flex">
          <span><span className="block text-[10px] font-bold uppercase tracking-[.14em] text-black/35">Budget</span><span className="text-sm font-medium">Any price</span></span>
        </label>
        <Button type="submit" className="w-full sm:w-auto"><Search size={17} /> Search</Button>
      </div>
      <button type="button" onClick={() => navigate(`/properties?listing=${listing}`)} className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl py-2 text-xs font-semibold text-black/45 hover:bg-paper sm:hidden"><SlidersHorizontal size={15} /> More filters</button>
    </form>
  )
}

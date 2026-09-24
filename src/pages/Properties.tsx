import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { Container, Button, Input, Badge, cn } from '../components/ui'
import { PropertyCard } from '../components/PropertyCard'
import { demoProperties } from '../data/demo'
import type { ListingType, PropertyType } from '../types'

const types: Array<{ value: PropertyType; label: string }> = [
  { value: 'house', label: 'House' }, { value: 'apartment', label: 'Apartment' }, { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' }, { value: 'penthouse', label: 'Penthouse' },
]

export function Properties({ forcedListing }: { forcedListing?: ListingType }) {
  const [params] = useSearchParams()
  const [mobileFilters, setMobileFilters] = useState(false)
  const [listing, setListing] = useState<ListingType>(forcedListing ?? (params.get('listing') as ListingType) ?? 'sale')
  const [type, setType] = useState<PropertyType | ''>('')
  const [city, setCity] = useState(params.get('city') ?? '')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [beds, setBeds] = useState('')
  const [sort, setSort] = useState('newest')

  const results = useMemo(() => {
    let data = demoProperties.filter((p) => p.listing_type === listing)
    if (city.trim()) data = data.filter((p) => `${p.city} ${p.address}`.toLowerCase().includes(city.toLowerCase()))
    if (type) data = data.filter((p) => p.property_type === type)
    if (minPrice) data = data.filter((p) => p.price >= Number(minPrice))
    if (maxPrice) data = data.filter((p) => p.price <= Number(maxPrice))
    if (beds) data = data.filter((p) => p.bedrooms >= Number(beds))
    if (sort === 'price-low') data.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') data.sort((a, b) => b.price - a.price)
    return data
  }, [listing, city, type, minPrice, maxPrice, beds, sort])

  function reset() {
    setCity(''); setType(''); setMinPrice(''); setMaxPrice(''); setBeds(''); setSort('newest')
  }

  const filters = (
    <div className="space-y-7">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.15em]">Listing</p>
        <div className="grid grid-cols-2 rounded-2xl bg-paper p-1">
          {(['sale', 'rent'] as ListingType[]).map((value) => <button key={value} onClick={() => setListing(value)} className={cn('rounded-xl py-3 text-sm font-semibold', listing === value ? 'bg-ink text-white' : 'text-black/45')}>{value === 'sale' ? 'Buy' : 'Rent'}</button>)}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.15em]">Location</p>
        <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City or area" />
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.15em]">Property type</p>
        <select value={type} onChange={(e) => setType(e.target.value as PropertyType | '')} className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-moss">
          <option value="">Any type</option>
          {types.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.15em]">Price range</p>
        <div className="grid grid-cols-2 gap-2"><Input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min" /><Input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max" /></div>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.15em]">Bedrooms</p>
        <div className="flex gap-2">{['1', '2', '3', '4', '5'].map((n) => <button key={n} onClick={() => setBeds(beds === n ? '' : n)} className={cn('size-10 rounded-full border text-sm', beds === n ? 'border-ink bg-ink text-white' : 'border-black/10')}>{n}+</button>)}</div>
      </div>
      <Button type="button" variant="outline" onClick={reset} className="w-full">Reset filters</Button>
    </div>
  )

  return (
    <main className="pt-20">
      <section className="border-b border-black/10 bg-white py-12 sm:py-16">
        <Container>
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-moss">Property discovery</p>
          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><h1 className="font-display text-5xl tracking-[-.03em] sm:text-7xl">Find your next place.</h1><p className="mt-4 max-w-xl text-black/50">Search a considered collection of homes, apartments and residences.</p></div>
            <Badge>{results.length} homes</Badge>
          </div>
        </Container>
      </section>
      <Container className="py-8">
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => setMobileFilters(true)} className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-semibold lg:hidden"><SlidersHorizontal size={16} /> Filters</button>
          <div className="ml-auto flex items-center gap-2"><span className="hidden text-xs text-black/40 sm:block">Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-black/10 bg-white px-4 py-3 text-xs font-semibold outline-none"><option value="newest">Newest</option><option value="price-low">Price: low</option><option value="price-high">Price: high</option></select><ChevronDown size={15} className="-ml-8 mr-3 pointer-events-none" /></div>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">{filters}</aside>
          <section className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {results.length ? results.map((property) => <PropertyCard key={property.id} property={property} />) : <div className="sm:col-span-2 xl:col-span-3 py-24 text-center"><h2 className="font-display text-4xl">No homes match that search.</h2><p className="mt-3 text-black/45">Try broadening your filters.</p></div>}
          </section>
        </div>
      </Container>
      {mobileFilters && <div className="fixed inset-0 z-[100] bg-ink/50 lg:hidden"><div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-[30px] bg-white p-6"><div className="mb-8 flex items-center justify-between"><h2 className="font-display text-3xl">Filters</h2><button onClick={() => setMobileFilters(false)} className="grid size-10 place-items-center rounded-full bg-paper"><X /></button></div>{filters}<Button onClick={() => setMobileFilters(false)} className="mt-5 w-full">Show {results.length} homes</Button></div></div>}
    </main>
  )
}

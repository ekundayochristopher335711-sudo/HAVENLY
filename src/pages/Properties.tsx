import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { Container, Button, Input, Badge } from '../components/ui'
import { cn } from '../lib/cn'
import { PropertyCard } from '../components/PropertyCard'
import { demoProperties } from '../data/demo'
import { usePageMeta } from '../hooks/usePageMeta'
import type { ListingType, PropertyFilters, PropertyType, SortOption } from '../types'

const allTypes: PropertyType[] = ['house', 'apartment', 'villa', 'townhouse', 'penthouse', 'land']
const propertyTypes: Array<{ value: PropertyType; label: string }> = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'penthouse', label: 'Penthouse' },
]
const listingValues: ListingType[] = ['sale', 'rent']
const sortValues: SortOption[] = ['newest', 'price-low', 'price-high']

function parseListing(value: string | null): ListingType {
  return listingValues.includes(value as ListingType) ? (value as ListingType) : 'sale'
}

function parseType(value: string | null): PropertyType | '' {
  if (value && allTypes.includes(value as PropertyType)) return value as PropertyType
  return ''
}

function parseSort(value: string | null): SortOption {
  return sortValues.includes(value as SortOption) ? (value as SortOption) : 'newest'
}

export function Properties({ forcedListing }: { forcedListing?: ListingType }) {
  usePageMeta(
    forcedListing === 'rent'
      ? 'Homes for rent — HAVENLY'
      : forcedListing === 'sale'
        ? 'Homes for sale — HAVENLY'
        : 'Properties — HAVENLY',
    'Browse houses, apartments, villas and penthouses for sale and rent, with filters for location, price and bedrooms.',
  )
  const [params] = useSearchParams()
  const [mobileFilters, setMobileFilters] = useState(false)
  const [filters, setFilters] = useState<PropertyFilters>(() => ({
    listing: forcedListing ?? parseListing(params.get('listing')),
    city: params.get('city') ?? '',
    type: parseType(params.get('type')),
    minPrice: params.get('min') ?? '',
    maxPrice: params.get('max') ?? '',
    beds: params.get('beds') ?? '',
    sort: 'newest',
  }))

  // Re-sync when URL parameters change (e.g. arriving from the home search
  // panel while already on the properties page).
  useEffect(() => {
    setFilters((current) => ({
      ...current,
      listing: forcedListing ?? parseListing(params.get('listing')),
      city: params.get('city') ?? '',
      type: parseType(params.get('type')),
      minPrice: params.get('min') ?? '',
      maxPrice: params.get('max') ?? '',
      beds: params.get('beds') ?? '',
      sort: parseSort(params.get('sort')),
    }))
  }, [params, forcedListing])

  function update<Key extends keyof PropertyFilters>(key: Key, value: PropertyFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const results = useMemo(() => {
    const query = filters.city.trim().toLowerCase()
    let data = demoProperties.filter((property) => property.listing_type === filters.listing)
    if (query) data = data.filter((property) => `${property.city} ${property.address} ${property.state}`.toLowerCase().includes(query))
    if (filters.type) data = data.filter((property) => property.property_type === filters.type)
    if (filters.minPrice) data = data.filter((property) => property.price >= Number(filters.minPrice))
    if (filters.maxPrice) data = data.filter((property) => property.price <= Number(filters.maxPrice))
    if (filters.beds) data = data.filter((property) => property.bedrooms >= Number(filters.beds))
    if (filters.sort === 'price-low') data.sort((a, b) => a.price - b.price)
    else if (filters.sort === 'price-high') data.sort((a, b) => b.price - a.price)
    else data.sort((a, b) => b.created_at.localeCompare(a.created_at))
    return data
  }, [filters])

  function reset() {
    setFilters((current) => ({ ...current, city: '', type: '', minPrice: '', maxPrice: '', beds: '', sort: 'newest' }))
  }

  const filtersPanel = (
    <div className="space-y-7">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.15em]">Listing</p>
        <div className="grid grid-cols-2 rounded-2xl bg-paper p-1">
          {listingValues.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => update('listing', value)}
              aria-pressed={filters.listing === value}
              className={cn('rounded-xl py-3 text-sm font-semibold transition', filters.listing === value ? 'bg-ink text-white' : 'text-black/55 hover:text-ink')}
            >
              {value === 'sale' ? 'Buy' : 'Rent'}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.15em]">Location</p>
        <Input value={filters.city} onChange={(e) => update('city', e.target.value)} placeholder="City or area" />
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.15em]">Property type</p>
        <select
          value={filters.type}
          onChange={(e) => update('type', e.target.value as PropertyType | '')}
          aria-label="Property type"
          className="h-12 w-full cursor-pointer rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-moss focus:ring-4 focus:ring-moss/10"
        >
          <option value="">Any type</option>
          {propertyTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.15em]">Price range</p>
        <div className="grid grid-cols-2 gap-2">
          <Input type="number" min={0} value={filters.minPrice} onChange={(e) => update('minPrice', e.target.value)} placeholder="Min" aria-label="Minimum price" />
          <Input type="number" min={0} value={filters.maxPrice} onChange={(e) => update('maxPrice', e.target.value)} placeholder="Max" aria-label="Maximum price" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.15em]">Bedrooms</p>
        <div className="flex gap-2">
          {['1', '2', '3', '4', '5'].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => update('beds', filters.beds === n ? '' : n)}
              aria-pressed={filters.beds === n}
              className={cn('size-10 rounded-full border text-sm transition', filters.beds === n ? 'border-ink bg-ink text-white' : 'border-black/15 hover:border-ink')}
            >
              {n}+
            </button>
          ))}
        </div>
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
            <div>
              <h1 className="font-display text-5xl tracking-[-.03em] sm:text-7xl">Find your next place.</h1>
              <p className="mt-4 max-w-xl leading-7 text-black/60">Search a considered collection of homes, apartments and residences.</p>
            </div>
            <Badge>{results.length} {results.length === 1 ? 'home' : 'homes'}</Badge>
          </div>
        </Container>
      </section>

      <Container className="py-8">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileFilters(true)}
            className="flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal size={16} aria-hidden="true" /> Filters
          </button>
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="sort" className="hidden text-xs text-black/55 sm:block">Sort by</label>
            <div className="relative">
              <select
                id="sort"
                value={filters.sort}
                onChange={(e) => update('sort', e.target.value as SortOption)}
                className="cursor-pointer appearance-none rounded-full border border-black/15 bg-white py-3 pl-4 pr-9 text-xs font-semibold outline-none transition focus:border-moss"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside aria-label="Filters">{filtersPanel}</aside>
          <section aria-label="Property results" className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {results.length ? (
              results.map((property) => <PropertyCard key={property.id} property={property} />)
            ) : (
              <div className="py-24 text-center sm:col-span-2 xl:col-span-3">
                <h2 className="font-display text-4xl">No homes match that search.</h2>
                <p className="mt-3 text-black/55">Try broadening your filters — or start over.</p>
                <Button type="button" variant="outline" onClick={reset} className="mt-6">Clear all filters</Button>
              </div>
            )}
          </section>
        </div>
      </Container>

      {mobileFilters && (
        <div className="fixed inset-0 z-[100] bg-ink/50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters" onClick={() => setMobileFilters(false)}>
          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-[28px] bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-3xl">Filters</h2>
              <button type="button" onClick={() => setMobileFilters(false)} className="grid size-10 place-items-center rounded-full bg-paper" aria-label="Close filters">
                <X aria-hidden="true" />
              </button>
            </div>
            {filtersPanel}
            <Button type="button" onClick={() => setMobileFilters(false)} className="mt-5 w-full">
              Show {results.length} {results.length === 1 ? 'home' : 'homes'}
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}

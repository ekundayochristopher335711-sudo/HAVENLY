import { Link } from 'react-router-dom'
import type { MouseEvent } from 'react'
import { ArrowUpRight, BedDouble, Bath, Maximize2, Heart, CheckCircle2 } from 'lucide-react'
import type { Property } from '../types'
import { Badge, cn } from './ui'
import { formatArea, formatPrice } from '../lib/format'
import { useFavorites } from '../hooks/useFavorites'
import { useAuth } from '../contexts/AuthContext'

export function PropertyCard({ property, compact = false }: { property: Property; compact?: boolean }) {
  const { favorites, toggle } = useFavorites()
  const { user } = useAuth()
  const saved = favorites.includes(property.id)

  async function save(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (user) await toggle(property.id)
  }

  return (
    <Link to={`/properties/${property.slug}`} className={cn('group block', compact && 'max-w-sm')}>
      <div className={cn('relative overflow-hidden rounded-[26px] bg-stone', compact ? 'aspect-[4/3]' : 'aspect-[1.08/1]')}>
        <img src={property.image} alt={property.title} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
        <div className="absolute left-4 top-4 flex gap-2">
          {property.is_featured && <Badge>Featured</Badge>}
          {property.is_verified && <Badge className="gap-1"><CheckCircle2 size={12} /> Verified</Badge>}
        </div>
        <button onClick={save} className={cn('absolute right-4 top-4 grid size-10 place-items-center rounded-full backdrop-blur-md transition', saved ? 'bg-white text-clay' : 'bg-black/20 text-white hover:bg-white hover:text-ink')} aria-label="Save property">
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <span className="mb-1 block text-xs font-medium uppercase tracking-[.15em] text-white/75">{property.listing_type === 'sale' ? 'For sale' : 'For rent'}</span>
            <span className="text-xl font-bold">{formatPrice(property.price, property.currency)}{property.listing_type === 'rent' && <small className="ml-1 text-xs font-medium text-white/65">/ year</small>}</span>
          </div>
          <span className="grid size-10 place-items-center rounded-full bg-white text-ink transition group-hover:rotate-45"><ArrowUpRight size={17} /></span>
        </div>
      </div>
      <div className="px-1 pt-4">
        <h3 className="text-lg font-semibold tracking-tight">{property.title}</h3>
        <p className="mt-1 text-sm text-black/45">{property.address}, {property.city}</p>
        <div className="mt-4 flex items-center gap-4 text-xs font-medium text-black/55">
          <span className="flex items-center gap-1.5"><BedDouble size={15} /> {property.bedrooms} beds</span>
          <span className="flex items-center gap-1.5"><Bath size={15} /> {property.bathrooms} baths</span>
          <span className="flex items-center gap-1.5"><Maximize2 size={14} /> {formatArea(property.area, property.area_unit)}</span>
        </div>
      </div>
    </Link>
  )
}

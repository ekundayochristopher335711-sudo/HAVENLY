import { Link } from 'react-router-dom'
import { ArrowUpRight, BedDouble, Bath, Maximize2, Heart, CheckCircle2 } from 'lucide-react'
import type { Property } from '../types'
import { Badge } from './ui'
import { cn } from '../lib/cn'
import { formatArea, formatPrice } from '../lib/format'
import { imgAt } from '../lib/image'
import { useFavorites } from '../hooks/useFavorites'

export function PropertyCard({ property }: { property: Property }) {
  const { favorites, toggle } = useFavorites()
  const saved = favorites.includes(property.id)

  return (
    <div className="group relative">
      <Link to={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[1.08/1] overflow-hidden rounded-[28px] bg-stone">
          <img src={imgAt(property.image, 900)} alt={property.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" aria-hidden="true" />
          <div className="absolute left-4 top-4 flex gap-2">
            {property.is_featured && <Badge>Featured</Badge>}
            {property.is_verified && <Badge className="gap-1"><CheckCircle2 size={12} aria-hidden="true" /> Verified</Badge>}
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <span className="mb-1 block text-xs font-medium uppercase tracking-[.15em] text-white/80">{property.listing_type === 'sale' ? 'For sale' : 'For rent'}</span>
              <span className="text-xl font-bold">{formatPrice(property.price, property.currency)}{property.listing_type === 'rent' && <small className="ml-1 text-xs font-medium text-white/75">/ year</small>}</span>
            </div>
            <span className="grid size-10 place-items-center rounded-full bg-white text-ink transition group-hover:rotate-45" aria-hidden="true"><ArrowUpRight size={17} /></span>
          </div>
        </div>
        <div className="px-1 pt-4">
          <h3 className="text-lg font-semibold tracking-tight">{property.title}</h3>
          <p className="mt-1 text-sm text-black/55">{property.address}, {property.city}</p>
          <div className="mt-4 flex items-center gap-4 text-xs font-medium text-black/60">
            <span className="flex items-center gap-1.5"><BedDouble size={15} aria-hidden="true" /> {property.bedrooms} beds</span>
            <span className="flex items-center gap-1.5"><Bath size={15} aria-hidden="true" /> {property.bathrooms} baths</span>
            <span className="flex items-center gap-1.5"><Maximize2 size={14} aria-hidden="true" /> {formatArea(property.area, property.area_unit)}</span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => toggle(property.id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${property.title} from saved homes` : `Save ${property.title}`}
        className={cn('absolute right-4 top-4 grid size-10 place-items-center rounded-full backdrop-blur-md transition', saved ? 'bg-white text-clay' : 'bg-black/25 text-white hover:bg-white hover:text-ink')}
      >
        <Heart size={18} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
      </button>
    </div>
  )
}

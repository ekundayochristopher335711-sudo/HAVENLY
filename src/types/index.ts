export type ListingType = 'sale' | 'rent'
export type PropertyType = 'house' | 'apartment' | 'villa' | 'townhouse' | 'penthouse' | 'land'
export type SortOption = 'newest' | 'price-low' | 'price-high'

export interface Agent {
  id: string
  name: string
  company: string
  location: string
  bio: string
  avatar: string
  verified: boolean
  listings: number
  experience: number
}

export interface Property {
  id: string
  title: string
  slug: string
  description: string
  listing_type: ListingType
  property_type: PropertyType
  price: number
  currency: string
  bedrooms: number
  bathrooms: number
  area: number
  area_unit: string
  address: string
  city: string
  state: string
  country: string
  is_featured: boolean
  is_verified: boolean
  year_built?: number | null
  parking_spaces?: number | null
  image: string
  images?: string[]
  amenities: string[]
  agent?: Agent
  created_at: string
}

export interface PropertyFilters {
  listing: ListingType
  city: string
  type: PropertyType | ''
  minPrice: string
  maxPrice: string
  beds: string
  sort: SortOption
}

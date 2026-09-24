export type ListingType = 'sale' | 'rent'
export type PropertyType = 'house' | 'apartment' | 'villa' | 'townhouse' | 'penthouse' | 'land'
export type PropertyStatus = 'draft' | 'pending' | 'published' | 'rejected' | 'archived'
export type UserRole = 'user' | 'agent' | 'admin'

export interface PropertyImage {
  id: string
  property_id: string
  storage_path: string
  public_url: string
  alt_text: string | null
  sort_order: number
  is_cover: boolean
}

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
  status: PropertyStatus
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

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  role: UserRole
}

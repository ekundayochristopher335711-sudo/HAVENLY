import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Bath, BedDouble, CheckCircle2, Heart, Maximize2, MapPin, Share2, X } from 'lucide-react'
import { Container, Button, Badge, Input, SectionHeading, cn } from '../components/ui'
import { PropertyCard } from '../components/PropertyCard'
import { demoProperties } from '../data/demo'
import { formatArea, formatPrice } from '../lib/format'
import { useFavorites } from '../hooks/useFavorites'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export function PropertyDetail() {
  const { slug } = useParams()
  const property = demoProperties.find((item) => item.slug === slug) ?? demoProperties[0]
  const { favorites, toggle } = useFavorites()
  const { user } = useAuth()
  const [gallery, setGallery] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const saved = favorites.includes(property.id)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (supabase && user) {
      await supabase.from('inquiries').insert({ property_id: property.id, user_id: user.id, agent_id: property.agent?.id, message, name: user.user_metadata?.full_name ?? user.email, email: user.email })
    }
    setSent(true)
    setMessage('')
  }

  return (
    <main className="pt-20">
      <Container className="py-6"><Link to="/properties" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-black/45"><ArrowLeft size={15} /> Back to properties</Link></Container>
      <section className="px-3 sm:px-5">
        <div className="mx-auto grid max-w-[1500px] gap-3 overflow-hidden rounded-[30px] sm:grid-cols-[1.45fr_1fr]">
          <button onClick={() => setGallery(property.image)} className="group relative aspect-[1.25] overflow-hidden sm:aspect-auto sm:min-h-[620px]"><img src={property.image} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" alt={property.title} /></button>
          <div className="hidden grid-cols-2 gap-3 sm:grid">
            {(property.images ?? [property.image]).slice(0, 4).map((image, i) => <button key={image} onClick={() => setGallery(image)} className={cn('overflow-hidden', i === 0 ? 'rounded-tr-[30px]' : i === 1 ? 'rounded-br-[30px]' : '')}><img src={image} className="h-full w-full object-cover transition duration-700 hover:scale-105" alt="" /></button>)}
          </div>
        </div>
      </section>

      <Container>
        <div className="grid gap-14 py-12 lg:grid-cols-[1fr_380px] lg:py-20">
          <div>
            <div className="flex flex-wrap gap-2"><Badge>{property.listing_type === 'sale' ? 'For sale' : 'For rent'}</Badge>{property.is_verified && <Badge className="gap-1"><CheckCircle2 size={12} /> Verified</Badge>}</div>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[.95] tracking-[-.035em] sm:text-7xl">{property.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-sm text-black/45"><MapPin size={16} /> {property.address}, {property.city}, {property.state}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-black/10 py-5 text-sm text-black/60">
              <span className="flex items-center gap-2"><BedDouble size={18} /> {property.bedrooms} bedrooms</span><span className="flex items-center gap-2"><Bath size={18} /> {property.bathrooms} bathrooms</span><span className="flex items-center gap-2"><Maximize2 size={17} /> {formatArea(property.area, property.area_unit)}</span>
            </div>
            <h2 className="mt-12 text-[11px] font-bold uppercase tracking-[.18em] text-moss">About this home</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-black/60">{property.description}</p>
            <h2 className="mt-14 text-[11px] font-bold uppercase tracking-[.18em] text-moss">Amenities</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{property.amenities.map((amenity) => <div key={amenity} className="rounded-2xl bg-paper px-4 py-4 text-sm">{amenity}</div>)}</div>
          </div>

          <aside>
            <div className="sticky top-8 rounded-[28px] border border-black/10 bg-white p-6 shadow-soft">
              <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-black/35">Asking price</p><p className="mt-2 text-2xl font-bold">{formatPrice(property.price, property.currency)}<span className="ml-1 text-xs font-medium text-black/35">{property.listing_type === 'rent' ? '/ year' : ''}</span></p></div><button onClick={() => user && void toggle(property.id)} className={cn('grid size-11 place-items-center rounded-full border', saved ? 'border-clay text-clay' : 'border-black/10')}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button></div>
              <div className="my-6 border-t border-black/10" />
              {property.agent && <div className="flex items-center gap-3"><img src={property.agent.avatar} className="size-12 rounded-full object-cover" alt={property.agent.name} /><div><p className="font-semibold">{property.agent.name}</p><p className="text-xs text-black/40">{property.agent.company}</p></div></div>}
              <form onSubmit={submit} className="mt-6">
                {sent ? <div className="rounded-2xl bg-moss/10 p-5 text-sm leading-6 text-moss">Your message has been sent. The agent will be in touch.</div> : <><Input placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} className="h-28 py-3" /><Button className="mt-3 w-full">Contact agent</Button></>}
              </form>
              <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="mt-3 flex w-full items-center justify-center gap-2 py-2 text-xs font-semibold text-black/45"><Share2 size={14} /> Share property</button>
            </div>
          </aside>
        </div>
      </Container>

      <section className="border-t border-black/10 py-20 sm:py-28">
        <Container><SectionHeading eyebrow="You may also like" title="More homes to explore." /><div className="mt-12 grid gap-7 md:grid-cols-3">{demoProperties.filter((p) => p.id !== property.id).slice(0, 3).map((p) => <PropertyCard key={p.id} property={p} />)}</div></Container>
      </section>

      {gallery && <div className="fixed inset-0 z-[120] bg-black/95 p-4 sm:p-8"><button onClick={() => setGallery(null)} className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white"><X /></button><div className="flex h-full items-center justify-center"><img src={gallery} className="max-h-full max-w-full object-contain" alt="" /></div><div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">{(property.images ?? []).map((image) => <button key={image} onClick={() => setGallery(image)} className="size-12 overflow-hidden rounded-lg border border-white/20"><img src={image} className="h-full w-full object-cover" alt="" /></button>)}</div></div>}
    </main>
  )
}

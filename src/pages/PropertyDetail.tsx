import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Bath, BedDouble, CheckCircle2, ChevronLeft, ChevronRight, Heart, Maximize2, MapPin, Share2, X } from 'lucide-react'
import { Container, Button, Badge, TextArea, SectionHeading, ButtonLink } from '../components/ui'
import { cn } from '../lib/cn'
import { PropertyCard } from '../components/PropertyCard'
import { demoProperties } from '../data/demo'
import { formatArea, formatPrice } from '../lib/format'
import { imgAt } from '../lib/image'
import { useFavorites } from '../hooks/useFavorites'
import { usePageMeta } from '../hooks/usePageMeta'

export function PropertyDetail() {
  const { slug } = useParams()
  const property = demoProperties.find((item) => item.slug === slug)
  usePageMeta(
    property ? `${property.title} — HAVENLY` : 'Listing not found — HAVENLY',
    property
      ? `${property.title} in ${property.city}, ${property.state}. ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms, ${formatArea(property.area, property.area_unit)}.`
      : undefined,
  )
  const { favorites, toggle } = useFavorites()
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const images = property ? (property.images?.length ? property.images : [property.image]) : []
  const saved = property ? favorites.includes(property.id) : false

  // Lightbox: keyboard navigation + no background scrolling while open.
  useEffect(() => {
    if (galleryIndex === null) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setGalleryIndex(null)
      if (event.key === 'ArrowRight') setGalleryIndex((i) => (i === null ? null : (i + 1) % images.length))
      if (event.key === 'ArrowLeft') setGalleryIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [galleryIndex, images.length])

  if (!property) {
    return (
      <main className="pt-20">
        <Container className="py-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-moss">404 / Listing not found</p>
          <h1 className="mt-5 font-display text-5xl sm:text-7xl">This place doesn't exist.</h1>
          <p className="mt-4 text-black/60">The listing may have been removed, or the link is out of date.</p>
          <ButtonLink to="/properties" className="mt-8">Back to properties</ButtonLink>
        </Container>
      </main>
    )
  }

  const related = [
    ...demoProperties.filter((p) => p.id !== property.id && p.listing_type === property.listing_type),
    ...demoProperties.filter((p) => p.id !== property.id && p.listing_type !== property.listing_type),
  ].slice(0, 3)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setSent(true)
    setMessage('')
  }

  function share() {
    navigator.clipboard
      ?.writeText(window.location.href)
      .then(() => {
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => undefined)
  }

  return (
    <main className="pt-20">
      <Container className="py-6">
        <Link to="/properties" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-black/55 transition hover:text-ink">
          <ArrowLeft size={15} aria-hidden="true" /> Back to properties
        </Link>
      </Container>

      <section className="px-3 sm:px-5">
        <div className="mx-auto grid max-w-[1500px] gap-3 overflow-hidden rounded-[28px] sm:grid-cols-[1.45fr_1fr]">
          <button
            type="button"
            onClick={() => setGalleryIndex(0)}
            className="group relative aspect-[1.25] overflow-hidden sm:aspect-auto sm:min-h-[620px]"
            aria-label={`Open photo gallery for ${property.title}`}
          >
            <img src={imgAt(property.image, 1600)} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" alt={property.title} fetchPriority="high" decoding="async" />
            <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{images.length} photos</span>
          </button>
          <div className="hidden grid-cols-2 gap-3 sm:grid">
            {images.slice(0, 4).map((image, i) => (
              <button key={image} type="button" onClick={() => setGalleryIndex(i)} className="overflow-hidden" aria-label={`View photo ${i + 1} of ${images.length}`}>
                <img src={imgAt(image, 800)} className="h-full w-full object-cover transition duration-700 hover:scale-105" alt={`${property.title} — photo ${i + 1}`} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Container>
        <div className="grid gap-14 py-12 lg:grid-cols-[1fr_380px] lg:py-20">
          <div>
            <div className="flex flex-wrap gap-2"><Badge>{property.listing_type === 'sale' ? 'For sale' : 'For rent'}</Badge>{property.is_verified && <Badge className="gap-1"><CheckCircle2 size={12} aria-hidden="true" /> Verified</Badge>}</div>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[.95] tracking-[-.035em] sm:text-7xl">{property.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-sm text-black/55"><MapPin size={16} aria-hidden="true" /> {property.address}, {property.city}, {property.state}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-black/10 py-5 text-sm text-black/65">
              <span className="flex items-center gap-2"><BedDouble size={18} aria-hidden="true" /> {property.bedrooms} bedrooms</span><span className="flex items-center gap-2"><Bath size={18} aria-hidden="true" /> {property.bathrooms} bathrooms</span><span className="flex items-center gap-2"><Maximize2 size={17} aria-hidden="true" /> {formatArea(property.area, property.area_unit)}</span>
            </div>
            <h2 className="mt-12 text-[11px] font-bold uppercase tracking-[.18em] text-moss">About this home</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-black/65">{property.description}</p>
            <h2 className="mt-14 text-[11px] font-bold uppercase tracking-[.18em] text-moss">Amenities</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{property.amenities.map((amenity) => <div key={amenity} className="rounded-2xl bg-paper px-4 py-4 text-sm">{amenity}</div>)}</div>
            <h2 className="mt-14 text-[11px] font-bold uppercase tracking-[.18em] text-moss">Key details</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['Property type', property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)],
                ['Year built', property.year_built ? String(property.year_built) : '—'],
                ['Parking', property.parking_spaces ? `${property.parking_spaces} spaces` : '—'],
                ['Reference', property.id.toUpperCase()],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-paper px-4 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/50">{label}</p>
                  <p className="mt-1 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <div className="sticky top-24 rounded-[28px] border border-black/10 bg-white p-6 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-black/50">Asking price</p>
                  <p className="mt-2 text-2xl font-bold">{formatPrice(property.price, property.currency)}<span className="ml-1 text-xs font-medium text-black/50">{property.listing_type === 'rent' ? '/ year' : ''}</span></p>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(property.id)}
                  aria-pressed={saved}
                  aria-label={saved ? 'Remove from saved homes' : 'Save this home'}
                  className={cn('grid size-11 place-items-center rounded-full border transition', saved ? 'border-clay text-clay' : 'border-black/15 hover:border-ink')}
                >
                  <Heart size={18} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
                </button>
              </div>
              <div className="my-6 border-t border-black/10" />
              {property.agent && (
                <div className="flex items-center gap-3">
                  <img src={imgAt(property.agent.avatar, 160)} className="size-12 rounded-full object-cover" alt={property.agent.name} loading="lazy" />
                  <div>
                    <p className="font-semibold">{property.agent.name}</p>
                    <p className="text-xs text-black/55">{property.agent.company}</p>
                  </div>
                </div>
              )}
              <form onSubmit={submit} className="mt-6">
                {sent ? (
                  <div className="rounded-2xl bg-moss/10 p-5 text-sm leading-6 text-moss">
                    Your message has been sent. The agent will be in touch.
                    <button type="button" onClick={() => setSent(false)} className="mt-2 block text-xs font-semibold underline underline-offset-4">Write another message</button>
                  </div>
                ) : (
                  <>
                    <label htmlFor="inquiry" className="sr-only">Your message to the agent</label>
                    <TextArea id="inquiry" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} className="h-28" required />
                    <Button type="submit" className="mt-3 w-full">Contact agent</Button>
                  </>
                )}
              </form>
              <button
                type="button"
                onClick={share}
                className="mt-3 flex w-full items-center justify-center gap-2 py-2 text-xs font-semibold text-black/55 transition hover:text-ink"
              >
                <Share2 size={14} aria-hidden="true" /> {copied ? 'Link copied!' : 'Share property'}
              </button>
            </div>
          </aside>
        </div>
      </Container>

      <section className="border-t border-black/10 py-20 sm:py-28">
        <Container><SectionHeading eyebrow="You may also like" title="More homes to explore." /><div className="mt-12 grid gap-7 md:grid-cols-3">{related.map((p) => <PropertyCard key={p.id} property={p} />)}</div></Container>
      </section>

      {galleryIndex !== null && (
        <div className="fixed inset-0 z-[120] bg-black/95 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={`${property.title} photo gallery`}>
          <button type="button" onClick={() => setGalleryIndex(null)} className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Close gallery">
            <X aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setGalleryIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))} className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Previous photo">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setGalleryIndex((i) => (i === null ? null : (i + 1) % images.length))} className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Next photo">
            <ChevronRight aria-hidden="true" />
          </button>
          <div className="flex h-full items-center justify-center">
            <img src={imgAt(images[galleryIndex], 1600)} alt={`${property.title} — photo ${galleryIndex + 1} of ${images.length}`} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((image, i) => (
              <button key={image} type="button" onClick={() => setGalleryIndex(i)} aria-label={`View photo ${i + 1}`} aria-current={i === galleryIndex} className={cn('size-12 overflow-hidden rounded-lg border transition', i === galleryIndex ? 'border-white' : 'border-white/25 hover:border-white/60')}>
                <img src={imgAt(image, 160)} className="h-full w-full object-cover" alt="" />
              </button>
            ))}
          </div>
          <p className="absolute bottom-7 right-6 hidden text-xs font-semibold text-white/60 sm:block">{galleryIndex + 1} / {images.length}</p>
        </div>
      )}
    </main>
  )
}
